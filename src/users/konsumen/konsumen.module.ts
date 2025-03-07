import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Konsumen } from './konsumen.entity';
import { KonsumenService } from './konsumen.service';
import { KonsumenController } from './konsumen.controller';
import { Umkm } from '../umkm/umkm.entity';
import { UmkmService } from '../umkm/umkm.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { OtpService } from 'src/utils/otp/otp.service';
import { Otp } from 'src/utils/otp/otp.entity';
import { EmailModule } from 'src/utils/email/email.module';
import { UmkmModule } from '../umkm/umkm.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_KEY'),
        signOptions: {
          expiresIn: '5m',
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
