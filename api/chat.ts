import { GoogleGenAI } from '@google/genai';
import { PORTFOLIO_KNOWLEDGE_PROMPT, getLocalGroundedAnswer } from '../src/data/portfolioKnowledge';

interface VercelRequest {
  method?: string;
  body?: {
    message?: string;
    history?: Array<{ sender: 'user' | 'assistant'; text: string }>;
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
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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

  const { message, history } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'A message prompt is required.' });
  }

  const trimmedMessage = message.trim();
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

      // Construct conversation turns for Gemini
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history) && history.length > 0) {
        // Take up to previous 6 turns for context
        const recentHistory = history.slice(-6);
        for (const item of recentHistory) {
          if (item.text && item.text.trim()) {
            contents.push({
              role: item.sender === 'user' ? 'user' : 'model',
              parts: [{ text: item.text.trim() }],
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: trimmedMessage }],
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

      const replyText = response.text?.trim();

      if (replyText) {
        return res.status(200).json({
          reply: replyText,
          source: 'gemini',
        });
      }
    } catch (err: unknown) {
      console.error('Gemini API invocation error:', err);
      // Fallback to grounded local answer if Gemini temporarily fails
      const fallbackReply = getLocalGroundedAnswer(trimmedMessage);
      return res.status(200).json({
        reply: fallbackReply,
        source: 'grounded-fallback',
      });
    }
  }

  // If no Gemini API key is configured yet, respond with verified grounded portfolio knowledge
  const groundedReply = getLocalGroundedAnswer(trimmedMessage);
  return res.status(200).json({
    reply: groundedReply,
    source: 'grounded-portfolio',
  });
}
