import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { JourneyMilestone } from '../types';
import SEO from '../components/SEO';
import CardSpotlight from '../components/CardSpotlight';
import { GitBranch, GitCommit, Calendar, User } from 'lucide-react';

interface TimelineProps {
  timeline: JourneyMilestone[];
}

export default function Timeline({ timeline = [] }: TimelineProps) {
  const [filter, setFilter] = useState<'ALL' | 'EXPERIENCE' | 'EDUCATION'>('ALL');

  // Filter chronologies
  const filteredTimeline = timeline.filter(entry => {
    if (filter === 'ALL') return true;
    return entry.era.toLowerCase().includes(filter.toLowerCase());
  });

  const getHash = (id: string) => {
    // Generate a stable simulated git commit hash from entry ID
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hex = Math.abs(hash).toString(16).substring(0, 7);
    return hex.padEnd(7, 'a');
  };

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
    <div className="min-h-screen py-28 px-6 md:px-12 max-w-7xl mx-auto w-full select-none font-mono">
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
          <GitBranch className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">
            git log --graph --oneline
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-sans font-semibold tracking-tight text-white leading-none mb-6">
          Chronology Logs
        </h1>
        <p className="text-xs md:text-sm font-light leading-relaxed text-slate-400">
          Inspecting Dheeraj's career pathway formatted as a terminal git revision control branch tree.
        </p>
      </div>

      {/* Retro filter controls */}
      <div className="mb-12 flex items-center justify-start border-b border-white/5 pb-6 gap-3">
        {(['ALL', 'EXPERIENCE', 'EDUCATION'] as const).map((mode) => {
          const isActive = filter === mode;
          return (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-3 py-1.5 rounded text-xs font-semibold tracking-widest transition-colors cursor-pointer border-none bg-transparent ${
                isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'text-slate-500 hover:text-slate-350'
              }`}
            >
              bin/{mode.toLowerCase()}
            </button>
          );
        })}
      </div>

      {/* GIT GRAPH CHRONICLER */}
      <div className="relative border-l border-white/5 pl-8 md:pl-12 ml-4 space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredTimeline.map((entry, idx) => {
            const commitHash = getHash(entry.id);
            const isEdu = entry.era.toLowerCase().includes('education');
            const nodeColor = isEdu ? 'text-cyan-400' : 'text-amber-500';
            const nodeGlow = isEdu ? 'shadow-[0_0_10px_#22d3ee]' : 'shadow-[0_0_10px_#f59e0b]';

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative"
              >
                {/* Git Node Circle Icon */}
                <div className={`absolute -left-[45px] md:-left-[61px] top-1 w-6 h-6 rounded-full bg-[#05060a] border border-white/10 flex items-center justify-center z-10 ${nodeColor} ${nodeGlow}`}>
                  <GitCommit className="w-3.5 h-3.5" />
                </div>

                {/* Commit Shell wrapper */}
                <CardSpotlight
                  className="p-6 md:p-8 rounded-2xl border bg-neutral-900/20 border-white/5 hover:border-emerald-500/20 text-left group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs">
                      <span className="text-emerald-400 font-bold">commit {commitHash}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        isEdu ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        ({entry.era.toUpperCase()})
                      </span>
                      <span className="text-slate-500">HEAD -&gt; origin/{entry.era.toLowerCase().split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{entry.period}</span>
                    </div>
                  </div>

                  <h3 className="text-base md:text-lg font-sans font-semibold tracking-tight text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {entry.title}
                  </h3>
                  
                  <div className="text-[10px] md:text-xs text-slate-400 mb-4 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Author: Dheeraj Kumar &lt;{entry.subtitle}&gt;</span>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-350 font-sans font-light mb-6 select-text">
                    {entry.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {Object.keys(entry.emphasis || {}).map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 rounded text-[9px] font-bold bg-white/5 border border-white/5 text-slate-350"
                      >
                        +{item}
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
