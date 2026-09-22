import { DeepGrammarPoint, GrammarCategory, HSKLevelId } from "../types";

export const GRAMMAR_CATEGORIES: { id: GrammarCategory; name: string; icon: string; description: string }[] = [
  {
    id: "special_sentences",
    name: "Câu đặc biệt (把, 被, 比, 是...的)",
    icon: "⚡",
    description: "Các mẫu câu tối quan trọng và đặc trưng nhất của ngữ pháp tiếng Trung."
  },
  {
    id: "complements",
    name: "Các loại Bổ ngữ (Kết quả, Khả năng, Xu hướng)",
    icon: "🎯",
    description: "Nắm vững bổ ngữ kết quả, khả năng, xu hướng, trạng thái và thời lượng."
  },
  {
    id: "particles",
    name: "Trợ từ cốt lõi (的, 得, 地, 了, 着, 过)",
    icon: "🧩",
    description: "Phân biệt 3 chữ Đích-Đắc-Địa (的-得-地) và các trợ từ động thái hoàn thành, tiếp diễn."
  },
  {
    id: "basic_sentences",
    name: "Trật tự từ & Cấu trúc câu chuẩn (S+V+O)",
    icon: "📐",
    description: "Quy tắc vàng đặt Định ngữ, Trạng ngữ chỉ thời gian/nơi chốn trước Động từ."
  },
  {
    id: "conjunctions",
    name: "Cặp liên từ & Câu ghép (Mệnh đề)",
    icon: "🔗",
    description: "Cấu trúc 虽然...但是, 因为...所以, 不但...而且, 只要...就, 如果...就."
  },
  {
    id: "adverbs_quantifiers",
    name: "Phó từ & Lượng từ bắt buộc",
    icon: "📊",
    description: "Phân biệt 刚/刚才, 再/又, các giới từ 在/给/向/对/跟 và lượng từ quan trọng."
  },
  {
    id: "garment_factory",
    name: "Ngữ pháp & Mẫu câu Xưởng May",
    icon: "🧵",
    description: "Mẫu câu chỉ thị thông số, báo hỏng máy móc, kiểm định chất lượng và báo cáo tiến độ."
  }
];

export const DEEP_GRAMMAR_POINTS: DeepGrammarPoint[] = [
  // 1. Câu chữ 把 (HSK3)
  {
    id: "g_ba_sentence",
    hskLevel: "HSK3",
    category: "special_sentences",
    categoryName: "Câu đặc biệt",
    title: "Câu chữ 把 (bǎ) - Câu xử lý & làm thay đổi vị trí/trạng thái",
    pinyinTitle: "bǎ zì jù (把字句)",
    shortSummary: "Dùng để nhấn mạnh sự tác động, xử lý của chủ thể lên tân ngữ làm phát sinh kết quả hoặc thay đổi vị trí, trạng thái.",
    formula: [
      "Khẳng định: [Chủ ngữ] + 把 + [Tân ngữ/Đối tượng] + [Động từ] + [Thành phần khác/Bổ ngữ]",
      "Phủ định: [Chủ ngữ] + 没(有) / 别 / 不 + 把 + [Tân ngữ] + [Động từ] + [Thành phần khác]",
      "Nghi vấn: [Chủ ngữ] + 把 + [Tân ngữ] + [Động từ] + [Thành phần khác] + 吗 / 没有？",
      "Động từ năng nguyện (想, 要, 能, 应该...): Đặt TRƯỚC chữ 把!"
    ],
    explanation: [
      "Câu chữ 把 là câu chuyển tân ngữ lên trước động từ nhằm nhấn mạnh kết quả xử lý của động từ tác động lên tân ngữ đó.",
      "BẮT BUỘC: Sau động từ chính phải có THÀNH PHẦN KHÁC (như 了, Bổ ngữ kết quả 好/完/到/在, Bổ ngữ xu hướng 来/去, hoặc lặp lại động từ). Không bao giờ được dùng động từ đứng trơ trọi một mình!",
      "Tân ngữ sau chữ 把 phải là đối tượng đã được xác định cụ thể (người nghe và người nói đều biết), không dùng từ phiếm chỉ chung chung."
    ],
    goldenRules: [
      "Động từ sau chữ 把 phải mang tính hành động xử lý mạnh mẽ (mang lại sự thay đổi). Các động từ tri giác, tâm lý như 有, 在, 是, 喜欢, 认识, 懂 KHÔNG dùng trong câu chữ 把.",
      "Phó từ phủ định (没, 别) và động từ năng nguyện (想, 要, 愿意, 可以...) luôn luôn đứng TRƯỚC chữ 把, tuyệt đối không đứng sau.",
      "Tân ngữ sau 把 phải là danh từ đã xác định (cuốn sách này, bài tập hôm nay, chiếc máy may kia...)."
    ],
    examples: [
      {
        hanzi: "请你把门关上。",
        pinyin: "Qǐng nǐ bǎ mén guān shàng.",
        vietnamese: "Xin bạn hãy đóng cửa lại.",
        highlight: "把门关上",
        analysis: "Chủ ngữ (nǐ) + 把 + Tân ngữ (mén) + Động từ (guān) + Bổ ngữ xu hướng (shàng)."
      },
      {
        hanzi: "我已经把今天的作业做完了。",
        pinyin: "Wǒ yǐjīng bǎ jīntiān de zuòyè zuò wán le.",
        vietnamese: "Tôi đã làm xong bài tập của ngày hôm nay rồi.",
        highlight: "把今天的作业做完了",
        analysis: "Chủ ngữ (wǒ) + 把 + Tân ngữ xác định (jīntiān de zuòyè) + Động từ (zuò) + Bổ ngữ kết quả (wán le)."
      },
      {
        hanzi: "你别把钥匙放在桌子上。",
        pinyin: "Nǐ bié bǎ yàoshi fàng zài zhuōzi shàng.",
        vietnamese: "Bạn đừng để chìa khóa ở trên bàn.",
        highlight: "别把钥匙放在",
        analysis: "Phó từ phủ định (bié) đứng TRƯỚC 把 + Tân ngữ (yàoshi) + Động từ + Kết cấu bổ ngữ (fàng zài zhuōzi shàng)."
      },
      {
        hanzi: "师傅，请把这台平缝机的速度调慢一点。",
        pinyin: "Shīfu, qǐng bǎ zhè tái píngféngjī de sùdù tiáo màn yìdiǎn.",
        vietnamese: "Thầy thợ ơi, xin hãy chỉnh tốc độ của chiếc máy may 1 kim này chậm lại một chút.",
        highlight: "把这台平缝机的速度调慢",
        analysis: "Ứng dụng trong xưởng may: 把 + đối tượng (tốc độ máy) + Động từ (tiáo - chỉnh) + Bổ ngữ kết quả (màn yìdiǎn)."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "我看完了这本书。(Tuy đúng nhưng nếu muốn dùng 把)",
        wrongPinyin: "Wǒ bǎ zhè běn shū kàn.",
        wrongTranslation: "Tôi đọc cuốn sách này.",
        correctHanzi: "我把这本书看完了。",
        correctPinyin: "Wǒ bǎ zhè běn shū kàn wán le.",
        correctTranslation: "Tôi đã đọc xong cuốn sách này rồi.",
        explanation: "Sai vì động từ sau chữ 把 không thể đứng đơn độc. Phải có thành phần bổ ngữ kết quả (kàn wán le)."
      },
      {
        wrongHanzi: "我把作业没做完。",
        wrongPinyin: "Wǒ bǎ zuòyè méi zuò wán.",
        wrongTranslation: "Tôi chưa làm xong bài tập.",
        correctHanzi: "我没把作业做完。",
        correctPinyin: "Wǒ méi bǎ zuòyè zuò wán.",
        correctTranslation: "Tôi chưa làm xong bài tập.",
        explanation: "Phó từ phủ định 没 phải đứng TRƯỚC chữ 把, không được đặt sau 把."
      }
    ],
    quizzes: [
      {
        id: "q_ba_1",
        type: "multiple_choice",
        question: "Chọn câu đúng ngữ pháp nhất:",
        options: [
          "请把这本书看完。",
          "请把这本书看。",
          "请看把这本书完。",
          "这本书请看把我。"
        ],
        correctAnswer: "请把这本书看完。",
        explanation: "Cấu trúc câu chữ 把: S + 把 + O + V + Bổ ngữ (kàn wán)."
      },
      {
        id: "q_ba_2",
        type: "reorder",
        question: "Sắp xếp các từ sau thành câu hoàn chỉnh:",
        pinyinPrompt: "bǎ / xiàngjiāo / qǐng / nǐ / fàng / zài / cāngkù / lǐ",
        words: ["请你", "把", "这包辅料", "放", "在仓库里"],
        correctAnswer: "请你把这包辅料放在仓库里",
        explanation: "Trật tự: S (请你) + 把 + O (这包辅料) + V (放) + Bổ ngữ nơi chốn (在仓库里)."
      }
    ],
    proTips: [
      "Mẹo nhớ nhanh: Cứ nhớ 'Làm gì + Với cái gì + Đến đâu/Như thế nào' -> S + 把 + O + V + Kết quả!",
      "Nhớ kỹ 3 Không của câu chữ 把: 1. Không để động từ đứng trơ trọi; 2. Không để 'Không/Đừng (不/没/别)' sau 把; 3. Không dùng động từ tĩnh (懂, 认识, 喜欢)."
    ]
  },

  // 2. Câu chữ 被 (HSK3-4)
  {
    id: "g_bei_sentence",
    hskLevel: "HSK3",
    category: "special_sentences",
    categoryName: "Câu đặc biệt",
    title: "Câu chữ 被 (bèi) - Câu bị động (Bị / Được)",
    pinyinTitle: "bèi zì jù (被字句)",
    shortSummary: "Biểu thị chủ ngữ chịu sự tác động, chi phối từ một đối tượng khác dẫn đến một kết quả nhất định (thường mang sắc thái tiêu cực hoặc trung tính).",
    formula: [
      "Khẳng định: [Chủ ngữ/Đối tượng chịu tác động] + 被 (叫 / 让) + [Tác nhân thực hiện] + [Động từ] + [Thành phần khác]",
      "Rút gọn: [Chủ ngữ] + 被 + [Động từ] + [Thành phần khác] (Ẩn tác nhân)",
      "Phủ định: [Chủ ngữ] + 没(有) / 别 + 被 + [Tác nhân] + [Động từ] + [Thành phần khác]"
    ],
    explanation: [
      "Câu bị động chữ 被 nhấn mạnh đối tượng bị tác động và kết quả mà đối tượng đó phải gánh chịu.",
      "Trong khẩu ngữ hàng ngày, chữ 被 có thể được thay thế bằng 叫 (jiào) hoặc 让 (ràng). Lưu ý: Sau 叫 và 让 BẮT BUỘC phải có tân ngữ tác nhân, còn sau 被 có thể ẩn tác nhân.",
      "Giống câu chữ 把, sau động từ chính bắt buộc phải có thành phần khác (kết quả, bổ ngữ, 了...)."
    ],
    goldenRules: [
      "Phủ định (没, 不, 别) và động từ năng nguyện (想, 会, 能...) luôn đứng TRƯỚC chữ 被.",
      "Nếu dùng 叫 hoặc 让 để thay 被, phía sau bắt buộc phải nêu rõ ai làm (không được ẩn tác nhân)."
    ],
    examples: [
      {
        hanzi: "我的手机被小偷偷走了。",
        pinyin: "Wǒ de shǒujī bèi xiǎotōu tōu zǒu le.",
        vietnamese: "Điện thoại của tôi bị tên trộm lấy mất rồi.",
        highlight: "被小偷偷走了",
        analysis: "Chủ ngữ (shǒujī) + 被 + Tác nhân (xiǎotōu) + Động từ (tōu) + Bổ ngữ (zǒu le)."
      },
      {
        hanzi: "这批衣服已经被QC检查过了。",
        pinyin: "Zhè pī yīfu yǐjīng bèi QC jiǎnchá guò le.",
        vietnamese: "Lô hàng áo này đã được QC kiểm tra qua rồi.",
        highlight: "被QC检查过了",
        analysis: "Ứng dụng nhà máy: Đối tượng (lô hàng) + 被 + QC + Động từ + Thành phần khác."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "苹果被我吃了完了。",
        wrongPinyin: "Píngguǒ bèi wǒ chī le wán le.",
        wrongTranslation: "Quả táo bị tôi ăn xong rồi.",
        correctHanzi: "苹果被我吃完了。",
        correctPinyin: "Píngguǒ bèi wǒ chī wán le.",
        correctTranslation: "Quả táo đã bị tôi ăn hết rồi.",
        explanation: "Không lặp thừa chữ 了 giữa động từ và bổ ngữ kết quả."
      }
    ],
    quizzes: [
      {
        id: "q_bei_1",
        type: "multiple_choice",
        question: "Điền từ thích hợp: 那个西瓜____弟弟吃完了。",
        options: ["被", "把", "在", "给"],
        correctAnswer: "被",
        explanation: "Quả dưa hấu là đối tượng bị ăn -> dùng câu bị động chữ 被."
      }
    ]
  },

  // 3. Câu so sánh chữ 比 (HSK2-3)
  {
    id: "g_bi_comparison",
    hskLevel: "HSK2",
    category: "special_sentences",
    categoryName: "Câu đặc biệt",
    title: "Câu so sánh hơn chữ 比 (bǐ)",
    pinyinTitle: "bǐ zì jù (比字句)",
    shortSummary: "Dùng để so sánh sự chênh lệch về tính chất, đặc điểm hoặc mức độ giữa 2 đối tượng.",
    formula: [
      "Cơ bản: A + 比 + B + [Tính từ]",
      "Có mức độ chênh lệch cụ thể: A + 比 + B + [Tính từ] + [Số lượng / 一点儿 / 得多 / 多了]",
      "Phủ định so sánh không bằng: A + 没有 + B + (那么 / 这么) + [Tính từ]"
    ],
    explanation: [
      "So sánh hơn dùng 比. So sánh không bằng dùng 没有 (A 没有 B 高 = A không cao bằng B).",
      "QUY TẮC CẤM KỴ: Trong câu so sánh chữ 比, TUYỆT ĐỐI KHÔNG DÙNG các phó từ chỉ mức độ như 很 (rất), 非常 (vô cùng), 太 (quá), 十分.",
      "Nếu muốn biểu thị mức độ chênh lệch nhiều: Dùng 得多 (de duō) hoặc 多了 (duō le) đặt SAU tính từ. Nếu chênh lệch ít: Dùng 一点儿 (yìdiǎnr) hoặc 一些 (yìxiē)."
    ],
    goldenRules: [
      "Cấm kỵ: Tuyệt đối không dùng: A 比 B 很高 (SAI). Phải nói: A 比 B 高 / A 比 B 高得多 (ĐÚNG).",
      "Muốn nói 'càng hơn': Có thể dùng 更 (gèng) hoặc 还 (hái) trước tính từ: A 比 B 还要快 (A còn nhanh hơn cả B)."
    ],
    examples: [
      {
        hanzi: "今天比昨天冷多了。",
        pinyin: "Jīntiān bǐ zuótiān lěng duō le.",
        vietnamese: "Hôm nay lạnh hơn hôm qua nhiều.",
        highlight: "比昨天冷多了",
        analysis: "A (jīntiān) + 比 + B (zuótiān) + Tính từ (lěng) + Mức độ (duō le)."
      },
      {
        hanzi: "他跑得比我快一点儿。",
        pinyin: "Tā pǎo de bǐ wǒ kuài yìdiǎnr.",
        vietnamese: "Anh ấy chạy nhanh hơn tôi một chút.",
        highlight: "比我快一点儿",
        analysis: "Kết hợp bổ ngữ trạng thái + so sánh: V + 得 + 比 + B + Adj + 一点儿."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "他比我很高。(Lỗi kinh điển)",
        wrongPinyin: "Tā bǐ wǒ hěn gāo.",
        wrongTranslation: "Anh ấy cao hơn tôi rất nhiều.",
        correctHanzi: "他比我高得多 / 他比我高多了。",
        correctPinyin: "Tā bǐ wǒ gāo de duō.",
        correctTranslation: "Anh ấy cao hơn tôi rất nhiều.",
        explanation: "Trong câu so sánh 比 không được dùng phó từ 很, mà phải dùng 得多 hoặc 多了 đứng sau tính từ."
      }
    ],
    quizzes: [
      {
        id: "q_bi_1",
        type: "multiple_choice",
        question: "Câu nào sau đây ĐÚNG ngữ pháp?",
        options: [
          "中国比越南很大。",
          "中国比越南大得多。",
          "中国比越南非常大。",
          "中国很大比越南。"
        ],
        correctAnswer: "中国比越南大得多。",
        explanation: "Không dùng 很 hay 非常 trong câu so sánh 比. Dùng 得多 ở cuối câu để chỉ chênh lệch lớn."
      }
    ]
  },

  // 4. Phân biệt 3 chữ 的 - 得 - 地 (HSK2-4)
  {
    id: "g_three_de",
    hskLevel: "HSK3",
    category: "particles",
    categoryName: "Trợ từ cốt lõi",
    title: "Phân biệt toàn diện 3 chữ Đích - Đắc - Địa (的 - 得 - 地)",
    pinyinTitle: "sān gè de (三个 de 的用法)",
    shortSummary: "Ba trợ từ kết cấu cùng đọc là 'de' nhưng giữ chức vụ ngữ pháp hoàn toàn khác nhau trong câu.",
    formula: [
      "1. 的 (Đích): [Định ngữ] + 的 + [Danh từ trung tâm] (Nói về 'Cái gì')",
      "2. 得 (Đắc): [Động từ / Tính từ] + 得 + [Bổ ngữ trạng thái/trình độ] (Nói về 'Làm như thế nào')",
      "3. 地 (Địa): [Tính từ / Trạng ngữ] + 地 + [Động từ chính] (Nói về 'Thực hiện hành động một cách...')"
    ],
    explanation: [
      "1. 的 (Đích - sau nó là DANH TỪ): Dùng để bổ nghĩa cho danh từ, biểu thị sở hữu hoặc tính chất. Ví dụ: 我的书 (Sách của tôi), 漂亮的衣服 (Quần áo đẹp).",
      "2. 得 (Đắc - đứng sau ĐỘNG TỪ/TÍNH TỪ): Dùng để nối động từ với bổ ngữ đánh giá, miêu tả mức độ hoặc kết quả của hành động. Ví dụ: 跑得很快 (Chạy rất nhanh), 累得不行 (Mệt không chịu nổi).",
      "3. 地 (Địa - sau nó là ĐỘNG TỪ): Đứng trước động từ, biểu thị cách thức hoặc tâm trạng khi thực hiện hành động. Ví dụ: 认真地工作 (Làm việc một cách nghiêm túc), 高兴地说 (Vui vẻ nói)."
    ],
    goldenRules: [
      "Mẹo vàng nhớ 3 chữ: Trước DANH TỪ dùng 的; Sau ĐỘNG TỪ dùng 得; Trước ĐỘNG TỪ dùng 地!",
      "Công thức nhẩm: [Tính từ] 的 [Danh từ] | [Động từ] 得 [Trạng thái] | [Tính từ] 地 [Động từ]."
    ],
    examples: [
      {
        hanzi: "可爱的孩子高兴地吃着甜甜的蛋糕，吃得很开心。",
        pinyin: "Kě'ài de háizi gāoxìng de chī zhe tiántián de dàngāo, chī de hěn kāixīn.",
        vietnamese: "Đứa bé đáng yêu vui vẻ ăn chiếc bánh ngọt ngào, ăn rất là vui thích.",
        highlight: "可爱[的]孩子 / 高兴[地]吃 / 甜甜[的]蛋糕 / 吃[得]很开心",
        analysis: "Một câu chứa trọn vẹn cả 3 chữ de giúp bạn hình dung ngay vị trí của từng chữ!"
      },
      {
        hanzi: "工人们认真地缝制每件高质量的衣服，缝得非常仔细。",
        pinyin: "Gōngrénmen rènzhēn de féngzhì měi jiàn gāo zhìliàng de yīfu, féng de fēicháng zǐxì.",
        vietnamese: "Các công nhân cẩn thận may từng chiếc áo chất lượng cao, đường may rất tỉ mỉ.",
        highlight: "认真[地]缝制 / 高质量[的]衣服 / 缝[得]非常仔细",
        analysis: "Ứng dụng xưởng may: 认真地 (trạng ngữ + 地 + ĐT) | 高质量的 (định ngữ + 的 + DT) | 缝得 (ĐT + 得 + Bổ ngữ trạng thái)."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "他跑的大汗淋漓。",
        wrongPinyin: "Tā pǎo de dàhàn línlí.",
        wrongTranslation: "Anh ấy chạy mồ hôi đầm đìa.",
        correctHanzi: "他跑得大汗淋漓。",
        correctPinyin: "Tā pǎo de dàhàn línlí.",
        correctTranslation: "Anh ấy chạy mồ hôi đầm đìa.",
        explanation: "Sau động từ 跑 phải dùng chữ 得 (Đắc), không dùng 的."
      }
    ],
    quizzes: [
      {
        id: "q_de_1",
        type: "fill_blank",
        question: "Điền chữ 'de' thích hợp: 姐姐慢慢____走进了教室。",
        options: ["的", "地", "得"],
        correctAnswer: "地",
        explanation: "Trước động từ 走进 dùng chữ 地 để bổ nghĩa cách thức hành động (đi một cách chậm rãi)."
      }
    ]
  },

  // 5. Bổ ngữ kết quả (HSK2-3)
  {
    id: "g_result_complements",
    hskLevel: "HSK2",
    category: "complements",
    categoryName: "Các loại Bổ ngữ",
    title: "Bổ ngữ kết quả (完, 懂, 见, 到, 好, 错, 清楚...)",
    pinyinTitle: "jiéguǒ bǔyǔ (结果补语)",
    shortSummary: "Đứng ngay sau động từ để biểu thị kết quả do hành động đem lại.",
    formula: [
      "Khẳng định: [Chủ ngữ] + [Động từ] + [Bổ ngữ kết quả (完/懂/见/好/对...)] + (了) + [Tân ngữ]",
      "Phủ định: [Chủ ngữ] + 没(有) + [Động từ] + [Bổ ngữ kết quả] + [Tân ngữ] (TUYỆT ĐỐI không dùng 了!)",
      "Nghi vấn: S + V + Bổ ngữ kết quả + (O) + 了没有 / 了吗？"
    ],
    explanation: [
      "Bổ ngữ kết quả do Tính từ (好, 对, 错, 清楚, 干净...) hoặc Động từ (完, 见, 懂, 到, 开, 走...) đảm nhận.",
      "Đặc điểm: Bổ ngữ kết quả gắn liền NGAY SAU động từ, giữa chúng không được chèn bất kỳ từ nào.",
      "Các từ hay gặp: 听见 (nghe thấy), 看见 (nhìn thấy), 听懂 (nghe hiểu), 做完 (làm xong), 准备好 (chuẩn bị tốt/chuẩn bị xong), 洗干净 (giặt sạch), 穿好 (mặc chỉnh tề)."
    ],
    goldenRules: [
      "Dạng phủ định LUÔN DÙNG 没 / 没有, và khi đã phủ định thì KHÔNG CÒN chữ 了 ở cuối câu nữa! (Ví dụ: 我没听懂, KHÔNG ĐƯỢC NÓI 我没听懂了).",
      "Động từ và bổ ngữ kết quả kết dính thành một khối chặt chẽ, tân ngữ phải đứng sau bổ ngữ kết quả."
    ],
    examples: [
      {
        hanzi: "今天的工作我做完了。",
        pinyin: "Jīntiān de gōngzuò wǒ zuò wán le.",
        vietnamese: "Công việc hôm nay tôi đã làm xong rồi.",
        highlight: "做完了",
        analysis: "Động từ (zuò) + Bổ ngữ kết quả (wán) + 了."
      },
      {
        hanzi: "师傅，这句话我没听懂，请再说一遍。",
        pinyin: "Shīfu, zhè jù huà wǒ méi tīng dǒng, qǐng zài shuō yí biàn.",
        vietnamese: "Thầy ơi, câu này em chưa nghe hiểu, xin thầy nói lại một lần nữa ạ.",
        highlight: "没听懂",
        analysis: "Phủ định (méi) + ĐT (tīng) + Bổ ngữ kết quả (dǒng) - không có 了."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "我没有看懂了这本书。",
        wrongPinyin: "Wǒ méiyǒu kàn dǒng le zhè běn shū.",
        wrongTranslation: "Tôi chưa đọc hiểu cuốn sách này.",
        correctHanzi: "我没有看懂这本书。",
        correctPinyin: "Wǒ méiyǒu kàn dǒng zhè běn shū.",
        correctTranslation: "Tôi chưa đọc hiểu cuốn sách này.",
        explanation: "Câu phủ định của bổ ngữ kết quả dùng 没有 thì BẮT BUỘC bỏ chữ 了."
      }
    ],
    quizzes: [
      {
        id: "q_res_1",
        type: "multiple_choice",
        question: "Chọn câu phủ định ĐÚNG:",
        options: [
          "我没吃完饭。",
          "我没吃完饭了。",
          "我不吃完饭了。",
          "我吃没完饭。"
        ],
        correctAnswer: "我没吃完饭。",
        explanation: "Phủ định bổ ngữ kết quả dùng 没, không có 了."
      }
    ]
  },

  // 6. Bổ ngữ khả năng (HSK3-4)
  {
    id: "g_potential_complements",
    hskLevel: "HSK3",
    category: "complements",
    categoryName: "Các loại Bổ ngữ",
    title: "Bổ ngữ khả năng (V + 得 / 不 + Bổ ngữ)",
    pinyinTitle: "kěnéng bǔyǔ (可能补语)",
    shortSummary: "Biểu thị điều kiện chủ quan hoặc khách quan cho phép (hoặc không cho phép) đạt được kết quả nào đó.",
    formula: [
      "Khẳng định (Làm được): [Động từ] + 得 + [Bổ ngữ kết quả/xu hướng]",
      "Phủ định (Không làm được): [Động từ] + 不 + [Bổ ngữ kết quả/xu hướng]",
      "Nghi vấn chính phản: V + 得 + B + V + 不 + B？ (Ví dụ: 你看得到看不到？)"
    ],
    explanation: [
      "Bổ ngữ khả năng được tạo ra bằng cách chèn chữ 得 (khẳng định) hoặc chữ 不 (phủ định) vào giữa động từ và bổ ngữ kết quả/xu hướng.",
      "Ví dụ điển hình: 看得见 (nhìn thấy được) >< 看不见 (không nhìn thấy được, bị khuất/mắt mờ); 听得懂 (nghe hiểu được) >< 听不懂 (nghe không hiểu); 做得完 (làm xong được) >< 做不完 (nhiều quá không làm xong được).",
      "Các cụm cố định đặc biệt: 吃得消 / 吃不消 (chịu đựng được/không nổi), 睡得着 / 睡不着 (ngủ được/mất ngủ), 买得起 / 买不起 (đủ tiền mua/không có tiền mua), 忘得了 / 忘不了 (quên được/không thể nào quên)."
    ],
    goldenRules: [
      "Phủ định của bổ ngữ khả năng LUÔN DÙNG 不, không bao giờ dùng 没.",
      "Không dùng kèm 不能 / 不可以 khi đã dùng bổ ngữ khả năng phủ định V+不+C (Ví dụ: Không nói '我不能听不懂', chỉ nói '我听不懂')."
    ],
    examples: [
      {
        hanzi: "字太小了，我看不清楚。",
        pinyin: "Zì tài xiǎo le, wǒ kàn bu qīngchu.",
        vietnamese: "Chữ nhỏ quá, tôi nhìn không rõ được.",
        highlight: "看不清楚",
        analysis: "ĐT (kàn) + 不 + Bổ ngữ (qīngchu) biểu thị không đủ khả năng nhìn rõ do khách quan."
      },
      {
        hanzi: "今天下午五点前，你能做得完这批样衣吗？",
        pinyin: "Jīntiān xiàwǔ wǔ diǎn qián, nǐ néng zuò de wán zhè pī yàngyī ma?",
        vietnamese: "Trước 5 giờ chiều nay, bạn có làm xong được lô hàng mẫu này không?",
        highlight: "做得完",
        analysis: "做得完 = Có khả năng làm xong được trong thời gian quy định."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "我没有听得懂。(SAI)",
        wrongPinyin: "Wǒ méiyǒu tīng de dǒng.",
        wrongTranslation: "Tôi không nghe hiểu được.",
        correctHanzi: "我听不懂。",
        correctPinyin: "Wǒ tīng bu dǒng.",
        correctTranslation: "Tôi nghe không hiểu.",
        explanation: "Phủ định của bổ ngữ khả năng chỉ dùng dạng V + 不 + B (听不懂)."
      }
    ],
    quizzes: [
      {
        id: "q_pot_1",
        type: "multiple_choice",
        question: "Cái này đắt quá, tôi không có đủ tiền mua. Nói thế nào?",
        options: [
          "这个太贵了，我买不起。",
          "这个太贵了，我没买起。",
          "这个太贵了，我买不完。",
          "这个太贵了，我不买得起。"
        ],
        correctAnswer: "这个太贵了，我买不起。",
        explanation: "买得起 = Đủ tiền mua | 买不起 = Không đủ khả năng tài chính để mua."
      }
    ]
  },

  // 7. Cấu trúc nhấn mạnh 是...的 (HSK2-3)
  {
    id: "g_shi_de_focus",
    hskLevel: "HSK2",
    category: "special_sentences",
    categoryName: "Câu đặc biệt",
    title: "Cấu trúc nhấn mạnh 是...的 (shì...de)",
    pinyinTitle: "shì...de jiégòu (是...的结构)",
    shortSummary: "Dùng để nhấn mạnh thời gian, địa điểm, cách thức, mục đích hoặc chủ thể của một hành động ĐÃ XẢY RA trong quá khứ.",
    formula: [
      "Khẳng định: [Chủ ngữ] + (是) + [Thành phần cần nhấn mạnh: Thời gian / Địa điểm / Phương tiện / Ai làm] + [Động từ] + 的",
      "Phủ định: [Chủ ngữ] + 不是 + [Thành phần nhấn mạnh] + [Động từ] + 的 (BẮT BUỘC có 不是!)"
    ],
    explanation: [
      "Điều kiện tiên quyết: Hành động này ĐÃ BIẾT RÕ LÀ ĐÃ XẢY RA, người nói không hỏi việc đó có xảy ra không mà chỉ muốn nhấn mạnh chi tiết (Khi nào? Ở đâu? Đến bằng gì? Ai làm?).",
      "Trong câu khẳng định, chữ 是 có thể lược bỏ, nhưng chữ 的 ở cuối câu BẮT BUỘC phải giữ lại.",
      "Trong câu phủ định, chữ 不是 BẮT BUỘC phải có."
    ],
    goldenRules: [
      "Không dùng để diễn tả hành động chưa xảy ra trong tương lai.",
      "Khi có tân ngữ, chữ 的 có thể đặt sau động từ hoặc đặt ở cuối câu: 我是在北京买的书 / 我是在北京买书的."
    ],
    examples: [
      {
        hanzi: "我是坐飞机来北京的。",
        pinyin: "Wǒ shì zuò fēijī lái Běijīng de.",
        vietnamese: "Tôi đến Bắc Kinh bằng máy bay đấy. (Nhấn mạnh phương tiện đi lại)",
        highlight: "是坐飞机来...的",
        analysis: "Nhấn mạnh phương tiện (zuò fēijī) của hành động đã hoàn thành (đến Bắc Kinh)."
      },
      {
        hanzi: "这件衣服不是在网上买的，是在商场买的。",
        pinyin: "Zhè jiàn yīfu bú shì zài wǎngshàng mǎi de, shì zài shāngchǎng mǎi de.",
        vietnamese: "Chiếc áo này không phải mua trên mạng, mà là mua ở trung tâm thương mại.",
        highlight: "不是在网上买的，是在商场买的",
        analysis: "Nhấn mạnh địa điểm mua hàng."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "我没是在中国学的汉语。",
        wrongPinyin: "Wǒ méi shì zài Zhōngguó xué de Hànyǔ.",
        wrongTranslation: "Tôi không phải học tiếng Trung ở Trung Quốc.",
        correctHanzi: "我不是在中国学的汉语。",
        correctPinyin: "Wǒ bú shì zài Zhōngguó xué de Hànyǔ.",
        correctTranslation: "Tôi không phải học tiếng Trung ở Trung Quốc.",
        explanation: "Phủ định của cấu trúc 是...的 bắt buộc dùng 不是, không dùng 没."
      }
    ],
    quizzes: [
      {
        id: "q_shide_1",
        type: "multiple_choice",
        question: "Điền vào chỗ trống: 你是几点____？",
        options: ["来的", "来吗", "了", "来着"],
        correctAnswer: "来的",
        explanation: "Câu hỏi nhấn mạnh thời gian đã xảy ra: 你是几点来的？ (Bạn đến lúc mấy giờ thế?)"
      }
    ]
  },

  // 8. Trật tự từ chuẩn trong câu tiếng Trung (S + Time + Place + V + O)
  {
    id: "g_word_order",
    hskLevel: "HSK1",
    category: "basic_sentences",
    categoryName: "Trật tự từ & Cấu trúc câu",
    title: "Quy tắc vàng về Trật tự từ trong câu tiếng Trung",
    pinyinTitle: "Hànyǔ jùzi yǔxù (汉语句子语序)",
    shortSummary: "Khác với tiếng Việt hay tiếng Anh, trong tiếng Trung: Trạng ngữ chỉ Thời gian & Nơi chốn luôn đứng TRƯỚC Động từ!",
    formula: [
      "Công thức vàng: [Chủ ngữ (Ai)] + [Thời gian (Khi nào)] + [Địa điểm: 在 + Nơi chốn (Ở đâu)] + [Phương thức/Cách thức/Cùng ai (Làm với ai, bằng gì)] + [Động từ chính (Làm gì)] + [Tân ngữ] + [Bổ ngữ/Thành phần phụ]"
    ],
    explanation: [
      "1. Thời gian: Có thể đứng trước hoặc ngay sau Chủ ngữ, nhưng TUYỆT ĐỐI PHẢI ĐỨNG TRƯỚC ĐỘNG TỪ. (Ví dụ: 我晚上去 / 晚上我去).",
      "2. Địa điểm (在 + Nơi chốn): Luôn làm cái 'phông nền' xảy ra hành động trước, nên phải nói 'Ở đâu' rồi mới đến 'Làm gì' (在学校学习, 在家吃饭).",
      "3. Định ngữ bổ nghĩa cho danh từ: Luôn đứng TRƯỚC danh từ (tiếng Việt nói 'Áo đẹp' -> tiếng Trung phải nói 'Đẹp đích Áo' = 漂亮的衣服)."
    ],
    goldenRules: [
      "Ghi nhớ thần chú: TIẾNG TRUNG NÓI 'Ở ĐÂU' RỒI MỚI 'LÀM GÌ'! Không nói: 我学习在学校 (SAI) -> Phải nói: 我在学校学习 (ĐÚNG).",
      "Quy tắc thời gian lớn trước, nhỏ sau: Năm -> Tháng -> Ngày -> Buổi -> Giờ."
    ],
    examples: [
      {
        hanzi: "我们明天上午在三楼会议室开会。",
        pinyin: "Wǒmen míngtiān shàngwǔ zài sān lóu huìyìshì kāihuì.",
        vietnamese: "Chúng tôi sáng mai họp ở phòng họp tầng 3.",
        highlight: "明天上午 (Thời gian) + 在三楼会议室 (Địa điểm) + 开会 (Động từ)",
        analysis: "Chủ ngữ (wǒmen) + Thời gian (míngtiān shàngwǔ) + Nơi chốn (zài sān lóu huìyìshì) + Động từ (kāihuì)."
      },
      {
        hanzi: "李师傅今天下午在车间教新工人调试机器。",
        pinyin: "Lǐ shīfu jīntiān xiàwǔ zài chējiān jiāo xīn gōngrén tiáoshì jīqì.",
        vietnamese: "Thầy Lý chiều nay ở phân xưởng dạy công nhân mới căn chỉnh máy móc.",
        highlight: "今天下午 (Thời gian) + 在车间 (Địa điểm) + 教 (Động từ)",
        analysis: "Ứng dụng nhà xưởng tuân thủ chuẩn trật tự ngữ pháp."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "我吃饭在食堂。(Lỗi tư duy tiếng Việt)",
        wrongPinyin: "Wǒ chīfàn zài shítáng.",
        wrongTranslation: "Tôi ăn cơm ở nhà ăn.",
        correctHanzi: "我在食堂吃饭。",
        correctPinyin: "Wǒ zài shítáng chīfàn.",
        correctTranslation: "Tôi ăn cơm ở căng tin / nhà ăn.",
        explanation: "Địa điểm '在 + nơi chốn' bắt buộc phải đứng trước động từ 吃饭."
      }
    ],
    quizzes: [
      {
        id: "q_order_1",
        type: "reorder",
        question: "Sắp xếp các từ thành câu đúng trật tự:",
        pinyinPrompt: "míngtiān / zài / wǒ / túshūguǎn / kàn shū",
        words: ["我", "明天", "在图书馆", "看书"],
        correctAnswer: "我明天在图书馆看书",
        explanation: "Trật tự chuẩn: S (我) + Time (明天) + Place (在图书馆) + Verb (看书)."
      }
    ]
  },

  // 9. Cấu trúc 一...就... (HSK3)
  {
    id: "g_yi_jiu_pattern",
    hskLevel: "HSK3",
    category: "conjunctions",
    categoryName: "Cặp liên từ & Mệnh đề",
    title: "Cấu trúc 一...就... (yī...jiù...) - Hễ... là... / Vừa... liền...",
    pinyinTitle: "yī...jiù... jiégòu (一...就...结构)",
    shortSummary: "Biểu thị 2 hành động diễn ra liên tiếp nối tiếp nhau trong nháy mắt, hoặc biểu thị quan hệ điều kiện nguyên nhân - kết quả.",
    formula: [
      "1. Hai hành động liên tiếp: [Chủ ngữ] + 一 + [Động từ 1] + 就 + [Động từ 2]",
      "2. Hai chủ ngữ khác nhau: [Chủ ngữ 1] + 一 + [Động từ 1], [Chủ ngữ 2] + 就 + [Động từ 2]"
    ],
    explanation: [
      "1. Biểu thị thời gian nối tiếp: Hành động 2 xảy ra ngay lập tức sau khi hành động 1 kết thúc (Ví dụ: 他一进门就打开了灯 - Anh ấy vừa bước vào cửa là bật đèn ngay).",
      "2. Biểu thị điều kiện quy luật: Hễ cứ xảy ra tình huống A thì chắc chắn dẫn đến tình huống B (Ví dụ: 我一喝咖啡就睡不着 - Tôi cứ hễ uống cà phê là không ngủ được)."
    ],
    goldenRules: [
      "Nếu cùng 1 chủ ngữ: S + 一 + V1 + 就 + V2.",
      "Nếu khác chủ ngữ: S1 + 一 + V1, S2 + 就 + V2."
    ],
    examples: [
      {
        hanzi: "下班后我一回到家就洗澡。",
        pinyin: "Xiàbān hòu wǒ yī huí dào jiā jiù xǐzǎo.",
        vietnamese: "Sau khi tan ca, tôi vừa về đến nhà là đi tắm ngay.",
        highlight: "一回到家就洗澡",
        analysis: "Hành động về nhà vừa dứt thì hành động tắm diễn ra ngay lập tức."
      },
      {
        hanzi: "这台缝纫机一开机就有异常响声。",
        pinyin: "Zhè tái féngrènjī yī kāijī jiù yǒu yìcháng xiǎngshēng.",
        vietnamese: "Chiếc máy may này cứ hễ bật máy lên là có tiếng kêu bất thường.",
        highlight: "一开机就有",
        analysis: "Ứng dụng nhà xưởng: Cứ hễ bật nguồn là phát sinh lỗi."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "我一回家，然后我做饭。",
        wrongPinyin: "Wǒ yī huí jiā, ránhòu wǒ zuò fàn.",
        wrongTranslation: "Tôi vừa về nhà, sau đó tôi nấu cơm.",
        correctHanzi: "我一回家就做饭。",
        correctPinyin: "Wǒ yī huí jiā jiù zuò fàn.",
        correctTranslation: "Tôi vừa về đến nhà là nấu cơm ngay.",
        explanation: "Cặp cấu trúc cố định là 一... đi liền với 就, không dùng 然後."
      }
    ],
    quizzes: [
      {
        id: "q_yijiu_1",
        type: "fill_blank",
        question: "Điền liên từ thích hợp: 老师____走进教室，大家____安静下来了。",
        options: ["一...就...", "因为...所以...", "虽然...但是..."],
        correctAnswer: "一...就...",
        explanation: "Thầy giáo vừa bước vào lớp, mọi người liền yên lặng ngay -> 一...就..."
      }
    ]
  },

  // 10. Phân biệt 刚 (gāng) và 刚才 (gāngcái) (HSK3)
  {
    id: "g_gang_gangcai",
    hskLevel: "HSK3",
    category: "adverbs_quantifiers",
    categoryName: "Phó từ & Lượng từ",
    title: "Phân biệt toàn diện 刚 (gāng) và 刚才 (gāngcái)",
    pinyinTitle: "qūfēn gāng yǔ gāngcái (区分 刚 与 刚才)",
    shortSummary: "Đều dịch là 'Vừa mới', nhưng 刚 là Phó từ chỉ thời gian gần theo cảm nhận, còn 刚才 là Danh từ chỉ thời gian khách quan.",
    formula: [
      "1. 刚 (Phó từ): Đứng SAU Chủ ngữ & TRƯỚC Động từ: [Chủ ngữ] + 刚 + [Động từ] (Có thể dùng cho thời gian dài như 刚来中国半年).",
      "2. 刚才 (Danh từ thời gian): Có thể đứng TRƯỚC hoặc SAU Chủ ngữ: [刚才] + [Chủ ngữ] + [Động từ] HOẶC [Chủ ngữ] + [刚才] + [Động từ] (Chỉ dùng cho khoảng thời gian ngắn vài phút vừa trôi qua)."
    ],
    explanation: [
      "1. 刚才 (Vừa nãy): Là mốc thời gian khách quan trong quá khứ gần (chỉ cách đây vài phút, vài giây). Đóng vai trò danh từ nên có thể đứng đầu câu, có thể dùng với từ phủ định 刚才没 (Vừa nãy không).",
      "2. 刚 (Vừa mới): Là phó từ, biểu thị hành động vừa mới diễn ra dựa trên cảm nhận tâm lý của người nói (có thể là 5 phút trước, nhưng cũng có thể là vừa cưới 2 tháng, vừa đến 1 năm).",
      "Phía sau 刚才 có thể có chữ 了, còn sau 刚 thường KHÔNG đi trực tiếp với 了."
    ],
    goldenRules: [
      "刚才 có thể đứng đầu câu (刚才我去洗手间了). 刚 TUYỆT ĐỐI KHÔNG được đứng đầu câu (Phải là: 我刚去洗手间).",
      "Muốn nói 'vừa đến vài tháng' (thời gian dài nhưng cảm giác mới) -> Bắt buộc dùng 刚 (我刚来两个月)."
    ],
    examples: [
      {
        hanzi: "你刚才去哪儿了？我找了你半天。",
        pinyin: "Nǐ gāngcái qù nǎr le? Wǒ zhǎo le nǐ bàntiān.",
        vietnamese: "Vừa nãy bạn đi đâu thế? Tôi tìm bạn cả buổi trời.",
        highlight: "刚才 (Vừa nãy - vài phút trước)",
        analysis: "Thời gian khách quan trong quá khứ gần."
      },
      {
        hanzi: "他刚来我们厂工作一个月，对业务还不太熟悉。",
        pinyin: "Tā gāng lái wǒmen chǎng gōngzuò yí gè yuè, duì yèwù hái bú tài shúxi.",
        vietnamese: "Anh ấy vừa mới đến nhà máy chúng ta làm việc được 1 tháng, đối với nghiệp vụ vẫn chưa thông thạo lắm.",
        highlight: "刚来...一个月 (Vừa mới - thời gian dài theo cảm nhận)",
        analysis: "1 tháng là thời gian dài, không thể dùng 刚才, bắt buộc dùng 刚."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "刚我去开会了。(SAI vì 刚 đứng đầu câu)",
        wrongPinyin: "Gāng wǒ qù kāihuì le.",
        wrongTranslation: "Vừa nãy tôi đi họp rồi.",
        correctHanzi: "刚才我去开会了。 / 我刚去开会。",
        correctPinyin: "Gāngcái wǒ qù kāihuì le.",
        correctTranslation: "Vừa nãy tôi đi họp rồi.",
        explanation: "刚 là phó từ không thể đứng đầu câu trước chủ ngữ. Muốn đứng đầu câu phải dùng danh từ 刚才."
      }
    ],
    quizzes: [
      {
        id: "q_gang_1",
        type: "multiple_choice",
        question: "Điền từ: 我____大学毕业，还在找工作。(Tôi vừa tốt nghiệp đại học, vẫn đang tìm việc)",
        options: ["刚", "刚才", "马上", "已经"],
        correctAnswer: "刚",
        explanation: "Tốt nghiệp đại học là mốc thời gian dài theo cảm nhận tâm lý -> Dùng phó từ 刚."
      }
    ]
  },

  // 11. Cấu trúc 越...越... & 越来越... (HSK3)
  {
    id: "g_yue_patterns",
    hskLevel: "HSK3",
    category: "conjunctions",
    categoryName: "Cặp liên từ & Mệnh đề",
    title: "Cấu trúc 越来越... (Càng ngày càng...) & 越...越... (Càng... càng...)",
    pinyinTitle: "yuè lái yuè yǔ yuè...yuè... (越来越 与 越...越...)",
    shortSummary: "Dùng để biểu thị mức độ phát triển tăng tiến theo thời gian hoặc theo sự biến đổi của một điều kiện khác.",
    formula: [
      "1. 越来越... (Theo thời gian): [Chủ ngữ] + 越来越 + [Tính từ / Động từ tâm lý] (CẤM dùng kèm '很, 非常')",
      "2. 越 A 越 B (A thay đổi dẫn tới B thay đổi): [Chủ ngữ] + 越 + [Động từ/Tính từ A] + 越 + [Động từ/Tính từ B]"
    ],
    explanation: [
      "1. 越来越 + Adj: Biểu thị mức độ biến đổi tăng dần theo dòng thời gian (Ví dụ: 天气越来越冷 - Thời tiết càng ngày càng lạnh; 汉语越来越难 - Tiếng Trung càng ngày càng khó).",
      "2. 越 A 越 B: Biểu thị mức độ B thay đổi tương ứng theo mức độ của A (Ví dụ: 雨越下越大 - Mưa càng rơi càng to; 越多越好 - Càng nhiều càng tốt; 越看越喜欢 - Càng ngắm càng thích)."
    ],
    goldenRules: [
      "Quy tắc cấm kỵ: Sau 越来越 KHÔNG ĐƯỢC DÙNG phó từ mức độ như 很, 非常, 太. (Tuyệt đối không nói: 越来越很好 - SAI!)."
    ],
    examples: [
      {
        hanzi: "你的汉语口语越来越流利了！",
        pinyin: "Nǐ de Hànyǔ kǒuyǔ yuè lái yuè liúlì le!",
        vietnamese: "Khẩu ngữ tiếng Trung của bạn càng ngày càng lưu loát rồi đấy!",
        highlight: "越来越流利",
        analysis: "Mức độ tăng dần theo thời gian học tập."
      },
      {
        hanzi: "这批服装的质量要求越严格，生产效率就要越高。",
        pinyin: "Zhè pī fúzhuāng de zhìliàng yāoqiú yuè yángé, shēngchǎn xiàolǜ jiù yào yuè gāo.",
        vietnamese: "Yêu cầu chất lượng lô hàng may này càng khắt khe thì hiệu suất sản xuất lại càng phải cao.",
        highlight: "越严格...越高",
        analysis: "Ứng dụng quản lý xưởng: 越 A 越 B."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "他的身体越来越很好。(Lỗi phổ biến)",
        wrongPinyin: "Tā de shēntǐ yuè lái yuè hěn hǎo.",
        wrongTranslation: "Sức khỏe của anh ấy càng ngày càng rất tốt.",
        correctHanzi: "他的身体越来越好。",
        correctPinyin: "Tā de shēntǐ yuè lái yuè hǎo.",
        correctTranslation: "Sức khỏe của anh ấy càng ngày càng tốt.",
        explanation: "Sau 越来越 không được thêm 很."
      }
    ],
    quizzes: [
      {
        id: "q_yue_1",
        type: "multiple_choice",
        question: "Chọn câu viết ĐÚNG:",
        options: [
          "中国菜我越吃越喜欢。",
          "中国菜我越来越很喜欢。",
          "中国菜我越吃越非常喜欢。",
          "中国菜我很越来越喜欢。"
        ],
        correctAnswer: "中国菜我越吃越喜欢。",
        explanation: "Cấu trúc 越...越... biểu thị càng ăn càng thích."
      }
    ]
  },

  // 12. Mẫu câu chỉ thị & Kỹ thuật trong Xưởng May (Chuyên ngành)
  {
    id: "g_garment_instruction_patterns",
    hskLevel: "HSK3",
    category: "garment_factory",
    categoryName: "Ngữ pháp Xưởng May",
    title: "Mẫu câu Chỉ thị thông số, Báo lỗi kỹ thuật & Quy chuẩn may mặc",
    pinyinTitle: "Fúzhuāng zhǐshì yǔ shùjù jùxíng (服装指示与数据句型)",
    shortSummary: "Cấu trúc ngữ pháp đặc thù dùng trong xưởng may: Chỉ thị dung sai (公差), vị trí lỗi (跳针/断线/起皱) và yêu cầu sửa chữa lại (返工/修色).",
    formula: [
      "1. Mẫu câu chỉ thị dung sai kích thước: [Vị trí đo] + (比) + [Thông số chuẩn] + [Lệch bao nhiêu cm]: [Bộ phận] + 偏大 / 偏小 + [Số cm]",
      "2. Mẫu câu báo máy có sự cố: [Tên máy móc] + 出现 / 发生 + [Tên lỗi] (e.g. 出现跳针/断线/卡布现象)",
      "3. Mẫu câu yêu cầu sửa chữa: 这批 [Sản phẩm] + 必须 / 需要 + 全部返工 / 重新熨烫"
    ],
    explanation: [
      "Trong xưởng may, ngữ pháp mệnh lệnh và miêu tả thông số cần độ chính xác cao tuyệt đối.",
      "1. 偏 (piān): Lệch / Nghiêng về một phía. 偏大 = lệch to hơn chuẩn; 偏小 = lệch nhỏ hơn chuẩn; 偏斜 = bị xếch/lệch.",
      "2. 按照 (ànhzhào): Theo như / Căn cứ vào. Công thức: 按照 + [Bảng tài liệu kỹ thuật / Mẫu chuẩn] + 进行 [Sản xuất/Kiểm hàng]."
    ],
    goldenRules: [
      "Quy tắc dung sai: 公差控制在 ±0.5cm 以内 (Dung sai khống chế trong phạm vi ±0.5cm).",
      "Quy tắc báo cáo: Vị trí lỗi + 出现 + Hiện tượng lỗi."
    ],
    examples: [
      {
        hanzi: "这件样衣的胸围比尺寸表偏大1.5公分，必须改小。",
        pinyin: "Zhè jiàn yàngyī de xiōngwéi bǐ chǐcun biǎo piāndà yào diǎn wǔ gōngfēn, bìxū gǎi xiǎo.",
        vietnamese: "Vòng ngực của chiếc áo mẫu này lệch to hơn bảng thông số 1.5 cm, bắt buộc phải sửa nhỏ lại.",
        highlight: "比尺寸表偏大1.5公分",
        analysis: "Vị trí đo (xiōngwéi) + 比 + Tiêu chuẩn (chǐcun biǎo) + Lệch (piāndà 1.5cm) + Yêu cầu (bìxū gǎi xiǎo)."
      },
      {
        hanzi: "请大家严格按照工艺单的要求进行缝纫，严禁漏道工序。",
        pinyin: "Qǐng dàjiā yángé ànzhào gōngyìdān de yāoqiú jìnxíng féngrèn, yánjìn lòu dào gōngxù.",
        vietnamese: "Xin mọi người nghiêm túc may theo đúng yêu cầu của bảng quy trình công nghệ, nghiêm cấm bỏ sót công đoạn.",
        highlight: "严格按照...要求进行",
        analysis: "Trạng từ (yángé) + Giới từ (ànzhào gōngyìdān) + Động từ (jìnxíng féngrèn)."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "尺寸表大1公分胸围。(Sai trật tự)",
        wrongPinyin: "Chǐcun biǎo dà yī gōngfēn xiōngwéi.",
        wrongTranslation: "Vòng ngực to hơn bảng kích thước 1cm.",
        correctHanzi: "胸围比尺寸表偏大1公分。",
        correctPinyin: "Xiōngwéi bǐ chǐcun biǎo piāndà yī gōngfēn.",
        correctTranslation: "Vòng ngực lệch to hơn bảng thông số 1cm.",
        explanation: "Chủ ngữ là bộ phận đo (胸围), đặt trước kết cấu so sánh 比."
      }
    ],
    quizzes: [
      {
        id: "q_garment_1",
        type: "multiple_choice",
        question: "Dịch sang tiếng Trung: 'Tất cả phải may theo đúng mẫu chuẩn (产前样)':",
        options: [
          "全部要按照产前样缝制。",
          "按照全部产前样要缝制。",
          "缝制全部要在产前样。",
          "产前样缝制全部按照。"
        ],
        correctAnswer: "全部要按照产前样缝制。",
        explanation: "Trật tự: S (全部) + Năng nguyện (要) + Giới từ (按照产前样) + Động từ (缝制)."
      }
    ]
  },

  // =========================================================================
  // 10. BỔ NGỮ KHẢ NĂNG (POTENTIAL COMPLEMENTS) - HSK3/4
  // =========================================================================
  {
    id: "g_potential_complement",
    hskLevel: "HSK3",
    category: "complements",
    categoryName: "Các loại Bổ ngữ",
    title: "Bổ ngữ Khả năng (V + 得 / 不 + Kết quả/Xu hướng)",
    pinyinTitle: "kěnéng bǔyǔ (可能补语)",
    shortSummary: "Biểu thị năng lực hoặc điều kiện chủ quan/khách quan có thể hoặc không thể làm đạt được kết quả nào đó (Ví dụ: 看得懂 - đọc hiểu được, 做不完 - làm không hết).",
    formula: [
      "Khẳng định: [Động từ] + 得 + [Bổ ngữ kết quả/xu hướng] (e.g. 看得懂, 听得见, 买得到, 穿得下)",
      "Phủ định: [Động từ] + 不 + [Bổ ngữ kết quả/xu hướng] (e.g. 看不懂, 听不见, 买不到, 穿不下)",
      "Nghi vấn: [Động từ] + 得 + [BN] + [Động từ] + 不 + [BN]？ HOẶC: [Khẳng định] + 吗？"
    ],
    explanation: [
      "Bổ ngữ khả năng dùng để biểu thị trong điều kiện hiện tại có thể đạt được kết quả hay không.",
      "Lưu ý: Không dùng '不能 + Động từ + Bổ ngữ kết quả' để thay thế bổ ngữ khả năng phủ định trong khẩu ngữ. Người Trung Quốc luôn ưu tiên dùng [V + 不 + BN] (VD: 听不懂 thay vì 不能听懂).",
      "Các cụm thông dụng đặc biệt: 吃得下/吃不下 (ăn nổi/không nổi), 睡得着/睡不着 (ngủ được/không được), 受得了/受不了 (chịu đựng được/không nổi)."
    ],
    goldenRules: [
      "Quy tắc vàng: Nếu có tân ngữ, tân ngữ có thể đứng sau bổ ngữ khả năng HOẶC đưa lên đầu câu làm chủ đề.",
      "Tuyệt đối không dùng trợ từ 了 trong câu có bổ ngữ khả năng vì đây là khả năng, không phải hành động đã hoàn tất!"
    ],
    examples: [
      {
        hanzi: "这篇文章太难了，我看不懂。",
        pinyin: "Zhè piān wénzhāng tài nán le, wǒ kàn bù dǒng.",
        vietnamese: "Bài viết này khó quá, tôi đọc không hiểu nổi.",
        highlight: "看不懂",
        analysis: "Động từ (kàn) + 不 + Bổ ngữ kết quả (dǒng)."
      },
      {
        hanzi: "今天任务很多，我们三个小时做不完。",
        pinyin: "Jīntiān rènwù hěn duō, wǒmen sān gè xiǎoshí zuò bù wán.",
        vietnamese: "Hôm nay nhiệm vụ rất nhiều, chúng tôi làm không thể xong trong 3 tiếng.",
        highlight: "做不完",
        analysis: "Động từ (zuò) + 不 + Bổ ngữ (wán)."
      },
      {
        hanzi: "声音太小了，你在后排听得清楚吗？",
        pinyin: "Shēngyīn tài xiǎo le, nǐ zài hòupái tīng de qīngchu ma?",
        vietnamese: "Âm thanh nhỏ quá, bạn ngồi ở hàng sau nghe có rõ không?",
        highlight: "听得清楚吗",
        analysis: "Động từ (tīng) + 得 + Bổ ngữ (qīngchu) + 吗."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "我做不完作业了。(Thừa 了)",
        wrongPinyin: "Wǒ zuò bù wán zuòyè le.",
        wrongTranslation: "Tôi không làm xong bài tập.",
        correctHanzi: "我做不完作业。",
        correctPinyin: "Wǒ zuò bù wán zuòyè.",
        correctTranslation: "Tôi không thể làm xong bài tập.",
        explanation: "Bổ ngữ khả năng diễn đạt khả năng chưa hoàn thành, không dùng 了 ở cuối."
      }
    ],
    quizzes: [
      {
        id: "q_pot_1",
        type: "multiple_choice",
        question: "Điền vào chỗ trống: 'Cỡ áo này nhỏ quá, tôi mặc không vừa (_____).' ",
        options: ["穿不下", "不穿下", "穿不着", "不能穿好"],
        correctAnswer: "穿不下",
        explanation: "V + 不 + 下 dùng để chỉ không gian/sức chứa không đủ (mặc không vừa = 穿不下, ngồi không hết = 坐不下)."
      }
    ]
  },

  // =========================================================================
  // 11. CẤU TRÚC NHẤN MẠNH 是...的 (HSK2/3)
  // =========================================================================
  {
    id: "g_shi_de_sentence",
    hskLevel: "HSK2",
    category: "special_sentences",
    categoryName: "Câu đặc biệt",
    title: "Cấu trúc nhấn mạnh 是...的 (shì...de)",
    pinyinTitle: "shì...de jù (是...的句)",
    shortSummary: "Dùng để nhấn mạnh thời gian, địa điểm, phương thức, mục đích hoặc người thực hiện của một hành động đã xảy ra trong quá khứ.",
    formula: [
      "Khẳng định: [Chủ ngữ] + (是) + [Thành phần cần nhấn mạnh: Thời gian/Nơi chốn/Cách thức] + [Động từ] + 的",
      "Phủ định: [Chủ ngữ] + 不是 + [Thành phần nhấn mạnh] + [Động từ] + 的 (BẮT BUỘC phải có 不是)",
      "Nghi vấn: [Chủ ngữ] + 是 + [Thành phần nhấn mạnh] + [Động từ] + 的 + 吗？"
    ],
    explanation: [
      "Điều kiện tiên quyết: Hành động ĐÃ XẢY RA trong quá khứ.",
      "Mục đích không phải thông báo hành động có xảy ra hay không, mà là làm rõ chi tiết 'Khi nào? Ở đâu? Bằng cách nào? Với ai?'.",
      "Trong câu khẳng định, chữ 是 có thể lược bỏ (nhưng 的 ở cuối câu bắt buộc giữ). Trong câu phủ định, chữ 不是 TUYỆT ĐỐI không được lược bỏ!"
    ],
    goldenRules: [
      "Nếu câu có tân ngữ: 的 có thể đứng trước tân ngữ hoặc cuối câu (e.g. 我是在北京学的汉语 HOẶC 我是在北京学汉语的).",
      "Không dùng kèm trợ từ động thái 了 trong câu 是...的 vì cấu trúc này đã mặc định biểu thị sự việc đã hoàn thành."
    ],
    examples: [
      {
        hanzi: "我是坐飞机来河内的。",
        pinyin: "Wǒ shì zuò fēijī lái Hénèi de.",
        vietnamese: "Tôi đến Hà Nội bằng máy bay. (Nhấn mạnh phương tiện)",
        highlight: "是坐飞机来...的",
        analysis: "Chủ ngữ (wǒ) + 是 + Phương thức (zuò fēijī) + Động từ (lái Hénèi) + 的."
      },
      {
        hanzi: "他是去年九月份毕业的。",
        pinyin: "Tā shì qùnián jiǔ yuèfèn bìyè de.",
        vietnamese: "Anh ấy tốt nghiệp vào tháng 9 năm ngoái. (Nhấn mạnh thời gian)",
        highlight: "是去年九月份毕业的",
        analysis: "Chủ ngữ (tā) + 是 + Thời gian (qùnián jiǔ yuèfèn) + Động từ (bìyè) + 的."
      },
      {
        hanzi: "这件衣服不是在网上买的，是在商场买的。",
        pinyin: "Zhè jiàn yīfu bú shì zài wǎngshang mǎi de, shì zài shāngchǎng mǎi de.",
        vietnamese: "Chiếc áo này không phải mua trên mạng, mà là mua ở trung tâm thương mại. (Nhấn mạnh nơi chốn)",
        highlight: "不是在网上买的",
        analysis: "Phủ định (bú shì) + Nơi chốn (zài wǎngshang) + Động từ (mǎi) + 的."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "我是在中国学了中文的。(Thừa 了)",
        wrongPinyin: "Wǒ shì zài Zhōngguó xué le Zhōngwén de.",
        wrongTranslation: "Tôi học tiếng Trung ở Trung Quốc.",
        correctHanzi: "我是在中国学中文的。",
        correctPinyin: "Wǒ shì zài Zhōngguó xué Zhōngwén de.",
        correctTranslation: "Tôi học tiếng Trung ở Trung Quốc.",
        explanation: "Trong cấu trúc 是...的 tuyệt đối không dùng thêm 了."
      }
    ],
    quizzes: [
      {
        id: "q_shide_1",
        type: "multiple_choice",
        question: "Chọn câu đúng nhất để nhấn mạnh 'Tôi đi cùng bạn gái đến':",
        options: [
          "我是跟我女朋友一起来的。",
          "我跟我女朋友来的是。",
          "我是跟我女朋友来过了。",
          "我是来了跟我女朋友。"
        ],
        correctAnswer: "我是跟我女朋友一起来的。",
        explanation: "Cấu trúc nhấn mạnh đối tượng cùng thực hiện: 是 + [跟我女朋友一起] + 来 + 的."
      }
    ]
  },

  // =========================================================================
  // 12. CẤU TRÚC TIẾN TRIỂN 越来越... & 越...越... (HSK2/3)
  // =========================================================================
  {
    id: "g_progress_structures",
    hskLevel: "HSK2",
    category: "conjunctions",
    categoryName: "Cặp liên từ & Mệnh đề",
    title: "Cấu trúc tiến triển: 越来越... (Càng ngày càng) & 越 A 越 B (Càng A càng B)",
    pinyinTitle: "yuè lái yuè & yuè...yuè...",
    shortSummary: "Diễn tả mức độ của trạng thái hoặc tính chất thay đổi theo thời gian hoặc phụ thuộc vào sự biến đổi của điều kiện A.",
    formula: [
      "1. Càng ngày càng: [Chủ ngữ] + 越来越 + [Tính từ / Động từ tâm lý] (VD: 越来越好, 越来越喜欢)",
      "2. Càng A càng B: 越 + [Điều kiện A] + 越 + [Kết quả B] (VD: 越学越有意思, 越快越好)"
    ],
    explanation: [
      "越来越 biểu thị mức độ phát triển dần theo thời gian. Sau 越来越 TUYỆT ĐỐI không dùng phó từ chỉ mức độ như 很, 非常, 太, 十分!",
      "越 A 越 B biểu thị mức độ của B phụ thuộc theo mức độ thay đổi của A. Chủ ngữ có thể cùng là 1 người hoặc 2 người khác nhau."
    ],
    goldenRules: [
      "Cấm kỵ tuyệt đối: KHÔNG BAO GIỜ nói '越来越很好' hay '越来越非常漂亮'. Chỉ nói '越来越好', '越来越漂亮'.",
      "Khi dùng 越...越...: Cụm từ hay dùng nhất trong công việc: 越快越好 (càng nhanh càng tốt), 越多越好 (càng nhiều càng tốt)."
    ],
    examples: [
      {
        hanzi: "你的汉语口语说得越来越流利了！",
        pinyin: "Nǐ de Hànyǔ kǒuyǔ shuō de yuè lái yuè liúlì le!",
        vietnamese: "Khẩu ngữ tiếng Trung của bạn nói càng ngày càng lưu loát rồi!",
        highlight: "越来越流利",
        analysis: "Chủ ngữ (kǒuyǔ) + Động từ + 得 + 越来越 + Tính từ (liúlì)."
      },
      {
        hanzi: "这个问题越想越觉得复杂。",
        pinyin: "Zhè gè wèntí yuè xiǎng yuè juéde fùzá.",
        vietnamese: "Vấn đề này càng nghĩ càng cảm thấy phức tạp.",
        highlight: "越想越觉得",
        analysis: "越 + Động từ A (xiǎng) + 越 + Động từ B (juéde fùzá)."
      },
      {
        hanzi: "这批订单越早出货越好。",
        pinyin: "Zhè pī dìngdān yuè zǎo chūhuò yuè hǎo.",
        vietnamese: "Lô đơn hàng này càng xuất hàng sớm càng tốt.",
        highlight: "越早...越好",
        analysis: "Ứng dụng nhà máy: 越早 + [Hành động] + 越好."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "天气越来越很冷了。(Sai vì có 很)",
        wrongPinyin: "Tiānqì yuè lái yuè hěn lěng le.",
        wrongTranslation: "Thời tiết càng ngày càng rất lạnh.",
        correctHanzi: "天气越来越冷了。",
        correctPinyin: "Tiānqì yuè lái yuè lěng le.",
        correctTranslation: "Thời tiết càng ngày càng lạnh rồi.",
        explanation: "Sau 越来越 không được thêm phó từ chỉ mức độ như 很, 非常, 太."
      }
    ],
    quizzes: [
      {
        id: "q_yue_1",
        type: "multiple_choice",
        question: "Chọn câu đúng ngữ pháp tiếng Trung:",
        options: [
          "汉语越学越有意思。",
          "汉语越学越很有意思。",
          "汉语越来越非常难。",
          "汉语越学非常难。"
        ],
        correctAnswer: "汉语越学越有意思。",
        explanation: "Cấu trúc 越...越... không đi kèm phó từ 很/非常."
      }
    ]
  },

  // =========================================================================
  // 13. CẤU TRÚC LIÊN TIẾP 一...就... (HSK3)
  // =========================================================================
  {
    id: "g_as_soon_as",
    hskLevel: "HSK3",
    category: "conjunctions",
    categoryName: "Cặp liên từ & Mệnh đề",
    title: "Cấu trúc liên tiếp & Điều kiện: 一...就... (Hễ/Vừa...là/liền...)",
    pinyinTitle: "yī...jiù...",
    shortSummary: "Biểu thị hai hành động diễn ra liên tiếp ngay tức khắc trong thời gian ngắn HOẶC hễ xuất hiện điều kiện 1 thì lập tức dẫn đến kết quả 2.",
    formula: [
      "1. Cùng 1 chủ ngữ: [Chủ ngữ] + 一 + [Hành động 1] + 就 + [Hành động 2] (VD: 我一到家就给你打电话)",
      "2. Hai chủ ngữ khác nhau: [Chủ ngữ 1] + 一 + [Hành động 1]，[Chủ ngữ 2] + 就 + [Hành động 2] (VD: 老师一进教室，同学们就安静了)"
    ],
    explanation: [
      "Cấu trúc này có 2 chức năng chính:",
      "Chức năng 1 (Liên tiếp theo thời gian): Vừa làm xong việc 1 là lập tức làm việc 2 (e.g. 下班一回家就洗澡 - Vừa tan ca về đến nhà là đi tắm ngay).",
      "Chức năng 2 (Quy luật / Thói quen): Hễ có điều kiện A là xảy ra B (e.g. 他一喝咖啡就失眠 - Anh ấy hễ uống cà phê là mất ngủ)."
    ],
    goldenRules: [
      "Khi có 2 chủ ngữ khác nhau, chủ ngữ 2 bắt buộc phải đứng TRƯỚC chữ 就.",
      "Có thể kết hợp với câu điều kiện: 只要...就..."
    ],
    examples: [
      {
        hanzi: "他一听这首歌就想起妈妈。",
        pinyin: "Tā yì tīng zhè shǒu gē jiù xiǎngqǐ māma.",
        vietnamese: "Anh ấy hễ nghe bài hát này là lại nhớ đến mẹ.",
        highlight: "一听...就想起",
        analysis: "S (tā) + 一 + V1 (tīng gē) + 就 + V2 (xiǎngqǐ māma)."
      },
      {
        hanzi: "样品一做好，我们就马上送去给客户确认。",
        pinyin: "Yàngpǐn yì zuò hǎo, wǒmen jiù mǎshàng sòng qù gěi kèhù quèrèn.",
        vietnamese: "Áo mẫu vừa làm xong là chúng tôi lập tức gửi cho khách hàng xác nhận.",
        highlight: "一做好...就马上",
        analysis: "Ứng dụng công việc: Mẫu vừa hoàn thành (V1) + liền gửi đi (V2)."
      }
    ],
    commonMistakes: [
      {
        wrongHanzi: "经理一来，就我们开始开会。(Sai vị trí S2)",
        wrongPinyin: "Jīnglǐ yì lái, jiù wǒmen kāishǐ kāihuì.",
        wrongTranslation: "Giám đốc vừa đến là chúng tôi bắt đầu họp.",
        correctHanzi: "经理一来，我们就开始开会。",
        correctPinyin: "Jīnglǐ yì lái, wǒmen jiù kāishǐ kāihuì.",
        correctTranslation: "Giám đốc vừa đến là chúng tôi bắt đầu họp.",
        explanation: "Chủ ngữ 2 (我们) bắt buộc phải đứng trước chữ 就."
      }
    ],
    quizzes: [
      {
        id: "q_yijiu_1",
        type: "multiple_choice",
        question: "Điền từ thích hợp: '我_____喝牛奶_____肚子疼。' (Tôi hễ uống sữa là đau bụng)",
        options: ["一 / 就", "又 / 又", "虽然 / 但是", "因为 / 所以"],
        correctAnswer: "一 / 就",
        explanation: "Cấu trúc thói quen/phản xạ: 一 [uống sữa] 就 [đau bụng]."
      }
    ]
  }
];
