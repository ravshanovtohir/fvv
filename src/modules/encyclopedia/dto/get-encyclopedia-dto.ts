import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OperatorTypes, PaginationOptionalDto } from '@enums';
import { prisma } from '@helpers';

const fields = Object.keys(prisma.encyclopedia.fields); // qaysi table bo'lsa shu tableni nomi qo'yilishi kerak

class EncyclopediaFilter {
  @IsIn(fields)
  @ApiProperty({ enum: fields })
  column: string;

  @IsEnum(OperatorTypes)
  @ApiProperty({ enum: OperatorTypes })
  operator: OperatorTypes;

  @IsString()
  @ApiProperty({ type: String })
  value: string;
}

class EncyclopediaSort {
  @ApiProperty({ enum: fields })
  @IsIn(fields)
  column: string;

  @IsEnum(Prisma.SortOrder)
  @ApiProperty({ enum: Prisma.SortOrder })
  value: Prisma.SortOrder;
}

export class GetEncyclopediaDto extends PaginationOptionalDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EncyclopediaFilter)
  @ApiProperty({ type: EncyclopediaFilter, isArray: true, required: false })
  filters?: EncyclopediaFilter[];

  @IsOptional()
  @ValidateNested()
  @Type(() => EncyclopediaSort)
  @ApiProperty({ type: EncyclopediaSort, required: false })
  sort?: EncyclopediaSort;
}
