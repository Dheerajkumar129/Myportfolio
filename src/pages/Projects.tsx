import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Project } from '../types';
import { Github } from '../components/Icons';
import SEO from '../components/SEO';
import CardSpotlight from '../components/CardSpotlight';

interface ProjectsPageProps {
  projects: Project[];
  isDark: boolean;
}

type ProjectCategory = 'All' | 'AI / ML' | 'Desktop App' | 'Systems' | 'Web App';

export default function Projects({ projects, isDark }: ProjectsPageProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  // Categories list
  const categories: ProjectCategory[] = ['All', 'AI / ML', 'Desktop App', 'Systems', 'Web App'];

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.priority && p.status && p.technologies && (p.id.includes(activeCategory.toLowerCase()) || p.technologies.some(t => t.includes(activeCategory)) || p.title.toLowerCase().includes(activeCategory.toLowerCase()) || (activeCategory === 'AI / ML' && p.technologies.some(t => ['CNN', 'LSTM', 'Mediapipe', 'ML'].includes(t)))));

  // Identify featured project (Spotlight card)
  const featuredProject = projects.find(p => p.featured) || projects[0];

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 18,
        duration: 0.8
      }
    },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } }
  };

  const projectsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://Dheerajkumar129.github.io/Myportfolio/projects/#webpage",
        "url": "https://Dheerajkumar129.github.io/Myportfolio/projects",
        "name": "Projects Catalog | Dheeraj Kumar",
        "description": "Browse projects catalog built by Dheeraj Kumar, showcasing machine learning gestures recognition, Tkinter CRUD desktop apps, and web portals."
      }
    ]
  };

  return (
    <div className="min-h-screen py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <SEO 
        title="Projects & Works | Dheeraj Kumar"
        description="Browse the collection of projects built by Dheeraj Kumar, showcasing hand gesture detection systems, inventory managers, and OOP pay applications."
        keywords="Sign Language System, Inventory Tkinter, Payroll System, Python, C++, React"
        canonicalUrl="https://Dheerajkumar129.github.io/Myportfolio/projects"
        schema={projectsSchema}
      />
      
      {/* Editorial Page Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-left max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-[#a855f7]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a855f7]">
              Bento Catalog v2.0
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-sans font-semibold tracking-tight leading-none mb-6">
            Architectural Works &amp;<br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
              isDark 
                ? 'from-white via-white/80 to-white/40' 
                : 'from-neutral-950 via-neutral-900 to-neutral-500'
            } italic font-serif font-medium`}>Intelligent Systems</span>
          </h1>
          <p className={`text-base md:text-lg font-light leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-655'
          }`}>
            An asymmetrical curation of machine learning recognition systems, CRUD desktop software, and responsive web portals.
          </p>
        </div>
      </div>

      {/* Luxury Filter Bar */}
      <div className="mb-12 flex flex-wrap gap-2.5 items-center justify-start border-b border-white/5 pb-6">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 focus:outline-none border-none bg-transparent cursor-pointer ${
                isActive 
                  ? isDark ? 'text-white' : 'text-neutral-900' 
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-neutral-900'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className={`absolute inset-0 rounded-full z-0 ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.4)] backdrop-blur-md' 
                      : 'bg-white border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
                  }`}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Bento Grid Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
      >
        {/* Spotlight Featured Project */}
        {featuredProject && (activeCategory === 'All' || activeCategory === 'AI / ML') && (
          <motion.div
            layout
            variants={itemVariants}
            className="col-span-1 lg:col-span-12"
          >
            <CardSpotlight
              className={`h-full p-8 md:p-10 rounded-[40px] relative overflow-hidden transition-all duration-500 hover:shadow-2xl border ${
                isDark 
                  ? 'bg-neutral-900/30 hover:bg-[#151515] border-white/5 hover:border-[#a855f7]/25' 
                  : 'bg-white hover:bg-slate-50/80 border-neutral-200/60 hover:border-[#a855f7]/15'
              } flex flex-col justify-between group`}
            >
              <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full filter blur-[120px] opacity-15 pointer-events-none bg-[#a855f7]/30 transition-opacity group-hover:opacity-25" />
              
              <div className="relative z-10 w-full">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase ${
                    isDark ? 'bg-[#a855f7]/10 text-[#c084fc] border border-[#a855f7]/20' : 'bg-[#a855f7]/5 text-[#a855f7] border border-[#a855f7]/10'
                  }`}>
                    Spotlight System Spec
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className={`text-[10px] font-mono tracking-widest uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Active Status: <span className="text-emerald-500 font-semibold">{featuredProject.status}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                  <div className="lg:col-span-6">
                    <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight mb-4 group-hover:text-[#a855f7] transition-colors duration-300">
                      {featuredProject.title}
                    </h2>
                    <p className={`text-sm md:text-base font-light leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {featuredProject.description}
                    </p>
                  </div>

                  <div className="lg:col-span-6 flex flex-col justify-end lg:items-end">
                    <span className={`text-[9px] uppercase font-mono tracking-widest mb-3 block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      System Stack Configuration
                    </span>
                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      {featuredProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide border ${
                            isDark 
                              ? 'bg-white/5 border-white/5 text-slate-300' 
                              : 'bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 border-t border-white/5 pt-8 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-4">
                  {featuredProject.metrics && featuredProject.metrics.map((metric) => (
                    <div key={metric.label}>
                      <span className={`text-2xl md:text-3xl font-serif italic block font-medium text-[#a855f7] ${
                        isDark ? 'text-white' : 'text-neutral-900'
                      }`}>
                        {metric.value}
                      </span>
                      <span className={`text-[9px] uppercase font-sans tracking-widest block mt-1 leading-none ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="col-span-1 flex items-center justify-end gap-4">
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-3 rounded-2xl border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                      isDark 
                        ? 'bg-white/5 border-white/5 text-slate-300 hover:text-white hover:bg-[#a855f7]/10 hover:border-[#a855f7]/25' 
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-neutral-950 hover:bg-[#a855f7]/5 hover:border-[#a855f7]/20'
                    }`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </CardSpotlight>
          </motion.div>
        )}

        {/* Other Projects */}
        <AnimatePresence mode="popLayout">
          {filteredProjects
            .filter(p => !featuredProject || p.id !== featuredProject.id)
            .map((proj, idx) => {
              const isLarge = idx % 3 === 0;
              return (
                <motion.div
                  key={proj.id}
                  layout
                  variants={itemVariants}
                  exit="exit"
                  className={isLarge ? 'col-span-1 lg:col-span-8' : 'col-span-1 lg:col-span-4'}
                >
                  <CardSpotlight
                    className={`h-full p-6 md:p-8 rounded-[32px] border transition-all duration-500 hover:shadow-xl ${
                      isDark 
                        ? 'bg-neutral-900/30 hover:bg-[#151515] border-white/5 hover:border-[#a855f7]/20' 
                        : 'bg-white hover:bg-slate-50/80 border-neutral-200/60 hover:border-[#a855f7]/10'
                    } flex flex-col justify-between group`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className={`text-[9px] uppercase font-sans tracking-widest px-2.5 py-1 rounded-full font-bold border ${
                          isDark
                            ? proj.status === 'Deployed' 
                              ? 'bg-[#a855f7]/15 text-[#c084fc] border-[#a855f7]/25' 
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : proj.status === 'Deployed'
                              ? 'bg-[#a855f7]/5 text-[#a855f7] border-[#a855f7]/10'
                              : 'bg-amber-500/5 text-amber-600 border-amber-500/10'
                        }`}>
                          {proj.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-sans font-semibold tracking-tight mb-2 group-hover:text-[#a855f7] transition-colors duration-300">
                        {proj.title}
                      </h3>
                      <p className={`text-xs font-light leading-relaxed mb-6 ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies.slice(0, 3).map((tech) => (
                          <span 
                            key={tech} 
                            className={`px-2 py-1 rounded-lg text-[9px] font-mono border ${
                              isDark ? 'bg-white/5 border-white/5 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                            isDark ? 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </CardSpotlight>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
