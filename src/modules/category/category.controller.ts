import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from '../../data/entities/category.entity';
import { GetAdmin, GetUser } from '../../shared/decoratos/user.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryCreateDto } from './dto/category-create.dto';
import * as schema from './category.swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) {}

  /*
   *  GET
   */

  @Get()
  @ApiResponse({ status: 200, type: CategoryEntity, isArray: true })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCategories(@GetUser() user): Promise<CategoryEntity[]> {
    return this.service.getCategories();
  }

  @Get('/:id')
  @ApiResponse({ status: 404, description: '[category] not found' })
  @ApiResponse({ status: 200, type: CategoryEntity })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getACategory(
    @GetUser() user,
    @Param('id') id: number,
  ): Promise<CategoryEntity> {
    return this.service.getACategory(id);
  }

  /*
   *  POST
   */

  @Post()
  @ApiBody(schema.SwBodyCategoryCreate)
  @ApiOperation(schema.SwOperationCategoryCreate)
  @ApiResponse({ status: 403 })
  @ApiResponse({ status: 201 })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createCategory(
    @GetAdmin() user,
    @Body() dto: CategoryCreateDto,
  ): Promise<void> {
    return this.service.createCategorie(dto);
  }
}
