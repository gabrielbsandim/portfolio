import type { Metadata } from 'next';
import { CasesIndex } from '@/components/cases-index';

const TITLE = 'Case studies · Gabriel Sandim';
const DESCRIPTION = 'Short case studies of products I build and run, from an AI assistant chosen by evals to a Claude Code plugin that gates risky changes, each with the numbers behind it.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/cases' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/cases', siteName: 'gbstec.dev.br', type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function CasesPage() {
  return <CasesIndex />;
}
