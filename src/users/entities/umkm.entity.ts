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
  @ApiProperty({ example: '7a89dbeb-b01b-4431-b840-e26f021e7fde' })
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
  profileImg?: string;

  @Column('text', { nullable: true })
  @ApiPropertyOptional({ example: 'https://example.com/banner.png' })
  banner?: string;

  @Column('text', { nullable: true })
  description: string;

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
