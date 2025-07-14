import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { PrismaService } from '@prisma';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  create(data: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
