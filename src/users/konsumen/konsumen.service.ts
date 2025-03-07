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
import { UmkmService } from '../umkm/umkm.service';
import { Umkm } from '../umkm/umkm.entity';
// import { UpdateProfilDto } from './dto/update-profile.dto';

@Injectable()
export class KonsumenService {
  constructor(
    @InjectRepository(Konsumen)
    private konsumenRepository: Repository<Konsumen>,
    private umkmService: UmkmService,
  ) {}

  async register(
    nama: string,
    email: string,
    pass: string,
    username: string,
    profileImgURL: string | undefined,
  ) {
    const [usernameExist, emailExist] = await Promise.all([
      this.findOne(username),
      this.findOne(email),
    ]);
    const existingKonsumen = usernameExist || emailExist;

    if (existingKonsumen) {
      throw new ConflictException('Username atau email telah dipakai');
    }

    const konsumen = new Konsumen();
    konsumen.displayName = nama;
    konsumen.email = email;
    konsumen.password = pass;
    konsumen.username = username;
    konsumen.profileImgURL = profileImgURL;

    await this.konsumenRepository.save(konsumen);
    return {
      message: 'Registrasi konsumen berhasil',
      status: HttpStatus.CREATED,
    };
  }

  async getKonsumenProfile(
    username: string,
  ): Promise<{ konsumen: Konsumen; umkm: Umkm | null }> {
    const konsumen = await this.findOne(username);

    if (!konsumen) {
      throw new NotFoundException();
    }

    const umkm = await this.umkmService.findUmkmById(konsumen.umkmUmkmID);

    return { konsumen, umkm };
  }

  // async updateProfile(updateProfileDto: UpdateProfilDto) {}

  async validateKonsumen(username: string, pass: string): Promise<Konsumen> {
    const konsumen = await this.findOne(username);

    if (!konsumen || konsumen.password !== pass) {
      throw new UnauthorizedException('Username atau Password salah');
    }

    return konsumen;
  }

  findAll(): Promise<Konsumen[]> {
    return this.konsumenRepository.find();
  }

  findOne(username: string): Promise<Konsumen | null> {
    return this.konsumenRepository.findOneBy({ username });
  }

  async remove(username: string): Promise<void> {
    await this.konsumenRepository.delete(username);
  }
}
