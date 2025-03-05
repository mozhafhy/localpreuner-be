import { IsNotEmpty } from 'class-validator';

export class RegisterUmkmDto {
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  nik: string;

  @IsNotEmpty()
  ktpPhotoURL: string;

  @IsNotEmpty()
  businessName: string;

  @IsNotEmpty()
  fullAddress: string;

  @IsNotEmpty()
  province: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  phone: string;

  bannerURL?: string;
}
