import React, { useState } from 'react';
import { Send, Sparkles, Target, Flame, Zap } from 'lucide-react';
import { useNavora } from '../../context/useNavora';
import { AuraAvatar } from '../guide/AuraAvatar';
import {
  getTopPriorityMission,
  rankActiveMissions,
} from '../../services/missionPriorityService';
import type { GuideMood } from '../../types/guide';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
  mood?: GuideMood;
}

export const AiCompanionView: React.FC = () => {
  const { user, missions } = useNavora();
  const [input, setInput] = useState('');
  const [activeMood, setActiveMood] = useState<GuideMood>('gentle');

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Greetings, ${user.name}. I am Aura, your personal shinobi sensei and AI companion. You are currently an ${user.rank} at Level ${user.level} with an unbroken ${user.streak}-day consistency streak. What objective or tactical obstacle shall we conquer today?`,
      time: 'Just now',
      mood: 'gentle',
    },
  ]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || input).trim();

    if (!text) return;

    setActiveMood('focused');

    const newMsg: Message = {
      sender: 'user',
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);

    if (!textToSend) {
      setInput('');
    }

    setTimeout(() => {
      let reply = `A disciplined inquiry, ${user.name}. Direct your focus to breaking this into bite-sized D-Rank or C-Rank katas. Consistency builds legendary chakra reserves.`;
      let replyMood: GuideMood = 'gentle';

      const lower = text.toLowerCase();

      // PRIORITY INTELLIGENCE
      if (
        lower.includes('next') ||
        lower.includes('priorit') ||
        lower.includes('what should i do') ||
        lower.includes('what do i do first') ||
        lower.includes('which mission')
      ) {
        replyMood = 'focused';

        const topPriority = getTopPriorityMission(missions);

        if (topPriority) {
          const { mission, priority, score, reasons } = topPriority;

          const reasonText =
            reasons.length > 0
              ? reasons.slice(0, 2).join(' and ')
              : 'its overall priority score';

          reply =
            `Your highest-priority mission is "${mission.title}". ` +
            `${mission.difficulty} difficulty with +${mission.xpReward} XP. ` +
            `Priority level: ${priority.toUpperCase()} (score ${score}). ` +
            `I'm recommending it because of ${reasonText}. ` +
            `Let's focus on this objective first.`;
        } else {
          replyMood = 'encouraging';

          reply =
            `All active missions have been cleared, ${user.name}! ` +
            `You can create a new mission, plan tomorrow's objectives, ` +
            `or take some time to recharge.`;
        }
      }

      // URGENCY / DEADLINE INTELLIGENCE
      else if (
        lower.includes('urgent') ||
        lower.includes('urgency') ||
        lower.includes('deadline') ||
        lower.includes('due soon') ||
        lower.includes('due today') ||
        lower.includes('overdue')
      ) {
        replyMood = 'focused';

        const rankedMissions = rankActiveMissions(missions);

        const urgentMissions = rankedMissions.filter((result) =>
          result.reasons.some(
            (reason) =>
              reason === 'Overdue' ||
              reason === 'Due within 6 hours' ||
              reason === 'Due today'
          )
        );

        if (urgentMissions.length > 0) {
          const urgentMission = urgentMissions[0];
          const { mission, reasons } = urgentMission;

          reply =
            `I found an urgent objective: "${mission.title}". ` +
            `${reasons[0]}. ` +
            `It is ${mission.difficulty} and gives +${mission.xpReward} XP. ` +
            `I recommend handling this before lower-priority missions.`;
        } else {
          replyMood = 'encouraging';

          reply =
            `Good news, ${user.name}. I don't see any active mission that is overdue ` +
            `or due within the next 24 hours. You have some breathing room.`;
        }
      }

      // PROCRASTINATION INTELLIGENCE
      else if (
        lower.includes('procrastinat') ||
        lower.includes('stuck') ||
        lower.includes('lazy') ||
        lower.includes('tired')
      ) {
        replyMood = 'firm';

        const topPriority = getTopPriorityMission(missions);

        if (topPriority) {
          const { mission } = topPriority;

          reply =
            `You're procrastinating, ${user.name}, so I'm making the decision for you. ` +
            `Start with "${mission.title}". ` +
            `It is ${mission.difficulty} and gives +${mission.xpReward} XP. ` +
            `Do not worry about finishing everything right now. ` +
            `Work on this mission for just 10 minutes and get moving.`;
        } else {
          replyMood = 'encouraging';

          reply =
            `You don't have any active missions right now, ${user.name}. ` +
            `There is nothing to procrastinate on. ` +
            `Create one small mission and take the first step.`;
        }
      }

      // STREAK / DISCIPLINE INTELLIGENCE
      else if (
        lower.includes('streak') ||
        lower.includes('discipline')
      ) {
        replyMood = 'encouraging';

        reply =
          `Your current streak stands at ${user.streak} days. ` +
          `You are forging the unyielding discipline of a true shinobi. ` +
          `Let's protect this flame today.`;
      }

      // POSITIVE RESPONSE
      else if (
        lower.includes('thank') ||
        lower.includes('great') ||
        lower.includes('awesome') ||
        lower.includes('love')
      ) {
        replyMood = 'encouraging';

        reply =
          `You're very welcome, ${user.name}. I'm always here to help you move forward, ` +
          `one step at a time. Keep your focus and trust your progress.`;
      }

      setActiveMood(replyMood);

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          time: 'Just now',
          mood: replyMood,
        },
      ]);
    }, 500);
  };

  const handleQuickPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  return (
    <div
      data-tutorial="ai-companion-view"
      className="space-y-6 animate-fadeIn pb-16 lg:pb-8 max-w-4xl mx-auto"
    >
      <div className="hud-panel rounded-2xl p-6 border-chakra-500/40 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <AuraAvatar
              mood={activeMood}
              size="xxl"
              showHalo
            />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold font-hud tracking-wide text-white">
                  AURA // AI SHINOBI SENSEI
                </h1>

                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-chakra-500/20 text-chakra-300 border border-chakra-500/40 uppercase">
                  NEURAL COMPANION
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Gentle mentor for task breakdown, motivation, and
                anti-procrastination tactical guidance.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-shinobi-900 border border-shinobi-800 text-xs font-mono text-slate-300">
            <Sparkles size={14} className="text-chakra-400" />
            <span>Telemetry: Synchronized</span>
          </div>
        </div>
      </div>

      <div className="hud-panel rounded-2xl border-shinobi-800 flex flex-col h-[520px] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-shinobi-800 bg-shinobi-950/70 flex items-center justify-between font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-leaf-400 animate-pulse" />
            <span>SENSEI PROTOCOL // ACTIVE GUIDANCE MATRIX</span>
          </div>

          <span className="text-[11px] text-slate-500">
            ENCRYPTION: SHINOBI-256
          </span>
        </div>

        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.sender === 'user'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <AuraAvatar
                  mood={m.mood || 'gentle'}
                  size="md"
                  showHalo={false}
                />
              )}

              <div
                className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-chakra-500/20 border border-chakra-500/40 text-white rounded-tr-none shadow-chakra-sm'
                    : 'bg-shinobi-900 border border-shinobi-750 text-slate-200 rounded-tl-none'
                }`}
              >
                {m.text}

                <div className="mt-1 text-[10px] font-mono text-slate-500 text-right">
                  {m.time}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-shinobi-900 border border-chakra-500/40 text-chakra-300 flex items-center justify-center flex-shrink-0 font-hud font-bold text-xs shadow-chakra-sm">
                  {user.name.slice(0, 1)}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="px-3 pt-2 pb-1 border-t border-shinobi-800/80 bg-shinobi-950/60 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() =>
              handleQuickPrompt('What should I prioritize next?')
            }
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-shinobi-900 hover:bg-chakra-500/15 border border-shinobi-750 hover:border-chakra-500/40 text-[11px] font-mono text-slate-300 hover:text-chakra-300 flex items-center gap-1.5 transition"
          >
            <Target size={11} className="text-chakra-400" />
            <span>Prioritize Next Task</span>
          </button>

          <button
            onClick={() =>
              handleQuickPrompt(
                "I'm procrastinating and feeling stuck..."
              )
            }
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-shinobi-900 hover:bg-flame-500/15 border border-shinobi-750 hover:border-flame-500/40 text-[11px] font-mono text-slate-300 hover:text-flame-300 flex items-center gap-1.5 transition"
          >
            <Flame size={11} className="text-flame-400" />
            <span>Overcome Procrastination</span>
          </button>

          <button
            onClick={() =>
              handleQuickPrompt(
                'How is my streak and daily discipline holding up?'
              )
            }
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-shinobi-900 hover:bg-amberSeal-500/15 border border-shinobi-750 hover:border-amberSeal-500/40 text-[11px] font-mono text-slate-300 hover:text-amberSeal-300 flex items-center gap-1.5 transition"
          >
            <Zap size={11} className="text-amberSeal-400" />
            <span>Streak Check</span>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 border-t border-shinobi-800 bg-shinobi-950/90 flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask Aura for guidance, task breakdown, or focus encouragement..."
            value={input}
            onChange={(e) => {
              const value = e.target.value;

              setInput(value);

              if (value.trim()) {
                setActiveMood('focused');
              } else {
                setActiveMood('gentle');
              }
            }}
            className="flex-1 bg-shinobi-900 border border-shinobi-750 focus:border-chakra-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-chakra-400 font-mono transition"
          />

          <button
            type="submit"
            className="py-2.5 px-4 rounded-xl font-hud font-bold text-xs tracking-wider text-white bg-gradient-to-r from-[#c2410c] to-[#f97316] hover:from-[#f97316] hover:to-[#fb923c] transition shadow-[0_0_16px_rgba(249,115,22,0.4)] border border-[#9CA3AF]/30 flex items-center gap-1.5"
          >
            <span>CONSULT</span>
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};