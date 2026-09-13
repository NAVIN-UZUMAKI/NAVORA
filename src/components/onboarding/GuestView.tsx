import React from 'react';

interface GuestViewProps {
  onBack: () => void;
  onContinue: () => void;
}

const GuestView: React.FC<GuestViewProps> = ({
  onBack,
  onContinue,
}) => {
  return (
    <main className="min-h-screen w-screen bg-[#FFCA00] px-6 py-8 font-sans text-[#4A0005]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="w-full max-w-2xl rounded-[28px] bg-white p-8 text-center shadow-2xl sm:p-12">
          <button
            type="button"
            onClick={onBack}
            className="mb-8 mr-auto block text-sm font-bold text-[#B1000E] transition hover:underline"
          >
            ← BACK
          </button>

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B1000E]">
            NAVORA
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#B1000E] sm:text-5xl">
            GUEST MODE
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#4A0005]/75">
            Explore NAVORA without creating an account or setting a password.
          </p>

          <div className="mx-auto mt-8 max-w-lg rounded-3xl border-2 border-[#B1000E]/20 bg-[#FFF9E6] p-6 text-left">
            <p className="font-black text-[#B1000E]">
              Guest Mode
            </p>

            <p className="mt-2 text-sm leading-relaxed text-[#4A0005]/70">
              You can explore the dashboard and try NAVORA's features.
              Account setup and password creation are skipped.
            </p>
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="mt-10 w-full rounded-full bg-[#B1000E] px-8 py-4 text-sm font-black tracking-wide text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#90000B] focus:outline-none focus:ring-2 focus:ring-[#B1000E] focus:ring-offset-2"
          >
            CONTINUE AS GUEST →
          </button>
        </section>
      </div>
    </main>
  );
};

export default GuestView;