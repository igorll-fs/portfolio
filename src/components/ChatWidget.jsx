import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, AlertCircle, MessageCircle, Mail, Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/context'

const MAX_MESSAGES = 15
const INVITE_DELAY = 4000

// Service-specific prompts
const servicePrompts = {
  'Sites Profissionais': 'Quero saber mais sobre sites profissionais. Como funciona e como pode ajudar meu negócio?',
  'Professional Websites': 'I want to know more about professional websites. How does it work and how can it help my business?',
  'Automação': 'Quero saber mais sobre automação. Como funciona e como pode ajudar meu negócio?',
  'Automation': 'I want to know more about automation. How does it work and how can it help my business?',
  'Chatbots': { pt: 'Como um chatbot ajuda no atendimento ao cliente?', en: 'How can a chatbot help with customer support?' },
  'Painéis & Relatórios': 'Quero saber mais sobre dashboards e painéis. Como funciona e como pode ajudar meu negócio?',
  'Dashboards & Reports': 'I want to know more about dashboards and reports. How does it work and how can it help my business?',
  'BarberBLinders': 'Me conta sobre o BarberBLinders. Como foi construído e o que posso aproveitar em um projeto parecido?',
  'SaaS & Plataformas': 'Quero saber mais sobre SaaS e plataformas. Como funciona e como pode ajudar meu negócio?',
  'SaaS & Platforms': 'I want to know more about SaaS and platforms. How does it work and how can it help my business?',
  'PWA & Apps': { pt: 'Como um app PWA funciona no celular?', en: 'How does a PWA work on a phone?' },
  'Tecnologia': '',
}

// Topic filter
const ALLOWED_TOPICS = [
  'serviço', 'servico', 'site', 'sites', 'web', 'landing', 'página', 'pagina',
  'automação', 'automacao', 'automatizar', 'bot', 'chatbot', 'whatsapp', 'instagram',
  'dashboard', 'painel', 'relatório', 'relatorio', 'dados', 'métricas', 'metricas',
  'preço', 'preco', 'valor', 'quanto', 'custa', 'orçamento', 'orcamento',
  'prazo', 'tempo', 'demora', 'entrega', 'rápido', 'rapido',
  'tecnologia', 'tecnologias', 'react', 'python', 'node', 'api',
  'igor', 'igor_works', 'portfolio', 'portfólio', 'projeto', 'projetos', 'trading', 'barberblinders', 'barber', 'saas',
  'contato', 'email', 'instagram', 'github', 'linkedin',
  'diferença', 'diferenca', 'qual', 'como', 'por que', 'porque',
  'empresa', 'negócio', 'negocio', 'cliente', 'crescer', 'crescimento',
  'ia', 'inteligência', 'inteligencia', 'artificial', 'machine learning',
  'sistema', 'plataforma', 'software', 'aplicativo', 'app', 'pwa', 'multi-tenant',
  'enviar', 'mandar', 'falar', 'mensagem', 'contatar', 'chamar',
  'oi', 'olá', 'ola', 'hello', 'hi', 'bom dia', 'boa tarde', 'boa noite',
  'obrigado', 'obrigada', 'valeu', 'thanks', 'quero', 'gostei', 'interessado',
  'ajud', 'ajuda', 'help', 'duvida', 'dúvida', 'como funciona',
  'service', 'services', 'automation', 'chatbot', 'dashboard', 'price', 'cost',
  'timeline', 'deadline', 'technology', 'contact', 'about', 'project',
  'website', 'professional', 'report', 'platform', 'mobile', 'app', 'quote', 'pricing',
]

function isOnTopic(input) {
  const lower = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return ALLOWED_TOPICS.some(topic => lower.includes(topic.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
}

// Local fallback - respostas detalhadas
const knowledge = {
  greeting: [
    'Olá! Sou o assistente da dev-work. Posso te ajudar com informações sobre nossos serviços: sites profissionais, automação de processos, chatbots inteligentes e dashboards. O que você gostaria de saber?',
    'Oi! Bem-vindo à dev-work. Trabalho com desenvolvimento de software sob medida. Pergunte sobre serviços, etapas do projeto ou como posso resolver o problema do seu negócio.',
  ],
  greetingEn: [
    'Hi! I\'m the dev-work assistant. I can help you with information about our services: professional websites, process automation, smart chatbots and dashboards. What would you like to know?',
    'Hello! Welcome to dev-work. I work with custom software development. Ask about services and project timelines or how I can solve your business problem.',
  ],
  services: {
    'sites': {
      answer: 'Uma landing page ajuda a divulgar uma oferta e receber contatos pelo WhatsApp ou por formulário. Um site institucional apresenta sua empresa, seus serviços e seus projetos. Se você vende online, podemos organizar catálogo e checkout. O site se adapta ao celular e recebe otimizações de carregamento e busca.',
      answerEn: 'A landing page promotes an offer and captures inquiries through WhatsApp or a form. A business website introduces your company, services and work. If you sell online, we can set up a catalog and checkout. The site is designed for mobile, fast loading and search visibility.',
      follow: 'O que você quer que o visitante faça ao chegar ao site?',
      followEn: 'What would you like visitors to do when they land on the site?',
    },
    'automação': {
      answer: 'A automação conecta ferramentas como WhatsApp, planilhas, CRM e ERP. Quando chega um pedido, por exemplo, o fluxo pode registrar os dados, atualizar o estoque e avisar a equipe. Assim, a equipe deixa de copiar as mesmas informações de um sistema para outro.',
      answerEn: 'Automation connects tools like WhatsApp, spreadsheets, CRMs and ERPs. When an order comes in, the workflow can record it, update inventory and notify the team. Your staff spend less time copying the same information between tools.',
      follow: 'Qual tarefa se repete mais na sua rotina?',
      followEn: 'Which task does your team repeat most often?',
    },
    'chatbot': {
      answer: 'Um chatbot pode responder dúvidas frequentes, registrar pedidos de agendamento e encaminhar conversas para sua equipe pelo WhatsApp, Instagram ou site. Com IA, ele entende perguntas escritas de formas diferentes e pode consultar as informações da sua empresa para responder.',
      answerEn: 'A chatbot can answer common questions, capture booking requests and hand conversations to your team on WhatsApp, Instagram or your website. With AI, it can understand differently worded questions and answer using your business information.',
      follow: 'Em qual canal você recebe mais perguntas hoje?',
      followEn: 'Which channel gets the most customer questions today?',
    },
    'dashboard': {
      answer: 'Um dashboard reúne dados de planilhas e sistemas em um painel com gráficos e filtros. Você pode acompanhar vendas por período, identificar produtos parados no estoque e compartilhar relatórios com a equipe. Se a fonte permitir, o painel pode atualizar os dados automaticamente e emitir alertas.',
      answerEn: 'A dashboard brings data from spreadsheets and business systems together in one place. You can track sales over time, spot slow-moving inventory and share reports with your team. Where the data source supports it, the dashboard can update automatically and send alerts.',
      follow: 'Quais indicadores sua equipe precisa acompanhar?',
      followEn: 'Which metrics does your team need to track?',
    },
    'preço': {
      answer: 'O Igor prepara um orçamento personalizado com base no que você precisa, nas ferramentas que já usa e no prazo do projeto.',
      answerEn: 'Igor prepares a custom quote based on what you need, the tools you already use and your timeline.',
      follow: 'Qual serviço você tem em mente?',
      followEn: 'Which service are you interested in?',
    },
    'prazo': {
      answer: 'Prazos realistas, sem enrolação:\n\n🌐 Landing pages: 1-2 semanas\n🌐 Sites institucionais: 2-4 semanas\n🌐 Sistemas completos: 4-8 semanas\n⚙️ Automações simples: 1-2 semanas\n⚙️ Automações complexas: 3-6 semanas\n🤖 Chatbots: 2-4 semanas\n📊 Dashboards: 2-4 semanas\n\nO prazo exato depende da complexidade e da agilidade no feedback. Projeto grande? Entregamos em fases.',
      answerEn: 'Realistic timelines, no fluff:\n\n🌐 Landing pages: 1-2 weeks\n🌐 Institutional sites: 2-4 weeks\n🌐 Complete systems: 4-8 weeks\n⚙️ Simple automations: 1-2 weeks\n⚙️ Complex automations: 3-6 weeks\n🤖 Chatbots: 2-4 weeks\n📊 Dashboards: 2-4 weeks\n\nThe exact timeline depends on complexity and feedback speed. Big project? We deliver in phases.',
      follow: 'Tem alguma urgência ou data específica?',
      followEn: 'Any urgency or specific deadline?',
    },
    'tecnologia': {
      answer: 'Stack moderno e testado em produção. Frontend: React + Tailwind CSS + Framer Motion (interfaces rápidas e bonitas). Backend: Node.js + Python (APIs robustas). Banco: MongoDB + PostgreSQL (flexível ou relacional). IA: integração com modelos de linguagem para chatbots inteligentes. Tudo hospedado em infraestrutura profissional com deploy automático.',
      answerEn: 'Modern stack tested in production. Frontend: React + Tailwind CSS + Framer Motion (fast and beautiful interfaces). Backend: Node.js + Python (robust APIs). Database: MongoDB + PostgreSQL (flexible or relational). AI: integration with language models for smart chatbots. All hosted on professional infrastructure with automatic deployment.',
      follow: 'Quer saber como alguma tecnologia específica ajuda no seu negócio?',
      followEn: 'Want to know how a specific technology can help your business?',
    },
    'igor': {
      answer: 'Igor Luiz, desenvolvedor Full-Stack. Especialista em React, Node.js, Python e IA.\n\nProjetos destaque:\n• BarberBLinders — SaaS completo para barbearias (Stripe, PWA, multi-tenant)\n• TradingBot Enterprise — plataforma de trading com IA adaptativa (150k+ linhas)\n• Automações WhatsApp → ERP → nota fiscal\n\nFoco em entregar sistemas que funcionam em produção, não promessas vazias.',
      answerEn: 'Igor Luiz, Full-Stack Developer. Specialist in React, Node.js, Python and AI.\n\nFeatured projects:\n• BarberBLinders — Complete SaaS for barbershops (Stripe, PWA, multi-tenant)\n• TradingBot Enterprise — Trading platform with adaptive AI (150k+ lines)\n• WhatsApp automations → ERP → invoicing\n\nFocus on delivering systems that work in production, not empty promises.',
      follow: 'Quer ver o portfólio ou entrar em contato?',
      followEn: 'Want to see the portfolio or get in touch?',
    },
    'contato': {
      answer: 'Pode me chamar por email (igorlsdev30@gmail.com), Instagram (@igor_works) ou aqui mesmo no chat. Respondo rápido e posso montar uma proposta personalizada para o seu projeto.',
      answerEn: 'You can reach me by email (igorlsdev30@gmail.com), Instagram (@igor_works) or right here in the chat. I respond quickly and can put together a personalized proposal for your project.',
      follow: 'Qual canal prefere?',
      followEn: 'Which channel do you prefer?',
    },
    'diferença': {
      answer: 'Cada serviço resolve um problema diferente. Sites = presença online e credibilidade (clientes te encontram no Google). Automação = eficiência (elimina trabalho manual e erros). Chatbots = atendimento 24/7 (nunca perde cliente). Dashboards = controle total (decisões baseadas em dados, não achismo). Qual é o maior problema do seu negócio hoje?',
      answerEn: 'Each service solves a different problem. Websites = online presence and credibility (customers find you on Google). Automation = efficiency (eliminates manual work and errors). Chatbots = 24/7 support (never loses a customer). Dashboards = total control (data-driven decisions, not guesswork). What\'s the biggest problem in your business today?',
      follow: 'Posso explicar melhor o que mais te interessa?',
      followEn: 'Can I explain more about what interests you most?',
    },
    'react': {
      answer: 'React é a tecnologia que usamos para construir interfaces modernas e rápidas. Sites em React carregam sem recarregar a página — tudo acontece instantaneamente. Animações suaves, transições fluidas, e funciona perfeitamente em qualquer dispositivo. É o mesmo framework usado pelo Instagram, Netflix e Airbnb. Seu site fica profissional e rápido, o que aumenta a confiança do cliente e melhora o posicionamento no Google.',
      answerEn: 'React is the technology we use to build modern and fast interfaces. React sites load without page refreshes — everything happens instantly. Smooth animations, fluid transitions, and works perfectly on any device. It\'s the same framework used by Instagram, Netflix and Airbnb. Your site becomes professional and fast, which increases customer trust and improves Google ranking.',
      follow: 'Quer ver como ficaria um site em React para o seu negócio?',
      followEn: 'Want to see how a React site would look for your business?',
    },
    'python': {
      answer: 'Python é a linguagem que usamos para automações e inteligência artificial. Com Python, conectamos seus sistemas (WhatsApp, planilhas, ERPs, bancos de dados) para que trabalhem juntos automaticamente. Também usamos para criar chatbots que entendem linguagem natural — o cliente fala normalmente e o bot entende. É a linguagem mais usada para IA no mundo.',
      answerEn: 'Python is the language we use for automation and artificial intelligence. With Python, we connect your systems (WhatsApp, spreadsheets, ERPs, databases) to work together automatically. We also use it to create chatbots that understand natural language — the customer speaks normally and the bot understands. It\'s the most used language for AI in the world.',
      follow: 'Quer saber como Python pode automatizar o seu negócio?',
      followEn: 'Want to know how Python can automate your business?',
    },
    'node': {
      answer: 'Node.js é o motor que roda por trás dos sistemas que construímos. É rápido, escalável e processa milhares de requisições ao mesmo tempo sem travar. Usamos para APIs, integrações em tempo real, e backends que precisam responder instantaneamente. É a mesma tecnologia usada pelo Uber, PayPal e LinkedIn.',
      answerEn: 'Node.js is the engine that runs behind the systems we build. It\'s fast, scalable and processes thousands of requests simultaneously without crashing. We use it for APIs, real-time integrations, and backends that need to respond instantly. It\'s the same technology used by Uber, PayPal and LinkedIn.',
      follow: 'Quer saber mais sobre nossos serviços de backend?',
      followEn: 'Want to know more about our backend services?',
    },
  },
  default: [
    'Não entendi sua pergunta. Posso te ajudar com: sites profissionais, automação de processos, chatbots inteligentes, dashboards, SaaS ou aplicativos. O que você gostaria de saber?',
    'Hmm, não tenho certeza do que você quer saber. Pergunte sobre nossos serviços, como funciona algum processo, ou como posso ajudar no seu negócio.',
  ],
  defaultEn: [
    'I didn\'t understand your question. I can help with: professional websites, process automation, smart chatbots, dashboards, SaaS or apps. What would you like to know?',
    'Hmm, I\'m not sure what you want to know. Ask about our services, how a process works, or how I can help your business.',
  ],
}

function getLocalResponse(input, lang) {
  const lower = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const isEn = lang === 'en'

  // Greetings
  if (lower.match(/^(oi|ola|hey|hello|bom dia|boa tarde|boa noite|hi)\b/)) {
    const pool = isEn ? knowledge.greetingEn : knowledge.greeting
    return { text: pool[Math.floor(Math.random() * pool.length)], follow: null }
  }

  // Thanks
  if (lower.match(/obrigad|valeu|thanks|thank you/)) {
    return { text: isEn ? 'You\'re welcome! If you need anything else, just ask.' : 'De nada! Se precisar de mais alguma coisa, é só perguntar.', follow: null }
  }

  // Direct requests for a quote
  if (lower.match(/\b(quanto custa|valor|precos?|cust[ao]|orcamentos?|prices?|pricing|cost|quote)\b/)) {
    const d = knowledge.services['preço']
    return { text: isEn ? d.answerEn : d.answer, follow: isEn ? d.followEn : d.follow, offerContact: true }
  }

  // Specific service keywords
  if (lower.match(/site|landing|pagina|loja virtual|e-commerce/)) {
    const d = knowledge.services['sites']
    return { text: isEn ? d.answerEn : d.answer, follow: isEn ? d.followEn : d.follow, offerContact: false }
  }
  if (lower.match(/automa|automatizar|automatiza|integrar|integracao|planilha|manual|repetitiv/)) {
    const d = knowledge.services['automação']
    return { text: isEn ? d.answerEn : d.answer, follow: isEn ? d.followEn : d.follow, offerContact: false }
  }
  if (lower.match(/chatbot|\bbot\b|whatsapp|wpp|zap|atendimento|resposta automatica/)) {
    const d = knowledge.services['chatbot']
    return { text: isEn ? d.answerEn : d.answer, follow: isEn ? d.followEn : d.follow, offerContact: false }
  }
  if (lower.match(/dashboard|painel|relat|metrica|grafico|dados|indicador|report/)) {
    const d = knowledge.services['dashboard']
    return { text: isEn ? d.answerEn : d.answer, follow: isEn ? d.followEn : d.follow, offerContact: false }
  }

  // Deadline questions
  if (lower.match(/prazo|tempo|demora|rapido|entrega|timeline|deadline|how long/)) {
    const d = knowledge.services['prazo']
    return { text: isEn ? d.answerEn : d.answer, follow: isEn ? d.followEn : d.follow }
  }

  // Tech keywords
  if (lower.includes('react')) { const d = knowledge.services['react']; return { text: isEn ? d.answerEn : d.answer, follow: isEn ? d.followEn : d.follow, offerContact: false } }
  if (lower.includes('python')) { const d = knowledge.services['python']; return { text: isEn ? d.answerEn : d.answer, follow: isEn ? d.followEn : d.follow, offerContact: false } }
  if (lower.match(/node|nodejs/)) { const d = knowledge.services['node']; return { text: isEn ? d.answerEn : d.answer, follow: isEn ? d.followEn : d.follow, offerContact: false } }
  if (lower.match(/tecnolog|stack|ferramenta|technology/)) { const d = knowledge.services['tecnologia']; return { text: isEn ? d.answerEn : d.answer, follow: isEn ? d.followEn : d.follow, offerContact: false } }

  // BarberBLinders
  if (lower.match(/barberblinders|barber/)) return {
    text: isEn
      ? 'BarberBLinders is a complete SaaS platform for barbershops. Built with React, PocketBase, Stripe and PWA.\n\nIncludes:\n• 24/7 online scheduling\n• Recurring payments (3 plans via Stripe)\n• Multi-tenant (each barbershop has its own space)\n• Real-time chat\n• Installable PWA on mobile\n• Team management with extra slots\n\nFrom zero to production deployment. If you want something similar for your business, let me know.'
      : 'BarberBLinders é uma plataforma SaaS completa para barbearias. Construído com React, PocketBase, Stripe e PWA.\n\nInclui:\n• Agendamento online 24/7\n• Pagamentos recorrentes (3 planos via Stripe)\n• Multi-tenant (cada barbearia tem seu espaço)\n• Chat em tempo real\n• PWA instalável no celular\n• Gestão de equipe com slots extras\n\nDe zero ao deploy em produção. Se quiser algo similar pro seu negócio, me conta.',
    follow: isEn ? 'Want to know how much something similar would cost?' : 'Quer saber quanto custaria algo parecido?',
    offerContact: false,
  }

  // SaaS & Plataformas
  if (lower.match(/saas|plataforma|sistema multi|assinatura recorrente|multi.?tenant|platform/)) return {
    text: isEn
      ? 'A SaaS platform gives customers their own accounts and lets you manage access, subscriptions and payments in one place. We can start with the main workflow and add features as usage grows. BarberBLinders is an example that combines bookings, recurring billing and a team dashboard.'
      : 'Uma plataforma SaaS dá a cada cliente a própria conta e permite gerenciar acessos, assinaturas e pagamentos em um só lugar. Podemos começar pelo fluxo principal e evoluir os recursos conforme o uso. O BarberBLinders, por exemplo, reúne agendamento, cobrança recorrente e painel para a equipe.',
    follow: isEn ? 'Want to describe your idea?' : 'Quer descrever sua ideia?',
    offerContact: false,
  }

  // PWA & Apps
  if (lower.match(/pwa|aplicativo|\bapps?\b|progressive/)) return {
    text: isEn
      ? 'A progressive web app (PWA) opens in the browser and can be added to the home screen on compatible devices. It can keep selected features available offline and send notifications where supported. For example, customers can add BarberBLinders to their home screen for quick access to booking.'
      : 'Um aplicativo web progressivo (PWA) abre no navegador e pode ser adicionado à tela inicial em dispositivos compatíveis. Ele também pode disponibilizar alguns recursos offline e enviar notificações quando houver suporte. No BarberBLinders, por exemplo, o cliente pode adicionar o app à tela inicial para acessar o agendamento rapidamente.',
    follow: isEn ? 'Want to know if PWA makes sense for your project?' : 'Quer saber se PWA faz sentido pro seu projeto?',
    offerContact: false,
  }

  // Igor/portfolio
  if (lower.match(/portfolio|trading|quem.*igor|who.*igor/)) { const d = knowledge.services['igor']; return { text: isEn ? d.answerEn : d.answer, follow: isEn ? d.followEn : d.follow, offerContact: false } }

  // Difference
  if (lower.match(/diferenca|qual a diferenca|comparar|difference|compare/)) {
    const d = knowledge.services['diferença']
    return { text: isEn ? d.answerEn : d.answer, follow: isEn ? d.followEn : d.follow, offerContact: false }
  }

  // Social
  if (lower.match(/instagram|insta/)) return { text: isEn ? 'My Instagram is @igor_works. There you can see projects and send a direct message.' : 'Meu Instagram é @igor_works. Lá você vê os projetos e pode mandar mensagem direta.', follow: null }
  if (lower.match(/github|codigo|repositorio|code|repository/)) return { text: isEn ? 'My GitHub is igorll-fs. The featured project is TradingBot Enterprise — a trading platform with adaptive AI, over 150k lines of code.' : 'Meu GitHub é igorll-fs. O projeto destaque é o TradingBot Enterprise — plataforma de trading com IA adaptativa, mais de 150 mil linhas de código.', follow: null }

  // Contact intent
  if (lower.match(/enviar|mandar|falar|mensagem|contatar|chamar|email|contato|contact|reach|get in touch/)) {
    const d = knowledge.services['contato']
    return { text: isEn ? d.answerEn : d.answer, follow: isEn ? d.followEn : d.follow, offerContact: true }
  }

  // Service overview
  if (lower.match(/servico|oferece|fazem|trabalha|trabalho|empresa|negocio|service|ajud|help|duvida/)) return {
    text: isEn
      ? 'Igor builds professional websites to showcase your business, automations to connect your tools, chatbots for customer support, dashboards to track your metrics, SaaS platforms with accounts and subscriptions, and web apps that customers can install. What would you like to build or improve?'
      : 'O Igor desenvolve sites profissionais para apresentar sua empresa, automações para conectar suas ferramentas, chatbots para atender clientes, dashboards para acompanhar indicadores, plataformas SaaS com contas e assinaturas e aplicativos web instaláveis. O que você quer criar ou melhorar?',
    follow: null,
    offerContact: false,
  }

  const pool = isEn ? knowledge.defaultEn : knowledge.default
  return { text: pool[Math.floor(Math.random() * pool.length)], follow: null }
}

async function getAIResponse(input, lang) {
  try {
    const res = await fetch('https://igor-chat-bot.igorlsdev30.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: input }], lang }),
    })
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    const reply = data.message ?? data.reply
    if (typeof reply !== 'string' || !reply.trim() || /(?:[$€£]|\b(?:BRL|USD|EUR|reais|d[oó]lares|dollars)\b)/i.test(reply)) {
      return getLocalResponse(input, lang)
    }
    return { text: reply, follow: null, offerContact: false }
  } catch {
    return getLocalResponse(input, lang)
  }
}

export default function ChatWidget() {
  const { t, lang } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: t.chat.welcome, follow: null },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showInvite, setShowInvite] = useState(false)
  const [msgCount, setMsgCount] = useState(0)
  const [limitReached, setLimitReached] = useState(false)
  const [showContactOptions, setShowContactOptions] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Listen for service card clicks
  useEffect(() => {
    const handleServiceClick = (e) => {
      const { service } = e.detail
      const servicePrompt = servicePrompts[service]
      const prompt = typeof servicePrompt === 'string' ? servicePrompt : servicePrompt?.[lang]
      if (service === 'Tecnologia' && e.detail.tech) {
        const techPrompt = lang === 'en'
          ? `Explain how ${e.detail.tech} technology works and how it can transform and boost a business. Give practical examples of results.`
          : `Me explique como a tecnologia ${e.detail.tech} funciona e como ela pode transformar e impulsionar um negócio. Dê exemplos práticos de resultados.`
        setIsOpen(true)
        setTimeout(() => {
          setMsgCount(prev => prev + 1)
          setMessages(prev => [...prev, { role: 'user', text: `${lang === 'en' ? 'I want to know about' : 'Quero saber sobre'} ${e.detail.tech}`, follow: null }])
          setIsTyping(true)
          getAIResponse(techPrompt, lang).then(response => {
            setMessages(prev => [...prev, { role: 'bot', text: response.text, follow: response.follow }])
            setIsTyping(false)
            if (response.offerContact) setShowContactOptions(true)
          })
        }, 300)
      } else if (prompt) {
        setIsOpen(true)
        setTimeout(() => {
          setMsgCount(prev => prev + 1)
          setMessages(prev => [...prev, { role: 'user', text: prompt, follow: null }])
          setIsTyping(true)
          getAIResponse(prompt, lang).then(response => {
            setMessages(prev => [...prev, { role: 'bot', text: response.text, follow: response.follow }])
            setIsTyping(false)
            if (response.offerContact) setShowContactOptions(true)
          })
        }, 300)
      }
    }
    window.addEventListener('open-chat-service', handleServiceClick)
    return () => window.removeEventListener('open-chat-service', handleServiceClick)
  }, [lang])

  // Popup invitation
  useEffect(() => {
    const timer = setTimeout(() => { if (!isOpen) setShowInvite(true) }, INVITE_DELAY)
    return () => clearTimeout(timer)
  }, [isOpen])

  useEffect(() => { if (isOpen) setShowInvite(false) }, [isOpen])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])
  useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus() }, [isOpen])

  // Mobile keyboard: adjust chat window when virtual keyboard opens/closes
  useEffect(() => {
    if (!isOpen) return
    const chatWindow = document.querySelector('.chat-window')
    if (!chatWindow) return

    const handleViewportResize = () => {
      const vv = window.visualViewport
      if (!vv) return
      const keyboardHeight = window.innerHeight - vv.height
      if (keyboardHeight > 100) {
        chatWindow.style.bottom = `${keyboardHeight + 8}px`
        chatWindow.style.maxHeight = `${vv.height - 80}px`
      } else {
        chatWindow.style.bottom = ''
        chatWindow.style.maxHeight = ''
      }
    }

    const vv = window.visualViewport
    if (vv) {
      vv.addEventListener('resize', handleViewportResize)
      vv.addEventListener('scroll', handleViewportResize)
    }
    return () => {
      if (vv) {
        vv.removeEventListener('resize', handleViewportResize)
        vv.removeEventListener('scroll', handleViewportResize)
      }
      if (chatWindow) {
        chatWindow.style.bottom = ''
        chatWindow.style.maxHeight = ''
      }
    }
  }, [isOpen])

  const handleSend = useCallback(async () => {
    if (!input.trim() || limitReached) return
    const userMsg = input.trim()
    setInput('')
    setMsgCount(prev => prev + 1)

    if (msgCount + 1 >= MAX_MESSAGES) {
      setLimitReached(true)
      setMessages(prev => [...prev,
        { role: 'user', text: userMsg, follow: null },
        { role: 'bot', text: t.chat.limitMsg, follow: null },
      ])
      return
    }

    if (!isOnTopic(userMsg)) {
      setMessages(prev => [...prev,
        { role: 'user', text: userMsg, follow: null },
        { role: 'bot', text: t.chat.offTopic, follow: null },
      ])
      return
    }

    setMessages(prev => [...prev, { role: 'user', text: userMsg, follow: null }])
    setIsTyping(true)
    const response = await getAIResponse(userMsg, lang)
    setMessages(prev => [...prev, { role: 'bot', text: response.text, follow: response.follow }])
    setIsTyping(false)
    if (response.offerContact) setShowContactOptions(true)
  }, [input, msgCount, limitReached, lang, t])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }, [handleSend])

  const handleContactChoice = useCallback((type) => {
    setShowContactOptions(false)
    if (type === 'instagram') {
      setMessages(prev => [...prev,
        { role: 'bot', text: t.chat.openingInstagram, follow: null },
      ])
      window.open('https://www.instagram.com/igor_works', '_blank')
    } else if (type === 'email') {
      setMessages(prev => [...prev,
        { role: 'bot', text: t.chat.openingEmail, follow: null },
      ])
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=igorlsdev30@gmail.com&subject=Contato%20via%20Portfolio', '_blank')
    }
  }, [t])

  const quickQuestions = t.chat.quickQuestions

  return (
    <>
      {/* Popup invitation */}
      <AnimatePresence>
        {showInvite && !isOpen && (
          <motion.div
            className="chat-invite"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
          >
            <button className="chat-invite__close" onClick={() => setShowInvite(false)}>
              <X size={14} />
            </button>
            <p className="chat-invite__text">
              {t.chat.inviteText}
            </p>
            <button className="chat-invite__btn" onClick={() => { setIsOpen(true); setShowInvite(false); }}>
              {t.chat.inviteBtn}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        className="chat-fab"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          boxShadow: isOpen
            ? '0 8px 30px rgba(232, 185, 49, 0.4)'
            : [
                '0 8px 30px rgba(232, 185, 49, 0.4)',
                '0 12px 50px rgba(232, 185, 49, 0.7)',
                '0 8px 30px rgba(232, 185, 49, 0.4)',
              ],
        }}
        transition={{
          scale: { delay: 1, type: 'spring', stiffness: 200 },
          boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        aria-label={t.chat.inviteBtn}
      >
        {!isOpen && (
          <motion.div
            className="chat-fab__pulse"
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} style={{ position: 'relative' }}>
              <Sparkles size={28} style={{ color: '#0a0a0c' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div className="chat-header">
              <div className="chat-header__info">
                <div className="chat-header__avatar">
                  <Sparkles size={18} style={{ color: '#0a0a0c' }} />
                </div>
                <div>
                  <div className="chat-header__name">{t.chat.headerName}</div>
                  <div className="chat-header__status">{t.chat.headerStatus}</div>
                </div>
              </div>
              <div className="chat-header__right">
                <span className="chat-header__counter">{msgCount}/{MAX_MESSAGES}</span>
                <button className="chat-header__close" onClick={() => setIsOpen(false)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chat-msg ${msg.role === 'user' ? 'chat-msg--user' : 'chat-msg--bot'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {msg.role === 'bot' && (
                    <div className="chat-msg__avatar">
                      <Sparkles size={14} style={{ color: '#e8b931' }} />
                    </div>
                  )}
                  <div className="chat-msg__bubble">
                    <div className="chat-msg__text">{msg.text}</div>
                    {msg.follow && <div className="chat-msg__follow">{msg.follow}</div>}
                  </div>
                </motion.div>
              ))}

              {/* Contact options */}
              {showContactOptions && (
                <motion.div
                  className="chat-contact-options"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="chat-contact-options__label">{t.chat.contactLabel}</p>
                  <div className="chat-contact-options__buttons">
                    <button className="chat-contact-btn chat-contact-btn--instagram" onClick={() => handleContactChoice('instagram')}>
                      <MessageCircle size={16} />
                      <span>{t.chat.contactInstagram}</span>
                    </button>
                    <button className="chat-contact-btn chat-contact-btn--email" onClick={() => handleContactChoice('email')}>
                      <Mail size={16} />
                      <span>{t.chat.contactEmail}</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {isTyping && (
                <motion.div className="chat-msg chat-msg--bot" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="chat-msg__avatar"><Sparkles size={14} style={{ color: '#e8b931' }} /></div>
                  <div className="chat-msg__bubble">
                    <div className="chat-typing"><span /><span /><span /></div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && !limitReached && (
              <div className="chat-quick">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    className="chat-quick__btn"
                    onClick={() => {
                      setInput('')
                      setMsgCount(prev => prev + 1)
                      setMessages(prev => [...prev, { role: 'user', text: q, follow: null }])
                      setIsTyping(true)
                      setTimeout(() => {
                        const response = getLocalResponse(q, lang)
                        setMessages(prev => [...prev, { role: 'bot', text: response.text, follow: response.follow }])
                        setIsTyping(false)
                        if (response.offerContact) setShowContactOptions(true)
                      }, 600 + Math.random() * 800)
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {msgCount >= MAX_MESSAGES - 3 && !limitReached && (
              <motion.div className="chat-warning" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <AlertCircle size={14} />
                <span>{t.chat.warningLeft.replace('{n}', MAX_MESSAGES - msgCount)}</span>
              </motion.div>
            )}

            <div className="chat-input">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={limitReached ? t.chat.limitReached : t.chat.placeholder}
                className="chat-input__field"
                disabled={limitReached}
              />
              <button className="chat-input__send" onClick={handleSend} disabled={!input.trim() || limitReached}>
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
