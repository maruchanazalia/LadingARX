const Footer = () => (
  <>
    <style>{`
      .footer-link {
        position: relative;
        transition: all 0.3s;
      }
      .footer-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: rgba(255, 255, 255, 0.8);
        transition: width 0.3s;
      }
      .footer-link:hover::after {
        width: 100%;
      }
      .footer-link:hover {
        color: #fff !important;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
      }
    `}</style>
    <footer style={{ 
      background: 'linear-gradient(110deg, #d32f2f 0%, #c62828 40%, #b71c1c 100%)', 
      color: '#fff', 
      padding: '3rem 0', 
      textAlign: 'center', 
      marginTop: '3rem', 
      fontSize: 18,
      boxShadow: '0 -8px 32px rgba(211, 47, 47, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }}></div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
        <strong style={{fontWeight:900, fontSize:24, display: 'block', marginBottom: '1rem', textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'}}>
          ¿Listo para transformar tu operación?
        </strong>
        <div style={{ marginBottom: '1rem' }}>
          Correo: <a href="mailto:carlos.palacios@arxsoftware.cloud" className="footer-link" style={{color:'rgba(255, 255, 255, 0.9)', textDecoration: 'none'}}>carlos.palacios@arxsoftware.cloud</a> | 
          Tel: <a href="tel:+529612557183" className="footer-link" style={{color:'rgba(255, 255, 255, 0.9)', textDecoration: 'none'}}>+52 961 255 7183</a>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          Ubicación: Tuxtla Gutiérrez, Chiapas, México
        </div>
        <span style={{color:'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem'}}>
          © {new Date().getFullYear()} ARX/SOFTWARE — Todos los derechos reservados.
        </span>
      </div>
    </footer>
  </>
);

export default Footer;
