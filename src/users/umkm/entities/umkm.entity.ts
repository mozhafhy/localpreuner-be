import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Konsumen } from '../../konsumen/entities/konsumen.entity';
import { Post } from './post.entitiy';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SocialMedia } from './social-media.entity';

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
  @ApiProperty({ example: 'https://example.com/ktp.png' })
  ktpPhotoURL: string;

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

  @Column('text')
  socialMediaId: string;

  @Column('text')
  category: string;

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
}
