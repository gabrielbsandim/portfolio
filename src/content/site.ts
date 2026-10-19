import { LINKS } from './portfolio';

export const SITE_URL = 'https://www.gbstec.dev.br';

export const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Gabriel Sandim',
  url: SITE_URL,
  image: `${SITE_URL}/assets/gabriel.jpg`,
  jobTitle: 'Product Engineer, Frontend & AI',
  email: `mailto:${LINKS.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressCountry: 'BR' },
  knowsAbout: ['React', 'React Native', 'TypeScript', 'Next.js', 'Micro Frontends', 'Design Systems', 'AI agents', 'MCP', 'Claude Code'],
  sameAs: [LINKS.linkedin, LINKS.github],
  worksFor: {
    '@type': 'Organization',
    name: 'GBS Tecnologia da Informação Ltda',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/gbs-mark.svg`,
  },
};
