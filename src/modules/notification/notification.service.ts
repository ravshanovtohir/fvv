import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CreateNotificationDto, NotificationSendType } from './dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    let userIds: number[] = [];
    if (dto.send_to === NotificationSendType.ALL) {
      const users = await this.prisma.user.findMany({ select: { id: true } });
      userIds = users.map((u) => u.id);
      if (userIds.length === 0) throw new NotFoundException('Нет пользователей для отправки!');
    } else if (dto.send_to === NotificationSendType.SELECTED) {
      if (!dto.user_ids || dto.user_ids.length === 0)
        throw new BadRequestException('user_ids обязательно для selected!');
      userIds = dto.user_ids;
    } else if (dto.send_to === NotificationSendType.ONE) {
      if (!dto.user_ids || dto.user_ids.length !== 1)
        throw new BadRequestException('user_ids должен содержать ровно один элемент для one!');
      userIds = dto.user_ids;
    }
    const foundUsers = await this.prisma.user.findMany({ where: { id: { in: userIds } }, select: { id: true } });
    if (foundUsers.length !== userIds.length)
      throw new NotFoundException('Один или несколько пользователей не найдены!');
    const notification = await this.prisma.notification.create({
      data: {
        title: dto.title,
        message: dto.message,
        type: dto.type,
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
    const userCount = await this.prisma.user.count();
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
