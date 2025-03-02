import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { KonsumenService } from './konsumen.service';
import { RegisterDto } from 'src/auth/auth.dto';
import {
  ApiOperation,
  // ApiOkResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { OtpService } from 'src/utils/otp/otp.service';
import { OtpRequest } from 'src/utils/otp/dto/otp-request.dto';
import { OtpVerify } from 'src/utils/otp/dto/otp-verify.dto';
// import { Konsumen } from './konsumen.entity';

@Controller('users')
export class KonsumenController {
  constructor(
    private konsumenService: KonsumenService,
    private otpService: OtpService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register the new konsumen',
  })
  @ApiCreatedResponse({
    description: 'Konsumen registered succesfully',
    // type: Konsumen,
  })
  @ApiConflictResponse({
    description: 'Username telah dipakai',
  })
  @ApiBody({ type: RegisterDto })
  register(@Body() registerDto: RegisterDto) {
    return this.konsumenService.register(
      registerDto.displayName,
      registerDto.email,
      registerDto.password,
      registerDto.username,
      registerDto.profileImgURL,
    );
  }

  @Post('otp-request')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async requestOtp(@Body() otpRequest: OtpRequest) {
    try {
      await this.otpService.createOtp(otpRequest.email);
      return { message: 'OTP sent successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('otp-verify')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async verifyOtp(@Body() otpVerify: OtpVerify) {
    try {
      const token = await this.otpService.verifyOtpForEmail(
        otpVerify.email,
        otpVerify.otp,
      );

      return { message: 'OTP verified successfully', token };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
