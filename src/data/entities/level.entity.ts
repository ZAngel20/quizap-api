import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity({ name: 'level' })
export class LevelEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @Index()
  @ApiProperty()
  idCategory: number;

  @ManyToOne(() => LevelEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'idCategory' })
  category: LevelEntity;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty()
  name: string;

  @ManyToMany(() => QuestionEntity, (question) => question.levels)
  @JoinTable({
    name: 'level_question',
    joinColumn: {
      name: 'idLevel',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'idQuestion',
      referencedColumnName: 'id',
    },
  })
  questions: QuestionEntity[];
}
