import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class AuthTokenDto {
  @IsNotEmpty()
  @ApiProperty()
  accessToken: string;
}
