import { MembershipTier } from "../types";

export interface PricingPlan {
  id: MembershipTier;
  name: string;
  badgeText?: string;
  badgeColor?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  priceFormatted: string;
  priceNumber: number;
  originalPriceFormatted?: string;
  originalPriceNumber?: number;
  periodLabel: string;
  billingDescription: string;
  dailyPriceEquivalent?: string;
  savingsPercent?: number;
  targetAudience: string;
  features: {
    text: string;
    isHighlight?: boolean;
    included: boolean;
  }[];
  aiQuotaLabel: string;
  colorGradient: string;
  accentBorder: string;
  buttonColor: string;
}

export const SUBSCRIPTION_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Miễn Phí (Starter)",
    badgeText: "Cơ bản",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-300",
    priceFormatted: "0 đ",
    priceNumber: 0,
    periodLabel: "Trọn đời",
    billingDescription: "Không yêu cầu thẻ tín dụng, học ngay lập tức",
    targetAudience: "Người mới bắt đầu tìm hiểu tiếng Trung",
    features: [
      { text: "Học trọn vẹn 100% HSK 1 & HSK 2 (Tất cả 30 bài)", included: true, isHighlight: true },
      { text: "Bảng phát âm Pinyin & 214 Bộ thủ đầy đủ", included: true },
      { text: "Học thử 2 bài đầu tiên của HSK 3, 4, 5, 6", included: true },
      { text: "Học thử 2 chủ đề tiếng Trung Ngành May", included: true },
      { text: "5 lượt hỏi Trợ lý Thầy Giáo AI / ngày", included: true },
      { text: "1 đề thi thử Mock Test HSK / tháng", included: true },
      { text: "Tích lũy Kim cương để mở khóa bài học", included: true },
      { text: "Mở khóa toàn bộ 120+ bài HSK 3 - HSK 6", included: false },
      { text: "Trọn bộ chuyên đề May mặc thực chiến", included: false },
      { text: "AI Tutor không giới hạn & Chấm nói 1-1", included: false },
      { text: "Tải bài học & Từ điển Offline", included: false }
    ],
    aiQuotaLabel: "5 lượt / ngày",
    colorGradient: "from-slate-50 to-slate-100/60",
    accentBorder: "border-slate-200",
    buttonColor: "bg-slate-200 text-slate-700 hover:bg-slate-300"
  },
  {
    id: "pro_monthly",
    name: "PRO Tháng (1 Tháng)",
    badgeText: "Linh hoạt",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    priceFormatted: "99.000 đ",
    priceNumber: 99000,
    originalPriceFormatted: "150.000 đ",
    originalPriceNumber: 150000,
    periodLabel: "/ tháng",
    billingDescription: "Thanh toán từng tháng, có thể hủy bất cứ lúc nào",
    dailyPriceEquivalent: "~3.300 đ / ngày",
    savingsPercent: 34,
    targetAudience: "Người muốn ôn thi cấp tốc hoặc trải nghiệm đầy đủ",
    features: [
      { text: "Mở khóa 100% lộ trình HSK 1 - HSK 6 (120+ bài học)", included: true, isHighlight: true },
      { text: "Toàn bộ chuyên ngành May mặc & Phân xưởng", included: true, isHighlight: true },
      { text: "100 lượt Thầy Giáo AI luyện nói & sửa lỗi / ngày", included: true, isHighlight: true },
      { text: "Kho đề thi thử HSK 1-6 không giới hạn", included: true },
      { text: "Báo cáo phân tích yếu điểm & chẩn đoán sai sót", included: true },
      { text: "Luyện phát âm giọng nói chuẩn Bắc Kinh", included: true },
      { text: "Huy hiệu PRO Thành Viên Danh Dự", included: true },
      { text: "Không có quảng cáo & hỗ trợ ưu tiên", included: true }
    ],
    aiQuotaLabel: "100 lượt / ngày",
    colorGradient: "from-blue-50/70 to-indigo-50/70",
    accentBorder: "border-blue-300",
    buttonColor: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
  },
  {
    id: "pro_annual",
    name: "PRO Năm (12 Tháng)",
    isPopular: true,
    isBestValue: true,
    badgeText: "PHỔ BIẾN NHẤT • TIẾT KIỆM 60%",
    badgeColor: "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none shadow-sm",
    priceFormatted: "499.000 đ",
    priceNumber: 499000,
    originalPriceFormatted: "1.188.000 đ",
    originalPriceNumber: 1188000,
    periodLabel: "/ năm",
    billingDescription: "Chỉ ~41.500 đ / tháng (Tiết kiệm 689.000 đ so với mua lẻ)",
    dailyPriceEquivalent: "~1.360 đ / ngày (Bằng 1/10 ly cà phê)",
    savingsPercent: 58,
    targetAudience: "Người học tiếng Trung nghiêm túc, đi làm, du học",
    features: [
      { text: "Toàn bộ quyền lợi của gói PRO", included: true, isHighlight: true },
      { text: "KHÔNG GIỚI HẠN số lượt Trợ lý Thầy Giáo AI 24/7", included: true, isHighlight: true },
      { text: "Mở khóa toàn bộ 6 Cấp độ HSK (1 -> 6) & HSK 7-9 mới", included: true, isHighlight: true },
      { text: "Trọn bộ chuyên đề May mặc thực chiến xưởng may", included: true, isHighlight: true },
      { text: "Tải toàn bộ bài học & từ điển học Ngoại tuyến (Offline)", included: true, isHighlight: true },
      { text: "Tặng trọn bộ Ebook PDF Ngữ pháp & 5.000 Flashcards", included: true },
      { text: "Chứng nhận điện tử hoàn thành khóa học", included: true },
      { text: "Cam kết hoàn tiền trong 7 ngày nếu không hài lòng", included: true }
    ],
    aiQuotaLabel: "Không giới hạn",
    colorGradient: "from-amber-50/80 via-orange-50/50 to-amber-100/40",
    accentBorder: "border-2 border-amber-500 ring-2 ring-amber-400/30",
    buttonColor: "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25"
  },
  {
    id: "lifetime",
    name: "PRO Trọn Đời (Lifetime VIP)",
    badgeText: "VIP VĨNH VIỄN",
    badgeColor: "bg-purple-900 text-amber-300 border border-amber-400/40",
    priceFormatted: "899.000 đ",
    priceNumber: 899000,
    originalPriceFormatted: "2.500.000 đ",
    originalPriceNumber: 2500000,
    periodLabel: "Trọn đời",
    billingDescription: "Thanh toán duy nhất 1 lần – Sử dụng và nâng cấp mãi mãi",
    dailyPriceEquivalent: "Đầu tư một lần dùng trọn đời",
    savingsPercent: 64,
    targetAudience: "Muốn sở hữu vĩnh viễn không bao giờ phải gia hạn",
    features: [
      { text: "Sở hữu vĩnh viễn mọi cấp độ HSK 1 - HSK 6 & HSK 7-9", included: true, isHighlight: true },
      { text: "Mở khóa vĩnh viễn tiếng Trung May mặc & MỌI ngành mới", included: true, isHighlight: true },
      { text: "AI Tutor không giới hạn vĩnh viễn", included: true, isHighlight: true },
      { text: "Toàn bộ tính năng tương lai được tự động cập nhật MIỄN PHÍ", included: true, isHighlight: true },
      { text: "Huy hiệu VIP Kim Cương độc quyền", included: true },
      { text: "Nhóm hỗ trợ học tập riêng với giáo viên bản ngữ", included: true }
    ],
    aiQuotaLabel: "Không giới hạn trọn đời",
    colorGradient: "from-purple-50/80 via-indigo-50/60 to-purple-100/50",
    accentBorder: "border-2 border-purple-400 ring-1 ring-purple-300/40",
    buttonColor: "bg-gradient-to-r from-purple-700 to-indigo-700 text-white hover:from-purple-800 hover:to-indigo-800 shadow-lg shadow-purple-600/25"
  },
  {
    id: "garment_addon",
    name: "Gói Ngành May Mặc (Add-on)",
    badgeText: "CHUYÊN NGÀNH",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    priceFormatted: "199.000 đ",
    priceNumber: 199000,
    originalPriceFormatted: "399.000 đ",
    originalPriceNumber: 399000,
    periodLabel: "Trọn đời",
    billingDescription: "Mở khóa trọn bộ chuyên ngành May mặc vĩnh viễn",
    dailyPriceEquivalent: "Chỉ một lần thanh toán",
    savingsPercent: 50,
    targetAudience: "Kỹ sư, Quản lý đơn hàng Merchandiser, QC & Công nhân may",
    features: [
      { text: "Mở khóa 100% từ vựng chuyên ngành May & Xưởng dệt", included: true, isHighlight: true },
      { text: "20 bài hội thoại thực chiến xử lý sự cố chuyền may", included: true, isHighlight: true },
      { text: "Mẫu câu đàm phán hợp đồng, xuất nhập khẩu phụ liệu", included: true, isHighlight: true },
      { text: "Tra cứu thuật ngữ kỹ thuật may & thông số rập mẫu", included: true },
      { text: "Luyện phát âm chuyên ngành chuẩn xác", included: true }
    ],
    aiQuotaLabel: "Theo gói cơ bản",
    colorGradient: "from-emerald-50/80 to-teal-50/60",
    accentBorder: "border-emerald-300",
    buttonColor: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
  }
];

export const PROMO_CODES: Record<string, { discountPercent: number; description: string; validUntil: string }> = {
  "HELLOCHINA50": { discountPercent: 50, description: "Giảm 50% cho học viên mới mừng ra mắt", validUntil: "2026-12-31" },
  "HSKPRO30": { discountPercent: 30, description: "Giảm 30% cho gói PRO 1 Năm", validUntil: "2026-12-31" },
  "MAYMAC2026": { discountPercent: 40, description: "Giảm 40% cho chuyên ngành May mặc", validUntil: "2026-12-31" },
  "VIPSTUDENT": { discountPercent: 20, description: "Ưu đãi học sinh - sinh viên 20%", validUntil: "2026-12-31" }
};

export const COMPARISON_MATRIX = [
  {
    category: "Lộ trình & Bài học HSK",
    rows: [
      { feature: "Bài học HSK 1 & HSK 2", free: "Toàn bộ (100%)", proMonth: "Toàn bộ (100%)", proYear: "Toàn bộ (100%)", lifetime: "Toàn bộ (100%)" },
      { feature: "Bài học HSK 3 - HSK 6", free: "Học thử 2 bài/cấp", proMonth: "Mở khóa 100%", proYear: "Mở khóa 100%", lifetime: "Mở khóa 100% + HSK 7-9" },
      { feature: "Bộ thủ 214 & Bảng Pinyin", free: "Có", proMonth: "Có", proYear: "Có", lifetime: "Có" },
      { feature: "Chữ viết nét bút thuận Hanzi", free: "Cơ bản", proMonth: "Nâng cao + Phân tích", proYear: "Nâng cao + Phân tích", lifetime: "Nâng cao + Phân tích" }
    ]
  },
  {
    category: "Trí tuệ nhân tạo Thầy Giáo AI",
    rows: [
      { feature: "Luyện phát âm & Chấm điểm nói", free: "5 lượt / ngày", proMonth: "100 lượt / ngày", proYear: "Không giới hạn", lifetime: "Không giới hạn" },
      { feature: "AI Chat đối thoại thời gian thực", free: "5 lượt / ngày", proMonth: "100 lượt / ngày", proYear: "Không giới hạn", lifetime: "Không giới hạn" },
      { feature: "Sửa lỗi ngữ pháp & Viết văn AI", free: "Cơ bản", proMonth: "Chi tiết", proYear: "Chuyên sâu 1-1", lifetime: "Chuyên sâu 1-1" }
    ]
  },
  {
    category: "Chuyên ngành May Mặc & Đi Làm",
    rows: [
      { feature: "Từ vựng May mặc phân xưởng", free: "2 chủ đề cơ bản", proMonth: "Toàn bộ 100%", proYear: "Toàn bộ 100%", lifetime: "Toàn bộ 100%" },
      { feature: "Kịch bản đàm phán & QC may", free: "Khóa", proMonth: "Mở khóa", proYear: "Mở khóa", lifetime: "Mở khóa" },
      { feature: "Tra cứu mẫu rập & thông số kỹ thuật", free: "Xem thử", proMonth: "Đầy đủ", proYear: "Đầy đủ", lifetime: "Đầy đủ" }
    ]
  },
  {
    category: "Tiện ích & Đặc quyền",
    rows: [
      { feature: "Chế độ học Offline (Không cần mạng)", free: "Không", proMonth: "Không", proYear: "Có", lifetime: "Có" },
      { feature: "Kho Đề thi thử Mock Test HSK", free: "1 đề / tháng", proMonth: "Không giới hạn", proYear: "Không giới hạn", lifetime: "Không giới hạn" },
      { feature: "Mở khóa bài bằng Kim Cương (Gems)", free: "Có", proMonth: "Tự động mở", proYear: "Tự động mở", lifetime: "Tự động mở" },
      { feature: "Huy hiệu & Chứng chỉ", free: "Không", proMonth: "Huy hiệu PRO", proYear: "Huy hiệu Vàng + Chứng chỉ", lifetime: "Huy hiệu VIP Kim Cương" }
    ]
  }
];

export const PRICING_FAQS = [
  {
    q: "Tôi có bị tự động trừ tiền khi hết hạn không?",
    a: "Hoàn toàn KHÔNG. Hello China sử dụng hình thức thanh toán chủ động (Chuyển khoản VietQR, Thẻ, Ví điện tử). Chúng tôi không tự ý gia hạn hay trừ tiền trong tài khoản của bạn khi chưa có sự đồng ý."
  },
  {
    q: "Tôi có thể học trên nhiều thiết bị (Điện thoại, Máy tính) không?",
    a: "Có! Bạn chỉ cần đăng nhập bằng tài khoản Google đã nâng cấp, toàn bộ tiến trình học tập và gói cước sẽ tự động đồng bộ thời gian thực trên mọi thiết bị."
  },
  {
    q: "Nếu tôi không có điều kiện nạp tiền, có cách nào học HSK 3-6 không?",
    a: "Được bạn nhé! Hello China tích hợp cơ chế Gamification: Mỗi khi bạn hoàn thành bài học, duy trì chuỗi ngày học Streak hoặc làm bài tập, bạn sẽ nhận được Kim Cương (💎 Gems). Bạn có thể dùng kim cương này để mở khóa bài học nâng cao hoàn toàn miễn phí!"
  },
  {
    q: "Chính sách hoàn tiền của Hello China như thế nào?",
    a: "Chúng tôi cam kết hoàn tiền 100% trong vòng 7 ngày kể từ ngày nâng cấp gói nếu bạn cảm thấy chương trình không phù hợp với mục tiêu học tập của mình mà không cần giải thích lý do."
  }
];
