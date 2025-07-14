import { PartialType } from '@nestjs/swagger';
import { CreateFirstaidDto } from './create-firstaid.dto';

export class UpdateFirstaidDto extends PartialType(CreateFirstaidDto) {}
