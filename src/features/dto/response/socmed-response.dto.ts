import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  CreatedMessage,
  OkMessage,
} from 'src/commons/enums/response-message.enum';
import { SocialMedia } from 'src/features/entities/social-media.entity';

export class AddSocmedResponseDto {
  @ApiProperty({ type: SocialMedia, isArray: true })
  socials: SocialMedia[];

  @ApiProperty({ default: CreatedMessage.SOCIAL_MEDIA })
  message: CreatedMessage;

  @ApiProperty({ default: HttpStatus.CREATED })
  statusCode: HttpStatus;
}

export class DeleteSocmedResponseDto {
  @ApiProperty({ type: SocialMedia, isArray: true })
  socials: SocialMedia[];

  @ApiProperty({ default: OkMessage.DELETE_SOCIAL_MEDIA })
  message: CreatedMessage;

  @ApiProperty({ default: HttpStatus.OK })
  statusCode: HttpStatus;
}
