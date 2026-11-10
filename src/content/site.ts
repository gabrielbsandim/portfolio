import { LINKS } from './portfolio';

export const SITE_URL = 'https://www.gbstec.dev.br';

export const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Gabriel Sandim',
  url: SITE_URL,
  image: `${SITE_URL}/assets/gabriel.jpg`,
  jobTitle: 'Full Stack Engineer, AI & LLMs',
  email: `mailto:${LINKS.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressCountry: 'BR' },
  knowsAbout: ['TypeScript', 'React', 'Node.js', 'Next.js', 'React Native', 'LLM APIs', 'Vertex AI', 'Amazon Bedrock', 'AI agents', 'MCP', 'Claude Code', 'Micro Frontends', 'Design Systems'],
  sameAs: [LINKS.linkedin, LINKS.github],
  worksFor: {
    '@type': 'Organization',
    name: 'GBS Tecnologia da Informação Ltda',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/gbs-mark.svg`,
  },
};
