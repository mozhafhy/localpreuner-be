import { ApiProperty } from '@nestjs/swagger';

class UmkmDto {
  @ApiProperty({ type: String })
  umkmId: string;

  @ApiProperty({ type: String })
  fullname: string;
}

export class FilterResponseDto {
  @ApiProperty({ type: String })
  postID: string;

  @ApiProperty({ type: String })
  media: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Number })
  upvotes: number;

  @ApiProperty({ type: Number })
  downvotes: number;

  @ApiProperty({ type: UmkmDto })
  umkm: UmkmDto;
}
