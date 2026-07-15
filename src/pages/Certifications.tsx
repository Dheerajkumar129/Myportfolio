import { motion } from 'framer-motion';
import type { Certification } from '../types';
import { Award, Calendar } from 'lucide-react';

interface Props {
  certifications: Certification[];
}

const ISSUER_COLORS: Record<string, string> = {
  'Coursera (IBM)': 'from-blue-500 to-cyan-500 shadow-blue-500/10',
  'Coursera': 'from-blue-500 to-indigo-500 shadow-indigo-500/10',
  'CipherSchools': 'from-orange-500 to-red-500 shadow-orange-500/10',
  'Simplilearn (SkillUp)': 'from-green-500 to-teal-500 shadow-green-500/10',
  'upGrad Campus': 'from-purple-500 to-pink-500 shadow-purple-500/10',
  'Google Developers Launchpad': 'from-red-500 to-yellow-500 shadow-red-500/10',
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

export default function Certifications({ certifications }: Props) {
  return (
    <div className="min-h-screen bg-[#03030c] pt-32 pb-24 relative overflow-hidden">
      {/* Lighting Blur Blobs */}
      <div className="blur-blob blob-indigo top-[-10%] left-[-15%]" />
      <div className="blur-blob blob-violet bottom-[-10%] right-[-15%]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4"
          >
            Certifications
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 text-sm max-w-lg mx-auto"
          >
            Verified professional credentials and academic course achievements.
          </motion.p>
        </div>

        {/* Credentials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert, i) => {
            const gradient = ISSUER_COLORS[cert.issuer] || 'from-indigo-500 to-purple-600 shadow-indigo-500/10';
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -3 }}
                className="p-[1px] rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-transparent"
              >
                <div className="rounded-3xl bg-white/[0.01] backdrop-blur-2xl p-6 border border-white/5 h-full flex flex-col hover:bg-white/[0.02] transition-colors duration-300">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg`}>
                    <Award className="w-5.5 h-5.5 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-white text-base leading-snug tracking-tight mb-4 flex-1">
                    {cert.title}
                  </h3>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-slate-400 text-xs font-semibold">{cert.issuer}</span>
                    <span className="flex items-center gap-1.5 text-slate-500 text-xs font-mono">
                      <Calendar className="w-3.5 h-3.5" /> {cert.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Summary Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 border-t border-white/5 pt-12"
        >
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto p-6 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-md text-center">
            {[
              { label: 'Total Verified', value: certifications.length.toString() },
              { label: 'Major Platforms', value: '5' },
              { label: 'Timeline', value: '2021–2024' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
