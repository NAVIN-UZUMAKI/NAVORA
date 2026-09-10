import React from 'react';
import { LayoutDashboard, Scroll, Award, BarChart3, Plus } from 'lucide-react';
import type { NavigationTab } from '../../types';
import { useNavora } from '../../context/useNavora';

interface MobileNavProps {
  onOpenCreateMission: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenCreateMission }) => {
  const { activeTab, setActiveTab } = useNavora();

  const tabs: { id: NavigationTab; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
    { id: 'command-center', label: 'Command', icon: LayoutDashboard },
    { id: 'missions', label: 'Missions', icon: Scroll },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'statistics', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden border-t border-shinobi-800/80 bg-shinobi-950/90 backdrop-blur-xl px-2 py-1.5 flex items-center justify-around">
      {tabs.slice(0, 2).map((t) => {
        const Icon = t.icon;
        const isActive = activeTab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-hud font-semibold tracking-wider transition ${
              isActive ? 'text-chakra-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon size={18} />
            <span className="mt-0.5">{t.label}</span>
          </button>
        );
      })}

      {/* Floating Center Action Button */}
      <button
        onClick={onOpenCreateMission}
        className="relative -top-2 w-11 h-11 rounded-full bg-gradient-to-br from-[#c2410c] to-[#f97316] text-white flex items-center justify-center shadow-[0_0_16px_rgba(249,115,22,0.5)] border border-[#9CA3AF]/40 active:scale-95 transition"
        aria-label="Create Mission"
      >
        <Plus size={20} className="stroke-[2.5]" />
      </button>

      {tabs.slice(2).map((t) => {
        const Icon = t.icon;
        const isActive = activeTab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-hud font-semibold tracking-wider transition ${
              isActive ? 'text-chakra-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon size={18} />
            <span className="mt-0.5">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};
