import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KonsumenService } from 'src/users/konsumen.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { Konsumen } from 'src/users/konsumen.entity';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

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
}
