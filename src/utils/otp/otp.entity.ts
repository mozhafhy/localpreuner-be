// import { Konsumen } from 'src/users/konsumen.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  email: string;

  @Column()
  secret: string;

  @Column('timestamp')
  expires: Date;
}
