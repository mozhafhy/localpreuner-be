import { ApiProperty } from '@nestjs/swagger';

export class AddCategoryDto {
  @ApiProperty({ type: String })
  value: string;
}

export class RemoveCategoryDto {
  @ApiProperty({ type: String })
  value: string;
}
