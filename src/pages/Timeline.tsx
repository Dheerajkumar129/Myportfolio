import { motion } from 'framer-motion';
import type { TimelineItem } from '../types';
import { Briefcase, GraduationCap, Trophy } from 'lucide-react';

interface Props {
  timeline: TimelineItem[];
}

const typeConfig = {
  work: { icon: Briefcase, color: 'from-indigo-500 to-purple-600', border: 'border-indigo-500/20', dot: 'bg-indigo-500', label: 'Experience' },
  education: { icon: GraduationCap, color: 'from-cyan-500 to-blue-600', border: 'border-cyan-500/20', dot: 'bg-cyan-500', label: 'Education' },
  achievement: { icon: Trophy, color: 'from-amber-500 to-orange-500', border: 'border-amber-500/20', dot: 'bg-amber-500', label: 'Milestone' },
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
      transition={{ type: 'spring', stiffness: 80, damping: 15, delay: index * 0.05 }}
      className={`relative flex ${isLeft ? 'md:justify-end' : 'md:justify-start'} md:w-1/2 ${isLeft ? 'md:pr-12 md:left-0' : 'md:pl-12 md:left-1/2'}`}
    >
      {/* Timeline Dot (Center line anchor) */}
      <div className={`absolute top-6 hidden md:block ${isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}>
        <div className={`w-3.5 h-3.5 rounded-full ${cfg.dot} border-4 border-[#03030c] z-10 relative shadow-[0_0_10px_rgba(99,102,241,0.5)]`} />
      </div>

      <div className="w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-transparent hover:from-white/15 transition-all duration-300">
        <div className="rounded-3xl bg-white/[0.01] backdrop-blur-2xl p-6 border border-white/5 flex flex-col hover:bg-white/[0.03] transition-colors duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${cfg.color} text-white text-[10px] font-extrabold uppercase tracking-wider`}>
              <Icon className="w-3.5 h-3.5" /> {cfg.label}
            </span>
            <span className="text-slate-500 text-xs font-mono">{item.period}</span>
          </div>

          <h3 className="font-extrabold text-white text-lg tracking-tight leading-snug mb-1">
            {item.title}
          </h3>
          <div className="text-indigo-300 font-bold text-sm mb-2">{item.organization}</div>

          {item.location && (
            <div className="text-slate-500 text-xs mb-3 flex items-center gap-1">
              <span>📍</span> {item.location}
            </div>
          )}

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">{item.description}</p>

          {item.grade && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold w-fit">
              {item.grade}
            </div>
          )}

          {item.details && item.details.length > 0 && (
            <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
              {item.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
                  <span className="text-indigo-400 font-bold select-none">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline({ timeline }: Props) {
  return (
    <div className="min-h-screen bg-[#03030c] pt-32 pb-24 relative overflow-hidden">
      {/* Lighting Blur Blobs */}
      <div className="blur-blob blob-indigo top-[-10%] right-[-10%]" />
      <div className="blur-blob blob-cyan bottom-[-10%] left-[-10%]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4"
          >
            My Timeline
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 text-sm max-w-lg mx-auto"
          >
            Experience, academic history, and career milestones.
          </motion.p>
        </div>

        {/* Alternating Line Layout (Desktop) */}
        <div className="relative hidden md:block mt-12">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent -translate-x-1/2" />

          <div className="relative flex flex-col gap-12">
            {timeline.map((item, i) => (
              <TimelineCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="relative md:hidden mt-8 pl-8">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent" />

          <div className="flex flex-col gap-8">
            {timeline.map((item, i) => {
              const cfg = typeConfig[item.type];
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative"
                >
                  <div className={`absolute -left-8 top-6 w-3 h-3 rounded-full ${cfg.dot} border-4 border-[#03030c] shadow-[0_0_10px_rgba(99,102,241,0.5)]`} />
                  
                  <div className="p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
                    <div className="rounded-3xl bg-white/[0.01] p-5 border border-white/5">
                      <div className="flex items-center justify-between mb-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${cfg.color} text-white text-[9px] font-extrabold uppercase tracking-wider`}>
                          <Icon className="w-3.5 h-3.5" /> {cfg.label}
                        </span>
                        <span className="text-slate-500 text-[10px] font-mono">{item.period}</span>
                      </div>
                      <h3 className="font-extrabold text-white text-base tracking-tight leading-snug mb-1">{item.title}</h3>
                      <div className="text-indigo-300 text-xs font-bold mb-2">{item.organization}</div>
                      <p className="text-slate-400 text-xs leading-relaxed mb-3">{item.description}</p>
                      {item.grade && (
                        <div className="inline-flex px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold">
                          {item.grade}
                        </div>
                      )}
                    </div>
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
