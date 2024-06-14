import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthChangeInfoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userName: string;
}
