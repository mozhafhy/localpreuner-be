import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ type: String })
  displayName?: string;

  @ApiPropertyOptional({ type: String })
  fullAddress?: string;

  @ApiPropertyOptional({ type: String })
  province?: string;

  @ApiPropertyOptional({ type: String })
  city?: string;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiPropertyOptional({ type: File })
  profileImg?: Express.Multer.File;

  @ApiPropertyOptional({ type: File })
  catalog?: Express.Multer.File;

  @ApiPropertyOptional({ type: File })
  banner?: Express.Multer.File;
}
