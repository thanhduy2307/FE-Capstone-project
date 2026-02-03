// API Configuration
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
  },
  staging: {
    baseURL: 'https://staging-api.example.com/api',
    timeout: 10000,
  },
  production: {
    baseURL: 'https://api.example.com/api',
    timeout: 10000,
  },
};

// Get current environment
const ENV = import.meta.env.MODE || 'development';

// Export current config
export const apiConfig = API_CONFIG[ENV];

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    CURRENT_USER: '/auth/me',
  },
  
  // Thesis endpoints
  THESIS: {
    LIST: '/theses',
    CREATE: '/theses',
    DETAIL: (id) => `/theses/${id}`,
    UPDATE: (id) => `/theses/${id}`,
    DELETE: (id) => `/theses/${id}`,
  },
  
  // User endpoints (for future use)
  USERS: {
    LIST: '/users',
    DETAIL: (id) => `/users/${id}`,
  },
};

export default apiConfig;
