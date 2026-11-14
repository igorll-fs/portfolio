export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    try {
      const { messages, serviceContext } = await request.json();

      let contextPrefix = '';
      if (serviceContext) {
        contextPrefix = `O usuário está perguntando sobre: ${serviceContext}. `;
      }

      const systemMessage = contextPrefix + `Você é um assistente profissional da empresa de desenvolvimento de software do Igor Luiz. Você fala em primeira pessoa, como parte da equipe. NUNCA fale do Igor em terceira pessoa — use "nós", "a gente", "meu trabalho".

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
- Nunca informe preços, faixas de preço, valores monetários, descontos ou estimativas de custo. Se pedirem orçamento, explique que Igor prepara uma proposta sob medida e pergunte qual serviço ou recurso o visitante precisa.
- Seja direto, profissional e simpático
- Use linguagem acessível, sem jargões desnecessários
- Sempre sugira o próximo passo (chamar no Instagram, email, ou explicar melhor o projeto)
- Máximo 2-3 frases por resposta
- Responda em português brasileiro`;

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
          max_tokens: 200,
          temperature: 0.7
        })
      });

      const data = await response.json();
      const botMessage = data.choices?.[0]?.message?.content || 'Desculpe, não consegui processar. Tente novamente.';

      return new Response(JSON.stringify({ message: botMessage }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Erro temporário. Tente novamente em instantes.', error: error.message }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        status: 500
      });
    }
  }
};
