import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterKonsumenDto {
  @ApiProperty({
    description:
      'Nama lengkap konsumen,  minimal terdiri dari 3 huruf dan wajib diisi',
    type: String,
    minLength: 3,
  })
  @IsNotEmpty()
  @MinLength(3)
  displayName: string;

  @ApiProperty({
    description: 'Email konsumen, harus diisi, dan merupakan email yang valid',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
