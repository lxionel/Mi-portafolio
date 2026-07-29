import { useEffect, useRef } from 'react';

export default function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const mouse = { x: -9999, y: -9999 };
    let animId;
    let particles = [];

    /* ── Resize to fill parent ── */
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Rebuild particles on resize to fill new dimensions
      particles = Array.from({ length: 110 }, () => new Particle());
    };

    /* ── Particle class ── */
    class Particle {
      constructor() { this.init(true); }

      init(random = false) {
        this.x  = random ? Math.random() * canvas.width  : Math.random() * canvas.width;
        this.y  = random ? Math.random() * canvas.height : Math.random() * canvas.height;
        /* Slow drift */
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        /* Visual */
        this.size       = Math.random() * 1.4 + 0.4;
        this.baseOpacity = Math.random() * 0.45 + 0.1;
        this.opacity    = this.baseOpacity;
      }

      update() {
        const dx   = this.x - mouse.x;
        const dy   = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const R    = 160; // repulsion radius

        if (dist < R && dist > 0) {
          const force = (R - dist) / R;            // 0→1 as particle gets closer
          const angle = Math.atan2(dy, dx);
          this.vx += Math.cos(angle) * force * 1.1;
          this.vy += Math.sin(angle) * force * 1.1;
          this.opacity = Math.min(0.9, this.baseOpacity + force * 0.55);
        } else {
          /* Drift opacity back to base */
          this.opacity += (this.baseOpacity - this.opacity) * 0.04;
        }

        /* Soft friction so velocity doesn't grow unbounded */
        this.vx *= 0.96;
        this.vy *= 0.96;

        this.x += this.vx;
        this.y += this.vy;

        /* Wrap around edges */
        if (this.x < -10)             this.x = canvas.width  + 10;
        if (this.x > canvas.width+10) this.x = -10;
        if (this.y < -10)             this.y = canvas.height + 10;
        if (this.y > canvas.height+10) this.y = -10;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle   = '#c8d8f0';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    /* ── Draw connections between nearby particles ── */
    const MAX_CONN = 130;

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_CONN) {
            const alpha = (1 - dist / MAX_CONN) * 0.18;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#4A80CC';
            ctx.lineWidth   = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }

    /* ── Subtle mouse glow ── */
    function drawMouseGlow() {
      if (mouse.x === -9999) return;
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 140);
      grad.addColorStop(0,   'rgba(74,128,204,0.10)');
      grad.addColorStop(0.5, 'rgba(74,128,204,0.04)');
      grad.addColorStop(1,   'rgba(74,128,204,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    /* ── Main loop ── */
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMouseGlow();
      drawConnections();
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(loop);
    }

    /* ── Event listeners (on window so pointer-events:none works) ── */
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    resize();
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', resize, { passive: true });
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
