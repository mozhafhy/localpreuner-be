import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterKonsumenDto {
  @ApiProperty({
    description:
      'Nama lengkap konsumen,  minimal terdiri dari 3 huruf dan wajib diisi',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @MinLength(3)
  displayName: string;

  @ApiProperty({
    description: 'Email konsumen, harus diisi, dan merupakan email yang valid',
    example: 'johndoe11@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
