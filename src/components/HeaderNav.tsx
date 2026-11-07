import React, { useState } from 'react';
import { TempleZone } from '../types';
import { pagodaAudio } from '../utils/audio';
import { Volume2, VolumeX, Sparkles, Github, Music } from 'lucide-react';

interface HeaderNavProps {
  currentZone: TempleZone;
  onSelectZone: (zone: TempleZone) => void;
  meritPoints: number;
  onOpenGitHubModal: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentZone,
  onSelectZone,
  meritPoints,
  onOpenGitHubModal,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(pagodaAudio.getMuted());
  const [isAmbient, setIsAmbient] = useState<boolean>(pagodaAudio.isAmbientOn());

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    pagodaAudio.setMuted(nextMuted);
    setIsMuted(nextMuted);
    if (nextMuted) {
      setIsAmbient(false);
    }
  };

  const handleToggleAmbient = () => {
    const active = pagodaAudio.toggleAmbient();
    setIsAmbient(active);
    if (active && isMuted) {
      pagodaAudio.setMuted(false);
      setIsMuted(false);
    }
  };

  const zones: { id: TempleZone; label: string }[] = [
    { id: 'chanh_dien', label: 'Chánh Điện' },
    { id: 'xin_xam', label: 'Xin Xăm' },
    { id: 'tam_phat', label: 'Tắm Phật' },
    { id: 'cay_uoc_nguyen', label: 'Cây Ước Nguyện' },
    { id: 'ho_sen', label: 'Hồ Phóng Sinh' },
    { id: 'vuon_thien', label: 'Vườn Thiền' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-950/85 backdrop-blur-md border-b border-amber-900/30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Clean Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectZone('chanh_dien')}
            className="text-left group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              🪷
            </div>
            <div>
              <span className="font-cinzel text-base md:text-lg font-bold text-amber-200 tracking-wide whitespace-nowrap block">
                Chùa An Nhiên
              </span>
              <span className="text-[11px] text-stone-400 block -mt-0.5 tracking-wider">
                Đi Chùa Online
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {zones.map((zone) => {
            const isActive = currentZone === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => {
                  onSelectZone(zone.id);
                  pagodaAudio.playWoodenFish();
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/60'
                }`}
              >
                {zone.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Merit counter, Sound toggles & GitHub modal button) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Merit Display */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-800/40 text-xs text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-mono tabular-nums font-semibold text-amber-200">
              {meritPoints.toLocaleString('vi-VN')}
            </span>
            <span className="text-[11px] text-amber-400/80">Công Đức</span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleToggleMute}
            aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className="p-1.5 sm:px-2 sm:py-1 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-700/60 text-stone-300 hover:text-amber-300 transition-colors flex items-center gap-1 text-xs"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
            <span className="hidden md:inline text-[11px]">
              {isMuted ? 'Tắt âm' : 'Âm thanh'}
            </span>
          </button>

          {/* Ambient Chant Toggle */}
          <button
            onClick={handleToggleAmbient}
            aria-label={isAmbient ? 'Tắt nhạc thiền' : 'Bật nhạc thiền'}
            title={isAmbient ? 'Tắt nhạc thiền' : 'Bật nhạc thiền ambient'}
            className={`p-1.5 sm:px-2 sm:py-1 rounded-lg border transition-colors flex items-center gap-1 text-xs ${
              isAmbient
                ? 'bg-amber-600/30 border-amber-500/60 text-amber-200'
                : 'bg-stone-900 border-stone-800 hover:border-amber-700/60 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Music className={`w-4 h-4 ${isAmbient ? 'animate-pulse text-amber-300' : ''}`} />
            <span className="hidden md:inline text-[11px]">
              {isAmbient ? 'Nhạc thiền: Bật' : 'Nhạc thiền'}
            </span>
          </button>

          {/* Primary Action: GitHub Export & Deployment modal */}
          <button
            onClick={onOpenGitHubModal}
            className="px-3 py-1.5 text-xs font-semibold text-amber-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-lg shadow-sm transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Đưa Lên GitHub</span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Zone Bar */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-stone-800/80 no-scrollbar bg-stone-950/90">
        {zones.map((zone) => {
          const isActive = currentZone === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => {
                onSelectZone(zone.id);
                pagodaAudio.playWoodenFish();
              }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {zone.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
