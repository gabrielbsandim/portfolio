# gbstec.dev.br

Source of [gbstec.dev.br](https://www.gbstec.dev.br), my portfolio: the products I build, my career, and short case studies that only report what was measured.

- [Obra Nova](https://www.gbstec.dev.br/cases/obra-nova): choosing the model behind a WhatsApp assistant with evals, and the latency number I got wrong first.
- [task-funnel](https://www.gbstec.dev.br/cases/task-funnel): what a Claude Code plugin changes on a risky money fix, measured with and without it.

Bilingual (English and Portuguese), built with Next.js 16, React 19 and TypeScript, deployed on Vercel from GitHub Actions.

## Run it

```bash
pnpm install
pnpm dev
```

`pnpm typecheck` and `pnpm build` are the checks CI runs before every deploy.

## Layout

- `src/app`: routes (home, `/cases`, `/resume`, `/privacy`, Open Graph image, sitemap).
- `src/content`: all copy, in both languages, as typed objects.
- `src/components`: page sections and CSS modules.
