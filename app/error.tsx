'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import css from './error.module.css';

interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleGoHome = () => {
    router.push('/');
    retry();
  };

  return (
    <div className={`container ${css.errorWrapper}`}>
      <h2 className='title2'>Something went wrong</h2>
      <p>We couldn&apos;t load this page. Please try again.</p>
      <div className={css.errorActions}>
        <Button label='Try again' onClick={retry} maxWidth={156} />
        <Button
          label='To Home'
          variant='outlined'
          onClick={handleGoHome}
          maxWidth={156}
        />
      </div>
    </div>
  );
}
