import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';

const ROUTES = ['', '/resume', '/brand', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({ url: `${SITE_URL}${route}` }));
}
