import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthSignUpCodeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  token: string;
}
