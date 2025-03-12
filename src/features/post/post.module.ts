import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post as PostEntity } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Konsumen } from 'src/users/konsumen/entities/konsumen.entity';
import { Umkm } from 'src/users/umkm/entities/umkm.entity';
import { Hashtag } from '../hashtag/hashtag.entity';
import { HashtagService } from '../hashtag/hashtag.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, Konsumen, Umkm, Hashtag])],
  controllers: [PostController],
  providers: [PostService, HashtagService],
  exports: [PostService, HashtagService],
})
export class PostModule {}
