import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Konsumen } from './konsumen.entity';

@Injectable()
export class KonsumenService {
  constructor(
    @InjectRepository(Konsumen)
    private konsumenRepository: Repository<Konsumen>,
  ) {}

  async register(
    nama: string,
    email: string,
    pass: string,
    username: string,
    fotoProfilURL: string | undefined,
  ) {
    const existingKonsumen = await this.findOne(username);

    if (existingKonsumen) {
      throw new ConflictException('Username telah dipakai');
    }

    const konsumen = new Konsumen();
    konsumen.namaLengkap = nama;
    konsumen.email = email;
    konsumen.password = pass;
    konsumen.username = username;
    konsumen.fotoProfilURL = fotoProfilURL;

    await this.konsumenRepository.save(konsumen);
    return {
      message: 'Registrasi konsumen berhasil',
      status: HttpStatus.CREATED,
    };
  }

  async getKonsumenProfile(username: string) {
    const konsumen = await this.findOne(username);

    if (!konsumen) {
      throw new NotFoundException();
    }

    return konsumen;
  }

  async validasiKonsumen(username: string, pass: string): Promise<Konsumen> {
    const konsumen = await this.findOne(username);

    if (!konsumen || konsumen.password !== pass) {
      throw new UnauthorizedException();
    }

    return konsumen;
  }

  findAll(): Promise<Konsumen[]> {
    return this.konsumenRepository.find();
  }

  findOne(username: string): Promise<Konsumen | null> {
    return this.konsumenRepository.findOneBy({ username });
  }

  async remove(id: number): Promise<void> {
    await this.konsumenRepository.delete(id);
  }
}
