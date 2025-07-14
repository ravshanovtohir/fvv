import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateIntroContentDto, UpdateIntroContentDto } from './dto';
import { PrismaService } from '@prisma';

@Injectable()
export class IntroContentService {
  constructor(private readonly prisma: PrismaService) {}

  async find() {
    const introContent = await this.prisma.introContent.findFirst();
    return introContent;
  }

  async create(data: CreateIntroContentDto, fileName: string) {
    const introContentExists = await this.prisma.introContent.findFirst();
    if (introContentExists) {
      throw new BadRequestException('Интро контент уже существует!');
    }

    const introContent = await this.prisma.introContent.create({
      data: {
        name_uz: data.name_uz,
        name_ru: data.name_ru,
        name_en: data.name_en,
        title_uz: data.title_uz,
        title_ru: data.title_ru,
        title_en: data.title_en,
        image: fileName,
      },
    });
    return introContent;
  }

  async update(data: UpdateIntroContentDto, fileName: string) {
    const introContentExists = await this.prisma.introContent.findFirst();
    if (!introContentExists) {
      throw new BadRequestException('Интро контент не существует!');
    }

    const introContent = await this.prisma.introContent.update({
      where: {
        id: introContentExists.id,
      },
      data: {
        name_uz: data.name_uz ?? introContentExists.name_uz,
        name_ru: data.name_ru ?? introContentExists.name_ru,
        name_en: data.name_en ?? introContentExists.name_en,
        title_uz: data.title_uz ?? introContentExists.title_uz,
        title_ru: data.title_ru ?? introContentExists.title_ru,
        title_en: data.title_en ?? introContentExists.title_en,
        image: fileName ?? introContentExists.image,
      },
    });
    return introContent;
  }

  async remove(id: number) {
    const introContentExists = await this.prisma.introContent.findFirst();
    if (!introContentExists) {
      throw new BadRequestException('Интро контент не существует!');
    }

    const introContent = await this.prisma.introContent.delete({
      where: {
        id: introContentExists.id,
      },
    });

    return 'Интро контент удален успешно!';
  }
}
