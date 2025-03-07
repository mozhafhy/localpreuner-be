import { IsNotEmpty, MinLength } from 'class-validator';

export class AddUsernameAndPasswordDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
