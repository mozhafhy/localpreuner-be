import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { RegisterUmkmDto } from './dto/register-umkm.dto';
import { UmkmService } from './umkm.service';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { RegisterUmkmSuccessResponseDto } from 'src/commons/dto/successful-response.dto';
import { ApiErrorDecorator } from 'src/commons/decorators/api-error.decorator';

@Controller()
export class UmkmController {
  constructor(private umkmService: UmkmService) {}

  @Post('/users/register-umkm')
  @ApiOperation({ summary: 'Register as UMKM' })
  @ApiBody({ type: RegisterUmkmDto })
  @ApiCreatedResponse({
    description: 'UMKM registered successfully',
    type: RegisterUmkmSuccessResponseDto,
  })
  @ApiErrorDecorator(
    HttpStatus.BAD_REQUEST,
    'You to register as konsumen first',
    'User is not registered yet',
    'Bad Request',
  )
  @ApiErrorDecorator(
    HttpStatus.CONFLICT,
    'User already has an UMKM. Only 1 UMKM is allowed for each users',
    'UMKM already exist',
    'Conflict',
  )
  registerUmkm(@Body() registerUmkmDto: RegisterUmkmDto) {
    return this.umkmService.registerUmkm(
      registerUmkmDto.username,
      registerUmkmDto,
    );
  }
}
