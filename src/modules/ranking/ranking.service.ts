import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../data/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RankingEntity } from '../../data/entities/ranking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(RankingEntity)
    private repository: Repository<RankingEntity>,
  ) {}

  async getRankingUsers(): Promise<RankingEntity[]> {
    const rankings = await this.repository.find({
      select: {
        user: {
          userName: true,
        },
      },
      relations: ['user'],
      order: {
        score: 'DESC',
      },
      take: 100,
    });

    return rankings;
  }

  async getScore(user: UserEntity) {
    const ranking = await this.repository.findOne({
      where: { idUser: user.id },
    });

    return ranking.score;
  }
}
