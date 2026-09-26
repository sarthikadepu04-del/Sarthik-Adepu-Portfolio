import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Real API endpoint for Contact Form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Your name is required.' });
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Your email address is required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'A message is required.' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const targetEmail = process.env.CONTACT_EMAIL || 'sarthikadepu04@gmail.com';

  if (resendApiKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [targetEmail],
          reply_to: email.trim(),
          subject: `Portfolio Inquiry from ${name.trim()}`,
          text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
        }),
      });
    } catch (err) {
      console.error('Error forwarding email:', err);
    }
  }

  console.log(`[Contact Form Received] Name: ${name} | Email: ${email}`);

  return res.status(200).json({
    success: true,
    message: 'Thank you for reaching out! Your message has been received.',
    receivedAt: new Date().toISOString(),
  });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Portfolio server is listening on http://0.0.0.0:${port}`);
  });
}

startServer();
