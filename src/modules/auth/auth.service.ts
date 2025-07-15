import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { UpdateFcmTokenDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(data: any) {
    return data;
  }

  async getMeUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        phone_number: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Юзер не найден!');
    }

    return user;
  }

  async getMeStaff(userId: number) {
    const staff = await this.prisma.staff.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        login: true,
        full_name: true,
        created_at: true,
      },
    });

    if (!staff) {
      throw new NotFoundException('Юзер не найден!');
    }

    return staff;
  }

  async updateFcmToken(userId: number, data: UpdateFcmTokenDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Юзер не найден!');
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        fcm_token: data.fcm_token,
      },
    });

    return 'Успшно обновлен!';
  }
}
