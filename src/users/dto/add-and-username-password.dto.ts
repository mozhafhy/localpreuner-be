import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class AddUsernameAndPasswordDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ type: String, minLength: 8 })
  password: string;
}
