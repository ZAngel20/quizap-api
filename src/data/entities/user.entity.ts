import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../enums/user-type.enum';
import { UserStatus } from '../enums/user-status.enum';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  userName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  passwd: string;

  @Column({
    type: 'enum',
    enum: UserType,
    nullable: false,
    default: UserType.Default,
  })
  type: UserType;

  @Column({
    type: 'enum',
    enum: UserStatus,
    nullable: false,
    default: UserStatus.Pending,
  })
  status: UserStatus;

  @Column({ type: 'varchar', length: 20, nullable: true })
  activationToken?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  passwdToken?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  emailToken?: string;

  @Column({ type: 'datetime', nullable: true })
  activatedDate?: Date;
}
