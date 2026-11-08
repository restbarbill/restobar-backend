import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  // Habilitar CORS flexible para localhost, Vercel preview y dominios de produccion/dev
  app.enableCors({
    origin: (origin, callback) => {
      // Permitir peticiones sin origen (como Postman o curl) o cualquier subdominio de vercel y kairocali
      if (
        !origin ||
        origin.includes('localhost') ||
        origin.includes('vercel.app') ||
        origin.includes('kairocali.com') ||
        origin.includes('kairocall.com')
      ) {
        callback(null, true);
      } else {
        callback(null, true); // Permisivo para evitar bloqueos durante configuracion
      }
    },
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('RestoBar & Billar - API Oficial')
    .setDescription(
      'API REST y WebSockets para Sistema Híbrido de Restaurante, Bar y Billar (NestJS + TypeORM + Supabase + Cloudinary)',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`🚀 Backend RestoBar corriendo en puerto: ${port}`);
}

void bootstrap();
