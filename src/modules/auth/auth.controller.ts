import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth-signin.dto';
import {
  SwBodyAuthSignIn,
  SwBodyAuthSignUp,
  SwOperationAuthSignIn,
  SwOperationAuthSignUp,
} from './auth.swagger';
import { AuthTokenDto } from './dto/auth-token.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  /*
   *  POST
   */

  @Post('signUp')
  @ApiBody(SwBodyAuthSignUp)
  @ApiOperation(SwOperationAuthSignUp)
  signUp(@Body() dto: AuthSignUpDto) {
    return this.service.signUp(dto);
  }

  @Post('signIn')
  @ApiBody(SwBodyAuthSignIn)
  @ApiOperation(SwOperationAuthSignIn)
  signIn(@Body() dto: AuthSignInDto): Promise<AuthTokenDto> {
    return this.service.signIn(dto);
  }
}
