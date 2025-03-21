import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import CombineProviders from '@/providers/providers';
import Header from '@/components/common/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Weather Forecast',
  description:
    'A modern weather forecast application built with Next.js and React.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CombineProviders>
          <div className="flex h-screen flex-col">
            <Header />
            <main className="min-h-0 w-full flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </CombineProviders>
      </body>
    </html>
  );
}
