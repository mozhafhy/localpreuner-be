import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from '../entities/hashtag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag) private hashtagRepository: Repository<Hashtag>,
  ) {}

  creatHashtag(value: string) {
    return this.hashtagRepository.save({ value });
  }
}
