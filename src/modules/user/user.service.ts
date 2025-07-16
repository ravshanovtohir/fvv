import { Injectable, NotFoundException } from '@nestjs/common';
import { FindUserDto, UpdateUserDto } from './dto';
import { PrismaService } from '@prisma';
import * as bcrypt from 'bcrypt';
import { paginate } from '@helpers';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: FindUserDto) {
    const user = await paginate('user', {
      page: query.page,
      size: query.size,
      sort: query.sort,
      filter: query.filters,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        middle_name: true,
        phone_number: true,
      },
    });

    return user;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        middle_name: true,
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

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await this.prisma.user.update({
      where: { id },
      data: {
        first_name: data.first_name ?? user.first_name,
        last_name: data.last_name ?? user.last_name,
        middle_name: data.middle_name ?? user.middle_name,
        phone_number: data.phone_number ?? user.phone_number,
        password: data.password ?? user.password,
      },
    });
    return 'Пользователь успешно обновлен!';
  }
}
