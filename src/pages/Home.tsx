import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { HeroConfig, HomeCard } from '../types';
import Hero from '../sections/Hero';
import SEO from '../components/SEO';
import { Award, Database, Cpu, Mail, Layers, ArrowRight } from 'lucide-react';

interface HomeProps {
  config: HeroConfig;
  homeCards: HomeCard[];
  isDark: boolean;
}

export default function Home({ config, homeCards = [], isDark }: HomeProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Map icon strings to Lucide components
  const getCardIcon = (id: string) => {
    switch (id) {
      case 'ai-assistant': return Cpu;
      case 'availability': return Award;
      case 'featured-stack': return Database;
      case 'quick-connect': return Mail;
      default: return Layers;
    }
  };

  // Container animation variants for stagger entry
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
        "name": "Dheeraj Kumar | AI Alignment & Frontend Developer",
        "description": "Portfolio of Dheeraj Kumar, showcasing advanced RLHF data alignment and modern React frontend design.",
        "publisher": {
          "@id": "https://Dheerajkumar129.github.io/Myportfolio/#person"
        }
      },
      {
        "@type": "Person",
        "@id": "https://Dheerajkumar129.github.io/Myportfolio/#person",
        "name": "Dheeraj Kumar",
        "jobTitle": "AI Trainer & Frontend Developer",
        "url": "https://Dheerajkumar129.github.io/Myportfolio",
        "sameAs": [
          "https://github.com/Dheerajkumar129",
          "https://linkedin.com/in/dheerajkumar45"
        ]
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

  return (
    <div className="w-full">
      <SEO 
        title="Dheeraj Kumar | AI Trainer & Frontend Developer"
        description="Explore the portfolio of Dheeraj Kumar. Featuring RLHF AI alignment projects, React JS components, and custom desktop system tools."
        keywords="Dheeraj Kumar, AI Trainer, Data Annotation, RLHF, React JS, Frontend Developer, Python, Tableau"
        schema={homeSchema}
      />
      {/* Spotlight Hero V2 */}
      <Hero config={config} isDark={isDark} />

      {/* Premium Teaser Navigation Section */}
      <section className={`py-16 md:py-24 border-t relative overflow-hidden transition-colors duration-1000 ${
        isDark ? 'bg-[#050505] border-white/5' : 'bg-slate-50 border-black/5'
      }`}>
        {/* Soft atmospheric gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full filter blur-[150px] opacity-10 bg-[#007AFF]/20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
          {/* Section Heading */}
          <div className="mb-12 text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#007AFF] block mb-2">
              System Console
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight">
              Interactive Spotlights
            </h2>
          </div>

          {/* Cards Grid */}
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
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="h-full"
                  >
                    <div
                      className={`h-full flex flex-col justify-between p-6 md:p-7 rounded-[30px] border transition-all duration-500 bg-gradient-to-br hover:border-[#007AFF]/30 ${
                        isDark 
                          ? 'bg-neutral-900/40 border-white/5 hover:shadow-[0_20px_40px_rgba(0,122,255,0.08)]' 
                          : 'bg-white border-neutral-200/60 hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)]'
                      } group cursor-pointer`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className={`p-3 rounded-2xl ${
                            isDark ? 'bg-white/5 text-white/80' : 'bg-slate-100 text-neutral-800'
                          } transition-colors group-hover:bg-[#007AFF] group-hover:text-white`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`text-[10px] uppercase font-mono tracking-widest ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            {card.badge}
                          </span>
                        </div>

                        <h3 className="text-lg font-sans font-semibold tracking-tight mb-2 group-hover:text-[#007AFF] transition-colors duration-300">
                          {card.title}
                        </h3>
                        <p className={`text-xs font-light leading-relaxed mb-6 ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
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
                          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#007AFF] self-start mt-auto hover:text-[#007AFF]/80 transition-colors border-none bg-transparent cursor-pointer"
                        >
                          <span>{card.buttonText || 'Explore'}</span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <Link
                          to={card.id === 'availability' ? '/timeline' : card.id === 'featured-stack' ? '/skills' : '/contact'}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#007AFF] self-start mt-auto hover:text-[#007AFF]/80 transition-colors"
                        >
                          <span>{card.buttonText || 'Explore'}</span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-10">
              <span className="text-xs text-slate-500 font-mono">No spotlight cards loaded.</span>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Accordion Section for SEO & LLM Scraping */}
      <section className={`py-16 md:py-24 border-t relative overflow-hidden transition-colors duration-1000 ${
        isDark ? 'bg-[#050505] border-white/5' : 'bg-slate-50 border-black/5'
      }`}>
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 w-full text-left">
          <div className="mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#007AFF] block mb-2">
              Common Inquiries
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isDark 
                      ? 'border-white/5 bg-neutral-900/20' 
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left font-semibold text-sm md:text-base cursor-pointer focus:outline-none border-none bg-transparent"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <span>{faq.q}</span>
                    <span className={`text-[#007AFF] transform transition-transform duration-300 font-mono ${
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
                      isDark ? 'text-slate-300' : 'text-slate-655'
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
