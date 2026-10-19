import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const sans = Geist({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-sans' });
const mono = Geist_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://gbstec.dev.br'),
  title: 'Gabriel Sandim · Frontend Engineer',
  description:
    'Frontend engineer building AI-powered workflows, scalable interfaces and micro frontends. Founder of GBS Tecnologia, the company behind Obra Nova and Lifedeck.',
  openGraph: {
    title: 'Gabriel Sandim · Frontend Engineer',
    description: 'React, TypeScript and AI agents. Founder of GBS Tecnologia.',
    url: 'https://gbstec.dev.br',
    siteName: 'gbstec.dev.br',
    type: 'website',
  },
};

export const viewport: Viewport = { themeColor: '#101114' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
