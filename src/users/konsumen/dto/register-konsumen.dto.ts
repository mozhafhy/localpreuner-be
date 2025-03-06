import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

  @ApiProperty({
    description:
      'Password init konsumen, wajib diisi, panjang minimumnya 6 karakter',
    example: 'johndoe123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description:
      'Username konsumen, wajib diisi dan panjang minimumnya 5 karakter',
    example: 'johndoe01',
  })
  @IsNotEmpty()
  @MinLength(5)
  username: string;

  @ApiPropertyOptional({
    description: 'Foto konsumen dalam bentuk URL, opsional untuk diisi',
    example: 'https://example.com/johndoe.jpg',
  })
  profileImgURL?: string | undefined;
}
