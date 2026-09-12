import type { Car, RentForm, Filters, FilterValue } from '@/types/car';
import carsApiClient from './httpClient';

const CARS = '/cars';
const FILTERS = `${CARS}/filters`;
const BOOKING_REQUESTS = 'booking-requests';
const PER_PAGE = 12;

export interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}

export interface BookingResponse {
  message: string;
}

export const fetchCars = async (
  page: number,
  filters: FilterValue,
): Promise<FetchCarsResponse> => {
  const response = await carsApiClient.get<FetchCarsResponse>(CARS, {
    params: {
      ...filters,
      page,
      perPage: PER_PAGE,
    },
  });

  return response.data;
};

export const fetchCarById = async (carId: string): Promise<Car> => {
  const response = await carsApiClient.get<Car>(`${CARS}/${carId}`);

  return response.data;
};

export const createBookingCar = async (
  carId: string,
  rentForm: RentForm,
): Promise<BookingResponse> => {
  const response = await carsApiClient.post<BookingResponse>(
    `${CARS}/${carId}/${BOOKING_REQUESTS}`,
    rentForm,
  );

  return response.data;
};

export const fetchFilters = async (): Promise<Filters> => {
  const response = await carsApiClient.get<Filters>(FILTERS);

  return response.data;
};
