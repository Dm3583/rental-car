import type { Metadata } from 'next';
import { cache } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { notFound } from 'next/navigation';
import { fetchCarById } from '@/lib/api';
import { carDetailsQueryOptions } from '@/lib/queryOptions';
import { SITE_NAME, truncateText } from '@/lib/utils';
import CarDetailsClient from './CarDetails.client';

const getCar = cache(fetchCarById);

const isNotFound = (error: unknown) =>
  isAxiosError(error) && error.response?.status === 404;

const buildMetadata = (
  title: string,
  description: string,
  url: string,
): Metadata => {
  const fullTitle = `${title} | ${SITE_NAME}`;

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
};

export async function generateMetadata({
  params,
}: PageProps<'/catalog/[carId]'>): Promise<Metadata> {
  const { carId } = await params;
  const url = `/catalog/${carId}`;

  try {
    const car = await getCar(carId);

    return buildMetadata(
      `${car.brand} ${car.model}, ${car.year}`,
      truncateText(car.description),
      url,
    );
  } catch (error) {
    if (!isNotFound(error)) throw error;

    return buildMetadata(
      'Car not found',
      'The requested car could not be found.',
      url,
    );
  }
}

export default async function CarDetailsPage({
  params,
}: PageProps<'/catalog/[carId]'>) {
  const { carId } = await params;
  const queryClient = new QueryClient();

  try {
    await queryClient.query({
      ...carDetailsQueryOptions(carId),
      queryFn: () => getCar(carId),
    });
  } catch (error) {
    if (isNotFound(error)) notFound();

    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='pageBg pageFullHeight'>
        <CarDetailsClient />
      </div>
    </HydrationBoundary>
  );
}
