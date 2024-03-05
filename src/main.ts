import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as cookieParser from 'cookie-parser' 
var cookieParser = require('cookie-parser')

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api')
	app.use(cookieParser())
	app.enableCors({
		origin: ['http://localhost:5555'],
		credentials: true,
		exposedHeaders: 'set-cookie'
	})
	await app.listen(7777);
}
bootstrap();
