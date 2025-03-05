import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { KonsumenService } from 'src/users/konsumen/konsumen.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { OtpRequest } from 'src/utils/otp/dto/otp-request.dto';
import { OtpVerify } from 'src/utils/otp/dto/otp-verify.dto';
import { OtpService } from 'src/utils/otp/otp.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private konsumenService: KonsumenService,
    private otpService: OtpService,
  ) {}

  @Post('auth/login')
  @ApiOperation({ summary: 'Log in the konsumen' })
  @ApiBody({ type: LoginDto })
  async login(
    @Body('username') username: string,
    @Body('password') pass: string,
  ) {
    const konsumen = await this.konsumenService.validateKonsumen(
      username,
      pass,
    );

    return this.authService.login(konsumen);
  }

  @Post('auth/otp-request')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async requestOtp(@Body() otpRequest: OtpRequest) {
    try {
      await this.otpService.createOtp(otpRequest.email);
      return { message: 'OTP sent successfully', status: HttpStatus.CREATED };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Post('auth/otp-verify')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async verifyOtp(@Body() otpVerify: OtpVerify) {
    try {
      const konsumen = await this.otpService.verifyOtpForEmail(
        otpVerify.email,
        otpVerify.otp,
      );

      return this.authService.login(konsumen!);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
