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
import { Post as PostEntity } from 'src/features/post/post.entity';
import { Vote } from 'src/features/vote/vote.entitiy';
import { SocialMedia } from 'src/features/social-media/social-media.entity';
import { Category } from 'src/features/category/category.entity';
import { CategoryModule } from 'src/features/category/category.module';
import { PostModule } from 'src/features/post/post.module';
import { MulterModule } from '@nestjs/platform-express';
import { FilesUploadModule } from 'src/utils/files-upload/files-upload.module';
import { Hashtag } from 'src/features/hashtag/hashtag.entity';
import { HashtagModule } from 'src/features/hashtag/hashtag.module';

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
      entities: [
        Konsumen,
        Otp,
        Umkm,
        PostEntity,
        Vote,
        SocialMedia,
        Category,
        Hashtag,
      ],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    EmailModule,
    KonsumenModule,
    UmkmModule,
    CategoryModule,
    PostModule,
    FilesUploadModule,
    HashtagModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
