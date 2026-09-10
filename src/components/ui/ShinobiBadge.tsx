import React from 'react';
import type { UserRank, MissionDifficulty } from '../../types';

interface RankBadgeProps {
  rank: UserRank;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RankBadge: React.FC<RankBadgeProps> = ({
  rank,
  size = 'md',
  showIcon = true,
}) => {
  const getStyles = () => {
    switch (rank) {
      case 'Academy Student':
        return {
          border: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
          glow: 'shadow-none',
          symbol: '学',
        };

      case 'Genin':
        return {
          border: 'border-leaf-500/40 bg-leaf-500/15 text-leaf-300',
          glow: 'shadow-[0_0_12px_rgba(249,115,22,0.2)]',
          symbol: '下',
        };

      case 'Chunin':
        return {
          border: 'border-chakra-500/40 bg-chakra-500/15 text-chakra-300',
          glow: 'shadow-[0_0_15px_rgba(0,240,255,0.25)]',
          symbol: '中',
        };

      case 'Jonin':
        return {
          border: 'border-lightning-500/40 bg-lightning-500/15 text-lightning-300',
          glow: 'shadow-[0_0_15px_rgba(168,85,247,0.25)]',
          symbol: '上',
        };

      case 'Elite Shinobi':
        return {
          border: 'border-amberSeal-500/50 bg-amberSeal-500/15 text-amberSeal-300',
          glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
          symbol: '忍',
        };

      case 'Kage':
        return {
          border: 'border-flame-500/60 bg-flame-500/20 text-flame-300',
          glow: 'shadow-[0_0_25px_rgba(255,42,95,0.35)]',
          symbol: '影',
        };

      default:
        return {
          border: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
          glow: 'shadow-none',
          symbol: '忍',
        };
    }
  };

  const config = getStyles();

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wider font-semibold',
    lg: 'text-sm px-3.5 py-1.5 tracking-widest font-bold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border uppercase backdrop-blur-md transition-all duration-300 ${sizeClasses[size]} ${config.border} ${config.glow}`}
    >
      {showIcon && (
        <span className="font-mono opacity-80 text-[10px] bg-black/40 px-1 py-0.5 rounded border border-white/10">
          {config.symbol}
        </span>
      )}

      <span>{rank}</span>
    </span>
  );
};

interface DifficultyBadgeProps {
  difficulty: MissionDifficulty;
  size?: 'sm' | 'md';
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  difficulty,
  size = 'md',
}) => {
  const getStyles = () => {
    switch (difficulty) {
      case 'D-Rank':
        return 'border-[#fb923c]/50 bg-[#c2410c]/20 text-[#9CA3AF] shadow-[0_0_8px_rgba(249,115,22,0.15)]';

      case 'C-Rank':
        return 'border-[#f97316]/60 bg-[#f97316]/20 text-[#E5E7EB] shadow-[0_0_8px_rgba(249,115,22,0.2)]';

      case 'B-Rank':
        return 'border-[#06B6D4]/40 bg-[#06B6D4]/10 text-[#67E8F9] shadow-[0_0_10px_rgba(6,182,212,0.18)]';

      case 'A-Rank':
        return 'border-[#9CA3AF]/50 bg-[#9CA3AF]/10 text-[#E5E7EB] shadow-[0_0_12px_rgba(156,163,175,0.18)]';

      case 'S-Rank':
        return 'border-[#DC2626]/60 bg-[#DC2626]/15 text-[#EF4444] shadow-[0_0_15px_rgba(220,38,38,0.28)] font-bold';

      default:
        return 'border-slate-500/30 bg-slate-500/10 text-slate-300';
    }
  };

  return (
    <span
      className={`inline-flex items-center font-mono uppercase rounded border px-2 py-0.5 ${
        size === 'sm' ? 'text-[10px]' : 'text-xs font-semibold'
      } ${getStyles()}`}
    >
      {difficulty}
    </span>
  );
};