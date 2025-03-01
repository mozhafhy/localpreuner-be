import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { KonsumenService } from './konsumen.service';
import { RegisterDto } from 'src/auth/auth.dto';
import {
  ApiOperation,
  // ApiOkResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Konsumen } from './konsumen.entity';
// import { Konsumen } from './konsumen.entity';

@Controller('users')
export class KonsumenController {
  constructor(private konsumenService: KonsumenService) {}

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

  @Get(':username')
  @ApiOperation({ summary: 'Get konsumen information' })
  @ApiParam({
    name: 'username',
    description: 'The username of the user to retrieve',
    example: 'johndoe01',
  })
  @ApiOkResponse({
    type: Konsumen,
  })
  @ApiNotFoundResponse({ description: 'Konsumen tidak ditemukan' })
  getKonsumenProfile(@Param('username') username: string) {
    return this.konsumenService.getKonsumenProfile(username);
  }
}
