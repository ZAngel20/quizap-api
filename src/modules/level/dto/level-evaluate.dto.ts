import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

class EvaluateQuestion {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  idQuestion: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  idAnswer: number;
}

export class LevelEvaluateDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  idLevel: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EvaluateQuestion)
  @ApiProperty({ type: [EvaluateQuestion] })
  questions: EvaluateQuestion[];
}
