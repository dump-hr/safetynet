import { QueryKey, useQuery } from '@tanstack/react-query';
import { fetchAPI } from '..';
import { Difficulty } from '@/types';

export const getUserPosition = async (
  difficulty: Difficulty,
  score: number
): Promise<number> => {
  return await fetchAPI(`/score/${Difficulty[difficulty]}/${score}`);
};

export const getUserPositionKey = (
  difficulty: Difficulty,
  score: number
): QueryKey => ['user-position', difficulty, score];

export const useGetUserPosition = (difficulty: Difficulty, score: number) => {
  return useQuery({
    queryKey: getUserPositionKey(difficulty, score),
    queryFn: () => getUserPosition(difficulty, score),
  });
};
