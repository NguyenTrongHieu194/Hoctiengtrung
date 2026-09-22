import { Lesson } from "../types";

export const HSK3_LESSONS: Lesson[] = [
  {
    id: "hsk3_l1",
    hskLevel: "HSK3",
    lessonNumber: 1,
    title: "Dự định cuối tuần & Đại từ phiếm chỉ",
    vietnameseTitle: "Bài 1: Cuối tuần bạn có dự định gì? (Đại từ phiếm chỉ & 一直)",
    description: "Học cách nói về kế hoạch tương lai, đại từ phiếm chỉ (什么 = cái gì đó), phó từ 一直 (luôn luôn liên tục).",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_01", "v_hsk3_02", "v_hsk3_03", "v_hsk3_04", "v_hsk3_05", "v_hsk3_06"],
    grammarPoints: [
      {
        id: "gp_hsk3_1_1",
        title: "Đại từ nghi vấn biểu thị ý nghĩa phiếm chỉ (Bất định)",
        structure: "Đại từ nghi vấn (什么 / 谁 / 哪儿) không dùng để hỏi mà chỉ một đối tượng chưa xác định",
        explanation: "什么 có nghĩa là 'cái gì đó / chút gì đó', 谁 là 'ai đó', 哪儿 là 'nơi nào đó'.",
        examples: [
          { hanzi: "周末你有什么打算？", pinyin: "Zhōumò nǐ yǒu shénme dǎsuan?", vietnamese: "Cuối tuần bạn có dự định gì không?" },
          { hanzi: "我想喝点儿什么。", pinyin: "Wǒ xiǎng hē diǎnr shénme.", vietnamese: "Tôi muốn uống một chút gì đó." }
        ]
      },
      {
        id: "gp_hsk3_1_2",
        title: "Phó từ 一直 (yìzhí) - Suốt / Luôn luôn liên tục",
        structure: "Chủ ngữ + 一直 + Động từ / Tính từ",
        explanation: "Biểu thị một hành động hoặc trạng thái kéo dài không gián đoạn.",
        examples: [
          { hanzi: "他一直在玩电脑游戏。", pinyin: "Tā yìzhí zài wán diànnǎo yóuxì.", vietnamese: "Cậu ấy cứ chơi điện tử suốt." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "小丽 (Tiểu Lệ)",
        role: "Bạn bè",
        hanzi: "周末你有什么打算？",
        pinyin: "Zhōumò nǐ yǒu shénme dǎsuan?",
        vietnamese: "Cuối tuần bạn có dự định gì không?"
      },
      {
        speaker: "小刚 (Tiểu Cương)",
        role: "Bạn bè",
        hanzi: "我早就想好了，请你吃饭、看电影、买东西。",
        pinyin: "Wǒ zǎo jiù xiǎng hǎo le, qǐng nǐ chīfàn, kàn diànyǐng, mǎi dōngxi.",
        vietnamese: "Mình nghĩ xong từ sớm rồi, mời bạn ăn cơm, xem phim và đi mua sắm."
      },
      {
        speaker: "小丽 (Tiểu Lệ)",
        role: "Bạn bè",
        hanzi: "一直玩儿可不行，下周还要考试呢！",
        pinyin: "Yìzhí wánr kě bù xíng, xià zhōu hái yào kǎoshì ne!",
        vietnamese: "Cứ chơi suốt thế không được đâu, tuần sau còn phải thi nữa đấy!"
      }
    ],
    readingPassage: {
      title: "周末计划 (Kế hoạch cuối tuần)",
      contentHanzi: "平时工作很忙，大家到了周末都想好好放松一下。有的人喜欢在家睡觉，有的人喜欢出去跟朋友聚会。合理的周末计划能让我们下周工作更有精力。",
      contentPinyin: "Píngshí gōngzuò hěn máng, dàjiā dào le zhōumò dōu xiǎng hǎohāo fàngsōng yíxià. Yǒu de rén xǐhuan zài jiā shuìjiào, yǒu de rén xǐhuan chūqu gēn péngyou jùhuì. Hélǐ de zhōumò jìhuà néng ràng wǒmen xià zhōu gōngzuò gèng yǒu jīnglì.",
      contentVietnamese: "Ngày thường công việc bận rộn, mọi người đến cuối tuần đều muốn thư giãn thoải mái. Có người thích ở nhà ngủ, có người thích ra ngoài tụ tập cùng bạn bè. Một kế hoạch cuối tuần hợp lý giúp chúng ta có thêm nhiều năng lượng làm việc cho tuần tới."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l1_1",
        type: "multiple_choice",
        question: "Trong câu '你想吃点儿什么吗？', từ '什么' đóng vai trò gì?",
        options: ["Phiếm chỉ (một thứ gì đó)", "Hỏi cái gì cụ thể", "Đại từ sở hữu", "Phó từ mức độ"],
        correctAnswer: "Phiếm chỉ (một thứ gì đó)",
        explanation: "什么 trong câu này biểu thị phiếm chỉ (không xác định)."
      }
    ]
  },
  {
    id: "hsk3_l2",
    hskLevel: "HSK3",
    lessonNumber: 2,
    title: "Bổ ngữ xu hướng đơn 来 / 去",
    vietnameseTitle: "Bài 2: Khi nào anh ấy về? (Bổ ngữ xu hướng đơn 来 / 去)",
    description: "Nắm vững Bổ ngữ xu hướng đơn giản (Động từ + 来/去) dựa trên vị trí của người nói.",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_07", "v_hsk3_08", "v_hsk3_09", "v_hsk3_10", "v_hsk3_11"],
    grammarPoints: [
      {
        id: "gp_hsk3_2_1",
        title: "Bổ ngữ xu hướng đơn: Động từ + 来 / 去",
        structure: "Động từ + (Tân ngữ nơi chốn) + 来 / 去",
        explanation: "来: Hành động hướng về phía người nói. 去: Hành động hướng ra xa người nói. Nếu tân ngữ là nơi chốn, bắt buộc đặt trước 来/去.",
        examples: [
          { hanzi: "他在楼上，你快上去吧。", pinyin: "Tā zài lóushang, nǐ kuài shàngqu ba.", vietnamese: "Anh ấy ở trên lầu, bạn mau đi lên đi (người nói ở dưới)." },
          { hanzi: "他回家去了。", pinyin: "Tā huí jiā qù le.", vietnamese: "Anh ấy về nhà rồi (nơi chốn 家 đứng trước 去)." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "同事甲 (Đồng nghiệp A)",
        role: "Công ty",
        hanzi: "经理什么时候回来？外面有位客户在等他。",
        pinyin: "Jīnglǐ shénme shíhou huílái? Wàimiàn yǒu wèi kèhù zài děng tā.",
        vietnamese: "Khi nào giám đốc về vậy? Bên ngoài có một vị khách hàng đang đợi ông ấy."
      },
      {
        speaker: "同事乙 (Đồng nghiệp B)",
        role: "Công ty",
        hanzi: "经理去总公司开会了，大概半个小时后回来。",
        pinyin: "Jīnglǐ qù zǒnggōngsī kāihuì le, dàgài bàn ge xiǎoshí hòu huílái.",
        vietnamese: "Giám đốc đi họp ở tổng công ty rồi, khoảng nửa tiếng nữa sẽ về."
      },
      {
        speaker: "同事甲 (Đồng nghiệp A)",
        role: "Công ty",
        hanzi: "那我请客人进接待室坐一会儿吧。",
        pinyin: "Nà wǒ qǐng kèrén jìn jiēdàishì zuò yíhuìr ba.",
        vietnamese: "Vậy tôi mời khách vào phòng tiếp tân ngồi một lát nhé."
      }
    ],
    readingPassage: {
      title: "送别 (Tiễn bạn)",
      contentHanzi: "明天朋友就要回国去了。今天下午很多同学来宿舍看他，大家带了很多礼物来。我们一起拍照留念，希望他以后再来中国。",
      contentPinyin: "Míngtiān péngyou jiù yào huí guó qù le. Jīntiān xiàwǔ hěn duō tóngxué lái sùshè kàn tā, dàjiā dài le hěn duō lǐwù lái. Wǒmen yìqǐ pāizhào liúniàn, xīwàng tā yǐhòu zài lái Zhōngguó.",
      contentVietnamese: "Ngày mai bạn tôi sẽ về nước rồi. Chiều hôm nay rất nhiều bạn học đến ký túc xá thăm cậu ấy, mọi người mang đến rất nhiều quà. Chúng tôi cùng chụp ảnh lưu niệm, mong cậu ấy sau này lại đến Trung Quốc."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l2_1",
        type: "multiple_choice",
        question: "Chọn trật tự đúng: 'Anh ấy đã vào trong phòng học rồi'",
        options: ["他进教室去了 (Tā jìn jiàoshì qù le)", "他进去教室了 (Tā jìnqu jiàoshì le)", "他去进教室了 (Tā qù jìn jiàoshì le)", "教室他进去了 (Jiàoshì tā jìnqu le)"],
        correctAnswer: "他进教室去了 (Tā jìn jiàoshì qù le)",
        explanation: "Khi tân ngữ là nơi chốn (教室), bắt buộc đặt trước bổ ngữ xu hướng (去)."
      }
    ]
  },
  {
    id: "hsk3_l3",
    hskLevel: "HSK3",
    lessonNumber: 3,
    title: "Câu tồn hiện với 着",
    vietnameseTitle: "Bài 3: Trên bàn đang để một ly cà phê (Câu tồn hiện)",
    description: "Học Câu tồn hiện (Nơi chốn + Động từ + 着 + Danh từ) biểu thị sự tồn tại của vật thể trong không gian.",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_12", "v_hsk3_13", "v_hsk3_14", "v_hsk3_15", "v_hsk3_16"],
    grammarPoints: [
      {
        id: "gp_hsk3_3_1",
        title: "Câu tồn hiện biểu thị trạng thái tồn tại: Nơi chốn + Động từ + 着 + Danh từ",
        structure: "Từ chỉ nơi chốn + Động từ (放/挂/写/坐/站) + 着 + Danh từ (Bất định)",
        explanation: "Diễn tả ở một nơi nào đó đang có hoặc đang tồn tại một sự vật, người ở trạng thái tĩnh.",
        examples: [
          { hanzi: "桌子上放着一本书。", pinyin: "Zhuōzi shang fàng zhe yì běn shū.", vietnamese: "Trên bàn đang để một cuốn sách." },
          { hanzi: "墙上挂着一张中国地图。", pinyin: "Qiáng shang guà zhe yì zhāng Zhōngguó dìtú.", vietnamese: "Trên tường đang treo một tấm bản đồ Trung Quốc." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "小丽 (Tiểu Lệ)",
        role: "Bạn bè",
        hanzi: "你的书房布置得真温馨！",
        pinyin: "Nǐ de shūfáng bùzhì de zhēn wēnxīn!",
        vietnamese: "Phòng sách của bạn bài trí ấm cúng thật đấy!"
      },
      {
        speaker: "小刚 (Tiểu Cương)",
        role: "Bạn bè",
        hanzi: "谢谢！桌子上放着一杯现磨咖啡，你尝尝看。",
        pinyin: "Xièxie! Zhuōzi shang fàng zhe yì bēi xiànmó kāfēi, nǐ chángchang kàn.",
        vietnamese: "Cảm ơn bạn! Trên bàn có để sẵn một ly cà phê mới xay, bạn nếm thử xem."
      },
      {
        speaker: "小丽 (Tiểu Lệ)",
        role: "Bạn bè",
        hanzi: "真香！墙上挂着的那幅画也是你画的吗？",
        pinyin: "Zhēn xiāng! Qiáng shang guà zhe de nà fú huà yě shì nǐ huà de ma?",
        vietnamese: "Thơm quá! Bức tranh đang treo trên tường kia cũng là do bạn vẽ à?"
      }
    ],
    readingPassage: {
      title: "安静的咖啡馆 (Quán cà phê yên tĩnh)",
      contentHanzi: "街角有一家安静的咖啡馆。窗户旁边的桌子上放着一瓶新鲜的花，旁边坐着几位正在看书的年轻人。这里的音乐让人心情很放松。",
      contentPinyin: "Jiējiǎo yǒu yì jiā ānjìng de kāfēiguǎn. Chuānghu pángbiān de zhuōzi shang fàng zhe yì píng xīnxiān de huā, pángbiān zuò zhe jǐ wèi zhèngzài kàn shū de niánqīng rén. Zhèlǐ de yīnyuè ràng rén xīnqíng hěn fàngsōng.",
      contentVietnamese: "Góc phố có một quán cà phê yên tĩnh. Trên bàn cạnh cửa sổ đang đặt một lọ hoa tươi, bên cạnh đang ngồi vài bạn trẻ chăm chú đọc sách. Âm nhạc ở đây giúp tâm trạng mọi người rất thư thái."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l3_1",
        type: "multiple_choice",
        question: "Cấu trúc đúng của câu tồn hiện miêu tả bức tranh trên tường:",
        options: ["墙上挂着一张画 (Qiáng shang guà zhe yì zhāng huà)", "一张画挂在墙上着 (Yì zhāng huà guà zài qiáng shang zhe)", "挂着墙上一张画 (Guà zhe qiáng shang yì zhāng huà)", "墙上一张画挂着 (Qiáng shang yì zhāng huà guà zhe)"],
        correctAnswer: "墙上挂着一张画 (Qiáng shang guà zhe yì zhāng huà)",
        explanation: "Cấu trúc câu tồn hiện: Nơi chốn (墙上) + Động từ (挂) + 着 + Danh từ (一张画)."
      }
    ]
  },
  {
    id: "hsk3_l4",
    hskLevel: "HSK3",
    lessonNumber: 4,
    title: "Cấu trúc V1着 + V2",
    vietnameseTitle: "Bài 4: Cô ấy luôn cười khi nói chuyện với khách (Hai hành động đồng thời)",
    description: "Học cấu trúc V1着 + V2 (làm hành động 2 trong tư thế/trạng thái của hành động 1) và phó từ 总是 (luôn luôn).",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_17", "v_hsk3_18", "v_hsk3_19", "v_hsk3_20", "v_hsk3_21"],
    grammarPoints: [
      {
        id: "gp_hsk3_4_1",
        title: "Cấu trúc: Động từ 1 + 着 + (Tân ngữ 1) + Động từ 2",
        structure: "V1 + 着 + V2",
        explanation: "Biểu thị hành động 1 là phương thức, trạng thái hoặc tư thế để thực hiện hành động chính 2.",
        examples: [
          { hanzi: "她总是笑着跟客人说话。", pinyin: "Tā zǒngshì xiào zhe gēn kèrén shuōhuà.", vietnamese: "Cô ấy luôn mỉm cười khi nói chuyện với khách hàng." },
          { hanzi: "我们站着聊天。", pinyin: "Wǒmen zhàn zhe liáotiān.", vietnamese: "Chúng tôi đứng nói chuyện." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "经理 (Giám đốc)",
        role: "Khách sạn",
        hanzi: "新来的前台服务员工作表现怎么样？",
        pinyin: "Xīn lái de qiántái fúwùyuán gōngzuò biǎoxiàn zěnmeyàng?",
        vietnamese: "Nhân viên lễ tân mới đến thể hiện công việc thế nào?"
      },
      {
        speaker: "主管 (Chủ quản)",
        role: "Khách sạn",
        hanzi: "她非常有礼貌，总是笑着跟客人说话，客人们都很满意。",
        pinyin: "Tā fēicháng yǒu lǐmào, zǒngshì xiào zhe gēn kèrén shuōhuà, kèrénmen dōu hěn mǎnyì.",
        vietnamese: "Cô ấy rất lịch sự, luôn mỉm cười khi nói chuyện với khách, các vị khách đều vô cùng hài lòng."
      }
    ],
    readingPassage: {
      title: "热情的服务 (Dịch vụ nhiệt tình)",
      contentHanzi: "在服务行业中，微笑是最美的语言。服务员站着迎接每一位顾客，笑着回答每一个问题，能让顾客感受到家一样的温暖。",
      contentPinyin: "Zài fúwù hángyè zhōng, wēixiào shì zuì měi de yǔyán. Fúwùyuán zhàn zhe yíngjiē měi yí wèi gùkè, xiào zhe huídá měi yí ge wèntí, néng ràng gùkè gǎnshòu dào jiā yíyàng de wēnnuǎn.",
      contentVietnamese: "Trong ngành dịch vụ, nụ cười là ngôn ngữ đẹp nhất. Nhân viên đứng đón tiếp từng vị khách hàng, cười khi trả lời từng câu hỏi, có thể khiến khách hàng cảm nhận được sự ấm áp như ở nhà."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l4_1",
        type: "multiple_choice",
        question: "Câu nào diễn đạt 'Chúng tôi vừa đi bộ vừa nói chuyện'?",
        options: ["我们走着聊天 (Wǒmen zǒu zhe liáotiān)", "我们聊天着走 (Wǒmen liáotiān zhe zǒu)", "我们走聊天了 (Wǒmen zǒu liáotiān le)", "我们走着聊天着 (Wǒmen zǒu zhe liáotiān zhe)"],
        correctAnswer: "我们走着聊天 (Wǒmen zǒu zhe liáotiān)",
        explanation: "Cấu trúc V1着 + V2: 走着 (vừa đi) + 聊天 (nói chuyện)."
      }
    ]
  },
  {
    id: "hsk3_l5",
    hskLevel: "HSK3",
    lessonNumber: 5,
    title: "Cấu trúc 越来越……",
    vietnameseTitle: "Bài 5: Dạo này tôi ngày càng béo (Mức độ tăng tiến 越来越)",
    description: "Học cấu trúc 越来越 + Tính từ / Động từ tâm lý biểu thị mức độ tăng dần theo thời gian.",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_22", "v_hsk3_23", "v_hsk3_24", "v_hsk3_25", "v_hsk3_26"],
    grammarPoints: [
      {
        id: "gp_hsk3_5_1",
        title: "Cấu trúc tăng tiến theo thời gian: 越来越…… (Ngày càng...)",
        structure: "Chủ ngữ + 越来越 + Tính từ / Động từ tâm lý (Không dùng thêm 很/非常)",
        explanation: "Biểu thị mức độ của tính chất thay đổi tỷ lệ thuận theo sự trôi qua của thời gian.",
        examples: [
          { hanzi: "我最近越来越胖了。", pinyin: "Wǒ zuìjìn yuèláiyuè pàng le.", vietnamese: "Dạo này tôi ngày càng béo lên rồi." },
          { hanzi: "天气越来越冷了。", pinyin: "Tiānqì yuèláiyuè lěng le.", vietnamese: "Thời tiết ngày càng lạnh hơn rồi." },
          { hanzi: "他的汉语越来越流利。", pinyin: "Tā de Hànyǔ yuèláiyuè liúlì.", vietnamese: "Tiếng Trung của anh ấy ngày càng trôi chảy." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn bè",
        hanzi: "王明，你最近怎么天天去健身房？",
        pinyin: "Wáng Míng, nǐ zuìjìn zěnme tiāntiān qù jiànshēnfáng?",
        vietnamese: "Vương Minh, dạo này sao ngày nào bạn cũng đến phòng tập gym thế?"
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn bè",
        hanzi: "我最近越来越胖了，以前的裤子都穿不下了！",
        pinyin: "Wǒ zuìjìn yuèláiyuè pàng le, yǐqián de kùzi dōu chuān bu xià le!",
        vietnamese: "Dạo này tôi ngày càng béo, quần trước đây đều mặc không vừa nữa rồi!"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn bè",
        hanzi: "运动挺好的，坚持锻炼身体会越来越健康。",
        pinyin: "Yùndòng tǐng hǎo de, jiānchí duànliàn shēntǐ huì yuèláiyuè jiànkāng.",
        vietnamese: "Vận động rất tốt, kiên trì tập luyện cơ thể sẽ ngày càng khỏe mạnh."
      }
    ],
    readingPassage: {
      title: "城市的变化 (Sự đổi thay của thành phố)",
      contentHanzi: "这些年，我们的城市发生了巨大的变化。马路越来越宽，高楼越来越多，环境也越来越干净漂亮。人们的生活水平越来越高。",
      contentPinyin: "Zhèxiē nián, wǒmen de chéngshì fāshēng le jùdà de biànhuà. Mǎlù yuèláiyuè kuān, gāolóu yuèláiyuè duō, huánjìng yě yuèláiyuè gānjìng piàoliang. Rénmen de shēnghuó shuǐpíng yuèláiyuè gāo.",
      contentVietnamese: "Những năm qua, thành phố của chúng ta đã có những thay đổi to lớn. Đường phố ngày càng rộng, nhà cao tầng ngày càng nhiều, môi trường cũng ngày càng sạch đẹp. Mức sống của người dân ngày càng được nâng cao."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l5_1",
        type: "multiple_choice",
        question: "Câu nào dưới đây sai ngữ pháp do dùng thừa phó từ?",
        options: ["天气越来越很冷了 (Sai vì có 很)", "天气越来越冷了", "他的汉语越来越好", "雨越来越大"],
        correctAnswer: "天气越来越很冷了 (Sai vì có 很)",
        explanation: "Sau 越来越 không được dùng các phó từ chỉ mức độ như 很, 非常, 太."
      }
    ]
  },
  {
    id: "hsk3_l6",
    hskLevel: "HSK3",
    lessonNumber: 6,
    title: "Bổ ngữ khả năng 得 / 不",
    vietnameseTitle: "Bài 6: Sao tự nhiên lại tìm không thấy? (Bổ ngữ khả năng)",
    description: "Nắm vững Bổ ngữ khả năng (Động từ + 得/不 + Kết quả) biểu thị có thể hay không thể đạt được kết quả.",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_27", "v_hsk3_28", "v_hsk3_29", "v_hsk3_30", "v_hsk3_31"],
    grammarPoints: [
      {
        id: "gp_hsk3_6_1",
        title: "Bổ ngữ khả năng: Động từ + 得 / 不 + Bổ ngữ kết quả hoặc xu hướng",
        structure: "Khẳng định: V + 得 + C | Phủ định: V + 不 + C",
        explanation: "Biểu thị trong điều kiện khách quan hoặc chủ quan có thể đạt được kết quả hay không.",
        examples: [
          { hanzi: "我找得到 / 找不到钥匙。", pinyin: "Wǒ zhǎo de dào / zhǎo bú dào yàoshi.", vietnamese: "Tôi tìm thấy / không tìm thấy chìa khóa." },
          { hanzi: "你看得懂中文报纸吗？", pinyin: "Nǐ kàn de dǒng Zhōngwén bàozhǐ ma?", vietnamese: "Bạn có đọc hiểu được báo tiếng Trung không?" }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "小丽 (Tiểu Lệ)",
        role: "Bạn bè",
        hanzi: "我的眼镜刚才还在桌子上，怎么突然找不到了？",
        pinyin: "Wǒ de yǎnjìng gāngcái hái zài zhuōzi shang, zěnme tūrán zhǎo bú dào le?",
        vietnamese: "Kính của mình vừa nãy còn ở trên bàn, sao tự nhiên lại tìm không thấy rồi?"
      },
      {
        speaker: "小刚 (Tiểu Cương)",
        role: "Bạn bè",
        hanzi: "你没戴在头上吗？你看得清黑板上的字吗？",
        pinyin: "Nǐ méi dài zài tóu shang ma? Nǐ kàn de qīng hēibǎn shang de zì ma?",
        vietnamese: "Cậu không cài trên đầu à? Cậu có nhìn rõ chữ trên bảng không?"
      },
      {
        speaker: "小丽 (Tiểu Lệ)",
        role: "Bạn bè",
        hanzi: "哎呀，真在头上呢！没有眼镜我都看不清楚了。",
        pinyin: "Āiyā, zhēn zài tóu shang ne! Méiyǒu yǎnjìng wǒ dōu kàn bu qīngchu le.",
        vietnamese: "Ái chà, đúng là ở trên đầu thật! Không có kính mình nhìn không rõ được."
      }
    ],
    readingPassage: {
      title: "粗心的小刚 (Tiểu Cương đoảng vị)",
      contentHanzi: "小刚平时有点儿粗心。今天出门时，他找不到钱包，急得满头大汗。最后在沙发缝里找到了。朋友们常说他：'你真是个小马虎！'",
      contentPinyin: "Xiǎogāng píngshí yǒudiǎnr cūxīn. Jīntiān chūmén shí, tā zhǎo bú dào qiánbāo, jí de mǎntóudàhàn. Zuìhòu zài shāfā fèng lǐ zhǎodào le. Péngyoumen cháng shuō tā: 'Nǐ zhēn shì ge xiǎo mǎhu!'",
      contentVietnamese: "Tiểu Cương bình thường có chút bất cẩn. Hôm nay khi ra khỏi nhà, cậu ấy tìm không thấy ví tiền, sốt ruột toát cả mồ hôi hột. Cuối cùng tìm thấy trong khe ghế sofa. Bạn bè thường trêu cậu: 'Cậu thật là một anh chàng đãng trí!'"
    },
    quizQuestions: [
      {
        id: "q_hsk3_l6_1",
        type: "multiple_choice",
        question: "Phủ định của '听得懂 (nghe hiểu được)' là gì?",
        options: ["听不懂 (tīng bu dǒng)", "没听懂 (méi tīng dǒng)", "不听懂 (bù tīng dǒng)", "听得不懂 (tīng de bù dǒng)"],
        correctAnswer: "听不懂 (tīng bu dǒng)",
        explanation: "Khẳng định: 听得懂 -> Phủ định bổ ngữ khả năng: 听不懂."
      }
    ]
  },
  {
    id: "hsk3_l7",
    hskLevel: "HSK3",
    lessonNumber: 7,
    title: "Cấu trúc so sánh bằng 跟……一样",
    vietnameseTitle: "Bài 7: Tôi giống như bạn (Cấu trúc so sánh bằng 跟……一样)",
    description: "Học cách so sánh ngang bằng và khác biệt với A 跟 B 一样 / 不一样 (+ Tính từ).",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_32", "v_hsk3_33", "v_hsk3_34", "v_hsk3_35", "v_hsk3_36"],
    grammarPoints: [
      {
        id: "gp_hsk3_7_1",
        title: "Cấu trúc so sánh bằng: A 跟 / 和 B 一样 (+ Tính từ)",
        structure: "A + 跟 / 和 + B + 一样 / 不一样 + (Tính từ)",
        explanation: "Dùng để biểu thị hai đối tượng A và B có sự tương đồng hoặc khác biệt về một phương diện nào đó.",
        examples: [
          { hanzi: "我跟你一样喜欢喝茶。", pinyin: "Wǒ gēn nǐ yíyàng xǐhuan hē chá.", vietnamese: "Tôi cũng thích uống trà giống như bạn." },
          { hanzi: "这件衣服的颜色跟那件不一样。", pinyin: "Zhè jiàn yīfu de yánsè gēn nà jiàn bù yíyàng.", vietnamese: "Màu sắc chiếc áo này không giống chiếc kia." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "大卫 (David)",
        role: "Bạn học",
        hanzi: "这两种手机有什么区别吗？",
        pinyin: "Zhè liǎng zhǒng shǒujī yǒu shénme qūbié ma?",
        vietnamese: "Hai loại điện thoại này có điểm gì khác nhau không?"
      },
      {
        speaker: "售货员 (Nhân viên)",
        role: "Bán hàng",
        hanzi: "它们的外观跟大小是一样的，但是这台的内存更大，拍照效果更好。",
        pinyin: "Tāmen de wàiguān gēn dàxiǎo shì yíyàng de, dànshì zhè tái de nèicún gèng dà, pāizhào xiàoguǒ gèng hǎo.",
        vietnamese: "Kiểu dáng bên ngoài và kích thước của chúng giống nhau, nhưng chiếc này bộ nhớ lớn hơn, chụp ảnh đẹp hơn."
      }
    ],
    readingPassage: {
      title: "双胞胎兄弟 (Hai anh em sinh đôi)",
      contentHanzi: "大龙和小龙是一对双胞胎。他们长得一模一样，连老师有时都分不出来。但是他们的性格不一样：哥哥喜欢安静看书，弟弟喜欢出门踢足球。",
      contentPinyin: "Dàlóng hé Xiǎolóng shì yí duì shuāngbāotāi. Tāmen zhǎng de yìmúyíyàng, lián lǎoshī yǒushí dōu fēn bu chūlái. Dànshì tāmen de xìnggé bù yíyàng: gēge xǐhuan ānjìng kàn shū, dìdi xǐhuan chūmén tī zúqiú.",
      contentVietnamese: "Đại Long và Tiểu Long là một cặp song sinh. Hai anh em trông giống hệt nhau, ngay cả thầy cô giáo đôi khi cũng không phân biệt được. Nhưng tính cách của hai bạn lại không giống nhau: anh trai thích yên tĩnh đọc sách, còn em trai lại thích ra ngoài đá bóng."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l7_1",
        type: "multiple_choice",
        question: "Dịch sang tiếng Trung: 'Sở thích của tôi không giống anh ấy'",
        options: ["我的爱好跟他不一样 (Wǒ de àihào gēn tā bù yíyàng)", "我的爱好跟他一样不 (Wǒ de àihào gēn tā yíyàng bù)", "我跟他爱好一样 (Wǒ gēn tā àihào yíyàng)", "我的爱好没他一样 (Wǒ de àihào méi tā yíyàng)"],
        correctAnswer: "我的爱好跟他不一样 (Wǒ de àihào gēn tā bù yíyàng)",
        explanation: "Cấu trúc không giống nhau: A + 跟 + B + 不一样."
      }
    ]
  },
  {
    id: "hsk3_l8",
    hskLevel: "HSK3",
    lessonNumber: 8,
    title: "Đại từ nghi vấn hô ứng",
    vietnameseTitle: "Bài 8: Tôi đi đâu bạn đi đó (Đại từ nghi vấn hô ứng)",
    description: "Học kết cấu hô ứng sử dụng cùng một đại từ nghi vấn ở 2 vế câu (Ai... người nấy, Cái gì... cái nấy).",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_37", "v_hsk3_38", "v_hsk3_39", "v_hsk3_40", "v_hsk3_41"],
    grammarPoints: [
      {
        id: "gp_hsk3_8_1",
        title: "Đại từ nghi vấn hô ứng liên kết hai phân câu",
        structure: "Vế 1 (Đại từ nghi vấn) + 就 + Vế 2 (Đại từ nghi vấn tương ứng)",
        explanation: "Dùng cùng một đại từ nghi vấn (什么...什么, 哪儿...哪儿, 谁...谁) ở hai vế để biểu thị vế sau hoàn toàn tùy thuộc vào vế trước.",
        examples: [
          { hanzi: "你想吃什么就吃什么。", pinyin: "Nǐ xiǎng chī shénme jiù chī shénme.", vietnamese: "Bạn muốn ăn cái gì thì ăn cái nấy." },
          { hanzi: "你去哪儿我就去哪儿。", pinyin: "Nǐ qù nǎr wǒ jiù qù nǎr.", vietnamese: "Bạn đi đâu thì tôi đi đó." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "小丽 (Tiểu Lệ)",
        role: "Bạn bè",
        hanzi: "今天晚上去哪儿吃饭？你想吃什么？",
        pinyin: "Jīntiān wǎnshang qù nǎr chīfàn? Nǐ xiǎng chī shénme?",
        vietnamese: "Tối nay đi đâu ăn cơm? Cậu muốn ăn món gì?"
      },
      {
        speaker: "小刚 (Tiểu Cương)",
        role: "Bạn bè",
        hanzi: "你吃什么我就吃什么，你去哪儿我就去哪儿。",
        pinyin: "Nǐ chī shénme wǒ jiù chī shénme, nǐ qù nǎr wǒ jiù qù nǎr.",
        vietnamese: "Cậu ăn gì thì mình ăn nấy, cậu đi đâu mình đi theo đó."
      },
      {
        speaker: "小丽 (Tiểu Lệ)",
        role: "Bạn bè",
        hanzi: "那我们去吃四川火锅吧！",
        pinyin: "Nà wǒmen qù chī Sìchuān huǒguō ba!",
        vietnamese: "Thế chúng mình đi ăn lẩu Tứ Xuyên nhé!"
      }
    ],
    readingPassage: {
      title: "随和的朋友 (Người bạn dễ tính)",
      contentHanzi: "小刚是一个特别随和的人。出去玩的时候，大家想去哪儿他就去哪儿，大家喜欢吃什么他就吃什么。所以朋友们都很喜欢和他一起出行。",
      contentPinyin: "Xiǎogāng shì yí ge tèbié suíhe de rén. Chūqu wán de shíhou, dàjiā xiǎng qù nǎr tā jiù qù nǎr, dàjiā xǐhuan chī shénme tā jiù chī shénme. Suǒyǐ péngyoumen dōu hěn xǐhuan hé tā yìqǐ chūxíng.",
      contentVietnamese: "Tiểu Cương là một người vô cùng dễ tính. Khi ra ngoài đi chơi, mọi người muốn đi đâu cậu ấy đi đấy, mọi người thích ăn gì cậu ấy ăn nấy. Vì vậy bạn bè đều rất thích cùng đi chơi với cậu."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l8_1",
        type: "multiple_choice",
        question: "Điền từ thích hợp vào chỗ trống: '谁想参加，_____可以报名。'",
        options: ["谁就 (shéi jiù)", "他就 (tā jiù)", "谁都 (shéi dōu)", "什么就 (shénme jiù)"],
        correctAnswer: "谁就 (shéi jiù)",
        explanation: "Cấu trúc hô ứng: 谁...谁就... (ai... thì người đó...)."
      }
    ]
  },
  {
    id: "hsk3_l9",
    hskLevel: "HSK3",
    lessonNumber: 9,
    title: "So sánh kết hợp Bổ ngữ trạng thái",
    vietnameseTitle: "Bài 9: Tiếng Trung của cô ấy nói hay như người Trung Quốc",
    description: "Kết hợp câu so sánh bằng (跟...一样) với Bổ ngữ trạng thái (Động từ + 得) để miêu tả năng lực vượt trội.",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_42", "v_hsk3_43", "v_hsk3_44", "v_hsk3_45", "v_hsk3_46"],
    grammarPoints: [
      {
        id: "gp_hsk3_9_1",
        title: "So sánh kết hợp Bổ ngữ trạng thái",
        structure: "Chủ ngữ + (Tân ngữ) + Động từ + 得 + 跟 / 比 + Đối tượng + 一样 / Tính từ",
        explanation: "Dùng để đánh giá trình độ thực hiện hành động của hai đối tượng ngang nhau hoặc hơn kém.",
        examples: [
          { hanzi: "她的汉语说得跟中国人一样流利。", pinyin: "Tā de Hànyǔ shuō de gēn Zhōngguó rén yíyàng liúlì.", vietnamese: "Tiếng Trung của cô ấy nói trôi chảy như người Trung Quốc." },
          { hanzi: "他跑得比我快得多。", pinyin: "Tā pǎo de bǐ wǒ kuài de duō.", vietnamese: "Anh ấy chạy nhanh hơn tôi nhiều." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "老师 (Thầy giáo)",
        role: "Lớp học",
        hanzi: "阮明，你的发音真标准，说得跟中国人一样好！",
        pinyin: "Ruǎn Míng, nǐ de fāyīn zhēn biāozhǔn, shuō de gēn Zhōngguó rén yíyàng hǎo!",
        vietnamese: "Nguyễn Minh, phát âm của em thật chuẩn mực, nói hay như người Trung Quốc vậy!"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Học sinh",
        hanzi: "谢谢老师夸奖！我每天都跟着录音练习半小时。",
        pinyin: "Xièxie lǎoshī kuājiǎng! Wǒ měitiān dōu gēn zhe lùyīn liànxí bàn xiǎoshí.",
        vietnamese: "Cảm ơn thầy đã khen ngợi! Mỗi ngày em đều nghe theo file ghi âm luyện tập nửa tiếng."
      }
    ],
    readingPassage: {
      title: "勤奋出成果 (Chăm chỉ ắt có thành quả)",
      contentHanzi: "语言学习没有捷径。每天坚持多听、多读、多说，你的口语水平就会进步得非常快。只要努力，你也能说得跟母语者一样好。",
      contentPinyin: "Yǔyán xuéxí méiyǒu jiéjìng. Měitiān jiānchí duō tīng, duō dú, duō shuō, nǐ de kǒuyǔ shuǐpíng jiù huì jìnbù de fēicháng kuài. Zhǐyào nǔlì, nǐ yě néng shuō de gēn mǔyǔzhě yíyàng hǎo.",
      contentVietnamese: "Học ngôn ngữ không có đường tắt. Mỗi ngày kiên trì nghe nhiều, đọc nhiều, nói nhiều, trình độ khẩu ngữ của bạn sẽ tiến bộ vô cùng nhanh chóng. Chỉ cần nỗ lực, bạn cũng có thể nói hay như người bản xứ."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l9_1",
        type: "multiple_choice",
        question: "Cấu trúc nào chuẩn để khen một người hát hay như ca sĩ chuyên nghiệp?",
        options: ["他唱得跟专业歌手一样好 (Tā chàng de gēn zhuānyè gēshǒu yíyàng hǎo)", "他唱歌专业歌手一样 (Tā chànggē zhuānyè gēshǒu yíyàng)", "他唱得专业歌手一样好 (Tā chàng de zhuānyè gēshǒu yíyàng hǎo)", "他跟专业歌手一样唱得 (Tā gēn zhuānyè gēshǒu yíyàng chàng de)"],
        correctAnswer: "他唱得跟专业歌手一样好 (Tā chàng de gēn zhuānyè gēshǒu yíyàng hǎo)",
        explanation: "Cấu trúc: Động từ + 得 + 跟 B 一样 + Tính từ."
      }
    ]
  },
  {
    id: "hsk3_l10",
    hskLevel: "HSK3",
    lessonNumber: 10,
    title: "So sánh hơn với 多了 / 得多",
    vietnameseTitle: "Bài 10: Toán học khó hơn lịch sử nhiều (Mức độ chênh lệch lớn)",
    description: "Học cấu trúc A 比 B + Tính từ + 多了 / 得多 biểu thị mức độ chênh lệch rất lớn giữa hai sự vật.",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_47", "v_hsk3_48", "v_hsk3_49", "v_hsk3_50", "v_hsk3_51"],
    grammarPoints: [
      {
        id: "gp_hsk3_10_1",
        title: "Cấu trúc so sánh chênh lệch lớn: A 比 B + Tính từ + 多了 / 得多",
        structure: "A + 比 + B + Tính từ + 多了 / 得多",
        explanation: "Dùng để nhấn mạnh sự khác biệt vượt trội về phẩm chất hoặc số lượng giữa A và B.",
        examples: [
          { hanzi: "数学比历史难多了。", pinyin: "Shùxué bǐ lìshǐ nán duō le.", vietnamese: "Môn toán khó hơn môn lịch sử rất nhiều." },
          { hanzi: "今天的心情比昨天好得多。", pinyin: "Jīntiān de xīnqíng bǐ zuótiān hǎo de duō.", vietnamese: "Tâm trạng hôm nay tốt hơn hôm qua nhiều." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "大卫 (David)",
        role: "Học sinh",
        hanzi: "你觉得这学期的数学课怎么样？",
        pinyin: "Nǐ juéde zhè xuéqī de shùxué kè zěnmeyàng?",
        vietnamese: "Cậu thấy môn toán học kỳ này thế nào?"
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Học sinh",
        hanzi: "我觉得数学比历史难多了，很多公式我都记不住。",
        pinyin: "Wǒ juéde shùxué bǐ lìshǐ nán duō le, hěn duō gōngshì wǒ dōu jì bu zhù.",
        vietnamese: "Mình thấy toán khó hơn lịch sử nhiều, rất nhiều công thức mình không nhớ nổi."
      },
      {
        speaker: "大卫 (David)",
        role: "Học sinh",
        hanzi: "那周末我们一起去图书馆复习吧。",
        pinyin: "Nà zhōumò wǒmen yìqǐ qù túshūguǎn fùxí ba.",
        vietnamese: "Thế cuối tuần chúng mình cùng đến thư viện ôn bài nhé."
      }
    ],
    readingPassage: {
      title: "两座城市 (Hai thành phố)",
      contentHanzi: "上海的人口比杭州多得多，生活节奏也快得多。但是杭州的风景非常优美，生活环境比上海安静多了。两座城市各有特色。",
      contentPinyin: "Shànghǎi de rénkǒu bǐ Hángzhōu duō de duō, shēnghuó jiézòu yě kuài de duō. Dànshì Hángzhōu de fēngjǐng fēicháng yōuměi, shēnghuó huánjìng bǐ Shànghǎi ānjìng duō le. Liǎng zuò chéngshì gè yǒu tèsè.",
      contentVietnamese: "Dân số Thượng Hải đông hơn Hàng Châu nhiều, nhịp sống cũng hối hả hơn nhiều. Nhưng phong cảnh Hàng Châu lại rất thơ mộng, môi trường sống yên tĩnh hơn Thượng Hải nhiều. Hai thành phố đều có nét đặc sắc riêng."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l10_1",
        type: "multiple_choice",
        question: "Cụm từ nào đặt ở cuối câu so sánh để biểu thị sự chênh lệch lớn?",
        options: ["多了 (duō le) / 得多 (de duō)", "很 (hěn)", "非常 (fēicháng)", "最 (zuì)"],
        correctAnswer: "多了 (duō le) / 得多 (de duō)",
        explanation: "Trong câu so sánh 比, bổ ngữ chênh lệch lớn là 多了 hoặc 得多 đặt sau tính từ."
      }
    ]
  },
  {
    id: "hsk3_l11",
    hskLevel: "HSK3",
    lessonNumber: 11,
    title: "Câu chữ 把 cơ bản",
    vietnameseTitle: "Bài 11: Đừng quên tắt điều hòa nhé (Câu chữ 把 cơ bản)",
    description: "Nắm vững bản chất và cấu trúc nền tảng của Câu chữ 把 (S + 把 + O + V + Kết quả) để xử lý đối tượng cụ thể.",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk3_52", "v_hsk3_53", "v_hsk3_54", "v_hsk3_55", "v_hsk3_56"],
    grammarPoints: [
      {
        id: "gp_hsk3_11_1",
        title: "Câu chữ 把 (bǎ): Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác",
        structure: "S + 把 + O (Xác định) + V + 了 / 在 / 给 / Kết quả",
        explanation: "Dùng khi người nói muốn tác động làm thay đổi vị trí, trạng thái hoặc tính chất của một sự vật cụ thể đã biết.",
        examples: [
          { hanzi: "请把门关上。", pinyin: "Qǐng bǎ mén guān shàng.", vietnamese: "Xin hãy đóng cửa lại." },
          { hanzi: "别忘了把空调关了。", pinyin: "Bié wàng le bǎ kōngtiáo guān le.", vietnamese: "Đừng quên tắt máy điều hòa nhé." },
          { hanzi: "我把作业做完了。", pinyin: "Wǒ bǎ zuòyè zuò wán le.", vietnamese: "Tôi đã làm xong bài tập rồi." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "妈妈 (Mẹ)",
        role: "Gia đình",
        hanzi: "出门前别忘了把灯和空调关了。",
        pinyin: "Chūmén qián bié wàng le bǎ dēng hé kōngtiáo guān le.",
        vietnamese: "Trước khi ra khỏi nhà đừng quên tắt đèn và điều hòa nhé."
      },
      {
        speaker: "儿子 (Con trai)",
        role: "Gia đình",
        hanzi: "我已经把空调关了，窗户也关好了。",
        pinyin: "Wǒ yǐjīng bǎ kōngtiáo guān le, chuānghu yě guān hǎo le.",
        vietnamese: "Con đã tắt điều hòa rồi, cửa sổ cũng đã đóng cẩn thận rồi ạ."
      },
      {
        speaker: "妈妈 (Mẹ)",
        role: "Gia đình",
        hanzi: "记得把桌子上的垃圾带出去扔掉。",
        pinyin: "Jìde bǎ zhuōzi shang de lājī dài chūqu rēngdiào.",
        vietnamese: "Nhớ mang rác trên bàn ra ngoài vứt đi nhé."
      }
    ],
    readingPassage: {
      title: "节约能源 (Tiết kiệm năng lượng)",
      contentHanzi: "离开办公室或者教室时，我们应该养成好习惯：把电脑关掉，把空调和电灯关了。随手关灯不仅能节约用电，还能保护环境。",
      contentPinyin: "Líkāi bàngōngshì huòzhě jiàoshì shí, wǒmen yīnggāi yǎngchéng hǎo xíguàn: bǎ diànnǎo guāndiào, bǎ kōngtiáo hé diàndēng guān le. Suíshǒu guān dēng bùjǐn néng jiéyuē yòng diàn, hái néng bǎohù huánjìng.",
      contentVietnamese: "Khi rời khỏi văn phòng hoặc lớp học, chúng ta nên hình thành thói quen tốt: tắt máy tính, tắt điều hòa và đèn điện. Tiện tay tắt đèn không những tiết kiệm điện năng mà còn góp phần bảo vệ môi trường."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l11_1",
        type: "multiple_choice",
        question: "Sắp xếp đúng câu chữ 把: 'Xin hãy đưa hộ chiếu cho tôi'",
        options: ["请把护照给我 (Qǐng bǎ hùzhào gěi wǒ)", "请给我把护照 (Qǐng gěi wǒ bǎ hùzhào)", "把护照请给我 (Bǎ hùzhào qǐng gěi wǒ)", "请把给护照我 (Qǐng bǎ gěi hùzhào wǒ)"],
        correctAnswer: "请把护照给我 (Qǐng bǎ hùzhào gěi wǒ)",
        explanation: "Cấu trúc câu chữ 把: S + 把 + Tân ngữ (护照) + Động từ (给) + Tân ngữ 2 (我)."
      }
    ]
  },
  {
    id: "hsk3_l12",
    hskLevel: "HSK3",
    lessonNumber: 12,
    title: "Câu chữ 把 nâng cao",
    vietnameseTitle: "Bài 12: Đem cuốn từ điển này trả lại cho thầy giáo (Câu chữ 把 với kết quả/nơi chốn)",
    description: "Học câu chữ 把 kết hợp với các kết cấu kết quả nơi chốn (放/在, 送/给, 翻译/成).",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_57", "v_hsk3_58", "v_hsk3_59", "v_hsk3_60", "v_hsk3_61"],
    grammarPoints: [
      {
        id: "gp_hsk3_12_1",
        title: "Câu chữ 把 với bổ ngữ kết quả nơi chốn / đối tượng",
        structure: "Chủ ngữ + 把 + Tân ngữ + Động từ + 在 / 到 / 给 + Địa điểm / Người nhận",
        explanation: "Biểu thị tác động khiến cho sự vật di chuyển đến một nơi chốn hoặc chuyển giao cho một người nhận mới.",
        examples: [
          { hanzi: "请把这本书还给图书馆。", pinyin: "Qǐng bǎ zhè běn shū huán gěi túshūguǎn.", vietnamese: "Xin hãy đem cuốn sách này trả cho thư viện." },
          { hanzi: "把衣服放在衣柜里。", pinyin: "Bǎ yīfu fàng zài yīguì li.", vietnamese: "Đem quần áo để vào trong tủ quần áo." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "王明，你借张老师的汉语词典看完了吗？",
        pinyin: "Wáng Míng, nǐ jiè Zhāng lǎoshī de Hànyǔ cídiǎn kàn wán le ma?",
        vietnamese: "Vương Minh, cuốn từ điển tiếng Trung bạn mượn cô Trương đã xem xong chưa?"
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn học",
        hanzi: "看完了。我正打算下午去办公室把词典还给老师呢。",
        pinyin: "Kàn wán le. Wǒ zhèng dǎsuan xiàwǔ qù bàngōngshì bǎ cídiǎn huán gěi lǎoshī ne.",
        vietnamese: "Xem xong rồi. Mình đang định buổi chiều đến văn phòng đem từ điển trả cho cô đây."
      }
    ],
    readingPassage: {
      title: "整理房间 (Dọn dẹp phòng ốc)",
      contentHanzi: "周末我在家大扫除。我把桌子上的书整齐地放在书架上，把脏衣服放进洗衣机里洗干净。收拾完后，整个房间变得明亮舒服。",
      contentPinyin: "Zhōumò wǒ zài jiā dàsǎochú. Wǒ bǎ zhuōzi shang de shū zhěngqí de fàng zài shūjià shang, bǎ zāng yīfu fàng jìn xǐyījī li xǐ gānjìng. Shōushi wán hòu, zhěng ge fángjiān biàn de míngliàng shūfu.",
      contentVietnamese: "Cuối tuần tôi tổng vệ sinh ở nhà. Tôi đem sách trên bàn xếp ngay ngắn lên giá sách, đem quần áo bẩn bỏ vào máy giặt giặt sạch. Sau khi dọn dẹp xong, cả căn phòng trở nên sáng sủa và dễ chịu."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l12_1",
        type: "multiple_choice",
        question: "Chọn câu diễn đạt đúng ngữ pháp:",
        options: ["请把包放在椅子上 (Qǐng bǎ bāo fàng zài yǐzi shang)", "请放包在椅子上把 (Qǐng fàng bāo zài yǐzi shang bǎ)", "请在椅子上把包放 (Qǐng zài yǐzi shang bǎ bāo fàng)", "把椅子上请放包 (Bǎ yǐzi shang qǐng fàng bāo)"],
        correctAnswer: "请把包放在椅子上 (Qǐng bǎ bāo fàng zài yǐzi shang)",
        explanation: "Cấu trúc 把: 把 + Tân ngữ (包) + Động từ (放) + 在 + Vị trí (椅子上)."
      }
    ]
  },
  {
    id: "hsk3_l13",
    hskLevel: "HSK3",
    lessonNumber: 13,
    title: "Bổ ngữ xu hướng kép",
    vietnameseTitle: "Bài 13: Tôi đi bộ về đấy (Bổ ngữ xu hướng kép)",
    description: "Nắm vững Bổ ngữ xu hướng kép (Động từ + 上来/下去/进来/出去/回来/回去/过来/过去/起来).",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_62", "v_hsk3_63", "v_hsk3_64", "v_hsk3_65", "v_hsk3_66"],
    grammarPoints: [
      {
        id: "gp_hsk3_13_1",
        title: "Bổ ngữ xu hướng kép: Động từ + [上/下/进/出/回/过/起] + [来/去]",
        structure: "Động từ + Bổ ngữ xu hướng kép",
        explanation: "Chỉ rõ hướng di chuyển không gian 3 chiều đồng thời so với vị trí của người nói.",
        examples: [
          { hanzi: "他从书包里拿出一本书来。", pinyin: "Tā cóng shūbāo li ná chū yì běn shū lái.", vietnamese: "Anh ấy từ trong cặp lấy ra một cuốn sách." },
          { hanzi: "我今天没坐车，是走回来的。", pinyin: "Wǒ jīntiān méi zuòchē, shì zǒu huílái de.", vietnamese: "Hôm nay tôi không đi xe, tôi đi bộ về đấy." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "妈妈 (Mẹ)",
        role: "Gia đình",
        hanzi: "今天怎么回来得这么晚？外面下大雨了。",
        pinyin: "Jīntiān zěnme huílái de zhème wǎn? Wàimiàn xià dà yǔ le.",
        vietnamese: "Hôm nay sao về muộn thế con? Bên ngoài mưa to rồi."
      },
      {
        speaker: "儿子 (Con trai)",
        role: "Gia đình",
        hanzi: "路上堵车很严重，我是走回来的，所以慢了一点儿。",
        pinyin: "Lùshang dǔchē hěn yánzhòng, wǒ shì zǒu huílái de, suǒyǐ màn le yìdiǎnr.",
        vietnamese: "Trên đường tắc xe nghiêm trọng quá, con đi bộ về nên chậm hơn một chút."
      }
    ],
    readingPassage: {
      title: "下雪了 (Tuyết rơi rồi)",
      contentHanzi: "清晨推开窗户，白茫茫的雪花从天上落下来。孩子们高兴地从屋里跑出来，在雪地上堆起雪人来，大家玩得开心极了。",
      contentPinyin: "Qīngchén tuīkāi chuānghu, báimángmáng de xuěhuā cóng tiān shang luò xiàlái. Háizimen gāoxìng de cóng wū li pǎo chūlái, zài xuědì shang duī qǐ xuěrén lái, dàjiā wán de kāixīn jí le.",
      contentVietnamese: "Sáng sớm đẩy cửa sổ ra, những bông tuyết trắng xóa từ trên trời rơi xuống. Lũ trẻ vui mừng từ trong nhà chạy ùa ra ngoài, đắp người tuyết trên nền tuyết trắng, mọi người chơi đùa vui vẻ vô cùng."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l13_1",
        type: "multiple_choice",
        question: "Cụm từ 'chạy ra ngoài (hướng về phía người nói)' là gì?",
        options: ["跑出来 (pǎo chūlái)", "跑出去 (pǎo chūqu)", "跑进来 (pǎo jìnlái)", "跑过去 (pǎo guòqu)"],
        correctAnswer: "跑出来 (pǎo chūlái)",
        explanation: "Chạy ra phía ngoài hướng về phía người nói là 跑出来."
      }
    ]
  },
  {
    id: "hsk3_l14",
    hskLevel: "HSK3",
    lessonNumber: 14,
    title: "Câu chữ 把 kết hợp Xu hướng",
    vietnameseTitle: "Bài 14: Bạn đem đĩa hoa quả qua đây (Câu chữ 把 + Bổ ngữ xu hướng)",
    description: "Kết hợp câu chữ 把 với Bổ ngữ xu hướng kép để yêu cầu di chuyển đồ vật đến vị trí xác định.",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_67", "v_hsk3_68", "v_hsk3_69", "v_hsk3_70", "v_hsk3_71"],
    grammarPoints: [
      {
        id: "gp_hsk3_14_1",
        title: "Câu chữ 把 kết hợp Bổ ngữ xu hướng kép",
        structure: "Chủ ngữ + 把 + Tân ngữ + Động từ + Xu hướng (过来 / 过去 / 拿出来 / 搬进去)",
        explanation: "Mẫu câu mệnh lệnh hoặc tường thuật hành động mang tính chuyển dịch vị trí không gian.",
        examples: [
          { hanzi: "请把水果盘拿过来。", pinyin: "Qǐng bǎ shuǐguǒ pán ná guòlái.", vietnamese: "Xin hãy đem đĩa hoa quả qua đây." },
          { hanzi: "快把行李箱搬上去吧。", pinyin: "Kuài bǎ xínglǐxiāng bān shàngqu ba.", vietnamese: "Mau đem va li hành lý vác lên lầu đi." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn bè",
        hanzi: "阮明，大家都在客厅聊天呢，你把洗好的水果拿过来吧。",
        pinyin: "Ruǎn Míng, dàjiā dōu zài kètīng liáotiān ne, nǐ bǎ xǐ hǎo de shuǐguǒ ná guòlái ba.",
        vietnamese: "Nguyễn Minh, mọi người đều đang ở phòng khách nói chuyện đấy, bạn đem đĩa hoa quả đã rửa sạch qua đây nhé."
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn bè",
        hanzi: "好的，我这就端过去。我还切了一个大西瓜呢！",
        pinyin: "Hǎo de, wǒ zhè jiù duān guòqu. Wǒ hái qiē le yí ge dà xīguā ne!",
        vietnamese: "Được rồi, mình bê qua ngay đây. Mình còn bổ một quả dưa hấu to nữa đấy!"
      }
    ],
    readingPassage: {
      title: "搬家 (Chuyển nhà)",
      contentHanzi: "今天大卫搬新家，朋友们都来帮忙。大家把沉重的箱子搬上楼去，把桌子和椅子摆放好。在大家的帮助下，很快就搬完了。",
      contentPinyin: "Jīntiān Dàwèi bān xīn jiā, péngyoumen dōu lái bāngmáng. Dàjiā bǎ chénzhòng de xiāngzi bān shàng lóu qù, bǎ zhuōzi hé yǐzi bǎifàng hǎo. Zài dàjiā de bāngzhù xià, hěn kuài jiù bān wán le.",
      contentVietnamese: "Hôm nay David chuyển nhà mới, bạn bè đều đến giúp một tay. Mọi người khiêng các thùng đồ nặng lên lầu, sắp xếp bàn ghế gọn gàng. Nhờ sự giúp đỡ của mọi người, việc chuyển nhà diễn ra rất nhanh chóng."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l14_1",
        type: "multiple_choice",
        question: "Dịch sang tiếng Trung: 'Hãy lấy hộ chiếu ra đây'",
        options: ["把护照拿出来 (Bǎ hùzhào ná chūlái)", "拿把护照出来 (Ná bǎ hùzhào chūlái)", "把护照出来拿 (Bǎ hùzhào chūlái ná)", "护照拿把出来 (Hùzhào ná bǎ chūlái)"],
        correctAnswer: "把护照拿出来 (Bǎ hùzhào ná chūlái)",
        explanation: "Cấu trúc: 把 + Tân ngữ (护照) + Động từ (拿) + Bổ ngữ xu hướng (出来)."
      }
    ]
  },
  {
    id: "hsk3_l15",
    hskLevel: "HSK3",
    lessonNumber: 15,
    title: "Đại từ 其他",
    vietnameseTitle: "Bài 15: Những người khác đều đi đâu rồi? (Đại từ 其他)",
    description: "Học cách dùng đại từ 其他 (khác, còn lại) kết hợp với danh từ, câu hỏi phân biệt nhóm đối tượng.",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_72", "v_hsk3_73", "v_hsk3_74", "v_hsk3_75", "v_hsk3_76"],
    grammarPoints: [
      {
        id: "gp_hsk3_15_1",
        title: "Đại từ: 其他 (qítā) - Khác / Còn lại",
        structure: "其他 + (Lượng từ) + Danh từ HOẶC 其他人 / 其他地方",
        explanation: "Dùng để chỉ người hoặc sự vật khác ngoài đối tượng vừa được nhắc đến.",
        examples: [
          { hanzi: "其他人都去开会了。", pinyin: "Qítā rén dōu qù kāihuì le.", vietnamese: "Những người khác đều đi họp rồi." },
          { hanzi: "除了这个，你还需要其他东西吗？", pinyin: "Chúle zhège, nǐ hái xūyào qítā dōngxi ma?", vietnamese: "Ngoài cái này ra, bạn còn cần đồ đạc gì khác không?" }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Lớp học",
        hanzi: "教室里怎么只有你一个人？其他人都去哪儿了？",
        pinyin: "Jiàoshì li zěnme zhǐ yǒu nǐ yí ge rén? Qítā rén dōu qù nǎr le?",
        vietnamese: "Trong lớp sao chỉ có một mình bạn thế này? Những người khác đều đi đâu rồi?"
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Lớp học",
        hanzi: "今天下午有体育课，其他人都在操场踢足球呢。",
        pinyin: "Jīntiān xiàwǔ yǒu tǐyùkè, qítā rén dōu zài cāochǎng tī zúqiú ne.",
        vietnamese: "Chiều nay có giờ thể dục, những người khác đều đang ở sân vận động đá bóng đấy."
      }
    ],
    readingPassage: {
      title: "团队合作 (Hợp tác nhóm)",
      contentHanzi: "在一个团队中，每个人都有自己的任务。有的人负责收集资料，有的人负责写报告，其他成员负责演讲展示。大家分工合作才能取得好成绩。",
      contentPinyin: "Zài yí ge tuánduì zhōng, měi ge rén dōu yǒu zìjǐ de rènwù. Yǒu de rén fùzé shōují zīliào, yǒu de rén fùzé xiě bàogào, qítā chéngyuán fùzé yǎnjiǎng zhǎnshì. Dàjiā fēngōng hézuò cái néng qǔdé hǎo chéngjì.",
      contentVietnamese: "Trong một đội ngũ, mỗi người đều có nhiệm vụ riêng của mình. Có người phụ trách thu thập tài liệu, có người phụ trách viết báo cáo, các thành viên khác phụ trách thuyết trình trình bày. Mọi người phân công hợp tác mới có thể đạt được thành tích tốt."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l15_1",
        type: "multiple_choice",
        question: "Từ nào có nghĩa là 'những người khác'?",
        options: ["其他人 (qítā rén)", "别的人 (bié de rén)", "所有人 (suǒyǒu rén)", "每个人 (měi ge rén)"],
        correctAnswer: "其他人 (qítā rén)",
        explanation: "其他 + 人 là cụm từ chỉ những người khác/còn lại."
      }
    ]
  },
  {
    id: "hsk3_l16",
    hskLevel: "HSK3",
    lessonNumber: 16,
    title: "Bổ ngữ mức độ 得",
    vietnameseTitle: "Bài 16: Bây giờ tôi mệt đến mức muốn ngủ (Bổ ngữ mức độ)",
    description: "Học Bổ ngữ mức độ (Tính từ + 得 + Cụm từ miêu tả mức độ biểu cảm / hậu quả).",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_77", "v_hsk3_78", "v_hsk3_79", "v_hsk3_80", "v_hsk3_81"],
    grammarPoints: [
      {
        id: "gp_hsk3_16_1",
        title: "Bổ ngữ mức độ: Tính từ + 得 + Mức độ / Trạng thái cảm xúc",
        structure: "Tính từ + 得 + (想... / 不行 / 极了 / Cụm chủ vị)",
        explanation: "Dùng để diễn tả mức độ của tính chất đạt đến một trạng thái cực điểm gây ra phản ứng sinh lý hoặc cảm xúc.",
        examples: [
          { hanzi: "我今天累得想马上睡觉。", pinyin: "Wǒ jīntiān lèi de xiǎng mǎshàng shuìjiào.", vietnamese: "Hôm nay tôi mệt đến mức muốn đi ngủ ngay lập tức." },
          { hanzi: "听到这个好消息，大家高兴得跳了起来。", pinyin: "Tīngdào zhè ge hǎo xiāoxi, dàjiā gāoxìng de tiào le qǐlái.", vietnamese: "Nghe tin vui này, mọi người vui mừng đến mức nhảy cẫng lên." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn bè",
        hanzi: "今天爬山累不累？你的脚酸吗？",
        pinyin: "Jīntiān páshān lèi bu lèi? Nǐ de jiǎo suān ma?",
        vietnamese: "Hôm nay đi leo núi mệt không? Chân bạn có mỏi không?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn bè",
        hanzi: "虽然风景很美，但我现在累得走不动路了，只想回宿舍洗个热水澡睡觉。",
        pinyin: "Suīrán fēngjǐng hěn měi, dàn wǒ xiànzài lèi de zǒu bu dòng lù le, zhǐ xiǎng huí sùshè xǐ ge rèshuǐzǎo shuìjiào.",
        vietnamese: "Tuy phong cảnh rất đẹp, nhưng giờ tôi mệt đến mức đi không nổi nữa rồi, chỉ muốn về ký túc xá tắm nước nóng rồi đi ngủ thôi."
      }
    ],
    readingPassage: {
      title: "忙碌的一天 (Một ngày bận rộn)",
      contentHanzi: "今天公司接待了重要的外国代表团。张经理从早忙到晚，忙得连喝水的时间都没有。虽然辛苦，但谈判取得了圆满成功，大家心里高兴极了。",
      contentPinyin: "Jīntiān gōngsī jiēdài le zhòngyào de wàiguó dàibiǎotuán. Zhāng jīnglǐ cóng zǎo máng dào wǎn, máng de lián hē shuǐ de shíjiān dōu méiyǒu. Suīrán xīnkǔ, dàn tánpàn qǔdé le yuánmǎn chénggōng, dàjiā xīn lǐ gāoxìng jí le.",
      contentVietnamese: "Hôm nay công ty đón tiếp đoàn đại biểu nước ngoài quan trọng. Giám đốc Trương bận rộn từ sáng đến tối, bận đến mức ngay cả thời gian uống nước cũng không có. Tuy vất vả nhưng đàm phán đã thành công tốt đẹp, trong lòng mọi người đều vui mừng khôn xiết."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l16_1",
        type: "multiple_choice",
        question: "Chọn câu có Bổ ngữ mức độ chính xác:",
        options: ["他高兴得笑了起来 (Tā gāoxìng de xiào le qǐlái)", "他高兴笑得起来 (Tā gāoxìng xiào de qǐlái)", "他得高兴笑起来 (Tā de gāoxìng xiào qǐlái)", "他笑得高兴起来 (Tā xiào de gāoxìng qǐlái)"],
        correctAnswer: "他高兴得笑了起来 (Tā gāoxìng de xiào le qǐlái)",
        explanation: "Cấu trúc: Tính từ (高兴) + 得 + Mức độ (笑了起来)."
      }
    ]
  },
  {
    id: "hsk3_l17",
    hskLevel: "HSK3",
    lessonNumber: 17,
    title: "Đại từ biểu thị toàn bộ",
    vietnameseTitle: "Bài 17: Ai cũng không biết chuyện này (Khẳng định/Phủ định toàn bộ)",
    description: "Học cách dùng đại từ nghi vấn (谁, 什么, 哪儿) kết hợp 都 / 也 để biểu thị tính toàn bộ (Ai cũng..., Bất cứ cái gì cũng...).",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_82", "v_hsk3_83", "v_hsk3_84", "v_hsk3_85", "v_hsk3_86"],
    grammarPoints: [
      {
        id: "gp_hsk3_17_1",
        title: "Đại từ nghi vấn + 都 / 也 + Động từ (Biểu thị tất cả / Tuyệt đối)",
        structure: "谁 / 什么 / 哪儿 / 什么时候 + 都 / 也 + Động từ (hoặc Phủ định 不/没)",
        explanation: "Dùng để nhấn mạnh không có bất kỳ ngoại lệ nào trong toàn bộ phạm vi.",
        examples: [
          { hanzi: "谁都知道长城很有名。", pinyin: "Shéi dōu zhīdào Chángchéng hěn yǒumíng.", vietnamese: "Ai cũng biết Vạn Lý Trường Thành rất nổi tiếng." },
          { hanzi: "我什么都不想吃。", pinyin: "Wǒ shénme dōu bù xiǎng chī.", vietnamese: "Tôi không muốn ăn bất cứ cái gì cả." },
          { hanzi: "他哪儿也没去，就待在家里。", pinyin: "Tā nǎr yě méi qù, jiù dāi zài jiā li.", vietnamese: "Cậu ấy chẳng đi đâu cả, cứ ở lì trong nhà." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn bè",
        hanzi: "你知道李老师下个月要去哪所大学进修吗？",
        pinyin: "Nǐ zhīdào Lǐ lǎoshī xià ge yuè yào qù nǎ suǒ dàxué jìnxiū ma?",
        vietnamese: "Bạn có biết tháng sau cô Lý sẽ đi tu nghiệp ở trường đại học nào không?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn bè",
        hanzi: "现在谁都不知道这件事，老师还没公布呢。",
        pinyin: "Xiànzài shéi dōu bù zhīdào zhè jiàn shì, lǎoshī hái méi gōngbù ne.",
        vietnamese: "Hiện tại ai cũng không biết chuyện này đâu, cô giáo vẫn chưa công bố mà."
      }
    ],
    readingPassage: {
      title: "神秘的生日派对 (Bữa tiệc sinh nhật bí mật)",
      contentHanzi: "为了给大卫一个惊喜，朋友们悄悄准备了生日蛋糕。谁都没有提前告诉他。当大卫推开门看到大家时，感动得说不出话来。",
      contentPinyin: "Wèile gěi Dàwèi yí ge jīngxǐ, péngyoumen qiāoqiāo zhǔnbèi le shēngrì dàngāo. Shéi dōu méiyǒu tíqián gàosu tā. Dāng Dàwèi tuīkāi mén kàndào dàjiā shí, gǎndòng de shuō bu chū huà lái.",
      contentVietnamese: "Để tạo cho David một sự bất ngờ, bạn bè đã âm thầm chuẩn bị bánh sinh nhật. Không một ai nói trước cho cậu ấy biết. Khi David đẩy cửa bước vào nhìn thấy mọi người, xúc động đến mức không nói nên lời."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l17_1",
        type: "multiple_choice",
        question: "Dịch sang tiếng Trung: 'Tôi chẳng muốn ăn cái gì cả'",
        options: ["我什么都不想吃 (Wǒ shénme dōu bù xiǎng chī)", "我不吃什么 (Wǒ bù chī shénme)", "什么我都不吃 (Shénme wǒ dōu bù chī)", "我不想吃什么都 (Wǒ bù xiǎng chī shénme dōu)"],
        correctAnswer: "我什么都不想吃 (Wǒ shénme dōu bù xiǎng chī)",
        explanation: "Cấu trúc phủ định toàn bộ: 什么 + 都/也 + 不 + Động từ."
      }
    ]
  },
  {
    id: "hsk3_l18",
    hskLevel: "HSK3",
    lessonNumber: 18,
    title: "Bày tỏ quan điểm & Liên kết câu",
    vietnameseTitle: "Bài 18: Tôi tin rằng họ sẽ đồng ý (Bày tỏ quan điểm & Phán đoán)",
    description: "Học cách diễn đạt ý kiến cá nhân với 认为, 相信, 觉得 và các liên từ biểu thị điều kiện (只要...就...).",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_87", "v_hsk3_88", "v_hsk3_89", "v_hsk3_90", "v_hsk3_91"],
    grammarPoints: [
      {
        id: "gp_hsk3_18_1",
        title: "Cặp liên từ điều kiện thiết yếu: 只要……就…… (Chỉ cần... là...)",
        structure: "只要 + Điều kiện đủ, Chủ ngữ + 就 + Kết quả",
        explanation: "Biểu thị chỉ cần có điều kiện này thì ắt sẽ sinh ra kết quả tương ứng.",
        examples: [
          { hanzi: "只要认真准备，就一定能通过考试。", pinyin: "Zhǐyào rènzhēn zhǔnbèi, jiù yídìng néng tōngguò kǎoshì.", vietnamese: "Chỉ cần chuẩn bị nghiêm túc là nhất định có thể vượt qua kỳ thi." },
          { hanzi: "我相信只要我们努力，他们就会同意的。", pinyin: "Wǒ xiāngxìn zhǐyào wǒmen nǔlì, tāmen jiù huì tóngyì de.", vietnamese: "Tôi tin chỉ cần chúng ta nỗ lực, họ sẽ đồng ý thôi." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Học sinh",
        hanzi: "你觉得这次活动方案老师会批准吗？",
        pinyin: "Nǐ juéde zhè cì huódòng fāng'àn lǎoshī huì pīzhǔn ma?",
        vietnamese: "Cậu thấy phương án hoạt động lần này thầy giáo có phê duyệt không?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Học sinh",
        hanzi: "我相信老师会同意的。只要我们把预算和安全措施写清楚就行。",
        pinyin: "Wǒ xiāngxìn lǎoshī huì tóngyì de. Zhǐyào wǒmen bǎ yùsuàn hé ānquán cuòshī xiě qīngchu jiù xíng.",
        vietnamese: "Mình tin thầy sẽ đồng ý thôi. Chỉ cần chúng mình viết rõ ràng dự toán ngân sách và biện pháp an toàn là được."
      }
    ],
    readingPassage: {
      title: "坚持与成功 (Kiên trì và thành công)",
      contentHanzi: "每个人在实现梦想的道路上都会遇到困难。但是只要不放弃，勇敢地克服每一个挑战，就一定能迎来成功的曙光。相信自己是最重要的力量。",
      contentPinyin: "Měi ge rén zài shíxiàn mèngxiǎng de dàolù shang dōu huì yùdào kùnnan. Dànshì zhǐyào bú fàngqì, yǒnggǎn de kèfú měi yí ge tiǎozhàn, jiù yídìng néng yínglái chénggōng de shǔguāng. Xiāngxìn zìjǐ shì zuì zhòngyào de lìliang.",
      contentVietnamese: "Mỗi người trên con đường hiện thực hóa ước mơ đều sẽ gặp phải khó khăn. Nhưng chỉ cần không từ bỏ, dũng cảm vượt qua từng thử thách, nhất định sẽ đón chào ánh bình minh của thành công. Tin tưởng vào bản thân là sức mạnh quan trọng nhất."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l18_1",
        type: "multiple_choice",
        question: "Cặp liên từ nào mang nghĩa 'Chỉ cần... thì...'?",
        options: ["只要……就…… (Zhǐyào... jiù...)", "虽然……但是…… (Suīrán... dànshì...)", "因为……所以…… (Yīnwèi... suǒyǐ...)", "不但……而且…… (Búdàn... érqiě...)"],
        correctAnswer: "只要……就…… (Zhǐyào... jiù...)",
        explanation: "只要...就... là cặp liên từ điều kiện thiết yếu."
      }
    ]
  },
  {
    id: "hsk3_l19",
    hskLevel: "HSK3",
    lessonNumber: 19,
    title: "Bổ ngữ xu hướng mở rộng",
    vietnameseTitle: "Bài 19: Bạn không nhìn ra anh ấy là ai à? (Nghĩa chuyển của 出来 & 起来)",
    description: "Học ý nghĩa trừu tượng và mở rộng của Bổ ngữ xu hướng (出来 = nhận biết/phát hiện, 起来 = bắt đầu và tiếp diễn).",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk3_92", "v_hsk3_93", "v_hsk3_94", "v_hsk3_95", "v_hsk3_96"],
    grammarPoints: [
      {
        id: "gp_hsk3_19_1",
        title: "Ý nghĩa trừu tượng của 出来 (chūlái) & 起来 (qǐlái)",
        structure: "Động từ + 出来 (Nhận diện, phát hiện từ không sang có) | Động từ + 起来 (Bắt đầu và tiếp tục)",
        explanation: "看出 / 听出 / 想出 + 出来: Nhận biết, suy nghĩ ra kết quả. 唱 / 笑 / 聊 + 起来: Bắt đầu tiến hành hành động.",
        examples: [
          { hanzi: "你没看出来他是张老师吗？", pinyin: "Nǐ méi kàn chūlái tā shì Zhāng lǎoshī ma?", vietnamese: "Bạn không nhìn ra ông ấy là thầy Trương à?" },
          { hanzi: "天气暖和起来了。", pinyin: "Tiānqì nuǎnhuo qǐlái le.", vietnamese: "Thời tiết bắt đầu ấm áp lên rồi." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn học",
        hanzi: "你看前边戴墨镜的那个人，你没看出来他是谁吗？",
        pinyin: "Nǐ kàn qiánbian dài mòjìng de nà ge rén, nǐ méi kàn chūlái tā shì shéi ma?",
        vietnamese: "Cậu nhìn người đeo kính râm phía trước kìa, cậu không nhận ra anh ấy là ai à?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn học",
        hanzi: "哎呀！那不是我们高中的班长李华吗？他变化太大了！",
        pinyin: "Āiyā! Nà bú shì wǒmen gāozhōng de bānzhǎng Lǐ Huá ma? Tā biànhuà tài dà le!",
        vietnamese: "Ái chà! Đó chẳng phải là lớp trưởng cấp 3 Lý Hoa của chúng mình sao? Cậu ấy thay đổi nhiều quá!"
      }
    ],
    readingPassage: {
      title: "春天的脚步 (Bước chân mùa xuân)",
      contentHanzi: "三月来了，树木开始发芽，小草也从泥土里长出来了。天气渐渐暖和起来，公园里散步的人多起来了。春天真是一个充满希望的季节。",
      contentPinyin: "Sān yuè lái le, shùmù kāishǐ fāyá, xiǎocǎo yě cóng nítǔ li zhǎng chūlái le. Tiānqì jiànjiàn nuǎnhuo qǐlái, gōngyuán li sànbù de rén duō qǐlái le. Chūntiān zhēn shì yí ge chōngmǎn xīwàng de jìjié.",
      contentVietnamese: "Tháng Ba đã về, cây cối bắt đầu nảy mầm, cỏ non cũng nhú ra từ lòng đất. Thời tiết dần dần ấm áp lên, người đi dạo trong công viên đông dần lên. Mùa xuân thực sự là một mùa tràn đầy hy vọng."
    },
    quizQuestions: [
      {
        id: "q_hsk3_l19_1",
        type: "multiple_choice",
        question: "Cụm từ 'nghe mà nhận ra giọng của ai' trong tiếng Trung là gì?",
        options: ["听出来 (tīng chūlái)", "听起来 (tīng qǐlái)", "听进去 (tīng jìnqu)", "听过来 (tīng guòlái)"],
        correctAnswer: "听出来 (tīng chūlái)",
        explanation: "听出来 nghĩa là nghe và nhận diện được âm thanh/giọng nói của đối tượng."
      }
    ]
  },
  {
    id: "hsk3_l20",
    hskLevel: "HSK3",
    lessonNumber: 20,
    title: "Câu bị động với 被 / 叫 / 让",
    vietnameseTitle: "Bài 20: Tôi bị anh ấy làm cho cảm động (Câu bị động & Tổng kết HSK 3)",
    description: "Nắm vững ngữ pháp Câu bị động (Chủ ngữ + 被/叫/让 + Tác nhân + Động từ + Kết quả) và hoàn thiện 100% năng lực HSK 3.",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk3_97", "v_hsk3_98", "v_hsk3_99", "v_hsk3_100", "v_hsk3_101"],
    grammarPoints: [
      {
        id: "gp_hsk3_20_1",
        title: "Câu bị động: Chủ ngữ + 被 / 叫 / 让 + (Tác nhân gây ra) + Động từ + Bổ ngữ",
        structure: "Chủ ngữ (Chịu tác động) + 被 / 叫 / 让 + (Tác nhân) + V + Thành phần khác",
        explanation: "Dùng để biểu thị chủ ngữ bị chi phối hoặc chịu ảnh hưởng từ một hành động bên ngoài (thường mang lại kết quả không mong muốn hoặc sự cảm động).",
        examples: [
          { hanzi: "我的自行车被弟弟骑走了。", pinyin: "Wǒ de zìxíngchē bèi dìdi qí zǒu le.", vietnamese: "Xe đạp của tôi bị em trai đạp đi mất rồi." },
          { hanzi: "这篇感人的文章让我深深地感动了。", pinyin: "Zhè piān gǎnrén de wénzhāng ràng wǒ shēnshēn de gǎndòng le.", vietnamese: "Bài viết cảm động này đã khiến tôi vô cùng xúc động." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "昨天的电影你看了吗？结局怎么样？",
        pinyin: "Zuótiān de diànyǐng nǐ kàn le ma? Jiéjú zěnmeyàng?",
        vietnamese: "Bộ phim hôm qua bạn xem chưa? Đoạn kết thế nào?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn học",
        hanzi: "看了！主人公为了救朋友不顾一切，我被他深深地感动了，眼泪都流出来了。",
        pinyin: "Kàn le! Zhǔréngōng wèile jiù péngyou búgù yíqiè, wǒ bèi tā shēnshēn de gǎndòng le, yǎnlèi dōu liú chūlái le.",
        vietnamese: "Xem rồi! Nhân vật chính bất chấp tất cả để cứu bạn bè, mình bị anh ấy làm cho cảm động sâu sắc, nước mắt cũng trào ra."
      }
    ],
    readingPassage: {
      title: "HSK三级总结 (Tổng kết năng lực HSK 3)",
      contentHanzi: "完成HSK三级的学习，意味着你已经掌握了600个核心词汇和所有常用句型。你能够完成日常生活、学习和工作中的大部分交际任务。继续加油，向HSK四级迈进！",
      contentPinyin: "Wánchéng HSK sān jí de xuéxí, yìwèizhe nǐ yǐjīng zhǎngwò le liùbǎi ge héxīn cíhuì hé suǒyǒu chángyòng jùxíng. Nǐ nénggòu wánchéng rìcháng shēnghuó, xuéxí hé gōngzuò zhōng de dà bùfen jiāojì rènwù. Jìxù jiāyóu, xiàng HSK sì jí màijìn!",
      contentVietnamese: "Hoàn thành chương trình học HSK cấp 3 đồng nghĩa với việc bạn đã làm chủ 600 từ vựng cốt lõi và tất cả các mẫu câu thông dụng. Bạn có thể hoàn thành hầu hết các tác vụ giao tiếp trong đời sống hàng ngày, học tập và làm việc. Hãy tiếp tục cố gắng tiến lên chinh phục HSK 4!"
    },
    quizQuestions: [
      {
        id: "q_hsk3_l20_1",
        type: "multiple_choice",
        question: "Cấu trúc đúng của câu bị động: 'Chiếc bánh ngọt đã bị mèo ăn mất'",
        options: ["蛋糕被猫吃了 (Dàngāo bèi māo chī le)", "猫被蛋糕吃了 (Māo bèi dàngāo chī le)", "蛋糕把猫吃了 (Dàngāo bǎ māo chī le)", "被蛋糕猫吃了 (Bèi dàngāo māo chī le)"],
        correctAnswer: "蛋糕被猫吃了 (Dàngāo bèi māo chī le)",
        explanation: "Cấu trúc câu bị động: Vật chịu tác động (蛋糕) + 被 + Tác nhân (猫) + Động từ (吃) + 了."
      }
    ]
  }
];
