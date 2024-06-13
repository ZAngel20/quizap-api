import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class QuestionAddAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  idQuestion: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  idAnswer: number;
}
