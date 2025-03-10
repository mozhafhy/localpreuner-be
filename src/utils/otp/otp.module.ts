import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './otp.entity';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { OtpService } from './otp.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Konsumen } from 'src/users/konsumen/entities/konsumen.entity';
import { KonsumenService } from 'src/users/konsumen/konsumen.service';
import { KonsumenModule } from 'src/users/konsumen/konsumen.module';
import { Umkm } from 'src/users/umkm/entities/umkm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Otp, Konsumen, Umkm]),
    EmailModule,
    ConfigModule,
    KonsumenModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_KEY'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXP_KEY') },
      }),
      inject: [ConfigService],
    }),
  ],

  providers: [OtpService, KonsumenService],
  exports: [OtpService, KonsumenService],
})
export class OtpModule {}
