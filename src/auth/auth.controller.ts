import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { KonsumenService } from 'src/users/konsumen/konsumen.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { Konsumen } from 'src/users/konsumen/konsumen.entity';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get('auth/:username')
  @ApiOperation({ summary: 'Get konsumen information' })
  @ApiParam({
    name: 'username',
    description: 'The username of the user to retrieve',
    example: 'johndoe01',
  })
  @ApiOkResponse({
    type: Konsumen,
  })
  @ApiUnauthorizedResponse({ description: 'Konsumen tidak ditemukan' })
  getKonsumenProfile(@Param('username') username: string) {
    return this.konsumenService.getKonsumenProfile(username);
  }

  @Post('auth/otp-request')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async requestOtp(@Body() otpRequest: OtpRequest) {
    try {
      await this.otpService.createOtp(otpRequest.email);
      return { message: 'OTP sent successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('auth/otp-verify')
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
