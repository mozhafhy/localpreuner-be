import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topic } from '../entities/topic.entity';
import { Otp } from 'src/entities/otp.entity';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('konsumen')
export class Konsumen {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  konsumenID: string;

  @Column('varchar', { length: 100 })
  @ApiProperty({ example: 'John Doe' })
  displayName: string;

  @Column('varchar', { length: 255 })
  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;

  @Column('varchar', { length: 255 })
  @ApiProperty({ example: 'johndoe123' })
  password: string;

  @Column('varchar', { unique: true, length: 100 })
  @ApiProperty({ example: 'johndoe01' })
  username: string;

  @Column('text', { nullable: true })
  @IsOptional({ always: true })
  @ApiProperty({ example: 'https://example.com/johndoe.jpg' })
  profileImgURL?: string | undefined;

  @ManyToMany(() => Topic)
  @JoinTable()
  daftarTopic: Topic[];

  @OneToOne(() => Otp, (otp) => otp.konsumen)
  @JoinColumn()
  otp: Otp;
}
