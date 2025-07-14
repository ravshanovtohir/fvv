import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, GetCategoryDto, UpdateCategoryDto } from './dto';
import { PrismaService } from '@prisma';
import { paginate } from '@helpers';
import { CategoryType } from '@constants';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetCategoryDto) {
    console.log(query);

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
      data: categories.data.map((category) => ({
        ...category,
        type: CategoryType[category.type],
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
      type: CategoryType[category.type],
    };
  }

  async getCategoryByType() {
    const categories = Object.entries(CategoryType).map(([key, value]) => ({
      key: Number(key),
      value,
    }));
    return categories;
  }

  async create(data: CreateCategoryDto, file: Express.Multer.File) {
    const categoryExists = await this.prisma.category.findFirst({
      where: {
        type: data.type,
        OR: [{ title_uz: data.title_uz }, { title_ru: data.title_ru }, { title_en: data.title_en }],
      },
    });

    if (categoryExists) {
      throw new BadRequestException('Категория уже существует!');
    }

    if (!Object.keys(CategoryType).includes(String(data.type))) {
      throw new BadRequestException('Неверный тип категории!');
    }

    await this.prisma.category.create({
      data: {
        type: data.type,
        title_uz: data.title_uz,
        title_ru: data.title_ru,
        title_en: data.title_en,
        icon: file.path,
      },
    });

    return 'Категория успешно создана!';
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, file: Express.Multer.File) {
    const categoryExists = await this.prisma.category.findFirst({
      where: {
        id: id,
      },
    });

    if (!categoryExists) {
      throw new NotFoundException('Категория не найдена!');
    }

    const categoryNameExists = await this.prisma.category.findFirst({
      where: {
        OR: [
          { title_uz: updateCategoryDto.title_uz },
          { title_ru: updateCategoryDto.title_ru },
          { title_en: updateCategoryDto.title_en },
        ],
      },
    });

    if (categoryNameExists) {
      throw new BadRequestException('Категория уже существует!');
    }

    await this.prisma.category.update({
      where: { id },
      data: {
        type: updateCategoryDto.type ?? categoryExists.type,
        title_uz: updateCategoryDto.title_uz ?? categoryExists.title_uz,
        title_ru: updateCategoryDto.title_ru ?? categoryExists.title_ru,
        title_en: updateCategoryDto.title_en ?? categoryExists.title_en,
        icon: file?.path ?? categoryExists.icon,
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

    return 'Категория успешно удалена!';
  }
}
