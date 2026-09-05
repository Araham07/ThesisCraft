import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const MESSAGES = [
  { text: 'Analyzing your skills...', emoji: '🧠' },
  { text: 'Finding project opportunities...', emoji: '🔍' },
  { text: 'Evaluating feasibility...', emoji: '⚖️' },
  { text: 'Building your project blueprint...', emoji: '🏗️' },
  { text: 'Your projects are ready.', emoji: '✨' },
]

const MESSAGE_INTERVAL = 700 // ms per message

export default function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0)
  const [dots, setDots]         = useState(0)

  // Cycle through loading messages
  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => Math.min(i + 1, MESSAGES.length - 1))
    }, MESSAGE_INTERVAL)
    return () => clearInterval(id)
  }, [])

  // Animated ellipsis
  useEffect(() => {
    const id = setInterval(() => setDots((d) => (d + 1) % 4), 350)
    return () => clearInterval(id)
  }, [])

  const progress = Math.round(((msgIndex + 1) / MESSAGES.length) * 100)

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 40,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(99,102,241,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Pulsing logo orb */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 80, height: 80, borderRadius: 24,
          background: 'var(--grad-brand)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 40px var(--brand-glow), 0 0 80px rgba(99,102,241,0.15)',
          position: 'relative', zIndex: 1,
        }}
      >
        <Sparkles size={36} color="#fff" />
      </motion.div>

      {/* Message carousel */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={msgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>
              {MESSAGES[msgIndex].emoji}
            </span>
            <p
              style={{
                fontFamily: 'Outfit', fontWeight: 600,
                fontSize: 'clamp(18px, 3vw, 24px)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              {MESSAGES[msgIndex].text}
              {msgIndex < MESSAGES.length - 1 && (
                <span style={{ color: 'var(--brand-light)' }}>
                  {'.'.repeat(dots)}
                </span>
              )}
            </p>
          </motion.div>
        </AnimatePresence>

        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 8 }}>
          This usually takes a few seconds
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ width: 280, position: 'relative', zIndex: 1 }}>
        <div className="score-bar-track">
          <motion.div
            className="score-bar-fill"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          {MESSAGES.map((_, i) => (
            <div
              key={i}
              style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i <= msgIndex ? 'var(--brand)' : 'var(--border)',
                transition: 'background 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          style={{
            position: 'fixed',
            width: 4, height: 4,
            borderRadius: '50%',
            background: 'var(--brand)',
            opacity: 0.4,
            left: `${15 + i * 14}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 2 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
