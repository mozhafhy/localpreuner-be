import { IsEmail } from 'class-validator';

export class RegisterDto {
  namaLengkap: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email: string;

  password: string;
  username: string;
  fotoProfilURL: string;
}
