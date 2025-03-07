import {
  BadRequestException,
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
import { UpdateProfilDto } from './dto/update-profile.dto';
import { OtpService } from 'src/utils/otp/otp.service';
import { AddUsernameAndPasswordDto } from './dto/add-and-username-password.dto';

@Injectable()
export class KonsumenService {
  constructor(
    @InjectRepository(Konsumen)
    private konsumenRepository: Repository<Konsumen>,
    private umkmService: UmkmService,
    private otpService: OtpService,
  ) {}

  async register(nama: string, email: string) {
    const existingKonsumen = await this.findUserByEmail(email);

    console.error(existingKonsumen);

    if (existingKonsumen) {
      throw new ConflictException('Email telah dipakai');
    }

    const konsumen = new Konsumen();
    konsumen.displayName = nama;
    konsumen.email = email;

    await this.konsumenRepository.save(konsumen);
    await this.otpService.createOtp(konsumen.email);
    return {
      message: 'Konsumen registered successfully',
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

  async addUsernameAndPassword(
    email: string,
    addUsernameAndPasswordDto: AddUsernameAndPasswordDto,
  ) {
    const user = await this.findUserByEmail(email);

    if (!user) throw new NotFoundException('User is not found');
    if (user.username)
      throw new BadRequestException('Username cannot be changed');

    const { username, password } = addUsernameAndPasswordDto;

    user.username = username;
    user.password = password;

    await this.konsumenRepository.save(user);

    return {
      message: 'Username and password added successfully',
      status: HttpStatus.CREATED,
    };
  }

  async validateKonsumen(username: string, pass: string): Promise<Konsumen> {
    const konsumen = await this.findOne(username);

    if (!konsumen || konsumen.password !== pass) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    return konsumen;
  }

  findAll(): Promise<Konsumen[]> {
    return this.konsumenRepository.find();
  }

  findOne(email: string): Promise<Konsumen | null> {
    return this.konsumenRepository.findOneBy({ email });
  }

  findUserById(konsumenID: string): Promise<Konsumen | null> {
    return this.konsumenRepository.findOneBy({ konsumenID });
  }

  findUserByUsername(username: string): Promise<Konsumen | null> {
    return this.konsumenRepository.findOneBy({ username });
  }

  findUserByEmail(email: string): Promise<Konsumen | null> {
    return this.konsumenRepository.findOneBy({ email });
  }

  async remove(username: string): Promise<void> {
    await this.konsumenRepository.delete(username);
  }
}
