import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Umkm } from '../../users/entities/umkm.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('social_media')
export class SocialMedia {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: String })
  id: string;

  @Column('varchar', { length: 255 })
  @ApiProperty({ type: String })
  account: string;

  @Column('text')
  @ApiProperty({ type: String })
  url: string;

  @ManyToOne(() => Umkm, (umkm) => umkm.socialMedias, { cascade: true })
  umkm: Umkm;
}
