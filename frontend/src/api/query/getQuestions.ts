import { Difficulty, QuestionWithAnswer } from '@/types';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { fetchAPI } from '..';

export const getQuestions = async (
  difficulty: Difficulty
): Promise<QuestionWithAnswer[]> => {
  return await fetchAPI(`/question/${Difficulty[difficulty]}`);
};

export const getQuestionsKey = (difficulty: Difficulty): QueryKey => [
  'questions',
  Difficulty[difficulty],
];

export const useGetQuestions = (difficulty?: Difficulty) => {
  return useQuery({
    queryKey: getQuestionsKey(difficulty),
    queryFn: () => getQuestions(difficulty),
    enabled: difficulty !== null && difficulty !== undefined,
    staleTime: Infinity,
  });
};
