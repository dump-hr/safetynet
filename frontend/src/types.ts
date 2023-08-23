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

export type Score = {
  id: number;
  value: number;
  difficulty: Difficulty;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};

export type User = {
  id: number;
  name: string;
  school: string;
  birthDate: Date;
  createdAt: Date;
};

export type ScoreWithUser = Score & {
  user: User;
};
