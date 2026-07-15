import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Download, ArrowRight } from 'lucide-react';
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
      className="absolute rounded-full bg-indigo-500/10 blur-sm pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -40, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 6 + delay,
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

    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
        speed: Math.random() * 0.15 + 0.05,
        opacity: Math.random() * 0.5 + 0.1,
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
        if (s.y < 0) {
          s.y = canvas.height;
          s.x = Math.random() * canvas.width;
        }
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
    <div className="relative min-h-screen bg-[#03030c] overflow-hidden">
      {/* Canvas starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />

      {/* Lighting Blur Blobs */}
      <div className="blur-blob blob-indigo -top-20 -left-20" />
      <div className="blur-blob blob-violet top-1/3 -right-20" />
      <div className="blur-blob blob-cyan -bottom-20 left-1/3" />

      {/* Floating particles */}
      <FloatingParticle delay={0} x="15%" y="25%" size={6} />
      <FloatingParticle delay={2} x="80%" y="15%" size={10} />
      <FloatingParticle delay={4} x="75%" y="70%" size={5} />
      <FloatingParticle delay={1.2} x="20%" y="80%" size={8} />
      <FloatingParticle delay={3.5} x="50%" y="10%" size={6} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 pt-36 pb-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 w-fit mb-8 backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase">
                {config.availability}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 80 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-white"
            >
              Hi, I'm <span className="bg-gradient-to-r from-indigo-300 via-violet-200 to-cyan-200 bg-clip-text text-transparent">{config.name}</span>
            </motion.h1>

            {/* Role Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-2xl font-bold tracking-tight text-indigo-200 mb-4"
            >
              {config.title}
            </motion.p>

            {/* Subtitle / Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl"
            >
              {config.tagline}
            </motion.p>

            {/* Skill Tags */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-2.5 mb-10"
            >
              {['RLHF Specialist', 'React Developer', 'MCA Graduate', config.englishLevel].map((tag) => (
                <span key={tag} className="tag-apple">
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a href={config.github} target="_blank" rel="noopener noreferrer" className="btn-apple-primary gap-2">
                <Github className="w-4 h-4 text-black" /> View GitHub
              </a>
              <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="btn-apple-secondary gap-2">
                <Linkedin className="w-4 h-4 text-white" /> LinkedIn
              </a>
              <a href="/Dheeraj_kumar.pdf" download className="btn-apple-secondary gap-2">
                <Download className="w-4 h-4 text-white" /> Download CV
              </a>
            </motion.div>
          </div>

          {/* Right Side: Virtual Identity Card & Stats */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Identity Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, type: 'spring', stiffness: 60 }}
              className="relative w-full max-w-sm rounded-3xl p-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-2xl"
            >
              <div className="rounded-3xl bg-white/[0.02] backdrop-blur-2xl p-6 border border-white/5 flex flex-col items-center">
                {/* Avatar Icon */}
                <div className="relative mb-6">
                  <div className="w-36 h-36 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 p-1 flex items-center justify-center border border-white/10 shadow-inner">
                    <span className="text-7xl select-none">🧑‍💻</span>
                  </div>
                  <div className="absolute -top-3 -right-3 rounded-xl bg-white/5 border border-white/10 px-2.5 py-1.5 backdrop-blur-md shadow-md text-xs font-bold text-indigo-300">
                    AI Trainer
                  </div>
                  <div className="absolute -bottom-3 -left-3 rounded-xl bg-white/5 border border-white/10 px-2.5 py-1.5 backdrop-blur-md shadow-md text-xs font-bold text-cyan-300">
                    React Dev
                  </div>
                </div>

                {/* Name Card */}
                <h2 className="text-xl font-extrabold text-white tracking-tight mb-1">{config.name}</h2>
                <p className="text-slate-500 text-xs font-semibold mb-6 uppercase tracking-wider">{config.title}</p>

                {/* Info List */}
                <div className="w-full space-y-3 border-t border-white/5 pt-6 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-white/40" />
                    <span>{config.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-white/40" />
                    <span>{config.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-white/40" />
                    <span>{config.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-6">
              {[
                { label: 'Work Experience', value: '1+ Yr' },
                { label: 'Built Projects', value: '5+' },
                { label: 'Credentials', value: '6' },
                { label: 'English Level', value: 'C1' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="rounded-2xl p-4 bg-white/[0.01] border border-white/5 backdrop-blur-md text-center"
                >
                  <div className="text-xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Section Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 border-t border-white/5 pt-16"
        >
          <h3 className="text-center text-xs font-bold tracking-widest text-slate-500 uppercase mb-8">
            Navigate Portfolio
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {homeCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.08 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={card.link}
                  className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/15 backdrop-blur-md transition-all duration-300 flex flex-col items-center text-center gap-3 block"
                >
                  <span className="text-2xl">{card.icon}</span>
                  <div>
                    <h4 className="font-extrabold text-white text-sm tracking-tight">{card.title}</h4>
                    <p className="text-slate-500 text-[10px] font-medium mt-0.5">{card.desc}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400 mt-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
