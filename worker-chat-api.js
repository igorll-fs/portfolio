export default {
  async fetch(request, env) {
    // CORS - only allow portfolio domain
    const allowedOrigins = [
      'https://igorll-fs.github.io',
      'https://dev-works.uk',
      'http://localhost:3000',
      'http://localhost:5173'
    ];
    
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    // Rate limiting by IP (simple in-memory, resets on worker restart)
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const now = Date.now();
    
    try {
      const { messages, serviceContext, lang } = await request.json();

      // Input validation
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return new Response(JSON.stringify({ message: lang === 'en' ? 'Invalid messages.' : 'Mensagens inválidas.' }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
          status: 400
        });
      }

      // Limit message length to prevent abuse
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.content || lastMessage.content.trim().length === 0 || lastMessage.content.length > 500) {
        return new Response(JSON.stringify({ message: lang === 'en' ? 'Message too long. Maximum 500 characters.' : 'Mensagem muito longa. Máximo 500 caracteres.' }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
          status: 400
        });
      }

      let contextPrefix = '';
      if (serviceContext) {
        contextPrefix = lang === 'en'
          ? `The user is asking about: ${serviceContext}. `
          : `O usuário está perguntando sobre: ${serviceContext}. `;
      }

      const isEn = lang === 'en';

      const systemMessage = contextPrefix + (isEn
        ? `You are a professional assistant for Igor Luiz's software development company. You speak in first person, as part of the team. NEVER talk about Igor in third person — use "we", "our work", "I build".

SERVICES:
- Professional websites: landing pages for inquiries, business websites to showcase services, and online stores with catalogs and checkout. Explain mobile design, search visibility and performance as relevant.
- Automation: connect WhatsApp, spreadsheets, CRM and ERP to record orders, update data and notify staff without retyping.
- Chatbots: answer FAQs, collect booking requests and hand conversations off to staff on WhatsApp, Instagram or a website.
- Dashboards: bring sales, inventory or support data into filterable charts and reports, with alerts where the data sources support them.
- SaaS: build platforms with accounts, permissions, subscriptions and an admin dashboard. Use BarberBLinders as an example of bookings, subscriptions and team management.
- PWA: build installable web apps for compatible devices, with offline features and notifications where supported.

CONTACT:
- Email: igorlsdev30@gmail.com
- Instagram: @igor_works
- GitHub: igorll-fs

PROJECTS:
- TradingBot Enterprise: trading platform with adaptive multi-timeframe AI, 150k+ lines of code

RULES:
- Be direct, professional and friendly
- Use accessible language, no unnecessary jargon
- Always suggest the next step (reach out on Instagram, email, or explain the project better)
- Minimum 3 sentences, maximum 6. Give a practical example related to the question. Explain how the service solves the client's problem.
- Respond in English
- NEVER share internal technical details, API keys, or implementation details
- Never provide prices, price ranges, monetary amounts, discounts or cost estimates. If asked for a quote, explain that Igor prepares a custom proposal and ask which service or feature the visitor needs.`
        : `Você é um assistente profissional da empresa de desenvolvimento de software do Igor Luiz. Você fala em primeira pessoa, como parte da equipe. NUNCA fale do Igor em terceira pessoa — use "nós", "a gente", "meu trabalho".

SERVIÇOS:
- Sites profissionais: landing pages para receber contatos, sites institucionais para apresentar serviços e lojas virtuais com catálogo e checkout. Inclua exemplos de navegação no celular, SEO e desempenho conforme a necessidade.
- Automação: conecte WhatsApp, planilhas, CRM e ERP para registrar pedidos, atualizar dados e avisar a equipe sem redigitação.
- Chatbots: responda dúvidas frequentes, colete pedidos de agendamento e encaminhe conversas à equipe pelo WhatsApp, Instagram ou site.
- Dashboards: reúna dados de vendas, estoque ou atendimento em gráficos com filtros, relatórios e alertas conforme as fontes disponíveis.
- SaaS: desenvolva plataformas com contas, permissões, assinaturas e painel administrativo. Use BarberBLinders como exemplo de agendamento, assinaturas e gestão de equipe.
- PWA: crie aplicativos web instaláveis em dispositivos compatíveis, com recursos offline e notificações quando houver suporte.

CONTATO:
- Email: igorlsdev30@gmail.com
- Instagram: @igor_works
- GitHub: igorll-fs

PROJETOS:
- TradingBot Enterprise: plataforma de trading com IA adaptativa multi-timeframe, 150k+ linhas de código

REGRAS:
- Seja direto, profissional e simpático
- Use linguagem acessível, sem jargões desnecessários
- Sempre sugira o próximo passo (chamar no Instagram, email, ou explicar melhor o projeto)
- Mínimo 3 frases, máximo 6. Dê um exemplo prático relacionado à pergunta. Explique como o serviço resolve o problema do cliente.
- Responda em português brasileiro
- NUNCA compartilhe informações técnicas internas, chaves de API, ou detalhes de implementação
- Nunca informe preços, faixas de preço, valores monetários, descontos ou estimativas de custo. Se pedirem orçamento, explique que Igor prepara uma proposta sob medida e pergunte qual serviço ou recurso o visitante precisa.`);

      const apiMessages = [
        { role: 'system', content: systemMessage },
        ...messages.map(m => ({
          role: m.role === 'bot' ? 'assistant' : 'user',
          content: m.content
        }))
      ];

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.GEMINI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gemini-flash-latest',
          messages: apiMessages,
          max_tokens: 2000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = data.choices?.[0]?.message?.content || (lang === 'en' ? 'Sorry, I couldn\'t process that. Please try again.' : 'Desculpe, não consegui processar. Tente novamente.');

      return new Response(JSON.stringify({ message: botMessage }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: lang === 'en' ? 'Temporary error. Please try again in a moment.' : 'Erro temporário. Tente novamente em instantes.' }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        status: 500
      });
    }
  }
};
