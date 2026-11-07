import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../../../common/entities/base.entity';

export enum ProductCategory {
  FOOD = 'FOOD',
  BEER = 'BEER',
  COCKTAIL = 'COCKTAIL',
  BOTTLE = 'BOTTLE',
  SNACK = 'SNACK',
  PROMO_PACKAGE = 'PROMO_PACKAGE',
}

export enum PreparationStation {
  NONE = 'NONE',
  KITCHEN = 'KITCHEN',
  BAR = 'BAR',
}

@Entity('products')
export class Product extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  sku: string;

  @Column({ type: 'enum', enum: ProductCategory, default: ProductCategory.BEER })
  category: ProductCategory;

  @Column({
    name: 'preparation_station',
    type: 'enum',
    enum: PreparationStation,
    default: PreparationStation.BAR,
  })
  preparationStation: PreparationStation;

  @Column({ name: 'sale_price', type: 'numeric', precision: 12, scale: 2 })
  salePrice: number;

  @Column({ name: 'cost_price', type: 'numeric', precision: 12, scale: 2, default: 0 })
  costPrice: number;

  @Column({ name: 'stock_quantity', type: 'numeric', precision: 12, scale: 2, default: 0 })
  stockQuantity: number;

  @Column({ name: 'unit_of_measure', type: 'varchar', length: 20, default: 'PZA' })
  unitOfMeasure: string;

  @Column({ name: 'image_url', type: 'varchar', nullable: true })
  imageUrl?: string | null;

  @Column({ name: 'image_public_id', type: 'varchar', nullable: true })
  imagePublicId?: string | null;

  @Column({ name: 'is_available', type: 'boolean', default: true })
  isAvailable: boolean;
}
