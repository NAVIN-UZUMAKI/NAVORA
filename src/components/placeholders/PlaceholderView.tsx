import React from 'react';
import { Calendar, FolderKanban, FileText, Construction, ArrowRight } from 'lucide-react';
import { useNavora } from '../../context/useNavora';

interface PlaceholderViewProps {
  type: 'calendar' | 'projects' | 'notes';
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ type }) => {
  const { setActiveTab } = useNavora();

  const configs = {
    calendar: {
      title: 'CHRONO-CALENDAR // MISSION TIMELINE',
      subtitle: 'Synchronize tactical sprints, recurring jutsu training, and milestone deadlines.',
      icon: Calendar,
      upcomingFeatures: [
        'Time-blocking for deep focus sessions',
        'Visual recurring mission scheduler with streak reminders',
        'Chakra stamina burnout projections',
      ],
      previewContent: 'Timeline matrix initialized. Scheduled for Phase 2 expansion.',
    },
    projects: {
      title: 'TACTICAL PROJECTS & SQUAD CAMPAIGNS',
      subtitle: 'Group missions under large-scale operations and strategic campaign roadmaps.',
      icon: FolderKanban,
      upcomingFeatures: [
        'Multi-stage epic mission chains',
        'Milestone XP bonus multipliers',
        'Project progress bars with sub-task hierarchy',
      ],
      previewContent: 'Campaign orchestrator offline. Connects directly to Missions Board.',
    },
    notes: {
      title: 'SCROLL ARCHIVE & KNOWLEDGE BASE',
      subtitle: 'Chronicle jutsu notes, code snippets, tactical ideas, and retrospective reflections.',
      icon: FileText,
      upcomingFeatures: [
        'Markdown scroll editor with shinobi tags',
        'Bi-directional linking between missions and notes',
        'AI Sensei auto-summarization and retrieval',
      ],
      previewContent: 'Secret scroll vault sealed. Slated for incoming system update.',
    },
  };

  const current = configs[type];
  const Icon = current.icon;

  return (
    <div className="space-y-6 animate-fadeIn pb-16 lg:pb-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="hud-panel rounded-2xl p-6 border-chakra-500/40 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-shinobi-900 border border-chakra-500/40 flex items-center justify-center text-chakra-400 shadow-chakra-sm">
            <Icon size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold font-hud tracking-wide text-white">
              {current.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{current.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Feature Teaser Blueprint */}
      <div className="hud-panel rounded-2xl p-8 border-shinobi-800 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chakra-500/10 border border-chakra-500/30 text-chakra-300 text-xs font-mono">
          <Construction size={14} className="text-chakra-400" />
          <span>IN ACTIVE DEVELOPMENT // PHASE 2 BLUEPRINT</span>
        </div>

        <div className="max-w-md mx-auto space-y-3">
          <h3 className="font-hud font-bold text-xl text-slate-100">
            Next Level Operative System Integration
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {current.previewContent} In the current MVP, you can utilize the Command Center and Mission Board to drive your full daily productivity.
          </p>
        </div>

        {/* Feature list preview */}
        <div className="max-w-lg mx-auto text-left hud-panel rounded-xl p-4 border-shinobi-750 bg-shinobi-950/60 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            Upcoming Capabilities:
          </div>
          {current.upcomingFeatures.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <span className="text-chakra-400 font-mono">▸</span>
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Return to Command Center CTA */}
        <div>
          <button
            onClick={() => setActiveTab('command-center')}
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl font-hud font-bold text-sm tracking-wider text-shinobi-950 bg-gradient-to-r from-chakra-400 to-cyan-300 hover:from-chakra-300 hover:to-white transition shadow-chakra"
          >
            <span>RETURN TO COMMAND CENTER</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
