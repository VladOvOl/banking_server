import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальный префикс для всех роутов
  app.setGlobalPrefix('api');

  // Настройка CORS
  app.enableCors({
    origin: [
      'http://localhost:5555',          // локальный фронтенд
      'https://banking-server-gilt.vercel.app', // продакшн фронтенд
    ],
    credentials: true, // разрешаем куки/авторизацию
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
  });

  // Поддержка работы с куками
  app.use(cookieParser.default());

  await app.listen(7777);
}
bootstrap();
