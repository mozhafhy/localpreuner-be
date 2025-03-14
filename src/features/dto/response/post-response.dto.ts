import { HttpStatus } from '@nestjs/common';
import { Post as PostEntity } from '../../entities/post.entity';
import {
  CreatedMessage,
  OkMessage,
} from 'src/commons/enums/response-message.enum';
import { ApiProperty } from '@nestjs/swagger';

export class PostCreatedDto {
  @ApiProperty({ type: PostEntity, isArray: true })
  posts: PostEntity[];

  @ApiProperty({ default: CreatedMessage.POST })
  message: CreatedMessage;

  @ApiProperty({ default: HttpStatus.CREATED })
  statusCode: HttpStatus;
}

export class PostDeletedDto {
  @ApiProperty({ type: PostEntity, isArray: true })
  posts: PostEntity[];

  @ApiProperty({ default: OkMessage.DELETE_POST })
  message: OkMessage;

  @ApiProperty({ default: HttpStatus.OK })
  statusCode: HttpStatus;
}

export class PostFeed {
  @ApiProperty({ type: PostEntity, isArray: true })
  post: PostEntity[];
}
