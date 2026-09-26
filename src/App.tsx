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

// Code-split heavy Resume modal
const ResumeModal = lazy(() => import('./components/ResumeModal'));

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241F1C] font-sans relative selection:bg-[#FFD3C4] selection:text-[#3B1E12]">
      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Subtle Micro-Interaction Cursor Sparkle Particle Effect */}
      <SubtlePeachSparkles />

      {/* Sticky Header Navigation */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Landmark */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero onOpenResume={() => setResumeOpen(true)} />

        {/* About Section */}
        <About />

        {/* 1. What I Build Section (Immediately after About) */}
        <WhatIBuild />

        {/* 2. Currently Exploring Marquee Strip (Right above Skills) */}
        <CurrentlyExploring />

        {/* Skills Section */}
        <Skills />

        {/* Experience Section */}
        <Experience />

        {/* Featured Projects Section with Enhanced Filters */}
        <Projects />

        {/* 5. Building In Public (GitHub Repositories) Section */}
        <BuildingInPublic />

        {/* Certifications Section */}
        <Certifications />

        {/* Workshops & Activities Section */}
        <Workshops />

        {/* 4. Beyond Code Section (Immediately after Workshops & Activities) */}
        <BeyondCode />

        {/* Education Section */}
        <Education />

        {/* 3. My Roadmap Section */}
        <Roadmap />

        {/* 7. Final Call to Action ("Have an idea? Let's build it.") */}
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

      {/* Floating Contact Button — Mobile Devices Only */}
      <FloatingMobileContact />
    </div>
  );
}
