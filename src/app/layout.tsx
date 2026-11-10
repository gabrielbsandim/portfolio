import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SITE_URL } from '@/content/site';
import './globals.css';

const sans = Geist({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-sans' });
const mono = Geist_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const TITLE = 'Gabriel Sandim · Full Stack Engineer, AI & LLMs';
const SHORT = 'TypeScript, React, Node.js and LLMs in production, measured by cost and latency.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description:
    'Full stack engineer building LLM-powered products, AI agents, scalable interfaces and micro frontends. Also builds and runs Obra Nova, Kapi and Lifedeck.',
  alternates: { canonical: '/' },
  openGraph: {
    title: TITLE,
    description: SHORT,
    url: SITE_URL,
    siteName: 'gbstec.dev.br',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: SHORT },
};

export const viewport: Viewport = { themeColor: '#101114' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
