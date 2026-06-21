const en = {
  // Navbar
  nav: {
    servicos: 'Services',
    projetos: 'Projects',
    stack: 'Stack',
    sobre: 'About',
    contato: 'Contact',
  },

  // Hero
  hero: {
    role: 'Full-Stack Developer & Automation',
    desc: 'Websites, automation and systems that actually work. From concept to production, no fluff.',
    oquefaco: 'What I Do',
    meusProjetos: 'My Projects',
    contato: 'Contact',
  },

  // Services
  servicos: {
    label: 'Services',
    title: 'What I do',
    subtitle: 'Click each service to see how it works and how it drives your business.',
    askAI: 'Want to know more? Ask the AI',
    saibaMais: 'Learn more',
    items: [
      {
        title: 'Professional Websites',
        desc: 'Modern React websites with smooth animations and responsive design that convert visitors into customers.',
      },
      {
        title: 'Automation',
        desc: 'Automate orders, registrations, reports and system integrations. Less manual work, more results.',
      },
      {
        title: 'Chatbots',
        desc: 'Smart bots for WhatsApp, Instagram and your website. 24/7 automated support.',
      },
      {
        title: 'Dashboards & Reports',
        desc: 'Real-time dashboards for full business control. Data that drives decisions.',
      },
      {
        title: 'SaaS & Platforms',
        desc: 'Complete SaaS products — multi-tenant, recurring subscriptions, admin panel, production deployment. From zero to launch.',
      },
      {
        title: 'PWA & Apps',
        desc: 'Progressive web apps that install on mobile like native apps. No store, no hassle, no high maintenance costs.',
      },
    ],
  },

  // Projects
  projetos: {
    label: 'Projects',
    title: 'Featured Work',
    subtitle: 'Real solutions, delivered and in production.',
    verProjeto: 'View Project',
    projetoPrivado: 'Private Project',
    verDetalhes: 'View Details',
    items: [
      {
        title: 'TradingBot Enterprise',
        description: 'Autonomous trading bot with adaptive AI — scans the market 24/7, adjusts strategy based on volatility and trades via Kraken. Full pipeline: data collection → ML → decision → execution. In production with active paper trading.',
        features: ['Adaptive AI — self-recalibrates', 'Multi-exchange (Kraken active)', '24/7 monitoring via Telegram', 'Paper trading + live mode', 'ML pipeline with feature engineering'],
        imageAlt: 'Trading terminal with candlestick charts and indicators',
      },
      {
        title: 'BarberBLinders',
        description: 'Multi-tenant SaaS for barbershops — online scheduling, Stripe payments (card + Pix), team management, real-time chat, installable PWA. 3 subscription plans with trial. Completed, deployed to production and available for new clients.',
        features: ['24/7 scheduling with Google OAuth', 'Stripe payments (card + Pix)', 'Multi-tenant — 3 subscription plans', 'PWA — installs on mobile as an app', 'Real-time chat + notifications'],
        imageAlt: 'BarberBLinders — Scheduling and barbershop management panel',
      },
    ],
  },

  // TechStack
  stack: {
    label: 'Stack',
    title: 'Technologies',
    subtitle: 'Click each one for the AI to explain how it can transform your business.',
    items: [
      { label: 'React', desc: 'Modern and responsive interface' },
      { label: 'Node.js', desc: 'Fast and scalable backend' },
      { label: 'Python', desc: 'Automation and artificial intelligence' },
      { label: 'Tailwind', desc: 'Professional and consistent design' },
      { label: 'Framer', desc: 'Smooth and impressive animations' },
      { label: 'PostgreSQL', desc: 'Robust and reliable database' },
      { label: 'Firebase', desc: 'Real-time backend' },
      { label: 'Automation', desc: 'Eliminates manual work' },
    ],
  },

  // Testimonials
  depoimentos: {
    label: 'Results',
    title: 'How we transform businesses',
    subtitle: 'Real results from clients who invested in technology.',
    items: [
      {
        name: 'Carlos M.',
        role: 'Restaurant Owner',
        service: 'Professional Website',
        text: 'Before, I relied only on WhatsApp and lost customers due to slow responses. After the website, online reservations increased 40% in the first month. Customers browse the menu, pick a time and book — without me having to reply.',
        metric: '+40% reservations',
      },
      {
        name: 'Fernanda S.',
        role: 'E-commerce Manager',
        service: 'WhatsApp Chatbot',
        text: 'The bot replies instantly, any time. Answers product questions, shows photos and directs to checkout. Conversion went up 35% because customers don\'t wait anymore — they buy in minutes, not days.',
        metric: '+35% conversion',
      },
      {
        name: 'Roberto A.',
        role: 'Store Owner',
        service: 'Automation',
        text: 'WhatsApp orders go straight to the system. Inventory updates, invoices are generated automatically and customers get confirmation. I save 3 hours a day that I used to spend on manual data entry. Zero errors.',
        metric: '3h/day saved',
      },
      {
        name: 'Juliana P.',
        role: 'Startup CEO',
        service: 'Dashboard',
        text: 'The dashboard shows sales, inventory and performance in real time. I identified products sitting idle that tied up R$ 15k. We liquidated and recovered the capital in 2 weeks. Data-driven decisions, not guesswork.',
        metric: 'R$ 15k recovered',
      },
    ],
  },

  // About
  sobre: {
    label: 'About',
    title: 'Who is Igor',
    p1: 'Full-Stack Developer. I build complete systems from database to production deployment. Featured projects: BarberBLinders — complete SaaS for barbershops, completed and in production; and TradingBot — trading bot with adaptive AI.',
    p2strong: 'BarberBLinders',
    p2: ' — SaaS platform for barbershops with online scheduling, Stripe payments (card + Pix), real-time chat and installable PWA. Multi-tenant with 3 subscription plans, deployed on a dedicated VPS. Completed and in production.',
    p3strong: 'TradingBot',
    p3: ' — autonomous bot with AI that scans the market 24/7 via Kraken, adjusts strategy based on volatility and reports via Telegram. Full pipeline: data collection → feature engineering → ML → execution.',
    p4: 'Stack: React, Node.js, Python, PostgreSQL, PocketBase, Stripe, ccxt, Tailwind, Cloudflare. I integrate payment, messaging and exchange APIs. If the problem involves web systems, automation or data — I solve it.',
    cta: 'Have a project or an idea? Reach out — let\'s talk.',
    stackLabel: 'Core stack',
    terminal: {
      whoami: 'whoami',
      whoamiOut: 'igor — full-stack developer',
      ls: 'ls projects/',
      lsOut: [
        'BarberBLinders/     # Multi-tenant SaaS (Stripe + PWA)',
        'TradingBot/         # AI + ML pipeline (Kraken)',
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
    label: 'Contact',
    title: 'Let\'s talk?',
    subtitle: 'Reach me on Instagram, check out my projects or send an email directly.',
    email: 'Email',
    instagram: 'Instagram',
    github: 'GitHub',
    emailSubject: 'Contact via Portfolio',
  },

  // Footer
  footer: {
    copy: '© 2026 Igor Luiz',
  },

  // ServiceModal
  serviceModal: {
    technicalHow: 'How it works technically',
    businessImpact: 'How it drives your business',
    investment: 'Investment',
    realResult: 'Real result',
    iWantThis: 'I want this',
    sitesProfissionais: {
      subtitle: 'The difference between a website that sells and one nobody visits.',
      whatTitle: 'What is a professional website?',
      whatText: 'A professional website is much more than a pretty page on the internet. It\'s a machine for converting visitors into customers. While a basic website has only static text and images, a professional site uses smooth animations, fluid transitions, micro-interactions and responsive design that adapts perfectly to any screen — mobile, tablet or desktop.',
      diffTitle: 'Basic site vs. Professional site',
      diffItems: [
        { basic: 'Frozen layout, looks like Word', pro: 'Modern design with asymmetric grid and visual hierarchy' },
        { basic: 'No animations, everything static', pro: 'Fluid animations that guide the visitor\'s eye' },
        { basic: 'Breaks on mobile', pro: 'Responsive — works perfectly on any screen' },
        { basic: 'Doesn\'t show on Google', pro: 'SEO optimized — appears in search results' },
        { basic: 'Slow, loads in 5s+', pro: 'Fast — loads in under 2 seconds' },
        { basic: 'No conversion, just informational', pro: 'Strategic CTAs that guide the customer to action' },
      ],
      how: 'A professional website is built with modern technologies like React, which enables dynamic and fast interfaces. Animations are made with libraries like Framer Motion, creating smooth page transitions, parallax effects, cards that react to hover and elements that appear as you scroll. Responsive design uses CSS Grid and Flexbox to automatically reorganize the layout on smaller screens.',
      benefits: [
        'First impression — 94% of first impressions are about design',
        'Conversion — professional websites convert 200% more than basic ones',
        'SEO — appears on Google and attracts organic customers',
        'Mobile — 70% of traffic comes from mobile devices',
      ],
      pricingTiers: [
        { name: 'Landing Page', price: 'R$ 800', desc: 'Single page, responsive, with contact form' },
        { name: 'Institutional Site', price: 'R$ 1,500', desc: 'Up to 5 pages, animations, basic SEO' },
        { name: 'Complete Site', price: 'R$ 2,500+', desc: 'Unlimited pages, advanced animations, blog, integrations' },
      ],
      result: 'A restaurant that only had Instagram created a professional website with online reservations. In the first month, reservations increased 40% — customers who used to give up due to slow responses now book directly on the site.',
    },
    automacao: {
      subtitle: 'Turn hours of manual work into automatic seconds.',
      whatTitle: 'What is automation?',
      whatText: 'Automation uses software to execute repetitive tasks you do manually every day. Instead of copying data between spreadsheets, answering the same WhatsApp question 50 times, or generating reports by hand — a system does it all automatically, without errors, without fatigue, 24 hours a day.',
      diffTitle: 'Manual work vs. Automation',
      diffItems: [
        { basic: 'Copy data between spreadsheets', pro: 'Automatic sync between systems' },
        { basic: 'Reply to WhatsApp one by one', pro: 'Automatic replies + smart chatbot' },
        { basic: 'Generate reports every week', pro: 'Reports generated and sent automatically' },
        { basic: 'Check inventory manually', pro: 'Automatic alerts when stock is low' },
        { basic: 'Send invoices by email', pro: 'Automatic billing with reminders' },
        { basic: 'Enter orders by hand', pro: 'Orders go straight to the system' },
      ],
      how: 'Automation works by connecting different systems through APIs and webhooks. For example: when a customer places a WhatsApp order, the bot detects it, extracts the information, registers it in the inventory system, generates the invoice and sends confirmation — all in seconds, without human intervention.',
      benefits: [
        'Time savings — hour-long processes become seconds',
        'Zero errors — automation doesn\'t err, forget or get tired',
        'Scalability — grow without hiring more staff',
        'Speed — instant responses for customers',
      ],
      pricingTiers: [
        { name: 'Simple Automation', price: 'R$ 800', desc: 'One integration (e.g. WhatsApp → spreadsheet)' },
        { name: 'Medium Automation', price: 'R$ 1,500', desc: '2-3 integrations, conditional logic' },
        { name: 'Complex Automation', price: 'R$ 2,500+', desc: 'Multiple systems, AI, advanced flows' },
      ],
      result: 'A clothing store automated the flow: WhatsApp → inventory → invoice → shipping. Before, they spent 3 hours a day entering orders. Now it\'s zero — the system does everything. Data entry errors eliminated and orders processed in seconds.',
    },
    chatbots: {
      subtitle: 'Smart support that never sleeps and never loses a customer.',
      whatTitle: 'What is a chatbot?',
      whatText: 'A chatbot is an AI program that talks to your customers automatically — via WhatsApp, Instagram, website or any platform. It understands questions, answers doubts, schedules appointments, shows products and when it doesn\'t know something, transfers to a human. All this 24/7.',
      diffTitle: 'Human support vs. Chatbot',
      diffItems: [
        { basic: 'Responds in minutes or hours', pro: 'Responds in seconds, any time' },
        { basic: 'Handles 1 customer at a time', pro: 'Handles 10,000 customers simultaneously' },
        { basic: 'Gets tired, makes mistakes, forgets', pro: 'Never makes mistakes, never tires, never forgets' },
        { basic: 'Needs to train employees', pro: 'Configure once, works forever' },
        { basic: 'High staffing costs', pro: 'One-time development cost' },
        { basic: 'Business hours only', pro: '24/7 — weekends and holidays' },
      ],
      how: 'The chatbot uses AI (NLP — Natural Language Processing) that understands what the customer wants even with typos, slang or indirect questions. It connects with WhatsApp Business API, Instagram API or is embedded in the website. It can integrate with CRM, scheduling systems and payments.',
      benefits: [
        'Instant support — responses in 2 seconds',
        'Infinite scale — serves all customers at once',
        'More sales — answers questions before customers give up',
        'Consistency — same quality of service always',
      ],
      pricingTiers: [
        { name: 'Basic Chatbot', price: 'R$ 800', desc: 'Pre-defined responses, 1 platform' },
        { name: 'AI Chatbot', price: 'R$ 1,800', desc: 'AI to understand questions, 2 platforms' },
        { name: 'Advanced Chatbot', price: 'R$ 3,000+', desc: 'AI + CRM + scheduling + payments' },
      ],
      result: 'A clothing e-commerce implemented a WhatsApp chatbot. Before, 40% of customers gave up due to slow responses. With the bot, conversion increased 35% — customers get answers and buy in minutes, not days.',
    },
    dashboards: {
      subtitle: 'Turn raw data into decisions that generate profit.',
      whatTitle: 'What is a dashboard?',
      whatText: 'A dashboard is a visual screen that shows all your business metrics in one place, with charts, numbers and indicators updated in real time. Instead of opening 5 different spreadsheets, you see everything at a glance — sales, inventory, customers, team, cash flow.',
      diffTitle: 'Spreadsheets vs. Professional Dashboard',
      diffItems: [
        { basic: 'Data scattered across spreadsheets', pro: 'Everything centralized on one screen' },
        { basic: 'Manual update every week', pro: 'Real-time data, updated automatically' },
        { basic: 'Basic Excel charts', pro: 'Interactive charts with filters and drill-down' },
        { basic: 'Needs someone to analyze', pro: 'Visual indicators — green/yellow/red' },
        { basic: 'No mobile access', pro: 'Access from anywhere, even your phone' },
        { basic: 'Export and email', pro: 'Automatic reports via email/PDF' },
      ],
      how: 'A professional dashboard is built with React and chart libraries that enable interactive visualizations. It connects to any data source: databases, APIs, Google Sheets, ERPs. Data is updated in real time via WebSockets or automatic polling.',
      benefits: [
        'Clear vision — important metrics in one place',
        'Fast decisions — real-time data lets you react before losing money',
        'Identify opportunities — spot trends and patterns hidden in data',
        'Total control — monitor every area of the business',
      ],
      pricingTiers: [
        { name: 'Basic Dashboard', price: 'R$ 800', desc: 'Simple charts, 1 data source' },
        { name: 'Intermediate Dashboard', price: 'R$ 1,500', desc: 'Multiple charts, filters, export' },
        { name: 'Complete Dashboard', price: 'R$ 2,500+', desc: 'Real-time, multiple sources, automatic alerts' },
      ],
      result: 'A delivery startup used a dashboard to analyze sales. They discovered 3 products represented 80% of dead stock. They liquidated and recovered R$ 15k in 2 weeks — money that was stuck in unsold inventory.',
    },
    saas: {
      subtitle: 'SaaS products that generate recurring revenue — from concept to deploy.',
      whatTitle: 'What is SaaS?',
      whatText: 'SaaS (Software as a Service) is a digital product your customers access via the internet and pay a monthly subscription for. It has user registration, admin panel, recurring payments, multiple plans and needs to work 24/7.',
      diffTitle: 'Common website vs. SaaS Platform',
      diffItems: [
        { basic: 'Deliver once and done', pro: 'Recurring revenue every month' },
        { basic: 'No login or registration', pro: 'Multi-tenant with authentication and profiles' },
        { basic: 'No integrated payments', pro: 'Stripe with subscriptions, plans and auto-billing' },
        { basic: 'Change everything manually', pro: 'Admin panel for client self-management' },
        { basic: 'Doesn\'t scale', pro: 'Serves 1 or 10,000 customers on the same system' },
        { basic: 'No continuous updates', pro: 'Continuous deployment, constant improvements' },
      ],
      how: 'A SaaS is built with multi-tenant architecture — each customer has isolated data. Frontend in React with protected routes. Backend with PocketBase, Node.js or Python, JWT authentication, and Stripe for recurring subscriptions.',
      benefits: [
        'Recurring revenue — money comes in every month automatically',
        'Multi-tenant — one system serves N customers',
        'Isolated data — each customer sees only their own',
        'Scalable — grows without rewriting code',
      ],
      pricingTiers: [
        { name: 'MVP / Prototype', price: 'R$ 3,000', desc: 'Essential features, 1-2 roles, basic deploy' },
        { name: 'Intermediate SaaS', price: 'R$ 6,000', desc: 'Multi-tenant, Stripe, admin panel, 3+ roles' },
        { name: 'Complete SaaS', price: 'R$ 12,000+', desc: 'All above + chat, notifications, analytics, PWA' },
      ],
      result: 'BarberBLinders — a SaaS platform for barbershops built from scratch. Multi-tenant with 3 subscription plans, online scheduling, team management, real-time chat, recurring Stripe payments and installable PWA. In production, serving real customers.',
    },
    pwa: {
      subtitle: 'Installable mobile app without a store, without hassle.',
      whatTitle: 'What is a PWA?',
      whatText: 'PWA (Progressive Web App) is a web app that installs directly on the phone — just like a native app, with a home screen icon, works offline and opens in full screen. No App Store or Google Play needed.',
      diffTitle: 'Native app vs. PWA',
      diffItems: [
        { basic: 'Needs App Store / Play Store', pro: 'Installs directly from browser, no store' },
        { basic: 'Heavy download (50-200MB)', pro: 'Lightweight — loads in seconds' },
        { basic: 'High cost (R$ 15k-50k+)', pro: '70% cheaper than native app' },
        { basic: 'Needs 2 versions (iOS + Android)', pro: 'One version works everywhere' },
        { basic: 'Updates need approval', pro: 'Updates automatically' },
        { basic: 'No offline access', pro: 'Works offline with smart caching' },
      ],
      how: 'A PWA uses Service Worker (offline cache), Web App Manifest (configures installation) and HTTPS (security). Push notifications work via Web Push API — users receive notifications even with the app closed.',
      benefits: [
        'Installable — home screen icon like a native app',
        'Fast — loads in under 2 seconds',
        'Universal — works on any phone with a browser',
        'Engagement — push notifications re-engage users',
      ],
      pricingTiers: [
        { name: 'Basic PWA', price: 'R$ 1,500', desc: 'Manifest + Service Worker + offline cache' },
        { name: 'Intermediate PWA', price: 'R$ 2,500', desc: 'Push notifications + splash screen + install prompt' },
        { name: 'Complete PWA', price: 'R$ 4,000+', desc: 'Advanced offline + background sync + integrations' },
      ],
      result: 'BarberBLinders is a PWA — barbershop customers installed the app on their phones without needing an App Store. Scheduling works offline and push notifications remind customers of their appointments. Reuse rate increased 60%.',
    },
    pricingNote: 'Final price depends on complexity. Request a personalized quote.',
  },

  // ChatWidget UI
  chat: {
    headerName: 'Igor.dev Assistant',
    headerStatus: 'Online',
    welcome: 'Hi! I\'m the igor.dev assistant. I can help you with information about our services, pricing and timelines. What would you like to know?',
    placeholder: 'Type your question...',
    limitReached: 'Limit reached',
    inviteText: '👋 Need help? Click here to ask about our services!',
    inviteBtn: 'Chat now',
    quickQuestions: [
      'I want a professional website',
      'How much does a chatbot cost?',
      'How does automation work?',
      'Talk to Igor',
    ],
    limitMsg: 'You\'ve reached the message limit. To continue the conversation, reach me on Instagram @igor_works or by email igorlsdev30@gmail.com',
    offTopic: 'I\'m focused on helping with our services. Ask about professional websites, automation, chatbots, dashboards, pricing or timelines!',
    warningLeft: '{n} messages remaining',
    contactLabel: 'Want me to send a message to Igor?',
    contactInstagram: 'Instagram DM',
    contactEmail: 'Send Email',
    openingInstagram: 'Opening Igor\'s Instagram... @igor_works',
    openingEmail: 'Opening your email to get in touch...',
  },
}

export default en
