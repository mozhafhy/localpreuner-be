import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialMedia } from '../entities/social-media.entity';
import { Repository } from 'typeorm';
import { Konsumen } from 'src/users/entities/konsumen.entity';
import { Umkm } from 'src/users/entities/umkm.entity';
import { AddSocialMediaDto } from '../dto/add-social-media.dto';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectRepository(SocialMedia)
    private socialMediaRepository: Repository<SocialMedia>,
    @InjectRepository(Konsumen)
    private konsumenRepository: Repository<Konsumen>,
    @InjectRepository(Umkm)
    private umkmRepository: Repository<Umkm>,
  ) {}

  async addSocialMedia(username: string, addSocialMediaDto: AddSocialMediaDto) {
    const konsumen = await this.konsumenRepository.findOne({
      where: { username: username },
      relations: { umkm: { socialMedias: true } },
    });
    if (!konsumen) throw new NotFoundException('Konsumen is not found');
    if (!konsumen.umkm)
      throw new UnauthorizedException('Konsumen does not own a UMKM');

    const { account, url } = addSocialMediaDto;
    const socialMedia = await this.socialMediaRepository.save({ account, url });
    if (!konsumen.umkm.socialMedias) {
      konsumen.umkm.socialMedias = [socialMedia];
    } else {
      konsumen.umkm.socialMedias.push(socialMedia);
    }

    await this.umkmRepository.save(konsumen.umkm);
    return {
      socials: konsumen.umkm.socialMedias,
      message: 'Social media added successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  async deleteSocialMedia(username: string, account: string) {
    const konsumen = await this.konsumenRepository.findOne({
      where: { username: username },
      relations: { umkm: { socialMedias: true } },
    });
    if (!konsumen) throw new NotFoundException('Konsumen is not found');
    if (!konsumen.umkm)
      throw new UnauthorizedException('Konsumen does not own a UMKM');
    if (!konsumen.umkm.socialMedias?.length)
      throw new BadRequestException('Konsumen does not have social medias');

    const initLength = konsumen.umkm.socialMedias.length;
    konsumen.umkm.socialMedias = konsumen.umkm.socialMedias.filter((s) =>
      s.account.includes(account),
    );
    const currentLength = konsumen.umkm.socialMedias.length;

    if (currentLength !== initLength - 1)
      throw new BadRequestException('Social media does not exist');

    await this.umkmRepository.save(konsumen.umkm);
    await this.socialMediaRepository.delete({ account: account });
    return {
      posts: konsumen.umkm.socialMedias,
      message: 'Social media deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
