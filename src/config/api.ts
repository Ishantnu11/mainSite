// Define API base URL
const VPS_API_URL = 'http://69.62.107.249:3001';

// Get the base URL for API calls
export const getBaseUrl = () => {
  return VPS_API_URL;
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

// Generic fetch function for all API calls
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${getBaseUrl()}${endpoint}`;

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
