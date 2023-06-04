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
    if (!userAndScore.score || !userAndScore.difficulty) {
      throw new BadRequestException('Score and difficulty are required');
    }

    await this.userService.saveUserAndScore(userAndScore);
  }

  @Get('score/:userId')
  async getBestScoresByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getBestScoresByUserId(userId);
  }
}
