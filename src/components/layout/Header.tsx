import React from 'react';
import { Flame, Zap, Volume2, VolumeX, Menu, Plus } from 'lucide-react';
import { useNavora } from '../../context/useNavora';
import { RankBadge } from '../ui/ShinobiBadge';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onOpenCreateMission: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, onOpenCreateMission }) => {
  const { user, isSoundMuted, toggleSound } = useNavora();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-shinobi-800/80 bg-shinobi-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-shinobi-850 focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl bg-shinobi-900 border border-chakra-500/50 flex items-center justify-center shadow-chakra-sm group">
              <span className="text-chakra-400 font-hud font-extrabold text-xl tracking-tighter group-hover:scale-110 transition-transform">
                ⚡
              </span>
              <div className="absolute -inset-0.5 rounded-xl border border-chakra-400/20 animate-pulse pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-hud font-extrabold text-xl tracking-wider bg-gradient-to-r from-white via-slate-100 to-chakra-300 bg-clip-text text-transparent">
                  NAVORA
                </span>
                <span className="hidden sm:inline-block font-mono text-[9px] px-1.5 py-0.5 rounded bg-chakra-500/10 border border-chakra-500/30 text-chakra-300 uppercase">
                  OS v1.0
                </span>
              </div>
              <p className="hidden md:block text-[10px] text-slate-400 tracking-wide">
                Your life. Organized. Evolved.
              </p>
            </div>
          </div>
        </div>

        {/* Center / Right: HUD Status & User Metrics */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Daily Streak Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-shinobi-900/80 border border-amberSeal-500/30 text-amberSeal-300 text-xs font-mono shadow-[0_0_10px_rgba(245,158,11,0.15)]">
            <Flame size={14} className="text-amberSeal-400 animate-pulse" />
            <span className="font-bold">{user.streak}</span>
            <span className="hidden sm:inline text-slate-400 text-[10px]">DAYS</span>
          </div>

          {/* Chakra Energy Bar Gauge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-shinobi-900/80 border border-chakra-500/30 text-xs font-mono shadow-chakra-sm">
            <Zap size={14} className="text-chakra-400" />
            <div className="w-16 h-1.5 rounded-full bg-shinobi-950 overflow-hidden border border-chakra-500/20">
              <div
                className="h-full bg-gradient-to-r from-[#2D4A3E] to-[#3A5A40] shadow-[0_0_12px_rgba(58,90,64,0.35)]"
                style={{ width: `${user.chakraEnergy}%` }}
              />
            </div>
            <span className="text-chakra-300 font-semibold text-[11px]">{user.chakraEnergy}%</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isSoundMuted ? 'Unmute Jutsu Audio' : 'Mute Jutsu Audio'}
            className="p-2 rounded-xl border border-shinobi-750 bg-shinobi-900/60 text-slate-400 hover:text-chakra-300 hover:border-chakra-500/40 transition shadow-sm"
            title={isSoundMuted ? 'Enable Sound Effects' : 'Mute Sound Effects'}
          >
            {isSoundMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Quick Mission Creation Button */}
          <button
            onClick={onOpenCreateMission}
            className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl font-hud font-bold text-xs tracking-wider text-white bg-gradient-to-r from-[#2D4A3E] to-[#3A5A40] hover:from-[#3A5A40] hover:to-[#4F6F52] transition shadow-[0_0_14px_rgba(58,90,64,0.35)] border border-[#9CA3AF]/30"
          >
            <Plus size={14} />
            <span>NEW MISSION</span>
          </button>

          {/* User Profile Capsule */}
          <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-shinobi-800">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-shinobi-900 to-shinobi-800 border border-chakra-500/40 flex items-center justify-center font-hud font-bold text-sm text-chakra-300 shadow-chakra-sm">
              {user.name.slice(0, 1)}
            </div>
            <div className="hidden lg:block text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-100 tracking-wide font-hud">
                  {user.name}
                </span>
                <span className="font-mono text-[10px] text-chakra-400 font-semibold">
                  Lv.{user.level}
                </span>
              </div>
              <div className="mt-0.5">
                <RankBadge rank={user.rank} size="sm" showIcon={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
