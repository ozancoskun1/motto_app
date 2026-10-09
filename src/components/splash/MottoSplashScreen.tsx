import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import mottoLogo from '../../assets/images/motto_logo.jpg';

interface MottoSplashScreenProps {
  onEnter: () => void;
}

export const MottoSplashScreen: React.FC<MottoSplashScreenProps> = ({ onEnter }) => {
  const [animationStep, setAnimationStep] = useState<'coffee' | 'card'>('coffee');
  const [showTitle, setShowTitle] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const triggerHaptic = () => {
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([18, 32, 18]);
      }
    } catch {
      // Graceful fallback
    }
  };

  const handleStart = () => {
    triggerHaptic();
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 450);
  };

  // Video exact timeline choreography:
  // 0.0s - 2.2s: Cute glowing coffee cup with floating heart steam and sparkle dots
  // 2.2s: Morph into dark neon couple squircle card with glowing sheen
  // 3.6s: Bold white "Motto" title fades in
  // 4.6s: "Aynı enerjide buluş." tagline fades in
  // 5.4s: Cyan pulsating indicator / interactive action ready
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationStep('card');
    }, 2200);

    const timer2 = setTimeout(() => {
      setShowTitle(true);
    }, 3600);

    const timer3 = setTimeout(() => {
      setShowTagline(true);
    }, 4600);

    const timer4 = setTimeout(() => {
      setShowIndicator(true);
    }, 5400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div 
      onClick={handleStart}
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#070A18] select-none cursor-pointer transition-opacity duration-500 overflow-hidden ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient background glow spots matching video */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cyan glow top-left */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/15 blur-[100px]" />
        {/* Magenta glow top-right */}
        <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-pink-500/15 blur-[100px]" />
        {/* Electric blue glow bottom-center */}
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-500/20 blur-[120px]" />
      </div>

      {/* Main vertical scene container */}
      <main 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-[390px] h-[820px] max-h-[96vh] rounded-[38px] overflow-hidden bg-[#070A18]/90 border border-white/10 shadow-2xl flex flex-col items-center justify-center px-6"
      >
        {/* Quick skip button */}
        <button
          onClick={handleStart}
          className="absolute top-6 right-6 z-30 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition-all backdrop-blur-md"
        >
          <span>Atla</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Center Stage: Phase 1 (Coffee Cup) & Phase 2 (Neon Couple Card) */}
        <div className="relative w-72 h-72 flex items-center justify-center mb-6">
          {/* PHASE 1: Illustrated Glowing Coffee Cup with Heart Steam (0.0s - 2.2s) */}
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
              animationStep === 'coffee' 
                ? 'opacity-100 scale-100 pointer-events-auto' 
                : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <div className="relative flex flex-col items-center justify-center">
              {/* Warm radial background glow */}
              <div className="absolute w-48 h-48 rounded-full bg-amber-400/25 blur-2xl pointer-events-none" />

              {/* Sparkle Confetti Dots */}
              <div className="absolute -top-4 -left-12 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
              <div className="absolute top-1 -right-14 w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_8px_#fb7185]" />
              <div className="absolute -bottom-6 -left-8 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_6px_#facc15]" />
              <div className="absolute bottom-4 right-12 w-2 h-2 rounded-full bg-cyan-300" />
              <div className="absolute -top-8 right-6 w-1.5 h-1.5 rounded-full bg-pink-300" />

              <svg width="190" height="190" viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Floating Geometric Heart */}
                <g className="animate-bounce" style={{ animationDuration: '2.4s' }}>
                  <path 
                    d="M95 38 L84 27 C78 21 68 23 64 31 C60 39 64 48 72 54 L95 76 L118 54 C126 48 130 39 126 31 C122 23 112 21 106 27 Z" 
                    fill="#FB7185"
                    filter="drop-shadow(0 0 10px rgba(251, 113, 133, 0.8))"
                  />
                </g>

                {/* Steam wavy lines */}
                <path 
                  d="M85 92 C80 84 90 76 85 68" 
                  stroke="#FACC15" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <path 
                  d="M95 90 C90 80 100 72 95 62" 
                  stroke="#FACC15" 
                  strokeWidth="3.2" 
                  strokeLinecap="round"
                  opacity="0.95"
                />
                <path 
                  d="M105 92 C100 84 110 76 105 68" 
                  stroke="#FACC15" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  opacity="0.85"
                />

                {/* Yellow Coffee Cup */}
                <rect 
                  x="56" 
                  y="96" 
                  width="78" 
                  height="34" 
                  rx="17" 
                  fill="#FACC15" 
                  stroke="#FEF08A" 
                  strokeWidth="2.5"
                  filter="drop-shadow(0 0 16px rgba(250, 204, 21, 0.7))"
                />
                <ellipse cx="95" cy="98" rx="31" ry="8" fill="#451A03" />

                {/* Cup Handle */}
                <path 
                  d="M133 100 C143 100 148 108 148 113 C148 119 142 124 133 124" 
                  stroke="#FACC15" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Saucer / Plate */}
                <rect x="44" y="132" width="102" height="4" rx="2" fill="#38BDF8" opacity="0.95" filter="drop-shadow(0 0 6px #38bdf8)" />
                <rect x="50" y="136" width="90" height="2.5" rx="1.25" fill="#FACC15" opacity="0.6" />
              </svg>
            </div>
          </div>

          {/* PHASE 2: Official Dark Neon Couple App Card (Reveals at 2.2s) */}
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out ${
              animationStep === 'card' 
                ? 'opacity-100 scale-100 pointer-events-auto' 
                : 'opacity-0 scale-75 pointer-events-none'
            }`}
          >
            <div className="relative w-64 h-64 rounded-[44px] overflow-hidden p-1 bg-[#070A18] border border-white/20 shadow-[0_0_60px_rgba(34,211,238,0.25)] group">
              {/* Couple Silhouette Image */}
              <img
                src={mottoLogo}
                alt="Motto"
                className="w-full h-full object-cover rounded-[40px]"
              />

              {/* Glowing Rim Gradient Accent */}
              <div 
                className="absolute inset-0 rounded-[40px] pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 24px rgba(34, 211, 238, 0.35), inset 0 0 35px rgba(251, 113, 133, 0.25)'
                }}
              />

              {/* Thin Arcs at the bottom matching video */}
              <div className="absolute inset-x-4 bottom-2 h-16 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 200 60" fill="none">
                  <path d="M10 50 Q100 0 190 50" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
                  <path d="M30 55 Q100 15 170 55" stroke="#FB7185" strokeWidth="1" opacity="0.35" />
                </svg>
              </div>

              {/* Diagonal Light Shimmer Sweep */}
              <div 
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none animate-in"
                style={{
                  animation: 'shimmerSweep 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                }}
              />
            </div>
          </div>
        </div>

        {/* Text Section: Phase 3 (Motto Title) & Phase 4 (Tagline) */}
        <div className="flex flex-col items-center justify-center text-center space-y-2.5 min-h-[90px]">
          {/* Bold White Wordmark: Motto */}
          <h1 
            className={`text-4xl font-black tracking-tight text-white transition-all duration-700 ${
              showTitle 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-4 scale-95'
            }`}
          >
            Motto
          </h1>

          {/* Tagline: Aynı enerjide buluş. */}
          <p 
            className={`text-slate-300 text-sm font-medium tracking-wide transition-all duration-700 ${
              showTagline 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-2'
            }`}
          >
            Aynı enerjide buluş.
          </p>
        </div>

        {/* Bottom Section: Phase 4 Pulsing Cyan Dot & Tap To Enter Button */}
        <div className="absolute bottom-12 flex flex-col items-center justify-center space-y-4">
          {/* Pulsing Cyan Dot matching video Frame 00:09 */}
          <div 
            className={`w-2.5 h-2.5 rounded-full bg-[#22D3EE] shadow-[0_0_12px_#22D3EE] transition-all duration-700 ${
              showIndicator ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-50'
            }`}
          />

          {/* Interactive Button with Haptic Feedback */}
          {showIndicator && (
            <button
              onClick={handleStart}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#FB7185] text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:opacity-95 active:scale-95 transition-all cursor-pointer animate-in fade-in zoom-in-95 duration-500"
            >
              Motto’ya gir
            </button>
          )}
        </div>
      </main>

      <style>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%) skewX(-15deg); }
          50%, 100% { transform: translateX(250%) skewX(-15deg); }
        }
      `}</style>
    </div>
  );
};
