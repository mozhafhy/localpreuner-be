import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private tarnsporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendEmail(email: string, otp: number) {
    const content = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: 'Berikut adalah kode OTP Anda',
      text: `Kode OTP Anda: ${otp}`,
    };

    try {
      const info = await this.tarnsporter.sendMail(content);
      console.log(info);
    } catch (error) {
      console.error(error);
    }
  }
}
