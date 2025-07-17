import { DISTRICTS, REGIONS } from './../../common/constants/index';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function seedRegionAndDistrict() {
  try {
    await prisma.$transaction([
      ...REGIONS.map((region) =>
        prisma.region.create({
          data: {
            id: region.id,
            name_uz: region.name_uz,
            name_ru: region.name_ru,
            name_en: region.name_en,
          },
        }),
      ),
      ...DISTRICTS.map((district) =>
        prisma.district.create({
          data: {
            id: district.id,
            name_uz: district.name_uz,
            name_ru: district.name_ru,
            name_en: district.name_en,
            region_id: district.regionId,
          },
        }),
      ),
    ]);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const seedAdmin = async () => {
  try {
    await prisma.staff.create({
      data: {
        full_name: 'Adminov Admin Adminovich',
        login: 'admin',
        password: await bcrypt.hash('admin123', 10),
      },
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// seedRegionAndDistrict();
// seedAdmin();
