import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from '../entities/vote.entitiy';
import { VoteService } from '../services/vote.service';
import { Konsumen } from 'src/users/entities/konsumen.entity';
import { Post as PostEntity } from '../entities/post.entity';
import { VoteController } from '../controllers/vote.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Konsumen, PostEntity])],
  providers: [VoteService],
  exports: [VoteService],
  controllers: [VoteController],
})
export class VoteModule {}
