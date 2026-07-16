import { useEffect, useRef } from 'react';

// A subtle animated constellation background — hexagonal grid nodes that
// gently drift and form constellation patterns. Completely different from
// the particle mesh network approach.
export default function ConstellationGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{
      x: number; y: number;
      size: number; twinklePhase: number;
      twinkleSpeed: number; drift: number;
    }> = [];

    const resize = () => {
      canvas.width = (canvas.parentElement?.offsetWidth || window.innerWidth) * 2;
      canvas.height = (canvas.parentElement?.offsetHeight || window.innerHeight) * 2;
      ctx.scale(2, 2);
      initStars();
    };

    const initStars = () => {
      stars = [];
      const w = canvas.width / 2;
      const h = canvas.height / 2;
      // Sparse star field — much sparser than a particle network
      const count = Math.min(Math.floor((w * h) / 25000), 80);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 1.5 + 0.5,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.005 + Math.random() * 0.01,
          drift: (Math.random() - 0.5) * 0.08,
        });
      }
    };

    let time = 0;

    const draw = () => {
      const w = canvas.width / 2;
      const h = canvas.height / 2;
      ctx.clearRect(0, 0, w, h);
      time++;

      // Draw and animate stars
      stars.forEach((s) => {
        // Gentle vertical drift
        s.y += s.drift;
        if (s.y < -5) s.y = h + 5;
        if (s.y > h + 5) s.y = -5;

        // Twinkle
        const twinkle = 0.3 + Math.sin(time * s.twinkleSpeed + s.twinklePhase) * 0.35 + 0.35;
        const alpha = twinkle * 0.5;

        // Draw star glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
        grad.addColorStop(0, `rgba(168, 85, 247, ${alpha * 0.4})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fill();

        // Draw star core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${alpha})`;
        ctx.fill();
      });

      // Draw faint constellation lines between close stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dist = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
          if (dist < 120) {
            const alpha = ((120 - dist) / 120) * 0.04;
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const handleResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
}
