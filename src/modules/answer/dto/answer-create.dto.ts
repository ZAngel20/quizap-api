import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AnswerCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  text: string;
}
