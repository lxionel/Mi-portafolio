import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

/* ─────────────────────────────────────────────
   useGsap — scoped context with auto-cleanup
───────────────────────────────────────────── */
export function useGsap(fn, deps = []) {
  const scope = useRef(null);
  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => fn(gsap, ScrollTrigger), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return scope;
}

/* ─────────────────────────────────────────────
   setupPageAnimations
   Used on every inner page (Servicios, Precios, etc.)
───────────────────────────────────────────── */
export function setupPageAnimations(gsap, ScrollTrigger) {
  const st = (trigger, extra = {}) => ({
    trigger,
    start: 'top 88%',
    toggleActions: 'play none none none',
    ...extra,
  });

  /* Page header */
  gsap.fromTo('.pagehead .crumbs',
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: .6, ease: 'power3.out',
      scrollTrigger: st('.pagehead', { start: 'top 95%' }) });
  gsap.fromTo('.pagehead h1',
    { opacity: 0, y: 36, clipPath: 'inset(0 0 100% 0)' },
    { opacity: 1, y: 0,  clipPath: 'inset(0 0 0% 0)',
      duration: .9, ease: 'expo.out',
      scrollTrigger: st('.pagehead', { start: 'top 95%' }) });
  gsap.fromTo('.pagehead p',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: .7, delay: .15, ease: 'power3.out',
      scrollTrigger: st('.pagehead', { start: 'top 95%' }) });

  /* Generic section titles */
  gsap.utils.toArray('.section-head .eyebrow').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -18 },
      { opacity: 1, x: 0, duration: .6, ease: 'power3.out', scrollTrigger: st(el) });
  });
  gsap.utils.toArray('.section-head .section-title, .section-head h2').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 32, clipPath: 'inset(0 0 100% 0)' },
      { opacity: 1, y: 0,  clipPath: 'inset(0 0 0% 0)',
        duration: .9, ease: 'expo.out', scrollTrigger: st(el) });
  });
  gsap.utils.toArray('.section-head .lead').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: .65, ease: 'power3.out',
        scrollTrigger: st(el, { start: 'top 91%' }) });
  });

  /* Stagger groups */
  const groups = [
    { wrap: '.cards',          item: '.card',        stagger: .12 },
    { wrap: '.values',         item: '.value',       stagger: .10 },
    { wrap: '.steps',          item: '.step',        stagger: .10 },
    { wrap: '.price-grid',     item: '.price-card',  stagger: .13 },
    { wrap: '.addons',         item: '.addon',       stagger: .08 },
    { wrap: '.contact-channels', item: '.channel',   stagger: .09 },
    { wrap: '.work-live-grid', item: '.work-live',   stagger: .11 },
    { wrap: '.features',       item: 'li',           stagger: .05 },
  ];
  groups.forEach(({ wrap, item, stagger }) => {
    gsap.utils.toArray(wrap).forEach(container => {
      const items = container.querySelectorAll(item);
      if (!items.length) return;
      gsap.fromTo(items,
        { opacity: 0, y: 44, scale: .97 },
        { opacity: 1, y: 0, scale: 1,
          stagger, duration: .8, ease: 'back.out(1.3)',
          scrollTrigger: st(container) });
    });
  });

  /* Service detail blocks */
  gsap.utils.toArray('.svc-detail').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: .85, ease: 'power3.out',
        scrollTrigger: st(el) });
  });

  /* FAQ items */
  gsap.utils.toArray('.faq details').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, x: -22 },
      { opacity: 1, x: 0, duration: .55, ease: 'power3.out', delay: i * .04,
        scrollTrigger: st(el, { start: 'top 92%' }) });
  });

  /* About hero split */
  const aboutVisual = document.querySelector('.about-portrait');
  const aboutBody   = document.querySelector('.about-body');
  if (aboutVisual && aboutBody) {
    gsap.fromTo(aboutVisual,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: st('.about-hero') });
    gsap.fromTo(aboutBody,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: st('.about-hero') });
  }

  /* Values */
  gsap.utils.toArray('.value').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 36, scale: .96 },
      { opacity: 1, y: 0, scale: 1,
        duration: .75, ease: 'back.out(1.4)',
        delay: i * .09,
        scrollTrigger: st(el, { start: 'top 90%' }) });
  });

  /* Image frames */
  gsap.utils.toArray('.img-frame').forEach(frame => {
    gsap.fromTo(frame,
      { opacity: 0, clipPath: 'inset(0 0 100% 0)', scale: 1.04 },
      { opacity: 1, clipPath: 'inset(0 0 0% 0)', scale: 1,
        duration: 1, ease: 'expo.inOut', scrollTrigger: st(frame) });
  });

  /* Contact form */
  const form = document.querySelector('.form');
  if (form) {
    gsap.fromTo(form,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: .85, ease: 'power3.out',
        scrollTrigger: st(form) });
  }

  /* Addons */
  gsap.utils.toArray('.addon').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: .6, ease: 'power3.out', delay: i * .07,
        scrollTrigger: st(el, { start: 'top 92%' }) });
  });

  /* CTA band */
  const ctaBand = document.querySelector('.cta-band__inner');
  if (ctaBand) {
    gsap.fromTo(ctaBand,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: .9, ease: 'expo.out',
        scrollTrigger: st(ctaBand, { start: 'top 85%' }) });
  }

  /* Magnetic effect (desktop) */
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('.btn-primary, .btn-light').forEach(btn => {
      const onMove  = (e) => {
        const r  = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) * .25;
        const dy = (e.clientY - (r.top  + r.height / 2)) * .25;
        gsap.to(btn, { x: dx, y: dy, duration: .35, ease: 'power2.out' });
      };
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: .55, ease: 'elastic.out(1,.5)' });
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
    });
  }
}
