import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Answer, Difficulty, Prisma, Question } from '@prisma/client';
import { QuestionWithAnswer } from './question.dto';

const NUMBER_OF_QUESTIONS_PER_GAME = 5;

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async getQuestions(difficulty: Difficulty): Promise<QuestionWithAnswer[]> {
    const questions = await this.prisma.$queryRaw<Question[]>`
      SELECT "id", "value", "points", "difficulty", "createdAt"
      FROM "Question"
      WHERE "difficulty" = ${difficulty}::"Difficulty"
      ORDER BY RANDOM()
      LIMIT ${NUMBER_OF_QUESTIONS_PER_GAME}
    `;
    const answers = await this.prisma.$queryRaw<Answer[]>`
      SELECT "id", "value", "questionId"
      FROM "Answer"
      WHERE "questionId" IN (${Prisma.join(questions.map((q) => q.id))})
    `;

    return questions.map((q) => ({
      ...q,
      answers: answers.filter((a) => a.questionId === q.id),
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
