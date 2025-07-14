import { PartialType } from '@nestjs/swagger';
import { CreateEncyclopediaDto } from './create-encyclopedia.dto';

export class UpdateEncyclopediaDto extends PartialType(CreateEncyclopediaDto) {}
