import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './otp.entity';
import * as speakeasy from 'speakeasy';
import { EmailService } from '../email/email.service';
import { Konsumen } from 'src/users/konsumen/entities/konsumen.entity';

const otpConfig: speakeasy.TotpOptions = {
  secret: '',
  step: 300,
  digits: 6,
};

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
    private emailService: EmailService,
    @InjectRepository(Konsumen)
    private konsumenRepository: Repository<Konsumen>,
  ) {}

  getSecret(): string {
    const secret = speakeasy.generateSecret({ length: 20 });

    return secret.base32;
  }

  getOtp(secret: string): string {
    return speakeasy.totp({ ...otpConfig, secret });
  }

  verifyOtp(secret: string, otp: string): boolean {
    return speakeasy.totp.verify({
      ...otpConfig,
      secret: secret,
      token: otp,
      window: 3,
    });
  }

  async fintOtpByEmail(email: string): Promise<Otp> {
    const otpInfo = await this.otpRepository.findOne({ where: { email } });

    if (!otpInfo) {
      throw new NotFoundException();
    }

    return otpInfo;
  }

  async createOtp(email: string): Promise<void> {
    const secret = this.getSecret();
    const otp = this.getOtp(secret);

    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 5);

    let otpData = await this.otpRepository.findOne({ where: { email } });
    if (otpData) {
      otpData.token = otp;
      otpData.secret = secret;
      otpData.expires = expiryDate;
    } else {
      otpData = this.otpRepository.create({
        email,
        token: otp,
        secret: secret,
        expires: expiryDate,
      });
    }

    await this.otpRepository.save(otpData);
    await this.emailService.sendOtpEmail(email, otp);
  }

  async verifyOtpForEmail(
    email: string,
    otp: string,
  ): Promise<Konsumen | null> {
    const otpInfo = await this.fintOtpByEmail(email);
    if (new Date() > otpInfo.expires) {
      throw new BadRequestException('OTP has expired');
    }

    const isValid = this.verifyOtp(otpInfo.secret, otp);
    if (!isValid) {
      throw new BadRequestException('OTP is invalid');
    }

    return this.konsumenRepository.findOne({ where: { email } });
  }
}
