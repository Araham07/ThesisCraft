import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MOCK_PROJECTS } from '../data/mockProjects'

const DIFF_COLOR = { Beginner: 'var(--color-success)', Intermediate: 'var(--color-secondary)', Advanced: '#fb923c' }

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
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
            Back
          </button>
          <button onClick={() => navigate('/make-better')} className="btn btn-secondary btn-sm">Make Better</button>
        </div>
      </div>
    </header>
  )
}

export default function Results() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const rawState  = location.state?.projects
  const projects  = Array.isArray(rawState) ? rawState : (rawState?.projects || MOCK_PROJECTS)
  const profile   = location.state?.profile || {}
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setRevealed(true), 200)
    return () => clearTimeout(id)
  }, [])

  if (!projects.length) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--surface)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <p className="body-lg text-cement">No projects found. Please complete your profile first.</p>
        <button onClick={() => navigate('/profile')} className="btn btn-primary">Start Profile</button>
      </div>
    )
  }

  const avgScore = (p) => Math.round((p.scores.skillMatch + p.scores.innovation + p.scores.feasibility) / 3)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)' }}>
      <NavBar navigate={navigate} />

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 32px 80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="section-number" style={{ display: 'block', marginBottom: 8 }}>04 // SYNTHESIS REGISTER</span>
            <h1 className="headline-lg" style={{ color: 'var(--text-bone)', marginBottom: 8 }}>Projects worth building.</h1>
            <p className="body-lg text-cement" style={{ maxWidth: 480 }}>
              Vetted engineering concepts calibrated to your exact parameter set.
            </p>
          </div>
          {/* Profile summary pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[...(profile.interests || []).slice(0,3), ...(profile.skills || []).slice(0,3)].map(tag => (
              <span key={tag} className="label-code" style={{ padding: '4px 9px', background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 2, color: 'var(--text-cement)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 3 Project Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="results-grid">
          {projects.map((proj, i) => {
            const avg = avgScore(proj)
            const diffColor = DIFF_COLOR[proj.difficulty] || 'var(--color-secondary)'
            const isTop = i === 0

            return (
              <motion.div
                key={proj.projectName}
                initial={{ opacity: 0, y: 20 }}
                animate={revealed ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                style={{ background: 'var(--surface-card)', border: `1px solid ${isTop ? 'rgba(0,216,254,0.3)' : 'var(--border)'}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'border-color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = isTop ? 'rgba(0,216,254,0.5)' : 'var(--border-active)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = isTop ? 'rgba(0,216,254,0.3)' : 'var(--border)'}
              >
                <div>
                  {/* Card header strip */}
                  <div style={{ padding: '8px 20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="label-index" style={{ color: isTop ? 'var(--accent)' : 'var(--text-cement)', fontWeight: 700, textTransform: 'uppercase' }}>
                      PROJECT {String(i+1).padStart(2,'0')} // {proj.projectName.split(' ').slice(-1)[0].toUpperCase()}
                    </span>
                    <span className="label-code text-cement">SCORE: {avg}/100</span>
                  </div>

                  <div style={{ padding: 20 }}>
                    {/* Name + difficulty */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
                      <h2 className="headline-sm" style={{ color: 'var(--text-bone)' }}>{proj.projectName}</h2>
                      <span className="label-index" style={{ padding: '2px 7px', background: 'var(--surface-overlay)', border: '1px solid var(--border)', color: diffColor, flexShrink: 0, textTransform: 'uppercase' }}>
                        {proj.difficulty}
                      </span>
                    </div>

                    <p className="body-md text-cement" style={{ lineHeight: 1.65, marginBottom: 16 }}>{proj.tagline}</p>

                    {/* Metric row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center', marginBottom: 14 }}>
                      {[['SKILL', proj.scores.skillMatch, 'var(--accent)'],['INNOV', proj.scores.innovation,'var(--color-secondary)'],['FEAS', proj.scores.feasibility,'var(--color-success)']].map(([label, val, color]) => (
                        <div key={label}>
                          <span className="label-index text-cement" style={{ display: 'block' }}>{label}</span>
                          <span className="label-code" style={{ fontWeight: 600, color: 'var(--text-bone)' }}>{val}%</span>
                          <div className="score-track">
                            <motion.div
                              className="score-fill"
                              initial={{ width: 0 }}
                              animate={revealed ? { width: `${val}%` } : {}}
                              transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }}
                              style={{ background: color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {(proj.techStack || []).slice(0, 5).map(t => (
                        <span key={t} className="label-code" style={{ padding: '3px 7px', background: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: 2, color: 'var(--text-bone)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => navigate('/blueprint', { state: { project: proj, profile } })}
                  className="label-code"
                  style={{
                    margin: 20, marginTop: 0,
                    padding: '10px 14px',
                    background: isTop ? 'var(--accent)' : 'var(--surface-overlay)',
                    border: isTop ? '1px solid var(--accent)' : '1px solid var(--border)',
                    color: isTop ? '#0B0D0E' : 'var(--text-bone)',
                    cursor: 'pointer', borderRadius: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = isTop ? 'var(--accent-bright)' : 'var(--surface-hi)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = isTop ? 'var(--accent)' : 'var(--surface-overlay)' }}
                >
                  View Blueprint
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: 32, padding: '16px 20px', background: 'var(--surface-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined text-accent" style={{ fontSize: 18 }}>info</span>
            <span className="label-code text-cement">Projects ranked by overall cohort match against your parameter configuration.</span>
          </div>
          <button onClick={() => navigate('/profile')} className="btn btn-secondary btn-sm">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>refresh</span>
            Regenerate
          </button>
        </div>
      </main>

      <style>{`
        @media (max-width: 1024px) { .results-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
