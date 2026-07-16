import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { JourneyMilestone } from '../types';
import SEO from '../components/SEO';
import CardSpotlight from '../components/CardSpotlight';
import { Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react';

interface TimelineProps {
  timeline: JourneyMilestone[];
  isDark: boolean;
}

export default function Timeline({ timeline = [], isDark }: TimelineProps) {
  const [filter, setFilter] = useState<'ALL' | 'EXPERIENCE' | 'EDUCATION'>('ALL');

  // Filter chronology logs
  const filteredTimeline = timeline.filter(entry => {
    if (filter === 'ALL') return true;
    return entry.era.toLowerCase().includes(filter.toLowerCase());
  });

  const timelineSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://Dheerajkumar129.github.io/Myportfolio/timeline/#webpage",
        "url": "https://Dheerajkumar129.github.io/Myportfolio/timeline",
        "name": "Chronology Chronicle & Career Path | Dheeraj Kumar",
        "description": "Chronological path highlighting education background, internship simulated trainings, and professional contracts."
      }
    ]
  };

  return (
    <div className="min-h-screen py-28 px-6 md:px-12 max-w-7xl mx-auto w-full select-none">
      <SEO 
        title="Timeline Chronicle & Professional Logs | Dheeraj Kumar"
        description="Chronological journey logs highlighting MCA degree and professional AI training contracts."
        keywords="Education history, Outlier AI, Lovely Professional University, MCA degree, BCA degree"
        canonicalUrl="https://Dheerajkumar129.github.io/Myportfolio/timeline"
        schema={timelineSchema}
      />
      
      {/* Page Header */}
      <div className="mb-20 text-left max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-[1px] bg-[#a855f7]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a855f7]">
            Chronology chronicle
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-sans font-semibold tracking-tight text-white leading-none mb-6">
          Career Pathway
        </h1>
        <p className="text-base md:text-lg font-light leading-relaxed text-slate-400">
          A visual directory of Dheeraj's educational foundations, professional annotation contracts, and analytics simulations.
        </p>
      </div>

      {/* Filter controls */}
      <div className="mb-12 flex flex-wrap gap-2.5 items-center justify-start border-b border-white/5 pb-6">
        {(['ALL', 'EXPERIENCE', 'EDUCATION'] as const).map((mode) => {
          const isActive = filter === mode;
          return (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`relative px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 focus:outline-none border-none bg-transparent cursor-pointer ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTimelinePill"
                  className="absolute inset-0 rounded-full z-0 bg-white/5 border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.4)] backdrop-blur-md"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10 font-display uppercase tracking-widest">{mode}</span>
            </button>
          );
        })}
      </div>

      {/* CLEAN VERTICAL TIMELINE FEED */}
      <div className="relative border-l border-white/5 pl-8 md:pl-12 ml-4 space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredTimeline.map((entry, idx) => {
            const isEdu = entry.era.toLowerCase().includes('education');
            const IconComponent = isEdu ? GraduationCap : Briefcase;
            const markerColor = isEdu ? 'text-cyan-400 border-cyan-500/30' : 'text-amber-400 border-amber-500/30';

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative"
              >
                {/* Timeline Icon Node */}
                <div className={`absolute -left-[45px] md:-left-[61px] top-1 w-6 h-6 rounded-full bg-[#030014] border flex items-center justify-center z-10 ${markerColor}`}>
                  <IconComponent className="w-3.5 h-3.5" />
                </div>

                {/* Milestone Detail Card */}
                <CardSpotlight
                  className={`p-6 md:p-8 rounded-[24px] border transition-all duration-500 ${
                    isDark ? 'bg-neutral-900/30 border-white/5 hover:border-[#a855f7]/25' : 'bg-white border-slate-200 shadow-sm'
                  } text-left`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase ${
                        isEdu ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {entry.era}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="w-4 h-4 text-[#a855f7]" />
                      <span>{entry.period}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-sans font-semibold tracking-tight text-white mb-1">
                    {entry.title}
                  </h3>
                  
                  <div className="text-xs text-[#a855f7] mb-5 flex items-center gap-1.5 font-mono">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{entry.subtitle}</span>
                  </div>

                  <p className={`text-sm font-light leading-relaxed mb-6 font-sans ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {entry.description}
                  </p>

                  {/* Skills emphasis tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                    {Object.keys(entry.emphasis || {}).map((item) => (
                      <span
                        key={item}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-mono border ${
                          isDark ? 'bg-white/5 border-white/5 text-slate-350' : 'bg-slate-50 border-slate-200 text-slate-600 shadow-sm'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                </CardSpotlight>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}
