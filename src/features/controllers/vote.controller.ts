import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { VoteService } from '../services/vote.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { VoteResponseDto } from '../dto/response/vote-response.dto';
import { ApiErrorDecorator } from 'src/commons/decorators/api-error.decorator';
import {
  BadRequestMessage,
  ResponsMessage,
} from 'src/commons/enums/response-message.enum';

@Controller('/users/:username')
export class VoteController {
  constructor(private voteService: VoteService) {}

  // ! vote
  @Post('/vote/:upvote')
  @ApiOperation({ summary: 'Make a vote' })
  @ApiOkResponse({ type: VoteResponseDto })
  @ApiErrorDecorator(
    HttpStatus.NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    'Not Found',
  )
  @ApiErrorDecorator(
    HttpStatus.BAD_REQUEST,
    BadRequestMessage.POST_NOT_EXIST,
    BadRequestMessage.POST_NOT_EXIST,
    'Bad Request',
  )
  upvote(
    @Param('username') username: string,
    @Param('upvote') upvote: boolean,
    @Query('postId') postId: string,
  ) {
    return this.voteService.addVotes(username, upvote, postId);
  }

  // ! unvote
  @Delete('/unvote')
  @ApiOperation({ summary: 'Cancel a vote' })
  @ApiOkResponse({ type: VoteResponseDto })
  @ApiErrorDecorator(
    HttpStatus.NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    'Not Found',
  )
  @ApiErrorDecorator(
    HttpStatus.BAD_REQUEST,
    BadRequestMessage.POST_NOT_EXIST,
    BadRequestMessage.POST_NOT_EXIST,
    'Bad Request',
  )
  removeVote(
    @Param('username') username: string,
    @Query('postId') postId: string,
  ) {
    return this.voteService.removeVote(username, postId);
  }
}
