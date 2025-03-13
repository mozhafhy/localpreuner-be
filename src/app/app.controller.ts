import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Konsumen } from 'src/users/entities/konsumen.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Konsumen): string {
    console.log(req);
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('media'))
  uploadFile(@UploadedFiles() file: Express.Multer.File) {
    console.log(file);
  }
}
