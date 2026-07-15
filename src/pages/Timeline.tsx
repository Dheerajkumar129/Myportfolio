import { motion } from 'framer-motion';
import type { TimelineItem } from '../types';
import { Briefcase, GraduationCap, Trophy } from 'lucide-react';

interface Props {
  timeline: TimelineItem[];
}

const typeConfig = {
  work: { icon: Briefcase, color: 'from-indigo-500 to-violet-600', dot: 'bg-indigo-500', label: 'Work' },
  education: { icon: GraduationCap, color: 'from-cyan-500 to-blue-600', dot: 'bg-cyan-500', label: 'Education' },
  achievement: { icon: Trophy, color: 'from-yellow-500 to-orange-500', dot: 'bg-yellow-500', label: 'Achievement' },
};

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const cfg = typeConfig[item.type];
  const Icon = cfg.icon;
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex ${isLeft ? 'md:justify-end' : 'md:justify-start'} md:w-1/2 ${isLeft ? 'md:pr-8 md:left-0' : 'md:pl-8 md:left-1/2'}`}
    >
      {/* Timeline dot */}
      <div className={`absolute top-5 hidden md:block ${isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}>
        <div className={`w-4 h-4 rounded-full ${cfg.dot} border-4 border-[rgb(10,10,20)] z-10 relative`} />
      </div>

      <div className="glass rounded-2xl p-5 max-w-md w-full hover:border-indigo-500/30 transition-all duration-300 group">
        {/* Type badge */}
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${cfg.color} text-white text-xs font-semibold mb-3`}>
          <Icon className="w-3 h-3" /> {cfg.label}
        </div>

        <h3 className="font-bold text-slate-100 text-base group-hover:text-indigo-300 transition-colors mb-1">
          {item.title}
        </h3>

        <div className="text-indigo-300 font-semibold text-sm mb-1">{item.organization}</div>

        {item.location && (
          <div className="text-slate-500 text-xs mb-1">📍 {item.location}</div>
        )}

        <div className="text-slate-500 text-xs mb-3 font-mono">⏱ {item.period}</div>

        <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>

        {item.grade && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-semibold">
            🎓 {item.grade}
          </div>
        )}

        {item.details && item.details.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {item.details.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                <span className="text-indigo-400 mt-0.5 shrink-0">▸</span> {d}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export default function Timeline({ timeline }: Props) {
  return (
    <div className="min-h-screen animated-bg grid-overlay pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="section-heading">My Journey</h1>
          <p className="section-sub">Education, experience, and milestones that shaped me</p>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4">
            {Object.entries(typeConfig).map(([type, cfg]) => (
              <div key={type} className="flex items-center gap-2 text-xs text-slate-400">
                <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                {cfg.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Desktop alternating timeline */}
        <div className="relative hidden md:block">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-violet-500/30 to-transparent" />

          <div className="relative flex flex-col gap-10">
            {timeline.map((item, i) => (
              <TimelineCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile list */}
        <div className="relative md:hidden">
          {/* Left line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-violet-500/30 to-transparent" />
          <div className="flex flex-col gap-6 pl-10">
            {timeline.map((item, i) => {
              const cfg = typeConfig[item.type];
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className={`absolute -left-10 top-5 w-4 h-4 rounded-full ${cfg.dot} border-4 border-[rgb(10,10,20)]`} />
                  <div className="glass rounded-2xl p-5">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${cfg.color} text-white text-xs font-semibold mb-3`}>
                      <Icon className="w-3 h-3" /> {cfg.label}
                    </div>
                    <h3 className="font-bold text-slate-100 text-sm mb-1">{item.title}</h3>
                    <div className="text-indigo-300 text-xs mb-1">{item.organization}</div>
                    <div className="text-slate-500 text-xs mb-2">{item.period}</div>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                    {item.grade && (
                      <div className="mt-2 text-green-300 text-xs font-semibold">🎓 {item.grade}</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
