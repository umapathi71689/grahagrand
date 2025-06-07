import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const ApiService = {
  // Authentication
  auth: {
    login: (credentials) => api.post('/auth/login/', credentials),
    register: (userData) => api.post('/auth/register/', userData),
    refreshToken: (refreshToken) => api.post('/auth/refresh/', { refresh: refreshToken }),
    logout: () => api.post('/auth/logout/'),
    getMe: () => api.get('/auth/me/'),
  },

  // Properties
  properties: {
    getAll: (params = {}) => api.get('/properties/', { params }),
    getById: (id) => api.get(`/properties/${id}/`),
    create: (propertyData) => api.post('/properties/', propertyData),
    update: (id, propertyData) => api.patch(`/properties/${id}/`, propertyData),
    delete: (id) => api.delete(`/properties/${id}/`),
    uploadImages: (id, images) => {
      const formData = new FormData();
      Array.from(images).forEach((image) => {
        formData.append('images', image);
      });
      return api.post(`/properties/${id}/images/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    deleteImage: (propertyId, imageId) => 
      api.delete(`/properties/${propertyId}/images/${imageId}/`)
  },

  // Upcoming Properties
  upcomingProperties: {
    getAll: (params = {}) => api.get('/upcoming-properties/', { params }),
    getById: (id) => api.get(`/upcoming-properties/${id}/`),
    create: (propertyData) => api.post('/upcoming-properties/', propertyData),
    update: (id, propertyData) => api.patch(`/upcoming-properties/${id}/`, propertyData),
    delete: (id) => api.delete(`/upcoming-properties/${id}/`),
    uploadImages: (id, images) => {
      const formData = new FormData();
      Array.from(images).forEach((image) => {
        formData.append('images', image);
      });
      return api.post(`/upcoming-properties/${id}/images/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    deleteImage: (propertyId, imageId) => 
      api.delete(`/upcoming-properties/${propertyId}/images/${imageId}/`)
  },

  // Future Developments
  futureDevelopments: {
    getAll: (params = {}) => api.get('/future-developments/', { params }),
    getById: (id) => api.get(`/future-developments/${id}/`),
    create: (developmentData) => api.post('/future-developments/', developmentData),
    update: (id, developmentData) => api.patch(`/future-developments/${id}/`, developmentData),
    delete: (id) => api.delete(`/future-developments/${id}/`),
    uploadImages: (id, images) => {
      const formData = new FormData();
      Array.from(images).forEach((image) => {
        formData.append('images', image);
      });
      return api.post(`/future-developments/${id}/images/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    deleteImage: (developmentId, imageId) => 
      api.delete(`/future-developments/${developmentId}/images/${imageId}/`)
  },

  // Users
  users: {
    getAll: (params = {}) => api.get('/users/', { params }),
    getById: (id) => api.get(`/users/${id}/`),
    update: (id, userData) => api.patch(`/users/${id}/`, userData),
    delete: (id) => api.delete(`/users/${id}/`),
  }
};

// Add direct method aliases for easier access
ApiService.getProperties = ApiService.properties.getAll;
ApiService.getProperty = ApiService.properties.getById;
ApiService.createProperty = ApiService.properties.create;
ApiService.updateProperty = ApiService.properties.update;
ApiService.deleteProperty = ApiService.properties.delete;
ApiService.uploadPropertyImages = ApiService.properties.uploadImages;
ApiService.deletePropertyImage = ApiService.properties.deleteImage;

export default ApiService;