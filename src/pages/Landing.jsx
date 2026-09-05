import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────
   SHARED STYLES
───────────────────────────────────────────────── */
const S = {
  section: { width: '100%', borderBottom: '1px solid var(--border)', position: 'relative' },
  container: { maxWidth: 1280, margin: '0 auto', padding: '0 var(--margin-page)' },
  card: {
    background: 'var(--surface-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--r-xs)',
    transition: 'border-color 0.15s ease',
  },
  tag: (text) => (
    <span className="label-index reg-tag">{text}</span>
  ),
  sectionNum: (text) => (
    <span className="section-number" style={{ display: 'block', marginBottom: 6 }}>{text}</span>
  ),
}

/* How it works data */
const HOW_STEPS = [
  {
    num: '01', icon: 'tune',
    title: 'Tell us what you know.',
    desc: 'Input your existing tech stack, comfort level, and academic requirements without pretending to know tools you have never deployed.',
    stage: 'STAGE: INGESTION',
  },
  {
    num: '02', icon: 'analytics',
    title: 'Get ideas matched to you.',
    desc: 'Our model benchmarks engineering feasibility, technical novelty, and university defense criteria to discard trivial clones.',
    stage: 'STAGE: EVALUATION',
  },
  {
    num: '03', icon: 'check_circle',
    title: 'Choose a project.',
    desc: 'Select a project that genuinely excites you, backed by concrete portfolio marketability and realistic execution curves.',
    stage: 'STAGE: SELECTION',
  },
  {
    num: '04', icon: 'terminal',
    title: 'Follow your blueprint.',
    desc: 'Execute with step-by-step modular architectures, database schemas, API specs, and rigorous weekly milestone roadmaps.',
    stage: 'STAGE: RUNTIME',
  },
]

/* Elevation demos */
const ELEVATION_DEMOS = {
  attendance: {
    beforeCat: 'CRUD APPLICATION',
    beforeTitle: 'Attendance Management System',
    beforeDesc: 'Ordinary database app with basic manual faculty entry, simple login forms, and monthly CSV exports. Fails to demonstrate algorithmic complexity.',
    beforeBad: ['Zero real-time data streaming', 'Standard boilerplate database queries', 'Minimal engineering resume differentiation'],
    afterCat: 'PREDICTIVE RETENTION ANALYTICS',
    afterTitle: 'ATTENDANCE INTELLIGENCE',
    afterDesc: 'AI-powered attendance and student-risk telemetry using sequential temporal neural models to catch retention anomalies weeks prior to dropouts.',
    afterGood: ['Sequential temporal attendance forecasting', 'At-risk student early warning algorithm', 'Interactive Dean\'s executive retention dashboard', 'Automated engagement alert webhooks'],
  },
  library: {
    beforeCat: 'BASIC RECORD MANAGEMENT',
    beforeTitle: 'Library Book Circulation System',
    beforeDesc: 'Basic table of titles, barcode string lookup, and check-in/check-out timestamps with elementary pagination. Standard textbook sample app.',
    beforeBad: ['Static keyword SQL searches only', 'No contextual semantic recommendation', 'Cloned repeatedly in academic cohorts'],
    afterCat: 'GRAPH DATA PLATFORM',
    afterTitle: 'SCHOLARGRAPH NEXUS',
    afterDesc: 'Semantic research knowledge graph engine connecting syllabi with multi-disciplinary papers, vector citation clustering, and latent curriculum gaps.',
    afterGood: ['Neo4j multi-relational academic paper graph', 'Semantic vector search via pgvector & embeddings', 'Automated syllabus citation gap detector', 'Interactive force-directed thesis explorer'],
  },
  ecommerce: {
    beforeCat: 'STANDARD STOREFRONT',
    beforeTitle: 'Online Shopping Portal',
    beforeDesc: 'Static product catalog with Stripe checkout integration and ordinary relational inventory counting. Lacks technical ambition or algorithmic nuance.',
    beforeBad: ['Standard off-the-shelf template structure', 'No automated price intelligence', 'Zero algorithmic challenge'],
    afterCat: 'HIGH-FREQUENCY MARKETPLACE ENGINE',
    afterTitle: 'NEXUSDYNAMIC PRICING & FRAUD PIPELINE',
    afterDesc: 'Real-time multi-tenant marketplace with reinforcement learning dynamic pricing curves and streaming graph-based card checkout anomaly detection.',
    afterGood: ['Q-Learning dynamic inventory price optimizer', 'Event streaming fraud detection via Apache Kafka', 'Distributed order lock consensus with Redis Redlock', 'Real-time P99 latency monitoring telemetry'],
  },
}

/* ─────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────── */
export default function Landing() {
  const navigate = useNavigate()
  const [activeDemo, setActiveDemo] = React.useState('attendance')
  const demo = ELEVATION_DEMOS[activeDemo]

  return (
    <div style={{ backgroundColor: 'var(--surface)', minHeight: '100vh' }}>

      {/* ── NAVBAR ── */}
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        background: 'rgba(18,19,20,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #25272a',
      }}>
        <div style={{ ...S.container, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={() => navigate('/')}
              className="headline-sm"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-bone)', display: 'flex', alignItems: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '-0.01em' }}
            >
              <div style={{ width: 28, height: 28, background: 'var(--accent)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#0B0D0E' }}>auto_awesome</span>
              </div>
              THESISCRAFT
            </button>
            <span className="label-index" style={{ padding: '2px 6px', background: 'var(--surface-hi)', color: 'var(--text-cement)', border: '1px solid var(--border)', textTransform: 'uppercase' }}>
              EDITION 2026
            </span>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {[['How it Works','#how-it-works'],['Features','#input-engine'],['Examples','#results-preview'],['Blueprint','#blueprint-preview']].map(([label, href]) => (
              <a key={label} href={href} className="nav-link body-md" style={{ display: 'none' }}>
                {label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => navigate('/make-better')}
              className="btn btn-ghost btn-sm"
            >
              Make Better
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="btn btn-primary"
              style={{ letterSpacing: '0.08em' }}
            >
              Start Building
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
            </button>
          </div>
        </div>
      </header>

      <main style={{ paddingTop: 64 }}>

        {/* ─────────────────────────────────────────────
            01 // HERO
        ───────────────────────────────────────────── */}
        <section style={{ ...S.section, background: '#0e0f11', paddingBottom: 72 }}>
          {/* Dot grid */}
          <div className="dot-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

          <div style={{ ...S.container, paddingTop: 48, position: 'relative', zIndex: 1 }}>
            {/* Registration tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <span className="label-index reg-tag">[ 01 / ARCHITECTURE ]</span>
              <div style={{ width: 32, height: 1, background: 'var(--border-active)' }} />
              <span className="label-code text-cement" style={{ textTransform: 'uppercase' }}>AI Project Architect • University Studio Engine</span>
            </div>

            {/* 7/5 asymmetric grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 32, alignItems: 'start' }} className="hero-grid">

              {/* LEFT: Headline + CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <h1 className="display-lg" style={{ color: 'var(--text-bone)', marginBottom: 20 }}>
                    Turn your skills into{' '}
                    <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)', position: 'relative' }}>
                      something worth building.
                      <span style={{ position: 'absolute', left: 0, bottom: 4, width: '100%', height: 2, background: 'rgba(0,216,254,0.3)' }} />
                    </span>
                  </h1>
                  <p className="body-lg" style={{ color: 'var(--text-cement)', maxWidth: 520, lineHeight: 1.75 }}>
                    ThesisCraft helps final-year students discover practical, high-caliber project concepts calibrated to their current stack, research domain, and submission timeline — then converts ideas into complete technical blueprints.
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} style={{ marginTop: 48 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <button
                      onClick={() => navigate('/profile')}
                      className="btn btn-primary btn-xl"
                    >
                      <span>Start Building</span>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(11,13,14,0.6)' }} />
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                    </button>
                    <a href="#how-it-works" className="body-md" style={{ color: 'var(--text-bone)', textDecoration: 'underline', textUnderlineOffset: 8, textDecorationColor: 'var(--border-active)', padding: '12px 12px', transition: 'text-decoration-color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.textDecorationColor = 'var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.textDecorationColor = 'var(--border-active)'}
                    >
                      See How It Works
                    </a>
                  </div>

                  {/* Micro-guarantees */}
                  <div className="label-code" style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: '6px 16px', color: 'var(--text-cement)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)', flexShrink: 0 }} /> No signup required
                    </span>
                    <span style={{ color: 'var(--border-active)' }}>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} /> Personalized by AI
                    </span>
                    <span style={{ color: 'var(--border-active)' }}>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-secondary)', flexShrink: 0 }} /> Open Source Stacks
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT: Spec Sheet Card */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
                <div style={{ ...S.card, boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-active)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  {/* Card header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                    <span className="label-index text-cement">SPEC SHEET // ARCH-924</span>
                    <span className="label-code" style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--accent-bright)' }}>
                      <span className="animate-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-bright)' }} />
                      ACTIVE PROTOTYPE
                    </span>
                  </div>

                  <div style={{ padding: 20 }}>
                    {/* Project name + score */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                      <div>
                        <h3 className="headline-md" style={{ fontWeight: 600 }}>FINsight AI</h3>
                        <p className="body-md text-cement" style={{ marginTop: 2 }}>AI-powered financial decision & risk assistant</p>
                      </div>
                      <div className="label-code" style={{ padding: '2px 8px', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', color: 'var(--accent-bright)', fontWeight: 600, borderRadius: 2, flexShrink: 0 }}>
                        92 / 100
                      </div>
                    </div>

                    {/* Score matrix */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: 12, background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: 16 }}>
                      {[['SKILL MATCH','92%','var(--accent)'],['INNOVATION','88%','var(--color-secondary)'],['FEASIBILITY','94%','var(--color-success)']].map(([label,val,color]) => (
                        <div key={label} className="metric-cell">
                          <span className="metric-label">{label}</span>
                          <span className="headline-sm" style={{ color: 'var(--text-bone)', fontWeight: 600, marginTop: 2 }}>{val}</span>
                          <div className="score-track"><div className="score-fill" style={{ width: val, background: color }} /></div>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div style={{ marginBottom: 16 }}>
                      <span className="label-index text-cement" style={{ display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Recommended Tech Stack</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {['React','Python','FastAPI','PostgreSQL'].map(t => (
                          <span key={t} className="label-code" style={{ padding: '4px 8px', background: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: 2, color: 'var(--text-bone)' }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Checklist */}
                    <div style={{ padding: 12, background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {['Calibrated directly to your Python & React skills','Realistic 3-month milestone delivery cadence','Institutional thesis & portfolio market tier 1'].map(item => (
                        <div key={item} className="body-md" style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <span className="material-symbols-outlined text-accent" style={{ fontSize: 18, flexShrink: 0 }}>check_small</span>
                          {item}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => navigate('/profile')}
                      className="label-code"
                      style={{ width: '100%', padding: '10px 14px', background: 'var(--surface-overlay)', border: '1px solid var(--border)', color: 'var(--text-bone)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'background 0.15s', borderRadius: 2 }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hi)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'var(--surface-overlay)'}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>account_tree</span>
                        Inspect Architecture Blueprint
                      </span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            02 // HOW IT WORKS
        ───────────────────────────────────────────── */}
        <section style={{ ...S.section, background: '#0e0f11', padding: '72px 0' }} id="how-it-works">
          <div style={S.container}>
            <div style={{ marginBottom: 48 }}>
              {S.sectionNum('03 // OPERATING PROTOCOL')}
              <h2 className="headline-lg" style={{ color: 'var(--text-bone)', marginBottom: 8 }}>How it works.</h2>
              <p className="body-lg text-cement" style={{ maxWidth: 500 }}>
                A methodical progression from current competency to defended software engineering artifact.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="how-grid">
              {HOW_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{ ...S.card, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 260 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-active)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                      <span className="headline-lg" style={{ fontWeight: 700, color: 'var(--text-charcoal)', lineHeight: 1 }}>{step.num}</span>
                      <span className="material-symbols-outlined text-cement" style={{ fontSize: 22 }}>{step.icon}</span>
                    </div>
                    <h3 className="headline-sm" style={{ color: 'var(--text-bone)', marginBottom: 10 }}>{step.title}</h3>
                    <p className="body-md text-cement" style={{ lineHeight: 1.65 }}>{step.desc}</p>
                  </div>
                  <div className="label-index text-charcoal" style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid var(--border)', textTransform: 'uppercase' }}>
                    {step.stage}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            03 // RESULTS PREVIEW
        ───────────────────────────────────────────── */}
        <section style={{ ...S.section, background: 'var(--surface)', padding: '72px 0' }} id="results-preview">
          <div style={S.container}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
              <div>
                {S.sectionNum('04 // SYNTHESIS REGISTER')}
                <h2 className="headline-lg" style={{ color: 'var(--text-bone)', marginBottom: 8 }}>Projects worth building.</h2>
                <p className="body-lg text-cement" style={{ maxWidth: 480 }}>
                  Vetted engineering concepts that satisfy both academic grading and real-world hiring scrutiny.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="label-index text-cement" style={{ textTransform: 'uppercase' }}>SORT BY:</span>
                <span className="label-code" style={{ padding: '6px 10px', background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 2, color: 'var(--text-bone)' }}>OVERALL COHORT MATCH</span>
              </div>
            </div>

            {/* Preview cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="results-preview-grid">
              {[
                { num:'01', tag:'FIN-AI', name:'FINsight AI', score:92, level:'INTERMEDIATE', desc:'AI-driven portfolio risk hedge and sentiment analysis engine for retail investors combining fine-tuned FinBERT with Monte Carlo modeling.', skill:94, innov:89, feas:93, tech:['Python','FastAPI','React','PostgreSQL'], accent: true },
                { num:'02', tag:'IOT-EDGE', name:'PulseMesh', score:88, level:'ADVANCED', desc:'Decentralized local-first edge health telemetry system with automated anomaly detection running via WebAssembly without centralized cloud leakage.', skill:86, innov:95, feas:85, tech:['Rust','WebAssembly','TimescaleDB','Docker'] },
                { num:'03', tag:'ZK-SEC', name:'ZeroTrust Docs', score:91, level:'INTERMEDIATE', desc:'Cryptographic verifiable document exchange and zero-knowledge student credential vault enabling privacy-preserving degree validation.', skill:91, innov:92, feas:90, tech:['TypeScript','Next.js','ZK-SNARKs','Tailwind'] },
              ].map((proj) => (
                <motion.div
                  key={proj.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  style={{ ...S.card, padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = proj.accent ? 'rgba(0,216,254,0.35)' : 'var(--border-active)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div>
                    {/* Card header strip */}
                    <div style={{ padding: '8px 20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="label-index" style={{ color: proj.accent ? 'var(--accent)' : 'var(--text-cement)', fontWeight: 700 }}>
                        PROJECT {proj.num} // {proj.tag}
                      </span>
                      <span className="label-code text-cement">SCORE: {proj.score}/100</span>
                    </div>

                    <div style={{ padding: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
                        <h3 className="headline-sm" style={{ color: 'var(--text-bone)' }}>{proj.name}</h3>
                        <span className="label-index" style={{ padding: '2px 6px', background: 'var(--surface-overlay)', border: '1px solid var(--border)', color: 'var(--color-secondary)', flexShrink: 0, textTransform: 'uppercase' }}>{proj.level}</span>
                      </div>
                      <p className="body-md text-cement" style={{ lineHeight: 1.65, marginBottom: 16 }}>{proj.desc}</p>

                      {/* Metric row */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '8px 10px', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center', marginBottom: 14 }}>
                        {[['SKILL', proj.skill],['INNOV', proj.innov],['FEAS', proj.feas]].map(([l,v]) => (
                          <div key={l}>
                            <span className="label-index text-cement" style={{ display: 'block' }}>{l}</span>
                            <span className="label-code" style={{ fontWeight: 600, color: 'var(--text-bone)' }}>{v}%</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {proj.tech.map(t => (
                          <span key={t} className="label-code" style={{ padding: '3px 7px', background: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: 2, color: 'var(--text-bone)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/profile')}
                    className="label-code"
                    style={{
                      margin: 20, marginTop: 0,
                      padding: '10px 14px',
                      background: proj.accent ? 'var(--accent)' : 'var(--surface-overlay)',
                      border: proj.accent ? '1px solid var(--accent)' : '1px solid var(--border)',
                      color: proj.accent ? '#0B0D0E' : 'var(--text-bone)',
                      cursor: 'pointer', borderRadius: 2,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = proj.accent ? 'var(--accent-bright)' : 'var(--surface-hi)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = proj.accent ? 'var(--accent)' : 'var(--surface-overlay)' }}
                  >
                    View Blueprint
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* CTA to generate real projects */}
            <div style={{ marginTop: 32, textAlign: 'center' }}>
              <button onClick={() => navigate('/profile')} className="btn btn-primary btn-lg">
                Generate My Projects
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            04 // ELEVATION STUDIO
        ───────────────────────────────────────────── */}
        <section style={{ background: 'var(--surface)', padding: '72px 0' }} id="elevation-studio">
          <div style={S.container}>
            <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
              {S.sectionNum('ELEVATION STUDIO')}
              <h2 className="headline-lg" style={{ color: 'var(--text-bone)', marginBottom: 10 }}>Already have an idea?</h2>
              <p className="body-lg text-cement">
                Turn an ordinary, predictable academic requirement into something that commands attention from professors and interviewers alike.
              </p>
            </div>

            {/* Tab switcher */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
              <div style={{ display: 'inline-flex', padding: 4, background: 'var(--surface-card)', border: '1px solid var(--border)', gap: 4 }}>
                {[['attendance','Attendance System'],['library','Library Management'],['ecommerce','E-Commerce Store']].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setActiveDemo(key)}
                    className="label-code"
                    style={{
                      padding: '8px 16px', cursor: 'pointer', borderRadius: 2, border: '1px solid transparent',
                      background: activeDemo === key ? 'var(--surface-hi)' : 'transparent',
                      color: activeDemo === key ? 'var(--text-bone)' : 'var(--text-cement)',
                      borderColor: activeDemo === key ? 'var(--border-active)' : 'transparent',
                      fontWeight: activeDemo === key ? 600 : 500,
                      transition: 'all 0.15s',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas */}
            <div style={{ background: '#0e0f11', border: '1px solid var(--border)', padding: '32px 40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'center' }} className="elevation-grid">

                {/* BEFORE */}
                <div style={{ ...S.card, padding: 0 }}>
                  <div style={{ padding: '8px 20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                    <span className="label-index text-cement" style={{ textTransform: 'uppercase' }}>BASELINE ACADEMIC CONCEPT</span>
                    <span className="label-code" style={{ color: '#f87171', fontWeight: 600 }}>C-TIER PROPOSAL</span>
                  </div>
                  <div style={{ padding: 24 }}>
                    <span className="label-code text-charcoal" style={{ textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{demo.beforeCat}</span>
                    <h3 className="headline-md" style={{ fontWeight: 600, marginBottom: 10 }}>{demo.beforeTitle}</h3>
                    <p className="body-md text-cement" style={{ lineHeight: 1.7, marginBottom: 20 }}>{demo.beforeDesc}</p>
                    <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {demo.beforeBad.map(item => (
                        <div key={item} className="label-code" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-cement)' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#f87171' }}>close</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,216,254,0.25)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#0B0D0E' }}>bolt</span>
                  </div>
                  <span className="label-index text-accent" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>ELEVATE →</span>
                </div>

                {/* AFTER */}
                <div style={{ background: '#1e2024', border: '1px solid rgba(0,216,254,0.35)', borderRadius: 2 }}>
                  <div style={{ padding: '8px 20px', background: 'rgba(0,216,254,0.08)', borderBottom: '1px solid rgba(0,216,254,0.2)', display: 'flex', justifyContent: 'space-between' }}>
                    <span className="label-index" style={{ textTransform: 'uppercase', fontWeight: 700 }}>THESISCRAFT RE-ENGINEERED</span>
                    <span className="label-code text-accent" style={{ fontWeight: 700 }}>A+ THESIS TIER</span>
                  </div>
                  <div style={{ padding: 24 }}>
                    <span className="label-code text-accent" style={{ textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{demo.afterCat}</span>
                    <h3 className="headline-md" style={{ fontWeight: 600, marginBottom: 10 }}>{demo.afterTitle}</h3>
                    <p className="body-md text-cement" style={{ lineHeight: 1.7, marginBottom: 20 }}>{demo.afterDesc}</p>
                    <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {demo.afterGood.map(item => (
                        <div key={item} className="label-code" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-bone)' }}>
                          <span className="material-symbols-outlined text-accent" style={{ fontSize: 18 }}>check_circle</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                <span className="body-md text-cement">Want to elevate your custom proposal draft?</span>
                <button onClick={() => navigate('/make-better')} className="btn btn-primary">
                  Paste Your Current Idea
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>transform</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0e0f11', borderTop: '1px solid var(--border)', padding: '72px 0' }}>
        <div style={S.container}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 32, marginBottom: 48 }} className="footer-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, background: 'var(--accent)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#0B0D0E' }}>auto_awesome</span>
                </div>
                <span className="headline-sm" style={{ textTransform: 'uppercase' }}>THESISCRAFT</span>
              </div>
              <p className="body-md text-cement" style={{ maxWidth: 240, marginBottom: 24 }}>From what you know to what you can build.</p>
              <span className="label-index text-charcoal" style={{ textTransform: 'uppercase' }}>ARCHITECTURAL ATELIER · 2026</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {[
                ['01 // Philosophy', ['First Principles','Studio Manifesto','Cognitive Craft']],
                ['02 // Framework',  ['Blueprint Core','Spec Engine','Scaffold Pipeline']],
                ['03 // Curriculum', ['Fellowship','Research Labs','Cohort Archive']],
                ['04 // Colophon',   ['Type Register','Academic Use','Terms of Inquiry']],
              ].map(([title, links]) => (
                <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span className="label-index text-cement" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{title}</span>
                  {links.map(link => (
                    <a key={link} href="#" className="body-md text-cement" style={{ transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text-bone)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-cement)'}
                    >{link}</a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <p className="label-code text-cement">Prompt Wars 2026 · Built for university innovators and technical creators.</p>
            <div className="label-code text-charcoal" style={{ display: 'flex', gap: 24 }}>
              <span>VER. 4.02-CANONICAL</span>
              <span>ALL RIGHTS RESERVED</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .how-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .results-preview-grid { grid-template-columns: 1fr !important; }
          .elevation-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .how-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
