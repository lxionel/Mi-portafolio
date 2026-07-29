import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const elRef   = useRef(null);
  const fillRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const el   = elRef.current;
    const fill = fillRef.current;
    const logo = logoRef.current;
    if (!el || !fill || !logo) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(el, {
          yPercent: -100, duration: .7, ease: 'power3.inOut',
          onComplete: () => {
            el.style.display = 'none';
            onComplete?.();
          }
        });
      }
    });

    tl
      .to(logo, { opacity: 1, y: -10, duration: .5, ease: 'power3.out' })
      .to(fill, { width: '100%', duration: .9, ease: 'power2.inOut' }, '-=.1')
      .to(logo, { opacity: 0, y: -10, duration: .3, ease: 'power2.in' }, '-=.15');
  }, [onComplete]);

  return (
    <div className="preloader" ref={elRef}>
      <div className="preloader__logo" ref={logoRef}>
        Studio<span>Zero</span>
      </div>
      <div className="preloader__bar">
        <div className="preloader__bar-fill" ref={fillRef} />
      </div>
    </div>
  );
}
