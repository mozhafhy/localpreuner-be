import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// import { multerOptions } from './multer-options';

@Controller('/upload')
export class UploadController {
  constructor() {}

  // ! upload 1 file
  @Post('/file')
  @UseInterceptors(
    FileInterceptor('media', {
      limits: { fileSize: Math.pow(1024, 2) * 10 },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = `http://localhost:8088/uploads/${file.filename}`;
    return {
      url: fileUrl,
    };
  }
}
