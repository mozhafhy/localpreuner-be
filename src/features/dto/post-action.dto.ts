import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ type: String })
  media: string;

  @ApiPropertyOptional({ type: String })
  description?: string;
}

export class DeletePostDto {
  @ApiProperty({ type: String })
  postId: string;
}
