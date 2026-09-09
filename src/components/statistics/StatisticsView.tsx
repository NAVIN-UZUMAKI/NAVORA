import React from 'react';
import { BarChart3, TrendingUp, Flame, CheckCircle, Zap } from 'lucide-react';
import { useNavora } from '../../context/useNavora';

export const StatisticsView: React.FC = () => {
  const { stats, user } = useNavora();

  const difficultyColors = {
    'D-Rank': { name: 'D-Rank (Entry)', color: 'bg-leaf-400', text: 'text-leaf-300' },
    'C-Rank': { name: 'C-Rank (Moderate)', color: 'bg-cyan-400', text: 'text-cyan-300' },
    'B-Rank': { name: 'B-Rank (Challenging)', color: 'bg-blue-400', text: 'text-blue-300' },
    'A-Rank': { name: 'A-Rank (High Focus)', color: 'bg-purple-400', text: 'text-purple-300' },
    'S-Rank': { name: 'S-Rank (Elite/Legendary)', color: 'bg-rose-400', text: 'text-rose-300' },
  };

  const totalCompleted = stats.completedMissions;

  return (
    <div data-tutorial="statistics-view" className="space-y-6 animate-fadeIn pb-16 lg:pb-8">
      {/* Header */}
      <div className="hud-panel rounded-2xl p-6 border-chakra-500/40 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        <div className="flex items-center gap-3">
          <BarChart3 className="w-7 h-7 text-chakra-400" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-hud tracking-wide text-white">
              TACTICAL PRODUCTIVITY STATISTICS
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Comprehensive telemetry, execution velocity, and RPG progression metrics.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="hud-panel rounded-xl p-4 border-chakra-500/20">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>TOTAL XP HARVESTED</span>
            <TrendingUp size={16} className="text-chakra-400" />
          </div>
          <div className="text-3xl font-hud font-bold text-white mt-2">{user.totalXp} XP</div>
          <div className="text-[11px] font-mono text-slate-500 mt-1">
            Current Level: {user.level} ({user.rank})
          </div>
        </div>

        <div className="hud-panel rounded-xl p-4 border-leaf-500/20">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>COMPLETION RATE</span>
            <CheckCircle size={16} className="text-leaf-400" />
          </div>
          <div className="text-3xl font-hud font-bold text-leaf-300 mt-2">
            {stats.completionRate}%
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1">
            {stats.completedMissions} of {stats.totalMissions} missions finished
          </div>
        </div>

        <div className="hud-panel rounded-xl p-4 border-amberSeal-500/20">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>UNBROKEN STREAK</span>
            <Flame size={16} className="text-amberSeal-400" />
          </div>
          <div className="text-3xl font-hud font-bold text-amberSeal-300 mt-2">
            {user.streak} Days
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1">Daily consistency record</div>
        </div>

        <div className="hud-panel rounded-xl p-4 border-lightning-500/20">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>CHAKRA EFFICIENCY</span>
            <Zap size={16} className="text-lightning-400" />
          </div>
          <div className="text-3xl font-hud font-bold text-lightning-300 mt-2">
            {user.chakraEnergy}%
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1">Operational stamina reserve</div>
        </div>
      </div>

      {/* Difficulty Breakdown Matrix */}
      <div className="hud-panel rounded-2xl p-6 border-shinobi-800 space-y-6">
        <div>
          <h3 className="font-hud font-bold text-lg text-white tracking-wide">
            MISSION TIER EXECUTION BREAKDOWN
          </h3>
          <p className="text-xs text-slate-400">Distribution of executed missions by difficulty rank.</p>
        </div>

        <div className="space-y-4">
          {(['D-Rank', 'C-Rank', 'B-Rank', 'A-Rank', 'S-Rank'] as const).map((diff) => {
            const count = stats.difficultyBreakdown[diff];
            const percent = totalCompleted > 0 ? Math.round((count / totalCompleted) * 100) : 0;
            const meta = difficultyColors[diff];

            return (
              <div key={diff} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className={`font-semibold ${meta.text}`}>{meta.name}</span>
                  <span className="text-slate-400">
                    {count} missions ({percent}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-shinobi-900 overflow-hidden border border-shinobi-800">
                  <div
                    className={`h-full ${meta.color} transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
