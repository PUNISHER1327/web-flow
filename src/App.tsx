import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useLenis } from './hooks/useLenis';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { ProgramModal } from './components/ProgramModal';
import { AuthModal } from './components/AuthModal';

// All 12 sections in exact specified order
import { Hero } from './sections/Hero';
import { Stats } from './sections/Stats';
import { Manifesto } from './sections/Manifesto';
import { WhyIronvault } from './sections/WhyIronvault';
import { TrainingPrograms } from './sections/TrainingPrograms';
import { HowItWorks } from './sections/HowItWorks';
import { Dashboard } from './sections/Dashboard';
import { Stories } from './sections/Stories';
import { Gallery } from './sections/Gallery';
import { FAQ } from './sections/FAQ';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';

import type { TrainingProgram } from './types';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const { scrollTo } = useLenis();

  // Modals state
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');

  const handleStartTraining = () => {
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  const handleLogin = () => {
    setAuthMode('login');
    setIsAuthOpen(true);
  };

  const handleExplorePrograms = () => {
    scrollTo('#programs', { offset: -60 });
  };

  const handleExplorePlatform = () => {
    scrollTo('#dashboard', { offset: -60 });
  };

  const handleEnrollProgram = (_program: TrainingProgram) => {
    setSelectedProgram(null);
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-background text-text-primary selection:bg-accent selection:text-black">
      {/* 4% Subtle Grain Texture Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Top Reading Progress Indicator */}
      <ScrollProgress />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* 1. Floating Headroom Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onStartTraining={handleStartTraining}
        onLogin={handleLogin}
      />

      <main>
        {/* 2. Hero — The Training Experience */}
        <Hero
          onStartTraining={handleStartTraining}
          onExplorePrograms={handleExplorePrograms}
        />

        {/* 3. Performance Stats */}
        <Stats />

        {/* 4. Manifesto — Consistency Beats Motivation */}
        <Manifesto />

        {/* 5. Why IRONVAULT — Asymmetric Bento Grid */}
        <WhyIronvault />

        {/* 6. Training Programs — Horizontally Pinned Catalogue */}
        <TrainingPrograms onSelectProgram={setSelectedProgram} />

        {/* 7. How It Works — Sticky Left, 4 Scroll Steps */}
        <HowItWorks onExplorePlatform={handleExplorePlatform} />

        {/* 8. The Training Dashboard — Key SaaS Product Preview */}
        <Dashboard />

        {/* 9. Member Stories — Stacked Sticky Cards */}
        <Stories />

        {/* 10. Training Gallery — Asymmetric Masonry Parallax */}
        <Gallery />

        {/* 11. FAQ — Accessible Animated Accordion */}
        <FAQ />

        {/* 12. Final CTA — Full-width Deep Green with Magnetic Button */}
        <FinalCTA
          onStartTraining={handleStartTraining}
          onExplorePrograms={handleExplorePrograms}
        />
      </main>

      {/* 13. Footer with Giant Wordmark */}
      <Footer
        onSignIn={handleLogin}
        onCreateAccount={handleStartTraining}
      />

      {/* Interactive Curriculum Modal */}
      <ProgramModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onEnroll={handleEnrollProgram}
      />

      {/* Interactive Auth & Onboarding Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}

export default App;
