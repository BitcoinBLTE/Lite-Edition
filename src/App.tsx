import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BitcoinIntroSection } from './components/BitcoinIntroSection';
import { AboutSection } from './components/AboutSection';
import { BitcoinEducationSection } from './components/BitcoinEducationSection';
import { ScarcityComparison } from './components/ScarcityComparison';
import { TokenOverview } from './components/TokenOverview';
import { TokenomicsSection } from './components/TokenomicsSection';
import { HowToBuySection } from './components/HowToBuySection';
import { MarketSection } from './components/MarketSection';
import { TransparencySection } from './components/TransparencySection';
import { WhySolanaSection } from './components/WhySolanaSection';
import { RoadmapSection } from './components/RoadmapSection';
import { CommunitySection } from './components/CommunitySection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BuyTradeModal } from './components/BuyTradeModal';
import { LegalModal } from './components/LegalModals';
import { WhitePaperModal } from './components/WhitePaperModal';
import { BitcoinEducationModal } from './components/BitcoinEducationModal';
import { LanguageProvider } from './i18n/LanguageContext';
import { ThemeProvider } from './theme/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { useRotatingFavicon } from './hooks/useRotatingFavicon';

export default function App() {
  useRotatingFavicon();
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [whitePaperOpen, setWhitePaperOpen] = useState(false);
  const [educationModalOpen, setEducationModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);

  // Listen for hash URLs for direct navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#whitepaper') {
        setWhitePaperOpen(true);
      } else if (hash === '#education' || hash === '#genesis-guide') {
        setEducationModalOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const scrollToTokenOverview = () => {
    const el = document.getElementById('token');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEducation = () => {
    const el = document.getElementById('bitcoin-education');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white text-[#080808] flex flex-col transition-colors duration-200 selection:bg-[#FAF5EF] selection:text-[#B8661B] relative">
          {/* Navigation Bar with Multilingual Language Selector and BUY/TRADE CTA */}
          <Navbar
            onOpenTradeModal={() => setTradeModalOpen(true)}
            onOpenWhitePaper={() => setWhitePaperOpen(true)}
          />

          {/* Main Content Sections - All Preserved & Enhanced */}
          <main className="flex-grow">
            {/* Hero Section with Interactive Thin 3D Coin & Primary/Secondary CTAs */}
            <HeroSection
              onOpenTradeModal={() => setTradeModalOpen(true)}
              onExploreToken={scrollToTokenOverview}
              onOpenWhitePaper={() => setWhitePaperOpen(true)}
            />

            {/* Bitcoin Introduction: A New Chapter in the Digital Asset Landscape */}
            <BitcoinIntroSection
              onLearnMore={scrollToEducation}
              onOpenEducationModal={() => setEducationModalOpen(true)}
            />

            {/* About Section: What Is Bitcoin Lite Edition */}
            <AboutSection />

          {/* Comprehensive Bitcoin Education & Genesis of Bitcoin Lite Edition */}
          <BitcoinEducationSection
            onOpenWhitePaper={() => setWhitePaperOpen(true)}
            onOpenEducationModal={() => setEducationModalOpen(true)}
          />

          {/* Scarcity Matrix: Bitcoin -> Bitcoin Lite Edition -> Solana */}
          <ScarcityComparison />

          {/* Token Overview Dashboard */}
          <TokenOverview />

          {/* Tokenomics with Interactive Allocation Chart */}
          <TokenomicsSection />

          {/* 7-Step Acquisition Guide & Security Advisory */}
          <HowToBuySection
            onOpenTradeModal={() => setTradeModalOpen(true)}
          />

          {/* Market Section (Zero-Mock Policy) */}
          <MarketSection
            onOpenTradeModal={() => setTradeModalOpen(true)}
          />

          {/* Transparency: Verify Everything On-Chain */}
          <TransparencySection />

          {/* Why Solana Infrastructure */}
          <WhySolanaSection />

          {/* Four-Stage Roadmap */}
          <RoadmapSection />

          {/* Community & Anti-Phishing Advisory */}
          <CommunitySection />

          {/* Frequently Asked Questions */}
          <FaqSection />
        </main>

        {/* Footer with Legal Disclaimers & White Paper access */}
        <Footer
          onOpenTradeModal={() => setTradeModalOpen(true)}
          onOpenWhitePaper={() => setWhitePaperOpen(true)}
          onOpenTermsModal={() => setLegalModalType('terms')}
          onOpenPrivacyModal={() => setLegalModalType('privacy')}
        />

        {/* Modals & Draggable Panels (All Movable with Close Button Icons) */}
        <BuyTradeModal
          isOpen={tradeModalOpen}
          onClose={() => setTradeModalOpen(false)}
        />

        <WhitePaperModal
          isOpen={whitePaperOpen}
          onClose={() => setWhitePaperOpen(false)}
        />

        <BitcoinEducationModal
          isOpen={educationModalOpen}
          onClose={() => setEducationModalOpen(false)}
          onOpenWhitePaper={() => setWhitePaperOpen(true)}
        />

        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />

        {/* Tiny clickable theme toggle icon at the bottom */}
        <ThemeToggle floating={true} />
      </div>
    </LanguageProvider>
  </ThemeProvider>
);
}
