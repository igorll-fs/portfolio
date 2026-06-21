import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MouseFollower from './components/MouseFollower'
import Security from './components/Security'
import ChatWidget from './components/ChatWidget'
import { trackPageView } from './analytics'
import { useEffect, useState } from 'react'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import { LanguageProvider } from './i18n/context'

export default function App() {
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    trackPageView();
    // Secret: Ctrl+Shift+A opens analytics dashboard
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowStats(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (showStats) return <AnalyticsDashboard onClose={() => setShowStats(false)} />;

  return (
    <LanguageProvider>
      <div>
        <Security />
        <MouseFollower />
        <Navbar />
        <Hero />
        <Services />
        <Projects />
        <TechStack />
        <Testimonials />
        <About />
        <Contact />
        <Footer />
        <ChatWidget />
      </div>
    </LanguageProvider>
  )
}
