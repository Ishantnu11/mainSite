// Define API base URLs directly to avoid import issues
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? (process.env.VITE_API_URL || window.location.origin)
  : 'http://localhost:3001';

const FALLBACK_API_BASE_URL = process.env.NODE_ENV === 'production'
  ? window.location.origin
  : 'http://localhost:3001';

// Get the base URL for API calls based on the environment
export const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_VERCEL_URL 
      ? `https://${import.meta.env.VITE_VERCEL_URL}` 
      : window.location.origin;
  }
  return import.meta.env.VITE_API_URL || 'http://localhost:3001';
};

// Get fallback URL for when the primary endpoint fails
// This function is exported to avoid TypeScript unused variable error
export const getFallbackBaseUrl = () => {
  if (import.meta.env.PROD) {
    return window.location.origin;
  }
  return 'http://localhost:3001';
};

// Create API endpoints with the given base URL
// This function is exported to avoid TypeScript unused variable error
export const createEndpoints = (baseUrl: string) => ({
  events: `${baseUrl}/api/events`,
  news: `${baseUrl}/api/news`,
  team: `${baseUrl}/api/team`,
  health: `${baseUrl}/api/health`,
});

// Export the primary and fallback endpoints
export const API_ENDPOINTS = {
  events: `${API_BASE_URL}/api/events`,
  news: `${API_BASE_URL}/api/news`,
  team: `${API_BASE_URL}/api/team`,
  health: `${API_BASE_URL}/api/health`,
};

export const FALLBACK_API_ENDPOINTS = {
  events: `${FALLBACK_API_BASE_URL}/api/events`,
  news: `${FALLBACK_API_BASE_URL}/api/news`,
  team: `${FALLBACK_API_BASE_URL}/api/team`,
  health: `${FALLBACK_API_BASE_URL}/api/health`,
};

// Helper function to fetch with fallback
export const fetchWithFallback = async (primaryUrl: string, fallbackUrl: string) => {
  try {
    console.log('🔄 Attempting primary fetch from:', primaryUrl);
    const response = await fetch(primaryUrl);
    if (!response.ok) {
      throw new Error(`Primary fetch failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log('✅ Primary fetch successful');
    return data;
  } catch (primaryError) {
    console.log('⚠️ Primary fetch failed, attempting fallback:', fallbackUrl);
    try {
      const fallbackResponse = await fetch(fallbackUrl);
      if (!fallbackResponse.ok) {
        throw new Error(`Fallback fetch failed with status ${fallbackResponse.status}`);
      }
      const data = await fallbackResponse.json();
      console.log('✅ Fallback fetch successful');
      return data;
    } catch (fallbackError) {
      console.error('❌ Both primary and fallback fetches failed');
      throw new Error('Failed to fetch data from both primary and fallback URLs');
    }
  }
};

// Helper function to get asset paths
export const getAssetPath = (assetName: string) => {
  console.log(`🔄 Loading asset: ${assetName}`);
  const baseUrl = getBaseUrl();
  return `${baseUrl}/assets/${assetName}`;
}; 