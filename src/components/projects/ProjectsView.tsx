import React, { useState } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Target, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useNavora } from '../../context/useNavora';

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  milestone: string;
  subtasks: SubTask[];
  category: string;
  targetDate: string;
  xpReward: number;
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj_1',
    title: 'Operation: Shinobi OS Mastery',
    description: 'Build and deploy the complete scalable NAVORA productivity operating system.',
    milestone: 'Phase 1: Alpha Deployment & Guide Integration',
    category: 'Architecture & Code',
    targetDate: '2026-10-15',
    xpReward: 1000,
    subtasks: [
      { id: 'st_1', title: 'Scaffold React + Vite + Tailwind theme', completed: true },
      { id: 'st_2', title: 'Implement RPG leveling curve & rank promotions', completed: true },
      { id: 'st_3', title: 'Build Aura anime mentor & interactive tutorial', completed: true },
      { id: 'st_4', title: 'Integrate Supabase multi-user cloud backend', completed: false },
    ],
  },
  {
    id: 'proj_2',
    title: 'Taijutsu Physical Transcendence',
    description: 'Establish unbroken 60-day physical training conditioning and nutrition regimen.',
    milestone: 'Milestone 2: 30 Consecutive Workout Days',
    category: 'Stamina & Health',
    targetDate: '2026-11-01',
    xpReward: 750,
    subtasks: [
      { id: 'st_2_1', title: 'Calibrate morning hydration & nutrient schedule', completed: true },
      { id: 'st_2_2', title: 'Execute 5x weekly strength training sessions', completed: true },
      { id: 'st_2_3', title: 'Achieve 10,000 daily steps consistency', completed: false },
    ],
  },
  {
    id: 'proj_3',
    title: 'Scroll Library: Deep Learning & AI Systems',
    description: 'Master neural network transformers, reinforcement learning, and agentic workflows.',
    milestone: 'Milestone 1: Multi-Agent Coordination Paper',
    category: 'Intellect & Focus',
    targetDate: '2026-12-01',
    xpReward: 850,
    subtasks: [
      { id: 'st_3_1', title: 'Read Attention Is All You Need analysis', completed: true },
      { id: 'st_3_2', title: 'Construct local LLM inference benchmark', completed: false },
      { id: 'st_3_3', title: 'Author tactical retrospective scroll', completed: false },
    ],
  },
];

export const ProjectsView: React.FC = () => {
  const { user } = useNavora();
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string>('proj_1');

  const toggleSubtask = (projectId: string, subtaskId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const updated = proj.subtasks.map((st) =>
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        );
        return { ...proj, subtasks: updated };
      })
    );
  };

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];
  const activeCompleted = activeProject.subtasks.filter((s) => s.completed).length;
  const activeTotal = activeProject.subtasks.length;
  const activePercent = Math.round((activeCompleted / activeTotal) * 100);

  return (
    <div data-tutorial="projects-view" className="space-y-6 animate-fadeIn pb-16 lg:pb-8">
      {/* Header */}
      <div className="hud-panel rounded-2xl p-6 border-chakra-500/40 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-shinobi-900 border border-chakra-500/40 flex items-center justify-center text-chakra-400 shadow-chakra-sm">
              <FolderKanban size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold font-hud tracking-wide text-white">
                  TACTICAL PROJECTS & SQUAD CAMPAIGNS
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-chakra-500/15 text-chakra-300 border border-chakra-500/30 uppercase">
                  ACTIVE CAMPAIGNS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Organize overarching objectives, milestone roadmaps, and nested execution sub-tasks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">
              Active Campaigns: <strong className="text-chakra-300">{projects.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Campaign Cards List + Selected Campaign Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Projects Overview List */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider px-1">
            Active Strategic Campaigns
          </div>

          {projects.map((proj) => {
            const completed = proj.subtasks.filter((s) => s.completed).length;
            const total = proj.subtasks.length;
            const percent = Math.round((completed / total) * 100);
            const isSelected = proj.id === activeProjectId;

            return (
              <div
                key={proj.id}
                onClick={() => setActiveProjectId(proj.id)}
                className={`hud-panel cursor-pointer rounded-2xl p-4 transition-all duration-300 ${
                  isSelected
                    ? 'border-chakra-400/80 bg-shinobi-900/90 shadow-chakra-sm ring-1 ring-chakra-400/30'
                    : 'border-shinobi-800 bg-shinobi-950/60 hover:border-shinobi-700 hover:bg-shinobi-900/60'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-shinobi-900 border border-shinobi-750 text-slate-400 uppercase">
                    {proj.category}
                  </span>
                  <span className="text-xs font-mono text-chakra-400 font-bold">
                    +{proj.xpReward} XP
                  </span>
                </div>

                <h4 className="font-hud font-bold text-base text-white tracking-wide">
                  {proj.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>

                {/* Progress bar */}
                <div className="mt-3 pt-3 border-t border-shinobi-800">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1">
                    <span>PROGRESS</span>
                    <span className="text-leaf-400 font-bold">
                      {completed}/{total} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-shinobi-950 overflow-hidden border border-shinobi-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-chakra-400 transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Detailed Selected Campaign View */}
        <div className="lg:col-span-2 space-y-4">
          <div className="hud-panel rounded-2xl p-6 border-shinobi-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-shinobi-800">
              <div>
                <span className="text-xs font-mono text-chakra-400 uppercase tracking-wider">
                  CAMPAIGN SPECIFICATION
                </span>
                <h2 className="text-2xl font-hud font-bold text-white tracking-wide mt-0.5">
                  {activeProject.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Target Deadline:</span>
                <span className="text-xs font-mono text-amberSeal-400 font-bold">
                  {activeProject.targetDate}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeProject.description}
            </p>

            {/* Current Active Milestone Card */}
            <div className="p-4 rounded-xl bg-shinobi-900/80 border border-chakra-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-chakra-500/20 border border-chakra-500/40 flex items-center justify-center text-chakra-300">
                  <Target size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    Current Campaign Milestone
                  </div>
                  <div className="font-hud font-bold text-sm text-white">
                    {activeProject.milestone}
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs font-mono text-leaf-400 font-bold">{activePercent}% Conquered</div>
              </div>
            </div>

            {/* Sub-tasks execution checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase">
                <span>Tactical Sub-Tasks ({activeCompleted}/{activeTotal})</span>
                <span>Click to toggle execution</span>
              </div>

              <div className="space-y-2">
                {activeProject.subtasks.map((st) => (
                  <div
                    key={st.id}
                    onClick={() => toggleSubtask(activeProject.id, st.id)}
                    className={`cursor-pointer p-3.5 rounded-xl border flex items-center gap-3 transition-all duration-200 ${
                      st.completed
                        ? 'bg-leaf-950/20 border-leaf-500/40 text-slate-400'
                        : 'bg-shinobi-900/60 border-shinobi-750 hover:border-chakra-500/40 text-slate-100 hover:bg-shinobi-850'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center text-xs transition ${
                        st.completed
                          ? 'bg-leaf-500 border-leaf-400 text-shinobi-950 font-bold'
                          : 'border-shinobi-600 bg-shinobi-950 text-transparent'
                      }`}
                    >
                      ✓
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-semibold tracking-wide ${
                        st.completed ? 'line-through text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {st.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
