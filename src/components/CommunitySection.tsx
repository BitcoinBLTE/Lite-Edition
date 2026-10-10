import React from 'react';
import { Mail } from 'lucide-react';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  InstagramIcon, 
  XTwitterIcon, 
  GithubIcon, 
  DiscordIcon 
} from './PlatformIcons';

export const CommunitySection: React.FC = () => {
  const { t } = useLanguage();
  // Filter active channels that have verified links
  const activeSocials = TOKEN_CONFIG.socials.filter((s) => s.url !== null);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] mb-3 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.community.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-[#080808] font-display tracking-tight text-balance leading-[1.15]">
            {t.community.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#4A4A4A] font-[450] leading-[1.8] text-balance">
            {t.community.subtitle}
          </p>
        </div>

        {/* Clean Socials Display: Icon Logo then Name, No Container, No Extra Explanation */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5 sm:gap-x-10 sm:gap-y-6 pt-2">
          {activeSocials.map((social) => {
            const isTwitter = social.id === 'twitter';
            const isGithub = social.id === 'github';
            const isInstagram = social.id === 'instagram';
            const isDiscord = social.id === 'discord';
            const isEmail = social.id === 'email';
            const isMailto = social.url?.startsWith('mailto:');

            return (
              <a
                key={social.id}
                href={social.url!}
                target={isMailto ? undefined : '_blank'}
                rel={isMailto ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-2.5 text-[#080808] hover:text-[#B8661B] transition-colors py-1 group cursor-pointer"
                title={social.label}
              >
                <span className="shrink-0 text-[#080808] group-hover:text-[#B8661B] transition-all group-hover:scale-110">
                  {isTwitter && <XTwitterIcon size={22} />}
                  {isDiscord && <DiscordIcon size={22} />}
                  {isGithub && <GithubIcon size={22} />}
                  {isInstagram && <InstagramIcon size={22} />}
                  {isEmail && <Mail className="w-5.5 h-5.5" />}
                </span>
                <span className="text-base sm:text-lg font-bold font-display tracking-tight group-hover:underline underline-offset-4">
                  {social.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

