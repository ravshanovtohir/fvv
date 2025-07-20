import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMapDto, UpdateMapDto } from './dto';
import { PrismaService } from '@prisma';
import { paginate, IsGeoJsonCoordinates } from '@helpers';

@Injectable()
export class MapService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any) {
    const maps = await paginate('map', {
      page: query.page,
      size: query.size,
      sort: query.sort,
      filter: query.filters,
      select: {
        id: true,
        coordinates: true,
        category_id: true,
        created_at: true,
      },
    });
    return maps;
  }

  async findOne(id: number) {
    const map = await this.prisma.map.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        coordinates: true,
        category_id: true,
        created_at: true,
      },
    });

    if (!map) {
      throw new NotFoundException('не найден');
    }

    return map;
  }

  async create(data: CreateMapDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: data.category_id,
      },
    });

    if (!category) {
      throw new NotFoundException('категория не найдена');
    }

    if (!IsGeoJsonCoordinates(data.geometry.coordinates)) {
      throw new BadRequestException('неверный формат координат');
    }

    await this.prisma.map.create({
      data: {
        ...data,
        coordinates: JSON.stringify(data.geometry.coordinates),
      },
    });
    return 'успешно создано';
  }

  async update(id: number, data: UpdateMapDto) {
    const map = await this.prisma.map.findUnique({
      where: {
        id: id,
      },
    });

    if (!map) {
      throw new NotFoundException('не найден');
    }

    if (data.category_id) {
      const category = await this.prisma.category.findUnique({
        where: {
          id: data.category_id,
        },
      });

      if (!category) {
        throw new NotFoundException('категория не найдена');
      }
    }

    await this.prisma.map.update({
      where: {
        id: map.id,
      },
      data: {
        category_id: data.category_id ? data.category_id : map.category_id,
        coordinates: data.geometry ? JSON.stringify(data.geometry.coordinates) : map.coordinates,
      },
    });

    return 'успешно обновлено';
  }

  async remove(id: number) {
    const map = await this.prisma.map.findUnique({
      where: {
        id: id,
      },
    });

    if (!map) {
      throw new NotFoundException('не найден');
    }

    await this.prisma.map.delete({
      where: {
        id: map.id,
      },
    });

    return 'успешно удалено';
  }
}
