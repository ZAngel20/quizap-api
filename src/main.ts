import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // PORT
  const publicPort = 3000;

  // Global pipes and interceptors
  const publicApp = await NestFactory.create(AppModule);
  publicApp.useGlobalPipes(new ValidationPipe());
  publicApp.useGlobalInterceptors(new TransformInterceptor());

  // SWAGGER
  createSwaggerRouter(publicApp, 'Quizzap API');

  await publicApp.listen(publicPort);

  console.log('Started');
}

async function createSwaggerRouter(app: INestApplication, title: string) {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription('API for Quizap App')
    .setVersion('v1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);
}

bootstrap();
