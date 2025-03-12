import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Umkm } from '../../users/umkm/entities/umkm.entity';
import { Vote } from '../vote/vote.entitiy';
import { Hashtag } from '../hashtag/hashtag.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  postID: string;

  @Column()
  media: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Umkm, (umkm) => umkm.posts, { cascade: true })
  umkm: Umkm;

  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.posts)
  hashtags: Hashtag[];
}
