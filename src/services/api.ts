import axios from 'axios';
//import { useAuth } from '../contexts/AuthContext';

const $api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export { $api };