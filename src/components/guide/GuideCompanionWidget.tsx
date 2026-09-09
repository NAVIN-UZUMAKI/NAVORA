import React, { useState } from 'react';
import { Bot, Sparkles, Flame, Play, HelpCircle, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useGuide } from '../../context/useGuide';
import { useNavora } from '../../context/useNavora';
import { AuraAvatar } from './AuraAvatar';
import type { GuideMood } from '../../types/guide';

export const GuideCompanionWidget: React.FC = () => {
  const { isTutorialActive, restartTutorial } = useGuide();
  const { user, missions, setActiveTab } = useNavora();

  const [isOpen, setIsOpen] = useState(false);
  const [currentMood, setCurrentMood] = useState<GuideMood>('gentle');
  const [speech, setSpeech] = useState<string>(
    `Welcome, ${user.name}. I am monitoring your telemetry. How can I assist your focus today?`
  );

  // Hide floating widget during active full-screen tutorial
  if (isTutorialActive) return null;

  const activeMissions = missions.filter((m) => m.status === 'active');

  const handleProcrastination = () => {
    setCurrentMood('firm');
    setSpeech(
      `Navin, breathe deeply. The hardest part is simply initiating motion. Do not attempt an S-Rank right now — select a single D-Rank mission, set a timer for 10 minutes, and commit your full focus. I believe in you.`
    );
  };

  const handlePlanNext = () => {
    if (activeMissions.length === 0) {
      setCurrentMood('encouraging');
      setSpeech(
        `Remarkable discipline, ${user.name}! You have cleared all pending mission scrolls. Take a moment to replenish your chakra or inscribe tomorrow's training objectives.`
      );
    } else {
      const topMission = activeMissions[0];
      setCurrentMood('focused');
      setSpeech(
        `Tactical priority identified: "${topMission.title}" (${topMission.difficulty}, +${topMission.xpReward} XP). Execute this first to maintain your ${user.streak}-day streak.`
      );
    }
  };

  const handleConsultSensei = () => {
    setActiveTab('ai-companion');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Expanded Speech Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 hud-panel rounded-2xl p-4 sm:p-5 border-chakra-400/50 shadow-chakra bg-shinobi-950/95 backdrop-blur-xl animate-fadeIn">
          <div className="hud-corner-tl" />
          <div className="hud-corner-br" />

          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-shinobi-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chakra-400 animate-pulse" />
              <span className="font-hud font-bold text-xs tracking-wider text-slate-200">
                AURA // TACTICAL COMPANION
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-0.5 rounded"
            >
              <X size={14} />
            </button>
          </div>

          {/* Aura Speech Message */}
          <div className="flex items-start gap-3 mb-3">
            <AuraAvatar mood={currentMood} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-200 leading-relaxed font-sans">{speech}</p>
            </div>
          </div>

          {/* Tactical Action Chips */}
          <div className="space-y-1.5 pt-2 border-t border-shinobi-800/80">
            <button
              onClick={handlePlanNext}
              className="w-full py-1.5 px-2.5 rounded-lg bg-shinobi-900/80 hover:bg-chakra-500/15 border border-shinobi-750 hover:border-chakra-500/40 text-[11px] font-mono text-slate-300 hover:text-chakra-300 flex items-center justify-between transition"
            >
              <span className="flex items-center gap-1.5">
                <Play size={11} className="text-chakra-400" />
                <span>What should I do next?</span>
              </span>
              <span className="text-[10px] text-slate-400">Suggest</span>
            </button>

            <button
              onClick={handleProcrastination}
              className="w-full py-1.5 px-2.5 rounded-lg bg-shinobi-900/80 hover:bg-flame-500/15 border border-shinobi-750 hover:border-flame-500/40 text-[11px] font-mono text-slate-300 hover:text-flame-300 flex items-center justify-between transition"
            >
              <span className="flex items-center gap-1.5">
                <Flame size={11} className="text-flame-400" />
                <span>I'm procrastinating / feeling stuck...</span>
              </span>
              <span className="text-[10px] text-slate-400">Reset</span>
            </button>

            <button
              onClick={handleConsultSensei}
              className="w-full py-1.5 px-2.5 rounded-lg bg-shinobi-900/80 hover:bg-lightning-500/15 border border-shinobi-750 hover:border-lightning-500/40 text-[11px] font-mono text-slate-300 hover:text-lightning-300 flex items-center justify-between transition"
            >
              <span className="flex items-center gap-1.5">
                <Bot size={11} className="text-lightning-400" />
                <span>Full AI Sensei Session</span>
              </span>
              <span className="text-[10px] text-slate-400">Open Terminal</span>
            </button>

            <button
              onClick={() => {
                restartTutorial();
                setIsOpen(false);
              }}
              className="w-full py-1.5 px-2.5 rounded-lg bg-shinobi-900/80 hover:bg-amberSeal-500/15 border border-shinobi-750 hover:border-amberSeal-500/40 text-[11px] font-mono text-slate-300 hover:text-amberSeal-300 flex items-center justify-between transition"
            >
              <span className="flex items-center gap-1.5">
                <HelpCircle size={11} className="text-amberSeal-400" />
                <span>Restart Guided Tour</span>
              </span>
              <span className="text-[10px] text-slate-400">9 Steps</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Avatar Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 p-1.5 pr-3 rounded-full bg-shinobi-900/90 border border-chakra-500/40 hover:border-chakra-400 shadow-chakra transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-lg"
        aria-label="Open Aura Companion"
      >
        <AuraAvatar mood={currentMood} size="sm" />
        <div className="text-left hidden sm:block">
          <div className="font-hud font-bold text-xs text-white group-hover:text-chakra-300 transition-colors flex items-center gap-1">
            <span>AURA</span>
            <Sparkles size={11} className="text-chakra-400 animate-pulse" />
          </div>
          <div className="text-[9px] font-mono text-slate-400">Guide & Companion</div>
        </div>
        <div className="text-slate-400 group-hover:text-white">
          {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </div>
      </button>
    </div>
  );
};
