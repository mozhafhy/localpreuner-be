import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Konsumen } from '../konsumen/konsumen.entity';
import { Post } from './posts/post.entitiy';

@Entity('umkm')
export class Umkm {
  @PrimaryGeneratedColumn('uuid')
  umkmID: string;

  @Column('text')
  fullname: string;

  @Column('varchar', { length: 16, unique: true })
  nik: string;

  @Column('text')
  ktpPhotoURL: string;

  @Column('text')
  fullAddress: string;

  @Column('text')
  province: string;

  @Column('text')
  city: string;

  @Column('char', { length: 12 })
  phone: string;

  @Column('text', { nullable: true })
  bannerURL?: string;

  @OneToOne(() => Konsumen, (konsumen) => konsumen.umkm, { cascade: true })
  konsumen: Konsumen;

  @OneToMany(() => Post, (posts) => posts.umkm)
  posts: Post[];
}
