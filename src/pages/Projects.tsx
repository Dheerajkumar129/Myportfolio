import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import type { Project } from '../types';

interface Props {
  projects: Project[];
}

const categoryColors: Record<string, string> = {
  'AI / ML': 'text-violet-300 bg-violet-500/15 border-violet-500/30',
  'Desktop App': 'text-cyan-300 bg-cyan-500/15 border-cyan-500/30',
  'Systems': 'text-orange-300 bg-orange-500/15 border-orange-500/30',
  'AI / NLP': 'text-pink-300 bg-pink-500/15 border-pink-500/30',
  'Web App': 'text-green-300 bg-green-500/15 border-green-500/30',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const catClass = categoryColors[project.category] || 'text-indigo-300 bg-indigo-500/15 border-indigo-500/30';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold mb-3 ${catClass}`}>
            <Tag className="w-3 h-3" /> {project.category}
          </div>
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors leading-snug">
            {project.title}
          </h3>
        </div>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((t) => (
          <span key={t} className="tag text-xs">{t}</span>
        ))}
      </div>

      {/* Date */}
      <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-4">
        <Calendar className="w-3.5 h-3.5" /> {project.date}
      </div>

      {/* Expand highlights */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors"
      >
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {expanded ? 'Hide' : 'Show'} highlights
      </button>

      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <ul className="mt-4 space-y-2">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
              <span className="text-indigo-400 mt-0.5 shrink-0">▸</span>
              {h}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default function Projects({ projects }: Props) {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen animated-bg grid-overlay pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-heading">My Projects</h1>
          <p className="section-sub">
            A showcase of ML systems, desktop apps, and web solutions
          </p>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  filter === cat
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    : 'glass text-slate-400 border-transparent hover:text-white hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
