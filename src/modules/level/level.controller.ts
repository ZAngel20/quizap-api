import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LevelService } from './level.service';
import { GetAdmin, GetUser } from '../../shared/decoratos/user.decorator';
import { LevelCreateDto } from './dto/level-create.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LevelAddQuestionDto } from './dto/level-add-question.dto';
import { AuthGuard } from '@nestjs/passport';
import { LevelEvaluateDto } from './dto/level-evaluate.dto';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('Level')
@Controller('level')
export class LevelController {
  constructor(private service: LevelService) {}

  /*
   *  GET
   */

  @Get('/:idCategory')
  // @ApiResponse({ status: 404, description: '[level] not found' })
  // @ApiResponse({ status: 200 })
  getCategoryLevels(@Param('idCategory') idCategory: number) {
    return this.service.getCategoryLevels(idCategory);
  }

  /*
   *  POST
   */

  @Post()
  @ApiResponse({ status: 404, description: '[category] not found' })
  @ApiResponse({ status: 201 })
  createLevel(@GetAdmin() user, @Body() dto: LevelCreateDto) {
    return this.service.createLevel(dto);
  }

  @Post('/addQuestion')
  @ApiResponse({ status: 404, description: '[question] not found' })
  @ApiResponse({ status: 404, description: '[level] not found' })
  @ApiResponse({
    status: 400,
    description: '[level-question] cannot be added again',
  })
  @ApiResponse({ status: 201 })
  addQuestion(@GetAdmin() user, @Body() dto: LevelAddQuestionDto) {
    return this.service.addQuestion(dto);
  }

  @Post('/evaluateLevel')
  @ApiResponse({ status: 404, description: '[level] not found' })
  @ApiResponse({ status: 201 })
  evaluateLevel(@GetUser() user, @Body() dto: LevelEvaluateDto) {
    return this.service.evaluateLevel(user, dto);
  }
}
