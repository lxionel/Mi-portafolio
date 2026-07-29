import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wspUrl } from '../utils/whatsapp';
import { useGsap, setupPageAnimations } from '../hooks/useGsap';

export default function Contacto() {
  const [nombre, setNombre] = useState('');
  const [negocio, setNegocio] = useState('');
  const [servicio, setServicio] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cuando, setCuando] = useState('');

  useEffect(() => {
    document.title = 'Contacto — Studio Zero | Hablemos de tu proyecto';
    window.scrollTo(0, 0);
  }, []);

  const scope = useGsap((gsap, ScrollTrigger) => {
    setupPageAnimations(gsap, ScrollTrigger);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      `Hola Studio Zero, soy ${nombre}.`,
      negocio ? `Mi negocio: ${negocio}.` : '',
      servicio ? `Me interesa: ${servicio}.` : '',
      mensaje ? `\nDetalle: ${mensaje}` : '',
      cuando ? `\nPreferencia de contacto: ${cuando}.` : '',
    ].filter(Boolean).join('\n');

    window.open(wspUrl(lines), '_blank', 'noopener,noreferrer');
  };

  const chips = [
    { label: 'Mañana', value: 'En la mañana' },
    { label: 'Tarde', value: 'En la tarde' },
    { label: 'Noche', value: 'En la noche' },
    { label: 'Cuando puedan', value: 'Cuando puedan' },
  ];

  return (
    <div ref={scope}>
      {/* ===== PAGE HEADER ===== */}
      <section className="pagehead">
        <div className="container">
          <p className="crumbs"><Link to="/">Inicio</Link> / Contacto</p>
          <h1>Hablemos de tu proyecto.</h1>
          <p>Elige el medio que prefieras. Respondemos el mismo día, sin compromiso.</p>
        </div>
      </section>

      {/* ===== CONTACT GRID ===== */}
      <section className="section bg-soft">
        <div className="container contact-grid">

          {/* ---- Left: Channels ---- */}
          <div>
            <span className="eyebrow">Medios directos</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)' }}>
              Como te resulte más cómodo.
            </h2>
            <div className="contact-channels">
              {/* WhatsApp */}
              <a
                className="channel"
                href={wspUrl('Hola Studio Zero, quiero información sobre un proyecto')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="channel-ico ico-wsp">
                  <svg viewBox="0 0 32 32">
                    <path d="M16 3C9.4 3 4 8.4 4 15c0 2.6.8 5 2.3 7L4 29l7.2-2.2c1.9 1 4 1.6 6.2 1.6 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.2 1.3 1.3-4.1-.3-.4C5.7 18.2 5.1 16.6 5.1 15 5.1 9 10 4.1 16 4.1S26.9 9 26.9 15 22 24.8 16 24.8zm6-7.4c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6-.1-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.6h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.2.2 2.3 3.5 5.5 4.9.8.3 1.4.5 1.9.7.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
                  </svg>
                </span>
                <div>
                  <b>WhatsApp</b><span className="val">952 102 805</span>
                  <br />
                  <span className="hint">Respuesta en minutos</span>
                </div>
              </a>

              {/* Llamada */}
              <a className="channel" href="tel:+51952102805">
                <span className="channel-ico ico-call">
                  <svg viewBox="0 0 24 24">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/>
                  </svg>
                </span>
                <div>
                  <b>Llamada</b><span className="val">952 102 805</span>
                  <br />
                  <span className="hint">Lun a Sáb · 9am — 8pm</span>
                </div>
              </a>

              {/* Correo */}
              <a className="channel" href="mailto:lioneldavora1@gmail.com">
                <span className="channel-ico ico-mail">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 6h16c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2zm0 2v.4l8 5 8-5V8H4zm0 2.3V16h16v-5.7l-8 5-8-5z"/>
                  </svg>
                </span>
                <div>
                  <b>Correo</b><span className="val">lioneldavora1@gmail.com</span>
                  <br />
                  <span className="hint">Para propuestas formales</span>
                </div>
              </a>
            </div>
          </div>

          {/* ---- Right: Form ---- */}
          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="cfNombre">Tu nombre</label>
              <input
                type="text"
                id="cfNombre"
                placeholder="Ej. Juan Pérez"
                autoComplete="name"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="cfNegocio">Tu negocio</label>
                <input
                  type="text"
                  id="cfNegocio"
                  placeholder="Ej. Bazar Central"
                  value={negocio}
                  onChange={(e) => setNegocio(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="cfServicio">¿Qué te interesa?</label>
                <select
                  id="cfServicio"
                  value={servicio}
                  onChange={(e) => setServicio(e.target.value)}
                >
                  <option value="">Elige una opción</option>
                  <option>Sitio web de negocio</option>
                  <option>Carta digital con QR</option>
                  <option>Catálogo con pedidos</option>
                  <option>Reservas y citas</option>
                  <option>Landing de campaña</option>
                  <option>Aún no estoy seguro</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="cfMsg">Cuéntanos un poco más</label>
              <textarea
                id="cfMsg"
                placeholder="Describe tu negocio y qué te gustaría lograr."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />
            </div>
            <div className="field">
              <label>¿Cuándo prefieres que te contactemos?</label>
              <div className="chip-row">
                {chips.map((chip) => (
                  <button
                    key={chip.value}
                    type="button"
                    className={`chip${cuando === chip.value ? ' active' : ''}`}
                    onClick={() => setCuando(cuando === chip.value ? '' : chip.value)}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Enviar por WhatsApp
            </button>
            <p className="form-note">
              Se abrirá WhatsApp con tu mensaje ya redactado. Tú decides si lo envías.
            </p>
          </form>

        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section section--elevated">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Antes de escribir</span>
            <h2 className="section-title">Preguntas frecuentes.</h2>
          </div>
          <div className="faq">
            <details>
              <summary>¿En cuánto tiempo responden?</summary>
              <p>El mismo día, dentro del horario de atención (Lun a Sáb, 9am a 8pm). Por WhatsApp normalmente en minutos.</p>
            </details>
            <details>
              <summary>¿Atienden fuera de Chimbote?</summary>
              <p>Sí. Trabajamos presencialmente en Chimbote y Nuevo Chimbote, y a distancia para todo el Perú.</p>
            </details>
            <details>
              <summary>¿Tiene costo cotizar?</summary>
              <p>No. La cotización y la asesoría inicial son gratuitas y sin compromiso.</p>
            </details>
            <details>
              <summary>¿Qué información debo tener lista?</summary>
              <p>El nombre de tu negocio, qué ofreces y, si tienes, tu logo y fotos. Si te falta algo, te orientamos.</p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
