import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { PORT, PUBLIC_URL } from './config/env';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  app.setGlobalPrefix('api/v1');

  await app.listen(PORT, () => {
    logger.log(`[INFO] El servidor se ha iniciado en '${PUBLIC_URL}'`);
  });
}
bootstrap();
