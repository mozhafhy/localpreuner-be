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
import { ResponsMessage } from 'src/commons/enums/response-message.enum';
import { FileUploadDto } from '../dto/file-upload.dto';

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

  async viewAccount(username: string) {
    const konsumen = await this.findKonsumenByUsername(username);

    if (konsumen) {
      return { url: `/users/profile/${konsumen.username}` };
    } else {
      throw new NotFoundException('UMKM does not exist');
    }
  }

  async updateUserProfile(
    username: string,
    updateProfileDto: UpdateProfileDto,
    fileUploadDto: FileUploadDto,
  ) {
    const user = await this.findKonsumenByUsername(username);
    if (!user) throw new NotFoundException('User cannot be found');

    const umkm = await this.umkmService.findUmkmById(user.umkm!.umkmID);
    if (!umkm)
      throw new UnauthorizedException(
        'User doesnt own an UMKM. Please register as UMKM',
      );

    const { displayName, fullAddress, province, city, description } =
      updateProfileDto;

    const { banner, catalog, profileImg } = fileUploadDto;

    const fileUrl = 'https://be-intern.bccdev.id/zhafif/uploads/';

    if (displayName) user.displayName = displayName;
    if (fullAddress) umkm.fullAddress = fullAddress;
    if (province) umkm.province = province;
    if (city) umkm.city = city;
    if (profileImg) {
      umkm.profileImg = `${fileUrl}${profileImg[0].filename}`;
      console.log(profileImg);
    }
    if (banner) {
      umkm.banner = `${fileUrl}${banner[0].filename}`;
      console.log(banner);
    }
    if (catalog) {
      umkm.catalog = `${fileUrl}${catalog[0].filename}`;
      console.log(catalog);
    }
    if (description) umkm.description = description;

    await this.konsumenRepository.save(user);
    await this.umkmRepository.save(umkm);

    const payload = {
      username: user.username,
      sub: user.konsumenID,
      umkmID: user.umkm?.umkmID,
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

    if (!user) throw new NotFoundException(ResponsMessage.KONSUMEN_NOT_FOUND);
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
        umkm: {
          categories: true,
          posts: { hashtags: true },
          socialMedias: true,
        },
      },
    });
  }

  findKonsumenByUsername(username: string): Promise<Konsumen | null> {
    return this.konsumenRepository.findOne({
      where: { username: username },
      relations: {
        umkm: {
          categories: true,
          posts: { hashtags: true },
          socialMedias: true,
        },
      },
    });
  }

  findKonsumenByEmail(email: string): Promise<Konsumen | null> {
    return this.konsumenRepository.findOne({
      where: { email: email },
      relations: {
        umkm: {
          categories: true,
          posts: { hashtags: true },
          socialMedias: true,
        },
      },
    });
  }

  // async remove(username: string): Promise<void> {
  //   await this.konsumenRepository.delete(username);
  // }
}
