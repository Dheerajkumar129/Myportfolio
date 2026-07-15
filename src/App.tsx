import { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

import { profileData } from './data/portfolioData';
import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import Chatbot from './components/Chatbot';

// Lazy load route pages for performance & layout bundle optimization
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Skills = lazy(() => import('./pages/Skills'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Contact = lazy(() => import('./pages/Contact'));

function AnimatedRoutes({ isDark }: { isDark: boolean }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full flex-grow flex flex-col"
      >
        <Routes location={location}>
          <Route
            path="/"
            element={<Home config={profileData.hero} homeCards={profileData.homeCards} projects={profileData.projects} skills={profileData.skills} isDark={isDark} />}
          />
          <Route
            path="/projects"
            element={<Projects projects={profileData.projects} isDark={isDark} />}
          />
          <Route
            path="/skills"
            element={<Skills categories={profileData.skills} strengths={profileData.strengths} isDark={isDark} />}
          />
          <Route
            path="/certifications"
            element={<Certifications certifications={profileData.certifications} isDark={isDark} />}
          />
          <Route
            path="/timeline"
            element={<Timeline timeline={profileData.journey} />}
          />
          <Route
            path="/contact"
            element={<Contact isDark={isDark} />}
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(true);

  // Auto-detect system preference or load from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('dheeraj-portfolio-theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    localStorage.setItem('dheeraj-portfolio-theme', nextTheme ? 'dark' : 'light');
  };

  return (
    <HashRouter>
      <div className={`min-h-screen flex flex-col relative font-sans transition-colors duration-1000 overflow-x-hidden ${
        isDark ? 'bg-[#030014] text-slate-100' : 'bg-slate-50 text-neutral-900'
      }`}>
        
        {/* Persistent glass Navbar */}
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />

        <main className="relative flex-grow flex flex-col justify-start">
          <Breadcrumbs isDark={isDark} />
          
          <Suspense fallback={
            <div className="flex-grow flex items-center justify-center min-h-[50vh]">
              <Loader2 className="w-8 h-8 animate-spin text-[#007AFF]" />
            </div>
          }>
            <AnimatedRoutes isDark={isDark} />
          </Suspense>
        </main>

        {/* Global chatbot representing Dheeraj */}
        <Chatbot isDark={isDark} />
      </div>
    </HashRouter>
  );
}
