import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

// import { environment } from '../environments/environment';
import { UserModule } from './user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.development'],
    }),
    UserModule,

    MongooseModule.forRootAsync({
      connectionName: 'porty',
      useFactory: () => ({
        uri: process.env.DATABASE_CONNECTION,
      }),
    }),

    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        ttl: 360,
        limit: 20,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
