import React from 'react';

const Header = () => (
  <header style={{ background: '#891D1A', color: '#fff', padding: '1.5rem 0', borderBottom: '5px solid #210706', boxShadow: '0 2px 6px #891D1A12' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Aquí puedes poner un logo SVG si lo tienes */}
        <span aria-label="ARX LOGO" style={{ fontWeight: 900, fontSize: 30, letterSpacing: '2px' }}>
          ARX/<span style={{ color: '#F1E6D2' }}>SOFTWARE</span>
        </span>
      </div>
      <nav>
        <a href="#portfolio" style={{ color: '#fff', margin: '0 16px', textDecoration: 'none', fontWeight: 500 }}>Portafolio</a>
        <a href="#about" style={{ color: '#fff', margin: '0 16px', textDecoration: 'none', fontWeight: 500 }}>¿Quiénes somos?</a>
        <a href="#contact" style={{ color: '#fff', margin: '0 16px', textDecoration: 'none', fontWeight: 500}}>Contacto</a>
      </nav>
    </div>
  </header>
);

export default Header;
