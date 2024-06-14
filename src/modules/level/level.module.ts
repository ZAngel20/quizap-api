import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LevelEntity } from '../../data/entities/level.entity';
import { CategoryEntity } from '../../data/entities/category.entity';
import { QuestionEntity } from '../../data/entities/question.entity';
import { UserLevelEntity } from '../../data/entities/user-level.entity';
import { RankingEntity } from '../../data/entities/ranking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LevelEntity,
      CategoryEntity,
      QuestionEntity,
      RankingEntity,
      UserLevelEntity,
    ]),
    AuthModule,
  ],
  providers: [LevelService],
  controllers: [LevelController],
})
export class LevelModule {}
