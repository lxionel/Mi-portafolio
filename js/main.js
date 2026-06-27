/* ============================================================
   STUDIO ZERO — JavaScript (tema oscuro premium)
   Cada bloque comprueba si su elemento existe → sirve para todas
   las páginas. Animaciones modernas con GSAP (si está disponible).

   Índice:
     1. CONFIGURACIÓN (WhatsApp)
     2. Arranque
     3. Links de WhatsApp
     4. Menú móvil
     5. Scroll: nav + volver arriba + barra de progreso
     6. Glow que sigue al cursor
     7. Marquees (duplicado para bucle)
      8-9. GSAP ScrollTrigger (reveals, staggers, parallax, tilt) + fallback
      10. Estimador de precios
      11. Formulario de contacto → WhatsApp
   ============================================================ */


/* 1. CONFIGURACIÓN — número de WhatsApp/llamadas (sin + ni espacios) */
const WSP = "51952102805";

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.matchMedia('(hover:hover) and (pointer:fine)').matches;


/* 2. Arranque */
document.documentElement.classList.add('js');


/* 3. Links de WhatsApp */
document.querySelectorAll('.wsp-link').forEach(a => {
  const msg = encodeURIComponent(a.dataset.msg || "Hola Studio Zero, quiero información");
  a.href = `https://wa.me/${WSP}?text=${msg}`;
});


/* 4. Menú móvil */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const abierto = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', abierto);
    navToggle.setAttribute('aria-expanded', abierto);
  });
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}


/* 5. Scroll: nav + volver arriba + barra de progreso */
const nav     = document.getElementById('nav');
const backTop = document.getElementById('backTop');
let tlBar = null;
const topline = document.querySelector('.topline');
if (topline) { tlBar = document.createElement('i'); tlBar.className = 'tl-bar'; topline.appendChild(tlBar); }

function onScroll() {
  const y = scrollY;
  nav     && nav.classList.toggle('scrolled', y > 8);
  backTop && backTop.classList.toggle('show', y > 600);
  if (tlBar) {
    const h = document.documentElement.scrollHeight - innerHeight;
    tlBar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  }
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (backTop) backTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));


/* 7. Marquees — duplica el contenido para bucle continuo */
document.querySelectorAll('.marquee-row, .marquee-track').forEach(row => {
  row.innerHTML += row.innerHTML;
});


/* 8–9. SISTEMA DE ANIMACIONES — GSAP ScrollTrigger + Fallback
   ─────────────────────────────────────────────────────────
   GSAP disponible → animaciones premium (timeline, stagger, parallax).
   Sin GSAP       → IntersectionObserver + CSS transitions (fallback).
   Reduced motion → todo visible al instante.
   ───────────────────────────────────────────────────────── */

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);

  /* Desactivar CSS transitions — GSAP toma el control */
  document.querySelectorAll('.reveal, .reveal-img').forEach(el => el.style.transition = 'none');

  /* ── A. HERO TIMELINE (entrada coordinada al cargar) ── */
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.querySelectorAll('.hero-title .word').forEach(w => w.style.animation = 'none');

    const htl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    htl
      .fromTo('.hero-pill',
        { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo('.hero-title .word',
        { opacity: 0, y: 34 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.7 }, '-=0.3')
      .fromTo('.hero-sub',
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo('.hero-ctas .btn',
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.5 }, '-=0.3')
      .fromTo('.hero-trust span',
        { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, '-=0.2')
      .fromTo('.hero-visual',
        { opacity: 0, x: 60, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power4.out' }, '-=0.6')
      .fromTo('.hero-stat',
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.5');
  }

  /* ── B. STAGGERED GROUPS (tarjetas, valores, grids) ── */
  const staggerMap = [
    { p: '.cards',      c: '.card',       s: 0.15 },
    { p: '.values',     c: '.value',      s: 0.12 },
    { p: '.work-grid',  c: '.work',       s: 0.15 },
    { p: '.price-grid', c: '.price-card', s: 0.15 },
    { p: '.addons',     c: '.addon',      s: 0.10 },
    { p: '.stats',      c: '.stat',       s: 0.12 },
  ];
  const staggerSelectors = staggerMap.map(m => m.p);

  staggerMap.forEach(({ p, c, s }) => {
    gsap.utils.toArray(p).forEach(container => {
      const items = container.querySelectorAll(c);
      if (!items.length) return;
      gsap.fromTo(items,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: s, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: container, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    });
  });

  /* ── C. SCROLL REVEALS (elementos .reveal individuales) ── */
  gsap.utils.toArray('.reveal').forEach(el => {
    if (el.closest('.hero')) return;
    if (staggerSelectors.some(s => el.closest(s))) return;
    if (el.classList.contains('reveal-img')) return;
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  /* ── D. IMAGE REVEALS (clip-path animado) ── */
  gsap.utils.toArray('.reveal-img').forEach(el => {
    gsap.fromTo(el,
      { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
      { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 1.2, ease: 'power4.inOut',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  /* ── E. CONTADORES NUMÉRICOS ── */
  gsap.utils.toArray('[data-count]').forEach(el => {
    const fin = parseFloat(el.dataset.count);
    const dec = (fin % 1 !== 0) ? 1 : 0;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: fin, duration: 2, ease: 'power2.out',
      snap: { val: dec === 0 ? 1 : 0.1 },
      onUpdate: () => { el.textContent = obj.val.toFixed(dec); },
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  /* ── F. PARALLAX: imágenes en splits (scrub) ── */
  gsap.utils.toArray('.split-media .img-frame').forEach(frame => {
    gsap.fromTo(frame, { y: -30 }, {
      y: 30, ease: 'none',
      scrollTrigger: { trigger: frame.closest('.split') || frame, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
    });
  });

  /* ── G. PARALLAX: hero orbs (scrub) ── */
  gsap.utils.toArray('.hero-orb').forEach((orb, i) => {
    gsap.to(orb, {
      yPercent: (i + 1) * 18 * (i % 2 ? -1 : 1), ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  });

  /* ── H. PARALLAX: CTA aurora beams (scrub) ── */
  gsap.utils.toArray('.cta-band').forEach(band => {
    band.querySelectorAll('.aurora-beam').forEach((beam, i) => {
      gsap.to(beam, {
        y: (i + 1) * -30, x: (i % 2 ? 20 : -20), ease: 'none',
        scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: 2 }
      });
    });
  });

  /* ── I. PARALLAX: stats aurora (scrub) ── */
  gsap.utils.toArray('.stats-aurora').forEach(aurora => {
    const sec = aurora.closest('.stats-section');
    if (sec) gsap.to(aurora, {
      xPercent: -8, ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 2 }
    });
  });

  /* ── J. PARALLAX: portafolio images (scrub) ── */
  gsap.utils.toArray('.work-live-frame').forEach(frame => {
    const parent = frame.closest('.work-live') || frame;
    gsap.fromTo(frame, { y: -20 }, {
      y: 20, ease: 'none',
      scrollTrigger: { trigger: parent, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
    });
  });

  /* ── K. TILT 3D del hero (mousemove, solo desktop) ── */
  if (isDesktop) {
    const hv = document.querySelector('.hero-visual');
    if (hv) {
      const frame = hv.querySelector('.img-frame');
      hv.addEventListener('mousemove', e => {
        const r = hv.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5;
        const py = (e.clientY - r.top) / r.height - .5;
        gsap.to(frame, { rotateY: px * 8, rotateX: -py * 8, transformPerspective: 800, duration: .5, ease: 'power2.out' });
      });
      hv.addEventListener('mouseleave', () => gsap.to(frame, { rotateY: 0, rotateX: 0, duration: .6 }));
    }
  }

  /* ── L. EFECTO SCROLL HORIZONTAL (Portafolio) ── */
  const hContainers = gsap.utils.toArray('.horizontal-scroll-container');
  hContainers.forEach(container => {
    const track = container.querySelector('.horizontal-track');
    if (track) {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "center center",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }
  });

} else if (!reduceMotion) {
  /* ── FALLBACK sin GSAP: IntersectionObserver + CSS transitions ── */
  const obsReveal = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); obsReveal.unobserve(en.target); }
    });
  }, { threshold: .14 });
  document.querySelectorAll('.reveal, .reveal-img').forEach(el => obsReveal.observe(el));

  function animarContador(el) {
    const fin = parseFloat(el.dataset.count);
    const dur = 1600, inicio = performance.now();
    const dec = (fin % 1 !== 0) ? 1 : 0;
    function tick(t) {
      const p = Math.min(1, (t - inicio) / dur);
      el.textContent = ((1 - Math.pow(1 - p, 4)) * fin).toFixed(dec);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const obsCount = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { animarContador(en.target); obsCount.unobserve(en.target); }
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-count]').forEach(el => obsCount.observe(el));

} else {
  /* ── REDUCED MOTION: todo visible al instante ── */
  document.querySelectorAll('.reveal, .reveal-img').forEach(el => {
    el.style.opacity = '1'; el.style.transform = 'none';
    el.style.clipPath = 'none'; el.style.transition = 'none';
  });
  document.querySelectorAll('[data-count]').forEach(el => el.textContent = el.dataset.count);
  document.querySelectorAll('.hero-title .word').forEach(w => {
    w.style.opacity = '1'; w.style.transform = 'none'; w.style.animation = 'none';
  });
}


/* 10. Estimador de precios (solo en Precios) */
const estimador = document.getElementById('estimador');
if (estimador) {
  const est = { rubro: null, pack: null, precio: 0, maint: false };
  const elOpts  = document.getElementById('estRubros');
  const elPkgs  = document.getElementById('estPkgs');
  const elMaint = document.getElementById('estMaint');
  const elTotal = document.getElementById('estTotal');
  const elSend  = document.getElementById('estSend');

  function refrescar() {
    elTotal.innerHTML = est.precio > 0
      ? `S/ ${est.precio}` + (est.maint ? ` <em>+ S/100/mes</em>` : '')
      : 'S/ —';
    const listo = est.rubro && est.pack;
    elSend.classList.toggle('off', !listo);
    if (listo) {
      const msg = `Hola Studio Zero, quiero cotizar:\n• Negocio: ${est.rubro}\n• Paquete: ${est.pack} (S/${est.precio})\n• Mantenimiento mensual: ${est.maint ? 'Sí (S/100/mes)' : 'No'}`;
      elSend.href = `https://wa.me/${WSP}?text=${encodeURIComponent(msg)}`;
    }
  }
  elOpts.addEventListener('click', e => {
    const o = e.target.closest('.est-opt'); if (!o) return;
    elOpts.querySelectorAll('.est-opt').forEach(x => x.classList.remove('sel'));
    o.classList.add('sel'); est.rubro = o.dataset.v; refrescar();
  });
  elPkgs.addEventListener('click', e => {
    const p = e.target.closest('.est-pkg'); if (!p) return;
    elPkgs.querySelectorAll('.est-pkg').forEach(x => x.classList.remove('sel'));
    p.classList.add('sel'); est.pack = p.dataset.name; est.precio = parseInt(p.dataset.price, 10); refrescar();
  });
  elMaint.addEventListener('change', e => { est.maint = e.target.checked; refrescar(); });
  refrescar();
}


/* 11. Formulario de contacto → WhatsApp (Formato Estructurado) */
const cForm = document.getElementById('contactForm');
if (cForm) {
  let cuando = "No especificado";
  const whenChips = document.getElementById('whenChips');
  if (whenChips) whenChips.addEventListener('click', e => {
    const c = e.target.closest('.chip'); if (!c) return;
    whenChips.querySelectorAll('.chip').forEach(x => x.classList.remove('sel'));
    c.classList.add('sel'); cuando = c.dataset.v;
  });

  cForm.addEventListener('submit', e => {
    e.preventDefault();
    const nombre  = document.getElementById('cfNombre').value.trim();
    const negocio = document.getElementById('cfNegocio').value.trim() || 'No especificado';
    const servicio = document.getElementById('cfServicio');
    const detalle = document.getElementById('cfMsg').value.trim() || 'Sin detalles adicionales';

    // Formato tipo "Ticket" usando negritas y cursivas de WhatsApp
    const msg = `*NUEVA SOLICITUD DE PROYECTO* 🚀\n\n` +
                `*Datos del Cliente:*\n` +
                `👤 *Nombre:* ${nombre}\n` +
                `🏢 *Negocio:* ${negocio}\n\n` +
                `*Detalles del Requerimiento:*\n` +
                `💻 *Servicio de interés:* ${servicio && servicio.value ? servicio.value : 'Por definir'}\n` +
                `🕒 *Horario de contacto:* ${cuando}\n\n` +
                `*Descripción:*\n` +
                `📝 _"${detalle}"_`;

    window.open(`https://wa.me/${WSP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
}