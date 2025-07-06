import {AUTH_STORAGE_KEY} from '../constants/local-storage';

export const authService = {
    login: (username) => {
      try {
        const data = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}');
        data.user = { username, loginTime: new Date().toISOString() };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
        return data.user;
      } catch (error) {
        console.error('Error logging in:', error);
        return null;
      }
    },
  
    logout: () => {
      try {
        const data = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}');
        delete data.user;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  
    getCurrentUser: () => {
      try {
        const data = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}');
        return data.user || null;
      } catch (error) {
        console.error('Error getting current user:', error);
        return null;
      }
    },
  
    isAuthenticated: () => {
      return authService.getCurrentUser() !== null;
    }
  };