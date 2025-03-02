import { IsEmail, IsNotEmpty } from 'class-validator';

export class OtpRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
