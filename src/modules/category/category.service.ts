import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, GetCategoryDto, UpdateCategoryDto } from './dto';
import { PrismaService } from '@prisma';
import { paginate } from '@helpers';
import { CategoryType, FilePath } from '@constants';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetCategoryDto) {
    const categories = await paginate('category', {
      page: query.page,
      size: query.size,
      sort: query.sort,
      filter: query.filters,
      select: {
        id: true,
        type: true,
        title_uz: true,
        title_ru: true,
        title_en: true,
        icon: true,
        created_at: true,
      },
      where: {
        type: query.type ? Number(query.type) : undefined,
      },
    });

    return {
      ...categories,
      data: categories?.data?.map((category) => ({
        ...category,
        type: CategoryType?.[category?.type],
        image: `${FilePath?.CATEGORY_ICON}/${category?.icon}`,
      })),
    };
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        type: true,
        title_uz: true,
        title_ru: true,
        title_en: true,
        icon: true,
        created_at: true,
      },
    });

    return {
      ...category,
      type: CategoryType?.[category?.type],
      image: `${FilePath?.CATEGORY_ICON}/${category?.icon}`,
    };
  }

  async getCategoryByType() {
    const categories = Object.entries(CategoryType).map(([key, value]) => ({
      key: Number(key),
      value,
    }));
    return categories;
  }

  async findAllPublic(lang: string) {
    const categories = await this.prisma.category.findMany({
      select: {
        id: true,
        type: true,
        [`title_${lang}`]: true,
        icon: true,
        created_at: true,
      },
    });

    return categories.map((category) => ({
      id: category?.id,
      type: CategoryType?.[+category?.type],
      title: category?.[`title_${lang}`],
      image: `${FilePath?.CATEGORY_ICON}/${category?.icon}`,
      created_at: category?.created_at,
    }));
  }

  async findOnePublic(id: number, lang: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        [`title_${lang}`]: true,
        icon: true,
        created_at: true,
      },
    });

    return {
      id: category?.id,
      title: category?.[`title_${lang}`],
      type: CategoryType?.[+category?.type],
      image: `${FilePath?.CATEGORY_ICON}/${category?.icon}`,
      created_at: category?.created_at,
    };
  }

  async create(data: CreateCategoryDto, fileName: string) {
    if (!Object.keys(CategoryType).includes(String(data.type))) {
      throw new BadRequestException('Неверный тип категории!');
    }

    await this.prisma.category.create({
      data: {
        type: data.type,
        title_uz: data.title_uz,
        title_ru: data.title_ru,
        title_en: data.title_en,
        icon: fileName,
      },
    });

    return 'Категория успешно создана!';
  }

  async update(id: number, data: UpdateCategoryDto, fileName: string) {
    const categoryExists = await this.prisma.category.findFirst({
      where: {
        id: id,
      },
    });

    if (!categoryExists) {
      throw new NotFoundException('Категория не найдена!');
    }

    if (fileName) {
      const imagePath = path.join(process.cwd(), 'uploads', 'category_icons', categoryExists.icon);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    if (data.type && !Object.keys(CategoryType).includes(String(data.type))) {
      throw new BadRequestException('Неверный тип категории!');
    }

    await this.prisma.category.update({
      where: { id },
      data: {
        type: data.type ?? categoryExists.type,
        title_uz: data.title_uz ?? categoryExists.title_uz,
        title_ru: data.title_ru ?? categoryExists.title_ru,
        title_en: data.title_en ?? categoryExists.title_en,
        icon: fileName ?? categoryExists.icon,
      },
    });

    return 'Категория успешно обновлена!';
  }

  async remove(id: number) {
    const categoryExists = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!categoryExists) {
      throw new NotFoundException('Категория не найдена!');
    }

    await this.prisma.category.delete({
      where: {
        id: id,
      },
    });

    const imagePath = path.join(process.cwd(), 'uploads', 'category_icons', categoryExists.icon);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    return 'Категория успешно удалена!';
  }
}
