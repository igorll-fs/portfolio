import { useEffect } from 'react'

export default function Security() {
  useEffect(() => {
    // 1. Disable right-click context menu
    const onContext = (e) => {
      e.preventDefault()
      return false
    }

    // 2. Disable DevTools shortcuts & view-source
    const onKey = (e) => {
      // F12, Ctrl+Shift+I/J/C/K, Ctrl+U, Ctrl+S
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c', 'K', 'k'].includes(e.key)) ||
        (e.ctrlKey && ['u', 'U', 's', 'S'].includes(e.key))
      ) {
        e.preventDefault()
        return false
      }
    }

    // 3. Disable drag on images
    const onDrag = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault()
        return false
      }
    }

    // 4. Anti-iframe embedding (clickjacking)
    if (window.self !== window.top) {
      window.top.location = window.self.location
    }

    // 5. Console warning + clear
    const style = [
      'color: #e8b931',
      'background: #0a0a0c',
      'font-size: 16px',
      'font-weight: bold',
      'padding: 8px 16px',
      'border: 1px solid #e8b931',
    ].join(';')
    console.clear()
    console.warn('%c⚠️ Esta página é protegida. Não cole código aqui.', style)

    // 6. Periodic console clear (every 3s)
    const interval = setInterval(() => {
      console.clear()
    }, 3000)

    document.addEventListener('contextmenu', onContext)
    document.addEventListener('keydown', onKey)
    document.addEventListener('dragstart', onDrag)

    return () => {
      document.removeEventListener('contextmenu', onContext)
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('dragstart', onDrag)
      clearInterval(interval)
    }
  }, [])

  return null
}
