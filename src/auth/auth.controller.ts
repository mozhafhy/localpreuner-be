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
import { KonsumenService } from 'src/users/services/konsumen.service';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { OtpRequest } from 'src/utils/otp/dto/otp-request.dto';
import { OtpVerify } from 'src/utils/otp/dto/otp-verify.dto';
import { OtpService } from 'src/utils/otp/otp.service';
import {
  LoginSuccessResponseDto,
  RequestOtpSuccesResponseDto,
  VerifyOtpSuccessResponseDto,
} from 'src/commons/dto/successful-response.dto';
import { ApiErrorDecorator } from 'src/commons/decorators/api-error.decorator';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private konsumenService: KonsumenService,
    private otpService: OtpService,
    private jwtService: JwtService,
  ) {}

  @Post('/auth/login')
  @ApiOperation({ summary: 'Log in the konsumen' })
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({
    description: 'Successfully login',
    type: LoginSuccessResponseDto,
  })
  @ApiErrorDecorator(
    HttpStatus.UNAUTHORIZED,
    'Username or password is incorrect',
    'Failed to login',
    'Unauthorized',
  )
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

  @Post('/auth/otp-request')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Request OTP' })
  @ApiBody({ type: OtpRequest })
  @ApiCreatedResponse({
    description: 'OTP is sent successfully',
    type: RequestOtpSuccesResponseDto,
  })
  async requestOtp(@Body() otpRequest: OtpRequest) {
    try {
      await this.otpService.createOtp(otpRequest.email);
      return { message: 'OTP sent successfully', status: HttpStatus.CREATED };
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/auth/otp-verify')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Verify OTP' })
  @ApiBody({ type: OtpVerify })
  @ApiCreatedResponse({ type: VerifyOtpSuccessResponseDto })
  @ApiErrorDecorator(
    HttpStatus.UNAUTHORIZED,
    '',
    'OTP is either invalid or expired',
  )
  async verifyOtp(@Body() otpVerify: OtpVerify) {
    const konsumen = await this.otpService.verifyOtpForEmail(
      otpVerify.email,
      otpVerify.otp,
    );

    if (!konsumen) throw new UnauthorizedException();

    const payload = {
      sub: konsumen.konsumenID,
      email: konsumen.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
