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
import { AuthRequestPasswdChangeDto } from './dto/auth-request-passwd-change.dto';
import { AuthChangePasswdDto } from './dto/auth-change-passwd.dto';
import { AuthChangeInfoDto } from './dto/auth-change-info.dto';
import { RankingEntity } from '../../data/entities/ranking.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    @InjectRepository(RankingEntity)
    private rankingRepository: Repository<RankingEntity>,
    private jwtService: JwtService,
    private securityService: SecurityService,
    private emailSenderService: EmailsenderService,
  ) {}

  async getUserByToken(user: UserEntity): Promise<UserEntity> {
    user = await this.repository.findOne({
      where: { id: user.id },
      select: ['id', 'userName', 'email'],
    });

    return user;
  }

  async getUserById(id: string): Promise<UserEntity> {
    return this.repository.findOne({ where: { id } });
  }

  async signUp(dto: AuthSignUpDto) {
    try {
      const { userName, passwd, email } = dto;

      // HASH PASSWD
      const hashedPasswd = await this._hashPasswd(passwd);

      // GENERATE TOKEN
      const activationToken = await this._generateToken();

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
        throw new ConflictException('[user-email] already exists');
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

    // CREATE SCORE ROW
    const ranking = {
      idUser: user.id,
      score: 0,
    };
    await this.rankingRepository.save(ranking);

    user.activatedDate = new Date();
    user.status = UserStatus.Active;
    user.activationToken = null;
    await this.repository.save(user);
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

  async requestPasswdChange(dto: AuthRequestPasswdChangeDto) {
    const { email } = dto;

    // GET USER
    const user = await this.repository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('[user] not found');

    // GENERATE TOKEN
    const token = await this._generateToken();

    // SAVE TOKEN
    user.passwdToken = token;
    await this.repository.save(user);

    // SEND MAIL
    await this._sendChangePasswdTokenMail({ email, token });
  }

  async changePasswd(dto: AuthChangePasswdDto) {
    const { email, token, newPasswd } = dto;

    // GET USER
    const user = await this.repository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('[user] not found');

    // CHECK TOKEN
    if (user.passwdToken !== token) {
      throw new ForbiddenException('[user-token] is not valid');
    }

    // CHANGE PASSWD
    const hashedPasswd = await this._hashPasswd(newPasswd);

    user.passwd = hashedPasswd;
    user.passwdToken = null;
    await this.repository.save(user);
  }

  async resendActivationMail(dto: AuthSendActivationMail) {
    // GET USER
    const user = await this.repository.findOne({ where: { email: dto.email } });
    if (!user) throw new NotFoundException('[user] not found');

    // CHECK STATUS
    if (user.status == UserStatus.Active) {
      throw new ConflictException('[user-status] already activated');
    }

    // GENERATE TOKEN
    const activationToken = await this._generateToken();
    user.activationToken = activationToken;
    await this.repository.save(user);

    // SEND MAIL
    this._sendActivationMail({ email: user.email, activationToken });
  }

  async changeUserInfo(
    user: UserEntity,
    dto: AuthChangeInfoDto,
  ): Promise<UserEntity> {
    // GET USER
    user = await this.repository.findOne({
      where: { id: user.id },
      select: ['id', 'userName', 'email'],
    });

    // UPDATE INFO
    user.userName = dto.userName;

    const userCp = { ...user };
    await this.repository.save(user);

    return userCp;
  }

  /*
   *  PRIVATE FUNCTIONS
   */

  async _hashPasswd(passwd: string) {
    // HASH PASSWD
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(passwd, salt);
  }

  async _generateToken(): Promise<string> {
    return this.securityService.generateToken(4);
  }

  async _sendActivationMail({ email, activationToken }) {
    return this.emailSenderService.send(
      email,
      'Activation Mail',
      `Token: ${activationToken}`,
    );
  }

  async _sendChangePasswdTokenMail({ email, token }) {
    return this.emailSenderService.send(
      email,
      'Change Password Mail',
      `Token: ${token}`,
    );
  }
}
