// Define API base URLs
const RENDER_API_URL = 'https://gdggug-backend.onrender.com';
const LOCAL_API_URL = 'http://localhost:3001';

// Get the base URL for API calls based on the environment
export const getBaseUrl = () => {
  return import.meta.env.DEV ? LOCAL_API_URL : RENDER_API_URL;
};

// Create API endpoints with the given base URL
export const createEndpoints = (baseUrl: string) => ({
  events: `${baseUrl}/api/events`,
  news: `${baseUrl}/api/news`,
  team: `${baseUrl}/api/team`,
  health: `${baseUrl}/api/health`,
});

// Export the API endpoints
export const API_ENDPOINTS = createEndpoints(getBaseUrl());

// Export the fallback endpoints (using Render as fallback)
export const FALLBACK_API_ENDPOINTS = createEndpoints(RENDER_API_URL);

// Helper function to fetch with fallback
export const fetchWithFallback = async (primaryUrl: string, fallbackUrl: string) => {
  const fetchWithTimeout = async (url: string, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  };

  try {
    console.log('Attempting primary endpoint:', primaryUrl);
    const response = await fetchWithTimeout(primaryUrl);
    if (!response.ok) {
      throw new Error(`Primary endpoint failed with status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.warn('Primary endpoint failed, trying fallback:', error);
    try {
      const fallbackResponse = await fetchWithTimeout(fallbackUrl);
      if (!fallbackResponse.ok) {
        throw new Error(`Fallback endpoint failed with status: ${fallbackResponse.status}`);
      }
      return fallbackResponse;
    } catch (fallbackError) {
      console.error('Both primary and fallback endpoints failed:', fallbackError);
      throw new Error('Failed to fetch data from both primary and fallback endpoints');
    }
  }
};

// Helper function to get asset path
export const getAssetPath = (assetName: string) => {
  return `/assets/${assetName}`;
}; 