import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Download, ArrowRight, Star } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import type { HeroConfig, HomeCard } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  config: HeroConfig;
  homeCards: HomeCard[];
}

function FloatingParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-indigo-500/20 blur-sm pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function Home({ config, homeCards }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated star field canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const stars: { x: number; y: number; r: number; speed: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${s.opacity})`;
        ctx.fill();
        s.y -= s.speed;
        if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative min-h-screen animated-bg grid-overlay overflow-hidden">
      {/* Canvas starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />

      {/* Floating particles */}
      <FloatingParticle delay={0} x="10%" y="30%" size={8} />
      <FloatingParticle delay={1.5} x="85%" y="20%" size={12} />
      <FloatingParticle delay={3} x="70%" y="65%" size={6} />
      <FloatingParticle delay={0.8} x="25%" y="70%" size={10} />
      <FloatingParticle delay={2.2} x="55%" y="15%" size={7} />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Hero Text */}
          <div>
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm font-medium">{config.availability}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4"
            >
              Hi, I'm{' '}
              <span className="gradient-text">{config.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl font-semibold text-slate-300 mb-3"
            >
              {config.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-base leading-relaxed mb-6"
            >
              {config.tagline}
            </motion.p>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {['RLHF Specialist', 'React Developer', 'MCA Graduate', config.englishLevel].map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 text-sm text-slate-400 mb-8"
            >
              <a href={`mailto:${config.email}`} className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors">
                <Mail className="w-4 h-4" /> {config.email}
              </a>
              <a href={`tel:${config.phone}`} className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors">
                <Phone className="w-4 h-4" /> {config.phone}
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {config.location}
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a href={config.github} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                <Github className="w-4 h-4" /> View GitHub
              </a>
              <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href="/Dheeraj_kumar.pdf" download className="btn-outline flex items-center gap-2">
                <Download className="w-4 h-4" /> Resume
              </a>
            </motion.div>
          </div>

          {/* Right: Avatar + Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-56 h-56 rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-600 to-cyan-400 p-1 shadow-2xl glow-indigo">
                <div className="w-full h-full rounded-3xl glass flex items-center justify-center text-8xl">
                  🧑‍💻
                </div>
              </div>
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass px-3 py-2 rounded-xl border border-indigo-500/30 text-sm font-semibold text-indigo-300 shadow-lg"
              >
                <Star className="w-3.5 h-3.5 inline mr-1 text-yellow-400" />
                AI Trainer
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 glass px-3 py-2 rounded-xl border border-cyan-500/30 text-sm font-semibold text-cyan-300 shadow-lg"
              >
                ⚛️ React Dev
              </motion.div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {[
                { label: 'Experience', value: '1+', unit: 'year' },
                { label: 'Projects', value: '5+', unit: 'built' },
                { label: 'Certifications', value: '6', unit: 'verified' },
                { label: 'English', value: 'C1', unit: 'advanced' },
              ].map((stat) => (
                <div key={stat.label} className="glass-hover rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black gradient-text">{stat.value}</div>
                  <div className="text-slate-300 text-xs font-semibold mt-0.5">{stat.label}</div>
                  <div className="text-slate-500 text-xs">{stat.unit}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <h2 className="text-center text-2xl font-bold text-slate-300 mb-8">
            Explore My Portfolio
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {homeCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                whileHover={{ scale: 1.04 }}
              >
                <Link
                  to={card.link}
                  className="glass-hover rounded-2xl p-5 flex flex-col items-center text-center gap-3 block"
                >
                  <div className="text-3xl">{card.icon}</div>
                  <div>
                    <div className="font-bold text-slate-200 text-sm">{card.title}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{card.desc}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
