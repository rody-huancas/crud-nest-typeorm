import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'product_detail' })
export class ProductDetail {
  @PrimaryGeneratedColumn('uuid')
  det_id: string;

  @Column({ type: 'varchar' })
  det_name: string;

  @Column({ type: 'varchar' })
  det_fullname: string;

  @Column({ type: 'decimal' })
  det_price_sale: number;

  @ManyToOne(() => Product, (product) => product.details)
  product: Product;
}
