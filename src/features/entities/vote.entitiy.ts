import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../entities/post.entity';
import { Konsumen } from 'src/users/entities/konsumen.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('vote')
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: String })
  id: string;

  @Column('bool', { default: null, nullable: true })
  @ApiProperty({ type: Boolean })
  isUpvote: boolean;

  @Column({ nullable: true })
  @ApiProperty({ type: String })
  konsumenKonsumenID: string;

  @Column({ nullable: true })
  @ApiProperty({ type: String, nullable: true })
  postPostID: string;

  @ManyToOne(() => Konsumen, (konsumen) => konsumen.votes)
  konsumen: Konsumen;

  @ManyToOne(() => Post, (post) => post.votes, { onDelete: 'CASCADE' })
  post: Post;
}
