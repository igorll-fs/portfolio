// Cloudflare Worker — Gemini API Proxy for Igor.dev Chat

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    let isEn = false
    try {
      const { message, messages, lang } = await request.json()
      const question = message ?? messages?.at(-1)?.content
      isEn = lang === 'en'
      if (typeof question !== 'string' || !question.trim() || question.length > 500) {
        return Response.json(
          { reply: isEn ? 'Please send a message of up to 500 characters.' : 'Envie uma mensagem de até 500 caracteres.' },
          { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
        )
      }

      // Topic filter
      const allowedTopics = [
        'serviço', 'servico', 'site', 'sites', 'web', 'landing', 'página', 'pagina',
        'automação', 'automacao', 'automatizar', 'bot', 'chatbot', 'whatsapp', 'instagram',
        'dashboard', 'painel', 'relatório', 'relatorio', 'dados', 'métricas', 'metricas',
        'preço', 'preco', 'valor', 'quanto', 'custa', 'orçamento', 'orcamento',
        'prazo', 'tempo', 'demora', 'entrega', 'rápido', 'rapido',
        'tecnologia', 'tecnologias', 'react', 'python', 'node', 'api', 'tailwind', 'framer',
        'postgresql', 'firebase', 'mongo', 'fastapi', 'express',
        'igor', 'igor_works', 'portfolio', 'portfólio', 'projeto', 'projetos', 'trading',
        'contato', 'email', 'github', 'linkedin',
        'diferença', 'diferenca', 'qual', 'como', 'por que', 'porque',
        'empresa', 'negócio', 'negocio', 'cliente', 'crescer', 'crescimento',
        'ia', 'inteligência', 'inteligencia', 'artificial', 'machine learning',
        'sistema', 'plataforma', 'software', 'aplicativo', 'app',
        'enviar', 'mandar', 'falar', 'mensagem', 'contatar', 'chamar',
        'oi', 'olá', 'ola', 'hello', 'hi', 'bom dia', 'boa tarde', 'boa noite',
        'obrigado', 'obrigada', 'valeu', 'thanks', 'quero', 'gostei', 'interessado',
        'saas', 'pwa', 'website', 'automation', 'report', 'platform', 'service',
        'pricing', 'price', 'cost', 'quote', 'contact', 'schedule', 'how', 'help',
      ]

      const normalized = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      const isOnTopic = allowedTopics.some(t => normalized.includes(t.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))

      if (!isOnTopic) {
        return Response.json(
          { reply: isEn
            ? 'Ask me about professional websites, automation, chatbots, dashboards, SaaS platforms or apps.'
            : 'Pergunte sobre sites profissionais, automação, chatbots, dashboards, plataformas SaaS ou aplicativos.' },
          { headers: { 'Access-Control-Allow-Origin': '*' } }
        )
      }

      // Call Gemini API
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: `Você é o assistente do portfólio de Igor Luiz. Explique como os serviços se encaixam na rotina ou no projeto do visitante. Responda em ${isEn ? 'inglês' : 'português brasileiro'}.

SERVIÇOS:
- Sites profissionais: landing pages para receber contatos, sites institucionais para apresentar serviços e lojas virtuais com catálogo e checkout. Inclua exemplos de navegação no celular, SEO e desempenho conforme a necessidade.
- Automação: conecte WhatsApp, planilhas, CRM e ERP para registrar pedidos, atualizar dados e avisar a equipe sem redigitação.
- Chatbots: responda dúvidas frequentes, colete pedidos de agendamento e encaminhe conversas à equipe pelo WhatsApp, Instagram ou site.
- Dashboards: reúna dados de vendas, estoque ou atendimento em gráficos com filtros, relatórios e alertas conforme as fontes disponíveis.
- SaaS: desenvolva plataformas com contas, permissões, assinaturas e painel administrativo. Use BarberBLinders como exemplo de agendamento, assinaturas e gestão de equipe.
- PWA: crie aplicativos web instaláveis em dispositivos compatíveis, com recursos offline e notificações quando houver suporte.

TECNOLOGIAS (explique como cada uma transforma negócios):
- React: Interfaces modernas e rápidas que impressionam clientes e convertem mais
- Node.js: Backend escalável que suporta crescimento sem travar
- Python: Automação inteligente que elimina tarefas repetitivas
- Tailwind: Design profissional consistente que transmite credibilidade
- Framer: Animações que impressionam e retêm atenção do cliente
- PostgreSQL: Banco de dados robusto que nunca perde dados
- Firebase: Funcionalidades em tempo real (chat, notificações)
- Automação: Conecta sistemas e elimina trabalho manual

CONTATO:
- Email: igorlsdev30@gmail.com
- Instagram: @igor_works
- GitHub: github.com/igorll-fs/trading-bot

PROJETOS:
- TradingBot Enterprise: sistema de trading com IA, 109 testes, em produção

REGRAS DE RESPOSTA:
- Nunca informe preços, faixas de preço, valores monetários, descontos ou estimativas de custo. Se pedirem orçamento, explique que Igor prepara uma proposta sob medida e pergunte qual serviço ou recurso o visitante precisa.
- Use um exemplo prático relacionado à pergunta. Descreva resultados possíveis e evite inventar métricas ou garantias.
- Responda em até seis frases curtas e termine com uma pergunta específica sobre o projeto.
- Se o visitante quiser orçamento ou contato, ofereça Instagram ou e-mail.
- Se o assunto fugir do portfólio, redirecione para os serviços.`
            }]
          },
          contents: [{ role: 'user', parts: [{ text: question }] }],
          generationConfig: {
            maxOutputTokens: 2000,
            temperature: 0.7,
          }
        }),
      })

      if (!response.ok) throw new Error('Gemini request failed')
      const data = await response.json()
      const reply = data.candidates?.[0]?.content?.parts?.map(part => part.text ?? '').join('').trim()
      if (!reply || /(?:[$€£]|\b(?:BRL|USD|EUR|reais|d[oó]lares|dollars)\b)/i.test(reply)) {
        throw new Error('Gemini response unavailable')
      }

      return Response.json(
        { reply, message: reply },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    } catch {
      return Response.json(
        { reply: isEn ? 'Please try again in a moment.' : 'Tente novamente em instantes.' },
        { status: 502, headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    }
  },
}
