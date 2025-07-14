import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OperatorTypes, PaginationOptionalDto } from '@enums';
import { prisma } from '@helpers';

const fields = Object.keys(prisma.firstAid.fields); // qaysi table bo'lsa shu tableni nomi qo'yilishi kerak

class FirstaidFilter {
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

class FirstaidSort {
  @ApiProperty({ enum: fields })
  @IsIn(fields)
  column: string;

  @IsEnum(Prisma.SortOrder)
  @ApiProperty({ enum: Prisma.SortOrder })
  value: Prisma.SortOrder;
}

export class GetFirstaidDto extends PaginationOptionalDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FirstaidFilter)
  @ApiProperty({ type: FirstaidFilter, isArray: true, required: false })
  filters?: FirstaidFilter[];

  @IsOptional()
  @ValidateNested()
  @Type(() => FirstaidSort)
  @ApiProperty({ type: FirstaidSort, required: false })
  sort?: FirstaidSort;
}
