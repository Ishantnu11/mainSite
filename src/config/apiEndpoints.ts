const BASE_URL = import.meta.env.PROD ? '/api' : import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  events: `${BASE_URL}/events`,
  news: `${BASE_URL}/news`,
  team: `${BASE_URL}/team-members`,
  auth: {
    login: `${BASE_URL}/auth/login`,
    logout: `${BASE_URL}/auth/logout`,
  },
} as const; 