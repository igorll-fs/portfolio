const pt = {
  // Navbar
  nav: {
    servicos: 'Serviços',
    projetos: 'Projetos',
    stack: 'Stack',
    sobre: 'Sobre',
    contato: 'Contato',
  },

  // Hero
  hero: {
    role: 'Full-Stack Developer & Automação',
    desc: 'Sites, automação e sistemas que funcionam de verdade. Do conceito à produção, sem enrolação.',
    oquefaco: 'O que faço',
    meusProjetos: 'Meus Projetos',
    contato: 'Contato',
  },

  // Services
  servicos: {
    label: 'Serviços',
    title: 'O que eu faço',
    subtitle: 'Clique em cada serviço para ver como funciona e como impulsiona seu negócio.',
    askAI: 'Quer saber mais? Pergunte à IA',
    saibaMais: 'Saiba mais',
    items: [
      {
        title: 'Sites Profissionais',
        desc: 'Sites modernos com React, animações fluidas e design responsivo que convertem visitantes em clientes.',
      },
      {
        title: 'Automação',
        desc: 'Automatize pedidos, cadastros, relatórios e integrações entre sistemas. Menos trabalho manual, mais resultado.',
      },
      {
        title: 'Chatbots',
        desc: 'Bots inteligentes para WhatsApp, Instagram e seu site. Atendimento 24/7 automatizado.',
      },
      {
        title: 'Painéis & Relatórios',
        desc: 'Dashboards em tempo real para controle total do negócio. Dados que geram decisões.',
      },
      {
        title: 'SaaS & Plataformas',
        desc: 'Produtos SaaS completos — multi-tenant, assinaturas recorrentes, painel admin, deploy em produção. Do zero ao lançamento.',
      },
      {
        title: 'PWA & Apps',
        desc: 'Aplicativos web progressivos que instalam no celular como app nativo. Sem loja, sem complicação, sem custo de manutenção alta.',
      },
    ],
  },

  // Projects
  projetos: {
    label: 'Projetos',
    title: 'Trabalhos em destaque',
    subtitle: 'Soluções reais, entregues e em produção.',
    verProjeto: 'Ver Projeto',
    projetoPrivado: 'Projeto Privado',
    verDetalhes: 'Ver Detalhes',
    items: [
      {
        title: 'TradingBot Enterprise',
        description: 'Bot de trading autônomo com IA adaptativa — escaneia o mercado 24/7, ajusta estratégia sozinho conforme volatilidade e opera via Kraken. Pipeline completo: coleta de dados → ML → decisão → execução. Em produção com paper trading ativo.',
        features: ['IA adaptativa — recalibra sozinha', 'Multi-exchange (Kraken ativo)', 'Monitoramento 24/7 via Telegram', 'Paper trading + live mode', 'Pipeline de ML com feature engineering'],
        imageAlt: 'Terminal de trading com gráficos de candles e indicadores',
      },
      {
        title: 'BarberBLinders',
        description: 'SaaS multi-tenant para barbearias — agendamento online, pagamentos via Stripe (cartão + Pix), gestão de equipe, chat em tempo real, PWA instalável no celular. 3 planos de assinatura com trial. Projeto concluído, em produção e disponível para novos clientes.',
        features: ['Agendamento 24/7 com Google OAuth', 'Pagamentos Stripe (cartão + Pix)', 'Multi-tenant — 3 planos de assinatura', 'PWA — instala no celular como app', 'Chat em tempo real + notificações'],
        imageAlt: 'BarberBLinders — Painel de agendamento e gestão de barbearia',
      },
    ],
  },

  // TechStack
  stack: {
    label: 'Stack',
    title: 'Tecnologias',
    subtitle: 'Clique em cada uma para a IA explicar como ela pode transformar seu negócio.',
    items: [
      { label: 'React', desc: 'Interface moderna e responsiva' },
      { label: 'Node.js', desc: 'Backend rápido e escalável' },
      { label: 'Python', desc: 'Automação e inteligência artificial' },
      { label: 'Tailwind', desc: 'Design profissional e consistente' },
      { label: 'Framer', desc: 'Animações fluidas e impressionantes' },
      { label: 'PostgreSQL', desc: 'Banco de dados robusto e confiável' },
      { label: 'Firebase', desc: 'Backend em tempo real' },
      { label: 'Automação', desc: 'Elimina trabalho manual' },
    ],
  },

  // Testimonials
  depoimentos: {
    label: 'Resultados',
    title: 'Como mudamos negócios',
    subtitle: 'Resultados reais de clientes que investiram em tecnologia.',
    items: [
      {
        name: 'Carlos M.',
        role: 'Dono de Restaurante',
        service: 'Site Profissional',
        text: 'Antes eu dependia só do WhatsApp e perdia cliente por demora. Depois do site, as reservas online aumentaram 40% no primeiro mês. O cliente vê o cardápio, escolhe o horário e reserva — sem eu precisar responder nada.',
        metric: '+40% reservas',
      },
      {
        name: 'Fernanda S.',
        role: 'Gerente de E-commerce',
        service: 'Chatbot WhatsApp',
        text: 'O bot responde na hora, a qualquer hora. Tira dúvidas sobre produtos, mostra fotos e direciona pro checkout. Conversão subiu 35% porque o cliente não espera mais — compra em minutos, não em dias.',
        metric: '+35% conversão',
      },
      {
        name: 'Roberto A.',
        role: 'Proprietário de Loja',
        service: 'Automação',
        text: 'Pedidos do WhatsApp vão direto pro sistema. Estoque atualiza, nota fiscal sai automática e o cliente recebe confirmação. Economizo 3 horas por dia que gastava em cadastro manual. Erros zerados.',
        metric: '3h/dia economizadas',
      },
      {
        name: 'Juliana P.',
        role: 'CEO de Startup',
        service: 'Dashboard',
        text: 'O dashboard mostra vendas, estoque e performance em tempo real. Identifiquei produtos parados que travavam R$ 15 mil. Liquidamos e recuperamos o capital em 2 semanas. Decisão baseada em dados, não achismo.',
        metric: 'R$ 15k recuperados',
      },
    ],
  },

  // About
  sobre: {
    label: 'Sobre',
    title: 'Quem é Igor',
    p1: 'Desenvolvedor Full-Stack. Construo sistemas completos que vão do banco de dados ao deploy em produção. Projetos destaque: BarberBLinders — SaaS completo para barbearias, concluído e em produção; e TradingBot — bot de trading com IA adaptativa.',
    p2strong: 'BarberBLinders',
    p2: ' — plataforma SaaS pra barbearias com agendamento online, pagamentos via Stripe (cartão + Pix), chat em tempo real e PWA instalável no celular. Multi-tenant com 3 planos de assinatura, deploy em VPS própria. Projeto concluído e em produção.',
    p3strong: 'TradingBot',
    p3: ' — bot autônomo com IA que escaneia o mercado 24/7 via Kraken, ajusta estratégia conforme volatilidade e reporta via Telegram. Pipeline completo: coleta de dados → feature engineering → ML → execução.',
    p4: 'Stack: React, Node.js, Python, PostgreSQL, PocketBase, Stripe, ccxt, Tailwind, Cloudflare. Integro APIs de pagamento, mensageria e exchanges. Se o problema envolve sistema web, automação ou dados — eu resolvo.',
    cta: 'Tem um projeto ou uma ideia? Me chama — a gente conversa.',
    stackLabel: 'Stack principal',
    terminal: {
      whoami: 'whoami',
      whoamiOut: 'igor — full-stack developer',
      ls: 'ls projetos/',
      lsOut: [
        'BarberBLinders/     # SaaS multi-tenant (Stripe + PWA)',
        'TradingBot/         # IA + ML pipeline (Kraken)',
        'dev-works.uk/       # Portfolio (React + Cloudflare)',
      ],
      cat: 'cat stack.txt',
      catOut: [
        'React · Node.js · Python · PostgreSQL',
        'PocketBase · Stripe · ccxt · Cloudflare',
        'Tailwind · Caddy · GitHub Actions · Docker',
      ],
    },
  },

  // Contact
  contato: {
    label: 'Contato',
    title: 'Vamos conversar?',
    subtitle: 'Me chama no Instagram, confira meus projetos ou envie um email direto.',
    email: 'Email',
    instagram: 'Instagram',
    github: 'GitHub',
    emailSubject: 'Contato via Portfolio',
  },

  // Footer
  footer: {
    copy: '© 2026 Igor Luiz',
  },

  // ServiceModal
  serviceModal: {
    technicalHow: 'Como funciona tecnicamente',
    businessImpact: 'Como impulsiona seu negócio',
    investment: 'Investimento',
    realResult: 'Resultado real',
    iWantThis: 'Quero isso',
    sitesProfissionais: {
      subtitle: 'A diferença entre um site que vende e um que ninguém visita.',
      whatTitle: 'O que é um site profissional?',
      whatText: 'Um site profissional é muito mais que uma página bonita na internet. É uma máquina de converter visitantes em clientes. Enquanto um site básico tem apenas texto e imagens paradas, um site profissional usa animações suaves, transições fluidas, micro-interações e design responsivo que se adapta perfeitamente a qualquer tela — celular, tablet ou desktop.',
      diffTitle: 'Site básico vs. Site profissional',
      diffItems: [
        { basic: 'Layout travado, parece Word', pro: 'Design moderno com grid assimétrico e hierarquia visual' },
        { basic: 'Sem animações, tudo parado', pro: 'Animações fluidas que guiam o olhar do visitante' },
        { basic: 'Quebra no celular', pro: 'Responsivo — funciona perfeito em qualquer tela' },
        { basic: 'Não aparece no Google', pro: 'Otimizado para SEO — aparece nas buscas' },
        { basic: 'Lento, carrega em 5s+', pro: 'Rápido — carrega em menos de 2 segundos' },
        { basic: 'Sem conversão, só informativo', pro: 'CTAs estratégicos que guiam o cliente à ação' },
      ],
      how: 'Um site profissional é construído com tecnologias modernas como React, que permite criar interfaces dinâmicas e rápidas. As animações são feitas com bibliotecas como Framer Motion, criando transições suaves entre páginas, efeitos de parallax, cards que reagem ao hover e elementos que aparecem conforme você rola a página. O design responsivo usa CSS Grid e Flexbox para reorganizar o layout automaticamente em telas menores.',
      benefits: [
        'Primeira impressão — 94% das primeiras impressões são sobre design',
        'Conversão — sites profissionais convertem 200% mais que básicos',
        'SEO — aparece no Google e atrai clientes orgânicos',
        'Mobile — 70% dos acessos vêm do celular',
      ],
      pricingTiers: [
        { name: 'Landing Page', price: 'R$ 800', desc: 'Página única, responsiva, com formulário de contato' },
        { name: 'Site Institucional', price: 'R$ 1.500', desc: 'Até 5 páginas, animações, SEO básico' },
        { name: 'Site Completo', price: 'R$ 2.500+', desc: 'Páginas ilimitadas, animações avançadas, blog, integrações' },
      ],
      result: 'Um restaurante que tinha apenas Instagram criou um site profissional com reserva online. No primeiro mês, as reservas aumentaram 40% — clientes que antes desistiam por não ter resposta rápida agora reservavam direto no site.',
    },
    automacao: {
      subtitle: 'Transforme horas de trabalho manual em segundos automáticos.',
      whatTitle: 'O que é automação?',
      whatText: 'Automação é usar software para executar tarefas repetitivas que você faz manualmente todos os dias. Em vez de copiar dados de uma planilha para outra, responder a mesma pergunta no WhatsApp 50 vezes, ou gerar relatórios à mão — um sistema faz tudo isso automaticamente, sem erro, sem cansaço, 24 horas por dia.',
      diffTitle: 'Trabalho manual vs. Automação',
      diffItems: [
        { basic: 'Copiar dados entre planilhas', pro: 'Sincronização automática entre sistemas' },
        { basic: 'Responder WhatsApp um por um', pro: 'Respostas automáticas + chatbot inteligente' },
        { basic: 'Gerar relatórios toda semana', pro: 'Relatórios gerados e enviados automaticamente' },
        { basic: 'Verificar estoque manualmente', pro: 'Alertas automáticos quando estoque baixa' },
        { basic: 'Enviar cobranças por email', pro: 'Cobranças automáticas com lembretes' },
        { basic: 'Cadastrar pedidos à mão', pro: 'Pedidos vão direto pro sistema' },
      ],
      how: 'A automação funciona conectando diferentes sistemas através de APIs e webhooks. Por exemplo: quando um cliente faz um pedido no WhatsApp, o bot detecta, extrai as informações, cadastra no sistema de estoque, gera a nota fiscal e envia a confirmação — tudo em segundos, sem intervenção humana.',
      benefits: [
        'Economia de tempo — processos de horas viram segundos',
        'Zero erros — automação não erra, não esquece, não cansa',
        'Escalabilidade — cresça sem contratar mais gente',
        'Agilidade — respostas instantâneas para clientes',
      ],
      pricingTiers: [
        { name: 'Automação Simples', price: 'R$ 800', desc: 'Uma integração (ex: WhatsApp → planilha)' },
        { name: 'Automação Média', price: 'R$ 1.500', desc: '2-3 integrações, lógica condicional' },
        { name: 'Automação Complexa', price: 'R$ 2.500+', desc: 'Múltiplos sistemas, IA, fluxos avançados' },
      ],
      result: 'Uma loja de roupas automatizou o fluxo: WhatsApp → estoque → nota fiscal → envio. Antes gastava 3 horas por dia cadastrando pedidos. Agora é zero — o sistema faz tudo. Erros de cadastro zerados e pedidos processados em segundos.',
    },
    chatbots: {
      subtitle: 'Atendimento inteligente que nunca dorme e nunca perde cliente.',
      whatTitle: 'O que é um chatbot?',
      whatText: 'Um chatbot é um programa de inteligência artificial que conversa com seus clientes automaticamente — pelo WhatsApp, Instagram, site ou qualquer plataforma. Ele entende perguntas, responde dúvidas, agenda horários, mostra produtos e quando não sabe algo, transfere para um humano. Tudo isso 24 horas por dia, 7 dias por semana.',
      diffTitle: 'Atendimento humano vs. Chatbot',
      diffItems: [
        { basic: 'Responde em minutos ou horas', pro: 'Responde em segundos, a qualquer hora' },
        { basic: 'Atende 1 cliente por vez', pro: 'Atende 10.000 clientes simultaneamente' },
        { basic: 'Cansa, erra, esquece', pro: 'Nunca erra, nunca cansa, nunca esquece' },
        { basic: 'Precisa treinar funcionários', pro: 'Configura uma vez, funciona pra sempre' },
        { basic: 'Custo alto com equipe', pro: 'Custo único de desenvolvimento' },
        { basic: 'Horário comercial apenas', pro: '24/7 — fins de semana e feriados' },
      ],
      how: 'O chatbot funciona com inteligência artificial (NLP) que entende o que o cliente quer mesmo com erros de digitação, gírias ou perguntas indiretas. Ele se conecta com WhatsApp Business API, Instagram API ou fica embutido no site. Pode integrar com CRM, sistema de agendamento e pagamento.',
      benefits: [
        'Atendimento instantâneo — respostas em 2 segundos',
        'Escala infinita — atende todos os clientes ao mesmo tempo',
        'Mais vendas — responde dúvidas antes do cliente desistir',
        'Consistência — mesma qualidade de atendimento sempre',
      ],
      pricingTiers: [
        { name: 'Chatbot Básico', price: 'R$ 800', desc: 'Respostas pré-definidas, 1 plataforma' },
        { name: 'Chatbot com IA', price: 'R$ 1.800', desc: 'IA para entender perguntas, 2 plataformas' },
        { name: 'Chatbot Avançado', price: 'R$ 3.000+', desc: 'IA + CRM + agendamento + pagamentos' },
      ],
      result: 'Um e-commerce de roupas implementou chatbot no WhatsApp. Antes, 40% dos clientes desistiam por demora na resposta. Com o bot, a conversão subiu 35% — clientes tiram dúvidas e compram em minutos, não em dias.',
    },
    dashboards: {
      subtitle: 'Transforme dados brutos em decisões que geram lucro.',
      whatTitle: 'O que é um dashboard?',
      whatText: 'Um dashboard é uma tela visual que mostra todas as métricas importantes do seu negócio em um só lugar, com gráficos, números e indicadores atualizados em tempo real. Em vez de abrir 5 planilhas diferentes, você vê tudo de relance — vendas, estoque, clientes, equipe, fluxo de caixa.',
      diffTitle: 'Planilhas vs. Dashboard profissional',
      diffItems: [
        { basic: 'Dados espalhados em planilhas', pro: 'Tudo centralizado em uma tela' },
        { basic: 'Atualização manual toda semana', pro: 'Dados em tempo real, atualizados automaticamente' },
        { basic: 'Gráficos básicos do Excel', pro: 'Gráficos interativos com filtros e drill-down' },
        { basic: 'Precisa de alguém pra analisar', pro: 'Indicadores visuais — verde/amarelo/vermelho' },
        { basic: 'Sem acesso mobile', pro: 'Acessa de qualquer lugar, até do celular' },
        { basic: 'Exportar e enviar por email', pro: 'Relatórios automáticos por email/PDF' },
      ],
      how: 'Um dashboard profissional é construído com React e bibliotecas de gráficos que permitem visualizações interativas. Ele se conecta com qualquer fonte de dados: banco de dados, APIs, planilhas Google, ERPs. Os dados são atualizados em tempo real via WebSockets ou polling automático.',
      benefits: [
        'Visão clara — métricas importantes em um só lugar',
        'Decisões rápidas — dados em tempo real permitem reagir antes de perder dinheiro',
        'Identificar oportunidades — ver tendências e padrões escondidos nos dados',
        'Controle total — acompanhe cada área do negócio',
      ],
      pricingTiers: [
        { name: 'Dashboard Básico', price: 'R$ 800', desc: 'Gráficos simples, 1 fonte de dados' },
        { name: 'Dashboard Intermediário', price: 'R$ 1.500', desc: 'Múltiplos gráficos, filtros, exportação' },
        { name: 'Dashboard Completo', price: 'R$ 2.500+', desc: 'Tempo real, múltiplas fontes, alertas automáticos' },
      ],
      result: 'Uma startup de delivery usou dashboard para analisar vendas. Descobriram que 3 produtos representavam 80% do estoque parado. Liquidaram esses produtos e recuperaram R$ 15 mil em 2 semanas.',
    },
    saas: {
      subtitle: 'Produtos SaaS que geram receita recorrente — do conceito ao deploy.',
      whatTitle: 'O que é um SaaS?',
      whatText: 'SaaS (Software as a Service) é um produto digital que seus clientes acessam pela internet e pagam uma assinatura mensal. Tem cadastro de usuários, painel de controle, pagamentos recorrentes, múltiplos planos e precisa funcionar 24/7.',
      diffTitle: 'Site comum vs. Plataforma SaaS',
      diffItems: [
        { basic: 'Entrega uma vez e acabou', pro: 'Receita recorrente todo mês' },
        { basic: 'Sem login ou cadastro', pro: 'Multi-tenant com autenticação e perfis' },
        { basic: 'Sem pagamentos integrados', pro: 'Stripe com assinaturas, planos e cobrança automática' },
        { basic: 'Muda tudo manualmente', pro: 'Painel admin pro cliente gerenciar sozinho' },
        { basic: 'Não escala', pro: 'Serve 1 ou 10.000 clientes no mesmo sistema' },
        { basic: 'Sem atualização contínua', pro: 'Deploy contínuo, melhorias constantes' },
      ],
      how: 'Um SaaS é construído com arquitetura multi-tenant — cada cliente tem seus dados isolados. Frontend em React com rotas protegidas. Backend com PocketBase, Node.js ou Python, autenticação JWT, e Stripe para assinaturas recorrentes.',
      benefits: [
        'Receita recorrente — dinheiro entra todo mês automaticamente',
        'Multi-tenant — um sistema serve N clientes',
        'Dados isolados — cada cliente vê apenas o que é dele',
        'Escalável — cresce sem reescrever o código',
      ],
      pricingTiers: [
        { name: 'MVP / Prototype', price: 'R$ 3.000', desc: 'Funcionalidades essenciais, 1-2 roles, deploy básico' },
        { name: 'SaaS Intermediário', price: 'R$ 6.000', desc: 'Multi-tenant, Stripe, painel admin, 3+ roles' },
        { name: 'SaaS Completo', price: 'R$ 12.000+', desc: 'Tudo acima + chat, notificações, analytics, PWA' },
      ],
      result: 'BarberBLinders — plataforma SaaS para barbearias construída do zero. Multi-tenant com 3 planos de assinatura, agendamento online, gestão de equipe, chat em tempo real, pagamentos recorrentes via Stripe e PWA instalável. Em produção, servindo clientes reais.',
    },
    pwa: {
      subtitle: 'App instalável no celular sem loja, sem complicação.',
      whatTitle: 'O que é um PWA?',
      whatText: 'PWA (Progressive Web App) é um aplicativo web que se instala direto no celular — igual um app nativo, com ícone na tela inicial, funciona offline e abre em tela cheia. Não precisa de App Store ou Google Play.',
      diffTitle: 'App nativo vs. PWA',
      diffItems: [
        { basic: 'Precisa de App Store / Play Store', pro: 'Instala direto do navegador, sem loja' },
        { basic: 'Download pesado (50-200MB)', pro: 'Leve — carrega em segundos' },
        { basic: 'Custo alto (R$ 15k-50k+)', pro: 'Custo 70% menor que app nativo' },
        { basic: 'Precisa de 2 versões (iOS + Android)', pro: 'Uma versão funciona em tudo' },
        { basic: 'Atualização precisa de aprovação', pro: 'Atualiza automaticamente' },
        { basic: 'Sem acesso offline', pro: 'Funciona offline com cache inteligente' },
      ],
      how: 'Um PWA usa Service Worker (cache offline), Web App Manifest (configura instalação) e HTTPS (segurança). Push notifications funcionam via Web Push API — o usuário recebe notificações mesmo com o app fechado.',
      benefits: [
        'Instalável — ícone na tela inicial como app nativo',
        'Rápido — carrega em menos de 2 segundos',
        'Universal — funciona em qualquer celular com navegador',
        'Engajamento — notificações push reengajam usuários',
      ],
      pricingTiers: [
        { name: 'PWA Básico', price: 'R$ 1.500', desc: 'Manifest + Service Worker + cache offline' },
        { name: 'PWA Intermediário', price: 'R$ 2.500', desc: 'Push notifications + splash screen + install prompt' },
        { name: 'PWA Completo', price: 'R$ 4.000+', desc: 'Offline avançado + background sync + integrações' },
      ],
      result: 'BarberBLinders é PWA — clientes da barbearia instalaram o app no celular sem precisar de App Store. O agendamento funciona offline e push notifications lembram o cliente do horário. Taxa de reuso subiu 60%.',
    },
    pricingNote: 'Valor final depende da complexidade. Solicite orçamento personalizado.',
  },

  // ChatWidget UI
  chat: {
    headerName: 'Assistente Igor.dev',
    headerStatus: 'Online',
    welcome: 'Olá! Sou o assistente da igor.dev. Posso te ajudar com informações sobre nossos serviços, preços e prazos. O que você gostaria de saber?',
    placeholder: 'Digite sua pergunta...',
    limitReached: 'Limite atingido',
    inviteText: '👋 Precisa de ajuda? Clique aqui e tire suas dúvidas sobre nossos serviços!',
    inviteBtn: 'Conversar agora',
    quickQuestions: [
      'Quero um site profissional',
      'Quanto custa um chatbot?',
      'Como funciona a automação?',
      'Falar com o Igor',
    ],
    limitMsg: 'Você atingiu o limite de mensagens. Para continuar a conversa, me chama no Instagram @igor_works ou pelo email igorlsdev30@gmail.com',
    offTopic: 'Sou focado em ajudar com nossos serviços. Pergunte sobre sites profissionais, automação, chatbots, dashboards, preços ou prazos!',
    warningLeft: 'Restam {n} mensagens',
    contactLabel: 'Quer que eu envie uma mensagem para o Igor?',
    contactInstagram: 'Instagram DM',
    contactEmail: 'Enviar Email',
    openingInstagram: 'Abrindo Instagram do Igor... @igor_works',
    openingEmail: 'Abrindo seu email para entrar em contato...',
  },
}

export default pt
