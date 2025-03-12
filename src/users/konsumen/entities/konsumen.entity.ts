import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Umkm } from '../../umkm/entities/umkm.entity';
import { Vote } from '../../../features/vote/vote.entitiy';

@Entity('konsumen')
export class Konsumen {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  konsumenID: string;

  @Column('varchar', { length: 255 })
  @ApiProperty({ example: 'John Doe' })
  displayName: string;

  @Column('varchar', { length: 255, unique: true })
  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;

  @Column('varchar', { length: 255, default: null })
  @ApiProperty({ example: 'johndoe123' })
  password: string;

  @Column('varchar', { length: 100, unique: true, default: null })
  @ApiProperty({ example: 'johndoe01' })
  username: string;

  @OneToOne(() => Umkm, (umkm) => umkm.konsumen, { onDelete: 'CASCADE' })
  @JoinColumn()
  umkm: Umkm;

  @OneToMany(() => Vote, (vote) => vote.konsumen)
  votes: Vote[];
}
