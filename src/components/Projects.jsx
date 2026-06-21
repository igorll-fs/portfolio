import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GitFork, Lock } from 'lucide-react'
import { useLanguage } from '../i18n/context'

const projectMeta = [
  {
    num: '01',
    tech: ['Python', 'ccxt', 'Kraken API', 'Scikit-Learn', 'SQLite', 'Telegram Bot'],
    link: 'https://github.com/igorll-fs/trading-bot',
    detailsLink: '/bottrading.html',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '02',
    tech: ['React', 'PocketBase', 'Stripe', 'Tailwind', 'PWA', 'Caddy', 'Cloudflare'],
    link: null,
    detailsLink: '/barberblinders.html',
    image: '/barberblinders-screenshot.jpg',
    reverse: true,
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  const projects = t.projetos.items.map((item, i) => ({
    ...item,
    ...projectMeta[i],
  }))

  return (
    <section id="projetos" className="section-pad bg-section" ref={ref}>
      <div
        className="bg-section__image"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80')",
          opacity: 0.1,
        }}
      />
      <div
        className="bg-section__gradient"
        style={{
          background: 'linear-gradient(180deg, rgba(5,5,8,0.93) 0%, rgba(5,5,8,0.82) 50%, rgba(5,5,8,0.95) 100%)',
        }}
      />
      <div className="bg-section__orbs">
        <div className="orb orb--cyan" style={{ width: 400, height: 400, top: '20%', left: '-5%' }} />
        <div className="orb orb--rose" style={{ width: 350, height: 350, bottom: '10%', right: '-5%' }} />
        <div className="orb orb--gold" style={{ width: 250, height: 250, top: '50%', right: '30%' }} />
      </div>
      <div className="bg-section__noise" />

      <div className="max-content">
        <div className="divider" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">{t.projetos.label}</p>
          <h2 className="section-title">{t.projetos.title}</h2>
          <p className="section-subtitle">{t.projetos.subtitle}</p>
        </motion.div>

        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            className={`project ${p.reverse ? 'project--reverse' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
          >
            <div className="project__image">
              <img src={p.image} alt={p.imageAlt} loading="lazy" />
            </div>

            <div>
              <p className="project__number">{p.num}</p>
              <h3 className="project__title">{p.title}</h3>
              <p className="project__desc">{p.description}</p>

              <ul className="project__features">
                {p.features.map((f) => (
                  <li key={f} className="project__feature">
                    <span className="project__feature-dot" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="project__tags">
                {p.tech.map((te) => (
                  <span key={te} className="tag">{te}</span>
                ))}
              </div>

              {p.detailsLink && (
                <a href={p.detailsLink} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                  {t.projetos.verDetalhes}
                </a>
              )}
              {p.link ? (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  <GitFork size={16} /> {t.projetos.verProjeto}
                </a>
              ) : (
                <span className="btn btn--ghost" style={{ cursor: 'default', opacity: 0.6 }}>
                  <Lock size={16} /> {t.projetos.projetoPrivado}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
