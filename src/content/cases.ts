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
      summary: 'Site teams log progress, costs and daily reports on WhatsApp, by text or voice. I picked the model with evals, gate every release on them and measured what users actually wait for.',
      meta: ['Built and run solo · Jan 2025 to now', 'Next.js · Postgres · Gemini · Langfuse'],
      stats: [
        { v: '6.4 s', label: 'p95 reply, per turn' },
        { v: '55 → 99.7', label: 'diary extraction score' },
        { v: '3.3 s', label: 'median reply, per turn' },
        { v: '< 1¢', label: 'US per reply, traced' },
      ],
      sections: [
        { t: 'The problem', p: [
          'Site teams send voice notes, not forms. The assistant builds the daily report (crew, equipment, weather, hours, progress per stage) from several messages, and never writes anything the user has not confirmed.',
        ] },
        { t: 'What I built', l: [
          '40 tools over the same use cases the web app calls, up to 8 tool-calling rounds per message.',
          'Write tools show a preview and only save on the next message, after the user confirms.',
          'Evals against the real model: 31 dictated reports and 17 first messages for tool choice, each run three times because the model samples at temperature 1.',
          'Langfuse traces every model call with tokens and cost.',
        ] },
        { t: 'Choosing the model', table: {
          head: ['Configuration', 'Diary', 'Tool choice', 'US$ / 1k turns', 'p95'],
          rows: MODEL_ROWS,
          pick: 2,
          note: 'October 2026, same suites. Cost at list price.',
        }, after: [
          'The old model scored 55 to 66. gemini-2.5-flash picked an accepted first tool only 37.8% of the time, and 3.8-flash cost three times as much for a lower score. 3.1-flash-lite won, and two fixes found in its raw failures took extraction to 99.7.',
          'Release pull requests that touch the prompt, the tools or the LLM layer run the evals and fail if a score drops more than 5 points.',
        ] },
        { t: 'The lesson', p: [
          'My first p95 was 82 s. I had paired each message with the next reply, but people send bursts and the bot answers once. Per turn it is 6.4 s. Before quoting a number, check what it counts.',
        ] },
      ],
    },
    pt: {
      tag: 'IA · Assistente no WhatsApp',
      title: 'Um assistente com IA para o canteiro, escolhido por evals',
      summary: 'A equipe de obra registra avanço, custos e diário de obra no WhatsApp, por texto ou voz. Escolhi o modelo com evals, travo todo release nelas e medi o tempo que o usuário realmente espera.',
      meta: ['Feito e operado sozinho · jan 2025 até hoje', 'Next.js · Postgres · Gemini · Langfuse'],
      stats: [
        { v: '6,4 s', label: 'resposta no p95, por turno' },
        { v: '55 → 99,7', label: 'nota da extração do diário' },
        { v: '3,3 s', label: 'resposta mediana, por turno' },
        { v: '< R$ 0,05', label: 'por resposta, medido' },
      ],
      sections: [
        { t: 'O problema', p: [
          'Equipe de obra manda áudio, não preenche formulário. O assistente monta o diário (equipe, equipamentos, clima, horas, avanço por etapa) a partir de várias mensagens, e nunca grava nada que o usuário não confirmou.',
        ] },
        { t: 'O que construí', l: [
          '40 tools sobre os mesmos casos de uso que o app web chama, até 8 rodadas de tool por mensagem.',
          'As tools de escrita mostram uma prévia e só gravam na mensagem seguinte, depois que o usuário confirma.',
          'Evals contra o modelo real: 31 diários ditados e 17 primeiras mensagens para a escolha de tool, cada caso três vezes, porque o modelo amostra com temperatura 1.',
          'O Langfuse registra toda chamada de modelo com tokens e custo.',
        ] },
        { t: 'Escolhendo o modelo', table: {
          head: ['Configuração', 'Diário', 'Escolha de tool', 'US$ / mil turnos', 'p95'],
          rows: MODEL_ROWS,
          pick: 2,
          note: 'Outubro de 2026, mesmas suítes. Custo a preço de tabela.',
        }, after: [
          'O modelo antigo tirava de 55 a 66. O gemini-2.5-flash escolhia uma primeira tool aceita só em 37,8% das vezes, e o 3.8-flash custava três vezes mais com nota menor. Ganhou o 3.1-flash-lite, e duas correções achadas nas falhas cruas dele levaram a extração a 99,7.',
          'Pull request de release que mexe no prompt, nas tools ou na camada de LLM roda as evals e falha se uma nota cair mais de 5 pontos.',
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
      summary: 'A Claude Code plugin I maintain. Give it a task or an issue number and it returns a draft pull request that passed the repo’s own checks and a verified review, and it stops for approval before code that touches money, permissions or data.',
      meta: ['Open source, MIT · Aug 2026 to now', 'Claude Code · Bash · Python'],
      stats: [
        { v: '0.08 → 1.00', label: 'risky money fix, 8 of 8 runs' },
        { v: '3', label: 'lanes, by what a change can break' },
        { v: '37', label: 'tagged releases' },
        { v: '14', label: 'eval cases with graders' },
      ],
      sections: [
        { t: 'The problem', p: [
          'A coding agent writes the right change most of the time. The failures that matter are the rest: it skips the checks, or it edits money code before anyone confirmed the premise.',
        ] },
        { t: 'How it works', l: [
          'Three lanes, picked by what a change can break, not by its size. A risk.paths setting in the repo overrides the model’s judgement.',
          'Risk lane: a triage agent checks the premise, a human approves the spec, a separate agent writes tests that must fail first, then a five-lens review.',
          'Lint, type and test commands come from the repo’s config, and a hook refuses to end a turn that changed code without a passing gate.',
          'A reviewer reports only Critical and Important findings, and a verifier tries to refute each one. Only findings that reproduce get fixed.',
        ] },
        { t: 'Measured', p: [
          'Same tasks, Claude Code alone and with the plugin, 8 runs each. On a risky money fix the bare model edited the money code before any check in all 8 runs and scored 0.08. With the plugin it checked first and stopped for approval in all 8, scoring 1.00, at US$ 0.50 a run against 0.17.',
        ] },
        { t: 'The lesson', p: [
          'The cap on review rounds used to be a sentence in the prompt. Two pull requests ran 21 and 25 rounds under a written cap of 2, 14% of five weeks of spend. Now the count lives in code and a round past the cap exits with an error. A limit the model is only told to follow is not a limit.',
        ] },
      ],
    },
    pt: {
      tag: 'Open source · Dev tools com IA',
      title: 'Uma tarefa entra, um pull request revisado sai, com a parte arriscada travada',
      summary: 'Um plugin para o Claude Code que eu mantenho. Você passa uma tarefa ou o número de uma issue e recebe um pull request em rascunho que passou pelos checks do próprio repo e por uma revisão verificada, e ele para para aprovação antes de código que mexe com dinheiro, permissão ou dados.',
      meta: ['Open source, MIT · ago 2026 até hoje', 'Claude Code · Bash · Python'],
      stats: [
        { v: '0,08 → 1,00', label: 'correção arriscada de dinheiro, 8 de 8' },
        { v: '3', label: 'trilhas, pelo que a mudança pode quebrar' },
        { v: '37', label: 'releases com tag' },
        { v: '14', label: 'casos de eval com avaliador' },
      ],
      sections: [
        { t: 'O problema', p: [
          'Um agente de código acerta a mudança na maioria das vezes. As falhas que importam são as outras: ele pula os checks, ou mexe em código de dinheiro antes de alguém confirmar a premissa.',
        ] },
        { t: 'Como funciona', l: [
          'Três trilhas, escolhidas pelo que a mudança pode quebrar, não pelo tamanho. Uma configuração risk.paths no repo passa por cima do julgamento do modelo.',
          'Trilha de risco: um agente de triagem confere a premissa, uma pessoa aprova a spec, outro agente escreve testes que precisam falhar antes, depois vem uma revisão com cinco lentes.',
          'Os comandos de lint, tipos e testes vêm da configuração do repo, e um hook não deixa encerrar um turno que mudou código sem um gate aprovado.',
          'Um revisor reporta só achados Critical e Important, e um verificador tenta refutar cada um. Só o que se reproduz vira correção.',
        ] },
        { t: 'Medido', p: [
          'As mesmas tarefas, Claude Code sozinho e com o plugin, 8 rodadas cada. Numa correção arriscada de dinheiro, o modelo sozinho mexeu no código de dinheiro antes de qualquer check nas 8 rodadas e tirou 0,08. Com o plugin, conferiu antes e parou para aprovação nas 8, com 1,00, a US$ 0,50 por rodada contra 0,17.',
        ] },
        { t: 'A lição', p: [
          'O limite de rodadas de revisão era uma frase no prompt. Dois pull requests rodaram 21 e 25 rodadas com limite escrito de 2, 14% do gasto de cinco semanas. Agora a contagem mora no código e uma rodada além do limite sai com erro. Limite que o modelo só é instruído a seguir não é limite.',
        ] },
      ],
    },
  },
};

const CASH: CaseEntry = {
  slug: 'cashdeck',
  name: 'Cashdeck',
  icon: '/assets/cashdeck-icon.png',
  description: 'An open source, self-hosted finance app for Brazilian households that pays bills through a ladder of safety checks, with an AI chat that can only propose actions.',
  links: [{ href: LINKS.cash, label: { en: 'See it on GitHub', pt: 'Ver no GitHub' } }],
  copy: {
    en: {
      tag: 'Open source · Finance + AI',
      title: 'Household finance that pays the bills, and refuses when unsure',
      summary: 'A self-hosted finance app for Brazilian households, personal and small company. It syncs accounts over Open Finance, captures bills and pays them through a ladder of safety checks, with an AI chat that can propose actions but never take them alone.',
      meta: ['Open source, MIT · Oct 2026', 'TypeScript · Next.js · Postgres · Flutter'],
      stats: [
        { v: '16', label: 'AI tools over your data' },
        { v: '8', label: 'of them only propose, you confirm' },
        { v: '3', label: 'payment steps, each with caps' },
        { v: '6 · 25 s', label: 'max rounds · budget per chat turn' },
      ],
      sections: [
        { t: 'The problem', p: [
          'A household with a personal profile and a small company juggles bank feeds, bills, Pix and tax guides by hand. Automating that means software that moves money, so the real design question is what stops it from paying the wrong thing, or paying twice.',
        ] },
        { t: 'How it works', l: [
          'Accounts sync over Open Finance. Bills come from email, the bank’s DDA, files, pasted codes and the camera.',
          'Payment codes are found by regex and checksum before any model runs. The LLM only fills the fields the text did not give.',
          'Payments climb a ladder: automatic, then approval in the bank, then assisted, where the user pays a copied code. Before money moves there are caps per payment, per rail and per payee each day, a confirmation for a new payee or an unusual amount, and a kill switch.',
          'The chat’s write tools only return a pending action, and a confirmed payment still goes through the whole ladder. The server, not the model, fills the tenant and the entity.',
        ] },
        { t: 'The decision that matters', p: [
          'When unsure, refuse. The payout webhook approves a withdrawal only if it exactly matches an attempt the ladder submitted, and a call whose answer was lost is never sent again. A wrong refusal costs a payment by hand; a wrong approval could pay twice. The chat follows the same rule: confirming claims the action in one conditional write, so a double tap cannot pay twice.',
        ] },
      ],
    },
    pt: {
      tag: 'Open source · Finanças + IA',
      title: 'Finanças da casa que pagam as contas, e recusam na dúvida',
      summary: 'Um app de finanças self-hosted para famílias no Brasil, PF e PJ. Sincroniza contas pelo Open Finance, captura boletos e paga por uma escada de checagens, com um chat com IA que pode propor ações mas nunca executá-las sozinho.',
      meta: ['Open source, MIT · out 2026', 'TypeScript · Next.js · Postgres · Flutter'],
      stats: [
        { v: '16', label: 'tools de IA sobre seus dados' },
        { v: '8', label: 'delas só propõem, você confirma' },
        { v: '3', label: 'degraus de pagamento, com limites' },
        { v: '6 · 25 s', label: 'rodadas máx. · tempo por turno do chat' },
      ],
      sections: [
        { t: 'O problema', p: [
          'Uma família com PF e uma empresa pequena controla extrato, boletos, Pix e guias de imposto na mão. Automatizar isso é software que mexe com dinheiro, então a pergunta de design é o que impede de pagar a coisa errada, ou pagar duas vezes.',
        ] },
        { t: 'Como funciona', l: [
          'As contas sincronizam pelo Open Finance. Os boletos chegam por e-mail, DDA do banco, arquivo, código colado e câmera.',
          'O código de pagamento é achado por regex e dígito verificador antes de qualquer modelo rodar. O LLM só preenche o que o texto não deu.',
          'O pagamento sobe uma escada: automático, depois aprovação no banco, depois assistido, quando o usuário paga um código copiado. Antes de o dinheiro sair há limite por pagamento, por trilho e por favorecido no dia, confirmação para favorecido novo ou valor fora do normal, e uma chave que desliga tudo.',
          'As tools de escrita do chat só devolvem uma ação pendente, e um pagamento confirmado ainda passa pela escada inteira. Quem preenche o tenant e a entidade é o servidor, não o modelo.',
        ] },
        { t: 'A decisão que importa', p: [
          'Na dúvida, recusar. O webhook de saque só aprova uma retirada que bate exatamente com uma tentativa que a escada enviou, e uma chamada cuja resposta se perdeu nunca é reenviada. Uma recusa errada custa um pagamento na mão; uma aprovação errada pode pagar duas vezes. O chat segue a mesma regra: confirmar reserva a ação numa única escrita condicional, então um toque duplo não paga duas vezes.',
        ] },
      ],
    },
  },
};

const KAPI: CaseEntry = {
  slug: 'kapi',
  name: 'Kapi',
  icon: '/assets/kapi-mascot.png',
  description: 'A gamified workout app whose XP, streaks and rankings are designed so that cheating or grinding never pays, shipped from first commit to v0.17 in 16 days.',
  links: [
    { href: LINKS.kapiPlay, label: { en: 'Google Play', pt: 'Google Play' } },
    { href: LINKS.kapi, label: { en: 'kapiapp.com.br', pt: 'kapiapp.com.br' } },
  ],
  copy: {
    en: {
      tag: 'Mobile · Gamified fitness',
      title: 'A workout app that plays like a game, and is hard to cheat',
      summary: 'Kapi turns guided workouts and watch activity into XP, streaks and weekly rankings. People game anything that keeps score, so the scoring is built so that cheating or grinding never pays.',
      meta: ['Built solo · Oct 2026 to now', 'Flutter · Next.js · Postgres · Shorebird'],
      stats: [
        { v: '16 days', label: 'first commit to v0.17' },
        { v: '120 min', label: 'daily XP ceiling' },
        { v: '95% · 100%', label: 'coverage gates, API · app core' },
        { v: '1 merge', label: 'ships API, database, Play and TestFlight' },
      ],
      sections: [
        { t: 'The problem', p: [
          'Points, streaks and rankings help people keep a workout habit, but only if they are fair. If a long walk typed in by hand beats a real workout, the ranking stops meaning anything.',
        ] },
        { t: 'How the scoring works', l: [
          'XP is 4 × minutes × intensity × trust, plus a session bonus. The first 30 minutes of a day count fully, then 75%, then 50%, and nothing after 120.',
          'An activity earns the change in the day’s rounded total, so splitting one session into several posts never pays more.',
          'Trust weights the source: verified 1.0, confirmed 0.9, self-reported 0.7. Manual logs are capped in effort, overlapping imports are refused and the server rejects paces no person can move at.',
          'Watch workouts come from HealthKit and Health Connect, and their heart rate zones set the intensity. Planned rest days keep the streak alive, so it never rewards overtraining.',
        ] },
        { t: 'Shipping', p: [
          'A layered monorepo with its boundaries enforced by dependency-cruiser, and coverage gates of 95% on the TypeScript side and 100% on the app’s domain and application layers. Merging the release pull request tags the version, runs the migrations, deploys the API and sends Android to the Play production track and iOS to TestFlight.',
        ] },
      ],
    },
    pt: {
      tag: 'Mobile · Treino gamificado',
      title: 'Um app de treino que funciona como jogo, e é difícil de trapacear',
      summary: 'O Kapi transforma treinos guiados e atividades do relógio em XP, sequência e ranking semanal. Tudo que dá ponto é burlado, então a pontuação foi feita para que trapacear ou forçar volume nunca compense.',
      meta: ['Feito sozinho · out 2026 até hoje', 'Flutter · Next.js · Postgres · Shorebird'],
      stats: [
        { v: '16 dias', label: 'do primeiro commit à v0.17' },
        { v: '120 min', label: 'teto diário de XP' },
        { v: '95% · 100%', label: 'cobertura mínima, API · núcleo do app' },
        { v: '1 merge', label: 'publica API, banco, Play e TestFlight' },
      ],
      sections: [
        { t: 'O problema', p: [
          'Pontos, sequência e ranking ajudam a manter o hábito de treinar, mas só se forem justos. Se uma caminhada longa digitada à mão vale mais que um treino de verdade, o ranking perde o sentido.',
        ] },
        { t: 'Como a pontuação funciona', l: [
          'XP é 4 × minutos × intensidade × confiança, mais um bônus por sessão. Os primeiros 30 minutos do dia valem inteiros, depois 75%, depois 50%, e nada depois de 120.',
          'Uma atividade ganha a variação do total arredondado do dia, então dividir uma sessão em vários registros nunca rende mais.',
          'A confiança pesa a origem: verificado 1,0, confirmado 0,9, declarado 0,7. Registro manual tem esforço limitado, importação sobreposta é recusada e o servidor rejeita ritmos que ninguém consegue fazer.',
          'Os treinos do relógio vêm do HealthKit e do Health Connect, e as zonas de frequência cardíaca definem a intensidade. Dia de descanso planejado mantém a sequência, então ela nunca premia excesso de treino.',
        ] },
        { t: 'Entrega', p: [
          'Monorepo em camadas com as fronteiras garantidas pelo dependency-cruiser, e cobertura mínima de 95% no TypeScript e 100% nas camadas de domínio e aplicação do app. O merge do pull request de release cria a tag, roda as migrations, publica a API e manda o Android para produção no Play e o iOS para o TestFlight.',
        ] },
      ],
    },
  },
};

export const CASES: CaseEntry[] = [OBRA, FUNNEL, CASH, KAPI];

export function findCase(slug: string) {
  return CASES.find((entry) => entry.slug === slug);
}

export const CASES_UI: Record<Lang, { kicker: string; all: string; read: string; indexKicker: string; indexTitle: string; indexIntro: string }> = {
  en: {
    kicker: 'Case study',
    all: 'All case studies',
    read: 'Read the case',
    indexKicker: 'Case studies',
    indexTitle: 'What I built, and the numbers behind it',
    indexIntro: 'Short write-ups of products I build and run: the problem, what I built and how I know it works.',
  },
  pt: {
    kicker: 'Estudo de caso',
    all: 'Todos os estudos de caso',
    read: 'Ler o caso',
    indexKicker: 'Estudos de caso',
    indexTitle: 'O que construí, e os números por trás',
    indexIntro: 'Relatos curtos de produtos que construo e opero: o problema, o que construí e como sei que funciona.',
  },
};
