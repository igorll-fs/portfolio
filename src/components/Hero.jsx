import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/context'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="hero">
      <div className="hero__bg-image" />
      <div className="hero__gradient" />

      <div className="hero__orbs">
        <div className="orb orb--gold" style={{ width: 500, height: 500, top: '5%', right: '-5%' }} />
        <div className="orb orb--violet" style={{ width: 400, height: 400, bottom: '5%', left: '-5%' }} />
        <div className="orb orb--cyan" style={{ width: 300, height: 300, top: '40%', left: '30%' }} />
      </div>

      <div className="hero__grid" />
      <div className="hero__noise" />

      <div className="hero__content">
        <motion.p
          className="hero__role"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          {t.hero.role}
        </motion.p>

        <motion.h1
          className="hero__name"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          igor_works
        </motion.h1>

        <motion.p
          className="hero__desc"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          className="hero__actions"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          <a href="#servicos" className="btn btn--primary">{t.hero.oquefaco}</a>
          <a href="#projetos" className="btn btn--ghost">{t.hero.meusProjetos}</a>
          <a href="#contato" className="btn btn--ghost">{t.hero.contato}</a>
        </motion.div>
      </div>
    </section>
  )
}
