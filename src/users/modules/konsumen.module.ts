import { BadRequestException, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Konsumen } from '../entities/konsumen.entity';
import { KonsumenService } from '../services/konsumen.service';
import { KonsumenController } from '../controllers/konsumen.controller';
import { Umkm } from '../entities/umkm.entity';
import { UmkmService } from '../services/umkm.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { OtpService } from 'src/utils/otp/otp.service';
import { Otp } from 'src/utils/otp/otp.entity';
import { EmailModule } from 'src/utils/email/email.module';
import { UmkmModule } from './umkm.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { BadRequestMessage } from 'src/commons/enums/response-message.enum';

const uploadDir = join(process.cwd(), 'uploads');
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${Date.now()}${ext}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'video/mp4'
        ) {
          cb(null, true);
        } else {
          cb(new BadRequestException(BadRequestMessage.FILE_UPLOAD), false);
        }
      },
    }),
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_KEY'),
        signOptions: {
          expiresIn: '8h',
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Konsumen, Umkm, Otp]),
    EmailModule,
    UmkmModule,
  ],
  providers: [KonsumenService, UmkmService, JwtAuthGuard, OtpService],
  controllers: [KonsumenController],
  exports: [KonsumenService, UmkmService, JwtAuthGuard, OtpService],
})
export class KonsumenModule {}
