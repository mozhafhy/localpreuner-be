import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../entities/post.entity';
import { Konsumen } from 'src/users/entities/konsumen.entity';

@Entity('vote')
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bool', { default: null, nullable: true })
  isUpvote: boolean;

  @Column({ nullable: true })
  konsumenKonsumenID: string;

  @Column({ nullable: true })
  postPostID: string;

  @ManyToOne(() => Konsumen, (konsumen) => konsumen.votes)
  konsumen: Konsumen;

  @ManyToOne(() => Post, (post) => post.votes, { onDelete: 'CASCADE' })
  post: Post;
}
