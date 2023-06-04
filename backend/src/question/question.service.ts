import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Answer, Difficulty } from '@prisma/client';
import { QuestionWithAnswer } from './question.dto';
import { exclude } from 'src/utils/exclude';
import { shuffle } from 'src/utils/shuffle';

const NUMBER_OF_QUESTIONS_PER_GAME = 20;

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async getQuestions(difficulty: Difficulty): Promise<QuestionWithAnswer[]> {
    const questions = await this.prisma.question.findMany({
      where: {
        difficulty,
      },
      include: {
        answers: true,
      },
    });

    shuffle(questions);

    return questions.slice(0, NUMBER_OF_QUESTIONS_PER_GAME).map((q) => ({
      ...q,
      answers: q.answers.map((a) => exclude(a, ['isCorrect'])),
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
