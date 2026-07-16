import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

interface NeuralBrainProps {
  isDark: boolean;
}

// A neural network "brain" visualization — interconnected nodes that
// react to the cursor, pulse organically, and reorganize on hover.
export default function NeuralBrain({ isDark }: NeuralBrainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [isHovered, setIsHovered] = useState(false);

  // Fixed node positions in a brain-like cluster shape
  const nodesRef = useRef<Array<{
    x: number; y: number; baseX: number; baseY: number;
    radius: number; phase: number; speed: number;
    layer: number; // 0=core, 1=mid, 2=outer
  }>>([]);

  const SIZE = 400;
  const CENTER = SIZE / 2;

  const initNodes = useCallback(() => {
    const nodes: typeof nodesRef.current = [];

    // Core cluster (dense center — "deep layers")
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.3;
      const r = 25 + Math.random() * 30;
      nodes.push({
        x: CENTER + Math.cos(angle) * r,
        y: CENTER + Math.sin(angle) * r,
        baseX: CENTER + Math.cos(angle) * r,
        baseY: CENTER + Math.sin(angle) * r,
        radius: 3.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.006,
        layer: 0,
      });
    }

    // Mid ring (hidden layers)
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2 + Math.random() * 0.2;
      const r = 70 + Math.random() * 35;
      nodes.push({
        x: CENTER + Math.cos(angle) * r,
        y: CENTER + Math.sin(angle) * r,
        baseX: CENTER + Math.cos(angle) * r,
        baseY: CENTER + Math.sin(angle) * r,
        radius: 2.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.006 + Math.random() * 0.005,
        layer: 1,
      });
    }

    // Outer shell (input/output layer)
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.15;
      const r = 120 + Math.random() * 40;
      nodes.push({
        x: CENTER + Math.cos(angle) * r,
        y: CENTER + Math.sin(angle) * r,
        baseX: CENTER + Math.cos(angle) * r,
        baseY: CENTER + Math.sin(angle) * r,
        radius: 2 + Math.random() * 1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.004,
        layer: 2,
      });
    }

    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    initNodes();
  }, [initNodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = SIZE * 2; // retina
    canvas.height = SIZE * 2;
    ctx.scale(2, 2);

    let time = 0;

    const layerColors = isDark
      ? [
          { node: '#c084fc', glow: 'rgba(192, 132, 252, 0.35)', line: 'rgba(192, 132, 252,' },
          { node: '#22d3ee', glow: 'rgba(34, 211, 238, 0.3)', line: 'rgba(34, 211, 238,' },
          { node: '#818cf8', glow: 'rgba(129, 140, 248, 0.25)', line: 'rgba(129, 140, 248,' },
        ]
      : [
          { node: '#7c3aed', glow: 'rgba(124, 58, 237, 0.3)', line: 'rgba(124, 58, 237,' },
          { node: '#0891b2', glow: 'rgba(8, 145, 178, 0.25)', line: 'rgba(8, 145, 178,' },
          { node: '#4f46e5', glow: 'rgba(79, 70, 229, 0.2)', line: 'rgba(79, 70, 229,' },
        ];

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      time += 1;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Animate node positions with organic breathing
      nodes.forEach((n) => {
        const breathX = Math.sin(time * n.speed + n.phase) * (6 + n.layer * 3);
        const breathY = Math.cos(time * n.speed * 1.3 + n.phase) * (5 + n.layer * 2);

        let targetX = n.baseX + breathX;
        let targetY = n.baseY + breathY;

        // Mouse attraction/repulsion
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            const force = (130 - dist) / 130;
            // Core nodes attracted, outer nodes repelled
            const direction = n.layer === 0 ? 1 : -0.6;
            targetX += dx * force * 0.15 * direction;
            targetY += dy * force * 0.15 * direction;
          }
        }

        n.x += (targetX - n.x) * 0.08;
        n.y += (targetY - n.y) * 0.08;
      });

      // Draw synaptic connections
      const maxDist = mouse.active ? 110 : 95;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < maxDist) {
            const alpha = ((maxDist - dist) / maxDist) * (mouse.active ? 0.3 : 0.12);
            const colorSet = layerColors[Math.min(a.layer, b.layer)];

            // Pulsing signal traveling along the connection
            const signalPhase = Math.sin(time * 0.03 + i * 0.5 + j * 0.3);
            const signalAlpha = alpha * (0.6 + signalPhase * 0.4);

            ctx.strokeStyle = `${colorSet.line} ${signalAlpha})`;
            ctx.lineWidth = mouse.active ? 1.2 : 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // Draw a traveling "signal dot" along some connections
            if (signalPhase > 0.5 && dist < 80) {
              const t = (Math.sin(time * 0.05 + i) + 1) / 2;
              const sx = a.x + (b.x - a.x) * t;
              const sy = a.y + (b.y - a.y) * t;
              ctx.beginPath();
              ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
              ctx.fillStyle = colorSet.node;
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const colorSet = layerColors[n.layer];
        const pulseScale = 1 + Math.sin(time * 0.02 + n.phase) * 0.15;
        const r = n.radius * pulseScale;

        // Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3);
        grad.addColorStop(0, colorSet.glow);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = colorSet.node;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDark]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * SIZE,
      y: ((e.clientY - rect.top) / rect.height) * SIZE,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full aspect-square max-w-[340px] md:max-w-[400px] mx-auto flex items-center justify-center select-none cursor-pointer"
    >
      {/* Ambient halo behind the brain */}
      <div
        className={`absolute inset-[15%] rounded-full transition-all duration-700 pointer-events-none ${
          isHovered
            ? 'blur-[60px] scale-110 opacity-50'
            : 'blur-[40px] scale-100 opacity-25'
        } ${isDark ? 'bg-purple-500/40' : 'bg-indigo-400/30'}`}
      />

      {/* The neural canvas */}
      <canvas
        ref={canvasRef}
        style={{ width: SIZE, height: SIZE }}
        className="relative z-10"
      />

      {/* Subtle label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-[9px] font-mono tracking-[0.3em] uppercase text-center pointer-events-none"
      >
        <span className={isDark ? 'text-purple-400/70' : 'text-indigo-500/70'}>
          Neural Network Active
        </span>
      </motion.div>
    </motion.div>
  );
}
