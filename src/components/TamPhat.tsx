import React, { useState } from 'react';
import { pagodaAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Droplets, RotateCcw, Heart, ShieldCheck } from 'lucide-react';

interface TamPhatProps {
  onAddMerit: (amount: number, reason: string) => void;
}

export const TamPhat: React.FC<TamPhatProps> = ({ onAddMerit }) => {
  const [pourCount, setPourCount] = useState<number>(0);
  const [isPouring, setIsPouring] = useState<boolean>(false);
  const [waterRipples, setWaterRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);

  const vows = [
    {
      step: 1,
      target: 'Tắm bên vai phải',
      vow: 'Nguyện đoạn dứt tất cả điều ác (Tự tịnh kỳ ý)',
      meaning: 'Gột rửa ba nghiệp Tham, Sân, Si, nuôi dưỡng tâm hồn trong sáng.',
    },
    {
      step: 2,
      target: 'Tắm bên vai trái',
      vow: 'Nguyện làm tất cả mọi điều lành (Chư ác mạc tác)',
      meaning: 'Gieo hạt giống từ bi, yêu thương và giúp đỡ mọi người.',
    },
    {
      step: 3,
      target: 'Tắm toàn thân tượng',
      vow: 'Nguyện độ thoát tất cả chúng sinh (Chúng sinh vô biên thệ nguyện độ)',
      meaning: 'Hồi hướng phước lành, cầu cho muôn loài thoát khổ an vui.',
    },
  ];

  const handlePourWater = () => {
    if (isPouring) return;
    setIsPouring(true);
    pagodaAudio.playWaterSplash();

    // Add ripple
    const id = Date.now();
    setWaterRipples((prev) => [...prev, { id, x: 50 + (Math.random() - 0.5) * 20, y: 50 }]);
    setTimeout(() => {
      setWaterRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1500);

    const nextCount = pourCount + 1;
    setPourCount(nextCount);
    onAddMerit(15, `Tắm Phật gáo thứ ${nextCount}`);

    setTimeout(() => {
      setIsPouring(false);
      if (nextCount >= 3) {
        setCompleted(true);
        pagodaAudio.playTempleBell('high');
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#34d399', '#fbbf24'],
        });
      }
    }, 600);
  };

  const handleReset = () => {
    setPourCount(0);
    setCompleted(false);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium mb-2">
          <Droplets className="w-3.5 h-3.5" />
          <span>Nghi Thức Lễ Phật Đản</span>
        </div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-100">
          Nghi Thức Tắm Phật Sơ Sinh
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm mt-2 max-w-xl mx-auto text-balance">
          Tắm Phật là nghi lễ gột rửa bụi trần phiền não trong tâm trí, hướng về thanh tịnh và khơi dậy tánh Phật vốn sẵn có trong mỗi chúng ta.
        </p>
      </div>

      {/* Main Ritual Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Col: The Basin and Statue (7 cols) */}
        <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[460px]">
          {/* Subtle water light reflections */}
          <div className="absolute inset-0 bg-radial from-cyan-900/15 via-transparent to-transparent pointer-events-none" />

          {/* Golden Aura when completed */}
          {completed && (
            <div className="absolute inset-0 bg-radial from-amber-400/20 via-amber-600/5 to-transparent animate-pulse pointer-events-none" />
          )}

          {/* Statue and Water Basin */}
          <div className="relative flex flex-col items-center">
            {/* Pouring Ladle Water Stream Animation */}
            {isPouring && (
              <div className="absolute -top-12 -left-6 z-30 flex flex-col items-center pointer-events-none animate-bounce">
                <div className="text-4xl">🪵🫗</div>
                {/* Flowing Water Stream */}
                <div className="w-1.5 h-20 bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-100 rounded-full opacity-80 blur-[0.5px]" />
              </div>
            )}

            {/* Baby Buddha Statue (Iconic pose: one hand points to sky, one hand to earth) */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Halos & Aura */}
              <div
                className={`w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400/30 to-amber-200/10 blur-xl absolute -top-4 transition-all duration-700 ${
                  completed ? 'scale-150 opacity-100' : 'scale-100 opacity-60'
                }`}
              />

              {/* Golden Infant Buddha Figure Representation */}
              <div className="relative w-36 h-56 rounded-full bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 border-2 border-amber-300/80 shadow-[0_10px_30px_rgba(217,119,6,0.35)] flex flex-col items-center justify-between p-4 overflow-hidden">
                {/* Crown / Topknot */}
                <div className="w-6 h-6 rounded-full bg-amber-200 border border-amber-400 shadow-sm" />
                {/* Peaceful Smile & Lotus Mark */}
                <div className="text-amber-950 font-bold text-sm tracking-wider">🪷</div>
                {/* Hand pointing up */}
                <div className="text-xs font-cinzel font-bold text-amber-950 tracking-widest uppercase">
                  Phật Đản
                </div>
                {/* Lotus Pedestal */}
                <div className="w-24 h-6 rounded-full bg-pink-700/80 border border-pink-400/50 flex items-center justify-center text-[10px] text-pink-100 font-semibold">
                  Tòa Sen
                </div>
              </div>
            </div>

            {/* Lotus Water Basin / Thau Nước Thơm Ngát */}
            <div className="relative -mt-6 w-72 sm:w-88 h-32 rounded-[50%] bg-gradient-to-b from-cyan-950 via-stone-900 to-cyan-900 border-4 border-amber-600/60 shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden">
              {/* Floating Lotus Flowers & Petals */}
              <div className="absolute inset-0 flex items-center justify-around px-4 pointer-events-none opacity-80">
                <span className="text-xl animate-gentle-pulse">🪷</span>
                <span className="text-sm">🌸</span>
                <span className="text-lg">🪷</span>
                <span className="text-sm">🌸</span>
              </div>

              {/* Water Ripples */}
              {waterRipples.map((ripple) => (
                <div
                  key={ripple.id}
                  className="absolute rounded-full border-2 border-cyan-400/60 animate-ping pointer-events-none"
                  style={{ width: '120px', height: '60px' }}
                />
              ))}

              <div className="text-[11px] font-cinzel text-cyan-200/70 tracking-widest uppercase z-10">
                Bồn Nước Hương Trầm
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="mt-8 flex flex-col items-center gap-3 z-10">
            {!completed ? (
              <button
                onClick={handlePourWater}
                disabled={isPouring}
                className="py-3 px-8 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-500 hover:from-cyan-500 hover:to-teal-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-95 hover:shadow-cyan-500/25"
              >
                <Droplets className="w-4 h-4 text-cyan-200" />
                <span>
                  {pourCount === 0
                    ? 'Dâng Gáo Nước Thứ Nhất (Vai Phải)'
                    : pourCount === 1
                    ? 'Dâng Gáo Nước Thứ Hai (Vai Trái)'
                    : 'Dâng Gáo Nước Thứ Ba (Toàn Thân)'}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Hoàn Thành 3 Gáo Nước Thanh Tịnh!</span>
                </div>
                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs flex items-center gap-1 transition-colors"
                  title="Thực hiện lại nghi thức"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm Lại</span>
                </button>
              </div>
            )}

            <div className="text-xs text-stone-400">
              Tiến trình: <span className="font-bold text-amber-300">{pourCount}</span> / 3 gáo
            </div>
          </div>
        </div>

        {/* Right Col: Three Vows Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6">
            <h2 className="font-cinzel text-base font-bold text-amber-200 pb-3 border-b border-stone-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ba Lời Nguyện Khi Tắm Phật</span>
            </h2>

            <div className="space-y-3.5 mt-4">
              {vows.map((vow) => {
                const isCurrent = pourCount === vow.step - 1;
                const isDone = pourCount >= vow.step;

                return (
                  <div
                    key={vow.step}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isDone
                        ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                        : isCurrent
                        ? 'bg-amber-950/40 border-amber-600/60 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-stone-950/50 border-stone-800/80 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-amber-300">
                        Gáo Thứ {vow.step}: {vow.target}
                      </span>
                      {isDone && (
                        <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                          ✓ Đã dâng
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-semibold text-stone-200 mt-1">
                      &ldquo;{vow.vow}&rdquo;
                    </div>

                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      {vow.meaning}
                    </p>
                  </div>
                );
              })}
            </div>

            {completed && (
              <div className="mt-5 p-3.5 rounded-xl bg-gradient-to-r from-amber-950/50 to-stone-950 border border-amber-600/40 text-xs text-amber-200 flex items-start gap-2.5">
                <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Công đức tắm Phật vô lượng. Nguyện cầu thân tâm bạn luôn nhẹ nhõm, mọi lo toan phiền muộn theo dòng nước thơm tan biến vào hư không.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
