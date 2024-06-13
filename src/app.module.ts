import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { dataSourceOptions } from './config/typeorm.config';
import { CategoryModule } from './modules/category/category.module';
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/answer.module';
import { LevelModule } from './modules/level/level.module';

@Module({
  imports: [
    // DATABASE CONNECTOR
    TypeOrmModule.forRoot(dataSourceOptions),

    AuthModule,
    UserModule,
    CategoryModule,
    QuestionModule,
    AnswerModule,
    LevelModule,
  ],
})
export class AppModule {}
