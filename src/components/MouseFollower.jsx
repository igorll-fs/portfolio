import { useState, useEffect, useRef } from 'react'

export default function MouseFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)
  const rafRef = useRef(null)
  const trailRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    const onOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('btn') ||
        target.classList.contains('service-card') ||
        target.classList.contains('tech-item') ||
        target.classList.contains('contact-card')
      ) {
        setHovering(true)
      }
    }

    const onOut = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('btn') ||
        target.classList.contains('service-card') ||
        target.classList.contains('tech-item') ||
        target.classList.contains('contact-card')
      ) {
        setHovering(false)
      }
    }

    // Smooth trail animation
    const animate = () => {
      trailRef.current.x += (pos.x - trailRef.current.x) * 0.15
      trailRef.current.y += (pos.y - trailRef.current.y) * 0.15
      setTrail({ x: trailRef.current.x, y: trailRef.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [pos.x, pos.y])

  return (
    <>
      {/* Spotlight glow that follows cursor */}
      <div
        style={{
          position: 'fixed',
          left: pos.x - 200,
          top: pos.y - 200,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232, 185, 49, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: clicking ? 'transform 0.1s' : 'none',
          transform: clicking ? 'scale(0.9)' : 'scale(1)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Trailing dot */}
      <div
        style={{
          position: 'fixed',
          left: trail.x - 12,
          top: trail.y - 12,
          width: 24,
          height: 24,
          borderRadius: '50%',
          border: '1.5px solid rgba(232, 185, 49, 0.4)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: hovering ? 'transform 0.2s, border-color 0.2s' : 'transform 0.2s',
          transform: hovering ? 'scale(2)' : clicking ? 'scale(0.8)' : 'scale(1)',
          borderColor: hovering ? 'rgba(232, 185, 49, 0.7)' : 'rgba(232, 185, 49, 0.4)',
        }}
      />

      {/* Center dot */}
      <div
        style={{
          position: 'fixed',
          left: pos.x - 3,
          top: pos.y - 3,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#e8b931',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: hovering ? 0 : 1,
          transition: 'opacity 0.15s',
        }}
      />

      {/* Hide default cursor on desktop */}
      <style>{`
        @media (min-width: 769px) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  )
}
