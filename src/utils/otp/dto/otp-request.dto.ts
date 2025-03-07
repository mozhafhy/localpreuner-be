import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class OtpRequest {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "Request OTP based on the user's email",
    example: 'useyour@email.com',
  })
  email: string;
}
