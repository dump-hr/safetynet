import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Answer, Difficulty, Question } from '@prisma/client';
import { QuestionWithAnswer } from './question.dto';
import { shuffle } from 'src/utils/shuffle';
import { exclude } from 'src/utils/exclude';

const NUMBER_OF_QUESTIONS_PER_GAME = 1;

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async getQuestions(difficulty: Difficulty): Promise<QuestionWithAnswer[]> {
    // raw sql required because prisma does not support "ORDER BY RANDOM()"
    const questions = await this.prisma.$queryRaw<Question[]>`
      SELECT "id", "value", "points", "difficulty", "createdAt"
      FROM "Question"
      WHERE "difficulty" = ${difficulty}::"Difficulty"
      ORDER BY RANDOM()
      LIMIT ${NUMBER_OF_QUESTIONS_PER_GAME}
    `;
    const answers = await this.prisma.answer.findMany({
      where: {
        questionId: { in: questions.map((q) => q.id) },
      },
    });

    return questions.map((q) => ({
      ...q,
      answers: shuffle(
        answers
          .filter((a) => a.questionId === q.id)
          .map((a) => exclude(a, ['isCorrect'])),
      ),
    }));
  }

  async checkAnswer(answerId: number): Promise<boolean> {
    const answer = await this.prisma.answer.findUniqueOrThrow({
      where: {
        id: answerId,
      },
    });

    return answer.isCorrect;
  }

  async getCorrectAnswer(questionId: number): Promise<Answer> {
    const answer = await this.prisma.answer.findFirstOrThrow({
      where: {
        questionId,
        isCorrect: true,
      },
    });

    return answer;
  }
}
