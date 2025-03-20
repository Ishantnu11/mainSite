const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  events: `${BASE_URL}/api/events`,
  news: `${BASE_URL}/api/news`,
  team: `${BASE_URL}/api/team-members`,
}; 