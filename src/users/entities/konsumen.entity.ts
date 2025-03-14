import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Umkm } from './umkm.entity';
import { Vote } from '../../features/entities/vote.entitiy';

@Entity('konsumen')
export class Konsumen {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: String })
  konsumenID: string;

  @Column('varchar', { length: 255 })
  @ApiProperty({ type: String })
  displayName: string;

  @Column('varchar', { length: 255, unique: true })
  @ApiProperty({ type: String })
  email: string;

  @Column('varchar', { length: 255, default: null })
  @ApiProperty({ type: String })
  password: string;

  @Column('varchar', { length: 100, unique: true, default: null })
  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: Umkm })
  @OneToOne(() => Umkm, (umkm) => umkm.konsumen, { onDelete: 'CASCADE' })
  @JoinColumn()
  umkm?: Umkm;

  @OneToMany(() => Vote, (vote) => vote.konsumen)
  votes: Vote[];
}
