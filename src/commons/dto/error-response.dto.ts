import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  message: string;
  error: string;
  statusCode: number;
}

class OtpErrorDto {
  @ApiProperty({ default: 'Unauthorized' })
  error: string;

  @ApiProperty({ default: HttpStatus.UNAUTHORIZED })
  statusCode: number;
}

export class InvalidOtpErrorDto extends OtpErrorDto {
  @ApiProperty({ default: 'OTP is invalid' })
  message: string;
}

export class ExpiredOtpErrorDto extends OtpErrorDto {
  @ApiProperty({ default: 'OTP is expired' })
  message: string;
}
