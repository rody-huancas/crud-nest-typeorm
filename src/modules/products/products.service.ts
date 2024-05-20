import { Product } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { ProductDetail } from './entities/product-detail.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProductCharacteristics } from './entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { characteristics, ...productData } = createProductDto;

      // Crear y guardar el producto
      const product = this.productRepository.create(productData);
      await queryRunner.manager.save(product);

      // Crear y guardar el detalle del producto
      const productDetail = new ProductDetail();
      productDetail.det_name = product.prod_name;
      productDetail.det_fullname = `${product.prod_name} ${product.prod_detail}`;
      productDetail.det_price_sale = product.prod_price;
      productDetail.product = product;
      await queryRunner.manager.save(productDetail);

      // Crear y guardar las características del producto
      if (characteristics && characteristics.length > 0) {
        const productCharacteristics = characteristics.map(char => {
          const productCharacteristic = new ProductCharacteristics();
          productCharacteristic.char_name = char.char_name;
          productCharacteristic.char_fullname = `${product.prod_name} ${char.char_name}`;
          productCharacteristic.char_price_base = char.char_price_base;
          productCharacteristic.char_availability = char.char_availability;
          productCharacteristic.product = product;
          return productCharacteristic;
        });
        await queryRunner.manager.save(productCharacteristics);
      }

      await queryRunner.commitTransaction();
      return product;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
