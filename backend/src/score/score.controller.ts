import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ScoreService } from './score.service';
import { Difficulty } from '@prisma/client';
import { ParseDifficultyPipe } from 'src/utils/parseDifficultyPipe';
import { ScoreWithUser } from './score.dto';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get('best/:difficulty')
  async getBestScores(
    @Param('difficulty', ParseDifficultyPipe) difficulty: Difficulty,
  ): Promise<ScoreWithUser[]> {
    return await this.scoreService.getBestScores(difficulty);
  }

  @Get('position/:difficulty/:score')
  async getUserPosition(
    @Param('difficulty', ParseDifficultyPipe) difficulty: Difficulty,
    @Param('score', ParseIntPipe) score: number,
  ): Promise<number> {
    return await this.scoreService.getUserPosition(difficulty, score);
  }
}
