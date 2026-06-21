import { createContext, useContext, useState, useEffect } from 'react'
import pt from './pt'
import en from './en'

const translations = { pt, en }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang')
    if (saved && translations[saved]) return saved
    // Detect browser language
    const browserLang = navigator.language?.slice(0, 2)
    return browserLang === 'pt' ? 'pt' : 'en'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const t = translations[lang]
  const toggleLang = () => setLang(prev => prev === 'pt' ? 'en' : 'pt')

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
