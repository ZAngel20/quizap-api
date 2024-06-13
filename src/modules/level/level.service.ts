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

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(LevelEntity)
    private repository: Repository<LevelEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
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
}
