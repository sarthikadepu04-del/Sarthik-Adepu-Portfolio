import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev-handler',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const { message, history } = data;
              if (!message || !message.trim()) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'A message prompt is required.' }));
                return;
              }

              const trimmed = message.trim();
              const apiKey = process.env.GEMINI_API_KEY;

              if (apiKey) {
                try {
                  const { GoogleGenAI } = await import('@google/genai');
                  const { PORTFOLIO_KNOWLEDGE_PROMPT, getLocalGroundedAnswer } = await import('./src/data/portfolioKnowledge.ts');
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
                  contents.push({ role: 'user', parts: [{ text: trimmed }] });

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
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ reply, source: 'gemini' }));
                    return;
                  }
                } catch (geminiErr) {
                  console.error('Gemini dev proxy error:', geminiErr);
                }
              }

              // Fallback to grounded portfolio answer
              const { getLocalGroundedAnswer } = await import('./src/data/portfolioKnowledge.ts');
              const reply = getLocalGroundedAnswer(trimmed);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ reply, source: 'grounded-portfolio' }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Internal server error processing chat.' }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });

      server.middlewares.use('/api/contact', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const { name, email, message } = data;
              if (!name || !email || !message) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'All fields (name, email, message) are required.' }));
                return;
              }
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Please enter a valid email address.' }));
                return;
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  message: 'Thank you for reaching out! Your message has been received.',
                  receivedAt: new Date().toISOString(),
                })
              );
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid JSON request body.' }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      target: 'esnext',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/lucide-react')) {
              return 'lucide-icons';
            }
          },
        },
      },
    },
  };
});
