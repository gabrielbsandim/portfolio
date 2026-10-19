export type Lang = 'en' | 'pt';

export const LINKS = {
  obra: 'https://www.obranova.com.br',
  obraPrivacy: 'https://www.obranova.com.br/politica-de-privacidade',
  life: 'https://www.lifedeck.com.br',
  cash: 'https://github.com/gabrielbsandim/cashdeck',
  kit: 'https://github.com/gabrielbsandim/task-funnel',
  linkedin: 'https://www.linkedin.com/in/gabriel-bastos-sandim/',
  github: 'https://github.com/gabrielbsandim',
  cv: '/resume',
  cvPdf: '/assets/Gabriel-Sandim-Resume.pdf',
  brand: '/brand',
  email: 'gabriel@gbstec.dev.br',
  privacy: '/privacy',
} as const;

export const SKILLS = [
  'React', 'React Native', 'TypeScript', 'Next.js', 'Claude Code', 'AI Agents', 'MCP', 'Micro Frontends',
  'Design Systems', 'Node.js', 'Flutter', 'PostgreSQL', 'Jest', 'CI/CD', 'Sentry', 'Azure DevOps',
];

type Stat = { pre: string; n: number; suf: string; label: string };
type AiItem = { k: string; title: string; desc: string; tags: string };
type Principle = { h: string; d: string };
type Fact = { label: string; title: string; meta: string };
type CompanyFact = { k: string; v: string };
type Product = { icon: string; name: string; tag: string; badge: string; url: string; cta: string; desc: string; stack: string };
type JobItem = { g?: string; h: string; d: string };
type Job = { period: string; company: string; role: string; stack: string[]; items: JobItem[] };

export type Copy = {
  nav_ai: string; nav_studio: string; nav_exp: string; nav_about: string; nav_contact: string;
  kicker: string; role_prefix: string; words: string[]; hero_sub: string; glance: string[];
  cta_work: string; cta_cv: string; stats: Stat[];
  sec_ai: string; ai_title: string; ai_desc: string; ai_items: AiItem[];
  ai_principles_label: string; ai_principles: Principle[]; ai_proof: string; ai_proof_cta: string;
  sec_studio: string; studio_title: string; studio_desc: string; company_facts: CompanyFact[];
  obra_tag: string; obra_desc: string; obra_points: string[]; obra_status: string; obra_app: string;
  visit: string; privacy: string; products: Product[];
  sec_exp: string; exp_title: string; jobs: Job[];
  sec_about: string; about_title: string; about_p1: string; about_p2: string; facts: Fact[];
  sec_contact: string; contact_title: string; contact_sub: string; copy: string; copied: string;
  cv_short: string; back_top: string;
};

export const COPY: Record<Lang, Copy> = {
  en: {
    nav_ai: 'AI', nav_studio: 'GBS', nav_exp: 'Career', nav_about: 'About', nav_contact: 'Contact',
    kicker: 'Product Engineer · Frontend & AI · São Paulo, GMT-3',
    role_prefix: 'Frontend engineer building',
    words: ['AI-powered workflows.', 'scalable interfaces.', 'micro frontends.', 'my own products.'],
    hero_sub: '6+ years shipping React and React Native products used by thousands of people in 5 countries and, lately, the AI agents and workflows that let teams ship them faster. Founder of GBS Tecnologia, the company behind Obra Nova and Lifedeck.',
    glance: ['Remote · GMT-3', 'English · professional', 'React · TypeScript · AI agents'],
    cta_work: 'See recent work', cta_cv: 'Résumé',
    stats: [
      { pre: '~', n: 6, suf: ' mo', label: 'of project discovery compressed into days with AI' },
      { pre: '<', n: 2, suf: ' wks', label: 'from AI-built prototype to project approval' },
      { pre: '', n: 20, suf: '+', label: 'products deploying independently via micro frontends' },
      { pre: '', n: 100, suf: '→0', label: 'monthly frontend tickets on a critical system' },
    ],
    sec_ai: 'AI at work', ai_title: 'I don’t just use AI tools. I build the systems my team ships with.',
    ai_desc: 'In 2026 I started four AI initiatives at Air Liquide that changed how our team discovers, builds, reviews and fixes software. Each one keeps an engineer in the loop and is judged by real gates: tests, reviews and production signals.',
    ai_items: [
      { k: '01', title: 'AI-accelerated discovery', desc: 'Used AI to analyze requirements, define scope, build a working prototype and write the documentation for a large initiative in days, instead of the ~6 months it usually takes. Approved in under 2 weeks.', tags: 'Claude · Prototyping · Docs' },
      { k: '02', title: 'Sentry → pull request agent', desc: 'An agent that triages issues reported in Sentry, reads the affected code and opens a pull request with a proposed fix, so engineers start from a diff instead of a stack trace.', tags: 'Agents · Sentry · Code review' },
      { k: '03', title: 'Prototype-to-feedback pipeline', desc: 'A procedure that takes a prototype made in Lovable or Claude, adds the review layer and deploys it, so business stakeholders comment on specific screens and approve before a line of production code.', tags: 'Lovable · Claude · Product' },
      { k: '04', title: 'Team plugin for Claude Code', desc: 'Our internal plugin: team rules and code standards, skills that validate tasks in a real browser, Azure DevOps access where MCP support is weak, workflow funnels and automated PR reviewers.', tags: 'Claude Code · MCP · Azure DevOps' },
    ],
    ai_principles_label: 'How I work with AI',
    ai_principles: [
      { h: 'Agents propose, engineers decide.', d: 'Every AI change goes through review and the same CI gates as human code.' },
      { h: 'Measure, don’t vibe.', d: 'I judge AI output by tests, lint and production signals, not by how convincing it sounds.' },
      { h: 'Learn by shipping.', d: 'New models and tools land every month. I try them on real work, keep what pays off and drop what doesn’t.' },
    ],
    ai_proof: 'Public proof: task-funnel, my open-source Claude Code plugin that turns one task into a reviewed pull request.',
    ai_proof_cta: 'See it on GitHub',
    sec_studio: 'GBS Tecnologia', studio_title: 'A software company where I build, ship and run my own products.',
    studio_desc: 'GBS Tecnologia da Informação is the independent company I founded to take products from idea to production and keep them running: design, code, infrastructure, pricing and support. It owns Obra Nova and Lifedeck, and publishes open-source tools.',
    company_facts: [{ k: 'Legal name', v: 'GBS Tecnologia da Informação Ltda' }, { k: 'CNPJ', v: '44.000.992/0001-22' }, { k: 'Based in', v: 'São Paulo, Brazil' }],
    obra_tag: 'Flagship · SaaS for construction',
    obra_desc: 'Management platform for small and mid-sized construction companies. Projects, crews, documents and finances in one dashboard. It flags budget overruns early and puts an AI assistant on WhatsApp that files daily site reports by voice.',
    obra_points: ['AI assistant on WhatsApp, reports by voice', 'Planned vs. actual cost, per stage', 'P&L updated on every entry'],
    obra_status: 'Live, paying plans', obra_app: 'Native app coming to Google Play', visit: 'Visit site', privacy: 'Privacy policy',
    products: [
      { icon: '/assets/lifedeck-icon.png', name: 'Lifedeck', tag: 'Productivity · WhatsApp', badge: 'Live', url: LINKS.life, cta: 'lifedeck.com.br', desc: 'Your whole life, calmly in hand. Tasks and events with reminders on WhatsApp, and you can add new ones just by sending a message.', stack: 'WhatsApp integration' },
      { icon: '/assets/cashdeck-icon.png', name: 'Cashdeck', tag: 'Open source · Finance + AI', badge: 'MIT', url: LINKS.cash, cta: 'GitHub', desc: 'Self-hosted household finance for Brazil, personal and small company: Open Finance sync, bill capture, a safe payment ladder and an AI chat with tools over your data.', stack: 'TypeScript · Next.js · Postgres · Flutter' },
      { icon: '/assets/task-funnel-icon.svg', name: 'task-funnel', tag: 'Open source · AI dev tools', badge: 'MIT', url: LINKS.kit, cta: 'GitHub', desc: 'A Claude Code plugin: give it one task, get back a reviewed draft pull request: isolated worktree, your real lint and test gates, adversarial reviewers, board card moved.', stack: 'Claude Code · Agents · Python' },
    ],
    sec_exp: 'Career', exp_title: 'Six years turning complex platforms into simple, reliable products.',
    sec_about: 'About', about_title: 'I own problems end to end and use AI to get there faster.',
    about_p1: 'I started as a Full Stack intern and quickly took ownership of complex projects, which shaped how I work: understand the business, ship, measure, improve. Over time I specialized in frontend: React and React Native, Micro Frontends, Design Systems and shared libraries used by many teams.',
    about_p2: 'Today I spend as much time designing how we build as building itself: AI agents, internal tooling and workflows that make a whole team faster. Running my own products at GBS keeps me honest about what actually matters to users.',
    sec_contact: 'Contact', contact_title: 'Let’s build something.',
    contact_sub: 'Want to talk frontend or AI engineering, curious about Obra Nova, or have a product idea? I usually reply within a day.',
    copy: 'Copy email', copied: 'Copied ✓',
    cv_short: 'Résumé', back_top: 'Back to top',
    facts: [
      { label: 'Education', title: 'Systems Analysis & Development', meta: 'Fatec Mogi das Cruzes · 2018–2021' },
      { label: 'Certification', title: 'Scrum Fundamentals Certified', meta: 'SCRUMstudy' },
      { label: 'Languages', title: 'Portuguese & English', meta: 'Native · Professional working proficiency' },
      { label: 'Volunteering', title: 'Computer Science Instructor', meta: 'Associação Árvore da Vida: digital inclusion for kids and teens aged 6–17' },
    ],
    jobs: [
      { period: 'Oct 2021 - Present', company: 'Air Liquide', role: 'Frontend Engineer', stack: ['React', 'React Native', 'TypeScript', 'Claude Code', 'MCP', 'Jest', 'Azure DevOps'], items: [
        { g: '2026 · AI engineering', h: 'AI-accelerated discovery.', d: 'Analyzed, scoped, prototyped and documented a large initiative with AI in days instead of ~6 months; approved in under 2 weeks.' },
        { h: 'Sentry → pull request agent.', d: 'Started an AI system that triages Sentry issues, reads the code and opens PRs with proposed fixes for engineers to review.' },
        { h: 'Prototype-to-feedback pipeline.', d: 'Turned Lovable and Claude prototypes into deployable review builds where business stakeholders comment in context and approve.' },
        { h: 'Team plugin for Claude Code.', d: 'Encoded team standards and skills: browser validation of tasks, Azure DevOps access, workflow funnels and PR reviewers.' },
        { g: 'Platform & architecture', h: 'Micro Frontends architecture.', d: 'Implemented it end-to-end, enabling 20+ products to deploy independently with faster, safer releases.' },
        { h: 'Design System & shared libraries.', d: 'Built and evolved components, tooling, monitoring and i18n used by ~10 teams across 20+ products.' },
        { h: '~100 → 0 tickets.', d: 'Took ownership of a critical gas cylinder tracking system and eliminated frontend issues entirely.' },
        { h: 'Global, cross-functional reach.', d: 'Finance, logistics, inventory and delivery platforms in 5 countries; frontend standards and reviews that cut onboarding time by 50%.' },
      ] },
      { period: 'Jan 2020 - Oct 2021', company: 'Safira Holding', role: 'Full Stack Engineer', stack: ['Node.js', 'TypeScript', 'Angular', 'Ionic', 'Firebase'], items: [
        { h: 'First customer-facing product.', d: 'Led its development, moving the company from internal tools to external products.' },
        { h: 'Legacy migration in ~1 month.', d: 'Rebuilt a solar panel leasing system after an acquisition, preventing 90 days of downtime.' },
        { h: 'Billing & debt management.', d: 'Designed credit card and invoice payments that ran in production without errors, becoming one of the company’s most impactful solutions.' },
      ] },
    ],
  },
  pt: {
    nav_ai: 'IA', nav_studio: 'GBS', nav_exp: 'Carreira', nav_about: 'Sobre', nav_contact: 'Contato',
    kicker: 'Product Engineer · Frontend e IA · São Paulo, GMT-3',
    role_prefix: 'Engenheiro frontend construindo',
    words: ['fluxos com IA.', 'interfaces escaláveis.', 'micro frontends.', 'meus próprios produtos.'],
    hero_sub: '6+ anos entregando produtos React e React Native usados por milhares de pessoas em 5 países e, mais recentemente, os agentes e fluxos com IA que fazem times entregarem mais rápido. Fundador da GBS Tecnologia, a empresa por trás do Obra Nova e do Lifedeck.',
    glance: ['Remoto · GMT-3', 'Inglês · profissional', 'React · TypeScript · Agentes de IA'],
    cta_work: 'Ver trabalho recente', cta_cv: 'Currículo',
    stats: [
      { pre: '~', n: 6, suf: ' meses', label: 'de discovery de projeto comprimidos em dias com IA' },
      { pre: '<', n: 2, suf: ' sem', label: 'do protótipo feito com IA à aprovação do projeto' },
      { pre: '', n: 20, suf: '+', label: 'produtos com deploy independente via micro frontends' },
      { pre: '', n: 100, suf: '→0', label: 'chamados mensais de frontend num sistema crítico' },
    ],
    sec_ai: 'IA no trabalho', ai_title: 'Eu não só uso ferramentas de IA. Eu construo os sistemas com que meu time entrega.',
    ai_desc: 'Em 2026 puxei quatro iniciativas de IA na Air Liquide que mudaram como o time descobre, constrói, revisa e corrige software. Todas mantêm um engenheiro no controle e são julgadas por critérios reais: testes, revisões e sinais de produção.',
    ai_items: [
      { k: '01', title: 'Discovery acelerado com IA', desc: 'Usei IA para analisar requisitos, definir escopo, criar um protótipo funcional e escrever a documentação de um projeto grande em dias, em vez dos ~6 meses habituais. Aprovado em menos de 2 semanas.', tags: 'Claude · Protótipo · Docs' },
      { k: '02', title: 'Agente Sentry → pull request', desc: 'Um agente que analisa as issues do Sentry, lê o código afetado e abre um pull request com a correção proposta. O engenheiro começa por um diff, não por um stack trace.', tags: 'Agentes · Sentry · Code review' },
      { k: '03', title: 'Do protótipo ao feedback', desc: 'Um procedimento que pega um protótipo feito no Lovable ou no Claude, adiciona a camada de revisão e publica, para que a área de negócio comente em telas específicas e aprove antes de qualquer código de produção.', tags: 'Lovable · Claude · Produto' },
      { k: '04', title: 'Plugin do time para o Claude Code', desc: 'Nosso plugin interno: regras e padrões de código do time, skills que validam tarefas num navegador real, acesso ao Azure DevOps onde o suporte a MCP é fraco, funis de workflow e revisores de PR automáticos.', tags: 'Claude Code · MCP · Azure DevOps' },
    ],
    ai_principles_label: 'Como trabalho com IA',
    ai_principles: [
      { h: 'O agente propõe, o engenheiro decide.', d: 'Toda mudança feita por IA passa por revisão e pelos mesmos gates de CI que o código humano.' },
      { h: 'Medir, não achar.', d: 'Avalio o que a IA produz por testes, lint e sinais de produção, não pelo quanto parece convincente.' },
      { h: 'Aprender entregando.', d: 'Modelos e ferramentas novas chegam todo mês. Testo em trabalho real, fico com o que vale a pena e descarto o resto.' },
    ],
    ai_proof: 'Prova pública: task-funnel, meu plugin open source para o Claude Code que transforma uma tarefa em um pull request revisado.',
    ai_proof_cta: 'Ver no GitHub',
    sec_studio: 'GBS Tecnologia', studio_title: 'Uma empresa de software onde eu crio, publico e opero meus próprios produtos.',
    studio_desc: 'A GBS Tecnologia da Informação é a empresa independente que fundei para levar produtos da ideia à produção e mantê-los rodando: design, código, infraestrutura, preço e suporte. É dona do Obra Nova e do Lifedeck, e publica ferramentas open source.',
    company_facts: [{ k: 'Razão social', v: 'GBS Tecnologia da Informação Ltda' }, { k: 'CNPJ', v: '44.000.992/0001-22' }, { k: 'Sede', v: 'São Paulo, Brasil' }],
    obra_tag: 'Carro-chefe · SaaS para construtoras',
    obra_desc: 'Plataforma de gestão para construtoras de pequeno e médio porte. Obras, equipes, documentos e financeiro num painel só. Antecipa estouros de orçamento e coloca um assistente com IA no WhatsApp que preenche o diário de obra por voz.',
    obra_points: ['Assistente com IA no WhatsApp, RDO por voz', 'Planejado vs. realizado por etapa', 'DRE atualizado a cada lançamento'],
    obra_status: 'No ar, com planos pagos', obra_app: 'App nativo em breve no Google Play', visit: 'Visitar site', privacy: 'Política de privacidade',
    products: [
      { icon: '/assets/lifedeck-icon.png', name: 'Lifedeck', tag: 'Produtividade · WhatsApp', badge: 'No ar', url: LINKS.life, cta: 'lifedeck.com.br', desc: 'Sua vida inteira, com calma, na mão. Tarefas e eventos com lembretes no WhatsApp, e dá para adicionar novos só mandando uma mensagem.', stack: 'Integração com WhatsApp' },
      { icon: '/assets/cashdeck-icon.png', name: 'Cashdeck', tag: 'Open source · Finanças + IA', badge: 'MIT', url: LINKS.cash, cta: 'GitHub', desc: 'Finanças domésticas self-hosted para o Brasil, PF e PJ: Open Finance, captura de boletos, pagamentos com camadas de segurança e um chat com IA e ferramentas sobre seus dados.', stack: 'TypeScript · Next.js · Postgres · Flutter' },
      { icon: '/assets/task-funnel-icon.svg', name: 'task-funnel', tag: 'Open source · Dev tools com IA', badge: 'MIT', url: LINKS.kit, cta: 'GitHub', desc: 'Um plugin para o Claude Code: você entrega uma tarefa e recebe um pull request revisado: worktree isolada, seus gates reais de lint e testes, revisores adversariais e o card do board atualizado.', stack: 'Claude Code · Agentes · Python' },
    ],
    sec_exp: 'Carreira', exp_title: 'Seis anos transformando plataformas complexas em produtos simples e confiáveis.',
    sec_about: 'Sobre', about_title: 'Eu assumo o problema de ponta a ponta e uso IA para chegar lá mais rápido.',
    about_p1: 'Comecei como estagiário Full Stack e logo assumi projetos complexos, o que moldou meu jeito de trabalhar: entender o negócio, entregar, medir, melhorar. Com o tempo me especializei em frontend: React e React Native, Micro Frontends, Design Systems e bibliotecas usadas por vários times.',
    about_p2: 'Hoje passo tanto tempo desenhando como construímos quanto construindo: agentes de IA, ferramentas internas e fluxos que deixam um time inteiro mais rápido. Operar meus próprios produtos na GBS me mantém honesto sobre o que realmente importa para quem usa.',
    sec_contact: 'Contato', contact_title: 'Vamos construir algo.',
    contact_sub: 'Quer conversar sobre frontend ou engenharia com IA, ficou curioso sobre o Obra Nova ou tem uma ideia de produto? Costumo responder em até um dia.',
    copy: 'Copiar e-mail', copied: 'Copiado ✓',
    cv_short: 'Currículo', back_top: 'Voltar ao topo',
    facts: [
      { label: 'Formação', title: 'Análise e Desenvolvimento de Sistemas', meta: 'Fatec Mogi das Cruzes · 2018–2021' },
      { label: 'Certificação', title: 'Scrum Fundamentals Certified', meta: 'SCRUMstudy' },
      { label: 'Idiomas', title: 'Português e Inglês', meta: 'Nativo · Proficiência profissional' },
      { label: 'Voluntariado', title: 'Instrutor de Informática', meta: 'Associação Árvore da Vida: inclusão digital para crianças e jovens de 6 a 17 anos' },
    ],
    jobs: [
      { period: 'Out 2021 - Atual', company: 'Air Liquide', role: 'Engenheiro Frontend', stack: ['React', 'React Native', 'TypeScript', 'Claude Code', 'MCP', 'Jest', 'Azure DevOps'], items: [
        { g: '2026 · Engenharia com IA', h: 'Discovery acelerado com IA.', d: 'Analisei, defini, prototipei e documentei um projeto grande com IA em dias, em vez de ~6 meses; aprovado em menos de 2 semanas.' },
        { h: 'Agente Sentry → pull request.', d: 'Puxei um sistema com IA que analisa issues do Sentry, lê o código e abre PRs com a correção proposta para revisão.' },
        { h: 'Do protótipo ao feedback.', d: 'Transformei protótipos do Lovable e do Claude em builds de revisão onde o negócio comenta no contexto e aprova.' },
        { h: 'Plugin do time para o Claude Code.', d: 'Padrões e skills do time: validação de tarefas no navegador, acesso ao Azure DevOps, funis de workflow e revisores de PR.' },
        { g: 'Plataforma e arquitetura', h: 'Arquitetura de Micro Frontends.', d: 'Implementei de ponta a ponta, permitindo que 20+ produtos façam deploy de forma independente, com releases mais rápidos e seguros.' },
        { h: 'Design System e bibliotecas.', d: 'Construí e evoluí componentes, tooling, monitoramento e i18n usados por ~10 times em 20+ produtos.' },
        { h: '~100 → 0 chamados.', d: 'Assumi um sistema crítico de rastreamento de cilindros de gás e zerei os problemas de frontend.' },
        { h: 'Alcance global e multidisciplinar.', d: 'Plataformas de finanças, logística, estoque e entregas em 5 países; padrões e reviews que reduziram o onboarding em 50%.' },
      ] },
      { period: 'Jan 2020 - Out 2021', company: 'Safira Holding', role: 'Engenheiro Full Stack', stack: ['Node.js', 'TypeScript', 'Angular', 'Ionic', 'Firebase'], items: [
        { h: 'Primeiro produto para clientes.', d: 'Liderei o desenvolvimento, levando a empresa de ferramentas internas para produtos externos.' },
        { h: 'Migração legada em ~1 mês.', d: 'Reconstruí um sistema de leasing de painéis solares após uma aquisição, evitando 90 dias de indisponibilidade.' },
        { h: 'Cobrança e gestão de dívidas.', d: 'Criei pagamentos por cartão e boleto que rodaram em produção sem erros, tornando-se uma das soluções de maior impacto da empresa.' },
      ] },
    ],
  },
};
