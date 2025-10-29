import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ARXSoftware() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const team = [
    {
      id: 1,
      name: "Carlos Palacios",
      role: "Director Técnico/Developer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=JuanTech",
      bio: "Especialista en desarrollo de software y sistemas contables"
    },
    {
      id: 2,
      name: "Angy calderon",
      role: "Marketing/Documentacion",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=MariaCode",
      bio: "Experta en marketing y documentacion"
    },
    {
      id: 3,
      name: "Azalia Aparicio",
      role: "Diseñadora ui/ux y Developer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=RobertoOps",
      bio: "Especialista en diseño ui/ux y desarrollo de aplicaciones"
    }
  ];

  const projects = [
    { name: "KUMO", category: "Aplicaciones Móviles", description: "Captura de documentos desde el celular, integración con CONTPAQi Comercial", icon: "📱" },
    { name: "ZUHO Indicadores", category: "Visualización de Datos", description: "Dashboards automáticos con datos de CONTPAQi, Aspel, Microsip", icon: "📊" },
    { name: "Conversión de Datos", category: "Migración Contable", description: "Migración segura desde COI, Control 2000 a CONTPAQi Contabilidad", icon: "🔄" },
    { name: "ZUNI", category: "Web Especializada", description: "Control de ventas e inventarios para pymes", icon: "🌐" },
    { name: "LUMO", category: "Web Especializada", description: "Gestión de acarreos de materiales en construcción", icon: "🌐" },
    { name: "QRIVA", category: "Web Especializada", description: "Control de accesos a eventos con códigos QR", icon: "🌐" }
  ];

  const handleProjectClick = (name: string) => {
    navigate(`/proyecto/${encodeURIComponent(name)}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#0f172a',
      color: '#f1f5f9',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        html { scroll-behavior: smooth; margin: 0; padding: 0; }
        #root { margin: 0; padding: 0; }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-blob { animation: blob 7s infinite; }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .text-grad {
          background: linear-gradient(90deg, #ef4444, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .btn-red { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; border: none; padding: 1rem 2rem; border-radius: 0.5rem; font-weight: 700; cursor: pointer; transition: all 0.3s ease; }
        .btn-red:hover { background: linear-gradient(135deg, #b91c1c, #991b1b); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(220, 38, 38, 0.5); }
        .card-hover { border: 1px solid rgba(220, 38, 38, 0.3); border-radius: 1rem; padding: 2rem; background: rgba(51, 65, 85, 0.3); backdrop-filter: blur(12px); transition: all 0.3s ease; }
        .card-hover:hover { border-color: rgba(220, 38, 38, 0.7); box-shadow: 0 0 30px rgba(220, 38, 38, 0.3); }
        input, textarea { width: 100%; padding: 0.75rem 1rem; background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(220, 38, 38, 0.3); border-radius: 0.5rem; color: white; font-family: inherit; transition: all 0.3s; }
        input:focus, textarea:focus { outline: none; border-color: rgba(220, 38, 38, 0.7); box-shadow: 0 0 20px rgba(220, 38, 38, 0.2); }
      `}</style>

      {/* Fondo */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div className="animate-blob" style={{ position: 'absolute', top: 0, left: '-25%', width: '384px', height: '384px', backgroundColor: '#7f1d1d', borderRadius: '50%', mixBlendMode: 'multiply', filter: 'blur(128px)', opacity: 0.2 }}></div>
        <div className="animate-blob delay-2000" style={{ position: 'absolute', top: '50%', right: '-25%', width: '384px', height: '384px', backgroundColor: '#1e3a8a', borderRadius: '50%', mixBlendMode: 'multiply', filter: 'blur(128px)', opacity: 0.2 }}></div>
        <div className="animate-blob delay-4000" style={{ position: 'absolute', bottom: '-25%', left: '50%', width: '384px', height: '384px', backgroundColor: '#6b21a8', borderRadius: '50%', mixBlendMode: 'multiply', filter: 'blur(128px)', opacity: 0.2 }}></div>
      </div>

      {/* Header */}
      <header style={{
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(220, 38, 38, 0.2)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #dc2626, #991b1b)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.125rem', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)' }}>A</div>
            <span className="text-grad" style={{ fontSize: '1.5rem', fontWeight: 900 }}>ARX/SOFTWARE</span>
          </div>
          <nav style={{ display: isMenuOpen ? 'flex' : 'none', flexDirection: 'column', gap: '1rem', position: 'absolute', top: '5rem', left: 0, right: 0, backgroundColor: 'rgba(15, 23, 42, 0.95)', padding: '1rem', backdropFilter: 'blur(12px)' }}>
            {['#inicio', '#quienes', '#portafolio', '#contacto'].map((link, i) => (
              <a key={i} href={link} style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }} onClick={() => setIsMenuOpen(false)}>
                {link.substring(1).charAt(0).toUpperCase() + link.substring(2)}
              </a>
            ))}
          </nav>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: '#fca5a5', fontSize: '1.5rem', cursor: 'pointer' }} className="md-menu">
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5rem', paddingBottom: '8rem', paddingLeft: '1rem', paddingRight: '1rem', zIndex: 10 }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem', display: 'inline-block' }} className="animate-float">
            <div style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', border: '1px solid rgba(220, 38, 38, 0.5)', backgroundColor: 'rgba(220, 38, 38, 0.1)', backdropFilter: 'blur(12px)', fontSize: '0.875rem', fontWeight: 600, color: '#fca5a5' }}>
              Soluciones de Software Empresarial
            </div>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.2 }}>
            <span className="text-grad">Optimiza Tu Tiempo</span><br /><span>Potencia Tu Productividad</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#cbd5e1', marginBottom: '3rem', lineHeight: 1.6 }}>
            Diseñamos herramientas tecnológicas que transforman la manera en que trabajas. Desde aplicaciones móviles hasta plataformas web especializadas, convertimos ideas en soluciones funcionales.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <button className="btn-red">Comenzar Ahora →</button>
            <button style={{ padding: '1rem 2rem', border: '2px solid rgba(220, 38, 38, 0.6)', backgroundColor: 'transparent', color: 'white', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s' }}>Ver Portafolio</button>
          </div>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section id="about" style={{ position: 'relative', paddingTop: '6rem', paddingBottom: '6rem', paddingLeft: '1rem', paddingRight: '1rem', zIndex: 10 }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1.5rem' }}>Innovación con Propósito</h2>
            <p style={{ fontSize: '1.25rem', color: '#9ca3af' }}>Conoce al equipo que impulsa la transformación digital</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
            {[{ title: 'Desarrollo a la Medida', desc: 'Soluciones personalizadas para cada negocio' }, { title: 'Integración Contable', desc: 'CONTPAQi, Aspel, Microsip y más' }, { title: 'Automatización Total', desc: 'Productividad y experiencia de usuario' }].map((item, i) => (
              <div key={i} className="card-hover"><h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fca5a5', marginBottom: '0.5rem' }}>{item.title}</h3><p style={{ color: '#9ca3af' }}>{item.desc}</p></div>
            ))}
          </div>
          <div style={{ padding: '3rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, rgba(127, 29, 29, 0.1), rgba(30, 58, 138, 0.1))', border: '1px solid rgba(220, 38, 38, 0.3)', backdropFilter: 'blur(12px)', marginBottom: '5rem' }}>
            <p style={{ fontSize: '1.125rem', color: '#e5e7eb', lineHeight: 1.8, marginBottom: '2rem' }}>
              Somos una empresa especializada en el desarrollo de software con tecnologías modernas, enfocada en resolver necesidades reales de negocios. Nuestro equipo combina experiencia técnica con visión estratégica para crear soluciones que se adaptan a tu operación y escalan contigo.
            </p>
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, textAlign: 'center', marginBottom: '4rem' }}>Nuestro Equipo</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {team.map((member) => (
              <div key={member.id}>
                <div style={{ borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.5rem', border: '2px solid rgba(220, 38, 38, 0.3)', transition: 'all 0.3s' }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
                </div>
                <div style={{ backgroundColor: 'rgba(51, 65, 85, 0.3)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '0.75rem', padding: '1.5rem', backdropFilter: 'blur(12px)' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fca5a5', marginBottom: '0.5rem' }}>{member.name}</h3>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f87171', marginBottom: '0.75rem' }}>{member.role}</p>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portafolio */}
      <section id="portfolio" style={{ position: 'relative', paddingTop: '6rem', paddingBottom: '6rem', paddingLeft: '1rem', paddingRight: '1rem', zIndex: 10 }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1.5rem' }}>Proyectos que Impulsan Negocios</h2>
            <p style={{ fontSize: '1.25rem', color: '#9ca3af' }}>Soluciones que transforman operaciones empresariales</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
            {projects.map((project, idx) => (
              <div key={idx} className="card-hover" style={{cursor:'pointer'}} onClick={() => handleProjectClick(project.name)}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{project.icon}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fca5a5', marginBottom: '0.5rem' }}>{project.name}</h3>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(248, 113, 113, 0.7)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{project.category}</p>
                <p style={{ color: '#d1d5db', fontSize: '0.95rem', lineHeight: 1.6 }}>{project.description}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: '3rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, rgba(153, 27, 27, 0.2), rgba(127, 29, 29, 0.1))', border: '1px solid rgba(220, 38, 38, 0.4)', backdropFilter: 'blur(12px)', transition: 'all 0.3s' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#fca5a5', marginBottom: '1.5rem' }}>Servicio Destacado: Migración Contable Segura</h3>
            <p style={{ fontSize: '1.125rem', color: '#e5e7eb', marginBottom: '2rem', lineHeight: 1.8 }}>Migrar a CONTPAQi no tiene que ser complicado. Nuestro servicio de conversión de pólizas y cuentas contables garantiza una migración rápida, segura y sin complicaciones desde otros sistemas contables.</p>
            <button className="btn-red">Conocer Más</button>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" style={{ position: 'relative', paddingTop: '6rem', paddingBottom: '6rem', paddingLeft: '1rem', paddingRight: '1rem', zIndex: 10 }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1.5rem' }}>Listo para Transformar</h2>
            <p style={{ fontSize: '1.25rem', color: '#9ca3af' }}>Cuéntanos sobre tu proyecto</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div className="card-hover"><h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>Email</h3><p style={{ color: '#9ca3af' }}>contacto@arxsoftware.com</p></div>
            <div className="card-hover"><h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>Teléfono</h3><p style={{ color: '#9ca3af' }}>+52 961 XXX XXXX</p></div>
          </div>
          <div className="card-hover" style={{ marginBottom: '2rem' }}><h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>Ubicación</h3><p style={{ color: '#9ca3af' }}>Tuxtla Gutiérrez, Chiapas, México</p></div>
          <div style={{ padding: '2rem', borderRadius: '1rem', backgroundColor: 'rgba(51, 65, 85, 0.3)', border: '1px solid rgba(220, 38, 38, 0.3)', backdropFilter: 'blur(12px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <input type="text" name="name" placeholder="Tu nombre" value={formData.name} onChange={handleInputChange} />
              <input type="email" name="email" placeholder="Tu correo" value={formData.email} onChange={handleInputChange} />
            </div>
            <input type="text" name="subject" placeholder="Asunto" value={formData.subject} onChange={handleInputChange} style={{ marginBottom: '1rem' }} />
            <textarea name="message" placeholder="Cuéntanos sobre tu proyecto" rows={6} value={formData.message} onChange={handleInputChange} style={{ marginBottom: '1rem' }}></textarea>
            <button className="btn-red" onClick={handleSubmit} style={{ width: '100%' }}>{submitted ? 'Mensaje Enviado Correctamente' : 'Enviar Mensaje'}</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(220, 38, 38, 0.2)', paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '1rem', paddingRight: '1rem', backgroundColor: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(12px)', textAlign: 'center' }}>
        <p style={{ fontWeight: 600, fontSize: '1.125rem' }}>© 2024 ARX/SOFTWARE</p>
        <p style={{ color: '#9ca3af', marginTop: '0.5rem', fontSize: '0.875rem' }}>Soluciones de Software Empresarial - Tuxtla Gutiérrez, Chiapas</p>
      </footer>
    </div>
  );
}