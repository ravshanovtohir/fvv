import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTestDto, UpdateTestDto, GetTestDto } from './dto';
import { PrismaService } from '@prisma';
import { paginate } from '@helpers';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetTestDto, lang: string) {
    const tests = await paginate('test', {
      page: query.page,
      size: query.size,
      sort: query.sort,
      filter: query.filters,
      select: {
        id: true,
        [`question_${lang}`]: true,
        [`answers_${lang}`]: true,
        true_answer: true,
        created_at: true,
      },
    });
    return {
      ...tests,
      data: tests?.data?.map((test) => ({
        id: test?.id,
        question: test?.[`question_${lang}`],
        answers: test?.[`answers_${lang}`],
        true_answer: test?.true_answer,
        created_at: test?.created_at,
      })),
    };
  }

  async findOne(id: number, lang: string) {
    const test = await this.prisma.test.findUnique({
      where: { id },
      select: {
        id: true,
        [`question_${lang}`]: true,
        [`answers_${lang}`]: true,
        true_answer: true,
        created_at: true,
      },
    });
    if (!test) {
      throw new NotFoundException('Тест не найден!');
    }
    return {
      id: test?.id,
      question: test?.[`question_${lang}`],
      answers: test?.[`answers_${lang}`],
      true_answer: test?.true_answer,
      created_at: test?.created_at,
    };
  }

  async findAllAdmin(query: GetTestDto) {
    const tests = await paginate('test', {
      page: query.page,
      size: query.size,
      sort: query.sort,
      filter: query.filters,
      select: {
        id: true,
        question_uz: true,
        question_ru: true,
        question_en: true,
        answers_uz: true,
        answers_ru: true,
        answers_en: true,
        created_at: true,
      },
    });
    return tests;
  }

  async findOneAdmin(id: number) {
    const test = await this.prisma.test.findUnique({
      where: { id },
      select: {
        id: true,
        question_uz: true,
        question_ru: true,
        question_en: true,
        answers_uz: true,
        answers_ru: true,
        answers_en: true,
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
    for (const test of data.tests) {
      const category = await this.prisma.category.findUnique({
        where: {
          id: test.category_id,
        },
        select: {
          id: true,
        },
      });
      if (!category) {
        throw new NotFoundException(`Категория не найдена в тесте: ${test.question_ru}!`);
      }

      if (test.answers_uz.length < 3) {
        throw new BadRequestException(`У теста должно быть минимум 3 варианта ответа: ${test.question_ru}!`);
      }
      if (test.answers_ru.length < 3) {
        throw new BadRequestException(`У теста должно быть минимум 3 варианта ответа: ${test.question_ru}!`);
      }
      if (test.answers_en.length < 3) {
        throw new BadRequestException(`У теста должно быть минимум 3 варианта ответа: ${test.question_ru}!`);
      }

      const keys = ['answers_uz', 'answers_ru', 'answers_en'];
      for (const k of keys) {
        if (!test[k].some((a: any) => a.key === test.true_answer)) {
          throw new BadRequestException(
            `В тесте ${test.question_ru} ключ правильного ответа ${test.true_answer} отсутствует в вариантах ${k} !`,
          );
        }
      }
    }

    await this.prisma.test.createMany({
      data: data?.tests?.map((test) => ({
        question_uz: test?.question_uz,
        question_ru: test?.question_ru,
        question_en: test?.question_en,
        answers_uz: test?.answers_uz,
        answers_ru: test?.answers_ru,
        answers_en: test?.answers_en,
        true_answer: test?.true_answer,
        category_id: test?.category_id,
      })),
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
        answers_uz: data.answers_uz ?? test.answers_uz,
        answers_ru: data.answers_ru ?? test.answers_ru,
        answers_en: data.answers_en ?? test.answers_en,
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

  async checkAnswer(id: number, answerKey: string) {
    const test = await this.prisma.test.findUnique({ where: { id } });
    if (!test) throw new NotFoundException('Тест не найден!');
    const isCorrect = test.true_answer === answerKey;
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
        answers_uz: true,
        answers_ru: true,
        answers_en: true,
      },
    });
    return tests;
  }

  async startUserTest(category_id: number, user_id: number) {
    user_id = 1;
    const tests = await this.prisma.test.findMany({
      where: { category_id },
      select: { id: true },
      orderBy: { id: 'asc' },
    });
    if (!tests.length) {
      throw new NotFoundException('Этот категории нет тестов!');
    }

    const session = await this.prisma.userTestSession.create({
      data: {
        user_id,
        category_id,
        total: tests.length,
      },
    });
    return { session_id: session.id, total_tests: tests.length };
  }

  async getNextTest(session_id: number, user_id: number, lang: string) {
    user_id = 1;
    const session = await this.prisma.userTestSession.findUnique({
      where: {
        id: session_id,
      },
      include: {
        answers: true,
      },
    });

    if (!session || session.user_id !== user_id) {
      throw new NotFoundException('Сессия не найдена!');
    }

    const tests = await this.prisma.test.findMany({
      where: {
        category_id: session.category_id,
      },
      orderBy: {
        id: 'asc',
      },
    });

    const answeredTestIds = session.answers.map((a) => a.test_id);
    const nextIndex = tests.findIndex((t) => !answeredTestIds.includes(t.id));
    if (nextIndex === -1) return { done: true };
    const test = tests[nextIndex];
    return {
      test: {
        id: test.id,
        question: test[`question_${lang}`],
        answers: test[`answers_${lang}`],
      },
      current: nextIndex + 1,
      total: tests.length,
    };
  }

  async answerTest(session_id: number, test_id: number, answer: string, user_id: number, lang: string) {
    user_id = 1;
    const session = await this.prisma.userTestSession.findUnique({
      where: {
        id: session_id,
      },
      include: {
        answers: true,
      },
    });
    if (!session || session.user_id !== user_id) throw new NotFoundException('Session topilmadi!');
    if (session.answers.some((a) => a.test_id === test_id)) throw new BadRequestException('Bu testga javob berilgan!');
    const test = await this.prisma.test.findUnique({ where: { id: test_id } });
    if (!test) throw new NotFoundException('Test topilmadi!');
    const is_correct = test.true_answer === answer;
    await this.prisma.userTestAnswer.create({
      data: {
        session_id,
        test_id,
        answer,
        is_correct,
      },
    });
    return { success: true };
  }

  async finishUserTest(session_id: number, user_id: number) {
    user_id = 1;
    const session = await this.prisma.userTestSession.findUnique({
      where: { id: session_id },
      include: { answers: true },
    });
    if (!session || session.user_id !== user_id) throw new NotFoundException('Session topilmadi!');
    const total = session.total || session.answers.length;
    const correct = session.answers.filter((a) => a.is_correct).length;
    const wrong = total - correct;
    const percent = total ? Math.round((correct / total) * 100) : 0;
    await this.prisma.userTestSession.update({
      where: { id: session_id },
      data: {
        finished_at: new Date(),
        correct,
        wrong,
        percent,
        score: correct,
      },
    });
    return { total, correct, wrong, percent };
  }

  async getUserTestHistory(user_id: number) {
    const sessions = await this.prisma.userTestSession.findMany({
      where: { user_id },
      orderBy: { started_at: 'desc' },
      include: { category: true },
    });
    return sessions.map((s) => ({
      session_id: s.id,
      category: s.category.title_uz,
      started_at: s.started_at,
      finished_at: s.finished_at,
      total: s.total,
      correct: s.correct,
      wrong: s.wrong,
      percent: s.percent,
    }));
  }
}
