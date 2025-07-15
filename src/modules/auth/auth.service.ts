import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { UpdateFcmTokenDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: { login: string; password: string }) {
    const staff = await this.prisma.staff.findFirst({
      where: {
        login: data.login,
      },
    });

    if (!staff) {
      throw new NotFoundException('Юзер не найден!');
    }
    const isMatch = await bcrypt.compare(data.password, staff.password);
    if (!isMatch) {
      throw new UnauthorizedException('Неверный пароль!');
    }
    const payload = {
      id: staff.id,
    };

    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
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
