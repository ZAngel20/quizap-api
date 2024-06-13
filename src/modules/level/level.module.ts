import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LevelEntity } from '../../data/entities/level.entity';
import { CategoryEntity } from '../../data/entities/category.entity';
import { QuestionEntity } from '../../data/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LevelEntity, CategoryEntity, QuestionEntity]),
    AuthModule,
  ],
  providers: [LevelService],
  controllers: [LevelController],
})
export class LevelModule {}
