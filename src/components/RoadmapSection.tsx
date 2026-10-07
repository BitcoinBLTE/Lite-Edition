import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { TOKEN_CONFIG, RoadmapMilestone } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';
import { Realistic3DIcon, Realistic3DIconType } from './Realistic3DIcon';

export const RoadmapSection: React.FC = () => {
  const { t } = useLanguage();
  const roadmap3DTypes: Realistic3DIconType[] = ['foundation', 'launch', 'ecosystem', 'expansion'];

  const getStatusBadge = (status: RoadmapMilestone['status']) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#166534]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>{t.roadmap.status.completed}</span>
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#B8661B]">
            <span className="w-2 h-2 rounded-full bg-[#B8661B] animate-pulse" />
            <span>{t.roadmap.status.in_progress}</span>
          </span>
        );
      case 'UPCOMING':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#888888]">
            <Clock className="w-3.5 h-3.5" />
            <span>{t.roadmap.status.upcoming}</span>
          </span>
        );
    }
  };

  const phases = t.roadmap.phases.map((phase, idx) => {
    const rawStatus = TOKEN_CONFIG.roadmap[idx]?.status || 'UPCOMING';
    return {
      ...phase,
      status: rawStatus,
    };
  });

  return (
    <section id="roadmap" className="py-20 md:py-28 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] mb-3.5 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.roadmap.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] font-display tracking-tight text-balance leading-[1.15]">
            {t.roadmap.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4A4A] font-[450] leading-[1.8] text-balance">
            {t.roadmap.subtitle}
          </p>
        </div>

        {/* 4-Stage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, idx) => (
            <div
              key={phase.title}
              className={`bg-[#FCFCFC] rounded-[28px] sm:rounded-[36px] p-7 sm:p-8 border flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:border-[#D0D0D0] hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] transition-all ${
                phase.status === 'IN_PROGRESS'
                  ? 'border-2 border-[#B8661B] shadow-[0_4px_24px_rgba(184,102,27,0.08)]'
                  : 'border-[#E5E5E5]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Realistic3DIcon type={roadmap3DTypes[idx] || 'foundation'} size="sm" />
                    <span className="text-xs font-mono font-bold text-[#888888] uppercase tracking-wider">
                      {t.roadmap.stage} 0{idx + 1}
                    </span>
                  </div>
                  {getStatusBadge(phase.status)}
                </div>

                <h3 className="text-lg font-[800] text-[#080808] font-display tracking-tight mb-2">
                  {phase.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#4A4A4A] font-[450] mb-6 leading-[1.75]">
                  {phase.description}
                </p>

                <ul className="space-y-2.5">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#080808] font-medium">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                        phase.status === 'COMPLETED'
                          ? 'bg-[#16A34A]'
                          : phase.status === 'IN_PROGRESS'
                          ? 'bg-[#B8661B]'
                          : 'bg-[#CCCCCC]'
                      }`} />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-[11px] font-mono text-[#888888]">
                <span>{t.roadmap.verified_milestones}</span>
                <span>{phase.items.length} {t.roadmap.items_suffix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
