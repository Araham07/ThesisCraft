import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { generateProjects } from '../services/projectService'

/* ─────────────────────────────────────────────────
   FORM DATA
───────────────────────────────────────────────── */
const INTERESTS = ['AI / ML','Web Development','Cybersecurity','Cloud Infrastructure','FinTech','Healthcare Systems','Data Science','Mobile Systems','Blockchain','IoT / Embedded']
const SKILLS    = ['Python','JavaScript','React','Node.js','Java','SQL / Relational','Docker','Go / Rust','TypeScript','C++','Flutter']
const EXPERIENCE = [{ key:'beginner',value:'Beginner' },{ key:'intermediate',value:'Intermediate' },{ key:'advanced',value:'Advanced' }]
const TIMELINE   = [{ key:'1-month',value:'1 Month' },{ key:'3-months',value:'3 Months' },{ key:'6-months',value:'6 Months' }]
const GOALS      = [{ key:'thesis',value:'Final Year Thesis' },{ key:'portfolio',value:'Portfolio Project' },{ key:'competition',value:'Hackathon / Competition' },{ key:'startup',value:'Startup Prototype' }]

const STEPS = ['Interests','Tech Stack','Experience','Timeline','Goal']

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
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm">
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
          Back
        </button>
      </div>
    </header>
  )
}

export default function Profile() {
  const navigate = useNavigate()
  const [step,       setStep]       = useState(0)
  const [interests,  setInterests]  = useState([])
  const [skills,     setSkills]     = useState([])
  const [experience, setExperience] = useState('intermediate')
  const [timeline,   setTimeline]   = useState('3-months')
  const [goal,       setGoal]       = useState('thesis')
  const [loading,    setLoading]    = useState(false)

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const canNext = () => {
    if (step === 0) return interests.length > 0
    if (step === 1) return skills.length > 0
    return true
  }

  const handleGenerate = async () => {
    setLoading(true)
    const profile = { interests, skills, experience, timeline, goal }
    try {
      const projects = await generateProjects(profile)
      navigate('/results', { state: { projects, profile } })
    } catch {
      setLoading(false)
    }
  }

  if (loading) return <LoadingScreen />

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)' }}>
      <NavBar navigate={navigate} />

      <main style={{ maxWidth: 860, margin: '0 auto', padding: '56px 32px 80px' }}>

        {/* Section tag */}
        <div style={{ marginBottom: 40 }}>
          <span className="section-number" style={{ display: 'block', marginBottom: 8 }}>02 // PARAMETER CALIBRATION</span>
          <h1 className="headline-lg" style={{ color: 'var(--text-bone)', marginBottom: 8 }}>Start with what you already know.</h1>
          <p className="body-lg" style={{ color: 'var(--text-cement)' }}>Tell us your interests, tools, and submission deadline — we'll do the rest.</p>
        </div>

        {/* Progress strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 40, background: 'var(--surface-card)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          {STEPS.map((label, i) => (
            <div
              key={label}
              style={{
                flex: 1, padding: '10px 0', textAlign: 'center', borderRight: i < STEPS.length - 1 ? '1px solid var(--border)' : 'none',
                background: i < step ? 'var(--accent-dim)' : i === step ? 'var(--surface-hi)' : 'transparent',
                borderBottom: i === step ? `2px solid var(--accent)` : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              <span className="label-index" style={{ textTransform: 'uppercase', color: i <= step ? 'var(--text-bone)' : 'var(--text-charcoal)' }}>
                {String(i + 1).padStart(2,'0')} // {label}
              </span>
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22 }}
          >
            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', padding: '36px 40px' }}>

              {/* ── Step 0: Interests ── */}
              {step === 0 && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <span className="label-code" style={{ color: 'var(--text-bone)', textTransform: 'uppercase', fontWeight: 600 }}>1. Select Core Academic Interests</span>
                    <span className="label-index text-cement">MULTI-SELECT ACTIVE</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {INTERESTS.map(item => (
                      <button key={item} onClick={() => toggle(interests, setInterests, item)} className={`chip ${interests.includes(item) ? 'active' : ''}`}>{item}</button>
                    ))}
                  </div>
                </>
              )}

              {/* ── Step 1: Skills ── */}
              {step === 1 && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <span className="label-code" style={{ color: 'var(--text-bone)', textTransform: 'uppercase', fontWeight: 600 }}>2. Languages & Frameworks You Command</span>
                    <span className="label-index text-cement">PROFICIENT TO INTERMEDIATE</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {SKILLS.map(item => (
                      <button key={item} onClick={() => toggle(skills, setSkills, item)} className={`chip ${skills.includes(item) ? 'active' : ''}`}>{item}</button>
                    ))}
                  </div>
                </>
              )}

              {/* ── Step 2: Experience ── */}
              {step === 2 && (
                <>
                  <span className="label-code" style={{ display: 'block', color: 'var(--text-bone)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 20 }}>3. Engineering Depth</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, background: 'var(--surface)', border: '1px solid var(--border)', padding: 4 }}>
                    {EXPERIENCE.map(opt => (
                      <button key={opt.key} onClick={() => setExperience(opt.key)}
                        className={`radio-seg ${experience === opt.key ? 'active' : ''}`}
                      >{opt.value}</button>
                    ))}
                  </div>
                </>
              )}

              {/* ── Step 3: Timeline ── */}
              {step === 3 && (
                <>
                  <span className="label-code" style={{ display: 'block', color: 'var(--text-bone)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 20 }}>4. Runway to Defense / Delivery</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, background: 'var(--surface)', border: '1px solid var(--border)', padding: 4 }}>
                    {TIMELINE.map(opt => (
                      <button key={opt.key} onClick={() => setTimeline(opt.key)}
                        className={`radio-seg ${timeline === opt.key ? 'active' : ''}`}
                      >{opt.value}</button>
                    ))}
                  </div>
                </>
              )}

              {/* ── Step 4: Goal ── */}
              {step === 4 && (
                <>
                  <span className="label-code" style={{ display: 'block', color: 'var(--text-bone)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 20 }}>5. Primary Goal</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                    {GOALS.map(opt => (
                      <button key={opt.key} onClick={() => setGoal(opt.key)}
                        style={{
                          padding: '16px 20px', textAlign: 'left',
                          background: goal === opt.key ? 'var(--accent-dim)' : 'var(--surface)',
                          border: goal === opt.key ? '1px solid var(--accent-border)' : '1px solid var(--border)',
                          color: goal === opt.key ? 'var(--text-bone)' : 'var(--text-cement)',
                          cursor: 'pointer', transition: 'all 0.15s', borderRadius: 2,
                          fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em',
                        }}
                        onMouseEnter={e => { if (goal !== opt.key) { e.currentTarget.style.borderColor = 'var(--border-active)'; e.currentTarget.style.color = 'var(--text-bone)' } }}
                        onMouseLeave={e => { if (goal !== opt.key) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-cement)' } }}
                      >
                        {goal === opt.key && <span className="material-symbols-outlined text-accent" style={{ fontSize: 16, display: 'block', marginBottom: 6 }}>radio_button_checked</span>}
                        {opt.value}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation + generate */}
        <div style={{ marginTop: 20, padding: '16px 20px', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined text-accent" style={{ fontSize: 18 }}>verified</span>
            <span className="label-code text-cement">
              Synthesizing rubric match across 1,420 vetted capstone proposals
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className="btn btn-secondary btn-sm">
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_back</span>
                Back
              </button>
            )}
            {step < 4 ? (
              <button onClick={() => setStep(s => s + 1)} className="btn btn-primary" disabled={!canNext()}>
                Next
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
              </button>
            ) : (
              <button onClick={handleGenerate} className="btn btn-primary btn-lg">
                Generate My Projects
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   LOADING SCREEN
───────────────────────────────────────────────── */
const LOAD_MSGS = [
  'Ingesting your parameter configuration...',
  'Benchmarking engineering feasibility...',
  'Evaluating technical novelty scores...',
  'Generating architectural blueprints...',
  'Finalising cohort match ranking...',
]

function LoadingScreen() {
  const [msgIdx, setMsgIdx] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setMsgIdx(i => (i + 1) % LOAD_MSGS.length), 800)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#0e0f11', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        style={{ width: 48, height: 48, border: '2px solid var(--border)', borderTop: '2px solid var(--accent)', borderRadius: '50%' }}
      />

      <div style={{ textAlign: 'center' }}>
        <p className="label-index text-accent" style={{ textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>ARCHITECTURE ENGINE ACTIVE</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="headline-sm"
            style={{ color: 'var(--text-bone)' }}
          >
            {LOAD_MSGS[msgIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div style={{ width: 320, height: 1, background: 'var(--border)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 4, ease: 'easeInOut' }}
          style={{ height: '100%', background: 'var(--accent)' }}
        />
      </div>

      <div className="label-code text-charcoal" style={{ textTransform: 'uppercase' }}>
        ESTIMATED TIME TO BLUEPRINT: ~14 SECONDS
      </div>
    </div>
  )
}
