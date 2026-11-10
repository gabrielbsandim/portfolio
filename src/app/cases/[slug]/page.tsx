import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseView } from '@/components/case-view';
import { CASES, findCase } from '@/content/cases';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CASES.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = findCase((await params).slug);
  if (!entry) return {};
  const title = `${entry.name} case study · Gabriel Sandim`;
  const url = `/cases/${entry.slug}`;
  return {
    title,
    description: entry.description,
    alternates: { canonical: url },
    openGraph: { title, description: entry.description, url, siteName: 'gbstec.dev.br', type: 'article' },
    twitter: { card: 'summary_large_image', title, description: entry.description },
  };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  if (!findCase(slug)) notFound();
  return <CaseView slug={slug} />;
}
