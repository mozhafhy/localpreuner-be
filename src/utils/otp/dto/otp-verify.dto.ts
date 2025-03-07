import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class OtpVerify {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Verify OTP based on the email used to request the OTP',
    example: 'useyour@email.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'This is the OTP token that will be verified',
    example: '123456',
  })
  otp: string;
}
