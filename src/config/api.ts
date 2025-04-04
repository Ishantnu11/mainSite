// Define API base URLs
const RENDER_API_URL = 'https://gdggug-backend.onrender.com';
const LOCAL_API_URL = 'http://localhost:3001';

// Get the base URL for API calls based on the environment
export const getBaseUrl = () => {
  // Always use RENDER_API_URL in production
  return RENDER_API_URL;
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
          'Accept': 'application/json'
        },
        mode: 'cors'
      });
      clearTimeout(id);
      
      // Log response details for debugging
      console.log(`Fetch response for ${url}:`, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      return response;
    } catch (error) {
      clearTimeout(id);
      console.error(`Fetch error for ${url}:`, error);
      throw error;
    }
  };

  try {
    console.log('Attempting primary endpoint:', primaryUrl);
    const response = await fetchWithTimeout(primaryUrl);
    
    // For 404 or other error responses, throw error to try fallback
    if (!response.ok) {
      throw new Error(`Primary endpoint failed with status: ${response.status}`);
    }

    // Try to parse JSON response
    try {
      const data = await response.json();
      return data;
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      throw new Error('Invalid JSON response from server');
    }
  } catch (error) {
    console.warn('Primary endpoint failed, trying fallback:', error);
    try {
      const fallbackResponse = await fetchWithTimeout(fallbackUrl);
      if (!fallbackResponse.ok) {
        throw new Error(`Fallback endpoint failed with status: ${fallbackResponse.status}`);
      }
      return await fallbackResponse.json();
    } catch (fallbackError) {
      console.error('Both primary and fallback endpoints failed:', fallbackError);
      throw new Error('Failed to fetch data from both primary and fallback endpoints');
    }
  }
};

// Generic fetch function for all API calls
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${getBaseUrl()}${endpoint}`;
  const fallbackUrl = `${RENDER_API_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    mode: 'cors'
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    // Log response details
    console.log(`API request to ${endpoint}:`, {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const text = await response.text();
    try {
      return text ? JSON.parse(text) : null;
    } catch (e) {
      console.error('Failed to parse response:', e);
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error);
    throw error;
  }
};

// Helper function to get asset path
export const getAssetPath = (assetName: string) => {
  return `/assets/${assetName}`;
}; 