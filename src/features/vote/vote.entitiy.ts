import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Konsumen } from 'src/users/konsumen/entities/konsumen.entity';

@Entity('vote')
@Unique(['konsumen', 'post'])
export class Vote {
  @PrimaryGeneratedColumn()
  voteID: string;

  @Column('int', { default: 0 })
  value: number;

  @ManyToOne(() => Konsumen, (konsumen) => konsumen.votes)
  konsumen: Konsumen;

  @ManyToOne(() => Post, (post) => post.votes, { onDelete: 'CASCADE' })
  post: Post;
}
