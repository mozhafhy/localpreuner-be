import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  media: Express.Multer.File;

  @ApiPropertyOptional({ type: String })
  description?: string;
}

export class DeletePostDto {
  @ApiProperty({ type: String })
  postId: string;
}
