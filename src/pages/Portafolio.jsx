import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CtaBand from '../components/CtaBand';
import { useGsap, setupPageAnimations } from '../hooks/useGsap';

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function Portafolio() {
  useEffect(() => {
    document.title = 'Portafolio — Studio Zero | Demos reales';
    window.scrollTo(0, 0);
  }, []);

  const scope = useGsap((gsap, ScrollTrigger) => {
    setupPageAnimations(gsap, ScrollTrigger);
  }, []);

  return (
    <div ref={scope}>
      {/* ===== PAGE HEADER ===== */}
      <section className="pagehead">
        <div className="container">
          <p className="crumbs"><Link to="/">Inicio</Link> / Portafolio</p>
          <h1>No son capturas: son sistemas reales.</h1>
          <p>Conoce la arquitectura detrás de nuestros proyectos más destacados, desarrollados a medida con ingeniería de software.</p>
        </div>
      </section>

      {/* ===== PROJECTS GRID ===== */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="container">
          <div className="work-live-grid">

            {/* ---- Peripollos POS ---- */}
            <article className="work-live">
              <div className="work-live-frame reveal-img">
                <img
                  src={publicAsset('/img/peripollos-pos.jpg')}
                  alt="Sistema POS Peripollos en Java"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="work-live-body">
                <span className="eyebrow">Desarrollo Backend · Sistema POS</span>
                <h2>Sistema de Gestión "Peripollos"</h2>
                <p>
                  Desarrollo completo de un sistema de Punto de Venta (POS) programado en{' '}
                  <strong>Java</strong> con conexión a base de datos{' '}
                  <strong>SQL Server</strong>. Diseñado para optimizar la toma de pedidos,
                  inserción de datos en tiempo real y comunicación automatizada mediante
                  Webhooks y un Chatbot integrado.
                </p>
                <ul className="checklist">
                  <li><span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>Arquitectura robusta en Java y consultas SQL optimizadas.</li>
                  <li><span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>Integración de Webhooks y lógica de Chatbot.</li>
                </ul>
              </div>
            </article>

            {/* ---- MetaBit App ---- */}
            <article className="work-live">
              <div className="work-live-frame reveal-img">
                <img
                  src={publicAsset('/img/metabit-app.jpg')}
                  alt="Aplicación Móvil MetaBit"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="work-live-body">
                <span className="eyebrow">Aplicación Móvil · Finanzas</span>
                <h2>App "MetaBit"</h2>
                <p>
                  Desarrollo de una aplicación móvil enfocada en la automatización de metas
                  de ahorro. El proyecto implicó desde el diseño de la interfaz (UI) y la
                  identidad visual (logotipo), hasta la programación de la lógica interna y
                  la compilación del APK funcional.
                </p>
                <ul className="checklist">
                  <li><span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>Algoritmos de cálculo para proyección de ahorros.</li>
                  <li><span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>Desarrollo de interfaz de usuario intuitiva.</li>
                </ul>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <CtaBand
        title="¿Imaginas tu negocio <em>así</em>?"
        subtitle="Cuéntanos qué necesitas y preparamos una demo o propuesta a tu medida."
        primaryText="Quiero algo así"
        primaryMsg="Hola Studio Zero, vi el portafolio y quiero algo similar para mi negocio"
        secondaryText="Ver precios"
        secondaryLink="/precios"
      />
    </div>
  );
}
