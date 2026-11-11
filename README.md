# gbstec.dev.br — Engineering Portfolio

[![Live Site](https://img.shields.io/badge/Live-gbstec.dev.br-blue)](https://www.gbstec.dev.br)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black.svg?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black.svg?logo=vercel&logoColor=white)](https://vercel.com)

The source repository powering [gbstec.dev.br](https://www.gbstec.dev.br), the personal portfolio and technical case studies of Gabriel Sandim. Designed for speed, typography, and signal-to-noise ratio.

---

## Measured Case Studies

Rather than vague claims, the case studies document empirical benchmarks and engineering trade-offs:

- **[Obra Nova WhatsApp Assistant](https://www.gbstec.dev.br/cases/obra-nova)** — Model selection and eval framework behind a construction management assistant, dissecting voice-note parsing latency and accuracy trade-offs.
- **[task-funnel](https://www.gbstec.dev.br/cases/task-funnel)** — Ablation study of agentic coding workflows on critical financial codebase logic, showing an accuracy leap from 0.08 to 1.00 when enforcing risk lanes and refutation gates.

---

## Architectural Highlights

- **Lightweight Typed i18n:** Zero runtime overhead. Bilingual content (English & Brazilian Portuguese) is defined as strictly typed TypeScript data structures under `src/content/`.
- **Next.js 16 App Router & React 19:** Built with Server Components and static generation for instant page loads.
- **Dynamic Open Graph & Metadata:** Automated social preview generation using Next.js ImageResponse (`src/app/opengraph-image.tsx`) and dynamic XML sitemap generation (`src/app/sitemap.ts`).
- **Minimal CSS Footprint:** Styled with semantic CSS Modules and localized CSS variables, avoiding runtime CSS-in-JS dependencies. Self-hosted Geist font subsets.

---

## Project Structure

```
portfolio/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Portfolio home page
│   │   ├── cases/           # Technical case studies
│   │   ├── resume/          # Career & CV page
│   │   ├── privacy/         # Privacy policy
│   │   ├── brand/           # Brand assets & guidelines
│   │   ├── sitemap.ts       # Dynamic sitemap
│   │   └── opengraph-image  # Edge OG card generator
│   ├── components/          # Reusable UI components & CSS modules
│   └── content/             # Typed bilingual dictionaries (EN / PT)
├── public/                  # Static assets & icons
└── vercel.json              # Deployment configuration
```

---

## Local Development

### Prerequisites

- **Node.js:** `>= 24.0.0`
- **pnpm:** `>= 9.0.0`

### Quickstart

```bash
# Install dependencies
pnpm install

# Start local development server (http://localhost:3000)
pnpm dev

# Run static type verification
pnpm typecheck

# Build for production
pnpm build
```

---

## Deployment & CI

Continuous deployment is handled automatically via GitHub Actions and Vercel. Every pull request runs `pnpm typecheck` and `pnpm build` before deployment.

---

## License

[MIT](LICENSE) © Gabriel Sandim
