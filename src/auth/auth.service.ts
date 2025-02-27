import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { Konsumen } from 'src/users/konsumen.entity';
import { KonsumenService } from 'src/users/konsumen.service';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
    private konsumenService: KonsumenService,
    private emailService: EmailService,
  ) {}

  async register(
    namaLengkap: string,
    email: string,
    password: string,
    username: string,
    fotoProfilURL: string,
  ) {
    await this.emailService.sendEmail(email);
    const count = await this.dataSource
      .createQueryBuilder()
      .select()
      .from(Konsumen, 'konsumen')
      .where('username = :username', { username })
      .getCount();
    console.log(count);
    if (count > 0) {
      throw new Error('Username sudah digunakan');
    }
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('konsumen')
      .values({
        namaLengkap,
        email,
        password,
        username,
        fotoProfilURL,
      })
      .execute();
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const konsumen = await this.konsumenService.findOne(username);
    if (konsumen?.password !== password) {
      throw new Error('Username atau password salah');
    }

    const payload = { sub: konsumen.idKonsumen, username: konsumen.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
