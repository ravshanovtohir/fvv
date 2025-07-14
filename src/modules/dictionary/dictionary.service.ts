import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateDictionaryDto, UpdateDictionaryDto, GetDictionaryDto } from './dto';
import { PrismaService } from '@prisma';
import { paginate } from '@helpers';

@Injectable()
export class DictionaryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetDictionaryDto) {
    const dictionaries = await paginate('dictionary', {
      page: query.page,
      size: query.size,
      sort: query.sort,
      filter: query.filters,
      select: {
        id: true,
        prefix: true,
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
    return dictionaries;
  }

  async findOne(id: number) {
    const dictionary = await this.prisma.dictionary.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        prefix: true,
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
    if (!dictionary) {
      throw new NotFoundException('Слово не найдено!');
    }
    return dictionary;
  }

  async create(data: CreateDictionaryDto) {
    const exists = await this.prisma.dictionary.findFirst({
      where: {
        OR: [
          { prefix: data.prefix },
          { title_uz: data.title_uz },
          { title_ru: data.title_ru },
          { title_en: data.title_en },
        ],
      },
    });
    if (exists) {
      throw new BadRequestException('Слово уже существует!');
    }

    const categoryExists = await this.prisma.category.findUnique({
      where: {
        id: data.category_id,
      },
    });
    if (!categoryExists) {
      throw new NotFoundException('Категория не найдена!');
    }

    await this.prisma.dictionary.create({
      data: {
        prefix: data.prefix,
        title_uz: data.title_uz,
        title_ru: data.title_ru,
        title_en: data.title_en,
        description_uz: data.description_uz,
        description_ru: data.description_ru,
        description_en: data.description_en,
        category_id: data.category_id,
      },
    });
    return 'Слово успешно создано!';
  }

  async update(id: number, data: UpdateDictionaryDto) {
    const dictionary = await this.prisma.dictionary.findUnique({
      where: {
        id: id,
      },
    });
    if (!dictionary) {
      throw new NotFoundException('Слово не найдено!');
    }

    if (data.prefix || data.title_uz || data.title_ru || data.title_en) {
      const duplicate = await this.prisma.dictionary.findFirst({
        where: {
          id: { not: id },
          OR: [
            data.prefix ? { prefix: data.prefix } : undefined,
            data.title_uz ? { title_uz: data.title_uz } : undefined,
            data.title_ru ? { title_ru: data.title_ru } : undefined,
            data.title_en ? { title_en: data.title_en } : undefined,
          ].filter(Boolean),
        },
      });
      if (duplicate) {
        throw new BadRequestException('Слово с таким префиксом или названием уже существует!');
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

    await this.prisma.dictionary.update({
      where: {
        id: id,
      },
      data: {
        prefix: data.prefix ?? dictionary.prefix,
        title_uz: data.title_uz ?? dictionary.title_uz,
        title_ru: data.title_ru ?? dictionary.title_ru,
        title_en: data.title_en ?? dictionary.title_en,
        description_uz: data.description_uz ?? dictionary.description_uz,
        description_ru: data.description_ru ?? dictionary.description_ru,
        description_en: data.description_en ?? dictionary.description_en,
        category_id: data.category_id ?? dictionary.category_id,
      },
    });
    return 'Слово успешно обновлено!';
  }

  async remove(id: number) {
    const dictionary = await this.prisma.dictionary.findUnique({
      where: {
        id: id,
      },
    });
    if (!dictionary) {
      throw new NotFoundException('Слово не найдено!');
    }
    await this.prisma.dictionary.delete({
      where: {
        id: id,
      },
    });
    return 'Слово успешно удалено!';
  }
}
