import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private dataSource: DataSource) {}

  async register(
    namaLengkap: string,
    email: string,
    password: string,
    username: string,
    fotoProfilURL: string,
  ) {
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
        totalFollowers: 0,
      })
      .execute();
  }
}
