import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Umkm } from '../../users/umkm/entities/umkm.entity';
import { Vote } from '../vote/vote.entitiy';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  postID: string;

  @Column()
  umkmID: string;

  @Column({ nullable: true })
  uploadedMediaURl?: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Umkm, (umkm) => umkm.posts, { cascade: true })
  umkm: Umkm;

  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];
}
