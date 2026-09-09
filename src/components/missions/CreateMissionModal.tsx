import React, { useState } from 'react';
import { X, Plus, Scroll } from 'lucide-react';
import type { MissionDifficulty, MissionCategory } from '../../types';
import { DIFFICULTY_XP_MAP } from '../../services/missionRepository';
import { useNavora } from '../../context/useNavora';

interface CreateMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateMissionModal: React.FC<CreateMissionModalProps> = ({ isOpen, onClose }) => {
  const { createMission } = useNavora();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<MissionDifficulty>('C-Rank');
  const [category, setCategory] = useState<MissionCategory>('general');
  const [customXp, setCustomXp] = useState<number | ''>('');
  const [dueDate, setDueDate] = useState('');

  if (!isOpen) return null;

  const currentDefaultXp = DIFFICULTY_XP_MAP[difficulty].xp;
  const effectiveXp = customXp !== '' ? Number(customXp) : currentDefaultXp;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createMission({
      title: title.trim(),
      description: description.trim(),
      difficulty,
      category,
      customXp: customXp !== '' ? Number(customXp) : undefined,
      dueDate: dueDate || undefined,
    });

    // Reset & close
    setTitle('');
    setDescription('');
    setDifficulty('C-Rank');
    setCategory('general');
    setCustomXp('');
    setDueDate('');
    onClose();
  };

  const difficulties: MissionDifficulty[] = ['D-Rank', 'C-Rank', 'B-Rank', 'A-Rank', 'S-Rank'];
  const categories: { id: MissionCategory; label: string }[] = [
    { id: 'general', label: 'General Task' },
    { id: 'training', label: 'Taijutsu / Fitness' },
    { id: 'focus', label: 'Deep Work Kata' },
    { id: 'special', label: 'High Priority Quest' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg hud-panel rounded-2xl p-6 sm:p-7 border-chakra-500/40 shadow-chakra">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-shinobi-700/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-chakra-500/10 border border-chakra-500/30 flex items-center justify-center text-chakra-400">
              <Scroll size={18} />
            </div>
            <div>
              <h3 className="text-xl font-bold font-hud tracking-wide text-white">
                INSCRIBE NEW MISSION SCROLL
              </h3>
              <p className="text-xs text-slate-400">Establish a new objective and commit to your progression.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mission Title */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Mission Title <span className="text-flame-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Master Neural Network Backpropagation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-shinobi-900 border border-shinobi-700 focus:border-chakra-400 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-chakra-400 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Briefing / Details
            </label>
            <textarea
              rows={2}
              placeholder="Detailed tactical breakdown of requirements to complete this objective..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-shinobi-900 border border-shinobi-700 focus:border-chakra-400 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-chakra-400 transition resize-none"
            />
          </div>

          {/* Difficulty Tier Selection */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Difficulty Tier
            </label>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {difficulties.map((diff) => {
                const isSelected = difficulty === diff;
                const info = DIFFICULTY_XP_MAP[diff];
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => {
                      setDifficulty(diff);
                      if (customXp !== '') setCustomXp('');
                    }}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-chakra-400 bg-chakra-500/20 text-chakra-300 shadow-chakra-sm ring-1 ring-chakra-400'
                        : 'border-shinobi-750 bg-shinobi-900/60 hover:border-shinobi-600 text-slate-400'
                    }`}
                  >
                    <div className="font-mono text-xs font-bold">{diff.split('-')[0]}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">+{info.xp}XP</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category & Custom XP Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MissionCategory)}
                className="w-full bg-shinobi-900 border border-shinobi-700 focus:border-chakra-400 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-chakra-400 transition"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                XP Reward
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="5"
                  max="5000"
                  placeholder={currentDefaultXp.toString()}
                  value={customXp}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCustomXp(val === '' ? '' : Math.max(1, parseInt(val, 10)));
                  }}
                  className="w-full bg-shinobi-900 border border-shinobi-700 focus:border-chakra-400 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-chakra-400 transition"
                />
                <span className="absolute right-3 top-2.5 text-xs font-mono text-chakra-400">
                  +{effectiveXp} XP
                </span>
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Target Deadline (Optional)
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-shinobi-900 border border-shinobi-700 focus:border-chakra-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-chakra-400 transition"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-shinobi-700/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-mono text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl font-bold text-white bg-gradient-to-r from-[#2D4A3E] to-[#3A5A40] hover:from-[#3A5A40] hover:to-[#4F6F52] transition-all shadow-[0_0_16px_rgba(58,90,64,0.4)] border border-[#9CA3AF]/30 font-hud tracking-wider text-sm flex items-center gap-1.5"
            >
              <Plus size={16} />
              <span>ISSUE MISSION</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
