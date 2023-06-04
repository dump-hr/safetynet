import { Answer, Question } from '@prisma/client';

export type QuestionDto = Question & {
  answers: Omit<Answer, 'isCorrect'>[];
};
