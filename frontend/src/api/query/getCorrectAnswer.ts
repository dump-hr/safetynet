import { QueryKey, useQuery } from '@tanstack/react-query';
import { fetchAPI } from '..';
import { Answer } from '@/types';

export const getCorrectAnswer = async (questionId: number): Promise<Answer> => {
  return await fetchAPI(`/question/correct-answer/${questionId}`);
};

export const getCorrectAnswerKey = (questionId: number): QueryKey => [
  'correct-answer',
  questionId,
];

export const useGetCorrectAnswer = (questionId: number) => {
  return useQuery({
    queryKey: getCorrectAnswerKey(questionId),
    queryFn: () => getCorrectAnswer(questionId),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
