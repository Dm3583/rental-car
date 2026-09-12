export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: number;
  engine: string;
  rentalPrice: string;
  rentalCompany: string;
  rentalConditions: string[];
  mileage: number;
  stockNumber: number;
  features: string[];
  location: {
    country: string;
    city: string;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface Filters {
  brands: string[];
  price: PriceRange;
}

export interface RentForm {
  name: string;
  email: string;
  comment?: string;
}

export interface FilterValue {
  brand?: string;
  price?: string;
  minMileage?: string;
  maxMileage?: string;
}

export type FilterField = keyof FilterValue;

export const FILTER_FIELDS = {
  brand: 'brand',
  price: 'price',
  minMileage: 'minMileage',
  maxMileage: 'maxMileage',
} as const satisfies { [K in FilterField]-?: K };
