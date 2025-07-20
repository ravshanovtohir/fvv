import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CreateNotificationDto } from './dto';
import { firebaseApp, admin } from '@helpers';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    // Always send to all users
    const users = await this.prisma.user.findMany({ select: { id: true, fcm_token: true } });
    const userIds = users.map((u) => u.id);
    if (userIds.length === 0) throw new NotFoundException('Нет пользователей для отправки!');

    // Firebase push notification
    if (firebaseApp) {
      for (const user of users) {
        if (user.fcm_token) {
          try {
            await admin.messaging().send({
              token: user.fcm_token,
              notification: {
                title: dto?.title,
                body: dto?.message,
              },
              data: {
                type: dto?.type,
              },
            });
          } catch (err) {
            console.warn(`FCM push failed for user ${user.id}:`, err?.message || err);
          }
        }
      }
    } else {
      console.warn('Firebase is not initialized, push notifications are skipped.');
    }

    const notification = await this.prisma.notification.create({
      data: {
        title: dto?.title,
        message: dto?.message,
        type: dto?.type,
        users: {
          create: userIds.map((user_id) => ({ user: { connect: { id: user_id } } })),
        },
      },
    });
    return notification;
  }

  async findAll() {
    return this.prisma.notification.findMany({
      orderBy: { created_at: 'desc' },
      include: { users: { include: { user: true } } },
    });
  }

  async findOne(id: number) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
      include: { users: { include: { user: true } } },
    });
    if (!notification) throw new NotFoundException('Уведомление не найдено!');
    return notification;
  }

  async getStaticAll() {
    // const userCount = await this.prisma.user.count();
    return this.prisma.notification.findMany({
      where: {
        users: {
          every: {},
        },
      },
      include: { users: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async getStaticNotification(userId: number) {
    const notifications = await this.prisma.notificationUser.findMany({
      where: {
        user_id: userId,
      },
      select: {
        notification: {
          select: {
            id: true,
            title: true,
            message: true,
          },
        },
      },
      orderBy: { id: 'desc' },
    });

    return notifications;
  }

  async getUserNotifications(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Пользователь не найден!');
    return this.prisma.notificationUser.findMany({
      where: { user_id: userId },
      include: { notification: true },
      orderBy: { id: 'desc' },
    });
  }
}
