import { ApiProperty } from '@nestjs/swagger';

export class DeleteSocmedDto {
  @ApiProperty({ type: String })
  account: string;
}
