import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './create-post.dto';

@Controller('/users/:username')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/create-post')
  createPost(
    @Param('username') username: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.creatPost(username, createPostDto);
  }

  @Delete('/delete-post')
  deletePost(@Param('username') username: string, @Body('id') id: string) {
    return this.postService.deletePost(username, id);
  }
}
