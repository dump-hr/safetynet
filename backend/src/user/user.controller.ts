import {
  BadRequestException,
  Controller,
  Body,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { UserAndScoreDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userAndScore: UserAndScoreDto) {
    if (!userAndScore.name) {
      throw new BadRequestException('Name is required');
    }
    if (!userAndScore.school) {
      throw new BadRequestException('School is required');
    }
    if (!+userAndScore.score) {
      throw new BadRequestException('Score is required');
    }
    if (!userAndScore.difficulty) {
      throw new BadRequestException('Difficulty is required');
    }

    await this.userService.saveUserAndScore({
      ...userAndScore,
      score: +userAndScore.score,
    });
  }

  @Get('score/:userId')
  async getBestScoresByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getBestScoresByUserId(userId);
  }
}
