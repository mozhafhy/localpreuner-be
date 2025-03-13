import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Umkm } from '../../users/entities/umkm.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  value: string;

  @ManyToMany(() => Umkm, (umkm) => umkm.categories)
  umkms: Umkm[];
}
