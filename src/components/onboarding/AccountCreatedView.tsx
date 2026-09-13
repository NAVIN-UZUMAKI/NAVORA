import React from 'react';

interface AccountCreatedViewProps {
  onContinue: () => void;
}

const AccountCreatedView: React.FC<AccountCreatedViewProps> = ({
  onContinue,
}) => {
  return (
    <main className="min-h-screen w-screen bg-[#FFCA00] px-6 py-8 font-sans text-[#4A0005]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="w-full max-w-2xl rounded-[28px] bg-white p-8 text-center shadow-2xl sm:p-12">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#B1000E]">
            <svg
              viewBox="0 0 64 64"
              className="h-14 w-14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M18 33 L28 43 L47 22"
                stroke="#FFCA00"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#B1000E]">
            NAVORA
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-[#B1000E] sm:text-5xl">
            ACCOUNT CREATED
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#4A0005]/75">
            Your NAVORA identity is ready. Your journey toward a more
            organized life begins now.
          </p>

          <button
            type="button"
            onClick={onContinue}
            className="mt-10 rounded-full bg-[#B1000E] px-10 py-4 text-sm font-black tracking-wide text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#90000B] focus:outline-none focus:ring-2 focus:ring-[#B1000E] focus:ring-offset-2"
          >
            CONTINUE →
          </button>
        </section>
      </div>
    </main>
  );
};

export default AccountCreatedView;