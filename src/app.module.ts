import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // DATABASE CONNECTOR
    TypeOrmModule.forRoot(typeOrmConfig),

    AuthModule,

    UserModule,
  ],
})
export class AppModule {}
