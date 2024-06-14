import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthRequestPasswdChangeDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
