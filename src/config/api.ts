const getBaseUrl = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:3000';
};

export const API_ENDPOINTS = {
  events: `${getBaseUrl()}/api/events`,
  news: `${getBaseUrl()}/api/news`,
  team: `${getBaseUrl()}/api/team-members`,
};

// For assets/images
export const getAssetPath = (filename: string) => {
  // Always use the /assets path since we're copying assets to dist/assets
  return `/assets/${filename}`;
}; 