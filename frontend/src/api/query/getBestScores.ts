import { Difficulty, QuestionWithAnswer, ScoreWithUser } from '@/types';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { fetchAPI } from '..';

export const getBestScores = async (
  difficulty: Difficulty
): Promise<ScoreWithUser[]> => {
  return await fetchAPI(`/score/best/${Difficulty[difficulty]}`);
};

export const getBestScoresKey = (difficulty: Difficulty): QueryKey => [
  'best-scores',
  Difficulty[difficulty],
];

export const useGetBestScores = (difficulty: Difficulty) => {
  return useQuery({
    queryKey: getBestScoresKey(difficulty),
    queryFn: () => getBestScores(difficulty),
    enabled: difficulty !== null && difficulty !== undefined,
    staleTime: Infinity,
    onError: (error) => {
      console.error(error);
    },
  });
};
