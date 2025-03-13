import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { SocialMediaService } from '../services/social-media.service';
import { AddSocialMediaDto } from '../dto/add-social-media.dto';

@Controller('/users/:username')
export class SocialMediaController {
  constructor(private socialMediaService: SocialMediaService) {}

  @Post('/add-social-media')
  addSocialMedia(
    @Param('username') username: string,
    @Body() addSocialMediaDto: AddSocialMediaDto,
  ) {
    return this.socialMediaService.addSocialMedia(username, addSocialMediaDto);
  }

  @Delete('/delete-social-media')
  deleteSocialMedia(
    @Param('username') username: string,
    @Body() account: string,
  ) {
    return this.socialMediaService.deleteSocialMedia(username, account);
  }
}
