import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from '../../data/entities/question.entity';
import { LevelEntity } from '../../data/entities/level.entity';
import { Repository } from 'typeorm';
import { QuestionCreateDto } from './dto/question-create.dto';
import { AnswerEntity } from '../../data/entities/answer.entity';
import { QuestionAddAnswerDto } from './dto/question-add-answer.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private repository: Repository<QuestionEntity>,
    @InjectRepository(LevelEntity)
    private levelRepository: Repository<LevelEntity>,
    @InjectRepository(AnswerEntity)
    private answerRepository: Repository<AnswerEntity>,
  ) {}

  async getLevelQuestions(idLevel: number): Promise<QuestionEntity[]> {
    // GET LEVEL
    const level = await this.levelRepository.findOne({
      where: { id: idLevel },
      relations: ['questions'],
    });
    if (!level) throw new NotFoundException('[level] not found');

    return level.questions;
  }

  async createQuestion(dto: QuestionCreateDto): Promise<QuestionEntity> {
    // GET ANSWER
    const answer = await this.answerRepository.findOne({
      where: { id: dto.idAnswer },
    });
    if (!answer) throw new NotFoundException('[answer] not found');

    // CREATE QUESTION
    const question = this.repository.create();
    question.idAnswer = answer.id;
    question.text = dto.text;
    question.index = 0;
    await this.repository.save(question);

    return question;
  }

  async addAnswer(dto: QuestionAddAnswerDto): Promise<void> {
    // GET QUESTION
    const question = await this.repository.findOne({
      where: { id: dto.idQuestion },
      relations: ['answers', 'answer'],
    });
    if (!question) throw new NotFoundException('[question] not found');

    if (
      question.answer.id == dto.idAnswer ||
      question.answers.some((answer) => answer.id == dto.idAnswer)
    ) {
      throw new BadRequestException('[question-answer] cannot be added again');
    }

    // GET ANSWER
    const answer = await this.answerRepository.findOne({
      where: { id: dto.idAnswer },
    });
    if (!answer) throw new NotFoundException('[answer] not found');

    // ADD TO QUESTION
    question.answers.push(answer);
    await this.repository.save(question);
  }
}
