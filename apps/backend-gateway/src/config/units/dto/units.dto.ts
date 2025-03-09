import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IUnitCreate, IUnitUpdate } from '../interface/units.interface';

export class IUnitCreateDto implements IUnitCreate {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

export class IUnitUpdateDto implements IUnitUpdate {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
