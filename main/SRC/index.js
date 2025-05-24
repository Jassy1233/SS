const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const ipLog = new Map();

app.post('/enviar', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Rate limit manual (24h por IP)
    if (ipLog.has(ip) && Date.now() - ipLog.get(ip) < 24 * 60 * 60 * 1000) {
        return res.status(429).json({ mensaje: 'Límite de envíos excedido. Intenta nuevamente mañana.' });
    }

    const {
        nombre,
        edad,
        nombreTutor,
        email,
        telefono,
        periodo,
        observaciones,
    } = req.body;

    // Validación básica
    if (!nombre || !edad || !nombreTutor || !email || !telefono || !periodo) {
        return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        const mailOptions = {
            from: `"Formulario Web" <${process.env.EMAIL}>`,
            to: process.env.EMAIL,
            subject: `Nueva inscripción: ${nombre}`,
            html: `
                <h1 style="color: #00b4d8;">Nueva inscripción recibida</h1>
                <p><strong>Alumno:</strong> ${nombre} (${edad} años)</p>
                <p><strong>Tutor:</strong> ${nombreTutor}</p>
                <p><strong>Contacto:</strong> ${email} | ${telefono}</p>
                <p><strong>Periodo:</strong> ${periodo}</p>
                ${observaciones ? `<p><strong>Observaciones:</strong> ${observaciones}</p>` : ''}
                <hr>
                <p style="font-size: 0.8em; color: #666;">
                    Enviado desde el formulario de contacto - ${new Date().toLocaleString()}
                </p>
            `
        };

        // Enviar el correo
        const confirmacionOptions = {
            from: `"Summer School Verano de la Vega" <${process.env.EMAIL}>`,
            to: email, // El correo del usuario
            subject: 'Confirmación de inscripción',
            html: `
        <h2 style="color: #00b4d8;">¡Gracias por tu inscripción!</h2>
        <p>Hola ${nombreTutor},</p>
        <p>Hemos recibido correctamente la inscripción de ${nombre} para el periodo <strong>${periodo}</strong>.</p>
        <p>Nos pondremos en contacto contigo lo antes posible.</p>
        <br>
        <p style="font-size: 0.85em; color: #666;">Este es un mensaje automático, no respondas a este correo.</p>
    `
        };

        await transporter.sendMail(mailOptions);
        await transporter.sendMail(confirmacionOptions);

        ipLog.set(ip, Date.now()); // Registrar la IP
        res.json({ mensaje: 'Solicitud enviada correctamente' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ mensaje: 'Error al enviar el mensaje', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
