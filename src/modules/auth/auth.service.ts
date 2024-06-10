import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../../data/entities/user.entity';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { JwtPayload } from './jwt-payload.interface';
import { AuthTokenDto } from './dto/auth-token.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthSignUpCodeDto } from './dto/auth-signup-code.dto';
import { SecurityService } from '../../shared/services/security.service';
import { EmailsenderService } from '../../shared/services/email-sender.service';
import { UserStatus } from '../../data/enums/user-status.enum';
import { AuthSendActivationMail } from './dto/auth-send-activation-mail.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private jwtService: JwtService,
    private securityService: SecurityService,
    private emailSenderService: EmailsenderService,
  ) {}

  async signUp(dto: AuthSignUpDto) {
    try {
      const { userName, passwd, email } = dto;

      // HASH PASSWD
      const salt = await bcrypt.genSalt();
      const hashedPasswd = await bcrypt.hash(passwd, salt);

      // GENERATE TOKEN
      const activationToken = await this._generateAccessToken();

      // SAVE USER
      const user: UserEntity = this.repository.create({
        userName,
        passwd: hashedPasswd,
        email,
        activationToken,
      });
      await this.repository.save(user);

      // SEND MAIL
      await this._sendActivationMail({ email, activationToken });
    } catch (ex) {
      if (ex.code == 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signUpCode(dto: AuthSignUpCodeDto) {
    const { email, token } = dto;

    // GET USER
    const user = await this.repository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('[user] not found');

    // CHECK STATUS
    if (user.status == UserStatus.Active) {
      throw new ForbiddenException('[user-status] is already activated');
    }

    // CHECK TOKEN
    if (user.activationToken !== token) {
      throw new ForbiddenException('[user-token] is not valid');
    }

    user.activatedDate = new Date();
    user.status = UserStatus.Active;
    user.activationToken = null;

    return this.repository.save(user);
  }

  async signIn(dto: AuthSignInDto): Promise<AuthTokenDto> {
    const { email, passwd } = dto;

    // GET USER
    const user = await this.repository.findOneBy({ email });
    if (!user) throw new NotFoundException('[user] not found');

    // CHECK STATUS
    if (user.status != UserStatus.Active) {
      throw new ForbiddenException('[user-status] is not active');
    }

    if (user && (await bcrypt.compare(passwd, user.passwd))) {
      const { id, type } = user;

      const payload: JwtPayload = { id, email, type };
      const accessToken: string = this.jwtService.sign(payload, {
        expiresIn: '9999 years',
      });

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your username or passwd');
    }
  }

  async resendActivationMail(dto: AuthSendActivationMail) {
    // GET USER
    const user = await this.repository.findOne({ where: { email: dto.email } });
    if (!user) throw new NotFoundException('[user] not found');

    // GENERATE TOKEN
    const activationToken = await this._generateAccessToken();
    user.activationToken = activationToken;
    await this.repository.save(user);

    // SEND MAIL
    this._sendActivationMail({ email: user.email, activationToken });
  }

  async _generateAccessToken(): Promise<string> {
    return this.securityService.generateToken(4);
  }

  async _sendActivationMail({ email, activationToken }) {
    return this.emailSenderService.send(
      email,
      'Activation Mail',
      `Token: ${activationToken}`,
    );
  }
}
