# 🪷 Chùa An Nhiên - Game Đi Chùa Online & Thiền Tịnh Tâm

> Một ứng dụng web mô phỏng trải nghiệm đi chùa truyền thống Việt Nam, mang đến không gian an lạc, thanh tịnh cho người dùng ở bất cứ nơi đâu.

![Chùa An Nhiên Banner](src/assets/images/temple_main_hall_altar_1794048560867.jpg)

---

## 🌟 Giới Thiệu Tính Năng Nổi Bật

1. **🏛️ Chánh Điện Tam Bảo:**
   - **Gõ Mõ Tụng Kinh (Wooden Fish):** Trải nghiệm gõ mõ gõ chuông với âm thanh chân thực được tổng hợp trực tiếp bằng Web Audio API (không phụ thuộc vào link mp3 ngoài). Hỗ trợ chế độ **Tự động tụng** với 3 cấp độ tốc độ.
   - **Dâng Nén Tâm Hương:** Chọn dâng 1 nén (Tâm hương), 3 nén (Tam bảo), hoặc 5 nén (Ngũ phần hương) kèm theo lời phát nguyện chân thành, hiệu ứng khói trầm bay bổng.
   - **Thỉnh Đại Hồng Chung:** Chuông đồng bát ngân vang trầm ấm làm thanh lọc tâm trí.
   - **Hòm Công Đức:** Thả tiền xu ảo tích lũy phước lành.

2. **📜 Xin Xăm Quán Âm Đại Sĩ:**
   - Ống xăm tre mô phỏng rung lắc với âm thanh lách cách sống động.
   - Kho tàng 100 quẻ xăm linh ứng với thơ tứ tuyệt, giải nghĩa chi tiết về: Công danh, Tài lộc, Gia đạo, Sức khỏe và Lời khuyên tu tâm dưỡng tính.
   - Chức năng sao chép và chia sẻ quẻ xăm đầu năm.

3. **🪷 Nghi Thức Tắm Phật Đản Sanh:**
   - Dâng 3 gáo nước thơm lên tôn tượng Phật Đản Sanh theo đúng truyền thống Phật giáo (Đoạn trừ việc ác - Nguyện làm việc lành - Nguyện độ chúng sinh).
   - Hiệu ứng sóng nước, hoa sen nở và hào quang thanh tịnh.

4. **🌿 Cây Bồ Đề Ước Nguyện:**
   - Treo dải lụa đỏ, vàng, lục, hồng gửi gắm lời nguyện cầu cho Cha Mẹ, Bản Thân, Gia Đình hoặc Quốc thái dân an.
   - Đọc và hiệp lực cầu nguyện (+1 Lời Chúc) cùng cộng đồng.

5. **🐟 Hồ Sen Phóng Sinh:**
   - Phóng sinh Cá Chép Đỏ, Rùa Vàng, Chim Bồ Câu mang ý nghĩa nuôi dưỡng lòng từ bi đối với muôn loài.

6. **🧘 Vườn Thiền Chánh Niệm:**
   - Thực hành bài tập hít thở 4-4-4 (Hít vào - Giữ hơi - Thở ra - Tĩnh lặng) kết hợp tiếng chuông ngân và lời khai thị của Đức Phật.

7. **✨ Bảng Tích Lũy Công Đức & Tu Tập:**
   - Hệ thống 5 cấp bậc tu dưỡng từ *Sơ Tâm Khởi Niệm* đến *Bồ Đề Tâm Viên Mãn*.
   - Lưu trữ tự động tiến trình tu tập trên trình duyệt (LocalStorage).

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Âm thanh:** Web Audio API (Tự tổng hợp tần số gỗ gõ mõ, chuông đồng, nước chảy, rung lắc ống tre không lo lỗi tải file)
- **Hiệu ứng:** Lucide Icons, Canvas Confetti

---

## 🚀 Hướng Dẫn Chạy Trên Máy Cục Bộ (Local)

### 1. Yêu cầu hệ thống
- Đã cài đặt [Node.js](https://nodejs.org/) (phiên bản 18 trở lên).

### 2. Cài đặt và khởi chạy
```bash
# 1. Cài đặt các thư viện cần thiết
npm install

# 2. Khởi chạy môi trường phát triển (Dev Server)
npm run dev
```
Mở trình duyệt truy cập `http://localhost:3000` để bắt đầu trải nghiệm!

---

## 📤 Hướng Dẫn Đưa Lên GitHub

Làm theo các bước sau trong Terminal / Command Prompt tại thư mục dự án:

```bash
# 1. Khởi tạo Git repository
git init

# 2. Thêm tất cả các file mã nguồn vào Git
git add .

# 3. Tạo commit đầu tiên
git commit -m "feat: khoi tao du an Game Di Chua Online - Chua An Nhien"

# 4. Đổi tên nhánh mặc định thành main
git branch -M main

# 5. Tạo repository mới trên https://github.com/new (ví dụ: game-di-chua-online)
# Sau đó liên kết repository GitHub của bạn:
git remote add origin https://github.com/<TEN_TAI_KHOAN_GITHUB>/game-di-chua-online.git

# 6. Đẩy mã nguồn lên GitHub
git push -u origin main
```

---

## 🌐 Xuất Bản Miễn Phí (Deploy Lên Mạng Để Bạn Bè Cùng Chơi)

### Cách 1: Triển khai qua Vercel (Nhanh nhất & Đơn giản nhất)
1. Đăng nhập vào [Vercel](https://vercel.com) bằng tài khoản GitHub.
2. Nhấn **Add New Project**, chọn repository `game-di-chua-online` vừa đẩy lên.
3. Nhấn **Deploy**. Vercel sẽ tự động build và cấp một đường link (ví dụ: `https://game-di-chua-online.vercel.app`) để bạn chia sẻ cho mọi người.

### Cách 2: Triển khai qua GitHub Pages
Thêm script sau vào `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
Cài đặt `npm install -D gh-pages` và chạy `npm run deploy`.

---

## 📜 Giấy Phép & Bản Quyền

Dự án phát triển với tinh thần hoan hỷ, phi thương mại. Bạn hoàn toàn có thể tự do sử dụng, chỉnh sửa và chia sẻ.

*Nam Mô A Di Đà Phật · Chúc quý đạo hữu thân tâm thường an lạc!* 🙏
