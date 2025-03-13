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
import { Konsumen } from '../entities/konsumen.entity';
import { UmkmService } from './umkm.service';
import { Umkm } from '../entities/umkm.entity';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { OtpService } from 'src/utils/otp/otp.service';
import { AddUsernameAndPasswordDto } from '../dto/add-and-username-password.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class KonsumenService {
  constructor(
    @InjectRepository(Konsumen)
    private konsumenRepository: Repository<Konsumen>,
    @InjectRepository(Umkm)
    private umkmRepository: Repository<Umkm>,
    private umkmService: UmkmService,
    private otpService: OtpService,
    private jwtService: JwtService,
  ) {}

  async register(nama: string, email: string) {
    const existingKonsumen = await this.findKonsumenByEmail(email);

    console.error(existingKonsumen);

    if (existingKonsumen) {
      throw new ConflictException('Email already in use');
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

  async getKonsumenProfile(username: string) {
    const konsumen = await this.findKonsumenByUsername(username);

    if (!konsumen) {
      throw new NotFoundException('Konsumen is not found');
    }

    return { konsumen };
  }

  async updateUserProfile(
    username: string,
    updateProfileDto: UpdateProfileDto,
  ) {
    const user = await this.findKonsumenByUsername(username);
    if (!user) throw new NotFoundException('User cannot be found');

    const umkm = await this.umkmService.findUmkmById(user.umkm.umkmID);
    if (!umkm)
      throw new UnauthorizedException(
        'User doesnt own an UMKM. Please register as UMKM',
      );

    const {
      displayName,
      fullAddress,
      province,
      city,
      profileImgURL,
      bannerURL,
      description,
    } = updateProfileDto;

    if (displayName) user.displayName = displayName;
    if (fullAddress) umkm.fullAddress = fullAddress;
    if (province) umkm.province = province;
    if (city) umkm.city = city;
    if (profileImgURL) umkm.profileImgURL = profileImgURL;
    if (bannerURL) umkm.bannerURL = bannerURL;
    if (description) umkm.description = description;

    await this.konsumenRepository.save(user);
    await this.umkmRepository.save(umkm);

    const payload = {
      username: user.username,
      sub: user.konsumenID,
      umkmID: user.umkm.umkmID,
    };

    return {
      update_token: await this.jwtService.signAsync(payload),
      message: 'Profile updated successfully',
      statusCode: HttpStatus.OK,
    };
  }

  async addUsernameAndPassword(
    email: string,
    addUsernameAndPasswordDto: AddUsernameAndPasswordDto,
  ) {
    const user = await this.findKonsumenByEmail(email);

    if (!user) throw new NotFoundException('User cannot be found');
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
    const konsumen = await this.findKonsumenByUsername(username);

    if (!konsumen || konsumen.password !== pass) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    return konsumen;
  }

  // ! helper methods
  findAll(): Promise<Konsumen[]> {
    return this.konsumenRepository.find();
  }

  findKonsumenById(konsumenID: string): Promise<Konsumen | null> {
    return this.konsumenRepository.findOne({
      where: { konsumenID: konsumenID },
      relations: {
        umkm: { categories: true, posts: true, socialMedias: true },
      },
    });
  }

  findKonsumenByUsername(username: string): Promise<Konsumen | null> {
    return this.konsumenRepository.findOne({
      where: { username: username },
      relations: {
        umkm: { categories: true, posts: true, socialMedias: true },
      },
    });
  }

  findKonsumenByEmail(email: string): Promise<Konsumen | null> {
    return this.konsumenRepository.findOne({
      where: { email: email },
      relations: {
        umkm: { categories: true, posts: true, socialMedias: true },
      },
    });
  }

  // async remove(username: string): Promise<void> {
  //   await this.konsumenRepository.delete(username);
  // }
}
