import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { LoginMobileDto, RegisterDto, UpdateFcmTokenDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRoles } from '@enums';

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
      role: UserRoles.ADMIN,
    };

    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
  }

  async register(data: RegisterDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        phone_number: data.phone_number,
      },
    });

    if (user) {
      throw new BadRequestException('Этот номер уже зарегистрирован!');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await this.prisma.user.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        middle_name: data.middle_name,
        phone_number: data.phone_number,
        password: hashedPassword,
      },
    });

    return 'Регистрация прошла успешно!';
  }

  async loginMobile(data: LoginMobileDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        phone_number: data.phone_number,
      },
    });

    if (!user) {
      throw new NotFoundException('Юзер не найден!');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Неверный пароль!');
    }

    const payload = {
      id: user.id,
      role: UserRoles.USER,
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
        first_name: true,
        last_name: true,
        middle_name: true,
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
