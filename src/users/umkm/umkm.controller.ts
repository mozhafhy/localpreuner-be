import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUmkmDto } from './dto/register-umkm.dto';
import { UmkmService } from './umkm.service';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { RegisterUmkmSuccessResponseDto } from 'src/commons/dtos/successful-response.dto';

@Controller()
export class UmkmController {
  constructor(private umkmService: UmkmService) {}

  @Post('users/register-umkm')
  @ApiOperation({ summary: 'Register as UMKM' })
  @ApiBody({ type: RegisterUmkmDto })
  @ApiCreatedResponse({
    description: 'UMKM registered successfully',
    type: RegisterUmkmSuccessResponseDto,
  })
  registerUmkm(@Body() registerUmkmDto: RegisterUmkmDto) {
    return this.umkmService.registerUmkm(
      registerUmkmDto.username,
      registerUmkmDto,
    );
  }
}
