import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ type: String })
  displayName?: string;

  @ApiPropertyOptional({ type: String })
  fullAddress?: string;

  @ApiPropertyOptional({ type: String })
  province?: string;

  @ApiPropertyOptional({ type: String })
  city?: string;

  @ApiPropertyOptional({ type: String })
  description?: string;
}
