import React, { useState, useEffect } from 'react';
import { pagodaAudio } from '../utils/audio';
import { BUDDHIST_QUOTES } from '../data/fortuneSticks';
import { Play, Pause, RotateCcw, Wind, Sparkles, Moon } from 'lucide-react';

interface VuonThienProps {
  onAddMerit: (amount: number, reason: string) => void;
}

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

export const VuonThien: React.FC<VuonThienProps> = ({ onAddMerit }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [countdown, setCountdown] = useState<number>(4);
  const [breathCycles, setBreathCycles] = useState<number>(0);
  const [quoteIndex, setQuoteIndex] = useState<number>(0);

  const phaseDurations: Record<BreathPhase, number> = {
    inhale: 4,
    hold: 4,
    exhale: 4,
    rest: 4,
  };

  const phaseLabels: Record<BreathPhase, { title: string; desc: string; color: string }> = {
    inhale: {
      title: 'Hít Vào',
      desc: 'Hít vào nhẹ nhàng sâu lắng, đón nhận năng lượng tươi mới',
      color: 'text-cyan-300',
    },
    hold: {
      title: 'Giữ Hơi',
      desc: 'Giữ tâm tĩnh lặng, cảm nhận sự an trú trong cơ thể',
      color: 'text-amber-300',
    },
    exhale: {
      title: 'Thở Ra',
      desc: 'Thở ra chậm rãi, buông bỏ tất cả lo âu phiền muộn',
      color: 'text-emerald-300',
    },
    rest: {
      title: 'Tĩnh Lặng',
      desc: 'Nghỉ ngơi an nhiên, trở về với hơi thở tự nhiên',
      color: 'text-stone-300',
    },
  };

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Switch phase
          let nextPhase: BreathPhase = 'inhale';
          if (phase === 'inhale') nextPhase = 'hold';
          else if (phase === 'hold') nextPhase = 'exhale';
          else if (phase === 'exhale') nextPhase = 'rest';
          else {
            nextPhase = 'inhale';
            setBreathCycles((c) => {
              const nextC = c + 1;
              if (nextC % 3 === 0) {
                onAddMerit(10, 'Hoàn thành 3 chu kỳ thiền thở chánh niệm');
              }
              return nextC;
            });
            setQuoteIndex((q) => (q + 1) % BUDDHIST_QUOTES.length);
          }

          setPhase(nextPhase);
          pagodaAudio.playTempleBell('high');
          return phaseDurations[nextPhase];
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const handleToggle = () => {
    if (!isActive) {
      pagodaAudio.playTempleBell('high');
      setCountdown(4);
      setPhase('inhale');
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCountdown(4);
    setBreathCycles(0);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-2">
          <Wind className="w-3.5 h-3.5" />
          <span>Thiền Định & Chánh Niệm</span>
        </div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-100">
          Vườn Thiền Trúc Lâm
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm mt-2 max-w-xl mx-auto text-balance">
          Thở vào tâm tĩnh lặng, thở ra miệng mỉm cười. Thực hành phương pháp thiền thở 4-4-4 giúp điều hòa nhịp tim, xoa dịu tâm trí và tái tạo năng lượng an lành.
        </p>
      </div>

      {/* Main Breathing Centerpiece */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center relative overflow-hidden min-h-[460px]">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 bg-radial from-emerald-950/20 via-transparent to-transparent pointer-events-none" />

        {/* Dynamic Expanding/Contracting Breathing Ring */}
        <div className="relative flex items-center justify-center my-6">
          {/* Outer Breathing Halo */}
          <div
            className={`w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-stone-700/60 flex items-center justify-center transition-all duration-1000 ${
              phase === 'inhale'
                ? 'scale-125 bg-cyan-950/30 border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.25)]'
                : phase === 'hold'
                ? 'scale-125 bg-amber-950/30 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.25)]'
                : phase === 'exhale'
                ? 'scale-90 bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                : 'scale-95 bg-stone-900/40 border-stone-700'
            }`}
          >
            {/* Inner Ring */}
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-stone-800 bg-stone-950/90 flex flex-col items-center justify-center text-center p-4">
              <span className={`text-xs font-semibold uppercase tracking-widest ${phaseLabels[phase].color}`}>
                {phaseLabels[phase].title}
              </span>

              <div className="font-mono text-4xl sm:text-5xl font-bold text-stone-100 tabular-nums my-1">
                {countdown}
              </div>

              <span className="text-[11px] text-stone-400">giây</span>
            </div>
          </div>
        </div>

        {/* Phase Description */}
        <div className="text-center max-w-md my-4">
          <p className="text-xs sm:text-sm text-stone-300 font-medium">
            {phaseLabels[phase].desc}
          </p>
          <div className="text-xs text-stone-500 mt-2">
            Đã hoàn thành: <span className="font-bold text-amber-300">{breathCycles}</span> chu kỳ chánh niệm
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handleToggle}
            className={`py-2.5 px-6 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95 ${
              isActive
                ? 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Tạm Dừng' : 'Bắt Đầu Tọa Thiền'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition-colors"
            title="Đặt lại"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Buddhist Wisdom Quote */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Khai Thị Chánh Niệm</span>
        </div>
        <blockquote className="font-cinzel text-base sm:text-lg text-amber-200 italic leading-relaxed">
          &ldquo;{BUDDHIST_QUOTES[quoteIndex]}&rdquo;
        </blockquote>
      </div>
    </div>
  );
};
