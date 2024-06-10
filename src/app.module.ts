import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TestModule } from './modules/test/test.module';
import { dataSourceOptions } from './config/typeorm.config';

@Module({
  imports: [
    // DATABASE CONNECTOR
    TypeOrmModule.forRoot(dataSourceOptions),

    AuthModule,
    UserModule,
    // TestModule,
  ],
})
export class AppModule {}
