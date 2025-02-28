import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topik } from '../entities/topik.entity';
import { Otp } from 'src/entities/otp.entity';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('konsumen')
export class Konsumen {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  idKonsumen: string;

  @Column()
  @ApiProperty({ example: 'John Doe' })
  namaLengkap: string;

  @Column('varchar', { length: 255 })
  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;

  @Column('varchar', { length: 255 })
  @ApiProperty({ example: 'johndoe123' })
  password: string;

  @Column('text', { unique: true })
  @ApiProperty({ example: 'johndoe01' })
  username: string;

  @Column('text')
  @IsOptional({ always: true })
  @ApiProperty({ example: 'https://example.com/johndoe.jpg' })
  fotoProfilURL?: string | undefined;

  @ManyToMany(() => Topik)
  @JoinTable()
  daftarTopik: Topik[];

  @OneToOne(() => Otp, (otp) => otp.konsumen)
  @JoinColumn()
  otp: Otp;
}
