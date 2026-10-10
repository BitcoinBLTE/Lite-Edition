import React from 'react';
import { ShieldCheck, Activity, Coins, Trophy, Database } from 'lucide-react';
import { TOKEN_CONFIG } from '../config/tokenConfig';

export const WhitePaperExploreMetrics: React.FC = () => {
  return (
    <div className="space-y-6 my-6">
      {/* Intro Overview */}
      <div className="p-5 rounded-[18px] bg-[#FAF5EF] dark:bg-[#1C150E] border border-[#E9C9A5]/60 dark:border-[#B8661B]/30 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B8661B] uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>Section 04 · Protocol Exploration & Activity Metrics</span>
        </div>
        <p className="text-sm text-[#4A4A4A] dark:text-[#D4D4D8] leading-relaxed">
          Bitcoin Lite Edition implements a verifiable, deterministic token supply model on the high-throughput Solana blockchain. The protocol is designed with zero inflation, permanently revoked authorities, and automated on-chain telemetry.
        </p>
      </div>

      {/* 4 Protocol Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Market */}
        <div className="p-4 rounded-[16px] bg-[#FCFCFC] dark:bg-[#16161B] border border-[#E5E5E5] dark:border-[#282830] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0F0F0] dark:border-[#222228]">
            <span className="text-xs font-mono font-bold text-[#B8661B] uppercase">Market</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FAF5EF] text-[#B8661B]">DEX</span>
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
              <span className="font-mono font-bold text-[#16A34A]">Live Sync</span>
            </div>
          </div>
        </div>

        {/* Card 2: Staking */}
        <div className="p-4 rounded-[16px] bg-[#FCFCFC] dark:bg-[#16161B] border border-[#E5E5E5] dark:border-[#282830] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0F0F0] dark:border-[#222228]">
            <span className="text-xs font-mono font-bold text-[#B8661B] uppercase">Staking</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FAF5EF] text-[#B8661B]">ESCROW</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#888888]">Staking APR</span>
              <span className="font-mono font-bold text-[#B8661B]">11.61%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Liquid</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">135,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Native</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">135,000</span>
            </div>
          </div>
        </div>

        {/* Card 3: Game */}
        <div className="p-4 rounded-[16px] bg-[#FCFCFC] dark:bg-[#16161B] border border-[#E5E5E5] dark:border-[#282830] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0F0F0] dark:border-[#222228]">
            <span className="text-xs font-mono font-bold text-[#B8661B] uppercase">Game</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 font-bold">SOON</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#888888]">Total rewards</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Participation</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Game rewards</span>
              <span className="font-mono font-bold text-[#B8661B]">220,000</span>
            </div>
          </div>
        </div>

        {/* Card 4: Supply */}
        <div className="p-4 rounded-[16px] bg-[#FCFCFC] dark:bg-[#16161B] border border-[#E5E5E5] dark:border-[#282830] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0F0F0] dark:border-[#222228]">
            <span className="text-xs font-mono font-bold text-[#B8661B] uppercase">Supply</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FAF5EF] text-[#B8661B]">SOLANA</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#888888]">Circulating</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">1,100,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Max Supply</span>
              <span className="font-mono font-bold text-[#080808] dark:text-white">2,100,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Inflation Rate</span>
              <span className="font-mono font-bold text-[#16A34A]">0.00% (Hard Capped)</span>
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
          <li><strong>Game Rewards Reserve:</strong> 220,000 BLTE is reserved for decentralized gaming mechanics and leaderboard distributions.</li>
          <li><strong>Public Transparency:</strong> All circulating tokens and contracts are verifiable via public Solana block explorers.</li>
        </ul>
      </div>
    </div>
  );
};
