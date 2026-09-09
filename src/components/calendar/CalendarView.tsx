import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus
} from 'lucide-react';
import { useNavora } from '../../context/useNavora';
import { DifficultyBadge } from '../ui/ShinobiBadge';

interface CalendarViewProps {
  onOpenCreateMission?: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onOpenCreateMission }) => {
  const { missions, toggleMission } = useNavora();
  const [selectedDayOffset, setSelectedDayOffset] = useState(0);

  // Generate 7 days for the active week
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7; // Monday = 0

  const weekDates = daysOfWeek.map((dayName, idx) => {
    const d = new Date(today);
    d.setDate(today.getDate() - currentDayIndex + idx + selectedDayOffset * 7);
    return {
      dayName,
      dateNum: d.getDate(),
      fullDateStr: d.toISOString().split('T')[0],
      isToday: d.toDateString() === today.toDateString(),
    };
  });

  return (
    <div data-tutorial="calendar-view" className="space-y-6 animate-fadeIn pb-16 lg:pb-8">
      {/* Header */}
      <div className="hud-panel rounded-2xl p-6 border-chakra-500/40 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-shinobi-900 border border-chakra-500/40 flex items-center justify-center text-chakra-400 shadow-chakra-sm">
              <CalendarIcon size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold font-hud tracking-wide text-white">
                  CHRONO-CALENDAR // MISSION TIMELINE
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-chakra-500/15 text-chakra-300 border border-chakra-500/30 uppercase">
                  ACTIVE MATRIX
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Align tactical operations across temporal cycles to avoid burnout and sustain your streak.
              </p>
            </div>
          </div>

          {/* Week Selector Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedDayOffset((prev) => prev - 1)}
              className="p-2 rounded-xl border border-shinobi-700 bg-shinobi-900/80 text-slate-300 hover:text-white hover:border-chakra-500/40 transition"
              aria-label="Previous Week"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-shinobi-900 border border-shinobi-800 text-slate-200">
              {selectedDayOffset === 0 ? 'CURRENT WEEK' : `OFFSET: ${selectedDayOffset > 0 ? '+' : ''}${selectedDayOffset}W`}
            </span>
            <button
              onClick={() => setSelectedDayOffset((prev) => prev + 1)}
              className="p-2 rounded-xl border border-shinobi-700 bg-shinobi-900/80 text-slate-300 hover:text-white hover:border-chakra-500/40 transition"
              aria-label="Next Week"
            >
              <ChevronRight size={16} />
            </button>

            {onOpenCreateMission && (
              <button
                onClick={onOpenCreateMission}
                className="ml-2 inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl font-hud font-bold text-xs tracking-wider text-shinobi-950 bg-gradient-to-r from-chakra-400 to-cyan-300 hover:from-chakra-300 hover:to-white transition shadow-chakra"
              >
                <Plus size={14} />
                <span>SCHEDULE</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 7-Day Interactive Week Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {weekDates.map((day, dIdx) => {
          // Filter missions assigned or falling near this day
          const dayMissions = missions.filter((_, mIdx) => {
            // Distribute sample missions across days for a vivid calendar feel
            return mIdx % 7 === dIdx;
          });

          return (
            <div
              key={day.fullDateStr}
              className={`hud-panel rounded-2xl p-3.5 flex flex-col min-h-[300px] transition-all duration-300 ${
                day.isToday
                  ? 'border-chakra-400/80 bg-shinobi-900/90 shadow-chakra-sm ring-1 ring-chakra-400/40'
                  : 'border-shinobi-800/80 bg-shinobi-950/60 hover:border-shinobi-700'
              }`}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-shinobi-800">
                <div>
                  <span
                    className={`font-hud font-bold text-xs ${
                      day.isToday ? 'text-chakra-300' : 'text-slate-400'
                    }`}
                  >
                    {day.dayName}
                  </span>
                  <div
                    className={`text-lg font-mono font-bold leading-tight ${
                      day.isToday ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {day.dateNum}
                  </div>
                </div>

                {day.isToday && (
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-chakra-500/20 text-chakra-300 border border-chakra-500/40">
                    TODAY
                  </span>
                )}
              </div>

              {/* Day Tasks List */}
              <div className="flex-1 space-y-2 overflow-y-auto">
                {dayMissions.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-3 text-slate-600 font-mono text-[11px]">
                    <span>No Katas Scheduled</span>
                  </div>
                ) : (
                  dayMissions.map((m) => {
                    const isCompleted = m.status === 'completed';
                    return (
                      <div
                        key={m.id}
                        onClick={() => toggleMission(m.id)}
                        className={`cursor-pointer p-2.5 rounded-xl border text-xs transition-all duration-200 group ${
                          isCompleted
                            ? 'bg-leaf-950/20 border-leaf-500/30 opacity-70'
                            : 'bg-shinobi-900/80 border-shinobi-750 hover:border-chakra-500/40 hover:bg-shinobi-850'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <DifficultyBadge difficulty={m.difficulty} size="sm" />
                          <span className="font-mono text-[10px] text-chakra-400">
                            +{m.xpReward}XP
                          </span>
                        </div>
                        <div
                          className={`font-semibold tracking-tight text-[11px] line-clamp-2 ${
                            isCompleted ? 'line-through text-slate-500' : 'text-slate-200 group-hover:text-white'
                          }`}
                        >
                          {m.title}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Quick Add CTA at bottom of column */}
              <button
                onClick={onOpenCreateMission}
                className="mt-2 w-full py-1 rounded-lg border border-dashed border-shinobi-750 hover:border-chakra-500/40 text-slate-500 hover:text-chakra-300 text-[10px] font-mono flex items-center justify-center gap-1 transition"
              >
                <Plus size={11} />
                <span>Add Scroll</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
