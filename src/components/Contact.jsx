import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GitFork, ExternalLink, Mail } from 'lucide-react'
import { useLanguage } from '../i18n/context'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { t, lang } = useLanguage()

  const contacts = [
    {
      icon: Mail,
      label: 'igorlsdev30@gmail.com',
      sub: t.contato.email,
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=igorlsdev30@gmail.com&subject=${encodeURIComponent(t.contato.emailSubject)}`,
      color: '#3b82f6',
      bg: 'rgba(59, 130, 246, 0.12)',
    },
    {
      icon: ExternalLink,
      label: '@igor_works',
      sub: t.contato.instagram,
      href: 'https://www.instagram.com/igor_works',
      color: '#e1306c',
      bg: 'rgba(225, 48, 108, 0.12)',
    },
    {
      icon: GitFork,
      label: 'trading-bot',
      sub: t.contato.github,
      href: 'https://github.com/igorll-fs/trading-bot',
      color: '#f0f0f5',
      bg: 'rgba(240, 240, 245, 0.1)',
    },
  ]

  return (
    <section id="contato" className="section-pad bg-section" ref={ref}>
      <div
        className="bg-section__image"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80')",
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
        <div className="orb orb--rose" style={{ width: 350, height: 350, top: '10%', left: '10%' }} />
        <div className="orb orb--gold" style={{ width: 300, height: 300, bottom: '10%', right: '10%' }} />
        <div className="orb orb--violet" style={{ width: 250, height: 250, top: '50%', left: '50%' }} />
      </div>
      <div className="bg-section__noise" />

      <div className="max-content">
        <div className="divider" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">{t.contato.label}</p>
          <h2 className="section-title">{t.contato.title}</h2>
          <p className="section-subtitle">{t.contato.subtitle}</p>
        </motion.div>

        <div className="contact-grid">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            >
              <div className="contact-card__icon" style={{ background: c.bg }}>
                <c.icon size={18} style={{ color: c.color }} />
              </div>
              <div>
                <div className="contact-card__label">{c.label}</div>
                <div className="contact-card__sub">{c.sub}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
