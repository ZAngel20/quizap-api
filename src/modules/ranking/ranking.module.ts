import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingController } from './ranking.controller';
import { AuthModule } from '../auth/auth.module';
import { RankingEntity } from '../../data/entities/ranking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RankingEntity]), AuthModule],
  providers: [RankingService],
  controllers: [RankingController],
})
export class RankingModule {}
