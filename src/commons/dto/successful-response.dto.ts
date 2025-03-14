import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Konsumen } from 'src/users/entities/konsumen.entity';
import { Umkm } from 'src/users/entities/umkm.entity';

export class RequestOtpSuccesResponseDto {
  @ApiProperty({ default: 'OTP sent successfully' })
  message: string;

  @ApiProperty({ default: HttpStatus.CREATED })
  status: number;
}

export class ResponseWithJwt {
  @ApiProperty({ default: 'jwt_token' })
  access_token: string;

  @ApiProperty({ default: 'username' })
  username: string;

  @ApiProperty({ default: 'user_uuid' })
  id: string;
}
export class VerifyOtpSuccessResponseDto extends ResponseWithJwt {}
export class LoginSuccessResponseDto extends ResponseWithJwt {}

export class RegisterKonsumenSuccessResponseDto {
  @ApiProperty({ default: 'Konsumen registered successfully' })
  message: string;

  @ApiProperty({ default: HttpStatus.CREATED })
  status: number;
}

export class GetUserProfileSuccessResponse {
  @ApiProperty({ type: Konsumen })
  konsumen: Konsumen;

  @ApiProperty({ type: Umkm })
  umkm: Umkm;
}

export class RegisterUmkmSuccessResponseDto {
  @ApiProperty({ default: 'UMKM registered successfully' })
  message: string;

  @ApiProperty({ default: HttpStatus.CREATED })
  status: number;
}
