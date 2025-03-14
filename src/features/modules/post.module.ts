import { BadRequestException, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post as PostEntity } from '../entities/post.entity';
import { PostService } from '../services/post.service';
import { PostController } from '../controllers/post.controller';
import { Konsumen } from 'src/users/entities/konsumen.entity';
import { Umkm } from 'src/users/entities/umkm.entity';
import { Hashtag } from '../entities/hashtag.entity';
import { HashtagService } from '../services/hashtag.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { BadRequestMessage } from 'src/commons/enums/response-message.enum';

const uploadDir = join(process.cwd(), 'uploads');

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, Konsumen, Umkm, Hashtag]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${Date.now()}${ext}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'video/mp4'
        ) {
          cb(null, true);
        } else {
          cb(new BadRequestException(BadRequestMessage.FILE_UPLOAD), false);
        }
      },
    }),
  ],
  controllers: [PostController],
  providers: [PostService, HashtagService],
  exports: [PostService, HashtagService],
})
export class PostModule {}
