import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { KonsumenService } from '../services/konsumen.service';
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
import { RegisterKonsumenDto } from '../dto/register-konsumen.dto';
import { RegisterKonsumenSuccessResponseDto } from 'src/commons/dto/successful-response.dto';
import { ApiErrorDecorator } from 'src/commons/decorators/api-error.decorator';
import { JwtKonsumenRegistGuard } from 'src/guard/jwt-konsumen-regist.guard';
import { AddUsernameAndPasswordDto } from '../dto/add-and-username-password.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ResponseDto } from 'src/commons/response/konsumen-regist.dto';
// import { RegisterKonsumenConflictErrorDto } from 'src/commons/dtos/error-response.dto';

@Controller('/users')
export class KonsumenController {
  constructor(private konsumenService: KonsumenService) {}

  @Post('/konsumen/register-konsumen')
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
    );
  }

  @UseGuards(JwtKonsumenRegistGuard)
  @Patch('/konsumen/add-username-and-password')
  addUsernameAndPassword(
    @Body('email') email: string,
    @Body() addUserAndPasswordDto: AddUsernameAndPasswordDto,
  ) {
    return this.konsumenService.addUsernameAndPassword(
      email,
      addUserAndPasswordDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/profile/:username/update-profile')
  updateUserProfile(
    @Param('username') username: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.konsumenService.updateUserProfile(username, updateProfileDto);
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
    type: ResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Konsumen cannot be found' })
  getKonsumenProfile(@Param('username') username: string) {
    return this.konsumenService.getKonsumenProfile(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/view-account/:username')
  @Redirect()
  viewAccount(@Param('username') username: string) {
    return this.konsumenService.viewAccount(username);
  }
}
