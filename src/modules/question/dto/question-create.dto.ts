import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuestionCreateDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  idAnswer: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  text: string;
}
