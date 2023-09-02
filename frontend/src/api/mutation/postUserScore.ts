import { useMutation } from '@tanstack/react-query';
import { api, fetchAPI } from '..';

const postUserScore = async (userDto) => {
  return await api.post('/user', userDto, { withCredentials: false });
};

export const usePostUserScore = () => {
  return useMutation(postUserScore);
};
