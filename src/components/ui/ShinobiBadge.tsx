import type { UserRank, MissionDifficulty } from '../../types';

interface RankBadgeProps {
  rank: UserRank;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RankBadge: React.FC<RankBadgeProps> = ({ rank, size = 'md', showIcon = true }) => {
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
          glow: 'shadow-[0_0_12px_rgba(16,185,129,0.2)]',
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
        <span className="font-mono opacity-80 text-[10px] bg-black/40 px-1 py-0.2 rounded border border-white/10">
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

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, size = 'md' }) => {
  const getStyles = () => {
    switch (difficulty) {
      case 'D-Rank':
        return 'border-leaf-500/30 bg-leaf-500/10 text-leaf-300 shadow-[0_0_8px_rgba(16,185,129,0.15)]';
      case 'C-Rank':
        return 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.15)]';
      case 'B-Rank':
        return 'border-blue-500/30 bg-blue-500/10 text-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.2)]';
      case 'A-Rank':
        return 'border-purple-500/40 bg-purple-500/10 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]';
      case 'S-Rank':
        return 'border-flame-500/50 bg-flame-500/15 text-flame-300 shadow-[0_0_15px_rgba(255,42,95,0.25)] font-bold';
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
