import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateEncyclopediaDto, UpdateEncyclopediaDto, GetEncyclopediaDto } from './dto';
import { PrismaService } from '@prisma';
import { paginate } from '@helpers';

@Injectable()
export class EncyclopediaService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetEncyclopediaDto) {
    const encyclopedias = await paginate('encyclopedia', {
      page: query.page,
      size: query.size,
      sort: query.sort,
      filter: query.filters,
      select: {
        id: true,
        title_uz: true,
        title_ru: true,
        title_uen: true,
        description_uz: true,
        description_ru: true,
        description_en: true,
        category_id: true,
        created_at: true,
      },
    });
    return encyclopedias;
  }

  async findOne(id: number) {
    const encyclopedia = await this.prisma.encyclopedia.findUnique({
      where: { id },
      select: {
        id: true,
        title_uz: true,
        title_ru: true,
        title_uen: true,
        description_uz: true,
        description_ru: true,
        description_en: true,
        category_id: true,
        created_at: true,
      },
    });
    if (!encyclopedia) {
      throw new NotFoundException('Энциклопедия не найдена!');
    }
    return encyclopedia;
  }

  async create(data: CreateEncyclopediaDto) {
    const exists = await this.prisma.encyclopedia.findFirst({
      where: {
        OR: [{ title_uz: data.title_uz }, { title_ru: data.title_ru }, { title_uen: data.title_uen }],
      },
    });
    if (exists) {
      throw new BadRequestException('Энциклопедия уже существует!');
    }

    const categoryExists = await this.prisma.category.findUnique({
      where: {
        id: data.category_id,
      },
    });
    if (!categoryExists) {
      throw new NotFoundException('Категория не найдена!');
    }

    await this.prisma.encyclopedia.create({
      data: {
        title_uz: data.title_uz,
        title_ru: data.title_ru,
        title_uen: data.title_uen,
        description_uz: data.description_uz,
        description_ru: data.description_ru,
        description_en: data.description_en,
        category_id: data.category_id,
      },
    });
    return 'Энциклопедия успешно создана!';
  }

  async update(id: number, data: UpdateEncyclopediaDto) {
    const encyclopedia = await this.prisma.encyclopedia.findUnique({ where: { id } });
    if (!encyclopedia) {
      throw new NotFoundException('Энциклопедия не найдена!');
    }
    if (data.title_uz || data.title_ru || data.title_uen) {
      const duplicate = await this.prisma.encyclopedia.findFirst({
        where: {
          id: { not: id },
          OR: [
            data.title_uz ? { title_uz: data.title_uz } : undefined,
            data.title_ru ? { title_ru: data.title_ru } : undefined,
            data.title_uen ? { title_uen: data.title_uen } : undefined,
          ].filter(Boolean),
        },
      });
      if (duplicate) {
        throw new BadRequestException('Энциклопедия с таким названием уже существует!');
      }
    }

    if (data.category_id) {
      const categoryExists = await this.prisma.category.findUnique({
        where: {
          id: data.category_id,
        },
      });
      if (!categoryExists) {
        throw new NotFoundException('Категория не найдена!');
      }
    }

    await this.prisma.encyclopedia.update({
      where: { id },
      data: {
        title_uz: data.title_uz ?? encyclopedia.title_uz,
        title_ru: data.title_ru ?? encyclopedia.title_ru,
        title_uen: data.title_uen ?? encyclopedia.title_uen,
        description_uz: data.description_uz ?? encyclopedia.description_uz,
        description_ru: data.description_ru ?? encyclopedia.description_ru,
        description_en: data.description_en ?? encyclopedia.description_en,
        category_id: data.category_id ?? encyclopedia.category_id,
      },
    });
    return 'Энциклопедия успешно обновлена!';
  }

  async remove(id: number) {
    const encyclopedia = await this.prisma.encyclopedia.findUnique({ where: { id } });
    if (!encyclopedia) {
      throw new NotFoundException('Энциклопедия не найдена!');
    }
    await this.prisma.encyclopedia.delete({ where: { id } });
    return 'Энциклопедия успешно удалена!';
  }
}
