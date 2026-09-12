'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/Button/Button';
import EmptyListState from '@/components/EmptyListState/EmptyListState';
import css from './CatalogPage.module.css';

interface CatalogErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function CatalogError({ error, retry }: CatalogErrorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasFilters = searchParams.toString().length > 0;

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleOpenPlainCatalog = () => {
    router.push('/catalog');
    retry();
  };

  return (
    <div className='pageBg pageFullHeight'>
      <div className='container'>
        <EmptyListState
          imageSrc={null}
          title='Something went wrong'
          description={
            hasFilters
              ? "We couldn't load the cars. The filters in the address may be invalid, so open the catalog without them."
              : "We couldn't load the cars. Please try again."
          }
        />
        <div className={css.errorActions}>
          {hasFilters ? (
            <Button
              label='To Catalog'
              maxWidth={156}
              onClick={handleOpenPlainCatalog}
            />
          ) : (
            <Button label='Try again' maxWidth={156} onClick={retry} />
          )}
        </div>
      </div>
    </div>
  );
}
