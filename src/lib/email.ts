// Servicio para enviar correos electrónicos
interface EmailData {
  fullName: string;
  email: string;
  projectType: string;
  brief?: string;
  fileUrls?: string[];
}

// Traduce las claves de projectType a etiquetas más legibles
const projectTypeLabels: Record<string, string> = {
  exterior: "Exterior Design",
  interior: "Interior Design",
  urban: "Urban Planning",
  landscape: "Landscape",
  other: "Other"
};

// export async function sendEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
//   try {
//     // Preparamos el cuerpo de la solicitud para nuestro endpoint
//     const response = await fetch('https://api.example.com/send-email', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name: data.fullName,
//         email: data.email,
//         projectType: projectTypeLabels[data.projectType] || data.projectType,
//         message: data.brief || '',
//         fileUrls: data.fileUrls || []
//       }),
//     });

//     const result = await response.json();
    
//     if (!response.ok) {
//       throw new Error(result.error || 'Error al enviar el correo electrónico');
//     }
    
//     return { success: true, message: 'Correo enviado con éxito' };
//   } catch (error) {
//     console.error('Error al enviar correo:', error);
//     return { success: false, message: 'No se pudo enviar el correo electrónico' };
//   }
// } 

export async function sendEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.fullName,
        email: data.email,
        projectType: projectTypeLabels[data.projectType] || data.projectType,
        message: data.brief || '',
        fileUrls: data.fileUrls || []
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Error al enviar el correo electrónico');
    }
    
    return { success: true, message: 'Correo enviado con éxito' };
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return { success: false, message: 'No se pudo enviar el correo electrónico' };
  }
}