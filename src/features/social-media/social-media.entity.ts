import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Umkm } from '../../users/umkm/entities/umkm.entity';

@Entity('social-media')
export class SocialMedia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  username: string;

  @Column('text', { unique: true })
  url: string;

  @ManyToOne(() => Umkm, (umkm) => umkm.socialMedias, { cascade: true })
  umkm: Umkm;
}
