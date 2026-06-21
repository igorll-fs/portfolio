import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, TrendingUp, Clock, Users, Zap, Shield, Eye, Smartphone, Globe, DollarSign } from 'lucide-react'
import { useLanguage } from '../i18n/context'

const benefitIcons = [Eye, TrendingUp, Globe, Smartphone, Clock, Shield, Users, Zap]

// Map service title to translation key
const titleToKey = {
  'Sites Profissionais': 'sitesProfissionais',
  'Professional Websites': 'sitesProfissionais',
  'Automação': 'automacao',
  'Automation': 'automacao',
  'Chatbots': 'chatbots',
  'Painéis & Relatórios': 'dashboards',
  'Dashboards & Reports': 'dashboards',
  'SaaS & Plataformas': 'saas',
  'SaaS & Platforms': 'saas',
  'PWA & Apps': 'pwa',
}

export default function ServiceModal({ service, onClose }) {
  const { t } = useLanguage()
  const key = titleToKey[service.title]
  if (!key) return null

  const details = t.serviceModal[key]
  if (!details) return null

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal__close" onClick={onClose}>
            <X size={20} />
          </button>

          <div className="modal__header" style={{ borderColor: service.border }}>
            <div className="modal__icon" style={{ background: service.bg, border: `1px solid ${service.border}` }}>
              <service.icon size={28} style={{ color: service.color }} />
            </div>
            <div>
              <h3 className="modal__title">{service.title}</h3>
              <p className="modal__subtitle">{details.subtitle}</p>
            </div>
          </div>

          {/* O que é */}
          <div className="modal__section">
            <h4 className="modal__label">{details.whatTitle}</h4>
            <p className="modal__text">{details.whatText}</p>
          </div>

          {/* Diferença */}
          <div className="modal__section">
            <h4 className="modal__label">{details.diffTitle}</h4>
            <div className="modal__comparison">
              {details.diffItems.map((item, i) => (
                <div key={i} className="modal__comparison-row">
                  <div className="modal__comparison-basic">
                    <span className="modal__comparison-x">✕</span>
                    <span>{item.basic}</span>
                  </div>
                  <div className="modal__comparison-pro">
                    <span className="modal__comparison-check">✓</span>
                    <span>{item.pro}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Como funciona */}
          <div className="modal__section">
            <h4 className="modal__label">{t.serviceModal.technicalHow}</h4>
            <p className="modal__text">{details.how}</p>
          </div>

          {/* Benefícios */}
          <div className="modal__section">
            <h4 className="modal__label">{t.serviceModal.businessImpact}</h4>
            <div className="modal__benefits">
              {details.benefits.map((b, i) => {
                const Icon = benefitIcons[i % benefitIcons.length]
                return (
                  <div key={i} className="modal__benefit">
                    <Icon size={18} style={{ color: service.color, flexShrink: 0 }} />
                    <span>{b}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Preços */}
          <div className="modal__section">
            <h4 className="modal__label">
              <DollarSign size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
              {' '}{t.serviceModal.investment}
            </h4>
            <div className="modal__pricing">
              {details.pricingTiers.map((tier, i) => (
                <div key={i} className="modal__pricing-tier">
                  <div className="modal__pricing-header">
                    <span className="modal__pricing-name">{tier.name}</span>
                    <span className="modal__pricing-price">{tier.price}</span>
                  </div>
                  <p className="modal__pricing-desc">{tier.desc}</p>
                </div>
              ))}
            </div>
            <p className="modal__pricing-note">{t.serviceModal.pricingNote}</p>
          </div>

          {/* Resultado */}
          <div className="modal__section">
            <h4 className="modal__label">{t.serviceModal.realResult}</h4>
            <p className="modal__result">{details.result}</p>
          </div>

          <a href="#contato" onClick={onClose} className="btn btn--primary modal__cta">
            {t.serviceModal.iWantThis} <ArrowRight size={16} />
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
