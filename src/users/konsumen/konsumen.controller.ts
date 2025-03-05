import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { KonsumenService } from './konsumen.service';
import { RegisterDto } from 'src/auth/auth.dto';
import {
  ApiOperation,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { Konsumen } from './konsumen.entity';

@Controller()
export class KonsumenController {
  constructor(private konsumenService: KonsumenService) {}

  @Post('auth/register-konsumen')
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

  @UseGuards(JwtAuthGuard)
  @Get('profile/:username')
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
