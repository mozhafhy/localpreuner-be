import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Konsumen } from '../konsumen/konsumen.entity';
import { Post } from './posts/post.entitiy';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  @Column('char', { length: 12 })
  @ApiProperty({ example: '081234567890' })
  phone: string;

  @Column('text', { nullable: true })
  @ApiPropertyOptional({ example: 'https://example.com/banner.png' })
  bannerURL?: string;

  @OneToOne(() => Konsumen, (konsumen) => konsumen.umkm, { cascade: true })
  konsumen: Konsumen;

  @OneToMany(() => Post, (posts) => posts.umkm)
  posts: Post[];
}
