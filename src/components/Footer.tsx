import React, { useState } from 'react';
import { Copy, Check, ShieldCheck, BookOpen, Mail, Download } from 'lucide-react';
import { TOKEN_CONFIG, getWhitepaperPdfUrl } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  InstagramIcon, 
  XTwitterIcon, 
  GithubIcon, 
  TelegramIcon, 
  YouTubeIcon,
  DiscordIcon,
  WhatsAppIcon 
} from './PlatformIcons';

interface FooterProps {
  onOpenTradeModal: () => void;
  onOpenWhitePaper: () => void;
  onOpenTermsModal: () => void;
  onOpenPrivacyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTradeModal,
  onOpenWhitePaper,
  onOpenTermsModal,
  onOpenPrivacyModal
}) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopy = () => {
    if (!TOKEN_CONFIG.mintAddress) return;
    navigator.clipboard.writeText(TOKEN_CONFIG.mintAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.bitcoin_education, href: '#bitcoin-education' },
    { label: t.nav.token, href: '#token' },
    { label: t.nav.tokenomics, href: '#tokenomics' },
    { label: t.nav.how_to_buy, href: '#how-to-buy' },
    { label: t.nav.roadmap, href: '#roadmap' },
    { label: t.nav.transparency, href: '#transparency' },
    { label: t.nav.faq, href: '#faq' }
  ];

  const activeSocials = TOKEN_CONFIG.socials.filter((s) => s.url !== null);

  return (
    <footer className="bg-white border-t border-[#E5E5E5] text-[#4A4A4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E5E5E5]">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B8661B] inline-block" />
              <span className="text-xl font-[900] text-[#080808] tracking-tight font-display">
                {TOKEN_CONFIG.name.toUpperCase()}
              </span>
            </div>
            
            <div className="text-xs font-mono font-bold text-[#B8661B] uppercase tracking-[2.5px] flex items-center gap-2">
              <span>{t.footer.brand_sub}</span>
            </div>

            <p className="text-sm text-[#4A4A4A] font-[450] leading-[1.8] max-w-sm">
              {t.footer.mission}
            </p>

            {/* Read White Paper Button */}
            <div className="pt-1">
              <button
                onClick={onOpenWhitePaper}
                className="px-4 py-2 rounded-[14px] bg-[#FAF5EF] hover:bg-[#F2E8DC] text-[#B8661B] border border-[#E9C9A5] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#B8661B]" />
                <span>{t.footer.btn_whitepaper}</span>
              </button>
            </div>

            {/* Social Icons row located directly under the Read White Paper button */}
            <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
              {activeSocials.map((social) => {
                const isMailto = social.url?.startsWith('mailto:');
                return (
                  <a
                    key={social.id}
                    href={social.url!}
                    target={isMailto ? undefined : '_blank'}
                    rel={isMailto ? undefined : 'noopener noreferrer'}
                    className="w-9 h-9 rounded-[12px] bg-[#F5F5F5] hover:bg-[#FAF5EF] border border-[#E5E5E5] hover:border-[#E9C9A5] flex items-center justify-center text-[#080808] hover:text-[#B8661B] transition-colors"
                    aria-label={social.label}
                    title={social.label}
                  >
                    {social.id === 'twitter' && <XTwitterIcon size={15} />}
                    {social.id === 'telegram' && <TelegramIcon size={16} />}
                    {social.id === 'discord' && <DiscordIcon size={16} />}
                    {social.id === 'whatsapp' && <WhatsAppIcon size={16} />}
                    {social.id === 'github' && <GithubIcon size={15} />}
                    {social.id === 'instagram' && <InstagramIcon size={16} />}
                    {social.id === 'youtube' && <YouTubeIcon size={16} />}
                    {social.id === 'email' && <Mail className="w-3.5 h-3.5" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3.5">
            <span className="text-xs font-mono uppercase tracking-[2px] text-[#080808] font-bold block">
              {t.footer.nav_heading}
            </span>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <button
                  onClick={onOpenWhitePaper}
                  className="hover:text-[#080808] text-[#B8661B] font-bold transition-colors py-0.5 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#B8661B]" />
                  <span>{t.footer.whitepaper_v1}</span>
                </button>
              </li>
              <li>
                <a
                  href={getWhitepaperPdfUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4A4A4A] hover:text-[#B8661B] transition-colors py-0.5 inline-flex items-center gap-1.5"
                  title="White Paper Specification (PDF)"
                >
                  <Download className="w-3.5 h-3.5 text-[#B8661B]" />
                  <span>White Paper (PDF)</span>
                </a>
              </li>
              <li>
                <a
                  href={TOKEN_CONFIG.stakingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B8661B] hover:text-[#964E10] font-semibold transition-colors py-0.5 inline-flex items-center gap-1.5"
                  title="Stake (40% APY)"
                >
                  <span>Stake</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#FAF5EF] text-[#B8661B] border border-[#E9C9A5]">
                    40% APY
                  </span>
                </a>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#4A4A4A] hover:text-[#080808] transition-colors py-0.5 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenTermsModal}
                  className="text-[#4A4A4A] hover:text-[#080808] transition-colors py-0.5 inline-block text-left cursor-pointer"
                >
                  {t.footer.terms}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacyModal}
                  className="text-[#4A4A4A] hover:text-[#080808] transition-colors py-0.5 inline-block text-left cursor-pointer"
                >
                  {t.footer.privacy}
                </button>
              </li>
            </ul>
          </div>

          {/* Contract Address Column */}
          <div className="md:col-span-4 space-y-3.5">
            <span className="text-xs font-mono uppercase tracking-[2px] text-[#080808] font-bold block">
              {t.footer.contract_heading}
            </span>

            {TOKEN_CONFIG.mintAddress ? (
              <div className="p-4 bg-[#FCFCFC] rounded-[18px] border border-[#E5E5E5] space-y-2.5">
                <span className="text-[10px] font-mono text-[#888888] font-bold block uppercase tracking-wider">
                  {t.footer.mint_label}
                </span>
                <span className="font-mono text-xs text-[#080808] font-bold break-all block">
                  {TOKEN_CONFIG.mintAddress}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs font-bold text-[#B8661B] hover:text-[#964E10] flex items-center gap-1 mt-1 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>{t.footer.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#B8661B]" />
                      <span>{t.footer.copy_address}</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="p-5 bg-[#FCFCFC] rounded-[18px] border border-[#E5E5E5] text-xs text-[#4A4A4A] space-y-2">
                <span className="font-bold text-[#080808] block text-sm font-display">
                  {t.footer.prelaunch_heading}
                </span>
                <p className="leading-relaxed">
                  {t.footer.prelaunch_desc}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                onClick={onOpenTradeModal}
                className="flex-1 py-3 px-3 text-xs font-bold text-white bg-[#111111] hover:bg-[#B8661B] rounded-[14px] transition-colors cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.05)] text-center"
              >
                {t.footer.btn_buy_trade}
              </button>
              <a
                href={TOKEN_CONFIG.stakingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3.5 text-xs font-bold text-white bg-[#B8661B] hover:bg-[#964E10] rounded-[14px] transition-colors cursor-pointer shadow-[0_2px_8px_rgba(184,102,27,0.25)] flex items-center justify-center gap-1.5 whitespace-nowrap text-center"
                title="Stake BLTE on Streamflow Finance (40% APY)"
              >
                <span>STAKE</span>
                <span className="text-[10px] font-sans font-extrabold px-1.5 py-0.5 rounded-full bg-black/25 text-amber-200 border border-amber-300/30 leading-none">
                  40% APY
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box — Clear Conceptual Distinction & Non-Affiliation Statement */}
        <div className="pt-8 pb-6 border-b border-[#E5E5E5]">
          <div className="p-6 rounded-[24px] bg-[#FCFCFC] border border-[#E5E5E5] text-xs text-[#4A4A4A] leading-[1.8] space-y-2.5">
            <p className="font-bold text-[#080808] uppercase font-mono tracking-[1.5px]">
              {t.about.distinction_title}
            </p>
            <p>
              {t.about.distinction_desc}
            </p>
            <p className="text-[11px] text-[#888888]">
              {t.footer.disclaimer_risk}
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Status */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#888888]">
          <div>
            © {new Date().getFullYear()} Bitcoin Lite Edition. {t.footer.rights}
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 text-[#166534] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              <span>{t.footer.mainnet_pending}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
