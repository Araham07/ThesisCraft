import express from 'express'
import cors from 'cors'
import { synthesizeProjects } from '../src/services/projectRuleEngine.js'

const app = express()
const PORT = process.env.PORT || 5000

// Enable CORS for Vercel frontend and local development
app.use(cors())
app.use(express.json())

// Health check endpoint for Railway deployment monitoring
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ThesisCraft AI Backend Service',
    timestamp: new Date().toISOString()
  })
})

app.get('/', (req, res) => {
  res.json({
    message: 'ThesisCraft Architectural Atelier Backend API (Railway)',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      generate: 'POST /api/generate',
      elevate: 'POST /api/elevate'
    }
  })
})

// POST /api/generate - Synthesizes 3 customized thesis project blueprints
app.post('/api/generate', (req, res) => {
  try {
    const profile = req.body || {}
    const projects = synthesizeProjects(profile)
    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      projects
    })
  } catch (error) {
    console.error('Error generating thesis projects:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to synthesize thesis projects'
    })
  }
})

// POST /api/elevate - Re-engineers a raw user proposal into an A+ thesis draft
app.post('/api/elevate', (req, res) => {
  try {
    const { idea, category = 'Software Engineering' } = req.body || {}
    
    if (!idea || !idea.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Idea parameter is required'
      })
    }

    const elevatedProposal = {
      originalIdea: idea,
      reEngineeredTitle: `Autonomous ${idea.split(' ')[0] || 'System'} Architectural Platform`,
      category: `${category} / Applied AI`,
      gradeTier: 'A+ THESIS TIER',
      architecturalFeatures: [
        'Distributed event-driven architecture with zero-trust API boundaries',
        'Real-time metrics streaming with predictive anomaly detection',
        'Empirical benchmarking framework for scalability verification',
        'Containerized deployment specification (Docker / Kubernetes Operator)'
      ],
      methodology: 'Iterative agile engineering with continuous integration & empirical evaluation'
    }

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      proposal: elevatedProposal
    })
  } catch (error) {
    console.error('Error elevating proposal:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to elevate proposal'
    })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 ThesisCraft Backend Server running on port ${PORT}`)
})
