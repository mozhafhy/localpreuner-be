import { Controller, Body, Delete, Param, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';

@Controller('/users/:username')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/add-category')
  addCategory(
    @Param('username') username: string,
    @Body('value') value: string,
  ) {
    return this.categoryService.addCategory(username, value);
  }

  @Delete('/remove-category')
  removeCategory(
    @Param('username') username: string,
    @Body('value') value: string,
  ) {
    return this.categoryService.removeCategory(username, value);
  }
}
