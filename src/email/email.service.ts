import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private tarnsporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: 'mochammadzhafif1123@gmail.com',
      pass: process.env.EMAIL_PASS!,
    },
  });
  async sendEmail() {
    try {
      const info = await this.tarnsporter.sendMail({
        from: 'mochammadzhafif1123@gmail.com',
        to: 'fazleadyuta4@gmail.com',
        subject: 'Testing email',
        text: 'This is a test email',
      });
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  }
}
