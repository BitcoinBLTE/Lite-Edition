import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  BookOpen, 
  Compass, 
  Coins, 
  ArrowLeftRight, 
  Gamepad2, 
  Info, 
  GraduationCap, 
  CircleDollarSign, 
  CreditCard, 
  Route, 
  ShieldCheck, 
  HelpCircle 
} from 'lucide-react';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { LanguageDropdown } from './LanguageDropdown';
import { RotatingCoinLogo } from './RotatingCoinLogo';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';

interface NavbarProps {
  onOpenTradeModal: () => void;
  onOpenWhitePaper: () => void;
  onOpenExplore: () => void;
  onOpenGame?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTradeModal,
  onOpenWhitePaper,
  onOpenExplore,
  onOpenGame
}) => {
  const { t } = useLanguage();
  const { isBlack } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Desktop navigation links (Tokenomics removed completely and replaced with Explore)
  const desktopNavLinks: Array<{
    label: string;
    href: string;
    action: (() => void) | null;
    isWhitepaper?: boolean;
    isExplore?: boolean;
  }> = [
    { label: 'Explore', href: '#explore', action: onOpenExplore, isExplore: true },
    { label: t.nav.about, href: '#about', action: null },
    { label: t.nav.bitcoin_education, href: '#bitcoin-education', action: null },
    { label: t.nav.token, href: '#token', action: null },
    { label: t.nav.how_to_buy, href: '#how-to-buy', action: null },
    { label: t.nav.whitepaper, href: '#whitepaper', action: onOpenWhitePaper, isWhitepaper: true },
    { label: t.nav.roadmap, href: '#roadmap', action: null },
    { label: t.nav.transparency, href: '#transparency', action: null },
    { label: t.nav.faq, href: '#faq', action: null }
  ];

  // Hamburger Menu: Each button displays its representing icon first, then the label.
  const hamburgerListItems: Array<{
    label: string;
    icon: React.ReactNode;
    badge?: string;
    action?: () => void;
    href?: string;
  }> = [
    {
      label: 'Explore',
      icon: <Compass className="w-5 h-5 shrink-0" />,
      action: () => onOpenExplore()
    },
    {
      label: 'Stake BLTE',
      icon: <Coins className="w-5 h-5 shrink-0" />,
      badge: '11.61%',
      action: () => {
        window.open(TOKEN_CONFIG.stakingUrl, '_blank', 'noopener,noreferrer');
      }
    },
    {
      label: 'Buy/Trade',
      icon: <ArrowLeftRight className="w-5 h-5 shrink-0" />,
      action: () => onOpenTradeModal()
    },
    {
      label: 'Game',
      icon: <Gamepad2 className="w-5 h-5 shrink-0" />,
      action: () => {
        if (onOpenGame) onOpenGame();
      }
    },
    {
      label: 'Read White Paper',
      icon: <BookOpen className="w-5 h-5 shrink-0" />,
      action: () => onOpenWhitePaper()
    },
    {
      label: t.nav.about,
      icon: <Info className="w-5 h-5 shrink-0" />,
      href: '#about'
    },
    {
      label: t.nav.bitcoin_education,
      icon: <GraduationCap className="w-5 h-5 shrink-0" />,
      href: '#bitcoin-education'
    },
    {
      label: t.nav.token,
      icon: <CircleDollarSign className="w-5 h-5 shrink-0" />,
      href: '#token'
    },
    {
      label: t.nav.how_to_buy,
      icon: <CreditCard className="w-5 h-5 shrink-0" />,
      href: '#how-to-buy'
    },
    {
      label: t.nav.roadmap,
      icon: <Route className="w-5 h-5 shrink-0" />,
      href: '#roadmap'
    },
    {
      label: t.nav.transparency,
      icon: <ShieldCheck className="w-5 h-5 shrink-0" />,
      href: '#transparency'
    },
    {
      label: t.nav.faq,
      icon: <HelpCircle className="w-5 h-5 shrink-0" />,
      href: '#faq'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0A0A0E]/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-colors border-b border-[#E5E5E5] dark:border-[#1E1E24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-4">
        {/* Zone 1: Brand Wordmark with Official Coin Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 sm:gap-3 text-[#080808] dark:text-white hover:text-[#B8661B] transition-colors shrink min-w-0 group select-none py-1"
          title="Bitcoin Lite Edition Home"
        >
          <RotatingCoinLogo size={32} className="shrink-0" />
          <span className="text-sm sm:text-base font-black tracking-tight font-display text-[#080808] dark:text-white group-hover:text-[#B8661B] transition-colors truncate">
            {TOKEN_CONFIG.name.toUpperCase()}
          </span>
        </a>

        {/* Zone 2: Clean Desktop Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-medium text-[#4A4A4A] dark:text-[#A1A1AA]">
          {desktopNavLinks.map((link) => {
            if (link.action) {
              return (
                <button
                  key={link.label}
                  onClick={(e) => {
                    e.preventDefault();
                    link.action!();
                  }}
                  className="hover:text-[#080808] dark:hover:text-white transition-colors py-1 hover:underline underline-offset-4 decoration-[#B8661B]/70 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
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
                className="hover:text-[#080808] dark:hover:text-white transition-colors py-1 hover:underline underline-offset-4 decoration-[#B8661B]/70 whitespace-nowrap"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Controls (Buy/Trade, Language, and Hamburger Menu Button) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenTradeModal}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-mono font-bold text-white bg-[#111111] hover:bg-[#B8661B] rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
          >
            {t.hero.btn_buy_trade}
          </button>
          
          <LanguageDropdown />

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 sm:p-2.5 text-[#080808] dark:text-white hover:text-[#B8661B] hover:bg-[#FAF8F5] dark:hover:bg-[#1C150E] focus-visible:ring-2 focus-visible:ring-[#B8661B] rounded-[14px] border border-[#EAB308]/10 hover:border-[#B8661B]/30 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            title={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2.5]" />
            )}
            <span className="hidden md:inline text-[11px] font-mono font-bold uppercase tracking-wider text-[#4A4A4A] dark:text-[#A1A1AA]">
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
            className="fixed inset-0 top-16 sm:top-18 bg-black/30 backdrop-blur-xs z-30 transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content:
              - Each button displays its representing icon first, then the label
          */}
          <div className="relative z-40 border-b border-[#E5E5E5] dark:border-[#1E1E24] bg-white dark:bg-[#0E0E12] px-5 sm:px-8 py-6 shadow-[0_16px_40px_rgba(0,0,0,0.14)] animate-in slide-in-from-top-2 duration-150 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F0F0F0] dark:border-[#222228]">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[2.5px] uppercase text-[#B8661B]">
                  <RotatingCoinLogo size={20} className="shrink-0" />
                  <span>{TOKEN_CONFIG.name.toUpperCase()} · MENU</span>
                </div>
                <div className="text-[11px] font-mono text-[#888888] dark:text-[#71717A]">
                  SUPPLY: {TOKEN_CONFIG.shortSupply}
                </div>
              </div>

              {/* Clean List: Icon then button label */}
              <ul className="divide-y divide-gray-100 dark:divide-zinc-800/60">
                {hamburgerListItems.map((item) => (
                  <li key={item.label}>
                    {item.action ? (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          item.action!();
                        }}
                        className="w-full text-left py-3 sm:py-3.5 text-base sm:text-lg font-bold text-[#111111] dark:text-[#F3F4F6] hover:text-[#B8661B] dark:hover:text-[#EAB308] transition-colors cursor-pointer flex items-center gap-3.5 tracking-tight group"
                      >
                        <span className="text-[#B8661B] dark:text-[#EAB308] group-hover:scale-110 transition-transform">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto text-xs sm:text-sm font-mono font-black px-3 py-1 rounded-full bg-[#FAF5EF] dark:bg-[#1C150E] text-[#B8661B] dark:text-[#EAB308] border border-[#E9C9A5] dark:border-[#B8661B]/40 shadow-xs tracking-tight">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-left py-3 sm:py-3.5 text-base sm:text-lg font-bold text-[#111111] dark:text-[#F3F4F6] hover:text-[#B8661B] dark:hover:text-[#EAB308] transition-colors cursor-pointer flex items-center gap-3.5 tracking-tight group"
                      >
                        <span className="text-[#B8661B] dark:text-[#EAB308] group-hover:scale-110 transition-transform">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
