import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAboutDto, UpdateAboutDto, CreateContactDto, UpdateContactDto } from './dto';
import { PrismaService } from '@prisma';
import * as path from 'path';
import * as fs from 'fs';
import { FilePath } from '@constants';

@Injectable()
export class AboutService {
  constructor(private readonly prisma: PrismaService) {}

  async find(lang: string) {
    const about = await this.prisma.about.findFirst({
      select: {
        [`name_${lang}`]: true,
        [`title_${lang}`]: true,
        image: true,
        phone_number: true,
        [`address_${lang}`]: true,
        created_at: true,
      },
    });

    return {
      name: about[`name_${lang}`],
      title: about[`title_${lang}`],
      image: `${FilePath.LOGO}/${about?.image}`,
      phone_number: about?.phone_number,
      address: about[`address_${lang}`],
    };
  }

  async findAdmin() {
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

    return {
      ...about,
      image: `${FilePath.LOGO}/${about?.image}`,
    };
  }

  async create(data: CreateAboutDto, fileName: string) {
    const about = await this.prisma.about.findFirst();
    if (about) {
      throw new BadRequestException('Информация уже существует можно обновить!');
    }

    await this.prisma.about.create({
      data: {
        name_uz: data.name_uz,
        name_ru: data.name_ru,
        name_en: data.name_en,
        title_uz: data.title_uz,
        title_ru: data.title_ru,
        title_en: data.title_en,
        image: fileName,
        phone_number: data.phone_number,
        address_uz: data.address_uz,
        address_ru: data.address_ru,
        address_en: data.address_en,
        email: data.email,
      },
    });

    return 'About успешно создан!';
  }

  async update(data: UpdateAboutDto, fileName: string) {
    const aboutExists = await this.prisma.about.findFirst();
    if (!aboutExists) {
      throw new NotFoundException('');
    }

    if (fileName) {
      const imagePath = path.join(process.cwd(), 'uploads', 'logo', aboutExists.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await this.prisma.about.update({
      where: {
        id: aboutExists.id,
      },
      data: {
        name_uz: data.name_uz ?? aboutExists.name_uz,
        name_ru: data.name_ru ?? aboutExists.name_ru,
        name_en: data.name_en ?? aboutExists.name_en,
        title_uz: data.title_uz ?? aboutExists.title_uz,
        title_ru: data.title_ru ?? aboutExists.title_ru,
        title_en: data.title_en ?? aboutExists.title_en,
        image: fileName ?? aboutExists.image,
        phone_number: data.phone_number ?? aboutExists.phone_number,
        address_uz: data.address_uz ?? aboutExists.address_uz,
        address_ru: data.address_ru ?? aboutExists.address_ru,
        address_en: data.address_en ?? aboutExists.address_en,
        email: data.email ?? aboutExists.email,
      },
    });

    return 'About успешно обновлен!';
  }

  async remove() {
    const about = await this.prisma.about.findFirst();
    if (!about) throw new NotFoundException('Информация не найдена!');
    if (about.image) {
      const imagePath = path.join(process.cwd(), 'uploads', 'logo', about.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await this.prisma.about.delete({
      where: {
        id: about.id,
      },
    });
    return 'About успешно удален!';
  }

  // --- CONTACT SERVICE METHODS ---

  async findAllContacts(lang: string) {
    const contacts = await this.prisma.contact.findMany({
      select: {
        id: true,
        [`title_${lang}`]: true,
        phone_number: true,
        created_at: true,
      },
    });
    return contacts.map((contact) => ({
      id: contact.id,
      title: contact[`title_${lang}`],
      phone_number: contact.phone_number,
      created_at: contact.created_at,
    }));
  }

  async findOneContact(id: number, lang: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
      select: {
        id: true,
        [`title_${lang}`]: true,
        phone_number: true,
        created_at: true,
      },
    });
    if (!contact) throw new NotFoundException('Контакт не найден!');
    return {
      id: contact.id,
      title: contact[`title_${lang}`],
      phone_number: contact.phone_number,
      created_at: contact.created_at,
    };
  }

  async findAllContactsAdmin() {
    const contacts = await this.prisma.contact.findMany({
      select: {
        id: true,
        title_uz: true,
        title_ru: true,
        title_en: true,
        phone_number: true,
        created_at: true,
      },
    });
    return contacts;
  }

  async findOneContactAdmin(id: number) {
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
