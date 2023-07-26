export enum Difficulty {
  Beginner,
  Advanced,
}

export type Question = {
  id: number;
  value: string;
  points: number;
  difficulty: Difficulty;
  createdAt: Date;
};

export type Answer = {
  id: number;
  value: string;
  isCorrect: boolean;
  createdAt: Date;
  questionId: number;
};

export type QuestionWithAnswer = Question & {
  answers: Omit<Answer, 'isCorrect'>[];
};
