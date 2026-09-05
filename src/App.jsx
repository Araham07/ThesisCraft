import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Landing    from './pages/Landing'
import Profile    from './pages/Profile'
import Results    from './pages/Results'
import Blueprint  from './pages/Blueprint'
import MakeBetter from './pages/MakeBetter'
import ScrollToTop from './components/ScrollToTop'

/* Smooth page-level fade transition */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* AnimatePresence needs the location key to detect route changes */
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"            element={<PageWrapper><Landing    /></PageWrapper>} />
        <Route path="/profile"     element={<PageWrapper><Profile    /></PageWrapper>} />
        <Route path="/results"     element={<PageWrapper><Results    /></PageWrapper>} />
        <Route path="/blueprint"   element={<PageWrapper><Blueprint  /></PageWrapper>} />
        <Route path="/make-better" element={<PageWrapper><MakeBetter /></PageWrapper>} />
        <Route path="*"            element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
