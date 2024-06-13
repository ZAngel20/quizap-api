import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class LevelAddQuestionDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  idLevel: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  idQuestion: number;
}
