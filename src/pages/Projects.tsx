import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import type { Project } from '../types';

interface Props {
  projects: Project[];
}

const categoryColors: Record<string, string> = {
  'AI / ML': 'text-purple-300 bg-purple-500/10 border-purple-500/20',
  'Desktop App': 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
  'Systems': 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  'AI / NLP': 'text-pink-300 bg-pink-500/10 border-pink-500/20',
  'Web App': 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
} as const;

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const catClass = categoryColors[project.category] || 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20';

  return (
    <motion.div
      variants={cardVariants}
      layout="position"
      className="p-[1px] rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-transparent shadow-xl"
    >
      <div className="rounded-3xl bg-white/[0.01] backdrop-blur-2xl p-6 border border-white/5 flex flex-col h-full hover:bg-white/[0.03] transition-colors duration-300">
        {/* Header */}
        <div className="flex flex-col mb-4">
          <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider w-fit mb-3.5 ${catClass}`}>
            <Tag className="w-3 h-3" /> {project.category}
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-[10px] font-semibold">
              {t}
            </span>
          ))}
        </div>

        {/* Footer info & Toggle */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5" /> {project.date}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-indigo-300 text-xs font-bold hover:text-indigo-200 transition-colors"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {expanded ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-white/5">
                <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2.5">Key Highlights:</h4>
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
                      <span className="text-indigo-400 font-bold select-none">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Projects({ projects }: Props) {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-[#03030c] pt-32 pb-24 relative overflow-hidden">
      {/* Lighting Blur Blobs */}
      <div className="blur-blob blob-indigo top-[-10%] left-[-10%]" />
      <div className="blur-blob blob-cyan bottom-[-10%] right-[-10%]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4"
          >
            Built Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 text-sm max-w-lg mx-auto"
          >
            A curated showcase of ML applications, automation systems, and web architectures.
          </motion.p>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mt-8 max-w-xl mx-auto p-1.5 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-md"
          >
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="relative px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-300"
                  style={{
                    color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 rounded-xl bg-white/5 border border-white/10"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
