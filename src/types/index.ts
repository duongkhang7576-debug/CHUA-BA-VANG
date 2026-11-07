export type TempleZone =
  | 'chanh_dien'      // Chánh Điện: Gõ mõ, thắp hương, hòm công đức
  | 'xin_xam'         // Xin Xăm Quan Âm: Lắc ống xăm, bốc quẻ đầu năm
  | 'tam_phat'        // Tắm Phật: Nghi thức tắm tượng Phật Đản Sanh
  | 'cay_uoc_nguyen'  // Cây Bồ Đề Ước Nguyện: Treo dải băng cầu an
  | 'ho_sen'          // Hồ Sen Phóng Sinh: Phóng sinh cá chép, rùa vàng
  | 'vuon_thien';     // Vườn Thiền: Tọa thiền hít thở định tâm

export interface FortuneStick {
  id: number;
  title: string;
  rank: 'Thượng Thượng Cát' | 'Đại Cát' | 'Thượng Cát' | 'Trung Cát' | 'Bình Hòa';
  poem: string[];
  overview: string;
  career: string;
  wealth: string;
  relationship: string;
  health: string;
  advice: string;
}

export interface WishRibbon {
  id: string;
  author: string;
  wish: string;
  category: 'Bình An' | 'Công Danh' | 'Sức Khỏe' | 'Gia Đạo' | 'Tài Lộc' | 'Duyên Lành';
  color: 'red' | 'gold' | 'pink' | 'emerald';
  likes: number;
  createdAt: number;
}

export interface MeritLevel {
  level: number;
  title: string;
  minPoints: number;
  description: string;
  badge: string;
}
