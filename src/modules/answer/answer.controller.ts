import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerCreateDto } from './dto/answer-create.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import * as schema from './answer.swagger';
import { GetAdmin } from '../../shared/decoratos/user.decorator';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('Answer')
@Controller('answer')
export class AnswerController {
  constructor(private service: AnswerService) {}

  /*
   *  GET
   */

  @Get('/:idQuestion')
  @ApiResponse({ status: 404, description: '[question] not found' })
  @ApiResponse({ status: 200 })
  getQuestionAnswers(@Param('idQuestion') idQuestion: number) {
    return this.service.getQuestionAnswers(idQuestion);
  }

  @Get('/correct/:idQuestion')
  @ApiResponse({ status: 404, description: '[question] not found' })
  @ApiResponse({ status: 200 })
  getQuestionAnswer(@Param('idQuestion') idQuestion: number) {
    return this.service.getQuestionAnswer(idQuestion);
  }

  /*
   *  POST
   */

  @Post()
  @ApiOperation(schema.SwOperationAnswerCreate)
  createAnswer(@GetAdmin() user, @Body() dto: AnswerCreateDto) {
    return this.service.createAnswer(dto);
  }
}
