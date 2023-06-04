import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserAndScoreDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async saveUserAndScore(userAndScore: UserAndScoreDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        name: userAndScore.name,
        school: userAndScore.school,
        birthDate: userAndScore.birthDate,
      },
    });

    if (!user) {
      await this.saveForNewUser(userAndScore);
      return;
    }

    await this.saveForExistingUser(user.id, userAndScore);
  }

  async getBestScoresByUserId(userId: number) {
    const { bestScores } = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: {
        bestScores: true,
      },
    });

    return bestScores;
  }

  private async saveForNewUser(userAndScore: UserAndScoreDto) {
    const newUser = await this.prisma.user.create({
      data: {
        name: userAndScore.name,
        school: userAndScore.school,
        birthDate: userAndScore.birthDate,
      },
    });

    await this.prisma.score.create({
      data: {
        value: userAndScore.score,
        difficulty: userAndScore.difficulty,
        updatedAt: new Date(),
        userId: newUser.id,
      },
    });
  }

  private async saveForExistingUser(
    userId: number,
    userAndScore: UserAndScoreDto,
  ) {
    const lastScoreByDifficulty = await this.prisma.score.findFirst({
      where: {
        userId,
        difficulty: userAndScore.difficulty,
      },
    });

    if (
      !!lastScoreByDifficulty &&
      lastScoreByDifficulty.value >= userAndScore.score
    )
      return;

    if (!!lastScoreByDifficulty) {
      await this.prisma.score.update({
        where: {
          id: lastScoreByDifficulty.id,
        },
        data: {
          value: userAndScore.score,
          updatedAt: new Date(),
        },
      });

      return;
    }

    await this.prisma.score.create({
      data: {
        value: userAndScore.score,
        difficulty: userAndScore.difficulty,
        updatedAt: new Date(),
        userId,
      },
    });
  }
}
