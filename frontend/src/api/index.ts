export * from './query';

export const fetchAPI = (url: string, params?: RequestInit) =>
  fetch(
    `${url.startsWith('/') ? import.meta.env.VITE_APP_API_ENDPOINT : ''}${url}`,
    params
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
