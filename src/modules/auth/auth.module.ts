import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserEntity } from '../../data/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { SecurityService } from '../../shared/services/security.service';
import { EmailsenderService } from '../../shared/services/email-sender.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'tu_clave_secreta',
      signOptions: {},
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SecurityService, EmailsenderService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
