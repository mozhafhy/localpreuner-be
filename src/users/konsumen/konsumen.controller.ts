import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { KonsumenService } from './konsumen.service';
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RegisterKonsumenDto } from './dto/register-konsumen.dto';
import {
  GetUserProfileSuccessResponse,
  RegisterKonsumenSuccessResponseDto,
} from 'src/commons/dtos/successful-response.dto';
import { ApiErrorDecorator } from 'src/commons/decorators/api-error.decorator';
// import { RegisterKonsumenConflictErrorDto } from 'src/commons/dtos/error-response.dto';

@Controller()
export class KonsumenController {
  constructor(private konsumenService: KonsumenService) {}

  @Post('/users/register-konsumen')
  @ApiOperation({
    summary: 'Register the new konsumen',
  })
  @ApiCreatedResponse({
    description: 'Konsumen registered succesfully',
    type: RegisterKonsumenSuccessResponseDto,
  })
  @ApiErrorDecorator(
    HttpStatus.CONFLICT,
    'Username or email already in use',
    'Failed to register',
    'Conflict',
  )
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
  @Get('/profile/:username')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary:
      'Get konsumen information, bearer token is required to do this request',
  })
  @ApiParam({
    name: 'username',
    description: 'The username of the user to retrieve',
    example: 'johndoe01',
  })
  @ApiOkResponse({
    type: GetUserProfileSuccessResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Konsumen cannot be found' })
  getKonsumenProfile(@Param('username') username: string) {
    return this.konsumenService.getKonsumenProfile(username);
  }
}
