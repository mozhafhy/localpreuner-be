import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto, DeletePostDto } from '../dto/post-action.dto';
import { FilterPostDto } from '../dto/filter-post.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import {
  PostCreatedDto,
  PostDeletedDto,
  PostFeed,
} from '../dto/response/post-response.dto';
import { ApiErrorDecorator } from 'src/commons/decorators/api-error.decorator';
import {
  BadRequestMessage,
  ResponsMessage,
} from 'src/commons/enums/response-message.enum';
import { FilterResponseDto } from '../dto/response/filter-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/users/:username')
export class PostController {
  constructor(private postService: PostService) {}

  // ! create 1 UMKM post
  @Post('/create-post')
  @UseInterceptors(
    FileInterceptor('media', {
      limits: { fileSize: Math.pow(1024, 2) * 10 },
    }),
  )
  @ApiOperation({ summary: 'Create 1 UMKM post' })
  @ApiCreatedResponse({ type: PostCreatedDto })
  @ApiErrorDecorator(
    HttpStatus.NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    'Not Found',
  )
  @ApiErrorDecorator(
    HttpStatus.UNAUTHORIZED,
    ResponsMessage.UNAUTHORIZED,
    ResponsMessage.UNAUTHORIZED,
    'Unauthorized',
  )
  @ApiParam({
    name: 'username',
    type: String,
  })
  @ApiBody({ type: CreatePostDto })
  createPost(
    @Param('username') username: string,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() media?: Express.Multer.File,
  ) {
    return this.postService.createPost(username, createPostDto, media);
  }

  // ! delete 1 UMKM post
  @Delete('/delete-post')
  @ApiOperation({ summary: 'Delete 1 UMKM post' })
  @ApiCreatedResponse({ type: PostDeletedDto })
  @ApiErrorDecorator(
    HttpStatus.NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    ResponsMessage.KONSUMEN_NOT_FOUND,
    'Not Found',
  )
  @ApiErrorDecorator(
    HttpStatus.UNAUTHORIZED,
    ResponsMessage.UNAUTHORIZED,
    ResponsMessage.UNAUTHORIZED,
    'Unauthorized',
  )
  @ApiErrorDecorator(
    HttpStatus.BAD_REQUEST,
    BadRequestMessage.NO_POST,
    BadRequestMessage.NO_POST,
    'Bad Request',
  )
  @ApiParam({
    name: 'username',
    type: String,
  })
  @ApiBody({ type: DeletePostDto })
  deletePost(
    @Param('username') username: string,
    @Body('postId') postId: string,
  ) {
    return this.postService.deletePost(username, postId);
  }

  // ! get posts feed
  @Get('/feed')
  @ApiOperation({
    summary:
      'Get list of 100 posts based on their time created and number of upvotes, order: DESCENDING ',
  })
  @ApiOkResponse({ type: PostFeed })
  @ApiParam({
    name: 'username',
    type: String,
  })
  getFeed() {
    return this.postService.getFeed();
  }

  // ! filter posts
  @Get('/filter-post')
  @ApiOperation({
    summary:
      'Get filtered posts by location, category, latest, or most upvotes',
  })
  @ApiParam({
    name: 'username',
    type: String,
  })
  @ApiOkResponse({ type: FilterResponseDto, isArray: true })
  filterPost(@Query() filterPostDto: FilterPostDto) {
    return this.postService.filterPost(filterPostDto);
  }
}
