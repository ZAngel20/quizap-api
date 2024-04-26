import { IsNotEmpty } from 'class-validator';
export class AuthTokenDto {
  @IsNotEmpty()
  accessToken: string;
}
