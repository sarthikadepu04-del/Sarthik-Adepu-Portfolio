import { useState, lazy, Suspense } from 'react';
import ScrollProgress from './components/ScrollProgress';
import SubtlePeachSparkles from './components/SubtlePeachSparkles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingMobileContact from './components/FloatingMobileContact';
import FixedSarthikAiLauncher from './components/FixedSarthikAiLauncher';

// Code-split chat modal to ensure lightning-fast initial load
const AskSarthikAiModal = lazy(() => import('./components/AskSarthikAiModal'));

export default function App() {
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);

  const handleOpenAiChat = (initialPrompt?: string) => {
    setAiInitialPrompt(initialPrompt);
    setAiChatOpen(true);
  };

  const handleToggleAiChat = () => {
    setAiChatOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241F1C] font-sans relative selection:bg-[#FFD3C4] selection:text-[#3B1E12]">
      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Subtle Micro-Interaction Cursor Sparkle Particle Effect */}
      <SubtlePeachSparkles />

      {/* Sticky Header Navigation: About, Skills, Experience, Projects, Contact */}
      <Navbar />

      {/* Main Landmark */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero onOpenAiChat={() => handleOpenAiChat()} />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects onAskAi={handleOpenAiChat} />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fixed Viewport-based Ask Sarthik AI Chat Panel (Lazy Loaded) */}
      {aiChatOpen && (
        <Suspense fallback={null}>
          <AskSarthikAiModal
            isOpen={aiChatOpen}
            onClose={() => setAiChatOpen(false)}
            initialPrompt={aiInitialPrompt}
          />
        </Suspense>
      )}

      {/* Fixed Sarthik AI Viewport Launcher Button (Fixed throughout the website) */}
      <FixedSarthikAiLauncher
        isOpen={aiChatOpen}
        onToggle={handleToggleAiChat}
      />

      {/* Mobile Floating Let's Talk CTA */}
      <FloatingMobileContact />
    </div>
  );
}
