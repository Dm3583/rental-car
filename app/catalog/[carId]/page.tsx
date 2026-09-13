import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { carDetailsQueryOptions } from '@/lib/queryOptions';
import CarDetailsClient from './CarDetails.client';

type CarDetailsProps = {
  params: Promise<{ carId: string }>;
};

export default async function CarDetailsPage({ params }: CarDetailsProps) {
  const { carId } = await params;
  const queryClient = new QueryClient();
  await queryClient.query(carDetailsQueryOptions(carId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='pageBg pageFullHeight'>
        <CarDetailsClient />
      </div>
    </HydrationBoundary>
  );
}
