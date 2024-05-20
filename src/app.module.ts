import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UseEnvironmentVariables } from './config/env/env.enable';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './config/env';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    UseEnvironmentVariables,
    TypeOrmModule.forRoot({
      type            : 'postgres',
      host            : DB_HOST,
      port            : +DB_PORT,
      database        : DB_NAME,
      username        : DB_USERNAME,
      password        : DB_PASSWORD,
      autoLoadEntities: true,
      synchronize     : true,
    }),
    ProductsModule,
  ]
})
export class AppModule {}
