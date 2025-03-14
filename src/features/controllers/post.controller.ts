import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { FilterPostDto } from '../dto/filter-post.dto';

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

  @Get('/feed')
  getFeed() {
    return this.postService.getFeed();
  }

  @Get('/filter-post')
  filterPost(
    @Param('username') username: string,
    @Query() filterPostDto: FilterPostDto,
  ) {
    return this.postService.filterPost(filterPostDto);
  }
}
