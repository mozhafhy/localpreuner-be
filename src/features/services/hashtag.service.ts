import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from '../entities/hashtag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag) private hashtagRepository: Repository<Hashtag>,
  ) {}

  async creatHashtag(caption: string) {
    if (!caption) return caption;
    const hashtag = this.findHashtags(caption);
    if (hashtag) {
      return Promise.all(
        hashtag.map((value) => this.hashtagRepository.save({ value })),
      );
    }
  }

  async deleteHashtag(hashtag: Hashtag) {
    await this.hashtagRepository.remove(hashtag);
  }

  findHashtags(text: string): string[] {
    const regex = /#[a-zA-Z0-9_]+/g;
    const matches = text.match(regex);
    return matches!;
  }
}
