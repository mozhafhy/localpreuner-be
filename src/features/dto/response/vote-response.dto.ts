import { ApiProperty } from '@nestjs/swagger';
import { Vote } from 'src/features/entities/vote.entitiy';

export class VoteResponseDto {
  @ApiProperty({ type: String })
  postID: string;

  @ApiProperty({ type: String })
  media: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Number })
  upvotes: number;

  @ApiProperty({ type: Number })
  downvotes: number;

  @ApiProperty({ type: Vote, isArray: true })
  votes: Vote[];
}
