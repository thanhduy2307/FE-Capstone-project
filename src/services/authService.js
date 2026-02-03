import axiosInstance from '../utils/axios.js';
import { API_ENDPOINTS } from '../config/api.config.js';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
const authService = {
    /**
     * Login user
     * @param {Object} credentials - { email/username, password }
     * @returns {Promise} User data and tokens
     */
    async login(credentials) {
        try {
            const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

            // Save tokens to localStorage
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
            }
            if (response.data.refreshToken) {
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Logout user
     * @returns {Promise}
     */
    async logout() {
        try {
            await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
        } catch (error) {
            // Even if API call fails, clear local storage
            console.error('Logout error:', error);
        } finally {
            // Clear all auth data
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        }
    },

    /**
     * Refresh access token
     * @returns {Promise} New access token
     */
    async refreshToken() {
        try {
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
                refreshToken,
            });

            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
            }

            return response.data;
        } catch (error) {
            // Clear tokens if refresh fails
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            throw error;
        }
    },

    /**
     * Get current user info
     * @returns {Promise} Current user data
     */
    async getCurrentUser() {
        try {
            const response = await axiosInstance.get(API_ENDPOINTS.AUTH.CURRENT_USER);

            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Check if user is authenticated (has valid token)
     * @returns {boolean}
     */
    isAuthenticated() {
        const token = localStorage.getItem('accessToken');
        return !!token;
    },

    /**
     * Get stored user data
     * @returns {Object|null} User object or null
     */
    getStoredUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (error) {
                console.error('Error parsing user data:', error);
                return null;
            }
        }
        return null;
    },
};

export default authService;
