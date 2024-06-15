import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelEntity } from '../../data/entities/level.entity';
import { Repository } from 'typeorm';
import { LevelCreateDto } from './dto/level-create.dto';
import { CategoryEntity } from '../../data/entities/category.entity';
import { LevelAddQuestionDto } from './dto/level-add-question.dto';
import { QuestionEntity } from '../../data/entities/question.entity';
import { LevelEvaluateDto } from './dto/level-evaluate.dto';
import { RankingEntity } from '../../data/entities/ranking.entity';
import { UserEntity } from '../../data/entities/user.entity';
import { UserLevelEntity } from '../../data/entities/user-level.entity';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(LevelEntity)
    private repository: Repository<LevelEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
    @InjectRepository(RankingEntity)
    private rankingRepository: Repository<RankingEntity>,
    @InjectRepository(UserLevelEntity)
    private userLevelRepository: Repository<UserLevelEntity>,
  ) {}

  async getCategoryLevels(idCategory: number): Promise<LevelEntity[]> {
    // GET CATEGORY
    const category = await this.categoryRepository.findOne({
      where: { id: idCategory },
    });
    if (!category) throw new NotFoundException('[category] not found');

    // GET LEVELS
    const levels = await this.repository.find({
      where: { idCategory: category.id },
    });

    return levels;
  }

  async createLevel(dto: LevelCreateDto): Promise<LevelEntity> {
    // GET CATEGORY
    const category = await this.categoryRepository.findOne({
      where: { id: dto.idCategory },
    });
    if (!category) throw new NotFoundException('[category] not found');

    // CREATE QUESTION
    const question = this.repository.create();
    question.idCategory = category.id;
    question.name = dto.name;
    await this.repository.save(question);

    return question;
  }

  async addQuestion(dto: LevelAddQuestionDto): Promise<void> {
    // GET LEVEL
    const level = await this.repository.findOne({
      where: { id: dto.idLevel },
      relations: ['questions'],
    });
    if (!level) throw new NotFoundException('[level] not found');

    if (level.questions.some((question) => question.id == dto.idQuestion)) {
      throw new BadRequestException('[level-question] cannot be added again');
    }

    // GET QUESTION
    const question = await this.questionRepository.findOne({
      where: { id: dto.idQuestion },
    });
    if (!question) throw new NotFoundException('[question] not found');

    // ADD TO QUESTION
    level.questions.push(question);
    await this.repository.save(level);
  }

  async evaluateLevel(
    user: UserEntity,
    dto: LevelEvaluateDto,
  ): Promise<number> {
    // GET LEVEL
    const level = await this.repository.findOne({
      where: { id: dto.idLevel },
      relations: ['questions'],
    });
    if (!level) throw new NotFoundException('[level] not found');

    // GET LEVEL SCORE
    let userLevel = await this.userLevelRepository.findOne({
      where: { idUser: user.id, idLevel: level.id },
    });

    // CREATE USER LEVEL IF NOT EXIST
    if (!userLevel) {
      userLevel = this.userLevelRepository.create();
      userLevel.idUser = user.id;
      userLevel.idLevel = level.id;
      userLevel.score = 0;
      await this.userLevelRepository.save(userLevel);
    }

    // EVALUATE
    let points = 0;
    for (const questionDto of dto.questions) {
      // GET QUESTION
      const question = await this.questionRepository.findOne({
        where: { id: questionDto.idQuestion },
      });
      if (!question) {
        throw new NotFoundException(
          `[question:${questionDto.idQuestion}] not found`,
        );
      }

      if (question.idAnswer == questionDto.idAnswer) {
        points += 100;
      } else {
        if (points - 10 > 0) points -= 10;
      }
    }

    // GET RANKING SCORE
    const ranking = await this.rankingRepository.findOne({
      where: { idUser: user.id },
    });

    // APPLY NEW SCORE
    if (points > userLevel.score) {
      let rankingScore = ranking.score;
      rankingScore -= userLevel.score;
      rankingScore += points;

      ranking.score = rankingScore;
      await this.rankingRepository.save(ranking);

      userLevel.score = points;
      await this.userLevelRepository.save(userLevel);
    }

    return points;
  }
}
