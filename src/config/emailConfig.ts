// Configuración con valores por defecto para producción
// Si prefieres hardcodear las claves públicas aquí, puedes hacerlo (son públicas de todas formas)
const DEFAULT_RECAPTCHA_SITE_KEY = '6Ldi2DcsAAAAAAwCpzgA8bk81P4LHvE7PyMUDihQ';
const DEFAULT_EMAILJS_PUBLIC_KEY = '5HE0Yrn85GGSh4T_4';

export const emailConfig = {
  // EmailJS Configuration
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || DEFAULT_EMAILJS_PUBLIC_KEY,
  },
  
  // Google reCAPTCHA Configuration
  recaptcha: {
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || DEFAULT_RECAPTCHA_SITE_KEY,
  },
  
  // Email de destino donde recibirás los mensajes
  recipientEmail: import.meta.env.VITE_RECIPIENT_EMAIL || 'carlos.palacios@arxsoftware.cloud',
};

// Validación de variables de entorno en desarrollo
if (import.meta.env.DEV) {
  const requiredVars = [
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_TEMPLATE_ID',
    'VITE_EMAILJS_PUBLIC_KEY',
    'VITE_RECAPTCHA_SITE_KEY',
  ];
  
  const missingVars = requiredVars.filter(
    (varName) => !import.meta.env[varName]
  );
  
  if (missingVars.length > 0) {
    console.warn(
      ' Variables de entorno faltantes:',
      missingVars.join(', '),
      '\nAsegúrate de configurar el archivo .env'
    );
  }
}

