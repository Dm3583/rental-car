import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { fetchCars, fetchFilters } from './api';
import { carKeys } from './queryKeys';
import { FilterValue } from '@/types/car';
import { normalizeFilters, retryUnlessClientError } from './utils';

const CARS_STALE_TIME = 60 * 1000;

export const filtersQueryOptions = queryOptions({
  queryKey: carKeys.filters(),
  queryFn: () => fetchFilters(),
  staleTime: Infinity,
});

export const carsInfiniteQueryOptions = (filters: FilterValue) => {
  const normalized = normalizeFilters(filters);

  return infiniteQueryOptions({
    queryKey: carKeys.filteredList(normalized),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchCars(pageParam, normalized),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    retry: retryUnlessClientError,
    staleTime: CARS_STALE_TIME,
  });
};
