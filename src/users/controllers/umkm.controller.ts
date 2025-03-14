import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { RegisterUmkmDto } from '../dto/register-umkm.dto';
import { UmkmService } from '../services/umkm.service';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { RegisterUmkmSuccessResponseDto } from 'src/commons/dto/successful-response.dto';
import { ApiErrorDecorator } from 'src/commons/decorators/api-error.decorator';
import {
  BadRequestMessage,
  ConflictMessage,
} from 'src/commons/enums/response-message.enum';

@Controller('/users')
export class UmkmController {
  constructor(private umkmService: UmkmService) {}

  @Post('/umkm/register-umkm')
  @ApiOperation({ summary: 'Register as UMKM' })
  @ApiBody({ type: RegisterUmkmDto })
  @ApiCreatedResponse({
    description: 'UMKM registered successfully',
    type: RegisterUmkmSuccessResponseDto,
  })
  @ApiErrorDecorator(
    HttpStatus.BAD_REQUEST,
    BadRequestMessage.KONSUMEN_NOT_REGISTERED,
    'User is not registered yet',
    'Bad Request',
  )
  @ApiErrorDecorator(
    HttpStatus.CONFLICT,
    ConflictMessage.MORE_THAN_ONE_UMKM,
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
