import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { PreparationStation, ProductCategory } from '../entities/product.entity';

export class CreateProductDto {
  @ApiProperty({ example: 'Cubeta 6 Cervezas Media' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'BEB-CUB-001' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ enum: ProductCategory, default: ProductCategory.BEER })
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @ApiProperty({ enum: PreparationStation, default: PreparationStation.BAR })
  @IsEnum(PreparationStation)
  preparationStation: PreparationStation;

  @ApiProperty({ example: 220 })
  @IsNumber()
  @Min(0)
  salePrice: number;

  @ApiPropertyOptional({ example: 110 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  costPrice?: number;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsNumber()
  stockQuantity?: number;

  @ApiPropertyOptional({ example: 'PZA' })
  @IsOptional()
  @IsString()
  unitOfMeasure?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imagePublicId?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
