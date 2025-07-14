import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from '@prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const exists = await this.prisma.user.findFirst({
      where: { phone_number: data.phone_number },
    });
    if (exists) {
      throw new BadRequestException('Пользователь с таким номером уже существует!');
    }
    await this.prisma.user.create({
      data: {
        name: data.name,
        login: data.phone_number,
        phone_number: data.phone_number,
      },
    });
    return 'Пользователь успешно создан!';
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        login: true,
        phone_number: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        login: true,
        phone_number: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name ?? user.name,
        login: data.login ?? user.login,
        phone_number: data.phone_number ?? user.phone_number,
      },
    });
    return 'Пользователь успешно обновлен!';
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    await this.prisma.user.delete({ where: { id } });
    return 'Пользователь успешно удален!';
  }
}
