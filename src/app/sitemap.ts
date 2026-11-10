import type { MetadataRoute } from 'next';
import { CASES } from '@/content/cases';
import { SITE_URL } from '@/content/site';

const ROUTES = ['', '/resume', '/cases', ...CASES.map((entry) => `/cases/${entry.slug}`), '/brand', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({ url: `${SITE_URL}${route}` }));
}
