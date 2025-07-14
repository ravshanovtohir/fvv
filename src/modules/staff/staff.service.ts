import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateStaffDto, UpdateStaffDto, GetStaffDto } from './dto';
import { PrismaService } from '@prisma';
import { paginate } from '@helpers';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetStaffDto) {
    const staffs = await paginate('staff', {
      page: query.page,
      size: query.size,
      sort: query.sort,
      filter: query.filters,
      select: {
        id: true,
        full_name: true,
        login: true,
        created_at: true,
      },
    });

    return staffs;
  }

  async findOne(id: number) {
    const staff = await this.prisma.staff.findUnique({
      where: { id },
      select: {
        id: true,
        full_name: true,
        login: true,
        created_at: true,
      },
    });

    if (!staff) {
      throw new NotFoundException('Сотрудник не найден!');
    }

    return staff;
  }

  async create(data: CreateStaffDto) {
    const exists = await this.prisma.staff.findFirst({
      where: {
        login: data.login,
      },
    });

    if (exists) {
      throw new BadRequestException('Сотрудник с таким логином уже существует!');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await this.prisma.staff.create({
      data: {
        full_name: data.full_name,
        login: data.login,
        password: hashedPassword,
      },
    });
    return 'Сотрудник успешно создан!';
  }

  async update(id: number, data: UpdateStaffDto) {
    const staff = await this.prisma.staff.findUnique({
      where: {
        id: id,
      },
    });

    if (!staff) {
      throw new NotFoundException('Сотрудник не найден!');
    }

    if (data.login) {
      const duplicate = await this.prisma.staff.findFirst({
        where: {
          id: {
            not: id,
          },
          login: data.login,
        },
      });

      if (duplicate) {
        throw new BadRequestException('Сотрудник с таким логином уже существует!');
      }
    }

    let hashedPassword = staff.password;
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }
    await this.prisma.staff.update({
      where: {
        id: id,
      },
      data: {
        full_name: data.full_name ?? staff.full_name,
        login: data.login ?? staff.login,
        password: hashedPassword,
      },
    });
    return 'Сотрудник успешно обновлен!';
  }

  async remove(id: number) {
    const staff = await this.prisma.staff.findUnique({
      where: {
        id: id,
      },
    });

    if (!staff) {
      throw new NotFoundException('Сотрудник не найден!');
    }

    await this.prisma.staff.delete({
      where: {
        id: id,
      },
    });

    return 'Сотрудник успешно удален!';
  }
}
