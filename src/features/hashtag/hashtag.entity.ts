import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post as PostEntity } from '../post/post.entity';

@Entity('hashtag')
export class Hashtag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  value: string;

  @ManyToMany(() => PostEntity, (post) => post.hashtags)
  posts: PostEntity[];
}
