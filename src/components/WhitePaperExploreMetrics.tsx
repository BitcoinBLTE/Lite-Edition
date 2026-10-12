import React from 'react';
import { ShieldCheck, Activity, Coins, Trophy, Database } from 'lucide-react';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';

export const WhitePaperExploreMetrics: React.FC = () => {
  const { t } = useLanguage();
  const exp = t.modals?.explore_modal;

  return (
    <div className="space-y-6 my-6">
      {/* Intro Overview */}
      <div className="p-5 rounded-[18px] bg-[#FAF5EF] dark:bg-[#1C150E] border border-[#E9C9A5]/60 dark:border-[#B8661B]/30 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B8661B] uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>{exp?.section_tag || 'EXPLORE PROTOCOL'} · {exp?.section_title || 'Protocol Exploration & Activity Metrics'}</span>
        </div>
        <p className="text-sm text-[#4A4A4A] dark:text-[#D4D4D8] leading-relaxed">
          {exp?.section_desc || 'Bitcoin Lite Edition implements a verifiable, deterministic token supply model on the high-throughput Solana blockchain. The protocol is designed with zero inflation, permanently revoked authorities, and automated on-chain telemetry.'}
        </p>
      </div>

      {/* 4 Protocol Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Market */}
        <div className="p-4 rounded-[16px] bg-[#FCFCFC] dark:bg-[#16161B] border border-[#E5E5E5] dark:border-[#282830] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0F0F0] dark:border-[#222228]">
            <span className="text-xs font-mono font-bold text-[#B8661B] uppercase">{exp?.card_market || 'Market'}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FAF5EF] text-[#B8661B]">{exp?.badge_dex || 'DEX'}</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#888888]">Status</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">Genesis Pool</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Pricing Pair</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">BLTE / SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Telemetry</span>
              <span className="font-mono font-bold text-[#16A34A]">{exp?.live_sync_active || 'Live Sync'}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Staking */}
        <div className="p-4 rounded-[16px] bg-[#FCFCFC] dark:bg-[#16161B] border border-[#E5E5E5] dark:border-[#282830] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0F0F0] dark:border-[#222228]">
            <span className="text-xs font-mono font-bold text-[#B8661B] uppercase">{exp?.card_staking || 'Staking'}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FAF5EF] text-[#B8661B]">{exp?.badge_escrow || 'ESCROW'}</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#888888]">Staking {exp?.apr || 'APR'}</span>
              <span className="font-mono font-bold text-[#B8661B]">11.61%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">{exp?.liquid || 'Liquid'}</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">{exp?.native || 'Native'}</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">$0.00</span>
            </div>
          </div>
        </div>

        {/* Card 3: Game */}
        <div className="p-4 rounded-[16px] bg-[#FCFCFC] dark:bg-[#16161B] border border-[#E5E5E5] dark:border-[#282830] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0F0F0] dark:border-[#222228]">
            <span className="text-xs font-mono font-bold text-[#B8661B] uppercase">{exp?.card_game || 'Game'}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 font-bold">{exp?.badge_coming_soon || 'SOON'}</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#888888]">{exp?.total_rewards || 'Total rewards'}</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">{exp?.participation_count || 'Participation'}</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">{exp?.game_rewards || 'Game rewards'}</span>
              <span className="font-mono font-bold text-[#B8661B]">$0.00</span>
            </div>
          </div>
        </div>

        {/* Card 4: Supply */}
        <div className="p-4 rounded-[16px] bg-[#FCFCFC] dark:bg-[#16161B] border border-[#E5E5E5] dark:border-[#282830] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0F0F0] dark:border-[#222228]">
            <span className="text-xs font-mono font-bold text-[#B8661B] uppercase">{exp?.card_supply || 'Supply'}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FAF5EF] text-[#B8661B]">{exp?.badge_network || 'SOLANA'}</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#888888]">{exp?.circulating || 'Circulating'}</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">2,100,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">{exp?.non_circulatory || 'Non circulatory'}</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">{exp?.max_supply || 'Max Supply'}</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">2,100,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Inflation Rate</span>
              <span className="font-mono font-bold text-[#16A34A]">0.00% ({exp?.zero_inflation || 'Hard Capped'})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory Technical Notes */}
      <div className="p-4 rounded-[16px] bg-white dark:bg-[#121215] border border-[#E5E5E5] dark:border-[#222228] text-xs text-[#555555] dark:text-[#A1A1AA] leading-relaxed space-y-2">
        <div className="font-mono font-bold text-[#080808] dark:text-white">
          Architectural Verification & Auditable Invariants:
        </div>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Zero Additional Minting:</strong> Mint authority was irrevocably revoked upon SPL genesis. No entity can create additional BLTE tokens.</li>
          <li><strong>Streamflow Staking Escrow:</strong> Staking rewards are locked within non-custodial smart contracts and distributed according to fixed APY schedules.</li>
          <li><strong>Mathematical Allocation:</strong> 70% Fair Launch (1,470,000 BLTE) and 30% Liquidity Pool (630,000 BLTE) with 2,100,000 hard cap.</li>
          <li><strong>Public Transparency:</strong> All circulating tokens and contracts are verifiable via public Solana block explorers.</li>
        </ul>
      </div>
    </div>
  );
};
