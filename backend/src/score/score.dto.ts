import { Score, User } from '@prisma/client';

export type ScoreWithUser = Score & {
  user: User;
};
