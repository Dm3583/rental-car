import type { Metadata } from 'next';
import 'modern-normalize';
import { Manrope } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rental Car',
  description: 'A simple rental car application.',
  metadataBase: new URL('https://rental-car-neoversity.example.app'),
  openGraph: {
    title: 'Rental Car',
    description: 'A simple rental car application.',
    url: 'https://rental-car-neoversity.example.app',
    siteName: 'Rental Car',
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
    title: 'Rental Car',
    description: 'A simple rental car application.',
    images: [{ url: '/og-image.png', alt: 'Rental Car' }],
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
