import axios from 'axios';
import type { AxiosInstance } from 'axios';

const BASE_URL = 'ACTUAL_API_URL'; // Replace with your actual API URL 

const notesApiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export default notesApiClient;