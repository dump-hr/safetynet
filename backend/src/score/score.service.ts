import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Difficulty } from '@prisma/client';
import { ScoreWithUser } from './score.dto';

@Injectable()
export class ScoreService {
  constructor(private prisma: PrismaService) {}

  async getUserPosition(
    difficulty: Difficulty,
    score: number,
  ): Promise<number> {
    const betterScoreCount = await this.prisma.score.count({
      where: {
        difficulty,
        value: {
          gt: score,
        },
      },
    });

    return betterScoreCount + 1;
  }

  async getBestScores(difficulty: Difficulty): Promise<ScoreWithUser[]> {
    const scores = await this.prisma.score.findMany({
      where: {
        difficulty,
      },
      include: {
        user: true,
      },
      orderBy: {
        value: 'desc',
      },
      take: 10,
    });

    return scores;
  }
}
