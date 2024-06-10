import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class SecurityService {
  public async generateToken(size?: number) {
    return crypto.randomBytes(size ? size : 50).toString('hex');
  }
}
