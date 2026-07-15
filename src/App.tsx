/**
 * Dheeraj Kumar — Portfolio
 * React + TypeScript + TailwindCSS + Framer Motion
 */

import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { profileData } from './data/portfolioData';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Certifications from './pages/Certifications';
import Timeline from './pages/Timeline';
import Contact from './pages/Contact';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full"
      >
        <Routes location={location}>
          <Route
            path="/"
            element={<Home config={profileData.hero} homeCards={profileData.homeCards} />}
          />
          <Route
            path="/projects"
            element={<Projects projects={profileData.projects} />}
          />
          <Route
            path="/skills"
            element={<Skills categories={profileData.skills} strengths={profileData.strengths} />}
          />
          <Route
            path="/certifications"
            element={<Certifications certifications={profileData.certifications} />}
          />
          <Route
            path="/timeline"
            element={<Timeline timeline={profileData.timeline} />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
      </div>
    </HashRouter>
  );
}
