import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { GlobalBackground } from '@/components/layout/GlobalBackground';
import { Providers } from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AIALBM - Autonomous AI Learning Based Model',
  description: 'Personalized AI Agent Platform with Self-Programming and Continuous Learning capabilities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen bg-nebula-navy font-sans antialiased">
        <Providers>
          <GlobalBackground />
          <main className="relative z-10 flex-1">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
