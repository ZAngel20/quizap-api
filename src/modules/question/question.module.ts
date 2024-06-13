import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { QuestionEntity } from '../../data/entities/question.entity';
import { LevelEntity } from '../../data/entities/level.entity';
import { AnswerEntity } from '../../data/entities/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, LevelEntity, AnswerEntity]),
    AuthModule,
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
