
export const emailConfig = {
  // EmailJS Configuration
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  },
  
  // Google reCAPTCHA Configuration
  recaptcha: {
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '',
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

