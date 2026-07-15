import { motion } from 'motion/react';
import type { SkillCategory, PrestigeStrength } from '../types';
import { 
  Cpu, 
  Database, 
  Cloud, 
  Layers, 
  Zap, 
  Server, 
  ShieldCheck
} from 'lucide-react';
import SEO from '../components/SEO';
import CardSpotlight from '../components/CardSpotlight';

interface SkillsProps {
  categories: SkillCategory[];
  strengths: PrestigeStrength[];
  isDark: boolean;
}

export default function Skills({ categories, strengths, isDark }: SkillsProps) {
  // Bento structure sizing formulas for categories
  const getBentoSpan = (index: number) => {
    if (index === 0) return 'col-span-1 lg:col-span-8';
    if (index === 1) return 'col-span-1 lg:col-span-4';
    if (index % 3 === 0) return 'col-span-1 lg:col-span-6';
    if (index % 3 === 1) return 'col-span-1 lg:col-span-6';
    return 'col-span-1 lg:col-span-12';
  };

  // Map category title to standard Lucide icons dynamically
  const getCategoryIcon = (title: string) => {
    const norm = (title || '').toLowerCase();
    if (norm.includes('languages') || norm.includes('web core')) return Server;
    if (norm.includes('ai') || norm.includes('annotation') || norm.includes('alignment')) return Cpu;
    if (norm.includes('frameworks') || norm.includes('technologies')) return Layers;
    if (norm.includes('tools') || norm.includes('utilities')) return Database;
    return ShieldCheck;
  };

  // Dynamic Strength Icon Lookup
  const getIconComponent = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'cpu': return Cpu;
      case 'cloud': return Cloud;
      case 'database': return Database;
      case 'layers': return Layers;
      default: return Database;
    }
  };

  // Map proficiency level to percentage width
  const getProficiencyWidth = (level: string) => {
    const norm = (level || '').toLowerCase();
    if (norm.includes('expert')) return 'w-[95%]';
    if (norm.includes('advanced')) return 'w-[85%]';
    return 'w-[70%]';
  };

  const getProficiencyText = (level: string) => {
    const norm = (level || '').toLowerCase();
    if (norm.includes('expert')) return '95%';
    if (norm.includes('advanced')) return '85%';
    return '70%';
  };

  const principles = [
    {
      title: 'Human-in-the-Loop Precision',
      desc: 'High-quality model alignment requires meticulous truthfulness, reasoning checks, and strict adherence to editorial styling guides.'
    },
    {
      title: 'Responsive Modular UI',
      desc: 'Design components with isolated reusability, seamless state transitions, and responsive fluid grids first.'
    },
    {
      title: 'Structured Evaluation',
      desc: 'Apply rigorous criteria to rate and review AI generations, debugging reasoning errors, and auditing logic consistency.'
    },
    {
      title: 'Performance & Optimization',
      desc: 'Build web systems prioritizing minimal bundle sizes, optimized rendering pathways, and clean script logic.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  const skillsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://Dheerajkumar129.github.io/Myportfolio/skills/#webpage",
        "url": "https://Dheerajkumar129.github.io/Myportfolio/skills",
        "name": "Skills Stack & Technical Core | Dheeraj Kumar",
        "description": "Bento Grid directory mapping out the programming languages, web frameworks, and AI data alignment capacities of Dheeraj Kumar."
      }
    ]
  };

  return (
    <div className="min-h-screen py-28 px-6 md:px-12 max-w-7xl mx-auto w-full select-none">
      <SEO 
        title="Technical Stack & Core Proficiencies | Dheeraj Kumar"
        description="Review the technical stack, programming languages, front-end libraries, and AI training capabilities of Dheeraj Kumar."
        keywords="Python, React JS, TypeScript, RLHF training, SQL, C++, HTML5, Data Annotation"
        canonicalUrl="https://Dheerajkumar129.github.io/Myportfolio/skills"
        schema={skillsSchema}
      />
      
      {/* HERO INTRO */}
      <div className="mb-20 text-left max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-bold tracking-[0.2em] font-sans uppercase w-fit mb-6 ${
            isDark 
              ? 'bg-[#a855f7]/15 border-[#a855f7]/30 text-[#c084fc]' 
              : 'bg-[#a855f7]/10 border-[#a855f7]/20 text-[#a855f7]'
          }`}
        >
          <Zap className="w-3.5 h-3.5 animate-pulse text-[#c084fc]" />
          <span>DEVELOPER STACK CONFIG</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl font-sans font-semibold tracking-tight leading-none mb-6"
        >
          Engineering Intelligence<br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
            isDark 
              ? 'from-white via-white/80 to-white/40' 
              : 'from-neutral-950 via-neutral-900 to-neutral-500'
          } italic font-serif font-medium`}>Across AI, Web &amp; Systems</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`text-base md:text-lg font-light max-w-2xl leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-655'
          }`}>
          Applying advanced output evaluations and prompt optimizations to AI model training, while building clean modular web interfaces.
        </motion.p>
      </div>

      {/* TECHNOLOGY ECOSYSTEM BENTO */}
      <div className="mb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold tracking-tight font-sans">Technology Ecosystem</h2>
          <span className={`text-[10px] font-mono tracking-widest uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Asymmetric Bento View
          </span>
        </div>

        {categories.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {categories.map((cat, index) => {
              const spanClass = getBentoSpan(index);
              const Icon = getCategoryIcon(cat.title);

              return (
                <motion.div
                  key={cat.title}
                  layout
                  variants={itemVariants}
                  className={spanClass}
                >
                  <CardSpotlight
                    className={`h-full p-6 md:p-8 rounded-[40px] border transition-all duration-500 hover:shadow-2xl flex flex-col justify-between group relative overflow-hidden ${
                      isDark 
                        ? 'bg-neutral-900/30 border-white/5 hover:border-[#a855f7]/35 shadow-sm' 
                        : 'bg-white hover:bg-slate-100/50 border-neutral-200/60 hover:border-[#a855f7]/25 shadow-sm'
                    }`}
                  >
                    <div className="absolute -right-20 -bottom-20 w-60 h-60 rounded-full filter blur-[80px] opacity-0 group-hover:opacity-100 bg-[#a855f7]/10 pointer-events-none transition-opacity duration-500" />

                    <div className="w-full">
                      <div className="flex items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${
                            isDark ? 'bg-white/5 text-white/80' : 'bg-slate-100 text-neutral-800'
                          } group-hover:bg-[#a855f7] group-hover:text-white transition-colors duration-300`}>
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <h3 className="text-sm font-semibold tracking-wider font-sans uppercase">
                            {cat.title}
                          </h3>
                        </div>
                        <span className={`text-[9px] font-mono tracking-widest ${isDark ? 'text-slate-300' : 'text-slate-655'}`}>
                          {(cat.skills || []).length} Units
                        </span>
                      </div>

                      {/* Displaying skills with glowing progress indicators */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {(cat.skills || []).map(skill => (
                          <div key={skill.name} className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between text-xs px-1">
                              <span className="font-semibold">{skill.name}</span>
                              <span className="text-[10px] font-mono opacity-65 flex items-center gap-1">
                                {skill.level}
                                <span className="text-[#a855f7] font-bold">({getProficiencyText(skill.level)})</span>
                              </span>
                            </div>
                            <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-150'}`}>
                              <div 
                                className={`h-full rounded-full bg-gradient-to-r from-[#a855f7] to-cyan-400 ${getProficiencyWidth(skill.level)}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`text-[10px] font-mono leading-none tracking-wide pt-4 border-t flex items-center justify-between ${
                      isDark ? 'border-white/[0.06] text-slate-300' : 'border-neutral-100 text-slate-600'
                    }`}>
                      <span>System Reliability</span>
                      <span className="text-emerald-500 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Verified
                      </span>
                    </div>
                  </CardSpotlight>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-20 border border-dashed rounded-[40px] border-neutral-800">
            <span className="text-xs font-mono text-slate-500">No skill categories configured.</span>
          </div>
        )}
      </div>

      {/* CORE ENGINEERING STRENGTHS */}
      <div className="mb-24 border-t border-white/5 pt-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold font-sans tracking-tight">Core Competencies</h2>
          <span className={`text-[10px] font-mono tracking-widest uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Trust Signals
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengths.map((strength) => {
            const IconComponent = getIconComponent(strength.icon);
            return (
              <div key={strength.id}>
                <CardSpotlight
                  className={`h-full p-6 rounded-[32px] border flex flex-col justify-between group transition-all duration-300 ${
                    isDark 
                      ? 'bg-neutral-900/30 border-white/5 hover:border-white/15' 
                      : 'bg-white border-neutral-200 hover:border-neutral-350 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-[#a855f7] group-hover:scale-105 transition-transform duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-semibold tracking-tight font-sans group-hover:text-[#a855f7] transition-colors">
                        {strength.title}
                      </h3>
                    </div>
                    <p className={`text-xs font-light leading-relaxed mb-6 ${
                      isDark ? 'text-slate-200' : 'text-slate-705'
                    }`}>
                      {strength.desc}
                    </p>
                  </div>

                  <div className={`pt-4 border-t border-solid flex items-center justify-between ${
                    isDark ? 'border-white/[0.06]' : 'border-neutral-100'
                  }`}>
                    <span className={`text-[9px] uppercase font-mono tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Focus Area
                    </span>
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-[#a855f7] uppercase">
                      {strength.signal}
                    </span>
                  </div>
                </CardSpotlight>
              </div>
            );
          })}
        </div>
      </div>

      {/* ENGINEERING PHILOSOPHY */}
      <div className="mb-24 border-t border-white/5 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 flex flex-col justify-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a855f7] block mb-3">
              METHODOLOGY
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight mb-4">
              How I Build Systems
            </h2>
            <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              My systematic development paradigm structured around data precision, UI clean-code, and technical safety.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((p, idx) => (
              <div key={p.title} className="text-left">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xl font-mono font-medium ${isDark ? 'text-white/20' : 'text-neutral-300'}`}>
                    0{idx + 1}
                  </span>
                  <h3 className="text-base font-semibold tracking-tight font-sans">
                    {p.title}
                  </h3>
                </div>
                <p className={`text-xs font-light leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-605'}`}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* TRUST SECTION */}
      <div className="border-t border-white/5 pt-16 text-center select-none">
        <span className={`text-[10px] uppercase font-mono tracking-[0.3em] font-bold block mb-6 ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Core Focus Wall
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-50 hover:opacity-100 transition-opacity duration-500">
          {['RLHF Training', 'Data Quality', 'React JS UI', 'Logical Fact-Checking', 'C1 English Comms', 'Clean Code Guidelines'].map((item, idx) => (
            <div key={item} className="flex items-center gap-2">
              {idx > 0 && <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-white/20' : 'bg-slate-350'}`} />}
              <span className={`text-xs font-semibold tracking-wider ${isDark ? 'text-white/80' : 'text-neutral-800'}`}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
