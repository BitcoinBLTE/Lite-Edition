import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { TOKEN_CONFIG, RoadmapMilestone } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';
import { Realistic3DIcon, Realistic3DIconType } from './Realistic3DIcon';
import { Roadmap3DVisual } from './3d/Roadmap3DVisual';

export const RoadmapSection: React.FC = () => {
  const { t } = useLanguage();
  const roadmap3DTypes: Realistic3DIconType[] = ['roadmap', 'fair-launch', 'ecosystem', 'expansion'];

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
    <section id="roadmap" className="py-20 md:py-28 bg-[#FAF8F5]/60 dark:bg-[#0A0A0E] scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] dark:text-[#EAB308] mb-3.5 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.roadmap.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] dark:text-white font-display tracking-tight text-balance leading-[1.15]">
            {t.roadmap.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] text-balance">
            {t.roadmap.subtitle}
          </p>
        </div>

        {/* 3D Chronological Milestone Obelisks & Pipeline Pathway Showcase (Borderless, No Container) */}
        <div className="w-full h-[300px] sm:h-[360px] lg:h-[400px] mb-12 relative">
          <Roadmap3DVisual className="w-full h-full" />
        </div>

        {/* 4-Stage Grid with Topic Progression Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {phases.map((phase, idx) => (
            <div
              key={phase.title}
              className={`relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                phase.status === 'IN_PROGRESS'
                  ? 'bg-[#FAF5EF] dark:bg-[#1A1510] shadow-[0_12px_36px_rgba(184,102,27,0.14)] dark:shadow-[0_12px_36px_rgba(245,158,11,0.22)] animate-scarcity-glow'
                  : 'bg-white/95 dark:bg-[#121217]/95 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_36px_rgba(184,102,27,0.08)]'
              }`}
            >
              {/* Topic Animation: Sequential Pipeline Beam on In-Progress Phase */}
              {phase.status === 'IN_PROGRESS' && (
                <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#B8661B] via-[#EAB308] to-[#B8661B] animate-pipeline-flow" />
              )}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Realistic3DIcon type={roadmap3DTypes[idx] || 'foundation'} size="sm" />
                    <span className="text-xs font-mono font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider">
                      {t.roadmap.stage} 0{idx + 1}
                    </span>
                  </div>
                  {getStatusBadge(phase.status)}
                </div>

                <h3 className="text-lg font-[800] text-[#080808] dark:text-white font-display tracking-tight mb-2">
                  {phase.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] font-[450] mb-6 leading-[1.75]">
                  {phase.description}
                </p>

                <ul className="space-y-2.5">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#080808] dark:text-[#E2E8F0] font-medium">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                        phase.status === 'COMPLETED'
                          ? 'bg-[#16A34A] dark:bg-[#4ADE80]'
                          : phase.status === 'IN_PROGRESS'
                          ? 'bg-[#B8661B] dark:bg-[#F59E0B]'
                          : 'bg-[#CCCCCC] dark:bg-[#4B5563]'
                      }`} />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
