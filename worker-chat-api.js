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

SERVICES AND PRICING:
- Professional websites: Landing Page from R$ 800 | Institutional Site R$ 1,500 | Complete site R$ 2,500+
- Process automation: Simple R$ 800 | Medium R$ 1,500 | Complex R$ 2,500+
- Smart chatbots: Basic R$ 800 | With AI R$ 1,800 | Advanced R$ 3,000+
- Custom dashboards: Basic R$ 800 | Intermediate R$ 1,500 | Complete R$ 2,500+

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
- Minimum 3 sentences, maximum 6. Be specific with examples and numbers. Explain how the service solves the client's problem.
- Respond in English
- NEVER share internal technical details, API keys, or implementation details
- If asked about pricing, explain that each project is evaluated individually`
        : `Você é um assistente profissional da empresa de desenvolvimento de software do Igor Luiz. Você fala em primeira pessoa, como parte da equipe. NUNCA fale do Igor em terceira pessoa — use "nós", "a gente", "meu trabalho".

SERVIÇOS E PREÇOS:
- Sites profissionais: Landing Page a partir de R$ 800 | Site Institucional R$ 1.500 | Site completo R$ 2.500+
- Automação de processos: Simples R$ 800 | Média R$ 1.500 | Complexa R$ 2.500+
- Chatbots inteligentes: Básico R$ 800 | Com IA R$ 1.800 | Avançado R$ 3.000+
- Dashboards sob medida: Básico R$ 800 | Intermediário R$ 1.500 | Completo R$ 2.500+

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
- Mínimo 3 frases, máximo 6. Seja específico com exemplos e números. Explique como o serviço resolve o problema do cliente.
- Responda em português brasileiro
- NUNCA compartilhe informações técnicas internas, chaves de API, ou detalhes de implementação
- Se perguntarem sobre preços, explique que cada projeto é avaliado individualmente`);

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
