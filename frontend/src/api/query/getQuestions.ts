import { Difficulty, QuestionWithAnswer } from '@/types';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { fetchAPI } from '..';
import { useEffect, useState } from 'react';

export const getQuestions = async (
  difficulty: Difficulty
): Promise<QuestionWithAnswer[]> => {
  return await fetchAPI(`/question/${Difficulty[difficulty]}`);
};

export const getQuestionsKey = (
  difficulty: Difficulty,
  gameId: number
): QueryKey => ['questions', Difficulty[difficulty], gameId];

export const useGetQuestions = (
  difficulty: Difficulty | null,
  gameId: number
) => {
  return useQuery({
    queryKey: getQuestionsKey(difficulty, gameId),
    queryFn: () => getQuestions(difficulty),
    enabled: difficulty !== null && !!gameId,
    staleTime: Infinity,
    onError: (error) => {
      console.error(error);
    },
  });
};
