import React, { useState } from 'react';
import { Settings, User, Volume2, VolumeX, RotateCcw, Download, Database, ShieldCheck, Check, Compass, Sparkles } from 'lucide-react';
import { useNavora } from '../../context/useNavora';
import { useGuide } from '../../context/useGuide';
import { AuraAvatar } from '../guide/AuraAvatar';

export const SettingsView: React.FC = () => {
  const { user, updateUserName, isSoundMuted, toggleSound, resetAllData, missions, achievements } = useNavora();

  const [nameInput, setNameInput] = useState(user.name);
  const [nameSaved, setNameSaved] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    updateUserName(nameInput);
    setNameSaved(true);
    setTimeout(() => setNameSaved(false), 2000);
  };

  const handleExportData = () => {
    const data = {
      user,
      missions,
      achievements,
      exportDate: new Date().toISOString(),
      version: '1.0.0',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `navora_backup_${user.name.toLowerCase()}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const { restartTutorial, hasCompletedOnboarding } = useGuide();

  return (
    <div data-tutorial="settings-view" className="space-y-6 animate-fadeIn pb-16 lg:pb-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="hud-panel rounded-2xl p-6 border-chakra-500/40 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        <div className="flex items-center gap-3">
          <Settings className="w-7 h-7 text-chakra-400" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-hud tracking-wide text-white">
              SYSTEM CONFIGURATION & PROTOCOLS
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Personalize operative persona, audio feedback, and data backup routines.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Persona Profile */}
        <div className="hud-panel rounded-2xl p-5 sm:p-6 border-shinobi-800 space-y-4">
          <div className="flex items-center gap-2.5">
            <User size={18} className="text-chakra-400" />
            <h3 className="font-hud font-bold text-lg text-white">OPERATIVE IDENTITY</h3>
          </div>
          <p className="text-xs text-slate-400">
            Customize the active shinobi codename displayed throughout the NAVORA dashboard.
          </p>

          <form onSubmit={handleSaveName} className="space-y-3">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Codename / Call-sign
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="flex-1 bg-shinobi-900 border border-shinobi-750 focus:border-chakra-400 rounded-xl px-3.5 py-2 text-sm text-slate-100 uppercase font-hud font-bold focus:outline-none focus:ring-1 focus:ring-chakra-400 transition"
                />
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl font-hud font-bold text-xs tracking-wider text-shinobi-950 bg-gradient-to-r from-chakra-400 to-cyan-300 hover:from-chakra-300 hover:to-white transition shadow-chakra flex items-center gap-1"
                >
                  {nameSaved ? <Check size={14} /> : 'UPDATE'}
                </button>
              </div>
            </div>
            {nameSaved && (
              <div className="text-xs font-mono text-leaf-400 flex items-center gap-1">
                <Check size={12} />
                <span>Identity updated to {user.name}</span>
              </div>
            )}
          </form>
        </div>

        {/* Audio / Sensory Feedback */}
        <div className="hud-panel rounded-2xl p-5 sm:p-6 border-shinobi-800 space-y-4">
          <div className="flex items-center gap-2.5">
            <Volume2 size={18} className="text-chakra-400" />
            <h3 className="font-hud font-bold text-lg text-white">SENSORY FEEDBACK</h3>
          </div>
          <p className="text-xs text-slate-400">
            Synthesized Web Audio chimes for mission executions, level ups, and HUD tactile clicks.
          </p>

          <div className="flex items-center justify-between p-3 rounded-xl bg-shinobi-900/60 border border-shinobi-750">
            <div className="space-y-0.5">
              <div className="font-hud font-bold text-sm text-slate-200">Shinobi Audio Chimes</div>
              <div className="text-[11px] text-slate-400">
                {isSoundMuted ? 'Muted / Silent Mode' : 'Active / Synthesizer Live'}
              </div>
            </div>
            <button
              onClick={toggleSound}
              className={`p-2.5 rounded-xl border transition ${
                isSoundMuted
                  ? 'border-shinobi-700 bg-shinobi-950 text-slate-500'
                  : 'border-chakra-500/40 bg-chakra-500/20 text-chakra-300 shadow-chakra-sm'
              }`}
            >
              {isSoundMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Aura Anime Guide & Onboarding Replay */}
      <div className="hud-panel rounded-2xl p-5 sm:p-6 border-chakra-500/40 bg-shinobi-900/60 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <AuraAvatar mood="gentle" size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-hud font-bold text-lg text-white">
                  AURA // INTERACTIVE SENSEI ONBOARDING
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-chakra-500/20 text-chakra-300 border border-chakra-500/30">
                  {hasCompletedOnboarding ? 'STATUS: COMPLETED' : 'STATUS: SKIPPED/PENDING'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Replay the 9-step guided walkthrough across all NAVORA command modules anytime.
              </p>
            </div>
          </div>

          <button
            onClick={restartTutorial}
            className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-hud font-bold text-xs sm:text-sm tracking-wider text-shinobi-950 bg-gradient-to-r from-chakra-400 to-cyan-300 hover:from-chakra-300 hover:to-white transition shadow-chakra flex-shrink-0"
          >
            <Compass size={16} />
            <span>RESTART 9-STEP ORIENTATION</span>
          </button>
        </div>
      </div>

      {/* Cloud & Architecture Readiness Notice */}
      <div className="hud-panel rounded-2xl p-5 sm:p-6 border-chakra-500/30 bg-shinobi-900/40 space-y-3">
        <div className="flex items-center gap-2.5">
          <Database size={18} className="text-chakra-400" />
          <h3 className="font-hud font-bold text-base text-white">
            CLOUD DATABASE ARCHITECTURE (SUPABASE READY)
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          NAVORA is built with an abstracted Repository pattern (<code className="text-chakra-300">IMissionRepository</code>, <code className="text-chakra-300">IUserRepository</code>). The current data layer runs locally via typed localStorage. When you are ready to enable multi-user cloud sync with Supabase or PostgreSQL, you can seamlessly connect your backend credentials with zero UI refactoring required.
        </p>
        <div className="flex items-center gap-2 text-xs font-mono text-leaf-400">
          <ShieldCheck size={14} />
          <span>Architecture decoupled & ready for multi-tenant cloud deployment.</span>
        </div>
      </div>

      {/* Data Management & Danger Zone */}
      <div className="hud-panel rounded-2xl p-5 sm:p-6 border-shinobi-800 space-y-4">
        <h3 className="font-hud font-bold text-base text-white">DATA MAINTENANCE</h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleExportData}
            className="flex-1 py-2.5 px-4 rounded-xl border border-shinobi-700 bg-shinobi-900/80 hover:border-chakra-500/40 text-xs font-mono text-slate-200 transition flex items-center justify-center gap-2"
          >
            <Download size={15} className="text-chakra-400" />
            <span>EXPORT BACKUP JSON</span>
          </button>

          {!resetConfirm ? (
            <button
              onClick={() => setResetConfirm(true)}
              className="py-2.5 px-4 rounded-xl border border-flame-500/30 bg-flame-500/10 hover:bg-flame-500/20 text-xs font-mono text-flame-300 transition flex items-center justify-center gap-2"
            >
              <RotateCcw size={15} />
              <span>RESET PROGRESS TO DEFAULT</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  resetAllData();
                  setResetConfirm(false);
                }}
                className="py-2.5 px-4 rounded-xl bg-flame-600 hover:bg-flame-500 text-xs font-mono text-white font-bold transition"
              >
                CONFIRM RESET
              </button>
              <button
                onClick={() => setResetConfirm(false)}
                className="py-2.5 px-3 rounded-xl border border-shinobi-700 text-xs font-mono text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
