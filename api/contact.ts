/**
 * Vercel Serverless Function for Contact Form
 * Handles incoming contact messages securely without exposing API keys or secrets on the client.
 */

// Simple type definitions for Vercel Request & Response
interface VercelRequest {
  method?: string;
  body?: {
    name?: string;
    email?: string;
    message?: string;
  };
  headers: Record<string, string | string[] | undefined>;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).json({ ok: true });
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Only POST is accepted.' });
  }

  const { name, email, message } = req.body || {};

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Your name is required.' });
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return res.status(400).json({ error: 'Your email address is required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'A message is required.' });
  }

  if (message.trim().length > 2000) {
    return res.status(400).json({ error: 'Message cannot exceed 2000 characters.' });
  }

  // If a provider like Resend is configured via RESEND_API_KEY environment variable:
  const resendApiKey = process.env.RESEND_API_KEY;
  const targetEmail = process.env.CONTACT_EMAIL || 'sarthikadepu04@gmail.com';

  if (resendApiKey) {
    try {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [targetEmail],
          reply_to: email.trim(),
          subject: `Portfolio Message from ${name.trim()}`,
          text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
        }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('Email provider error:', errorText);
        // Fallback: still record as received to not lose lead
      }
    } catch (err) {
      console.error('Failed to trigger email notification:', err);
    }
  }

  // Log on server for serverless logging
  console.log(`[Contact Submission] From: ${name} <${email}>`);
  console.log(`[Message Content]: ${message}`);

  return res.status(200).json({
    success: true,
    message: 'Thank you for reaching out, Sarthik will get back to you soon!',
    receivedAt: new Date().toISOString(),
  });
}
