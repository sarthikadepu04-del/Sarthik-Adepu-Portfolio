import {
  PERSONAL_INFO,
  PROJECTS_DATA,
  EXPERIENCE_DATA,
  SKILL_CATEGORIES,
  WORKSHOPS_DATA,
  CERTIFICATIONS_DATA,
  EDUCATION_DATA,
} from './portfolioData.ts';

export const PORTFOLIO_KNOWLEDGE_PROMPT = `
You are "Sarthik AI", the official intelligent portfolio assistant for Sarthik Adepu.
Your mission is to help visitors, recruiters, and collaborators explore Sarthik's verified skills, projects, education, internship experience, and technical journey.

============================================================
SARTHIK ADEPU — VERIFIED PORTFOLIO KNOWLEDGE (SOURCE OF TRUTH)
============================================================

1. PERSONAL & ACADEMIC PROFILE:
- Name: ${PERSONAL_INFO.name}
- Headline: ${PERSONAL_INFO.headline}
- Tagline: "${PERSONAL_INFO.tagline}"
- Education: ${EDUCATION_DATA.degree} at ${EDUCATION_DATA.institution}
- Major: ${EDUCATION_DATA.major}
- Current Academic Standing: ${EDUCATION_DATA.status}
- Location: ${PERSONAL_INFO.location}
- Email: ${PERSONAL_INFO.email}
- Portfolio URL: https://sarthik-adepu-portfolio.vercel.app/
- GitHub: ${PERSONAL_INFO.socials.github}
- LinkedIn: ${PERSONAL_INFO.socials.linkedin}
- Instagram: ${PERSONAL_INFO.socials.instagram}
- Bio: ${PERSONAL_INFO.shortBio}
- Detailed Background: ${PERSONAL_INFO.aboutDetailed}
- Availability: Open to opportunities (Internships, Projects, Collaboration)

2. TECHNICAL SKILLS (VERIFIED):
${SKILL_CATEGORIES.map(
  (cat) => `- ${cat.title}: ${cat.skills.map((s) => s.name).join(', ')}`
).join('\n')}

3. VERIFIED PROJECTS:
${PROJECTS_DATA.map(
  (p) => `
- Project: ${p.name}
  * Category: ${p.category}
  * Tag: ${p.tag}
  * GitHub: ${p.github}
  * Live URL: ${p.live}
  * Summary: ${p.description}
  * Key Capabilities: ${p.features.join('; ')}
  * Technologies Used: ${p.technologies.join(', ')}
`
).join('\n')}

4. WORK EXPERIENCE & INTERNSHIPS:
${EXPERIENCE_DATA.map(
  (e) => `
- Company: ${e.company}
  * Role: ${e.role}
  * Period: ${e.period} (${e.type})
  * Description: ${e.description}
  * Projects Built During Internship: ${e.projectsDeveloped.join(', ')}
`
).join('\n')}

5. WORKSHOPS & CONFERENCES:
${WORKSHOPS_DATA.map((w) => `- ${w.title}: ${w.description}`).join('\n')}

6. CERTIFICATIONS (FROM LINKEDIN RECORDS):
${CERTIFICATIONS_DATA.map((c) => `- ${c.title} (${c.subtitle || 'Verified Record'})`).join('\n')}

7. WHAT SARTHIK IS CURRENTLY EXPLORING:
- AI & Machine Learning: Foundations, architectures, and practical algorithms.
- Gemini AI: LLM prompting, system context, and modern AI application development.
- React & TypeScript: Clean modular component systems and strict type safety.
- Software Development: Problem solving, data structures, and end-to-end full-stack architectures.

============================================================
STRICT ANTI-HALLUCINATION & ANSWERING RULES
============================================================
1. SOURCE OF TRUTH: The verified facts above are the ONLY truth regarding Sarthik Adepu.
2. NO FABRICATION: NEVER invent experience, companies, job titles, awards, client testimonials, statistics, percentages, or personal data.
3. UNVERIFIED CLAIMS: If a user asks whether Sarthik has experience, awards, or skills NOT listed above (for example: "Does Sarthik have 5 years of professional experience?", "Did Sarthik win an international hackathon?", "What is Sarthik's phone number?"), you MUST respond clearly and politely:
   "I don't have verified information showing that in Sarthik's portfolio."
4. GENERAL AI VS PORTFOLIO KNOWLEDGE:
   - If asked general questions about programming (e.g., "What is the difference between C++ and Python?", "How does Gemini API work?"), you may provide helpful, accurate technical explanations.
   - However, always distinguish general technical concepts from what Sarthik has personally built or verified in his portfolio. Never claim Sarthik built something unless it is explicitly in his verified projects list.
5. TONE & STYLE:
   - Warm, welcoming, professional, concise, articulate, and AI-inspired.
   - Use short paragraphs and clean bullet points.
   - When discussing any of Sarthik's projects, include their verified live demo and GitHub repository links.
   - Keep answers focused and actionable.
`;

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isError?: boolean;
}

export const SUGGESTED_PROMPTS = [
  '👋 Who is Sarthik?',
  '🚀 Show me his projects',
  '🧠 What are his skills?',
  '💼 Tell me about his experience',
  '🤖 Which projects use AI?',
  '📚 What is Sarthik currently learning?',
  '📬 How can I contact him?',
];

/**
 * Intelligent local grounded knowledge answer provider.
 * Serves as an immediate response engine or fallback if the Gemini API is offline or unconfigured.
 */
export function getLocalGroundedAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  // Who is Sarthik
  if (q.includes('who is sarthik') || q.includes('about sarthik') || q.includes('who are you') || q.includes('introduction')) {
    return `**Sarthik Adepu** is a 2nd-year B.Tech Computer Science Engineering student specializing in **AI & Machine Learning** at Marwadi University in Rajkot, Gujarat, India.\n\nHe is passionate about programming in **Python and C++**, modern web development with **React & TypeScript**, and engineering intelligent applications with **Gemini AI**.\n\nHis guiding principle is: *"Turning curiosity into code, and ideas into intelligent experiences."*`;
  }

  // Projects
  if (q.includes('projects') || q.includes('show me his projects') || q.includes('what has he built') || q.includes('portfolio work')) {
    return `Sarthik has engineered 4 primary projects:\n\n1. **StudyMate AI** ([Live Demo](${PROJECTS_DATA[2].live}) | [GitHub](${PROJECTS_DATA[2].github})) — An AI-powered study companion powered by Gemini AI with markdown support and conversation history.\n\n2. **Hangman Game** ([Live Demo](${PROJECTS_DATA[0].live}) | [GitHub](${PROJECTS_DATA[0].github})) — Interactive word guessing game with multiple difficulty levels, synthesized Web Audio API sound effects, and streak tracking.\n\n3. **Stock Portfolio Tracker** ([Live Demo](${PROJECTS_DATA[1].live}) | [GitHub](${PROJECTS_DATA[1].github})) — Financial tool for tracking stock watchlists, holdings, and profit/loss analytics.\n\n4. **Cravingo Kitchen** ([Live Demo](${PROJECTS_DATA[3].live}) | [GitHub](${PROJECTS_DATA[3].github})) — Warm homestyle culinary ordering platform with categorized menus and modern UI.`;
  }

  // AI projects
  if (q.includes('ai') && (q.includes('which') || q.includes('project') || q.includes('ml'))) {
    return `Sarthik's premier AI project is **StudyMate AI** ([Live Demo](${PROJECTS_DATA[2].live}) | [GitHub](${PROJECTS_DATA[2].github})), built with Google Gemini AI for study assistance, intelligent explanations, and multi-turn context.\n\nHe also integrates Gemini AI server-side into this portfolio (such as this **Ask Sarthik AI** assistant!) and actively explores machine learning architectures at Marwadi University.`;
  }

  // Specific project questions
  if (q.includes('hangman')) {
    return `**Hangman Game** is an interactive web game built during Sarthik's CodeAlpha internship.\n\n- **Technologies:** React, TypeScript, Vite, Tailwind CSS, Web Audio API, localStorage.\n- **Features:** Curated vocabulary categories, difficulty modes, hints, streak counters, on-screen keyboard, and custom sound synthesis.\n- **Links:** [Live Game](${PROJECTS_DATA[0].live}) · [GitHub Code](${PROJECTS_DATA[0].github})`;
  }

  if (q.includes('stock portfolio') || q.includes('stock tracker')) {
    return `**Stock Portfolio Tracker** is a financial web application built during Sarthik's CodeAlpha internship.\n\n- **Technologies:** React, TypeScript, Vite, Tailwind CSS, Vercel Serverless.\n- **Features:** Holdings overview, P&L calculations, interactive watchlists, and responsive data visualization.\n- **Links:** [Live App](${PROJECTS_DATA[1].live}) · [GitHub Code](${PROJECTS_DATA[1].github})`;
  }

  if (q.includes('studymate') || q.includes('study mate')) {
    return `**StudyMate AI** is an intelligent academic companion built with Gemini AI.\n\n- **Technologies:** Gemini AI, React, TypeScript, Vercel Serverless Backend.\n- **Features:** Multi-turn conversation retention, markdown formatting, syntax highlighting, and study practice questions.\n- **Links:** [Live App](${PROJECTS_DATA[2].live}) · [GitHub Code](${PROJECTS_DATA[2].github})`;
  }

  if (q.includes('cravingo')) {
    return `**Cravingo Kitchen** is a homestyle artisanal food-ordering showcase.\n\n- **Technologies:** React, TypeScript, Vite, Modern Responsive Web Architecture.\n- **Features:** Warm homestyle aesthetics, menu categorization, intuitive cart flow, and delivery-focused layout.\n- **Links:** [Live App](${PROJECTS_DATA[3].live}) · [GitHub Code](${PROJECTS_DATA[3].github})`;
  }

  // Skills
  if (q.includes('skill') || q.includes('technologies') || q.includes('tech stack') || q.includes('languages')) {
    return `Here are Sarthik's verified technical competencies:\n\n- **Languages:** Python, C++, C, JavaScript, TypeScript\n- **Web Frontend:** React, Tailwind CSS, HTML5, CSS3, Vite\n- **AI & ML:** Gemini AI, Google AI Studio, Machine Learning Foundations, Prompt Engineering\n- **Backend / Cloud:** Serverless Functions, REST APIs, Flask, Vercel\n- **Tools:** Git, GitHub, SQL, VS Code, Linux`;
  }

  // Experience
  if (q.includes('experience') || q.includes('internship') || q.includes('codealpha') || q.includes('work')) {
    return `Sarthik completed a **Software Development / Project Internship at CodeAlpha** (Aug 2026 – Sep 2026).\n\nDuring this internship, he engineered and deployed three key projects:\n1. **Hangman Game**\n2. **Stock Portfolio Tracker**\n3. **StudyMate AI**\n\nHe focused on interactive interfaces, clean component architecture, and cloud deployment.`;
  }

  // Currently learning / exploring
  if (q.includes('learning') || q.includes('exploring') || q.includes('current') || q.includes('study')) {
    return `Sarthik is currently focused on 4 core areas:\n\n- **AI & Machine Learning:** Core models, data structures, and neural network foundations.\n- **Gemini AI:** Advanced multimodal prompt architecture and serverless AI applications.\n- **React & TypeScript:** Production-grade full-stack patterns and type-safe systems.\n- **Software Development:** Algorithmic problem solving and building real-world software.`;
  }

  // Contact
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('message')) {
    return `You can connect with Sarthik directly through:\n\n- 📧 **Email:** [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})\n- 💼 **LinkedIn:** [linkedin.com/in/sarthik-adepu-9916b5418](${PERSONAL_INFO.socials.linkedin})\n- 🐙 **GitHub:** [github.com/sarthikadepu04-del](${PERSONAL_INFO.socials.github})\n- 📸 **Instagram:** [@sarthikadepu](${PERSONAL_INFO.socials.instagram})\n\nHe is **open to opportunities** including internships, technical collaborations, and software projects!`;
  }

  // Unverified checks
  if (q.includes('5 years') || q.includes('10 years') || q.includes('salary') || q.includes('senior engineer') || q.includes('ceo') || q.includes('married') || q.includes('phone number') || q.includes('age')) {
    return `I don't have verified information showing that in Sarthik's portfolio. Sarthik is a 2nd-year B.Tech CSE (AI & ML) student at Marwadi University.`;
  }

  // Default helpful response
  return `I can help you explore Sarthik's verified portfolio! Here are a few topics you can ask me about:\n\n- **Projects:** StudyMate AI, Hangman Game, Stock Portfolio Tracker, Cravingo Kitchen\n- **Skills:** Python, C++, React, TypeScript, Gemini AI, Web Development\n- **Experience:** CodeAlpha Internship & workshop engagements\n- **Education:** B.Tech in CSE (AI & ML) at Marwadi University\n- **Contact:** How to get in touch for internships & collaborations\n\nWhat would you like to know?`;
}
