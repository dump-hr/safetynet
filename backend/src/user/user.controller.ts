import {
  BadRequestException,
  Get,
  Injectable,
  Param,
  Post,
} from '@nestjs/common';
import { UserAndScoreDto } from './user.dto';
import { UserService } from './user.service';

@Injectable()
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(userAndScore: UserAndScoreDto) {
    if (!userAndScore.score || !userAndScore.difficulty) {
      throw new BadRequestException('Score and difficulty are required');
    }

    await this.userService.saveUserAndScore(userAndScore);
  }

  @Get('score/:userId')
  async getBestScoresByUserId(@Param('userId') userId: number) {
    return this.userService.getBestScoresByUserId(userId);
  }
}
