const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  events: `${BASE_URL}/events`,
  news: `${BASE_URL}/news`,
  team: `${BASE_URL}/team`,
  auth: {
    login: `${BASE_URL}/auth/login`,
    logout: `${BASE_URL}/auth/logout`,
  },
} as const; 