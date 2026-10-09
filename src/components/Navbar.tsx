import React, { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { LanguageDropdown } from './LanguageDropdown';
import { RotatingCoinLogo } from './RotatingCoinLogo';
import { useLanguage } from '../i18n/LanguageContext';
import { Realistic3DIcon, Realistic3DIconType } from './Realistic3DIcon';

interface NavbarProps {
  onOpenTradeModal: () => void;
  onOpenWhitePaper: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTradeModal,
  onOpenWhitePaper
}) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Array<{
    label: string;
    href: string;
    action: (() => void) | null;
    isWhitepaper?: boolean;
    iconType: Realistic3DIconType;
  }> = [
    { label: t.nav.about, href: '#about', action: null, iconType: 'blte' },
    { label: t.nav.bitcoin_education, href: '#bitcoin-education', action: null, iconType: 'bitcoin' },
    { label: t.nav.token, href: '#token', action: null, iconType: 'token-supply' },
    { label: t.nav.tokenomics, href: '#tokenomics', action: null, iconType: 'liquidity' },
    { label: t.nav.how_to_buy, href: '#how-to-buy', action: null, iconType: 'acquisition' },
    { label: t.nav.whitepaper, href: '#whitepaper', action: onOpenWhitePaper, isWhitepaper: true, iconType: 'contract' },
    { label: t.nav.roadmap, href: '#roadmap', action: null, iconType: 'roadmap' },
    { label: t.nav.transparency, href: '#transparency', action: null, iconType: 'transparency' },
    { label: t.nav.faq, href: '#faq', action: null, iconType: 'verification' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-4">
        {/* Zone 1: Brand Wordmark with 3D Rotating Coin Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 sm:gap-3 text-[#080808] hover:text-[#B8661B] transition-colors shrink min-w-0 group select-none py-1"
          title="Bitcoin Lite Edition Home"
        >
          <RotatingCoinLogo size={28} className="shrink-0" />
          <span className="text-sm sm:text-base font-black tracking-tight font-display text-[#080808] group-hover:text-[#B8661B] transition-colors truncate">
            {TOKEN_CONFIG.name.toUpperCase()}
          </span>
        </a>

        {/* Zone 2: Clean Desktop Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-medium text-[#4A4A4A]">
          {navLinks.map((link) => {
            if (link.action) {
              return (
                <button
                  key={link.label}
                  onClick={(e) => {
                    e.preventDefault();
                    link.action!();
                  }}
                  className="hover:text-[#080808] transition-colors py-1 hover:underline underline-offset-4 decoration-[#B8661B]/70 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                >
                  {link.isWhitepaper && <BookOpen className="w-3.5 h-3.5 text-[#B8661B]" />}
                  <span>{link.label}</span>
                </button>
              );
            }
            return (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#080808] transition-colors py-1 hover:underline underline-offset-4 decoration-[#B8661B]/70 whitespace-nowrap"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Controls (Buy/Trade, Language, and Hamburger Menu Button on Desktop and Mobile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenTradeModal}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-mono font-bold text-white bg-[#111111] hover:bg-[#B8661B] rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
          >
            {t.hero.btn_buy_trade}
          </button>
          
          <LanguageDropdown />

          {/* Hamburger Menu Toggle Button — Displayed on Desktop, Tablet, and Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 sm:p-2.5 text-[#080808] hover:text-[#B8661B] hover:bg-[#FAF8F5] focus-visible:ring-2 focus-visible:ring-[#B8661B] rounded-[14px] border border-[#EAB308]/10 hover:border-[#B8661B]/30 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            title={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2.5]" />
            )}
            <span className="hidden md:inline text-[11px] font-mono font-bold uppercase tracking-wider text-[#4A4A4A]">
              {mobileMenuOpen ? 'CLOSE' : 'MENU'}
            </span>
          </button>
        </div>
      </div>

      {/* Responsive Menu Drawer (Desktop & Mobile) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 top-16 sm:top-18 bg-black/20 backdrop-blur-xs z-30 transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative z-40 border-b border-[#E5E5E5] bg-white px-4 sm:px-8 pt-4 pb-8 shadow-[0_16px_40px_rgba(0,0,0,0.12)] animate-in slide-in-from-top-2 duration-150 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F0F0F0]">
                <div className="text-xs font-mono font-bold tracking-[2.5px] uppercase text-[#B8661B]">
                  {TOKEN_CONFIG.name.toUpperCase()} · ECOSYSTEM DIRECTORY
                </div>
                <div className="text-[11px] font-mono text-[#888888]">
                  SUPPLY: {TOKEN_CONFIG.shortSupply}
                </div>
              </div>

              {/* Navigation Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-6">
                {navLinks.map((link) => {
                  if (link.action) {
                    return (
                      <button
                        key={link.label}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          link.action!();
                        }}
                        className="text-left p-3 rounded-[16px] bg-[#FAF5EF] hover:bg-[#F2E8DC] border border-[#E9C9A5]/60 flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <Realistic3DIcon type={link.iconType} size="sm" />
                          <span className="text-sm font-bold text-[#B8661B]">{link.label}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#B8661B] bg-white/80 px-2 py-0.5 rounded">PDF</span>
                      </button>
                    );
                  }
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-[16px] hover:bg-[#F7F7F7] border border-transparent hover:border-[#E5E5E5] text-sm font-medium text-[#4A4A4A] hover:text-[#080808] flex items-center justify-between transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Realistic3DIcon type={link.iconType} size="sm" />
                        <span className="font-semibold">{link.label}</span>
                      </div>
                      <span className="text-xs text-[#CCCCCC] group-hover:text-[#B8661B] transition-colors">→</span>
                    </a>
                  );
                })}
              </div>

              {/* Actions & Staking Banner */}
              <div className="pt-4 border-t border-[#E5E5E5] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-center">
                <a
                  href={TOKEN_CONFIG.stakingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 text-xs font-bold text-white bg-[#B8661B] hover:bg-[#964E10] rounded-[14px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_2px_8px_rgba(184,102,27,0.2)] text-center"
                  title="Stake BLTE (40% APY)"
                >
                  <span>STAKE BITCOIN LITE EDITION</span>
                  <span className="text-[10px] font-sans font-extrabold px-1.5 py-0.5 rounded-full bg-black/25 text-amber-200 border border-amber-300/30 leading-none">
                    40% APY
                  </span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTradeModal();
                  }}
                  className="py-3 px-4 text-xs font-bold text-white bg-[#111111] hover:bg-[#B8661B] rounded-[14px] transition-colors text-center cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
                >
                  {t.hero.btn_buy_trade}
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWhitePaper();
                  }}
                  className="py-3 px-4 text-xs font-bold text-[#111111] dark:text-[#FFFFFF] hover:text-[#B8661B] bg-[#FCFCFC] dark:bg-[#18181D] hover:bg-[#FAF5EF] dark:hover:bg-[#222228] border border-[#D9D9D9] dark:border-[#333339] hover:border-[#E9C9A5] rounded-[14px] transition-colors text-center cursor-pointer flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#B8661B]" />
                  <span>{t.hero.btn_whitepaper}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
