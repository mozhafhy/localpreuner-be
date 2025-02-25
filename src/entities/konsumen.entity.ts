import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topik } from './topik.entity';

@Entity()
export class Konsumen {
  @PrimaryGeneratedColumn('uuid')
  idKonsumen: string;

  @Column()
  namaLengkap: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column('text')
  username: string;

  @Column('text')
  fotoProfilURL: string;

  @Column('int4')
  totalFollowers: number;

  @ManyToMany(() => Topik)
  @JoinTable()
  daftarTopik: Topik[];
}
