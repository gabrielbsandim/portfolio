import type { Lang } from './portfolio';

type Table = { head: string[]; rows: string[][]; note: string };
type Section = { t: string; p?: string[]; table?: Table; l?: string[]; after?: string[] };
type Stat = { v: string; label: string };
type CaseCopy = {
  kicker: string; title: string; intro: string; pills: string[]; stats: Stat[];
  sections: Section[]; visit: string; home: string;
};

const MODEL_ROWS = [
  ['gemini-3.5-flash-lite', '55-66', '100', '-', '-'],
  ['gemini-3.1-flash-lite · low', '86.8', '100', '4.14', '2.6 s'],
  ['gemini-3.1-flash-lite · minimal', '96.5', '100', '3.57', '1.7 s'],
  ['gemini-3.8-flash · low', '86.2', '100', '11.92', '8.9 s'],
  ['gemini-2.5-flash', '91.1', '37.8', '4.60', '1.5 s'],
];

export const CASE_OBRANOVA: Record<Lang, CaseCopy> = {
  en: {
    kicker: 'Case study · Obra Nova',
    title: 'An AI assistant for construction sites, chosen by evals',
    intro: 'Obra Nova is a construction management app I build and run on my own. Its WhatsApp assistant lets site teams log progress, costs and daily reports by text or voice. This is how I picked the model behind it, kept it from regressing, and measured what a user actually waits for.',
    pills: ['Built and run solo · Jan 2025 to now', 'Production numbers from Nov 10, 2026'],
    stats: [
      { v: '3.3 s', label: 'median reply, per turn' },
      { v: '6.4 s', label: 'p95 reply, per turn' },
      { v: '< 1¢', label: 'US per reply, traced' },
      { v: '55 → 99.7', label: 'diary extraction score' },
    ],
    sections: [
      { t: 'The problem', p: [
        'Site teams do not fill in forms at the end of the day. They send voice notes. A daily site report has the crew by role, the equipment, the weather, the hours worked, the progress of each stage and photos, and the assistant has to build it from what people say, across several messages, without writing anything the user has not confirmed.',
      ] },
      { t: 'How the assistant works', l: [
        '40 tools over the same use cases the web app calls: it reads works, stages, finances and documents, and writes diary entries, costs, progress and measurements.',
        'Up to 8 tool-calling rounds per message.',
        'Write tools show a preview first and only write on the next message, once the user confirms.',
        'The daily report draft tools only reach the model while a draft is open, which keeps their schemas out of most turns.',
        'Versioned prompts: every eval report and baseline names the prompt version it was measured on.',
      ] },
      { t: 'Evals, because unit tests cannot see the model', p: [
        'Every unit test of the assistant runs on a mocked model with a scripted answer. That proves the code handles what the model returns, not that the model returns the right thing. So there are eval suites against the real model: 31 dictated reports for diary extraction and 17 first messages for tool choice, plus voice transcription, invoices, bank slips, receipts and the sales bot.',
        'Gemini 3 samples at temperature 1, so each diary and tool-choice case runs three times. On the same code, one diary run scored 68 and the next 88.',
      ] },
      { t: 'Choosing the model', p: [
        'In October 2026 I ran the candidates through the same suites, with cost and latency read from the reports:',
      ], table: {
        head: ['Configuration', 'Diary', 'Tool choice', 'US$ / 1k turns', 'p95'],
        rows: MODEL_ROWS,
        note: 'Diary averaged over four runs (two, as a range, for the model being replaced). Cost at list price.',
      }, after: [
        'The model it replaced scored 55 to 66 on diary extraction. gemini-2.5-flash was fast and cheap, but it picked an accepted first tool 37.8% of the time and returned an empty first reply in 71% of runs. gemini-3.8-flash cost about three times as much for a lower score. gemini-3.1-flash-lite won.',
        'Its raw failures then showed two fixable causes: with every field optional it sometimes answered with the work alone, and it copied the full stop after the empty marker. Fixing both took diary extraction to 99.7. The chat rounds run at thinking minimal, US$ 3.57 against 4.14 per thousand turns; extraction keeps low, because minimal lost the weather and the hours worked.',
      ] },
      { t: 'A gate on every release', p: [
        'Each suite has a committed baseline, measured on a named model and prompt version. The release pull request runs the evals whenever it touches the prompt, the tools, the LLM layer or a use case a suite scores, and fails if a score drops by more than 5 points. One sampled run of tool choice is worth about 2 points, so a single flaky answer does not trip it. A pull request that changes the model records its own baseline.',
      ] },
      { t: 'Tracing in production', p: [
        'Every model call in production is a Langfuse generation with the model, the tokens and the cost, and every bot reply stores its own cost. The numbers on this page come from production, not from estimates.',
      ] },
      { t: 'Measuring what the user waits for', p: [
        'My first latency number was wrong. I paired each incoming message with the next bot reply, which gave a p95 of 82 s. But people on WhatsApp send several messages in a row and the bot answers once, so every earlier message in a burst counted as waiting time.',
        'Measured per turn, from the last message the user sent before the reply to the reply itself, over the last 30 days: 3.3 s at the median, 6.4 s at p95 and 20 s at worst, at about R$ 0.04 per reply, under one US cent.',
        'The lesson I keep: before quoting a number, check what it counts.',
      ] },
      { t: 'Stack', l: [
        'Next.js and TypeScript on Vercel, PostgreSQL on Neon.',
        'Gemini through a provider layer with per-call pricing, Langfuse for tracing, Sentry for errors.',
        'WhatsApp Business Platform for the assistant, Flutter for the native app on iOS and Android.',
      ] },
    ],
    visit: 'Visit obranova.com.br',
    home: 'Back to gbstec.dev.br',
  },
  pt: {
    kicker: 'Estudo de caso · Obra Nova',
    title: 'Um assistente com IA para o canteiro, escolhido por evals',
    intro: 'O Obra Nova é um app de gestão de obras que eu construo e opero sozinho. O assistente no WhatsApp deixa a equipe de obra registrar avanço, custos e diário de obra por texto ou voz. Aqui está como escolhi o modelo por trás dele, como evito que ele regrida e como medi o tempo que o usuário realmente espera.',
    pills: ['Feito e operado sozinho · jan 2025 até hoje', 'Números de produção de 10/11/2026'],
    stats: [
      { v: '3,3 s', label: 'resposta mediana, por turno' },
      { v: '6,4 s', label: 'resposta no p95, por turno' },
      { v: '< R$ 0,05', label: 'por resposta, medido' },
      { v: '55 → 99,7', label: 'nota da extração do diário' },
    ],
    sections: [
      { t: 'O problema', p: [
        'Equipe de obra não preenche formulário no fim do dia. Manda áudio. Um diário de obra tem a equipe por função, os equipamentos, o clima, as horas trabalhadas, o avanço de cada etapa e as fotos, e o assistente precisa montar isso a partir do que as pessoas falam, em várias mensagens, sem gravar nada que o usuário não confirmou.',
      ] },
      { t: 'Como o assistente funciona', l: [
        '40 tools sobre os mesmos casos de uso que o app web chama: lê obras, etapas, financeiro e documentos, e grava diário, custos, avanço e medições.',
        'Até 8 rodadas de chamada de tool por mensagem.',
        'As tools de escrita mostram uma prévia antes e só gravam na mensagem seguinte, depois que o usuário confirma.',
        'As tools do rascunho do diário só chegam ao modelo enquanto há um rascunho aberto, o que tira os schemas delas da maioria dos turnos.',
        'Prompts versionados: todo relatório de eval e todo baseline dizem em que versão do prompt foram medidos.',
      ] },
      { t: 'Evals, porque teste unitário não enxerga o modelo', p: [
        'Todo teste unitário do assistente roda sobre um modelo simulado com resposta roteirizada. Isso prova que o código trata o que o modelo devolve, não que o modelo devolve a coisa certa. Por isso existem suítes de eval contra o modelo real: 31 diários ditados para a extração e 17 primeiras mensagens para a escolha de tool, além de transcrição de áudio, notas fiscais, boletos, recibos e o bot de vendas.',
        'O Gemini 3 amostra com temperatura 1, então cada caso de diário e de escolha de tool roda três vezes. No mesmo código, uma rodada do diário deu 68 e a seguinte, 88.',
      ] },
      { t: 'Escolhendo o modelo', p: [
        'Em outubro de 2026 passei os candidatos pelas mesmas suítes, com custo e latência lidos dos relatórios:',
      ], table: {
        head: ['Configuração', 'Diário', 'Escolha de tool', 'US$ / mil turnos', 'p95'],
        rows: MODEL_ROWS,
        note: 'Diário na média de quatro rodadas (duas, como faixa, para o modelo substituído). Custo a preço de tabela.',
      }, after: [
        'O modelo substituído tirava de 55 a 66 na extração do diário. O gemini-2.5-flash era rápido e barato, mas escolhia uma primeira tool aceita em 37,8% das vezes e devolvia a primeira resposta vazia em 71% das rodadas. O gemini-3.8-flash custava cerca de três vezes mais com nota menor. Ganhou o gemini-3.1-flash-lite.',
        'As falhas cruas dele mostraram duas causas corrigíveis: com todo campo opcional ele às vezes respondia só a obra, e copiava o ponto final depois do marcador de vazio. Corrigir as duas levou a extração do diário a 99,7. As rodadas do chat usam thinking minimal, US$ 3,57 contra 4,14 por mil turnos; a extração fica em low, porque o minimal perdia o clima e as horas trabalhadas.',
      ] },
      { t: 'Um portão em todo release', p: [
        'Cada suíte tem um baseline versionado, medido num modelo e numa versão de prompt nomeados. O pull request de release roda as evals sempre que mexe no prompt, nas tools, na camada de LLM ou num caso de uso que alguma suíte avalia, e falha se uma nota cair mais de 5 pontos. Uma rodada amostrada da escolha de tool vale cerca de 2 pontos, então uma resposta instável sozinha não derruba. Pull request que troca o modelo grava o próprio baseline.',
      ] },
      { t: 'Tracing em produção', p: [
        'Toda chamada de modelo em produção vira uma generation no Langfuse, com modelo, tokens e custo, e toda resposta do bot guarda o próprio custo. Os números desta página vêm da produção, não de estimativa.',
      ] },
      { t: 'Medindo o que o usuário espera', p: [
        'Meu primeiro número de latência estava errado. Pareei cada mensagem recebida com a próxima resposta do bot, o que deu p95 de 82 s. Só que no WhatsApp as pessoas mandam várias mensagens seguidas e o bot responde uma vez, então cada mensagem anterior da rajada contava como espera.',
        'Medido por turno, da última mensagem que o usuário mandou antes da resposta até a resposta, nos últimos 30 dias: 3,3 s na mediana, 6,4 s no p95 e 20 s no pior caso, a cerca de R$ 0,04 por resposta.',
        'A lição que fica: antes de citar um número, conferir o que ele conta.',
      ] },
      { t: 'Stack', l: [
        'Next.js e TypeScript na Vercel, PostgreSQL no Neon.',
        'Gemini por uma camada de provider com preço por chamada, Langfuse para tracing, Sentry para erros.',
        'WhatsApp Business Platform para o assistente, Flutter para o app nativo no iOS e no Android.',
      ] },
    ],
    visit: 'Visitar obranova.com.br',
    home: 'Voltar para gbstec.dev.br',
  },
};
