import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KonsumenService } from 'src/users/konsumen.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private konsumenService: KonsumenService,
  ) {}

  @Post('auth/login')
  @ApiOperation({ summary: 'Log in the konsumen' })
  @ApiBody({ type: LoginDto })
  async login(
    @Body('username') username: string,
    @Body('password') pass: string,
  ) {
    const konsumen = await this.konsumenService.validasiKonsumen(
      username,
      pass,
    );

    return this.authService.login(konsumen);
  }
}
