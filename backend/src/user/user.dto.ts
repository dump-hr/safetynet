import { Difficulty, User } from '@prisma/client';

export type UserDto = Omit<User, 'id'>;
export type UserAndScoreDto = UserDto & {
  difficulty: Difficulty;
  score: number;
};
