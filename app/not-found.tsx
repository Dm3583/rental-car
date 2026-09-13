import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/utils';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import css from './not-found.module.css';

const TITLE = `404 - Page not found | ${SITE_NAME}`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description:
    'Sorry, the page you are looking for does not exist. Go back to Rental Car and choose a car.',
  openGraph: {
    title: TITLE,
    description:
      'Sorry, the page you are looking for does not exist. Go back to Rental Car and choose a car.',
    url: '/404',
    siteName: SITE_NAME,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description:
      'Sorry, the page you are looking for does not exist. Go back to Rental Car and choose a car.',
    images: [{ url: '/og-image.png', alt: TITLE }],
  },
};

const NotFound = () => {
  return (
    <div className='container'>
      <div className={css.textWrapper}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.text}>
          Sorry, the page you are looking for does not exist.
        </p>
        <div className={css.actions}>
          <ButtonLink href='/' label='Back to Home' maxWidth={156} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
