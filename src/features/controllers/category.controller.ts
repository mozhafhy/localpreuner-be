import {
  Controller,
  Body,
  Delete,
  Param,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import {
  AddCategoryDto,
  RemoveCategoryDto,
} from '../dto/response/category-response.dto';
import { ApiErrorDecorator } from 'src/commons/decorators/api-error.decorator';
import { ResponsMessage } from 'src/commons/enums/response-message.enum';
import { Konsumen } from 'src/users/entities/konsumen.entity';

@Controller('/users/:username')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // ! add 1 category
  @Post('/add-category')
  @ApiOperation({ summary: 'Add 1 UMKM category' })
  @ApiParam({
    name: 'username',
    type: String,
  })
  @ApiBody({ type: AddCategoryDto })
  @ApiOkResponse({ type: Konsumen })
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
  addCategory(
    @Param('username') username: string,
    @Body('value') value: string,
  ) {
    return this.categoryService.addCategory(username, value);
  }

  // ! remove 1 UMKM category
  @Delete('/remove-category')
  @ApiOperation({ summary: 'Remove 1 UMKM category' })
  @ApiParam({
    name: 'username',
    type: String,
  })
  @ApiBody({ type: RemoveCategoryDto })
  @ApiOkResponse({ type: Konsumen })
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
  removeCategory(
    @Param('username') username: string,
    @Body('value') value: string,
  ) {
    return this.categoryService.removeCategory(username, value);
  }
}
