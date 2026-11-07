import React, { useState } from 'react';
import { Github, Copy, Check, Terminal, Globe, ExternalLink, Code2 } from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({ isOpen, onClose }) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const gitBashSnippet = `# 1. Khởi tạo Git repository trong thư mục dự án
git init

# 2. Thêm tất cả file mã nguồn vào staging
git add .

# 3. Tạo commit đầu tiên
git commit -m "feat: khoi tao du an Game Di Chua Online - Chua An Nhien"

# 4. Đổi tên nhánh chính sang main
git branch -M main

# 5. Liên kết tới repository trên GitHub của bạn (thay username và repo_name)
git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git

# 6. Đẩy mã nguồn lên GitHub
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-stone-900 border-2 border-amber-600/60 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-950 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold text-amber-100">
                Hướng Dẫn Đưa Lên GitHub
              </h2>
              <p className="text-xs text-stone-400">
                Đưa trọn bộ mã nguồn Game Đi Chùa Online lên GitHub & Xuất bản miễn phí
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white transition-colors text-xs"
          >
            Đóng ✕
          </button>
        </div>

        {/* Instructions Body */}
        <div className="space-y-6 mt-6 text-xs text-stone-300">
          {/* Step 1: Create Repo on GitHub */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-600/30 text-amber-300 flex items-center justify-center text-[10px]">
                  1
                </span>
                Tạo Repository Mới Trên GitHub
              </span>
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>github.com/new</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Truy cập GitHub, tạo một Repository mới đặt tên là <code className="text-amber-300 font-mono">game-di-chua-online</code> (chọn chế độ <strong>Public</strong> hoặc <strong>Private</strong> tùy ý, không cần tích chọn README vì dự án đã có sẵn).
            </p>
          </div>

          {/* Step 2: Push code snippet */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-600/30 text-amber-300 flex items-center justify-center text-[10px]">
                  2
                </span>
                Chạy Lệnh Trong Terminal / Command Prompt
              </span>
              <button
                onClick={() => copyToClipboard(gitBashSnippet, 2)}
                className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] flex items-center gap-1 transition-colors"
              >
                {copiedStep === 2 ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Đã Sao Chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép tất cả</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative rounded-lg bg-black/80 border border-stone-800 p-3 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed">
              <pre>{gitBashSnippet}</pre>
            </div>
          </div>

          {/* Step 3: Free Deployment Options */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
            <span className="font-bold text-amber-300 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-600/30 text-amber-300 flex items-center justify-center text-[10px]">
                3
              </span>
              Triển Khai Chơi Online Miễn Phí (Vercel / GitHub Pages)
            </span>
            <ul className="list-disc list-inside space-y-1.5 text-stone-400 pl-1">
              <li>
                <strong className="text-stone-200">Cách 1 (Vercel - Khuyên dùng):</strong> Đăng nhập{' '}
                <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-amber-400 underline">
                  vercel.com
                </a>
                , chọn <em>Add New &gt; Project</em>, chọn repo vừa tạo và nhấn <em>Deploy</em>. Web sẽ hoạt động ngay trong 1 phút!
              </li>
              <li>
                <strong className="text-stone-200">Cách 2 (GitHub Pages):</strong> Vào mục <em>Settings &gt; Pages</em> trên GitHub repository, cấu hình nhánh <em>gh-pages</em> hoặc GitHub Actions.
              </li>
            </ul>
          </div>

          {/* Features Checklist */}
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 text-[11px] text-amber-200/90 leading-relaxed">
            <span className="font-bold text-amber-300 block mb-1">
              Tính năng đầy đủ đã đóng gói sẵn trong kho mã nguồn:
            </span>
            • Web Audio API âm thanh Mõ Gỗ, Chuông Bát, Tiếng Nước, Rung Ống Xăm chuẩn xác không phụ thuộc file mp3 ngoài.<br />
            • Bộ 100 quẻ xăm Bồ Tát Quan Âm giải nghĩa chi tiết.<br />
            • Nghi thức Tắm Phật Đản Sanh, Cây Ước Nguyện Bồ Đề, Hồ Sen Phóng Sinh, Vườn Thiền 4-4-4.<br />
            • Tương thích hoàn toàn với Vite, React 19, TypeScript, Tailwind CSS.
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
          >
            Đã Hiểu & Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
