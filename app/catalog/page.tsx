import type { Metadata } from 'next';
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
import {
  SITE_NAME,
  describeFilters,
  filtersFromSearchParams,
  filtersToSearchParams,
  toSearchParams,
} from '@/lib/utils';

const BASE_TITLE = 'Catalog';
const BASE_DESCRIPTION =
  'Browse our extensive catalog of rental cars and find the perfect vehicle for your needs.';

export async function generateMetadata({
  searchParams,
}: PageProps<'/catalog'>): Promise<Metadata> {
  const filters = filtersFromSearchParams(toSearchParams(await searchParams));
  const summary = describeFilters(filters);
  const query = filtersToSearchParams(filters).toString();

  const title = summary ? `${BASE_TITLE}: ${summary}` : BASE_TITLE;
  const fullTitle = `${title} | ${SITE_NAME}`;
  const description = summary
    ? `Rental cars matching your filters: ${summary}.`
    : BASE_DESCRIPTION;
  const url = query ? `/catalog?${query}` : '/catalog';

  return {
    title,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        { url: '/og-image.png', width: 1200, height: 630, alt: fullTitle },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [{ url: '/og-image.png', alt: fullTitle }],
    },
  };
}

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
