import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Only on pointer devices
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;

    dot.style.display  = 'block';
    ring.style.display = 'block';

    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.set(dot, { x: mx, y: my });
    };

    // Ring follows with lag
    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      gsap.set(ring, { x: rx, y: ry });
      requestAnimationFrame(tick);
    };
    const rafId = requestAnimationFrame(tick);

    // Grow on interactive elements
    const onEnter = () => {
      dot.classList.add('grow');
      ring.classList.add('grow');
    };
    const onLeave = () => {
      dot.classList.remove('grow');
      ring.classList.remove('grow');
    };

    const attach = () => {
      document.querySelectorAll('a, button, [role="button"], .card, .work-card, .svc-row').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    attach();

    // Re-attach on DOM changes
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={dotRef} style={{ display: 'none' }} />
      <div className="cursor-ring" ref={ringRef} style={{ display: 'none' }} />
    </>
  );
}
