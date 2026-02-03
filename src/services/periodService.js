import api from '../utils/axios.js';

const periodService = {
    // Get all periods
    getPeriods: async () => {
        const response = await api.get('/periods');
        return response.data;
    },

    // Get single period
    getPeriod: async (id) => {
        const response = await api.get(`/periods/${id}`);
        return response.data;
    },

    // Create new period
    createPeriod: async (data) => {
        const response = await api.post('/periods', data);
        return response.data;
    },

    // Update period
    updatePeriod: async (id, data) => {
        const response = await api.put(`/periods/${id}`, data);
        return response.data;
    },

    // Delete period
    deletePeriod: async (id) => {
        const response = await api.delete(`/periods/${id}`);
        return response.data;
    },

    // Open period for submissions
    openPeriod: async (id) => {
        const response = await api.patch(`/periods/${id}/open`);
        return response.data;
    },

    // Close period
    closePeriod: async (id) => {
        const response = await api.patch(`/periods/${id}/close`);
        return response.data;
    },
};

export default periodService;
