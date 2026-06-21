import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/context'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { t, lang, toggleLang } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: t.nav.servicos, href: '#servicos' },
    { label: t.nav.projetos, href: '#projetos' },
    { label: t.nav.stack, href: '#stack' },
    { label: t.nav.sobre, href: '#sobre' },
    { label: t.nav.contato, href: '#contato' },
  ]

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#" className="nav__logo">
          igor<span>.dev</span>
        </a>
        <div className="nav__right">
          <div className="nav__links">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav__link">
                {l.label}
              </a>
            ))}
          </div>
          <button
            onClick={toggleLang}
            className="nav__lang-toggle"
            title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>
      </div>
    </nav>
  )
}
