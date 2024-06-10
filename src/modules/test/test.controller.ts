import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestService } from './test.service';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  async test() {
    return this.testService.send();
  }
}
