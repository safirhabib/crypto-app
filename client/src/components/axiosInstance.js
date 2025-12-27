import axios from 'axios';

// Default axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 10000,
});

// News-specific axios instance
export const newsAxiosInstance = axios.create({
  baseURL: 'https://newsapi.org/v2/',  // Adjust the URL to the correct API endpoint for news
  timeout: 10000,
});

export default axiosInstance;
