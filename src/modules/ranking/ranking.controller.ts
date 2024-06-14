import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RankingService } from './ranking.service';
import { GetUser } from '../../shared/decoratos/user.decorator';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('Ranking')
@Controller('ranking')
export class RankingController {
  constructor(private service: RankingService) {}

  /*
   *  GET
   */

  @Get()
  getRankingUsers() {
    return this.service.getRankingUsers();
  }

  @Get('/score')
  getScore(@GetUser() user) {
    return this.service.getScore(user);
  }
}
