import React from 'react';
import auraImage from '../../assets/aura/aura.jpeg';

interface AuraFirstMissionViewProps {
  onBack: () => void;
  onComplete: () => void;
}

const AuraFirstMissionView: React.FC<AuraFirstMissionViewProps> = ({
  onBack,
  onComplete,
}) => {
  return (
    <main className="min-h-screen w-screen bg-[#FFCA00] px-6 py-8 font-sans text-[#4A0005]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-2xl md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex min-h-[560px] items-end justify-center bg-[#FFF9E6] p-8">
            <img
              src={auraImage}
              alt="AURA, your NAVORA companion"
              className="h-full max-h-[520px] w-full object-contain object-bottom"
            />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12">
            <button
              type="button"
              onClick={onBack}
              className="mb-10 self-start text-sm font-bold text-[#B1000E] transition hover:underline"
            >
              ← BACK
            </button>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B1000E]">
              AURA
            </p>

            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#B1000E] sm:text-5xl">
              YOUR FIRST MISSION
            </h1>

            <div className="mt-8 rounded-3xl border-2 border-[#B1000E]/20 bg-[#FFF9E6] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4A0005]/60">
                D-RANK MISSION
              </p>

              <h2 className="mt-2 text-2xl font-black text-[#4A0005]">
                Set Up Your First Mission
              </h2>

              <p className="mt-3 leading-relaxed text-[#4A0005]/75">
                Create one small task you want to complete today. Finishing
                it will earn XP and begin your NAVORA journey.
              </p>

              <div className="mt-5 inline-flex rounded-full bg-[#B1000E] px-4 py-2 text-sm font-black text-white">
                +50 XP
              </div>
            </div>

            <div className="mt-8 rounded-2xl border-2 border-[#B1000E] bg-white p-5">
              <p className="font-bold text-[#B1000E]">
                “One mission at a time. I'll be here with you.”
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#4A0005]/70">
                Complete this introduction and NAVORA will take you to your
                Command Center.
              </p>
            </div>

            <button
              type="button"
              onClick={onComplete}
              className="mt-8 w-full rounded-full bg-[#B1000E] px-8 py-4 text-sm font-black tracking-wide text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#90000B] focus:outline-none focus:ring-2 focus:ring-[#B1000E] focus:ring-offset-2"
            >
              ENTER NAVORA →
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuraFirstMissionView;