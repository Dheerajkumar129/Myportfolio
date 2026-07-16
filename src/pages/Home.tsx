import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { HeroConfig, HomeCard, Project } from '../types';
import Hero from '../sections/Hero';
import SEO from '../components/SEO';
import CardSpotlight from '../components/CardSpotlight';
import { 
  Award, 
  Database, 
  Cpu, 
  Mail, 
  Layers, 
  ArrowRight, 
  CheckCircle, 
  Globe,
  Star
} from 'lucide-react';

interface HomeProps {
  config: HeroConfig;
  homeCards: HomeCard[];
  projects: Project[];
  isDark: boolean;
}

export default function Home({ config, homeCards = [], projects = [], isDark }: HomeProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Local ticker for clock
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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

  // Primary featured project (ISL Recognition System)
  const featuredProject = projects.find(p => p.featured) || projects[0];

  return (
    <div className="w-full select-none">
      <SEO 
        title="Dheeraj Kumar | AI Trainer & Frontend Developer"
        description="Explore the portfolio of Dheeraj Kumar. Featuring RLHF AI alignment projects, React JS components, and custom desktop system tools."
        keywords="Dheeraj Kumar, AI Trainer, Data Annotation, RLHF, React JS, Frontend Developer, Python, Tableau"
        schema={homeSchema}
      />
      
      {/* Hero Section */}
      <Hero config={config} isDark={isDark} />

      {/* DYNAMIC BENTO GRID DASHBOARD */}
      <section className={`py-16 md:py-24 border-t relative overflow-hidden transition-colors duration-1000 ${
        isDark ? 'bg-[#030014] border-white/5' : 'bg-slate-50 border-black/5'
      }`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full filter blur-[150px] opacity-10 bg-[#a855f7]/20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full text-left">
          
          <div className="mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a855f7] block mb-2">
              Dashboard View
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight">
              Interactive Bento Overview
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            
            {/* CARD 1: BIO CARD (Span 2) */}
            <motion.div variants={cardVariants} className="col-span-1 lg:col-span-2">
              <CardSpotlight className={`h-full p-8 rounded-[24px] border ${
                isDark ? 'bg-neutral-900/30 border-white/5' : 'bg-white border-neutral-200 shadow-sm'
              } flex flex-col justify-between`}>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#a855f7] mb-3 block">
                    Biography profile
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-white mb-4">
                    About Dheeraj Kumar
                  </h3>
                  <p className={`text-sm font-light leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    An MCA graduate specializing in reinforcing large language models (LLM) factuality and reasoning alignment, combined with a passion for designing pixel-perfect, responsive React web portals. Focused on bridging human cognition and machine learning systems.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4 border-t border-white/5 pt-6 mt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono">RLHF Alignment Specialist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono">React Frontend Developer</span>
                  </div>
                </div>
              </CardSpotlight>
            </motion.div>

            {/* CARD 2: REAL-TIME TELEMETRY / AVAILABILITY */}
            <motion.div variants={cardVariants} className="col-span-1">
              <CardSpotlight className={`h-full p-8 rounded-[24px] border ${
                isDark ? 'bg-neutral-900/30 border-white/5' : 'bg-white border-neutral-200 shadow-sm'
              } flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Status: Active
                    </span>
                    <Globe className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white mb-3">
                    Contracts &amp; Availability
                  </h3>
                  <p className={`text-xs font-light leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Available for prompt engineering projects, RLHF annotations contracts, and custom web user interface builds. Operating on flexible remote timezone schedules.
                  </p>
                </div>
                
                <div className="space-y-2 border-t border-white/5 pt-4 font-mono text-[10px]">
                  <div className="flex justify-between">
                    <span className="opacity-50">LOCAL TIME:</span>
                    <span className="text-emerald-400 font-bold">{time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-50">ENGLISH COMMS:</span>
                    <span className="text-[#a855f7] font-bold">C1 ADVANCED</span>
                  </div>
                </div>
              </CardSpotlight>
            </motion.div>

            {/* CARD 3: FEATURED PROJECT SPOTLIGHT (Span 2) */}
            {featuredProject && (
              <motion.div variants={cardVariants} className="col-span-1 lg:col-span-2">
                <CardSpotlight className={`h-full p-8 rounded-[24px] border ${
                  isDark ? 'bg-neutral-900/30 border-white/5' : 'bg-white border-neutral-200 shadow-sm'
                } flex flex-col justify-between group`}>
                  <div>
                    <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#a855f7] mb-3">
                      <Star className="w-3.5 h-3.5 fill-[#a855f7] text-[#a855f7]" />
                      <span>Featured Project Spotlight</span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-white mb-3 group-hover:text-[#a855f7] transition-colors">
                      {featuredProject.title}
                    </h3>
                    <p className={`text-xs font-light leading-relaxed mb-6 ${isDark ? 'text-slate-350' : 'text-slate-600'}`}>
                      {featuredProject.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5 gap-4">
                    <div className="flex items-center gap-4 text-xs font-mono">
                      {featuredProject.metrics && featuredProject.metrics.slice(0, 2).map(m => (
                        <div key={m.label}>
                          <span className="text-white font-bold">{m.value}</span>{' '}
                          <span className="opacity-50 text-[10px]">{m.label}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/projects"
                      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#a855f7] hover:text-[#c084fc] transition-colors"
                    >
                      <span>Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </CardSpotlight>
              </motion.div>
            )}

            {/* CARD 4: CORE TECH STACK PILLS */}
            <motion.div variants={cardVariants} className="col-span-1">
              <CardSpotlight className={`h-full p-8 rounded-[24px] border ${
                isDark ? 'bg-neutral-900/30 border-white/5' : 'bg-white border-neutral-200 shadow-sm'
              } flex flex-col justify-between`}>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#a855f7] mb-3 block">
                    Technical Core
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-white mb-3">
                    Languages &amp; Core Stack
                  </h3>
                  <p className={`text-xs font-light leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Primary tech stack optimized for clean-code logic, scripting automation utilities, and interface routing.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {['React JS', 'Python', 'TypeScript', 'SQL', 'C++'].map(item => (
                    <span 
                      key={item} 
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-mono border ${
                        isDark ? 'bg-white/5 border-white/5 text-slate-350' : 'bg-slate-100 border-slate-200 text-slate-700 shadow-sm'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardSpotlight>
            </motion.div>

            {/* LOWER PORTION: EXECUTIVE HIGHLIGHT CARDS */}
            {homeCards.map((card) => {
              const Icon = getCardIcon(card.id);
              return (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  className="h-full"
                >
                  <CardSpotlight
                    className={`h-full flex flex-col justify-between p-7 rounded-[24px] border transition-all duration-500 ${
                      isDark 
                        ? 'bg-neutral-900/30 border-white/5 hover:border-[#a855f7]/25 hover:shadow-[0_15px_30px_rgba(168,85,247,0.06)]' 
                        : 'bg-white border-neutral-200/80 hover:border-[#a855f7]/15 hover:shadow-[0_10px_25px_rgba(0,0,0,0.02)] shadow-sm'
                    } group cursor-pointer`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className={`p-2.5 rounded-xl ${
                          isDark ? 'bg-white/5 text-white/80' : 'bg-slate-100 text-neutral-800'
                        } group-hover:bg-[#a855f7] group-hover:text-white transition-colors duration-300`}>
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <span className={`text-[9px] uppercase font-mono tracking-widest ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {card.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-sans font-semibold tracking-tight mb-2 group-hover:text-[#a855f7] transition-colors duration-300 text-white">
                        {card.title}
                      </h3>
                      <p className={`text-xs font-light leading-relaxed mb-6 ${
                        isDark ? 'text-slate-350' : 'text-slate-600'
                      }`}>
                        {card.description}
                      </p>
                    </div>

                    {card.id === 'ai-assistant' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.dispatchEvent(new CustomEvent('open-chatbot'));
                        }}
                        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#a855f7] self-start mt-auto hover:text-[#a855f7]/85 transition-colors border-none bg-transparent cursor-pointer"
                      >
                        <span>{card.buttonText || 'Explore'}</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <Link
                        to={card.id === 'availability' ? '/timeline' : card.id === 'featured-stack' ? '/skills' : '/contact'}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#a855f7] self-start mt-auto hover:text-[#a855f7]/85 transition-colors"
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
        </div>
      </section>

      {/* FAQ Accordion Section for SEO & LLM Scraping */}
      <section className={`py-16 md:py-24 border-t relative overflow-hidden transition-colors duration-1000 ${
        isDark ? 'bg-[#030014] border-white/5' : 'bg-slate-50 border-black/5'
      }`}>
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 w-full text-left">
          <div className="mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a855f7] block mb-2">
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
                  className={`border rounded-2xl transition-all duration-350 overflow-hidden ${
                    isDark 
                      ? 'border-white/5 bg-neutral-900/20' 
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left font-semibold text-sm md:text-base cursor-pointer focus:outline-none border-none bg-transparent text-[#a855f7]"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <span>{faq.q}</span>
                    <span className={`text-[#a855f7] transform transition-transform duration-300 ${
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
                    <p className={`p-6 text-xs md:text-sm font-light leading-relaxed ${
                      isDark ? 'text-slate-350' : 'text-slate-600'
                    }`}>
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
