// import { Konsumen } from 'src/users/konsumen.entity';
import { Konsumen } from 'src/users/konsumen.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int4')
  otp: number;

  @Column('timestamp')
  validUntil: Date;

  @OneToOne(() => Konsumen, (konsumen) => konsumen.otp)
  konsumen: Konsumen;
}
