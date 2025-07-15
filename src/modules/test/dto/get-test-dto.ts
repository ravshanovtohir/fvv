import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OperatorTypes, PaginationOptionalDto } from '@enums';
import { prisma } from '@helpers';

const fields = Object.keys(prisma.test.fields); // Test model fields

class TestFilter {
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

class TestSort {
  @ApiProperty({ enum: fields })
  @IsIn(fields)
  column: string;

  @IsEnum(Prisma.SortOrder)
  @ApiProperty({ enum: Prisma.SortOrder })
  value: Prisma.SortOrder;
}

export class GetTestDto extends PaginationOptionalDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestFilter)
  @ApiProperty({ type: TestFilter, isArray: true, required: false })
  filters?: TestFilter[];

  @IsOptional()
  @ValidateNested()
  @Type(() => TestSort)
  @ApiProperty({ type: TestSort, required: false })
  sort?: TestSort;
}
