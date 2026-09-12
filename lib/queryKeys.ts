import { FilterValue } from '@/types/car';

export const carKeys = {
  all: ['cars'] as const,
  filters: () => [...carKeys.all, 'filters'] as const,
  list: () => [...carKeys.all, 'list'] as const,
  filteredList: (filters: FilterValue) => [...carKeys.list(), filters] as const,
  detail: (id: string) => [...carKeys.all, 'detail', id] as const,
};
