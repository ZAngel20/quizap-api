import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth-signin.dto';
import * as schema from './auth.swagger';
import { AuthTokenDto } from './dto/auth-token.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthSignUpCodeDto } from './dto/auth-signup-code.dto';
import { AuthSendActivationMail } from './dto/auth-send-activation-mail.dto';
import { UserEntity } from '../../data/entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  /*
   *  POST
   */

  @Post('signUp')
  @ApiBody(schema.SwBodyAuthSignUp)
  @ApiOperation(schema.SwOperationAuthSignUp)
  signUp(@Body() dto: AuthSignUpDto) {
    return this.service.signUp(dto);
  }

  @Post('signUpCode')
  @ApiBody(schema.SwBodyAuthSignUpCode)
  @ApiOperation(schema.SwOperationAuthSignUpCode)
  signUpCode(@Body() dto: AuthSignUpCodeDto) {
    return this.service.signUpCode(dto);
  }

  @Post('signIn')
  @ApiBody(schema.SwBodyAuthSignIn)
  @ApiOperation(schema.SwOperationAuthSignIn)
  signIn(@Body() dto: AuthSignInDto): Promise<AuthTokenDto> {
    return this.service.signIn(dto);
  }

  @Post('resendActivationMail')
  @ApiBody(schema.SwBodyAuthSendActivationMail)
  @ApiOperation(schema.SwOperationSendActivationMail)
  resendActivationMail(@Body() dto: AuthSendActivationMail) {
    return this.service.resendActivationMail(dto);
  }

  @Get('getUser/test')
  @UseGuards(AuthGuard())
  getUserTest(@GetUser() user: UserEntity) {
    return user;
  }
}
