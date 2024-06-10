import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { EmailsenderService } from '../../shared/services/email-sender.service';

@Module({
  controllers: [TestController],
  providers: [TestService, EmailsenderService],
})
export class TestModule {}
