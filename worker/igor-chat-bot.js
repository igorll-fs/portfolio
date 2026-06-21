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

    try {
      const { message } = await request.json()

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
      ]

      const normalized = message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      const isOnTopic = allowedTopics.some(t => normalized.includes(t.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))

      if (!isOnTopic) {
        return Response.json(
          { reply: 'Sou focado em ajudar com os serviços do Igor. Pergunte sobre sites, automação, chatbots, dashboards, preços ou prazos!' },
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
          contents: [{
            parts: [{
              text: `Você é o assistente de vendas do portfolio de Igor Luiz, desenvolvedor Full-Stack. Seu objetivo é CONVENCER o visitante a contratar os serviços.

SERVIÇOS (sempre enfatize benefícios e resultados):
1. SITES PROFISSIONAIS (a partir de R$ 800, 2-4 semanas)
   - Landing Page: R$ 800 | Site Institucional: R$ 1.500 | Completo: R$ 2.500+
   - Tecnologia: React, Tailwind, Framer Motion, SEO
   - Benefícios: Credibilidade instantânea, clientes 24/7, aparece no Google, converte visitantes em clientes
   - Resultado real: Restaurante teve +40% em reservas online no 1º mês
   
2. AUTOMAÇÃO (a partir de R$ 800, 1-2 semanas)
   - Simples: R$ 800 | Média: R$ 1.500 | Complexa: R$ 2.500+
   - Tecnologia: Python, APIs, webhooks, integrações
   - Benefícios: Elimina trabalho manual, reduz erros a zero, economiza horas por dia
   - Resultado real: Loja cortou 3h/dia de cadastro manual, erros zerados
   
3. CHATBOTS (a partir de R$ 800, 2-3 semanas)
   - Básico: R$ 800 | Com IA: R$ 1.800 | Avançado: R$ 3.000+
   - Tecnologia: IA, WhatsApp API, Instagram API, NLP
   - Benefícios: Atendimento 24/7, respostas instantâneas, escala ilimitada, nunca perde cliente
   - Resultado real: E-commerce aumentou conversão em 35%
   
4. DASHBOARDS (a partir de R$ 800, 2-3 semanas)
   - Básico: R$ 800 | Intermediário: R$ 1.500 | Completo: R$ 2.500+
   - Tecnologia: React, gráficos interativos, tempo real
   - Benefícios: Visão clara do negócio, decisões baseadas em dados, controle total
   - Resultado real: Startup identificou estoque parado e recuperou R$ 15k

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

PERGUNTA DO USUÁRIO: ${message}

REGRAS DE RESPOSTA:
- SEMPRE explique como o serviço/tecnologia pode IMPULSIONAR o negócio do cliente
- Use exemplos reais de resultados (números concretos)
- Seja persuasivo mas não agressivo
- Respostas em até 6 frases curtas e diretas
- Termine sempre convidando ação: "Quer isso pro seu negócio? Me chama no Instagram @igor_works ou email igorlsdev30@gmail.com"
- Se fora do assunto, redirecione gentilmente para os serviços`
            }]
          }],
          generationConfig: {
            maxOutputTokens: 2000,
            temperature: 0.7,
          }
        }),
      })

      const data = await response.json()
      let reply = 'Desculpe, não consegui processar. Tente novamente ou me chama no Instagram @igor_works'
      
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        reply = data.candidates[0].content.parts[0].text
      }

      return Response.json(
        { reply },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    } catch (err) {
      return Response.json(
        { reply: 'Erro temporário. Tente novamente ou me chama no Instagram @igor_works' },
        { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    }
  },
}
