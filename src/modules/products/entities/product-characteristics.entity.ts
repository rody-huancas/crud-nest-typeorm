import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'product_characteristics' })
export class ProductCharacteristics {
  @PrimaryGeneratedColumn('uuid')
  char_id: string;

  @Column({ type: 'varchar' })
  char_name: string;

  @Column({ type: 'varchar' })
  char_fullname: string;

  @Column({ type: 'decimal' })
  char_price_base: number;

  @Column({ type: 'bool' })
  char_availability: boolean;

  @ManyToOne(() => Product, (product) => product.characteristics)
  product: Product;
}
