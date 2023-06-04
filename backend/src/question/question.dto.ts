import { Answer, Question } from '@prisma/client';

export type QuestionWithAnswer = Question & {
  answers: Omit<Answer, 'isCorrect'>[];
};
