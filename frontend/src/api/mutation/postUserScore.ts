import { useMutation } from '@tanstack/react-query';
import { fetchAPI } from '..';

const postUserScore = async (userDto) => {
  return await fetchAPI('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userDto),
  });
};

export const usePostUserScore = () => {
  return useMutation(postUserScore);
};
