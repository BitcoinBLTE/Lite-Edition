import React, { useEffect, useState } from 'react';
import { Wallet, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { DraggableModal } from './DraggableModal';
import { WalletState, detectAvailableWallets, fetchSolBalance } from '../services/solanaWalletService';
import { useLanguage } from '../i18n/LanguageContext';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletState: WalletState;
  setWalletState: React.Dispatch<React.SetStateAction<WalletState>>;
  onOpenWallet?: () => void;
}

export const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  isOpen,
  onClose,
  walletState,
  setWalletState,
  onOpenWallet
}) => {
  const { t } = useLanguage();
  const [available, setAvailable] = useState<{ phantom: boolean; solflare: boolean }>({
    phantom: false,
    solflare: false
  });
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);

  const w = t.modals.wallet;
  const titleConnect = w?.title_connect || 'CONNECT SOLANA WALLET';
  const titleConnected = w?.title_connected || 'SOLANA WALLET';
  const subtitle = w?.subtitle || 'Web3 Provider · Movable Panel';
  const footerNote = w?.footer || 'Native Solana Web3 · Zero-Mock Protocol';
  const statusLabel = w?.status || 'Status';
  const connectedLabel = w?.connected || 'Connected';
  const pubAddressLabel = w?.public_address || 'Public Address';
  const solBalanceLabel = w?.sol_balance || 'SOL Balance';
  const disconnectLabel = w?.disconnect || 'Disconnect Wallet';
  const introText = w?.intro || 'Connect your authentic Solana wallet to verify tokens, view on-chain balances, and prepare for decentralized exchange liquidity.';
  const phantomLabel = w?.phantom || 'Phantom Wallet';
  const solflareLabel = w?.solflare || 'Solflare Wallet';
  const detectedLabel = w?.detected || 'Detected in browser';
  const installPhantomLabel = w?.install_phantom || 'Click to install Phantom extension';
  const installSolflareLabel = w?.install_solflare || 'Click to install Solflare extension';
  const readyLabel = w?.ready || 'Ready';

  useEffect(() => {
    if (isOpen) {
      detectAvailableWallets().then(setAvailable);
    }
  }, [isOpen]);

  const connectPhantom = async () => {
    if (!window.solana?.isPhantom) {
      window.open('https://phantom.app/', '_blank', 'noopener,noreferrer');
      return;
    }

    try {
      setConnectingWallet('Phantom');
      const response = await window.solana.connect();
      const pubKey = response.publicKey.toString();
      const solBalance = await fetchSolBalance(pubKey);

      setWalletState({
        connected: true,
        publicKey: pubKey,
        walletName: 'Phantom',
        balanceSol: solBalance,
        isLoading: false,
        error: null
      });
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Connection rejected';
      setWalletState((prev) => ({ ...prev, error: message }));
    } finally {
      setConnectingWallet(null);
    }
  };

  const connectSolflare = async () => {
    if (!window.solflare?.isSolflare) {
      window.open('https://solflare.com/', '_blank', 'noopener,noreferrer');
      return;
    }

    try {
      setConnectingWallet('Solflare');
      await window.solflare.connect();
      const pubKey = window.solflare.publicKey?.toString() || '';
      const solBalance = await fetchSolBalance(pubKey);

      setWalletState({
        connected: true,
        publicKey: pubKey,
        walletName: 'Solflare',
        balanceSol: solBalance,
        isLoading: false,
        error: null
      });
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Connection rejected';
      setWalletState((prev) => ({ ...prev, error: message }));
    } finally {
      setConnectingWallet(null);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (walletState.walletName === 'Phantom' && window.solana) {
        await window.solana.disconnect();
      } else if (walletState.walletName === 'Solflare' && window.solflare) {
        await window.solflare.disconnect();
      }
    } catch {
      // Ignore disconnect errors
    }
    setWalletState({
      connected: false,
      publicKey: null,
      walletName: null,
      balanceSol: null,
      isLoading: false,
      error: null
    });
    onClose();
  };

  return (
    <DraggableModal
      isOpen={isOpen}
      onClose={onClose}
      title={walletState.connected ? titleConnected : titleConnect}
      subtitle={subtitle}
      icon={<Wallet className="w-5 h-5 text-[#B8661B]" />}
      maxWidthClass="max-w-md"
      ariaLabelledBy="wallet-modal-title"
      footer={
        <div className="px-6 py-3.5 bg-[#FCFCFC] border-t border-[#E5E5E5] text-center text-[11px] font-mono text-[#888888]">
          {footerNote}
        </div>
      }
    >
      <div className="p-6 space-y-4">
        {walletState.connected && walletState.publicKey ? (
          <div className="space-y-4">
            <div className="p-5 bg-[#FCFCFC] rounded-[20px] border border-[#E5E5E5] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#888888] uppercase">{statusLabel}</span>
                <span className="text-xs font-mono text-[#166534] flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                  {connectedLabel} ({walletState.walletName})
                </span>
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono text-[#888888] uppercase block">{pubAddressLabel}</span>
                <span className="font-mono text-xs text-[#080808] font-bold break-all">
                  {walletState.publicKey}
                </span>
              </div>

              {walletState.balanceSol !== null && (
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#888888] uppercase">{solBalanceLabel}</span>
                  <span className="font-mono text-xs font-[800] text-[#080808] tabular-nums">
                    {walletState.balanceSol.toFixed(4)} SOL
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={disconnectWallet}
              className="w-full py-3 text-xs font-bold text-[#E11D48] bg-[#FFF1F2] hover:bg-[#FFE4E6] border border-[#FECDD3] rounded-[14px] transition-colors cursor-pointer"
            >
              {disconnectLabel}
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            <p className="text-xs text-[#4A4A4A] leading-[1.8] font-[450]">
              {introText}
            </p>

            {walletState.error && (
              <div className="p-3.5 rounded-[14px] bg-[#FFF1F2] border border-[#FECDD3] text-xs text-[#BE123C] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
                <span>{walletState.error}</span>
              </div>
            )}

            {/* Solflare Button */}
            <button
              onClick={connectSolflare}
              disabled={connectingWallet !== null}
              className="w-full p-4 rounded-[18px] border border-[#E5E5E5] dark:border-[#262630] hover:border-[#D0D0D0] dark:hover:border-[#383844] bg-[#FCFCFC] dark:bg-[#14141A] hover:bg-white dark:hover:bg-[#181820] flex items-center justify-between transition-all text-left group cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-[12px] bg-[#FC7226]/20 flex items-center justify-center font-bold text-[#FC7226] text-lg">
                  ☀️
                </div>
                <div>
                  <span className="text-sm font-[800] text-[#080808] dark:text-white block font-display">
                    {solflareLabel}
                  </span>
                  <span className="text-xs text-[#888888] dark:text-[#94A3B8] block">
                    {available.solflare ? detectedLabel : installSolflareLabel}
                  </span>
                </div>
              </div>

              {connectingWallet === 'Solflare' ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#B8661B]" />
              ) : available.solflare ? (
                <span className="text-xs font-mono text-[#166534] dark:text-[#4ADE80] bg-[#F0FDF4] dark:bg-[#142A1E] border border-[#BBF7D0] dark:border-[#166534] px-2.5 py-1 rounded-[8px] font-bold">
                  {readyLabel}
                </span>
              ) : (
                <ExternalLink className="w-4 h-4 text-[#888888] group-hover:text-[#080808] dark:group-hover:text-white stroke-[2]" />
              )}
            </button>

            {/* Phantom Button */}
            <button
              onClick={connectPhantom}
              disabled={connectingWallet !== null}
              className="w-full p-4 rounded-[18px] border border-[#E5E5E5] dark:border-[#262630] hover:border-[#D0D0D0] dark:hover:border-[#383844] bg-[#FCFCFC] dark:bg-[#14141A] hover:bg-white dark:hover:bg-[#181820] flex items-center justify-between transition-all text-left group cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-[12px] bg-[#AB9FF2]/20 flex items-center justify-center font-bold text-[#5340C6] text-lg">
                  👻
                </div>
                <div>
                  <span className="text-sm font-[800] text-[#080808] dark:text-white block font-display">
                    {phantomLabel}
                  </span>
                  <span className="text-xs text-[#888888] dark:text-[#94A3B8] block">
                    {available.phantom ? detectedLabel : installPhantomLabel}
                  </span>
                </div>
              </div>

              {connectingWallet === 'Phantom' ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#B8661B]" />
              ) : available.phantom ? (
                <span className="text-xs font-mono text-[#166534] dark:text-[#4ADE80] bg-[#F0FDF4] dark:bg-[#142A1E] border border-[#BBF7D0] dark:border-[#166534] px-2.5 py-1 rounded-[8px] font-bold">
                  {readyLabel}
                </span>
              ) : (
                <ExternalLink className="w-4 h-4 text-[#888888] group-hover:text-[#080808] dark:group-hover:text-white stroke-[2]" />
              )}
            </button>

            {/* BLTE Wallet Button (Official Client, Placed after Solflare and Phantom, without Native text) */}
            <button
              onClick={() => {
                onClose();
                if (onOpenWallet) onOpenWallet();
              }}
              className="w-full p-4 rounded-[18px] border-2 border-[#B8661B]/35 dark:border-[#EAB308]/40 bg-gradient-to-r from-[#FAF5EF] to-white dark:from-[#201812] dark:to-[#161622] hover:border-[#B8661B] dark:hover:border-[#EAB308] flex items-center justify-between transition-all text-left group cursor-pointer shadow-[0_4px_16px_rgba(184,102,27,0.10)] hover:shadow-[0_8px_24px_rgba(184,102,27,0.18)]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-[12px] bg-[#B8661B]/15 dark:bg-[#EAB308]/20 flex items-center justify-center font-bold text-[#B8661B] dark:text-[#EAB308] shrink-0">
                  <Wallet className="w-5 h-5 text-[#B8661B] dark:text-[#EAB308]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-[800] text-[#080808] dark:text-white block font-display">
                      BLTE Wallet
                    </span>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FAF5EF] dark:bg-[#1E1610] text-[#B8661B] dark:text-[#EAB308] border border-[#E9C9A5] dark:border-[#B8661B]/40 shrink-0">
                      OFFICIAL WALLET
                    </span>
                  </div>
                  <span className="text-xs text-[#64748B] dark:text-[#94A3B8] block truncate">
                    Bitcoin Lite Edition official client
                  </span>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-[#B8661B] dark:text-[#EAB308] group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                Open →
              </span>
            </button>
          </div>
        )}
      </div>
    </DraggableModal>
  );
};
