import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';
import { UserLevelEntity } from './user-level.entity';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'level' })
export class LevelEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @Index()
  @ApiProperty()
  idCategory: number;

  @ManyToOne(() => CategoryEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'idCategory' })
  category: CategoryEntity;

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

  @OneToMany(() => UserLevelEntity, (userLevel) => userLevel.level)
  userLevels: UserLevelEntity[];
}
