const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    // For production environment
    const vercelUrl = import.meta.env.VITE_VERCEL_URL;
    if (vercelUrl) {
      return `https://${vercelUrl}`;
    }
    // Fallback to window.location.origin for client-side
    return window.location.origin;
  }
  // For development environment
  return import.meta.env.VITE_API_URL || 'http://localhost:3000';
};

// Alternative base URL for fallback
const getFallbackBaseUrl = () => {
  if (import.meta.env.PROD) {
    return window.location.origin;
  }
  // Use alternative port in development
  return 'http://localhost:3001';
};

const createEndpoints = (baseUrl: string) => ({
  events: `${baseUrl}/api/events`,
  news: `${baseUrl}/api/news`,
  team: `${baseUrl}/api/team`,
});

export const API_ENDPOINTS = createEndpoints(getBaseUrl());
export const FALLBACK_API_ENDPOINTS = createEndpoints(getFallbackBaseUrl());

// Helper function to fetch with fallback
export const fetchWithFallback = async (endpoint: string, fallbackEndpoint: string, options: RequestInit = {}) => {
  console.log(`🔄 Attempting primary fetch from: ${endpoint}`);
  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`Primary fetch failed with status: ${response.status}`);
    }
    console.log('✅ Primary fetch successful');
    return response.json();
  } catch (error) {
    console.warn(`⚠️ Primary fetch failed:`, error);
    console.log(`🔄 Attempting fallback fetch from: ${fallbackEndpoint}`);
    
    try {
      const fallbackResponse = await fetch(fallbackEndpoint, options);
      if (!fallbackResponse.ok) {
        throw new Error(`Fallback fetch failed with status: ${fallbackResponse.status}`);
      }
      console.log('✅ Fallback fetch successful');
      return fallbackResponse.json();
    } catch (fallbackError) {
      console.error('❌ Both primary and fallback fetches failed:', fallbackError);
      throw fallbackError;
    }
  }
};

// For assets/images
export const getAssetPath = (path: string) => {
  const baseUrl = getBaseUrl();
  console.log(`🖼️ Loading asset from: ${baseUrl}/assets/${path}`);
  return `${baseUrl}/assets/${path}`;
}; 