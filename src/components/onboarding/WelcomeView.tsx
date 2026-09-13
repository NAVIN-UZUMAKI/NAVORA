import React from 'react';
import auraImage from '../../assets/aura/aura.jpeg';

interface WelcomeViewProps {
  onCreateAccount: () => void;
  onLogin: () => void;
  onGuest: () => void;
}

const GrowthFlourish: React.FC = () => (
  <svg
    className="pointer-events-none absolute bottom-[5%] left-[6%] z-[2] h-[120px] w-[240px]"
    viewBox="0 0 240 120"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 91 C35 83 35 105 63 94 C91 83 72 57 105 64 C136 71 126 91 154 72 C174 58 183 48 203 30"
      stroke="#B1000E"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M32 103 C58 96 61 76 83 79 C104 82 106 65 125 55 C143 46 158 51 174 36"
      stroke="#B1000E"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.85"
    />

    <path
      d="M198 31 L202 15 L211 27"
      stroke="#B1000E"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M174 37 L177 22 L186 34"
      stroke="#B1000E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M7 91 L17 87"
      stroke="#B1000E"
      strokeWidth="3"
      strokeLinecap="round"
    />

    <text
      x="210"
      y="20"
      fill="#B1000E"
      fontSize="13"
      fontWeight="700"
    >
      ✦
    </text>
    <text
      x="184"
      y="31"
      fill="#B1000E"
      fontSize="10"
      fontWeight="700"
    >
      ✦
    </text>
    <text
      x="151"
      y="55"
      fill="#B1000E"
      fontSize="9"
      fontWeight="700"
    >
      ✦
    </text>
  </svg>
);

const QuoteUnderline: React.FC = () => (
  <svg
    className="pointer-events-none absolute -bottom-2 left-[56%] h-3 w-28"
    viewBox="0 0 112 12"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 6 C30 2 57 10 109 4"
      stroke="#B1000E"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const AuraAccent: React.FC = () => (
  <div
    className="pointer-events-none absolute left-[56%] top-[4%] z-[31] h-20 w-20 text-[#B1000E]"
    aria-hidden="true"
  >
    <svg viewBox="0 0 80 80" className="h-full w-full" fill="none">
      <path
        d="M35 58 C36 40 43 28 58 17"
        stroke="#B1000E"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M48 17 L60 15 L57 27"
        stroke="#B1000E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <span className="absolute left-8 top-0 text-sm font-bold">✦</span>
    <span className="absolute left-14 top-6 text-xs font-bold">✦</span>
    <span className="absolute left-3 top-8 text-[10px] font-bold">✦</span>
  </div>
);

const WelcomeView: React.FC<WelcomeViewProps> = ({
  onCreateAccount,
  onLogin,
  onGuest,
}) => {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#FFCA00] font-sans text-[#4A0005]">
      {/* Yellow base */}
      <div className="absolute inset-0 z-0 bg-[#FFCA00]" />

      {/* Organic white background curve */}
      <svg
        className="absolute inset-0 z-[1] h-full w-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="
            M 1345 0
            L 1920 0
            L 1920 1080
            L 980 1080
            C 950 930 955 790 985 650
            C 1025 465 1080 315 1190 190
            C 1245 125 1295 63 1345 0
            Z
          "
          fill="#FFFFFF"
        />
      </svg>

      {/* Brand */}
      <header className="absolute left-[6%] top-[11%] z-10 flex items-center gap-4">
        {/* Temporary vector emblem — we'll replace this with the approved logo asset later */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B1000E] shadow-md">
          <svg
            viewBox="0 0 48 48"
            className="h-9 w-9"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M24 5 L28 16 L40 16 L30 23 L34 35 L24 28 L14 35 L18 23 L8 16 L20 16 Z"
              fill="#FFCA00"
            />
          </svg>
        </div>

        <span className="text-3xl font-extrabold tracking-wide text-[#B1000E]">
          NAVORA
        </span>
      </header>

      {/* Main copy */}
      <section className="absolute left-[6.5%] top-[39%] z-10">
        <h1 className="text-[clamp(2rem,3.5vw,3.5rem)] font-black uppercase leading-none tracking-tight text-[#B1000E]">
          WELCOME TO NAVORA
        </h1>

        <p className="mt-5 text-[clamp(1.25rem,2.2vw,2rem)] font-bold leading-tight text-[#B1000E]">
          Your life. Organized. Evolved.
        </p>

        <div className="relative mt-5 w-fit">
          <p className="text-[clamp(1rem,1.55vw,1.4rem)] font-medium leading-relaxed text-[#4A0005]">
            “Organize your life. Focus on what matters. Build your future.”
          </p>

          <QuoteUnderline />
        </div>
      </section>

      {/* Decorative growth illustration */}
      <GrowthFlourish />

      {/* Action controls */}
      <section className="absolute left-[34.5%] top-[77.5%] z-20 flex flex-col items-center">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={onCreateAccount}
            className="h-[52px] w-[205px] rounded-full bg-[#B1000E] px-8 text-sm font-bold tracking-wide text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#90000B] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B1000E] focus:ring-offset-2 focus:ring-offset-[#FFCA00]"
          >
            CREATE ACCOUNT
          </button>

          <button
            type="button"
            onClick={onLogin}
            className="h-[52px] w-[170px] rounded-full border-2 border-[#B1000E] bg-transparent px-8 text-sm font-bold tracking-wide text-[#B1000E] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#B1000E]/10 focus:outline-none focus:ring-2 focus:ring-[#B1000E] focus:ring-offset-2 focus:ring-offset-[#FFCA00]"
          >
            LOGIN
          </button>
        </div>

        <button
          type="button"
          onClick={onGuest}
          className="mt-4 text-sm font-medium text-[#4A0005] transition hover:underline"
        >
          Continue as Guest
        </button>
      </section>

      {/* AURA */}
      <section className="absolute inset-y-0 right-0 z-[15] w-[39%]">
        <img
          src={auraImage}
          alt="AURA, the NAVORA companion"
          className="absolute bottom-0 right-0 h-full w-full object-contain object-bottom"
        />
      </section>

      {/* AURA speech bubble */}
      <aside className="absolute left-[47%] top-[14%] z-30 w-[22%] min-w-[280px] max-w-[425px]">
        <div className="relative rounded-2xl border-2 border-[#B1000E] bg-white px-5 py-5 shadow-lg">
          <p className="text-[15px] leading-snug text-[#220003]">
            <span className="font-bold">“Hey! I’m AURA.”</span>{' '}
            <span className="font-medium">
              Let’s get your life organized and help you move toward your
              goals.
            </span>
          </p>

          {/* Speech tail */}
          <div
            className="absolute -right-3 top-[78%] h-6 w-6 rotate-45 border-r-2 border-t-2 border-[#B1000E] bg-white"
            aria-hidden="true"
          />
        </div>
      </aside>

      {/* Speech bubble growth accent */}
      <AuraAccent />
    </main>
  );
};

export default WelcomeView;