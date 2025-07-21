import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateEncyclopediaDto, UpdateEncyclopediaDto, GetEncyclopediaDto } from './dto';
import { PrismaService } from '@prisma';
import { paginate } from '@helpers';
import * as path from 'path';
import * as fs from 'fs';
import { FilePath } from '@constants';

@Injectable()
export class EncyclopediaService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetEncyclopediaDto, lang: string) {
    const encyclopedias = await paginate('encyclopedia', {
      page: query.page,
      size: query.size,
      sort: query.sort,
      filter: query.filters,
      select: {
        id: true,
        [`title_${lang}`]: true,
        [`description_${lang}`]: true,
        image: true,
        category_id: true,
        created_at: true,
      },
    });
    return {
      ...encyclopedias,
      data: encyclopedias?.data?.map((encyclopedia) => ({
        id: encyclopedia?.id,
        title: encyclopedia?.[`title_${lang}`],
        description: encyclopedia?.[`description_${lang}`],
        image: `${FilePath?.ENCYCLOPEDIA_IMAGE}/${encyclopedia?.image}`,
        category_id: encyclopedia?.category_id,
        created_at: encyclopedia?.created_at,
      })),
    };
  }

  async findOne(id: number, lang: string) {
    const encyclopedia = await this.prisma.encyclopedia.findUnique({
      where: { id },
      select: {
        id: true,
        [`title_${lang}`]: true,
        [`description_${lang}`]: true,
        image: true,
        category_id: true,
        created_at: true,
      },
    });
    if (!encyclopedia) {
      throw new NotFoundException('Энциклопедия не найдена!');
    }
    return {
      id: encyclopedia?.id,
      title: encyclopedia?.[`title_${lang}`],
      description: encyclopedia?.[`description_${lang}`],
      image: `${FilePath?.ENCYCLOPEDIA_IMAGE}/${encyclopedia?.image}`,
      category_id: encyclopedia?.category_id,
      created_at: encyclopedia?.created_at,
    };
  }

  async findAllAdmin(query: GetEncyclopediaDto) {
    const encyclopedias = await paginate('encyclopedia', {
      page: query.page,
      size: query.size,
      sort: query.sort,
      filter: query.filters,
      select: {
        id: true,
        title_uz: true,
        title_ru: true,
        title_en: true,
        image: true,
        description_uz: true,
        description_ru: true,
        description_en: true,
        category_id: true,
        created_at: true,
      },
    });
    return {
      ...encyclopedias,
      data: encyclopedias?.data?.map((encyclopedia) => ({
        id: encyclopedia?.id,
        title_uz: encyclopedia?.title_uz,
        title_ru: encyclopedia?.title_ru,
        title_en: encyclopedia?.title_en,
        description_uz: encyclopedia?.description_uz,
        description_ru: encyclopedia?.description_ru,
        description_en: encyclopedia?.description_en,
        image: `${FilePath?.ENCYCLOPEDIA_IMAGE}/${encyclopedia?.image}`,
        category_id: encyclopedia?.category_id,
        created_at: encyclopedia?.created_at,
      })),
    };
  }

  async findOneAdmin(id: number) {
    const encyclopedia = await this.prisma.encyclopedia.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title_uz: true,
        title_ru: true,
        title_en: true,
        image: true,
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
    return {
      id: encyclopedia?.id,
      title_uz: encyclopedia?.title_uz,
      title_ru: encyclopedia?.title_ru,
      title_en: encyclopedia?.title_en,
      description_uz: encyclopedia?.description_uz,
      description_ru: encyclopedia?.description_ru,
      description_en: encyclopedia?.description_en,
      image: `${FilePath?.ENCYCLOPEDIA_IMAGE}/${encyclopedia?.image}`,
      category_id: encyclopedia?.category_id,
      created_at: encyclopedia?.created_at,
    };
  }

  async create(data: CreateEncyclopediaDto, image: string) {
    const exists = await this.prisma.encyclopedia.findFirst({
      where: {
        OR: [{ title_uz: data.title_uz }, { title_ru: data.title_ru }, { title_en: data.title_en }],
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
        title_en: data.title_en,
        description_uz: data.description_uz,
        description_ru: data.description_ru,
        description_en: data.description_en,
        category_id: data.category_id,
        image: image,
      },
    });
    return 'Энциклопедия успешно создана!';
  }

  async update(id: number, data: UpdateEncyclopediaDto, fileName: string) {
    const encyclopedia = await this.prisma.encyclopedia.findUnique({ where: { id } });
    if (!encyclopedia) {
      throw new NotFoundException('Энциклопедия не найдена!');
    }
    if (data.title_uz || data.title_ru || data.title_en) {
      const duplicate = await this.prisma.encyclopedia.findFirst({
        where: {
          id: { not: id },
          OR: [
            data.title_uz ? { title_uz: data.title_uz } : undefined,
            data.title_ru ? { title_ru: data.title_ru } : undefined,
            data.title_en ? { title_en: data.title_en } : undefined,
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

    if (fileName) {
      const imagePath = path.join(process.cwd(), 'uploads', 'encyclopedia_images', encyclopedia.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await this.prisma.encyclopedia.update({
      where: { id },
      data: {
        title_uz: data.title_uz ?? encyclopedia.title_uz,
        title_ru: data.title_ru ?? encyclopedia.title_ru,
        title_en: data.title_en ?? encyclopedia.title_en,
        description_uz: data.description_uz ?? encyclopedia.description_uz,
        description_ru: data.description_ru ?? encyclopedia.description_ru,
        description_en: data.description_en ?? encyclopedia.description_en,
        category_id: data.category_id ?? encyclopedia.category_id,
        image: fileName ?? encyclopedia.image,
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
