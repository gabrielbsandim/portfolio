import type { Metadata } from 'next';
import { Brand } from '@/components/brand';

export const metadata: Metadata = {
  title: 'Brand · GBS Tecnologia',
  description: 'The GBS Tecnologia mark, lockup, colors, usage rules and files.',
};

export default function BrandPage() {
  return <Brand />;
}
