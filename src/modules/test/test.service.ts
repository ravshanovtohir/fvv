import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTestDto, UpdateTestDto } from './dto';
import { PrismaService } from '@prisma';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.test.findMany({
      select: {
        id: true,
        question_uz: true,
        question_ru: true,
        question_en: true,
        asnwers: true,
        true_answer: true,
        created_at: true,
      },
    });
  }

  async findOne(id: number) {
    const test = await this.prisma.test.findUnique({
      where: { id },
      select: {
        id: true,
        question_uz: true,
        question_ru: true,
        question_en: true,
        asnwers: true,
        true_answer: true,
        created_at: true,
      },
    });
    if (!test) {
      throw new NotFoundException('Тест не найден!');
    }
    return test;
  }

  async create(data: CreateTestDto) {
    await this.prisma.test.create({
      data: {
        question_uz: data.question_uz,
        question_ru: data.question_ru,
        question_en: data.question_en,
        asnwers: data.asnwers,
        true_answer: data.true_answer,
      },
    });
    return 'Тест успешно создан!';
  }

  async update(id: number, data: UpdateTestDto) {
    const test = await this.prisma.test.findUnique({
      where: {
        id: id,
      },
    });
    if (!test) {
      throw new NotFoundException('Тест не найден!');
    }
    await this.prisma.test.update({
      where: {
        id: id,
      },
      data: {
        question_uz: data.question_uz ?? test.question_uz,
        question_ru: data.question_ru ?? test.question_ru,
        question_en: data.question_en ?? test.question_en,
        asnwers: data.asnwers ?? test.asnwers,
        true_answer: data.true_answer ?? test.true_answer,
      },
    });
    return 'Тест успешно обновлен!';
  }

  async remove(id: number) {
    const test = await this.prisma.test.findUnique({
      where: {
        id: id,
      },
    });
    if (!test) {
      throw new NotFoundException('Тест не найден!');
    }
    await this.prisma.test.delete({
      where: {
        id: id,
      },
    });
    return 'Тест успешно удален!';
  }

  async checkAnswer(id: number, answer: string) {
    const test = await this.prisma.test.findUnique({
      where: {
        id: id,
      },
    });
    if (!test) {
      throw new NotFoundException('Тест не найден!');
    }
    const isCorrect = test.true_answer === answer;
    return { correct: isCorrect };
  }

  async startTest(count: number) {
    const total = await this.prisma.test.count();
    if (total === 0) {
      throw new NotFoundException('Нет тестов для начала!');
    }
    const skip = Math.max(0, Math.floor(Math.random() * Math.max(1, total - count + 1)));
    const tests = await this.prisma.test.findMany({
      skip,
      take: count,
      select: {
        id: true,
        question_uz: true,
        question_ru: true,
        question_en: true,
        asnwers: true,
      },
    });
    return tests;
  }
}
