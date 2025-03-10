import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Umkm } from './entities/umkm.entity';
import { Repository } from 'typeorm';
// import { KonsumenService } from '../konsumen/konsumen.service';
import { RegisterUmkmDto } from './dto/register-umkm.dto';
import { Konsumen } from '../konsumen/entities/konsumen.entity';

@Injectable()
export class UmkmService {
  constructor(
    @InjectRepository(Umkm)
    private umkmRepository: Repository<Umkm>,
    @InjectRepository(Konsumen)
    private konsumenRepository: Repository<Konsumen>,
  ) {}

  async registerUmkm(username: string, registerUmkmDto: RegisterUmkmDto) {
    const konsumen = await this.konsumenRepository.findOne({
      where: { username },
    });

    if (!konsumen) {
      throw new BadRequestException(
        'Anda harus mendaftar sebagai konsumen terlebih dahulu!',
      );
    }

    const nikExist = await this.findUmkmByNik(registerUmkmDto.nik);
    const existingOwner = nikExist || konsumen.umkmUmkmID;
    if (existingOwner) {
      throw new ConflictException(
        'User sudah memiliki UMKM. Hanya diperbolehkan memiliki 1 UMKM per user',
      );
    }

    const umkm = new Umkm();
    umkm.fullname = registerUmkmDto.fullname;
    umkm.nik = registerUmkmDto.nik;
    umkm.fullAddress = registerUmkmDto.fullAddress;
    umkm.province = registerUmkmDto.province;
    umkm.city = registerUmkmDto.city;

    await this.umkmRepository.save(umkm);

    konsumen.displayName = registerUmkmDto.businessName;
    konsumen.umkmUmkmID = umkm.umkmID;
    await this.konsumenRepository.save(konsumen);

    return {
      message: 'UMKM created successfully',
      status: HttpStatus.CREATED,
    };
  }

  findUmkmByNik(nik: string): Promise<Umkm | null> {
    return this.umkmRepository.findOneBy({ nik });
  }

  findUmkmById(umkmID: string): Promise<Umkm | null> {
    return this.umkmRepository.findOneBy({ umkmID });
  }
}
