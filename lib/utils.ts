import { isAxiosError } from 'axios';
import {
  FILTER_FIELDS,
  FilterField,
  PriceRange,
  FilterValue,
} from '@/types/car';

export const toNumberOrUndefined = (raw: string): number | undefined => {
  if (raw === '') return undefined;

  const parsed = Number(raw);

  return Number.isNaN(parsed) ? undefined : parsed;
};

export const getPriceOptions = (pricesRange: PriceRange) => {
  const priceList = [];
  for (let price = pricesRange.min; price <= pricesRange.max; price += 10) {
    priceList.push({ value: price.toString(), label: price.toString() });
  }
  return priceList;
};

export const normalizeFilters = (filters: FilterValue): FilterValue =>
  Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== '',
    ),
  );

export const toDigits = (raw: string): string => raw.replace(/\D/g, '');

export const retryUnlessClientError = (
  failureCount: number,
  error: unknown,
): boolean => {
  const status = isAxiosError(error) ? error.response?.status : undefined;

  if (status !== undefined && status >= 400 && status < 500) return false;

  return failureCount < 3;
};

type ReadableParams = { get(name: string): string | null };

const NUMERIC_FILTER_FIELDS: FilterField[] = [
  FILTER_FIELDS.price,
  FILTER_FIELDS.minMileage,
  FILTER_FIELDS.maxMileage,
];

export const filtersFromSearchParams = (
  params: ReadableParams,
): FilterValue => {
  const filters: FilterValue = {};

  for (const field of Object.values(FILTER_FIELDS)) {
    const raw = params.get(field) ?? '';

    filters[field] = NUMERIC_FILTER_FIELDS.includes(field)
      ? toDigits(raw)
      : raw;
  }

  return normalizeFilters(filters);
};

export const filtersToSearchParams = (
  filters: FilterValue,
): URLSearchParams => {
  const params = new URLSearchParams();

  for (const [field, value] of Object.entries(normalizeFilters(filters))) {
    if (value) params.set(field, value);
  }

  return params;
};

type SearchParamsObject = Record<string, string | string[] | undefined>;

export const toSearchParams = (params: SearchParamsObject): URLSearchParams => {
  const result = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    const first = Array.isArray(value) ? value[0] : value;

    if (first !== undefined) result.set(key, first);
  }

  return result;
};
