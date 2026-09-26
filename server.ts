import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { PORTFOLIO_KNOWLEDGE_PROMPT, getLocalGroundedAnswer } from './src/data/portfolioKnowledge';

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

// Real API endpoint for Ask Sarthik AI Assistant
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'A message prompt is required.' });
  }

  const trimmed = message.trim();
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item && item.text) {
            contents.push({
              role: item.sender === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }],
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: trimmed }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: PORTFOLIO_KNOWLEDGE_PROMPT,
          temperature: 0.4,
          maxOutputTokens: 600,
        },
      });

      const reply = response.text?.trim();
      if (reply) {
        return res.status(200).json({ reply, source: 'gemini' });
      }
    } catch (err) {
      console.error('Gemini API invocation error:', err);
      return res.status(200).json({
        reply: getLocalGroundedAnswer(trimmed),
        source: 'grounded-fallback',
      });
    }
  }

  return res.status(200).json({
    reply: getLocalGroundedAnswer(trimmed),
    source: 'grounded-portfolio',
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
