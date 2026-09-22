export interface ToneDrillQuestion {
  id: string;
  audioText: string;
  hanziDisplay?: string;
  pinyinPrompt: string; // e.g."b_ng" or audio only
  correctTone: 1 | 2 | 3 | 4;
  options: {
    tone: 1 | 2 | 3 | 4;
    pinyin: string;
    hanzi: string;
    meaning: string;
  }[];
  explanation: string;
}

export interface MinimalPairDrill {
  id: string;
  pairCategory: string; //"b vs p (Bật hơi)","j vs q","zh vs z","an vs ang","u vs ü"...
  description: string;
  tip: string;
  questions: {
    id: string;
    audioText: string; // Word played
    options: {
      pinyin: string;
      hanzi: string;
      meaning: string;
    }[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface ToneSandhiDrill {
  id: string;
  title: string;
  originalText: string;
  pinyinWritten: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  audioSample: string;
}

export interface TongueTwisterItem {
  id: string;
  title: string;
  category: string;
  focusSound: string; //"s & sh","b & p","m & d","h & f"
  level:"Cơ bản" |"Trung cấp" |"Nâng cao";
  hanziLines: string[];
  pinyinLines: string[];
  vietnameseMeaning: string[];
  tips: string;
  audioSpeed: {
    slow: string;
    normal: string;
  };
}

// 1. TONE RECOGNITION DRILLS
export const TONE_DRILLS: ToneDrillQuestion[] = [
  {
    id:"tone_1",
    audioText:"mā",
    pinyinPrompt:"m_ (Âm cao phẳng đều)",
    correctTone: 1,
    options: [
      { tone: 1, pinyin:"mā", hanzi:"妈", meaning:"Mẹ" },
      { tone: 2, pinyin:"má", hanzi:"麻", meaning:"Cây gai / Tê" },
      { tone: 3, pinyin:"mǎ", hanzi:"马", meaning:"Con ngựa" },
      { tone: 4, pinyin:"mà", hanzi:"骂", meaning:"Mắng chửi" }
    ],
    explanation:"Âm phát ra giữ ở cao độ 5-5 bằng phẳng đều đặn, chính là Thanh 1 (mā)."
  },
  {
    id:"tone_2",
    audioText:"hóng",
    pinyinPrompt:"h_ng (Âm đi vút từ giữa lên đỉnh)",
    correctTone: 2,
    options: [
      { tone: 1, pinyin:"hōng", hanzi:"轰", meaning:"Ầm ầm" },
      { tone: 2, pinyin:"hóng", hanzi:"红", meaning:"Màu đỏ" },
      { tone: 3, pinyin:"hǒng", hanzi:"哄", meaning:"Dỗ dành" },
      { tone: 4, pinyin:"hòng", hanzi:"讧", meaning:"Nội loạn" }
    ],
    explanation:"Âm điệu bắt đầu ở tầm trung (3) và vút thẳng lên đỉnh cao (5) tương tự dấu sắc tiếng Việt, là Thanh 2 (hóng)."
  },
  {
    id:"tone_3",
    audioText:"mǎi",
    pinyinPrompt:"m_ (Âm trầm xuống đáy cổ họng rồi nhấc nhẹ)",
    correctTone: 3,
    options: [
      { tone: 1, pinyin:"māi", hanzi:"埋", meaning:"Chôn (âm đọc cổ)" },
      { tone: 2, pinyin:"mái", hanzi:"埋", meaning:"Chôn vùi" },
      { tone: 3, pinyin:"mǎi", hanzi:"买", meaning:"Mua vào" },
      { tone: 4, pinyin:"mài", hanzi:"卖", meaning:"Bán ra" }
    ],
    explanation:"Âm hạ sâu xuống mức 1 rồi lượn nhẹ lên mức 4, đây là đặc trưng của Thanh 3 (mǎi)."
  },
  {
    id:"tone_4",
    audioText:"bù",
    pinyinPrompt:"b_ (Âm rơi từ đỉnh cao xuống đáy dứt khoát)",
    correctTone: 4,
    options: [
      { tone: 1, pinyin:"bū", hanzi:"逋", meaning:"Trốn tránh" },
      { tone: 2, pinyin:"bú", hanzi:"不", meaning:"Không (biến điệu)" },
      { tone: 3, pinyin:"bǔ", hanzi:"补", meaning:"Bổ sung, may vá" },
      { tone: 4, pinyin:"bù", hanzi:"不 / 布", meaning:"Không / Vải may" }
    ],
    explanation:"Âm bổ dứt khoát từ 5 xuống 1 cực nhanh và mạnh, chính là Thanh 4 (bù)."
  },
  {
    id:"tone_5",
    audioText:"fēi",
    pinyinPrompt:"f_ (Âm ngang cao dài)",
    correctTone: 1,
    options: [
      { tone: 1, pinyin:"fēi", hanzi:"飞", meaning:"Bay lượn" },
      { tone: 2, pinyin:"féi", hanzi:"肥", meaning:"Béo, màu mỡ" },
      { tone: 3, pinyin:"fěi", hanzi:"匪", meaning:"Kẻ cướp" },
      { tone: 4, pinyin:"fèi", hanzi:"费", meaning:"Chi phí" }
    ],
    explanation:"Âm'fēi' giữ đều cao độ mức 5, là Thanh 1."
  },
  {
    id:"tone_6",
    audioText:"guó",
    pinyinPrompt:"gu_ (Âm vút lên)",
    correctTone: 2,
    options: [
      { tone: 1, pinyin:"guō", hanzi:"锅", meaning:"Cái nồi" },
      { tone: 2, pinyin:"guó", hanzi:"国", meaning:"Đất nước" },
      { tone: 3, pinyin:"guǒ", hanzi:"果", meaning:"Hoa quả" },
      { tone: 4, pinyin:"guò", hanzi:"过", meaning:"Đã qua" }
    ],
    explanation:"'guó' có cao độ đi lên 3-5, là Thanh 2."
  },
  {
    id:"tone_7",
    audioText:"hǎo",
    pinyinPrompt:"h_ (Âm uốn cong trầm)",
    correctTone: 3,
    options: [
      { tone: 1, pinyin:"hāo", hanzi:"蒿", meaning:"Cây ngải" },
      { tone: 2, pinyin:"háo", hanzi:"毫", meaning:"Lông tơ / Mili" },
      { tone: 3, pinyin:"hǎo", hanzi:"好", meaning:"Tốt, đẹp" },
      { tone: 4, pinyin:"hào", hanzi:"号", meaning:"Số hiệu, ngày" }
    ],
    explanation:"'hǎo' là Thanh 3 (2-1-4) mang âm trầm uốn."
  },
  {
    id:"tone_8",
    audioText:"dà",
    pinyinPrompt:"d_ (Âm rơi sắc lạnh)",
    correctTone: 4,
    options: [
      { tone: 1, pinyin:"dā", hanzi:"搭", meaning:"Dựng lên" },
      { tone: 2, pinyin:"dá", hanzi:"答", meaning:"Trả lời" },
      { tone: 3, pinyin:"dǎ", hanzi:"打", meaning:"Đánh, gõ" },
      { tone: 4, pinyin:"dà", hanzi:"大", meaning:"To, lớn" }
    ],
    explanation:"'dà' rơi thẳng từ cao độ 5 xuống 1, là Thanh 4."
  }
];

// 2. MINIMAL PAIRS DRILLS (CẶP ÂM DỄ NHẦM)
export const MINIMAL_PAIRS_DRILLS: MinimalPairDrill[] = [
  {
    id:"pair_b_p",
    pairCategory:"b vs p (Không bật hơi vs BẬT HƠI)",
    description:"Âm'b' ngậm hai môi nhẹ không bật hơi gió. Âm'p' ép chặt hai môi và BẬT HƠI thật mạnh làm rung tờ giấy.",
    tip:"Đặt bàn tay hoặc tờ giấy trước miệng: phát âm'p' có gió bay mạnh,'b' không có gió.",
    questions: [
      {
        id:"bp_1",
        audioText:"pà",
        options: [
          { pinyin:"bà", hanzi:"爸", meaning:"Bố (Không bật hơi)" },
          { pinyin:"pà", hanzi:"怕", meaning:"Sợ hãi (Bật hơi)" }
        ],
        correctIndex: 1,
        explanation:"Âm nghe được có luồng hơi bung ra mạnh mẽ: là'pà' (怕)."
      },
      {
        id:"bp_2",
        audioText:"bāo",
        options: [
          { pinyin:"bāo", hanzi:"包", meaning:"Túi xách / Gói (Không bật hơi)" },
          { pinyin:"pāo", hanzi:"抛", meaning:"Ném, vứt (Bật hơi)" }
        ],
        correctIndex: 0,
        explanation:"Âm tròn, không có luồng hơi phụt ra: là'bāo' (包)."
      },
      {
        id:"bp_3",
        audioText:"píng",
        options: [
          { pinyin:"bǐng", hanzi:"饼", meaning:"Bánh quy" },
          { pinyin:"píng", hanzi:"平", meaning:"Bằng phẳng / Bình an" }
        ],
        correctIndex: 1,
        explanation:"Âm'píng' bật hơi rõ nét."
      }
    ]
  },
  {
    id:"pair_d_t",
    pairCategory:"d vs t (Âm đầu lưỡi: Không bật hơi vs BẬT HƠI)",
    description:"Âm'd' phát âm như'T' tiếng Việt (tôi, ta - không bật hơi). Âm't' phát âm như'Th' nhưng BẬT HƠI giật mạnh ra ngoài.",
    tip:"Âm't' tống hơi dứt khoát làm tắt ngọn nến hoặc thổi bay khăn giấy.",
    questions: [
      {
        id:"dt_1",
        audioText:"tīng",
        options: [
          { pinyin:"dīng", hanzi:"钉", meaning:"Cây đinh (Không bật hơi)" },
          { pinyin:"tīng", hanzi:"听", meaning:"Lắng nghe (Bật hơi)" }
        ],
        correctIndex: 1,
        explanation:"Âm phát ra luồng hơi'th-' rất rõ: là'tīng' (听)."
      },
      {
        id:"dt_2",
        audioText:"dào",
        options: [
          { pinyin:"dào", hanzi:"到", meaning:"Đến nơi (Không bật hơi)" },
          { pinyin:"tào", hanzi:"套", meaning:"Bộ, bao bọc (Bật hơi)" }
        ],
        correctIndex: 0,
        explanation:"Âm gọn, chặn hơi ở đầu lưỡi rồi thoát ra êm: là'dào' (到)."
      }
    ]
  },
  {
    id:"pair_g_k",
    pairCategory:"g vs k (Âm cuống lưỡi:'C/K' vs'Kh' bật hơi)",
    description:"Âm'g' đọc như'C/K' tiếng Việt (không bật hơi). Âm'k' phát âm từ sâu trong cuống họng và BẬT HƠI mạnh như'Kh' bật gió.",
    tip:"G gặm chặt cuống họng, K tống luồng gió từ cuống họng ra ngoài.",
    questions: [
      {
        id:"gk_1",
        audioText:"kàn",
        options: [
          { pinyin:"gàn", hanzi:"干", meaning:"Làm việc, khô ráo" },
          { pinyin:"kàn", hanzi:"看", meaning:"Xem, nhìn (Bật hơi)" }
        ],
        correctIndex: 1,
        explanation:"Âm có tiếng gió từ cuống họng xộc ra: là'kàn' (看)."
      },
      {
        id:"gk_2",
        audioText:"gāo",
        options: [
          { pinyin:"gāo", hanzi:"高", meaning:"Cao lớn" },
          { pinyin:"kāo", hanzi:"靠", meaning:"Dựa vào (Bật hơi)" }
        ],
        correctIndex: 0,
        explanation:"Âm'gāo' đọc nhẹ như'cao' trong tiếng Việt, không có hơi gió mạnh."
      }
    ]
  },
  {
    id:"pair_j_q_x",
    pairCategory:"j vs q vs x (Âm mặt lưỡi: bẹt môi)",
    description:"Luôn bẹt khóe miệng sang hai bên (như cười).'j' = chi (không bật hơi);'q' = chi (BẬT HƠI CỰC MẠNH);'x' = xi (xì hơi qua khe lưỡi).",
    tip:"Tuyệt đối không tròn môi với j, q, x. Hãy bẹt khóe miệng!",
    questions: [
      {
        id:"jqx_1",
        audioText:"qù",
        options: [
          { pinyin:"jù", hanzi:"句", meaning:"Câu văn (Không bật hơi)" },
          { pinyin:"qù", hanzi:"去", meaning:"Đi (BẬT HƠI)" },
          { pinyin:"xù", hanzi:"序", meaning:"Thứ tự (Ma sát)" }
        ],
        correctIndex: 1,
        explanation:"Âm'qù' bật hơi gió sắc nhọn qua khe răng."
      },
      {
        id:"jqx_2",
        audioText:"xiè",
        options: [
          { pinyin:"jiè", hanzi:"借", meaning:"Mượn" },
          { pinyin:"qiè", hanzi:"切", meaning:"Cắt" },
          { pinyin:"xiè", hanzi:"谢", meaning:"Cảm ơn (Ma sát âm x)" }
        ],
        correctIndex: 2,
        explanation:"Âm'xiè' là âm xát mặt lưỡi êm ái."
      }
    ]
  },
  {
    id:"pair_z_c_s_zh_ch_sh",
    pairCategory:"z, c, s vs zh, ch, sh (Thẳng lưỡi vs UỐN LƯỠI)",
    description:"z, c, s: Đầu lưỡi thẳng áp sát mặt sau răng. zh, ch, sh, r: Đầu lưỡi uốn cong lên ngạc cứng vòm miệng.",
    tip:"Nghe có độ'râm ran vòm họng' là uốn lưỡi (zh/ch/sh). Nghe'xì sắc ở kẽ răng' là thẳng lưỡi (z/c/s).",
    questions: [
      {
        id:"z_zh_1",
        audioText:"zhōng",
        options: [
          { pinyin:"zōng", hanzi:"宗", meaning:"Tông tộc (Thẳng lưỡi)" },
          { pinyin:"zhōng", hanzi:"中", meaning:"Ở giữa / Trung Quốc (Uốn lưỡi)" }
        ],
        correctIndex: 1,
        explanation:"Âm'zhōng' có đầu lưỡi uốn cong vào trong vòm ngạc."
      },
      {
        id:"z_zh_2",
        audioText:"sì",
        options: [
          { pinyin:"sì", hanzi:"四", meaning:"Số 4 (Thẳng lưỡi xì hơi)" },
          { pinyin:"shì", hanzi:"是 / 十", meaning:"Là / Số 10 (Uốn lưỡi)" }
        ],
        correctIndex: 0,
        explanation:"Âm'sì' là âm đầu lưỡi thẳng cắn răng xì nhẹ, không uốn lưỡi."
      },
      {
        id:"z_zh_3",
        audioText:"chī",
        options: [
          { pinyin:"cī", hanzi:"疵", meaning:"Tì vết (Thẳng lưỡi)" },
          { pinyin:"chī", hanzi:"吃", meaning:"Ăn cơm (Uốn lưỡi + BẬT HƠI)" }
        ],
        correctIndex: 1,
        explanation:"Âm'chī' kết hợp cả UỐN LƯỠI và BẬT HƠI mạnh mẽ."
      }
    ]
  },
  {
    id:"pair_an_ang",
    pairCategory:"an vs ang (Vận mẫu mũi trước -n vs Mũi sau -ng)",
    description:"an: Kết thúc bằng cách nâng đầu lưỡi chạm lợi trên chặn hơi. ang: Kết thúc bằng cuống lưỡi nâng cao tạo độ ngân sâu trong vòm họng.",
    tip:"an = kết thúc nông; ang = vang sâu rộng ở khoang miệng sau.",
    questions: [
      {
        id:"an_ang_1",
        audioText:"bāng",
        options: [
          { pinyin:"bān", hanzi:"班", meaning:"Lớp học / Ca làm việc" },
          { pinyin:"bāng", hanzi:"帮", meaning:"Giúp đỡ (Vang mũi sau)" }
        ],
        correctIndex: 1,
        explanation:"Âm kết thúc có độ ngân vang sâu ở cuống họng (-ng): là'bāng'."
      },
      {
        id:"an_ang_2",
        audioText:"kàn",
        options: [
          { pinyin:"kàn", hanzi:"看", meaning:"Xem, nhìn (Mũi trước -n)" },
          { pinyin:"kàng", hanzi:"抗", meaning:"Kháng cự (Mũi sau -ng)" }
        ],
        correctIndex: 0,
        explanation:"Âm chặn nhanh ở đầu lưỡi: là'kàn' (看)."
      }
    ]
  },
  {
    id:"pair_u_v",
    pairCategory:"u vs ü (Tròn môi thông thường vs Tròn môi dẹt lưỡi'Uy')",
    description:"u: Phát âm'U' thông thường. ü: Khẩu hình môi chúm tròn như'U', nhưng đầu lưỡi chạm răng dưới và phát âm ra tiếng'I'.",
    tip:"Giữ chặt môi không nhúc nhích khi chuyển từ U sang Uy.",
    questions: [
      {
        id:"uv_1",
        audioText:"lǜ",
        options: [
          { pinyin:"lù", hanzi:"路", meaning:"Con đường (Âm U)" },
          { pinyin:"lǜ", hanzi:"绿", meaning:"Màu xanh lá (Âm Ü tròn môi)" }
        ],
        correctIndex: 1,
        explanation:"Âm nghe như'lùy' tròn môi: chính là'lǜ' (绿)."
      },
      {
        id:"uv_2",
        audioText:"nǚ",
        options: [
          { pinyin:"nǔ", hanzi:"弩", meaning:"Cây nỏ (Âm U)" },
          { pinyin:"nǚ", hanzi:"女", meaning:"Phụ nữ (Âm Ü tròn môi)" }
        ],
        correctIndex: 1,
        explanation:"Âm'nǚ' là âm tròn môi ü kết hợp thanh 3."
      }
    ]
  }
];

// 3. TONE SANDHI DRILLS (QUY TẮC BIẾN ĐIỆU)
export const TONE_SANDHI_DRILLS: ToneSandhiDrill[] = [
  {
    id:"sandhi_1",
    title:"Hai Thanh 3 đi liền nhau (你好)",
    originalText:"你好",
    pinyinWritten:"nǐ hǎo (3 + 3)",
    question:"Từ'你好' trên thực tế khi nói phải phát âm theo thanh điệu nào?",
    options: ["nǐ hǎo (Giữ nguyên hai thanh 3)","ní hǎo (Thanh 2 + Thanh 3)","nì hǎo (Thanh 4 + Thanh 3)","nī hǎo (Thanh 1 + Thanh 3)"
    ],
    correctAnswer:"ní hǎo (Thanh 2 + Thanh 3)",
    explanation:"Quy tắc 3+3: Thanh 3 thứ nhất biến thành Thanh 2 (sắc), chữ sau giữ nguyên Thanh 3. Đọc là'ní hǎo'.",
    audioSample:"ní hǎo"
  },
  {
    id:"sandhi_2",
    title:"Biến điệu chữ 不 trước thanh 4 (不是)",
    originalText:"不是",
    pinyinWritten:"bù shì (4 + 4)",
    question:"Từ'不是' (không phải) phát âm chuẩn xác là gì?",
    options: ["bù shì (4 + 4)","bú shì (2 + 4)","bǔ shì (3 + 4)","bū shì (1 + 4)"
    ],
    correctAnswer:"bú shì (2 + 4)",
    explanation:"Khi 不 (bù - thanh 4) đứng trước một từ CŨNG mang thanh 4 (shì), 不 bắt buộc đổi thành Thanh 2 (bú). Đọc là'bú shì'.",
    audioSample:"bú shì"
  },
  {
    id:"sandhi_3",
    title:"Chữ 不 trước thanh 1/2/3 (不好)",
    originalText:"不好",
    pinyinWritten:"bù hǎo (4 + 3)",
    question:"Từ'不好' (không tốt) phát âm thanh điệu của chữ 不 như thế nào?",
    options: ["bù hǎo (Giữ nguyên thanh 4)","bú hǎo (Đổi sang thanh 2)","bū hǎo (Đổi sang thanh 1)","bu hǎo (Khinh thanh)"
    ],
    correctAnswer:"bù hǎo (Giữ nguyên thanh 4)",
    explanation:"不 chỉ đổi thành'bú' khi đứng trước thanh 4. Trước thanh 1, 2, 3 nó GIỮ NGUYÊN thanh 4 (bù hǎo, bù gāo, bù lái).",
    audioSample:"bù hǎo"
  },
  {
    id:"sandhi_4",
    title:"Biến điệu chữ 一 trước thanh 4 (一个)",
    originalText:"一个",
    pinyinWritten:"yī gè (1 + 4)",
    question:"Cụm'一个' (một cái) phát âm chữ 一 như thế nào?",
    options: ["yī gè (Giữ nguyên thanh 1)","yí gè (Đổi sang thanh 2)","yì gè (Đổi sang thanh 4)","yǐ gè (Đổi sang thanh 3)"
    ],
    correctAnswer:"yí gè (Đổi sang thanh 2)",
    explanation:"一 (yī) khi đứng trước âm mang Thanh 4 (gè) sẽ đổi thành Thanh 2 (yí). Đọc là'yí gè'.",
    audioSample:"yí gè"
  },
  {
    id:"sandhi_5",
    title:"Biến điệu chữ 一 trước thanh 1 (一天)",
    originalText:"一天",
    pinyinWritten:"yī tiān (1 + 1)",
    question:"Cụm'一天' (một ngày) phát âm chữ 一 như thế nào?",
    options: ["yī tiān (Giữ nguyên thanh 1)","yí tiān (Đổi sang thanh 2)","yì tiān (Đổi sang thanh 4)","yi tiān (Khinh thanh)"
    ],
    correctAnswer:"yì tiān (Đổi sang thanh 4)",
    explanation:"一 (yī) khi đứng trước âm mang Thanh 1, 2, 3 sẽ đổi thành Thanh 4 (yì).'yī + tiān (1)' -> đọc là'yì tiān'.",
    audioSample:"yì tiān"
  }
];

// 4. TONGUE TWISTERS (LÍU LƯỠI LUYỆN KHẨU HÌNH)
export const TONGUE_TWISTERS: TongueTwisterItem[] = [
  {
    id:"twister_s_sh",
    title:"Bốn là bốn, mười là mười (四是四，十是十)",
    category:"Luyện phân biệt s (thẳng lưỡi) & sh (uốn lưỡi)",
    focusSound:"s (răng trước) & sh (uốn lưỡi) & sì / shí",
    level:"Cơ bản",
    hanziLines: ["四是四，十是十，","十四是十四，四十是四十。","谁把十四说四十，就打谁十四；","谁把四十说十四，就打谁四十。"
    ],
    pinyinLines: ["Sì shì sì, shí shì shí,","Shísì shì shísì, sìshí shì sìshí.","Shéi bǎ shísì shuō sìshí, jiù dǎ shéi shísì;","Shéi bǎ sìshí shuō shísì, jiù dǎ shéi sìshí."
    ],
    vietnameseMeaning: ["Bốn là bốn, mười là mười,","Mười bốn là mười bốn, bốn mươi là bốn mươi.","Ai nói mười bốn thành bốn mươi thì đánh mười bốn cái;","Ai nói bốn mươi thành mười bốn thì đánh bốn mươi cái."
    ],
    tips:"Giữ hàm dưới ổn định: khi đọc'sì' (4) thì đầu lưỡi thẳng cắn răng nhẹ; khi đọc'shí' (10) thì cong đầu lưỡi lên ngạc cứng và lên giọng thanh 2.",
    audioSpeed: {
      slow:"四是四，十是十，十四是十四，四十是四十。",
      normal:"四是四，十是十，十四是十四，四十是四十。谁把十四说四十，就打谁十四；谁把四十说十四，就打谁四十。"
    }
  },
  {
    id:"twister_b_p",
    title:"Tám trăm tiêu binh (八百标兵奔北坡)",
    category:"Luyện phân biệt b (ngậm môi) & p (bật hơi)",
    focusSound:"b vs p & bēn / pō / pào",
    level:"Trung cấp",
    hanziLines: ["八百标兵奔北坡，","炮兵并排北边跑。","标兵怕碰炮兵炮，","炮兵碰碰标兵炮。"
    ],
    pinyinLines: ["Bābǎi biāobīng bēn běi pō,","Pàobīng bìngpái běibiān pǎo.","Biāobīng pà pèng pàobīng pào,","Pàobīng pèng pèng biāobīng pào."
    ],
    vietnameseMeaning: ["Tám trăm tiêu binh chạy lên sườn đồi phía bắc,","Pháo binh dàn hàng chạy ở mạn bắc.","Tiêu binh sợ va chạm vào pháo của pháo binh,","Pháo binh lại chạm nhẹ vào pháo của tiêu binh."
    ],
    tips:"Tập trung đẩy hơi mạnh dứt khoát mỗi khi gặp chữ có'p' (pō, pào, pǎo, pà, pèng) và ngậm chặt không thổi hơi khi gặp'b' (bā, bǎi, biāo, bīng, bēn, běi).",
    audioSpeed: {
      slow:"八百标兵奔北坡，炮兵并排北边跑。",
      normal:"八百标兵奔北坡，炮兵并排北边跑。标兵怕碰炮兵炮，炮兵碰碰标兵炮。"
    }
  },
  {
    id:"twister_m_m",
    title:"Mẹ cưỡi ngựa (妈妈骑马，马慢，妈妈骂马)",
    category:"Luyện 4 thanh điệu của âm'ma' (mā, má, mǎ, mà)",
    focusSound:"mā (1), má (2), mǎ (3), mà (4)",
    level:"Cơ bản",
    hanziLines: ["妈妈骑马，","马慢，","妈妈骂马。"
    ],
    pinyinLines: ["Māma qí mǎ,","Mǎ màn,","Māma mà mǎ."
    ],
    vietnameseMeaning: ["Mẹ cưỡi con ngựa,","Con ngựa đi chậm,","Mẹ mắng con ngựa."
    ],
    tips:"Phân biệt rõ: Mẹ (māma - thanh 1 cao đều), Ngựa (mǎ - thanh 3 trầm uốn), Mắng (mà - thanh 4 rơi dứt khoát).",
    audioSpeed: {
      slow:"妈妈骑马，马慢，妈妈骂马。",
      normal:"妈妈骑马，马慢，妈妈骂马。"
    }
  },
  {
    id:"twister_chi_putao",
    title:"Ăn nho không nhả vỏ nho (吃葡萄不吐葡萄皮)",
    category:"Luyện phối hợp môi - răng và biến điệu chữ 不",
    focusSound:"chī / pútao / bù tǔ / bái / pí",
    level:"Nâng cao",
    hanziLines: ["吃葡萄不吐葡萄皮，","不吃葡萄倒吐葡萄皮。"
    ],
    pinyinLines: ["Chī pútáo bù tǔ pútáo pí,","Bù chī pútáo dào tǔ pútáo pí."
    ],
    vietnameseMeaning: ["Ăn nho không nhả vỏ nho,","Không ăn nho lại nhả vỏ nho."
    ],
    tips:"Uốn lưỡi'chī', bật môi'pú', và giữ nhịp thở đều giữa các vế câu đảo ngược.",
    audioSpeed: {
      slow:"吃葡萄不吐葡萄皮，不吃葡萄倒吐葡萄皮。",
      normal:"吃葡萄不吐葡萄皮，不吃葡萄倒吐葡萄皮。"
    }
  }
];
