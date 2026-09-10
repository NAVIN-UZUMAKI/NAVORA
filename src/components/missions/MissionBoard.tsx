import React, { useState } from 'react';
import { 
  Scroll, 
  Plus, 
  Search, 
  Filter
} from 'lucide-react';
import { useNavora } from '../../context/useNavora';
import { MissionCard } from './MissionCard';
import type { MissionDifficulty, MissionStatus } from '../../types';

interface MissionBoardProps {
  onOpenCreateMission: () => void;
}

export const MissionBoard: React.FC<MissionBoardProps> = ({ onOpenCreateMission }) => {
  const { missions } = useNavora();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | MissionStatus>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | MissionDifficulty>('all');

  // Filter missions
  const filteredMissions = missions.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    const matchesDiff = difficultyFilter === 'all' || m.difficulty === difficultyFilter;

    return matchesSearch && matchesStatus && matchesDiff;
  });

  const activeCount = missions.filter((m) => m.status === 'active').length;
  const completedCount = missions.filter((m) => m.status === 'completed').length;

  const difficulties: ('all' | MissionDifficulty)[] = [
    'all',
    'D-Rank',
    'C-Rank',
    'B-Rank',
    'A-Rank',
    'S-Rank',
  ];

  return (
    <div data-tutorial="mission-board" className="space-y-6 animate-fadeIn pb-16 lg:pb-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Scroll className="w-6 h-6 text-chakra-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold font-hud tracking-wide text-white">
              MISSION SCROLL ARCHIVE & DISPATCH
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Dispatch, execute, and chronicle your daily objectives to gather experience and advance your rank.
          </p>
        </div>

        {/* Create Mission CTA */}
        <button
          onClick={onOpenCreateMission}
          className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-hud font-bold text-sm tracking-wider text-white bg-gradient-to-r from-[#c2410c] to-[#f97316] hover:from-[#f97316] hover:to-[#fb923c] transition shadow-[0_0_16px_rgba(249,115,22,0.4)] border border-[#9CA3AF]/30 flex-shrink-0"
        >
          <Plus size={18} />
          <span>INSCRIBE MISSION</span>
        </button>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="hud-panel rounded-2xl p-4 border-shinobi-800 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search missions by title or briefing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-shinobi-900 border border-shinobi-700/80 focus:border-chakra-400 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-chakra-400 transition font-mono"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-shinobi-950 border border-shinobi-800 w-full md:w-auto justify-center">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-hud font-semibold transition ${
                statusFilter === 'all'
                  ? 'bg-chakra-500/20 text-chakra-300 border border-chakra-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({missions.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-lg text-xs font-hud font-semibold transition ${
                statusFilter === 'active'
                  ? 'bg-chakra-500/20 text-chakra-300 border border-chakra-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-hud font-semibold transition ${
                statusFilter === 'completed'
                  ? 'bg-leaf-500/20 text-leaf-300 border border-leaf-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>

        {/* Difficulty Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-shinobi-800/80 pb-1">
          <span className="text-[11px] font-mono text-slate-500 uppercase mr-1 flex items-center gap-1 flex-shrink-0">
            <Filter size={12} />
            <span>Difficulty:</span>
          </span>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all flex-shrink-0 ${
                difficultyFilter === diff
                  ? 'bg-chakra-500/15 border-chakra-400 text-chakra-300 font-bold shadow-chakra-sm'
                  : 'bg-shinobi-900/60 border-shinobi-750 text-slate-400 hover:border-shinobi-600'
              }`}
            >
              {diff === 'all' ? 'All Tiers' : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Mission List / Grid */}
      {filteredMissions.length === 0 ? (
        <div className="hud-panel rounded-2xl p-12 text-center space-y-3 border-dashed border-shinobi-700">
          <Scroll className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="font-hud font-bold text-lg text-slate-200">No Matching Missions Found</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Adjust your filter criteria or inscribe a new mission scroll to initiate tactical operations.
          </p>
          <button
            onClick={onOpenCreateMission}
            className="mt-2 py-2.5 px-5 rounded-xl text-xs font-bold font-hud tracking-wider bg-chakra-500/20 border border-chakra-500/40 text-chakra-300 hover:bg-chakra-500/30 transition shadow-chakra-sm"
          >
            Inscribe New Mission
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      )}
    </div>
  );
};
