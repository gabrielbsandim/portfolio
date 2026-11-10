import Link from 'next/link';
import { LINKS } from '@/content/portfolio';
import s from './resume.module.css';

const SKILL_ROWS = [
  ['AI engineering', 'LLM APIs, Vertex AI, Amazon Bedrock, prompt caching, OCR pipelines, cost and latency tracing, AI agents, Claude Code, MCP'],
  ['Full stack', 'TypeScript, React, Next.js, Node.js, PostgreSQL, Micro Frontends, Design Systems'],
  ['Infra', 'Vercel, Firebase, Sentry, Langfuse, CI/CD, Azure DevOps'],
  ['Mobile and testing', 'Expo, Flutter, Ionic, Jest, code review, monitoring'],
] as const;

const LLM_WORK = [
  'Own the internal API our products use to call Vertex AI: configuration, cost and latency measurement, and the move to multi-provider. Proposed Langfuse for tracing, now being adopted.',
  'Cut the cost of a complex OCR-heavy analysis from ~US$13 to ~US$6 per run with the same model, through prompt work, a better OCR step, reordered calls and explicit caching, with evals confirming quality held. Validating Amazon Bedrock with other models, projected at ~US$2.5.',
];

const AI_WORK = [
  'Compressed ~6 months of discovery for a large initiative into days by using AI to analyze requirements, define scope, build a working prototype and write the documentation; the project was approved in under 2 weeks.',
  'Initiated an AI agent that triages Sentry issues, reads the affected code and opens pull requests with proposed fixes, so engineers start from a reviewable diff instead of a stack trace.',
  'Created a prototype-to-feedback pipeline that turns Lovable and Claude prototypes into deployable review builds where business stakeholders comment on specific screens and approve before development starts.',
  'Led the team’s internal Claude Code plugin: coding standards, in-browser task validation, Azure DevOps access where MCP support is limited, workflow funnels and automated PR reviewers.',
];

const PLATFORM_WORK = [
  'Architected and implemented a Micro Frontends platform that lets 20+ products deploy independently, with faster and safer releases.',
  'Built and evolved the internal Design System and shared libraries (components, tooling, monitoring, i18n) used by ~10 teams across 20+ products.',
  'Took ownership of a critical gas cylinder tracking system and cut frontend issues from ~100 tickets a month to zero.',
  'Delivered finance, logistics, inventory, reporting and delivery platforms for thousands of users in 5 countries; defined frontend standards and code review practices that reduced onboarding time by 50%.',
];

const SAFIRA_WORK = [
  'Led development of the company’s first customer-facing product, moving it from internal tools to external products.',
  'Owned the migration of a legacy solar panel leasing system after an acquisition, delivering a working version in ~1 month and preventing 90 days of downtime.',
  'Designed and built a billing and debt management system (credit card and invoice payments) that ran in production without errors and became one of the company’s most impactful solutions.',
];

function Role({ org, title, dates }: { org: string; title: string; dates: string }) {
  return (
    <div className={s.role}>
      <span className={s.roleName}>
        <strong>{org}</strong> · {title}
      </span>
      <span className={s.dates}>{dates}</span>
    </div>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className={s.list}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function Resume() {
  return (
    <div className={s.root}>
      <nav className={s.toolbar}>
        <Link href="/" className={s.toolLink}>← gbstec.dev.br</Link>
        <a href={LINKS.cvPdf} download className={s.toolLink}>Download PDF ↓</a>
      </nav>

      <section className={s.page}>
        <header className={s.header}>
          <div>
            <h1 className={s.name}>Gabriel Sandim</h1>
            <div className={s.headline}>
              Full Stack Engineer <span className={s.acc}>·</span> AI Engineering
            </div>
          </div>
          <div className={s.contact}>
            <div>São Paulo, Brazil · Remote (GMT-3)</div>
            <div>
              <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a> · <a href="https://gbstec.dev.br">gbstec.dev.br</a>
            </div>
            <div><a href={LINKS.linkedin}>linkedin.com/in/gabriel-bastos-sandim</a></div>
            <div><a href={LINKS.github}>github.com/gabrielbsandim</a></div>
          </div>
        </header>

        <div>
          <h2 className={s.h2}>Summary</h2>
          <p className={s.summary}>
            Full Stack Engineer with 6+ years building web and mobile products in TypeScript for enterprise platforms
            used in 5 countries. Most of my work now is LLM engineering: I run the internal API that calls our models
            and cut cost per analysis by more than half with the same model. I also build agents and Claude Code
            tooling that speed up discovery, development and code review. On the side I ship and run my own apps, live
            on the App Store and Google Play. Professional English, working with US and European teams.
          </p>
        </div>

        <div>
          <h2 className={s.h2}>Skills</h2>
          <div className={s.skills}>
            {SKILL_ROWS.map(([label, value]) => (
              <div key={label} className={s.skillRow}>
                <span className={s.skillLabel}>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={s.block}>
          <h2 className={s.h2}>Experience</h2>
          <Role org="Air Liquide" title="Full Stack Engineer since Aug 2026, Frontend Engineer before" dates="Oct 2021 - Present" />
          <div className={s.sub}>AI and LLM engineering (2026)</div>
          <Bullets items={[...LLM_WORK, ...AI_WORK]} />
          <div className={`${s.sub} ${s.subGap}`}>Platform and architecture</div>
          <Bullets items={PLATFORM_WORK} />
          <div className={s.stack}>TypeScript, Node.js, React, React Native, Vertex AI, Amazon Bedrock, Claude Code, MCP, Jest, Azure DevOps</div>
        </div>
      </section>

      <section className={s.page}>
        <div className={s.runningHead}>
          <span className={s.runningName}>Gabriel Sandim</span>
          <span>{LINKS.email} · gbstec.dev.br</span>
        </div>

        <div className={s.block}>
          <Role org="GBS Tecnologia da Informação" title="Side products, built and run solo" dates="2021 - Present" />
          <ul className={s.list}>
            <li>
              My own company for side products, run end to end: product design, frontend, backend, infrastructure,
              billing and support.
            </li>
            <li>
              <strong>Obra Nova</strong> (obranova.com.br): SaaS for small and mid-sized construction companies with
              paid plans, on the web, App Store and Google Play. Projects, finances and P&amp;L per project, plus an AI
              assistant on WhatsApp with 39 tools that files daily site reports by voice; p95 response time cut from
              82 s to 8 s, traced in Langfuse. Next.js, PostgreSQL, Vercel, Sentry, Flutter.
            </li>
            <li>
              <strong>Kapi</strong> (kapiapp.com.br): gamified workout app live on Google Play, App Store review pending. Guided workouts, XP,
              streaks and weekly rankings, watch import through Health Connect and in-app subscriptions. Flutter, Next.js,
              PostgreSQL; first commit to store listing in under a week.
            </li>
            <li>
              <strong>Lifedeck</strong> (lifedeck.com.br): task and event manager with WhatsApp reminders and task
              creation by message.
            </li>
            <li>
              <strong>task-funnel</strong> (open source): Claude Code plugin that turns one task into a reviewed draft
              pull request, with isolated worktrees, the repo’s real CI gates and adversarial AI reviewers.
            </li>
            <li>
              <strong>Cashdeck</strong> (open source): self-hosted household finance with Open Finance sync, bill
              capture and an AI chat with tools. TypeScript, Next.js, PostgreSQL, Flutter.
            </li>
          </ul>
        </div>

        <div className={s.block}>
          <Role org="Safira Holding" title="Full Stack Engineer" dates="Jan 2020 - Oct 2021" />
          <Bullets items={SAFIRA_WORK} />
          <div className={s.stack}>Node.js, TypeScript, Angular, Ionic, Firebase</div>
        </div>

        <div className={s.facts}>
          <div className={s.fact}>
            <h2 className={s.h2Flush}>Education</h2>
            <div><strong>Systems Analysis and Development</strong></div>
            <div className={s.muted}>Fatec Mogi das Cruzes · 2018 - 2021</div>
          </div>
          <div className={s.fact}>
            <h2 className={s.h2Flush}>Certification</h2>
            <div><strong>Scrum Fundamentals Certified</strong></div>
            <div className={s.muted}>SCRUMstudy</div>
          </div>
          <div className={s.fact}>
            <h2 className={s.h2Flush}>Languages</h2>
            <div>Portuguese, native</div>
            <div>English, professional working proficiency</div>
          </div>
          <div className={s.fact}>
            <h2 className={s.h2Flush}>Volunteering</h2>
            <div><strong>Computer Science Instructor</strong>, Associação Árvore da Vida</div>
            <div className={s.muted}>
              Taught computing fundamentals to children and teens (6 to 17) and built interactive lesson plans for
              digital inclusion.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
