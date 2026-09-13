import React from 'react';

interface XpIntroductionViewProps {
  onBack: () => void;
  onContinue: () => void;
}

const XpIntroductionView: React.FC<XpIntroductionViewProps> = ({
  onBack,
  onContinue,
}) => {
  return (
    <main className="min-h-screen w-screen bg-[#FFCA00] px-6 py-8 font-sans text-[#4A0005]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <section className="w-full max-w-5xl rounded-[28px] bg-white p-8 shadow-2xl sm:p-12">
          <button
            type="button"
            onClick={onBack}
            className="mb-8 text-sm font-bold text-[#B1000E] transition hover:underline"
          >
            ← BACK
          </button>

          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B1000E]">
              NAVORA RPG SYSTEM
            </p>

            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#B1000E] sm:text-6xl">
              YOUR JOURNEY STARTS HERE
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-[#4A0005]/75">
              Every completed task moves you forward. Earn XP, level up, and
              unlock achievements as you grow.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-center">
            {['TASK', 'COMPLETE', '+ XP', 'LEVEL UP', 'ACHIEVEMENTS'].map(
              (item, index) => (
                <React.Fragment key={item}>
                  <div className="rounded-2xl border-2 border-[#B1000E]/20 bg-[#FFF9E6] px-5 py-4 font-black text-[#B1000E]">
                    {item}
                  </div>

                  {index < 4 && (
                    <span
                      className="text-2xl font-black text-[#B1000E]"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </React.Fragment>
              ),
            )}
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-3xl border-2 border-[#B1000E]/20 bg-[#FFF9E6] p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4A0005]/60">
                  CURRENT RANK
                </p>

                <h2 className="mt-2 text-2xl font-black text-[#B1000E]">
                  LEVEL 1 — NOVICE
                </h2>
              </div>

              <div className="text-right">
                <p className="text-2xl font-black text-[#B1000E]">
                  250 XP
                </p>

                <p className="text-sm font-bold text-[#4A0005]/60">
                  / 500 XP
                </p>
              </div>
            </div>

            <div className="mt-6 h-4 overflow-hidden rounded-full bg-[#B1000E]/10">
              <div className="h-full w-1/2 rounded-full bg-[#B1000E]" />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm font-bold text-[#4A0005]/60">
                NEXT LEVEL
              </span>

              <span className="text-sm font-black text-[#B1000E]">
                LEVEL 2 — RISING SHINOBI
              </span>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={onContinue}
              className="rounded-full bg-[#B1000E] px-10 py-4 text-sm font-black tracking-wide text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#90000B] focus:outline-none focus:ring-2 focus:ring-[#B1000E] focus:ring-offset-2"
            >
              LET'S BEGIN →
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default XpIntroductionView;