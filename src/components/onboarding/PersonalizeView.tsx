import React, { useState } from 'react';

interface PersonalizeViewProps {
  onBack: () => void;
  onContinue: (goal: string) => void;
}

const goals = [
  'Organize my daily life',
  'Improve my focus',
  'Build better habits',
  'Manage my studies',
  'Achieve my goals',
  'Something else',
];

const PersonalizeView: React.FC<PersonalizeViewProps> = ({
  onBack,
  onContinue,
}) => {
  const [selectedGoal, setSelectedGoal] = useState('');

  return (
    <main className="min-h-screen w-screen bg-[#FFCA00] px-6 py-8 font-sans text-[#4A0005]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="w-full max-w-3xl rounded-[28px] bg-white p-8 shadow-2xl sm:p-12">
          <button
            type="button"
            onClick={onBack}
            className="mb-8 text-sm font-bold text-[#B1000E] transition hover:underline"
          >
            ← BACK
          </button>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B1000E]">
              PERSONALIZE NAVORA
            </p>

            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#B1000E] sm:text-5xl">
              WHAT IS YOUR GOAL?
            </h1>

            <p className="mt-4 text-base font-medium text-[#4A0005]/75">
              Choose what you want NAVORA to help you improve.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {goals.map((goal) => {
              const isSelected = selectedGoal === goal;

              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setSelectedGoal(goal)}
                  className={`rounded-2xl border-2 p-5 text-left font-bold transition-all ${
                    isSelected
                      ? 'border-[#B1000E] bg-[#B1000E] text-white shadow-lg'
                      : 'border-[#B1000E]/20 bg-[#FFF9E6] text-[#4A0005] hover:border-[#B1000E]/60'
                  }`}
                >
                  <span className="block">{goal}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled={!selectedGoal}
            onClick={() => onContinue(selectedGoal)}
            className="mt-10 w-full rounded-full bg-[#B1000E] px-8 py-4 text-sm font-black tracking-wide text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#90000B] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            CONTINUE →
          </button>
        </section>
      </div>
    </main>
  );
};

export default PersonalizeView;