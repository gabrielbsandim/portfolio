// Renders the site's content as structured Markdown notes in the personal vault,
// and reindexes the personal vault in brain-tools so search and Ponto stay in sync.
// Run by the post-commit hook and `pnpm brain`.
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { homedir, tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = process.env.BRAIN_PORTFOLIO_DIR ?? join(homedir(), 'brain/personal/career/portfolio');
const BRAIN_TOOLS = process.env.BRAIN_TOOLS_DIR ?? join(homedir(), 'brain-tools');
const LANGS = ['en', 'pt'];
const LANG_NAME = { en: 'English', pt: 'Portuguese' };

const noDash = (s) =>
  String(s ?? '')
    .replace(/(\d)\s*[—–]\s*(\d)/g, '$1-$2')
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/&amp;/g, '&');

function loadContent() {
  const dir = mkdtempSync(join(tmpdir(), 'portfolio-brain-'));
  writeFileSync(join(dir, 'package.json'), '{"type":"commonjs"}');
  for (const name of ['portfolio', 'cases', 'site']) {
    const source = readFileSync(join(ROOT, 'src/content', `${name}.ts`), 'utf8');
    const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    writeFileSync(join(dir, `${name}.js`), js.outputText);
  }
  const load = createRequire(join(dir, 'index.js'));
  const content = { ...load('./portfolio.js'), ...load('./cases.js'), ...load('./site.js') };
  rmSync(dir, { recursive: true, force: true });
  return content;
}

function loadResumeArrays() {
  const src = readFileSync(join(ROOT, 'src/components/resume.tsx'), 'utf8');
  const sf = ts.createSourceFile('resume.tsx', src, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TSX);
  const arrays = {};
  const stringLiterals = (node) => {
    const out = [];
    const walk = (n) => {
      if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) out.push(noDash(n.text));
      ts.forEachChild(n, walk);
    };
    walk(node);
    return out;
  };
  ts.forEachChild(sf, (node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const decl of node.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
      const name = decl.name.text;
      if (name === 'SKILL_ROWS') {
        const rows = [];
        const walkRow = (n) => {
          if (ts.isArrayLiteralExpression(n) && n.elements.length === 2 && n.elements.every(ts.isStringLiteral)) {
            rows.push([noDash(n.elements[0].text), noDash(n.elements[1].text)]);
            return;
          }
          ts.forEachChild(n, walkRow);
        };
        walkRow(decl.initializer);
        arrays[name] = rows;
      } else {
        arrays[name] = stringLiterals(decl.initializer);
      }
    }
  });
  return arrays;
}

function jobLines(job) {
  return [
    `### ${noDash(job.company)}, ${noDash(job.role)} (${noDash(job.period)})`,
    '',
    ...(job.prev ? [`Before: ${noDash(job.prev)}`, ''] : []),
    `Stack: ${job.stack.map(noDash).join(', ')}`,
    '',
    ...job.items.map((i) => `- ${i.g ? `[${noDash(i.g)}] ` : ''}**${noDash(i.h)}** ${noDash(i.d)}`),
    '',
  ];
}

function frontmatter(name, description) {
  return ['---', `name: ${name}`, `description: "${noDash(description).replace(/"/g, "'")}"`, 'metadata:', '  type: reference', '---', ''];
}

const stamp = (commit) => `Generated from the portfolio repo at ${commit} by scripts/export-brain.mjs. Do not edit here: change the site content and commit.`;

function portfolioNote(c, lang, commit) {
  const copy = c.COPY[lang];
  const isPt = lang === 'pt';
  const statLine = (s) => `- **${s.pre}${s.n}${s.suf}**: ${noDash(s.label)}`;
  const productSection = (p) => [
    `### ${noDash(p.name)} (${noDash(p.tag)} · ${noDash(p.badge)})`,
    '',
    noDash(p.desc),
    '',
    `- URL: ${p.url}`,
    `- Stack: ${noDash(p.stack)}`,
    '',
  ];

  return [
    ...frontmatter(`portfolio-${lang}`, `Gabriel's public portfolio (${c.SITE_URL}) in ${LANG_NAME[lang]}: positioning, career by employer, products, AI work, numbers`),
    `# Portfolio (${LANG_NAME[lang]})`,
    '',
    stamp(commit),
    '',
    `## ${isPt ? 'Resumo e Posicionamento' : 'Summary and Positioning'}`,
    '',
    `- Site: ${c.SITE_URL}`,
    `- ${isPt ? 'Título' : 'Title'}: ${noDash(c.PERSON_JSON_LD.jobTitle)}`,
    `- ${isPt ? 'Posicionamento' : 'Positioning'}: ${noDash(copy.kicker)}`,
    `- ${isPt ? 'Foco' : 'Focus'}: ${noDash(copy.role_prefix)} ${copy.words.map(noDash).join(' ')}`,
    `- ${isPt ? 'Resumo' : 'Summary'}: ${noDash(copy.hero_sub)}`,
    `- ${isPt ? 'Destaques' : 'At a glance'}: ${copy.glance.map(noDash).join(' | ')}`,
    `- Skills: ${c.SKILLS.map(noDash).join(', ')}`,
    '',
    `## ${isPt ? 'Números e Impacto' : 'Key Metrics and Impact'}`,
    '',
    ...copy.stats.map(statLine),
    '',
    `## ${isPt ? 'Carreira e Experiência' : 'Career and Experience'}`,
    '',
    `${noDash(copy.exp_title)}`,
    '',
    ...copy.jobs.flatMap(jobLines),
    `## ${isPt ? 'Engenharia de IA e LLM no Trabalho' : 'AI and LLM Engineering at Work'}`,
    '',
    `**${noDash(copy.ai_title)}**`,
    '',
    noDash(copy.ai_desc),
    '',
    ...copy.ai_items.flatMap((item) => [
      `### ${item.k}. ${noDash(item.title)}`,
      '',
      noDash(item.desc),
      '',
      `Tags: ${noDash(item.tags)}`,
      '',
    ]),
    `## ${noDash(copy.ai_principles_label)}`,
    '',
    ...copy.ai_principles.map((p) => `- **${noDash(p.h)}** ${noDash(p.d)}`),
    '',
    noDash(copy.ai_proof),
    '',
    `## ${isPt ? 'GBS Tecnologia e Produtos Próprios' : 'GBS Tecnologia and Side Products'}`,
    '',
    `**${noDash(copy.studio_title)}**`,
    '',
    noDash(copy.studio_desc),
    '',
    ...copy.company_facts.map((f) => `- **${noDash(f.k)}**: ${noDash(f.v)}`),
    '',
    `### Obra Nova (${noDash(copy.obra_tag)} · ${noDash(copy.obra_status)})`,
    '',
    noDash(copy.obra_desc),
    '',
    ...copy.obra_points.map((pt) => `- ${noDash(pt)}`),
    `- Site: ${c.LINKS.obra}`,
    `- Case study: ${c.SITE_URL}${c.LINKS.obraCase}`,
    '',
    `### Kapi (${noDash(copy.kapi_tag)} · ${noDash(copy.kapi_status)})`,
    '',
    noDash(copy.kapi_desc),
    '',
    ...copy.kapi_points.map((pt) => `- ${noDash(pt)}`),
    `- Stack: ${noDash(copy.kapi_stack)}`,
    `- Site: ${c.LINKS.kapi}`,
    '',
    ...copy.products.flatMap(productSection),
    `## ${isPt ? 'Sobre Mim e Trajetória' : 'About Me and Background'}`,
    '',
    `**${noDash(copy.about_title)}**`,
    '',
    noDash(copy.about_p1),
    '',
    noDash(copy.about_p2),
    '',
    `## ${isPt ? 'Formação, Certificação, Idiomas e Voluntariado' : 'Education, Certification, Languages and Volunteering'}`,
    '',
    ...copy.facts.map((f) => `- **${noDash(f.label)}**: ${noDash(f.title)} (${noDash(f.meta)})`),
    '',
    '## Links',
    '',
    ...Object.entries(c.LINKS).map(([k, v]) => `- ${k}: ${v}`),
    '',
  ].join('\n');
}

function tableLines(t) {
  return [
    `| ${t.head.map(noDash).join(' | ')} |`,
    `| ${t.head.map(() => '---').join(' | ')} |`,
    ...t.rows.map((r) => `| ${r.map(noDash).join(' | ')} |`),
    '',
    `Chosen: ${noDash(t.rows[t.pick]?.[0] ?? '')}. ${noDash(t.note)}`,
    '',
  ];
}

function sectionLines(s) {
  return [
    `## ${noDash(s.t)}`,
    '',
    ...(s.p ?? []).flatMap((p) => [noDash(p), '']),
    ...(s.table ? tableLines(s.table) : []),
    ...(s.l ?? []).map((l) => `- ${noDash(l)}`),
    ...(s.l ? [''] : []),
    ...(s.after ?? []).flatMap((p) => [noDash(p), '']),
  ];
}

function caseNote(c, entry, lang, commit) {
  const copy = entry.copy[lang];
  return [
    ...frontmatter(`portfolio-case-${entry.slug}-${lang}`, `Portfolio case study, ${entry.name}, in ${LANG_NAME[lang]}: ${copy.title}`),
    `# ${noDash(entry.name)}: ${noDash(copy.title)}`,
    '',
    stamp(commit),
    '',
    `${c.SITE_URL}/cases/${entry.slug} · ${noDash(copy.tag)} · ${copy.meta.map(noDash).join(' · ')}`,
    '',
    noDash(copy.summary),
    '',
    ...copy.stats.map((s) => `- **${noDash(s.v)}**: ${noDash(s.label)}`),
    '',
    ...copy.sections.flatMap(sectionLines),
    ...entry.links.map((l) => `- ${noDash(l.label[lang])}: ${l.href}`),
    '',
  ].join('\n');
}

function resumeNote(c, commit) {
  const r = loadResumeArrays();
  const skills = (r.SKILL_ROWS ?? []).map(([label, value]) => `- **${label}**: ${value}`);
  const llmWork = (r.LLM_WORK ?? []).map((item) => `- ${item}`);
  const aiWork = (r.AI_WORK ?? []).map((item) => `- ${item}`);
  const platformWork = (r.PLATFORM_WORK ?? []).map((item) => `- ${item}`);
  const safiraWork = (r.SAFIRA_WORK ?? []).map((item) => `- ${item}`);

  return [
    ...frontmatter('portfolio-resume', `Gabriel's resume as published at ${c.SITE_URL}/resume: summary, skills, experience at Air Liquide, GBS Tecnologia and Safira Holding, products, education`),
    '# Resume: Gabriel Sandim',
    '',
    stamp(commit),
    '',
    '- Role: Full Stack Engineer, AI Engineering',
    '- Location: São Paulo, Brazil · Remote (GMT-3)',
    `- Contact: ${c.LINKS.email} · ${c.SITE_URL} · ${c.LINKS.linkedin} · ${c.LINKS.github}`,
    '',
    '## Summary',
    '',
    'Full Stack Engineer with 6+ years building web and mobile products in TypeScript for enterprise platforms used in 5 countries. Most of my work now is LLM engineering: I run the internal API that calls our models and cut cost per analysis by more than half with the same model. I also build agents and Claude Code tooling that speed up discovery, development and code review. On the side I ship and run my own apps, live on the App Store and Google Play. Professional English, working with US and European teams.',
    '',
    '## Skills',
    '',
    ...skills,
    '',
    '## Experience',
    '',
    '### Air Liquide · Full Stack Engineer since Aug 2026, Frontend Engineer before (Oct 2021 - Present)',
    '',
    '#### AI and LLM engineering (2026)',
    '',
    ...llmWork,
    ...aiWork,
    '',
    '#### Platform and architecture',
    '',
    ...platformWork,
    '',
    'Stack: TypeScript, Node.js, React, React Native, Vertex AI, Amazon Bedrock, Claude Code, MCP, Jest, Azure DevOps',
    '',
    '### GBS Tecnologia da Informação · Side products, built and run solo (2021 - Present)',
    '',
    '- My own company for side products, run end to end: product design, frontend, backend, infrastructure, billing and support.',
    '- **Obra Nova** (obranova.com.br): SaaS for small and mid-sized construction companies with paid plans, on the web, App Store and Google Play. Projects, finances and P&L per project, plus an AI assistant on WhatsApp with 40 tools that files daily site reports by voice; replies in 3.3 s (p50) and 6.4 s (p95) at under one US cent each, traced in Langfuse. Next.js, PostgreSQL, Vercel, Sentry, Flutter.',
    '- **Kapi** (kapiapp.com.br): gamified workout app live on the App Store and Google Play. Guided workouts, XP, streaks and weekly rankings, watch import through Health Connect and in-app subscriptions. Flutter, Next.js, PostgreSQL; first commit to store listing in under a week.',
    '- **Lifedeck** (lifedeck.com.br): task and event manager with WhatsApp reminders and task creation by message.',
    '- **task-funnel** (open source): Claude Code plugin that turns one task into a reviewed draft pull request, with isolated worktrees, the repo\'s real CI gates and adversarial AI reviewers.',
    '- **Cashdeck** (open source): self-hosted household finance with Open Finance sync, bill capture and an AI chat with tools. TypeScript, Next.js, PostgreSQL, Flutter.',
    '',
    '### Safira Holding · Full Stack Engineer (Jan 2020 - Oct 2021)',
    '',
    ...safiraWork,
    '',
    'Stack: Node.js, TypeScript, Angular, Ionic, Firebase',
    '',
    '## Education, Certification, Languages and Volunteering',
    '',
    '- **Education**: Systems Analysis and Development, Fatec Mogi das Cruzes (2018 - 2021)',
    '- **Certification**: Scrum Fundamentals Certified (SCRUMstudy)',
    '- **Languages**: Portuguese (native), English (professional working proficiency)',
    '- **Volunteering**: Computer Science Instructor, Associação Árvore da Vida (taught computing fundamentals to children and teens aged 6 to 17 and built interactive lesson plans for digital inclusion)',
    '',
  ].join('\n');
}

const content = loadContent();
const commit = execFileSync('git', ['-C', ROOT, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
const notes = new Map([
  ...LANGS.map((lang) => [`portfolio-${lang}.md`, portfolioNote(content, lang, commit)]),
  ...content.CASES.flatMap((entry) => LANGS.map((lang) => [`case-${entry.slug}-${lang}.md`, caseNote(content, entry, lang, commit)])),
  ['resume.md', resumeNote(content, commit)],
]);

mkdirSync(OUT, { recursive: true });
for (const stale of readdirSync(OUT).filter((f) => f.endsWith('.md') && !notes.has(f))) rmSync(join(OUT, stale));
for (const [name, text] of notes) writeFileSync(join(OUT, name), text);
console.log(`${notes.size} notes in ${OUT} from ${commit}`);

const pontoAbout = join(homedir(), '.local/share/ponto/personal/about.md');
if (existsSync(pontoAbout)) {
  const current = readFileSync(pontoAbout, 'utf8');
  const updated = current.replace(/^Skills: .*$/m, `Skills: ${content.SKILLS.map(noDash).join(', ')}.`);
  if (updated !== current) writeFileSync(pontoAbout, updated);
}

if (process.env.SKIP_REINDEX !== '1' && existsSync(join(BRAIN_TOOLS, 'src/cli.ts'))) {
  const reindex = spawnSync('pnpm', ['--dir', BRAIN_TOOLS, 'index', '--vault', 'personal'], { stdio: 'inherit' });
  if (reindex.status !== 0) {
    console.warn('brain-tools reindex exited with non-zero status; hourly sync will retry.');
  }
}
