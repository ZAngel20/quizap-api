import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from '../../data/entities/answer.entity';
import { AuthModule } from '../auth/auth.module';
import { QuestionEntity } from '../../data/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerEntity, QuestionEntity]),
    AuthModule,
  ],
  providers: [AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule {}
