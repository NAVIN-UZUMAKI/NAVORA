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

  return (
    <div className={`relative flex-shrink-0 select-none ${sizeClasses[size]} ${className}`}>
      {/* Ambient glowing halo */}
      {showHalo && (
        <div
          className={`absolute -inset-1.5 rounded-full blur-md opacity-60 transition-colors duration-500 ${
            mood === 'firm'
              ? 'bg-gradient-to-tr from-flame-500 to-amberSeal-500'
              : mood === 'encouraging'
              ? 'bg-gradient-to-tr from-chakra-400 to-lightning-400'
              : mood === 'focused'
              ? 'bg-gradient-to-tr from-cyan-400 to-blue-500'
              : 'bg-gradient-to-tr from-chakra-400 via-cyan-300 to-purple-400'
          }`}
        />
      )}

      {/* Cybernetic HUD ring */}
      <div className="relative w-full h-full rounded-full p-0.5 bg-gradient-to-b from-chakra-400/80 via-shinobi-800 to-shinobi-900 shadow-hud">
        <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-slate-900 via-shinobi-900 to-shinobi-950 flex items-center justify-center">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background cyber pattern */}
            <circle cx="60" cy="60" r="58" fill="#0b0e17" />
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="#00f0ff"
              strokeWidth="0.75"
              strokeDasharray="4 2"
              opacity="0.35"
            />

            {/* Futuristic Shinobi Collar / High Neck Coat */}
            <path
              d="M32 118 C32 94, 48 88, 60 88 C72 88, 88 94, 88 118 Z"
              fill="#141a29"
              stroke="#00f0ff"
              strokeWidth="1.5"
            />
            {/* Collar Trim & Shinobi Crest */}
            <path d="M50 94 L60 102 L70 94" stroke="#ff2a5f" strokeWidth="1.2" fill="none" />
            <polygon points="60,98 64,103 60,108 56,103" fill="#00f0ff" />

            {/* Neck */}
            <path d="M53 78 L53 90 C53 92, 67 92, 67 90 L67 78 Z" fill="#fce7db" />

            {/* Head / Face Base */}
            <path
              d="M40 50 C40 34, 80 34, 80 50 C80 66, 68 78, 60 80 C52 78, 40 66, 40 50 Z"
              fill="#fff0e6"
            />

            {/* Soft Blush */}
            <ellipse cx="47" cy="62" rx="4" ry="2" fill="#ff99aa" opacity="0.45" />
            <ellipse cx="73" cy="62" rx="4" ry="2" fill="#ff99aa" opacity="0.45" />

            {/* Hair - Back Layer (Lavender Silver) */}
            <path
              d="M30 46 C24 64, 30 92, 36 100 C36 84, 42 70, 42 50 Z"
              fill="#b4b2cb"
            />
            <path
              d="M90 46 C96 64, 90 92, 84 100 C84 84, 78 70, 78 50 Z"
              fill="#b4b2cb"
            />

            {/* Cyber Ribbon & Earpiece */}
            <rect x="34" y="52" width="4" height="12" rx="2" fill="#00f0ff" />
            <circle cx="36" cy="58" r="1.5" fill="#ffffff" />
            <rect x="82" y="52" width="4" height="12" rx="2" fill="#00f0ff" />
            <circle cx="84" cy="58" r="1.5" fill="#ffffff" />

            {/* Eyes & Eyebrows depending on MOOD */}
            {mood === 'gentle' && (
              <>
                {/* Gentle curved eyebrows */}
                <path d="M44 48 C48 46, 54 48, 54 49" stroke="#605575" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M76 48 C72 46, 66 48, 66 49" stroke="#605575" strokeWidth="1.2" strokeLinecap="round" />
                {/* Soft warm anime eyes */}
                <path d="M44 54 C47 52, 53 52, 55 54" stroke="#251f38" strokeWidth="1.8" strokeLinecap="round" />
                <ellipse cx="49" cy="56" rx="4" ry="4.5" fill="#584578" />
                <circle cx="48" cy="54.5" r="1.5" fill="#ffffff" />
                <circle cx="51" cy="57" r="0.8" fill="#00f0ff" />

                <path d="M76 54 C73 52, 67 52, 65 54" stroke="#251f38" strokeWidth="1.8" strokeLinecap="round" />
                <ellipse cx="71" cy="56" rx="4" ry="4.5" fill="#584578" />
                <circle cx="70" cy="54.5" r="1.5" fill="#ffffff" />
                <circle cx="73" cy="57" r="0.8" fill="#00f0ff" />

                {/* Soft warm smile */}
                <path d="M57 69 C59 71, 61 71, 63 69" stroke="#cf627a" strokeWidth="1.4" strokeLinecap="round" />
              </>
            )}

            {mood === 'encouraging' && (
              <>
                {/* Cheerful high eyebrows */}
                <path d="M43 46 C48 44, 54 46, 55 48" stroke="#50426c" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M77 46 C72 44, 66 46, 65 48" stroke="#50426c" strokeWidth="1.4" strokeLinecap="round" />
                {/* Bright sparkling eyes */}
                <ellipse cx="49" cy="55" rx="4.5" ry="5" fill="#4d3575" />
                <circle cx="47.5" cy="53" r="1.8" fill="#ffffff" />
                <circle cx="51" cy="56" r="1.2" fill="#00f0ff" />

                <ellipse cx="71" cy="55" rx="4.5" ry="5" fill="#4d3575" />
                <circle cx="69.5" cy="53" r="1.8" fill="#ffffff" />
                <circle cx="73" cy="56" r="1.2" fill="#00f0ff" />

                {/* Bright open smile */}
                <path d="M56 68 C58 72, 62 72, 64 68 Z" fill="#e85b7b" />
              </>
            )}

            {mood === 'focused' && (
              <>
                {/* Analytical focus eyebrows */}
                <path d="M44 49 C48 48, 54 49, 55 50" stroke="#372c4e" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M76 49 C72 48, 66 49, 65 50" stroke="#372c4e" strokeWidth="1.5" strokeLinecap="round" />
                {/* Focused eyes */}
                <ellipse cx="49" cy="56" rx="4" ry="3.8" fill="#2d2242" />
                <circle cx="48" cy="55" r="1.4" fill="#ffffff" />
                <circle cx="50.5" cy="56.5" r="0.8" fill="#00f0ff" />

                <ellipse cx="71" cy="56" rx="4" ry="3.8" fill="#2d2242" />
                <circle cx="70" cy="55" r="1.4" fill="#ffffff" />
                <circle cx="72.5" cy="56.5" r="0.8" fill="#00f0ff" />

                {/* Tactical ocular HUD ring over left eye */}
                <circle cx="49" cy="56" r="7.5" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="3 1" fill="rgba(0,240,255,0.08)" />

                {/* Serious composed mouth */}
                <line x1="57" y1="69" x2="63" y2="69" stroke="#b04b65" strokeWidth="1.3" strokeLinecap="round" />
              </>
            )}

            {mood === 'firm' && (
              <>
                {/* Firm resolute eyebrows */}
                <path d="M44 50 L54 47" stroke="#32244a" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M76 50 L66 47" stroke="#32244a" strokeWidth="1.8" strokeLinecap="round" />
                {/* Resolute eyes */}
                <ellipse cx="49" cy="55" rx="3.8" ry="3.2" fill="#271b3d" />
                <circle cx="48.2" cy="54.2" r="1.2" fill="#ffffff" />
                <circle cx="50" cy="55.5" r="0.8" fill="#ff2a5f" />

                <ellipse cx="71" cy="55" rx="3.8" ry="3.2" fill="#271b3d" />
                <circle cx="70.2" cy="54.2" r="1.2" fill="#ffffff" />
                <circle cx="72" cy="55.5" r="0.8" fill="#ff2a5f" />

                {/* Determined firm mouth */}
                <path d="M57 70 C59 69, 61 69, 63 70" stroke="#9e3049" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}

            {/* Nose */}
            <circle cx="60" cy="63" r="0.8" fill="#e09282" />

            {/* Front Bangs & Anime Hair Strands (Layered Lavender Silver) */}
            <path
              d="M38 40 C44 26, 76 26, 82 40 C76 34, 66 34, 60 36 C54 34, 44 34, 38 40 Z"
              fill="#d6d4e8"
            />
            {/* Bang Strands */}
            <path d="M42 38 C46 48, 48 54, 47 58 C49 52, 51 46, 52 38" fill="#cfcde3" />
            <path d="M53 38 C56 46, 59 52, 60 56 C61 50, 64 45, 66 38" fill="#cfcde3" />
            <path d="M78 38 C74 48, 72 54, 73 58 C71 52, 69 46, 68 38" fill="#cfcde3" />

            {/* Hair highlight sweep */}
            <path
              d="M44 34 C52 31, 68 31, 76 34"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
