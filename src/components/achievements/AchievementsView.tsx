import React from 'react';
import { Trophy, Sparkles, Check, Lock } from 'lucide-react';
import { useNavora } from '../../context/useNavora';

export const AchievementsView: React.FC = () => {
  const { achievements } = useNavora();

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const totalXpRewards = achievements
    .filter((a) => a.isUnlocked)
    .reduce((acc, a) => acc + a.xpReward, 0);

  return (
    <div data-tutorial="achievements-view" className="space-y-6 animate-fadeIn pb-16 lg:pb-8">
      {/* Header Banner */}
      <div className="hud-panel rounded-2xl p-6 border-amberSeal-500/40 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-amberSeal-400 uppercase tracking-widest flex items-center gap-1.5">
              <Trophy size={14} />
              <span>HONOR & RECOGNITION</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-hud tracking-wide text-white">
              SHINOBI ACHIEVEMENTS & SEALS
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Milestones unlocked through persistent tactical execution and disciplined progression.
            </p>
          </div>

          {/* Unlocked Stats */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-shinobi-950/80 border border-shinobi-800">
            <div className="text-center">
              <div className="text-xs font-mono text-slate-500 uppercase">Unlocked</div>
              <div className="text-xl font-bold font-hud text-amberSeal-400">
                {unlockedCount} / {achievements.length}
              </div>
            </div>
            <div className="w-px h-8 bg-shinobi-800" />
            <div className="text-center">
              <div className="text-xs font-mono text-slate-500 uppercase">Honor XP</div>
              <div className="text-xl font-bold font-hud text-chakra-300">
                +{totalXpRewards} XP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`hud-panel rounded-2xl p-5 transition-all duration-300 ${
              ach.isUnlocked
                ? 'border-amberSeal-500/40 bg-amberSeal-950/10 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                : 'border-shinobi-800/80 bg-shinobi-900/40 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  ach.isUnlocked
                    ? 'bg-amberSeal-500/20 text-amberSeal-400 border border-amberSeal-500/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'bg-shinobi-950 text-slate-600 border border-shinobi-800'
                }`}
              >
                {ach.isUnlocked ? <Trophy size={24} /> : <Lock size={22} />}
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-shinobi-950 border border-chakra-500/20 text-chakra-300 text-xs font-mono font-bold">
                <Sparkles size={12} className="text-chakra-400" />
                <span>+{ach.xpReward} XP</span>
              </div>
            </div>

            <h4 className="font-hud font-bold text-base text-white tracking-wide">{ach.title}</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ach.description}</p>

            <div className="mt-4 pt-3 border-t border-shinobi-800/80 flex items-center justify-between text-[11px] font-mono">
              <span className="uppercase text-slate-500">Tier: {ach.category}</span>
              {ach.isUnlocked ? (
                <span className="text-leaf-400 font-semibold flex items-center gap-1">
                  <Check size={12} />
                  <span>Unlocked</span>
                </span>
              ) : (
                <span className="text-slate-600 flex items-center gap-1">
                  <Lock size={12} />
                  <span>Locked</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
