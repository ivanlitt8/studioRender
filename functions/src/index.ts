import * as functions from 'firebase-functions';
// Importamos específicamente la versión v1
import { firestore } from 'firebase-functions/v1';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

admin.initializeApp();

// Interfaz para los datos del contacto
interface ContactData {
  fullName: string;
  email: string;
  projectType: string;
  brief?: string;
  fileUrls?: string[];
  createdAt: admin.firestore.Timestamp;
}

// Configurar el servicio de email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Usamos el módulo de firestore de la versión 1
export const sendEmailOnNewContact = firestore
  .document("contacts/{contactId}")
  .onCreate((snapshot, context) => {
    const data = snapshot.data() as ContactData;
    
    // Formatear las URLs de archivos si existen
    const fileUrlsText = data.fileUrls && data.fileUrls.length > 0
      ? data.fileUrls.map((url, index) => `   - Archivo ${index + 1}: ${url}`).join('\n')
      : "   No se adjuntaron archivos";
    
    // Formatear la fecha
    const formattedDate = data.createdAt 
      ? new Date(data.createdAt.toDate()).toLocaleString('es-ES')
      : new Date().toLocaleString('es-ES');
    
    // Para fines de registro, usamos el ID del documento
    const contactId = context.params.contactId;
    console.log(`Enviando email para contacto ID: ${contactId}`);
    
    const mailOptions = {
      from: `"Formulario de Contacto Studio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `Nuevo mensaje de ${data.fullName} - ${data.projectType}`,
      text: `
NUEVO CONTACTO RECIBIDO (ID: ${contactId})

Nombre: ${data.fullName}
Email: ${data.email}
Tipo de Proyecto: ${data.projectType}
Fecha de envío: ${formattedDate}

Brief del proyecto:
${data.brief || "No se proporcionó información adicional"}

Archivos adjuntos:
${fileUrlsText}

---
Este email ha sido enviado automáticamente desde el formulario de contacto.`,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
  <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Nuevo Contacto Recibido</h2>
  <p style="color: #777; font-size: 12px;">ID: ${contactId}</p>
  
  <p><strong>Nombre:</strong> ${data.fullName}</p>
  <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
  <p><strong>Tipo de Proyecto:</strong> ${data.projectType}</p>
  <p><strong>Fecha de envío:</strong> ${formattedDate}</p>
  
  <div style="margin-top: 20px;">
    <h3 style="color: #555;">Brief del proyecto:</h3>
    <p style="background-color: #f9f9f9; padding: 10px; border-left: 3px solid #ccc;">${data.brief || "No se proporcionó información adicional"}</p>
  </div>
  
  <div style="margin-top: 20px;">
    <h3 style="color: #555;">Archivos adjuntos:</h3>
    ${data.fileUrls && data.fileUrls.length > 0 
      ? `<ul style="background-color: #f9f9f9; padding: 10px;">
          ${data.fileUrls.map((url, index) => 
            `<li><a href="${url}" target="_blank">Archivo ${index + 1}</a></li>`).join('')}
         </ul>` 
      : `<p style="background-color: #f9f9f9; padding: 10px;">No se adjuntaron archivos</p>`}
  </div>
  
  <p style="margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 10px;">
    Este email ha sido enviado automáticamente desde el formulario de contacto.
  </p>
</div>`
    };

    return transporter.sendMail(mailOptions)
      .then(() => {
        console.log(`Email enviado con éxito para contacto ID: ${contactId}`);
        return null;
      })
      .catch((error: Error) => {
        console.error(`Error enviando email para contacto ID: ${contactId}`, error);
        throw new functions.https.HttpsError('internal', 'Error al enviar el email', error.message);
      });
  });
