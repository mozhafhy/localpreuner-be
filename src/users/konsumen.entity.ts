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

@Entity('konsumen')
export class Konsumen {
  @PrimaryGeneratedColumn('uuid')
  idKonsumen: string;

  @Column()
  namaLengkap: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column('text', { unique: true })
  username: string;

  @Column('text')
  fotoProfilURL: string;

  @Column('int4', { default: 0 })
  totalFollowers: number;

  @ManyToMany(() => Topik)
  @JoinTable()
  daftarTopik: Topik[];

  @OneToOne(() => Otp, (otp) => otp.konsumen)
  @JoinColumn()
  otp: Otp;
}
