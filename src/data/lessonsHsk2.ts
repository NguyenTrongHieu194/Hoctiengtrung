import { Lesson } from "../types";

export const HSK2_LESSONS: Lesson[] = [
  {
    id: "hsk2_l1",
    hskLevel: "HSK2",
    lessonNumber: 1,
    title: "Du lịch & Phó từ 最",
    vietnameseTitle: "Bài 1: Đi du lịch Bắc Kinh vào tháng 9 là tốt nhất",
    description: "Học cách nói sở thích du lịch, thời điểm lý tưởng nhất với phó từ chỉ mức độ cao nhất 最 (nhất) và trợ từ ngữ khí 要...了.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk2_01", "v_hsk2_02", "v_hsk2_03", "v_hsk2_04", "v_hsk2_05"],
    grammarPoints: [
      {
        id: "gp_hsk2_1_1",
        title: "Phó từ chỉ mức độ cao nhất: 最 (zuì) - Nhất",
        structure: "最 + Tính từ / Động từ tâm lý",
        explanation: "Dùng để biểu thị mức độ cao nhất trong một phạm vi so sánh.",
        examples: [
          { hanzi: "九月份去北京旅游最好。", pinyin: "Jiǔ yuèfèn qù Běijīng lǚyóu zuì hǎo.", vietnamese: "Đi Bắc Kinh du lịch vào tháng 9 là tốt nhất." },
          { hanzi: "我最喜欢吃中国菜。", pinyin: "Wǒ zuì xǐhuan chī Zhōngguó cài.", vietnamese: "Tôi thích ăn món Trung Quốc nhất." }
        ]
      },
      {
        id: "gp_hsk2_1_2",
        title: "Cấu trúc biểu thị sự sắp xếp / thời cơ: 什么时候……最好",
        structure: "Thời gian + Động từ + 最好",
        explanation: "Dùng để đưa ra lời khuyên hoặc gợi ý về thời điểm tối ưu để thực hiện một việc.",
        examples: [
          { hanzi: "什么时候去爬山最好？", pinyin: "Shénme shíhou qù páshān zuì hǎo?", vietnamese: "Đi leo núi vào khi nào là tốt nhất?" }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn bè",
        hanzi: "阮明，我想去中国旅游，什么时候去最好？",
        pinyin: "Ruǎn Míng, wǒ xiǎng qù Zhōngguó lǚyóu, shénme shíhou qù zuì hǎo?",
        vietnamese: "Nguyễn Minh, tôi muốn đi du lịch Trung Quốc, đi vào khi nào là tốt nhất?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn bè",
        hanzi: "九月去北京旅游最好。九月的北京天气不冷也不热。",
        pinyin: "Jiǔ yuè qù Běijīng lǚyóu zuì hǎo. Jiǔ yuè de Běijīng tiānqì bù lěng yě bú rè.",
        vietnamese: "Tháng 9 đi du lịch Bắc Kinh là tốt nhất. Thời tiết Bắc Kinh tháng 9 không lạnh cũng không nóng."
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn bè",
        hanzi: "你最喜欢北京的什么地方？",
        pinyin: "Nǐ zuì xǐhuan Běijīng de shénme dìfang?",
        vietnamese: "Bạn thích nơi nào của Bắc Kinh nhất?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn bè",
        hanzi: "我最喜欢故宫和长城，非常漂亮！",
        pinyin: "Wǒ zuì xǐhuan Gùgōng hé Chángchéng, fēicháng piàoliang!",
        vietnamese: "Tôi thích nhất là Cố Cung và Vạn Lý Trường Thành, đẹp vô cùng!"
      }
    ],
    readingPassage: {
      title: "北京的秋天 (Mùa thu Bắc Kinh)",
      contentHanzi: "北京的一年四季都很美，但秋天最美。九月和十月的天气最好，天天都是晴天。很多外国朋友喜欢这个时候来北京旅游。",
      contentPinyin: "Běijīng de yì nián sì jì dōu hěn měi, dàn qiūtiān zuì měi. Jiǔ yuè hé shí yuè de tiānqì zuì hǎo, tiāntiān dōu shì qíngtiān. Hěn duō wàiguó péngyou xǐhuan zhè ge shíhou lái Běijīng lǚyóu.",
      contentVietnamese: "Bốn mùa ở Bắc Kinh đều rất đẹp, nhưng mùa thu là đẹp nhất. Thời tiết tháng 9 và tháng 10 là lý tưởng nhất, ngày nào cũng trời nắng đẹp. Rất nhiều bạn bè quốc tế thích đến Bắc Kinh du lịch vào thời điểm này."
    },
    quizQuestions: [
      {
        id: "q_hsk2_l1_1",
        type: "multiple_choice",
        question: "Điền phó từ đúng vào câu: '我_____喜欢学汉语。'",
        options: ["最 (zuì)", "也 (yě)", "不 (bù)", "都 (dōu)"],
        correctAnswer: "最 (zuì)",
        explanation: "最喜欢 là cụm từ diễn tả 'thích nhất'."
      }
    ]
  },
  {
    id: "hsk2_l2",
    hskLevel: "HSK2",
    lessonNumber: 2,
    title: "Thói quen & Vận động",
    vietnameseTitle: "Bài 2: Tôi thức dậy lúc 6 giờ mỗi ngày",
    description: "Học cách nói về thời gian biểu hàng ngày, động từ ly hợp (起床, 跑步, 游泳, 生病) và trạng thái sức khỏe.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk2_06", "v_hsk2_07", "v_hsk2_08", "v_hsk2_09", "v_hsk2_10"],
    grammarPoints: [
      {
        id: "gp_hsk2_2_1",
        title: "Đại từ 每 (měi) - Mỗi / Mọi",
        structure: "每 + (Lượng từ) + Danh từ",
        explanation: "Biểu thị từng cá thể trong một tổng thể. Thường đi kèm phó từ 都 trong vế sau.",
        examples: [
          { hanzi: "我每天早上都跑步。", pinyin: "Wǒ měitiān zǎoshang dōu pǎobù.", vietnamese: "Mỗi sáng tôi đều chạy bộ." },
          { hanzi: "每个星期我都去打球。", pinyin: "Měi ge xīngqī wǒ dōu qù dǎqiú.", vietnamese: "Mỗi tuần tôi đều đi chơi bóng." }
        ]
      },
      {
        id: "gp_hsk2_2_2",
        title: "Động từ ly hợp trong tiếng Trung",
        structure: "Động từ (A) + Tân ngữ kết hợp (B) -> AB",
        explanation: "Các từ như 起床, 跑步, 睡觉, 游泳 là động từ ly hợp, khi chèn từ chỉ số lượng hoặc thời lượng sẽ chèn vào giữa.",
        examples: [
          { hanzi: "跑了半个小时步", pinyin: "pǎo le bàn ge xiǎoshí bù", vietnamese: "chạy bộ nửa tiếng đồng hồ" }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李老师 (Cô Lý)",
        role: "Giáo viên",
        hanzi: "你很少生病，身体真好！平时有什么习惯？",
        pinyin: "Nǐ hěn shǎo shēngbìng, shēntǐ zhēn hǎo! Píngshí yǒu shénme xíguàn?",
        vietnamese: "Em rất ít khi bị ốm, sức khỏe thật tốt! Bình thường em có thói quen gì?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Học sinh",
        hanzi: "我每天早上六点起床，然后去公园跑步半个小时。",
        pinyin: "Wǒ měitiān zǎoshang liù diǎn qǐchuáng, ránhòu qù gōngyuán pǎobù bàn ge xiǎoshí.",
        vietnamese: "Mỗi sáng em thức dậy lúc 6 giờ, sau đó đến công viên chạy bộ nửa tiếng."
      },
      {
        speaker: "李老师 (Cô Lý)",
        role: "Giáo viên",
        hanzi: "晚上几点睡觉呢？",
        pinyin: "Wǎnshang jǐ diǎn shuìjiào ne?",
        vietnamese: "Buổi tối mấy giờ thì em đi ngủ?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Học sinh",
        hanzi: "我每天晚上十点睡觉，不熬夜。",
        pinyin: "Wǒ měitiān wǎnshang shí diǎn shuìjiào, bù áoyè.",
        vietnamese: "Em đi ngủ lúc 10 giờ tối mỗi ngày, không thức khuya."
      }
    ],
    readingPassage: {
      title: "健康的生活 (Cuộc sống khỏe mạnh)",
      contentHanzi: "大卫每天早上都起得很早。他先喝一杯温水，然后去外面跑步。运动让他身体健康，学习也很有精神。",
      contentPinyin: "Dàwèi měitiān zǎoshang dōu qǐ de hěn zǎo. Tā xiān hē yì bēi wēnshuǐ, ránhòu qù wàimiàn pǎobù. Yùndòng ràng tā shēntǐ jiànkāng, xuéxí yě hěn yǒu jīngshén.",
      contentVietnamese: "David mỗi sáng đều dậy rất sớm. Cậu ấy uống một cốc nước ấm trước, sau đó ra ngoài chạy bộ. Vận động giúp cơ thể cậu ấy khỏe mạnh, học tập cũng rất tỉnh táo nhiều năng lượng."
    },
    quizQuestions: [
      {
        id: "q_hsk2_l2_1",
        type: "multiple_choice",
        question: "Từ nào đồng nghĩa với 'bị ốm / bị bệnh'?",
        options: ["生病 (shēngbìng)", "起床 (qǐchuáng)", "跑步 (pǎobù)", "休息 (xiūxi)"],
        correctAnswer: "生病 (shēngbìng)",
        explanation: "生病 nghĩa là bị ốm, mắc bệnh."
      }
    ]
  },
  {
    id: "hsk2_l3",
    hskLevel: "HSK2",
    lessonNumber: 3,
    title: "Màu sắc & Phương vị",
    vietnameseTitle: "Bài 3: Cái màu đỏ bên trái là của tôi",
    description: "Học cách sử dụng phương vị từ (左边, 右边, 旁边), phân biệt màu sắc và kết cấu chữ 的 thay thế danh từ.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk2_11", "v_hsk2_12", "v_hsk2_13", "v_hsk2_14", "v_hsk2_15"],
    grammarPoints: [
      {
        id: "gp_hsk2_3_1",
        title: "Kết cấu chữ 的 (de) đóng vai trò như một danh từ",
        structure: "Tính từ / Đại từ / Động từ + 的",
        explanation: "Dùng để thay thế cho một danh từ đã được nhắc tới trước đó để tránh lặp từ.",
        examples: [
          { hanzi: "哪辆自行车是你的？ - 红色的是我的。", pinyin: "Nǎ liàng zìxíngchē shì nǐ de? - Hóngsè de shì wǒ de.", vietnamese: "Chiếc xe đạp nào là của bạn? - Chiếc màu đỏ là của tôi." }
        ]
      },
      {
        id: "gp_hsk2_3_2",
        title: "Phương vị từ: 左边 (trái), 右边 (phải), 旁边 (bên cạnh)",
        structure: "Danh từ + 的 + Phương vị từ HOẶC Phương vị từ + 的 + Danh từ",
        explanation: "Xác định phương hướng vị trí của vật hoặc người.",
        examples: [
          { hanzi: "左边那个人是谁？", pinyin: "Zuǒbian nà ge rén shì shéi?", vietnamese: "Người bên trái kia là ai?" },
          { hanzi: "学校旁边有一家书店。", pinyin: "Xuéxiào pángbiān yǒu yì jiā shūdiàn.", vietnamese: "Bên cạnh trường học có một hiệu sách." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "张伟 (Trương Vĩ)",
        role: "Đồng nghiệp",
        hanzi: "这些杯子都很好看，哪个是你的？",
        pinyin: "Zhèxiē bēizi dōu hěn hǎokàn, nǎge shì nǐ de?",
        vietnamese: "Những chiếc cốc này đều rất đẹp, cái nào là của bạn?"
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Đồng nghiệp",
        hanzi: "左边那个红色的是我的，右边那个黑色的是李华的。",
        pinyin: "Zuǒbian nàge hóngsè de shì wǒ de, yòubian nàge hēisè de shì Lǐ Huá de.",
        vietnamese: "Cái màu đỏ bên trái là của tôi, cái màu đen bên phải là của Lý Hoa."
      },
      {
        speaker: "张伟 (Trương Vĩ)",
        role: "Đồng nghiệp",
        hanzi: "旁边那个白色的呢？",
        pinyin: "Pángbiān nàge báisè de ne?",
        vietnamese: "Thế còn cái màu trắng bên cạnh thì sao?"
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Đồng nghiệp",
        hanzi: "那是张老师新买的。",
        pinyin: "Nà shì Zhāng lǎoshī xīn mǎi de.",
        vietnamese: "Đó là cái cô Trương mới mua."
      }
    ],
    readingPassage: {
      title: "我的房间 (Phòng của tôi)",
      contentHanzi: "我的房间不大，但是很干净。床在房间的左边，桌子在右边。桌子上放着一台电脑和几本书。桌子旁边是一把椅子。",
      contentPinyin: "Wǒ de fángjiān bú dà, dànshì hěn gānjìng. Chuáng zài fángjiān de zuǒbian, zhuōzi zài yòubian. Zhuōzi shang fàng zhe yì tái diànnǎo hé jǐ běn shū. Zhuōzi pángbiān shì yì bǎ yǐzi.",
      contentVietnamese: "Phòng của tôi không lớn, nhưng rất sạch sẽ. Giường nằm ở bên trái căn phòng, bàn ở bên phải. Trên bàn để một chiếc máy tính và vài cuốn sách. Bên cạnh bàn là một chiếc ghế."
    },
    quizQuestions: [
      {
        id: "q_hsk2_l3_1",
        type: "multiple_choice",
        question: "Từ nào biểu thị vị trí 'bên phải'?",
        options: ["右边 (yòubian)", "左边 (zuǒbian)", "旁边 (pángbiān)", "前面 (qiánmiàn)"],
        correctAnswer: "右边 (yòubian)",
        explanation: "右边 là bên phải, 左边 là bên trái."
      }
    ]
  },
  {
    id: "hsk2_l4",
    hskLevel: "HSK2",
    lessonNumber: 4,
    title: "Giới từ 帮 & 给",
    vietnameseTitle: "Bài 4: Công việc này là anh ấy giới thiệu giúp tôi",
    description: "Học cách dùng giới từ 帮 (giúp), 给 (cho/gửi), cấu trúc 是...的 nhấn mạnh người thực hiện hành động.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk2_16", "v_hsk2_17", "v_hsk2_18", "v_hsk2_19", "v_hsk2_20"],
    grammarPoints: [
      {
        id: "gp_hsk2_4_1",
        title: "Giới từ: 帮 (bāng) & 给 (gěi) - Giúp ai làm gì / Làm gì cho ai",
        structure: "帮 / 给 + Người nhận + Động từ + Tân ngữ",
        explanation: "帮 biểu thị giúp đỡ ai thực hiện hành động, 给 biểu thị đối tượng nhận hành động.",
        examples: [
          { hanzi: "他帮我介绍了一份工作。", pinyin: "Tā bāng wǒ jièshào le yí fèn gōngzuò.", vietnamese: "Anh ấy đã giúp tôi giới thiệu một công việc." },
          { hanzi: "请给我打电话。", pinyin: "Qǐng gěi wǒ dǎ diànhuà.", vietnamese: "Xin hãy gọi điện thoại cho tôi." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn bè",
        hanzi: "阮明，你在新公司工作得怎么样？",
        pinyin: "Ruǎn Míng, nǐ zài xīn gōngsī gōngzuò de zěnmeyàng?",
        vietnamese: "Nguyễn Minh, bạn làm việc ở công ty mới thế nào rồi?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Nhân viên",
        hanzi: "挺好的！同事们都非常热情。",
        pinyin: "Tǐng hǎo de! Tóngshìmen dōu fēicháng rèqíng.",
        vietnamese: "Khá tốt! Các đồng nghiệp đều vô cùng nhiệt tình."
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn bè",
        hanzi: "你是怎么找到这份工作的？",
        pinyin: "Nǐ shì zěnme zhǎodào zhè fèn gōngzuò de?",
        vietnamese: "Bạn tìm được công việc này như thế nào vậy?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Nhân viên",
        hanzi: "这个工作是我大学同学王明帮我介绍的。",
        pinyin: "Zhège gōngzuò shì wǒ dàxué tóngxué Wáng Míng bāng wǒ jièshào de.",
        vietnamese: "Công việc này là bạn học đại học Vương Minh đã giới thiệu giúp tôi đấy."
      }
    ],
    readingPassage: {
      title: "热心的朋友 (Người bạn nhiệt tình)",
      contentHanzi: "王明是我的好朋友。我刚来北京的时候，他帮我找房子，帮我买手机卡。他还常常给我介绍中国文化。",
      contentPinyin: "Wáng Míng shì wǒ de hǎo péngyou. Wǒ gāng lái Běijīng de shíhou, tā bāng wǒ zhǎo fángzi, bāng wǒ mǎi shǒujīkǎ. Tā hái chángcháng gěi wǒ jièshào Zhōngguó wénhuà.",
      contentVietnamese: "Vương Minh là bạn tốt của tôi. Khi tôi mới đến Bắc Kinh, cậu ấy giúp tôi tìm nhà, giúp tôi mua sim điện thoại. Cậu ấy còn thường xuyên giới thiệu văn hóa Trung Quốc cho tôi."
    },
    quizQuestions: [
      {
        id: "q_hsk2_l4_1",
        type: "multiple_choice",
        question: "Dịch câu: 'Xin hãy gọi điện thoại cho tôi'?",
        options: ["请给我打电话 (Qǐng gěi wǒ dǎ diànhuà)", "请帮我打电话 (Qǐng bāng wǒ dǎ diànhuà)", "请对我打电话 (Qǐng duì wǒ dǎ diànhuà)", "请打电话我 (Qǐng dǎ diànhuà wǒ)"],
        correctAnswer: "请给我打电话 (Qǐng gěi wǒ dǎ diànhuà)",
        explanation: "给 + Ai + 打电话 là cấu trúc chuẩn để nói gọi điện cho ai."
      }
    ]
  },
  {
    id: "hsk2_l5",
    hskLevel: "HSK2",
    lessonNumber: 5,
    title: "Mua sắm & Phó từ 就 / 吧",
    vietnameseTitle: "Bài 5: Cứ mua chiếc này đi nhé",
    description: "Học cách quyết định nhanh với phó từ 就, trợ từ ngữ khí đề xuất 吧, lượng từ trang phục 件 (áo) và 条 (quần/váy).",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk2_21", "v_hsk2_22", "v_hsk2_23", "v_hsk2_24", "v_hsk2_25"],
    grammarPoints: [
      {
        id: "gp_hsk2_5_1",
        title: "Phó từ 就 (jiù) biểu thị quyết định nhanh chóng hoặc nhấn mạnh",
        structure: "就 + Động từ + Tân ngữ + 吧",
        explanation: "Biểu thị sự quả quyết, không cần đắn đo suy nghĩ nhiều nữa.",
        examples: [
          { hanzi: "就买这件吧！", pinyin: "Jiù mǎi zhè jiàn ba!", vietnamese: "Cứ mua chiếc này đi!" },
          { hanzi: "我们明天就去。", pinyin: "Wǒmen míngtiān jiù qù.", vietnamese: "Ngày mai chúng ta đi luôn." }
        ]
      },
      {
        id: "gp_hsk2_5_2",
        title: "Phân biệt lượng từ trang phục: 件 (jiàn) vs 条 (tiáo)",
        structure: "一件衣服 / 衬衫 / 大衣 | 一条裤子 / 裙子",
        explanation: "件 dùng cho áo và đồ mặc thân trên. 条 dùng cho quần, váy hoặc đồ dài thon.",
        examples: [
          { hanzi: "我想试一下这件衬衫和这条裙子。", pinyin: "Wǒ xiǎng shì yíxià zhè jiàn chènshān hé zhè tiáo qúnzi.", vietnamese: "Tôi muốn thử chiếc áo sơ mi này và chiếc váy này." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "顾客 (Khách hàng)",
        role: "Khách mua",
        hanzi: "这件红色的衣服有点儿贵，那件绿色的怎么样？",
        pinyin: "Zhè jiàn hóngsè de yīfu yǒudiǎnr guì, nà jiàn lǜsè de zěnmeyàng?",
        vietnamese: "Chiếc áo màu đỏ này hơi đắt, chiếc màu xanh lục kia thì sao?"
      },
      {
        speaker: "售货员 (Nhân viên)",
        role: "Bán hàng",
        hanzi: "这件绿色的正在打折，只要一百块，颜色也很适合您。",
        pinyin: "Zhè jiàn lǜsè de zhèngzài dǎzhé, zhǐ yào yìbǎi kuài, yánsè yě hěn shìhé nín.",
        vietnamese: "Chiếc màu xanh này đang giảm giá, chỉ có 100 tệ, màu sắc cũng rất hợp với chị."
      },
      {
        speaker: "顾客 (Khách hàng)",
        role: "Khách mua",
        hanzi: "好，就买这件吧！",
        pinyin: "Hǎo, jiù mǎi zhè jiàn ba!",
        vietnamese: "Được, cứ mua chiếc này đi!"
      }
    ],
    readingPassage: {
      title: "商场购物 (Mua sắm ở trung tâm thương mại)",
      contentHanzi: "周末我和姐姐去买衣服。姐姐试了两条裤子和一件衬衫。那件白衬衫又好看又便宜，姐姐就买了那件。",
      contentPinyin: "Zhōumò wǒ hé jiějie qù mǎi yīfu. Jiějie shì le liǎng tiáo kùzi hé yí jiàn chènshān. Nà jiàn bái chènshān yòu hǎokàn yòu piányi, jiějie jiù mǎi le nà jiàn.",
      contentVietnamese: "Cuối tuần tôi cùng chị gái đi mua quần áo. Chị gái đã thử hai chiếc quần và một chiếc áo sơ mi. Chiếc sơ mi trắng kia vừa đẹp vừa rẻ, chị gái quyết định mua luôn chiếc đó."
    },
    quizQuestions: [
      {
        id: "q_hsk2_l5_1",
        type: "multiple_choice",
        question: "Lượng từ chính xác để điền vào: '一_____裤子 (một chiếc quần)' là gì?",
        options: ["条 (tiáo)", "件 (jiàn)", "本 (běn)", "个 (gè)"],
        correctAnswer: "条 (tiáo)",
        explanation: "Quần (裤子) dùng lượng từ 条."
      }
    ]
  },
  {
    id: "hsk2_l6",
    hskLevel: "HSK2",
    lessonNumber: 6,
    title: "Nguyên nhân & Biến đổi 了",
    vietnameseTitle: "Bài 6: Sao bạn không ăn nữa? (Hỏi lý do & sự thay đổi)",
    description: "Học cách dùng 怎么 để hỏi nguyên nhân (tại sao/sao lại), chữ 了 ở cuối câu chỉ sự thay đổi trạng thái.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk2_26", "v_hsk2_27", "v_hsk2_28", "v_hsk2_29", "v_hsk2_30"],
    grammarPoints: [
      {
        id: "gp_hsk2_6_1",
        title: "Đại từ 怎么 (zěnme) dùng để hỏi nguyên nhân / lý do",
        structure: "Chủ ngữ + 怎么 + Phủ định (不/没) + Động từ?",
        explanation: "Dùng để hỏi tại sao sự việc lại xảy ra như vậy (mang sắc thái ngạc nhiên nhẹ).",
        examples: [
          { hanzi: "你怎么不吃了？", pinyin: "Nǐ zěnme bù chī le?", vietnamese: "Sao bạn không ăn nữa vậy?" },
          { hanzi: "他今天怎么没来？", pinyin: "Tā jīntiān zěnme méi lái?", vietnamese: "Sao hôm nay anh ấy không đến?" }
        ]
      },
      {
        id: "gp_hsk2_6_2",
        title: "Trợ từ ngữ khí 了 (le) biểu thị sự thay đổi trạng thái mới",
        structure: "Câu trần thuật / Tính từ + 了",
        explanation: "Diễn tả trước đây không như vậy, nay đã nảy sinh trạng thái mới (đã no rồi, đã lạnh rồi).",
        examples: [
          { hanzi: "我饱了。", pinyin: "Wǒ bǎo le.", vietnamese: "Tôi no rồi (trước đó đói, giờ no)." },
          { hanzi: "天气冷了。", pinyin: "Tiānqì lěng le.", vietnamese: "Thời tiết đã trở lạnh rồi." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "妈妈 (Mẹ)",
        role: "Gia đình",
        hanzi: "今天的鱼和羊肉都很好吃，你怎么不吃了？",
        pinyin: "Jīntiān de yú hé yángròu dōu hěn hǎochī, nǐ zěnme bù chī le?",
        vietnamese: "Cá và thịt cừu hôm nay đều rất ngon, sao con không ăn nữa?"
      },
      {
        speaker: "儿子 (Con trai)",
        role: "Gia đình",
        hanzi: "我吃饱了，真的吃不下了。",
        pinyin: "Wǒ chī bǎo le, zhēnde chī bu xià le.",
        vietnamese: "Con ăn no rồi, thực sự không ăn thêm được nữa."
      },
      {
        speaker: "妈妈 (Mẹ)",
        role: "Gia đình",
        hanzi: "那喝一杯西瓜汁吧！",
        pinyin: "Nà hē yì bēi xīguāzhī ba!",
        vietnamese: "Thế thì uống một cốc nước ép dưa hấu nhé!"
      },
      {
        speaker: "儿子 (Con trai)",
        role: "Gia đình",
        hanzi: "好的，谢谢妈妈！",
        pinyin: "Hǎo de, xièxie māma!",
        vietnamese: "Vâng ạ, cảm ơn mẹ!"
      }
    ],
    readingPassage: {
      title: "吃晚饭 (Bữa cơm tối)",
      contentHanzi: "今天妈妈做了很多好吃的菜：有鸡蛋、牛肉和面条。我和爸爸吃得很饱。吃完饭后，我们一起在客厅喝茶聊聊天。",
      contentPinyin: "Jīntiān māma zuò le hěn duō hǎochī de cài: yǒu jīdàn, niúròu hé miàntiáo. Wǒ hé bàba chī de hěn bǎo. Chī wán fàn hòu, wǒmen yìqǐ zài kètīng hē chá liáoliáo tiān.",
      contentVietnamese: "Hôm nay mẹ nấu rất nhiều món ngon: có trứng gà, thịt bò và mì sợi. Tôi và bố đều ăn rất no. Sau khi ăn cơm xong, cả nhà cùng ngồi ở phòng khách uống trà nói chuyện."
    },
    quizQuestions: [
      {
        id: "q_hsk2_l6_1",
        type: "multiple_choice",
        question: "Từ nào trong tiếng Trung có nghĩa là 'ăn no'?",
        options: ["吃饱 (chī bǎo)", "好吃 (hǎochī)", "不吃 (bù chī)", "少吃 (shǎo chī)"],
        correctAnswer: "吃饱 (chī bǎo)",
        explanation: "饱 nghĩa là no, 吃饱 là ăn no."
      }
    ]
  },
  {
    id: "hsk2_l7",
    hskLevel: "HSK2",
    lessonNumber: 7,
    title: "Khoảng cách & Giới từ 离",
    vietnameseTitle: "Bài 7: Nhà bạn cách công ty có xa không? (Khoảng cách & Phương tiện)",
    description: "Học cách dùng giới từ 离 (cách), tính từ 远 (xa) và 近 (gần), hỏi thời gian đi lại (多长时间).",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk2_31", "v_hsk2_32", "v_hsk2_33", "v_hsk2_34", "v_hsk2_35"],
    grammarPoints: [
      {
        id: "gp_hsk2_7_1",
        title: "Giới từ 离 (lí) biểu thị khoảng cách không gian hoặc thời gian",
        structure: "Địa điểm A + 离 + Địa điểm B + 很远 / 很近 / 有……公里",
        explanation: "Dùng để đo lường hoặc miêu tả cự ly giữa hai địa điểm.",
        examples: [
          { hanzi: "我家离公司很近。", pinyin: "Wǒ jiā lí gōngsī hěn jìn.", vietnamese: "Nhà tôi cách công ty rất gần." },
          { hanzi: "学校离机场远不远？", pinyin: "Xuéxiào lí jīchǎng yuǎn bù yuǎn?", vietnamese: "Trường học cách sân bay có xa không?" }
        ]
      },
      {
        id: "gp_hsk2_7_2",
        title: "Hỏi thời lượng: 多长时间 (duō cháng shíjiān)",
        structure: "Động từ + (Cần) + 多长时间？",
        explanation: "Dùng để hỏi một hành trình hoặc hành động tốn bao nhiêu thời gian.",
        examples: [
          { hanzi: "坐公共汽车要多长时间？ - 二十分钟。", pinyin: "Zuò gōnggòng qìchē yào duō cháng shíjiān? - Èrshí fēnzhōng.", vietnamese: "Đi xe buýt mất bao lâu? - 20 phút." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Đồng nghiệp",
        hanzi: "阮明，你家离公司远吗？",
        pinyin: "Ruǎn Míng, nǐ jiā lí gōngsī yuǎn ma?",
        vietnamese: "Nguyễn Minh, nhà bạn cách công ty xa không?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Đồng nghiệp",
        hanzi: "不远，离公司只有两公里。",
        pinyin: "Bù yuǎn, lí gōngsī zhǐ yǒu liǎng gōnglǐ.",
        vietnamese: "Không xa, cách công ty chỉ có 2 km thôi."
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Đồng nghiệp",
        hanzi: "你每天怎么去上班？坐车要多长时间？",
        pinyin: "Nǐ měitiān zěnme qù shàngbān? Zuòchē yào duō cháng shíjiān?",
        vietnamese: "Mỗi ngày bạn đi làm bằng phương tiện gì? Đi xe mất bao lâu?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Đồng nghiệp",
        hanzi: "我每天骑自行车去，十分钟就到了。",
        pinyin: "Wǒ měitiān qí zìxíngchē qù, shí fēnzhōng jiù dào le.",
        vietnamese: "Mỗi ngày tôi đạp xe đạp đi, 10 phút là tới rồi."
      }
    ],
    readingPassage: {
      title: "上班的路 (Đường đi làm)",
      contentHanzi: "王明的家离公司比较远，坐地铁需要四十五分钟。他每天早上七点就得出门。虽然有点儿累，但他觉得坐地铁很方便。",
      contentPinyin: "Wáng Míng de jiā lí gōngsī bǐjiào yuǎn, zuò dìtiě xūyào sìshíwǔ fēnzhōng. Tā měitiān zǎoshang qī diǎn jiù děi chūmén. Suīrán yǒudiǎnr lèi, dàn tā juéde zuò dìtiě hěn fāngbiàn.",
      contentVietnamese: "Nhà của Vương Minh khá xa công ty, đi tàu điện ngầm cần 45 phút. Cậu ấy 7 giờ sáng mỗi ngày đã phải ra khỏi cửa. Tuy có chút mệt mỏi nhưng cậu ấy thấy đi tàu điện ngầm rất thuận tiện."
    },
    quizQuestions: [
      {
        id: "q_hsk2_l7_1",
        type: "multiple_choice",
        question: "Cấu trúc đúng của câu 'Nhà tôi cách trường học rất gần' là gì?",
        options: ["我家离学校很近 (Wǒ jiā lí xuéxiào hěn jìn)", "我家在学校很近 (Wǒ jiā zài xuéxiào hěn jìn)", "我家从学校很近 (Wǒ jiā cóng xuéxiào hěn jìn)", "我家给学校很近 (Wǒ jiā gěi xuéxiào hěn jìn)"],
        correctAnswer: "我家离学校很近 (Wǒ jiā lí xuéxiào hěn jìn)",
        explanation: "Cấu trúc khoảng cách: A + 离 + B + 很近/很远."
      }
    ]
  },
  {
    id: "hsk2_l8",
    hskLevel: "HSK2",
    lessonNumber: 8,
    title: "Câu kiêm ngữ 让 & Trùng điệp",
    vietnameseTitle: "Bài 8: Để tôi suy nghĩ rồi nói cho bạn biết nhé",
    description: "Học câu sai khiến kiêm ngữ với 让 / 叫 (bảo, để, cho phép), hình thức lặp lại động từ (想想, 看看) và phó từ 再 (sau đó mới).",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk2_36", "v_hsk2_37", "v_hsk2_38", "v_hsk2_39", "v_hsk2_40"],
    grammarPoints: [
      {
        id: "gp_hsk2_8_1",
        title: "Câu kiêm ngữ với động từ sai khiến: 让 (ràng) / 叫 (jiào)",
        structure: "Chủ ngữ + 让 / 叫 + Đối tượng + Động từ",
        explanation: "让/叫 có nghĩa là bảo, để, yêu cầu ai làm một việc gì đó.",
        examples: [
          { hanzi: "让我想想。", pinyin: "Ràng wǒ xiǎngxīang.", vietnamese: "Để tôi suy nghĩ một chút." },
          { hanzi: "老师叫大家回答问题。", pinyin: "Lǎoshī jiào dàjiā huídá wèntí.", vietnamese: "Thầy giáo bảo mọi người trả lời câu hỏi." }
        ]
      },
      {
        id: "gp_hsk2_8_2",
        title: "Hình thức trùng điệp động từ đơn âm tiết: AA hoặc A一A",
        structure: "想 -> 想想 / 想一想 | 看 -> 看看 / 看一看",
        explanation: "Biểu thị hành động diễn ra trong thời gian ngắn, mang sắc thái nhẹ nhàng, thử làm.",
        examples: [
          { hanzi: "请你等一等。", pinyin: "Qǐng nǐ děng yì děng.", vietnamese: "Xin bạn đợi một chút." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "大卫 (David)",
        role: "Bạn học",
        hanzi: "阮明，这个周末我们一起去爬山，好吗？",
        pinyin: "Ruǎn Míng, zhège zhōumò wǒmen yìqǐ qù páshān, hǎo ma?",
        vietnamese: "Nguyễn Minh, cuối tuần này chúng mình cùng đi leo núi nhé?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn học",
        hanzi: "周末我可能要复习考试，让我想想再告诉你吧。",
        pinyin: "Zhōumò wǒ kěnéng yào fùxí kǎoshì, ràng wǒ xiǎngxīang zài gàosu nǐ ba.",
        vietnamese: "Cuối tuần có thể mình phải ôn thi, để mình nghĩ một lát rồi báo lại cho bạn nhé."
      },
      {
        speaker: "大卫 (David)",
        role: "Bạn học",
        hanzi: "好的，你明天给我发微信就行。",
        pinyin: "Hǎo de, nǐ míngtiān gěi wǒ fā Wēixìn jiù xíng.",
        vietnamese: "Được rồi, ngày mai cậu gửi WeChat cho mình là được."
      }
    ],
    readingPassage: {
      title: "做决定 (Đưa ra quyết định)",
      contentHanzi: "遇到重要的事情，不要着急做决定。你可以多问问朋友，多想想，然后再做决定。这样不容易做错事。",
      contentPinyin: "Yùdào zhòngyào de shìqing, bú yào zháojí zuò juédìng. Nǐ kěyǐ duō wènwen péngyou, duō xiǎngxīang, ránhòu zài zuò juédìng. Zhèyàng bù róngyì zuò cuò shì.",
      contentVietnamese: "Khi gặp việc quan trọng, đừng vội vàng đưa ra quyết định. Bạn có thể hỏi bạn bè nhiều hơn, suy nghĩ kỹ hơn rồi mới quyết định. Như vậy sẽ không dễ mắc sai lầm."
    },
    quizQuestions: [
      {
        id: "q_hsk2_l8_1",
        type: "multiple_choice",
        question: "Từ nào đồng nghĩa với 'bảo ai đó làm gì' trong câu kiêm ngữ?",
        options: ["让 (ràng)", "给 (gěi)", "比 (bǐ)", "往 (wǎng)"],
        correctAnswer: "让 (ràng)",
        explanation: "让 là động từ kiêm ngữ mang nghĩa để cho, bảo ai làm gì."
      }
    ]
  },
  {
    id: "hsk2_l9",
    hskLevel: "HSK2",
    lessonNumber: 9,
    title: "Bổ ngữ kết quả 完 / 懂 / 好",
    vietnameseTitle: "Bài 9: Đề nhiều quá, tôi chưa làm xong (Bổ ngữ kết quả)",
    description: "Nắm vững ngữ pháp Bổ ngữ kết quả (Động từ + 完/好/懂/见/错) để miêu tả kết quả đạt được của hành động.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk2_41", "v_hsk2_42", "v_hsk2_43", "v_hsk2_44", "v_hsk2_45"],
    grammarPoints: [
      {
        id: "gp_hsk2_9_1",
        title: "Bổ ngữ kết quả: Động từ + 完 (xong) / 懂 (hiểu) / 好 (xong/tốt)",
        structure: "Động từ + 完 / 懂 / 好 / 见 + Tân ngữ",
        explanation: "Bổ ngữ kết quả đặt ngay sau động từ để chỉ hành động đã hoàn tất hoặc đạt đến kết quả nhất định. Phủ định dùng 没.",
        examples: [
          { hanzi: "我做完作业了。", pinyin: "Wǒ zuò wán zuòyè le.", vietnamese: "Tôi làm xong bài tập rồi." },
          { hanzi: "你听懂老师的话了吗？ - 听懂了。", pinyin: "Nǐ tīng dǒng lǎoshī de huà le ma? - Tīng dǒng le.", vietnamese: "Bạn nghe hiểu lời thầy giáo chưa? - Nghe hiểu rồi." },
          { hanzi: "饭做好了，快来吃吧！", pinyin: "Fàn zuò hǎo le, kuài lái chī ba!", vietnamese: "Cơm nấu xong rồi, mau lại ăn đi!" }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "今天的汉语考试你觉得难不难？",
        pinyin: "Jīntiān de Hànyǔ kǎoshì nǐ juéde nán bu nán?",
        vietnamese: "Bài thi tiếng Trung hôm nay bạn thấy có khó không?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn học",
        hanzi: "听力部分我都听懂了，但是阅读题太多，我没做完。",
        pinyin: "Tīnglì bùfen wǒ dōu tīng dǒng le, dànshì yuèdú tí tài duō, wǒ méi zuò wán.",
        vietnamese: "Phần nghe tôi đều nghe hiểu, nhưng câu đọc hiểu nhiều quá, tôi chưa làm xong."
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "没关系，下次抓紧时间就行。",
        pinyin: "Méi guānxi, xià cì zhuājǐn shíjiān jiù xíng.",
        vietnamese: "Không sao đâu, lần sau khẩn trương tận dụng thời gian là được."
      }
    ],
    readingPassage: {
      title: "准备考试 (Chuẩn bị kỳ thi)",
      contentHanzi: "明天有汉语二级考试。大卫今天把所有生词都复习好了，练习题也都做完了。他相信自己明天一定能考好。",
      contentPinyin: "Míngtiān yǒu Hànyǔ èr jí kǎoshì. Dàwèi jīntiān bǎ suǒyǒu shēngcí dōu fùxí hǎo le, liànxítí yě dōu zuò wán le. Tā xiāngxìn zìjǐ míngtiān yídìng néng kǎo hǎo.",
      contentVietnamese: "Ngày mai có kỳ thi HSK cấp 2. David hôm nay đã ôn tập kỹ càng toàn bộ từ mới, các bài tập luyện thi cũng đã làm xong hết rồi. Cậu ấy tin rằng ngày mai mình nhất định sẽ thi tốt."
    },
    quizQuestions: [
      {
        id: "q_hsk2_l9_1",
        type: "multiple_choice",
        question: "Phủ định của '我做完作业了' là gì?",
        options: ["我没做完作业 (Wǒ méi zuò wán zuòyè)", "我不做完作业 (Wǒ bú zuò wán zuòyè)", "我没做作业完 (Wǒ méi zuò zuòyè wán)", "我做不完作业了 (Wǒ zuò bu wán zuòyè le)"],
        correctAnswer: "我没做完作业 (Wǒ méi zuò wán zuòyè)",
        explanation: "Phủ định bổ ngữ kết quả dùng 没 + Động từ + Bổ ngữ (và bỏ 了)."
      }
    ]
  },
  {
    id: "hsk2_l10",
    hskLevel: "HSK2",
    lessonNumber: 10,
    title: "Phó từ cấm đoán 别 / 不要",
    vietnameseTitle: "Bài 10: Đừng tìm nữa, điện thoại ở trên bàn kìa",
    description: "Học cách khuyên can, cấm đoán với 别 (đừng) và 不要, tìm kiếm đồ vật bị thất lạc (找, 帮助).",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk2_46", "v_hsk2_47", "v_hsk2_48", "v_hsk2_49", "v_hsk2_50"],
    grammarPoints: [
      {
        id: "gp_hsk2_10_1",
        title: "Phó từ cấm đoán / khuyên nhủ: 别 (bié) / 不要 (bú yào) - Đừng / Không được",
        structure: "别 / 不要 + Động từ + (Tân ngữ) + (了)",
        explanation: "Dùng để khuyên bảo hoặc cấm ai đó không nên làm một việc gì.",
        examples: [
          { hanzi: "别说话了！", pinyin: "Bié shuōhuà le!", vietnamese: "Đừng nói chuyện nữa!" },
          { hanzi: "不要看电视了，快去睡觉。", pinyin: "Bú yào kàn diànshì le, kuài qù shuìjiào.", vietnamese: "Đừng xem tivi nữa, mau đi ngủ đi." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn bè",
        hanzi: "你看见我的手机了吗？我怎么找不到了？",
        pinyin: "Nǐ kànjiàn wǒ de shǒujī le ma? Wǒ zěnme zhǎo bú dào le?",
        vietnamese: "Bạn có nhìn thấy điện thoại của tôi không? Sao tôi tìm mãi không thấy?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn bè",
        hanzi: "别找了！手机在桌子上的书下面呢。",
        pinyin: "Bié zhǎo le! Shǒujī zài zhuōzi shang de shū xiàmiàn ne.",
        vietnamese: "Đừng tìm nữa! Điện thoại ở dưới quyển sách trên bàn kìa."
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn bè",
        hanzi: "哎呀，找到了！太谢谢你了！",
        pinyin: "Āiyā, zhǎodào le! Tài xièxie nǐ le!",
        vietnamese: "Ái chà, tìm thấy rồi! Cảm ơn bạn nhiều nhé!"
      }
    ],
    readingPassage: {
      title: "找东西 (Tìm đồ)",
      contentHanzi: "大卫在房间里找钥匙。他找了沙发上、床底下，都没找到。后来妈妈在门旁边找到了钥匙。妈妈对他说：'以后别乱放东西了。'",
      contentPinyin: "Dàwèi zài fángjiān li zhǎo yàoshi. Tā zhǎo le shāfā shang, chuáng dǐxia, dōu méi zhǎodào. Hòulái māma zài mén pángbiān zhǎodào le yàoshi. Māma duì tā shuō: 'Yǐhòu bié luàn fàng dōngxi le.'",
      contentVietnamese: "David đang tìm chìa khóa trong phòng. Cậu ấy tìm trên ghế sofa, dưới gầm giường, đều không tìm thấy. Sau đó mẹ tìm thấy chìa khóa ở ngay bên cạnh cửa. Mẹ nói với cậu: 'Sau này đừng để đồ đạc lung tung nữa nhé.'"
    },
    quizQuestions: [
      {
        id: "q_hsk2_l10_1",
        type: "multiple_choice",
        question: "Chọn câu có nghĩa 'Đừng lo lắng, có tôi ở đây':",
        options: ["别担心，有我在 (Bié dānxīn, yǒu wǒ zài)", "不担心，有我在 (Bù dānxīn, yǒu wǒ zài)", "没担心，有我在 (Méi dānxīn, yǒu wǒ zài)", "很担心，有我在 (Hěn dānxīn, yǒu wǒ zài)"],
        correctAnswer: "别担心，有 voltam (Bié dānxīn, yǒu wǒ zài)",
        explanation: "别 + Động từ dùng để khuyên can (别担心 = đừng lo lắng)."
      }
    ]
  },
  {
    id: "hsk2_l11",
    hskLevel: "HSK2",
    lessonNumber: 11,
    title: "Cấu trúc so sánh hơn 比",
    vietnameseTitle: "Bài 11: Anh ấy lớn hơn tôi 3 tuổi (Cấu trúc so sánh 比)",
    description: "Học toàn diện câu so sánh hơn với chữ 比 (A 比 B + Tính từ + Mức độ/Số lượng chênh lệch).",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk2_51", "v_hsk2_52", "v_hsk2_53", "v_hsk2_54", "v_hsk2_55"],
    grammarPoints: [
      {
        id: "gp_hsk2_11_1",
        title: "Cấu trúc so sánh hơn: A 比 B + Tính từ + (Số lượng cụ thể / 一点儿 / 得多)",
        structure: "A + 比 + B + Tính từ + (Số lượng chênh lệch)",
        explanation: "Dùng để so sánh tính chất hoặc số lượng giữa hai đối tượng A và B.",
        examples: [
          { hanzi: "他比我大三岁。", pinyin: "Tā bǐ wǒ dà sān suì.", vietnamese: "Anh ấy lớn hơn tôi 3 tuổi." },
          { hanzi: "今天比昨天冷一点儿。", pinyin: "Jīntiān bǐ zuótiān lěng yìdiǎnr.", vietnamese: "Hôm nay lạnh hơn hôm qua một chút." },
          { hanzi: "这件衣服比那件贵得多。", pinyin: "Zhè jiàn yīfu bǐ nà jiàn guì de duō.", vietnamese: "Chiếc áo này đắt hơn chiếc kia nhiều." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "阮明，你的中文说得真好，你学了多久了？",
        pinyin: "Ruǎn Míng, nǐ de Zhōngwén shuō de zhēn hǎo, nǐ xué le duō jiǔ le?",
        vietnamese: "Nguyễn Minh, tiếng Trung của bạn nói hay thật đấy, bạn đã học bao lâu rồi?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn học",
        hanzi: "我学了一年了。我哥哥学了三年，他比我说得更好。",
        pinyin: "Wǒ xué le yì nián le. Wǒ gēge xué le sān nián, tā bǐ wǒ shuō de gèng hǎo.",
        vietnamese: "Mình học được một năm rồi. Anh trai mình học ba năm, anh ấy nói còn hay hơn mình."
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "你哥哥比你大几岁？",
        pinyin: "Nǐ gēge bǐ nǐ dà jǐ suì?",
        vietnamese: "Anh trai bạn lớn hơn bạn mấy tuổi?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn học",
        hanzi: "他比我大三岁，今年二十五岁。",
        pinyin: "Tā bǐ wǒ dà sān suì, jīnnián èrshíwǔ suì.",
        vietnamese: "Anh ấy lớn hơn mình 3 tuổi, năm nay 25 tuổi."
      }
    ],
    readingPassage: {
      title: "两家超市 (Hai siêu thị)",
      contentHanzi: "我们学校附近有两家超市。东边的那家超市比西边的大得多，东西也比西边的便宜一点儿。所以我更喜欢去东边的那家。",
      contentPinyin: "Wǒmen xuéxiào fùjìn yǒu liǎng jiā chāoshì. Dōngbian de nà jiā chāoshì bǐ xībian de dà de duō, dōngxi yě bǐ xībian de piányi yìdiǎnr. Suǒyǐ wǒ gèng xǐhuan qù dōngbian de nà jiā.",
      contentVietnamese: "Gần trường chúng tôi có hai siêu thị. Siêu thị phía đông lớn hơn nhiều so với siêu thị phía tây, đồ đạc cũng rẻ hơn một chút. Vì vậy tôi thích đến siêu thị phía đông hơn."
    },
    quizQuestions: [
      {
        id: "q_hsk2_l11_1",
        type: "multiple_choice",
        question: "Sắp xếp đúng câu: 'Quả dưa hấu này ngọt hơn quả kia'",
        options: ["这个西瓜比那个甜 (Zhège xīguā bǐ nàge tián)", "这个西瓜那个比甜 (Zhège xīguā nàge bǐ tián)", "比这个西瓜那个甜 (Bǐ zhège xīguā nàge tián)", "这个西瓜甜比那个 (Zhège xīguā tián bǐ nàge)"],
        correctAnswer: "这个西瓜比那个甜 (Zhège xīguā bǐ nàge tián)",
        explanation: "Cấu trúc so sánh: A + 比 + B + Tính từ."
      }
    ]
  },
  {
    id: "hsk2_l12",
    hskLevel: "HSK2",
    lessonNumber: 12,
    title: "Bổ ngữ trạng thái 得",
    vietnameseTitle: "Bài 12: Bạn mặc ít quá (Bổ ngữ trạng thái 得)",
    description: "Học cách đánh giá mức độ, trình độ của hành động bằng Bổ ngữ trạng thái với trợ từ kết cấu 得.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk2_56", "v_hsk2_57", "v_hsk2_58", "v_hsk2_59", "v_hsk2_60"],
    grammarPoints: [
      {
        id: "gp_hsk2_12_1",
        title: "Bổ ngữ trạng thái với trợ từ 得 (de)",
        structure: "Động từ + 得 + (Trạng từ) + Tính từ",
        explanation: "Dùng để miêu tả, đánh giá mức độ hoặc kết quả của một hành động đã hoặc thường xuyên diễn ra.",
        examples: [
          { hanzi: "你跑得真快！", pinyin: "Nǐ pǎo de zhēn kuài!", vietnamese: "Bạn chạy thật là nhanh!" },
          { hanzi: "他汉字写得很好看。", pinyin: "Tā hànzì xiě de hěn hǎokàn.", vietnamese: "Chữ Hán cậu ấy viết rất đẹp." },
          { hanzi: "外面很冷，你穿得太少了。", pinyin: "Wàimiàn hěn lěng, nǐ chuān de tài shǎo le.", vietnamese: "Bên ngoài rất lạnh, bạn mặc ít quá rồi." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "妈妈 (Mẹ)",
        role: "Gia đình",
        hanzi: "今天外面刮大风，下雪了，你怎么穿得这么少？",
        pinyin: "Jīntiān wàimiàn guā dà fēng, xià xuě le, nǐ zěnme chuān de zhème shǎo?",
        vietnamese: "Hôm nay bên ngoài gió to, tuyết rơi rồi, sao con mặc ít thế này?"
      },
      {
        speaker: "女儿 (Con gái)",
        role: "Gia đình",
        hanzi: "我觉得房间里很暖和。",
        pinyin: "Wǒ juéde fángjiān li hěn nuǎnhuo.",
        vietnamese: "Con thấy trong phòng rất ấm áp mà."
      },
      {
        speaker: "妈妈 (Mẹ)",
        role: "Gia đình",
        hanzi: "出门要多穿一件大衣，别感冒了。",
        pinyin: "Chūmén yào duō chuān yí jiàn dàyī, bié gǎnmào le.",
        vietnamese: "Ra ngoài phải mặc thêm một chiếc áo khoác, đừng để bị cảm lạnh."
      }
    ],
    readingPassage: {
      title: "跑步比赛 (Cuộc thi chạy)",
      contentHanzi: "昨天学校举行跑步比赛。大卫跑得最快，得了第一名。李华虽然跑得不太快，但也坚持跑完了全场。",
      contentPinyin: "Zuótiān xuéxiào jǔxíng pǎobù bǐsài. Dàwèi pǎo de zuì kuài, dé le dì-yī míng. Lǐ Huá suīrán pǎo de bú tài kuài, dàn yě jiānchí pǎo wán le quán chǎng.",
      contentVietnamese: "Hôm qua trường học tổ chức cuộc thi chạy bộ. David chạy nhanh nhất, đạt giải nhất. Lý Hoa tuy chạy không nhanh lắm nhưng cũng kiên trì chạy hết toàn bộ chặng đường."
    },
    quizQuestions: [
      {
        id: "q_hsk2_l12_1",
        type: "multiple_choice",
        question: "Trợ từ kết cấu nào dùng trong Bổ ngữ trạng thái: '她唱_____很好听'?",
        options: ["得 (de)", "的 (de)", "地 (de)", "了 (le)"],
        correctAnswer: "得 (de)",
        explanation: "Động từ + 得 + Tính từ là cấu trúc bổ ngữ trạng thái."
      }
    ]
  },
  {
    id: "hsk2_l13",
    hskLevel: "HSK2",
    lessonNumber: 13,
    title: "Trợ từ động thái 着 duy trì trạng thái",
    vietnameseTitle: "Bài 13: Cửa đang mở kìa (Trợ từ động thái 着)",
    description: "Học cách dùng trợ từ 着 sau động từ để miêu tả trạng thái đang được duy trì liên tục (mặc, đeo, mở, đóng).",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk2_61", "v_hsk2_62", "v_hsk2_63", "v_hsk2_64", "v_hsk2_65"],
    grammarPoints: [
      {
        id: "gp_hsk2_13_1",
        title: "Trợ từ động thái 着 (zhe) biểu thị trạng thái đang duy trì",
        structure: "Chủ ngữ + Động từ + 着 + (Tân ngữ) + (呢)",
        explanation: "Nhấn mạnh kết quả hoặc tư thế của hành động tiếp tục tồn tại.",
        examples: [
          { hanzi: "门开着呢。", pinyin: "Mén kāi zhe ne.", vietnamese: "Cửa đang mở đấy." },
          { hanzi: "他穿着一件红色的毛衣。", pinyin: "Tā chuān zhe yí jiàn hóngsè de máoyī.", vietnamese: "Anh ấy đang mặc một chiếc áo len màu đỏ." },
          { hanzi: "老师手里拿着一本书。", pinyin: "Lǎoshī shǒu lǐ ná zhe yì běn shū.", vietnamese: "Trên tay thầy giáo đang cầm một cuốn sách." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "你看，前边走着的那个人是不是张老师？",
        pinyin: "Nǐ kàn, qiánbian zǒu zhe de nà ge rén shì bu shì Zhāng lǎoshī?",
        vietnamese: "Bạn nhìn xem, người đang đi phía trước có phải cô Trương không?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn học",
        hanzi: "她穿着白大衣，戴着眼镜，正是张老师！",
        pinyin: "Tā chuān zhe bái dàyī, dài zhe yǎnjìng, zhèng shì Zhāng lǎoshī!",
        vietnamese: "Cô ấy đang mặc áo khoác trắng, đeo kính mắt, đúng là cô Trương rồi!"
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "我们快跑过去跟老师打个招呼吧。",
        pinyin: "Wǒmen kuài pǎo guòqu gēn lǎoshī dǎ ge zhāohu ba.",
        vietnamese: "Chúng mình mau chạy qua chào cô một tiếng đi."
      }
    ],
    readingPassage: {
      title: "教室里 (Trong lớp học)",
      contentHanzi: "教室的门开着，窗户也开着，微风吹进来很舒服。黑板上写着今天的课文，同学们都坐着认真听课。",
      contentPinyin: "Jiàoshì de mén kāi zhe, chuānghu yě kāi zhe, wēifēng chuī jìnlái hěn shūfu. Hēibǎn shang xiě zhe jīntiān de kèwén, tóngxuémen dōu zuò zhe rènzhēn tīngkè.",
      contentVietnamese: "Cửa phòng học đang mở, cửa sổ cũng đang mở, gió nhẹ thổi vào rất dễ chịu. Trên bảng đen đang viết bài học hôm nay, các bạn học sinh đều đang ngồi chăm chú nghe giảng."
    },
    quizQuestions: [
      {
        id: "q_hsk2_l13_1",
        type: "multiple_choice",
        question: "Câu nào miêu tả đúng 'Anh ấy đang đeo kính'?",
        options: ["他戴着眼镜 (Tā dài zhe yǎnjìng)", "他戴了眼镜 (Tā dài le yǎnjìng)", "他戴过眼镜 (Tā dài guo yǎnjìng)", "他要戴眼镜 (Tā yào dài yǎnjìng)"],
        correctAnswer: "他戴着眼镜 (Tā dài zhe yǎnjìng)",
        explanation: "Động từ + 着 biểu thị trạng thái đang duy trì (đang đeo)."
      }
    ]
  },
  {
    id: "hsk2_l14",
    hskLevel: "HSK2",
    lessonNumber: 14,
    title: "Trợ từ động thái 过",
    vietnameseTitle: "Bài 14: Bạn đã từng xem bộ phim đó chưa? (Trải nghiệm 过)",
    description: "Học trợ từ động thái 过 biểu thị trải nghiệm trong quá khứ (từng làm gì), câu hỏi chính phản với 没有.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk2_66", "v_hsk2_67", "v_hsk2_68", "v_hsk2_69", "v_hsk2_70"],
    grammarPoints: [
      {
        id: "gp_hsk2_14_1",
        title: "Trợ từ động thái 过 (guo) biểu thị trải nghiệm trong quá khứ",
        structure: "Chủ ngữ + (没) + Động từ + 过 + (Tân ngữ)",
        explanation: "Nhấn mạnh người nói đã từng có kinh nghiệm/trải nghiệm làm việc đó ít nhất một lần. Phủ định dùng 没...过.",
        examples: [
          { hanzi: "我去过中国两次。", pinyin: "Wǒ qù guo Zhōngguó liǎng cì.", vietnamese: "Tôi từng đi Trung Quốc hai lần." },
          { hanzi: "我没吃过北京烤鸭。", pinyin: "Wǒ méi chī guo Běijīng kǎoyā.", vietnamese: "Tôi chưa từng ăn vịt quay Bắc Kinh." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn bè",
        hanzi: "阮明，你看过那个新出的中国电影没有？",
        pinyin: "Ruǎn Míng, nǐ kàn guo nàge xīn chū de Zhōngguó diànyǐng méiyǒu?",
        vietnamese: "Nguyễn Minh, bạn đã từng xem bộ phim Trung Quốc mới ra đó chưa?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn bè",
        hanzi: "我还没看过呢。听说非常有意思。",
        pinyin: "Wǒ hái méi kàn guo ne. Tīngshuō fēicháng yǒu yìsi.",
        vietnamese: "Mình vẫn chưa từng xem. Nghe nói rất là hay."
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn bè",
        hanzi: "今天晚上电影院有票，我们一起去看吧！",
        pinyin: "Jīntiān wǎnshang diànyǐngyuàn yǒu piào, wǒmen yìqǐ qù kàn ba!",
        vietnamese: "Tối nay rạp chiếu phim có vé đấy, chúng mình cùng đi xem đi!"
      }
    ],
    readingPassage: {
      title: "中国的经历 (Trải nghiệm ở Trung Quốc)",
      contentHanzi: "大卫来中国以前，没学过汉语，也没吃过中国菜。现在他在北京住了一年，去过很多名胜古迹，汉语也说得很流利了。",
      contentPinyin: "Dàwèi lái Zhōngguó yǐqián, méi xué guo Hànyǔ, yě méi chī guo Zhōngguó cài. Xiànzài tā zài Běijīng zhù le yì nián, qù guo hěn duō míngshèng gǔjì, Hànyǔ yě shuō de hěn liúlì le.",
      contentVietnamese: "Trước khi đến Trung Quốc, David chưa từng học tiếng Trung, cũng chưa từng ăn món Trung Quốc. Bây giờ cậu ấy sống ở Bắc Kinh một năm, đã từng đi rất nhiều danh lam thắng cảnh, tiếng Trung cũng nói rất trôi chảy rồi."
    },
    quizQuestions: [
      {
        id: "q_hsk2_l14_1",
        type: "multiple_choice",
        question: "Phủ định của '我去过北京 (Tôi từng đi Bắc Kinh)' là gì?",
        options: ["我没去过北京 (Wǒ méi qù guo Běijīng)", "我不去过北京 (Wǒ bú qù guo Běijīng)", "我没去北京 (Wǒ méi qù Běijīng)", "我不去北京了 (Wǒ bú qù Běijīng le)"],
        correctAnswer: "我没去过北京 (Wǒ méi qù guo Běijīng)",
        explanation: "Phủ định trải nghiệm trong quá khứ dùng 没 + Động từ + 过."
      }
    ]
  },
  {
    id: "hsk2_l15",
    hskLevel: "HSK2",
    lessonNumber: 15,
    title: "Tương lai gần 快要……了",
    vietnameseTitle: "Bài 15: Năm mới sắp đến rồi (Cấu trúc tương lai gần)",
    description: "Học cách diễn đạt sự việc sắp xảy ra trong tương lai gần với 快要...了, 就要...了, và tổng kết toàn diện trình độ HSK 2.",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk2_71", "v_hsk2_72", "v_hsk2_73", "v_hsk2_74", "v_hsk2_75"],
    grammarPoints: [
      {
        id: "gp_hsk2_15_1",
        title: "Cấu trúc tương lai gần: 快要 / 就要 / 要……了 (Sắp... rồi)",
        structure: "(Thời gian cụ thể) + 就要 + Động từ + 了 | 快要 + Động từ + 了",
        explanation: "Biểu thị một hành động hoặc tình huống sắp sửa diễn ra trong thời gian rất ngắn. Khi có thời gian cụ thể phía trước phải dùng 就要...了 (không dùng 快要).",
        examples: [
          { hanzi: "火车快要开了。", pinyin: "Huǒchē kuàiyào kāi le.", vietnamese: "Tàu hỏa sắp chạy rồi." },
          { hanzi: "下个月我们就要毕业了。", pinyin: "Xià ge yuè wǒmen jiù yào bìyè le.", vietnamese: "Tháng sau chúng tôi sẽ tốt nghiệp rồi." },
          { hanzi: "新年就要到了！", pinyin: "Xīnnián jiù yào dào le!", vietnamese: "Năm mới sắp đến rồi!" }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "新年就要到了，你有什么打算？",
        pinyin: "Xīnnián jiù yào dào le, nǐ yǒu shénme dǎsuan?",
        vietnamese: "Năm mới sắp đến rồi, bạn có dự định gì chưa?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn học",
        hanzi: "下个星期我就要坐飞机回越南过年了。",
        pinyin: "Xià ge xīngqī wǒ jiù yào zuò fēijī huí Yuènán guònián le.",
        vietnamese: "Tuần sau mình sẽ đi máy bay về Việt Nam đón Tết rồi."
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "祝你一路平安，新年快乐！",
        pinyin: "Zhù nǐ yílù píng'ān, xīnnián kuàilè!",
        vietnamese: "Chúc bạn lên đường bình an, năm mới vui vẻ nhé!"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn học",
        hanzi: "谢谢李华，也祝你新年万事如意！",
        pinyin: "Xièxie Lǐ Huá, yě zhù nǐ xīnnián wànshì rúyì!",
        vietnamese: "Cảm ơn Lý Hoa, cũng chúc bạn năm mới vạn sự như ý!"
      }
    ],
    readingPassage: {
      title: "迎新年 (Đón năm mới)",
      contentHanzi: "新年就要到了，街上的红灯笼挂起来了，到处都非常热闹。大家都在买新衣服、准备年货，迎接新的一年。",
      contentPinyin: "Xīnnián jiù yào dào le, jiē shang de hóng dēnglong guà qǐlái le, dàochù dōu fēicháng rènao. Dàjiā dōu zài mǎi xīn yīfu, zhǔnbèi niánhuò, yíngjiē xīn de yì nián.",
      contentVietnamese: "Năm mới sắp đến rồi, đèn lồng đỏ trên đường phố đã được treo lên, khắp nơi đều vô cùng nhộn nhịp. Mọi người đều đang mua sắm quần áo mới, chuẩn bị sắm Tết, chào đón một năm mới an lành."
    },
    quizQuestions: [
      {
        id: "q_hsk2_l15_1",
        type: "multiple_choice",
        question: "Chọn câu có cấu trúc tương lai gần đúng nhất khi có mốc thời gian '下周 (tuần sau)':",
        options: ["下周我们就要考试了 (Xià zhōu wǒmen jiù yào kǎoshì le)", "下周我们快要考试了 (Xià zhōu wǒmen kuàiyào kǎoshì le)", "下周我们就要考试 (Xià zhōu wǒmen jiù yào kǎoshì)", "下周我们快考试了 (Xià zhōu wǒmen kuài kǎoshì le)"],
        correctAnswer: "下周我们就要考试了 (Xià zhōu wǒmen jiù yào kǎoshì le)",
        explanation: "Khi có mốc thời gian cụ thể (下周), bắt buộc dùng 就要...了 (không dùng 快要)."
      }
    ]
  }
];
