import React from 'react';

interface ChakraBarProps {
  value: number;
  max: number;
  variant?: 'chakra' | 'flame' | 'amber' | 'emerald';
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const ChakraBar: React.FC<ChakraBarProps> = ({
  value,
  max,
  variant = 'chakra',
  showLabel = true,
  label,
  size = 'md',
  animated = true,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const variantConfig = {
    chakra: {
      bar: 'bg-gradient-to-r from-cyan-500 via-chakra-400 to-chakra-300',
      glow: 'shadow-[0_0_15px_rgba(0,240,255,0.4)]',
      text: 'text-chakra-300',
      bg: 'bg-shinobi-900 border-chakra-500/20',
    },
    flame: {
      bar: 'bg-gradient-to-r from-rose-600 via-flame-500 to-rose-400',
      glow: 'shadow-[0_0_15px_rgba(255,42,95,0.4)]',
      text: 'text-flame-300',
      bg: 'bg-shinobi-900 border-flame-500/20',
    },
    amber: {
      bar: 'bg-gradient-to-r from-amber-600 via-amberSeal-500 to-amber-300',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.4)]',
      text: 'text-amber-300',
      bg: 'bg-shinobi-900 border-amberSeal-500/20',
    },
    emerald: {
      bar: 'bg-gradient-to-r from-emerald-600 via-leaf-500 to-emerald-300',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.4)]',
      text: 'text-leaf-300',
      bg: 'bg-shinobi-900 border-leaf-500/20',
    },
  };

  const current = variantConfig[variant];

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full space-y-1.5">
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-400 uppercase tracking-wider">{label || 'Progression'}</span>
          <span className={`font-semibold ${current.text}`}>
            {value} <span className="text-slate-500">/ {max} XP</span> ({percentage}%)
          </span>
        </div>
      )}
      <div
        className={`w-full overflow-hidden rounded-full border p-0.5 backdrop-blur-sm ${current.bg} ${heightClasses[size]}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out relative ${current.bar} ${current.glow}`}
          style={{ width: `${percentage}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          )}
        </div>
      </div>
    </div>
  );
};
