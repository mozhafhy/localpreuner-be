import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ type: File })
  profileImg?: Express.Multer.File;

  @ApiProperty({ type: File })
  catalog?: Express.Multer.File;

  @ApiProperty({ type: File })
  banner?: Express.Multer.File;
}
