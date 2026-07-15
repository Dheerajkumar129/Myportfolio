import { motion } from 'framer-motion';
import type { Certification } from '../types';
import { Award, Calendar } from 'lucide-react';

interface Props {
  certifications: Certification[];
}

const ISSUER_COLORS: Record<string, string> = {
  'Coursera (IBM)': 'from-blue-500 to-cyan-500',
  'Coursera': 'from-blue-500 to-indigo-500',
  'CipherSchools': 'from-orange-500 to-red-500',
  'Simplilearn (SkillUp)': 'from-green-500 to-teal-500',
  'upGrad Campus': 'from-purple-500 to-pink-500',
  'Google Developers Launchpad': 'from-red-500 to-yellow-500',
};

export default function Certifications({ certifications }: Props) {
  return (
    <div className="min-h-screen animated-bg grid-overlay pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-heading">Certifications</h1>
          <p className="section-sub">Verified credentials from leading platforms</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {certifications.map((cert, i) => {
            const gradient = ISSUER_COLORS[cert.issuer] || 'from-indigo-500 to-violet-600';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 group hover:border-indigo-500/30 transition-all duration-300 flex flex-col"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Award className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-bold text-slate-100 text-sm leading-snug mb-4 flex-1 group-hover:text-indigo-300 transition-colors">
                  {cert.title}
                </h3>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                  <span className="text-slate-400 text-xs font-medium">{cert.issuer}</span>
                  <span className="flex items-center gap-1 text-slate-500 text-xs">
                    <Calendar className="w-3 h-3" /> {cert.date}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mt-12 pt-10 border-t border-white/5"
        >
          {[
            { label: 'Total Certifications', value: certifications.length.toString() },
            { label: 'Platforms', value: '6' },
            { label: 'Year Span', value: '2021–2024' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black gradient-text">{stat.value}</div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
