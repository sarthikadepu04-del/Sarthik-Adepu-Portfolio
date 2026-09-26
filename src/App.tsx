import { useState, lazy, Suspense } from 'react';
import ScrollProgress from './components/ScrollProgress';
import SubtlePeachSparkles from './components/SubtlePeachSparkles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatIBuild from './components/WhatIBuild';
import CurrentlyExploring from './components/CurrentlyExploring';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import BuildingInPublic from './components/BuildingInPublic';
import Certifications from './components/Certifications';
import Workshops from './components/Workshops';
import BeyondCode from './components/BeyondCode';
import Education from './components/Education';
import Roadmap from './components/Roadmap';
import PreContactCTA from './components/PreContactCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingMobileContact from './components/FloatingMobileContact';
import FixedSarthikAiLauncher from './components/FixedSarthikAiLauncher';

// Code-split heavy modals to ensure lightning-fast initial load
const ResumeModal = lazy(() => import('./components/ResumeModal'));
const AskSarthikAiModal = lazy(() => import('./components/AskSarthikAiModal'));

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
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

      {/* Sticky Header Navigation */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenAiChat={() => handleOpenAiChat()}
      />

      {/* Main Landmark */}
      <main id="main-content">
        {/* Hero Section with integrated AI assistant cue */}
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          onOpenAiChat={() => handleOpenAiChat()}
        />

        {/* About Section */}
        <About />

        {/* 1. What I Build Section (Visual Journey & Core Focus) */}
        <WhatIBuild />

        {/* 2. Currently Exploring Track (Verified Learning Areas) */}
        <CurrentlyExploring />

        {/* Skills Section */}
        <Skills />

        {/* Experience Section */}
        <Experience />

        {/* Featured Projects Section with Interactive Explorer & Ask AI */}
        <Projects onAskAi={handleOpenAiChat} />

        {/* Building In Public (GitHub Repositories) Section */}
        <BuildingInPublic />

        {/* Certifications Section */}
        <Certifications />

        {/* Workshops & Activities Section */}
        <Workshops />

        {/* Beyond Code Section */}
        <BeyondCode />

        {/* Education Section */}
        <Education />

        {/* Roadmap Section */}
        <Roadmap />

        {/* Final Call to Action */}
        <PreContactCTA />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* ATS-Friendly One-Page Resume Modal (Lazy Loaded) */}
      {resumeOpen && (
        <Suspense fallback={null}>
          <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        </Suspense>
      )}

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

      {/* Fixed Sarthik AI Viewport Launcher Button (Desktop: bottom-7 right-7; Mobile: bottom-20 right-4) */}
      <FixedSarthikAiLauncher
        isOpen={aiChatOpen}
        onToggle={handleToggleAiChat}
      />

      {/* Mobile Floating Let's Talk CTA (Mobile only: bottom-5 right-4) */}
      <FloatingMobileContact />
    </div>
  );
}
