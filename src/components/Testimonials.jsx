import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useLanguage } from '../i18n/context'

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  const testimonials = t.depoimentos.items.map(item => ({
    ...item,
    stars: 5,
  }))

  return (
    <section id="depoimentos" className="section-pad bg-section" ref={ref}>
      <div
        className="bg-section__image"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80')",
          opacity: 0.06,
        }}
      />
      <div
        className="bg-section__gradient"
        style={{
          background: 'linear-gradient(180deg, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.88) 50%, rgba(5,5,8,0.95) 100%)',
        }}
      />
      <div className="bg-section__orbs">
        <div className="orb orb--gold" style={{ width: 300, height: 300, top: '10%', right: '5%' }} />
        <div className="orb orb--cyan" style={{ width: 250, height: 250, bottom: '10%', left: '5%' }} />
      </div>
      <div className="bg-section__noise" />

      <div className="max-content">
        <div className="divider" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">{t.depoimentos.label}</p>
          <h2 className="section-title">{t.depoimentos.title}</h2>
          <p className="section-subtitle">{t.depoimentos.subtitle}</p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((te, i) => (
            <motion.div
              key={te.name}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <div className="testimonial-card__header">
                <Quote size={20} className="testimonial-card__quote" />
                <div className="testimonial-card__stars">
                  {Array.from({ length: te.stars }).map((_, j) => (
                    <Star key={j} size={14} fill="#e8b931" color="#e8b931" />
                  ))}
                </div>
              </div>

              <p className="testimonial-card__text">{te.text}</p>

              <div className="testimonial-card__metric">
                {te.metric}
              </div>

              <div className="testimonial-card__footer">
                <div className="testimonial-card__avatar">
                  {te.name.charAt(0)}
                </div>
                <div>
                  <div className="testimonial-card__name">{te.name}</div>
                  <div className="testimonial-card__role">{te.role}</div>
                </div>
                <span className="testimonial-card__service">{te.service}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
