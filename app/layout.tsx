import type { Metadata } from 'next';
import 'modern-normalize';
import { Manrope } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import { SITE_NAME, SITE_URL } from '@/lib/utils';
import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'A simple rental car application.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_NAME,
    description: 'A simple rental car application.',
    url: '/',
    siteName: SITE_NAME,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'A simple rental car application.',
    images: [{ url: '/og-image.png', alt: SITE_NAME }],
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={manrope.variable}>
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
