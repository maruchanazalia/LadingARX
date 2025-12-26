import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
// @ts-ignore - react-google-recaptcha no tiene tipos oficiales
import ReCAPTCHA from 'react-google-recaptcha';
import { emailConfig } from '../config/emailConfig';
import carlosImage from '../assets/carlos.jpeg';
import angyImage from '../assets/Angy.jpeg';
import ivonneImage from '../assets/ivonne.jpeg';
import azaliaImage from '../assets/azalia.jpeg';

export default function ARXSoftware() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const recaptchaRef = useRef<any>(null);

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
      image: carlosImage,
      bio: "Especialista en desarrollo de software y sistemas contables"
    },
    {
      id: 2,
      name: "Angy calderon",
      role: "Marketing/Documentacion",
      image: angyImage,
      bio: "Experta en marketing y documentacion"
    },
    {
      id: 3,
      name: "Azalia Aparicio",
      role: "Diseñadora ui/ux y Developer",
      image: azaliaImage,
      bio: "Especialista en diseño ui/ux y desarrollo de aplicaciones"
    },
    {
      id: 4,
      name: "Ivonne Penagos",
      role: "Contadora/Recepcionista",
      image: ivonneImage,
      bio: "Experta en cotización, servicio al cliente, facturación y negociación"
    }
  ];

  const projects = [
    { name: "KUMO", category: "Gestión Documental", description: "Sistema móvil para captura de documentos desde celular, integrado con CONTPAQi Comercial. Caso real: ordena la documentación de ventas en campo.", icon: "📱" },
    { name: "ZUHO Indicadores", category: "Gestión de Datos", description: "Dashboards automáticos que organizan información de CONTPAQi, Aspel y Microsip. Caso real: visualización clara de indicadores empresariales.", icon: "📊" },
    { name: "Conversión de Datos", category: "Gestión Contable", description: "Migración segura desde COI y Control 2000 a CONTPAQi. Caso real: ordena y traslada datos contables sin pérdida de información.", icon: "🔄" },
    { name: "ZUNI", category: "Gestión de Inventarios", description: "Sistema web para control de ventas e inventarios en pymes. Caso real: ordena operaciones de almacén y ventas.", icon: "🌐" },
    { name: "LUMO", category: "Gestión de Operaciones", description: "Sistema para gestión de acarreos de materiales en construcción. Caso real: organiza el flujo de materiales en obra.", icon: "🌐" },
    { name: "QRIVA", category: "Gestión de Accesos", description: "Sistema de control de accesos a eventos con códigos QR. Caso real: ordena la entrada y registro de asistentes.", icon: "🌐" }
  ];

  const handleProjectClick = (name: string) => {
    navigate(`/proyecto/${encodeURIComponent(name)}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError('');
    
    // Validación de campos requeridos
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Por favor completa todos los campos requeridos (*)');
      return;
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }

    // Validación de reCAPTCHA
    if (!recaptchaRef.current) {
      setError('Error de configuración. Por favor recarga la página.');
      return;
    }

    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      setError('Por favor verifica que no eres un robot');
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar los parámetros del template de EmailJS
      const templateParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        subject: formData.subject.trim() || 'Contacto desde la web - ARX Software',
        message: formData.message.trim(),
        to_email: emailConfig.recipientEmail,
      };

      // Enviar email usando EmailJS
      await emailjs.send(
        emailConfig.emailjs.serviceId,
        emailConfig.emailjs.templateId,
        templateParams,
        emailConfig.emailjs.publicKey
      );

      // Éxito: limpiar formulario y mostrar mensaje
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      recaptchaRef.current.reset();
      
      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err: any) {
      console.error('Error al enviar el correo:', err);
      
      // Manejo de errores específicos
      if (err.text) {
        setError(`Error: ${err.text}`);
      } else if (err.message) {
        setError(`Error: ${err.message}`);
      } else {
        setError('Hubo un error al enviar tu mensaje. Por favor intenta de nuevo o contáctanos directamente al 961 255 7183');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#ffffff',
      color: '#2a2a2a',
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
          background: linear-gradient(90deg, #d32f2f, #b71c1c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .btn-red { background: #d32f2f; color: white; border: none; padding: 1rem 2.5rem; border-radius: 30px; font-weight: 600; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); font-size: 1.05rem; box-shadow: 0 4px 16px rgba(211, 47, 47, 0.2); }
        .btn-red:hover { background: #b71c1c; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(211, 47, 47, 0.3); }
        .card-hover { border: 1px solid rgba(211, 47, 47, 0.15); border-radius: 12px; padding: 2rem; background: #ffffff; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover { border-color: rgba(211, 47, 47, 0.4); box-shadow: 0 6px 20px rgba(211, 47, 47, 0.12); transform: translateY(-2px); }
        input, textarea { width: 100%; padding: 0.75rem 1rem; background: #ffffff; border: 1px solid rgba(211, 47, 47, 0.2); border-radius: 8px; color: #2a2a2a; font-family: inherit; transition: all 0.3s; }
        input:focus, textarea:focus { outline: none; border-color: #d32f2f; box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1); }
      `}</style>

      {/* Fondo decorativo sutil */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div className="animate-blob" style={{ position: 'absolute', top: 0, left: '-25%', width: '384px', height: '384px', backgroundColor: '#ffebee', borderRadius: '50%', mixBlendMode: 'multiply', filter: 'blur(128px)', opacity: 0.3 }}></div>
        <div className="animate-blob delay-2000" style={{ position: 'absolute', top: '50%', right: '-25%', width: '384px', height: '384px', backgroundColor: '#fce4ec', borderRadius: '50%', mixBlendMode: 'multiply', filter: 'blur(128px)', opacity: 0.25 }}></div>
        <div className="animate-blob delay-4000" style={{ position: 'absolute', bottom: '-25%', left: '50%', width: '384px', height: '384px', backgroundColor: '#fff3e0', borderRadius: '50%', mixBlendMode: 'multiply', filter: 'blur(128px)', opacity: 0.2 }}></div>
      </div>

      {/* Header */}
      <header style={{
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(211, 47, 47, 0.1)' : '1px solid rgba(211, 47, 47, 0.05)',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 2px 12px rgba(0, 0, 0, 0.05)' : 'none'
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', background: '#d32f2f', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.125rem', fontWeight: 'bold', color: 'white', boxShadow: '0 4px 12px rgba(211, 47, 47, 0.25)' }}>A</div>
            <span className="text-grad" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>ARX/SOFTWARE</span>
          </div>
          <nav style={{ display: isMenuOpen ? 'flex' : 'none', flexDirection: 'column', gap: '1rem', position: 'absolute', top: '5rem', left: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0.98)', padding: '1rem', backdropFilter: 'blur(12px)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            {['#inicio', '#quienes', '#portafolio', '#contacto'].map((link, i) => (
              <a key={i} href={link} style={{ color: '#2a2a2a', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'all 0.2s' }} onClick={() => setIsMenuOpen(false)} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(211, 47, 47, 0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                {link.substring(1).charAt(0).toUpperCase() + link.substring(2)}
              </a>
            ))}
          </nav>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: '#d32f2f', fontSize: '1.5rem', cursor: 'pointer' }} className="md-menu">
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" style={{ position: 'relative', minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5rem', paddingBottom: '6rem', paddingLeft: '1rem', paddingRight: '1rem', zIndex: 10, background: 'linear-gradient(110deg, #d32f2f 0%, #c62828 40%, #b71c1c 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.2)', zIndex: 1 }}></div>
        <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ marginBottom: '2rem', display: 'inline-block' }} className="animate-float">
            <div style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', border: '1px solid rgba(255, 255, 255, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(12px)', fontSize: '0.875rem', fontWeight: 600, color: '#ffffff' }}>
              Software de Gestión Empresarial
            </div>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2, color: '#ffffff', fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: '-0.02em', textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            Desarrollamos sistemas que ordenan empresas
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.95)', marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto' }}>
            Especializados en software de gestión. Creamos soluciones que organizan procesos, datos y operaciones para que tu empresa funcione de manera más eficiente y ordenada.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <button className="btn-red">Comenzar Ahora →</button>
            <button style={{ padding: '1rem 2rem', border: '2px solid rgba(255, 255, 255, 0.8)', backgroundColor: 'transparent', color: 'white', borderRadius: '30px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>Ver Portafolio</button>
          </div>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section id="about" style={{ position: 'relative', paddingTop: '6rem', paddingBottom: '6rem', paddingLeft: '1rem', paddingRight: '1rem', zIndex: 10, backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '1.5rem', color: '#1a1a1a', fontFamily: "'Georgia', 'Times New Roman', serif" }}>Innovación con Propósito</h2>
            <p style={{ fontSize: '1.25rem', color: '#555555' }}>Conoce al equipo que impulsa la transformación digital</p>
          </div>
          
          {/* Mensaje principal del jefe */}
          <div style={{ padding: '3rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, rgba(211, 47, 47, 0.05), rgba(183, 28, 28, 0.03))', border: '2px solid rgba(211, 47, 47, 0.2)', marginBottom: '4rem', maxWidth: '64rem', marginLeft: 'auto', marginRight: 'auto' }}>
            <p style={{ fontSize: '1.15rem', color: '#2a2a2a', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic', textAlign: 'center' }}>
              Cuando hay orden, todo fluye: personas, datos y herramientas.
            </p>
            <div style={{ borderTop: '1px solid rgba(211, 47, 47, 0.2)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
              <p style={{ fontSize: '1.1rem', color: '#2a2a2a', lineHeight: 1.8, marginBottom: '1rem', textAlign: 'center' }}>
                Las empresas no fallan por falta de esfuerzo.<br />
                Fallan por procesos confusos, información dispersa y decisiones tomadas a ciegas.
              </p>
              <p style={{ fontSize: '1.3rem', color: '#d32f2f', fontWeight: 600, lineHeight: 1.6, textAlign: 'center' }}>
                Nuestro trabajo es ayudarte a poner orden.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
            {[{ title: 'Software de Gestión', desc: 'Especializados en sistemas que organizan procesos empresariales' }, { title: 'Integración Contable', desc: 'CONTPAQi, Aspel, Microsip y más' }, { title: 'Automatización de Procesos', desc: 'Sistemas que ordenan datos y operaciones' }].map((item, i) => (
              <div key={i} className="card-hover" style={{ borderLeft: '5px solid #d32f2f' }}><h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.8rem' }}>{item.title}</h3><p style={{ color: '#555555', lineHeight: 1.65 }}>{item.desc}</p></div>
            ))}
          </div>
          <div style={{ padding: '3rem', borderRadius: '1.5rem', background: '#fafafa', border: '1px solid rgba(211, 47, 47, 0.15)', marginBottom: '5rem' }}>
            <p style={{ fontSize: '1.125rem', color: '#2a2a2a', lineHeight: 1.8, marginBottom: '2rem', textAlign: 'center', fontWeight: 600 }}>
              Especialistas en Software de Gestión
            </p>
            <p style={{ fontSize: '1.125rem', color: '#2a2a2a', lineHeight: '1.8', marginBottom: '2rem' }}>
              No hacemos de todo. Nos especializamos en desarrollar sistemas de gestión que ordenan empresas: control de inventarios, ventas, procesos operativos e integración con sistemas contables. Cada proyecto que desarrollamos resuelve problemas reales de gestión empresarial.
            </p>
          </div>
          <h3 style={{ fontSize: '2.4rem', fontWeight: 600, textAlign: 'center', marginBottom: '4rem', color: '#1a1a1a', fontFamily: "'Georgia', 'Times New Roman', serif" }}>Nuestro Equipo</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {team.map((member) => (
              <div key={member.id}>
                <div style={{ borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.5rem', border: '2px solid rgba(211, 47, 47, 0.2)', transition: 'all 0.3s', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
                </div>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(211, 47, 47, 0.15)', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#d32f2f', marginBottom: '0.5rem' }}>{member.name}</h3>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#b71c1c', marginBottom: '0.75rem' }}>{member.role}</p>
                  <p style={{ color: '#555555', fontSize: '0.95rem', lineHeight: 1.6 }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portafolio */}
      <section id="portfolio" style={{ position: 'relative', paddingTop: '6rem', paddingBottom: '6rem', paddingLeft: '1rem', paddingRight: '1rem', zIndex: 10, backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '1.5rem', color: '#d32f2f', fontFamily: "'Georgia', 'Times New Roman', serif" }}>Casos Reales de Gestión</h2>
            <p style={{ fontSize: '1.25rem', color: '#555555' }}>Sistemas que hemos desarrollado para ordenar procesos empresariales</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
            {projects.map((project, idx) => (
              <div key={idx} className="card-hover" style={{cursor:'pointer', borderLeft: '5px solid #d32f2f'}} onClick={() => handleProjectClick(project.name)}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{project.icon}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.5rem' }}>{project.name}</h3>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d32f2f', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{project.category}</p>
                <p style={{ color: '#555555', fontSize: '0.95rem', lineHeight: 1.65 }}>{project.description}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: '3rem', borderRadius: '1.5rem', background: '#ffffff', border: '1px solid rgba(211, 47, 47, 0.2)', boxShadow: '0 2px 12px rgba(211, 47, 47, 0.08)', transition: 'all 0.3s' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 600, color: '#d32f2f', marginBottom: '1.5rem', fontFamily: "'Georgia', 'Times New Roman', serif" }}>Especialización en Software de Gestión</h3>
            <p style={{ fontSize: '1.125rem', color: '#2a2a2a', marginBottom: '2rem', lineHeight: 1.8 }}>Cada sistema que desarrollamos está diseñado para ordenar procesos específicos: gestión de inventarios, control de ventas, seguimiento de operaciones y migración de datos contables. No hacemos de todo, nos especializamos en sistemas que organizan empresas.</p>
            <button className="btn-red">Ver Nuestros Casos</button>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" style={{ position: 'relative', paddingTop: '6rem', paddingBottom: '6rem', paddingLeft: '1rem', paddingRight: '1rem', zIndex: 10, backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, marginBottom: '1.5rem', color: '#1a1a1a', fontFamily: "'Georgia', 'Times New Roman', serif" }}>Listo para Transformar</h2>
            <p style={{ fontSize: '1.25rem', color: '#555555' }}>Cuéntanos sobre tu proyecto</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div className="card-hover" style={{ borderLeft: '5px solid #d32f2f' }}><h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>Email</h3><p style={{ color: '#555555' }}>carlos.palacios@arxsoftware.cloud</p></div>
            <div className="card-hover" style={{ borderLeft: '5px solid #d32f2f' }}><h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>Teléfono</h3><p style={{ color: '#555555' }}>961 255 7183</p></div>
          </div>
          <div className="card-hover" style={{ marginBottom: '2rem', borderLeft: '5px solid #d32f2f' }}><h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>Ubicación</h3><p style={{ color: '#555555' }}>Tuxtla Gutiérrez, Chiapas, México</p></div>
          <div style={{ padding: '2rem', borderRadius: '1rem', backgroundColor: '#ffffff', border: '1px solid rgba(211, 47, 47, 0.15)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
            {/* Mensaje de error */}
            {error && (
              <div style={{ 
                padding: '1rem', 
                marginBottom: '1rem', 
                backgroundColor: '#ffebee', 
                border: '1px solid #d32f2f', 
                borderRadius: '8px', 
                color: '#d32f2f',
                fontSize: '0.95rem'
              }}>
                ⚠️ {error}
              </div>
            )}
            
            {/* Mensaje de éxito */}
            {submitted && (
              <div style={{ 
                padding: '1rem', 
                marginBottom: '1rem', 
                backgroundColor: '#e8f5e9', 
                border: '1px solid #4caf50', 
                borderRadius: '8px', 
                color: '#2e7d32',
                fontSize: '0.95rem'
              }}>
                ✓ Mensaje enviado correctamente. Te responderemos pronto.
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <input 
                type="text" 
                name="name" 
                placeholder="Tu nombre *" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.6 : 1 }}
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Tu correo *" 
                value={formData.email} 
                onChange={handleInputChange} 
                required 
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.6 : 1 }}
              />
            </div>
            <input 
              type="text" 
              name="subject" 
              placeholder="Asunto" 
              value={formData.subject} 
              onChange={handleInputChange} 
              style={{ marginBottom: '1rem', opacity: isSubmitting ? 0.6 : 1 }} 
              disabled={isSubmitting}
            />
            <textarea 
              name="message" 
              placeholder="Cuéntanos sobre tu proyecto *" 
              rows={6} 
              value={formData.message} 
              onChange={handleInputChange} 
              style={{ marginBottom: '1rem', opacity: isSubmitting ? 0.6 : 1 }} 
              required 
              disabled={isSubmitting}
            ></textarea>
            
            {/* reCAPTCHA */}
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={emailConfig.recaptcha.siteKey}
                theme="light"
              />
            </div>
            
            <button 
              className="btn-red" 
              onClick={handleSubmit} 
              style={{ 
                width: '100%', 
                opacity: isSubmitting ? 0.6 : 1, 
                cursor: isSubmitting ? 'not-allowed' : 'pointer' 
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : submitted ? '✓ Mensaje Enviado' : 'Enviar Mensaje'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(211, 47, 47, 0.1)', paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '1rem', paddingRight: '1rem', backgroundColor: '#d32f2f', textAlign: 'center' }}>
        <p style={{ fontWeight: 600, fontSize: '1.125rem', color: '#ffffff' }}>© 2024 ARX/SOFTWARE</p>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginTop: '0.5rem', fontSize: '0.875rem' }}>Desarrollamos sistemas que ordenan empresas - Tuxtla Gutiérrez, Chiapas</p>
      </footer>
    </div>
  );
}