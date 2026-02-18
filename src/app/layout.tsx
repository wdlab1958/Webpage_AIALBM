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
  title: 'AIALBM v4.1.0 — AI Advances by Learning Brain Memory',
  description: 'Personalized AI Agent Platform with Multi-Agent Orchestration, 3-Layer Memory, Vibe Coding, Federated Learning, and Autonomous Evolution. 172+ API endpoints, 100% test pass rate.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-nebula-navy font-sans antialiased" suppressHydrationWarning>
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
