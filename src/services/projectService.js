/**
 * projectService.js
 * Simulates an async AI API call.
 * In production this would call POST /api/generate with the student profile.
 * For the MVP demo, returns curated mock data after a realistic delay.
 */
import { synthesizeProjects } from './projectRuleEngine'
import { MOCK_PROJECTS } from '../data/mockProjects'

/**
 * Generates project ideas dynamically based on a student profile.
 * @param {Object} profile - { interests, skills, experience, timeline, goal }
 * @returns {Promise<Array>} List of 3 dynamically synthesized project objects
 */
export async function generateProjects(profile) {
  const apiUrl = import.meta.env.VITE_API_URL

  // If VITE_API_URL is configured for production (Railway API), call the remote endpoint
  if (apiUrl) {
    try {
      const response = await fetch(`${apiUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && Array.isArray(data.projects)) {
          return data.projects
        }
      }
    } catch (err) {
      console.warn('Backend API call failed, using client-side rule engine fallback:', err)
    }
  }

  // Fallback: Local rule engine synthesis
  await delay(1800)
  const projects = synthesizeProjects(profile)
  return projects && projects.length ? projects : MOCK_PROJECTS
}

// ── Helpers ─────────────────────────────────────
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default generateProjects

