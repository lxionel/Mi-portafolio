import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wspUrl } from '../utils/whatsapp';
import CtaBand from '../components/CtaBand';
import { useGsap, setupPageAnimations } from '../hooks/useGsap';

export default function Nosotros() {
  useEffect(() => {
    document.title = 'Nosotros — Studio Zero | El estudio detrás de tu web';
    window.scrollTo(0, 0);
  }, []);

  const scope = useGsap((gsap, ScrollTrigger) => {
    setupPageAnimations(gsap, ScrollTrigger);
  }, []);

  return (
    <div ref={scope}>
      {/* ── PAGE HEADER ── */}
      <section className="pagehead">
        <div className="container">
          <p className="crumbs"><Link to="/">Inicio</Link> / Nosotros</p>
          <h1>Un estudio cercano, con estándar profesional.</h1>
          <p>Studio Zero nace para que los negocios locales tengan una presencia digital a la altura de cualquier ciudad grande, con trato directo y trabajo hecho a mano.</p>
        </div>
      </section>

      {/* ── ABOUT HERO ── */}
      <section className="section">
        <div className="container about-hero">
          <div className="about-portrait">
            <div className="img-frame">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=75&auto=format&fit=crop"
                alt="Fundador de Studio Zero"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div className="badge">
              <b>Lionel</b>
              <span>Fundador · Diseño y desarrollo</span>
            </div>
          </div>

          <div className="about-body">
            <span className="eyebrow">Ingeniería y Desarrollo</span>
            <h2>Hola, soy Lionel.</h2>
            <p>
              Desarrollador de software con formación en Ingeniería de Sistemas. No me limito
              a diseñar páginas web visualmente atractivas; construyo soluciones tecnológicas
              escalables, eficientes y seguras para que tu negocio funcione mejor.
            </p>
            <p style={{ marginTop: 14 }}>
              Con experiencia en aplicaciones móviles y arquitecturas backend robustas
              usando <strong>Java</strong> y <strong>SQL Server</strong>, enfoco cada proyecto
              desde la lógica y la prevención. Aplico principios de ciberseguridad para
              garantizar que la información de tus ventas y de tus clientes esté siempre protegida.
            </p>
            <p style={{ marginTop: 14 }}>
              Mi filosofía en Studio Zero es clara: ofrecer a las empresas locales infraestructura
              tecnológica de nivel corporativo, con trato directo y sin intermediarios.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
              <a
                className="btn btn-primary"
                href={wspUrl('Hola Lionel, me interesa trabajar un proyecto contigo')}
                target="_blank" rel="noopener noreferrer"
              >
                Agendar reunión técnica
              </a>
              <Link className="btn btn-ghost" to="/portafolio">Ver casos de estudio</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Cómo trabajamos</span>
            <h2 className="section-title">Lo que puedes esperar de nosotros.</h2>
          </div>
          <div className="values">
            {[
              {
                icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
                title: 'Trato directo',
                desc: 'Hablas siempre con quien diseña y construye tu sitio. Respuestas claras y el mismo día.'
              },
              {
                icon: <><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z"/><path d="M9 12l2 2 4-4"/></>,
                title: 'Garantía real',
                desc: 'Si el primer avance no te convence, te devolvemos el adelanto. El riesgo lo asumimos nosotros.'
              },
              {
                icon: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></>,
                title: 'Entrega puntual',
                desc: 'Fecha acordada por escrito. Cumplimos los plazos: de 3 a 7 días según el proyecto.'
              },
              {
                icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
                title: 'Arquitectura Segura',
                desc: 'Código limpio, bases de datos SQL y protocolos de seguridad. Un sistema blindado, no una plantilla frágil.'
              },
            ].map((v, i) => (
              <div key={i} className="value">
                <div className="v-ico">
                  <svg viewBox="0 0 24 24" fill="none">{v.icon}</svg>
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-dark">
        <div className="stats-dark__glow stats-dark__glow--1" aria-hidden="true" />
        <div className="stats-dark__glow stats-dark__glow--2" aria-hidden="true" />
        <div className="container stats-grid">
          {[
            { num: '+5',   label: 'años creando productos digitales' },
            { num: '100%', label: 'diseño a medida, sin plantillas' },
            { num: '3–7',  label: 'días de entrega promedio' },
            { num: '2',    label: 'ciudades atendidas en persona' },
          ].map((s, i) => (
            <div key={i} className="stat-block">
              <span className="stat-block__num">{s.num}</span>
              <span className="stat-block__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPLIT: Dónde trabajamos ── */}
      <section className="section">
        <div className="container split-immersive__inner">
          <div className="split-immersive__body">
            <span className="eyebrow">Dónde trabajamos</span>
            <h2>Cerca de ti, en Chimbote y Nuevo Chimbote.</h2>
            <p>Somos de la zona y conocemos cómo se mueve el negocio aquí. Podemos reunirnos en persona para conversar tu proyecto, algo que ninguna agencia a distancia te ofrece.</p>
            <ul className="checklist">
              <li><span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>Atención presencial en Chimbote y Nuevo Chimbote.</li>
              <li><span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>Atención a distancia para todo el Perú.</li>
              <li><span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>Pagos locales con Yape y Plin.</li>
            </ul>
          </div>
          <div className="split-immersive__visual">
            <div className="split-immersive__frame">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=75&auto=format&fit=crop"
                alt="Espacio de trabajo"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaBand
        title="Trabajemos <em>juntos</em>."
        subtitle="Cuéntanos tu idea y la convertimos en una presencia digital de la que estés orgulloso."
        primaryText="Escribir por WhatsApp"
        primaryMsg="Hola Studio Zero, quiero trabajar con ustedes"
        secondaryText="Ir a contacto"
        secondaryLink="/contacto"
      />
    </div>
  );
}
