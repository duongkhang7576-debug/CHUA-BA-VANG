import React, { useState } from 'react';
import { pagodaAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Waves, Heart, Shield, Award } from 'lucide-react';

interface HoSenPhongSinhProps {
  onAddMerit: (amount: number, reason: string) => void;
}

interface ReleasedCreature {
  id: number;
  type: 'fish' | 'turtle' | 'bird';
  name: string;
  symbol: string;
  timestamp: number;
}

export const HoSenPhongSinh: React.FC<HoSenPhongSinhProps> = ({ onAddMerit }) => {
  const [releasedList, setReleasedList] = useState<ReleasedCreature[]>([
    { id: 1, type: 'fish', name: 'Đàn Cá Chép Đỏ', symbol: '🐟', timestamp: Date.now() - 3600000 },
    { id: 2, type: 'turtle', name: 'Cụ Rùa Vàng', symbol: '🐢', timestamp: Date.now() - 7200000 },
  ]);
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null);

  const creatures = [
    {
      type: 'fish' as const,
      name: 'Cá Chép Đỏ',
      symbol: '🐟',
      merit: 20,
      meaning: 'Vượt vũ môn hóa rồng, gieo mầm hanh thông kiên cường',
      color: 'from-orange-500/20 to-amber-500/10 border-orange-500/40 text-orange-300',
    },
    {
      type: 'turtle' as const,
      name: 'Rùa Vàng Bình An',
      symbol: '🐢',
      merit: 35,
      meaning: 'Trường thọ vững bền, tiêu trừ hoạn nạn, an cư lạc nghiệp',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300',
    },
    {
      type: 'bird' as const,
      name: 'Chim Bồ Câu Tự Do',
      symbol: '🕊️',
      merit: 50,
      meaning: 'Tung cánh trời cao, giải thoát ràng buộc phiền não',
      color: 'from-sky-500/20 to-indigo-500/10 border-sky-500/40 text-sky-300',
    },
  ];

  const handleRelease = (creature: (typeof creatures)[0]) => {
    pagodaAudio.playWaterSplash();
    setActiveAnimation(`${creature.symbol} Phóng sinh thành công!`);

    const newRelease: ReleasedCreature = {
      id: Date.now(),
      type: creature.type,
      name: creature.name,
      symbol: creature.symbol,
      timestamp: Date.now(),
    };

    setReleasedList([newRelease, ...releasedList]);
    onAddMerit(creature.merit, `Phóng sinh ${creature.name}`);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#10b981', '#f59e0b'],
    });

    setTimeout(() => {
      setActiveAnimation(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Lotus Pond Hero Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-amber-900/40 shadow-2xl bg-stone-900">
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
          <img
            src="/src/assets/images/temple_courtyard_lotus_pond_1794048561299.jpg"
            alt="Hồ Sen Phóng Sinh Chùa An Nhiên"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

          {/* Floating animated ripples & animals */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {activeAnimation && (
              <div className="px-5 py-2.5 rounded-2xl bg-stone-950/90 border border-emerald-500 text-emerald-300 text-sm font-semibold flex items-center gap-2 shadow-2xl animate-bounce backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{activeAnimation}</span>
              </div>
            )}
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-amber-400 text-xs font-semibold tracking-wider uppercase mb-1">
              Từ Bi Cứu Muôn Loài
            </div>
            <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 drop-shadow-md">
              Hồ Sen Phóng Sinh Tích Đức
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl text-balance">
              Phóng sinh cứu vớt sinh linh là đại hạnh từ bi của đạo Phật, nuôi dưỡng tình yêu thương với muôn loài, mang lại tuổi thọ và phước lành vô tận.
            </p>
          </div>
        </div>
      </div>

      {/* Release Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {creatures.map((c) => (
          <div
            key={c.name}
            className={`p-6 rounded-2xl border bg-stone-900/90 flex flex-col justify-between transition-all hover:scale-[1.02] shadow-lg`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="text-3xl p-2 rounded-xl bg-stone-950/60 border border-stone-800">
                  {c.symbol}
                </span>
                <span className="font-mono text-xs font-bold text-amber-400">
                  +{c.merit} Công Đức
                </span>
              </div>

              <h2 className="font-cinzel text-lg font-bold text-stone-100 mt-4">
                {c.name}
              </h2>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                {c.meaning}
              </p>
            </div>

            <button
              onClick={() => handleRelease(c)}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-900/40 hover:border-amber-600/60 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Waves className="w-3.5 h-3.5 text-cyan-400" />
              <span>Phóng Sinh Về Thiên Nhiên</span>
            </button>
          </div>
        ))}
      </div>

      {/* Compassionate Vow & Release History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-stone-900/90 border border-stone-800 rounded-2xl p-6">
          <h2 className="font-cinzel text-base font-bold text-amber-200 pb-3 border-b border-stone-800 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Kinh Phóng Sinh Hồi Hướng</span>
          </h2>

          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 mt-4 font-cinzel text-stone-300 text-xs sm:text-sm italic leading-relaxed space-y-2">
            <p>&ldquo;Nguyện đem công đức phóng sinh này,</p>
            <p>Hồi hướng mười phương khắp chốn đây,</p>
            <p>Chúng sinh dứt khổ tiêu phiền não,</p>
            <p>Đồng sinh Cực Lạc ngát hương mây.&rdquo;</p>
          </div>

          <p className="text-xs text-stone-400 mt-4 leading-relaxed">
            Mỗi sinh mạng được giải thoát hôm nay tượng trưng cho việc tháo gỡ một nút thắt oán kết trong vô lượng kiếp, mang lại tâm thái nhẹ nhàng thanh thản.
          </p>
        </div>

        <div className="lg:col-span-6 bg-stone-900/90 border border-stone-800 rounded-2xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <h2 className="font-cinzel text-base font-bold text-amber-200 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Nhật Ký Phóng Sinh</span>
            </h2>
            <span className="text-xs text-stone-400">
              Tổng cộng: <span className="font-bold text-amber-300">{releasedList.length}</span> lượt
            </span>
          </div>

          <div className="space-y-2.5 mt-4 max-h-56 overflow-y-auto pr-1">
            {releasedList.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-stone-950/50 border border-stone-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{item.symbol}</span>
                  <div>
                    <div className="font-medium text-stone-200">{item.name}</div>
                    <div className="text-[10px] text-stone-500">Đã trở về hồ sen thanh tịnh</div>
                  </div>
                </div>

                <span className="text-[10px] text-stone-400 font-mono">
                  {new Date(item.timestamp).toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
