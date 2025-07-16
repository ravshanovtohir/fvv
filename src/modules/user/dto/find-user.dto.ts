import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OperatorTypes, PaginationOptionalDto } from '@enums';
import { prisma } from '@helpers';

const fields = Object.keys(prisma.user.fields); // qaysi table bo'lsa shu tableni nomi qo'yilishi kerak

class UserFilter {
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

class UserSort {
  @ApiProperty({ enum: fields })
  @IsIn(fields)
  column: string;

  @IsEnum(Prisma.SortOrder)
  @ApiProperty({ enum: Prisma.SortOrder })
  value: Prisma.SortOrder;
}

export class FindUserDto extends PaginationOptionalDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserFilter)
  @ApiProperty({ type: UserFilter, isArray: true, required: false })
  filters?: UserFilter[];

  @IsOptional()
  @ValidateNested()
  @Type(() => UserSort)
  @ApiProperty({ type: UserSort, required: false })
  sort?: UserSort;
}
