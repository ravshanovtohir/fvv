import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto, CreateDistrictDto, UpdateRegionDto, UpdateDistrictDto } from './dto';
import { PrismaService } from '@prisma';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllRegions() {
    return this.prisma.region.findMany({
      select: {
        id: true,
        name_uz: true,
        name_ru: true,
        name_en: true,
        created_at: true,
      },
    });
  }

  async findAllDistricts() {
    return this.prisma.district.findMany({
      select: {
        id: true,
        name_uz: true,
        name_ru: true,
        name_en: true,
        region: {
          select: {
            id: true,
            name_uz: true,
            name_ru: true,
            name_en: true,
          },
        },
        created_at: true,
      },
    });
  }

  async findAllRegion(lang: string) {
    const regions = await this.prisma.region.findMany({
      select: {
        id: true,
        [`name_${lang}`]: true,
        created_at: true,
      },
    });

    return regions.map((region) => ({
      ...region,
      name: region[`name_${lang}`],
    }));
  }

  async findAllDistrict(regionId: number, lang: string) {
    const districts = await this.prisma.district.findMany({
      where: {
        region_id: regionId,
      },
      select: {
        id: true,
        [`name_${lang}`]: true,
        created_at: true,
      },
    });

    return districts.map((district) => ({
      ...district,
      name: district[`name_${lang}`],
    }));
  }

  async createRegion(data: CreateRegionDto) {
    await this.prisma.region.create({
      data: {
        name_uz: data.name_uz,
        name_ru: data.name_ru,
        name_en: data.name_en,
      },
    });

    return 'Регион успешно создан';
  }

  async createDistrict(data: CreateDistrictDto) {
    await this.prisma.district.create({
      data: {
        name_uz: data.name_uz,
        name_ru: data.name_ru,
        name_en: data.name_en,
        region_id: data.region_id,
      },
    });

    return 'Район успешно создан';
  }

  async findOneRegion(id: number) {
    const region = await this.prisma.region.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name_uz: true,
        name_ru: true,
        name_en: true,
      },
    });

    if (!region) {
      throw new NotFoundException('Регион не найден');
    }

    return region;
  }

  async findOneDistrict(id: number) {
    const district = await this.prisma.district.findUnique({
      where: { id },
      select: {
        id: true,
        name_uz: true,
        name_ru: true,
        name_en: true,
        region: {
          select: {
            id: true,
            name_uz: true,
            name_ru: true,
            name_en: true,
          },
        },
      },
    });

    if (!district) {
      throw new NotFoundException('Район не найден');
    }

    return district;
  }

  async updateRegion(id: number, data: UpdateRegionDto) {
    const regionExists = await this.prisma.region.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name_uz: true,
        name_ru: true,
        name_en: true,
      },
    });

    if (!regionExists) {
      throw new NotFoundException('Регион не найден');
    }

    await this.prisma.region.update({
      where: {
        id: regionExists.id,
      },
      data: {
        name_uz: data.name_uz ?? regionExists.name_uz,
        name_ru: data.name_ru ?? regionExists.name_ru,
        name_en: data.name_en ?? regionExists.name_en,
      },
    });

    return 'Регион успешно обновлен';
  }

  async updateDistrict(id: number, data: UpdateDistrictDto) {
    const districtExists = await this.prisma.district.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name_uz: true,
        name_ru: true,
        name_en: true,
        region_id: true,
      },
    });

    if (!districtExists) {
      throw new NotFoundException('Район не найден');
    }

    await this.prisma.district.update({
      where: {
        id: districtExists.id,
      },
      data: {
        name_uz: data.name_uz ?? districtExists.name_uz,
        name_ru: data.name_ru ?? districtExists.name_ru,
        name_en: data.name_en ?? districtExists.name_en,
        region_id: data.region_id ?? districtExists.region_id,
      },
    });

    return 'Район успешно обновлен';
  }

  async removeRegion(id: number) {
    const regionExists = await this.prisma.region.findUnique({
      where: {
        id: id,
      },
    });

    if (!regionExists) {
      throw new NotFoundException('Регион не найден');
    }

    await this.prisma.region.delete({
      where: {
        id: regionExists.id,
      },
    });

    return 'Регион успешно удален';
  }

  async removeDistrict(id: number) {
    const districtExists = await this.prisma.district.findUnique({
      where: {
        id: id,
      },
    });

    if (!districtExists) {
      throw new NotFoundException('Район не найден');
    }

    await this.prisma.district.delete({
      where: {
        id: districtExists.id,
      },
    });

    return 'Район успешно удален';
  }
}
