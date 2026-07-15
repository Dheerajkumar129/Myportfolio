import { motion } from 'framer-motion';
import type { SkillCategory, Strength } from '../types';

interface Props {
  categories: SkillCategory[];
  strengths: Strength[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
} as const;

export default function Skills({ categories, strengths }: Props) {
  return (
    <div className="min-h-screen bg-[#03030c] pt-32 pb-24 relative overflow-hidden">
      {/* Lighting Blur Blobs */}
      <div className="blur-blob blob-indigo top-[10%] left-[-15%]" />
      <div className="blur-blob blob-violet bottom-[15%] right-[-15%]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4"
          >
            Skills & Competency
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 text-sm max-w-lg mx-auto"
          >
            A breakdown of my professional skills, annotation tools, and frontend stacks.
          </motion.p>
        </div>

        {/* Strengths Strip */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          {strengths.map((s) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -2 }}
              className="p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent"
            >
              <div className="rounded-2xl bg-white/[0.01] backdrop-blur-2xl p-5 text-center border border-white/5 h-full flex flex-col items-center">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-white text-sm font-extrabold tracking-tight mb-1">{s.label}</div>
                <div className="text-slate-500 text-[10px] leading-relaxed mt-auto">{s.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Grid Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.05 }}
              className="p-[1px] rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-transparent"
            >
              <div className="rounded-3xl bg-white/[0.01] backdrop-blur-2xl p-6 border border-white/5 h-full flex flex-col hover:bg-white/[0.02] transition-colors duration-300">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl select-none">{cat.icon}</span>
                  <h3 className="font-extrabold text-white text-base tracking-tight">{cat.category}</h3>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300 text-xs font-semibold hover:border-indigo-500/30 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
