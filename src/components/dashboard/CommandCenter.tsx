import React from 'react';
import { 
  Flame, 
  Zap, 
  Award, 
  CheckCircle2, 
  Plus, 
  ArrowRight, 
  TrendingUp, 
  Sparkles,
  Shield,
  Target
} from 'lucide-react';
import { useNavora } from '../../context/useNavora';
import { RankBadge } from '../ui/ShinobiBadge';
import { ChakraBar } from '../ui/ChakraBar';
import { MissionCard } from '../missions/MissionCard';
import { RANKS_HIERARCHY } from '../../services/userRepository';

interface CommandCenterProps {
  onOpenCreateMission: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ onOpenCreateMission }) => {
  const { user, missions, stats, achievements, setActiveTab } = useNavora();

  // Next rank information
  const currentRankIndex = RANKS_HIERARCHY.findIndex((r) => r.rank === user.rank);
  const nextRank = RANKS_HIERARCHY[currentRankIndex + 1];

  // Today's Missions: show all or active missions
  const todayMissions = missions.slice(0, 5);
  const completedCount = missions.filter((m) => m.status === 'completed').length;

  return (
    <div className="space-y-6 animate-fadeIn pb-16 lg:pb-8">
      {/* Top Banner / Persona HUD Card */}
      <div data-tutorial="command-persona" className="hud-panel rounded-2xl p-5 sm:p-7 border-chakra-500/40 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-chakra-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* User Persona & Rank */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-chakra-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles size={13} />
                <span>OPERATIVE STATUS: ONLINE</span>
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold font-hud tracking-tight text-white">
                WELCOME, <span className="text-chakra-300">{user.name}</span>
              </h1>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm px-2.5 py-0.5 rounded bg-shinobi-900 border border-chakra-500/30 text-chakra-400">
                  LVL {user.level}
                </span>
                <RankBadge rank={user.rank} size="md" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              "Your life. Organized. Evolved." All sensory filters active. Tactical discipline and daily consistency advance your shinobi rank.
            </p>
          </div>

          {/* Next Rank Goal Capsule */}
          {nextRank && (
            <div className="hud-panel rounded-xl p-3.5 border-shinobi-700/80 bg-shinobi-950/60 max-w-xs flex-shrink-0 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="uppercase">Next Promotion</span>
                <span className="text-chakra-400 font-bold">Lvl {nextRank.minLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-chakra-400 flex-shrink-0" />
                <span className="font-hud font-bold text-sm text-slate-200">{nextRank.rank}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">{nextRank.description}</p>
            </div>
          )}
        </div>

        {/* XP Level Progression Bar */}
        <div className="mt-6 pt-5 border-t border-shinobi-800/80">
          <ChakraBar
            value={user.currentXp}
            max={user.xpToNextLevel}
            size="md"
            label={`EXP PROGRESSION (LEVEL ${user.level} → ${user.level + 1})`}
          />
        </div>
      </div>

      {/* 4 Tactical HUD Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Daily Streak */}
        <div className="hud-panel rounded-xl p-4 border-amberSeal-500/20 bg-shinobi-900/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Streak</span>
            <div className="w-7 h-7 rounded-lg bg-amberSeal-500/10 border border-amberSeal-500/30 flex items-center justify-center text-amberSeal-400">
              <Flame size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold font-hud text-white">{user.streak}</span>
            <span className="text-xs font-mono text-amberSeal-400">Days Unbroken</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-mono">Discipline multiplier active</div>
        </div>

        {/* Missions Executed */}
        <div className="hud-panel rounded-xl p-4 border-leaf-500/20 bg-shinobi-900/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Missions</span>
            <div className="w-7 h-7 rounded-lg bg-leaf-500/10 border border-leaf-500/30 flex items-center justify-center text-leaf-400">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold font-hud text-white">
              {completedCount} <span className="text-slate-500 text-lg font-normal">/ {missions.length}</span>
            </span>
            <span className="text-xs font-mono text-leaf-400">({stats.completionRate}%)</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-mono">
            {stats.missionsCompletedToday} executed today
          </div>
        </div>

        {/* XP Earned Today */}
        <div className="hud-panel rounded-xl p-4 border-chakra-500/20 bg-shinobi-900/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Today's XP</span>
            <div className="w-7 h-7 rounded-lg bg-chakra-500/10 border border-chakra-500/30 flex items-center justify-center text-chakra-400">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold font-hud text-white">
              +{stats.xpEarnedToday}
            </span>
            <span className="text-xs font-mono text-chakra-400">XP</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-mono">
            Total {user.totalXp} XP accumulated
          </div>
        </div>

        {/* Chakra Stamina */}
        <div className="hud-panel rounded-xl p-4 border-lightning-500/20 bg-shinobi-900/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Chakra Energy</span>
            <div className="w-7 h-7 rounded-lg bg-lightning-500/10 border border-lightning-500/30 flex items-center justify-center text-lightning-400">
              <Zap size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold font-hud text-white">
              {user.chakraEnergy}%
            </span>
            <span className="text-xs font-mono text-lightning-400">Operational</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-mono">Replenishes with completions</div>
        </div>
      </div>

      {/* Main Grid: Today's Missions + Tactical Stats & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Missions Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chakra-400 animate-pulse" />
              <h2 className="text-xl font-bold font-hud tracking-wide text-white">
                TODAY'S MISSION SCROLLS
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCreateMission}
                className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl font-hud font-bold text-xs tracking-wider text-shinobi-950 bg-gradient-to-r from-chakra-400 to-cyan-300 hover:from-chakra-300 hover:to-white transition shadow-chakra"
              >
                <Plus size={14} />
                <span>NEW MISSION</span>
              </button>

              <button
                onClick={() => setActiveTab('missions')}
                className="hidden sm:inline-flex items-center gap-1 py-1.5 px-3 rounded-xl border border-shinobi-700 bg-shinobi-900/80 hover:border-chakra-500/40 text-xs font-mono text-slate-300 transition"
              >
                <span>Full Board</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Missions List */}
          {todayMissions.length === 0 ? (
            <div className="hud-panel rounded-xl p-8 text-center space-y-3 border-dashed border-shinobi-700">
              <Target className="w-10 h-10 text-slate-500 mx-auto" />
              <h4 className="font-hud font-bold text-base text-slate-200">No Active Missions Recorded</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Commence your discipline by inscribing your first objective scroll for today.
              </p>
              <button
                onClick={onOpenCreateMission}
                className="mt-2 py-2 px-4 rounded-xl text-xs font-bold font-hud tracking-wider bg-chakra-500/20 border border-chakra-500/40 text-chakra-300 hover:bg-chakra-500/30 transition"
              >
                Inscribe Mission
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {todayMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Recent Achievements & Productivity Breakdown */}
        <div className="space-y-6">
          {/* Achievements Spotlight */}
          <div className="hud-panel rounded-2xl p-5 border-shinobi-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award size={18} className="text-amberSeal-400" />
                <h3 className="font-hud font-bold text-lg text-white tracking-wide">
                  RECENT ACHIEVEMENTS
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('achievements')}
                className="text-xs font-mono text-chakra-400 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              {achievements.slice(0, 3).map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                    ach.isUnlocked
                      ? 'border-amberSeal-500/30 bg-amberSeal-500/5'
                      : 'border-shinobi-800 bg-shinobi-950/40 opacity-50'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      ach.isUnlocked
                        ? 'bg-amberSeal-500/20 text-amberSeal-400 border border-amberSeal-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                        : 'bg-shinobi-900 text-slate-600 border border-shinobi-750'
                    }`}
                  >
                    <Award size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-hud font-bold text-xs text-slate-100 truncate">
                        {ach.title}
                      </h5>
                      <span className="text-[10px] font-mono text-amberSeal-400 font-semibold">
                        +{ach.xpReward} XP
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight truncate">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Productivity Statistics Matrix */}
          <div className="hud-panel rounded-2xl p-5 border-shinobi-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-chakra-400" />
                <h3 className="font-hud font-bold text-lg text-white tracking-wide">
                  TACTICAL METRICS
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('statistics')}
                className="text-xs font-mono text-chakra-400 hover:underline"
              >
                Details
              </button>
            </div>

            {/* Difficulty Distribution Breakdown */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Rank Executions
              </div>
              <div className="grid grid-cols-5 gap-1.5 text-center font-mono">
                {(['D-Rank', 'C-Rank', 'B-Rank', 'A-Rank', 'S-Rank'] as const).map((diff) => (
                  <div key={diff} className="p-1.5 rounded-lg bg-shinobi-900/80 border border-shinobi-800">
                    <div className="text-[10px] text-slate-400">{diff.split('-')[0]}</div>
                    <div className="text-xs font-bold text-chakra-300">
                      {stats.difficultyBreakdown[diff]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Completion Radar */}
            <div className="pt-2 border-t border-shinobi-800/80">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1.5">
                <span>EXECUTION RATIO</span>
                <span className="text-leaf-400 font-bold">{stats.completionRate}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-shinobi-900 overflow-hidden border border-shinobi-800">
                <div
                  className="h-full bg-gradient-to-r from-leaf-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${stats.completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
