import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ type: File })
  media: Express.Multer.File;

  @ApiPropertyOptional({ type: String })
  description?: string;
}

export class DeletePostDto {
  @ApiProperty({ type: String })
  postId: string;
}
