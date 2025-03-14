import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { SocialMediaService } from '../services/social-media.service';
import { AddSocialMediaDto } from '../dto/add-social-media.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import {
  AddSocmedResponseDto,
  DeleteSocmedResponseDto,
} from '../dto/response/socmed-response.dto';
import { ApiErrorDecorator } from 'src/commons/decorators/api-error.decorator';
import {
  BadRequestMessage,
  ResponsMessage,
} from 'src/commons/enums/response-message.enum';
import { DeletePostDto } from '../dto/post-action.dto';
import { DeleteSocmedDto } from '../dto/delete-socmed.dto';

@Controller('/users/:username')
export class SocialMediaController {
  constructor(private socialMediaService: SocialMediaService) {}

  // ! add 1 UMKM social media
  @Post('/add-social-media')
  @ApiOperation({ summary: 'Add 1 UMKM social media' })
  @ApiParam({
    name: 'username',
    type: String,
  })
  @ApiBody({ type: AddSocialMediaDto })
  @ApiCreatedResponse({ type: AddSocmedResponseDto })
  @ApiErrorDecorator(
    HttpStatus.NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    'Not Found',
  )
  @ApiErrorDecorator(
    HttpStatus.UNAUTHORIZED,
    ResponsMessage.UNAUTHORIZED,
    ResponsMessage.UNAUTHORIZED,
    'Unauthorized',
  )
  addSocialMedia(
    @Param('username') username: string,
    @Body() addSocialMediaDto: AddSocialMediaDto,
  ) {
    return this.socialMediaService.addSocialMedia(username, addSocialMediaDto);
  }

  // ! delete 1 UMKM social media
  @Delete('/delete-social-media')
  @ApiOperation({ summary: 'Delete 1 UMKM social media' })
  @ApiParam({
    name: 'username',
    type: String,
  })
  @ApiBody({ type: DeletePostDto })
  @ApiOkResponse({ type: DeleteSocmedResponseDto })
  @ApiErrorDecorator(
    HttpStatus.NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    'Not Found',
  )
  @ApiErrorDecorator(
    HttpStatus.UNAUTHORIZED,
    ResponsMessage.UNAUTHORIZED,
    ResponsMessage.UNAUTHORIZED,
    'Unauthorized',
  )
  @ApiErrorDecorator(
    HttpStatus.BAD_REQUEST,
    BadRequestMessage.SOCIAL_MEDIA_NOT_EXIST,
    BadRequestMessage.SOCIAL_MEDIA_NOT_EXIST,
    'Not Found',
  )
  deleteSocialMedia(
    @Param('username') username: string,
    @Body() deleteSocmedDto: DeleteSocmedDto,
  ) {
    return this.socialMediaService.deleteSocialMedia(
      username,
      deleteSocmedDto.account,
    );
  }
}
