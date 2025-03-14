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
import { ApiProperty } from '@nestjs/swagger';

@Entity('post')
export class Post {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn('uuid')
  postID: string;

  @ApiProperty({ type: String })
  @Column()
  media: string;

  @ApiProperty({ type: String })
  @Column('text')
  description: string;

  @ApiProperty({ type: Date })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: Number })
  @Column('int', { default: 0 })
  upvotes: number;

  @ApiProperty({ type: Number })
  @Column('int', { default: 0 })
  downvotes: number;

  @ManyToOne(() => Umkm, (umkm) => umkm.posts, { cascade: true })
  umkm: Umkm;

  @ApiProperty({ type: Vote, isArray: true })
  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  @ApiProperty({ type: Hashtag, isArray: true })
  @ManyToMany(() => Hashtag, (hashtag) => hashtag.posts)
  hashtags: Hashtag[];
}
