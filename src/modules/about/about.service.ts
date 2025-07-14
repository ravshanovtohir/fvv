import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAboutDto, UpdateAboutDto, CreateContactDto, UpdateContactDto } from './dto';
import { PrismaService } from '@prisma';
import path from 'path';
import fs from 'fs';

@Injectable()
export class AboutService {
  constructor(private readonly prisma: PrismaService) {}

  async find() {
    const about = await this.prisma.about.findFirst({
      select: {
        name_uz: true,
        name_ru: true,
        name_en: true,
        title_uz: true,
        title_ru: true,
        title_en: true,
        image: true,
        phone_number: true,
        address_uz: true,
        address_ru: true,
        address_en: true,
        created_at: true,
      },
    });

    return about;
  }

  async create(data: CreateAboutDto, file: Express.Multer.File) {
    await this.prisma.about.create({
      data: {
        name_uz: data.name_uz,
        name_ru: data.name_ru,
        name_en: data.name_en,
        title_uz: data.title_uz,
        title_ru: data.title_ru,
        title_en: data.title_en,
        image: file?.path,
        phone_number: data.phone_number,
        address_uz: data.address_uz,
        address_ru: data.address_ru,
        address_en: data.address_en,
      },
    });

    return 'About успешно создан!';
  }

  async update(updateAboutDto: UpdateAboutDto, file: Express.Multer.File) {
    const aboutExists = await this.prisma.about.findFirst();
    if (!aboutExists) {
      throw new NotFoundException('');
    }

    await this.prisma.about.update({
      where: {
        id: aboutExists.id,
      },
      data: {
        name_uz: updateAboutDto.name_uz ?? aboutExists.name_uz,
        name_ru: updateAboutDto.name_ru ?? aboutExists.name_ru,
        name_en: updateAboutDto.name_en ?? aboutExists.name_en,
        title_uz: updateAboutDto.title_uz ?? aboutExists.title_uz,
        title_ru: updateAboutDto.title_ru ?? aboutExists.title_ru,
        title_en: updateAboutDto.title_en ?? aboutExists.title_en,
        image: file?.path ?? aboutExists.image,
        phone_number: updateAboutDto.phone_number ?? aboutExists.phone_number,
        address_uz: updateAboutDto.address_uz ?? aboutExists.address_uz,
        address_ru: updateAboutDto.address_ru ?? aboutExists.address_ru,
        address_en: updateAboutDto.address_en ?? aboutExists.address_en,
      },
    });

    return 'About успешно обновлен!';
  }

  async remove(id: number) {
    const about = await this.prisma.about.findUnique({ where: { id } });
    if (!about) throw new NotFoundException('About not found!');
    if (about.image) {
      const imagePath = path.join(__dirname, '..', '..', '..', 'uploads', 'logo', about.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await this.prisma.about.delete({ where: { id } });
    return 'About успешно удален!';
  }

  // --- CONTACT SERVICE METHODS ---
  async createContact(data: CreateContactDto) {
    await this.prisma.contact.create({
      data: {
        title_uz: data.title_uz,
        title_ru: data.title_ru,
        title_en: data.title_en,
        phone_number: data.phone_number,
      },
    });
    return 'Контакт успешно создан!';
  }

  async findAllContacts() {
    return this.prisma.contact.findMany({
      select: {
        id: true,
        title_uz: true,
        title_ru: true,
        title_en: true,
        phone_number: true,
        created_at: true,
      },
    });
  }

  async findOneContact(id: number) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
      select: {
        id: true,
        title_uz: true,
        title_ru: true,
        title_en: true,
        phone_number: true,
        created_at: true,
      },
    });
    if (!contact) throw new NotFoundException('Контакт не найден!');
    return contact;
  }

  async updateContact(id: number, data: UpdateContactDto) {
    const contact = await this.prisma.contact.findUnique({ where: { id } });
    if (!contact) throw new NotFoundException('Контакт не найден!');
    await this.prisma.contact.update({
      where: { id },
      data: {
        title_uz: data.title_uz,
        title_ru: data.title_ru,
        title_en: data.title_en,
      },
    });
    return 'Контакт успешно обновлен!';
  }

  async removeContact(id: number) {
    const contact = await this.prisma.contact.findUnique({
      where: {
        id: id,
      },
    });

    if (!contact) {
      throw new NotFoundException('Контакт не найден!');
    }

    await this.prisma.contact.delete({
      where: {
        id: id,
      },
    });
    return 'Контакт успешно удален!';
  }
}
