import React, { useState } from 'react';
import { Send, Sparkles, Target, Flame, Zap } from 'lucide-react';
import { useNavora } from '../../context/useNavora';
import { AuraAvatar } from '../guide/AuraAvatar';
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

  const activeMissions = missions.filter((m) => m.status === 'active');

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const newMsg: Message = {
      sender: 'user',
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInput('');

    // Context-aware simulated response
    setTimeout(() => {
      let reply = `A disciplined inquiry, ${user.name}. Direct your focus to breaking this into bite-sized D-Rank or C-Rank katas. Consistency builds legendary chakra reserves.`;
      let replyMood: GuideMood = 'gentle';

      const lower = text.toLowerCase();
      if (lower.includes('procrastinat') || lower.includes('stuck') || lower.includes('lazy') || lower.includes('tired')) {
        replyMood = 'firm';
        reply = `Navin, listen to me closely. Do not let resistance dictate your destiny. Close all distracting scrolls, pick one small mission, and work for only 5 minutes. The barrier is entirely mental. I am right beside you.`;
      } else if (lower.includes('next') || lower.includes('priorit') || lower.includes('what should i do')) {
        replyMood = 'focused';
        if (activeMissions.length > 0) {
          const top = activeMissions[0];
          reply = `Based on your telemetry, execute "${top.title}" (${top.difficulty}, +${top.xpReward} XP). Conquering this will immediately push your level progression forward.`;
        } else {
          replyMood = 'encouraging';
          reply = `All pending missions have been cleared today! Inscribe a new scroll for tomorrow or take time to replenish your energy.`;
        }
      } else if (lower.includes('streak') || lower.includes('discipline')) {
        replyMood = 'encouraging';
        reply = `Your current streak stands at ${user.streak} days. You are forging the unyielding discipline of a true shinobi. Let's protect this flame today.`;
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
    <div data-tutorial="ai-companion-view" className="space-y-6 animate-fadeIn pb-16 lg:pb-8 max-w-4xl mx-auto">
      {/* Header with Aura Showcase */}
      <div className="hud-panel rounded-2xl p-6 border-chakra-500/40 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <AuraAvatar mood={activeMood} size="md" />
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
                Gentle mentor for task breakdown, motivation, and anti-procrastination tactical guidance.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-shinobi-900 border border-shinobi-800 text-xs font-mono text-slate-300">
            <Sparkles size={14} className="text-chakra-400" />
            <span>Telemetry: Synchronized</span>
          </div>
        </div>
      </div>

      {/* Chat Terminal Frame */}
      <div className="hud-panel rounded-2xl border-shinobi-800 flex flex-col h-[520px] overflow-hidden">
        {/* Terminal Header */}
        <div className="px-4 py-2.5 border-b border-shinobi-800 bg-shinobi-950/70 flex items-center justify-between font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-leaf-400 animate-pulse" />
            <span>SENSEI PROTOCOL // ACTIVE GUIDANCE MATRIX</span>
          </div>
          <span className="text-[11px] text-slate-500">ENCRYPTION: SHINOBI-256</span>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <AuraAvatar mood={m.mood || 'gentle'} size="sm" showHalo={false} />
              )}

              <div
                className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-chakra-500/20 border border-chakra-500/40 text-white rounded-tr-none shadow-chakra-sm'
                    : 'bg-shinobi-900 border border-shinobi-750 text-slate-200 rounded-tl-none'
                }`}
              >
                {m.text}
                <div className="mt-1 text-[10px] font-mono text-slate-500 text-right">{m.time}</div>
              </div>

              {m.sender === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-shinobi-900 border border-chakra-500/40 text-chakra-300 flex items-center justify-center flex-shrink-0 font-hud font-bold text-xs shadow-chakra-sm">
                  {user.name.slice(0, 1)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Tactical Prompt Chips */}
        <div className="px-3 pt-2 pb-1 border-t border-shinobi-800/80 bg-shinobi-950/60 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => handleQuickPrompt('What should I prioritize next?')}
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-shinobi-900 hover:bg-chakra-500/15 border border-shinobi-750 hover:border-chakra-500/40 text-[11px] font-mono text-slate-300 hover:text-chakra-300 flex items-center gap-1.5 transition"
          >
            <Target size={11} className="text-chakra-400" />
            <span>Prioritize Next Task</span>
          </button>
          <button
            onClick={() => handleQuickPrompt("I'm procrastinating and feeling stuck...")}
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-shinobi-900 hover:bg-flame-500/15 border border-shinobi-750 hover:border-flame-500/40 text-[11px] font-mono text-slate-300 hover:text-flame-300 flex items-center gap-1.5 transition"
          >
            <Flame size={11} className="text-flame-400" />
            <span>Overcome Procrastination</span>
          </button>
          <button
            onClick={() => handleQuickPrompt('How is my streak and daily discipline holding up?')}
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-shinobi-900 hover:bg-amberSeal-500/15 border border-shinobi-750 hover:border-amberSeal-500/40 text-[11px] font-mono text-slate-300 hover:text-amberSeal-300 flex items-center gap-1.5 transition"
          >
            <Zap size={11} className="text-amberSeal-400" />
            <span>Streak Check</span>
          </button>
        </div>

        {/* Input Bar */}
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
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-shinobi-900 border border-shinobi-750 focus:border-chakra-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-chakra-400 font-mono transition"
          />
          <button
            type="submit"
            className="py-2.5 px-4 rounded-xl font-hud font-bold text-xs tracking-wider text-shinobi-950 bg-gradient-to-r from-chakra-400 to-cyan-300 hover:from-chakra-300 hover:to-white transition shadow-chakra flex items-center gap-1.5"
          >
            <span>CONSULT</span>
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};
