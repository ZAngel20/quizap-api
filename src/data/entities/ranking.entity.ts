import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'ranking' })
export class RankingEntity {
  @PrimaryColumn()
  @ApiProperty()
  idUser: string;

  @OneToOne(() => UserEntity, (user) => user.ranking)
  @JoinColumn({ name: 'idUser' })
  user: UserEntity;

  @Column({ type: 'int', width: 11, nullable: false })
  @ApiProperty()
  score: number;
}
