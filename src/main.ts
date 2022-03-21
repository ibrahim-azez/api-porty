import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = ['http://localhost:4200', '*'];

  const corsOptions = {
    credentials: true, // This is important.

    origin: (origin, callback) => {
      if (whitelist.includes(origin)) return callback(null, true);

      throw new UnauthorizedException('Not allowed by CORS');
    },
  };

  app.enableCors(corsOptions);

  app.use(helmet());

  app.use(cookieParser());

  const globalPrefix = 'api/v1';

  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
