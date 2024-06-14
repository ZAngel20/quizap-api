import { Entity, ManyToOne, Column, JoinColumn, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { LevelEntity } from './level.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user_level' })
export class UserLevelEntity {
  @PrimaryColumn()
  @ApiProperty()
  idUser: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'idUser' })
  user: UserEntity;

  @PrimaryColumn()
  @ApiProperty()
  idLevel: number;

  @ManyToOne(() => LevelEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'idLevel' })
  level: LevelEntity;

  @Column()
  score: number;
}
