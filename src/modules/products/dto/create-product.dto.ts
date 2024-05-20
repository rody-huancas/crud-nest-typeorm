import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateProductCharacteristicDto } from './create-product-detail.dto copy';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  prod_name: string;

  @IsString()
  @IsOptional()
  prod_detail: string;

  @IsString()
  @IsOptional()
  prod_description: string;

  @IsNumber()
  @IsOptional()
  prod_price: number;

  @IsNumber()
  @IsOptional()
  prod_stock: number;

  @IsBoolean()
  @IsOptional()
  prod_active: boolean;

  @IsOptional()
  characteristics: CreateProductCharacteristicDto[]
}
