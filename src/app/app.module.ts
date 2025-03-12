import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Konsumen } from '../users/konsumen/entities/konsumen.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { KonsumenModule } from '../users/konsumen/konsumen.module';
import { Otp } from '../utils/otp/otp.entity';
import { EmailModule } from '../utils/email/email.module';
import { Umkm } from 'src/users/umkm/entities/umkm.entity';
import { UmkmModule } from 'src/users/umkm/umkm.module';
import { Post as PostEntity } from 'src/features/post/post.entitiy';
import { Vote } from 'src/features/vote/vote.entitiy';
import { SocialMedia } from 'src/features/social-media/social-media.entity';
import { Category } from 'src/features/category/category.entity';
import { CategoryModule } from 'src/features/category/category.module';
import { PostModule } from 'src/features/post/post.module';

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
      entities: [Konsumen, Otp, Umkm, PostEntity, Vote, SocialMedia, Category],
      synchronize: true,
    }),
    AuthModule,
    EmailModule,
    KonsumenModule,
    UmkmModule,
    CategoryModule,
    PostModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
