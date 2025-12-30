import { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .header-nav a {
          position: relative;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .header-nav a::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 80%;
          height: 2px;
          background: rgba(255, 255, 255, 0.8);
          transition: transform 0.3s;
        }
        .header-nav a:hover::before {
          transform: translateX(-50%) scaleX(1);
        }
        .header-nav a:hover {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }
      `}</style>
      <header 
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled 
            ? 'rgba(211, 47, 47, 0.95)' 
            : 'linear-gradient(110deg, #d32f2f 0%, #c62828 40%, #b71c1c 100%)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          color: '#fff', 
          padding: '1.5rem 0', 
          borderBottom: 'none',
          boxShadow: scrolled 
            ? '0 8px 32px rgba(211, 47, 47, 0.3)' 
            : '0 4px 16px rgba(211, 47, 47, 0.2)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'white',
              boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.1)',
              fontFamily: "'Poppins', sans-serif",
              transition: 'all 0.3s'
            }}>A</div>
          </div>
          <nav className="header-nav" style={{ display: 'flex', gap: '0.5rem' }}>
            <a href="#inicio" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Inicio</a>
            <a href="#about" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>¿Quiénes somos?</a>
            <a href="#portfolio" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Portafolio</a>
            <a href="#contact" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Contacto</a>
          </nav>
        </div>
      </header>
      <div style={{ height: '80px' }}></div>
    </>
  );
};

export default Header;
