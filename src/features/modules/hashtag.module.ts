import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from '../entities/hashtag.entity';
import { HashtagService } from '../services/hashtag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag])],
  providers: [HashtagService],
  exports: [HashtagService],
})
export class HashtagModule {}
