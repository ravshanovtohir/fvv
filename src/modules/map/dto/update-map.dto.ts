import { IsString, IsObject, ValidateNested, IsArray, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class GeometryDto {
  @IsOptional()
  @IsEnum(['Point', 'LineString', 'Polygon'])
  type: 'Point' | 'LineString' | 'Polygon';

  @IsArray()
  coordinates: any;
}

export class UpdateMapDto {
  @IsOptional()
  @IsString()
  category_id?: number;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => GeometryDto)
  geometry?: GeometryDto;
}
