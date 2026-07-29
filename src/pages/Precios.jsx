import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wspUrl } from '../utils/whatsapp';
import CtaBand from '../components/CtaBand';
import { useGsap, setupPageAnimations } from '../hooks/useGsap';

/* ── SVG check icon reusable ── */
const CheckIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
);

/* ── Data ── */
const rubros = [
  { label: 'Restaurante', value: 'Restaurante o cafetería' },
  { label: 'Comercio',    value: 'Comercio o bodega' },
  { label: 'Servicios',   value: 'Servicios profesionales' },
  { label: 'Salud',       value: 'Salud' },
  { label: 'Educación',   value: 'Educación' },
  { label: 'Otro',        value: 'Otro' },
];

const planes = [
  { name: 'Web Corporativa',  price: '450',  display: 'S/ 450' },
  { name: 'Sistemas Web',     price: '850',  display: 'S/ 850' },
  { name: 'Software a Medida', price: '1500', display: 'S/ 1500+' },
];

const tableRows = [
  { feature: 'Diseño UI/UX exclusivo',               web: 'yes',  sis: 'yes',  soft: 'yes',  webTxt: 'Sí', sisTxt: 'Sí', softTxt: 'Sí' },
  { feature: 'Código propio (sin plantillas)',        web: 'yes',  sis: 'yes',  soft: 'yes',  webTxt: 'Sí', sisTxt: 'Sí', softTxt: 'Sí' },
  { feature: 'SEO y optimización de carga',           web: 'yes',  sis: 'yes',  soft: 'yes',  webTxt: 'Sí', sisTxt: 'Sí', softTxt: 'Sí' },
  { feature: 'Responsive (móvil y tablet)',           web: 'yes',  sis: 'yes',  soft: 'yes',  webTxt: 'Sí', sisTxt: 'Sí', softTxt: 'Sí' },
  { feature: 'Integración WhatsApp / Yape / Plin',   web: 'yes',  sis: 'yes',  soft: 'yes',  webTxt: 'Sí', sisTxt: 'Sí', softTxt: 'Sí' },
  { feature: 'Base de datos relacional (SQL Server)', web: 'nope', sis: 'yes',  soft: 'yes',  webTxt: '—',  sisTxt: 'Sí', softTxt: 'Sí' },
  { feature: 'Catálogo dinámico / inventario',        web: 'nope', sis: 'yes',  soft: 'yes',  webTxt: '—',  sisTxt: 'Sí', softTxt: 'Sí' },
  { feature: 'Seguridad anti inyecciones SQL',        web: 'nope', sis: 'yes',  soft: 'yes',  webTxt: '—',  sisTxt: 'Sí', softTxt: 'Sí' },
  { feature: 'Panel de administración',               web: 'nope', sis: 'yes',  soft: 'yes',  webTxt: '—',  sisTxt: 'Básico', softTxt: 'Completo' },
  { feature: 'Backend Java / APIs REST',              web: 'nope', sis: 'nope', soft: 'yes',  webTxt: '—',  sisTxt: '—',  softTxt: 'Sí' },
  { feature: 'Webhooks y automatizaciones',           web: 'nope', sis: 'nope', soft: 'yes',  webTxt: '—',  sisTxt: '—',  softTxt: 'Sí' },
  { feature: 'Aplicación móvil (APK)',                web: 'nope', sis: 'nope', soft: 'yes',  webTxt: '—',  sisTxt: '—',  softTxt: 'Sí' },
  { feature: 'Documentación técnica',                 web: 'nope', sis: 'nope', soft: 'yes',  webTxt: '—',  sisTxt: '—',  softTxt: 'Sí' },
  { feature: 'Tiempo de entrega',                     web: '',     sis: '',     soft: '',     webTxt: '5 días', sisTxt: '7–10 días', softTxt: '15–30 días' },
];

const addons = [
  { title: 'Mantenimiento mensual',       desc: 'Hasta 4 actualizaciones al mes. Sin permanencia.',           price: 'S/ 100',    unit: '/ mes' },
  { title: 'Dominio propio (.com / .pe)', desc: 'Lo registramos a tu nombre; lo pagas al proveedor.',         price: 'desde S/ 50', unit: '/ año' },
  { title: 'Sección o página extra',      desc: 'Amplía tu sitio con secciones adicionales.',                 price: 'S/ 80',     unit: 'c/u' },
  { title: 'Asesoría de fotos',           desc: 'Te guiamos para tomar fotos profesionales con tu celular.',  price: 'S/ 60',     unit: 'sesión' },
  { title: 'Configuración de Google',     desc: 'Tu negocio en Google Maps y resultados de búsqueda.',        price: 'S/ 120',    unit: 'único' },
  { title: 'Hosting administrado',        desc: 'Alojamiento gestionado por nosotros, opcional.',             price: 'desde S/ 15', unit: '/ mes' },
];

const faqs = [
  {
    q: '¿Tengo que pagar todos los meses?',
    a: 'No. Los planes son de pago único y el sitio queda funcionando. El mantenimiento de S/100/mes es opcional, solo si quieres que actualicemos el contenido por ti.',
  },
  {
    q: '¿Cómo es la forma de pago?',
    a: '50% para empezar y 50% al entregarte todo funcionando y aprobado. Aceptamos Yape y Plin.',
  },
  {
    q: '¿El precio puede subir después?',
    a: 'No. El precio se acuerda por escrito antes de empezar. Si pides algo fuera del plan, te pasamos el costo y decides si lo agregas.',
  },
  {
    q: '¿El dominio y el hosting están incluidos?',
    a: 'El primer año de hosting básico puede incluirse según el plan; el dominio se registra a tu nombre y se paga al proveedor (desde ~S/50/año). Te explicamos todo con claridad.',
  },
  {
    q: '¿Y si necesito algo a medida?',
    a: 'Lo cotizamos según el alcance. Escríbenos y armamos una propuesta personalizada para tu caso.',
  },
];

/* ════════════════════════════════════════════════════════════
   PRECIOS PAGE
   ════════════════════════════════════════════════════════════ */
export default function Precios() {
  const [rubro, setRubro] = useState(null);
  const [plan, setPlan]   = useState(null);

  useEffect(() => {
    document.title = 'Precios — Studio Zero | Planes corporativos de desarrollo';
    window.scrollTo(0, 0);
  }, []);

  const scope = useGsap((gsap, ScrollTrigger) => {
    setupPageAnimations(gsap, ScrollTrigger);
  }, []);

  /* Build WhatsApp message from estimator selections */
  const estimatorMsg = rubro && plan
    ? `Hola Studio Zero, tengo un negocio de *${rubro}* y me interesa el plan *${plan.name}* (S/ ${plan.price}). ¿Me pueden dar más detalles?`
    : null;

  return (
    <div ref={scope}>
      {/* ===== PAGE HEADER ===== */}
      <section className="pagehead">
        <div className="container">
          <p className="crumbs"><Link to="/">Inicio</Link> / Precios</p>
          <h1>Inversión clara, desarrollo profesional.</h1>
          <p>Sin mensualidades obligatorias ni letra chica. Eliges tu plan, pagas 50% para empezar y 50% al recibir tu proyecto funcionando y aprobado.</p>
        </div>
      </section>

      {/* ===== PRICING CARDS ===== */}
      <section className="section bg-soft">
        <div className="container">
          <div className="price-grid">

            {/* Card 1 — Web Corporativa */}
            <div className="price-card reveal">
              <h3>Web Corporativa</h3>
              <p className="for">Presencia profesional con diseño UI/UX propio y SEO.</p>
              <div className="price-amount">
                <span className="cur">S/</span>
                <span className="val">450</span>
              </div>
              <p className="once">pago único · entrega en 5 días</p>
              <ul className="features">
                <li><CheckIcon /> Diseño UI/UX exclusivo y código propio</li>
                <li><CheckIcon /> Hasta 5 secciones personalizadas</li>
                <li><CheckIcon /> SEO on-page y optimización de carga</li>
                <li><CheckIcon /> Adaptado a móvil y tablet</li>
                <li><CheckIcon /> Integración con WhatsApp y Yape/Plin</li>
                <li className="off"><CheckIcon /> Base de datos relacional</li>
              </ul>
              <a
                className="btn btn-ghost btn-block"
                href={wspUrl('Hola Studio Zero, me interesa el plan Web Corporativa (S/450)')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Elegir Web Corporativa
              </a>
            </div>

            {/* Card 2 — Sistemas Web & Ventas (featured) */}
            <div className="price-card featured reveal d1">
              <span className="price-tag">Más elegido</span>
              <h3>Sistemas Web &amp; Ventas</h3>
              <p className="for">Para negocios con catálogo, inventario o punto de venta.</p>
              <div className="price-amount">
                <span className="cur">S/</span>
                <span className="val">850</span>
              </div>
              <p className="once">pago único · entrega en 7–10 días</p>
              <ul className="features">
                <li><CheckIcon /> Todo lo del plan Web Corporativa</li>
                <li><CheckIcon /> Base de datos relacional (SQL Server)</li>
                <li><CheckIcon /> Catálogo dinámico de productos</li>
                <li><CheckIcon /> Seguridad anti inyecciones SQL</li>
                <li><CheckIcon /> Panel de administración básico</li>
                <li><CheckIcon /> 1 mes de soporte técnico incluido</li>
              </ul>
              <a
                className="btn btn-primary btn-block"
                href={wspUrl('Hola Studio Zero, me interesa el plan Sistemas Web & Ventas (S/850)')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Elegir Sistemas Web
              </a>
            </div>

            {/* Card 3 — Software a Medida */}
            <div className="price-card reveal d2">
              <h3>Software a Medida</h3>
              <p className="for">Apps móviles, backend Java, APIs y webhooks.</p>
              <div className="price-amount">
                <span className="cur">S/</span>
                <span className="val">1500</span>
                <span className="cur" style={{ marginLeft: '2px' }}>+</span>
              </div>
              <p className="once">según alcance · entrega de 15 a 30 días</p>
              <ul className="features">
                <li><CheckIcon /> Aplicaciones móviles (APK funcional)</li>
                <li><CheckIcon /> Backend en Java con SQL Server</li>
                <li><CheckIcon /> APIs REST y webhooks</li>
                <li><CheckIcon /> Arquitectura escalable y segura</li>
                <li><CheckIcon /> Documentación técnica del proyecto</li>
                <li><CheckIcon /> Soporte y mantenimiento extendido</li>
              </ul>
              <a
                className="btn btn-ghost btn-block"
                href={wspUrl('Hola Studio Zero, me interesa el plan Software a Medida (desde S/1500)')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Elegir Software a Medida
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="section section--elevated">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Comparativa</span>
            <h2 className="section-title">Todo lo que incluye cada plan.</h2>
          </div>
          <div className="table-wrap reveal">
            <table className="ptable">
              <thead>
                <tr>
                  <th>Característica</th>
                  <th>Web Corporativa<small>S/ 450</small></th>
                  <th className="feat-col">Sistemas Web &amp; Ventas<small>S/ 850</small></th>
                  <th>Software a Medida<small>S/ 1500+</small></th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.feature}</td>
                    <td className={row.web || undefined}>{row.webTxt}</td>
                    <td className={`feat-col${row.sis ? ` ${row.sis}` : ''}`}>{row.sisTxt}</td>
                    <td className={row.soft || undefined}>{row.softTxt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== ADD-ONS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Complementos</span>
            <h2 className="section-title">Suma lo que tu proyecto necesite.</h2>
            <p className="lead">Servicios opcionales que puedes agregar a cualquier plan. Te los cotizamos por separado y los apruebas antes.</p>
          </div>
          <div className="addons">
            {addons.map((addon, i) => (
              <div className={`addon reveal${i % 2 !== 0 ? ' d1' : ''}`} key={i}>
                <div>
                  <h4>{addon.title}</h4>
                  <p>{addon.desc}</p>
                </div>
                <div className="price">{addon.price}<small>{addon.unit}</small></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ESTIMATOR ===== */}
      <section className="section section--elevated">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Estimador</span>
            <h2 className="section-title">Calcula tu inversión en 30 segundos.</h2>
            <p className="lead">Arma tu cotización y envíala lista por WhatsApp.</p>
          </div>

          <div className="estimator reveal" id="estimador">
            {/* Step 1 — Business type */}
            <div className="est-step">
              <label>1 · ¿Qué tipo de negocio tienes?</label>
              <div className="est-options">
                {rubros.map((r) => (
                  <button
                    key={r.value}
                    className={`est-opt${rubro === r.value ? ' active' : ''}`}
                    onClick={() => setRubro(r.value)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 — Plan selection */}
            <div className="est-step">
              <label>2 · Elige tu plan</label>
              <div className="est-pkgs">
                {planes.map((p) => (
                  <button
                    key={p.name}
                    className={`est-pkg${plan?.name === p.name ? ' active' : ''}`}
                    onClick={() => setPlan(p)}
                  >
                    <b>{p.name}</b><span>{p.display}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Result — Show CTA when both selected */}
            {estimatorMsg && (
              <div className="est-result">
                <a
                  className="btn btn-primary btn-lg"
                  href={wspUrl(estimatorMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enviar cotización por WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Dudas sobre precios</span>
            <h2 className="section-title">Preguntas frecuentes.</h2>
          </div>
          <div className="faq">
            {faqs.map((faq, i) => (
              <details key={i}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <CtaBand
        title="Empecemos <em>tu proyecto</em>."
        subtitle="Te damos una propuesta clara con precio y fecha de entrega, sin compromiso."
        primaryText="Pedir cotización"
        primaryMsg="Hola Studio Zero, quiero una cotización"
        secondaryText="Ir a contacto"
        secondaryLink="/contacto"
      />
    </div>
  );
}
