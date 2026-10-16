import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Realistic3DIcon } from './Realistic3DIcon';

export const ScarcityComparison: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#080808] scroll-mt-16 transition-colors border-t border-[#EAE6DF] dark:border-[#1E1E26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] dark:text-[#EAB308] mb-3.5 flex items-center justify-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.scarcity.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] dark:text-white font-display tracking-tight text-balance leading-[1.15]">
            {t.scarcity.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] text-balance">
            {t.scarcity.description}
          </p>
        </div>

        {/* Visual Flow: Bitcoin -> Bitcoin Lite Edition -> Solana */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center space-y-4">
            {/* Step 1: Bitcoin */}
            <div className="w-full bg-white dark:bg-[#121217] rounded-[28px] sm:rounded-[36px] p-7 sm:p-9 border-2 border-[#D8D1C4] dark:border-[#282836] shadow-[0_6px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <Realistic3DIcon type="bitcoin" size="md" className="mt-1" />
                <div className="space-y-1.5">
                  <div className="text-xs font-mono font-bold tracking-[2.5px] text-[#64748B] dark:text-[#94A3B8] uppercase">
                    {t.scarcity.step1_kicker}
                  </div>
                  <h3 className="text-2xl font-[800] text-[#080808] dark:text-white font-display">
                    {t.scarcity.step1_title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.7]">
                    {t.scarcity.step1_desc}
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <div className="text-2xl sm:text-3xl font-mono font-[800] text-[#080808] dark:text-white tabular-nums">
                  21.M
                </div>
                <div className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider font-semibold">
                  {t.scarcity.step1_stat_label}
                </div>
              </div>
            </div>

            {/* Transition Arrow 1 */}
            <div className="flex flex-col items-center justify-center my-0.5 text-[#B8661B]">
              <div className="w-0.5 h-6 bg-[#D8D1C4] dark:bg-[#2A2A36]" />
              <ArrowDown className="w-5 h-5 text-[#B8661B] dark:text-[#F59E0B] stroke-[2] -mt-1" />
            </div>

            {/* Step 2: Bitcoin Lite Edition (Marquee Hero Box in Burnt Copper) */}
            <div className="w-full bg-[#FAF5EF] dark:bg-[#18130E] rounded-[28px] sm:rounded-[36px] p-7 sm:p-9 border-2 border-[#B8661B] dark:border-[#F59E0B] shadow-[0_8px_32px_rgba(184,102,27,0.14)] dark:shadow-[0_8px_32px_rgba(245,158,11,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative overflow-hidden">
              <div className="flex items-start gap-4 relative z-10">
                <Realistic3DIcon type="blte" size="lg" className="mt-1" />
                <div className="space-y-1.5">
                  <div className="text-xs font-mono font-bold tracking-[2.5px] text-[#B8661B] dark:text-[#EAB308] uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B8661B] dark:bg-[#EAB308] inline-block animate-pulse" />
                    <span>{t.scarcity.step2_kicker}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-[900] text-[#080808] dark:text-white font-display tracking-tight">
                    {t.scarcity.step2_title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] font-[450] max-w-md leading-[1.7]">
                    {t.scarcity.step2_desc}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0 relative z-10">
                <div className="text-3xl sm:text-4xl font-mono font-[900] text-[#B8661B] dark:text-[#F59E0B] tabular-nums">
                  2.1M
                </div>
                <div className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8] uppercase font-bold tracking-wider">
                  {t.scarcity.step2_stat_label}
                </div>
              </div>
            </div>

            {/* Transition Arrow 2 */}
            <div className="flex flex-col items-center justify-center my-0.5 text-[#B8661B]">
              <div className="w-0.5 h-6 bg-[#D8D1C4] dark:bg-[#2A2A36]" />
              <ArrowDown className="w-5 h-5 text-[#B8661B] dark:text-[#F59E0B] stroke-[2] -mt-1" />
            </div>

            {/* Step 3: Solana */}
            <div className="w-full bg-white dark:bg-[#121217] rounded-[28px] sm:rounded-[36px] p-7 sm:p-9 border-2 border-[#D8D1C4] dark:border-[#282836] shadow-[0_6px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <Realistic3DIcon type="solana" size="md" className="mt-1" />
                <div className="space-y-1.5">
                  <div className="text-xs font-mono font-bold tracking-[2.5px] text-[#080808] dark:text-white uppercase">
                    {t.scarcity.step3_kicker}
                  </div>
                  <h3 className="text-2xl font-[800] text-[#080808] dark:text-white font-display flex items-center gap-2">
                    <span>{t.scarcity.step3_title}</span>
                    <span className="text-sm font-mono font-medium text-[#64748B] dark:text-[#94A3B8] tracking-normal">
                      · {t.scarcity.step3_layer}
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.7]">
                    {t.scarcity.step3_desc}
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <div className="text-lg sm:text-xl font-mono font-bold text-[#080808] dark:text-white">
                  {t.scarcity.step3_stat1}
                </div>
                <div className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider">
                  {t.scarcity.step3_stat2}
                </div>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Matrix: Rounded Editorial Card */}
          <div className="mt-14 bg-white dark:bg-[#121217] rounded-[32px] sm:rounded-[38px] border-2 border-[#D8D1C4] dark:border-[#282836] shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
            <div className="p-7 sm:p-8 border-b-2 border-[#D8D1C4] dark:border-[#282836] bg-[#FAF8F5] dark:bg-[#15151B] flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-[2.5px] text-[#B8661B] dark:text-[#EAB308]">
                  {t.scarcity.matrix_kicker}
                </div>
                <h4 className="text-xl font-[800] text-[#080808] dark:text-white font-display mt-1">
                  {t.scarcity.matrix_title}
                </h4>
              </div>
              <Realistic3DIcon type="verification" size="sm" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="matrix-header-row border-b-2 border-[#D8D1C4] dark:border-[#282836] text-[#080808] dark:text-white font-mono font-bold uppercase tracking-[1.5px]">
                    <th className="py-4 px-5 sm:px-8">{t.scarcity.col_parameter}</th>
                    <th className="py-4 px-5 sm:px-8">{t.scarcity.col_btc}</th>
                    <th className="py-4 px-5 sm:px-8 text-[#B8661B] dark:text-[#F59E0B]">{t.scarcity.col_ble}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8D1C4] dark:divide-[#282836]">
                  {t.scarcity.rows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 1 ? 'matrix-row-alt' : 'matrix-row-default'}>
                      <td className="py-4 px-5 sm:px-8 font-bold text-[#080808] dark:text-white">
                        {row.metric}
                      </td>
                      <td className="py-4 px-5 sm:px-8 text-[#475569] dark:text-[#94A3B8] font-[450]">
                        {row.bitcoin}
                      </td>
                      <td className="py-4 px-5 sm:px-8 font-bold text-[#B8661B] dark:text-[#F59E0B] matrix-col-highlight">
                        {row.ble}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
