import { DISTRICTS, REGIONS } from '@constants';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
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
    process.exit(1);
  }
}
// '\МИРЗАЧ�167Л ТУМАНИ'

// seed();
