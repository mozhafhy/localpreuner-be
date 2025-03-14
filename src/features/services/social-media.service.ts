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
import {
  BadRequestMessage,
  CreatedMessage,
  OkMessage,
  ResponsMessage,
} from 'src/commons/enums/response-message.enum';

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
    if (!konsumen)
      throw new NotFoundException(ResponsMessage.KONSUMEN_NOT_FOUND);
    if (!konsumen.umkm)
      throw new UnauthorizedException(ResponsMessage.UNAUTHORIZED);

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
      message: CreatedMessage.SOCIAL_MEDIA,
      statusCode: HttpStatus.CREATED,
    };
  }

  async deleteSocialMedia(username: string, account: string) {
    const konsumen = await this.konsumenRepository.findOne({
      where: { username: username },
      relations: { umkm: { socialMedias: true } },
    });
    if (!konsumen)
      throw new NotFoundException(ResponsMessage.KONSUMEN_NOT_FOUND);
    if (!konsumen.umkm)
      throw new UnauthorizedException(ResponsMessage.UNAUTHORIZED);
    if (!konsumen.umkm.socialMedias?.length)
      throw new BadRequestException(BadRequestMessage.NO_SOCIAL_MEDIA);

    const initLength = konsumen.umkm.socialMedias.length;
    konsumen.umkm.socialMedias = konsumen.umkm.socialMedias.filter((s) =>
      s.account.includes(account),
    );
    const currentLength = konsumen.umkm.socialMedias.length;

    if (currentLength !== initLength - 1)
      throw new BadRequestException(BadRequestMessage.SOCIAL_MEDIA_NOT_EXIST);

    await this.umkmRepository.save(konsumen.umkm);
    await this.socialMediaRepository.delete({ account: account });
    return {
      posts: konsumen.umkm.socialMedias,
      message: OkMessage.DELETE_SOCIAL_MEDIA,
      statusCode: HttpStatus.OK,
    };
  }
}
