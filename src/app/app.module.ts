import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Konsumen } from '../users/entities/konsumen.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { KonsumenModule } from '../users/modules/konsumen.module';
import { Otp } from '../utils/otp/otp.entity';
import { EmailModule } from '../utils/email/email.module';
import { Umkm } from 'src/users/entities/umkm.entity';
import { UmkmModule } from 'src/users/modules/umkm.module';
import { Post as PostEntity } from '../features/entities/post.entity';
import { Vote } from 'src/features/entities/vote.entitiy';
import { SocialMedia } from 'src/features/entities/social-media.entity';
import { Category } from 'src/features/entities/category.entity';
import { CategoryModule } from '../features/modules/category.module';
import { PostModule } from '../features/modules/post.module';
import { MulterModule } from '@nestjs/platform-express';
import { FilesUploadModule } from 'src/utils/files-upload/files-upload.module';
import { Hashtag } from 'src/features/entities/hashtag.entity';
import { HashtagModule } from 'src/features/modules/hashtag.module';
import { SocialMediaModule } from 'src/features/modules/social-media.module';
import { VoteModule } from 'src/features/modules/vote.module';

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
    SocialMediaModule,
    VoteModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
