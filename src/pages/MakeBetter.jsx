import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────────
   UPGRADE ENGINE
───────────────────────────────────────────────── */
const DEMOS = {
  attendance: {
    beforeCat: 'CRUD APPLICATION', beforeTitle: 'Attendance Management System',
    beforeDesc: 'Ordinary database app with basic manual faculty entry, simple login forms, and monthly CSV exports.',
    beforeBad: ['Zero real-time data streaming','Standard boilerplate database queries','Minimal engineering resume differentiation'],
    afterCat: 'PREDICTIVE RETENTION ANALYTICS', afterTitle: 'ATTENDANCE INTELLIGENCE',
    afterDesc: 'AI-powered attendance and student-risk telemetry using sequential temporal neural models to catch retention anomalies weeks prior to dropouts.',
    afterGood: ['Sequential temporal attendance forecasting','At-risk student early warning algorithm','Interactive Dean\'s executive retention dashboard','Automated engagement alert webhooks'],
  },
  library: {
    beforeCat: 'BASIC RECORD MANAGEMENT', beforeTitle: 'Library Book Circulation System',
    beforeDesc: 'Basic table of titles, barcode string lookup, and check-in/check-out timestamps with elementary pagination.',
    beforeBad: ['Static keyword SQL searches only','No contextual semantic recommendation','Cloned repeatedly in academic cohorts'],
    afterCat: 'GRAPH DATA PLATFORM', afterTitle: 'SCHOLARGRAPH NEXUS',
    afterDesc: 'Semantic research knowledge graph engine connecting syllabi with multi-disciplinary papers, vector citation clustering, and latent curriculum gaps.',
    afterGood: ['Neo4j multi-relational academic paper graph','Semantic vector search via pgvector & embeddings','Automated syllabus citation gap detector','Interactive force-directed thesis explorer'],
  },
  ecommerce: {
    beforeCat: 'STANDARD STOREFRONT', beforeTitle: 'Online Shopping Portal',
    beforeDesc: 'Static product catalog with Stripe checkout integration and ordinary relational inventory counting.',
    beforeBad: ['Standard off-the-shelf template structure','No automated price intelligence','Zero algorithmic challenge'],
    afterCat: 'HIGH-FREQUENCY MARKETPLACE ENGINE', afterTitle: 'NEXUSDYNAMIC PRICING & FRAUD PIPELINE',
    afterDesc: 'Real-time multi-tenant marketplace with reinforcement learning dynamic pricing curves and streaming fraud detection.',
    afterGood: ['Q-Learning dynamic inventory price optimizer','Event streaming fraud detection via Apache Kafka','Distributed order lock consensus with Redis Redlock','Real-time P99 latency monitoring telemetry'],
  },
}

function getUpgrade(input) {
  const lower = input.toLowerCase()
  if (lower.includes('attendance')) return DEMOS.attendance
  if (lower.includes('library'))    return DEMOS.library
  if (lower.includes('ecommerce') || lower.includes('shop') || lower.includes('store')) return DEMOS.ecommerce
  const base = input.replace(/\s+(system|app|website|platform|project|tool)$/i,'').trim()
  return {
    beforeCat: 'BASELINE CONCEPT', beforeTitle: input.trim(),
    beforeDesc: `A standard academic implementation of ${input.toLowerCase()} with basic CRUD functionality and minimal algorithmic depth.`,
    beforeBad: ['Standard boilerplate structure','No AI or advanced analytics','Weak differentiation from peer submissions'],
    afterCat: 'INTELLIGENCE PLATFORM', afterTitle: `${base.toUpperCase()} INTELLIGENCE`,
    afterDesc: `An AI-powered evolution of ${input.toLowerCase()} — generating actionable insights, automating decisions, and delivering measurable value beyond simple data management.`,
    afterGood: ['AI-powered predictive analytics pipeline','Natural language query interface','Real-time streaming dashboard with alerts','Automated report generation and delivery'],
  }
}

function NavBar({ navigate }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(18,19,20,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #25272a' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/')} className="headline-sm" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-bone)', display: 'flex', alignItems: 'center', gap: 8, textTransform: 'uppercase' }}>
          <div style={{ width: 28, height: 28, background: 'var(--accent)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#0B0D0E' }}>auto_awesome</span>
          </div>
          THESISCRAFT
        </button>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_back</span>
            Back
          </button>
          <button onClick={() => navigate('/profile')} className="btn btn-secondary btn-sm">Build from scratch</button>
        </div>
      </div>
    </header>
  )
}

export default function MakeBetter() {
  const navigate = useNavigate()
  const [input,    setInput]   = useState('')
  const [status,   setStatus]  = useState('idle')
  const [result,   setResult]  = useState(null)
  const [msgIdx,   setMsgIdx]  = useState(0)
  const [activeDemo, setActiveDemo] = useState('attendance')

  const LOAD_MSGS = ['Reading your project concept...','Identifying upgrade opportunities...','Generating advanced features...','Finalising your improved concept...']

  const handleUpgrade = async () => {
    if (!input.trim()) return
    setStatus('loading'); setMsgIdx(0)
    for (let i = 1; i < LOAD_MSGS.length; i++) {
      await new Promise(r => setTimeout(r, 550))
      setMsgIdx(i)
    }
    await new Promise(r => setTimeout(r, 400))
    setResult(getUpgrade(input.trim()))
    setStatus('done')
  }

  const demo = DEMOS[activeDemo]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)' }}>
      <NavBar navigate={navigate} />

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 32px 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 56px' }}>
          <span className="section-number" style={{ display: 'block', marginBottom: 10 }}>ELEVATION STUDIO</span>
          <h1 className="display-lg" style={{ color: 'var(--text-bone)', marginBottom: 16 }}>Already have an idea?</h1>
          <p className="body-lg text-cement" style={{ lineHeight: 1.7 }}>
            Turn an ordinary, predictable academic requirement into something that commands attention from professors and interviewers alike.
          </p>
        </div>

        {/* Demo switcher tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', padding: 4, background: 'var(--surface-card)', border: '1px solid var(--border)', gap: 4 }}>
            {[['attendance','Attendance System'],['library','Library Management'],['ecommerce','E-Commerce Store']].map(([key, label]) => (
              <button key={key} onClick={() => setActiveDemo(key)} className="label-code"
                style={{
                  padding: '8px 16px', cursor: 'pointer', borderRadius: 2,
                  border: `1px solid ${activeDemo === key ? 'var(--border-active)' : 'transparent'}`,
                  background: activeDemo === key ? 'var(--surface-hi)' : 'transparent',
                  color: activeDemo === key ? 'var(--text-bone)' : 'var(--text-cement)',
                  fontWeight: activeDemo === key ? 600 : 500, transition: 'all 0.15s',
                }}
              >{label}</button>
            ))}
          </div>
        </div>

        {/* Elevation canvas */}
        <div style={{ background: '#0e0f11', border: '1px solid var(--border)', padding: '32px 40px', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'center' }} className="elevation-grid">

            {/* BEFORE */}
            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)' }}>
              <div style={{ padding: '8px 20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                <span className="label-index text-cement" style={{ textTransform: 'uppercase' }}>BASELINE ACADEMIC CONCEPT</span>
                <span className="label-code" style={{ color: '#f87171', fontWeight: 600 }}>C-TIER PROPOSAL</span>
              </div>
              <div style={{ padding: 24 }}>
                <span className="label-code text-charcoal" style={{ textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{demo.beforeCat}</span>
                <h3 className="headline-md" style={{ marginBottom: 10, fontWeight: 600 }}>{demo.beforeTitle}</h3>
                <p className="body-md text-cement" style={{ lineHeight: 1.7, marginBottom: 20 }}>{demo.beforeDesc}</p>
                <div style={{ paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {demo.beforeBad.map(item => (
                    <div key={item} className="label-code" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-cement)' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#f87171' }}>close</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bolt */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,216,254,0.25)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#0B0D0E' }}>bolt</span>
              </div>
              <span className="label-index text-accent" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>ELEVATE →</span>
            </div>

            {/* AFTER */}
            <div style={{ background: '#1e2024', border: '1px solid rgba(0,216,254,0.35)' }}>
              <div style={{ padding: '8px 20px', background: 'rgba(0,216,254,0.08)', borderBottom: '1px solid rgba(0,216,254,0.2)', display: 'flex', justifyContent: 'space-between' }}>
                <span className="label-index" style={{ fontWeight: 700, textTransform: 'uppercase' }}>THESISCRAFT RE-ENGINEERED</span>
                <span className="label-code text-accent" style={{ fontWeight: 700 }}>A+ THESIS TIER</span>
              </div>
              <div style={{ padding: 24 }}>
                <span className="label-code text-accent" style={{ textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{demo.afterCat}</span>
                <h3 className="headline-md" style={{ marginBottom: 10, fontWeight: 600 }}>{demo.afterTitle}</h3>
                <p className="body-md text-cement" style={{ lineHeight: 1.7, marginBottom: 20 }}>{demo.afterDesc}</p>
                <div style={{ paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {demo.afterGood.map(item => (
                    <div key={item} className="label-code" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="material-symbols-outlined text-accent" style={{ fontSize: 18 }}>check_circle</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CUSTOM INPUT SANDBOX ── */}
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <span className="material-symbols-outlined text-accent" style={{ fontSize: 20 }}>transform</span>
              <span className="label-index" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Paste Your Current Idea</span>
            </div>

            <AnimatePresence mode="wait">
              {/* Idle */}
              {status === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleUpgrade() } }}
                    placeholder='"Attendance Management System", "Online Shopping Website", "Student Grade Tracker"...'
                    rows={3}
                    className="form-input"
                    style={{ marginBottom: 16 }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <span className="label-code text-cement">Press Enter to upgrade · No API key needed</span>
                    <button
                      onClick={handleUpgrade}
                      disabled={!input.trim()}
                      className="btn btn-primary"
                    >
                      Paste Your Current Idea
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>transform</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Loading */}
              {status === 'loading' && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '32px 0' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    style={{ width: 40, height: 40, border: '2px solid var(--border)', borderTop: '2px solid var(--accent)', borderRadius: '50%', margin: '0 auto 20px' }} />
                  <AnimatePresence mode="wait">
                    <motion.p key={msgIdx}
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      className="headline-sm" style={{ color: 'var(--text-bone)', marginBottom: 6 }}>
                      {LOAD_MSGS[msgIdx]}
                    </motion.p>
                  </AnimatePresence>
                  <span className="label-code text-cement">AI is crafting your elevation...</span>
                </motion.div>
              )}

              {/* Result */}
              {status === 'done' && result && (
                <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  {/* Before → After */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ padding: '12px 14px', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}>
                      <p className="label-index text-cement" style={{ marginBottom: 4, textTransform: 'uppercase' }}>Before</p>
                      <p className="body-md" style={{ color: 'var(--text-cement)', textDecoration: 'line-through' }}>{result.beforeTitle}</p>
                    </div>
                    <motion.div animate={{ x: [0,6,0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <span className="material-symbols-outlined text-accent" style={{ fontSize: 24 }}>bolt</span>
                    </motion.div>
                    <div style={{ padding: '12px 14px', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', textAlign: 'center' }}>
                      <p className="label-index text-accent" style={{ marginBottom: 4, textTransform: 'uppercase' }}>After</p>
                      <p className="body-md" style={{ fontWeight: 600, color: 'var(--text-bone)' }}>{result.afterTitle}</p>
                    </div>
                  </div>

                  <div style={{ padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: 16 }}>
                    <p className="label-index text-cement" style={{ marginBottom: 6, textTransform: 'uppercase' }}>Re-engineered as</p>
                    <p className="body-md text-cement" style={{ lineHeight: 1.7, fontStyle: 'italic' }}>"{result.afterDesc}"</p>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <p className="label-index text-cement" style={{ textTransform: 'uppercase', marginBottom: 10 }}>Features Added</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {result.afterGood.map(f => (
                        <div key={f} className="label-code" style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <span className="material-symbols-outlined text-accent" style={{ fontSize: 16, flexShrink: 0 }}>check_circle</span>
                          <span style={{ color: 'var(--text-bone)' }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button onClick={() => navigate('/profile')} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                      Build This Project
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                    </button>
                    <button onClick={() => { setStatus('idle'); setInput(''); setResult(null) }} className="btn btn-secondary">
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>refresh</span>
                      Try Another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 1024px) { .elevation-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
