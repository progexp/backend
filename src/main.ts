import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: ['http://localhost:3000'],
        credentials: true,
        exposedHeaders: 'set-cookie'
    });
    app.useStaticAssets(join(__dirname, '../../../', 'public'), {
        prefix: '/static/'
    });

    await app.listen(4200);
}

bootstrap();
