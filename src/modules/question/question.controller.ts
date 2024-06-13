import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QuestionService } from './question.service';
import { QuestionCreateDto } from './dto/question-create.dto';
import { GetAdmin } from '../../shared/decoratos/user.decorator';
import { QuestionAddAnswerDto } from './dto/question-add-answer.dto';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('Question')
@Controller('question')
export class QuestionController {
  constructor(private service: QuestionService) {}

  /*
   *  GET
   */

  @Get('/:idLevel')
  @ApiResponse({ status: 404, description: '[level] not found' })
  @ApiResponse({ status: 200 })
  getLevelQuestions(@Param('idLevel') idLevel: number) {
    return this.service.getLevelQuestions(idLevel);
  }

  /*
   *  POST
   */

  @Post()
  @ApiResponse({ status: 404, description: '[answer] not found' })
  @ApiResponse({ status: 201 })
  createQuestion(@GetAdmin() user, @Body() dto: QuestionCreateDto) {
    return this.service.createQuestion(dto);
  }

  @Post('/addAnswer')
  @ApiResponse({ status: 404, description: '[question] not found' })
  @ApiResponse({ status: 404, description: '[answer] not found' })
  @ApiResponse({
    status: 400,
    description: '[question-answer] cannot be added again',
  })
  @ApiResponse({ status: 201 })
  addAnswer(@GetAdmin() user, @Body() dto: QuestionAddAnswerDto) {
    return this.service.addAnswer(dto);
  }
}
