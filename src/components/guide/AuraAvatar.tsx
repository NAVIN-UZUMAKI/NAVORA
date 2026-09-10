import React from 'react';
import type { GuideMood } from '../../types/guide';

interface AuraAvatarProps {
  mood?: GuideMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showHalo?: boolean;
  className?: string;
}

export const AuraAvatar: React.FC<AuraAvatarProps> = ({
  mood = 'gentle',
  size = 'md',
  showHalo = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const haloByMood: Record<GuideMood, string> = {
    gentle: 'from-[#7C3AED]/45 via-[#fb923c]/25 to-transparent',
encouraging: 'from-[#DC2626]/45 via-[#7C3AED]/30 to-transparent',
focused: 'from-[#06B6D4]/40 via-[#7C3AED]/30 to-transparent',
    firm: 'from-red-500/60 via-rose-500/40 to-transparent',
  };

  const eyeColor =
    mood === 'firm'
      ? '#f87171'
      : mood === 'encouraging'
        ? '#e879f9'
        : '#a78bfa';

  return (
    <div
      className={`relative flex-shrink-0 select-none ${sizeClasses[size]} ${className}`}
    >
      {/* Aura's ambient energy */}
      {showHalo && (
        <>
          <div
            className={`absolute -inset-3 rounded-full bg-gradient-to-br ${haloByMood[mood]} blur-xl opacity-80 transition-all duration-700`}
          />

          <div
            className={`absolute -inset-1 rounded-full border border-[#7C3AED]/25 transition-all duration-700 ${
              mood === 'firm'
                ? 'shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                : 'shadow-[0_0_20px_rgba(139,92,246,0.25)]'
            }`}
          />
        </>
      )}

      {/* NAVORA character frame */}
      <div className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-br from-[#7C3AED] via-[#f97316] to-[#DC2626]/70 shadow-[0_0_25px_rgba(124,58,237,0.22)]">
        <div className="relative w-full h-full overflow-hidden rounded-full bg-[#090711]">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Atmospheric background */}
            <circle cx="60" cy="60" r="59" fill="#090711" />

            <circle
              cx="60"
              cy="60"
              r="53"
              stroke="#8b5cf6"
              strokeWidth="0.7"
              strokeDasharray="3 4"
              opacity="0.22"
            />

            <circle
              cx="60"
              cy="60"
              r="46"
              stroke="#c084fc"
              strokeWidth="0.5"
              opacity="0.10"
            />

            {/* Small spirit particles */}
            <circle cx="22" cy="34" r="1" fill="#a78bfa" opacity="0.7" />
            <circle cx="96" cy="28" r="0.8" fill="#f472b6" opacity="0.6" />
            <circle cx="101" cy="78" r="1" fill="#8b5cf6" opacity="0.6" />
            <circle cx="20" cy="82" r="0.7" fill="#c084fc" opacity="0.5" />

            {/* Shoulders / shinobi-inspired outfit */}
            <path
              d="M27 120 C28 99, 40 88, 60 87 C80 88, 92 99, 93 120 Z"
              fill="#151221"
              stroke="#8b5cf6"
              strokeWidth="1"
            />

            {/* Inner clothing */}
            <path
              d="M45 91 L60 106 L75 91 L78 120 L42 120 Z"
              fill="#0d0b14"
            />

            {/* Violet collar */}
            <path
              d="M45 92 L60 105 L75 92"
              stroke="#a78bfa"
              strokeWidth="1.4"
            />

            {/* Crimson center crest */}
            <path
              d="M60 101 L64 106 L60 111 L56 106 Z"
              fill="#ef4444"
              opacity="0.9"
            />

            {/* Neck */}
            <path
              d="M52 76 L52 91 C54 95, 66 95, 68 91 L68 76 Z"
              fill="#f6ded7"
            />

            {/* Face */}
            <path
              d="M39 48
                 C39 33, 81 33, 81 48
                 C81 65, 70 78, 60 81
                 C50 78, 39 65, 39 48 Z"
              fill="#f8e4dc"
            />

            {/* Subtle blush */}
            <ellipse
              cx="47"
              cy="63"
              rx="4"
              ry="1.8"
              fill="#f09aaa"
              opacity="0.25"
            />

            <ellipse
              cx="73"
              cy="63"
              rx="4"
              ry="1.8"
              fill="#f09aaa"
              opacity="0.25"
            />

            {/* Long dark indigo hair - back */}
            <path
              d="M32 48
                 C24 61, 27 91, 36 104
                 C36 84, 43 72, 43 49 Z"
              fill="#252044"
            />

            <path
              d="M88 48
                 C96 61, 93 91, 84 104
                 C84 84, 77 72, 77 49 Z"
              fill="#252044"
            />

            {/* Hair purple highlights */}
            <path
              d="M34 56 C31 72, 33 88, 38 97"
              stroke="#6d4aff"
              strokeWidth="1.5"
              opacity="0.7"
            />

            <path
              d="M86 56 C89 72, 87 88, 82 97"
              stroke="#8b5cf6"
              strokeWidth="1.5"
              opacity="0.7"
            />

            {/* Small shinobi hair ornaments */}
            <circle cx="35" cy="50" r="2.2" fill="#8b5cf6" opacity="0.8" />
            <circle cx="85" cy="50" r="2.2" fill="#8b5cf6" opacity="0.8" />

            {/* Front hair */}
            <path
              d="M36 43
                 C41 27, 79 27, 84 43
                 C77 36, 69 34, 60 36
                 C51 34, 43 36, 36 43 Z"
              fill="#302952"
            />

            {/* Hair strands */}
            <path
              d="M41 40 C44 49, 46 55, 47 60"
              stroke="#45366d"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M53 37 C55 47, 58 53, 60 57"
              stroke="#514078"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M79 40 C76 49, 74 55, 73 60"
              stroke="#45366d"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Soft hair highlight */}
            <path
              d="M45 34 C53 30, 67 30, 75 34"
              stroke="#a78bfa"
              strokeWidth="1.3"
              strokeLinecap="round"
              opacity="0.45"
            />

            {/* Eyes */}
            {mood === 'gentle' && (
              <>
                <path
                  d="M43 53 C47 50, 53 51, 55 54"
                  stroke="#392d4e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <path
                  d="M77 53 C73 50, 67 51, 65 54"
                  stroke="#392d4e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <ellipse
                  cx="49"
                  cy="57"
                  rx="4"
                  ry="4.8"
                  fill="#5b3b83"
                />

                <ellipse
                  cx="71"
                  cy="57"
                  rx="4"
                  ry="4.8"
                  fill="#5b3b83"
                />

                <circle cx="48" cy="55" r="1.5" fill="white" />
                <circle cx="70" cy="55" r="1.5" fill="white" />

                <path
                  d="M56 69 C58 71, 62 71, 64 69"
                  stroke="#c56c82"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </>
            )}

            {mood === 'encouraging' && (
              <>
                <path
                  d="M43 49 C48 46, 53 47, 55 50"
                  stroke="#49355f"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <path
                  d="M77 49 C72 46, 67 47, 65 50"
                  stroke="#49355f"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <ellipse
                  cx="49"
                  cy="56"
                  rx="4.7"
                  ry="5.2"
                  fill="#69429a"
                />

                <ellipse
                  cx="71"
                  cy="56"
                  rx="4.7"
                  ry="5.2"
                  fill="#69429a"
                />

                <circle cx="47.5" cy="54" r="1.8" fill="white" />
                <circle cx="69.5" cy="54" r="1.8" fill="white" />

                <circle
                  cx="51"
                  cy="58"
                  r="0.9"
                  fill={eyeColor}
                />

                <circle
                  cx="73"
                  cy="58"
                  r="0.9"
                  fill={eyeColor}
                />

                <path
                  d="M56 68 C58 73, 62 73, 64 68"
                  stroke="#d76587"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </>
            )}

            {mood === 'focused' && (
              <>
                <path
                  d="M43 51 C47 49, 53 50, 55 51"
                  stroke="#332743"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <path
                  d="M77 51 C73 49, 67 50, 65 51"
                  stroke="#332743"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <ellipse
                  cx="49"
                  cy="57"
                  rx="4"
                  ry="3.7"
                  fill="#392452"
                />

                <ellipse
                  cx="71"
                  cy="57"
                  rx="4"
                  ry="3.7"
                  fill="#392452"
                />

                <circle cx="48" cy="56" r="1.3" fill="white" />
                <circle cx="70" cy="56" r="1.3" fill="white" />

                {/* Tactical focus ring */}
                <circle
                  cx="49"
                  cy="57"
                  r="7"
                  stroke="#8b5cf6"
                  strokeWidth="0.7"
                  strokeDasharray="2 2"
                  opacity="0.7"
                />

                <path
                  d="M56 70 L64 70"
                  stroke="#a855f7"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </>
            )}

            {mood === 'firm' && (
              <>
                <path
                  d="M43 51 L54 48"
                  stroke="#32243f"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M77 51 L66 48"
                  stroke="#32243f"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <ellipse
                  cx="49"
                  cy="56"
                  rx="3.8"
                  ry="3.2"
                  fill="#321e45"
                />

                <ellipse
                  cx="71"
                  cy="56"
                  rx="3.8"
                  ry="3.2"
                  fill="#321e45"
                />

                <circle cx="48" cy="55" r="1.2" fill="white" />
                <circle cx="70" cy="55" r="1.2" fill="white" />

                <circle
                  cx="50"
                  cy="56"
                  r="0.8"
                  fill="#ef4444"
                />

                <circle
                  cx="72"
                  cy="56"
                  r="0.8"
                  fill="#ef4444"
                />

                <path
                  d="M56 70 C59 69, 61 69, 64 70"
                  stroke="#b33d58"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </>
            )}

            {/* Nose */}
            <circle
              cx="60"
              cy="64"
              r="0.7"
              fill="#d58d84"
              opacity="0.8"
            />

            {/* Tiny Aura energy mark */}
            <path
              d="M60 84 L62 87 L60 90 L58 87 Z"
              fill="#8b5cf6"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
