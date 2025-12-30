import { useState, useEffect } from 'react';
import logoArx from '../assets/LOGO_ARX.svg';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .header-gradient {
          position: relative;
          overflow: hidden;
        }
        
        .header-gradient::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: left 0.5s;
        }
        
        .header-gradient:hover::before {
          left: 100%;
        }
        
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
        
        @media (max-width: 768px) {
          header {
            padding: 1rem 0 !important;
          }
          
          .header-logo {
            height: 48px !important;
          }
          
          .header-container {
            padding: 0 1rem !important;
          }
          
          .header-nav {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            flex-direction: column;
            background: rgba(211, 47, 47, 0.98);
            backdrop-filter: blur(12px);
            padding: 1rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            max-height: calc(100vh - 70px);
            overflow-y: auto;
          }
          
          .header-nav.menu-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }
          
          .header-nav a {
            width: 100%;
            text-align: center;
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .menu-toggle {
            display: block !important;
            z-index: 1001;
            position: relative;
          }
          
          .header-spacer {
            height: 70px !important;
          }
        }
        
        @media (max-width: 480px) {
          .header-logo {
            height: 40px !important;
          }
          
          header {
            padding: 0.75rem 0 !important;
          }
          
          .header-spacer {
            height: 60px !important;
          }
          
          .header-nav {
            top: 60px;
            max-height: calc(100vh - 60px);
          }
        }
        
        .menu-toggle {
          display: none;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s;
        }
        
        .menu-toggle:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
      <header 
        className="header-gradient"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled 
            ? 'rgba(211, 47, 47, 0.95)' 
            : 'linear-gradient(110deg, #d32f2f 0%, #c62828 40%, #b71c1c 100%)',
          backgroundSize: scrolled ? '100% 100%' : '200% 200%',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          color: '#fff', 
          padding: '1.5rem 0', 
          borderBottom: 'none',
          boxShadow: scrolled 
            ? '0 8px 32px rgba(211, 47, 47, 0.3)' 
            : '0 4px 16px rgba(211, 47, 47, 0.2)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: scrolled ? 'none' : 'gradientShift 8s ease infinite',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          if (!scrolled) {
            e.currentTarget.style.background = 'linear-gradient(110deg, #e53935 0%, #d32f2f 40%, #c62828 100%)';
            e.currentTarget.style.backgroundSize = '200% 200%';
          }
        }}
        onMouseLeave={(e) => {
          if (!scrolled) {
            e.currentTarget.style.background = 'linear-gradient(110deg, #d32f2f 0%, #c62828 40%, #b71c1c 100%)';
            e.currentTarget.style.backgroundSize = '200% 200%';
          }
        }}
      >
        <div className="header-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1001 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img 
              src={logoArx} 
              alt="ARX Software Logo" 
              className="header-logo"
              style={{
                height: '72px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
                transition: 'all 0.3s'
              }}
            />
          </div>
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            style={{ zIndex: 1002 }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
          <nav className={`header-nav ${isMenuOpen ? 'menu-open' : ''}`} style={{ display: 'flex', gap: '0.5rem' }}>
            <a href="#inicio" onClick={() => setIsMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Inicio</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>¿Quiénes somos?</a>
            <a href="#portfolio" onClick={() => setIsMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Portafolio</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Contacto</a>
          </nav>
        </div>
      </header>
      <div className="header-spacer" style={{ height: '80px' }}></div>
    </>
  );
};

export default Header;
