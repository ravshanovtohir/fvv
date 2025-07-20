import { IsString, IsObject, ValidateNested, IsArray, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

class GeometryDto {
  @IsEnum(['Point', 'LineString', 'Polygon'])
  type: 'Point' | 'LineString' | 'Polygon';

  @IsArray()
  coordinates: any;
}

export class CreateMapDto {
  @IsString()
  category_id: number;

  @IsObject()
  @ValidateNested()
  @Type(() => GeometryDto)
  geometry: GeometryDto;
}
