import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LevelCreateDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  idCategory: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
