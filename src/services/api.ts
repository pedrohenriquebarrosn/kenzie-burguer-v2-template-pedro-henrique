import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL?.trim() || 'https://hamburgueria-kenzie-v2.herokuapp.com',
  timeout: 5000,
});
