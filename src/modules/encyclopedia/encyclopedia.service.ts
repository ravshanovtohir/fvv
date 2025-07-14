import { Injectable } from '@nestjs/common';
import { CreateEncyclopediaDto } from './dto/create-encyclopedia.dto';
import { UpdateEncyclopediaDto } from './dto/update-encyclopedia.dto';

@Injectable()
export class EncyclopediaService {
  create(createEncyclopediaDto: CreateEncyclopediaDto) {
    return 'This action adds a new encyclopedia';
  }

  findAll() {
    return `This action returns all encyclopedia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} encyclopedia`;
  }

  update(id: number, updateEncyclopediaDto: UpdateEncyclopediaDto) {
    return `This action updates a #${id} encyclopedia`;
  }

  remove(id: number) {
    return `This action removes a #${id} encyclopedia`;
  }
}
