import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Topic } from '../entities/topic.entity';
import { Konsumen } from '../users/konsumen/konsumen.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { KonsumenModule } from '../users/konsumen/konsumen.module';
import { Otp } from '../utils/otp/otp.entity';
import { EmailModule } from '../utils/email/email.module';
import { Umkm } from 'src/users/umkm/umkm.entity';
import { UmkmModule } from 'src/users/umkm/umkm.module';

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
      entities: [Topic, Konsumen, Otp, Umkm],
      synchronize: true,
    }),
    AuthModule,
    EmailModule,
    KonsumenModule,
    UmkmModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
