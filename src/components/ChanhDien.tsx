import React, { useState, useEffect, useRef } from 'react';
import { pagodaAudio } from '../utils/audio';
import { Flame, Bell, Coins, Sparkles, Check, RefreshCw } from 'lucide-react';

interface ChanhDienProps {
  onAddMerit: (amount: number, reason: string) => void;
  meritPoints: number;
}

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
}

export const ChanhDien: React.FC<ChanhDienProps> = ({ onAddMerit }) => {
  // Wooden fish states
  const [tapCount, setTapCount] = useState<number>(0);
  const [isStriking, setIsStriking] = useState<boolean>(false);
  const [autoTap, setAutoTap] = useState<boolean>(false);
  const [tapSpeed, setTapSpeed] = useState<number>(800); // ms
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const nextId = useRef(0);

  // Incense offering states
  const [incenseCount, setIncenseCount] = useState<number>(3);
  const [isIncenseLit, setIsIncenseLit] = useState<boolean>(false);
  const [prayerVow, setPrayerVow] = useState<string>('');
  const [litVows, setLitVows] = useState<string[]>([
    'Cầu cho gia đạo bình an, tai qua nạn khỏi, muôn loài an lạc.',
  ]);

  // Coin donation state
  const [coinMessage, setCoinMessage] = useState<string | null>(null);

  // Mantras cycling
  const mantras = [
    'Nam Mô A Di Đà Phật',
    'Nam Mô Bổn Sư Thích Ca Mâu Ni Phật',
    'Nam Mô Đại Bi Quán Thế Âm Bồ Tát',
    'Nam Mô Đại Trí Văn Thù Sư Lợi Bồ Tát',
    'Nam Mô Địa Tạng Vương Bồ Tát',
  ];
  const currentMantra = mantras[tapCount % mantras.length];

  // Wooden fish click handler
  const handleStrikeWoodenFish = (e?: React.MouseEvent) => {
    pagodaAudio.playWoodenFish();
    setIsStriking(true);
    setTimeout(() => setIsStriking(false), 120);

    setTapCount((prev) => prev + 1);
    onAddMerit(1, 'Gõ mõ tụng kinh');

    // Create floating text
    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = rect && e ? e.clientX - rect.left : 100 + Math.random() * 60;
    const y = rect && e ? e.clientY - rect.top : 80;

    const id = nextId.current++;
    const texts = ['+1 Công Đức', 'Tịnh Tâm', 'An Nhiên', 'A Di Đà Phật'];
    const chosenText = texts[Math.floor(Math.random() * texts.length)];

    setFloatingTexts((prev) => [...prev.slice(-10), { id, text: chosenText, x, y }]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
    }, 1200);
  };

  // Bell strike
  const handleStrikeBell = () => {
    pagodaAudio.playTempleBell('low');
    onAddMerit(5, 'Thỉnh Đại Hồng Chung');
    const id = nextId.current++;
    setFloatingTexts((prev) => [
      ...prev.slice(-10),
      { id, text: 'Chuông ngân thanh tịnh · +5 Công Đức', x: 120, y: 60 },
    ]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
    }, 1400);
  };

  // Auto-tap effect
  useEffect(() => {
    if (!autoTap) return;
    const interval = setInterval(() => {
      handleStrikeWoodenFish();
    }, tapSpeed);
    return () => clearInterval(interval);
  }, [autoTap, tapSpeed]);

  // Incense lighting handler
  const handleLightIncense = (e: React.FormEvent) => {
    e.preventDefault();
    pagodaAudio.playTempleBell('high');
    setIsIncenseLit(true);
    const vowText = prayerVow.trim() || 'Nguyện đem lòng thành kính, gửi gắm cõi an vui.';
    setLitVows((prev) => [vowText, ...prev.slice(0, 4)]);
    onAddMerit(10 * incenseCount, `Dâng ${incenseCount} nén tâm hương`);
    setPrayerVow('');
  };

  // Coin donation handler
  const handleDonateCoin = (amount: number) => {
    pagodaAudio.playCoin();
    onAddMerit(amount * 5, `Phát tâm công đức (${amount} xu)`);
    setCoinMessage(`Phát tâm ${amount} xu thành công. Nguyện phước lành lan tỏa!`);
    setTimeout(() => setCoinMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Sanctum Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-amber-900/40 shadow-2xl bg-stone-900">
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
          <img
            src="/src/assets/images/temple_main_hall_altar_1794048560867.jpg"
            alt="Chánh Điện Chùa An Nhiên"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-95 scale-100 hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

          {/* Hero Overlay Text */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-amber-400 text-xs font-semibold tracking-wider uppercase mb-1">
                Không Gian Tịnh Độ
              </div>
              <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 drop-shadow-md">
                Chánh Điện Tam Bảo
              </h1>
              <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl text-balance">
                Nơi chiêm bái đức Phật Thích Ca, gõ mõ tụng kinh lắng đọng tâm tư, dâng nén tâm hương cầu nguyện an lành cho gia đạo.
              </p>
            </div>

            <button
              onClick={handleStrikeBell}
              className="px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold flex items-center gap-2 backdrop-blur-md transition-all shrink-0 hover:scale-105 active:scale-95"
            >
              <Bell className="w-4 h-4 text-amber-300 animate-gentle-pulse" />
              <span>Thỉnh Chuông Bát (+5)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Gõ Mõ Tụng Kinh (7 cols) */}
        <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div>
                <h2 className="font-cinzel text-lg font-bold text-amber-200">
                  Gõ Mõ Trúc Lâm
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Mỗi tiếng mõ là một lần rũ bỏ tạp niệm, tích lũy công đức
                </p>
              </div>

              {/* Auto Tap toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAutoTap(!autoTap)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    autoTap
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-stone-800 text-stone-300 hover:text-white'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${autoTap ? 'animate-spin' : ''}`} />
                  <span>{autoTap ? 'Tự Động: Bật' : 'Tự Động'}</span>
                </button>
              </div>
            </div>

            {/* Current Mantra Banner */}
            <div className="mt-4 p-3 rounded-xl bg-stone-950/60 border border-amber-900/30 text-center">
              <span className="text-xs text-amber-400/80 font-medium">Niệm Phật Chánh Niệm</span>
              <div className="font-cinzel text-base sm:text-lg font-bold text-amber-100 tracking-wide mt-0.5">
                {currentMantra}
              </div>
            </div>

            {/* Interactive Wooden Fish Stage */}
            <div className="relative py-8 flex flex-col items-center justify-center min-h-[260px]">
              {/* Floating texts container */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {floatingTexts.map((item) => (
                  <div
                    key={item.id}
                    className="absolute text-amber-300 font-bold text-sm tracking-wide animate-float-up pointer-events-none drop-shadow"
                    style={{ left: `${item.x}px`, top: `${item.y}px` }}
                  >
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Wooden Fish Visual Button */}
              <button
                onClick={handleStrikeWoodenFish}
                aria-label="Gõ Mõ"
                className={`group relative p-6 focus:outline-none transition-transform duration-100 ${
                  isStriking ? 'scale-90' : 'hover:scale-105 active:scale-95'
                }`}
              >
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-amber-600/10 blur-xl group-hover:bg-amber-500/20 transition-all" />

                {/* Wooden Fish 3D Illustration */}
                <div className="relative w-40 h-36 sm:w-48 sm:h-44 rounded-[40%] bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900 border-4 border-amber-700/60 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden">
                  {/* Wood Grain Highlights */}
                  <div className="absolute inset-2 rounded-[38%] border border-amber-600/30 pointer-events-none" />
                  <div className="absolute w-24 h-4 bg-amber-950/80 rounded-full top-8 shadow-inner" />
                  <div className="absolute w-8 h-8 rounded-full border-2 border-amber-500/50 flex items-center justify-center text-amber-400 text-lg">
                    ☸
                  </div>
                  {/* Fish Scales / Lotus pattern */}
                  <div className="absolute bottom-4 text-xs font-cinzel text-amber-400/60 tracking-widest uppercase">
                    Vô Thường
                  </div>
                </div>

                {/* Animated Mallet */}
                <div
                  className={`absolute -right-2 top-0 text-3xl transition-transform duration-100 ${
                    isStriking ? 'rotate-[-30deg] translate-y-3' : 'rotate-12'
                  }`}
                >
                  🪵
                </div>
              </button>

              <div className="text-center mt-2">
                <span className="text-xs text-stone-400">
                  Nhấn chuột hoặc chạm vào mõ để tụng niệm
                </span>
                <div className="text-xs text-amber-300 font-mono mt-1">
                  Đã gõ: <span className="font-bold text-amber-200">{tapCount}</span> biến tụng
                </div>
              </div>
            </div>
          </div>

          {/* Speed Controls for Auto-Tap */}
          {autoTap && (
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-400">Tốc độ tự động gõ:</span>
              <div className="flex items-center gap-1.5">
                {[
                  { label: 'Chậm', val: 1200 },
                  { label: 'Vừa', val: 800 },
                  { label: 'Nhanh', val: 450 },
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setTapSpeed(s.val)}
                    className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                      tapSpeed === s.val
                        ? 'bg-amber-600 text-white font-medium'
                        : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Thắp Nhang & Hòm Công Đức (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Section: Dâng Hương Cầu Nguyện */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-800">
              <Flame className="w-4 h-4 text-amber-400" />
              <h2 className="font-cinzel text-base font-bold text-amber-200">
                Dâng Nén Tâm Hương
              </h2>
            </div>

            {/* Incense Burner Display */}
            <div className="py-4 flex flex-col items-center justify-center">
              {/* Incense Sticks & Smoke */}
              <div className="relative flex justify-center items-end h-28 w-32 pb-2">
                {isIncenseLit && (
                  <div className="absolute top-0 flex gap-4 pointer-events-none">
                    {Array.from({ length: incenseCount }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-16 bg-gradient-to-t from-stone-400/40 via-stone-300/20 to-transparent rounded-full animate-smoke"
                        style={{ animationDelay: `${i * 0.4}s` }}
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-end gap-3.5 z-10">
                  {Array.from({ length: incenseCount }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      {/* Glowing burning ember */}
                      {isIncenseLit && (
                        <div className="w-1.5 h-2 bg-gradient-to-t from-red-600 to-amber-300 rounded-full shadow-[0_0_8px_#f59e0b] animate-pulse" />
                      )}
                      {/* Stick body */}
                      <div className="w-1 h-20 bg-amber-900 rounded-sm" />
                    </div>
                  ))}
                </div>

                {/* Bronze Incense Burner / Lư Hương */}
                <div className="absolute bottom-0 w-24 h-10 rounded-b-2xl bg-gradient-to-b from-amber-700 to-stone-900 border-2 border-amber-600/60 shadow-lg flex items-center justify-center">
                  <div className="text-[10px] font-cinzel text-amber-300/80">LƯ HƯƠNG</div>
                </div>
              </div>

              {/* Incense count selector */}
              <div className="flex items-center gap-2 mt-2">
                {[
                  { n: 1, label: '1 Nén (Tâm Hương)' },
                  { n: 3, label: '3 Nén (Tam Bảo)' },
                  { n: 5, label: '5 Nén (Ngũ Phần)' },
                ].map((item) => (
                  <button
                    key={item.n}
                    type="button"
                    onClick={() => setIncenseCount(item.n)}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                      incenseCount === item.n
                        ? 'bg-amber-600/30 text-amber-300 border border-amber-500/60 font-medium'
                        : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prayer Input Form */}
            <form onSubmit={handleLightIncense} className="space-y-3 mt-2">
              <input
                type="text"
                value={prayerVow}
                onChange={(e) => setPrayerVow(e.target.value)}
                placeholder="Nhập lời nguyện cầu (hoặc để trống cầu an chung)..."
                maxLength={100}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-600 focus:outline-none text-stone-200 placeholder:text-stone-500"
              />

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Thắp {incenseCount} Nén Nhang & Phát Nguyện (+{incenseCount * 10})</span>
              </button>
            </form>

            {/* Recent Vow preview */}
            {litVows.length > 0 && (
              <div className="mt-3 p-2.5 rounded-lg bg-stone-950/50 border border-stone-800 text-[11px] text-stone-400 italic">
                <span className="text-amber-400 not-italic font-medium">Lời nguyện vừa thắp: </span>
                &ldquo;{litVows[0]}&rdquo;
              </div>
            )}
          </div>

          {/* Section: Hòm Công Đức (Merit Box) */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <h2 className="font-cinzel text-base font-bold text-amber-200">
                  Hòm Công Đức
                </h2>
              </div>
              <span className="text-[11px] text-amber-400/80 font-medium">Tùy Tâm Hỷ Cúng</span>
            </div>

            <p className="text-xs text-stone-400 mt-2">
              Thả đồng xu ảo tích lũy phước lành, hỗ trợ tu tạo chốn thiền môn thanh tịnh.
            </p>

            {/* Quick coin buttons */}
            <div className="grid grid-cols-3 gap-2.5 mt-4">
              {[
                { amount: 1, label: '1 Xu', reward: '+5' },
                { amount: 5, label: '5 Xu', reward: '+25' },
                { amount: 10, label: '10 Xu', reward: '+50' },
              ].map((c) => (
                <button
                  key={c.amount}
                  onClick={() => handleDonateCoin(c.amount)}
                  className="p-3 rounded-xl bg-stone-950 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-600/50 transition-all text-center group active:scale-95"
                >
                  <div className="w-8 h-8 mx-auto rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                    🪙
                  </div>
                  <div className="text-xs font-semibold text-stone-200 mt-1.5">{c.label}</div>
                  <div className="text-[10px] text-amber-400 font-mono">{c.reward} Công Đức</div>
                </button>
              ))}
            </div>

            {coinMessage && (
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>{coinMessage}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
