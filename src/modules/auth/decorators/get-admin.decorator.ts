import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserEntity } from '../../../data/entities/user.entity';
import { UserType } from '../../../data/enums/user-type.enum';

export const GetAdmin = createParamDecorator(
  (scopes: string | string[], cxt: ExecutionContext): UserEntity => {
    const user: UserEntity = cxt.switchToHttp().getRequest().user;
    if (!user || user.type !== UserType.Admin) throw new ForbiddenException();
    return user as UserEntity;
  },
);
