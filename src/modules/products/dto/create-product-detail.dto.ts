import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDetailDto {
  @IsString()
  @IsOptional()
  det_name: string;

  @IsString()
  @IsOptional()
  det_fullname: string;

  @IsNumber()
  @IsOptional()
  det_price_sale: number;
}
