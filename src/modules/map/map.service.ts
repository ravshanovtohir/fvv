import { Injectable } from '@nestjs/common';
import { CreateMapDto, UpdateMapDto } from './dto';
import { PrismaService } from '@prisma';

@Injectable()
export class MapService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMapDto: CreateMapDto) {
    return 'This action adds a new map';
  }

  findAll() {
    return `This action returns all map`;
  }

  findOne(id: number) {
    return `This action returns a #${id} map`;
  }

  update(id: number, updateMapDto: UpdateMapDto) {
    return `This action updates a #${id} map`;
  }

  remove(id: number) {
    return `This action removes a #${id} map`;
  }
}
