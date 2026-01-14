import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import { emailConfig } from '../config/emailConfig';
import carlosImage from '../assets/carlos.jpeg';
import angyImage from '../assets/Angy.jpeg';
import ivonneImage from '../assets/ivonne.jpeg';
import azaliaImage from '../assets/azalia.jpeg';
import kumoImage from '../assets/kumo.png';
import zuhImage from '../assets/zuni.png';
import ordenaAquiImage from '../assets/ordena.png';
import lumoImage from '../assets/lumo.png';
import zuhoImage from '../assets/zuho.png';

export default function ARXSoftware() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const recaptchaRef = useRef<any>(null);


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
      name: "Ángela Monzón",
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
    { name: "KUMO", category: "Gestión Documental", description: "Sistema móvil para captura de documentos desde celular, integrado con CONTPAQi Comercial. Caso real: ordena la documentación de ventas en campo.", img : kumoImage },
    { name: "ZUHO Indicadores", category: "Gestión de Datos", description: "Dashboards automáticos que organizan información de CONTPAQi, Aspel y Microsip. Caso real: visualización clara de indicadores empresariales.", img : zuhoImage },
    { name: "Conversión de Datos", category: "Gestión Contable", description: "Migración segura desde COI y Control 2000 a CONTPAQi. Caso real: ordena y traslada datos contables sin pérdida de información.", icon: "🔄" },
    { name: "ZUNI", category: "Gestión de Inventarios", description: "Sistema web para control de ventas e inventarios en pymes. Caso real: ordena operaciones de almacén y ventas.", img: zuhImage },
    { name: "LUMO", category: "Gestión de Operaciones", description: "Sistema para gestión de acarreos de materiales en construcción. Caso real: organiza el flujo de materiales en obra.", img : lumoImage },
    { name: "OrdenAquí", category: "Gestión de Restaurantes", description: "App de comanda rápida para restaurantes pequeños. Crea mesas, registra platillos y toma pedidos en segundos. Funciona sin internet. Caso real: agiliza el servicio en restaurantes pequeños.", img: ordenaAquiImage },
    
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
        body { margin: 0; padding: 0; font-family: 'Poppins', sans-serif; background: #f5f5f5; }
        html { scroll-behavior: smooth; margin: 0; padding: 0; }
        #root { margin: 0; padding: 0; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Poppins', sans-serif; font-weight: 800; }
        
        /* Animaciones */
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-20px); } 
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
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
        
        .hero-gradient {
          position: relative;
          overflow: hidden;
        }
        
        .hero-gradient::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          transition: left 0.6s ease;
          z-index: 1;
          pointer-events: none;
        }
        
        .hero-gradient:hover::before {
          left: 100%;
        }
        
        .animate-blob { animation: blob 7s infinite; }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        
        .text-grad {
          background: linear-gradient(90deg, #d32f2f, #b71c1c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Neumorfismo para botones */
        .btn-red { 
          background: linear-gradient(145deg, #d32f2f, #b71c1c);
          color: white; 
          border: none; 
          padding: 1rem 2.5rem; 
          border-radius: 20px; 
          font-weight: 600; 
          cursor: pointer; 
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
          font-size: 1.05rem; 
          box-shadow: 
            8px 8px 16px rgba(211, 47, 47, 0.3),
            -8px -8px 16px rgba(255, 255, 255, 0.1),
            inset 0 2px 4px rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }
        .btn-red::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }
        .btn-red:hover::before {
          left: 100%;
        }
        .btn-red:hover { 
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            12px 12px 24px rgba(211, 47, 47, 0.4),
            -12px -12px 24px rgba(255, 255, 255, 0.1),
            inset 0 2px 4px rgba(255, 255, 255, 0.3);
        }
        .btn-red:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 
            4px 4px 8px rgba(211, 47, 47, 0.3),
            -4px -4px 8px rgba(255, 255, 255, 0.1),
            inset 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        /* Neumorfismo para tarjetas */
        .card-hover { 
          border: none;
          border-radius: 20px; 
          padding: 2rem; 
          background: #ffffff;
          box-shadow: 
            12px 12px 24px rgba(0, 0, 0, 0.15),
            -12px -12px 24px rgba(255, 255, 255, 0.9);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: visible;
        }
        .card-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #d32f2f, #b71c1c);
          transform: scaleX(0);
          transition: transform 0.4s;
        }
        .card-hover:hover::before {
          transform: scaleX(1);
        }
        .card-hover:hover { 
          transform: translateY(-8px) scale(1.02);
          box-shadow: 
            16px 16px 32px rgba(0, 0, 0, 0.2),
            -16px -16px 32px rgba(255, 255, 255, 1);
        }
        
        /* Neumorfismo para inputs */
        input, textarea { 
          width: 100%; 
          padding: 0.75rem 1rem; 
          background: #f5f5f5; 
          border: none; 
          border-radius: 12px; 
          color: #2a2a2a; 
          font-family: inherit; 
          transition: all 0.3s;
          box-shadow: 
            inset 4px 4px 8px rgba(0, 0, 0, 0.1),
            inset -4px -4px 8px rgba(255, 255, 255, 0.8);
        }
        input:focus, textarea:focus { 
          outline: none; 
          box-shadow: 
            inset 6px 6px 12px rgba(0, 0, 0, 0.1),
            inset -6px -6px 12px rgba(255, 255, 255, 0.9),
            0 0 0 3px rgba(211, 47, 47, 0.2);
        }
        
        /* Responsive para móvil */
        @media (max-width: 768px) {
          .btn-red {
            padding: 0.875rem 2rem;
            font-size: 0.95rem;
            width: 100%;
            max-width: 300px;
          }
          
          .card-hover {
            padding: 1.5rem;
            border-radius: 16px;
          }
          
          h1 {
            font-size: clamp(1.75rem, 8vw, 2.5rem) !important;
          }
          
          h2 {
            font-size: clamp(1.5rem, 6vw, 2rem) !important;
          }
          
          h3 {
            font-size: clamp(1.25rem, 5vw, 1.75rem) !important;
          }
          
          section {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
          }
          
          /* Grids responsivos - 1 columna en móvil */
          [style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          
          /* Ajustes de padding en cards */
          [style*="padding: '3rem'"] {
            padding: 1.5rem !important;
          }
          
          [style*="padding: '2rem'"] {
            padding: 1.25rem !important;
          }
          
          /* Cards del equipo más compactas en móvil */
          .team-card-img {
            height: 200px !important;
            padding: 0.75rem !important;
          }
          
          .team-card {
            padding: 1.5rem !important;
          }
          
          .team-card h3 {
            font-size: 1.25rem !important;
          }
          
          .team-card p {
            font-size: 0.875rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .btn-red {
            padding: 0.75rem 1.5rem;
            font-size: 0.9rem;
          }
          
          .card-hover {
            padding: 1.25rem;
          }
          
          section {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }
          
          h1 {
            font-size: clamp(1.5rem, 7vw, 2rem) !important;
            margin-bottom: 1rem !important;
          }
          
          h2 {
            font-size: clamp(1.25rem, 6vw, 1.75rem) !important;
            margin-bottom: 1rem !important;
          }
          
          h3 {
            font-size: clamp(1.1rem, 5vw, 1.5rem) !important;
          }
        }
      `}</style>

      {/* Fondo decorativo sutil */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div className="animate-blob" style={{ position: 'absolute', top: 0, left: '-25%', width: '384px', height: '384px', backgroundColor: '#ffebee', borderRadius: '50%', mixBlendMode: 'multiply', filter: 'blur(128px)', opacity: 0.3 }}></div>
        <div className="animate-blob delay-2000" style={{ position: 'absolute', top: '50%', right: '-25%', width: '384px', height: '384px', backgroundColor: '#fce4ec', borderRadius: '50%', mixBlendMode: 'multiply', filter: 'blur(128px)', opacity: 0.25 }}></div>
        <div className="animate-blob delay-4000" style={{ position: 'absolute', bottom: '-25%', left: '50%', width: '384px', height: '384px', backgroundColor: '#fff3e0', borderRadius: '50%', mixBlendMode: 'multiply', filter: 'blur(128px)', opacity: 0.2 }}></div>
      </div>

      {/* Hero */}
      <section 
        id="inicio" 
        className="hero-gradient"
        style={{ 
          position: 'relative', 
          minHeight: 'clamp(50vh, 65vh, 70vh)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          paddingTop: 'clamp(6rem, 8vw, 8rem)', 
          paddingBottom: 'clamp(4rem, 6vw, 6rem)', 
          paddingLeft: '1rem', 
          paddingRight: '1rem', 
          zIndex: 10, 
          background: 'linear-gradient(110deg, #d32f2f 0%, #c62828 40%, #b71c1c 100%)',
          backgroundSize: '200% 200%',
          overflow: 'hidden',
          animation: 'gradientShift 8s ease infinite',
          transition: 'all 0.4s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(110deg, #e53935 0%, #d32f2f 40%, #c62828 100%)';
          e.currentTarget.style.backgroundSize = '200% 200%';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(110deg, #d32f2f 0%, #c62828 40%, #b71c1c 100%)';
          e.currentTarget.style.backgroundSize = '200% 200%';
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.2)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)', zIndex: 1 }}></div>
        <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }} className="fade-in-up">
          <div style={{ marginBottom: '2rem', display: 'inline-block' }} className="animate-float">
            <div style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', border: '1px solid rgba(255, 255, 255, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(12px)', fontSize: '0.875rem', fontWeight: 600, color: '#ffffff' }}>
              Software de Gestión Empresarial
            </div>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2, color: '#ffffff', fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: '-0.02em', textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            Desarrollamos e implementamos soluciones de sistemas digitales
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', color: 'rgba(255, 255, 255, 0.95)', marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto', padding: '0 1rem' }}>
            Creamos herramientas que agilicen procesos, optimicen costos y tiepos de ejecución.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', width: '100%', padding: '0 1rem' }}>
            <button className="btn-red" style={{ width: '100%', maxWidth: '300px' }}>Comenzar Ahora →</button>
            <button style={{ padding: '1rem 2rem', border: '2px solid rgba(255, 255, 255, 0.8)', backgroundColor: 'transparent', color: 'white', borderRadius: '30px', fontSize: 'clamp(0.9rem, 3vw, 1rem)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', width: '100%', maxWidth: '300px' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>Ver Portafolio</button>
          </div>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section 
        id="about" 
        style={{ position: 'relative', paddingTop: '6rem', paddingBottom: '8rem', paddingLeft: '1rem', paddingRight: '1rem', zIndex: 10, backgroundColor: '#f8f8f8' }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '1.5rem', color: '#1a1a1a', fontFamily: "'Georgia', 'Times New Roman', serif" }}>Innovación con Propósito</h2>
            <p style={{ fontSize: '1.25rem', color: '#555555' }}>Conoce al equipo que impulsa la transformación digital</p>
          </div>
          
          {/* Mensaje principal del jefe */}
          <div style={{ padding: '3rem', borderRadius: '20px', background: '#f5f5f5', marginBottom: '4rem', maxWidth: '64rem', marginLeft: 'auto', marginRight: 'auto', boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)', border: 'none', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #d32f2f, #b71c1c)' }}></div>
            <p style={{ fontSize: '1.15rem', color: '#2a2a2a', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic', textAlign: 'center' }}>
              Cuando hay orden, todo fluye: personas, datos y herramientas.
            </p>
            <div style={{ borderTop: '1px solid rgba(211, 47, 47, 0.2)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
              <p style={{ fontSize: '1.1rem', color: '#2a2a2a', lineHeight: 1.8, marginBottom: '1rem', textAlign: 'center' }}>
                Las empresas exitosas requieren más que esfuerzo.<br />
                Necesitan herramientas que los respalden.
              </p>
              <p style={{ fontSize: '1.3rem', color: '#d32f2f', fontWeight: 600, lineHeight: 1.6, textAlign: 'center' }}>
                Nuestro trabajo es facilitarte el tuyo.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
            {[{ title: 'Software de Gestión', desc: 'Especializados en sistemas que agilizan procesos operativos' }, { title: 'Automatización de Procesos', desc: 'Sistemas que ordenan datos y operaciones' }].map((item, i) => (
              <div key={i} className="card-hover" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(180deg, #d32f2f, #b71c1c)', borderRadius: '20px 0 0 20px' }}></div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.8rem' }}>{item.title}</h3>
                <p style={{ color: '#555555', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          

          {/* Nuestro Equipo */}
          <h3 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.4rem)', fontWeight: 600, textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 4rem)', color: '#1a1a1a', fontFamily: "'Georgia', 'Times New Roman', serif" }}>Nuestro Equipo</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
            {team.map((member) => (
              <div key={member.id} className="fade-in-up card-hover team-card" style={{ 
                animationDelay: `${member.id * 0.1}s`, 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                padding: 'clamp(1.25rem, 3vw, 2rem)',
                background: '#ffffff',
                boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.15), -12px -12px 24px rgba(255, 255, 255, 0.9)',
                position: 'relative',
                zIndex: 1,
                borderRadius: '20px'
              }}>
                <div className="team-card-img" style={{ 
                  borderRadius: '20px', 
                  overflow: 'hidden', 
                  marginBottom: '1.5rem', 
                  boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)', 
                  transition: 'all 0.4s', 
                  border: 'none', 
                  background: '#f8f8f8', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: 'clamp(200px, 25vw, 280px)', 
                  padding: 'clamp(0.75rem, 2vw, 1rem)',
                  position: 'relative'
                }}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      display: 'block', 
                      borderRadius: '16px' 
                    }} 
                  />
                </div>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  flex: 1
                }}>
                  <h3 style={{ fontSize: 'clamp(1.15rem, 3vw, 1.5rem)', fontWeight: 600, color: '#d32f2f', marginBottom: '0.5rem', lineHeight: 1.3 }}>{member.name}</h3>
                  <p style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', fontWeight: 600, color: '#b71c1c', marginBottom: '0.75rem', lineHeight: 1.4 }}>{member.role}</p>
                  <p style={{ color: '#555555', fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)', lineHeight: 1.6, flex: 1 }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portafolio */}
      <section 
        id="portfolio" 
        style={{ position: 'relative', paddingTop: '8rem', paddingBottom: '10rem', paddingLeft: '1rem', paddingRight: '1rem', zIndex: 10, backgroundColor: '#f8f8f8' }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '1.5rem', color: '#d32f2f', fontFamily: "'Georgia', 'Times New Roman', serif" }}>Portafolio de sistemas digitales</h2>
            <p style={{ fontSize: '1.25rem', color: '#555555' }}>Sistemas desarrollados para impulsar a las empresas</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '8rem' }}>
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="card-hover fade-in-up" 
                style={{
                  cursor:'pointer', 
                  position: 'relative', 
                  animationDelay: `${idx * 0.1}s`, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%', 
                  minHeight: '380px',
                  background: '#ffffff',
                  boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.15), -12px -12px 24px rgba(255, 255, 255, 0.9)',
                  zIndex: 1
                }} 
                onClick={() => handleProjectClick(project.name)}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(180deg, #d32f2f, #b71c1c)', borderRadius: '20px 0 0 20px', zIndex: 2 }}></div>
                {project.img ? (
                  <div style={{ 
                    marginBottom: '1.5rem', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '160px', 
                    maxHeight: '180px', 
                    background: '#f8f8f8', 
                    borderRadius: '12px', 
                    padding: '1.5rem',
                    boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.05), inset -4px -4px 8px rgba(255, 255, 255, 0.8)'
                  }}>
                    <img 
                      src={project.img} 
                      alt={project.name} 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '160px', 
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        display: 'block'
                      }} 
                    />
                  </div>
                ) : (
                  <div style={{ 
                    fontSize: '3rem', 
                    marginBottom: '1rem', 
                    textAlign: 'center', 
                    minHeight: '140px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: '#f8f8f8',
                    borderRadius: '12px',
                    padding: '1rem'
                  }}>
                    {project.icon}
                  </div>
                )}
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.5rem' }}>{project.name}</h3>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d32f2f', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{project.category}</p>
                <p style={{ color: '#555555', fontSize: '0.95rem', lineHeight: 1.65, flex: 1 }}>{project.description}</p>
              </div>
            ))}
          </div>
          <div className="card-hover" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 600, color: '#d32f2f', marginBottom: '1.5rem', fontFamily: "'Georgia', 'Times New Roman', serif" }}>Especialización en Software de Gestión</h3>
            <p style={{ fontSize: '1.125rem', color: '#2a2a2a', marginBottom: '2rem', lineHeight: 1.8 }}>Cada sistema que desarrollamos esta pensado para resolver las necesidades operativas especificas de cada empresa.</p>
       
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" style={{ position: 'relative', paddingTop: '10rem', paddingBottom: '6rem', paddingLeft: '1rem', paddingRight: '1rem', zIndex: 10, backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, marginBottom: '1.5rem', color: '#1a1a1a', fontFamily: "'Georgia', 'Times New Roman', serif" }}>Listo para Transformar</h2>
            <p style={{ fontSize: '1.25rem', color: '#555555' }}>Cuéntanos sobre tu proyecto</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div className="card-hover" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(180deg, #d32f2f, #b71c1c)', borderRadius: '20px 0 0 20px' }}></div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>Email</h3>
              <p style={{ color: '#555555' }}>carlos.palacios@arxsoftware.cloud</p>
            </div>
            <div className="card-hover" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(180deg, #d32f2f, #b71c1c)', borderRadius: '20px 0 0 20px' }}></div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>Teléfono</h3>
              <p style={{ color: '#555555' }}>961 255 7183</p>
            </div>
          </div>
          <div className="card-hover" style={{ marginBottom: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(180deg, #d32f2f, #b71c1c)', borderRadius: '20px 0 0 20px' }}></div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>Ubicación</h3>
            <p style={{ color: '#555555' }}>Tuxtla Gutiérrez, Chiapas, México</p>
          </div>
          <div className="card-hover" style={{ padding: '2rem' }}>
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
            {emailConfig.recaptcha.siteKey ? (
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={emailConfig.recaptcha.siteKey}
                  theme="light"
                />
              </div>
            ) : (
              <div style={{ 
                marginBottom: '1rem', 
                padding: '1rem', 
                backgroundColor: '#fff3cd', 
                border: '1px solid #ffc107', 
                borderRadius: '8px', 
                color: '#856404',
                textAlign: 'center',
                fontSize: '0.9rem'
              }}>
                ⚠️ reCAPTCHA no configurado. Por favor configura VITE_RECAPTCHA_SITE_KEY
              </div>
            )}
            
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
      <footer style={{ borderTop: 'none', paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '1rem', paddingRight: '1rem', background: 'linear-gradient(110deg, #d32f2f 0%, #c62828 40%, #b71c1c 100%)', textAlign: 'center', boxShadow: '0 -8px 32px rgba(211, 47, 47, 0.2)' }}>
        <p style={{ fontWeight: 600, fontSize: '1.125rem', color: '#ffffff' }}>© 2024 ARX/SOFTWARE</p>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginTop: '0.5rem', fontSize: '0.875rem' }}>Tuxtla Gutiérrez, Chiapas</p>
      </footer>
    </div>
  );
}