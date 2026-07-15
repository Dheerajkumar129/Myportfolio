import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
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
    // Simulate form submission (replace with real EmailJS or Formspree)
    await new Promise((r) => setTimeout(r, 1500));
    // Open email client as fallback
    const form = formRef.current!;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    window.location.href = `mailto:dheerajkumar7135227@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    setStatus('success');
    form.reset();
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="min-h-screen animated-bg grid-overlay pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-heading">Get in Touch</h1>
          <p className="section-sub">Let's discuss opportunities, collaborations, or just say hello!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-200 mb-2">Let's Connect</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                I'm currently open to AI training contracts, frontend development roles, and remote opportunities. 
                C1 English proficiency means seamless communication across time zones.
              </p>

              <div className="space-y-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">{label}</div>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer"
                           className="text-slate-200 text-sm font-medium hover:text-indigo-300 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <span className="text-slate-200 text-sm font-medium">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="glass rounded-2xl p-5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-300 font-semibold text-sm">Open to Opportunities</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Actively looking for AI training, data annotation, and frontend development roles.
                Available for freelance, contract, or full-time positions.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass rounded-2xl p-6 flex flex-col gap-5">
              <h2 className="text-xl font-bold text-slate-200">Send a Message</h2>

              <div>
                <label className="block text-slate-400 text-xs font-medium mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-medium mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-medium mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Job opportunity / Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the opportunity or project..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all resize-none"
                />
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-300 text-sm bg-green-500/10 border border-green-500/20 px-4 py-3 rounded-xl"
                >
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  Message sent! Your email client should open.
                </motion.div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-300 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Something went wrong. Please try emailing directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center border-t border-white/5 pt-8"
        >
          <p className="text-slate-500 text-sm">
            Built with ❤️ by <span className="text-indigo-400 font-semibold">Dheeraj Kumar</span> · React + TypeScript + TailwindCSS
          </p>
          <p className="text-slate-600 text-xs mt-1">© {new Date().getFullYear()} All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
