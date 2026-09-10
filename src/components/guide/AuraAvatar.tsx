import React from 'react';
import type { GuideMood } from '../../types/guide';
import auraImage from '../../assets/aura/aura.jpeg';

export interface AuraAvatarProps {
  mood?: GuideMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showHalo?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
};

const moodGlows: Record<GuideMood, string> = {
  gentle:
    'shadow-[0_0_12px_rgba(168,85,247,0.35)] ring-purple-500/30',
  encouraging:
    'shadow-[0_0_18px_rgba(192,132,252,0.5)] ring-purple-400/50',
  focused:
    'shadow-[0_0_14px_rgba(34,211,238,0.4)] ring-cyan-400/40',
  firm:
    'shadow-[0_0_14px_rgba(99,102,241,0.4)] ring-indigo-500/40',
};

export const AuraAvatar: React.FC<AuraAvatarProps> = ({
  mood = 'gentle',
  size = 'md',
  showHalo = false,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${
        sizeClasses[size] || sizeClasses.md
      } ${className}`}
      aria-label={`AURA AI Companion (${mood} mood)`}
    >
      {showHalo && (
        <div
          className="absolute inset-0 rounded-full animate-pulse pointer-events-none blur-md opacity-80"
          style={{
            background:
              'radial-gradient(circle, rgba(192, 132, 252, 0.6) 0%, rgba(129, 140, 248, 0.25) 55%, rgba(79, 70, 229, 0) 100%)',
            transform: 'scale(1.28)',
          }}
        />
      )}

      <div
        className={`relative w-full h-full rounded-full overflow-hidden p-[1px] ring-1 transition-all duration-300 bg-slate-950 ${
          moodGlows[mood] || moodGlows.gentle
        }`}
      >
        <img
          src={auraImage}
          alt="AURA AI Companion"
          className="w-full h-full object-cover rounded-full pointer-events-none select-none transition-transform duration-300"
          style={{
            objectPosition: '68% 28%',
          }}
        />
      </div>
    </div>
  );
};

export default AuraAvatar; 
