import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OperatorTypes, PaginationOptionalDto } from '@enums';
import { prisma } from '@helpers';

const fields = Object.keys(prisma.dictionary.fields); // qaysi table bo'lsa shu tableni nomi qo'yilishi kerak

class DictionaryFilter {
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

class DictionarySort {
  @ApiProperty({ enum: fields })
  @IsIn(fields)
  column: string;

  @IsEnum(Prisma.SortOrder)
  @ApiProperty({ enum: Prisma.SortOrder })
  value: Prisma.SortOrder;
}

export class GetDictionaryDto extends PaginationOptionalDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DictionaryFilter)
  @ApiProperty({ type: DictionaryFilter, isArray: true, required: false })
  filters?: DictionaryFilter[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DictionarySort)
  @ApiProperty({ type: DictionarySort, required: false })
  sort?: DictionarySort;
}
