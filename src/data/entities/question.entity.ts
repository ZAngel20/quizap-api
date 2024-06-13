import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LevelEntity } from './level.entity';
import { AnswerEntity } from './answer.entity';

@Entity({ name: 'question' })
export class QuestionEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @Index()
  @ApiProperty()
  idAnswer: number;

  @OneToOne(() => AnswerEntity, { cascade: false })
  @JoinColumn({ name: 'idAnswer' })
  answer: AnswerEntity;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty()
  text: string;

  @Column({ type: 'int', width: 11, nullable: false })
  @ApiProperty()
  index: number;

  @ManyToMany(() => LevelEntity, (level) => level.questions)
  levels: LevelEntity[];

  @ManyToMany(() => AnswerEntity, (answer) => answer.questions)
  @JoinTable({
    name: 'question_answer',
    joinColumn: {
      name: 'idQuestion',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'idAnswer',
      referencedColumnName: 'id',
    },
  })
  answers: AnswerEntity[];
}
