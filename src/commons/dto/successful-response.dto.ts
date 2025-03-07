import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Konsumen } from 'src/users/konsumen/konsumen.entity';
import { Umkm } from 'src/users/umkm/umkm.entity';

export class RequestOtpSuccesResponseDto {
  @ApiProperty({ default: 'OTP sent successfully' })
  message: string;

  @ApiProperty({ default: HttpStatus.CREATED })
  status: number;
}

export class VerifyOtpSuccessResponseDto {
  @ApiProperty({ default: 'jwt_token' })
  access_token: string;

  @ApiProperty({ default: 'username' })
  username: string;

  @ApiProperty({ default: 'user_uuid' })
  id: string;
}

export class LoginSuccessResponseDto extends VerifyOtpSuccessResponseDto {}

export class RegisterKonsumenSuccessResponseDto {
  @ApiProperty({ default: 'Konsumen registered successfully' })
  message: string;

  @ApiProperty({ default: HttpStatus.CREATED })
  status: number;
}

export class GetUserProfileSuccessResponse {
  @ApiProperty({ type: Konsumen })
  konsumen: Konsumen;

  @ApiProperty({ default: null, type: Umkm })
  umkm: Umkm;
}

export class RegisterUmkmSuccessResponseDto {
  @ApiProperty({ default: 'UMKM registered successfully' })
  message: string;

  @ApiProperty({ default: HttpStatus.CREATED })
  status: number;
}
