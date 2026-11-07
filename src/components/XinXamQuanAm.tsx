import React, { useState } from 'react';
import { FortuneStick } from '../types';
import { FORTUNE_STICKS } from '../data/fortuneSticks';
import { pagodaAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Copy, Check, RotateCcw, Share2, Compass } from 'lucide-react';

interface XinXamQuanAmProps {
  onAddMerit: (amount: number, reason: string) => void;
}

export const XinXamQuanAm: React.FC<XinXamQuanAmProps> = ({ onAddMerit }) => {
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [selectedStick, setSelectedStick] = useState<FortuneStick | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<FortuneStick[]>([]);

  const handleShakeTube = () => {
    if (isShaking) return;
    setIsShaking(true);
    setSelectedStick(null);
    pagodaAudio.playBambooRattle();

    // Bamboo rattling simulation
    setTimeout(() => {
      pagodaAudio.playBambooRattle();
    }, 400);

    setTimeout(() => {
      // Pick random stick
      const randomIndex = Math.floor(Math.random() * FORTUNE_STICKS.length);
      const stick = FORTUNE_STICKS[randomIndex];
      setSelectedStick(stick);
      setIsShaking(false);
      pagodaAudio.playTempleBell('high');

      onAddMerit(20, `Bốc ${stick.title}`);
      setHistory((prev) => [stick, ...prev.filter((s) => s.id !== stick.id).slice(0, 4)]);

      // Confetti for auspicious ranks
      if (stick.rank.includes('Cát')) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#fbbf24', '#d97706', '#ec4899'],
        });
      }
    }, 1200);
  };

  const handleCopyFortune = () => {
    if (!selectedStick) return;
    const text = `🪷 ${selectedStick.title} (${selectedStick.rank})\n\n📜 THƠ QUẺ:\n${selectedStick.poem.join('\n')}\n\n🌟 TỔNG GIẢI: ${selectedStick.overview}\n💼 CÔNG DANH: ${selectedStick.career}\n💰 TÀI LỘC: ${selectedStick.wealth}\n❤️ GIA ĐẠO: ${selectedStick.relationship}\n🌿 LỜI KHUYÊN: ${selectedStick.advice}\n\n(Chùa An Nhiên - Game Đi Chùa Online)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Linh Ứng Quán Thế Âm Bồ Tát</span>
        </div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-100">
          Xin Xăm Quán Âm Đại Sĩ
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm mt-2 max-w-xl mx-auto text-balance">
          Thành tâm niệm ba câu &ldquo;Nam Mô Đại Bi Quán Thế Âm Bồ Tát&rdquo;, định tâm ước nguyện việc cần hỏi (công danh, gia đạo, bổn mạng) rồi nhấn lắc ống xăm.
        </p>
      </div>

      {/* Divination Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Stage: The Bamboo Cylinder (5 cols) */}
        <div className="lg:col-span-5 bg-stone-900/90 border border-stone-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          {/* Bamboo Tube Graphics */}
          <div className="relative py-6">
            <div
              className={`relative transition-transform duration-300 ${
                isShaking ? 'rotate-[-12deg] translate-x-2 animate-bounce' : 'rotate-0'
              }`}
            >
              {/* Ejected stick if revealed */}
              {selectedStick && (
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-4 h-24 bg-amber-100 border border-amber-600 rounded-t-sm shadow-md flex items-center justify-center text-[10px] font-bold text-amber-900 writing-mode-vertical z-20 animate-gentle-pulse">
                  {selectedStick.title.split(':')[0]}
                </div>
              )}

              {/* Sticks protruding from top of tube */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <div
                    key={idx}
                    className="w-2.5 h-14 bg-amber-200 border-t-2 border-red-600 rounded-t-sm shadow-sm"
                    style={{
                      transform: `rotate(${(idx - 3) * 6}deg) translateY(${Math.sin(idx) * 4}px)`,
                    }}
                  />
                ))}
              </div>

              {/* Tube Cylinder Body */}
              <div className="relative w-28 h-48 rounded-b-3xl bg-gradient-to-b from-amber-700 via-stone-800 to-amber-950 border-4 border-amber-600/70 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full h-3 bg-amber-500/40 absolute top-2" />
                <div className="w-full h-3 bg-amber-500/40 absolute bottom-4" />
                <div className="text-amber-300 font-cinzel font-bold text-lg tracking-widest uppercase">
                  QUẺ XĂM
                </div>
                <div className="text-[10px] text-amber-400/80 mt-1">QUAN ÂM</div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 w-full max-w-xs space-y-2">
            <button
              onClick={handleShakeTube}
              disabled={isShaking}
              className={`w-full py-3 px-6 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                isShaking
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 active:scale-95'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isShaking ? 'Đang Lắc Ống Xăm...' : 'Lắc Ống Xăm Linh Ứng'}</span>
            </button>

            {selectedStick && (
              <button
                onClick={handleShakeTube}
                className="w-full py-2 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Bốc Quẻ Khác</span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-stone-400 mt-4 max-w-xs">
            Mỗi quẻ xăm là một lời khai thị nhắc nhở tu tâm hướng thiện, chuyển hóa nghịch cảnh thành thuận duyên.
          </p>
        </div>

        {/* Right Stage: Fortune Result Card (7 cols) */}
        <div className="lg:col-span-7">
          {selectedStick ? (
            <div className="bg-stone-900/95 border-2 border-amber-600/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              {/* Card Header & Rank */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-800">
                <div>
                  <span className="text-xs font-semibold text-amber-400">
                    Chiêm Bái Linh Quẻ
                  </span>
                  <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-100">
                    {selectedStick.title}
                  </h2>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-bold text-xs tracking-wide">
                  {selectedStick.rank}
                </div>
              </div>

              {/* Traditional 4-Line Poem Box */}
              <div className="my-5 p-4 rounded-xl bg-amber-950/40 border border-amber-800/40 text-center relative overflow-hidden">
                <div className="text-[11px] font-semibold text-amber-400/80 uppercase tracking-widest mb-2">
                  Bài Thơ Quẻ
                </div>
                <div className="space-y-1 font-cinzel text-stone-200 text-sm sm:text-base italic leading-relaxed">
                  {selectedStick.poem.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>

              {/* Detailed Interpretations */}
              <div className="space-y-3.5 text-xs text-stone-300">
                <div className="p-3 rounded-lg bg-stone-950/60 border border-stone-800">
                  <span className="font-semibold text-amber-300">Tổng quan: </span>
                  {selectedStick.overview}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800">
                    <span className="font-semibold text-amber-300 block mb-0.5">
                      Công Danh & Thi Cử
                    </span>
                    <span className="text-stone-300">{selectedStick.career}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800">
                    <span className="font-semibold text-amber-300 block mb-0.5">
                      Tài Lộc & Mưu Sự
                    </span>
                    <span className="text-stone-300">{selectedStick.wealth}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800">
                    <span className="font-semibold text-amber-300 block mb-0.5">
                      Gia Đạo & Tình Duyên
                    </span>
                    <span className="text-stone-300">{selectedStick.relationship}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800">
                    <span className="font-semibold text-amber-300 block mb-0.5">
                      Sức Khỏe & Thân Tâm
                    </span>
                    <span className="text-stone-300">{selectedStick.health}</span>
                  </div>
                </div>

                {/* Advice for spiritual practice */}
                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-600/40">
                  <span className="font-bold text-amber-300 block mb-1">
                    Lời Phật Dạy & Tu Dưỡng Thiện Tâm:
                  </span>
                  <p className="text-amber-100/90 leading-relaxed">{selectedStick.advice}</p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-end gap-2.5">
                <button
                  onClick={handleCopyFortune}
                  className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Đã Sao Chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao Chép Quẻ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[360px] bg-stone-900/40 border border-dashed border-stone-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 text-xl mb-3">
                🪷
              </div>
              <h3 className="font-cinzel text-lg font-bold text-stone-300">
                Chưa Có Quẻ Xăm
              </h3>
              <p className="text-xs text-stone-400 max-w-sm mt-1.5">
                Hãy nhấn nút &ldquo;Lắc Ống Xăm Linh Ứng&rdquo; ở bên trái để chiêm bái lời dạy của Bồ Tát Quán Thế Âm.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* History of Drawn Fortunes */}
      {history.length > 0 && (
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <h3 className="font-cinzel text-sm font-bold text-amber-200">
              Lịch Sử Quẻ Đã Bốc
            </h3>
            <span className="text-xs text-stone-400">{history.length} quẻ</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            {history.map((h) => (
              <button
                key={h.id}
                onClick={() => setSelectedStick(h)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedStick?.id === h.id
                    ? 'bg-amber-600/20 border-amber-500 text-amber-200'
                    : 'bg-stone-950/60 border-stone-800 hover:border-amber-700/60 text-stone-300'
                }`}
              >
                <div className="text-[11px] font-bold text-amber-400">{h.rank}</div>
                <div className="font-cinzel text-xs font-semibold mt-0.5 truncate">{h.title}</div>
                <div className="text-[10px] text-stone-400 truncate mt-1">{h.overview}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
