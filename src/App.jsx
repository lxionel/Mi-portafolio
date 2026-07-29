import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Precios from './pages/Precios';
import Portafolio from './pages/Portafolio';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';

/* Scroll to top on route change */
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppInner({ theme, toggleTheme }) {
  return (
    <>
      <ScrollReset />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/servicios"  element={<Servicios />} />
        <Route path="/precios"    element={<Precios />} />
        <Route path="/portafolio" element={<Portafolio />} />
        <Route path="/nosotros"   element={<Nosotros />} />
        <Route path="/contacto"   element={<Contacto />} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const lenisRef   = useRef(null);
  const [ready, setReady] = useState(false);

  /* Lenis smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId;
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);

    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  return (
    <BrowserRouter>
      {!ready && <Preloader onComplete={() => setReady(true)} />}
      <AppInner theme={theme} toggleTheme={toggleTheme} />
    </BrowserRouter>
  );
}
