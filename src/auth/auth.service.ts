import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Konsumen } from 'src/users/konsumen/entities/konsumen.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(konsumen: Konsumen) {
    const payload = {
      username: konsumen.username,
      sub: konsumen.konsumenID,
      umkmID: konsumen.umkmUmkmID,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      username: konsumen.username,
      id: konsumen.konsumenID,
    };
  }
}
