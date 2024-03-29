export * from './query';

import axios, { AxiosError, AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_ENDPOINT,
  timeout: 5000,
});

type ErrorResponse = AxiosError & {
  response: AxiosResponse<{ message: string }>;
};

api.interceptors.response.use(
  (response) => response.data,

  (error: ErrorResponse) =>
    Promise.reject(error.response.data.message || error.message)
);

export const fetchAPI = (url: string, params?: RequestInit) =>
  fetch(
    `${url.startsWith('/') ? import.meta.env.VITE_APP_API_ENDPOINT : ''}${url}`,
    params
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
