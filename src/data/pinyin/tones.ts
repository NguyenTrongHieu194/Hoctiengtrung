export interface PinyinToneItem {
  toneNumber: 1 | 2 | 3 | 4 | 0;
  name: string;
  chineseName: string;
  symbol: string;
  pitchContour: string; // 55, 35, 214, 51, nhẹ
  pitchGraph: string; // mô tả cao độ
  vietnameseApproximation: string;
  description: string;
  pronunciationGuide: string;
  vowelExamples: { [vowel: string]: string }; // a: ā, á, ǎ, à
  audioSample: string;
  syllableExamples: {
    hanzi: string;
    pinyin: string;
    meaning: string;
  }[];
}

export const PINYIN_TONES: PinyinToneItem[] = [
  {
    toneNumber: 1,
    name:"Thanh 1 (Âm Bình / Thanh ngang)",
    chineseName:"第一声 (阴平)",
    symbol:"¯ (mā, bā, gāo)",
    pitchContour:"5-5 (Cao - Bằng phẳng)",
    pitchGraph:"Giữ cao độ ở mức 5/5 suốt toàn bộ âm, không lên không xuống",
    vietnameseApproximation:"Giống thanh ngang (không dấu) của tiếng Việt nhưng ĐỌC CAO HƠN và KÉO DÀI ĐỀU",
    description:"Âm bắt đầu ở cao độ tối đa của giọng (mức 5) và giữ nguyên đều suốt quá trình phát âm, kết thúc dứt khoát không rơi.",
    pronunciationGuide:"Hãy tưởng tượng bạn đang hát một nốt nhạc cao và giữ hơi đều, ví dụ như lúc bác sĩ bảo'Aaaa' để khám họng.",
    vowelExamples: { a:"ā", o:"ō", e:"ē", i:"ī", u:"ū", v:"ǖ" },
    audioSample:"妈",
    syllableExamples: [
      { hanzi:"妈", pinyin:"mā", meaning:"Mẹ" },
      { hanzi:"八", pinyin:"bā", meaning:"Số 8" },
      { hanzi:"高", pinyin:"gāo", meaning:"Cao" },
      { hanzi:"飞", pinyin:"fēi", meaning:"Bay" }
    ]
  },
  {
    toneNumber: 2,
    name:"Thanh 2 (Dương Bình / Thanh sắc vút)",
    chineseName:"第二声 (阳平)",
    symbol:"´ (má, bá, guó)",
    pitchContour:"3-5 (Trung bình -> Lên cao)",
    pitchGraph:"Bắt đầu ở mức 3 (tầm giọng bình thường) rồi vút thẳng lên mức 5",
    vietnameseApproximation:"Giống thanh Sắc trong tiếng Việt (như'má','lá') hoặc ngữ điệu hỏi ngạc nhiên'Hả?'",
    description:"Âm điệu bắt đầu ở độ cao trung bình và vút lên cao nhanh chóng, tạo cảm giác như đang hỏi nghi vấn.",
    pronunciationGuide:"Phát âm giống như khi bạn bất ngờ hỏi ai đó'Gì cơ? / Hả? / Thật á?'. Giọng đi vút từ giữa lên đỉnh.",
    vowelExamples: { a:"á", o:"ó", e:"é", i:"í", u:"ú", v:"ǘ" },
    audioSample:"麻",
    syllableExamples: [
      { hanzi:"麻", pinyin:"má", meaning:"Cây gai, tê rần" },
      { hanzi:"国", pinyin:"guó", meaning:"Đất nước" },
      { hanzi:"红", pinyin:"hóng", meaning:"Màu đỏ" },
      { hanzi:"学", pinyin:"xué", meaning:"Học" }
    ]
  },
  {
    toneNumber: 3,
    name:"Thanh 3 (Thượng Thanh / Thanh trầm uốn)",
    chineseName:"第三声 (上声)",
    symbol:"ˇ (mǎ, nǐ, hǎo)",
    pitchContour:"2-1-4 (Hơi thấp -> Xuống đáy -> Lên nhẹ)",
    pitchGraph:"Bắt đầu ở mức 2, nhấn trầm xuống mức 1 (đáy giọng), rồi ngóc lên mức 4",
    vietnameseApproximation:"Gần giống dấu Hỏi kết hợp dấu Nặng trong tiếng Việt (hạ trầm giọng xuống đáy cổ họng rồi nhấc nhẹ lên)",
    description:"Đây là thanh thấp nhất trong tiếng Hán. Trọng tâm là phải hạ giọng xuống thật trầm ở đáy cổ họng.",
    pronunciationGuide:"Khi đứng độc lập: xuống thật sâu rồi ngước nhẹ lên (2-1-4). Khi đứng trước các thanh khác trong câu: chỉ cần đọc nửa đầu thanh 3 (xuống trầm 2-1 rồi nối tiếp từ sau).",
    vowelExamples: { a:"ǎ", o:"ǒ", e:"ě", i:"ǐ", u:"ǔ", v:"ǚ" },
    audioSample:"马",
    syllableExamples: [
      { hanzi:"马", pinyin:"mǎ", meaning:"Con ngựa" },
      { hanzi:"你", pinyin:"nǐ", meaning:"Bạn, anh" },
      { hanzi:"好", pinyin:"hǎo", meaning:"Tốt, đẹp" },
      { hanzi:"买", pinyin:"mǎi", meaning:"Mua" }
    ]
  },
  {
    toneNumber: 4,
    name:"Thanh 4 (Khứ Thanh / Thanh rơi dứt khoát)",
    chineseName:"第四声 (去声)",
    symbol:"` (mà, dà, shì)",
    pitchContour:"5-1 (Đỉnh cao -> Rơi thẳng xuống đáy)",
    pitchGraph:"Từ độ cao tối đa (5) bổ dứt khoát thật mạnh xuống đáy (1)",
    vietnameseApproximation:"Gần giống dấu Huyền + Nặng phát âm CỰC NHANH, DỨT KHOÁT và DỨT HƠI NGAY LẬP TỨC",
    description:"Thanh khó nhất nhưng phổ biến nhất. Xuất phát từ cao độ 5 và rơi thẳng đứng xuống 1 trong thời gian rất ngắn (nhanh gấp đôi các thanh khác).",
    pronunciationGuide:"Giống như tiếng ra lệnh dứt khoát'Đi!','Nào!', hoặc tiếng bổ búa dứt khoát. Tuyệt đối không kéo dài lê thê.",
    vowelExamples: { a:"à", o:"ò", e:"è", i:"ì", u:"ù", v:"ǜ" },
    audioSample:"骂",
    syllableExamples: [
      { hanzi:"骂", pinyin:"mà", meaning:"Mắng chửi" },
      { hanzi:"大", pinyin:"dà", meaning:"To, lớn" },
      { hanzi:"是", pinyin:"shì", meaning:"Là, đúng" },
      { hanzi:"看", pinyin:"kàn", meaning:"Nhìn, xem" }
    ]
  },
  {
    toneNumber: 0,
    name:"Khinh Thanh (Thanh Nhẹ / Thanh Không Dấu)",
    chineseName:"轻声 (轻音)",
    symbol:"Không dấu (ma, de, le, zi)",
    pitchContour:"Nhẹ & Ngắn (phụ thuộc thanh đứng trước)",
    pitchGraph:"Đọc thật nhẹ, ngắn bằng 1/2 âm tiết thông thường",
    vietnameseApproximation:"Đọc như một âm lướt nhẹ, buông lỏng hoàn toàn",
    description:"Âm tiết không mang dấu thanh, thường xuất hiện ở các trợ từ ngữ khí (吗, 的, 了, 呢) hoặc âm tiết thứ hai của từ láy/từ ghép.",
    pronunciationGuide:"Thả lỏng dây thanh âm, đọc lướt qua thật nhanh và nhẹ.",
    vowelExamples: { a:"a", o:"o", e:"e", i:"i", u:"u", v:"ü" },
    audioSample:"妈妈",
    syllableExamples: [
      { hanzi:"妈妈", pinyin:"māma", meaning:"Mẹ (chữ sau đọc nhẹ)" },
      { hanzi:"好吗", pinyin:"hǎo ma", meaning:"Được không?" },
      { hanzi:"吃了", pinyin:"chī le", meaning:"Đã ăn rồi" },
      { hanzi:"椅子", pinyin:"yǐzi", meaning:"Cái ghế" }
    ]
  }
];

export interface ToneRuleItem {
  id: string;
  title: string;
  ruleFormula: string;
  explanation: string;
  practicalTips: string;
  examples: {
    originalHanzi: string;
    originalPinyin: string;
    actualPronunciation: string;
    meaning: string;
    audio: string;
  }[];
}

export const TONE_CHANGE_RULES: ToneRuleItem[] = [
  {
    id:"rule_two_third_tones",
    title:"1. Quy tắc biến điệu hai Thanh 3 (3 + 3 → 2 + 3)",
    ruleFormula:"Thanh 3 + Thanh 3  ➜  Thanh 2 + Thanh 3",
    explanation:"Khi hai âm tiết mang thanh 3 đi liền kề nhau, âm tiết thứ nhất sẽ tự động chuyển thành phát âm như Thanh 2 (dấu sắc), âm tiết thứ hai giữ nguyên Thanh 3. (Lưu ý: Khi viết Pinyin trên sách báo vẫn viết nguyên gốc dấu hỏi, nhưng khi phát âm phải đọc thành dấu sắc).",
    practicalTips:"Nhớ câu kinh điển:'Nǐ hǎo' luôn luôn đọc miệng là'Ní hǎo'.",
    examples: [
      {
        originalHanzi:"你好",
        originalPinyin:"nǐ hǎo",
        actualPronunciation:"ní hǎo",
        meaning:"Xin chào",
        audio:"你好"
      },
      {
        originalHanzi:"可以",
        originalPinyin:"kě yǐ",
        actualPronunciation:"ké yǐ",
        meaning:"Có thể, được",
        audio:"可以"
      },
      {
        originalHanzi:"手表",
        originalPinyin:"shǒu biǎo",
        actualPronunciation:"shóu biǎo",
        meaning:"Đồng hồ đeo tay",
        audio:"手表"
      },
      {
        originalHanzi:"买水",
        originalPinyin:"mǎi shuǐ",
        actualPronunciation:"mái shuǐ",
        meaning:"Mua nước uống",
        audio:"买水"
      }
    ]
  },
  {
    id:"rule_three_third_tones",
    title:"2. Quy tắc biến điệu ba Thanh 3 liên tiếp (3 + 3 + 3)",
    ruleFormula:"3 + 3 + 3  ➜  2 + 2 + 3  (hoặc  3 + 2 + 3)",
    explanation:"Phụ thuộc vào cấu trúc ngữ nghĩa phân tách (2+1 hay 1+2):\n- Cấu trúc [1 + 2]: Đọc thành [Thanh 3 + Thanh 2 + Thanh 3]. Ví dụ: 我 [买酒] ➜ wǒ [mái jiǔ].\n- Cấu trúc [2 + 1]: Đọc thành [Thanh 2 + Thanh 2 + Thanh 3]. Ví dụ: [展览] 馆 ➜ [zhán lán] guǎn.",
    practicalTips:"Cứ gom nhóm 2 từ mang nghĩa đi liền nhau để chuyển từ đầu thành thanh 2.",
    examples: [
      {
        originalHanzi:"我也好",
        originalPinyin:"wǒ yě hǎo",
        actualPronunciation:"wó yé hǎo",
        meaning:"Tôi cũng khỏe / Tôi cũng tốt",
        audio:"我也好"
      },
      {
        originalHanzi:"展览馆",
        originalPinyin:"zhǎn lǎn guǎn",
        actualPronunciation:"zhán lán guǎn",
        meaning:"Nhà triển lãm",
        audio:"展览馆"
      }
    ]
  },
  {
    id:"rule_half_third_tone",
    title:"3. Quy tắc Nửa thanh 3 (Half 3rd Tone)",
    ruleFormula:"Thanh 3 + (Thanh 1 / Thanh 2 / Thanh 4)  ➜  Nửa Thanh 3 (2-1)",
    explanation:"Khi Thanh 3 đứng trước Thanh 1, Thanh 2, Thanh 4 hoặc Khinh thanh, nó chỉ được phát âm phần đi xuống (từ 2 xuống 1 - hạ giọng trầm), KHÔNG ngóc lên (bỏ đoạn 1-4).",
    practicalTips:"Chỉ cần hạ thấp giọng xuống đáy cổ họng rồi nhảy ngay sang từ kế tiếp mà không luyến lên.",
    examples: [
      {
        originalHanzi:"北京",
        originalPinyin:"Běijīng (3 + 1)",
        actualPronunciation:"Běi (hạ trầm) + jīng",
        meaning:"Bắc Kinh",
        audio:"北京"
      },
      {
        originalHanzi:"语言",
        originalPinyin:"yǔyán (3 + 2)",
        actualPronunciation:"yǔ (hạ trầm) + yán",
        meaning:"Ngôn ngữ",
        audio:"语言"
      },
      {
        originalHanzi:"好看",
        originalPinyin:"hǎokàn (3 + 4)",
        actualPronunciation:"hǎo (hạ trầm) + kàn",
        meaning:"Đẹp mắt, ưa nhìn",
        audio:"好看"
      }
    ]
  },
  {
    id:"rule_bu",
    title:"4. Quy tắc biến điệu của chữ 不 (bù)",
    ruleFormula:"不 (bù) + Thanh 4  ➜  bú + Thanh 4\n不 (bù) + Thanh 1/2/3  ➜  giữ nguyên bù",
    explanation:"Bình thường 不 mang thanh 4 (bù). Nhưng khi đứng trước một từ CŨNG mang thanh 4, 不 phải đổi thành Thanh 2 (bú) để tránh việc phát âm liên tiếp hai âm rơi mạnh gây nặng miệng.",
    practicalTips:"Nhớ ví dụ:'Không phải' đọc là'Bú shì', không đọc'Bù shì'.",
    examples: [
      {
        originalHanzi:"不是",
        originalPinyin:"bù + shì (4 + 4)",
        actualPronunciation:"bú shì",
        meaning:"Không phải",
        audio:"不是"
      },
      {
        originalHanzi:"不要",
        originalPinyin:"bù + yào (4 + 4)",
        actualPronunciation:"bú yào",
        meaning:"Không cần / Đừng",
        audio:"不要"
      },
      {
        originalHanzi:"不高",
        originalPinyin:"bù + gāo (4 + 1)",
        actualPronunciation:"bù gāo (giữ nguyên)",
        meaning:"Không cao",
        audio:"不高"
      },
      {
        originalHanzi:"不好",
        originalPinyin:"bù + hǎo (4 + 3)",
        actualPronunciation:"bù hǎo (giữ nguyên)",
        meaning:"Không tốt",
        audio:"不好"
      }
    ]
  },
  {
    id:"rule_yi",
    title:"5. Quy tắc biến điệu của chữ 一 (yī)",
    ruleFormula:"Đếm số/độc lập: yī (Thanh 1)\n一 + Thanh 4: yí (Thanh 2)\n一 + Thanh 1/2/3: yì (Thanh 4)",
    explanation:"- Đứng một mình, đếm số thứ tự hoặc số nhà, số điện thoại: đọc chuẩn Thanh 1 (yī).\n- Đứng trước từ mang Thanh 4: đọc thành Thanh 2 (yí).\n- Đứng trước từ mang Thanh 1, Thanh 2, Thanh 3: đọc thành Thanh 4 (yì).\n- Đứng ở giữa từ lặp (lượng từ): đọc khinh thanh nhẹ (yi).",
    practicalTips:"Ví dụ:'yí ge' (một cái),'yì tiān' (một ngày),'yì qǐ' (cùng nhau),'kàn yi kàn' (xem một chút).",
    examples: [
      {
        originalHanzi:"一个",
        originalPinyin:"yī + gè (1 + 4)",
        actualPronunciation:"yí gè",
        meaning:"Một cái (lượng từ)",
        audio:"一个"
      },
      {
        originalHanzi:"一天",
        originalPinyin:"yī + tiān (1 + 1)",
        actualPronunciation:"yì tiān",
        meaning:"Một ngày",
        audio:"一天"
      },
      {
        originalHanzi:"一起",
        originalPinyin:"yī + qǐ (1 + 3)",
        actualPronunciation:"yì qǐ",
        meaning:"Cùng nhau",
        audio:"一起"
      },
      {
        originalHanzi:"第一",
        originalPinyin:"dì yī",
        actualPronunciation:"dì yī (giữ nguyên thanh 1)",
        meaning:"Thứ nhất",
        audio:"第一"
      }
    ]
  },
  {
    id:"rule_mark_position",
    title:"6. Quy tắc đặt dấu thanh điệu trên nguyên âm (a-o-e-i-u-ü)",
    ruleFormula:"Thứ tự ưu tiên: a > o > e > i > u > ü (riêng iu/ui đặt ở âm cuối)",
    explanation:"Khi viết Pinyin có nhiều nguyên âm đi liền nhau:\n1. Có'a' thì luôn đặt dấu trên'a' (mā, bǎi, piáo).\n2. Không có'a' thì tìm'o' hoặc'e' (dōu, bèi, guǒ).\n3. Nếu gặp'iu' hoặc'ui' (nguyên âm đôi đối xứng), đặt dấu lên NGUYÊN ÂM ĐỨNG SAU CÙNG (liù, guì).\n4. Dấu trên chữ'i' thì bỏ dấu chấm trên đầu (nín, xǐ).",
    practicalTips:"Khẩu quyết:'Có a tìm a, không a tìm o, e; i u đi liền nhau, dấu nằm ở chữ sau'.",
    examples: [
      {
        originalHanzi:"好",
        originalPinyin:"hǎo",
        actualPronunciation:"Dấu trên chữ'a'",
        meaning:"Tốt (h + a + o)",
        audio:"好"
      },
      {
        originalHanzi:"六",
        originalPinyin:"liù",
        actualPronunciation:"Dấu trên chữ'u' (iu nằm sau)",
        meaning:"Số 6",
        audio:"六"
      },
      {
        originalHanzi:"对",
        originalPinyin:"duì",
        actualPronunciation:"Dấu trên chữ'i' (ui nằm sau)",
        meaning:"Đúng",
        audio:"对"
      }
    ]
  }
];
