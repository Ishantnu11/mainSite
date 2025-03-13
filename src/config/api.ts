const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '' // In production, use relative path
  : import.meta.env.VITE_API_URL || 'http://localhost:5000'; // In development, use environment variable or fallback

export const API_ENDPOINTS = {
  events: `${API_BASE_URL}/events`,
  news: `${API_BASE_URL}/news`,
  team: `${API_BASE_URL}/team`,
}; 