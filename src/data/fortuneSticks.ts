import { FortuneStick, WishRibbon } from '../types';

export const FORTUNE_STICKS: FortuneStick[] = [
  {
    id: 1,
    title: 'Quẻ Số 1: Khai Thiên Tịch Địa',
    rank: 'Thượng Thượng Cát',
    poem: [
      'Thái cực sơ phân thiên địa khai',
      'Đại đạo hoằng dương phúc lộc lai',
      'Vạn sự tùy duyên sinh thiện niệm',
      'Cát tinh chiếu rọi vạn hoa khai'
    ],
    overview: 'Quẻ đầu vận hội mở ra rực rỡ như bình minh ló rạng. Mọi việc khởi đầu thuận lợi, thiên thời địa lợi nhân hòa đều hội tụ.',
    career: 'Công danh hiển hách, thi cử đỗ đạt, mưu sự đại thành. Có quý nhân phù trợ.',
    wealth: 'Tài lộc hưng vượng, đầu tư thuận dòng chảy, nguồn tiền quang minh chính đại.',
    relationship: 'Gia đạo êm ấm sum vầy, người độc thân gặp được lương duyên tri kỷ trọn đời.',
    health: 'Thân tâm an lạc, khí huyết dồi dào, bệnh cũ tiêu tan.',
    advice: 'Phúc đức càng dày quả ngọt càng thơm. Hãy giữ tâm khiêm cung và mở lòng giúp đỡ mọi người.'
  },
  {
    id: 2,
    title: 'Quẻ Số 2: Hoa Nở Đầu Xuân',
    rank: 'Đại Cát',
    poem: [
      'Đông tàn tuyết tan tiết xuân sang',
      'Mai đào rực rỡ tỏa hương thơm',
      'Một dải lòng thành cầu Phật chứng',
      'Phúc duyên tích lũy rạng gia môn'
    ],
    overview: 'Vượt qua giai đoạn thử thách, thời điểm hiện tại như mùa xuân đơm hoa kết trái. Vạn sự trôi chảy hanh thông.',
    career: 'Công việc có bước tiến mới, cấp trên tín nhiệm, dự định ấp ủ bấy lâu nay đã đến lúc thực hiện.',
    wealth: 'Tiền bạc tích lũy vững bền, không cầu mà tự đến nhờ uy tín và chữ tín.',
    relationship: 'Hỷ sự đến nhà, tình duyên đơm hoa kết trái, người xa trở về đoàn tụ.',
    health: 'Tinh thần sảng khoái, duy trì lối sống điều độ sẽ trường thọ an vui.',
    advice: 'Làm việc thiện không cầu đền đáp, phúc đức tự khắc lưu truyền cho con cháu mai sau.'
  },
  {
    id: 3,
    title: 'Quẻ Số 3: Trúc Rừng Đón Gió',
    rank: 'Trung Cát',
    poem: [
      'Gió nhẹ lay cành trúc biếc xanh',
      'Uốn mình theo bão giữ thân thanh',
      'Nhẫn nại tu thân chờ thời vận',
      'Mai sau hoa quý ngát đầu cành'
    ],
    overview: 'Quẻ khuyên lấy chữ Nhẫn làm đầu. Như cây trúc trước gió, mềm dẻo nhưng kiên cường, giữ trọn sơ tâm thiện lương.',
    career: 'Nên cẩn trọng trong hợp tác, không nóng vội đầu tư lớn. Tích lũy kiến thức và kinh nghiệm.',
    wealth: 'Tài chính ổn định, thu chi cân đối, tránh tham món lợi nhỏ mà mất an nhiên.',
    relationship: 'Cần lắng nghe và bao dung nhiều hơn trong gia đình. Tránh tranh cãi hơn thua.',
    health: 'Chú ý nghỉ ngơi điều độ, thiền tịnh thư giãn trí óc để giảm căng thẳng.',
    advice: 'Tĩnh tâm như mặt nước hồ thu, chuyện gì đến cũng sẽ qua, giữ tâm an vạn sự an.'
  },
  {
    id: 4,
    title: 'Quẻ Số 4: Trăng Rằm Soi Đáy Nước',
    rank: 'Thượng Cát',
    poem: [
      'Trăng vằng vặc chiếu giữa trời thanh',
      'Đáy nước trong veo bóng nguyệt lành',
      'Tâm sáng như gương soi muôn cảnh',
      'Bình an thanh tịnh đắc trường sinh'
    ],
    overview: 'Tâm trí sáng suốt thấu tỏ mọi sự. Thời điểm rất tốt để đưa ra những quyết định quan trọng cho cuộc sống.',
    career: 'Mở rộng quy mô, có cộng sự đắc lực, định hướng đi đúng đắn và bền vững.',
    wealth: 'Thu nhập tăng trưởng đều đặn, cơ hội tài lộc đến từ những công việc chân chính.',
    relationship: 'Vợ chồng đồng lòng tát biển Đông cũng cạn, hiểu nhau sâu sắc.',
    health: 'Sức khỏe dồi dào, thân tâm an lạc không lo âu phiền muộn.',
    advice: 'Lấy trí tuệ soi đường, lấy từ bi đối đãi với người, đường đi sẽ luôn bằng phẳng.'
  },
  {
    id: 5,
    title: 'Quẻ Số 5: Bồ Đề Tỏa Bóng',
    rank: 'Thượng Thượng Cát',
    poem: [
      'Bồ Đề ngàn thu tỏa bóng che',
      'Phật quang chiếu sáng dứt u mê',
      'Cầu an đắc an cầu phúc đắc',
      'Muôn thuở bình yên nở nụ cười'
    ],
    overview: 'Quẻ nhận được sự chở che của mười phương chư Phật. Mọi tai ương ách nạn đều hóa giải thành cát tường như ý.',
    career: 'Bước ngoặt vẻ vang, vị thế được nâng cao, được nhiều người kính trọng và mến mộ.',
    wealth: 'Tài lộc dồi dào, buôn may bán đắt, tài đức song hành.',
    relationship: 'Con cháu hiếu thảo, gia quyến hòa thuận, phúc lộc đầy nhà.',
    health: 'Khí sắc hồng hào, thân thể tráng kiện, bệnh tật nhẹ nhàng lướt qua.',
    advice: 'Phóng sinh, bố thí, gieo hạt giống thiện lành để phúc báo thêm sâu dày.'
  },
  {
    id: 6,
    title: 'Quẻ Số 6: Thuyền Qua Dòng Nước Lặng',
    rank: 'Trung Cát',
    poem: [
      'Dòng sông êm ả lững lờ trôi',
      'Thuyền chở bình an vượt dặm khơi',
      'Cứ vững tay chèo theo ánh sáng',
      'Cập bờ bờ giác rạng mây trời'
    ],
    overview: 'Mọi sự đang diễn ra trong quỹ đạo bình ổn. Tuy không quá đột phá nhưng giữ được sự an toàn vững chãi.',
    career: 'Tiếp tục duy trì công việc hiện tại thật chu toàn, chuẩn bị kỹ lưỡng cho bước tiến sau.',
    wealth: 'Tiền bạc vừa đủ chi tiêu thoải mái, cần duy trì quỹ tiết kiệm dự phòng.',
    relationship: 'Tình cảm êm đềm, nên dành thêm thời gian quan tâm cha mẹ và người thân.',
    health: 'Cần chú ý vận động nhẹ nhàng, đi bộ và tập hít thở sâu mỗi ngày.',
    advice: 'Biết đủ là giàu, tâm an là phúc lớn nhất trên đời.'
  },
  {
    id: 7,
    title: 'Quẻ Số 7: Sen Vàng Nở Trong Bùn',
    rank: 'Đại Cát',
    poem: [
      'Gần bùn chẳng nhiễm sắc trần ai',
      'Tỏa ngát hương thanh sớm lại mai',
      'Khổ tận cam lai thời khắc tới',
      'Hào quang rực rỡ đón tương lai'
    ],
    overview: 'Khổ tận cam lai - gian khó đã ở lại phía sau, giờ là lúc bạn gặt hái thành quả xứng đáng với công sức và lòng kiên định.',
    career: 'Được công nhận năng lực thực sự, vượt qua đối thủ bằng sự chính trực.',
    wealth: 'Thu hoạch lớn từ dự án lâu năm, tài lộc khởi sắc bất ngờ.',
    relationship: 'Gặp gỡ những người bạn đồng thanh tương ứng, tri âm tri kỷ.',
    health: 'Phục hồi nhanh chóng sau mệt mỏi, năng lượng tích cực tràn đầy.',
    advice: 'Giữ tâm thuần khiết như hoa sen, bùn nhơ chính là chất dinh dưỡng nuôi dưỡng trí tuệ.'
  },
  {
    id: 8,
    title: 'Quẻ Số 8: Tiếng Chuông Sớm Tỉnh Thức',
    rank: 'Bình Hòa',
    poem: [
      'Chuông chùa sớm điểm vọng đồi xa',
      'Tỉnh giấc mộng trần cõi ta bà',
      'Buông bớt chấp mê tìm tự tại',
      'An nhiên từng bước nở đài hoa'
    ],
    overview: 'Quẻ khuyên bạn nên dừng lại một nhịp để nhìn nhận lại mục tiêu cuộc sống, không nên bị cuốn vào guồng quay tham vọng.',
    career: 'Tránh tranh giành danh lợi thị phi. Tập trung vào giá trị cốt lõi.',
    wealth: 'Không tham gia cờ bạc, may rủi hay đầu tư rủi ro cao.',
    relationship: 'Cởi bỏ những hiểu lầm xưa cũ, tha thứ cho người khác là giải thoát cho chính mình.',
    health: 'Cần chú trọng giấc ngủ và dưỡng tâm, bớt nghĩ suy tiêu cực.',
    advice: 'Học cách buông xả, tâm không vướng bận thì bước chân nhẹ thênh thang.'
  }
];

export const INITIAL_WISH_RIBBONS: WishRibbon[] = [
  {
    id: 'w1',
    author: 'Phật tử Diệu Tâm',
    wish: 'Nguyện cầu cha mẹ hai bên sống lâu trăm tuổi, thân tâm an lạc, bệnh tật tiêu trừ.',
    category: 'Sức Khỏe',
    color: 'emerald',
    likes: 86,
    createdAt: Date.now() - 3600000 * 5
  },
  {
    id: 'w2',
    author: 'Minh Trí',
    wish: 'Cầu cho kỳ thi đại học và đồ án tốt nghiệp thuận buồm xuôi gió, đỗ đạt như ý nguyện.',
    category: 'Công Danh',
    color: 'gold',
    likes: 124,
    createdAt: Date.now() - 3600000 * 8
  },
  {
    id: 'w3',
    author: 'Tuệ An',
    wish: 'Cầu mong gia đình hòa thuận, con cái ngoan ngoãn chăm ngoan, vạn sự bình yên.',
    category: 'Bình An',
    color: 'red',
    likes: 92,
    createdAt: Date.now() - 3600000 * 12
  },
  {
    id: 'w4',
    author: 'Thanh Hằng',
    wish: 'Nguyện cầu sớm gặp được lương duyên đồng điệu, cùng nhau tu dưỡng thiện tâm và chia sẻ ngọt bùi.',
    category: 'Duyên Lành',
    color: 'pink',
    likes: 67,
    createdAt: Date.now() - 3600000 * 16
  },
  {
    id: 'w5',
    author: 'Quốc Bảo',
    wish: 'Cầu cho kinh doanh buôn bán hanh thông, công việc làm ăn phát đạt, mang lại công ăn việc làm cho nhiều người.',
    category: 'Tài Lộc',
    color: 'gold',
    likes: 78,
    createdAt: Date.now() - 3600000 * 20
  }
];

export const MERIT_LEVELS: { level: number; title: string; minPoints: number; description: string; badge: string }[] = [
  { level: 1, title: 'Sơ Tâm Khởi Niệm', minPoints: 0, description: 'Mới bước chân vào cửa thiền, gieo mầm thiện lương.', badge: '🌱' },
  { level: 2, title: 'Duyên Lành Kết Trái', minPoints: 100, description: 'Chăm chỉ tích đức, tụng niệm chuyên cần.', badge: '🌸' },
  { level: 3, title: 'Tâm Tĩnh Trí Sáng', minPoints: 300, description: 'Đạt được trạng thái tĩnh lặng an yên giữa đời thường.', badge: '🪷' },
  { level: 4, title: 'Từ Bi Hỷ Xả', minPoints: 600, description: 'Mở rộng lòng từ bi, gieo rắc an vui cho muôn loài.', badge: '🕊️' },
  { level: 5, title: 'Bồ Đề Tâm Viên Mãn', minPoints: 1000, description: 'Thấu tỏ đạo lý vô thường, thân tâm tự tại an nhiên.', badge: '✨' },
];

export const BUDDHIST_QUOTES = [
  'Vạn pháp do tâm tạo. Tâm bình thế giới bình.',
  'Hạnh phúc không nằm ở đích đến, mà ở từng bước chân chánh niệm trên đường đi.',
  'Lấy từ bi xóa bỏ hận thù, lấy nhẫn nại vượt qua chông gai.',
  'Một ngọn nến có thể thắp sáng hàng ngàn ngọn nến khác mà không bị tàn lụi.',
  'Biết đủ là người giàu nhất trần gian, tâm an là phúc lành cao quý nhất.',
  'Hãy nhẹ nhàng với bản thân và bao dung với tất cả vạn vật.',
  'Quá khứ đã qua, tương lai chưa tới, chỉ có giây phút hiện tại là nơi sự sống nhiệm màu hiển hiện.'
];
