import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, GitFork } from 'lucide-react'
import { useLanguage } from '../i18n/context'

const viewportOnce = { once: true, margin: '-80px' }

const projectMeta = [
  {
    id: 'barberblinders',
    tech: ['React', 'PocketBase', 'Stripe', 'Tailwind', 'PWA', 'Caddy', 'Cloudflare'],
    siteLink: 'https://barberblinders.com',
    detailsLink: '/barberblinders.html',
    image: '/barberblinders-screenshot.jpg',
  },
  {
    id: 'tradingBot',
    tech: ['Python', 'ccxt', 'Kraken API', 'Scikit-Learn', 'SQLite', 'Telegram Bot'],
    link: 'https://github.com/igorll-fs/trading-bot',
    detailsLink: '/bottrading.html',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Parallax only on the featured showcase image layer (transform, no layout shift).
  const showcaseY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [28, -28])
  const { t } = useLanguage()
  const projects = projectMeta.map((meta) => ({ ...t.projetos.items[meta.id], ...meta }))

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
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          <p className="section-label">{t.projetos.label}</p>
          <h2 className="section-title">{t.projetos.title}</h2>
          <p className="section-subtitle">{t.projetos.subtitle}</p>
        </motion.div>

        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            className={`project${i === 0 ? ' project--featured' : ''}`}
            aria-labelledby={`project-${project.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.15 + i * 0.15 }}
          >
            <motion.div className="project__image" style={{ y: i === 0 ? showcaseY : undefined }}>
              <img src={project.image} alt={project.imageAlt} loading="lazy" />
            </motion.div>

            <div>
              <h3 id={`project-${project.id}`} className="project__title">{project.title}</h3>
              <p className="project__desc">{project.description}</p>

              <ul className="project__features">
                {project.features.map((f) => (
                  <li key={f} className="project__feature">
                    <span className="project__feature-dot" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="project__tags">
                {project.tech.map((te) => (
                  <span key={te} className="tag">{te}</span>
                ))}
              </div>

              <div className="project__actions">
                <a href={project.siteLink ?? project.link} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  {project.siteLink ? <ArrowUpRight size={16} aria-hidden="true" /> : <GitFork size={16} aria-hidden="true" />}
                  {project.siteLink ? t.projetos.acessarSite : t.projetos.verProjeto}
                </a>
                <a href={project.detailsLink} className="btn btn--ghost">
                  {t.projetos.verDetalhes}
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
