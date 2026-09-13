import React, { useState } from 'react';

interface GetToKnowYouViewProps {
  onBack: () => void;
  onContinue: (name: string, preferredName: string) => void;
}

const GetToKnowYouView: React.FC<GetToKnowYouViewProps> = ({
  onBack,
  onContinue,
}) => {
  const [name, setName] = useState('');
  const [preferredName, setPreferredName] = useState('');

  const canContinue =
    name.trim().length > 0 && preferredName.trim().length > 0;

  return (
    <main className="min-h-screen w-screen bg-[#FFCA00] px-6 py-8 font-sans text-[#4A0005]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="w-full max-w-2xl rounded-[28px] bg-white p-8 shadow-2xl sm:p-12">
          <button
            type="button"
            onClick={onBack}
            className="mb-8 text-sm font-bold text-[#B1000E] transition hover:underline"
          >
            ← BACK
          </button>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B1000E]">
              GET TO KNOW YOU
            </p>

            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#B1000E] sm:text-5xl">
              WHO ARE YOU?
            </h1>

            <p className="mt-4 text-base font-medium leading-relaxed text-[#4A0005]/75">
              Tell NAVORA what you would like to be called.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            <div>
              <label
                htmlFor="your-name"
                className="mb-2 block text-sm font-bold text-[#4A0005]"
              >
                YOUR NAME
              </label>

              <input
                id="your-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-2xl border-2 border-[#B1000E]/20 bg-[#FFF9E6] px-5 py-4 text-[#4A0005] outline-none transition placeholder:text-[#4A0005]/40 focus:border-[#B1000E]"
              />
            </div>

            <div>
              <label
                htmlFor="preferred-name"
                className="mb-2 block text-sm font-bold text-[#4A0005]"
              >
                PREFERRED NAME
              </label>

              <input
                id="preferred-name"
                type="text"
                value={preferredName}
                onChange={(event) => setPreferredName(event.target.value)}
                placeholder="What should NAVORA call you?"
                className="w-full rounded-2xl border-2 border-[#B1000E]/20 bg-[#FFF9E6] px-5 py-4 text-[#4A0005] outline-none transition placeholder:text-[#4A0005]/40 focus:border-[#B1000E]"
              />
            </div>
          </div>

          <button
            type="button"
            disabled={!canContinue}
            onClick={() => onContinue(name.trim(), preferredName.trim())}
            className="mt-10 w-full rounded-full bg-[#B1000E] px-8 py-4 text-sm font-black tracking-wide text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#90000B] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            CONTINUE →
          </button>
        </section>
      </div>
    </main>
  );
};

export default GetToKnowYouView;