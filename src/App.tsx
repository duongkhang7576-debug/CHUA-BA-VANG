import React, { useState, useEffect } from 'react';
import { TempleZone } from './types';
import { HeaderNav } from './components/HeaderNav';
import { ChanhDien } from './components/ChanhDien';
import { XinXamQuanAm } from './components/XinXamQuanAm';
import { TamPhat } from './components/TamPhat';
import { CayUocNguyen } from './components/CayUocNguyen';
import { HoSenPhongSinh } from './components/HoSenPhongSinh';
import { VuonThien } from './components/VuonThien';
import { GitHubModal } from './components/GitHubModal';
import { MERIT_LEVELS } from './data/fortuneSticks';
import { Sparkles, Calendar, Award, BookOpen, ChevronRight, Github } from 'lucide-react';

interface MeritLog {
  id: number;
  amount: number;
  reason: string;
  time: string;
}

export default function App() {
  const [currentZone, setCurrentZone] = useState<TempleZone>('chanh_dien');
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState<boolean>(false);

  // Load merit points from localStorage
  const [meritPoints, setMeritPoints] = useState<number>(() => {
    const saved = localStorage.getItem('chua_an_nhien_merit');
    return saved ? parseInt(saved, 10) : 50;
  });

  const [meritLogs, setMeritLogs] = useState<MeritLog[]>(() => [
    {
      id: 1,
      amount: 50,
      reason: 'Viếng chùa đầu ngày khởi niệm an lành',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save merit to localStorage
  useEffect(() => {
    localStorage.setItem('chua_an_nhien_merit', meritPoints.toString());
  }, [meritPoints]);

  const handleAddMerit = (amount: number, reason: string) => {
    setMeritPoints((prev) => prev + amount);

    const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    setMeritLogs((prev) => [
      { id: Date.now(), amount, reason, time: now },
      ...prev.slice(0, 19),
    ]);

    setToastMessage(`+${amount} Công Đức: ${reason}`);
    setTimeout(() => {
      setToastMessage((current) => (current?.includes(reason) ? null : current));
    }, 2800);
  };

  // Determine current spiritual rank
  const currentRank = [...MERIT_LEVELS].reverse().find((lvl) => meritPoints >= lvl.minPoints) || MERIT_LEVELS[0];
  const nextRank = MERIT_LEVELS.find((lvl) => lvl.minPoints > meritPoints);

  const progressPercent = nextRank
    ? Math.min(
        100,
        Math.round(
          ((meritPoints - currentRank.minPoints) /
            (nextRank.minPoints - currentRank.minPoints)) *
            100
        )
      )
    : 100;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-600/30 selection:text-amber-200">
      {/* Top Bar Header */}
      <HeaderNav
        currentZone={currentZone}
        onSelectZone={setCurrentZone}
        meritPoints={meritPoints}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-amber-950/95 border border-amber-500/60 text-amber-200 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* Spiritual Rank & Progress Status Bar */}
        <section className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl shrink-0">
              {currentRank.badge}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-sm sm:text-base font-bold text-amber-200">
                  Cấp Độ: {currentRank.title}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                  Tầng {currentRank.level}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                {currentRank.description}
              </p>
            </div>
          </div>

          {/* Progress bar to next level */}
          <div className="md:w-72 lg:w-96 flex flex-col gap-1.5 shrink-0">
            <div className="flex items-center justify-between text-[11px] text-stone-400">
              <span>Công Đức: <strong className="text-amber-300 font-mono">{meritPoints}</strong></span>
              {nextRank ? (
                <span>
                  Lên cấp tiếp: <strong className="text-stone-300 font-mono">{nextRank.minPoints}</strong>
                </span>
              ) : (
                <span className="text-emerald-400 font-semibold">Đại Viên Mãn</span>
              )}
            </div>

            <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden border border-stone-800">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </section>

        {/* Dynamic Zone View */}
        {currentZone === 'chanh_dien' && (
          <ChanhDien onAddMerit={handleAddMerit} meritPoints={meritPoints} />
        )}
        {currentZone === 'xin_xam' && (
          <XinXamQuanAm onAddMerit={handleAddMerit} />
        )}
        {currentZone === 'tam_phat' && (
          <TamPhat onAddMerit={handleAddMerit} />
        )}
        {currentZone === 'cay_uoc_nguyen' && (
          <CayUocNguyen onAddMerit={handleAddMerit} />
        )}
        {currentZone === 'ho_sen' && (
          <HoSenPhongSinh onAddMerit={handleAddMerit} />
        )}
        {currentZone === 'vuon_thien' && (
          <VuonThien onAddMerit={handleAddMerit} />
        )}

        {/* Spiritual Log / Nhật Ký Tu Tập Strip */}
        <section className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <h2 className="font-cinzel text-sm font-bold text-amber-200">
                Nhật Ký Tích Lũy Công Đức
              </h2>
            </div>
            <span className="text-[11px] text-stone-500">
              Tự động lưu trữ trên trình duyệt của bạn
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mt-3">
            {meritLogs.slice(0, 6).map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-xl bg-stone-950/40 border border-stone-800/80 flex items-center justify-between text-xs"
              >
                <div className="truncate pr-2">
                  <div className="text-stone-300 font-medium truncate">{log.reason}</div>
                  <div className="text-[10px] text-stone-500">{log.time}</div>
                </div>
                <span className="font-mono text-amber-400 font-semibold shrink-0">
                  +{log.amount}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* GitHub Instructions Modal */}
      <GitHubModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-900 bg-stone-950 py-8 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-stone-400 font-bold">Chùa An Nhiên</span>
            <span>·</span>
            <span>Game Đi Chùa Online & Thiền Tịnh Tâm</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <button
              onClick={() => setIsGitHubModalOpen(true)}
              className="hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Kho Mã Nguồn GitHub</span>
            </button>
            <span>·</span>
            <span>A Di Đà Phật 🙏</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
