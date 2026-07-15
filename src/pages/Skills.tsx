import { motion } from 'framer-motion';
import type { SkillCategory, Strength } from '../types';

interface Props {
  categories: SkillCategory[];
  strengths: Strength[];
}

export default function Skills({ categories, strengths }: Props) {
  return (
    <div className="min-h-screen animated-bg grid-overlay pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-heading">Skills & Expertise</h1>
          <p className="section-sub">Technologies and abilities I bring to every project</p>
        </motion.div>

        {/* Strengths Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {strengths.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-hover rounded-2xl p-4 text-center"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-slate-200 text-sm font-bold">{s.label}</div>
              <div className="text-slate-500 text-xs mt-1">{s.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-bold text-slate-200">{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.05 + si * 0.04 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/8 text-slate-300 hover:border-indigo-500/40 hover:text-indigo-300 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
