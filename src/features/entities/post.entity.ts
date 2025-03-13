import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Umkm } from '../../users/entities/umkm.entity';
import { Vote } from './vote.entitiy';
import { Hashtag } from './hashtag.entity';

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

  @Column('int', { default: 0 })
  upvotes: number;

  @ManyToOne(() => Umkm, (umkm) => umkm.posts, { cascade: true })
  umkm: Umkm;

  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.posts)
  hashtags: Hashtag[];
}
