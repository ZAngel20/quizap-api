import { UserType } from '../../data/enums/user-type.enum';

export interface JwtPayload {
  id: string;
  email: string;
  type: UserType;
}
