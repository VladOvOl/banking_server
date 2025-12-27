import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальный префикс
  app.setGlobalPrefix('api');

  // Логгер для входящих запросов
  app.use((req, res, next) => {
    console.log('--- Incoming Request ---');
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Headers:', req.headers);
    next();
  });

  // Логгер для исходящих ответов
  app.use((req, res, next) => {
    const oldSend = res.send;
    res.send = function (body) {
      console.log('--- Outgoing Response ---');
      console.log('Status:', res.statusCode);
      console.log('Headers:', res.getHeaders());
      console.log('Body:', body);
      return oldSend.call(this, body);
    };
    next();
  });

  // Настройка CORS
  app.enableCors({
    origin: [
      'http://localhost:5555',
      'https://banking-server-gilt.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
  });

  // Поддержка кук
  app.use(cookieParser());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5555'); // или твой фронтенд-домен
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });


  await app.listen(7777);
}
bootstrap();

