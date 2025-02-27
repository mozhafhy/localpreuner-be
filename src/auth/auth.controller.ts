import { BadRequestException, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @ApiOperation({
    summary: 'Log in the konsumen',
  })
  @ApiOkResponse({
    description: 'Konsumen logged in succesfully',
    type: LoginDto,
  })
  @ApiBadRequestResponse({
    description: 'Username or password is incorrect',
  })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    try {
      await this.authService.login(loginDto.username, loginDto.password);
    } catch (error) {
      console.log(error);
      throw new BadRequestException((error as Error).message);
    }
    return {
      message: 'Login success',
    };
  }

  @Post('auth/register')
  @ApiOperation({
    summary: 'Register the new konsumen',
  })
  @ApiOkResponse({
    description: 'Konsumen registered succesfully',
    type: RegisterDto,
  })
  @ApiBadRequestResponse({
    description: 'Konsumen is already registered, please login instead',
  })
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    try {
      await this.authService.register(
        registerDto.namaLengkap,
        registerDto.email,
        registerDto.password,
        registerDto.username,
        registerDto.fotoProfilURL,
      );
    } catch (error) {
      console.log(error);
      throw new BadRequestException((error as Error).message);
    }
    // console.log('Berhasil');
    return {
      message: 'Register success',
    };
  }

  // @Post('auth/logout')
  // logout() {
  //   return 'Logout';
  // }

  // @Post('auth/forgot-password')
  // forgotPassword() {
  //   return 'Forgot Password';
  // }
}
