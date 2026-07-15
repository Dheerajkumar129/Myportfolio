import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { HeroConfig, HomeCard, Project, SkillCategory } from '../types';
import Hero from '../sections/Hero';
import SEO from '../components/SEO';
import TerminalShell from '../components/TerminalShell';
import CardSpotlight from '../components/CardSpotlight';
import { 
  Award, 
  Database, 
  Cpu, 
  Mail, 
  Layers, 
  ArrowRight, 
  FileCode, 
  Settings, 
  GitBranch
} from 'lucide-react';

interface HomeProps {
  config: HeroConfig;
  homeCards: HomeCard[];
  projects: Project[];
  skills: SkillCategory[];
  isDark: boolean;
}

type FileTab = 'about_me.json' | 'skills_index.yaml' | 'projects_list.json' | 'contact_me.sh';

export default function Home({ config, homeCards = [], projects = [], skills = [], isDark }: HomeProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<FileTab>('about_me.json');
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Local ticker for system clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getCardIcon = (id: string) => {
    switch (id) {
      case 'ai-assistant': return Cpu;
      case 'availability': return Award;
      case 'featured-stack': return Database;
      case 'quick-connect': return Mail;
      default: return Layers;
    }
  };

  // Mock IDE File content definitions
  const fileContents = {
    'about_me.json': `{
  "developer": "Dheeraj Kumar",
  "specialty": "AI Alignment & Frontend Interfaces",
  "summary": "MCA graduate with 1+ year of professional experience in RLHF, instruction following, and responsive UI components.",
  "academic_track": "Master of Computer Applications (lovely Professional University)",
  "language_matrix": {
    "english": "C1 Advanced Proficiency (Certified)",
    "hindi": "Native"
  }
}`,
    'skills_index.yaml': `ai_alignment:
  - Reinforcement Learning from Human Feedback (RLHF)
  - Fact-checking & Truthfulness validation
  - Prompt Engineering optimizations
frontend:
  - React JS (Modular Hooks)
  - TypeScript interfaces
  - TailwindCSS styling
systems:
  - Python scripting
  - SQLite CRUD operations
  - C++ object-oriented design`,
    'projects_list.json': `[
  {
    "id": "isl-recognition-system",
    "name": "Indian Sign Language Recognition",
    "type": "Deep learning gesture translation",
    "accuracy": "94%",
    "fps": "30fps"
  },
  {
    "id": "inventory-management",
    "name": "Desktop Inventory tracker",
    "type": "Tkinter full transactional CRUD",
    "latency": "<5ms"
  }
]`,
    'contact_me.sh': `#!/bin/bash
# Execute communication links

export EMAIL="dheerajkumar7135227@gmail.com"
export PHONE="+91 9801657880"
export LINKEDIN="linkedin.com/in/dheerajkumar45"
export GITHUB="github.com/Dheerajkumar129"

echo "Transmission lines open. Discussing projects now..."`
  };

  const faqData = [
    {
      q: "Who is Dheeraj Kumar?",
      a: "Dheeraj Kumar is an AI Trainer and Frontend Developer specializing in Reinforcement Learning from Human Feedback (RLHF), structured data annotations for LLM alignment, and building interactive, responsive React applications."
    },
    {
      q: "What technical stack does Dheeraj use?",
      a: "His core technical skills include Python (data, deep learning basics), JavaScript (ES6+), React JS, TypeScript, C/C++, SQL, TailwindCSS, and data visualization software like Tableau."
    },
    {
      q: "What experience does he have in AI annotation?",
      a: "He has worked with platforms like Outlier.ai and Alignerr, contributing directly to LLM training data, writing fact-checked logical proofs, reviewing instruction-following tasks, and providing critique feedback."
    },
    {
      q: "Is Dheeraj available for remote developer contracts?",
      a: "Yes, Dheeraj is available for remote frontend development contracts, AI training engagements, and logic review tasks. He holds a C1 Advanced English proficiency certificate for global collaboration."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://Dheerajkumar129.github.io/Myportfolio/#website",
        "url": "https://Dheerajkumar129.github.io/Myportfolio",
        "name": "Dheeraj Kumar | AI Trainer & Frontend Developer",
        "description": "Portfolio of Dheeraj Kumar, showcasing advanced RLHF data alignment and modern React frontend design.",
        "publisher": {
          "@id": "https://Dheerajkumar129.github.io/Myportfolio/#person"
        }
      }
    ]
  };

  return (
    <div className="w-full select-none">
      <SEO 
        title="Dheeraj Kumar | AI Trainer & Frontend Developer"
        description="Explore the portfolio of Dheeraj Kumar. Featuring RLHF AI alignment projects, React JS components, and custom desktop system tools."
        keywords="Dheeraj Kumar, AI Trainer, Data Annotation, RLHF, React JS, Frontend Developer, Python, Tableau"
        schema={homeSchema}
      />
      
      {/* Spotlight Hero */}
      <Hero config={config} isDark={isDark} />

      {/* TECHIE GEEK MOCK IDE & TELEMETRY SECTION */}
      <section className={`py-16 md:py-24 border-t relative overflow-hidden transition-colors duration-1000 ${
        isDark ? 'bg-[#05060a] border-white/5' : 'bg-slate-50 border-black/5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
          
          <div className="mb-12 text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#22c55e] block mb-2">
              Integrated Dev Environment
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight">
              Interactive Source Explorer
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* VS CODE IDE SIMULATOR */}
            <div className="col-span-1 lg:col-span-8 rounded-2xl border border-emerald-500/10 overflow-hidden bg-black/60 shadow-2xl flex flex-col h-[480px]">
              
              {/* IDE Header bar */}
              <div className="bg-neutral-950 px-4 py-3 flex items-center justify-between border-b border-white/5 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/40" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/40" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/40" />
                </div>
                <div className="text-[10px] font-mono opacity-50 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DheerajKumar_CV/src/data/{activeTab}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5 opacity-40 hover:opacity-100 transition-opacity" />
                  <GitBranch className="w-3.5 h-3.5 opacity-40 hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* IDE Workspace split */}
              <div className="flex-grow flex items-stretch overflow-hidden">
                
                {/* File Tree Sidebar */}
                <div className="w-44 md:w-52 bg-neutral-950/80 border-r border-white/5 flex flex-col justify-start py-3 text-left select-none">
                  <span className="text-[8px] font-mono tracking-widest uppercase opacity-45 px-4 mb-3 block">File Tree</span>
                  <div className="space-y-1">
                    {(Object.keys(fileContents) as FileTab[]).map(tabName => {
                      const isActive = activeTab === tabName;
                      return (
                        <button
                          key={tabName}
                          onClick={() => setActiveTab(tabName)}
                          className={`w-full px-4 py-2 flex items-center gap-2 font-mono text-[11px] transition-all text-left focus:outline-none border-none bg-transparent cursor-pointer ${
                            isActive 
                              ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500 font-bold' 
                              : 'text-slate-500 hover:text-slate-350'
                          }`}
                        >
                          <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`} />
                          <span className="truncate">{tabName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Editor Content Area */}
                <div className="flex-grow overflow-auto p-5 text-left font-mono text-xs md:text-sm bg-neutral-950/20 relative">
                  <div className="absolute right-4 top-4 text-[9px] font-mono text-emerald-500/60 uppercase select-none">
                    {activeTab.split('.').pop()} Editor
                  </div>
                  
                  {/* Styled Line-Numbered Display */}
                  <div className="flex gap-4 items-start select-text">
                    <div className="text-slate-700 font-mono text-right select-none pr-1 border-r border-white/5 text-[10px] md:text-xs">
                      {fileContents[activeTab].split('\n').map((_, idx) => (
                        <span key={idx} className="block">{idx + 1}</span>
                      ))}
                    </div>
                    <pre className="text-emerald-400 font-mono whitespace-pre text-left overflow-x-auto text-[10px] md:text-xs leading-relaxed select-text">
                      {fileContents[activeTab]}
                    </pre>
                  </div>

                </div>

              </div>

            </div>

            {/* LIVE TELEMETRY DASHBOARD */}
            <div className="col-span-1 lg:col-span-4 space-y-6">
              
              <div className="rounded-2xl border border-emerald-500/10 bg-neutral-950/60 p-6 flex flex-col justify-between h-[230px] text-left">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live telemetry
                    </span>
                    <span className="text-[10px] font-mono opacity-50">SHIELD SECURE</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight font-sans mb-3 text-white">System Status Console</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light font-mono">
                    Real-time monitoring metrics verifying localized logic, weights compilation accuracy, and safety reviews.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4 font-mono text-[10px] border-t border-white/5 pt-4">
                  <div>
                    <span className="opacity-50 block leading-none mb-1">LOCAL TIME</span>
                    <span className="text-emerald-400 font-bold text-[11px]">{time}</span>
                  </div>
                  <div>
                    <span className="opacity-50 block leading-none mb-1">LATENCY STATE</span>
                    <span className="text-cyan-400 font-bold text-[11px]">VERIFIED OK</span>
                  </div>
                </div>
              </div>

              {/* GEEKY PROGRESS WIDGETS */}
              <div className="rounded-2xl border border-emerald-500/10 bg-neutral-950/60 p-6 space-y-4 text-left">
                <span className="text-[9px] font-mono tracking-widest uppercase opacity-45 block">Logic Weights</span>
                <div className="space-y-3 font-mono text-[11px]">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>LLM Coherence Reviews</span>
                      <span className="text-emerald-400">99.8%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[99.8%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>React UI Components</span>
                      <span className="text-[#a855f7]">95.0%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#a855f7] w-[95%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Python scripts compilation</span>
                      <span className="text-cyan-400">92.4%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-450 w-[92.4%]" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* RETRO CLI SHELL COMPONENT */}
      <section className={`py-16 md:py-24 border-t relative overflow-hidden transition-colors duration-1000 ${
        isDark ? 'bg-[#05060a] border-white/5' : 'bg-slate-50 border-black/5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
          <div className="mb-12 text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f59e0b] block mb-2">
              Command Line Interface
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight text-white">
              System terminal
            </h2>
          </div>

          {/* Interactive Shell */}
          <TerminalShell projects={projects} skills={skills} />
        </div>
      </section>

      {/* Spotlights bento Grid */}
      <section className={`py-16 md:py-24 border-t relative overflow-hidden transition-colors duration-1000 ${
        isDark ? 'bg-[#05060a] border-white/5' : 'bg-slate-50 border-black/5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
          <div className="mb-12 text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 block mb-2">
              Access Gateways
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight text-white">
              Executive Spotlights
            </h2>
          </div>

          {homeCards.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {homeCards.map((card) => {
                const Icon = getCardIcon(card.id);
                return (
                  <motion.div
                    key={card.id}
                    variants={cardVariants}
                    whileHover={{ y: -6, scale: 1.015 }}
                    className="h-full"
                  >
                    <CardSpotlight
                      className={`h-full flex flex-col justify-between p-6 rounded-[24px] border transition-all duration-500 bg-neutral-900/40 border-white/5 hover:border-emerald-500/20 group cursor-pointer`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div className="p-2.5 rounded-xl bg-white/5 text-white/80 group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-300">
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400">
                            {card.badge}
                          </span>
                        </div>

                        <h3 className="text-base font-sans font-semibold tracking-tight mb-2 group-hover:text-emerald-400 transition-colors duration-300 text-white">
                          {card.title}
                        </h3>
                        <p className="text-xs font-light leading-relaxed mb-6 text-slate-400 font-mono">
                          {card.description}
                        </p>
                      </div>

                      {card.id === 'ai-assistant' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.dispatchEvent(new CustomEvent('open-chatbot'));
                          }}
                          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400 self-start mt-auto hover:text-emerald-350 transition-colors border-none bg-transparent cursor-pointer"
                        >
                          <span>{card.buttonText || 'Explore'}</span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <Link
                          to={card.id === 'availability' ? '/timeline' : card.id === 'featured-stack' ? '/skills' : '/contact'}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400 self-start mt-auto hover:text-emerald-350 transition-colors"
                        >
                          <span>{card.buttonText || 'Explore'}</span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </CardSpotlight>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-10">
              <span className="text-xs text-slate-500 font-mono">No card configurations found.</span>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Accordion Section for SEO & LLM Scraping */}
      <section className={`py-16 md:py-24 border-t relative overflow-hidden transition-colors duration-1000 ${
        isDark ? 'bg-[#05060a] border-white/5' : 'bg-slate-50 border-black/5'
      }`}>
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 w-full text-left font-mono">
          <div className="mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 block mb-2">
              Common Inquiries
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx}
                  className="border rounded-xl transition-all duration-350 overflow-hidden border-white/5 bg-neutral-900/20"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left font-semibold text-sm md:text-base cursor-pointer focus:outline-none border-none bg-transparent text-emerald-400"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <span>{faq.q}</span>
                    <span className={`text-[#22c55e] transform transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}>
                      +
                    </span>
                  </button>
                  <div 
                    id={`faq-answer-${idx}`}
                    className={`transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-40 opacity-100 border-t border-white/5' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <p className="p-6 text-xs md:text-sm font-light leading-relaxed text-slate-300">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
