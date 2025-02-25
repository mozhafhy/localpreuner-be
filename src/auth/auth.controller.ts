import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { RegisterDto } from './auth.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('auth/login')
  // login() {
  //   return this.authService.login();
  // }

  @Post('auth/register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(
      registerDto.namaLengkap,
      registerDto.email,
      registerDto.password,
      registerDto.username,
      registerDto.fotoProfilURL,
    );

    // console.log('Berhasil');
    return {
      message: 'Register success',
    };
  }

  @Post('auth/logout')
  logout() {
    return 'Logout';
  }

  @Post('auth/forgot-password')
  forgotPassword() {
    return 'Forgot Password';
  }
}
