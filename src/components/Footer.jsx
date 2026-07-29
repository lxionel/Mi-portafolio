import { Link } from 'react-router-dom';
import { wspUrl } from '../utils/whatsapp';

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden="true"></div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="logo" to="/">
            <img className="logo-mark" src={publicAsset('/img/logo.svg')} alt="" />
            <span className="logo-text">Studio<span>Zero</span></span>
          </Link>
          <p>Estudio de diseño y desarrollo web para negocios de Chimbote, Nuevo Chimbote y todo el Perú.</p>
        </div>
        <div className="footer-col">
          <h4>Servicios</h4>
          <Link to="/servicios">Sitios web</Link>
          <Link to="/servicios">Cartas digitales</Link>
          <Link to="/servicios">Catálogos con pedidos</Link>
          <Link to="/servicios">Reservas y citas</Link>
        </div>
        <div className="footer-col">
          <h4>Estudio</h4>
          <Link to="/precios">Precios</Link>
          <Link to="/portafolio">Portafolio</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
        <div className="footer-col">
          <h4>Contacto</h4>
          <a href="tel:+51952102805">+51 952 102 805</a>
          <a href={wspUrl('Hola Studio Zero, quiero información')} target="_blank" rel="noopener noreferrer">WhatsApp directo</a>
          <a href="mailto:lioneldavora1@gmail.com">lioneldavora1@gmail.com</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <div className="container footer-base">
        <span>© 2026 Studio Zero. Todos los derechos reservados.</span>
        <span>Diseño y desarrollo propio, sin plantillas.</span>
      </div>
    </footer>
  );
}
