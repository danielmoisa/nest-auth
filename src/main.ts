import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  const config = new DocumentBuilder()
  .setTitle('Nest RPG')
  .setDescription('API description')
  .setVersion('1.0')
  .addTag('nest')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('swagger', app, document);

  await app.listen(8080);
}
bootstrap();
