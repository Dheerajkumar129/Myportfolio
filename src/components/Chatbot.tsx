import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Bot, 
  User, 
  Loader2,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Search,
  Database,
  Cpu,
  Clock,
  DollarSign
} from 'lucide-react';

const RetroTwinIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <div className={`relative ${className} flex items-center justify-center`}>
    <svg viewBox="0 0 24 24" fill="none" className="w-5.5 h-5.5 z-10 drop-shadow-[0_0_6px_#22c55e]" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="15" rx="2" stroke="#22c55e" strokeWidth="2" />
      <path d="M7 21h10" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 18l-1 3" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 18l1 3" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
      <circle cx="8.5" cy="10.5" r="1" fill="#22c55e" />
      <circle cx="15.5" cy="10.5" r="1" fill="#22c55e" />
      <path d="M10 14h4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
);

function FormattedMessage({ text }: { text: string }) {
  const blocks = text.split('\n');
  
  return (
    <div className="space-y-1.5 text-xs md:text-sm leading-relaxed font-mono select-text text-emerald-400">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (trimmed === '') return <div key={idx} className="h-1.5" />;
        
        const isHeader3 = trimmed.startsWith('###');
        const isHeader4 = trimmed.startsWith('####');
        if (isHeader3 || isHeader4) {
          const title = trimmed.replace(/^#+\s*/, '');
          return (
            <h4 key={idx} className="font-semibold tracking-tight mt-3 mb-1 text-emerald-300 text-glow-green">
              {title}
            </h4>
          );
        }
        
        const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ');
        let content = trimmed;
        if (isBullet) {
          content = content.replace(/^[*•-]\s*/, '');
        }

        const parsedElements: React.ReactNode[] = [];
        let cursor = 0;
        const tokenRegex = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`)/g;
        let match;
        let keyCounter = 0;
        
        while ((match = tokenRegex.exec(content)) !== null) {
          const matchIndex = match.index;
          
          if (matchIndex > cursor) {
            parsedElements.push(
              <span key={`txt-${keyCounter++}`}>{content.substring(cursor, matchIndex)}</span>
            );
          }
          
          if (match[0].startsWith('**')) {
            parsedElements.push(
              <strong key={`bold-${keyCounter++}`} className="font-semibold text-emerald-200">
                {match[2]}
              </strong>
            );
          } else if (match[0].startsWith('`')) {
            parsedElements.push(
              <code key={`code-${keyCounter++}`} className="px-1.5 py-0.5 rounded font-mono text-[10px] md:text-xs border border-emerald-500/25 bg-black text-emerald-300">
                {match[5]}
              </code>
            );
          } else {
            const label = match[3];
            const url = match[4];
            const isExternal = url.startsWith('http') || url.startsWith('mailto') || url.startsWith('tel') || url.startsWith('#');
            
            if (isExternal) {
              parsedElements.push(
                <a
                  key={`link-${keyCounter++}`}
                  href={url}
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium inline-flex items-center gap-0.5"
                >
                  {label}
                </a>
              );
            } else {
              parsedElements.push(
                <Link
                  key={`link-${keyCounter++}`}
                  to={url}
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium transition-colors"
                >
                  {label}
                </Link>
              );
            }
          }
          
          cursor = tokenRegex.lastIndex;
        }
        
        if (cursor < content.length) {
          parsedElements.push(
            <span key={`txt-${keyCounter++}`}>{content.substring(cursor)}</span>
          );
        }
        
        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1.5 my-1">
              <span className="text-emerald-400 mt-2 shrink-0 block w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_#22c55e]" />
              <span className="text-emerald-400/90">
                {parsedElements.length > 0 ? parsedElements : content}
              </span>
            </div>
          );
        }
        
        return (
          <p key={idx} className="text-emerald-400/90">
            {parsedElements.length > 0 ? parsedElements : block}
          </p>
        );
      })}
    </div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(timer);
      }
    }, 12);
    return () => clearInterval(timer);
  }, [text]);

  return <FormattedMessage text={displayedText} />;
}

interface Message {
  role: 'user' | 'model';
  content: string;
  id?: string;
  trace?: any;
  feedback?: number;
}

const QUICK_STARTS = [
  "Tell me about your projects",
  "What is your core tech stack?",
  "Show me your certifications",
  "How can I contact you?"
];

type PersonalityMode = 'recruiter' | 'technical' | 'creative';

export default function Chatbot({ isDark: _isDark }: { isDark: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [selectedTrace, setSelectedTrace] = useState<any | null>(null);
  const [personality, setPersonality] = useState<PersonalityMode>('recruiter');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasNewMessage(false);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpenChat);
    return () => window.removeEventListener('open-chatbot', handleOpenChat);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 0) {
        setHasNewMessage(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen, messages]);

  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      let greeting = '';
      if (personality === 'recruiter') {
        greeting = "### GUEST CORE ACTIVE\nI am Addy, loaded in **Professional Mode**. Ask me about Dheeraj's contract terms, MCA credentials, and hiring coordinates.";
      } else if (personality === 'technical') {
        greeting = "### TERMINAL DIAGNOSTICS ENGAGED\nReady to audit clean code algorithms. Ask about React DOM state loads, C++ compilations, and prompt verification.";
      } else {
        greeting = "### IRC CHANNEL OPEN\nHey! Dheeraj loves pair-programming, training large models, and building clean retro terminals. Let's chat!";
      }
      setMessages([{ role: 'model', content: greeting }]);
    }
  }, [personality, isOpen, messages.length]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      let responseText = '';
      let mockTrace = {
        model_used: 'gemini-2.5-flash',
        latency_ms: Math.floor(Math.random() * 200) + 100,
        tokens_input: Math.floor(Math.random() * 200) + 150,
        tokens_output: Math.floor(Math.random() * 150) + 80,
        cost_est: 0.00012,
        chunks: [] as any[]
      };

      const query = textToSend.toLowerCase();

      if (personality === 'recruiter') {
        if (query.includes('project')) {
          responseText = "### Projects Directory:\n" +
            "* **Indian Sign Language Recognizer**: Real-time hand gesture CNN classification. [Repo](https://github.com/Dheerajkumar129/Sign-language-recognition-)\n" +
            "* **Desktop Inventory Catalog**: SQLite CRUD desktop utility. [Repo](https://github.com/Dheerajkumar129/inventory-management-system-)\n" +
            "\nExplore more at [Projects Catalog](/projects)!";
          mockTrace.chunks = [{ source: 'portfolioData.ts', title: 'Recruiter Project Specs', similarity: 0.95 }];
        } else if (query.includes('stack') || query.includes('skills')) {
          responseText = "### Verified Technical Core:\n" +
            "* **AI Data Verification**: RLHF grading, coherence checks, fact auditing.\n" +
            "* **Frontend Layouts**: React JS, TypeScript, TailwindCSS.\n" +
            "* **Languages**: C++, Python, SQL.\n" +
            "\nBrowse all units at [Skills Core](/skills).";
          mockTrace.chunks = [{ source: 'portfolioData.ts', title: 'Skills Catalog Matrix', similarity: 0.91 }];
        } else if (query.includes('certificat')) {
          responseText = "### Verified Accreditations:\n" +
            "* **Python Data Science** (IBM)\n" +
            "* **C++ OOPs & DSA** (Coding Ninjas)\n" +
            "\nReview certificates at [Certifications](/certifications).";
          mockTrace.chunks = [{ source: 'portfolioData.ts', title: 'Accreditation Records', similarity: 0.9 }];
        } else {
          responseText = "### Outreach Gateway Console:\n" +
            "Dheeraj is currently active for remote developer contracts and alignment annotation assignments.\n" +
            "* Go to the [Contact Gateway](/contact) page\n" +
            "* Direct Mail: [dheerajkumar7135227@gmail.com](mailto:dheerajkumar7135227@gmail.com)";
          mockTrace.chunks = [{ source: 'portfolioData.ts', title: 'Recruiter Coordinates', similarity: 0.88 }];
        }
      } else if (personality === 'technical') {
        if (query.includes('project')) {
          responseText = "### System Diagnostics:\n" +
            "* **ISL Gesture System**: Built CNN & LSTM models with cvzone/Mediapipe running at a fluid **30fps** classification speed.\n" +
            "* **Payroll Calculator**: Clean OOP record management written in compile-optimized C++.\n" +
            "\nBrowse repositories at [Projects](/projects).";
          mockTrace.chunks = [{ source: 'portfolioData.ts', title: 'System Architectures', similarity: 0.94 }];
        } else if (query.includes('stack') || query.includes('skills')) {
          responseText = "### Tech Stack Config:\n" +
            "* **Frontend Logic**: React JS (Hooks, virtual DOM updates), TypeScript types.\n" +
            "* **AI Annotation / RLHF**: Evaluated truthfulness thresholds, factual coherence, and safety benchmarks.\n" +
            "* **Programming**: Python script automations, SQLite querying (<5ms).";
          mockTrace.chunks = [{ source: 'portfolioData.ts', title: 'Technical Capability Matrix', similarity: 0.96 }];
        } else {
          responseText = "### Diagnostics Active:\n" +
            "* React bundle compiles: VERIFIED OK\n" +
            "* Python script pipelines: RUNNING\n" +
            "* SQLite queries: ACTIVE (<5ms)";
          mockTrace.chunks = [{ source: 'portfolioData.ts', title: 'Diagnostics data', similarity: 0.82 }];
        }
      } else {
        if (query.includes('project')) {
          responseText = "### Dheeraj's builds:\n" +
            "👋 He created an **Indian Sign Language translator** using machine learning, and an **Inventory app** with Python and SQLite.\n" +
            "\nSee them at [Projects](/projects)!";
        } else if (query.includes('stack') || query.includes('skills')) {
          responseText = "### Developer Wizardry:\n" +
            "He codes in **React JS**, writes data scripts in **Python**, builds backend logic in **C++**, and aligns AI models to make them safe!";
        } else {
          responseText = "### Welcome!\n" +
            "Explore Dheeraj's pages:\n" +
            "* career [Timeline](/timeline)!\n" +
            "* [Certifications](/certifications)!\n" +
            "* direct mail: [dheerajkumar7135227@gmail.com](mailto:dheerajkumar7135227@gmail.com)";
        }
      }

      const assistantMsg: Message = {
        role: 'model',
        content: responseText,
        id: 'msg-' + Math.random().toString(36).substring(2, 9),
        trace: mockTrace
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickStart = (query: string) => {
    handleSendMessage(query);
  };

  const handleFeedback = (msgIndex: number, rating: number) => {
    setMessages(prev => {
      const next = [...prev];
      next[msgIndex] = { ...next[msgIndex], feedback: rating };
      return next;
    });
  };

  const resetChat = () => {
    setMessages([]);
    setSelectedTrace(null);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && hasNewMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-3 mr-1 px-4 py-2 rounded-xl shadow-xl text-xs font-mono border backdrop-blur-md flex items-center gap-1.5 bg-black/90 text-emerald-450 border-emerald-500/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Type 'help' in terminal clone twin!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasNewMessage(false);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-3.5 rounded-full shadow-2xl flex items-center justify-center border cursor-pointer transition-all duration-300 bg-black border-emerald-500/30 text-emerald-400 shadow-[0_4px_25px_rgba(34,197,94,0.15)]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <RetroTwinIcon className="w-8 h-8" />}
          {!isOpen && hasNewMessage && (
            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-black animate-ping" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 w-[360px] md:w-[400px] h-[520px] z-50 rounded-2xl flex flex-col shadow-2xl border overflow-hidden backdrop-blur-xl bg-black/95 border-emerald-500/20 text-emerald-400 crt-screen"
          >
            {/* Header */}
            <div className="p-4 flex flex-col gap-2.5 border-b border-emerald-500/20 bg-black/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md overflow-hidden">
                      <RetroTwinIcon className="w-9 h-9 scale-110" />
                    </div>
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-black animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-emerald-300">ADDY_TWIN.SH</h3>
                    <p className="text-[10px] opacity-60">System Model: gemini-2.5-flash</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {messages.length > 1 && (
                    <button
                      onClick={resetChat}
                      title="Reset Terminal"
                      className="p-2 rounded-lg hover:bg-emerald-500/10 text-emerald-500 hover:text-emerald-300 cursor-pointer border-none bg-transparent"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-emerald-500/10 text-emerald-500 hover:text-emerald-300 cursor-pointer border-none bg-transparent"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mode toggles */}
              <div className="flex items-center justify-between border-t border-emerald-500/10 pt-2.5">
                <span className="text-[8px] font-mono opacity-50 uppercase tracking-widest">PERSONALITY LOG</span>
                <div className="flex items-center gap-1">
                  {(['recruiter', 'technical', 'creative'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setPersonality(mode);
                        resetChat();
                      }}
                      className={`px-2 py-1 rounded text-[9px] font-mono tracking-wider transition-colors cursor-pointer border-none ${
                        personality === mode 
                          ? 'bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/20' 
                          : 'text-slate-500 hover:text-slate-350 bg-transparent'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Scrollable messages log */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 custom-scrollbar relative">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4 px-2 font-mono">
                  <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400 animate-pulse">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-semibold text-emerald-300">RETRO SYSTEM MAINFRAME ACTIVE</h4>
                    <p className="text-xs max-w-[280px] leading-relaxed text-slate-400">
                      I'm Addy, an offline-first RAG clone simulating Dheeraj's logic weights.
                    </p>
                  </div>
                  
                  <div className="w-full pt-4 space-y-2">
                    <p className="text-[9px] uppercase tracking-wider font-semibold opacity-40 text-left px-1">QUICK SCRIPTS</p>
                    <div className="grid grid-cols-1 gap-2">
                      {QUICK_STARTS.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickStart(q)}
                          className="w-full text-left p-2.5 rounded-xl border border-emerald-500/10 hover:border-emerald-500/35 bg-black/50 text-slate-400 hover:text-emerald-400 transition-all flex items-center justify-between group cursor-pointer font-mono text-xs"
                        >
                          <span>{q}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pb-2">
                  {messages.map((msg, index) => (
                    <div key={index} className="group flex flex-col space-y-1">
                      <div className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role !== 'user' && (
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5">
                            <Bot className="w-4 h-4 text-emerald-450" />
                          </div>
                        )}
                        <div
                          className={`rounded-2xl px-3.5 py-2.5 shadow-sm max-w-[80%] ${
                            msg.role === 'user'
                              ? 'bg-emerald-500/15 border border-emerald-500/25 text-emerald-250 rounded-tr-none'
                              : 'bg-black/60 border border-emerald-500/10 text-emerald-400 rounded-tl-none'
                          }`}
                        >
                          {msg.role === 'model' && index === messages.length - 1 && isLoading === false ? (
                            <TypewriterText text={msg.content} />
                          ) : (
                            <FormattedMessage text={msg.content} />
                          )}
                        </div>
                        {msg.role === 'user' && (
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5">
                            <User className="w-4 h-4 text-emerald-400" />
                          </div>
                        )}
                      </div>

                      {/* Feedback inspector tools */}
                      {msg.role !== 'user' && msg.id && (
                        <div className="flex items-center gap-2 pl-9 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-250 text-slate-400">
                          <button
                            onClick={() => handleFeedback(index, 1)}
                            className={`p-1 rounded transition-colors cursor-pointer border-none bg-transparent ${
                              msg.feedback === 1 
                                ? 'text-emerald-400 bg-emerald-500/15' 
                                : 'text-slate-500 hover:text-slate-350 hover:bg-slate-800/60'
                            }`}
                            title="Helpful response"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleFeedback(index, -1)}
                            className={`p-1 rounded transition-colors cursor-pointer border-none bg-transparent ${
                              msg.feedback === -1 
                                ? 'text-rose-450 bg-rose-500/15' 
                                : 'text-slate-500 hover:text-slate-350 hover:bg-slate-800/60'
                            }`}
                            title="Unhelpful response"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                          {msg.trace && (
                            <button
                              onClick={() => setSelectedTrace(msg.trace)}
                              className="p-1 rounded transition-colors cursor-pointer flex items-center gap-1 font-mono text-[9px] border-none bg-transparent text-emerald-400/80 hover:text-emerald-300 hover:bg-slate-850"
                              title="Inspect RAG Trace"
                            >
                              <Search className="w-3 h-3" />
                              <span>INSPECT</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2.5 justify-start">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Loader2 className="w-4 h-4 text-emerald-450 animate-spin" />
                      </div>
                      <div className="rounded-2xl px-3.5 py-2.5 rounded-tl-none max-w-[80%] border border-emerald-500/10 bg-black/40">
                        <div className="flex items-center gap-2 text-xs opacity-60">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                          <span className="ml-1 text-[9px] uppercase tracking-wider font-semibold animate-pulse text-emerald-400">Addy processing query...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t bg-black/90 border-emerald-500/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type shell query..."
                  disabled={isLoading}
                  className="flex-grow px-3 py-2 text-xs md:text-sm rounded-xl border focus:outline-none focus:ring-1 bg-black border-emerald-500/20 text-emerald-400 placeholder-emerald-950 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={`p-2 rounded-xl flex items-center justify-center transition-colors cursor-pointer border-none ${
                    input.trim() && !isLoading
                      ? 'bg-emerald-950 text-emerald-450 border border-emerald-500/30'
                      : 'bg-black text-emerald-950 border border-white/5'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Telemetry Slide-up */}
            <AnimatePresence>
              {selectedTrace && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 220 }}
                  className="absolute inset-0 z-30 flex flex-col bg-black text-emerald-400 font-mono"
                >
                  <div className="p-4 flex items-center justify-between border-b border-emerald-500/20 bg-neutral-950">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                      <Search className="w-4 h-4" />
                      <span>RAG LOGS INSPECTOR</span>
                    </div>
                    <button
                      onClick={() => setSelectedTrace(null)}
                      className="p-1.5 rounded-lg transition-colors cursor-pointer border-none bg-transparent hover:bg-emerald-500/10 text-emerald-500 hover:text-emerald-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-grow p-4 overflow-y-auto space-y-4 text-[10px] md:text-xs">
                    {selectedTrace.model_used && (
                      <div className="p-3 rounded-xl border flex items-center justify-between gap-3 bg-black/60 border-emerald-500/20">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-emerald-450" />
                          <span className="text-[10px] uppercase font-mono tracking-wider font-semibold opacity-85">Processor Unit</span>
                        </div>
                        <span className="font-mono text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">{selectedTrace.model_used}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2.5 rounded-xl border flex flex-col items-center justify-center text-center bg-black/50 border-emerald-500/15">
                        <Clock className="w-3.5 h-3.5 text-amber-400 mb-1" />
                        <span className="opacity-60 text-[9px] uppercase tracking-wider">Latency</span>
                        <span className="font-semibold text-xs mt-0.5 text-white">{selectedTrace.latency_ms}ms</span>
                      </div>
                      <div className="p-2.5 rounded-xl border flex flex-col items-center justify-center text-center bg-black/50 border-emerald-500/15">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                        <span className="opacity-60 text-[9px] uppercase tracking-wider">Tokens</span>
                        <span className="font-semibold text-xs mt-0.5 text-white">{selectedTrace.tokens_input + selectedTrace.tokens_output}</span>
                      </div>
                      <div className="p-2.5 rounded-xl border flex flex-col items-center justify-center text-center bg-black/50 border-emerald-500/15">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-450 mb-1" />
                        <span className="opacity-60 text-[9px] uppercase tracking-wider">Cost</span>
                        <span className="font-semibold text-xs mt-0.5 text-emerald-400">
                          ${selectedTrace.cost_est.toFixed(6)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-left">
                      <h4 className="text-[10px] uppercase tracking-wider font-semibold opacity-60 flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Vector Index Matches</span>
                      </h4>
                      <div className="space-y-2">
                        {selectedTrace.chunks && selectedTrace.chunks.length > 0 ? (
                          selectedTrace.chunks.map((chunk: any, idx: number) => {
                            const scorePct = Math.round(chunk.similarity * 100);
                            return (
                              <div
                                key={idx}
                                className="p-3 rounded-xl border flex flex-col gap-1.5 bg-black/35 border-emerald-500/10"
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <div className="flex items-center gap-1.5 truncate">
                                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold shrink-0 bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                                      {chunk.source}
                                    </span>
                                    <span className="font-semibold truncate text-slate-350">{chunk.title}</span>
                                  </div>
                                  <span className="text-[10px] font-bold shrink-0 text-emerald-400">
                                    {scorePct}% match
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center py-4 opacity-50">No matches found.</div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
