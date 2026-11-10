import type { Metadata } from 'next';
import { CaseObraNova } from '@/components/case-obranova';

const TITLE = 'Obra Nova case study · Gabriel Sandim';
const DESCRIPTION = 'How the model behind the Obra Nova WhatsApp assistant was chosen by evals, gated on every release, traced in production and measured per turn.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/cases/obra-nova' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/cases/obra-nova', siteName: 'gbstec.dev.br', type: 'article' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function CaseObraNovaPage() {
  return <CaseObraNova />;
}
