import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateFirstaidDto, UpdateFirstaidDto, GetFirstaidDto } from './dto';
import { PrismaService } from '@prisma';
import { paginate } from '@helpers';

@Injectable()
export class FirstaidService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetFirstaidDto, lang: string) {
    const firstaids = await paginate('firstAid', {
      page: query.page,
      size: query.size,
      sort: query.sort,
      filter: query.filters,
      select: {
        id: true,
        [`title_${lang}`]: true,
        [`description_${lang}`]: true,
        category_id: true,
        created_at: true,
      },
    });
    return {
      ...firstaids,
      data: firstaids.data.map((firstaid) => ({
        id: firstaid.id,
        title: firstaid[`title_${lang}`],
        description: firstaid[`description_${lang}`],
        category_id: firstaid.category_id,
        created_at: firstaid.created_at,
      })),
    };
  }

  async findOne(id: number, lang: string) {
    const firstaid = await this.prisma.firstAid.findUnique({
      where: { id },
      select: {
        id: true,
        [`title_${lang}`]: true,
        [`description_${lang}`]: true,
        category_id: true,
        created_at: true,
      },
    });
    if (!firstaid) {
      throw new NotFoundException('Первая помощь не найдена!');
    }
    return {
      id: firstaid.id,
      title: firstaid[`title_${lang}`],
      description: firstaid[`description_${lang}`],
      category_id: firstaid.category_id,
      created_at: firstaid.created_at,
    };
  }

  async findAllAdmin(query: GetFirstaidDto) {
    const firstaids = await paginate('firstAid', {
      page: query.page,
      size: query.size,
      sort: query.sort,
      filter: query.filters,
      select: {
        id: true,
        title_uz: true,
        title_ru: true,
        title_en: true,
        description_uz: true,
        description_ru: true,
        description_en: true,
        category_id: true,
        created_at: true,
      },
    });
    return {
      ...firstaids,
      data: firstaids.data.map((firstaid) => ({
        id: firstaid.id,
        title: firstaid.title_uz,
        description: firstaid.description_uz,
        category_id: firstaid.category_id,
        created_at: firstaid.created_at,
      })),
    };
  }

  async findOneAdmin(id: number) {
    const firstaid = await this.prisma.firstAid.findUnique({
      where: { id },
      select: {
        id: true,
        title_uz: true,
        title_ru: true,
        title_en: true,
        description_uz: true,
        description_ru: true,
        description_en: true,
        category_id: true,
        created_at: true,
      },
    });

    if (!firstaid) {
      throw new NotFoundException('Первая помощь не найдена!');
    }

    return {
      id: firstaid.id,
      title: firstaid.title_uz,
      description: firstaid.description_uz,
      category_id: firstaid.category_id,
      created_at: firstaid.created_at,
    };
  }

  async create(data: CreateFirstaidDto) {
    const exists = await this.prisma.firstAid.findFirst({
      where: {
        OR: [
          {
            title_uz: data.title_uz,
          },
          {
            title_ru: data.title_ru,
          },
          {
            title_en: data.title_en,
          },
        ],
      },
    });
    if (exists) {
      throw new BadRequestException('Первая помощь уже существует!');
    }

    const categoryExists = await this.prisma.category.findUnique({
      where: {
        id: data.category_id,
      },
    });
    if (!categoryExists) {
      throw new NotFoundException('Категория не найдена!');
    }

    await this.prisma.firstAid.create({
      data: {
        title_uz: data.title_uz,
        title_ru: data.title_ru,
        title_en: data.title_en,
        description_uz: data.description_uz,
        description_ru: data.description_ru,
        description_en: data.description_en,
        category_id: data.category_id,
      },
    });
    return 'Первая помощь успешно создана!';
  }

  async update(id: number, data: UpdateFirstaidDto) {
    const firstaid = await this.prisma.firstAid.findUnique({
      where: {
        id: id,
      },
    });

    if (!firstaid) {
      throw new NotFoundException('Первая помощь не найдена!');
    }

    if (data.title_uz || data.title_ru || data.title_en) {
      const duplicate = await this.prisma.firstAid.findFirst({
        where: {
          id: {
            not: id,
          },
          OR: [
            data.title_uz ? { title_uz: data.title_uz } : undefined,
            data.title_ru ? { title_ru: data.title_ru } : undefined,
            data.title_en ? { title_en: data.title_en } : undefined,
          ].filter(Boolean),
        },
      });
      if (duplicate) {
        throw new BadRequestException('Первая помощь с таким названием уже существует!');
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

    await this.prisma.firstAid.update({
      where: { id },
      data: {
        title_uz: data.title_uz ?? firstaid.title_uz,
        title_ru: data.title_ru ?? firstaid.title_ru,
        title_en: data.title_en ?? firstaid.title_en,
        description_uz: data.description_uz ?? firstaid.description_uz,
        description_ru: data.description_ru ?? firstaid.description_ru,
        description_en: data.description_en ?? firstaid.description_en,
        category_id: data.category_id ?? firstaid.category_id,
      },
    });
    return 'Первая помощь успешно обновлена!';
  }

  async remove(id: number) {
    const firstaid = await this.prisma.firstAid.findUnique({
      where: {
        id: id,
      },
    });

    if (!firstaid) {
      throw new NotFoundException('Первая помощь не найдена!');
    }
    await this.prisma.firstAid.delete({
      where: {
        id: id,
      },
    });

    return 'Первая помощь успешно удалена!';
  }
}
