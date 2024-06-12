import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TestModule } from './modules/test/test.module';
import { dataSourceOptions } from './config/typeorm.config';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    // DATABASE CONNECTOR
    TypeOrmModule.forRoot(dataSourceOptions),

    AuthModule,
    UserModule,
    CategoryModule,
    // TestModule,
  ],
})
export class AppModule {}
