import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Konsumen } from '../../konsumen/entities/konsumen.entity';
import { Post } from '../../../features/post/post.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SocialMedia } from '../../../features/social-media/social-media.entity';
import { Category } from '../../../features/category/category.entity';

@Entity('umkm')
export class Umkm {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  umkmID: string;

  @Column('text')
  @ApiProperty({ example: 'John Doe' })
  fullname: string;

  @Column('varchar', { length: 16, unique: true })
  @ApiProperty({ example: '1234567890123456' })
  nik: string;

  @Column('text')
  @ApiProperty({ example: 'Jl. Jalan-Jalan No. 2' })
  fullAddress: string;

  @Column('text')
  @ApiProperty({ example: 'Jawa Timur' })
  province: string;

  @Column('text')
  @ApiProperty({ example: 'Malang' })
  city: string;

  @Column('text', { nullable: true })
  @ApiPropertyOptional({ example: 'https://example.com/profile.png' })
  profileImgURL?: string;

  @Column('text', { nullable: true })
  @ApiPropertyOptional({ example: 'https://example.com/banner.png' })
  bannerURL?: string;

  @Column('text', { nullable: true })
  description?: string;

  @OneToOne(() => Konsumen, (konsumen) => konsumen.umkm, {
    cascade: true,
  })
  konsumen: Konsumen;

  @OneToMany(() => Post, (posts) => posts.umkm)
  posts: Post[];

  @OneToMany(() => SocialMedia, (socialMedia) => socialMedia.umkm, {
    onDelete: 'CASCADE',
  })
  socialMedias?: SocialMedia[];

  @ManyToMany(() => Category, (category) => category.umkms)
  @JoinTable()
  categories: Category[];
}
