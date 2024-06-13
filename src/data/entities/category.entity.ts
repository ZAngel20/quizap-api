import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LevelEntity } from './level.entity';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 45, nullable: false })
  @ApiProperty()
  name: string;

  @OneToMany(() => LevelEntity, (level) => level.category)
  levels: LevelEntity[];
}
