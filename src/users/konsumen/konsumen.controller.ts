import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { KonsumenService } from './konsumen.service';
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
import { RegisterKonsumenDto } from './dto/register-konsumen.dto';

@Controller()
export class KonsumenController {
  constructor(private konsumenService: KonsumenService) {}

  @Post('users/register-konsumen')
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
  @ApiBody({ type: RegisterKonsumenDto })
  register(@Body() registerKonsumenDto: RegisterKonsumenDto) {
    return this.konsumenService.register(
      registerKonsumenDto.displayName,
      registerKonsumenDto.email,
      registerKonsumenDto.password,
      registerKonsumenDto.username,
      registerKonsumenDto.profileImgURL,
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
