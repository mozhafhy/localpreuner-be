import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Redirect,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { KonsumenService } from '../services/konsumen.service';
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RegisterKonsumenDto } from '../dto/register-konsumen.dto';
import {
  RegisterKonsumenSuccessResponseDto,
  ResponseWithJwt,
} from 'src/commons/dto/successful-response.dto';
import { ApiErrorDecorator } from 'src/commons/decorators/api-error.decorator';
import { JwtKonsumenRegistGuard } from 'src/guard/jwt-konsumen-regist.guard';
import { AddUsernameAndPasswordDto } from '../dto/add-and-username-password.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { Konsumen } from '../entities/konsumen.entity';
import { ResponsMessage } from 'src/commons/enums/response-message.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from '../dto/file-upload.dto';
// import { RegisterKonsumenConflictErrorDto } from 'src/commons/dtos/error-response.dto';

@Controller('/users')
export class KonsumenController {
  constructor(private konsumenService: KonsumenService) {}

  // ! register
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

  // ! add username and password
  @UseGuards(JwtKonsumenRegistGuard)
  @Patch('/konsumen/add-username-and-password')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Add username and password after verfying OTP' })
  @ApiBody({ type: AddUsernameAndPasswordDto })
  @ApiOkResponse({
    description: 'Successfully login',
    type: ResponseWithJwt,
  })
  @ApiErrorDecorator(
    HttpStatus.NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    'Not Found',
  )
  addUsernameAndPassword(
    @Body() addUserAndPasswordDto: AddUsernameAndPasswordDto,
  ) {
    return this.konsumenService.addUsernameAndPassword(
      addUserAndPasswordDto.email,
      addUserAndPasswordDto,
    );
  }

  // ! update profile
  @UseGuards(JwtAuthGuard)
  @Patch('/profile/:username/update-profile')
  @UseInterceptors(
    FileInterceptor('media', {
      limits: { fileSize: Math.pow(1024, 2) * 10 },
    }),
  )
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Update UMKM profile, bearer token is required to do this request',
  })
  @ApiParam({
    name: 'username',
    description: 'The username of the user to update',
    type: String,
  })
  @ApiBody({ type: UpdateProfileDto })
  @ApiOkResponse({
    description: 'Successfully login',
    type: ResponseWithJwt,
  })
  @ApiErrorDecorator(
    HttpStatus.NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    'Not Found',
  )
  @ApiErrorDecorator(
    HttpStatus.UNAUTHORIZED,
    ResponsMessage.UNAUTHORIZED,
    ResponsMessage.UNAUTHORIZED,
    'Unauthorized',
  )
  updateUserProfile(
    @Param('username') username: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() FileUploadDto: FileUploadDto,
  ) {
    return this.konsumenService.updateUserProfile(
      username,
      updateProfileDto,
      FileUploadDto,
    );
  }

  // ! get profile
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
    type: String,
  })
  @ApiOkResponse({
    type: Konsumen,
  })
  @ApiErrorDecorator(
    HttpStatus.NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    'Not Found',
  )
  getKonsumenProfile(@Param('username') username: string) {
    return this.konsumenService.getKonsumenProfile(username);
  }

  // ! view account
  @UseGuards(JwtAuthGuard)
  @Get('/view-account/:username')
  @Redirect()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'View UMKM account' })
  @ApiParam({
    name: 'username',
    description: 'The username of the user to retrieve',
    type: String,
  })
  @ApiOkResponse({
    type: Konsumen,
  })
  @ApiErrorDecorator(
    HttpStatus.NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    'Not Found',
  )
  viewAccount(@Param('username') username: string) {
    return this.konsumenService.viewAccount(username);
  }
}
