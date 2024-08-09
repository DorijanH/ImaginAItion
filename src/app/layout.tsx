import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

import Providers from '@/components/providers/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}
