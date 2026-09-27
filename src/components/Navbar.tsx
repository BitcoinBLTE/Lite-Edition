import React, { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { LanguageDropdown } from './LanguageDropdown';
import { RotatingCoinLogo } from './RotatingCoinLogo';
import { useLanguage } from '../i18n/LanguageContext';

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

  const navLinks = [
    { label: t.nav.about, href: '#about', action: null },
    { label: t.nav.bitcoin_education, href: '#bitcoin-education', action: null },
    { label: t.nav.token, href: '#token', action: null },
    { label: t.nav.tokenomics, href: '#tokenomics', action: null },
    { label: t.nav.how_to_buy, href: '#how-to-buy', action: null },
    { label: t.nav.whitepaper, href: '#whitepaper', action: onOpenWhitePaper, isWhitepaper: true },
    { label: t.nav.roadmap, href: '#roadmap', action: null },
    { label: t.nav.transparency, href: '#transparency', action: null },
    { label: t.nav.faq, href: '#faq', action: null }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark with 3D Rotating Coin Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-[#080808] hover:text-[#B8661B] transition-colors shrink min-w-0 group select-none"
          title="Bitcoin Lite Edition Home"
        >
          <RotatingCoinLogo size={26} className="shrink-0" />
          <span className="text-sm sm:text-base font-extrabold tracking-tight font-display text-[#080808] group-hover:text-[#B8661B] transition-colors truncate">
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

        {/* Zone 3: Desktop Right Controls */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenTradeModal}
            className="px-4 py-2 text-xs font-mono font-bold text-white bg-[#111111] hover:bg-[#B8661B] rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
          >
            {t.hero.btn_buy_trade}
          </button>
          <LanguageDropdown />
        </div>

        {/* Mobile Header Elements */}
        <div className="flex items-center gap-2 sm:hidden shrink-0">
          <LanguageDropdown />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#080808] hover:text-[#B8661B] focus-visible:ring-2 focus-visible:ring-[#B8661B] rounded-[12px] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E5E5E5] bg-white px-4 pt-3 pb-6 space-y-4 shadow-[0_12px_30px_rgba(0,0,0,0.08)] animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              if (link.action) {
                return (
                  <button
                    key={link.label}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      link.action!();
                    }}
                    className="w-full text-left px-3.5 py-2.5 text-sm font-semibold text-[#B8661B] hover:bg-[#FAF5EF] rounded-[12px] flex items-center justify-between transition-colors"
                  >
                    <span>{link.label}</span>
                    <BookOpen className="w-4 h-4 text-[#B8661B]" />
                  </button>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 text-sm font-medium text-[#4A4A4A] hover:text-[#080808] hover:bg-[#F7F7F7] rounded-[12px] transition-colors"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-[#E5E5E5]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTradeModal();
              }}
              className="w-full py-3 text-xs font-bold text-white bg-[#111111] hover:bg-[#B8661B] rounded-[14px] transition-colors text-center cursor-pointer"
            >
              {t.hero.btn_buy_trade}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
