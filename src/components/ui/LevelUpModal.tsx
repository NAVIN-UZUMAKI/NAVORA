import React from 'react';
import { Sparkles, Trophy, ArrowUpRight, Zap, X } from 'lucide-react';
import { RankBadge } from './ShinobiBadge';
import type { UserRank } from '../../types';

interface LevelUpModalProps {
  isOpen: boolean;
  level: number;
  rank: UserRank;
  rankPromoted: boolean;
  levelsGained: number;
  xpAdded: number;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  level,
  rank,
  rankPromoted,
  levelsGained,
  xpAdded,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Glow aura */}
      <div className="absolute w-96 h-96 bg-chakra-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-chakra" />
      {rankPromoted && (
        <div className="absolute w-[30rem] h-[30rem] bg-flame-500/15 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className="relative w-full max-w-md hud-panel rounded-2xl p-6 sm:p-8 text-center border-chakra-500/50 shadow-chakra">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
        >
          <X size={20} />
        </button>

        {/* Insignia Icon */}
        <div className="relative mx-auto mb-4 w-20 h-20 rounded-2xl bg-gradient-to-tr from-shinobi-900 to-shinobi-800 border-2 border-chakra-400/60 flex items-center justify-center shadow-chakra">
          {rankPromoted ? (
            <Trophy className="w-10 h-10 text-amberSeal-400 animate-bounce" />
          ) : (
            <Zap className="w-10 h-10 text-chakra-400 animate-pulse" />
          )}
          <div className="absolute -inset-1 rounded-2xl border border-chakra-400/30 animate-ping opacity-30 pointer-events-none" />
        </div>

        {/* Title */}
        <div className="space-y-1 mb-6">
          <span className="text-xs uppercase font-mono tracking-widest text-chakra-400 flex items-center justify-center gap-1.5">
            <Sparkles size={14} />
            {rankPromoted ? 'SHINOBI PROMOTION ACHIEVED' : 'CHAKRA CAPACITY EXPANDED'}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white font-hud">
            {rankPromoted ? 'RANK ELEVATION' : `LEVEL ${level} REACHED!`}
          </h2>
          <p className="text-sm text-slate-400">
            {rankPromoted
              ? 'You have broken through your threshold and ascended to a higher shinobi tier!'
              : `Earned +${xpAdded} XP. Your discipline continues to forge your legend.`}
          </p>
        </div>

        {/* Rank Badge Showcase */}
        <div className="p-4 rounded-xl bg-shinobi-950/70 border border-shinobi-700/60 mb-6 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase">Current Official Standing</div>
          <div className="flex justify-center">
            <RankBadge rank={rank} size="lg" />
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Level Multiplier: <span className="text-chakra-300 font-semibold">{level}x Focus</span>
            {levelsGained > 1 && (
              <span className="text-leaf-400 ml-2">(+{levelsGained} Levels Gained!)</span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#2D4A3E] via-[#3A5A40] to-[#DC2626]/80 hover:from-[#3A5A40] hover:via-[#4F6F52] hover:to-[#EF4444] transition-all shadow-[0_0_18px_rgba(58,90,64,0.45)] border border-[#9CA3AF]/30 font-hud tracking-wider text-base flex items-center justify-center gap-2 group"
        >
          <span>EMBRACE NEW POWER</span>
          <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};
