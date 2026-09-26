# Sarthik Adepu — Personal Portfolio

A production-quality personal portfolio website engineered for **Sarthik Adepu**, a 2nd-year B.Tech CSE (AI & ML) student at Marwadi University, aspiring software developer, and AI & ML enthusiast.

Designed with a warm peach visual aesthetic (`#FF8A65`, `#FF9E7D`, `#FFF9F6`), high typographic hierarchy, zero-pill discipline, smooth interactions, and complete responsiveness across mobile, tablet, and desktop viewports.

---

## 🚀 Live Projects Featured

1. **Hangman Game**
   - Live: [https://hangman-game-flax-eight.vercel.app/](https://hangman-game-flax-eight.vercel.app/)
   - GitHub: [https://github.com/sarthikadepu04-del/hangman-game](https://github.com/sarthikadepu04-del/hangman-game)
   - Tech: React, TypeScript, Vite, Tailwind CSS, Web Audio API, Vercel Serverless Functions, localStorage
   - CodeAlpha internship project with difficulty modes, hints, scoring, streak tracking, keyboard controls, and synthesized sound effects.

2. **Stock Portfolio Tracker**
   - Live: [https://stock-portfolio-tracker-pi.vercel.app/](https://stock-portfolio-tracker-pi.vercel.app/)
   - GitHub: [https://github.com/sarthikadepu04-del/stock-portfolio-tracker](https://github.com/sarthikadepu04-del/stock-portfolio-tracker)
   - Tech: React, TypeScript, Vite, Vercel, Serverless Functions
   - CodeAlpha internship project designed to monitor portfolio data, profit/loss information, watchlists, analytics, and stock charts.

3. **StudyMate AI**
   - Live: [https://studymate-ai-gamma-livid.vercel.app/](https://studymate-ai-gamma-livid.vercel.app/)
   - GitHub: [https://github.com/sarthikadepu04-del/studymate-ai](https://github.com/sarthikadepu04-del/studymate-ai)
   - Tech: Gemini AI, React, TypeScript, AI application development, Vercel Serverless Backend
   - CodeAlpha internship project for AI study assistance, general knowledge, conversations, Markdown/code support, and conversation history.

4. **Cravingo Kitchen**
   - Live: [https://cravingo-kitchen.vercel.app/](https://cravingo-kitchen.vercel.app/)
   - GitHub: [https://github.com/sarthikadepu04-del/Cravingo-Kitchen](https://github.com/sarthikadepu04-del/Cravingo-Kitchen)
   - Tech: TypeScript, React, Vite, Modern responsive web development, Vercel
   - Homestyle kitchen showcase featuring menu categories, dishes, drinks, desserts, and a delivery-focused ordering flow.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4
- **Icons**: Lucide React
- **Backend / Serverless**: Vercel Serverless Functions (`/api/contact.ts`), Express full-stack support (`server.ts`)
- **Design Tokens**: Warm peach primary, cream background, warm brown typography

---

## 📬 Contact Form Setup

The contact section includes client-side field validation, duplicate-submission prevention, loading states, server response handling, and fallback `mailto:` links.

### Vercel Serverless Configuration

When deploying this project to **Vercel**:

1. Vercel automatically deploys the `/api/contact.ts` file as an independent serverless function.
2. In your Vercel Project Dashboard:
   - Navigate to **Settings** → **Environment Variables**.
   - Add the following environment variables:

| Variable Name | Description | Required | Example |
| :--- | :--- | :--- | :--- |
| `CONTACT_EMAIL` | Target inbox where inquiries should be sent | Optional (defaults to `sarthikadepu04@gmail.com`) | `sarthikadepu04@gmail.com` |
| `RESEND_API_KEY` | Resend API key for direct email delivery | Optional | `re_123456789...` |

> **Note**: Even without `RESEND_API_KEY`, the serverless function validates inputs, returns a `200 OK` success response, logs inquiries securely to Vercel runtime logs, and gives users immediate confirmation. Additionally, users can always click the **"Copy Address"** or **"Send Mail"** buttons to open their email client directly.

---

## 📄 ATS-Friendly Resume

The portfolio contains a built-in **"Download Resume"** trigger in the navigation bar and hero section:
- Formats resume data strictly using authentic verified facts (Marwadi University, CodeAlpha internship, actual projects, verified skills, and certifications).
- Formatted with `@media print` rules for clean 1-page PDF export via browser print.
- One-click copy for ATS plain-text submission.
