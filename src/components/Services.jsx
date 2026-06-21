import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Workflow, MessageSquare, BarChart3, Bot, Layers, Smartphone } from 'lucide-react'
import ServiceModal from './ServiceModal'
import { useLanguage } from '../i18n/context'

const serviceIcons = [Globe, Workflow, MessageSquare, BarChart3, Layers, Smartphone]
const serviceMeta = [
  { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.3)', code: true, wide: true },
  { color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.12)', border: 'rgba(167, 139, 250, 0.3)', wide: false },
  { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.3)', wide: false },
  { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)', chart: true, wide: true },
  { color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)', border: 'rgba(236, 72, 153, 0.3)', wide: false },
  { color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.12)', border: 'rgba(6, 182, 212, 0.3)', wide: false },
]

const chartData = [40, 65, 50, 80, 55, 70, 90, 60, 75, 85]

function openChatForService(serviceTitle) {
  window.dispatchEvent(new CustomEvent('open-chat-service', { detail: { service: serviceTitle } }))
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null)
  const { t } = useLanguage()

  const services = t.servicos.items.map((item, i) => ({
    ...item,
    icon: serviceIcons[i],
    ...serviceMeta[i],
  }))

  return (
    <>
      <section id="servicos" className="section-pad bg-section" ref={ref}>
        <div
          className="bg-section__image"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div
          className="bg-section__gradient"
          style={{
            background: 'linear-gradient(180deg, rgba(5,5,8,0.92) 0%, rgba(5,5,8,0.8) 50%, rgba(5,5,8,0.95) 100%)',
          }}
        />
        <div className="bg-section__orbs">
          <div className="orb orb--gold" style={{ width: 400, height: 400, top: '-10%', right: '10%' }} />
          <div className="orb orb--violet" style={{ width: 350, height: 350, bottom: '-10%', left: '5%' }} />
        </div>
        <div className="bg-section__noise" />

        <div className="max-content">
          <div className="divider" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label">{t.servicos.label}</p>
            <h2 className="section-title">{t.servicos.title}</h2>
            <p className="section-subtitle">{t.servicos.subtitle}</p>
          </motion.div>

          <div className="services-grid">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className={`service-card ${s.wide ? 'service-card--wide' : 'service-card--narrow'}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="service-card__header" onClick={() => setSelected(s)} style={{ cursor: 'pointer' }}>
                  <div className="service-card__icon" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                    <s.icon size={22} style={{ color: s.color }} />
                  </div>
                  <h3 className="service-card__title">{s.title}</h3>
                  <p className="service-card__desc">{s.desc}</p>
                  <span className="service-card__saiba-mais" style={{ color: s.color }}>
                    <span className="saiba-mais__line" style={{ background: s.color }} />
                    {t.servicos.saibaMais}
                    <span className="saiba-mais__arrow">→</span>
                  </span>
                </div>

                {s.code && (
                  <div className="service-card__code">
                    <div><span className="ln">1</span>{'<Hero />'}</div>
                    <div><span className="ln">2</span>{'<Features />'}</div>
                    <div><span className="ln">3</span>{'<CTA />'}</div>
                  </div>
                )}

                {s.chart && (
                  <div className="service-card__chart">
                    {chartData.map((h, j) => (
                      <motion.div
                        key={j}
                        className="chart-bar"
                        initial={{ height: 0 }}
                        animate={isInView ? { height: `${h}%` } : {}}
                        transition={{ duration: 0.4, delay: 0.4 + j * 0.04 }}
                      />
                    ))}
                  </div>
                )}

                <button
                  className="service-card__ai-link"
                  onClick={(e) => { e.stopPropagation(); openChatForService(s.title) }}
                >
                  <Bot size={14} />
                  <span>{t.servicos.askAI}</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <ServiceModal service={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
