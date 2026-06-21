import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/context'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  const terminalLines = [
    { type: 'prompt', text: t.sobre.terminal.whoami },
    { type: 'output', text: t.sobre.terminal.whoamiOut },
    { type: 'blank' },
    { type: 'prompt', text: t.sobre.terminal.ls },
    ...t.sobre.terminal.lsOut.map(text => ({ type: 'output', text })),
    { type: 'blank' },
    { type: 'prompt', text: t.sobre.terminal.cat },
    ...t.sobre.terminal.catOut.map(text => ({ type: 'output', text })),
    { type: 'cursor' },
  ]

  return (
    <section id="sobre" className="section-pad bg-section" ref={ref}>
      <div
        className="bg-section__image"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1920&q=80')",
          opacity: 0.1,
        }}
      />
      <div
        className="bg-section__gradient"
        style={{
          background: 'linear-gradient(180deg, rgba(5,5,8,0.93) 0%, rgba(5,5,8,0.83) 50%, rgba(5,5,8,0.95) 100%)',
        }}
      />
      <div className="bg-section__orbs">
        <div className="orb orb--gold" style={{ width: 400, height: 400, top: '10%', right: '-5%' }} />
        <div className="orb orb--cyan" style={{ width: 350, height: 350, bottom: '10%', left: '-5%' }} />
      </div>
      <div className="bg-section__noise" />

      <div className="max-content">
        <div className="divider" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">{t.sobre.label}</p>
          <h2 className="section-title">{t.sobre.title}</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about__text"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p>{t.sobre.p1}</p>
            <p>
              <strong>{t.sobre.p2strong}</strong>{t.sobre.p2}
            </p>
            <p>
              <strong>{t.sobre.p3strong}</strong>{t.sobre.p3}
            </p>
            <p>{t.sobre.p4}</p>

            <div className="about__cta">
              <p>{t.sobre.cta}</p>
            </div>

            <div className="about__highlight">
              <p className="about__highlight-label">{t.sobre.stackLabel}</p>
              <div className="about__highlight-tags">
                {['React', 'Node.js', 'Python', 'PostgreSQL', 'PocketBase', 'Stripe'].map((te) => (
                  <span key={te} className="tag">{te}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="terminal"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="terminal__header">
              <div className="terminal__dot terminal__dot--red" />
              <div className="terminal__dot terminal__dot--yellow" />
              <div className="terminal__dot terminal__dot--green" />
              <span className="terminal__title">igor@portfolio ~</span>
            </div>
            <div className="terminal__body">
              {terminalLines.map((line, i) => {
                if (line.type === 'blank') return <div key={i} style={{ height: '0.5rem' }} />
                if (line.type === 'cursor') return <span key={i} className="terminal__cursor" />
                return (
                  <div key={i} className="terminal__line">
                    {line.type === 'prompt' && <span className="terminal__prompt">$ </span>}
                    <span className={line.type === 'output' ? 'terminal__output' : ''}>{line.text}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
