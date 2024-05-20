import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductDetail } from './entities/product-detail.entity';
import { Repository } from 'typeorm';
import { ProductCharacteristics } from './entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
    @InjectRepository(ProductCharacteristics)
    private readonly productCharacteristicsRepository: Repository<ProductCharacteristics>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { characteristics, ...productData } = createProductDto;

    const product = this.productRepository.create(productData);
    await this.productRepository.save(product);

    const productDetail = new ProductDetail();
    productDetail.det_name = product.prod_name;
    productDetail.det_fullname = `${product.prod_name} ${product.prod_detail}`;
    productDetail.det_price_sale = product.prod_price;
    productDetail.product = product;
    await this.productDetailRepository.save(productDetail);

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
      await this.productCharacteristicsRepository.save(productCharacteristics);
    }

    return product;
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
