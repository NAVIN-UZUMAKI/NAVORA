import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle2
} from 'lucide-react';
import { useNavora } from '../../context/useNavora';
import { DifficultyBadge } from '../ui/ShinobiBadge';
import type { MissionDifficulty } from '../../types';

export const ArchiveView: React.FC = () => {
  const { missions } = useNavora();
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState<'all' | MissionDifficulty>('all');

  const completedMissions = missions.filter((m) => m.status === 'completed');

  const filtered = completedMissions.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    const matchesDiff = diffFilter === 'all' || m.difficulty === diffFilter;
    return matchesSearch && matchesDiff;
  });

  const totalArchivedXp = completedMissions.reduce((sum, m) => sum + m.xpReward, 0);

  return (
    <div data-tutorial="archive-view" className="space-y-6 animate-fadeIn pb-16 lg:pb-8">
      {/* Header */}
      <div className="hud-panel rounded-2xl p-6 border-chakra-500/40 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-shinobi-900 border border-chakra-500/40 flex items-center justify-center text-chakra-400 shadow-chakra-sm">
              <FileText size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold font-hud tracking-wide text-white">
                  SCROLL ARCHIVE // HISTORICAL DISCIPLINE
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-leaf-500/15 text-leaf-300 border border-leaf-500/30 uppercase">
                  RECORD VAULT
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Chronicled record of all executed missions, retrospective reflections, and cumulative XP harvests.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl bg-shinobi-950/80 border border-shinobi-800">
            <div className="text-center">
              <div className="text-xs font-mono text-slate-500 uppercase">Archived</div>
              <div className="text-xl font-bold font-hud text-leaf-400">
                {completedMissions.length} Scrolls
              </div>
            </div>
            <div className="w-px h-8 bg-shinobi-800" />
            <div className="text-center">
              <div className="text-xs font-mono text-slate-500 uppercase">Harvested XP</div>
              <div className="text-xl font-bold font-hud text-chakra-300">
                +{totalArchivedXp} XP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="hud-panel rounded-2xl p-4 border-shinobi-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search archived scrolls..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-shinobi-900 border border-shinobi-700/80 focus:border-chakra-400 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-chakra-400 transition font-mono"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {(['all', 'D-Rank', 'C-Rank', 'B-Rank', 'A-Rank', 'S-Rank'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setDiffFilter(diff)}
              className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition ${
                diffFilter === diff
                  ? 'bg-chakra-500/20 border-chakra-400 text-chakra-300 font-bold'
                  : 'bg-shinobi-900 border-shinobi-750 text-slate-400 hover:border-shinobi-600'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Archive List */}
      {filtered.length === 0 ? (
        <div className="hud-panel rounded-2xl p-12 text-center space-y-3 border-dashed border-shinobi-700">
          <FileText className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="font-hud font-bold text-lg text-slate-200">No Historical Records Match</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Execute pending missions in your Command Center to permanently chronicle your victories here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((m) => {
            const completedDate = m.completedAt
              ? new Date(m.completedAt).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Chronicle Recorded';

            return (
              <div
                key={m.id}
                className="hud-panel rounded-xl p-4 sm:p-5 border-leaf-500/30 bg-leaf-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-leaf-400"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <DifficultyBadge difficulty={m.difficulty} size="sm" />
                    <h4 className="font-hud font-bold text-base text-white truncate">
                      {m.title}
                    </h4>
                  </div>
                  {m.description && (
                    <p className="text-xs text-slate-400 leading-relaxed">{m.description}</p>
                  )}
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 pt-1">
                    <span className="flex items-center gap-1 text-leaf-400">
                      <CheckCircle2 size={12} />
                      <span>Conquered on {completedDate}</span>
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center flex-shrink-0 gap-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-shinobi-800">
                  <div className="text-xs font-mono font-bold text-chakra-300 px-2.5 py-1 rounded bg-shinobi-900 border border-chakra-500/20">
                    +{m.xpReward} XP HARVESTED
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Status: Verified
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
