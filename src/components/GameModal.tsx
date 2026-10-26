import React from 'react';
import { Gamepad2, Clock, Trophy, Users, Coins, Sparkles } from 'lucide-react';
import { DraggableModal } from './DraggableModal';
import { useLanguage } from '../i18n/LanguageContext';
import { Game3DVisual } from './3d/Game3DVisual';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenExplore?: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({
  isOpen,
  onClose,
  onOpenExplore
}) => {
  const { t } = useLanguage();
  const gm = t.modals?.game_modal;

  return (
    <DraggableModal
      isOpen={isOpen}
      onClose={onClose}
      title={gm?.title || 'GAME'}
      subtitle={gm?.subtitle || 'Interactive Protocol Gaming Module'}
      maxWidthClass="max-w-lg w-full"
      ariaLabelledBy="game-modal-title"
      footer={
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#FCFCFC] dark:bg-[#121215] border-t border-[#E5E5E5] dark:border-[#222228] flex items-center justify-between gap-3">
          {onOpenExplore && (
            <button
              onClick={() => {
                onClose();
                onOpenExplore();
              }}
              className="text-xs font-bold text-[#B8661B] hover:text-[#964E10] dark:text-[#EAB308] flex items-center gap-1.5 cursor-pointer py-1 min-w-0"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{gm?.btn_explore_stats || 'Explore Protocol Stats'}</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#111111] hover:bg-[#B8661B] rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all cursor-pointer ml-auto shrink-0"
          >
            {t.common.close}
          </button>
        </div>
      }
    >
      <div className="p-4 sm:p-6 text-center space-y-5 sm:space-y-6">
        {/* 3D Cyber-Arcade Console with Animated Flying Falcon (Borderless, No Container) */}
        <div className="w-full h-44 sm:h-52 relative">
          <Game3DVisual className="w-full h-full" />
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-mono font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 animate-pulse text-[#B8661B]" />
            <span>{gm?.badge_coming_soon || 'Coming Soon'}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-[900] text-[#080808] dark:text-white font-display tracking-tight">
            {gm?.game_title || 'Bitcoin Lite Edition Game'}
          </h3>
          <p className="text-xs sm:text-sm text-[#666666] dark:text-[#A1A1AA] max-w-sm mx-auto leading-relaxed">
            {gm?.description || 'The decentralized interactive gaming ecosystem is currently under development. Compete, participate, and claim verified on-chain rewards.'}
          </p>
        </div>

        {/* Live Metrics Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-1">
          <div className="p-2 sm:p-3.5 rounded-[16px] sm:rounded-[18px] bg-[#FAF5EF]/60 dark:bg-[#16161C] border border-[#EAB308]/15 text-center flex flex-col justify-between min-w-0">
            <div className="text-[9px] sm:text-[10px] font-mono text-[#888888] dark:text-[#A1A1AA] uppercase font-bold mb-1 leading-tight line-clamp-2">
              {gm?.total_rewards || 'Total Rewards'}
            </div>
            <div className="text-sm sm:text-lg font-mono font-black text-[#080808] dark:text-white tabular-nums truncate">
              0
            </div>
          </div>

          <div className="p-2 sm:p-3.5 rounded-[16px] sm:rounded-[18px] bg-[#FAF5EF]/60 dark:bg-[#16161C] border border-[#EAB308]/15 text-center flex flex-col justify-between min-w-0">
            <div className="text-[9px] sm:text-[10px] font-mono text-[#888888] dark:text-[#A1A1AA] uppercase font-bold mb-1 leading-tight line-clamp-2">
              {gm?.participants || 'Participants'}
            </div>
            <div className="text-sm sm:text-lg font-mono font-black text-[#080808] dark:text-white tabular-nums truncate">
              0
            </div>
          </div>

          <div className="p-2 sm:p-3.5 rounded-[16px] sm:rounded-[18px] bg-[#FAF5EF]/60 dark:bg-[#16161C] border border-[#EAB308]/15 text-center flex flex-col justify-between min-w-0">
            <div className="text-[9px] sm:text-[10px] font-mono text-[#888888] dark:text-[#A1A1AA] uppercase font-bold mb-1 leading-tight line-clamp-2">
              {gm?.game_rewards || 'Game Rewards'}
            </div>
            <div className="text-sm sm:text-lg font-mono font-black text-[#B8661B] dark:text-[#EAB308] tabular-nums truncate">
              $0.00
            </div>
          </div>
        </div>

        {/* Information Notice */}
        <div className="rounded-[16px] bg-[#FAF5EF] dark:bg-[#18181D] border border-[#E9C9A5]/50 dark:border-[#B8661B]/20 p-4 text-left space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B8661B] dark:text-[#EAB308]">
            <Trophy className="w-3.5 h-3.5" />
            <span>{gm?.reward_notice_title || 'Dedicated Reward Allocation'}</span>
          </div>
          <p className="text-xs text-[#555555] dark:text-[#A1A1AA] leading-relaxed">
            {gm?.reward_notice_desc || 'Protocol gaming bounties, leaderboard competitions, and verified player participation reward telemetry.'}
          </p>
        </div>
      </div>
    </DraggableModal>
  );
};
