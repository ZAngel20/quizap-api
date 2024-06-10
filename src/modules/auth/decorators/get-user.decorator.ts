import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../../data/entities/user.entity';

export const GetUser = createParamDecorator(
  (scopes: string | string[], cxt: ExecutionContext): UserEntity => {
    const user = cxt.switchToHttp().getRequest().user;
    return user as UserEntity;
  },
);
