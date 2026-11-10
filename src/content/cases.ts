import { LINKS, type Lang } from './portfolio';

type Table = { head: string[]; rows: string[][]; pick: number; note: string };
type Section = { t: string; p?: string[]; table?: Table; l?: string[]; after?: string[] };
type Stat = { v: string; label: string };
type CaseLink = { href: string; label: Record<Lang, string> };

export type CaseCopy = {
  tag: string; title: string; summary: string; meta: string[]; stats: Stat[]; sections: Section[];
};

export type CaseEntry = {
  slug: string; name: string; icon: string; plate?: boolean; description: string; links: CaseLink[]; copy: Record<Lang, CaseCopy>;
};

const MODEL_ROWS = [
  ['gemini-3.5-flash-lite', '55-66', '100', '-', '-'],
  ['gemini-3.1-flash-lite · low', '86.8', '100', '4.14', '2.6 s'],
  ['gemini-3.1-flash-lite · minimal', '96.5', '100', '3.57', '1.7 s'],
  ['gemini-3.8-flash · low', '86.2', '100', '11.92', '8.9 s'],
  ['gemini-2.5-flash', '91.1', '37.8', '4.60', '1.5 s'],
];

const OBRA: CaseEntry = {
  slug: 'obra-nova',
  name: 'Obra Nova',
  icon: '/assets/obranova-logo.png',
  plate: true,
  description: 'How the model behind the Obra Nova WhatsApp assistant was chosen by evals, gated on every release, traced in production and measured per turn.',
  links: [{ href: LINKS.obra, label: { en: 'obranova.com.br', pt: 'obranova.com.br' } }],
  copy: {
    en: {
      tag: 'AI · WhatsApp assistant',
      title: 'An AI assistant for construction sites, chosen by evals',
      summary: 'A WhatsApp assistant that writes the construction daily report from text and voice notes. I picked its model with evals, gate every release on them and measured what users actually wait for.',
      meta: ['Built and run solo · Jan 2025 to now', 'Next.js · Postgres · Gemini · Langfuse'],
      stats: [
        { v: '6.4 s', label: 'p95 reply, per turn' },
        { v: '55 → 99.7', label: 'diary extraction score' },
        { v: '3.3 s', label: 'median reply, per turn' },
        { v: '< 1¢', label: 'US per reply, traced' },
      ],
      sections: [
        { t: 'Choosing the model', table: {
          head: ['Configuration', 'Diary', 'Tool choice', 'US$ / 1k turns', 'p95'],
          rows: MODEL_ROWS,
          pick: 2,
          note: 'October 2026, same suites. Cost at list price.',
        }, after: [
          '31 dictated reports and 17 first messages, each run three times. 3.1-flash-lite won on score, cost and latency, and two fixes found in its raw failures took extraction to 99.7. Any release that touches the prompt or the tools fails if a score drops more than 5 points.',
        ] },
        { t: 'The lesson', p: [
          'My first p95 was 82 s. I had paired each message with the next reply, but people send bursts and the bot answers once. Per turn it is 6.4 s. Before quoting a number, check what it counts.',
        ] },
      ],
    },
    pt: {
      tag: 'IA · Assistente no WhatsApp',
      title: 'Um assistente com IA para o canteiro, escolhido por evals',
      summary: 'Um assistente no WhatsApp que monta o diário de obra a partir de texto e áudio. Escolhi o modelo com evals, travo todo release nelas e medi o tempo que o usuário realmente espera.',
      meta: ['Feito e operado sozinho · jan 2025 até hoje', 'Next.js · Postgres · Gemini · Langfuse'],
      stats: [
        { v: '6,4 s', label: 'resposta no p95, por turno' },
        { v: '55 → 99,7', label: 'nota da extração do diário' },
        { v: '3,3 s', label: 'resposta mediana, por turno' },
        { v: '< R$ 0,05', label: 'por resposta, medido' },
      ],
      sections: [
        { t: 'Escolhendo o modelo', table: {
          head: ['Configuração', 'Diário', 'Escolha de tool', 'US$ / mil turnos', 'p95'],
          rows: MODEL_ROWS,
          pick: 2,
          note: 'Outubro de 2026, mesmas suítes. Custo a preço de tabela.',
        }, after: [
          '31 diários ditados e 17 primeiras mensagens, cada caso três vezes. O 3.1-flash-lite ganhou em nota, custo e latência, e duas correções achadas nas falhas cruas dele levaram a extração a 99,7. Release que mexe no prompt ou nas tools falha se uma nota cair mais de 5 pontos.',
        ] },
        { t: 'A lição', p: [
          'Meu primeiro p95 foi de 82 s. Eu tinha pareado cada mensagem com a próxima resposta, mas as pessoas mandam rajadas e o bot responde uma vez. Por turno, são 6,4 s. Antes de citar um número, confira o que ele conta.',
        ] },
      ],
    },
  },
};

const FUNNEL: CaseEntry = {
  slug: 'task-funnel',
  name: 'task-funnel',
  icon: '/assets/task-funnel-icon.svg',
  description: 'An open source Claude Code plugin that turns one task into a reviewed draft pull request and stops for approval before risky code. Measured: 0.08 to 1.00 on a risky money fix.',
  links: [{ href: LINKS.kit, label: { en: 'See it on GitHub', pt: 'Ver no GitHub' } }],
  copy: {
    en: {
      tag: 'Open source · AI dev tools',
      title: 'One task in, a reviewed pull request out, with the risky part gated',
      summary: 'A Claude Code plugin I maintain: a task goes in, a reviewed draft pull request comes out, and it stops for approval before code that touches money, permissions or data. Measured against the bare model on the same tasks.',
      meta: ['Open source, MIT · Aug 2026 to now', 'Claude Code · Bash · Python'],
      stats: [
        { v: '0.08 → 1.00', label: 'score on a risky money fix, bare vs plugin' },
        { v: '0 → 8 of 8', label: 'runs that stopped before touching money code' },
        { v: 'US$ 0.50', label: 'per run with the plugin, 0.17 bare' },
        { v: '14%', label: 'of five weeks of spend lost to a prompt-only cap' },
      ],
      sections: [
        { t: 'Measured', p: [
          'Same tasks, Claude Code alone and with the plugin, 8 runs each, scored by graders. On a risky money fix the bare model edited the money code before any check in all 8 runs. With the plugin a triage agent checked the premise first and it stopped for approval in all 8. Three times the cost, on the change where a mistake costs the most.',
        ] },
        { t: 'The lesson', p: [
          'The cap on review rounds used to be a sentence in the prompt. Two pull requests ran 21 and 25 rounds under a written cap of 2, 14% of five weeks of spend. Now the count lives in code and a round past the cap exits with an error. A limit the model is only told to follow is not a limit.',
        ] },
      ],
    },
    pt: {
      tag: 'Open source · Dev tools com IA',
      title: 'Uma tarefa entra, um pull request revisado sai, com a parte arriscada travada',
      summary: 'Um plugin para o Claude Code que eu mantenho: entra uma tarefa, sai um pull request em rascunho revisado, e ele para para aprovação antes de código que mexe com dinheiro, permissão ou dados. Medido contra o modelo sozinho nas mesmas tarefas.',
      meta: ['Open source, MIT · ago 2026 até hoje', 'Claude Code · Bash · Python'],
      stats: [
        { v: '0,08 → 1,00', label: 'nota numa correção arriscada de dinheiro, sozinho vs plugin' },
        { v: '0 → 8 de 8', label: 'rodadas que pararam antes de mexer no dinheiro' },
        { v: 'US$ 0,50', label: 'por rodada com o plugin, 0,17 sozinho' },
        { v: '14%', label: 'de cinco semanas de gasto num limite só no prompt' },
      ],
      sections: [
        { t: 'Medido', p: [
          'As mesmas tarefas, Claude Code sozinho e com o plugin, 8 rodadas cada, com avaliadores. Numa correção arriscada de dinheiro, o modelo sozinho mexeu no código de dinheiro antes de qualquer check nas 8 rodadas. Com o plugin, um agente de triagem conferiu a premissa antes e ele parou para aprovação nas 8. Três vezes o custo, na mudança em que o erro custa mais.',
        ] },
        { t: 'A lição', p: [
          'O limite de rodadas de revisão era uma frase no prompt. Dois pull requests rodaram 21 e 25 rodadas com limite escrito de 2, 14% do gasto de cinco semanas. Agora a contagem mora no código e uma rodada além do limite sai com erro. Limite que o modelo só é instruído a seguir não é limite.',
        ] },
      ],
    },
  },
};

export const CASES: CaseEntry[] = [OBRA, FUNNEL];

export function findCase(slug: string) {
  return CASES.find((entry) => entry.slug === slug);
}

export const CASES_UI: Record<Lang, { home: string; kicker: string; all: string; read: string; indexKicker: string; indexTitle: string; indexIntro: string }> = {
  en: {
    home: 'Home',
    kicker: 'Case study',
    all: 'All case studies',
    read: 'Read the case',
    indexKicker: 'Case studies',
    indexTitle: 'Numbers I measured, and what they taught me',
    indexIntro: 'Two short write-ups. Only what was measured: the number, how it was taken and the lesson.',
  },
  pt: {
    home: 'Início',
    kicker: 'Estudo de caso',
    all: 'Todos os estudos de caso',
    read: 'Ler o caso',
    indexKicker: 'Estudos de caso',
    indexTitle: 'Números que medi, e o que eles me ensinaram',
    indexIntro: 'Dois relatos curtos. Só o que foi medido: o número, como foi tirado e a lição.',
  },
};
