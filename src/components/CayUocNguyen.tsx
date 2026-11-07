import React, { useState } from 'react';
import { WishRibbon } from '../types';
import { INITIAL_WISH_RIBBONS } from '../data/fortuneSticks';
import { pagodaAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Plus, Filter, Tag } from 'lucide-react';

interface CayUocNguyenProps {
  onAddMerit: (amount: number, reason: string) => void;
}

export const CayUocNguyen: React.FC<CayUocNguyenProps> = ({ onAddMerit }) => {
  const [ribbons, setRibbons] = useState<WishRibbon[]>(INITIAL_WISH_RIBBONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất Cả');
  const [authorName, setAuthorName] = useState<string>('');
  const [wishText, setWishText] = useState<string>('');
  const [ribbonCategory, setRibbonCategory] = useState<WishRibbon['category']>('Bình An');
  const [ribbonColor, setRibbonColor] = useState<WishRibbon['color']>('red');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const categories = ['Tất Cả', 'Bình An', 'Công Danh', 'Sức Khỏe', 'Gia Đạo', 'Tài Lộc', 'Duyên Lành'];

  const colorStyles: Record<WishRibbon['color'], { bg: string; border: string; text: string; badge: string }> = {
    red: {
      bg: 'bg-red-950/60',
      border: 'border-red-600/50',
      text: 'text-red-200',
      badge: 'bg-red-600/30 text-red-300',
    },
    gold: {
      bg: 'bg-amber-950/60',
      border: 'border-amber-600/50',
      text: 'text-amber-200',
      badge: 'bg-amber-600/30 text-amber-300',
    },
    pink: {
      bg: 'bg-pink-950/60',
      border: 'border-pink-600/50',
      text: 'text-pink-200',
      badge: 'bg-pink-600/30 text-pink-300',
    },
    emerald: {
      bg: 'bg-emerald-950/60',
      border: 'border-emerald-600/50',
      text: 'text-emerald-200',
      badge: 'bg-emerald-600/30 text-emerald-300',
    },
  };

  const handleTieRibbon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    pagodaAudio.playTempleBell('high');
    const newRibbon: WishRibbon = {
      id: 'wish_' + Date.now(),
      author: authorName.trim() || 'Phật tử ẩn danh',
      wish: wishText.trim(),
      category: ribbonCategory,
      color: ribbonColor,
      likes: 1,
      createdAt: Date.now(),
    };

    setRibbons([newRibbon, ...ribbons]);
    setWishText('');
    setAuthorName('');
    setIsFormOpen(false);
    onAddMerit(25, `Treo dải băng ước nguyện (${ribbonCategory})`);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f59e0b', '#10b981', '#ec4899'],
    });
  };

  const handleBlessRibbon = (id: string) => {
    pagodaAudio.playWoodenFish();
    setRibbons((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
    onAddMerit(2, 'Cùng hiệp lực cầu nguyện');
  };

  const filteredRibbons =
    selectedCategory === 'Tất Cả'
      ? ribbons
      : ribbons.filter((r) => r.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Bodhi Tree Hero Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-amber-900/40 shadow-2xl bg-stone-900">
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
          <img
            src="/src/assets/images/temple_bodhi_wish_tree_1794048561842.jpg"
            alt="Cây Bồ Đề Ước Nguyện Chùa An Nhiên"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

          {/* Floating Silk Ribbons on Image */}
          <div className="absolute top-12 left-10 hidden sm:flex gap-4 pointer-events-none opacity-85">
            <div className="w-4 h-24 bg-red-600/90 rounded-b-md shadow-lg border border-red-400 rotate-6 animate-pulse" />
            <div className="w-4 h-28 bg-amber-500/90 rounded-b-md shadow-lg border border-amber-300 -rotate-3" />
            <div className="w-4 h-20 bg-emerald-600/90 rounded-b-md shadow-lg border border-emerald-400 rotate-12" />
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-amber-400 text-xs font-semibold tracking-wider uppercase mb-1">
                Gốc Đại Thụ Linh Thiêng
              </div>
              <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 drop-shadow-md">
                Cây Bồ Đề Ước Nguyện
              </h1>
              <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl text-balance">
                Gửi gắm ước nguyện bình an, công danh, sức khỏe lên cành Bồ Đề ngàn năm. Mọi ý niệm chân thành đều được đất trời chứng giám.
              </p>
            </div>

            <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold text-xs flex items-center gap-2 shadow-lg transition-all shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Treo Dải Lụa Cầu An (+25)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal / Form to Tie Wish Ribbon */}
      {isFormOpen && (
        <div className="bg-stone-900/95 border-2 border-amber-600/50 rounded-2xl p-6 shadow-2xl max-w-2xl mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <h2 className="font-cinzel text-lg font-bold text-amber-200 flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Viết Lời Nguyện Cầu Trên Dải Lụa</span>
            </h2>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-stone-400 hover:text-stone-200 text-xs"
            >
              Đóng ✕
            </button>
          </div>

          <form onSubmit={handleTieRibbon} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Họ tên / Pháp danh:
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Ví dụ: Phật tử Tuệ Quang..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 focus:outline-none text-stone-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Nguyện ước thuộc lĩnh vực:
                </label>
                <select
                  value={ribbonCategory}
                  onChange={(e) => setRibbonCategory(e.target.value as WishRibbon['category'])}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 focus:outline-none text-stone-200"
                >
                  <option value="Bình An">Bình An</option>
                  <option value="Công Danh">Công Danh & Học Tập</option>
                  <option value="Sức Khỏe">Sức Khỏe Gia Đình</option>
                  <option value="Gia Đạo">Gia Đạo Hòa Thuận</option>
                  <option value="Tài Lộc">Tài Lộc Hanh Thông</option>
                  <option value="Duyên Lành">Duyên Lành Tri Kỷ</option>
                </select>
              </div>
            </div>

            {/* Choose Ribbon Color */}
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5">
                Chọn màu sắc dải lụa:
              </label>
              <div className="flex items-center gap-3">
                {[
                  { color: 'red' as const, label: 'Đỏ May Mắn' },
                  { color: 'gold' as const, label: 'Vàng Trí Tuệ' },
                  { color: 'emerald' as const, label: 'Xanh Trường Thọ' },
                  { color: 'pink' as const, label: 'Hồng Lương Duyên' },
                ].map((item) => (
                  <button
                    key={item.color}
                    type="button"
                    onClick={() => setRibbonColor(item.color)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      ribbonColor === item.color
                        ? 'border-white text-white shadow-sm ring-1 ring-white/50'
                        : 'border-transparent text-stone-400 hover:text-stone-200'
                    } ${colorStyles[item.color].bg}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                Nội dung lời nguyện (chân thành, thiện lương):
              </label>
              <textarea
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder="Nguyện cầu cha mẹ mạnh khỏe bình an, con cháu hiếu thuận, mọi sự như ý nguyện..."
                rows={3}
                required
                maxLength={200}
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 focus:outline-none text-stone-200"
              />
              <div className="text-right text-[10px] text-stone-500">{wishText.length}/200 ký tự</div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-medium"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
              >
                Treo Dải Băng Lên Cây
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Ribbon Wall Section */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
          <div>
            <h2 className="font-cinzel text-base font-bold text-amber-200">
              Dải Băng Cầu Nguyện Đã Treo
            </h2>
            <p className="text-xs text-stone-400">
              Cùng hướng tâm chúc phúc cho lời nguyện của các đạo hữu
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50 font-medium'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Ribbons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredRibbons.map((ribbon) => {
            const style = colorStyles[ribbon.color];
            return (
              <div
                key={ribbon.id}
                className={`p-4 rounded-xl border ${style.border} ${style.bg} flex flex-col justify-between shadow-sm relative overflow-hidden group hover:scale-[1.01] transition-transform`}
              >
                {/* Visual Ribbon Top Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${style.badge}`}>
                      {ribbon.category}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {new Date(ribbon.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                  <p className="text-xs text-stone-100 font-medium leading-relaxed italic">
                    &ldquo;{ribbon.wish}&rdquo;
                  </p>
                </div>

                {/* Footer with author and blessing button */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-800/60 text-xs">
                  <span className="text-[11px] text-stone-400 truncate max-w-[150px]">
                    {ribbon.author}
                  </span>

                  <button
                    onClick={() => handleBlessRibbon(ribbon.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-rose-400 text-xs transition-colors group-hover:border-rose-900/50"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
                    <span className="font-mono text-stone-300">{ribbon.likes}</span>
                    <span className="hidden sm:inline text-[10px] text-stone-400">Hiệp Lực</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
