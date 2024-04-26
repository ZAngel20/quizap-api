import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../enums/user-type.enum';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() userName: string;

  @Column({ unique: true }) email: string;

  @Column() passwd: string;

  @Column({
    type: 'enum',
    enum: UserType,
    nullable: false,
    default: UserType.Default,
  })
  type: UserType;
}
