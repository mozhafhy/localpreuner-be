import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUmkmDto } from './dto/register-umkm.dto';
import { UmkmService } from './umkm.service';

@Controller()
export class UmkmController {
  constructor(private umkmService: UmkmService) {}

  @Post('auth/register-umkm')
  registerUmkm(
    @Body('username') username: string,
    @Body() registerUmkmDto: RegisterUmkmDto,
  ) {
    // console.error(username);
    return this.umkmService.registerUmkm(username, registerUmkmDto);
  }
}
