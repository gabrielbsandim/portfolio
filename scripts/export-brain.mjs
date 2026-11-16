// Renders the site's content as Markdown notes in the personal vault, so the notes index
// answers from the same text the site shows. Run by the post-commit hook and `pnpm brain`.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { homedir, tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = process.env.BRAIN_PORTFOLIO_DIR ?? join(homedir(), 'brain/personal/career/portfolio');
const LANGS = ['en', 'pt'];
const LANG_NAME = { en: 'English', pt: 'Portuguese' };

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

const titled = (key) => key.replace(/^sec_/, '').replace(/_/g, ' ');
const isPlain = (v) => typeof v === 'string' || typeof v === 'number';
const flat = (o) => Object.values(o).filter(isPlain).join(' · ');

function listLines(key, items) {
  if (!items.length) return [];
  if (items.every(isPlain)) return [`**${titled(key)}:** ${items.join('; ')}`, ''];
  return [`**${titled(key)}:**`, ...items.map((i) => `- ${flat(i)}`), ''];
}

/** Every string of a copy object that no dedicated section below already printed. */
function restLines(copy, skip) {
  return Object.entries(copy).flatMap(([key, value]) => {
    if (skip.has(key) || key.startsWith('nav_') || key.startsWith('cta_')) return [];
    if (isPlain(value)) return [`**${titled(key)}:** ${value}`, ''];
    return Array.isArray(value) ? listLines(key, value) : [];
  });
}

function jobLines(job) {
  return [
    `### ${job.company}, ${job.role} (${job.period})`,
    '',
    ...(job.prev ? [`Before: ${job.prev}`, ''] : []),
    `Stack: ${job.stack.join(', ')}`,
    '',
    ...job.items.map((i) => `- ${i.g ? `[${i.g}] ` : ''}**${i.h}** ${i.d}`),
    '',
  ];
}

function frontmatter(name, description) {
  return ['---', `name: ${name}`, `description: "${description.replace(/"/g, "'")}"`, 'metadata:', '  type: reference', '---', ''];
}

const stamp = (commit) => `Generated from the portfolio repo at ${commit} by scripts/export-brain.mjs. Do not edit here: change the site content and commit.`;

function portfolioNote(c, lang, commit) {
  const copy = c.COPY[lang];
  return [
    ...frontmatter(`portfolio-${lang}`, `Gabriel's public portfolio (${c.SITE_URL}) in ${LANG_NAME[lang]}: positioning, career by employer, products, AI work, numbers`),
    `# Portfolio, ${LANG_NAME[lang]}`,
    '',
    stamp(commit),
    '',
    `Site: ${c.SITE_URL} · Title: ${c.PERSON_JSON_LD.jobTitle} · Company: ${c.PERSON_JSON_LD.worksFor.name}`,
    '',
    `Skills: ${c.SKILLS.join(', ')}`,
    '',
    '## Career',
    '',
    ...copy.jobs.flatMap(jobLines),
    '## Positioning, products and AI work',
    '',
    ...restLines(copy, new Set(['jobs'])),
    '## Links',
    '',
    ...Object.entries(c.LINKS).map(([k, v]) => `- ${k}: ${v}`),
    '',
  ].join('\n');
}

function tableLines(t) {
  return [`| ${t.head.join(' | ')} |`, `| ${t.head.map(() => '---').join(' | ')} |`, ...t.rows.map((r) => `| ${r.join(' | ')} |`), '', `Chosen: ${t.rows[t.pick]?.[0] ?? ''}. ${t.note}`, ''];
}

function sectionLines(s) {
  return [`## ${s.t}`, '', ...(s.p ?? []).flatMap((p) => [p, '']), ...(s.table ? tableLines(s.table) : []), ...(s.l ?? []).map((l) => `- ${l}`), ...(s.l ? [''] : []), ...(s.after ?? []).flatMap((p) => [p, ''])];
}

function caseNote(c, entry, lang, commit) {
  const copy = entry.copy[lang];
  return [
    ...frontmatter(`portfolio-case-${entry.slug}-${lang}`, `Portfolio case study, ${entry.name}, in ${LANG_NAME[lang]}: ${copy.title}`),
    `# ${entry.name}: ${copy.title}`,
    '',
    stamp(commit),
    '',
    `${c.SITE_URL}/cases/${entry.slug} · ${copy.tag} · ${copy.meta.join(' · ')}`,
    '',
    copy.summary,
    '',
    ...copy.stats.map((s) => `- ${s.v}: ${s.label}`),
    '',
    ...copy.sections.flatMap(sectionLines),
    ...entry.links.map((l) => `- ${l.label[lang]}: ${l.href}`),
    '',
  ].join('\n');
}

/** The text a reader sees on /resume: JSX text nodes, in order, one block per element that holds text. */
function resumeText() {
  const file = join(ROOT, 'src/components/resume.tsx');
  const src = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.ES2022, true, ts.ScriptKind.TSX);
  const blocks = [];
  const visit = (node) => {
    const own = ts.isJsxElement(node) ? node.children.filter(ts.isJsxText).map((t) => t.text.replace(/\s+/g, ' ').trim()).filter((t) => /\p{L}{2}/u.test(t) && !/^(←|Download)/.test(t)) : [];
    if (own.length) blocks.push(`${/^h[1-3]$/.test(node.openingElement.tagName.getText()) ? '## ' : ''}${own.join(' ')}`);
    ts.forEachChild(node, visit);
  };
  visit(src);
  return blocks;
}

function resumeNote(c, commit) {
  return [...frontmatter('portfolio-resume', `Gabriel's resume as published at ${c.SITE_URL}/resume: summary, experience, products, education`), '# Resume', '', stamp(commit), '', ...resumeText().flatMap((b) => [b, ''])].join('\n');
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
