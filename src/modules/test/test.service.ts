import { Injectable } from '@nestjs/common';
import { EmailsenderService } from '../../shared/services/email-sender.service';

@Injectable()
export class TestService {
  constructor(private readonly emailSender: EmailsenderService) {}

  async send() {
    return this.emailSender.send('dmontiel@metrica6.es', 'Subject', 'body :D');
  }
}
