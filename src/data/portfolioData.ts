export interface Project {
  id: string;
  name: string;
  category: 'AI & ML' | 'Web Applications' | 'Tools';
  github: string;
  live: string;
  description: string;
  technologies: string[];
  features: string[];
  tag: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level?: string }[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  projectsDeveloped: string[];
  type: string;
}

export interface WorkshopItem {
  title: string;
  description: string;
}

export interface CertificationItem {
  title: string;
  subtitle?: string;
  verifiedSource: string;
}

export const PERSONAL_INFO = {
  name: "Sarthik Adepu",
  headline: "CSE (AI & ML) Student | Aspiring Software Developer | AI & ML Enthusiast",
  tagline: "Turning curiosity into code, and ideas into intelligent experiences.",
  shortBio:
    "I’m a 2nd-year CSE (AI & ML) student passionate about building useful digital experiences, exploring Artificial Intelligence and Machine Learning, and turning ideas into working software.",
  aboutDetailed:
    "I’m Sarthik Adepu, a B.Tech CSE (AI & ML) student at Marwadi University. I’m passionate about programming, Artificial Intelligence, Machine Learning, software development, and problem-solving.\n\nI enjoy learning by building practical projects and experimenting with modern technologies. My goal is to gain real-world experience, contribute to meaningful projects, continuously improve my technical skills, and grow as a software developer.",
  degree: "B.Tech CSE (AI & ML)",
  semester: "2nd Year, 3rd Semester",
  institution: "Marwadi University",
  location: "Rajkot, Gujarat, India",
  email: "sarthikadepu04@gmail.com",
  socials: {
    github: "https://github.com/sarthikadepu04-del",
    linkedin: "https://www.linkedin.com/in/sarthik-adepu-9916b5418",
    instagram: "https://www.instagram.com/sarthikadepu",
  },
  highlights: [
    { label: "Academic Standing", value: "2nd Year" },
    { label: "Specialization", value: "CSE (AI & ML)" },
    { label: "Shipped Projects", value: "4+ Projects" },
    { label: "Mindset", value: "Open to Learning & Opportunities" },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming",
    description: "Foundational & algorithmic programming languages",
    skills: [
      { name: "Python", level: "Core & Data Exploration" },
      { name: "C++", level: "OOP & Problem Solving" },
      { name: "C", level: "Procedural & System Basics" },
    ],
  },
  {
    title: "Web Development",
    description: "Modern, responsive frontend & interactive UI engineering",
    skills: [
      { name: "React", level: "Component Architecture" },
      { name: "TypeScript", level: "Type Safety" },
      { name: "JavaScript", level: "ES6+ Logic" },
      { name: "HTML", level: "Semantic Markup" },
      { name: "CSS", level: "Modern Layouts" },
      { name: "Tailwind CSS", level: "Utility-first Styling" },
      { name: "Vite", level: "Fast Tooling & Bundling" },
      { name: "Responsive Web Development", level: "Multi-device Layouts" },
    ],
  },
  {
    title: "AI / ML",
    description: "Artificial Intelligence, Gemini, and intelligent applications",
    skills: [
      { name: "Artificial Intelligence", level: "Foundations & Concepts" },
      { name: "Machine Learning", level: "Exploration & Algorithms" },
      { name: "Gemini AI", level: "LLM Integration" },
      { name: "Google AI Studio", level: "Prototyping & Prompting" },
      { name: "AI-powered application development", level: "Intelligent UX" },
      { name: "Prompt-based application development", level: "Context & System Prompts" },
    ],
  },
  {
    title: "Backend / APIs",
    description: "Lightweight server development & API communications",
    skills: [
      { name: "Flask", level: "Micro-framework & Endpoints" },
      { name: "REST APIs", level: "Client-Server Protocol" },
      { name: "Serverless Functions", level: "Cloud Execution (Vercel)" },
      { name: "API Integration", level: "Consuming Third-party Services" },
    ],
  },
  {
    title: "Tools & Platforms",
    description: "Version control, hosting, and developer workflows",
    skills: [
      { name: "Git", level: "Version Control" },
      { name: "GitHub", level: "Repository Collaboration" },
      { name: "Vercel", level: "Continuous Deployment" },
      { name: "Google AI Studio", level: "Model Tuning & Testing" },
    ],
  },
  {
    title: "Database / Data",
    description: "Relational persistence and client-side data management",
    skills: [
      { name: "SQL", level: "Relational Queries" },
      { name: "Data Analysis", level: "Data Exploration" },
      { name: "Local Storage", level: "Browser Persistence" },
    ],
  },
  {
    title: "Core Engineering",
    description: "Computer science principles and engineering methodologies",
    skills: [
      { name: "Object-Oriented Programming", level: "Software Design" },
      { name: "Problem Solving", level: "Analytical Thinking" },
      { name: "Software Development", level: "End-to-End Delivery" },
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: "CodeAlpha",
    role: "Software Development / Project Intern",
    period: "Aug 2026 – Sep 2026",
    type: "Internship Program",
    description:
      "Worked on practical software projects as part of the CodeAlpha Internship Program, focusing on interactive web applications, application development, AI-powered experiences, responsive interfaces, and deployment.",
    projectsDeveloped: ["Hangman Game", "Stock Portfolio Tracker", "StudyMate AI"],
  },
];

export const WORKSHOPS_DATA: WorkshopItem[] = [
  {
    title: "AI SPARKS",
    description: "Attended an AI-focused event and workshop exploring artificial intelligence advancements, applications, and hands-on demonstrations.",
  },
  {
    title: "Robotics Workshop",
    description: "Participated in a robotics workshop to explore robotics concepts, hardware-software interfacing, and practical technology applications.",
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "hangman-game",
    name: "Hangman Game",
    category: "Web Applications",
    tag: "CodeAlpha Internship Project",
    github: "https://github.com/sarthikadepu04-del/hangman-game",
    live: "https://hangman-game-flax-eight.vercel.app/",
    description:
      "A modern interactive Hangman word-guessing game with difficulty modes, categories, hints, scoring, streak tracking, keyboard controls, responsive UI, animations, and sound effects.",
    features: [
      "Multiple difficulty modes and curated categories",
      "Dynamic hint system and streak tracking",
      "Interactive on-screen & physical keyboard controls",
      "Responsive SVG rendering for game progression",
      "Synthesized sound effects via Web Audio API",
      "Local state & score persistence via localStorage",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Web Audio API",
      "Vercel Serverless Functions",
      "localStorage",
    ],
  },
  {
    id: "stock-portfolio-tracker",
    name: "Stock Portfolio Tracker",
    category: "Tools",
    tag: "CodeAlpha Internship Project",
    github: "https://github.com/sarthikadepu04-del/stock-portfolio-tracker",
    live: "https://stock-portfolio-tracker-pi.vercel.app/",
    description:
      "A modern responsive stock portfolio tracking application designed to help users monitor portfolio data, profit/loss information, watchlists, analytics, and stock charts.",
    features: [
      "Portfolio holdings overview & PnL calculation",
      "Interactive watchlist management",
      "Clean visual stock charts and performance views",
      "Responsive layout for mobile and desktop screens",
      "Serverless data processing on Vercel",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Vercel",
      "Serverless Functions",
    ],
  },
  {
    id: "studymate-ai",
    name: "StudyMate AI",
    category: "AI & ML",
    tag: "CodeAlpha Internship Project",
    github: "https://github.com/sarthikadepu04-del/studymate-ai",
    live: "https://studymate-ai-gamma-livid.vercel.app/",
    description:
      "An AI-powered educational chatbot built with Gemini AI, designed for study assistance, general knowledge, conversations, Markdown/code support, and conversation history.",
    features: [
      "Powered by Gemini AI for intelligent academic assistance",
      "Full Markdown formatting with syntax-highlighted code blocks",
      "Multi-turn conversation history and context retention",
      "Study prompts, topic explanations, and practice question generator",
      "Vercel serverless backend ensuring secure API calls",
    ],
    technologies: [
      "Gemini AI",
      "React",
      "TypeScript",
      "AI application development",
      "Vercel Serverless Backend",
    ],
  },
  {
    id: "cravingo-kitchen",
    name: "Cravingo Kitchen",
    category: "Web Applications",
    tag: "Artisanal Culinary Showcase",
    github: "https://github.com/sarthikadepu04-del/Cravingo-Kitchen",
    live: "https://cravingo-kitchen.vercel.app/",
    description:
      "A modern food-ordering and culinary website concept featuring a warm homestyle kitchen experience, food categories, dishes, drinks, desserts, and a delivery-focused interface.",
    features: [
      "Warm homestyle aesthetic with artisanal culinary themes",
      "Categorized menus for dishes, drinks, and desserts",
      "Delivery-focused ordering UI and intuitive cart flow",
      "Clean TypeScript & React component architecture",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Vite",
      "Modern responsive web development",
      "Vercel",
    ],
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    title: "Google Cloud Certified Professional",
    subtitle: "Cloud Architect Certification",
    verifiedSource: "LinkedIn Profile Record",
  },
  {
    title: "Certified Forage and Grassland Professional (CFGP)",
    subtitle: "Professional Certification",
    verifiedSource: "LinkedIn Profile Record",
  },
  {
    title: "Technology Job Simulation",
    subtitle: "Practical Industry Simulation",
    verifiedSource: "LinkedIn Profile Record",
  },
  {
    title: "Computer Hardware and Software",
    subtitle: "Core Systems Competency",
    verifiedSource: "LinkedIn Profile Record",
  },
];

export const EDUCATION_DATA = {
  institution: "Marwadi University",
  degree: "Bachelor of Technology (B.Tech)",
  major: "Computer Science Engineering — AI & ML",
  status: "2nd Year, 3rd Semester",
  location: "Rajkot, Gujarat, India",
  description:
    "Comprehensive engineering curriculum covering core computing foundations, data structures, algorithms, object-oriented design, machine learning fundamentals, and applied software engineering.",
};
