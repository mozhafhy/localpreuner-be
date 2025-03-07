import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username konsumen, wajib diisi',
    example: 'johndoe01',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password konsumen, wajib diisi',
    example: 'johndoe123',
  })
  @IsNotEmpty()
  password: string;
}
