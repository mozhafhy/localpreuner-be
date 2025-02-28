import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Topik } from './entities/topik.entity';
import { Konsumen } from './users/konsumen.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
// import { JwtModule } from '@nestjs/jwt';
// import { JwtModule } from './jwt/jwt.module';
import { KonsumenModule } from './users/konsumen.module';
import { Otp } from './entities/otp.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Topik, Konsumen, Otp],
      synchronize: true,
    }),
    AuthModule,
    EmailModule,
    KonsumenModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
