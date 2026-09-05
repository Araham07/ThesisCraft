import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MOCK_PROJECTS } from '../data/mockProjects'

const ROADMAP_ICONS = ['search','database','code','neurology','web','bug_report','rocket_launch','layers','science','explore']

function NavBar({ navigate, project }) {
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
            Results
          </button>
          <button onClick={() => navigate('/make-better')} className="btn btn-primary btn-sm">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>auto_fix_high</span>
            Make Better
          </button>
        </div>
      </div>
    </header>
  )
}

export default function Blueprint() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const project   = location.state?.project || MOCK_PROJECTS[0]
  const profile   = location.state?.profile || {}

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--surface)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <p className="body-lg text-cement">No project selected.</p>
        <button onClick={() => navigate('/results')} className="btn btn-primary">Back to Results</button>
      </div>
    )
  }

  const avg = Math.round((project.scores.skillMatch + project.scores.innovation + project.scores.feasibility) / 3)
  const DIFF_COLOR = { Beginner: 'var(--color-success)', Intermediate: 'var(--color-secondary)', Advanced: '#fb923c' }
  const diffColor = DIFF_COLOR[project.difficulty] || 'var(--color-secondary)'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)' }}>
      <NavBar navigate={navigate} project={project} />

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 32px 80px' }}>

        {/* ── SECTION HEADER ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="section-number" style={{ display: 'block', marginBottom: 8 }}>05 // ARCHITECTURAL BLUEPRINT</span>
            <h1 className="headline-lg" style={{ color: 'var(--text-bone)', marginBottom: 8 }}>
              Technical Blueprint: <span style={{ color: 'var(--accent)' }}>{project.projectName}</span>
            </h1>
            <p className="body-lg text-cement" style={{ maxWidth: 500 }}>
              Complete production specification ready for academic proposal defense and repository initialization.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-secondary btn-sm">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>download</span>
              Export PDF Spec
            </button>
            <button className="btn btn-primary btn-sm">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>fork_right</span>
              Fork Scaffold
            </button>
          </div>
        </div>

        {/* ── 7/5 MASTER LAYOUT ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }} className="blueprint-grid">

          {/* LEFT: Core engineering breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Problem Statement */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, color: 'var(--accent)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>crisis_alert</span>
                <span className="label-index" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Problem Statement</span>
              </div>
              <p className="body-md" style={{ lineHeight: 1.75 }}>{project.problem}</p>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                <span className="label-index text-cement" style={{ display: 'block', textTransform: 'uppercase', marginBottom: 8 }}>
                  Why This Project Commands High Defense Marks:
                </span>
                <p className="body-md text-cement" style={{ lineHeight: 1.7 }}>{project.whyItMatches}</p>
              </div>
            </motion.div>

            {/* Core Feature Architecture */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }}
              style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <span className="material-symbols-outlined text-accent" style={{ fontSize: 20 }}>hub</span>
                <span className="label-index" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Core Functional Architecture</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(project.features || []).map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)' }}
                  >
                    <span className="material-symbols-outlined text-accent" style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>check_small</span>
                    <p className="body-md" style={{ lineHeight: 1.65 }}>{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Development Roadmap */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.4 }}
              style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="material-symbols-outlined text-accent" style={{ fontSize: 20 }}>timeline</span>
                  <span className="label-index" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Milestone Execution Roadmap</span>
                </div>
                <span className="label-code text-cement">EST: {profile.timeline || '3 MONTHS'}</span>
              </div>

              {/* Vertical timeline */}
              <div style={{ paddingLeft: 24, position: 'relative', borderLeft: '1px solid var(--border-active)' }}>
                {(project.roadmap || []).map((step, i) => {
                  const isFirst = i === 0
                  const isLast  = i === project.roadmap.length - 1
                  const icon = ROADMAP_ICONS[i % ROADMAP_ICONS.length]
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.07 }}
                      style={{ position: 'relative', paddingBottom: isLast ? 0 : 24 }}
                    >
                      {/* Dot */}
                      <div style={{
                        position: 'absolute', left: -31, top: 4,
                        width: 13, height: 13, borderRadius: '50%',
                        background: isFirst ? 'var(--accent)' : isLast ? 'var(--color-success)' : 'var(--surface-hi)',
                        border: `2px solid ${isFirst ? 'var(--accent)' : isLast ? 'var(--color-success)' : 'var(--border-active)'}`,
                        boxShadow: `0 0 0 3px var(--surface-card)`,
                      }} />
                      <span className="label-code" style={{ fontWeight: 700, color: isFirst ? 'var(--accent-bright)' : isLast ? 'var(--color-success)' : 'var(--text-bone)', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}>
                        {`PHASE ${String(i+1).padStart(2,'0')} // ${icon.replace(/_/g,' ').toUpperCase()}`}
                      </span>
                      <p className="body-md text-cement" style={{ lineHeight: 1.65 }}>{step}</p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Future Scope */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.4 }}
              style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <span className="material-symbols-outlined text-accent" style={{ fontSize: 20 }}>explore</span>
                <span className="label-index" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Future Scope & Extensions</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                {(project.futureScope || []).map((item, i) => (
                  <div key={i} style={{ padding: '12px 14px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <p className="body-md text-cement" style={{ lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 80 }}>

            {/* Blueprint archival parameters */}
            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', padding: 24 }}>
              <span className="label-index text-cement" style={{ display: 'block', textTransform: 'uppercase', marginBottom: 16 }}>BLUEPRINT ARCHIVAL PARAMETERS</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--border)' }}>
                {[
                  ['Evaluation Score', `${avg} / 100`, 'var(--accent-bright)'],
                  ['Recommended Timeline', profile.timeline?.replace('-',' ') || '3 Months', 'var(--text-bone)'],
                  ['Engineering Complexity', project.difficulty + ' • Tier 2', 'var(--color-secondary)'],
                  ['Architecture Pattern', 'Clean / Domain Driven', 'var(--text-bone)'],
                  ['Target Defense Rubric', 'Cap-Stone IEEE A+', 'var(--color-success)'],
                ].map(([label, val, color]) => (
                  <div key={label} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span className="body-md text-cement">{label}</span>
                    <span className="label-code" style={{ fontWeight: 600, color, textAlign: 'right' }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* Service topology diagram */}
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <span className="label-index text-cement" style={{ display: 'block', textTransform: 'uppercase', marginBottom: 10 }}>Service Topology Diagram</span>
                <div style={{ padding: 14, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    ['CLIENT: React / Vite / Tailwind UI', null],
                    null,
                    ['GATEWAY: FastAPI Async API', null],
                    'split',
                    null,
                    ['STORAGE: PostgreSQL + Redis Cache', null],
                  ].map((node, i) => {
                    if (node === null) return <div key={i} className="label-code text-charcoal" style={{ textAlign: 'center', fontSize: 10 }}>↓ REST / WebSockets</div>
                    if (node === 'split') return (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                        <div className="label-code" style={{ padding: '8px 6px', background: 'var(--surface-overlay)', border: '1px solid var(--border)', fontSize: 10, textAlign: 'center', color: 'var(--text-bone)' }}>NLP Worker</div>
                        <div className="label-code" style={{ padding: '8px 6px', background: 'var(--surface-overlay)', border: '1px solid var(--border)', fontSize: 10, textAlign: 'center', color: 'var(--text-bone)' }}>Monte Carlo</div>
                      </div>
                    )
                    return (
                      <div key={i} className="label-code" style={{ padding: '8px 10px', background: 'var(--surface-elevated)', border: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-bone)', fontSize: 10, fontWeight: 600 }}>
                        [ {node[0]} ]
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Tech stack */}
            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', padding: 24 }}>
              <span className="label-index text-cement" style={{ display: 'block', textTransform: 'uppercase', marginBottom: 12 }}>Tech Stack</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {(project.techStack || []).map(t => (
                  <span key={t} className="label-code" style={{ padding: '5px 10px', background: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: 2, color: 'var(--text-bone)', transition: 'all 0.15s', cursor: 'default' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-dim)'; e.currentTarget.style.borderColor = 'var(--accent-border)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-elevated)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Committee advice */}
            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: 'var(--accent)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>school</span>
                <span className="label-index" style={{ fontWeight: 700, textTransform: 'uppercase' }}>Committee Review Strategy</span>
              </div>
              <p className="body-md text-cement" style={{ lineHeight: 1.7 }}>
                When defending this project, highlight the <strong style={{ color: 'var(--text-bone)' }}>separation of concerns</strong> between your data layer and ML pipeline. This preempts academic concerns about API throttling and latency during live demonstrations.
              </p>
            </div>

            {/* Elevation CTA */}
            <button
              onClick={() => navigate('/make-better')}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px 20px' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>auto_fix_high</span>
              Elevate This Concept
            </button>

            <button
              onClick={() => navigate('/results')}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_back</span>
              Back to All Projects
            </button>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 1024px) { .blueprint-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
