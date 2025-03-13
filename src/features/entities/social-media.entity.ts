import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Umkm } from '../../users/entities/umkm.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('social_media')
export class SocialMedia {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '7a89dbeb-b01b-4431-b840-e26f021e7fde' })
  id: string;

  @Column('varchar', { length: 255 })
  @ApiProperty({ example: '@johndoe' })
  account: string;

  @Column('text')
  @ApiProperty({ example: 'http://instagram.com/@johndoe' })
  url: string;

  @ManyToOne(() => Umkm, (umkm) => umkm.socialMedias, { cascade: true })
  umkm: Umkm;
}
