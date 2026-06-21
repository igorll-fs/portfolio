import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/context'

const techIcons = ['⚛️', '🟢', '🐍', '🎨', '⚡', '🐘', '🔥', '🤖']

function openTechChat(techLabel) {
  window.dispatchEvent(new CustomEvent('open-chat-service', { 
    detail: { service: 'Tecnologia', tech: techLabel } 
  }))
}

export default function TechStack() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  const techs = t.stack.items.map((item, i) => ({
    ...item,
    icon: techIcons[i],
  }))

  return (
    <section id="stack" className="section-pad bg-section" ref={ref}>
      <div
        className="bg-section__image"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=1920&q=80')",
          opacity: 0.08,
        }}
      />
      <div
        className="bg-section__gradient"
        style={{
          background: 'linear-gradient(180deg, rgba(5,5,8,0.94) 0%, rgba(5,5,8,0.85) 50%, rgba(5,5,8,0.95) 100%)',
        }}
      />
      <div className="bg-section__orbs">
        <div className="orb orb--emerald" style={{ width: 350, height: 350, top: '-10%', left: '20%' }} />
        <div className="orb orb--violet" style={{ width: 300, height: 300, bottom: '-10%', right: '10%' }} />
      </div>
      <div className="bg-section__noise" />

      <div className="max-content">
        <div className="divider" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">{t.stack.label}</p>
          <h2 className="section-title">{t.stack.title}</h2>
          <p className="section-subtitle">{t.stack.subtitle}</p>
        </motion.div>

        <div className="tech-grid">
          {techs.map((te, i) => (
            <motion.button
              key={te.label}
              className="tech-item"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              onClick={() => openTechChat(te.label)}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="tech-item__icon">{te.icon}</span>
              <span className="tech-item__label">{te.label}</span>
              <span className="tech-item__desc">{te.desc}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
