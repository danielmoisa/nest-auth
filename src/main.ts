import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from "helmet";
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.use(helmet());
  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('Nest API')
  .setDescription('Nest API Description')
  .setVersion('1.0')
  .addTag('nestApi')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
