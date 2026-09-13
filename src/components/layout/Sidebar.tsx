import React from 'react';
import { 
  LayoutDashboard, 
  Scroll, 
  Calendar, 
  FolderKanban, 
  FileText, 
  Award, 
  BarChart3, 
  Bot, 
  Settings,
  Sparkles
} from 'lucide-react';
import type { NavigationTab } from '../../types';
import { useNavora } from '../../context/useNavora';
import { RankBadge } from '../ui/ShinobiBadge';
import { ChakraBar } from '../ui/ChakraBar';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile = false, onCloseMobile }) => {
  const { activeTab, setActiveTab, user } = useNavora();

  const navItems: { id: NavigationTab; label: string; icon: React.FC<{ size?: number; className?: string }>; badge?: string }[] = [
    { id: 'command-center', label: 'Command Center', icon: LayoutDashboard },
    { id: 'missions', label: 'Missions Board', icon: Scroll, badge: 'ACTIVE' },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'notes', label: 'Scroll Archive', icon: FileText },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'statistics', label: 'Tactical Stats', icon: BarChart3 },
    { id: 'ai-companion', label: 'AURA', icon: Bot, badge: 'AI' },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-shinobi-950/95 border-r border-shinobi-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)] ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation list */}
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Section: Operational Matrix */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-mono tracking-widest text-slate-500 uppercase flex items-center gap-1.5">
              <Sparkles size={11} className="text-chakra-400" />
              <span>OPERATING SYSTEM</span>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-hud font-semibold text-sm tracking-wide transition-all group ${
                      isActive
                        ? 'bg-chakra-500/15 border border-chakra-500/40 text-chakra-300 shadow-chakra-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-shinobi-850/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={`transition-colors ${
                          isActive ? 'text-chakra-400' : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase ${
                          item.badge === 'ACTIVE'
                            ? 'bg-leaf-500/15 border-leaf-500/40 text-leaf-300'
                            : 'bg-chakra-500/10 border-chakra-500/30 text-chakra-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Profile Card (Prominently displays NAVIN, Level 1, Academy Student) */}
        <div className="p-4 border-t border-shinobi-800/80 bg-shinobi-900/50">
          <div className="hud-panel rounded-xl p-3.5 space-y-3 border-chakra-500/30">
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />

            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl bg-shinobi-950 border border-chakra-400/50 flex items-center justify-center font-hud font-black text-lg text-chakra-300 shadow-chakra-sm">
                <span>{user.name.slice(0, 1)}</span>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-leaf-500 border-2 border-shinobi-950 flex items-center justify-center text-[9px] text-shinobi-950 font-bold">
                  ✓
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-hud font-bold text-sm tracking-wider text-white truncate">
                    {user.name}
                  </h4>
                  <span className="text-xs font-mono font-bold text-chakra-400">
                    Lv.{user.level}
                  </span>
                </div>
                <div className="mt-1">
                  <RankBadge rank={user.rank} size="sm" />
                </div>
              </div>
            </div>

            {/* Quick XP Bar */}
            <div className="pt-1">
              <ChakraBar
                value={user.currentXp}
                max={user.xpToNextLevel}
                size="sm"
                label="EXP LEVEL"
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
