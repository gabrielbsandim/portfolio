import type { Metadata } from 'next';
import { Privacy } from '@/components/privacy';

export const metadata: Metadata = {
  title: 'Política de Privacidade · GBS Tecnologia',
  description: 'Como a GBS Tecnologia da Informação Ltda trata dados pessoais no site gbstec.dev.br e nos seus aplicativos.',
};

export default function PrivacyPage() {
  return <Privacy />;
}
