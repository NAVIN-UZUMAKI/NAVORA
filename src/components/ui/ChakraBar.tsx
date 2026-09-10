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
  bar: 'bg-gradient-to-r from-[#c2410c] via-[#f97316] to-[#06B6D4]',
  glow: 'shadow-[0_0_15px_rgba(0,240,255,0.45)]',
  text: 'text-[#06B6D4]',
  bg: 'bg-[#111827] border-[#f97316]/40',
},
    flame: {
  bar: 'bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#EF4444]',
  glow: 'shadow-[0_0_15px_rgba(220,38,38,0.4)]',
  text: 'text-[#EF4444]',
  bg: 'bg-[#111827] border-[#DC2626]/25',
},
amber: {
  bar: 'bg-gradient-to-r from-[#8B6B1F] via-[#D4A72C] to-[#E5C65A]',
  glow: 'shadow-[0_0_15px_rgba(212,167,44,0.35)]',
  text: 'text-[#E5C65A]',
  bg: 'bg-[#111827] border-[#D4A72C]/25',
},
emerald: {
  bar: 'bg-gradient-to-r from-[#06B6D4] via-[#00F0FF] to-[#06B6D4]',
  glow: 'shadow-[0_0_15px_rgba(249,115,22,0.4)]',
  text: 'text-[#9CA3AF]',
  bg: 'bg-[#111827] border-[#f97316]/30',
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
