import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './otp.entity';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { OtpService } from './otp.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Otp]),
    EmailModule,
    JwtModule.register({
      secret: `${process.env.JWT_KEY}`,
      signOptions: { expiresIn: '1h' },
    }),
  ],

  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
