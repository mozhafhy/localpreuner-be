import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterUmkmDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'johndoe01' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  fullname: string;

  @IsNotEmpty()
  @ApiProperty({ example: '1234567890123456' })
  nik: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'https://example.com/ktp.png' })
  ktpPhotoURL: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'UD Jaya Abadi Bangunan' })
  businessName: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Jl. Jalan-Jalan No. 5' })
  fullAddress: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Jawa Timur' })
  province: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Malang' })
  city: string;

  @IsNotEmpty()
  @ApiProperty({ example: '081234567890' })
  phone: string;

  @ApiPropertyOptional({ example: 'https://example.com/banner.png' })
  bannerURL?: string;
}
