import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post as PostEntity } from '../entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('hashtag')
export class Hashtag {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: String })
  id: string;

  @Column('varchar', { length: 255 })
  @ApiProperty({ type: String })
  value: string;

  @ManyToMany(() => PostEntity, (post) => post.hashtags)
  posts: PostEntity[];
}
