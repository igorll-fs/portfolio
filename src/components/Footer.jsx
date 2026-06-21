import { GitFork, ExternalLink } from 'lucide-react'
import { useLanguage } from '../i18n/context'

const links = [
  { icon: ExternalLink, href: 'https://www.instagram.com/igor_works', label: 'Instagram' },
  { icon: GitFork, href: 'https://github.com/igorll-fs/trading-bot', label: 'GitHub' },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">{t.footer.copy}</p>
        <div className="footer__links">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
              aria-label={l.label}
            >
              <l.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
