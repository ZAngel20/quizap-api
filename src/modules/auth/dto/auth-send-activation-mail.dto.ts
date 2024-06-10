import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthSendActivationMail {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
