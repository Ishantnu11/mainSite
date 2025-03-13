const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api' // In production, use relative path
  : 'http://localhost:5000'; // In development, use localhost

export const API_ENDPOINTS = {
  events: `${API_BASE_URL}/events`,
  news: `${API_BASE_URL}/news`,
  team: `${API_BASE_URL}/team-members`, // Updated to match the server endpoint
}; 