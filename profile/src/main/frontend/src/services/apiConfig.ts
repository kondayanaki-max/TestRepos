/**
 * API Configuration Service
 * Centralizes all backend API endpoint management for cloud-ready deployment
 * Environment-aware configuration for development, staging, and production
 */

// Get API base URL from environment variables or default to ec2-43-205-3-175.ap-south-1.compute.amazonaws.com
const getApiBaseUrl = (): string => {
  // Check for environment variable first (set during build or runtime)
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Check window object for runtime config (useful for containerized apps)
  if (typeof window !== 'undefined' && (window as any).__API_BASE_URL__) {
    return (window as any).__API_BASE_URL__;
  }

  // Default fallback (development)
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * API Endpoints configuration
 * All endpoints are relative to API_BASE_URL
 */
export const API_ENDPOINTS = {  
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  USER_PROFILE: '/api/user/profile',
  UPDATE_PROFILE: '/api/user/update',
};

/**
 * Utility function to construct full API URLs
 * @param endpoint - The endpoint path
 * @returns Full URL to the API endpoint
 */
export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

/**
 * Default fetch options with CORS headers
 */
export const defaultFetchOptions = (method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'): RequestInit => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include', // Include cookies for session-based auth if needed
  };
};

/**
 * Enhanced fetch wrapper for better error handling
 * @param url - The API endpoint URL
 * @param options - Fetch options
 * @returns Promise with response data
 */
export const fetchAPI = async <T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...defaultFetchOptions(),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API Request Failed:', { url, error });
    throw error;
  }
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  buildApiUrl,
  defaultFetchOptions,
  fetchAPI,
};
