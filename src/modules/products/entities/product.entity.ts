import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductDetail } from './product-detail.entity';
import { ProductCharacteristics } from './product-characteristics.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  prod_id: string;

  @Column({ type: 'varchar' })
  prod_name: string;

  @Column({ type: 'varchar' })
  prod_detail: string;

  @Column({ type: 'varchar' })
  prod_description: string;

  @Column({ type: 'decimal' })
  prod_price: number;

  @Column({ type: 'int' })
  prod_stock: number;

  @Column({ type: 'bool' })
  prod_active: boolean;

  @OneToMany(() => ProductDetail, (productDetail) => productDetail.product)
  details: ProductDetail[];

  @OneToMany(() => ProductCharacteristics, (productCharacteristics) => productCharacteristics.product)
  characteristics: ProductCharacteristics[];
}
