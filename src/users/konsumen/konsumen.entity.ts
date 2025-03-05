import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topic } from '../../entities/topic.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Umkm } from '../umkm/umkm.entity';

@Entity('konsumen')
export class Konsumen {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  konsumenID: string;

  @Column('varchar', { length: 100 })
  @ApiProperty({ example: 'John Doe' })
  displayName: string;

  @Column('varchar', { length: 255, unique: true })
  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;

  @Column('varchar', { length: 255 })
  @ApiProperty({ example: 'johndoe123' })
  password: string;

  @Column('varchar', { unique: true, length: 100 })
  @ApiProperty({ example: 'johndoe01' })
  username: string;

  @Column('text', { nullable: true })
  @ApiPropertyOptional({ example: 'https://example.com/johndoe.jpg' })
  profileImgURL?: string | undefined;

  @Column({ nullable: true })
  umkmUmkmID: string;

  @OneToOne(() => Umkm, (umkm) => umkm.konsumen, { onDelete: 'CASCADE' })
  @JoinColumn()
  umkm: Umkm;

  @ManyToMany(() => Topic)
  @JoinTable()
  topics: Topic[];
}
