import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OperatorTypes, PaginationOptionalDto } from '@enums';
import { prisma } from '@helpers';

const fields = Object.keys(prisma.map.fields); // qaysi table bo'lsa shu tableni nomi qo'yilishi kerak

class MapFilter {
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

class MapSort {
  @ApiProperty({ enum: fields })
  @IsIn(fields)
  column: string;

  @IsEnum(Prisma.SortOrder)
  @ApiProperty({ enum: Prisma.SortOrder })
  value: Prisma.SortOrder;
}

export class GetMapsDto extends PaginationOptionalDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MapFilter)
  @ApiProperty({ type: MapFilter, isArray: true, required: false })
  filters?: MapFilter[];

  @IsOptional()
  @ValidateNested()
  @Type(() => MapSort)
  @ApiProperty({ type: MapSort, required: false })
  sort?: MapSort;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @Type(() => Number)
  category_id?: number;
}
