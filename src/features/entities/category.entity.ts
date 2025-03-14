import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Umkm } from '../../users/entities/umkm.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true })
  value: string;

  @ManyToMany(() => Umkm, (umkm) => umkm.categories)
  umkms: Umkm[];
}
