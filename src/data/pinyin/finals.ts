export interface PinyinFinalItem {
  id: string;
  final: string;
  category: 'single' | 'compound' | 'nasal_front' | 'nasal_back' | 'special';
  categoryName: string;
  vietnameseApproximation: string;
  mouthShapeDescription: string;
  rules?: string;
  audioExample: string;
  exampleWords: {
    hanzi: string;
    pinyin: string;
    vietnamese: string;
  }[];
}

// Bảng 36 Vận Mẫu (Finals) chuẩn Pinyin tiếng Trung, được sắp xếp chuẩn theo thứ tự bảng chữ cái tiếng Việt (A -> E -> I -> O -> U -> Ü)
// Kèm chú thích đối chiếu phát âm chính xác, gần gũi và trực quan nhất với ngữ âm tiếng Việt.
export const PINYIN_FINALS: PinyinFinalItem[] = [
  // ==========================================
  // NHÓM VẬN MẪU BẮT ĐẦU BẰNG "A"
  // ==========================================
  {
    id: "a",
    final: "a",
    category: "single",
    categoryName: "Vận mẫu đơn",
    vietnameseApproximation: "Giống âm 'A' trong tiếng Việt (ba, ca, má, nhà)",
    mouthShapeDescription: "Mở rộng miệng tự nhiên hết cỡ, lưỡi nằm phẳng ở đáy miệng, phát âm to rõ.",
    audioExample: "ā",
    exampleWords: [
      { hanzi: "大", pinyin: "dà", vietnamese: "To, lớn" },
      { hanzi: "拉链", pinyin: "lāliàn", vietnamese: "Khóa kéo" },
      { hanzi: "把", pinyin: "bǎ", vietnamese: "Cầm, nắm (cán)" }
    ]
  },
  {
    id: "ai",
    final: "ai",
    category: "compound",
    categoryName: "Vận mẫu kép",
    vietnameseApproximation: "Giống âm 'Ai' trong tiếng Việt (mai, tai, hai, cái)",
    mouthShapeDescription: "Bắt đầu từ âm /a/ mở rộng miệng rồi trượt mượt mà sang âm /i/ dẹt môi.",
    audioExample: "āi",
    exampleWords: [
      { hanzi: "爱", pinyin: "ài", vietnamese: "Yêu thích" },
      { hanzi: "白", pinyin: "bái", vietnamese: "Màu trắng" },
      { hanzi: "裁剪", pinyin: "cáijiǎn", vietnamese: "Cắt vải may" }
    ]
  },
  {
    id: "an",
    final: "an",
    category: "nasal_front",
    categoryName: "Vận mẫu mũi trước (-n)",
    vietnameseApproximation: "Giống âm 'An' trong tiếng Việt (bàn, lan, can, an toàn)",
    mouthShapeDescription: "Từ /a/ mở rộng rồi áp đầu lưỡi lên lợi trên chặn hơi thoát ra khoang mũi.",
    audioExample: "ān",
    exampleWords: [
      { hanzi: "安", pinyin: "ān", vietnamese: "An toàn" },
      { hanzi: "看", pinyin: "kàn", vietnamese: "Nhìn, xem" },
      { hanzi: "单", pinyin: "dān", vietnamese: "Đơn hàng (Order)" }
    ]
  },
  {
    id: "ang",
    final: "ang",
    category: "nasal_back",
    categoryName: "Vận mẫu mũi sau (-ng)",
    vietnameseApproximation: "Giống âm 'Ang' trong tiếng Việt (sang, làng, vang, vầng sáng)",
    mouthShapeDescription: "Từ /a/ mở rộng, cuống lưỡi nâng lên áp vòm họng mềm ngắt hơi tạo độ vang sâu.",
    audioExample: "āng",
    exampleWords: [
      { hanzi: "帮", pinyin: "bāng", vietnamese: "Giúp đỡ" },
      { hanzi: "忙", pinyin: "máng", vietnamese: "Bận rộn" },
      { hanzi: "样板", pinyin: "yàngbǎn", vietnamese: "Rập mẫu" }
    ]
  },
  {
    id: "ao",
    final: "ao",
    category: "compound",
    categoryName: "Vận mẫu kép",
    vietnameseApproximation: "Giống âm 'Ao' hoặc 'Au' trong tiếng Việt (sao, cao, bao, áo khoác)",
    mouthShapeDescription: "Bắt đầu từ /a/ mở rộng rồi thu tròn môi lại thành /o/.",
    audioExample: "āo",
    exampleWords: [
      { hanzi: "高", pinyin: "gāo", vietnamese: "Cao" },
      { hanzi: "外套", pinyin: "wàitào", vietnamese: "Áo khoác ngoài (Jacket)" },
      { hanzi: "包", pinyin: "bāo", vietnamese: "Túi xách / Gói" }
    ]
  },

  // ==========================================
  // NHÓM VẬN MẪU BẮT ĐẦU BẰNG "E"
  // ==========================================
  {
    id: "e",
    final: "e",
    category: "single",
    categoryName: "Vận mẫu đơn",
    vietnameseApproximation: "Giống âm 'Ưa' hoặc 'Ơ' mở miệng trong tiếng Việt (cưa, vừa, đưa - KHÔNG đọc là 'E' hay 'Ê')",
    mouthShapeDescription: "Khóe miệng kéo sang hai bên như cười nhẹ, lưỡi hơi thụt về sau, phát âm 'ưa'.",
    rules: "Tuyệt đối không đọc là 'E' hoặc 'Ê' của tiếng Việt. Âm này chuẩn là 'ưa' hoặc 'ơ' mở rộng.",
    audioExample: "ē",
    exampleWords: [
      { hanzi: "喝", pinyin: "hē", vietnamese: "Uống" },
      { hanzi: "车间", pinyin: "chējiān", vietnamese: "Nhà xưởng" },
      { hanzi: "格", pinyin: "gé", vietnamese: "Kẻ ô sọc caro" }
    ]
  },
  {
    id: "ei",
    final: "ei",
    category: "compound",
    categoryName: "Vận mẫu kép",
    vietnameseApproximation: "Giống âm 'Êi' hoặc 'Ây' trong tiếng Việt (mây, cây, phê, bầy)",
    mouthShapeDescription: "Bắt đầu từ âm /e/ (ê) rồi trượt nhanh sang âm /i/.",
    audioExample: "ēi",
    exampleWords: [
      { hanzi: "配", pinyin: "pèi", vietnamese: "Phối màu, phối đồ" },
      { hanzi: "杯子", pinyin: "bēizi", vietnamese: "Cái cốc, ly" },
      { hanzi: "黑", pinyin: "hēi", vietnamese: "Màu đen" }
    ]
  },
  {
    id: "en",
    final: "en",
    category: "nasal_front",
    categoryName: "Vận mẫu mũi trước (-n)",
    vietnameseApproximation: "Giống âm 'Ơn' hoặc 'Ân' trong tiếng Việt (cơn, thân, ngân, chân)",
    mouthShapeDescription: "Từ /e/ (ơ) lướt nhẹ rồi nâng đầu lưỡi lên lợi trên ngắt âm mũi.",
    audioExample: "ēn",
    exampleWords: [
      { hanzi: "人", pinyin: "rén", vietnamese: "Con người" },
      { hanzi: "很", pinyin: "hěn", vietnamese: "Rất" },
      { hanzi: "针", pinyin: "zhēn", vietnamese: "Kim may" }
    ]
  },
  {
    id: "eng",
    final: "eng",
    category: "nasal_back",
    categoryName: "Vận mẫu mũi sau (-ng)",
    vietnameseApproximation: "Giống âm 'Âng' trong tiếng Việt (vâng, nâng lên, tầng lầu)",
    mouthShapeDescription: "Từ /e/ lướt nhẹ rồi cuống lưỡi kéo về sau chặn ngắt qua khoang mũi.",
    audioExample: "ēng",
    exampleWords: [
      { hanzi: "冷", pinyin: "lěng", vietnamese: "Lạnh" },
      { hanzi: "车缝", pinyin: "chēféng", vietnamese: "May ráp" },
      { hanzi: "等", pinyin: "děng", vietnamese: "Đợi, chờ" }
    ]
  },
  {
    id: "er",
    final: "er",
    category: "special",
    categoryName: "Vận mẫu đặc biệt (Uốn lưỡi)",
    vietnameseApproximation: "Giống âm 'Ơ' uốn cong đầu lưỡi lên ngạc cứng (như âm '-er' trong 'teacher, water')",
    mouthShapeDescription: "Khi phát âm 'e' (ơ), đồng thời cuộn đầu lưỡi sâu vào trong vòm miệng.",
    rules: "Chỉ đứng độc lập làm từ (như èr = số 2, érzi = con trai) hoặc đứng sau làm âm uốn lưỡi (cuốn lưỡi hóa 儿化).",
    audioExample: "ér",
    exampleWords: [
      { hanzi: "二", pinyin: "èr", vietnamese: "Số 2" },
      { hanzi: "儿子", pinyin: "érzi", vietnamese: "Con trai" },
      { hanzi: "耳环", pinyin: "ěrhuán", vietnamese: "Bông tai" }
    ]
  },

  // ==========================================
  // NHÓM VẬN MẪU BẮT ĐẦU BẰNG "I"
  // ==========================================
  {
    id: "i",
    final: "i",
    category: "single",
    categoryName: "Vận mẫu đơn",
    vietnameseApproximation: "Đa số đọc là 'I'. ĐẶC BIỆT đọc là 'Ư' sau 7 âm [z, c, s, zh, ch, sh, r]",
    mouthShapeDescription: "Khóe miệng kéo dẹt sang hai bên, mặt lưỡi nâng cao áp gần ngạc cứng.",
    rules: "QUY TẮC ĐẶC BIỆT CỦA ÂM 'I': Khi đi sau 7 thanh mẫu [z, c, s, zh, ch, sh, r], chữ 'i' phát âm thành 'Ư' (zī=zư, cī=xư, sī=sư, zhī=trư, chī=chư, shí=sứ, rì=rự). Các trường hợp còn lại đọc chuẩn là 'I' (mǐ, dī, lǐ).",
    audioExample: "yī",
    exampleWords: [
      { hanzi: "一", pinyin: "yī", vietnamese: "Số 1" },
      { hanzi: "米", pinyin: "mǐ", vietnamese: "Gạo / Mét (vải)" },
      { hanzi: "十", pinyin: "shí", vietnamese: "Số 10 (đọc như 'sứ')" }
    ]
  },
  {
    id: "ia",
    final: "ia",
    category: "compound",
    categoryName: "Vận mẫu kép",
    vietnameseApproximation: "Giống âm 'Ia' hoặc 'Ya' trong tiếng Việt (tia, bìa, địa chỉ)",
    mouthShapeDescription: "Bắt đầu từ âm /i/ dẹt miệng rồi mở nhanh sang âm /a/.",
    rules: "Khi đứng độc lập viết thành 'ya'.",
    audioExample: "yā",
    exampleWords: [
      { hanzi: "家", pinyin: "jiā", vietnamese: "Nhà, gia đình" },
      { hanzi: "鸭子", pinyin: "yāzi", vietnamese: "Con vịt" },
      { hanzi: "夹克", pinyin: "jiákè", vietnamese: "Áo jacket da/dù" }
    ]
  },
  {
    id: "ian",
    final: "ian",
    category: "nasal_front",
    categoryName: "Vận mẫu mũi trước (-n)",
    vietnameseApproximation: "Giống âm 'Iên' hoặc 'Yên' trong tiếng Việt (tiền, biển, liên lạc - KHÔNG đọc là 'ian')",
    mouthShapeDescription: "Từ /i/ lướt qua /ê/ rồi chuyển sang /n/ khép đầu lưỡi.",
    rules: "Độc lập viết là 'yan'. Chú ý: Dù viết là 'ian' nhưng phát âm chuẩn luôn là 'IÊN', không được đọc như 'i-an'.",
    audioExample: "yān",
    exampleWords: [
      { hanzi: "见", pinyin: "jiàn", vietnamese: "Gặp, thấy" },
      { hanzi: "线", pinyin: "xiàn", vietnamese: "Sợi chỉ may" },
      { hanzi: "面料", pinyin: "miànliào", vietnamese: "Vải chính (Shell fabric)" }
    ]
  },
  {
    id: "iang",
    final: "iang",
    category: "nasal_back",
    categoryName: "Vận mẫu mũi sau (-ng)",
    vietnameseApproximation: "Giống âm 'Iang' hoặc 'Yang' trong tiếng Việt (lương, giang, xiang)",
    mouthShapeDescription: "Từ /i/ mở nhanh sang /a/ rồi ngắt cuống lưỡi -ng.",
    rules: "Khi đứng độc lập viết thành 'yang'.",
    audioExample: "yāng",
    exampleWords: [
      { hanzi: "羊", pinyin: "yáng", vietnamese: "Con cừu, len lông cừu" },
      { hanzi: "想", pinyin: "xiǎng", vietnamese: "Muốn, nhớ" },
      { hanzi: "亮", pinyin: "liàng", vietnamese: "Sáng bóng" }
    ]
  },
  {
    id: "iao",
    final: "iao",
    category: "compound",
    categoryName: "Vận mẫu kép",
    vietnameseApproximation: "Giống âm 'Iao' hoặc 'Yêu / Eo' trong tiếng Việt (tiêu, chiều, kiệu, miêu)",
    mouthShapeDescription: "Trượt liên hoàn từ /i/ -> /a/ -> /o/.",
    rules: "Khi đứng độc lập viết thành 'yao'.",
    audioExample: "yāo",
    exampleWords: [
      { hanzi: "小", pinyin: "xiǎo", vietnamese: "Nhỏ bé" },
      { hanzi: "票", pinyin: "piào", vietnamese: "Tấm vé, phiếu kho" },
      { hanzi: "条", pinyin: "tiáo", vietnamese: "Sọc dài / Chiếc quần" }
    ]
  },
  {
    id: "ie",
    final: "ie",
    category: "compound",
    categoryName: "Vận mẫu kép",
    vietnameseApproximation: "Giống âm 'Iê' hoặc 'Yê' trong tiếng Việt (tiết, nhiệt, biển, kiểng)",
    mouthShapeDescription: "Bắt đầu từ âm /i/ rồi mở nhẹ sang âm /ê/.",
    rules: "Khi đứng độc lập viết thành 'ye'.",
    audioExample: "yē",
    exampleWords: [
      { hanzi: "鞋子", pinyin: "xiézi", vietnamese: "Đôi giày" },
      { hanzi: "写", pinyin: "xiě", vietnamese: "Viết" },
      { hanzi: "切", pinyin: "qiē", vietnamese: "Cắt, xén mép vải" }
    ]
  },
  {
    id: "in",
    final: "in",
    category: "nasal_front",
    categoryName: "Vận mẫu mũi trước (-n)",
    vietnameseApproximation: "Giống âm 'In' hoặc 'Yin' trong tiếng Việt (tin, xin, pin, mịn màng)",
    mouthShapeDescription: "Khóe miệng dẹt ngang /i/, đầu lưỡi áp lợi trên kết thúc bằng âm 'n'.",
    rules: "Khi đứng độc lập viết là 'yin'.",
    audioExample: "yīn",
    exampleWords: [
      { hanzi: "您", pinyin: "nín", vietnamese: "Ngài / Bạn kính trọng" },
      { hanzi: "音", pinyin: "yīn", vietnamese: "Âm thanh" },
      { hanzi: "印花", pinyin: "yìnhuā", vietnamese: "In bông / In họa tiết vải" }
    ]
  },
  {
    id: "ing",
    final: "ing",
    category: "nasal_back",
    categoryName: "Vận mẫu mũi sau (-ng)",
    vietnameseApproximation: "Giống âm 'Ing' hoặc 'Ynh' trong tiếng Việt (tình, bình, xinh xắn, tính toán)",
    mouthShapeDescription: "Khóe miệng dẹt /i/, cuống lưỡi nâng lên tạo âm ngắt ngân vang.",
    rules: "Khi đứng độc lập viết là 'ying'.",
    audioExample: "yīng",
    exampleWords: [
      { hanzi: "请", pinyin: "qǐng", vietnamese: "Xin, mời" },
      { hanzi: "平车", pinyin: "píngchē", vietnamese: "Máy may 1 kim cơ bản" },
      { hanzi: "定型", pinyin: "dìngxíng", vietnamese: "Định hình form dáng áo" }
    ]
  },
  {
    id: "iong",
    final: "iong",
    category: "nasal_back",
    categoryName: "Vận mẫu mũi sau (-ng)",
    vietnameseApproximation: "Giống âm 'I-ung' hoặc 'Yung' trong tiếng Việt (dẹt miệng /i/ rồi chúm môi tròn 'ung')",
    mouthShapeDescription: "Bắt đầu từ /i/ trượt nhanh sang /ong/ (ung) tròn môi.",
    rules: "Khi đứng độc lập viết là 'yong'.",
    audioExample: "yōng",
    exampleWords: [
      { hanzi: "用", pinyin: "yòng", vietnamese: "Dùng, sử dụng" },
      { hanzi: "兄弟", pinyin: "xiōngdì", vietnamese: "Anh em" },
      { hanzi: "缝纫用线", pinyin: "yòngxiàn", vietnamese: "Chỉ dùng may mặc" }
    ]
  },
  {
    id: "iu",
    final: "iu",
    category: "compound",
    categoryName: "Vận mẫu kép (Viết gọn của iou)",
    vietnameseApproximation: "Giống âm 'Iêu' hoặc 'Yêu' trong tiếng Việt (chiêu, kiểu, yêu, riệu)",
    mouthShapeDescription: "Từ /i/ lướt qua /o/ rồi kết thúc ở /u/ tròn môi.",
    rules: "Khi ghép với thanh mẫu viết gọn là 'iu' (ví dụ: liù, jiǔ). Khi đứng độc lập viết là 'you'.",
    audioExample: "yōu",
    exampleWords: [
      { hanzi: "六", pinyin: "liù", vietnamese: "Số 6" },
      { hanzi: "九", pinyin: "jiǔ", vietnamese: "Số 9" },
      { hanzi: "刺绣", pinyin: "cìxiù", vietnamese: "Thêu hoa văn may mặc" }
    ]
  },

  // ==========================================
  // NHÓM VẬN MẪU BẮT ĐẦU BẰNG "O"
  // ==========================================
  {
    id: "o",
    final: "o",
    category: "single",
    categoryName: "Vận mẫu đơn",
    vietnameseApproximation: "Giống âm 'Ô' hoặc hơi lướt 'Uô' trong tiếng Việt (tròn môi chúm nhẹ)",
    mouthShapeDescription: "Môi tròn lại, lưỡi thụt nhẹ về phía sau vòm họng.",
    rules: "Khi đi sau 4 phụ âm môi [b, p, m, f] phát âm có lướt nhẹ âm u (bō=buô, pō=phuô, mō=muô, fō=phuô).",
    audioExample: "ō",
    exampleWords: [
      { hanzi: "坡", pinyin: "pō", vietnamese: "Con dốc" },
      { hanzi: "摸", pinyin: "mō", vietnamese: "Sờ, chạm vào vải" },
      { hanzi: "佛", pinyin: "fó", vietnamese: "Phật" }
    ]
  },
  {
    id: "ong",
    final: "ong",
    category: "nasal_back",
    categoryName: "Vận mẫu mũi sau (-ng)",
    vietnameseApproximation: "Giống âm 'Ung' trong tiếng Việt (cung, trúng, thùng - KHÔNG đọc là 'ong')",
    mouthShapeDescription: "Tròn môi nhẹ /u/, cuống lưỡi nâng cao ngắt tạo âm 'ung'.",
    audioExample: "ōng",
    exampleWords: [
      { hanzi: "中", pinyin: "zhōng", vietnamese: "Ở giữa, Trung Quốc" },
      { hanzi: "红", pinyin: "hóng", vietnamese: "Màu đỏ" },
      { hanzi: "公分", pinyin: "gōngfēn", vietnamese: "Xăng-ti-mét (cm)" }
    ]
  },
  {
    id: "ou",
    final: "ou",
    category: "compound",
    categoryName: "Vận mẫu kép",
    vietnameseApproximation: "Giống âm 'Âu' trong tiếng Việt (đầu, châu, câu, gấu bông)",
    mouthShapeDescription: "Bắt đầu từ âm /o/ mở nhẹ rồi tròn nhỏ môi thành /u/.",
    audioExample: "ōu",
    exampleWords: [
      { hanzi: "狗", pinyin: "gǒu", vietnamese: "Con chó" },
      { hanzi: "纽扣", pinyin: "niǔkòu", vietnamese: "Nút áo, cúc áo" },
      { hanzi: "头", pinyin: "tóu", vietnamese: "Cái đầu" }
    ]
  },

  // ==========================================
  // NHÓM VẬN MẪU BẮT ĐẦU BẰNG "U"
  // ==========================================
  {
    id: "u",
    final: "u",
    category: "single",
    categoryName: "Vận mẫu đơn",
    vietnameseApproximation: "Giống âm 'U' trong tiếng Việt (thu, ru, cũ, cúc áo)",
    mouthShapeDescription: "Môi chúm tròn và chu ra phía trước tạo thành một lỗ nhỏ tròn.",
    rules: "Khi đứng độc lập viết thành 'wu'.",
    audioExample: "wū",
    exampleWords: [
      { hanzi: "五", pinyin: "wǔ", vietnamese: "Số 5" },
      { hanzi: "布", pinyin: "bù", vietnamese: "Vải" },
      { hanzi: "出库", pinyin: "chūkù", vietnamese: "Xuất kho thành phẩm" }
    ]
  },
  {
    id: "ua",
    final: "ua",
    category: "compound",
    categoryName: "Vận mẫu kép",
    vietnameseApproximation: "Giống âm 'Oa' trong tiếng Việt (hoa, qua, lóa, tòa nhà)",
    mouthShapeDescription: "Từ /u/ tròn môi mở nhanh sang /a/ to miệng.",
    rules: "Khi đứng độc lập viết thành 'wa'.",
    audioExample: "wā",
    exampleWords: [
      { hanzi: "花", pinyin: "huā", vietnamese: "Bông hoa" },
      { hanzi: "画", pinyin: "huà", vietnamese: "Vẽ tranh, vẽ rập" },
      { hanzi: "挂", pinyin: "guà", vietnamese: "Treo móc áo" }
    ]
  },
  {
    id: "uai",
    final: "uai",
    category: "compound",
    categoryName: "Vận mẫu kép",
    vietnameseApproximation: "Giống âm 'Oai' trong tiếng Việt (ngoài, khoai, hoài bão)",
    mouthShapeDescription: "Trượt từ /u/ tròn môi -> /a/ mở to -> /i/ bẹt miệng.",
    rules: "Khi đứng độc lập viết thành 'wai'.",
    audioExample: "wāi",
    exampleWords: [
      { hanzi: "快", pinyin: "kuài", vietnamese: "Nhanh, mau" },
      { hanzi: "外销", pinyin: "wàixiāo", vietnamese: "Xuất khẩu" },
      { hanzi: "坏", pinyin: "huài", vietnamese: "Hỏng, hư lỗi" }
    ]
  },
  {
    id: "uan",
    final: "uan",
    category: "nasal_front",
    categoryName: "Vận mẫu mũi trước (-n)",
    vietnameseApproximation: "Giống âm 'Oan' trong tiếng Việt (toan, ngoan, loan báo, quan sát)",
    mouthShapeDescription: "Từ /u/ tròn môi -> /a/ mở rộng -> /n/ khép đầu lưỡi.",
    rules: "Khi đứng độc lập viết thành 'wan'.",
    audioExample: "wān",
    exampleWords: [
      { hanzi: "关", pinyin: "guān", vietnamese: "Đóng, tắt" },
      { hanzi: "穿", pinyin: "chuān", vietnamese: "Mặc quần áo / Xỏ chỉ" },
      { hanzi: "短", pinyin: "duǎn", vietnamese: "Ngắn" }
    ]
  },
  {
    id: "uang",
    final: "uang",
    category: "nasal_back",
    categoryName: "Vận mẫu mũi sau (-ng)",
    vietnameseApproximation: "Giống âm 'Oang' trong tiếng Việt (hoang, quang, choáng váng)",
    mouthShapeDescription: "Từ /u/ tròn môi -> /a/ mở rộng -> cuống lưỡi ngắt -ng.",
    rules: "Khi đứng độc lập viết thành 'wang'.",
    audioExample: "wāng",
    exampleWords: [
      { hanzi: "黄", pinyin: "huáng", vietnamese: "Màu vàng" },
      { hanzi: "服装", pinyin: "fúzhuāng", vietnamese: "Trang phục quần áo" },
      { hanzi: "双", pinyin: "shuāng", vietnamese: "Đôi, cặp (2 kim)" }
    ]
  },
  {
    id: "ueng",
    final: "ueng",
    category: "nasal_back",
    categoryName: "Vận mẫu mũi sau (-ng)",
    vietnameseApproximation: "Giống âm 'Uâng' trong tiếng Việt (quầng, khuâng khuâng)",
    mouthShapeDescription: "Từ /u/ tròn môi lướt sang /e/ (ơ) rồi ngắt bằng cuống lưỡi -ng.",
    rules: "Không ghép với phụ âm, chỉ đứng độc lập viết thành 'weng'.",
    audioExample: "wēng",
    exampleWords: [
      { hanzi: "翁", pinyin: "wēng", vietnamese: "Ông lão" },
      { hanzi: "瓮", pinyin: "wèng", vietnamese: "Cái vò sành, chum vại" },
      { hanzi: "滃", pinyin: "wěng", vietnamese: "Mây nước bốc mù" }
    ]
  },
  {
    id: "ui",
    final: "ui",
    category: "compound",
    categoryName: "Vận mẫu kép (Viết gọn của uei)",
    vietnameseApproximation: "Giống âm 'Uây' trong tiếng Việt (quây, quẩy, khuấy, tuổi)",
    mouthShapeDescription: "Từ /u/ tròn môi -> lướt qua /e/ -> sang /i/ dẹt miệng.",
    rules: "Khi ghép với phụ âm viết gọn là 'ui' (duì, guì, huí). Khi đứng độc lập viết là 'wei'.",
    audioExample: "wēi",
    exampleWords: [
      { hanzi: "对", pinyin: "duì", vietnamese: "Đúng, đối chiếu" },
      { hanzi: "贵", pinyin: "guì", vietnamese: "Đắt đỏ, quý" },
      { hanzi: "回", pinyin: "huí", vietnamese: "Về, quay lại" }
    ]
  },
  {
    id: "un",
    final: "un",
    category: "nasal_front",
    categoryName: "Vận mẫu mũi trước (Viết gọn của uen)",
    vietnameseApproximation: "Giống âm 'Uân' trong tiếng Việt (chuẩn, xuân, luận văn)",
    mouthShapeDescription: "Từ /u/ tròn môi -> lướt qua /e/ -> kết thúc /n/ chặn lưỡi.",
    rules: "Khi ghép phụ âm viết gọn là 'un' (lùn, chūn, zhǔn). Khi đứng độc lập viết là 'wen'.",
    audioExample: "wēn",
    exampleWords: [
      { hanzi: "问", pinyin: "wèn", vietnamese: "Hỏi" },
      { hanzi: "尺寸", pinyin: "chǐcun", vietnamese: "Thông số kích cỡ" },
      { hanzi: "准", pinyin: "zhǔn", vietnamese: "Chuẩn xác" }
    ]
  },
  {
    id: "uo",
    final: "uo",
    category: "compound",
    categoryName: "Vận mẫu kép",
    vietnameseApproximation: "Giống âm 'Ua' hoặc 'Uô' trong tiếng Việt (qua, mùa, quốc, con cua)",
    mouthShapeDescription: "Từ /u/ tròn môi trượt sang /o/ tròn miệng lớn hơn.",
    rules: "Khi đứng độc lập viết thành 'wo'.",
    audioExample: "wō",
    exampleWords: [
      { hanzi: "我", pinyin: "wǒ", vietnamese: "Tôi, bản thân" },
      { hanzi: "多", pinyin: "duō", vietnamese: "Nhiều" },
      { hanzi: "过", pinyin: "guò", vietnamese: "Qua, từng qua" }
    ]
  },

  // ==========================================
  // NHÓM VẬN MẪU BẮT ĐẦU BẰNG "Ü" (TRÒN MÔI CHẶT)
  // ==========================================
  {
    id: "v",
    final: "ü",
    category: "single",
    categoryName: "Vận mẫu đơn (Tròn môi)",
    vietnameseApproximation: "Giống âm 'Uy' trong tiếng Việt (giữ nguyên khẩu hình 'U' tròn môi chúm chặt, nhưng phát âm 'I')",
    mouthShapeDescription: "Giữ khẩu hình tròn môi chúm chặt như phát âm 'U', nhưng đầu lưỡi chạm răng dưới và phát ra âm 'I'.",
    rules: "Khi kết hợp với j, q, x, y thì bỏ hai dấu chấm trên đầu (ju, qu, xu, yu nhưng vẫn đọc là 'uy'). Khi đi với n, l thì GIỮ NGUYÊN hai chấm (nǚ, lǜ).",
    audioExample: "yū",
    exampleWords: [
      { hanzi: "女", pinyin: "nǚ", vietnamese: "Phụ nữ / Nữ giới" },
      { hanzi: "去", pinyin: "qù", vietnamese: "Đi (phát âm 'khùy')" },
      { hanzi: "绿", pinyin: "lǜ", vietnamese: "Màu xanh lá cây" }
    ]
  },
  {
    id: "van",
    final: "üan",
    category: "nasal_front",
    categoryName: "Vận mẫu mũi trước (Tròn môi)",
    vietnameseApproximation: "Giống âm 'Uyên' trong tiếng Việt (thuyền, khuyên, hoa viên)",
    mouthShapeDescription: "Từ /ü/ tròn môi -> trượt sang /ê/ -> kết thúc /n/.",
    rules: "Sau j, q, x, y viết là 'uan' (juan, quan, xuan, yuan) nhưng vẫn đọc là 'Uyên'.",
    audioExample: "yuān",
    exampleWords: [
      { hanzi: "圆", pinyin: "yuán", vietnamese: "Tròn trịa / Đồng Nhân dân tệ" },
      { hanzi: "全", pinyin: "quán", vietnamese: "Toàn bộ, đầy đủ" },
      { hanzi: "卷尺", pinyin: "juǎnchǐ", vietnamese: "Thước cuộn dây may" }
    ]
  },
  {
    id: "ue",
    final: "üe",
    category: "compound",
    categoryName: "Vận mẫu kép (Tròn môi)",
    vietnameseApproximation: "Giống âm 'Uy-ê' trong tiếng Việt (nguyệt, tuyết, duyệt)",
    mouthShapeDescription: "Bắt đầu từ /ü/ tròn môi rồi mở miệng sang âm /ê/.",
    rules: "Sau j, q, x, y viết thành 'ue' (jue, que, xue, yue). Sau n, l giữ dấu chấm (nüè, lüè).",
    audioExample: "yuē",
    exampleWords: [
      { hanzi: "月", pinyin: "yuè", vietnamese: "Tháng, mặt trăng" },
      { hanzi: "学", pinyin: "xué", vietnamese: "Học tập" },
      { hanzi: "缺", pinyin: "quē", vietnamese: "Thiếu hụt nguyên liệu" }
    ]
  },
  {
    id: "vn",
    final: "ün",
    category: "nasal_front",
    categoryName: "Vận mẫu mũi trước (Tròn môi)",
    vietnameseApproximation: "Giống âm 'Uyn' trong tiếng Việt (quỳnh, huân, tuy-uýt)",
    mouthShapeDescription: "Khẩu hình /ü/ tròn môi rồi đưa đầu lưỡi lên lợi trên chặn âm mũi.",
    rules: "Sau j, q, x, y viết thành 'un' (jun, qun, xun, yun) nhưng vẫn đọc là 'Uyn'.",
    audioExample: "yūn",
    exampleWords: [
      { hanzi: "裙子", pinyin: "qúnzi", vietnamese: "Váy đầm" },
      { hanzi: "云", pinyin: "yún", vietnamese: "Mây" },
      { hanzi: "均", pinyin: "jūn", vietnamese: "Đều đặn, bình quân" }
    ]
  }
];
