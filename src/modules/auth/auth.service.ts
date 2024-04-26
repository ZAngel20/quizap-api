import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthSignUpDto) {
    try {
      const { userName, passwd, email } = dto;

      const salt = await bcrypt.genSalt();
      const hashedPasswd = await bcrypt.hash(passwd, salt);

      const user = this.repository.create({
        userName,
        passwd: hashedPasswd,
        email,
      });

      await this.repository.save(user);
    } catch (ex) {
      if (ex.code == 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(dto: AuthSignInDto): Promise<AuthTokenDto> {
    const { email, passwd } = dto;

    const user = await this.repository.findOneBy({ email });

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
}
