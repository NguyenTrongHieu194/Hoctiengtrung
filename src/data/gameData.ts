export interface MemoryCard {
  id: string;
  pairId: string;
  type: 'hanzi' | 'meaning' | 'pinyin';
  content: string;
  subContent?: string;
  pinyin?: string;
  audioText?: string;
  icon?: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameStage {
  id: string;
  name: string;
  desc: string;
  icon: string;
  badge: string;
  color: string;
}

export interface SpeedWordQuiz {
  id: string;
  stageId?: string;
  hanzi: string;
  pinyin: string;
  correctMeaning: string;
  options: string[];
  category: string;
  hint?: string;
}

export interface ToneChallengeItem {
  id: string;
  stageId?: string;
  syllableBase: string; // e.g. "ma"
  hanzi: string;
  fullPinyin: string; // e.g. "mā"
  toneNumber: 1 | 2 | 3 | 4;
  vietnamese: string;
  exampleWord?: string;
}

export interface SentenceScrambleItem {
  id: string;
  stageId?: string;
  vietnamese: string;
  correctHanzi: string;
  correctPinyin: string;
  words: string[];
  explanation: string;
  category: string;
}

export interface HanziPuzzleItem {
  id: string;
  stageId?: string;
  targetHanzi: string;
  pinyin: string;
  vietnamese: string;
  components: {
    radical: string;
    meaning: string;
    pinyin: string;
  }[];
  story: string;
  options: string[]; // 4 choices
}

// ============================================================================
// 1. DỮ LIỆU LẬT THẺ TRÍ NHỚ (MEMORY MATCH) - 12 MÀN CHƠI THEO CHỦ ĐỀ
// ============================================================================
export const MEMORY_THEMES = [
  {
    id: 'basic',
    name: 'Giao tiếp Cơ bản',
    icon: '🗣️',
    color: 'from-amber-400 to-orange-500',
    pairs: [
      { hanzi: '你好', pinyin: 'nǐ hǎo', vietnamese: 'Xin chào', audio: '你好' },
      { hanzi: '谢谢', pinyin: 'xièxie', vietnamese: 'Cảm ơn', audio: '谢谢' },
      { hanzi: '再见', pinyin: 'zàijiàn', vietnamese: 'Tạm biệt', audio: '再见' },
      { hanzi: '朋友', pinyin: 'péngyou', vietnamese: 'Bạn bè', audio: '朋友' },
      { hanzi: '老师', pinyin: 'lǎoshī', vietnamese: 'Thầy/Cô giáo', audio: '老师' },
      { hanzi: '学习', pinyin: 'xuéxí', vietnamese: 'Học tập', audio: '学习' },
      { hanzi: '高兴', pinyin: 'gāoxìng', vietnamese: 'Vui mừng', audio: '高兴' },
      { hanzi: '喜欢', pinyin: 'xǐhuan', vietnamese: 'Yêu thích', audio: '喜欢' },
      { hanzi: '喝水', pinyin: 'hē shuǐ', vietnamese: 'Uống nước', audio: '喝水' },
      { hanzi: '吃饭', pinyin: 'chī fàn', vietnamese: 'Ăn cơm', audio: '吃饭' }
    ]
  },
  {
    id: 'garment',
    name: 'Xưởng May Mặc',
    icon: '🧵',
    color: 'from-indigo-500 to-purple-600',
    pairs: [
      { hanzi: '布料', pinyin: 'bùliào', vietnamese: 'Vải vóc', audio: '布料' },
      { hanzi: '裁断', pinyin: 'cáiduàn', vietnamese: 'Cắt vải', audio: '裁断' },
      { hanzi: '车缝', pinyin: 'chēféng', vietnamese: 'May ráp', audio: '车缝' },
      { hanzi: '样衣', pinyin: 'yàngyī', vietnamese: 'Áo mẫu', audio: '样衣' },
      { hanzi: '质检', pinyin: 'zhìjiǎn', vietnamese: 'Kiểm phẩm QC', audio: '质检' },
      { hanzi: '针距', pinyin: 'zhēnjù', vietnamese: 'Mật độ chỉ', audio: '针距' },
      { hanzi: '纽扣', pinyin: 'niǔkòu', vietnamese: 'Cúc áo', audio: '纽扣' },
      { hanzi: '拉链', pinyin: 'lāliàn', vietnamese: 'Dây kéo', audio: '拉链' },
      { hanzi: '线头', pinyin: 'xiàntóu', vietnamese: 'Đầu chỉ thừa', audio: '线头' },
      { hanzi: '包装', pinyin: 'bāozhuāng', vietnamese: 'Đóng gói', audio: '包装' }
    ]
  },
  {
    id: 'radicals',
    name: '214 Bộ Thủ Hán Tự',
    icon: '⛩️',
    color: 'from-rose-500 to-pink-600',
    pairs: [
      { hanzi: '木', pinyin: 'mù', vietnamese: 'Bộ Mộc (Cây cối)', audio: '木' },
      { hanzi: '水', pinyin: 'shuǐ', vietnamese: 'Bộ Thủy (Nước)', audio: '水' },
      { hanzi: '火', pinyin: 'huǒ', vietnamese: 'Bộ Hỏa (Lửa)', audio: '火' },
      { hanzi: '人', pinyin: 'rén', vietnamese: 'Bộ Nhân (Người)', audio: '人' },
      { hanzi: '口', pinyin: 'kǒu', vietnamese: 'Bộ Khẩu (Miệng)', audio: '口' },
      { hanzi: '日', pinyin: 'rì', vietnamese: 'Bộ Nhật (Mặt trời)', audio: '日' },
      { hanzi: '月', pinyin: 'yuè', vietnamese: 'Bộ Nguyệt (Mặt trăng)', audio: '月' },
      { hanzi: '心', pinyin: 'xīn', vietnamese: 'Bộ Tâm (Trái tim)', audio: '心' },
      { hanzi: '手', pinyin: 'shǒu', vietnamese: 'Bộ Thủ (Bàn tay)', audio: '手' },
      { hanzi: '门', pinyin: 'mén', vietnamese: 'Bộ Môn (Cánh cửa)', audio: '门' }
    ]
  },
  {
    id: 'animals',
    name: 'Động vật & Sinh thái',
    icon: '🐼',
    color: 'from-emerald-500 to-teal-600',
    pairs: [
      { hanzi: '熊猫', pinyin: 'xióngmāo', vietnamese: 'Gấu trúc', audio: '熊猫' },
      { hanzi: '小猫', pinyin: 'xiǎomāo', vietnamese: 'Mèo con', audio: '小猫' },
      { hanzi: '小狗', pinyin: 'xiǎogǒu', vietnamese: 'Chó con', audio: '小狗' },
      { hanzi: '小鸟', pinyin: 'xiǎoniǎo', vietnamese: 'Chim non', audio: '小鸟' },
      { hanzi: '金鱼', pinyin: 'jīnyú', vietnamese: 'Cá vàng', audio: '金鱼' },
      { hanzi: '太阳', pinyin: 'tàiyáng', vietnamese: 'Mặt trời', audio: '太阳' },
      { hanzi: '月亮', pinyin: 'yuèliang', vietnamese: 'Mặt trăng', audio: '月亮' },
      { hanzi: '花朵', pinyin: 'huāduǒ', vietnamese: 'Bông hoa', audio: '花朵' },
      { hanzi: '苹果', pinyin: 'píngguǒ', vietnamese: 'Quả táo', audio: '苹果' },
      { hanzi: '森林', pinyin: 'sēnlín', vietnamese: 'Khu rừng', audio: '森林' }
    ]
  },
  {
    id: 'food',
    name: 'Ẩm thực & Món ăn',
    icon: '🥟',
    color: 'from-orange-500 to-red-600',
    pairs: [
      { hanzi: '饺子', pinyin: 'jiǎozi', vietnamese: 'Bánh chẻo / Sủi cảo', audio: '饺子' },
      { hanzi: '米饭', pinyin: 'mǐfàn', vietnamese: 'Cơm trắng', audio: '米饭' },
      { hanzi: '面条', pinyin: 'miàntiáo', vietnamese: 'Mì sợi', audio: '面条' },
      { hanzi: '包子', pinyin: 'bāozi', vietnamese: 'Bánh bao', audio: '包子' },
      { hanzi: '火锅', pinyin: 'huǒguō', vietnamese: 'Lẩu', audio: '火锅' },
      { hanzi: '烤鸭', pinyin: 'kǎoyā', vietnamese: 'Vịt quay', audio: '烤鸭' },
      { hanzi: '绿茶', pinyin: 'lǜchá', vietnamese: 'Trà xanh', audio: '绿茶' },
      { hanzi: '咖啡', pinyin: 'kāfēi', vietnamese: 'Cà phê', audio: '咖啡' },
      { hanzi: '筷子', pinyin: 'kuàizi', vietnamese: 'Đôi đũa', audio: '筷子' },
      { hanzi: '买单', pinyin: 'mǎidān', vietnamese: 'Thanh toán tiền', audio: '买单' }
    ]
  },
  {
    id: 'business',
    name: 'Văn phòng & Công sở',
    icon: '💼',
    color: 'from-blue-600 to-cyan-600',
    pairs: [
      { hanzi: '会议', pinyin: 'huìyì', vietnamese: 'Cuộc họp', audio: '会议' },
      { hanzi: '合同', pinyin: 'hétong', vietnamese: 'Hợp đồng', audio: '合同' },
      { hanzi: '客户', pinyin: 'kèhù', vietnamese: 'Khách hàng', audio: '客户' },
      { hanzi: '报告', pinyin: 'bàogào', vietnamese: 'Báo cáo', audio: '报告' },
      { hanzi: '发票', pinyin: 'fāpiào', vietnamese: 'Hóa đơn VAT', audio: '发票' },
      { hanzi: '项目', pinyin: 'xiàngmù', vietnamese: 'Dự án', audio: '项目' },
      { hanzi: '安排', pinyin: 'ānpái', vietnamese: 'Sắp xếp / Bố trí', audio: '安排' },
      { hanzi: '邮件', pinyin: 'yóujiàn', vietnamese: 'Email / Thư từ', audio: '邮件' },
      { hanzi: '签字', pinyin: 'qiānzì', vietnamese: 'Ký tên', audio: '签字' },
      { hanzi: '加班', pinyin: 'jiābān', vietnamese: 'Tăng ca / Làm thêm', audio: '加班' }
    ]
  },
  // MÀN CHƠI MỚI 7: Du lịch & Đặt phòng
  {
    id: 'travel',
    name: 'Du lịch & Khách sạn',
    icon: '✈️',
    color: 'from-sky-500 to-blue-600',
    pairs: [
      { hanzi: '机场', pinyin: 'jīchǎng', vietnamese: 'Sân bay', audio: '机场' },
      { hanzi: '护照', pinyin: 'hùzhào', vietnamese: 'Hộ chiếu', audio: '护照' },
      { hanzi: '行李', pinyin: 'xíngli', vietnamese: 'Hành lý', audio: '行李' },
      { hanzi: '酒店', pinyin: 'jiǔdiàn', vietnamese: 'Khách sạn', audio: '酒店' },
      { hanzi: '预订', pinyin: 'yùdìng', vietnamese: 'Đặt trước (phòng/vé)', audio: '预订' },
      { hanzi: '门票', pinyin: 'ménpiào', vietnamese: 'Vé vào cổng', audio: '门票' },
      { hanzi: '登机牌', pinyin: 'dēngjīpái', vietnamese: 'Thẻ lên máy bay', audio: '登机牌' },
      { hanzi: '旅游', pinyin: 'lǚyóu', vietnamese: 'Đi du lịch', audio: '旅游' },
      { hanzi: '导游', pinyin: 'dǎoyóu', vietnamese: 'Hướng dẫn viên', audio: '导游' },
      { hanzi: '景点', pinyin: 'jǐngdiǎn', vietnamese: 'Danh lam thắng cảnh', audio: '景点' }
    ]
  },
  // MÀN CHƠI MỚI 8: Mua sắm & Thanh toán
  {
    id: 'shopping',
    name: 'Mua sắm & Đi chợ',
    icon: '🛍️',
    color: 'from-pink-500 to-rose-600',
    pairs: [
      { hanzi: '超市', pinyin: 'chāoshì', vietnamese: 'Siêu thị', audio: '超市' },
      { hanzi: '打折', pinyin: 'dǎzhé', vietnamese: 'Giảm giá', audio: '打折' },
      { hanzi: '便宜', pinyin: 'piányi', vietnamese: 'Rẻ tiền', audio: '便宜' },
      { hanzi: '贵', pinyin: 'guì', vietnamese: 'Đắt đỏ', audio: '贵' },
      { hanzi: '现金', pinyin: 'xiànjīn', vietnamese: 'Tiền mặt', audio: '现金' },
      { hanzi: '刷卡', pinyin: 'shuākǎ', vietnamese: 'Quẹt thẻ', audio: '刷卡' },
      { hanzi: '找钱', pinyin: 'zhǎoqián', vietnamese: 'Thối tiền thừa', audio: '找钱' },
      { hanzi: '塑料袋', pinyin: 'sùliàodài', vietnamese: 'Túi nilon', audio: '塑料袋' },
      { hanzi: '试穿', pinyin: 'shìchuān', vietnamese: 'Mặc thử đồ', audio: '试穿' },
      { hanzi: '价格', pinyin: 'jiàgé', vietnamese: 'Giá cả', audio: '价格' }
    ]
  },
  // MÀN CHƠI MỚI 9: Cảm xúc & Tâm lý
  {
    id: 'emotions',
    name: 'Cảm xúc & Tâm trạng',
    icon: '😊',
    color: 'from-yellow-400 to-amber-500',
    pairs: [
      { hanzi: '开心', pinyin: 'kāixīn', vietnamese: 'Vui vẻ / Hớn hở', audio: '开心' },
      { hanzi: '伤心', pinyin: 'shāngxīn', vietnamese: 'Đau lòng / Buồn', audio: '伤心' },
      { hanzi: '生气', pinyin: 'shēngqì', vietnamese: 'Tức giận', audio: '生气' },
      { hanzi: '担心', pinyin: 'dānxīn', vietnamese: 'Lo lắng', audio: '担心' },
      { hanzi: '紧张', pinyin: 'jǐnzhāng', vietnamese: 'Hồi hộp / Căng thẳng', audio: '紧张' },
      { hanzi: '害怕', pinyin: 'hàipà', vietnamese: 'Sợ hãi', audio: '害怕' },
      { hanzi: '害羞', pinyin: 'hàixiū', vietnamese: 'Ngại ngùng / Xấu hổ', audio: '害羞' },
      { hanzi: '兴奋', pinyin: 'xīngfèn', vietnamese: 'Hào hứng / Phấn khích', audio: '兴奋' },
      { hanzi: '轻松', pinyin: 'qīngsōng', vietnamese: 'Thoải mái / Thư thái', audio: '轻松' },
      { hanzi: '满意', pinyin: 'mǎnyì', vietnamese: 'Hài lòng', audio: '满意' }
    ]
  },
  // MÀN CHƠI MỚI 10: May mặc & Kiểm lỗi QC chuyên sâu
  {
    id: 'garment_qc',
    name: 'May mặc & Kiểm lỗi QC',
    icon: '🔍',
    color: 'from-teal-500 to-emerald-600',
    pairs: [
      { hanzi: '漏针', pinyin: 'lòuzhēn', vietnamese: 'Bỏ mũi / Nhảy mũi', audio: '漏针' },
      { hanzi: '污渍', pinyin: 'wūzì', vietnamese: 'Vết bẩn / Dính dơ', audio: '污渍' },
      { hanzi: '抽纱', pinyin: 'chōushā', vietnamese: 'Rút sợi / Xước vải', audio: '抽纱' },
      { hanzi: '歪斜', pinyin: 'wāixié', vietnamese: 'Lệch mép / Xiên vẹo', audio: '歪斜' },
      { hanzi: '色差', pinyin: 'sèchā', vietnamese: 'Lệch màu sắc', audio: '色差' },
      { hanzi: '烫伤', pinyin: 'tàngshāng', vietnamese: 'Cháy vải do ủi', audio: '烫伤' },
      { hanzi: '破洞', pinyin: 'pòdòng', vietnamese: 'Thủng lỗ / Rách vải', audio: '破洞' },
      { hanzi: '牢固', pinyin: 'láogù', vietnamese: 'Chắc chắn / Bền', audio: '牢固' },
      { hanzi: '平整', pinyin: 'píngzhěng', vietnamese: 'Phẳng phiu', audio: '平整' },
      { hanzi: '返工', pinyin: 'fǎngōng', vietnamese: 'Làm lại / Sửa hàng', audio: '返工' }
    ]
  },
  // MÀN CHƠI MỚI 11: Sinh hoạt & Nhà cửa
  {
    id: 'daily_life',
    name: 'Sinh hoạt & Đời sống',
    icon: '🏠',
    color: 'from-violet-500 to-purple-600',
    pairs: [
      { hanzi: '起床', pinyin: 'qǐchuáng', vietnamese: 'Thức dậy', audio: '起床' },
      { hanzi: '刷牙', pinyin: 'shuāyá', vietnamese: 'Đánh răng', audio: '刷牙' },
      { hanzi: '洗澡', pinyin: 'xǐzǎo', vietnamese: 'Tắm gội', audio: '洗澡' },
      { hanzi: '睡觉', pinyin: 'shuìjiào', vietnamese: 'Đi ngủ', audio: '睡觉' },
      { hanzi: '做饭', pinyin: 'zuòfàn', vietnamese: 'Nấu cơm', audio: '做饭' },
      { hanzi: '充电', pinyin: 'chōngdiàn', vietnamese: 'Sạc pin điện thoại', audio: '充电' },
      { hanzi: '钥匙', pinyin: 'yàoshi', vietnamese: 'Chìa khóa', audio: '钥匙' },
      { hanzi: '遥控器', pinyin: 'yáokòngqì', vietnamese: 'Remote điều khiển', audio: '遥控器' },
      { hanzi: '吹风机', pinyin: 'chuīfēngjī', vietnamese: 'Máy sấy tóc', audio: '吹风机' },
      { hanzi: '垃圾桶', pinyin: 'lājītǒng', vietnamese: 'Thùng rác', audio: '垃圾桶' }
    ]
  },
  // MÀN CHƠI MỚI 12: Giao thông & Đi lại
  {
    id: 'traffic',
    name: 'Giao thông & Đi lại',
    icon: '🚇',
    color: 'from-cyan-500 to-blue-600',
    pairs: [
      { hanzi: '地铁', pinyin: 'dìtiě', vietnamese: 'Tàu điện ngầm', audio: '地铁' },
      { hanzi: '公交车', pinyin: 'gōngjiāochē', vietnamese: 'Xe buýt công cộng', audio: '公交车' },
      { hanzi: '打车', pinyin: 'dǎchē', vietnamese: 'Bắt taxi / gọi xe', audio: '打车' },
      { hanzi: '堵车', pinyin: 'dǔchē', vietnamese: 'Kẹt xe / Tắc đường', audio: '堵车' },
      { hanzi: '导航', pinyin: 'dǎoháng', vietnamese: 'Bản đồ định vị GPS', audio: '导航' },
      { hanzi: '换乘', pinyin: 'huànchéng', vietnamese: 'Đổi tuyến xe/tàu', audio: '换乘' },
      { hanzi: '绿灯', pinyin: 'lǜdēng', vietnamese: 'Đèn xanh', audio: '绿灯' },
      { hanzi: '红灯', pinyin: 'hóngdēng', vietnamese: 'Đèn đỏ', audio: '红灯' },
      { hanzi: '迷路', pinyin: 'mílù', vietnamese: 'Lạc đường', audio: '迷路' },
      { hanzi: '斑马线', pinyin: 'bānmǎxiàn', vietnamese: 'Vạch qua đường', audio: '斑马线' }
    ]
  }
];

// ============================================================================
// 2. DỮ LIỆU CƠN LỐC BẮT TỪ (SPEED WORD RUSH) - 5 MÀN CHƠI CẤP ĐỘ
// ============================================================================
export const SPEED_STAGES: GameStage[] = [
  {
    id: 'speed_s1',
    name: 'Màn 1: Nhập Môn Giao Tiếp',
    desc: 'Từ vựng giao tiếp căn bản, đời sống và thói quen thường nhật.',
    icon: '🌱',
    badge: 'Cơ bản',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'speed_s2',
    name: 'Màn 2: Xưởng May & Kỹ Thuật',
    desc: 'Thuật ngữ xưởng cắt may, máy móc thiết bị và kiểm tra lỗi QC.',
    icon: '🧵',
    badge: 'Xưởng May',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'speed_s3',
    name: 'Màn 3: Văn Phòng & Thương Mại',
    desc: 'Hợp đồng kinh tế, họp hành, báo cáo và chứng từ văn phòng.',
    icon: '💼',
    badge: 'Văn Phòng',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'speed_s4',
    name: 'Màn 4: Đàm Phán & Xuất Nhập Khẩu',
    desc: 'Giá cả, logistics cảng biển, thanh toán quốc tế và hạn giao hàng.',
    icon: '🚢',
    badge: 'Thương Mại',
    color: 'from-teal-500 to-emerald-600'
  },
  {
    id: 'speed_s5',
    name: 'Màn 5: Khẩu Ngữ & Siêu Tốc Độ',
    desc: 'Khẩu ngữ cửa miệng, cụm từ lóng và phản xạ siêu nhanh.',
    icon: '⚡',
    badge: 'Cao Cấp',
    color: 'from-rose-500 to-pink-600'
  }
];

export const SPEED_QUIZ_DATA: SpeedWordQuiz[] = [
  // MÀN 1: Giao tiếp & Sinh hoạt (speed_s1)
  {
    id: 'sq_1',
    stageId: 'speed_s1',
    hanzi: '工作',
    pinyin: 'gōngzuò',
    correctMeaning: 'Công việc / Làm việc',
    options: ['Công việc / Làm việc', 'Học tập', 'Nghỉ ngơi', 'Ăn cơm'],
    category: 'Giao tiếp'
  },
  {
    id: 'sq_4',
    stageId: 'speed_s1',
    hanzi: '漂亮',
    pinyin: 'piàoliang',
    correctMeaning: 'Xinh đẹp / Đẹp mắt',
    options: ['Xinh đẹp / Đẹp mắt', 'To lớn', 'Đắt đỏ', 'Nhanh nhẹn'],
    category: 'Giao tiếp'
  },
  {
    id: 'sq_7',
    stageId: 'speed_s1',
    hanzi: '明白',
    pinyin: 'míngbai',
    correctMeaning: 'Hiểu rõ / Rõ ràng',
    options: ['Hiểu rõ / Rõ ràng', 'Bối rối', 'Quên mất', 'Ngủ say'],
    category: 'Giao tiếp'
  },
  {
    id: 'sq_9',
    stageId: 'speed_s1',
    hanzi: '准备',
    pinyin: 'zhǔnbèi',
    correctMeaning: 'Chuẩn bị',
    options: ['Chuẩn bị', 'Bắt đầu', 'Kết thúc', 'Từ chối'],
    category: 'Giao tiếp'
  },
  {
    id: 'sq_s1_1',
    stageId: 'speed_s1',
    hanzi: '打扰',
    pinyin: 'dǎrǎo',
    correctMeaning: 'Làm phiền / Quấy rầy',
    options: ['Làm phiền / Quấy rầy', 'Giúp đỡ', 'Chào mừng', 'Cảm ơn'],
    category: 'Giao tiếp'
  },
  {
    id: 'sq_s1_2',
    stageId: 'speed_s1',
    hanzi: '帮助',
    pinyin: 'bāngzhù',
    correctMeaning: 'Giúp đỡ / Hỗ trợ',
    options: ['Giúp đỡ / Hỗ trợ', 'Chờ đợi', 'Từ chối', 'Gặp mặt'],
    category: 'Giao tiếp'
  },
  {
    id: 'sq_s1_3',
    stageId: 'speed_s1',
    hanzi: '介绍',
    pinyin: 'jièshào',
    correctMeaning: 'Giới thiệu',
    options: ['Giới thiệu', 'Tạm biệt', 'Nấu ăn', 'Đặt vé'],
    category: 'Giao tiếp'
  },
  {
    id: 'sq_s1_4',
    stageId: 'speed_s1',
    hanzi: '方便',
    pinyin: 'fāngbiàn',
    correctMeaning: 'Thuận tiện / Tiện lợi',
    options: ['Thuận tiện / Tiện lợi', 'Khó khăn', 'Đắt đỏ', 'Xa xôi'],
    category: 'Đời sống'
  },
  {
    id: 'sq_s1_5',
    stageId: 'speed_s1',
    hanzi: '迟到',
    pinyin: 'chídào',
    correctMeaning: 'Đến muộn / Đi trễ',
    options: ['Đến muộn / Đi trễ', 'Đến sớm', 'Nghỉ việc', 'Về nhà'],
    category: 'Đời sống'
  },
  {
    id: 'sq_s1_6',
    stageId: 'speed_s1',
    hanzi: '请假',
    pinyin: 'qǐngjià',
    correctMeaning: 'Xin nghỉ phép',
    options: ['Xin nghỉ phép', 'Tăng ca', 'Khen thưởng', 'Đi công tác'],
    category: 'Đời sống'
  },

  // MÀN 2: Xưởng May & Kỹ Thuật (speed_s2)
  {
    id: 'sq_2',
    stageId: 'speed_s2',
    hanzi: '裁床',
    pinyin: 'cáichuáng',
    correctMeaning: 'Bàn cắt vải trong xưởng',
    options: ['Bàn cắt vải trong xưởng', 'Máy may điện tử', 'Bàn ủi nhiệt', 'Kho chứa hàng'],
    category: 'Xưởng May'
  },
  {
    id: 'sq_3',
    stageId: 'speed_s2',
    hanzi: '跳针',
    pinyin: 'tiàozhēn',
    correctMeaning: 'Nhảy mũi chỉ / Bỏ mũi',
    options: ['Nhảy mũi chỉ / Bỏ mũi', 'Đứt cúc áo', 'Lệch size may', 'Ố vàng vải'],
    category: 'Xưởng May'
  },
  {
    id: 'sq_5',
    stageId: 'speed_s2',
    hanzi: '尺寸',
    pinyin: 'chǐcun',
    correctMeaning: 'Kích thước / Size',
    options: ['Kích thước / Size', 'Màu sắc', 'Trọng lượng', 'Độ dày'],
    category: 'Xưởng May'
  },
  {
    id: 'sq_6',
    stageId: 'speed_s2',
    hanzi: '复查',
    pinyin: 'fùchá',
    correctMeaning: 'Kiểm tra lại / Tái kiểm',
    options: ['Kiểm tra lại / Tái kiểm', 'Xuất hàng đi', 'Cắt bớt chỉ', 'May gấp nếp'],
    category: 'Xưởng May'
  },
  {
    id: 'sq_8',
    stageId: 'speed_s2',
    hanzi: '辅料',
    pinyin: 'fǔliào',
    correctMeaning: 'Phụ liệu may (chỉ, cúc, khóa...)',
    options: ['Phụ liệu may (chỉ, cúc, khóa...)', 'Vải chính', 'Bao bì ni-lông', 'Kéo cắt'],
    category: 'Xưởng May'
  },
  {
    id: 'sq_10',
    stageId: 'speed_s2',
    hanzi: '色差',
    pinyin: 'sèchā',
    correctMeaning: 'Lệch màu / Sai lệch màu sắc',
    options: ['Lệch màu / Sai lệch màu sắc', 'Sai kích thước', 'Cháy vải', 'Rách biên'],
    category: 'Xưởng May'
  },
  {
    id: 'sq_14',
    stageId: 'speed_s2',
    hanzi: '断线',
    pinyin: 'duànxiàn',
    correctMeaning: 'Đứt chỉ may',
    options: ['Đứt chỉ may', 'Gãy kim may', 'Chập điện máy', 'Mòn dao cắt'],
    category: 'Xưởng May'
  },
  {
    id: 'sq_s2_1',
    stageId: 'speed_s2',
    hanzi: '锁边机',
    pinyin: 'suǒbiānjī',
    correctMeaning: 'Máy vắt sổ',
    options: ['Máy vắt sổ', 'Máy đính cúc', 'Máy may 1 kim', 'Nồi hơi ủi'],
    category: 'Xưởng May'
  },
  {
    id: 'sq_s2_2',
    stageId: 'speed_s2',
    hanzi: '封箱',
    pinyin: 'fēngxiāng',
    correctMeaning: 'Dán thùng / Đóng thùng hàng',
    options: ['Dán thùng / Đóng thùng hàng', 'May cổ áo', 'Kiểm lỗi cúc', 'Giặt mẫu'],
    category: 'Xưởng May'
  },
  {
    id: 'sq_s2_3',
    stageId: 'speed_s2',
    hanzi: '起皱',
    pinyin: 'qǐzhòu',
    correctMeaning: 'Nhăn nheo / Co rúm vải',
    options: ['Nhăn nheo / Co rúm vải', 'Thẳng thớm', 'Rơi cúc', 'Phai màu'],
    category: 'Xưởng May'
  },

  // MÀN 3: Văn Phòng & Thương Mại (speed_s3)
  {
    id: 'sq_11',
    stageId: 'speed_s3',
    hanzi: '合同',
    pinyin: 'hétong',
    correctMeaning: 'Hợp đồng kinh tế',
    options: ['Hợp đồng kinh tế', 'Hóa đơn đỏ', 'Biên bản phạt', 'Giấy giới thiệu'],
    category: 'Thương mại'
  },
  {
    id: 'sq_13',
    stageId: 'speed_s3',
    hanzi: '发票',
    pinyin: 'fāpiào',
    correctMeaning: 'Hóa đơn / Hóa đơn tài chính',
    options: ['Hóa đơn / Hóa đơn tài chính', 'Vé máy bay', 'Hộ chiếu', 'Bản thiết kế'],
    category: 'Thương mại'
  },
  {
    id: 'sq_15',
    stageId: 'speed_s3',
    hanzi: '会议室',
    pinyin: 'huìyìshì',
    correctMeaning: 'Phòng họp',
    options: ['Phòng họp', 'Phòng ăn', 'Xưởng cắt', 'Nhà kho'],
    category: 'Văn phòng'
  },
  {
    id: 'sq_s3_1',
    stageId: 'speed_s3',
    hanzi: '报价单',
    pinyin: 'bàojiàdān',
    correctMeaning: 'Bảng báo giá',
    options: ['Bảng báo giá', 'Hợp đồng lao động', 'Phiếu xuất kho', 'Giấy phép kinh doanh'],
    category: 'Thương mại'
  },
  {
    id: 'sq_s3_2',
    stageId: 'speed_s3',
    hanzi: '付款',
    pinyin: 'fùkuǎn',
    correctMeaning: 'Thanh toán tiền',
    options: ['Thanh toán tiền', 'Ký nhận hàng', 'Đặt may thử', 'Hủy hợp đồng'],
    category: 'Thương mại'
  },
  {
    id: 'sq_s3_3',
    stageId: 'speed_s3',
    hanzi: '定金',
    pinyin: 'dìngjīn',
    correctMeaning: 'Tiền đặt cọc',
    options: ['Tiền đặt cọc', 'Tiền hoa hồng', 'Tiền phạt vi phạm', 'Tiền lương'],
    category: 'Thương mại'
  },
  {
    id: 'sq_s3_4',
    stageId: 'speed_s3',
    hanzi: '客户',
    pinyin: 'kèhù',
    correctMeaning: 'Khách hàng / Đối tác',
    options: ['Khách hàng / Đối tác', 'Nhân viên mới', 'Bảo vệ xưởng', 'Tài xế'],
    category: 'Văn phòng'
  },
  {
    id: 'sq_s3_5',
    stageId: 'speed_s3',
    hanzi: '打印',
    pinyin: 'dǎyìn',
    correctMeaning: 'In ấn tài liệu',
    options: ['In ấn tài liệu', 'Scan văn bản', 'Gửi bưu điện', 'Xóa file'],
    category: 'Văn phòng'
  },
  {
    id: 'sq_s3_6',
    stageId: 'speed_s3',
    hanzi: '总结',
    pinyin: 'zǒngjié',
    correctMeaning: 'Tổng kết / Tóm lược',
    options: ['Tổng kết / Tóm lược', 'Khai mạc', 'Giải tán', 'Tranh luận'],
    category: 'Văn phòng'
  },
  {
    id: 'sq_s3_7',
    stageId: 'speed_s3',
    hanzi: '方案',
    pinyin: 'fāng\'àn',
    correctMeaning: 'Phương án / Kế hoạch',
    options: ['Phương án / Kế hoạch', 'Khó khăn', 'Ý kiến phụ', 'Báo cáo tài chính'],
    category: 'Văn phòng'
  },

  // MÀN 4: Đàm Phán & Xuất Nhập Khẩu (speed_s4)
  {
    id: 'sq_12',
    stageId: 'speed_s4',
    hanzi: '交货期',
    pinyin: 'jiāohuò qī',
    correctMeaning: 'Thời hạn giao hàng (Lead time)',
    options: ['Thời hạn giao hàng (Lead time)', 'Ngày bắt đầu may', 'Hạn thanh toán tiền', 'Ngày nghỉ lễ'],
    category: 'Xưởng May'
  },
  {
    id: 'sq_s4_1',
    stageId: 'speed_s4',
    hanzi: '报关',
    pinyin: 'bàoguān',
    correctMeaning: 'Khai báo hải quan',
    options: ['Khai báo hải quan', 'Kiểm tra container', 'Xếp dỡ hàng', 'Thuê tàu biển'],
    category: 'Xuất nhập khẩu'
  },
  {
    id: 'sq_s4_2',
    stageId: 'speed_s4',
    hanzi: '集装箱',
    pinyin: 'jízhuāngxiāng',
    correctMeaning: 'Thùng container',
    options: ['Thùng container', 'Pallet gỗ', 'Xe nâng hàng', 'Kho ngoại quan'],
    category: 'Xuất nhập khẩu'
  },
  {
    id: 'sq_s4_3',
    stageId: 'speed_s4',
    hanzi: '海运',
    pinyin: 'hǎiyùn',
    correctMeaning: 'Vận chuyển đường biển',
    options: ['Vận chuyển đường biển', 'Vận chuyển hàng không', 'Chuyển phát nhanh', 'Vận chuyển đường bộ'],
    category: 'Logistics'
  },
  {
    id: 'sq_s4_4',
    stageId: 'speed_s4',
    hanzi: '空运',
    pinyin: 'kōngyùn',
    correctMeaning: 'Vận chuyển đường hàng không',
    options: ['Vận chuyển đường hàng không', 'Vận chuyển đường thủy', 'Đi tàu hỏa', 'Giao tại xưởng'],
    category: 'Logistics'
  },
  {
    id: 'sq_s4_5',
    stageId: 'speed_s4',
    hanzi: '提单',
    pinyin: 'tídān',
    correctMeaning: 'Vận đơn đường biển (B/L)',
    options: ['Vận đơn đường biển (B/L)', 'Hóa đơn đỏ', 'Phiếu đóng gói (Packing list)', 'Chứng nhận xuất xứ (C/O)'],
    category: 'Xuất nhập khẩu'
  },
  {
    id: 'sq_s4_6',
    stageId: 'speed_s4',
    hanzi: '索赔',
    pinyin: 'suǒpéi',
    correctMeaning: 'Đòi bồi thường / Khiếu nại đền bù',
    options: ['Đòi bồi thường / Khiếu nại đền bù', 'Giảm giá mua', 'Thanh toán đợt cuối', 'Ký phụ lục'],
    category: 'Thương mại'
  },
  {
    id: 'sq_s4_7',
    stageId: 'speed_s4',
    hanzi: '退税',
    pinyin: 'tuìshuì',
    correctMeaning: 'Hoàn thuế xuất khẩu',
    options: ['Hoàn thuế xuất khẩu', 'Nộp phạt thuế', 'Đóng bảo hiểm', 'Phí bến bãi'],
    category: 'Xuất nhập khẩu'
  },

  // MÀN 5: Khẩu Ngữ & Siêu Tốc Độ (speed_s5)
  {
    id: 'sq_s5_1',
    stageId: 'speed_s5',
    hanzi: '随便',
    pinyin: 'suíbiàn',
    correctMeaning: 'Tùy ý / Tùy bạn / Sao cũng được',
    options: ['Tùy ý / Tùy bạn / Sao cũng được', 'Cẩn thận', 'Rất quan trọng', 'Bắt buộc'],
    category: 'Khẩu ngữ'
  },
  {
    id: 'sq_s5_2',
    stageId: 'speed_s5',
    hanzi: '算了吧',
    pinyin: 'suàn le ba',
    correctMeaning: 'Thôi bỏ qua đi / Thôi dẹp đi',
    options: ['Thôi bỏ qua đi / Thôi dẹp đi', 'Tính toán cẩn thận', 'Hãy tiếp tục', 'Rất đáng giá'],
    category: 'Khẩu ngữ'
  },
  {
    id: 'sq_s5_3',
    stageId: 'speed_s5',
    hanzi: '原来如此',
    pinyin: 'yuánlái rúcǐ',
    correctMeaning: 'Hóa ra là như vậy / Ra là thế',
    options: ['Hóa ra là như vậy / Ra là thế', 'Thật vô lý', 'Chưa từng nghe', 'Hoàn toàn sai'],
    category: 'Khẩu ngữ'
  },
  {
    id: 'sq_s5_4',
    stageId: 'speed_s5',
    hanzi: '不好意思',
    pinyin: 'bù hǎoyìsi',
    correctMeaning: 'Ngại quá / Xin lỗi làm phiền',
    options: ['Ngại quá / Xin lỗi làm phiền', 'Không có ý nghĩa', 'Rất tức giận', 'Đáng đời'],
    category: 'Khẩu ngữ'
  },
  {
    id: 'sq_s5_5',
    stageId: 'speed_s5',
    hanzi: '靠谱',
    pinyin: 'kàopǔ',
    correctMeaning: 'Đáng tin cậy / Uy tín',
    options: ['Đáng tin cậy / Uy tín', 'Hồ đồ', 'Đắt đỏ', 'Chậm chạp'],
    category: 'Khẩu ngữ'
  },
  {
    id: 'sq_s5_6',
    stageId: 'speed_s5',
    hanzi: '没辙',
    pinyin: 'méizhé',
    correctMeaning: 'Hết cách rồi / Bó tay',
    options: ['Hết cách rồi / Bó tay', 'Có giải pháp ngay', 'Không sao cả', 'Rất đơn giản'],
    category: 'Khẩu ngữ'
  },
  {
    id: 'sq_s5_7',
    stageId: 'speed_s5',
    hanzi: '马马虎虎',
    pinyin: 'mǎmǎhūhū',
    correctMeaning: 'Tàm tạm / Qua loa / Đại khái',
    options: ['Tàm tạm / Qua loa / Đại khái', 'Xuất sắc tuyệt đối', 'Nhanh như hổ', 'Nguy hiểm'],
    category: 'Thành ngữ'
  },
  {
    id: 'sq_s5_8',
    stageId: 'speed_s5',
    hanzi: '一清二楚',
    pinyin: 'yìqīng-èrchǔ',
    correctMeaning: 'Rõ ràng mồn một / Tường tận',
    options: ['Rõ ràng mồn một / Tường tận', 'Mập mờ khó hiểu', 'Một nửa sự thật', 'Rất sạch sẽ'],
    category: 'Thành ngữ'
  }
];

// ============================================================================
// 3. DỮ LIỆU BẬC THẦY THANH ĐIỆU (TONE MASTER QUEST) - 5 MÀN CHƠI
// ============================================================================
export const TONE_STAGES: GameStage[] = [
  {
    id: 'tone_s1',
    name: 'Màn 1: Bộ Ba Căn Bản (ma, ba, tang)',
    desc: 'Luyện 4 thanh điệu trên các âm tiết đơn giản kinh điển.',
    icon: '🎵',
    badge: 'Căn Bản',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'tone_s2',
    name: 'Màn 2: Âm Vận Phổ Biến (shi, li, xian, guo)',
    desc: 'Phân biệt thanh điệu trên các âm đầu lưỡi và nguyên âm kép.',
    icon: '🎙️',
    badge: 'Phổ Biến',
    color: 'from-sky-400 to-blue-500'
  },
  {
    id: 'tone_s3',
    name: 'Màn 3: Thanh Điệu Xưởng May (ban, jian, bu, fei)',
    desc: 'Các âm xuất hiện nhiều nhất trong nhà máy may và đời sống.',
    icon: '🧵',
    badge: 'Xưởng May',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'tone_s4',
    name: 'Màn 4: Cặp Thanh Dễ Nhầm (买-卖, 问-吻, 烟-验)',
    desc: 'Đối đầu các cặp thanh 1 vs thanh 4, thanh 2 vs thanh 3 cực dễ nhầm.',
    icon: '⚡',
    badge: 'Bẫy Thanh Điệu',
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 'tone_s5',
    name: 'Màn 5: Thử Thách Đỉnh Cao (dong, zhang, qian, tong)',
    desc: 'Kiểm tra đôi tai bản xứ với tốc độ cao và âm mũi phức hợp.',
    icon: '👑',
    badge: 'Bậc Thầy',
    color: 'from-emerald-500 to-teal-600'
  }
];

export const TONE_CHALLENGE_DATA: ToneChallengeItem[] = [
  // MÀN 1: ma, ba, tang
  {
    id: 'tc_1',
    stageId: 'tone_s1',
    syllableBase: 'ma',
    hanzi: '妈',
    fullPinyin: 'mā',
    toneNumber: 1,
    vietnamese: 'Mẹ (Thanh 1: cao, đều phẳng 55)',
    exampleWord: '妈妈 (Mẹ)'
  },
  {
    id: 'tc_2',
    stageId: 'tone_s1',
    syllableBase: 'ma',
    hanzi: '麻',
    fullPinyin: 'má',
    toneNumber: 2,
    vietnamese: 'Cây gai / Tê rần (Thanh 2: vuốt lên cao 35)',
    exampleWord: '麻烦 (Phiền phức)'
  },
  {
    id: 'tc_3',
    stageId: 'tone_s1',
    syllableBase: 'ma',
    hanzi: '马',
    fullPinyin: 'mǎ',
    toneNumber: 3,
    vietnamese: 'Con ngựa (Thanh 3: trầm xuống rồi lên 214)',
    exampleWord: '马上 (Ngay lập tức)'
  },
  {
    id: 'tc_4',
    stageId: 'tone_s1',
    syllableBase: 'ma',
    hanzi: '骂',
    fullPinyin: 'mà',
    toneNumber: 4,
    vietnamese: 'Mắng / Chửi (Thanh 4: dứt khoát từ trên xuống 51)',
    exampleWord: '责骂 (Trách mắng)'
  },
  {
    id: 'tc_5',
    stageId: 'tone_s1',
    syllableBase: 'ba',
    hanzi: '八',
    fullPinyin: 'bā',
    toneNumber: 1,
    vietnamese: 'Số 8 (Thanh 1: âm bổng đều 55)',
    exampleWord: '八个 (Tám cái)'
  },
  {
    id: 'tc_6',
    stageId: 'tone_s1',
    syllableBase: 'ba',
    hanzi: '拔',
    fullPinyin: 'bá',
    toneNumber: 2,
    vietnamese: 'Nhổ / Kéo lên (Thanh 2: lên giọng 35)',
    exampleWord: '拔河 (Kéo co)'
  },
  {
    id: 'tc_7',
    stageId: 'tone_s1',
    syllableBase: 'ba',
    hanzi: '把',
    fullPinyin: 'bǎ',
    toneNumber: 3,
    vietnamese: 'Cầm / Câu chữ 把 (Thanh 3: trầm sâu 214)',
    exampleWord: '把门打开 (Mở cửa ra)'
  },
  {
    id: 'tc_8',
    stageId: 'tone_s1',
    syllableBase: 'ba',
    hanzi: '爸',
    fullPinyin: 'bà',
    toneNumber: 4,
    vietnamese: 'Bố / Cha (Thanh 4: dứt khoát 51)',
    exampleWord: '爸爸 (Bố)'
  },
  {
    id: 'tc_9',
    stageId: 'tone_s1',
    syllableBase: 'tang',
    hanzi: '汤',
    fullPinyin: 'tāng',
    toneNumber: 1,
    vietnamese: 'Canh / Súp (Thanh 1: đều ngang 55)',
    exampleWord: '喝汤 (Uống canh)'
  },
  {
    id: 'tc_10',
    stageId: 'tone_s1',
    syllableBase: 'tang',
    hanzi: '糖',
    fullPinyin: 'táng',
    toneNumber: 2,
    vietnamese: 'Đường / Kẹo (Thanh 2: lên giọng 35)',
    exampleWord: '吃糖 (Ăn kẹo)'
  },
  {
    id: 'tc_11',
    stageId: 'tone_s1',
    syllableBase: 'tang',
    hanzi: '躺',
    fullPinyin: 'tǎng',
    toneNumber: 3,
    vietnamese: 'Nằm (Thanh 3: trũng xuống 214)',
    exampleWord: '躺下 (Nằm xuống)'
  },
  {
    id: 'tc_12',
    stageId: 'tone_s1',
    syllableBase: 'tang',
    hanzi: '烫',
    fullPinyin: 'tàng',
    toneNumber: 4,
    vietnamese: 'Nóng bỏng / Ủi đồ (Thanh 4: mạnh dứt 51)',
    exampleWord: '烫衣服 (Ủi quần áo)'
  },

  // MÀN 2: shi, li, xian, guo
  {
    id: 'tc_s2_1',
    stageId: 'tone_s2',
    syllableBase: 'shi',
    hanzi: '诗',
    fullPinyin: 'shī',
    toneNumber: 1,
    vietnamese: 'Bài thơ (Thanh 1: cao phẳng)',
    exampleWord: '诗人 (Nhà thơ)'
  },
  {
    id: 'tc_s2_2',
    stageId: 'tone_s2',
    syllableBase: 'shi',
    hanzi: '十',
    fullPinyin: 'shí',
    toneNumber: 2,
    vietnamese: 'Số 10 (Thanh 2: vuốt lên)',
    exampleWord: '十分 (Vô cùng)'
  },
  {
    id: 'tc_s2_3',
    stageId: 'tone_s2',
    syllableBase: 'shi',
    hanzi: '史',
    fullPinyin: 'shǐ',
    toneNumber: 3,
    vietnamese: 'Lịch sử (Thanh 3: trầm trũng)',
    exampleWord: '历史 (Lịch sử)'
  },
  {
    id: 'tc_s2_4',
    stageId: 'tone_s2',
    syllableBase: 'shi',
    hanzi: '是',
    fullPinyin: 'shì',
    toneNumber: 4,
    vietnamese: 'Là / Đúng (Thanh 4: dứt khoát)',
    exampleWord: '是的 (Đúng vậy)'
  },
  {
    id: 'tc_s2_5',
    stageId: 'tone_s2',
    syllableBase: 'li',
    hanzi: '梨',
    fullPinyin: 'lí',
    toneNumber: 2,
    vietnamese: 'Quả lê (Thanh 2: vuốt lên)',
    exampleWord: '吃梨 (Ăn lê)'
  },
  {
    id: 'tc_s2_6',
    stageId: 'tone_s2',
    syllableBase: 'li',
    hanzi: '里',
    fullPinyin: 'lǐ',
    toneNumber: 3,
    vietnamese: 'Bên trong / Dặm (Thanh 3: trũng sâu)',
    exampleWord: '里面 (Bên trong)'
  },
  {
    id: 'tc_s2_7',
    stageId: 'tone_s2',
    syllableBase: 'li',
    hanzi: '丽',
    fullPinyin: 'lì',
    toneNumber: 4,
    vietnamese: 'Xinh đẹp (Thanh 4: dứt mạnh)',
    exampleWord: '美丽 (Xinh đẹp)'
  },
  {
    id: 'tc_s2_8',
    stageId: 'tone_s2',
    syllableBase: 'xian',
    hanzi: '先',
    fullPinyin: 'xiān',
    toneNumber: 1,
    vietnamese: 'Trước tiên (Thanh 1: cao ngang)',
    exampleWord: '首先 (Đầu tiên)'
  },
  {
    id: 'tc_s2_9',
    stageId: 'tone_s2',
    syllableBase: 'xian',
    hanzi: '闲',
    fullPinyin: 'xián',
    toneNumber: 2,
    vietnamese: 'Rảnh rỗi (Thanh 2: vuốt lên)',
    exampleWord: '空闲 (Rảnh rỗi)'
  },
  {
    id: 'tc_s2_10',
    stageId: 'tone_s2',
    syllableBase: 'xian',
    hanzi: '险',
    fullPinyin: 'xiǎn',
    toneNumber: 3,
    vietnamese: 'Nguy hiểm (Thanh 3: trầm)',
    exampleWord: '危险 (Nguy hiểm)'
  },
  {
    id: 'tc_s2_11',
    stageId: 'tone_s2',
    syllableBase: 'xian',
    hanzi: '线',
    fullPinyin: 'xiàn',
    toneNumber: 4,
    vietnamese: 'Sợi chỉ may / Tuyến đường (Thanh 4: dứt khoát)',
    exampleWord: '缝纫线 (Chỉ may)'
  },
  {
    id: 'tc_s2_12',
    stageId: 'tone_s2',
    syllableBase: 'guo',
    hanzi: '锅',
    fullPinyin: 'guō',
    toneNumber: 1,
    vietnamese: 'Cái chảo / Cái nồi (Thanh 1: cao phẳng)',
    exampleWord: '火锅 (Lẩu)'
  },
  {
    id: 'tc_s2_13',
    stageId: 'tone_s2',
    syllableBase: 'guo',
    hanzi: '国',
    fullPinyin: 'guó',
    toneNumber: 2,
    vietnamese: 'Đất nước / Quốc gia (Thanh 2: vuốt lên)',
    exampleWord: '国家 (Đất nước)'
  },
  {
    id: 'tc_s2_14',
    stageId: 'tone_s2',
    syllableBase: 'guo',
    hanzi: '果',
    fullPinyin: 'guǒ',
    toneNumber: 3,
    vietnamese: 'Hoa quả / Trái cây (Thanh 3: trầm)',
    exampleWord: '水果 (Hoa quả)'
  },
  {
    id: 'tc_s2_15',
    stageId: 'tone_s2',
    syllableBase: 'guo',
    hanzi: '过',
    fullPinyin: 'guò',
    toneNumber: 4,
    vietnamese: 'Đi qua / Từng làm (Thanh 4: dứt khoát)',
    exampleWord: '过去 (Quá khứ)'
  },

  // MÀN 3: ban, jian, bu, fei
  {
    id: 'tc_s3_1',
    stageId: 'tone_s3',
    syllableBase: 'ban',
    hanzi: '班',
    fullPinyin: 'bān',
    toneNumber: 1,
    vietnamese: 'Ca làm việc / Lớp học (Thanh 1)',
    exampleWord: '上班 (Đi làm)'
  },
  {
    id: 'tc_s3_2',
    stageId: 'tone_s3',
    syllableBase: 'ban',
    hanzi: '板',
    fullPinyin: 'bǎn',
    toneNumber: 3,
    vietnamese: 'Tấm ván / Bản rập may (Thanh 3)',
    exampleWord: '纸板 (Bìa rập)'
  },
  {
    id: 'tc_s3_3',
    stageId: 'tone_s3',
    syllableBase: 'ban',
    hanzi: '半',
    fullPinyin: 'bàn',
    toneNumber: 4,
    vietnamese: 'Một nửa (Thanh 4)',
    exampleWord: '半个小时 (Nửa tiếng)'
  },
  {
    id: 'tc_s3_4',
    stageId: 'tone_s3',
    syllableBase: 'jian',
    hanzi: '尖',
    fullPinyin: 'jiān',
    toneNumber: 1,
    vietnamese: 'Đầu nhọn (Thanh 1: kim nhọn)',
    exampleWord: '针尖 (Đầu kim nhọn)'
  },
  {
    id: 'tc_s3_5',
    stageId: 'tone_s3',
    syllableBase: 'jian',
    hanzi: '检',
    fullPinyin: 'jiǎn',
    toneNumber: 3,
    vietnamese: 'Kiểm tra chất lượng (Thanh 3)',
    exampleWord: '质检 (Kiểm phẩm QC)'
  },
  {
    id: 'tc_s3_6',
    stageId: 'tone_s3',
    syllableBase: 'jian',
    hanzi: '件',
    fullPinyin: 'jiàn',
    toneNumber: 4,
    vietnamese: 'Chiếc áo / Mảnh vải / Vụ việc (Thanh 4)',
    exampleWord: '一件衣服 (Một chiếc áo)'
  },
  {
    id: 'tc_s3_7',
    stageId: 'tone_s3',
    syllableBase: 'bu',
    hanzi: '补',
    fullPinyin: 'bǔ',
    toneNumber: 3,
    vietnamese: 'Vá lại / Bổ sung (Thanh 3)',
    exampleWord: '补衣 (Vá áo)'
  },
  {
    id: 'tc_s3_8',
    stageId: 'tone_s3',
    syllableBase: 'bu',
    hanzi: '布',
    fullPinyin: 'bù',
    toneNumber: 4,
    vietnamese: 'Vải may mặc (Thanh 4)',
    exampleWord: '布料 (Vải vóc)'
  },
  {
    id: 'tc_s3_9',
    stageId: 'tone_s3',
    syllableBase: 'fei',
    hanzi: '飞',
    fullPinyin: 'fēi',
    toneNumber: 1,
    vietnamese: 'Bay lượn (Thanh 1)',
    exampleWord: '飞机 (Máy bay)'
  },
  {
    id: 'tc_s3_10',
    stageId: 'tone_s3',
    syllableBase: 'fei',
    hanzi: '肥',
    fullPinyin: 'féi',
    toneNumber: 2,
    vietnamese: 'Rộng thùng thình / Béo (Thanh 2)',
    exampleWord: '衣服太肥 (Áo quá rộng)'
  },
  {
    id: 'tc_s3_11',
    stageId: 'tone_s3',
    syllableBase: 'fei',
    hanzi: '费',
    fullPinyin: 'fèi',
    toneNumber: 4,
    vietnamese: 'Chi phí / Tiền phí (Thanh 4)',
    exampleWord: '运费 (Phí vận chuyển)'
  },

  // MÀN 4: Cặp âm dễ nhầm lẫn
  {
    id: 'tc_s4_1',
    stageId: 'tone_s4',
    syllableBase: 'mai',
    hanzi: '买',
    fullPinyin: 'mǎi',
    toneNumber: 3,
    vietnamese: 'Mua vào (Thanh 3: trầm sâu)',
    exampleWord: '买东西 (Mua sắm)'
  },
  {
    id: 'tc_s4_2',
    stageId: 'tone_s4',
    syllableBase: 'mai',
    hanzi: '卖',
    fullPinyin: 'mài',
    toneNumber: 4,
    vietnamese: 'Bán ra (Thanh 4: dứt khoát)',
    exampleWord: '卖货 (Bán hàng)'
  },
  {
    id: 'tc_s4_3',
    stageId: 'tone_s4',
    syllableBase: 'wen',
    hanzi: '温',
    fullPinyin: 'wēn',
    toneNumber: 1,
    vietnamese: 'Ấm áp / Nhiệt độ (Thanh 1)',
    exampleWord: '温度 (Nhiệt độ)'
  },
  {
    id: 'tc_s4_4',
    stageId: 'tone_s4',
    syllableBase: 'wen',
    hanzi: '闻',
    fullPinyin: 'wén',
    toneNumber: 2,
    vietnamese: 'Ngửi thấy / Nghe ngóng (Thanh 2)',
    exampleWord: '新闻 (Tin tức)'
  },
  {
    id: 'tc_s4_5',
    stageId: 'tone_s4',
    syllableBase: 'wen',
    hanzi: '吻',
    fullPinyin: 'wěn',
    toneNumber: 3,
    vietnamese: 'Hôn môi (Thanh 3)',
    exampleWord: '亲吻 (Hôn)'
  },
  {
    id: 'tc_s4_6',
    stageId: 'tone_s4',
    syllableBase: 'wen',
    hanzi: '问',
    fullPinyin: 'wèn',
    toneNumber: 4,
    vietnamese: 'Hỏi han / Thắc mắc (Thanh 4)',
    exampleWord: '问题 (Câu hỏi/Vấn đề)'
  },
  {
    id: 'tc_s4_7',
    stageId: 'tone_s4',
    syllableBase: 'yi',
    hanzi: '一',
    fullPinyin: 'yī',
    toneNumber: 1,
    vietnamese: 'Số 1 / Đều nhau (Thanh 1)',
    exampleWord: '第一 (Thứ nhất)'
  },
  {
    id: 'tc_s4_8',
    stageId: 'tone_s4',
    syllableBase: 'yi',
    hanzi: '移',
    fullPinyin: 'yí',
    toneNumber: 2,
    vietnamese: 'Di chuyển (Thanh 2)',
    exampleWord: '移动 (Di động)'
  },
  {
    id: 'tc_s4_9',
    stageId: 'tone_s4',
    syllableBase: 'yi',
    hanzi: '倚',
    fullPinyin: 'yǐ',
    toneNumber: 3,
    vietnamese: 'Tựa vào / Nương nhờ (Thanh 3)',
    exampleWord: '倚靠 (Dựa dẫm)'
  },
  {
    id: 'tc_s4_10',
    stageId: 'tone_s4',
    syllableBase: 'yi',
    hanzi: '意',
    fullPinyin: 'yì',
    toneNumber: 4,
    vietnamese: 'Ý kiến / Ý nghĩa (Thanh 4)',
    exampleWord: '意见 (Ý kiến đóng góp)'
  },

  // MÀN 5: Thử thách đỉnh cao
  {
    id: 'tc_s5_1',
    stageId: 'tone_s5',
    syllableBase: 'dong',
    hanzi: '东',
    fullPinyin: 'dōng',
    toneNumber: 1,
    vietnamese: 'Phía Đông (Thanh 1: cao ngang)',
    exampleWord: '东西 (Đồ đạc)'
  },
  {
    id: 'tc_s5_2',
    stageId: 'tone_s5',
    syllableBase: 'dong',
    hanzi: '懂',
    fullPinyin: 'dǒng',
    toneNumber: 3,
    vietnamese: 'Hiểu biết (Thanh 3: trầm)',
    exampleWord: '听懂 (Nghe hiểu)'
  },
  {
    id: 'tc_s5_3',
    stageId: 'tone_s5',
    syllableBase: 'dong',
    hanzi: '动',
    fullPinyin: 'dòng',
    toneNumber: 4,
    vietnamese: 'Hành động / Vận động (Thanh 4: dứt)',
    exampleWord: '运动 (Thể thao)'
  },
  {
    id: 'tc_s5_4',
    stageId: 'tone_s5',
    syllableBase: 'zhang',
    hanzi: '张',
    fullPinyin: 'zhāng',
    toneNumber: 1,
    vietnamese: 'Mở ra / Tờ giấy (Thanh 1)',
    exampleWord: '一张纸 (Một tờ giấy)'
  },
  {
    id: 'tc_s5_5',
    stageId: 'tone_s5',
    syllableBase: 'zhang',
    hanzi: '长',
    fullPinyin: 'zhǎng',
    toneNumber: 3,
    vietnamese: 'Trưởng thành / Giám đốc (Thanh 3)',
    exampleWord: '厂长 (Giám đốc xưởng)'
  },
  {
    id: 'tc_s5_6',
    stageId: 'tone_s5',
    syllableBase: 'zhang',
    hanzi: '账',
    fullPinyin: 'zhàng',
    toneNumber: 4,
    vietnamese: 'Sổ sách / Hóa đơn nợ (Thanh 4)',
    exampleWord: '结账 (Thanh toán sổ sách)'
  },
  {
    id: 'tc_s5_7',
    stageId: 'tone_s5',
    syllableBase: 'qian',
    hanzi: '千',
    fullPinyin: 'qiān',
    toneNumber: 1,
    vietnamese: 'Một nghìn (Thanh 1)',
    exampleWord: '一千 (Một nghìn)'
  },
  {
    id: 'tc_s5_8',
    stageId: 'tone_s5',
    syllableBase: 'qian',
    hanzi: '前',
    fullPinyin: 'qián',
    toneNumber: 2,
    vietnamese: 'Phía trước / Tiền bạc (Thanh 2)',
    exampleWord: '钱 (Tiền bạc)'
  },
  {
    id: 'tc_s5_9',
    stageId: 'tone_s5',
    syllableBase: 'qian',
    hanzi: '浅',
    fullPinyin: 'qiǎn',
    toneNumber: 3,
    vietnamese: 'Màu nhạt / Nông cạn (Thanh 3)',
    exampleWord: '浅色 (Màu nhạt)'
  },
  {
    id: 'tc_s5_10',
    stageId: 'tone_s5',
    syllableBase: 'qian',
    hanzi: '欠',
    fullPinyin: 'qiàn',
    toneNumber: 4,
    vietnamese: 'Thiếu nợ / Nợ nần (Thanh 4)',
    exampleWord: '欠款 (Tiền nợ)'
  }
];

// ============================================================================
// 4. DỮ LIỆU XẾP CÂU THẦN TỐC (SENTENCE RACER) - 5 MÀN CHƠI
// ============================================================================
export const SENTENCE_STAGES: GameStage[] = [
  {
    id: 'ss_s1',
    name: 'Màn 1: Giao Tiếp & Thường Nhật',
    desc: 'Các mẫu câu chào hỏi, thói quen và lời mời trong đời sống.',
    icon: '☕',
    badge: 'Đời Sống',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'ss_s2',
    name: 'Màn 2: Thao Tác Xưởng May',
    desc: 'Chỉ đạo sản xuất may mặc, may ráp áo mẫu và kiểm phẩm QC.',
    icon: '🧵',
    badge: 'Xưởng May',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'ss_s3',
    name: 'Màn 3: Cú Pháp Trọng Điểm (把 & 被)',
    desc: 'Làm chủ câu chữ 把 (chủ động xử lý) và câu chữ 被 (bị động).',
    icon: '📐',
    badge: 'Ngữ Pháp Vàng',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'ss_s4',
    name: 'Màn 4: Câu So Sánh & Bổ Ngữ Trạng Thái',
    desc: 'Cấu trúc câu so sánh 比 và bổ ngữ trạng thái Động từ + 得.',
    icon: '⚖️',
    badge: 'So Sánh & Bổ Ngữ',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'ss_s5',
    name: 'Màn 5: Thương Mại & Liên Từ Phức',
    desc: 'Đàm phán đơn hàng, ngày giao hàng và các cấu trúc câu phức.',
    icon: '🤝',
    badge: 'Thương Mại Đỉnh Cao',
    color: 'from-rose-500 to-pink-600'
  }
];

export const SENTENCE_SCRAMBLE_DATA: SentenceScrambleItem[] = [
  // MÀN 1: Giao tiếp & Thường nhật (ss_s1)
  {
    id: 'ss_2',
    stageId: 'ss_s1',
    vietnamese: 'Tôi hôm nay rất vui khi gặp bạn.',
    correctHanzi: '我今天很高兴见到你。',
    correctPinyin: 'Wǒ jīntiān hěn gāoxìng jiàn dào nǐ.',
    words: ['我', '今天', '很高兴', '见到', '你'],
    explanation: 'Trạng ngữ chỉ thời gian (今天) đứng trước vị ngữ/tính từ.',
    category: 'Giao tiếp'
  },
  {
    id: 'ss_s1_1',
    stageId: 'ss_s1',
    vietnamese: 'Mỗi buổi sáng tôi đều uống một cốc cà phê.',
    correctHanzi: '我每天早上都喝一杯咖啡。',
    correctPinyin: 'Wǒ měitiān zǎoshang dōu hē yì bēi kāfēi.',
    words: ['我', '每天早上', '都', '喝', '一杯咖啡'],
    explanation: 'Cấu trúc phó từ: [Chủ ngữ] + [Thời gian] + 都 + [Động từ] + [Tân ngữ].',
    category: 'Đời sống'
  },
  {
    id: 'ss_s1_2',
    stageId: 'ss_s1',
    vietnamese: 'Bạn có rảnh cùng tôi đi siêu thị mua hoa quả không?',
    correctHanzi: '你有空和我去超市买水果吗？',
    correctPinyin: 'Nǐ yǒu kòng hé wǒ qù chāoshì mǎi shuǐguǒ ma?',
    words: ['你', '有空', '和我', '去超市', '买水果吗'],
    explanation: 'Câu liên động: 去超市 (đi siêu thị) mục đích để 买水果 (mua hoa quả).',
    category: 'Đời sống'
  },
  {
    id: 'ss_s1_3',
    stageId: 'ss_s1',
    vietnamese: 'Hôm nay trời nhiều mây có khả năng sẽ mưa to.',
    correctHanzi: '今天多云可能会下大雨。',
    correctPinyin: 'Jīntiān duōyún kěnéng huì xià dàyǔ.',
    words: ['今天', '多云', '可能', '会', '下大雨'],
    explanation: 'Động từ năng nguyện: 可能会 (có khả năng sẽ).',
    category: 'Thời tiết'
  },
  {
    id: 'ss_s1_4',
    stageId: 'ss_s1',
    vietnamese: 'Cuối tuần này chúng ta cùng nhau đi ăn lẩu nhé.',
    correctHanzi: '这个周末我们一起去吃火锅吧。',
    correctPinyin: 'Zhège zhōumò wǒmen yìqǐ qù chī huǒguō ba.',
    words: ['这个周末', '我们', '一起', '去吃火锅', '吧'],
    explanation: 'Trợ từ ngữ khí 吧 ở cuối câu biểu thị lời rủ rê, đề xuất thân mật.',
    category: 'Giao tiếp'
  },

  // MÀN 2: Thao tác xưởng may (ss_s2)
  {
    id: 'ss_3',
    stageId: 'ss_s2',
    vietnamese: 'Chiếc áo mẫu này may rất đẹp.',
    correctHanzi: '这件样衣缝得非常漂亮。',
    correctPinyin: 'Zhè jiàn yàngyī féng de fēicháng piàoliang.',
    words: ['这件样衣', '缝', '得', '非常', '漂亮'],
    explanation: 'Bổ ngữ trạng thái: Động từ + 得 + Trạng từ + Tính từ (缝 + 得 + 非常漂亮).',
    category: 'May mặc'
  },
  {
    id: 'ss_5',
    stageId: 'ss_s2',
    vietnamese: 'Tất cả sản phẩm lỗi đều đã được sửa xong.',
    correctHanzi: '所有次品都已经修好了。',
    correctPinyin: 'Suǒyǒu cìpǐn dōu yǐjīng xiū hǎo le.',
    words: ['所有次品', '都', '已经', '修好', '了'],
    explanation: 'Bổ ngữ kết quả: 修好 (sửa xong/sửa đạt) kết hợp phó từ 都 已经.',
    category: 'May mặc'
  },
  {
    id: 'ss_s2_1',
    stageId: 'ss_s2',
    vietnamese: 'Đường may sườn áo này bị đứt chỉ cần may lại.',
    correctHanzi: '这条侧缝断线了需要重缝。',
    correctPinyin: 'Zhè tiáo cèfèng duànxiàn le xūyào chóngféng.',
    words: ['这条侧缝', '断线了', '需要', '重缝'],
    explanation: 'Thuật ngữ xưởng may: 侧缝 (đường may sườn áo), 重缝 (may đè lại/sửa may lại).',
    category: 'Xưởng May'
  },
  {
    id: 'ss_s2_2',
    stageId: 'ss_s2',
    vietnamese: 'Tổ trưởng nhắc nhở công nhân chú ý mật độ mũi kim.',
    correctHanzi: '组长提醒工人注意针距密度。',
    correctPinyin: 'Zǔzhǎng tíxǐng gōngrén zhùyì zhēnjù mìdù.',
    words: ['组长', '提醒', '工人', '注意', '针距密度'],
    explanation: 'Câu kiêm ngữ: 组长 nhắc nhở 工人, 工人 lại là chủ ngữ của hành động 注意 针距.',
    category: 'Xưởng May'
  },
  {
    id: 'ss_s2_3',
    stageId: 'ss_s2',
    vietnamese: 'Đơn hàng này tuần sau phải đóng gói xong xuất kho.',
    correctHanzi: '这批订单下周必须包装出库。',
    correctPinyin: 'Zhè pī dìngdān xiàzhōu bìxū bāozhuāng chūkù.',
    words: ['这批订单', '下周', '必须', '包装', '出库'],
    explanation: 'Liên động xưởng sản xuất: 包装 (đóng gói) rồi 出库 (xuất kho).',
    category: 'Xưởng May'
  },

  // MÀN 3: Cú pháp trọng điểm (把 & 被) (ss_s3)
  {
    id: 'ss_1',
    stageId: 'ss_s3',
    vietnamese: 'Xin hãy mang số vải này chuyển tới phân xưởng.',
    correctHanzi: '请把这批布料送到车间。',
    correctPinyin: 'Qǐng bǎ zhè pī bùliào sòng dào chējiān.',
    words: ['请', '把', '这批布料', '送到', '车间'],
    explanation: 'Cấu trúc câu chữ 把: [Chủ ngữ] + 把 + [Tân ngữ] + [Động từ] + [Địa điểm].',
    category: 'Câu chữ 把'
  },
  {
    id: 'ss_s3_1',
    stageId: 'ss_s3',
    vietnamese: 'Anh ấy đã kiểm tra kỹ toàn bộ số cúc áo rồi.',
    correctHanzi: '他把所有纽扣都仔细检查了。',
    correctPinyin: 'Tā bǎ suǒyǒu niǔkòu dōu zǐxì jiǎnchá le.',
    words: ['他', '把', '所有纽扣', '都仔细', '检查了'],
    explanation: 'Câu chữ 把 kết hợp phó từ: [Chủ ngữ] + 把 + [Tân ngữ] + 都 + [Trạng từ] + [Động từ].',
    category: 'Câu chữ 把'
  },
  {
    id: 'ss_s3_2',
    stageId: 'ss_s3',
    vietnamese: 'Lô hàng may mặc bị mưa lớn làm ướt mất rồi.',
    correctHanzi: '这批服装被大雨淋湿了。',
    correctPinyin: 'Zhè pī fúzhuāng bèi dàyǔ lín shī le.',
    words: ['这批服装', '被', '大雨', '淋湿', '了'],
    explanation: 'Cấu trúc câu bị động chữ 被: [Vật chịu tác động] + 被 + [Chủ thể gây ra] + [Động từ kết quả].',
    category: 'Câu chữ 被'
  },
  {
    id: 'ss_s3_3',
    stageId: 'ss_s3',
    vietnamese: 'Bạn hãy đóng chặt cửa sổ phòng họp lại nhé.',
    correctHanzi: '请你把会议室的窗户关好。',
    correctPinyin: 'Qǐng nǐ bǎ huìyìshì de chuānghu guān hǎo.',
    words: ['请你', '把', '会议室的窗户', '关', '好'],
    explanation: 'Bổ ngữ kết quả chữ 好 trong câu chữ 把 biểu thị hoàn tất, chu đáo, an toàn.',
    category: 'Câu chữ 把'
  },
  {
    id: 'ss_s3_4',
    stageId: 'ss_s3',
    vietnamese: 'Hợp đồng này đã được giám đốc ký tên xác nhận rồi.',
    correctHanzi: '这份合同被经理签字确认了。',
    correctPinyin: 'Zhè fèn hétong bèi jīnglǐ qiānzì quèrèn le.',
    words: ['这份合同', '被', '经理', '签字', '确认了'],
    explanation: 'Câu chữ 被 nhấn mạnh tính chất đã được phê duyệt chính thức.',
    category: 'Câu chữ 被'
  },

  // MÀN 4: Câu So Sánh & Bổ Ngữ Trạng Thái (ss_s4)
  {
    id: 'ss_4',
    stageId: 'ss_s4',
    vietnamese: 'Chất lượng vải này tốt hơn loại hôm qua.',
    correctHanzi: '这批布料比昨天的更好。',
    correctPinyin: 'Zhè pī bùliào bǐ zuótiān de gèng hǎo.',
    words: ['这批布料', '比', '昨天的', '更', '好'],
    explanation: 'Cấu trúc so sánh câu chữ 比: A + 比 + B + (更) + Tính từ.',
    category: 'Ngữ pháp so sánh'
  },
  {
    id: 'ss_s4_1',
    stageId: 'ss_s4',
    vietnamese: 'Hiệu suất xưởng mới cao hơn xưởng cũ rất nhiều.',
    correctHanzi: '新车间的效率比旧车间高得多。',
    correctPinyin: 'Xīn chējiān de xiàolǜ bǐ jiù chējiān gāo de duō.',
    words: ['新车间的效率', '比', '旧车间', '高得', '多'],
    explanation: 'So sánh mức độ chênh lệch lớn: A + 比 + B + Tính từ + 得多 / 多了.',
    category: 'Ngữ pháp so sánh'
  },
  {
    id: 'ss_s4_2',
    stageId: 'ss_s4',
    vietnamese: 'Anh ấy nói tiếng Trung trôi chảy như người bản xứ vậy.',
    correctHanzi: '他的中文说得像中国人一样流利。',
    correctPinyin: 'Tā de Zhōngwén shuō de xiàng Zhōngguórén yíyàng liúlì.',
    words: ['他的中文', '说得', '像中国人一样', '流利'],
    explanation: 'Kết hợp bổ ngữ trạng thái và so sánh bằng: Động từ + 得 + 像...一样 + Tính từ.',
    category: 'Bổ ngữ trạng thái'
  },
  {
    id: 'ss_s4_3',
    stageId: 'ss_s4',
    vietnamese: 'Tiến độ sản xuất tháng này nhanh hơn dự tính ba ngày.',
    correctHanzi: '本月生产进度比预期快了三天。',
    correctPinyin: 'Běnyuè shēngchǎn jìndù bǐ yùqī kuài le sān tiān.',
    words: ['本月生产进度', '比预期', '快了', '三天'],
    explanation: 'So sánh kèm số lượng từ cụ thể: A + 比 + B + Tính từ + Số lượng từ (三天).',
    category: 'Ngữ pháp so sánh'
  },
  {
    id: 'ss_s4_4',
    stageId: 'ss_s4',
    vietnamese: 'Chất lượng áo khoác này không tốt bằng mẫu xuất khẩu.',
    correctHanzi: '这件外套的质量没有出口样品好。',
    correctPinyin: 'Zhè jiàn wàitào de zhìliàng méiyǒu chūkǒu yàngpǐn hǎo.',
    words: ['这件外套的质量', '没有', '出口样品', '好'],
    explanation: 'Cấu trúc so sánh không bằng: A + 没有 + B + Tính từ.',
    category: 'Ngữ pháp so sánh'
  },

  // MÀN 5: Thương Mại & Liên Từ Phức (ss_s5)
  {
    id: 'ss_6',
    stageId: 'ss_s5',
    vietnamese: 'Tôi càng học tiếng Trung càng cảm thấy thú vị.',
    correctHanzi: '我越学中文越觉得有意思。',
    correctPinyin: 'Wǒ yuè xué Zhōngwén yuè juéde yǒu yìsi.',
    words: ['我', '越学', '中文', '越觉得', '有意思'],
    explanation: 'Cấu trúc tiến triển: 越...越... (Càng...càng...).',
    category: 'Liên từ phức'
  },
  {
    id: 'ss_7',
    stageId: 'ss_s5',
    vietnamese: 'Anh ấy vừa nghe điện thoại liền vội vã rời đi.',
    correctHanzi: '他一接电话就急忙离开了。',
    correctPinyin: 'Tā yì jiē diànhuà jiù jímáng líkāi le.',
    words: ['他', '一接电话', '就', '急忙', '离开了'],
    explanation: 'Cấu trúc liên tiếp 一...就...: Vừa nghe máy là liền vội vã rời đi.',
    category: 'Liên từ phức'
  },
  {
    id: 'ss_s5_1',
    stageId: 'ss_s5',
    vietnamese: 'Tuy giá hơi đắt nhưng chất lượng rất đảm bảo.',
    correctHanzi: '虽然价格有点贵但是质量很有保证。',
    correctPinyin: 'Suīrán jiàgé yǒudiǎnr guì dànshì zhìliàng hěn yǒu bǎozhèng.',
    words: ['虽然', '价格有点贵', '但是', '质量', '很有保证'],
    explanation: 'Cấu trúc biểu thị chuyển hướng: 虽然...但是... (Tuy...nhưng...).',
    category: 'Thương mại'
  },
  {
    id: 'ss_s5_2',
    stageId: 'ss_s5',
    vietnamese: 'Không những giao hàng đúng hẹn mà còn tặng kèm phụ liệu.',
    correctHanzi: '不但按时交货而且还赠送辅料。',
    correctPinyin: 'Búdàn ànshí jiāohuò érqiě hái zèngsòng fǔliào.',
    words: ['不但', '按时交货', '而且还', '赠送', '辅料'],
    explanation: 'Cấu trúc tăng tiến: 不但...而且... (Không những...mà còn...).',
    category: 'Thương mại'
  },
  {
    id: 'ss_s5_3',
    stageId: 'ss_s5',
    vietnamese: 'Chỉ cần khách hàng đồng ý chúng tôi sẽ lập tức may mẫu.',
    correctHanzi: '只要客户同意我们就马上打样。',
    correctPinyin: 'Zhǐyào kèhù tóngyì wǒmen jiù mǎshàng dǎyàng.',
    words: ['只要', '客户同意', '我们', '就马上', '打样'],
    explanation: 'Cấu trúc điều kiện cần: 只要...就... (Chỉ cần...là sẽ...).',
    category: 'Thương mại'
  }
];

// ============================================================================
// 5. DỮ LIỆU ĐỐ VUI GHÉP HÁN TỰ (HANZI PUZZLE) - 5 MÀN CHƠI
// ============================================================================
export const PUZZLE_STAGES: GameStage[] = [
  {
    id: 'puzzle_s1',
    name: 'Màn 1: Chiết Tự Nhập Môn Hội Ý',
    desc: 'Những chữ Hán kinh điển kết hợp từ hình ảnh đời thực và triết lý xưa.',
    icon: '⛩️',
    badge: 'Kinh Điển',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'puzzle_s2',
    name: 'Màn 2: Chiết Tự Xưởng May & Vải Vóc',
    desc: 'Giải mã các chữ Hán thuộc ngành may mặc, tơ lụa và công cụ may.',
    icon: '🧵',
    badge: 'Xưởng May',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'puzzle_s3',
    name: 'Màn 3: Chiết Tự Thiên Nhiên & Trời Đất',
    desc: 'Nước, lửa, cỏ cây hoa lá và các hiện tượng thiên nhiên kỳ vĩ.',
    icon: '🌊',
    badge: 'Thiên Nhiên',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'puzzle_s4',
    name: 'Màn 4: Chiết Tự Tâm Lý & Trái Tim',
    desc: 'Các chữ chứa bộ Tâm (心/忄) phản ánh cảm xúc, nhẫn nại và suy nghĩ.',
    icon: '❤️',
    badge: 'Tâm Hồn',
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 'puzzle_s5',
    name: 'Màn 5: Chiết Tự Ẩm Thực & Sinh Hoạt',
    desc: 'Các chữ chứa bộ Thực (饣), bộ Hỏa (火) gắn liền bữa cơm ngon miệng.',
    icon: '🍲',
    badge: 'Ẩm Thực',
    color: 'from-orange-500 to-amber-600'
  }
];

export const HANZI_PUZZLE_DATA: HanziPuzzleItem[] = [
  // MÀN 1: Chiết Tự Nhập Môn Hội Ý (puzzle_s1)
  {
    id: 'hp_2',
    stageId: 'puzzle_s1',
    targetHanzi: '明',
    pinyin: 'míng',
    vietnamese: 'Sáng sủa / Hiểu rõ (明白)',
    components: [
      { radical: '日', meaning: 'Bộ Nhật (Mặt trời)', pinyin: 'rì' },
      { radical: '月', meaning: 'Bộ Nguyệt (Mặt trăng)', pinyin: 'yuè' }
    ],
    story: 'Mặt trời (日) kết hợp với Mặt trăng (月) mang lại nguồn ánh sáng rực rỡ nhất trần gian, tạo nên chữ 明 (Sáng sủa).',
    options: ['明', '早', '昨', '旺']
  },
  {
    id: 'hp_3',
    stageId: 'puzzle_s1',
    targetHanzi: '休',
    pinyin: 'xiū',
    vietnamese: 'Nghỉ ngơi (休息)',
    components: [
      { radical: '亻', meaning: 'Bộ Nhân đứng (Người)', pinyin: 'rén' },
      { radical: '木', meaning: 'Bộ Mộc (Cây xanh)', pinyin: 'mù' }
    ],
    story: 'Hình ảnh một người (亻) tựa lưng vào gốc cây (木) để bóng mát che chở, biểu thị sự Nghỉ ngơi (休).',
    options: ['休', '体', '保', '位']
  },
  {
    id: 'hp_4',
    stageId: 'puzzle_s1',
    targetHanzi: '好',
    pinyin: 'hǎo',
    vietnamese: 'Tốt đẹp / Hay (你好)',
    components: [
      { radical: '女', meaning: 'Bộ Nữ (Người phụ nữ / Mẹ)', pinyin: 'nǚ' },
      { radical: '子', meaning: 'Bộ Tử (Đứa con)', pinyin: 'zǐ' }
    ],
    story: 'Người mẹ (女) ôm đứa con nhỏ (子) trong lòng chính là điều hạnh phúc và Tốt đẹp nhất (好).',
    options: ['好', '如', '妙', '妈']
  },
  {
    id: 'hp_5',
    stageId: 'puzzle_s1',
    targetHanzi: '森',
    pinyin: 'sēn',
    vietnamese: 'Rừng rậm (森林)',
    components: [
      { radical: '木', meaning: 'Cây cối', pinyin: 'mù' },
      { radical: '木', meaning: 'Cây cối', pinyin: 'mù' },
      { radical: '木', meaning: 'Cây cối', pinyin: 'mù' }
    ],
    story: 'Ba cây (木) chụm lại thành một cánh Rừng rậm bạt ngàn (森).',
    options: ['森', '林', '品', '晶']
  },
  {
    id: 'hp_8',
    stageId: 'puzzle_s1',
    targetHanzi: '男',
    pinyin: 'nán',
    vietnamese: 'Nam giới / Con trai',
    components: [
      { radical: '田', meaning: 'Bộ Điền (Ruộng đồng)', pinyin: 'tián' },
      { radical: '力', meaning: 'Bộ Lực (Sức mạnh)', pinyin: 'lì' }
    ],
    story: 'Người dùng sức lực (力) cày bừa trên đồng ruộng (田) chính là người đàn ông (男).',
    options: ['男', '另', '加', '勇']
  },
  {
    id: 'hp_s1_1',
    stageId: 'puzzle_s1',
    targetHanzi: '众',
    pinyin: 'zhòng',
    vietnamese: 'Quần chúng / Đông người (群众)',
    components: [
      { radical: '人', meaning: 'Người', pinyin: 'rén' },
      { radical: '人', meaning: 'Người', pinyin: 'rén' },
      { radical: '人', meaning: 'Người', pinyin: 'rén' }
    ],
    story: 'Ba người (人) cùng đứng với nhau tạo nên chữ 众 (Đông đảo, quần chúng).',
    options: ['众', '从', '大', '天']
  },
  {
    id: 'hp_s1_2',
    stageId: 'puzzle_s1',
    targetHanzi: '晶',
    pinyin: 'jīng',
    vietnamese: 'Pha lê / Trong suốt (水晶)',
    components: [
      { radical: '日', meaning: 'Mặt trời', pinyin: 'rì' },
      { radical: '日', meaning: 'Mặt trời', pinyin: 'rì' },
      { radical: '日', meaning: 'Mặt trời', pinyin: 'rì' }
    ],
    story: 'Ba mặt trời (日) cùng tỏa sáng lấp lánh như ngọc quý pha lê (晶).',
    options: ['晶', '品', '森', '旦']
  },

  // MÀN 2: Chiết Tự Xưởng May & May Mặc (puzzle_s2)
  {
    id: 'hp_1',
    stageId: 'puzzle_s2',
    targetHanzi: '样',
    pinyin: 'yàng',
    vietnamese: 'Kiểu dáng / Áo mẫu (样衣)',
    components: [
      { radical: '木', meaning: 'Bộ Mộc (Gỗ/Cây)', pinyin: 'mù' },
      { radical: '羊', meaning: 'Bộ Dương (Con dê)', pinyin: 'yáng' }
    ],
    story: 'Chữ "样" gồm bộ Mộc (木 - khung gỗ tạo khuôn mẫu) và chữ Dương (羊 - âm đọc). Ghép lại là khuôn mẫu kiểu dáng.',
    options: ['样', '休', '林', '校']
  },
  {
    id: 'hp_6',
    stageId: 'puzzle_s2',
    targetHanzi: '线',
    pinyin: 'xiàn',
    vietnamese: 'Sợi chỉ may / Tuyến đường (缝纫线)',
    components: [
      { radical: '纟', meaning: 'Bộ Mịch (Sợi tơ/dây chỉ)', pinyin: 'mì' },
      { radical: '戋', meaning: 'Tàn nhỏ / Thanh gươm nhỏ', pinyin: 'jiān' }
    ],
    story: 'Bộ Mịch (纟) chỉ chất liệu tơ sợi kéo dài như đường tơ, tạo nên chữ 线 (Chỉ may).',
    options: ['线', '给', '结', '终']
  },
  {
    id: 'hp_s2_1',
    stageId: 'puzzle_s2',
    targetHanzi: '针',
    pinyin: 'zhēn',
    vietnamese: 'Cây kim may (针线)',
    components: [
      { radical: '钅', meaning: 'Bộ Kim (Kim loại sắt thép)', pinyin: 'jīn' },
      { radical: '十', meaning: 'Số Mười (Đầy đủ/Hình trụ nhọn)', pinyin: 'shí' }
    ],
    story: 'Dụng cụ làm từ kim loại (钅) được mài giũa tỉ mỉ thành vật nhọn chính là cây kim (针).',
    options: ['针', '钟', '铁', '钱']
  },
  {
    id: 'hp_s2_2',
    stageId: 'puzzle_s2',
    targetHanzi: '缝',
    pinyin: 'féng',
    vietnamese: 'May ráp / Khâu vá (缝纫)',
    components: [
      { radical: '纟', meaning: 'Bộ Mịch (Sợi chỉ tơ)', pinyin: 'mì' },
      { radical: '逢', meaning: 'Gặp gỡ / Tiếp giáp', pinyin: 'féng' }
    ],
    story: 'Dùng sợi chỉ (纟) kết nối hai mép vải gặp nhau (逢), tạo thành hành động May ráp (缝).',
    options: ['缝', '统', '络', '练']
  },
  {
    id: 'hp_s2_3',
    stageId: 'puzzle_s2',
    targetHanzi: '扣',
    pinyin: 'kòu',
    vietnamese: 'Cúc áo / Cài nút (纽扣)',
    components: [
      { radical: '扌', meaning: 'Bộ Thủ (Bàn tay)', pinyin: 'shǒu' },
      { radical: '口', meaning: 'Bộ Khẩu (Cái miệng/Lỗ khuyết)', pinyin: 'kǒu' }
    ],
    story: 'Dùng tay (扌) ấn cúc vào lỗ khuyết (口) để gài áo, chính là chữ Cài cúc (扣).',
    options: ['扣', '打', '找', '提']
  },
  {
    id: 'hp_s2_4',
    stageId: 'puzzle_s2',
    targetHanzi: '剪',
    pinyin: 'jiǎn',
    vietnamese: 'Cái kéo / Cắt tỉa (剪刀)',
    components: [
      { radical: '前', meaning: 'Phía trước (Chỉ âm đọc)', pinyin: 'qián' },
      { radical: '刀', meaning: 'Bộ Đao (Lưỡi dao sắc)', pinyin: 'dāo' }
    ],
    story: 'Dụng cụ có hai lưỡi dao (刀) đối xứng sắc bén dùng để cắt tỉa vải vóc chính là Cái kéo (剪).',
    options: ['剪', '前', '剑', '刻']
  },

  // MÀN 3: Chiết Tự Thiên Nhiên & Trời Đất (puzzle_s3)
  {
    id: 'hp_s3_1',
    stageId: 'puzzle_s3',
    targetHanzi: '海',
    pinyin: 'hǎi',
    vietnamese: 'Biển cả (大海)',
    components: [
      { radical: '氵', meaning: 'Bộ Ba chấm thủy (Nước)', pinyin: 'shuǐ' },
      { radical: '每', meaning: 'Mỗi một / Nơi mẹ hiền', pinyin: 'měi' }
    ],
    story: 'Nước (氵) từ khắp mọi nơi (每) đều đổ về một nơi bao la, tạo nên Biển cả (海).',
    options: ['海', '江', '河', '湖']
  },
  {
    id: 'hp_s3_2',
    stageId: 'puzzle_s3',
    targetHanzi: '炎',
    pinyin: 'yán',
    vietnamese: 'Nóng nực / Viêm (炎热)',
    components: [
      { radical: '火', meaning: 'Bộ Hỏa (Ngọn lửa)', pinyin: 'huǒ' },
      { radical: '火', meaning: 'Bộ Hỏa (Ngọn lửa)', pinyin: 'huǒ' }
    ],
    story: 'Hai ngọn lửa (火) bốc lên ngùn ngụt chồng lên nhau tạo nên sức nóng Nung nấu (炎).',
    options: ['炎', '焚', '热', '烈']
  },
  {
    id: 'hp_s3_3',
    stageId: 'puzzle_s3',
    targetHanzi: '泪',
    pinyin: 'lèi',
    vietnamese: 'Giọt nước mắt (眼泪)',
    components: [
      { radical: '氵', meaning: 'Bộ Thủy (Giọt nước)', pinyin: 'shuǐ' },
      { radical: '目', meaning: 'Bộ Mục (Con mắt)', pinyin: 'mù' }
    ],
    story: 'Nước (氵) trào ra từ đôi mắt (目) chính là Giọt nước mắt (泪).',
    options: ['泪', '沫', '注', '洗']
  },
  {
    id: 'hp_s3_4',
    stageId: 'puzzle_s3',
    targetHanzi: '雷',
    pinyin: 'léi',
    vietnamese: 'Sấm sét (打雷)',
    components: [
      { radical: '雨', meaning: 'Bộ Vũ (Cơn mưa)', pinyin: 'yǔ' },
      { radical: '田', meaning: 'Bộ Điền (Đồng ruộng)', pinyin: 'tián' }
    ],
    story: 'Trong cơn mưa (雨), tiếng vang dội dữ dội trên đồng ruộng (田) chính là tiếng Sấm (雷).',
    options: ['雷', '雪', '露', '霜']
  },
  {
    id: 'hp_s3_5',
    stageId: 'puzzle_s3',
    targetHanzi: '鸣',
    pinyin: 'míng',
    vietnamese: 'Chim hót / Kêu vang (共鸣)',
    components: [
      { radical: '口', meaning: 'Bộ Khẩu (Cái miệng)', pinyin: 'kǒu' },
      { radical: '鸟', meaning: 'Bộ Điểu (Con chim)', pinyin: 'niǎo' }
    ],
    story: 'Miệng (口) của chú chim nhỏ (鸟) cất lên những âm thanh trong trẻo chính là tiếng Hót (鸣).',
    options: ['鸣', '鸭', '鸡', '鹅']
  },

  // MÀN 4: Chiết Tự Tâm Lý & Trái Tim (puzzle_s4)
  {
    id: 'hp_7',
    stageId: 'puzzle_s4',
    targetHanzi: '想',
    pinyin: 'xiǎng',
    vietnamese: 'Suy nghĩ / Tưởng nhớ / Muốn',
    components: [
      { radical: '相', meaning: 'Bộ Tương / Tướng (Hình ảnh)', pinyin: 'xiāng' },
      { radical: '心', meaning: 'Bộ Tâm (Trái tim)', pinyin: 'xīn' }
    ],
    story: 'Hình ảnh (相) đọng lại sâu đậm trong trái tim (心), tạo nên nỗi nhớ và sự suy tưởng (想).',
    options: ['想', '息', '意', '感']
  },
  {
    id: 'hp_s4_1',
    stageId: 'puzzle_s4',
    targetHanzi: '忍',
    pinyin: 'rěn',
    vietnamese: 'Nhẫn nhịn / Kiên nhẫn (忍耐)',
    components: [
      { radical: '刃', meaning: 'Lưỡi dao sắc bén', pinyin: 'rèn' },
      { radical: '心', meaning: 'Bộ Tâm (Trái tim)', pinyin: 'xīn' }
    ],
    story: 'Lưỡi dao nhọn (刃) kề ngay trên trái tim (心) mà lòng vẫn giữ được bình tĩnh chính là sự Nhẫn nhịn (忍).',
    options: ['忍', '念', '忽', '怒']
  },
  {
    id: 'hp_s4_2',
    stageId: 'puzzle_s4',
    targetHanzi: '忠',
    pinyin: 'zhōng',
    vietnamese: 'Trung thành / Trung thực (忠诚)',
    components: [
      { radical: '中', meaning: 'Ngay chính giữa', pinyin: 'zhōng' },
      { radical: '心', meaning: 'Bộ Tâm (Tấm lòng)', pinyin: 'xīn' }
    ],
    story: 'Tấm lòng (心) luôn giữ ở vị trí ngay thẳng chính giữa (中), không thiên lệch chính là lòng Trung thành (忠).',
    options: ['忠', '患', '忘', '志']
  },
  {
    id: 'hp_s4_3',
    stageId: 'puzzle_s4',
    targetHanzi: '愁',
    pinyin: 'chóu',
    vietnamese: 'Nỗi sầu muộn / Buồn bã (忧愁)',
    components: [
      { radical: '秋', meaning: 'Mùa thu heo may', pinyin: 'qiū' },
      { radical: '心', meaning: 'Bộ Tâm (Trái tim)', pinyin: 'xīn' }
    ],
    story: 'Trái tim (心) đón những cơn gió lạnh lùng của mùa thu (秋) gợi lên Nỗi sầu muộn da diết (愁).',
    options: ['愁', '悲', '虑', '忌']
  },
  {
    id: 'hp_s4_4',
    stageId: 'puzzle_s4',
    targetHanzi: '怕',
    pinyin: 'pà',
    vietnamese: 'Sợ hãi / Lo sợ (害怕)',
    components: [
      { radical: '忄', meaning: 'Bộ Tâm đứng (Trái tim)', pinyin: 'xīn' },
      { radical: '白', meaning: 'Màu trắng / Tái mét', pinyin: 'bái' }
    ],
    story: 'Khi trái tim (忄) giật thót khiến mặt cắt không còn giọt máu, tái trắng (白) chính là nỗi Sợ hãi (怕).',
    options: ['怕', '忙', '快', '情']
  },

  // MÀN 5: Chiết Tự Ẩm Thực & Cuộc Sống (puzzle_s5)
  {
    id: 'hp_s5_1',
    stageId: 'puzzle_s5',
    targetHanzi: '饮',
    pinyin: 'yǐn',
    vietnamese: 'Uống nước / Đồ uống (饮料)',
    components: [
      { radical: '饣', meaning: 'Bộ Thực (Ăn uống)', pinyin: 'shí' },
      { radical: '欠', meaning: 'Há to miệng / Thiếu', pinyin: 'qiàn' }
    ],
    story: 'Há to miệng (欠) để tiếp nhận thức uống (饣) chảy vào cổ họng, chính là hành động Uống (饮).',
    options: ['饮', '饭', '饱', '饿']
  },
  {
    id: 'hp_s5_2',
    stageId: 'puzzle_s5',
    targetHanzi: '饱',
    pinyin: 'bǎo',
    vietnamese: 'No nê / Đầy đủ (吃饱)',
    components: [
      { radical: '饣', meaning: 'Bộ Thực (Thức ăn)', pinyin: 'shí' },
      { radical: '包', meaning: 'Bao trọn / Bọc kín', pinyin: 'bāo' }
    ],
    story: 'Thức ăn (饣) đã lấp đầy căng tròn bao tử (包), biểu thị cảm giác No bụng (饱).',
    options: ['饱', '饿', '饺', '饼']
  },
  {
    id: 'hp_s5_3',
    stageId: 'puzzle_s5',
    targetHanzi: '鲜',
    pinyin: 'xiān',
    vietnamese: 'Tươi ngon / Đậm đà (新鲜)',
    components: [
      { radical: '鱼', meaning: 'Bộ Ngư (Con cá dưới nước)', pinyin: 'yú' },
      { radical: '羊', meaning: 'Bộ Dương (Con dê trên núi)', pinyin: 'yáng' }
    ],
    story: 'Vị ngọt thanh của cá tươi (鱼) kết hợp với vị thơm béo của thịt dê (羊) tạo thành hương vị Tươi ngon tuyệt đỉnh (鲜).',
    options: ['鲜', '鲁', '鲤', '美']
  },
  {
    id: 'hp_s5_4',
    stageId: 'puzzle_s5',
    targetHanzi: '甜',
    pinyin: 'tián',
    vietnamese: 'Ngọt ngào (香甜)',
    components: [
      { radical: '舌', meaning: 'Bộ Thiệt (Cái lưỡi)', pinyin: 'shé' },
      { radical: '甘', meaning: 'Bộ Cam (Vị ngọt mật)', pinyin: 'gān' }
    ],
    story: 'Cái lưỡi (舌) nếm được vị cam thảo mật ong ngọt dịu (甘) sinh ra cảm giác Ngọt ngào (甜).',
    options: ['甜', '苦', '辣', '酸']
  },
  {
    id: 'hp_s5_5',
    stageId: 'puzzle_s5',
    targetHanzi: '伴',
    pinyin: 'bàn',
    vietnamese: 'Bạn đồng hành / Bầu bạn (陪伴)',
    components: [
      { radical: '亻', meaning: 'Bộ Nhân đứng (Người)', pinyin: 'rén' },
      { radical: '半', meaning: 'Một nửa', pinyin: 'bàn' }
    ],
    story: 'Một người (亻) luôn kề vai sẻ chia một nửa (半) niềm vui nỗi buồn với ta chính là Bạn đồng hành (伴).',
    options: ['伴', '休', '位', '作']
  }
];

// ============================================================================
// 6. HUY HIỆU THÀNH TỰU GAME (GAME ACHIEVEMENTS)
// ============================================================================
export interface GameAchievement {
  id: string;
  name: string;
  desc: string;
  icon: string;
  xpReward: number;
  diamondReward: number;
}

export const GAME_ACHIEVEMENTS: GameAchievement[] = [
  {
    id: 'ach_memory',
    name: 'Trí Nhớ Siêu Phàm',
    desc: 'Hoàn thành 1 ván Lật thẻ trí nhớ với thời gian dưới 60s',
    icon: '🧠',
    xpReward: 30,
    diamondReward: 10
  },
  {
    id: 'ach_speed',
    name: 'Thần Tốc Bắt Từ',
    desc: 'Đạt chuỗi Combo liên tiếp x5 trong Cơn Lốc Bắt Từ',
    icon: '⚡',
    xpReward: 40,
    diamondReward: 15
  },
  {
    id: 'ach_tone',
    name: 'Đôi Tai Bản Xứ',
    desc: 'Nhận diện đúng 4 thanh điệu liên tiếp không sai câu nào',
    icon: '🎵',
    xpReward: 35,
    diamondReward: 12
  },
  {
    id: 'ach_sentence',
    name: 'Chiến Thần Ngữ Pháp',
    desc: 'Ghép đúng 100% tất cả các câu trong Xếp Câu Thần Tốc',
    icon: '🚀',
    xpReward: 50,
    diamondReward: 20
  },
  {
    id: 'ach_puzzle',
    name: 'Bậc Thầy Chiết Tự',
    desc: 'Giải mã thành công toàn bộ câu đố ghép chữ Hán',
    icon: '🧩',
    xpReward: 45,
    diamondReward: 18
  },
  {
    id: 'ach_stage_conqueror',
    name: 'Đại Hiệp Vượt Ải',
    desc: 'Mở khóa và chinh phục ít nhất 3 màn chơi khác nhau trong đấu trường',
    icon: '🏆',
    xpReward: 60,
    diamondReward: 25
  },
  {
    id: 'ach_garment_master',
    name: 'Bậc Thầy Tiếng Trung Xưởng May',
    desc: 'Chinh phục toàn bộ các màn xưởng may trong Cơn Lốc Bắt Từ và Lật Thẻ',
    icon: '🧵',
    xpReward: 55,
    diamondReward: 22
  }
];
