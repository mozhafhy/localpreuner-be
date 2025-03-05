import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Konsumen } from 'src/users/konsumen/konsumen.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { KonsumenModule } from 'src/users/konsumen/konsumen.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from 'src/utils/email/email.module';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { OtpModule } from 'src/utils/otp/otp.module';

@Module({
  imports: [
    ConfigModule, // if not global, import it here
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_KEY'),
        signOptions: { expiresIn: '5m' },
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([Konsumen]),
    KonsumenModule,
    EmailModule,
    OtpModule,
  ],
  providers: [AuthService, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
