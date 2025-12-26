

const Footer = () => (
  <footer style={{ background: '#210706', color: '#F1E6D2', padding: '2rem 0', textAlign: 'center', marginTop: '3rem', fontSize: 18 }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', lineHeight: 1.7 }}>
      <strong style={{fontWeight:900, fontSize:24}}>¿Listo para transformar tu operación?</strong><br />
      Correo: <a href="mailto:contacto@arxsoftware.com" style={{color:'#F1E6D2', textDecoration: 'underline'}}>carlos.palacios@arxsoftware.cloud</a> | 
      Tel: <a href="tel:+52961XXXXXXX" style={{color:'#F1E6D2', textDecoration: 'underline'}}>+52 961 255 7183</a> <br/>
      Ubicación: Tuxtla Gutiérrez, Chiapas, México<br /><br />
      <span style={{color:'#5E657B'}}>© {new Date().getFullYear()} ARX/SOFTWARE — Todos los derechos reservados.</span>
    </div>
  </footer>
);

export default Footer;
