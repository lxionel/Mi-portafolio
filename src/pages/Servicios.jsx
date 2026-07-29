import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wspUrl } from '../utils/whatsapp';
import CtaBand from '../components/CtaBand';
import { useGsap, setupPageAnimations } from '../hooks/useGsap';

export default function Servicios() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Servicios — Studio Zero | Desarrollo de Software a Medida';
  }, []);

  const scope = useGsap((gsap, ScrollTrigger) => {
    setupPageAnimations(gsap, ScrollTrigger);
  }, []);

  return (
    <div ref={scope}>
      {/* ===== PAGE HEADER ===== */}
      <section className="pagehead">
        <div className="container">
          <p className="crumbs">
            <Link to="/">Inicio</Link> / Servicios
          </p>
          <h1>Sistemas y arquitecturas diseñadas para escalar.</h1>
          <p>
            Desde aplicaciones móviles nativas hasta bases de datos relacionales y sistemas de
            gestión de ventas (POS). Conoce nuestras áreas de especialidad en ingeniería de
            software.
          </p>
        </div>
      </section>

      {/* ===== SERVICE DETAILS ===== */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">

          {/* ── Especialidad 01 ── */}
          <article className="svc-detail">
            <div>
              <span className="svc-num">Especialidad 01</span>
              <h2>Sistemas Web y de Ventas (POS)</h2>
              <p>
                Software a medida para automatizar tu negocio. Diseñamos sistemas de Punto de Venta
                y paneles administrativos que gestionan tu inventario, ventas y catálogos en tiempo
                real.
              </p>
              <div className="svc-cols">
                <div>
                  <h4>Incluye</h4>
                  <ul className="yes">
                    <li>Lógica de negocio en Java u otros lenguajes robustos</li>
                    <li>Conexión a base de datos (SQL Server / MySQL)</li>
                    <li>Panel de administración interactivo</li>
                    <li>Integración de Webhooks y chatbots</li>
                    <li>Seguridad contra inyecciones SQL</li>
                  </ul>
                </div>
                <div>
                  <h4>No incluye</h4>
                  <ul className="no">
                    <li>Hardware físico (computadoras, impresoras térmicas)</li>
                  </ul>
                </div>
              </div>
              <div className="svc-meta">
                <span className="tagx">
                  Entrega <span>10-15 días</span>
                </span>
                <span className="tagx">
                  Desde <span>S/ 850</span>
                </span>
                <Link className="link-arrow" to="/precios">
                  Ver precios{' '}
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 12h12l-5-5 1.4-1.4L21 12l-7.6 6.4L12 17l5-5H5z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <div className="img-frame">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=75&auto=format&fit=crop"
                  alt="Sistema POS y Dashboard"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>
          </article>

          {/* ── Especialidad 02 (reverse) ── */}
          <article className="svc-detail reverse">
            <div>
              <span className="svc-num">Especialidad 02</span>
              <h2>Aplicaciones Móviles</h2>
              <p>
                Llevamos tu idea a la palma de la mano de tus usuarios. Desarrollamos apps móviles
                desde el diseño de la interfaz (UI) hasta la compilación del APK funcional y
                algoritmos internos.
              </p>
              <div className="svc-cols">
                <div>
                  <h4>Incluye</h4>
                  <ul className="yes">
                    <li>Diseño de experiencia de usuario (UX/UI)</li>
                    <li>Programación de algoritmos lógicos (ej. Finanzas, ahorro)</li>
                    <li>Conexión con base de datos en la nube (Firebase / SQL)</li>
                    <li>Entrega de código fuente y APK funcional</li>
                  </ul>
                </div>
                <div>
                  <h4>No incluye</h4>
                  <ul className="no">
                    <li>Pago de licencias de desarrollador en Play Store / App Store</li>
                  </ul>
                </div>
              </div>
              <div className="svc-meta">
                <span className="tagx">
                  Cotización <span>A medida</span>
                </span>
                <span className="tagx">
                  Desde <span>S/ 1500+</span>
                </span>
                <Link className="link-arrow" to="/precios">
                  Ver precios{' '}
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 12h12l-5-5 1.4-1.4L21 12l-7.6 6.4L12 17l5-5H5z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <div className="img-frame">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=75&auto=format&fit=crop"
                  alt="Desarrollo de Aplicación Móvil"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>
          </article>

          {/* ── Especialidad 03 ── */}
          <article className="svc-detail">
            <div>
              <span className="svc-num">Especialidad 03</span>
              <h2>Desarrollo Backend y APIs</h2>
              <p>
                El motor invisible pero fundamental de cualquier negocio digital. Construimos la
                lógica de servidor, autenticación segura y conexión con servicios de terceros como
                pasarelas de pago y entidades del estado (RENIEC/SUNAT).
              </p>
              <div className="svc-cols">
                <div>
                  <h4>Incluye</h4>
                  <ul className="yes">
                    <li>Desarrollo de APIs RESTful</li>
                    <li>Gestión y diseño de bases de datos relacionales</li>
                    <li>Implementación de tokens de seguridad (Bearer / JWT)</li>
                    <li>Integración con billeteras digitales (Yape, Plin)</li>
                  </ul>
                </div>
                <div>
                  <h4>No incluye</h4>
                  <ul className="no">
                    <li>Diseño visual (Frontend) complejo, si se contrata individualmente.</li>
                  </ul>
                </div>
              </div>
              <div className="svc-meta">
                <span className="tagx">
                  Cotización <span>A medida</span>
                </span>
                <span className="tagx">
                  Consultar <span>proyecto</span>
                </span>
                <a
                  className="link-arrow"
                  href={wspUrl('Hola Studio Zero, quiero cotizar la arquitectura de un Backend/API')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hablar con un ingeniero{' '}
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 12h12l-5-5 1.4-1.4L21 12l-7.6 6.4L12 17l5-5H5z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <div className="img-frame">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=75&auto=format&fit=crop"
                  alt="Código y Backend"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>
          </article>

          {/* ── Especialidad 04 (reverse) ── */}
          <article className="svc-detail reverse">
            <div>
              <span className="svc-num">Especialidad 04</span>
              <h2>Plataformas Web Corporativas</h2>
              <p>
                La presencia oficial y blindada de tu empresa. Creada desde cero (sin constructores
                lentos) para garantizar máxima velocidad de carga, interactividad profesional y
                posicionamiento en Google.
              </p>
              <div className="svc-cols">
                <div>
                  <h4>Incluye</h4>
                  <ul className="yes">
                    <li>Diseño UI/UX corporativo propio</li>
                    <li>Formularios de contacto seguros</li>
                    <li>Animaciones fluidas y de alto nivel (GSAP)</li>
                    <li>Optimización técnica (SEO) y certificados SSL</li>
                  </ul>
                </div>
                <div>
                  <h4>No incluye</h4>
                  <ul className="no">
                    <li>Gestión de bases de datos complejas de inventario</li>
                    <li>Redacción de textos legales</li>
                  </ul>
                </div>
              </div>
              <div className="svc-meta">
                <span className="tagx">
                  Entrega <span>5 días</span>
                </span>
                <span className="tagx">
                  Desde <span>S/ 450</span>
                </span>
                <Link className="link-arrow" to="/precios">
                  Ver precios{' '}
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 12h12l-5-5 1.4-1.4L21 12l-7.6 6.4L12 17l5-5H5z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <div className="img-frame">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=75&auto=format&fit=crop"
                  alt="Desarrollo Web Corporativo"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>
          </article>

        </div>
      </section>

      {/* ===== METODOLOGÍA ===== */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Metodología de trabajo</span>
            <h2 className="section-title">El ciclo de desarrollo de software.</h2>
          </div>
          <div className="steps">
            <div className="step">
              <h3>Análisis de Negocio</h3>
              <p>
                Evaluamos el flujo de tu empresa, definimos la lógica de la base de datos y la
                arquitectura necesaria.
              </p>
            </div>
            <div className="step">
              <h3>Diseño y Estructura</h3>
              <p>
                Creamos el modelado de datos y el diseño de la interfaz visual (UI) para tu
                aprobación.
              </p>
            </div>
            <div className="step">
              <h3>Desarrollo y Código</h3>
              <p>
                Programamos el backend, integramos las APIs y blindamos la seguridad del sistema.
              </p>
            </div>
            <div className="step">
              <h3>Despliegue (Deploy)</h3>
              <p>
                Realizamos pruebas de rendimiento, subimos el sistema al servidor y te entregamos el
                control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <CtaBand
        title="¿Listo para digitalizar <em>tu empresa</em>?"
        subtitle="Cuéntanos el reto técnico que tienes y armaremos la arquitectura ideal para tu negocio."
        primaryText="Consultar con un desarrollador"
        primaryMsg="Hola Studio Zero, quiero asesoría técnica sobre un desarrollo"
        secondaryText="Ver casos de estudio"
        secondaryLink="/portafolio"
      />
    </div>
  );
}
