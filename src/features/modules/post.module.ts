import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post as PostEntity } from '../entities/post.entity';
import { PostService } from '../services/post.service';
import { PostController } from '../controllers/post.controller';
import { Konsumen } from 'src/users/entities/konsumen.entity';
import { Umkm } from 'src/users/entities/umkm.entity';
import { Hashtag } from '../entities/hashtag.entity';
import { HashtagService } from '../services/hashtag.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, Konsumen, Umkm, Hashtag])],
  controllers: [PostController],
  providers: [PostService, HashtagService],
  exports: [PostService, HashtagService],
})
export class PostModule {}
