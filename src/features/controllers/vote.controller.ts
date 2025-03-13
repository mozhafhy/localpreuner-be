import { Controller, Delete, Param, Post } from '@nestjs/common';
import { VoteService } from '../services/vote.service';

@Controller('/users/:username')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Post('/vote/:upvote/:postID')
  upvote(
    @Param('username') username: string,
    @Param('upvote') upvote: boolean,
    @Param('postID') postID: string,
  ) {
    return this.voteService.addVotes(username, upvote, postID);
  }

  @Delete('unvote/:postID')
  removeVote(
    @Param('username') username: string,
    @Param('postID') postID: string,
  ) {
    return this.voteService.removeVote(username, postID);
  }
}
