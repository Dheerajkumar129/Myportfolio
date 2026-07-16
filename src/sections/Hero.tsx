import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { HeroConfig } from '../types';
import NeuralBrain from '../components/AnimatedOrb';
import ConstellationGrid from '../components/ParticleMesh';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  config: HeroConfig;
  isDark: boolean;
}

export default function Hero({ config, isDark }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <section 
      id="about" 
      className={`relative min-h-[100vh] flex items-center justify-center pt-28 pb-16 overflow-hidden ${
        isDark 
          ? 'bg-[#030014] text-white' 
          : 'bg-slate-50 text-neutral-900'
      }`}
    >
      {/* Subtle dot pattern background */}
      <div 
        className={`absolute inset-0 z-0 opacity-[0.03] ${
          isDark 
            ? 'bg-[radial-gradient(circle,rgba(255,255,255,0.25)_1px,transparent_1px)]' 
            : 'bg-[radial-gradient(circle,rgba(0,0,0,0.15)_1px,transparent_1px)]'
        }`}
        style={{ backgroundSize: '32px 32px' }}
      />
      
      {/* Ambient gradient blobs */}
      <div className={`absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full filter blur-[120px] pointer-events-none ${
        isDark ? 'bg-purple-600/10' : 'bg-indigo-300/20'
      }`} />
      <div className={`absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full filter blur-[100px] pointer-events-none ${
        isDark ? 'bg-cyan-600/8' : 'bg-sky-300/15'
      }`} />

      {/* Constellation starfield background */}
      <ConstellationGrid />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[70vh]">
          
          {/* Left Column — Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start gap-6 text-left"
          >
            {/* Status Badge */}
            <motion.div 
              variants={itemVariants} 
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-bold tracking-[0.2em] font-sans uppercase ${
                isDark 
                  ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' 
                  : 'bg-purple-50 border-purple-200 text-purple-600 shadow-sm'
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{config.badge}</span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className={`text-[2.6rem] sm:text-5xl md:text-7xl font-sans font-semibold tracking-tight leading-[0.95] ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                {config.titleName}<br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  isDark 
                    ? 'from-purple-400 via-cyan-400 to-indigo-400' 
                    : 'from-purple-600 via-indigo-600 to-cyan-600'
                } font-medium`}>{config.headline}</span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p 
              variants={itemVariants}
              className={`text-base md:text-lg font-light leading-relaxed max-w-md ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {config.subtext}
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 mt-2">
              <Link
                to="/projects"
                className={`py-3.5 px-8 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 focus:outline-none transition-all duration-300 hover:scale-[1.03] cursor-pointer ${
                  isDark 
                    ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.08)]' 
                    : 'bg-neutral-900 text-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]'
                }`}
              >
                <span>Explore Work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="mailto:dheerajkumar7135227@gmail.com?subject=Requesting%20Resume%20-%20Dheeraj%20Kumar"
                className={`py-3.5 px-8 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 focus:outline-none transition-all duration-300 hover:scale-[1.03] cursor-pointer border ${
                  isDark 
                    ? 'border-white/15 text-white hover:bg-white/5' 
                    : 'border-neutral-300 text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <span>Request Resume</span>
              </a>
            </motion.div>

            {/* Trust Row */}
            <motion.div variants={itemVariants} className={`mt-8 pt-8 border-t w-full max-w-lg select-none ${
              isDark ? 'border-white/5' : 'border-neutral-200'
            }`}>
              <span className={`text-[10px] block uppercase font-sans tracking-[0.3em] mb-4 font-bold ${
                isDark ? 'text-slate-500' : 'text-slate-500'
              }`}>
                Verified Credentials
              </span>
              <div className="flex flex-wrap gap-x-5 gap-y-3.5 items-center">
                {config.trustRow.map((label, index) => (
                  <div key={label} className="flex items-center gap-3">
                    {index > 0 && <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-white/15' : 'bg-neutral-300'}`} />}
                    <span className={`text-sm font-medium ${
                      isDark ? 'text-slate-300' : 'text-neutral-700'
                    }`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
          
          {/* Right Column — Neural Brain Visualization */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full pt-6 lg:pt-0">
            <NeuralBrain isDark={isDark} />
          </div>

        </div>
      </div>
    </section>
  );
}
