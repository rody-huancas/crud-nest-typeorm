import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductCharacteristicDto {
  @IsOptional()
  @IsString()
  char_name: string;

  @IsString()
  @IsNumber()
  char_price_base: number;
  
  @IsOptional()
  @IsBoolean()
  char_availability: boolean;
}
