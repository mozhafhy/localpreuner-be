import { ApiProperty } from '@nestjs/swagger';

export class AddSocialMediaDto {
  @ApiProperty({ type: String })
  account: string;

  @ApiProperty({ type: String })
  url: string;
}
