import React from 'react';
import { Check, Trash2, Calendar, Award, Clock } from 'lucide-react';
import type { Mission } from '../../types';
import { DifficultyBadge } from '../ui/ShinobiBadge';
import { useNavora } from '../../context/useNavora';

interface MissionCardProps {
  mission: Mission;
  compact?: boolean;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, compact = false }) => {
  const { toggleMission, deleteMission } = useNavora();
  const isCompleted = mission.status === 'completed';

  const formattedDate = new Date(mission.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className={`group relative hud-panel rounded-xl transition-all duration-300 ${
        isCompleted
          ? 'border-leaf-500/30 bg-leaf-950/10 opacity-75'
          : 'hover:border-chakra-500/40 hover:bg-shinobi-850/80'
      } ${compact ? 'p-3.5' : 'p-4 sm:p-5'}`}
    >
      <div className="hud-corner-tl" />
      <div className="hud-corner-br" />

      <div className="flex items-start gap-3.5">
        {/* Interactive Checkmark Trigger */}
        <button
          onClick={() => toggleMission(mission.id)}
          aria-label={isCompleted ? 'Mark mission active' : 'Mark mission completed'}
          className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-200 ${
            isCompleted
              ? 'bg-leaf-500 border-leaf-400 text-shinobi-950 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
              : 'border-shinobi-600/80 bg-shinobi-900/60 hover:border-chakra-400 hover:shadow-chakra-sm text-transparent hover:text-chakra-400/40'
          }`}
        >
          <Check size={14} className="stroke-[3]" />
        </button>

        {/* Content Body */}
        <div className="flex-grow min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <DifficultyBadge difficulty={mission.difficulty} size="sm" />
              <span
                className={`font-semibold text-sm sm:text-base tracking-wide transition-colors ${
                  isCompleted ? 'line-through text-slate-400' : 'text-slate-100 group-hover:text-white'
                }`}
              >
                {mission.title}
              </span>
            </div>

            {/* XP Reward Badge */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-shinobi-900 border border-chakra-500/20 text-chakra-300 text-xs font-mono font-semibold flex-shrink-0">
              <Award size={13} className="text-chakra-400" />
              <span>+{mission.xpReward} XP</span>
            </div>
          </div>

          {!compact && mission.description && (
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isCompleted ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              {mission.description}
            </p>
          )}

          {/* Footer Metadata */}
          <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                <span>Issued {formattedDate}</span>
              </span>

              {isCompleted && mission.completedAt && (
                <span className="text-leaf-400 flex items-center gap-1">
                  <Check size={12} />
                  <span>Executed</span>
                </span>
              )}

              {mission.dueDate && (
                <span className="flex items-center gap-1 text-amberSeal-400">
                  <Calendar size={12} />
                  <span>Due {new Date(mission.dueDate).toLocaleDateString()}</span>
                </span>
              )}
            </div>

            {/* Delete button (visible on hover) */}
            <button
              onClick={() => deleteMission(mission.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-flame-400 p-1 rounded hover:bg-flame-500/10"
              title="Abort Mission"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
