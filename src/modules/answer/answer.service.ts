import { Injectable, NotFoundException } from '@nestjs/common';
import { AnswerEntity } from '../../data/entities/answer.entity';
import { AnswerCreateDto } from './dto/answer-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../../data/entities/question.entity';
import { shuffle } from 'lodash';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerEntity)
    private repository: Repository<AnswerEntity>,
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
  ) {}

  async getQuestionAnswers(idQuestion: number): Promise<AnswerEntity[]> {
    // GET QUESTION
    const question = await this.questionRepository.findOne({
      where: { id: idQuestion },
      relations: ['answers', 'answer'],
    });
    if (!question) throw new NotFoundException('[question] not found');

    return shuffle([...question.answers, question.answer]);
  }

  async getQuestionAnswer(idQuestion: number) {
    // GET QUESTION
    const question = await this.questionRepository.findOne({
      where: { id: idQuestion },
      relations: ['answer'],
    });
    if (!question) throw new NotFoundException('[question] not found');

    return question.answer;
  }

  async createAnswer(dto: AnswerCreateDto): Promise<AnswerEntity> {
    // CREATE ANSWER
    const answer = this.repository.create();
    answer.text = dto.text;

    // SAVE
    return await this.repository.save(answer);
  }
}
