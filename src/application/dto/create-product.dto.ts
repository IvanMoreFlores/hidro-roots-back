import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price_real: number;

  @IsNumber()
  @IsOptional()
  price_offert?: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  description_short: string;

  @IsString()
  @IsNotEmpty()
  description_long: string;

  @IsBoolean()
  @IsOptional()
  flagOffert?: boolean;

  @IsBoolean()
  @IsOptional()
  flagSend?: boolean;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true }) // Valida que cada elemento del array sea un string
  @IsNotEmpty()
  images: string[];

  @IsString()
  @IsNotEmpty()
  category: string;
}
