import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'dheerajkumar7135227@gmail.com', href: 'mailto:dheerajkumar7135227@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 9801657880', href: 'tel:+919801657880' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/dheerajkumar45', href: 'https://linkedin.com/in/dheerajkumar45' },
  { icon: Github, label: 'GitHub', value: 'github.com/Dheerajkumar129', href: 'https://github.com/Dheerajkumar129' },
  { icon: MapPin, label: 'Location', value: 'Jalandhar, Punjab, India', href: null },
];

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1500));
    
    const form = formRef.current!;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    // Mailto fallback link activation
    window.location.href = `mailto:dheerajkumar7135227@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    
    setStatus('success');
    form.reset();
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="min-h-screen bg-[#03030c] pt-32 pb-24 relative overflow-hidden">
      {/* Lighting Blur Blobs */}
      <div className="blur-blob blob-indigo top-[-10%] right-[-10%]" />
      <div className="blur-blob blob-cyan bottom-[-10%] left-[-10%]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 text-sm max-w-lg mx-auto"
          >
            Let's discuss training operations, contract work, or frontend roles.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Column 1: Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
            className="flex flex-col gap-6"
          >
            <div className="p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
              <div className="rounded-3xl bg-white/[0.01] backdrop-blur-2xl p-6 border border-white/5">
                <h2 className="text-xl font-extrabold text-white tracking-tight mb-3">Connect Directly</h2>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-8">
                  Available for remote contract work, full-time positions, and ML alignment pipelines.
                  Global timezone compatibility.
                </p>

                <div className="space-y-5">
                  {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                        <Icon className="w-4.5 h-4.5 text-indigo-300" />
                      </div>
                      <div>
                        <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{label}</div>
                        {href ? (
                          <a href={href} target="_blank" rel="noopener noreferrer"
                             className="text-slate-200 text-xs sm:text-sm font-semibold hover:text-indigo-300 transition-colors">
                            {value}
                          </a>
                        ) : (
                          <span className="text-slate-200 text-xs sm:text-sm font-semibold">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Panel Card */}
            <div className="p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
              <div className="rounded-3xl bg-white/[0.01] backdrop-blur-2xl p-5 border border-white/5 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-400 font-extrabold text-xs tracking-wider uppercase">Open to Contracts</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Actively evaluating next opportunities. Contact for consultation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 80, delay: 0.1 }}
            className="p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="rounded-3xl bg-white/[0.01] backdrop-blur-2xl p-6 border border-white/5 flex flex-col gap-6">
              <h2 className="text-xl font-extrabold text-white tracking-tight">Send Message</h2>

              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2.5" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2.5" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2.5" htmlFor="message">
                  Message Content
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Your message details..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] transition-all duration-300 resize-none"
                />
              </div>

              {/* Status Display Alerts */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2.5 text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-xl font-semibold"
                  >
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    Success! Opening your default mail client...
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2.5 text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl font-semibold"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Failed to send. Please email me directly.
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'sending'}
                className="btn-apple-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-600 border-t-black rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center border-t border-white/5 pt-8 text-xs text-slate-500 leading-relaxed"
        >
          <p>Designed and Built by Dheeraj Kumar</p>
          <p className="mt-1 font-mono text-[10px]">© {new Date().getFullYear()} All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
