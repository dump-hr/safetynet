import { useMutation } from '@tanstack/react-query';
import { api, fetchAPI } from '..';

const postUserScore = async (userDto) => {
  return await api.post(
    '/user/',
    new URLSearchParams({
      ...userDto,
      birthDate: userDto.birthDate.toISOString(),
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
};

export const usePostUserScore = () => {
  return useMutation(postUserScore);
};
