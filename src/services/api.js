import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

// User auth
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const getUserProfile = (userId) => api.get(`/profile/${userId}`);
export const updateUserProfile = (userId, data) => api.put(`/profile/${userId}`, data);

// Trips
export const getTrips = (userId) => api.get(`/trips?userId=${userId}`);
export const getTripById = (id, userId) => api.get(`/trips/${id}?userId=${userId}`);
export const createTrip = (data, userId) => api.post(`/trips?userId=${userId}`, data);
export const deleteTrip = (id, userId) => api.delete(`/trips/${id}?userId=${userId}`);
export const addTripItem = (tripId, data, userId) => api.post(`/trips/${tripId}/items?userId=${userId}`, data);
export const removeTripItem = (itemId, userId) => api.delete(`/trips/items/${itemId}?userId=${userId}`);

// Saved Places
export const getSavedPlaces = (userId) => api.get(`/saved?userId=${userId}`);
export const savePlace = (data, userId) => api.post(`/saved?userId=${userId}`, data);
export const removeSavedPlace = (id, userId) => api.delete(`/saved/${id}?userId=${userId}`);

// Global Search & Places
export const searchAll = (query) => api.get(`/search?q=${query}`);
export const getTravelPlaces = () => api.get('/travelplaces');
export const getRestaurants = () => api.get('/restaurants');
export const getHotels = () => api.get('/hotels');

export default api;
