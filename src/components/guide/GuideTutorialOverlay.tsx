import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, X, Sparkles, Compass } from 'lucide-react';
import { useGuide } from '../../context/useGuide';
import { AuraAvatar } from './AuraAvatar';

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const GuideTutorialOverlay: React.FC = () => {
  const {
    isTutorialActive,
    currentStepIndex,
    currentStep,
    totalSteps,
    mood,
    nextStep,
    prevStep,
    skipTutorial,
  } = useGuide();

  const [highlightRect, setHighlightRect] = useState<Rect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update target element bounds whenever currentStep changes
  useEffect(() => {
    if (!isTutorialActive || !currentStep) return;

    const updateRect = () => {
      if (currentStep.targetSelector) {
        const el = document.querySelector(currentStep.targetSelector);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          const rect = el.getBoundingClientRect();
          setHighlightRect({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          });
          return;
        }
      }
      setHighlightRect(null);
    };

    // Small timeout to allow tab view rendering
    const timer = setTimeout(updateRect, 120);
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [isTutorialActive, currentStep, currentStepIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isTutorialActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipTutorial();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        nextStep();
      } else if (e.key === 'ArrowLeft' && currentStepIndex > 0) {
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTutorialActive, currentStepIndex, nextStep, prevStep, skipTutorial]);

  if (!isTutorialActive || !currentStep) return null;

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-auto overflow-hidden animate-fadeIn"
      aria-label="NAVORA Interactive Tutorial"
    >
      {/* Target Element Spotlight Cutout & Glowing Ring */}
      {highlightRect && (
        <div
          className="fixed transition-all duration-500 ease-out pointer-events-none rounded-2xl ring-4 ring-chakra-400 shadow-chakra z-50"
          style={{
            top: `${highlightRect.top - 6}px`,
            left: `${highlightRect.left - 6}px`,
            width: `${highlightRect.width + 12}px`,
            height: `${highlightRect.height + 12}px`,
          }}
        >
          {/* Pulsing corner guides */}
          <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-white rounded-tl" />
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-white rounded-tr" />
          <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-white rounded-bl" />
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-white rounded-br" />
        </div>
      )}

      {/* Dimmed backdrop */}
      <div className="absolute inset-0 bg-shinobi-950/75 backdrop-blur-[2px] transition-opacity" />

      {/* Guide Dialogue Floating HUD Card */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 sm:max-w-xl w-auto">
        <div className="hud-panel rounded-2xl p-5 sm:p-6 border-chakra-400/60 shadow-chakra bg-shinobi-950/95 backdrop-blur-2xl relative">
          <div className="hud-corner-tl" />
          <div className="hud-corner-br" />

          {/* Top Bar: Step Progress & Skip Button */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-shinobi-800/80">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-chakra-400 px-2 py-0.5 rounded bg-chakra-500/10 border border-chakra-500/30">
                STEP {currentStepIndex + 1} OF {totalSteps}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentStepIndex
                        ? 'w-5 bg-chakra-400 shadow-chakra-sm'
                        : idx < currentStepIndex
                        ? 'w-2 bg-leaf-400'
                        : 'w-2 bg-shinobi-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Skip Tutorial Button */}
            <button
              onClick={skipTutorial}
              className="group flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 hover:text-flame-300 px-2.5 py-1 rounded-lg hover:bg-flame-500/10 border border-transparent hover:border-flame-500/30 transition"
              title="Exit tutorial and enter application directly"
            >
              <span>SKIP TUTORIAL</span>
              <X size={14} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          {/* Body: Aura Avatar + Dialogue */}
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center flex-shrink-0">
              <AuraAvatar mood={mood} size="md" />
              <div className="mt-1.5 text-[10px] font-mono tracking-widest text-chakra-300 font-bold uppercase">
                AURA
              </div>
              <div className="text-[9px] font-mono text-slate-400 uppercase">Sensei</div>
            </div>

            <div className="min-w-0 flex-1 space-y-2">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-chakra-400">
                  <Compass size={13} />
                  <span className="uppercase font-semibold tracking-wider">
                    {currentStep.subtitle}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-hud tracking-wide text-white">
                  {currentStep.title}
                </h3>
              </div>

              {/* Dialogue Text with warm typography */}
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans space-y-2 max-h-48 overflow-y-auto pr-1">
                {currentStep.dialogue.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Focus Hint */}
              {currentStep.focusHint && (
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 pt-1">
                  <Sparkles size={12} className="text-amberSeal-400 flex-shrink-0" />
                  <span className="truncate">
                    <strong className="text-slate-300">Highlight:</strong> {currentStep.focusHint}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Navigation Controls */}
          <div className="mt-4 pt-3 border-t border-shinobi-800/80 flex items-center justify-between gap-3">
            <button
              onClick={prevStep}
              disabled={isFirstStep}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-hud font-bold tracking-wider transition ${
                isFirstStep
                  ? 'opacity-30 cursor-not-allowed text-slate-500'
                  : 'text-slate-300 hover:text-white bg-shinobi-900 border border-shinobi-700 hover:border-chakra-500/40'
              }`}
            >
              <ArrowLeft size={14} />
              <span>BACK</span>
            </button>

            <button
              onClick={nextStep}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl font-hud font-bold text-xs sm:text-sm tracking-wider text-white bg-gradient-to-r from-[#c2410c] to-[#f97316] hover:from-[#f97316] hover:to-[#fb923c] transition shadow-[0_0_16px_rgba(249,115,22,0.4)] border border-[#9CA3AF]/30"
            >
              <span>{isLastStep ? 'FINISH ORIENTATION' : 'NEXT STEP'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
