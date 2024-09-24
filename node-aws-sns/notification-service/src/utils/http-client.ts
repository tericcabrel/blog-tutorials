import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.CORE_SERVICE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
