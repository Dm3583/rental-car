import axios from 'axios';
import type { AxiosInstance } from 'axios';

const BASE_URL = 'https://car-rental-api.goit.study';

const carsApiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default carsApiClient;
