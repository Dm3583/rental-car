import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import CatalogClient from './Catalog.client';
import LoadingOverlay from '@/components/LoadingOverlay/LoadingOverlay';
import {
  carsInfiniteQueryOptions,
  filtersQueryOptions,
} from '@/lib/queryOptions';
import { filtersFromSearchParams, toSearchParams } from '@/lib/utils';

export default async function CatalogPage({
  searchParams,
}: PageProps<'/catalog'>) {
  const queryClient = new QueryClient();

  const appliedFilters = filtersFromSearchParams(
    toSearchParams(await searchParams),
  );

  await Promise.all([
    queryClient.query(filtersQueryOptions),
    queryClient.infiniteQuery(carsInfiniteQueryOptions(appliedFilters)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='pageBg pageFullHeight'>
        <div className='container'>
          <Suspense fallback={<LoadingOverlay title='Loading...' fullScreen />}>
            <CatalogClient />
          </Suspense>
        </div>
      </div>
    </HydrationBoundary>
  );
}
