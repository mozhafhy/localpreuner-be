import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Konsumen } from './konsumen.entity';
import { Post } from '../../features/entities/post.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SocialMedia } from '../../features/entities/social-media.entity';
import { Category } from '../../features/entities/category.entity';

@Entity('umkm')
export class Umkm {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: String })
  umkmID: string;

  @Column('text')
  @ApiProperty({ type: String })
  fullname: string;

  @Column('varchar', { length: 16, unique: true })
  @ApiProperty({ type: String })
  nik: string;

  @Column('text')
  @ApiProperty({ type: String })
  fullAddress: string;

  @Column('text')
  @ApiProperty({ type: String })
  province: string;

  @Column('text')
  @ApiProperty({ type: String })
  city: string;

  @Column('text', { nullable: true })
  @ApiPropertyOptional({ type: String, nullable: true })
  profileImg?: string;

  @Column('text', { nullable: true })
  @ApiPropertyOptional({ type: String, nullable: true })
  banner?: string;

  @Column('text', { nullable: true })
  @ApiPropertyOptional({ type: String, nullable: true })
  description: string;

  @OneToOne(() => Konsumen, (konsumen) => konsumen.umkm, {
    cascade: true,
  })
  konsumen: Konsumen;

  @ApiPropertyOptional({ type: Post, isArray: true })
  @OneToMany(() => Post, (posts) => posts.umkm)
  posts: Post[];

  @ApiPropertyOptional({ type: SocialMedia, isArray: true })
  @OneToMany(() => SocialMedia, (socialMedia) => socialMedia.umkm, {
    onDelete: 'CASCADE',
  })
  socialMedias?: SocialMedia[];

  @ApiPropertyOptional({ type: Category, isArray: true })
  @ManyToMany(() => Category, (category) => category.umkms)
  @JoinTable()
  categories: Category[];
}
