import { IsEmail, IsNotEmpty } from 'class-validator';

export class OtpVerify {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  otp: string;
}
