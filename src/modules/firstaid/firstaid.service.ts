import { Injectable } from '@nestjs/common';
import { CreateFirstaidDto } from './dto/create-firstaid.dto';
import { UpdateFirstaidDto } from './dto/update-firstaid.dto';

@Injectable()
export class FirstaidService {
  create(createFirstaidDto: CreateFirstaidDto) {
    return 'This action adds a new firstaid';
  }

  findAll() {
    return `This action returns all firstaid`;
  }

  findOne(id: number) {
    return `This action returns a #${id} firstaid`;
  }

  update(id: number, updateFirstaidDto: UpdateFirstaidDto) {
    return `This action updates a #${id} firstaid`;
  }

  remove(id: number) {
    return `This action removes a #${id} firstaid`;
  }
}
