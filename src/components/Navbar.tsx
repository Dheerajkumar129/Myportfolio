import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Menu, X, FileText } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Skills', path: '/skills' },
    { label: 'Timeline', path: '/timeline' },
    { label: 'Certifications', path: '/certifications' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        id="global-navbar"
        className={`fixed left-1/2 -translate-x-1/2 w-[94%] md:w-[90%] max-w-7xl z-50 transition-all duration-500 ease-out rounded-full flex items-center justify-between px-6 md:px-8 top-4 py-3 ${
          isDark
            ? 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
            : 'bg-white/85 backdrop-blur-xl border border-black/5 shadow-[0_10px_35px_rgba(0,0,0,0.04)]'
        }`}
      >
        <div className="w-full flex items-center justify-between gap-4">
          
          {/* Brand/Logo */}
          <Link
            to="/"
            id="navbar-logo"
            className="group flex items-center gap-2.5 select-none focus:outline-none shrink-0"
          >
            <div 
              className={`w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm tracking-widest transition-all duration-300 overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-tr from-neutral-800 to-black border border-white/10 text-white group-hover:scale-105 group-hover:border-white/25 shadow-glow' 
                  : 'bg-gradient-to-tr from-white to-slate-100 border border-black/10 text-neutral-900 group-hover:scale-105 group-hover:border-black/20 shadow-sm'
              }`}
            >
              DK
            </div>
            <div className="hidden sm:block text-left">
              <span className={`text-xs block font-bold tracking-widest font-display uppercase leading-none ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Dheeraj Kumar
              </span>
              <span className={`text-[9px] block font-mono tracking-wider transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                AI &amp; FRONTEND
              </span>
            </div>
          </Link>

          {/* Center Navigation Links for Desktop (Directly Visible Pages) */}
          <div className={`hidden md:flex items-center gap-1.5 border rounded-full p-1.5 ${
            isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'
          }`}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest relative transition-colors duration-300 focus:outline-none ${
                    isActive 
                      ? 'text-[#a855f7]' 
                      : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-neutral-950'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className={`absolute inset-0 rounded-full z-0 border ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 font-display uppercase tracking-widest">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Controls: Theme Switch + Resume Button */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            
            <a
              href="mailto:dheerajkumar7135227@gmail.com"
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1.5 focus:outline-none transition-all duration-300 cursor-pointer ${
                isDark 
                  ? 'bg-white text-black hover:bg-neutral-200 border border-transparent hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]' 
                  : 'bg-neutral-900 text-white hover:bg-neutral-800 border border-transparent hover:shadow-[0_5px_15px_rgba(0,0,0,0.1)]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </a>
          </div>

          {/* Mobile Buttons Layout */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-full border cursor-pointer focus:outline-none ${
                isDark 
                  ? 'bg-neutral-950 border-neutral-800 text-slate-300 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
              aria-label="Open primary layout menu"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-x-0 top-[76px] z-40 p-6 flex flex-col gap-6 md:hidden border-b ${
              isDark 
                ? 'bg-black/95 backdrop-blur-xl border-neutral-900 text-white shadow-2xl' 
                : 'bg-white/95 backdrop-blur-xl border-slate-100 text-neutral-900 shadow-xl'
            }`}
          >
            {/* Mobile Navigation List */}
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium uppercase tracking-wider py-1.5 px-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-neutral-900 font-bold'
                        : isDark ? 'text-slate-300 hover:bg-neutral-900 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-neutral-950'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile CTA */}
            <a
              href="mailto:dheerajkumar7135227@gmail.com"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full py-3 rounded-xl text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 focus:outline-none transition-all duration-300 ${
                isDark 
                  ? 'bg-neutral-900 text-white border border-white/15' 
                  : 'bg-slate-100 text-neutral-900 border border-slate-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Hire Me</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
