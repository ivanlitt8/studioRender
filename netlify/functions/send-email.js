// Versión CommonJS - la más compatible con Netlify Functions
const nodemailer = require('nodemailer');

// Exportación estándar para Netlify Functions
exports.handler = async function(event, context) {
  // Verificar método HTTP
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parsear el cuerpo de la solicitud
    const body = JSON.parse(event.body);
    const { name, email, projectType, message, fileUrls = [] } = body;

    // Validación básica
    if (!name || !email || !projectType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Faltan campos requeridos' })
      };
    }

    // Configurar transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: true
    });

    // Loguear las variables para debug
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER,
      passLength: process.env.SMTP_PASSWORD ? process.env.SMTP_PASSWORD.length : 0
    });

    // Enviar correo
    await transporter.sendMail({
      from: `"Studio Architectural" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      subject: `Nuevo mensaje de formulario: ${projectType}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Tipo de Proyecto: ${projectType}
        Descripción: ${message}
        ${fileUrls.length > 0 ? `Archivos adjuntos: ${fileUrls.join('\n')}` : 'Sin archivos adjuntos'}
      `,
      html: `
        <h1>Nuevo mensaje de Formulario</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tipo de Proyecto:</strong> ${projectType}</p>
        <p><strong>Descripción:</strong> ${message}</p>
        ${fileUrls.length > 0 ? `
        <p><strong>Archivos adjuntos:</strong></p>
        <ul>
          ${fileUrls.map(url => `<li><a href="${url}" target="_blank">${url.split('/').pop()}</a></li>`).join('')}
        </ul>
        ` : '<p><strong>Sin archivos adjuntos</strong></p>'}
      `,
    });

    // Respuesta exitosa
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Mensaje enviado exitosamente' })
    };
  } catch (error) {
    // Manejo de errores
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al enviar el mensaje' })
    };
  }
};