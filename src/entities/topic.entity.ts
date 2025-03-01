import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Konsumen } from '../users/konsumen.entity';

@Entity('topik')
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  topicID: string;

  @Column('text')
  nama: string;

  @ManyToMany(() => Konsumen)
  konsumenList: Konsumen[];
}
