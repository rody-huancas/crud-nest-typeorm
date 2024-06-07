import { Column, Entity, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
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

  @Column({ type: 'timestamptz', nullable: true })
  prod_created: Date;

  @Column({ type: 'timestamptz', nullable: true })
  prod_updated: Date;

  @OneToMany(() => ProductDetail, (productDetail) => productDetail.product, { cascade: true })
  details: ProductDetail[];

  @OneToMany(() => ProductCharacteristics, (productCharacteristics) => productCharacteristics.product, { cascade: true })
  characteristics: ProductCharacteristics[];

  @BeforeInsert()
  @BeforeUpdate()
  beforeCreated() {
    this.prod_created = new Date();
    this.prod_updated = new Date();
  }

  @BeforeUpdate()
  beforeUpdated() {
    this.prod_created = new Date();
  }
}
