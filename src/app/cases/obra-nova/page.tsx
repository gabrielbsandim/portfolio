import type { Metadata } from 'next';
import { CaseObraNova } from '@/components/case-obranova';

export const metadata: Metadata = {
  title: 'Obra Nova case study · Gabriel Sandim',
  description: 'How the model behind the Obra Nova WhatsApp assistant was chosen by evals, gated on every release, traced in production and measured per turn.',
};

export default function CaseObraNovaPage() {
  return <CaseObraNova />;
}
