import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity({ name: 'answer' })
export class AnswerEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty()
  text: string;

  @ManyToMany(() => QuestionEntity, (question) => question.answers)
  questions: QuestionEntity[];
}
