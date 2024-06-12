import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth-signin.dto';
import * as schema from './auth.swagger';
import { AuthTokenDto } from './dto/auth-token.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthSignUpCodeDto } from './dto/auth-signup-code.dto';
import { AuthSendActivationMail } from './dto/auth-send-activation-mail.dto';

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
  @ApiResponse({ status: 409, description: '[user-email] already exists' })
  @ApiResponse({ status: 201 })
  signUp(@Body() dto: AuthSignUpDto) {
    return this.service.signUp(dto);
  }

  @Post('signUpCode')
  @ApiBody(schema.SwBodyAuthSignUpCode)
  @ApiOperation(schema.SwOperationAuthSignUpCode)
  @ApiResponse({ status: 404, description: '[user] not found' })
  @ApiResponse({ status: 403, description: '[user-status] is already activat' })
  @ApiResponse({ status: 403, description: '[user-token] is not valid' })
  @ApiResponse({ status: 201 })
  signUpCode(@Body() dto: AuthSignUpCodeDto) {
    return this.service.signUpCode(dto);
  }

  @Post('signIn')
  @ApiBody(schema.SwBodyAuthSignIn)
  @ApiOperation(schema.SwOperationAuthSignIn)
  @ApiResponse({ status: 404, description: '[user] not found' })
  @ApiResponse({ status: 403, description: '[user-status] is not active' })
  @ApiResponse({ status: 201, type: AuthTokenDto })
  signIn(@Body() dto: AuthSignInDto): Promise<AuthTokenDto> {
    return this.service.signIn(dto);
  }

  @Post('resendActivationMail')
  @ApiBody(schema.SwBodyAuthSendActivationMail)
  @ApiOperation(schema.SwOperationSendActivationMail)
  @ApiResponse({ status: 404, description: '[user] not found' })
  @ApiResponse({ status: 201 })
  resendActivationMail(@Body() dto: AuthSendActivationMail) {
    return this.service.resendActivationMail(dto);
  }
}
