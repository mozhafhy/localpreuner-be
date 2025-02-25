import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Konsumen } from './konsumen.entity';

@Entity()
export class Topik {
  @PrimaryGeneratedColumn('uuid')
  idTopik: string;

  @Column('text')
  nama: string;

  @ManyToMany(() => Konsumen)
  daftarKonsumen: Konsumen[];
}
