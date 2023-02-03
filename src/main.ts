import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  const config = new DocumentBuilder()
  .setTitle('Nest API')
  .setDescription('Nest API Description')
  .setVersion('1.0')
  .addTag('nestApi')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('swagger', app, document);

  await app.listen(8080);
}
bootstrap();
