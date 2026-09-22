import { Lesson } from "../types";

export const HSK4_LESSONS: Lesson[] = [
  {
    id: "hsk4_l1",
    hskLevel: "HSK4",
    lessonNumber: 1,
    title: "Tình cảm & Liên từ 无论……都……",
    vietnameseTitle: "Bài 1: Tình yêu giản dị (Tình cảm lứa đôi & 无论……都……)",
    description: "Khám phá quan niệm tình yêu chân thành, liên từ 无论/不管...都... và phó từ 互相 (lẫn nhau).",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_01", "v_hsk4_02", "v_hsk4_03", "v_hsk4_04", "v_hsk4_05", "v_hsk4_06"],
    grammarPoints: [
      {
        id: "gp_hsk4_1_1",
        title: "Cặp liên từ biểu thị vô điều kiện: 无论 / 不管……都 / 也……",
        structure: "无论 / 不管 + Điều kiện bất kỳ (Đại từ nghi vấn / Cặp đối lập A还是B), Chủ ngữ + 都 / 也 + Kết quả",
        explanation: "Biểu thị trong bất cứ điều kiện, hoàn cảnh nào thì kết quả cũng không bao giờ thay đổi.",
        examples: [
          { hanzi: "无论遇到什么困难，我们都要互相支持。", pinyin: "Wúlùn yùdào shénme kùnnan, wǒmen dōu yào hùxiāng zhīchí.", vietnamese: "Dù gặp phải bất kỳ khó khăn nào, chúng ta cũng phải hỗ trợ lẫn nhau." },
          { hanzi: "不管晴天还是下雨，他都坚持晨跑。", pinyin: "Bùguǎn qíngtiān háishì xiàyǔ, tā dōu jiānchí chénpǎo.", vietnamese: "Bất kể trời nắng hay trời mưa, anh ấy đều kiên trì chạy bộ buổi sáng." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "孙月 (Tôn Nguyệt)",
        role: "Bạn bè",
        hanzi: "听说你和王老师要结婚了，恭喜你们！",
        pinyin: "Tīngshuō nǐ hé Wáng lǎoshī yào jiéhūn le, gōngxǐ nǐmen!",
        vietnamese: "Nghe nói bạn và thầy Vương sắp kết hôn rồi, chúc mừng hai bạn nhé!"
      },
      {
        speaker: "李进 (Lý Tiến)",
        role: "Bạn bè",
        hanzi: "谢谢！我和他在一起五年了。我们性格互补，无论遇到什么事都能商量着解决。",
        pinyin: "Xièxie! Wǒ hé tā zài yìqǐ wǔ nián le. Wǒmen xìnggé hùbǔ, wúlùn yùdào shénme shì dōu néng shāngliang zhe jiějué.",
        vietnamese: "Cảm ơn bạn! Tôi và anh ấy ở bên nhau 5 năm rồi. Tính cách chúng tôi bổ khuyết cho nhau, dù gặp chuyện gì cũng có thể cùng nhau bàn bạc giải quyết."
      }
    ],
    readingPassage: {
      title: "浪漫与平淡 (Lãng mạn và bình dị)",
      contentHanzi: "真正的爱情不仅需要浪漫的激情，更需要平淡生活中的相互理解与包容。轰轰烈烈的爱情令人向往，但相濡以沫的陪伴才是长久的幸福。",
      contentPinyin: "Zhēnzhèng de àiqíng bùjǐn xūyào làngmàn de jīqíng, gèng xūyào píngdàn shēnghuó zhōng de xiānghù lǐjiě yǔ bāoróng. Hōnghōnglièliè de àiqíng lìng rén xiàngwǎng, dàn xiāngrúyǐmò de péibàn cái shì chángjiǔ de xìngfú.",
      contentVietnamese: "Tình yêu đích thực không chỉ cần niềm say mê lãng mạn, mà càng cần sự thấu hiểu và bao dung lẫn nhau trong cuộc sống bình dị thường nhật. Một tình yêu nồng cháy khiến người ta khao khát, nhưng sự đồng hành kề vai sát cánh mới chính là hạnh phúc bền lâu."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l1_1",
        type: "multiple_choice",
        question: "Cặp liên từ '无论……都……' có ý nghĩa ngữ pháp gì?",
        options: ["Biểu thị điều kiện vô điều kiện (bất luận thế nào cũng)", "Biểu thị nguyên nhân kết quả", "Biểu thị sự nhượng bộ", "Biểu thị sự lựa chọn"],
        correctAnswer: "Biểu thị điều kiện vô điều kiện (bất luận thế nào cũng)",
        explanation: "无论...都... diễn tả không phân biệt điều kiện nào thì kết quả vẫn giữ nguyên."
      }
    ]
  },
  {
    id: "hsk4_l2",
    hskLevel: "HSK4",
    lessonNumber: 2,
    title: "Tình bạn & Cặp liên từ 不仅……而且……",
    vietnameseTitle: "Bài 2: Bạn bè chân chính (Tình bạn & Liên từ tăng tiến)",
    description: "Bàn về phẩm chất tình bạn, liên từ tăng tiến 不仅...而且/也/还... và cấu trúc 既然...就... (đã... thì...).",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_07", "v_hsk4_08", "v_hsk4_09", "v_hsk4_10", "v_hsk4_11"],
    grammarPoints: [
      {
        id: "gp_hsk4_2_1",
        title: "Cặp liên từ tăng tiến: 不仅……而且 / 还 / 也…… (Không những... mà còn...)",
        structure: "Chủ ngữ + 不仅 + Vế 1, 而且 / 还 / 也 + Vế 2",
        explanation: "Dùng để nhấn mạnh vế sau nâng cao hơn, sâu sắc hơn hoặc bổ sung cho vế trước.",
        examples: [
          { hanzi: "他不仅学习成绩好，而且非常乐于助人。", pinyin: "Tā bùjǐn xuéxí chéngjì hǎo, érqiě fēicháng lèyú zhùrén.", vietnamese: "Cậu ấy không những thành tích học tập tốt mà còn rất thích giúp đỡ mọi người." },
          { hanzi: "既然大家都是好朋友，就应该坦诚相待。", pinyin: "Jìrán dàjiā dōu shì hǎo péngyou, jiù yīnggāi tǎnchéng xiāngdài.", vietnamese: "Đã là bạn tốt của nhau thì nên đối đãi chân thành." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "张远 (Trương Viễn)",
        role: "Bạn bè",
        hanzi: "李进，你觉得什么样的人才算真正的朋友？",
        pinyin: "Lǐ Jìn, nǐ juéde shénmeyàng de rén cái suàn zhēnzhèng de péngyou?",
        vietnamese: "Lý Tiến, cậu thấy người như thế nào mới được xem là bạn bè chân chính?"
      },
      {
        speaker: "李进 (Lý Tiến)",
        role: "Bạn bè",
        hanzi: "真正的朋友不仅在你成功时为你高兴，更能在你遇到困难时伸出援手。",
        pinyin: "Zhēnzhèng de péngyou bùjǐn zài nǐ chénggōng shí wèi nǐ gāoxìng, gèng néng zài nǐ yùdào kùnnan shí shēnchū yuánshǒu.",
        vietnamese: "Bạn bè chân chính không chỉ chung vui khi cậu thành công, mà quan trọng hơn là giang tay tương trợ khi cậu gặp hoạn nạn."
      }
    ],
    readingPassage: {
      title: "交友之道 (Đạo kết giao bạn bè)",
      contentHanzi: "朋友不在于多，而在于真。古人说：'患难见真情'。平时一起吃喝玩乐的人很多，但当你陷入低谷时，依然陪在你身边的才是知心朋友。",
      contentPinyin: "Péngyou bú zàiyú duō, ér zàiyú zhēn. Gǔrén shuō: 'Huànnàn jiàn zhēnqíng'. Píngshí yìqǐ chīhē wánlè de rén hěn duō, dàn dāng nǐ xiànrù dīgǔ shí, yīrán péi zài nǐ shēnbiān de cái shì zhīxīn péngyou.",
      contentVietnamese: "Bạn bè quý ở sự chân thành, không quý ở số lượng. Cổ nhân có câu: 'Hoạn nạn mới thấy chân tình'. Lúc bình thường cùng ăn uống vui chơi thì rất nhiều, nhưng khi bạn rơi vào hoàn cảnh khó khăn mà vẫn ở bên cạnh bạn, đó mới là người bạn tri kỷ."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l2_1",
        type: "multiple_choice",
        question: "Cặp liên từ biểu thị quan hệ tăng tiến là gì?",
        options: ["不仅……而且…… (Bùjǐn... érqiě...)", "因为……所以…… (Yīnwèi... suǒyǐ...)", "虽然……但是…… (Suīrán... dànshì...)", "如果……就…… (Rúguǒ... jiù...)"],
        correctAnswer: "不仅……而且…… (Bùjǐn... érqiě...)",
        explanation: "不仅...而且... là cặp liên từ chỉ sự tăng tiến (không chỉ... mà còn...)."
      }
    ]
  },
  {
    id: "hsk4_l3",
    hskLevel: "HSK4",
    lessonNumber: 3,
    title: "Phỏng vấn & Giới từ 对",
    vietnameseTitle: "Bài 3: Giám đốc rất có ấn tượng với tôi (Phỏng vấn xin việc & Cấu trúc 对……印象)",
    description: "Học từ vựng tuyển dụng, phỏng vấn xin việc, cấu trúc 对...印象 (ấn tượng về ai), phó từ 准时 vs 按时.",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_12", "v_hsk4_13", "v_hsk4_14", "v_hsk4_15", "v_hsk4_16"],
    grammarPoints: [
      {
        id: "gp_hsk4_3_1",
        title: "Cấu trúc ấn tượng: 对……印象 (sâu sắc / tốt đẹp)",
        structure: "Đối tượng A + 对 + Đối tượng B + 的印象 + 很深 / 很好",
        explanation: "Dùng để biểu đạt mức độ cảm nhận, đánh giá ban đầu về một người hoặc sự việc.",
        examples: [
          { hanzi: "招聘经理对我的印象很深。", pinyin: "Zhāopìn jīnglǐ duì wǒ de yìnxiàng hěn shēn.", vietnamese: "Giám đốc tuyển dụng có ấn tượng rất sâu sắc về tôi." },
          { hanzi: "我对北京的第一印象非常深刻。", pinyin: "Wǒ duì Běijīng de dì-yī yìnxiàng fēicháng shēnkè.", vietnamese: "Ấn tượng đầu tiên của tôi về Bắc Kinh vô cùng sâu đậm." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "小林 (Tiểu Lâm)",
        role: "Ứng viên",
        hanzi: "今天的面试顺利吗？你紧张不紧张？",
        pinyin: "Jīntiān de miànshì shùnlì ma? Nǐ jǐnzhāng bu jǐnzhāng?",
        vietnamese: "Buổi phỏng vấn hôm nay thuận lợi không? Cậu có hồi hộp không?"
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Ứng viên",
        hanzi: "一开始有点儿紧张，后来聊得很好。经理对我的专业能力和外语水平印象很深。",
        pinyin: "Yì kāishǐ yǒudiǎnr jǐnzhāng, hòulái liáo de hěn hǎo. Jīnglǐ duì wǒ de zhuānyè nénglì hé wàiyǔ shuǐpíng yìnxiàng hěn shēn.",
        vietnamese: "Lúc đầu có chút hồi hộp, sau đó trao đổi rất tốt. Giám đốc có ấn tượng rất sâu sắc về năng lực chuyên môn và trình độ ngoại ngữ của tôi."
      }
    ],
    readingPassage: {
      title: "成功的面试 (Buổi phỏng vấn thành công)",
      contentHanzi: "求职面试时，第一印象至关重要。准时到达、穿着得体、自信而礼貌地回答考官的问题，能给考官留下极佳的印象。充分的准备是面试成功的基础。",
      contentPinyin: "Qiúzhí miànshì shí, dì-yī yìnxiàng zhìguān zhòngyào. Zhǔnshí dàodá, chuānzhuó détǐ, zìxìn ér lǐmào de huídá kǎoguān de wèntí, néng gěi kǎoguān liúxià jí jiā de yìnxiàng. Chōngfèn de zhǔnbèi shì miànshì chénggōng de jīchǔ.",
      contentVietnamese: "Khi phỏng vấn xin việc, ấn tượng đầu tiên đóng vai trò then chốt. Đến đúng giờ, trang phục lịch sự, tự tin và lễ độ trả lời các câu hỏi của người chấm thi có thể để lại ấn tượng vô cùng tốt đẹp. Sự chuẩn bị kỹ càng chính là nền tảng cho sự thành công của buổi phỏng vấn."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l3_1",
        type: "multiple_choice",
        question: "Cấu trúc đúng để nói 'Tôi có ấn tượng rất tốt về anh ấy':",
        options: ["我对他印象很好 (Wǒ duì tā yìnxiàng hěn hǎo)", "我对好印象他 (Wǒ duì hǎo yìnxiàng tā)", "他对我印象好得很 (Tā duì wǒ yìnxiàng hǎo de hěn)", "我印象对他好 (Wǒ yìnxiàng duì tā hǎo)"],
        correctAnswer: "我对他印象很好 (Wǒ duì tā yìnxiàng hěn hǎo)",
        explanation: "Cấu trúc: A + 对 + B + 印象很好/很深."
      }
    ]
  },
  {
    id: "hsk4_l4",
    hskLevel: "HSK4",
    lessonNumber: 4,
    title: "Thái độ làm việc & Phó từ 甚至",
    vietnameseTitle: "Bài 4: Thái độ làm việc (Thái độ chuyên nghiệp & Phó từ 甚至)",
    description: "Học từ vựng nghề nghiệp công sở, phó từ 甚至 (thậm chí), danh từ 关键 (then chốt/mấu chốt).",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_17", "v_hsk4_18", "v_hsk4_19", "v_hsk4_20", "v_hsk4_21"],
    grammarPoints: [
      {
        id: "gp_hsk4_4_1",
        title: "Phó từ biểu thị mức độ cực đoan: 甚至 (shènzhì) - Thậm chí / Ngay cả",
        structure: "Vế 1, 甚至 + (连) + Vế 2 (Mức độ đẩy cao vượt mong đợi)",
        explanation: "Dùng để nhấn mạnh một trường hợp nổi bật, bất ngờ hoặc vượt ngoài dự liệu.",
        examples: [
          { hanzi: "他工作太投入了，甚至连午饭都忘了吃。", pinyin: "Tā gōngzuò tài tóurù le, shènzhì lián wǔfàn dōu wàng le chī.", vietnamese: "Anh ấy làm việc say mê quá, thậm chí ngay cả cơm trưa cũng quên ăn." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李总 (Tổng Giám đốc Lý)",
        role: "Lãnh đạo",
        hanzi: "小王最近加班很频繁，项目进展如何？",
        pinyin: "Xiǎo Wáng zuìjìn jiābān hěn pínfán, xiàngmù jìnzhǎn rúhé?",
        vietnamese: "Tiểu Vương dạo này tăng ca rất thường xuyên, tiến độ dự án thế nào rồi?"
      },
      {
        speaker: "陈经理 (Trưởng phòng Trần)",
        role: "Quản lý",
        hanzi: "他非常负责，遇到技术难题甚至主动熬夜研究，现在项目已经顺利攻克难关了。",
        pinyin: "Tā fēicháng fùzé, yùdào jìshù nántí shènzhì zhǔdòng áoyè yánjiū, xiànzài xiàngmù yǐjīng shùnlì gōngkè nánguān le.",
        vietnamese: "Cậu ấy rất có trách nhiệm, khi gặp khó khăn kỹ thuật thậm chí còn chủ động thức khuya nghiên cứu, hiện tại dự án đã vượt qua trở ngại thành công."
      }
    ],
    readingPassage: {
      title: "态度决定一切 (Thái độ quyết định tất cả)",
      contentHanzi: "能力固然重要，但积极认真的态度才是决定职业生涯高度的关键。面对枯燥重复的工作，能够保持耐心与热情，才能在平凡的岗位上创造出不平凡的业绩。",
      contentPinyin: "Nénglì gùrán zhòngyào, dàn jījí rènzhēn de tàidu cái shì juédìng zhíyè shēngyá gāodù de guānjiàn. Miànduì kūzào chóngfù de gōngzuò, nénggòu bǎochí nàixīn yǔ rèqíng, cái néng zài píngfán de gǎngwèi shang chuàngzào chū bù píngfán de yèjì.",
      contentVietnamese: "Năng lực tuy rất quan trọng, nhưng thái độ tích cực nghiêm túc mới là chìa khóa then chốt quyết định tầm cao của sự nghiệp. Khi đối mặt với công việc tẻ nhạt lặp đi lặp lại, có thể giữ vững sự kiên nhẫn và lòng nhiệt huyết thì mới có thể tạo nên thành tích phi thường từ những vị trí bình dị."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l4_1",
        type: "multiple_choice",
        question: "Từ nào có nghĩa là 'thậm chí' dùng để nhấn mạnh tình huống cực độ?",
        options: ["甚至 (shènzhì)", "尤其 (yóuqí)", "或者 (huòzhě)", "反而 (fǎn'ér)"],
        correctAnswer: "甚至 (shènzhì)",
        explanation: "甚至 nghĩa là thậm chí, nhấn mạnh tình huống vượt bậc."
      }
    ]
  },
  {
    id: "hsk4_l5",
    hskLevel: "HSK4",
    lessonNumber: 5,
    title: "Tiêu dùng thông minh & 值得 / 光",
    vietnameseTitle: "Bài 5: Bí quyết mua sắm (Tiêu dùng thông minh & 值得 / 光)",
    description: "Học từ vựng kinh tế mua sắm, động từ 值得 (đáng giá), phó từ 光 (chỉ/duy nhất), phân biệt giá cả và chất lượng.",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_22", "v_hsk4_23", "v_hsk4_24", "v_hsk4_25", "v_hsk4_26"],
    grammarPoints: [
      {
        id: "gp_hsk4_5_1",
        title: "Động từ: 值得 (zhídé) - Đáng / Xứng đáng",
        structure: "值得 + Động từ / Cụm động từ",
        explanation: "Biểu thị giá trị hoặc lợi ích mang lại rất xứng đáng với công sức, thời gian hay tiền bạc bỏ ra.",
        examples: [
          { hanzi: "这本书写得非常好，很值得一读。", pinyin: "Zhè běn shū xiě de fēicháng hǎo, hěn zhídé yì dú.", vietnamese: "Cuốn sách này viết rất hay, rất đáng để đọc một lần." },
          { hanzi: "这台电脑质量过硬，虽然贵但很值得买。", pinyin: "Zhè tái diànnǎo zhìliàng guòyìng, suīrán guì dàn hěn zhídé mǎi.", vietnamese: "Chiếc máy tính này chất lượng rất tốt, tuy đắt nhưng rất đáng mua." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "顾客 (Khách hàng)",
        role: "Mua sắm",
        hanzi: "这件羊毛大衣价格可不便宜，真的物有所值吗？",
        pinyin: "Zhè jiàn yángmáo dàyī jiàgé kě bù piányi, zhēn de wùyǒusuǒzhí ma?",
        vietnamese: "Chiếc áo khoác dạ cừu này giá không hề rẻ, thực sự đáng đồng tiền bát gạo chứ?"
      },
      {
        speaker: "店长 (Cửa hàng trưởng)",
        role: "Tư vấn",
        hanzi: "您放心，这是百分之百纯羊毛，保暖又轻便，穿十年都不会变形，绝对值得购买。",
        pinyin: "Nín fàngxīn, zhè shì bǎifēnzhībǎi chún yángmáo, bǎonuǎn yòu qīngbiàn, chuān shí nián dōu bú huì biànxíng, juéduì zhídé gòumǎi.",
        vietnamese: "Chị yên tâm, đây là 100% len cừu nguyên chất, giữ ấm lại nhẹ nhàng, mặc 10 năm cũng không bị biến dạng, tuyệt đối đáng mua ạ."
      }
    ],
    readingPassage: {
      title: "理性消费 (Tiêu dùng lý trí)",
      contentHanzi: "俗话说：'一分钱一分货'。买东西不能光看价格便宜，更要关注商品的质量与售后服务。理性分析自己的真实需求，才能买到性价比最高的心仪好物。",
      contentPinyin: "Súhuà shuō: 'Yì fēn qián yì fēn huò'. Mǎi dōngxi bù néng guāng kàn jiàgé piányi, gèng yào guānzhù shāngpǐn de zhìliàng yǔ shòuhòu fúwù. Lǐxìng fēnxī zìjǐ de zhēnshí xūqiú, cái néng mǎi dào xìngjiàbǐ zuì gāo de xīnyí hǎowù.",
      contentVietnamese: "Tục ngữ có câu: 'Tiền nào của nấy'. Mua sắm không thể chỉ nhìn vào giá rẻ, mà càng phải quan tâm đến chất lượng và dịch vụ sau bán hàng của sản phẩm. Phân tích lý trí nhu cầu thực tế của bản thân mới có thể mua được món đồ ưng ý với tỷ lệ giá trị/chất lượng cao nhất."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l5_1",
        type: "multiple_choice",
        question: "Từ nào có nghĩa là 'xứng đáng để làm việc gì'?",
        options: ["值得 (zhídé)", "适合 (shìhé)", "合适 (héshì)", "必须 (bìxū)"],
        correctAnswer: "值得 (zhídé)",
        explanation: "值得 + Động từ diễn tả sự xứng đáng, đáng giá."
      }
    ]
  },
  {
    id: "hsk4_l6",
    hskLevel: "HSK4",
    lessonNumber: 6,
    title: "Triết lý cuộc sống & Phó từ 难道 / 顺便",
    vietnameseTitle: "Bài 6: Triết lý nhân sinh (Phó từ tu từ 难道 & 顺便)",
    description: "Học câu phản vấn nhấn mạnh với 难道 (chẳng lẽ), phó từ 顺便 (nhân tiện, tiện thể) và chiêm nghiệm cuộc sống.",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_27", "v_hsk4_28", "v_hsk4_29", "v_hsk4_30", "v_hsk4_31"],
    grammarPoints: [
      {
        id: "gp_hsk4_6_1",
        title: "Phó từ phản vấn: 难道……吗？ (Chẳng lẽ... sao?)",
        structure: "难道 + Câu trần thuật + (吗 / 不成)？",
        explanation: "Dùng trong câu hỏi tu từ để tăng sức biểu cảm, nhấn mạnh một chân lý hiển nhiên hoặc sự kinh ngạc.",
        examples: [
          { hanzi: "难道你不知道明天要考试吗？", pinyin: "Nándào nǐ bù zhīdào míngtiān yào kǎoshì ma?", vietnamese: "Chẳng lẽ bạn không biết ngày mai phải thi sao?" },
          { hanzi: "你去超市的时候，顺便帮我买瓶酱油吧。", pinyin: "Nǐ qù chāoshì de shíhou, shùnbiàn bāng wǒ mǎi píng jiàngyóu ba.", vietnamese: "Khi bạn đi siêu thị, nhân tiện mua hộ mình một chai xì dầu nhé." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "你听说大卫放弃了去大公司的高薪工作，选择去偏远山区当支教老师了吗？",
        pinyin: "Nǐ tīngshuō Dàwèi fàngqì le qù dà gōngsī de gāoxīn gōngzuò, xuǎnzé qù piānyuǎn shānqū dāng zhījiào lǎoshī le ma?",
        vietnamese: "Bạn nghe tin David từ bỏ công việc lương cao ở công ty lớn để chọn đến vùng núi xa xôi làm giáo viên tình nguyện chưa?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn học",
        hanzi: "听说了。难道金钱是衡量人生价值的唯一标准吗？他追求自己的理想，非常令人钦佩！",
        pinyin: "Tīngshuō le. Nándào jīnqián shì héngliáng rénshēng jiàzhí de wéiyī biāozhǔn ma? Tā zhuīqiú zìjǐ de lǐxiǎng, fēicháng lìng rén qīnpèi!",
        vietnamese: "Nghe rồi. Chẳng lẽ tiền tài là thước đo duy nhất cho giá trị đời người sao? Cậu ấy theo đuổi lý tưởng của riêng mình, rất đáng khâm phục!"
      }
    ],
    readingPassage: {
      title: "生活的智慧 (Trí tuệ cuộc sống)",
      contentHanzi: "人生如同一场马拉松，不在于瞬间的爆发，而在于途中的坚持。遇到挫折时不必气馁，因为每一次失败都是通往成功的必经之路。",
      contentPinyin: "Rénshēng rútóng yì chǎng mǎlāsōng, bú zàiyú shùnjiān de bàofā, ér zàiyú túzhōng de jiānchí. Yùdào cuòzhé shí búbì qìněi, yīnwèi měi yí cì shībài dōu shì tōngwǎng chénggōng de bìjīngzhīlù.",
      contentVietnamese: "Đời người tựa như một cuộc chạy marathon, không nằm ở sự bùng nổ tức thời mà ở sự bền bỉ kiên trì trên suốt chặng đường. Khi gặp trắc trở chớ nên nản lòng, bởi mỗi lần thất bại đều là con đường tất yếu dẫn tới thành công."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l6_1",
        type: "multiple_choice",
        question: "Từ nào mở đầu câu hỏi tu từ mang ý nghĩa 'Chẳng lẽ'?",
        options: ["难道 (nándào)", "究竟 (jiūjìng)", "到底 (dàodǐ)", "何必 (hébì)"],
        correctAnswer: "难道 (nándào)",
        explanation: "难道 dùng trong câu hỏi tu từ khẳng định hoặc phủ định mạnh mẽ."
      }
    ]
  },
  {
    id: "hsk4_l7",
    hskLevel: "HSK4",
    lessonNumber: 7,
    title: "Sức khỏe & Phó từ 到底",
    vietnameseTitle: "Bài 7: Bác sĩ tốt nhất chính là bản thân mình (Sức khỏe & Phó từ 到底)",
    description: "Học cách giữ gìn sức khỏe dưỡng sinh, phó từ truy vấn rốt cuộc 到底, phó từ thỉnh thoảng 偶尔.",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_32", "v_hsk4_33", "v_hsk4_34", "v_hsk4_35", "v_hsk4_36"],
    grammarPoints: [
      {
        id: "gp_hsk4_7_1",
        title: "Phó từ truy vấn: 到底 (dàodǐ) - Rốt cuộc / Rốt cục là",
        structure: "到底 + Đại từ nghi vấn / Cụm câu hỏi chính phản",
        explanation: "Dùng trong câu hỏi để tìm kiếm câu trả lời dứt khoát hoặc làm rõ chân tướng sự việc.",
        examples: [
          { hanzi: "你到底去不去？快做决定吧。", pinyin: "Nǐ dàodǐ qù bu qù? Kuài zuò juédìng ba.", vietnamese: "Rốt cuộc cậu có đi hay không? Mau quyết định đi nào." },
          { hanzi: "保持健康的秘诀到底是什么？", pinyin: "Bǎochí jiànkāng de mìmì dàodǐ shì shénme?", vietnamese: "Bí quyết giữ gìn sức khỏe rốt cuộc là gì?" }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "王明 (Vương Minh)",
        role: "Bệnh nhân",
        hanzi: "医生，我最近总是失眠，感觉浑身没劲儿，这到底是怎么回事？",
        pinyin: "Yīshēng, wǒ zuìjìn zǒngshì shīmián, gǎnjué húnshēn méi jìnr, zhè dàodǐ shì zěnme huí shì?",
        vietnamese: "Bác sĩ ơi, dạo này tôi thường xuyên mất ngủ, cảm thấy cả người rã rời không có sức lực, rốt cuộc là bị sao thế ạ?"
      },
      {
        speaker: "李大夫 (Bác sĩ Lý)",
        role: "Bác sĩ",
        hanzi: "检查显示指标都正常。你主要是工作压力太大，缺乏运动。最好的医生是自己，要调整作息，规律饮食。",
        pinyin: "Jiǎnchá xiǎnshì zhǐbiāo dōu zhèngcháng. Nǐ zhǔyào shì gōngzuò yālì tài dà, quēfá yùndòng. Zuì hǎo de yīshēng shì zìjǐ, yào tiáozhěng zuòxī, guīlǜ yǐnshí.",
        vietnamese: "Kết quả kiểm tra cho thấy các chỉ số đều bình thường. Nguyên nhân chính là do áp lực công việc quá lớn và thiếu vận động. Bác sĩ tốt nhất chính là bản thân mình, cần điều chỉnh giờ giấc nghỉ ngơi và ăn uống điều độ."
      }
    ],
    readingPassage: {
      title: "身心健康的平衡 (Sự cân bằng thân tâm)",
      contentHanzi: "现代医学表明，良好的心态是抵御疾病的第一道防线。合理膳食、充足睡眠加上乐观向上的生活态度，能极大地激发人体自身的自愈能力。",
      contentPinyin: "Xiàndài yīxué biǎomíng, liánghǎo de xīntài shì dǐyù jíbìng de dì-yī dào fángxiàn. Hélǐ shànshí, chōngzú shuìmián jiā shàng lèguān xiàngshàng de shēnghuó tàidu, néng jídà de jīfā réntǐ zìshēn de zìyù nénglì.",
      contentVietnamese: "Y học hiện đại chứng minh rằng, tâm thái tốt là tuyến phòng thủ đầu tiên chống lại bệnh tật. Bữa ăn hợp lý, giấc ngủ đầy đủ cùng với thái độ sống lạc quan hướng thiện có thể kích hoạt mạnh mẽ năng lực tự chữa lành của cơ thể con người."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l7_1",
        type: "multiple_choice",
        question: "Phó từ 到底 trong câu nghi vấn biểu thị ý gì?",
        options: ["Truy vấn đến cùng (rốt cuộc là)", "Biểu thị sự so sánh", "Biểu thị nguyên nhân", "Biểu thị sự cấm đoán"],
        correctAnswer: "Truy vấn đến cùng (rốt cuộc là)",
        explanation: "到底 dùng trong câu hỏi mang ý truy vấn chân tướng (rốt cuộc)."
      }
    ]
  },
  {
    id: "hsk4_l8",
    hskLevel: "HSK4",
    lessonNumber: 8,
    title: "Giới từ 随着 & 尽管",
    vietnameseTitle: "Bài 8: Bảo vệ môi trường (Giới từ 随着 & Liên từ 尽管)",
    description: "Học chủ đề môi trường sinh thái, giới từ 随着 (cùng với sự phát triển), liên từ nhượng bộ 尽管 (mặc dù).",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_37", "v_hsk4_38", "v_hsk4_39", "v_hsk4_40", "v_hsk4_41"],
    grammarPoints: [
      {
        id: "gp_hsk4_8_1",
        title: "Giới từ: 随着 (suízhe) - Cùng với sự / Theo đà phát triển",
        structure: "随着 + Danh từ hóa sự biến đổi, Chủ ngữ + Vế câu kết quả tương ứng",
        explanation: "Biểu thị khi một sự vật có sự chuyển biến thì sự vật khác cũng thay đổi theo.",
        examples: [
          { hanzi: "随着科技的发展，人们的生活越来越便利。", pinyin: "Suízhe kējì de fāzhǎn, rénmen de shēnghuó yuèláiyuè biànlì.", vietnamese: "Cùng với sự phát triển của khoa học công nghệ, đời sống con người ngày càng tiện lợi." },
          { hanzi: "尽管天气很冷，环保志愿者们依然坚持植树。", pinyin: "Jǐnguǎn tiānqì hěn lěng, huánbǎo zhìyuànzhěmen yīrán jiānchí zhíshù.", vietnamese: "Mặc dù thời tiết rất lạnh, các tình nguyện viên bảo vệ môi trường vẫn kiên trì trồng cây." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "志愿者 (Tình nguyện viên)",
        role: "Môi trường",
        hanzi: "随着私家车越来越多，城市的空气污染也越来越受大家关注。",
        pinyin: "Suízhe sījiāchē yuèláiyuè duō, chéngshì de kōngqì wūrǎn yě yuèláiyuè shòu dàjiā guānzhù.",
        vietnamese: "Cùng với việc xe hơi cá nhân ngày càng nhiều, ô nhiễm không khí ở đô thị cũng ngày càng được mọi người quan tâm."
      },
      {
        speaker: "市民 (Người dân)",
        role: "Môi trường",
        hanzi: "是啊，我们应该多乘坐公共交通或者骑自行车出行，低碳环保从每个人做起。",
        pinyin: "Shì a, wǒmen yīnggāi duō chéngzuò gōnggòng jiāotōng huòzhě qí zìxíngchē chūxíng, dītàn huánbǎo cóng měi ge rén zuò qǐ.",
        vietnamese: "Đúng vậy, chúng ta nên đi phương tiện giao thông công cộng nhiều hơn hoặc đạp xe đạp, giảm thiểu carbon bảo vệ môi trường bắt đầu từ mỗi người."
      }
    ],
    readingPassage: {
      title: "绿色家园 (Mái nhà xanh)",
      contentHanzi: "地球是我们唯一的家园。随手关水龙头、减少一次性塑料袋的使用、积极参与垃圾分类，这些看似微小的举动，汇聚起来就是保护地球的巨大力量。",
      contentPinyin: "Dìqiú shì wǒmen wéiyī de jiāyuán. Suíshǒu guān shuǐlóngtóu, jiǎnshǎo yícìxìng sùliàodài de shǐyòng, jījí cānyù lājī fēnlèi, zhèxiē kànsì wēixiǎo de jǔdòng, huìjù qǐlái jiù shì bǎohù dìqiú de jùdà lìliang.",
      contentVietnamese: "Trái Đất là ngôi nhà chung duy nhất của chúng ta. Tiện tay khóa vòi nước, giảm bớt sử dụng túi nilon dùng một lần, tích cực tham gia phân loại rác thải, những hành động tưởng chừng nhỏ bé này khi hội tụ lại chính là sức mạnh to lớn bảo vệ Trái Đất."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l8_1",
        type: "multiple_choice",
        question: "Từ nào thường đứng đầu câu để chỉ 'Cùng với sự phát triển của...'?",
        options: ["随着 (suízhe)", "按照 (ànzhào)", "顺着 (shùnzhe)", "趁着 (chènzhe)"],
        correctAnswer: "随着 (suízhe)",
        explanation: "随着 + Danh từ ( phát triển/thay đổi) biểu thị sự đồng biến."
      }
    ]
  },
  {
    id: "hsk4_l9",
    hskLevel: "HSK4",
    lessonNumber: 9,
    title: "Ý chí & Liên từ 哪怕",
    vietnameseTitle: "Bài 9: Nắng ấm sau giông bão (Nghị lực sống & Liên từ 哪怕)",
    description: "Học cách cổ vũ tinh thần, liên từ giả thiết nhượng bộ 哪怕...也... (cho dù... cũng...) và phó từ 依然.",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_42", "v_hsk4_43", "v_hsk4_44", "v_hsk4_45", "v_hsk4_46"],
    grammarPoints: [
      {
        id: "gp_hsk4_9_1",
        title: "Cặp liên từ giả thiết cực đoan: 哪怕 / 即使……也…… (Cho dù... cũng...)",
        structure: "哪怕 / 即使 + Giả thiết tình huống khó khăn nhất, Chủ ngữ + 也 / 依然 + Kiên định hành động",
        explanation: "Dùng để thể hiện ý chí quyết tâm sắt đá không gì lay chuyển nổi.",
        examples: [
          { hanzi: "哪怕只有百分之一的希望，我们也要付出百分之百的努力。", pinyin: "Nǎpà zhǐ yǒu bǎifēnzhīyī de xīwàng, wǒmen yě yào fùchū bǎifēnzhībǎi de nǔlì.", vietnamese: "Cho dù chỉ có 1% hy vọng, chúng ta cũng phải dốc 100% nỗ lực." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "教练 (Huấn luyện viên)",
        role: "Thể thao",
        hanzi: "比分落后不要紧，比赛还没结束，大家要有信心！",
        pinyin: "Bǐfēn luòhòu bú yàojǐn, bǐsài hái méi jiéshù, dàjiā yào yǒu xìnxīn!",
        vietnamese: "Tỷ số bị dẫn trước không sao cả, trận đấu vẫn chưa kết thúc, mọi người phải có niềm tin!"
      },
      {
        speaker: "队长 (Đội trưởng)",
        role: "Thể thao",
        hanzi: "教练放心，哪怕拼到最后一秒，我们也绝不放弃！",
        pinyin: "Jiàoliàn fàngxīn, nǎpà pīn dào zuìhòu yì miǎo, wǒmen yě jué bú fàngqì!",
        vietnamese: "Huấn luyện viên yên tâm, cho dù phải chiến đấu đến giây cuối cùng, chúng em cũng tuyệt đối không từ bỏ!"
      }
    ],
    readingPassage: {
      title: "追梦者的脚步 (Bước chân người theo đuổi ước mơ)",
      contentHanzi: "通往成功的道路从来不是一帆风顺的。每一位取得卓越成就的人，都经历过无数次的失败与磨难。阳光总在风雨后，不经历风雨，怎能见彩虹？",
      contentPinyin: "Tōngwǎng chénggōng de dàolù cónglái bú shì yìfānfēngshùn de. Měi yí wèi qǔdé zhuóyuè chéngjiù de rén, dōu jīnglì guo wúshù cì de shībài yǔ mónàn. Yángguāng zǒng zài fēngyǔ hòu, bù jīnglì fēngyǔ, zěn néng jiàn cǎihóng?",
      contentVietnamese: "Con đường dẫn tới thành công chưa bao giờ là thuận buồm xuôi gió. Bất kỳ ai đạt được thành tựu xuất chúng đều từng trải qua vô số lần thất bại và thử thách gian nan. Nắng ấm luôn xuất hiện sau bão giông, không trải qua phong ba, sao có thể ngắm cầu vồng rực rỡ?"
    },
    quizQuestions: [
      {
        id: "q_hsk4_l9_1",
        type: "multiple_choice",
        question: "Cặp từ '哪怕……也……' biểu thị ý nghĩa gì?",
        options: ["Giả thiết nhượng bộ (cho dù... cũng...)", "Nguyên nhân kết quả", "Tăng tiến", "Chọn lựa"],
        correctAnswer: "Giả thiết nhượng bộ (cho dù... cũng...)",
        explanation: "哪怕...也... là cấu trúc giả thiết nhượng bộ mức độ cao."
      }
    ]
  },
  {
    id: "hsk4_l10",
    hskLevel: "HSK4",
    lessonNumber: 10,
    title: "Hạnh phúc & Phó từ 究竟",
    vietnameseTitle: "Bài 10: Tiêu chuẩn của hạnh phúc (Triết lý sống & Phó từ 究竟)",
    description: "Bàn về định nghĩa hạnh phúc, phó từ 究竟 (rốt cuộc/suy cho cùng) và cấu trúc so sánh bằng 不如 (không bằng).",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_47", "v_hsk4_48", "v_hsk4_49", "v_hsk4_50", "v_hsk4_51"],
    grammarPoints: [
      {
        id: "gp_hsk4_10_1",
        title: "Phó từ: 究竟 (jiūjìng) - Rốt cuộc / Rốt cục (Văn viết & trang trọng hơn 到底)",
        structure: "究竟 + Câu nghi vấn HOẶC 究竟 + Biểu thị kết luận cuối cùng",
        explanation: "Dùng để truy vấn bản chất cốt lõi của một vấn đề hoặc làm rõ chân lý cuối cùng.",
        examples: [
          { hanzi: "幸福的真谛究竟是什么？", pinyin: "Xìngfú de zhēndì jiūjìng shì shénme?", vietnamese: "Chân lý đích thực của hạnh phúc rốt cuộc là gì?" },
          { hanzi: "他究竟还是想通了这个问题。", pinyin: "Tā jiūjìng háishì xiǎngtōng le zhè ge wèntí.", vietnamese: "Suy cho cùng thì anh ấy cũng đã nghĩ thông suốt vấn đề này." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Du học sinh",
        hanzi: "李老师，现代人物质生活丰富了，但很多人却觉得不幸福，幸福的标准究竟是什么？",
        pinyin: "Lǐ lǎoshī, xiàndài rén wùzhì shēnghuó fēngfù le, dàn hěn duō rén què juéde bù xìngfú, xìngfú de biāozhǔn jiūjìng shì shénme?",
        vietnamese: "Cô Lý ơi, đời sống vật chất của con người hiện đại đã đủ đầy hơn, nhưng nhiều người lại cảm thấy không hạnh phúc, tiêu chuẩn của hạnh phúc rốt cuộc là gì ạ?"
      },
      {
        speaker: "李老师 (Cô Lý)",
        role: "Giảng viên",
        hanzi: "幸福不是拥有多少财富，而在于内心是否充实、知足。懂得知足常乐的人才是最幸福的。",
        pinyin: "Xìngfú bú shì yōngyǒu duōshao cáifù, ér zàiyú nèixīn shìfǒu chōngshí, zhīzú. Dǒngde zhīzúchánglè de rén cái shì zuì xìngfú de.",
        vietnamese: "Hạnh phúc không phải là sở hữu bao nhiêu của cải, mà cốt ở nội tâm có phong phú đủ đầy và biết hài lòng hay không. Người hiểu được tri túc thường lạc mới là người hạnh phúc nhất."
      }
    ],
    readingPassage: {
      title: "知足常乐 (Biết đủ là vui)",
      contentHanzi: "幸福没有统一的标准答案。有人觉得住豪宅、开豪车是幸福；有人觉得一家人平平安安、围坐在一起吃晚饭就是最大的幸福。学会珍惜当下所拥有的，幸福就在身边。",
      contentPinyin: "Xìngfú méiyǒu tǒngyī de biāozhǔn dá'àn. Yǒu rén juéde zhù háozhái, kāi háochē shì xìngfú; yǒu rén juéde yì jiā rén píngpíng'ān'ān, wéizuò zài yìqǐ chī wǎnfàn jiù shì zuì dà de xìngfú. Xuéhuì zhēnxī dāngxià suǒ yōngyǒu de, xìngfú jiù zài shēnbiān.",
      contentVietnamese: "Hạnh phúc không có đáp án tiêu chuẩn thống nhất. Có người thấy ở biệt thự, lái siêu xe là hạnh phúc; có người lại thấy cả nhà bình an, quây quần bên nhau ăn bữa cơm tối chính là hạnh phúc lớn nhất. Học cách trân trọng những gì đang có ở hiện tại, hạnh phúc luôn ở ngay bên cạnh chúng ta."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l10_1",
        type: "multiple_choice",
        question: "Từ 究竟 đồng nghĩa và mang tính trang trọng hơn từ nào sau đây?",
        options: ["到底 (dàodǐ)", "本来 (běnlái)", "偶尔 (ǒu'ěr)", "差不多 (chàbuduō)"],
        correctAnswer: "到底 (dàodǐ)",
        explanation: "究竟 và 到底 đều mang nghĩa rốt cuộc, 究竟 trang trọng hơn."
      }
    ]
  },
  {
    id: "hsk4_l11",
    hskLevel: "HSK4",
    lessonNumber: 11,
    title: "Đọc sách & Liên từ 从而 / 进而",
    vietnameseTitle: "Bài 11: Đọc sách và tư duy (Văn hóa đọc & Liên từ 从而)",
    description: "Học phương pháp đọc hiểu học thuật, liên từ 从而 (từ đó dẫn đến), 进而 (tiến tới/hơn nữa).",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_52", "v_hsk4_53", "v_hsk4_54", "v_hsk4_55", "v_hsk4_56"],
    grammarPoints: [
      {
        id: "gp_hsk4_11_1",
        title: "Liên từ nhân quả logic: 从而 (cóng'ér) - Từ đó / Do đó (dẫn đến)",
        structure: "Phương pháp / Hành động ở vế 1, 从而 + Kết quả logic hoặc mục đích ở vế 2",
        explanation: "Dùng trong văn viết để liên kết hành vi phía trước dẫn đến kết quả hoặc chiều hướng phát triển tự nhiên phía sau.",
        examples: [
          { hanzi: "多读好书能开阔视野，从而提高个人的综合素养。", pinyin: "Duō dú hǎo shū néng kāikuò shìyě, cóng'ér tígāo gèrén de zōnghé sùyǎng.", vietnamese: "Đọc nhiều sách hay có thể mở rộng tầm mắt, từ đó nâng cao tố chất tổng hợp của bản thân." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "教授 (Giáo sư)",
        role: "Học thuật",
        hanzi: "同学们在阅读文献时，不仅要泛读，更要精读，善于提出问题。",
        pinyin: "Tóngxuémen zài yuèdú wénxiàn shí, bùjǐn yào fàndú, gèng yào jīngdú, shànyú tíchū wèntí.",
        vietnamese: "Các em khi đọc tài liệu không chỉ đọc lướt mà quan trọng hơn phải đọc kỹ, biết cách đặt ra vấn đề."
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Sinh viên",
        hanzi: "老师，深入思考能帮助我们理清论文逻辑，从而写出高质量的研究报告，对吗？",
        pinyin: "Lǎoshī, shēnrù sīkǎo néng bāngzhù wǒmen lǐqīng lùnwén luóji, cóng'ér xiě chū gāo zhìliàng de yánjiū bàogào, duì ma?",
        vietnamese: "Thưa thầy, tư duy sâu sắc có thể giúp chúng em làm sáng tỏ logic của luận văn, từ đó viết ra báo cáo nghiên cứu chất lượng cao, đúng không ạ?"
      }
    ],
    readingPassage: {
      title: "学思结合 (Học đi đôi với nghĩ)",
      contentHanzi: "孔子说：'学而不思则罔，思而不学则殆。' 读书如果只是死记硬背而不深入思考，就无法将知识转化为真正的能力。只有学思结合，才能融会贯通。",
      contentPinyin: "Kǒngzǐ shuō: 'Xué ér bù sī zé wǎng, sī ér bù xué zé dài.' Dúshū rúguǒ zhǐ shì sǐjìyìngbèi ér bù shēnrù sīkǎo, jiù wúfǎ jiāng zhīshi zhuǎnhuà wéi zhēnzhèng de nénglì. Zhǐyǒu xué sī jiéhé, cái néng rónghuìguàntōng.",
      contentVietnamese: "Khổng Tử từng dạy: 'Học mà không suy nghĩ thì mờ mịt, suy nghĩ mà không học thì nguy hại.' Đọc sách nếu chỉ học vẹt mà không suy ngẫm sâu sắc thì không thể chuyển hóa tri thức thành năng lực thực tế. Chỉ khi kết hợp chặt chẽ giữa học và nghĩ mới có thể thông hiểu thấu đáo."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l11_1",
        type: "multiple_choice",
        question: "Liên từ nào dùng trong văn viết biểu thị 'từ đó dẫn đến kết quả'?",
        options: ["从而 (cóng'ér)", "因而 (yīn'ér)", "反正 (fǎnzhèng)", "尽管 (jǐnguǎn)"],
        correctAnswer: "从而 (cóng'ér)",
        explanation: "从而 liên kết hành động dẫn tới mục đích/kết quả tiếp theo."
      }
    ]
  },
  {
    id: "hsk4_l12",
    hskLevel: "HSK4",
    lessonNumber: 12,
    title: "Khám phá khoa học & Liên từ 并且",
    vietnameseTitle: "Bài 12: Khoa học và khám phá (Khoa học & Liên từ song hành 并且)",
    description: "Học từ vựng khoa học công nghệ, liên từ đẳng lập 并且 (đồng thời và hơn nữa), tư duy phản biện.",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_57", "v_hsk4_58", "v_hsk4_59", "v_hsk4_60", "v_hsk4_61"],
    grammarPoints: [
      {
        id: "gp_hsk4_12_1",
        title: "Liên từ: 并且 (bìngqiě) - Và / Đồng thời / Hơn nữa",
        structure: "Hành động 1, 并且 + Hành động 2 (Thường cùng một chủ ngữ)",
        explanation: "Liên kết hai động từ hoặc cụm phân câu có mối quan hệ song hành hoặc tăng tiến.",
        examples: [
          { hanzi: "科学家提出了新的理论，并且通过实验验证了它。", pinyin: "Kēxuéjiā tíchū le xīn de lǐlùn, bìngqiě tōngguò shíyàn yànzhèng le tā.", vietnamese: "Các nhà khoa học đã đưa ra lý thuyết mới, đồng thời kiểm chứng nó thông qua thực nghiệm." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "研究员 (Nghiên cứu viên)",
        role: "Phòng thí nghiệm",
        hanzi: "这项新技术不仅大幅降低了生产成本，并且显著提高了产品的使用寿命。",
        pinyin: "Zhè xiàng xīn jìshù bùjǐn dàfú jiàngdī le shēngchǎn chéngběn, bìngqiě xiǎnzhù tígāo le chǎnpǐn de shǐyòng shòumìng.",
        vietnamese: "Kỹ thuật mới này không những giảm mạnh chi phí sản xuất, mà còn nâng cao đáng kể tuổi thọ sử dụng của sản phẩm."
      }
    ],
    readingPassage: {
      title: "探索未知 (Khám phá điều chưa biết)",
      contentHanzi: "人类探索自然的脚步从未停歇。每一次科学上的重大突破，都推动了人类文明的巨大飞跃。好奇心与坚持不懈的实证精神是科学探索的灵魂。",
      contentPinyin: "Rénlèi tànsuǒ zìrán de jiǎobù cóngwèi tíngxiē. Měi yí cì kēxué shang de zhòngdà tūtò, dōu tuīdòng le rénlèi wénmíng de jùdà fēiyuè. Hàoqíxīn yǔ jiānchíbúxiè de shízhèng jīngshén shì kēxué tànsuǒ de línghún.",
      contentVietnamese: "Bước chân khám phá tự nhiên của nhân loại chưa từng ngơi nghỉ. Mỗi một đột phá trọng đại trong khoa học đều thúc đẩy bước nhảy vọt vĩ đại của nền văn minh loài người. Lòng hiếu kỳ và tinh thần thực chứng kiên trì bền bỉ chính là linh hồn của khám phá khoa học."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l12_1",
        type: "multiple_choice",
        question: "Từ 并且 đóng vai trò gì trong câu?",
        options: ["Liên từ nối hai hành động/mệnh đề song hành và tăng tiến", "Giới từ chỉ nơi chốn", "Trợ từ ngữ khí", "Tính từ miêu tả"],
        correctAnswer: "Liên từ nối hai hành động/mệnh đề song hành và tăng tiến",
        explanation: "并且 là liên từ song hành/tăng tiến mang nghĩa 'và / đồng thời'."
      }
    ]
  },
  {
    id: "hsk4_l13",
    hskLevel: "HSK4",
    lessonNumber: 13,
    title: "Văn hóa trà đạo & Từ 所谓",
    vietnameseTitle: "Bài 13: Nghệ thuật thưởng trà (Văn hóa Trà đạo & Cụm từ 所谓)",
    description: "Khám phá văn hóa trà truyền thống Trung Hoa, từ 所谓 (cái gọi là), phẩm chất trà đạo.",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_62", "v_hsk4_63", "v_hsk4_64", "v_hsk4_65", "v_hsk4_66"],
    grammarPoints: [
      {
        id: "gp_hsk4_13_1",
        title: "Từ chỉ khái niệm: 所谓 (suǒwèi) - Cái gọi là / Điều gọi là",
        structure: "所谓 + Danh từ / Khái niệm + 就是 / 是指 + Định nghĩa",
        explanation: "Dùng để giải thích hoặc định nghĩa một thuật ngữ chuyên ngành hay một quan niệm phổ biến.",
        examples: [
          { hanzi: "所谓茶道，就是通过品茶来修身养性。", pinyin: "Suǒwèi chádào, jiù shì tōngguò pǐn chá lái xiūshēnyǎngxìng.", vietnamese: "Cái gọi là Trà đạo chính là thông qua việc thưởng trà để tu thân dưỡng tính." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "茶艺师 (Nghệ nhân trà)",
        role: "Trà quán",
        hanzi: "品茶讲究心静。所谓'品'，就是要细细体会茶汤回甘的滋味。",
        pinyin: "Pǐn chá jiǎngjiu xīnjìng. Suǒwèi 'pǐn', jiù shì yào xìxì tǐhuì chátāng huígān de zīwèi.",
        vietnamese: "Thưởng trà coi trọng sự tĩnh tâm. Cái gọi là 'thưởng thức' chính là phải từ tốn cảm nhận vị ngọt hậu của chén trà."
      }
    ],
    readingPassage: {
      title: "中国茶文化 (Văn hóa trà Trung Quốc)",
      contentHanzi: "中国是茶的故乡。茶不仅是一种健康的饮品，更承载着深厚的东方哲学。以茶会友、以茶待客，体现了谦逊与礼让的美德。",
      contentPinyin: "Zhōngguó shì chá de gùxiāng. Chá bùjǐn shì yì zhǒng jiànkāng de yǐnpǐn, gèng chéngzàizhe shēnhòu de dōngfāng zhéxué. Yǐ chá huì yǒu, yǐ chá dài kè, tǐxiàn le qiānxùn yǔ lǐràng de měidé.",
      contentVietnamese: "Trung Quốc là quê hương của trà. Trà không chỉ là một thức uống có lợi cho sức khỏe mà còn chuyên chở triết học phương Đông sâu sắc. Lấy trà kết giao bạn hữu, lấy trà tiếp đón khách quý, thể hiện trọn vẹn mỹ đức khiêm tốn và nhã nhặn."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l13_1",
        type: "multiple_choice",
        question: "Từ nào dùng để giới thiệu hoặc định nghĩa một khái niệm ('cái gọi là...')?",
        options: ["所谓 (suǒwèi)", "然而 (rán'ér)", "至于 (zhìyú)", "以免 (yǐmiǎn)"],
        correctAnswer: "所谓 (suǒwèi)",
        explanation: "所谓 mang nghĩa cái gọi là, dùng trước khái niệm cần định nghĩa."
      }
    ]
  },
  {
    id: "hsk4_l14",
    hskLevel: "HSK4",
    lessonNumber: 14,
    title: "Tình cảm gia đình & Liên từ 免得",
    vietnameseTitle: "Bài 14: Cha mẹ và con cái (Gia đình & Liên từ phòng ngừa 免得)",
    description: "Bàn về khoảng cách thế hệ và sự thấu hiểu gia đình, liên từ mục đích phòng ngừa 免得 / 以免 (để tránh, kẻo).",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_67", "v_hsk4_68", "v_hsk4_69", "v_hsk4_70", "v_hsk4_71"],
    grammarPoints: [
      {
        id: "gp_hsk4_14_1",
        title: "Liên từ phòng ngừa hậu quả xấu: 免得 / 以免 (miǎnde / yǐmiǎn) - Để tránh / Kẻo mà",
        structure: "Hành động dự phòng ở vế 1, 免得 / 以免 + Hậu quả không mong muốn ở vế 2",
        explanation: "Dùng để diễn giải lý do thực hiện hành động nhằm ngăn ngừa tình huống xấu xảy ra.",
        examples: [
          { hanzi: "出门多穿点儿衣服，免得感冒。", pinyin: "Chūmén duō chuān diǎnr yīfu, miǎnde gǎnmào.", vietnamese: "Ra ngoài mặc thêm nhiều áo vào một chút kẻo bị cảm lạnh." },
          { hanzi: "常给家里打个电话报平安，免得父母担心。", pinyin: "Cháng gěi jiā li dǎ ge diànhuà bào píng'ān, miǎnde fùmǔ dānxīn.", vietnamese: "Thường xuyên gọi điện về nhà báo bình an để bố mẹ khỏi lo lắng." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Con cái",
        hanzi: "妈妈，我周末要参加学术讲座，提前跟您说一声，免得您做我的饭。",
        pinyin: "Māma, wǒ zhōumò yào cānjiā xuéshù jiǎngzuò, tíqián gēn nín shuō yì shēng, miǎnde nín zuò wǒ de fàn.",
        vietnamese: "Mẹ ơi, cuối tuần con tham gia tọa đàm học thuật, con báo trước với mẹ một tiếng kẻo mẹ lại nấu cơm phần con."
      }
    ],
    readingPassage: {
      title: "常回家看看 (Thường xuyên về thăm nhà)",
      contentHanzi: "随着年龄增长，子女有了自己的事业与生活，陪伴父母的时间越来越少。其实父母不需要多么丰厚的物质回报，常回家看看、多陪他们聊聊天就是最好的孝顺。",
      contentPinyin: "Suízhe niánlíng zēngzhǎng, zǐnǚ yǒu le zìjǐ de shìyè yǔ shēnghuó, péibàn fùmǔ de shíjiān yuèláiyuè shǎo. Qíshí fùmǔ bù xūyào duōme fēnghòu de wùzhì huíbào, cháng huí jiā kànkan, duō péi tāmen liáoliáo tiān jiù shì zuì hǎo de xiàoshùn.",
      contentVietnamese: "Cùng với năm tháng lớn khôn, con cái có sự nghiệp và cuộc sống riêng, thời gian ở bên cha mẹ ngày càng ít ỏi. Thực ra cha mẹ không cần sự báo đáp vật chất giàu sang, thường xuyên về nhà thăm nom, trò chuyện tâm sự cùng cha mẹ chính là lòng hiếu thảo đẹp nhất."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l14_1",
        type: "multiple_choice",
        question: "Điền liên từ phòng ngừa thích hợp: '早点出门，_____迟到了。'",
        options: ["免得 (miǎnde)", "反而 (fǎn'ér)", "哪怕 (nǎpà)", "难道 (nándào)"],
        correctAnswer: "免得 (miǎnde)",
        explanation: "免得 mang nghĩa 'kẻo mà / để tránh bị trễ'."
      }
    ]
  },
  {
    id: "hsk4_l15",
    hskLevel: "HSK4",
    lessonNumber: 15,
    title: "Phong tục tập quán & Giới từ 至于",
    vietnameseTitle: "Bài 15: Lễ hội truyền thống (Phong tục lễ tết & Giới từ chuyển ý 至于)",
    description: "Tìm hiểu Tết Nguyên Đán, Tết Trung Thu, Tết Đoan Ngọ, giới từ chuyển tiếp 至于 (còn về/đối với).",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_72", "v_hsk4_73", "v_hsk4_74", "v_hsk4_75", "v_hsk4_76"],
    grammarPoints: [
      {
        id: "gp_hsk4_15_1",
        title: "Giới từ chuyển tiếp chủ đề: 至于 (zhìyú) - Còn về / Đối với",
        structure: "Vấn đề A đã được giải quyết / nói xong, 至于 + Vấn đề B (chủ đề mới cần nhắc đến)",
        explanation: "Dùng để chuyển sang bàn luận một đối tượng khác có liên quan.",
        examples: [
          { hanzi: "大件行李我已经寄走了，至于随身物品，我自己带着就行。", pinyin: "Dàjiàn xínglǐ wǒ yǐjīng jì zǒu le, zhìyú suíshēn wùpǐn, wǒ zìjǐ dài zhe jiù xíng.", vietnamese: "Hành lý cồng kềnh tôi đã gửi đi rồi, còn về đồ dùng tùy thân thì tôi tự mang theo là được." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Học sinh",
        hanzi: "中秋节我们留学生要包饺子，至于晚会节目的彩排，安排在明天下午。",
        pinyin: "Zhōngqiūjié wǒmen liúxuéshēng yào bāo jiǎozi, zhìyú wǎnhuì jiémù de cǎipái, ānpái zài míngtiān xiàwǔ.",
        vietnamese: "Tết Trung Thu du học sinh chúng mình sẽ gói sủi cảo, còn về việc tổng duyệt tiết mục văn nghệ thì xếp vào chiều mai nhé."
      }
    ],
    readingPassage: {
      title: "团圆的中秋 (Trung Thu đoàn viên)",
      contentHanzi: "中秋节自古以来就是象征团圆的节日。每逢农历八月十五，人们一边品尝美味的月饼，一边欣赏天空中圆满明亮的皎月，寄托对远方亲人的思念。",
      contentPinyin: "Zhōngqiūjié zìgǔyǐlái jiù shì xiàngzhēng tuányuán de jiérì. Měi féng nónglì bā yuè shíwǔ, rénmen yìbiān pǐncháng měiwèi de yuèbǐng, yìbiān xīnshǎng tiānkōng zhōng yuánmǎn míngliàng de jiǎoyuè, jìtuō duì yuǎnfāng qīnrén de sīniàn.",
      contentVietnamese: "Tết Trung Thu từ xưa đến nay luôn là lễ hội tượng trưng cho sự đoàn viên viên mãn. Mỗi dịp Rằm tháng Tám âm lịch, mọi người vừa thưởng thức bánh trung thu thơm ngon vừa ngắm vầng trăng rằm sáng vằng vặc trên bầu trời, gửi gắm nỗi nhớ thương da diết tới những người thân nơi phương xa."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l15_1",
        type: "multiple_choice",
        question: "Từ nào dùng để chuyển hướng sang chủ đề mới ('còn về/đối với...')?",
        options: ["至于 (zhìyú)", "关于 (guānyú)", "对于 (duìyú)", "基于 (jīyú)"],
        correctAnswer: "至于 (zhìyú)",
        explanation: "至于 biểu thị chuyển tiếp chủ đề nói sang khía cạnh khác."
      }
    ]
  },
  {
    id: "hsk4_l16",
    hskLevel: "HSK4",
    lessonNumber: 16,
    title: "Công nghệ số & Cấu trúc 由……组成",
    vietnameseTitle: "Bài 16: Công nghệ số và đời sống (Công nghệ thông minh & Cấu trúc 由……组成)",
    description: "Học về trí tuệ nhân tạo, thanh toán di động, cấu trúc 由...组成 (được cấu thành bởi/do... tạo nên).",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_77", "v_hsk4_78", "v_hsk4_79", "v_hsk4_80", "v_hsk4_81"],
    grammarPoints: [
      {
        id: "gp_hsk4_16_1",
        title: "Cấu trúc thành phần cấu tạo: 由……组成 / 构成",
        structure: "Tổng thể + 由 + Các bộ phận cấu thành + 组成 / 构成",
        explanation: "Dùng để biểu thị một hệ thống, tổ chức hoặc cấu trúc được tạo thành từ các yếu tố nào.",
        examples: [
          { hanzi: "这个科研团队由来自五所顶尖大学的专家组成。", pinyin: "Zhè ge kēyán tuánduì yóu láizì wǔ suǒ dǐngjiān dàxué de zhuānjiā zǔchéng.", vietnamese: "Đội ngũ nghiên cứu khoa học này được tạo thành bởi các chuyên gia đến từ 5 trường đại học hàng đầu." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "工程师 (Kỹ sư)",
        role: "Công nghệ",
        hanzi: "这套智能家居系统由中央控制系统和多个传感器组成，可以通过手机远程控制所有家电。",
        pinyin: "Zhè tào zhìnéng jiājū xìtǒng yóu zhōngyāng kòngzhì xìtǒng hé duō ge chuángǎnqì zǔchéng, kěyǐ tōngguò shǒujī yuǎnchéng kòngzhì suǒyǒu jiādiàn.",
        vietnamese: "Hệ thống nhà thông minh này bao gồm hệ thống điều khiển trung tâm và nhiều cảm biến, có thể điều khiển từ xa tất cả thiết bị gia dụng qua điện thoại."
      }
    ],
    readingPassage: {
      title: "智慧生活的时代 (Kỷ nguyên sống thông minh)",
      contentHanzi: "移动支付、人工智能、高速铁路……科技的高速发展彻底重塑了现代人的生活方式。它打破了地域界限，让信息传递与资源共享变得前所未有的高效便捷。",
      contentPinyin: "Yídòng zhīfù, réngōng zhìnéng, gāosù tiělù... Kējì de gāosù fāzhǎn chèdǐ zhòngsù le xiàndàirén de shēnghuó fāngshì. Tā dǎpò le dìyù jièxiàn, ràng xìnxī chuándì yǔ zīyuán gòngxiǎng biàn de qiánsuǒwèiyǒu de gāoxiào biànjié.",
      contentVietnamese: "Thanh toán di động, trí tuệ nhân tạo, đường sắt cao tốc... Sự phát triển vượt bậc của công nghệ đã định hình lại hoàn toàn phương thức sinh hoạt của con người hiện đại. Công nghệ phá vỡ ranh giới địa lý, giúp việc truyền tải thông tin và chia sẻ tài nguyên trở nên hiệu quả và thuận tiện hơn bao giờ hết."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l16_1",
        type: "multiple_choice",
        question: "Cấu trúc chuẩn để nói 'Ủy ban này do 7 thành viên tạo thành':",
        options: ["这个委员会由七名成员组成 (Zhè ge wěiyuánhuì yóu qī míng chéngyuán zǔchéng)", "这个委员会由七名成员组 (Zhè ge wěiyuánhuì yóu qī míng chéngyuán zǔ)", "这个委员会被七名成员组成 (Zhè ge wěiyuánhuì bèi qī míng chéngyuán zǔchéng)", "这个委员会在七名成员组成 (Zhè ge wěiyuánhuì zài qī míng chéngyuán zǔchéng)"],
        correctAnswer: "这个委员会由七名成员组成 (Zhè ge wěiyuánhuì yóu qī míng chéngyuán zǔchéng)",
        explanation: "Cấu trúc: Tổng thể + 由 + Thành phần + 组成."
      }
    ]
  },
  {
    id: "hsk4_l17",
    hskLevel: "HSK4",
    lessonNumber: 17,
    title: "Giao tiếp & Phó từ 反而",
    vietnameseTitle: "Bài 17: Nghệ thuật giao tiếp ứng xử (Tương tác xã hội & Phó từ 反而)",
    description: "Học cách ứng xử khéo léo trong xã hội, phó từ 反而 (ngược lại, trái lại), liên từ 难怪 (thảo nào/hóa ra là vậy).",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_82", "v_hsk4_83", "v_hsk4_84", "v_hsk4_85", "v_hsk4_86"],
    grammarPoints: [
      {
        id: "gp_hsk4_17_1",
        title: "Phó từ biểu thị sự trái ngược nghịch lý: 反而 (fǎn'ér) - Trái lại / Ngược lại",
        structure: "Tình huống thông thường ở vế 1, Chủ ngữ + 反而 + Kết quả bất ngờ trái lẽ thường ở vế 2",
        explanation: "Biểu thị sự việc diễn biến hoàn toàn trái ngược với lẽ tự nhiên hoặc điều mong đợi.",
        examples: [
          { hanzi: "吃了感冒药之后，他不但没好，反而更难受了。", pinyin: "Chī le gǎnmàoyào zhīhòu, tā búdàn méi hǎo, fǎn'ér gèng nánshòu le.", vietnamese: "Sau khi uống thuốc cảm, cậu ấy chẳng những không đỡ mà trái lại còn khó chịu hơn." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "小李 (Tiểu Lý)",
        role: "Công sở",
        hanzi: "我和同事沟通时据理力争，结果反而闹得大家都很尴尬。",
        pinyin: "Wǒ hé tóngshì gōutōng shí jùlǐlìzhēng, jiéguǒ fǎn'ér nào de dàjiā dōu hěn gāngà.",
        vietnamese: "Khi tôi trao đổi với đồng nghiệp thì cố gắng cãi lý cho bằng được, kết quả ngược lại làm mọi người đều rất ngượng ngùng khó xử."
      },
      {
        speaker: "张经理 (Quản lý Trương)",
        role: "Công sở",
        hanzi: "人际交往中，委婉包容往往比一味争辩更有效，多站在对方角度思考问题。",
        pinyin: "Rénjì jiāowǎng zhōng, wěiwǎn bāoróng wǎngwǎng bǐ yíwèi zhēngbiàn gèng yǒuxiào, duō zhàn zài duìfāng jiǎodù sīkǎo wèntí.",
        vietnamese: "Trong giao tiếp ứng xử, sự khéo léo uyển chuyển và bao dung thường hiệu quả hơn việc cứ khăng khăng tranh cãi, hãy biết đặt mình vào góc độ của đối phương để suy nghĩ."
      }
    ],
    readingPassage: {
      title: "倾听的力量 (Sức mạnh của sự lắng nghe)",
      contentHanzi: "优秀的沟通者往往不是最能说会道的人，而是最懂得专注倾听的人。真诚地倾听不仅能赢得他人的信任，更能化解矛盾，搭建起心灵沟通的桥梁。",
      contentPinyin: "Yōuxiù de gōutōngzhě wǎngwǎng bú shì zuì néngshuōhuìdào de rén, ér shì zuì dǒngde zhuānzhù qīngtīng de rén. Zhēnchéng de qīngtīng bùjǐn néng yíngdé tārén de xìnrèn, gèng néng huàjiě máodùn, dājiàn qǐ xīnlíng gōutōng de qiáoliáng.",
      contentVietnamese: "Một người giao tiếp xuất sắc thường không phải là người ăn nói lưu loát nhất, mà là người biết tập trung lắng nghe nhất. Lắng nghe chân thành không những chiếm trọn sự tin tưởng của người khác mà còn hóa giải mâu thuẫn, bắc nên nhịp cầu thấu hiểu tâm hồn."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l17_1",
        type: "multiple_choice",
        question: "Từ nào biểu thị kết quả diễn ra hoàn toàn trái ngược với dự đoán ban đầu?",
        options: ["反而 (fǎn'ér)", "因而 (yīn'ér)", "然而 (rán'ér)", "反正 (fǎnzhèng)"],
        correctAnswer: "反而 (fǎn'ér)",
        explanation: "反而 biểu thị chiều hướng trái ngược nghịch lý (ngược lại / trái lại)."
      }
    ]
  },
  {
    id: "hsk4_l18",
    hskLevel: "HSK4",
    lessonNumber: 18,
    title: "Bản lĩnh & Tính từ 难免",
    vietnameseTitle: "Bài 18: Đối mặt áp lực và thất bại (Tâm lý học & Tính từ 难免)",
    description: "Rèn luyện sự bền bỉ tinh thần, tính từ/phó từ 难免 (khó tránh khỏi), động từ 克服 (khắc phục/vượt qua).",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_87", "v_hsk4_88", "v_hsk4_89", "v_hsk4_90", "v_hsk4_91"],
    grammarPoints: [
      {
        id: "gp_hsk4_18_1",
        title: "Từ biểu thị tính tất yếu khó tránh khỏi: 难免 (nánmiǎn) - Khó tránh khỏi",
        structure: "Tình huống khách quan, Chủ ngữ + 难免 (会) + Kết quả tất yếu",
        explanation: "Biểu thị trong hoàn cảnh đó thì việc phát sinh sai sót hoặc cảm xúc tiêu cực là điều tự nhiên khó tránh.",
        examples: [
          { hanzi: "初次登台演讲，心里难免会有些紧张。", pinyin: "Chū cì dēngtái yǎnjiǎng, xīn lǐ nánmiǎn huì yǒuxiē jǐnzhāng.", vietnamese: "Lần đầu tiên bước lên sân khấu thuyết trình, trong lòng khó tránh khỏi có chút hồi hộp." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "大卫 (David)",
        role: "Sinh viên",
        hanzi: "这次实验我又失败了，感觉自己很不适合做科研。",
        pinyin: "Zhè cì shíyàn wǒ yòu shībài le, gǎnjué zìjǐ hěn bù shìhé zuò kēyán.",
        vietnamese: "Thí nghiệm lần này mình lại thất bại rồi, cảm thấy bản thân thật không hợp làm nghiên cứu khoa học."
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Sinh viên",
        hanzi: "别灰心！探索新领域难免会走弯路，从失败中总结教训才是最宝贵的财富。",
        pinyin: "Bié huīxīn! Tànsuǒ xīn lǐngyù nánmiǎn huì zǒu wānlù, cóng shībài zhōng zǒngjié jiàoxun cái shì zuì bǎoguì de cáifù.",
        vietnamese: "Đừng nản lòng! Khám phá lĩnh vực mới khó tránh khỏi những lúc đi đường vòng, đúc rút bài học từ thất bại mới chính là tài sản quý giá nhất."
      }
    ],
    readingPassage: {
      title: "抗压能力与成长 (Sức chịu đựng áp lực và sự trưởng thành)",
      contentHanzi: "挫折是人生的试金石。面对重重压力，弱者选择逃避与抱怨，而强者则将其视为锤炼意志的契机。拥有强大的心理抗压韧性，才能在人生风浪中立于不败之地。",
      contentPinyin: "Cuòzhé shì rénshēng de shìjīnshí. Miànduì chóngchóng yālì, ruòzhě xuǎnzé táobì yǔ bàoyuàn, ér qiángzhě zé jiāng qí shì wéi chuíliàn yìzhì de qìjī. Yōngyǒu qiángdà de xīnlǐ kàngyā rènxìng, cái néng zài rénshēng fēnglàng zhōng lìyú búbàizhīdì.",
      contentVietnamese: "Trắc trở là viên đá thử vàng của đời người. Đối mặt với muôn vàn áp lực, kẻ yếu chọn cách trốn tránh và than vãn, trong khi người mạnh mẽ lại coi đó là cơ hội tôi luyện ý chí. Sở hữu bản lĩnh tâm lý vững vàng mới có thể đứng vững trước mọi sóng gió cuộc đời."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l18_1",
        type: "multiple_choice",
        question: "Từ nào diễn đạt 'khó tránh khỏi xảy ra'?",
        options: ["难免 (nánmiǎn)", "难道 (nándào)", "未免 (wèimiǎn)", "以免 (yǐmiǎn)"],
        correctAnswer: "难免 (nánmiǎn)",
        explanation: "难免 biểu thị tính quy luật khách quan khó tránh khỏi."
      }
    ]
  },
  {
    id: "hsk4_l19",
    hskLevel: "HSK4",
    lessonNumber: 19,
    title: "Du lịch khám phá & Cụm từ 无论如何",
    vietnameseTitle: "Bài 19: Ý nghĩa của những chuyến đi (Du lịch & Cụm từ 无论如何)",
    description: "Khám phá chiều sâu văn hóa của du lịch, quán ngữ 无论如何 (bằng bất cứ giá nào/dù thế nào chăng nữa).",
    estimatedMinutes: 30,
    vocabularyIds: ["v_hsk4_92", "v_hsk4_93", "v_hsk4_94", "v_hsk4_95", "v_hsk4_96"],
    grammarPoints: [
      {
        id: "gp_hsk4_19_1",
        title: "Quán ngữ biểu thị quyết tâm tuyệt đối: 无论如何 (wúlùn rúhé) - Dù thế nào chăng nữa / Bằng mọi giá",
        structure: "无论如何 + 主语 + 都要 / 不能 + 动作",
        explanation: "Dùng để nhấn mạnh sự kiên quyết thực hiện một mục tiêu bất kể hoàn cảnh nào.",
        examples: [
          { hanzi: "无论如何，我今年都要去一次西藏旅游。", pinyin: "Wúlùn rúhé, wǒ jīnnián dōu yào qù yí cì Xīzàng lǚyóu.", vietnamese: "Dù thế nào đi chăng nữa, năm nay tôi cũng nhất định phải đi du lịch Tây Tạng một chuyến." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "小张 (Tiểu Trương)",
        role: "Bạn du lịch",
        hanzi: "去远方旅行虽然路途遥远又辛苦，但能亲眼看看外面的世界，无论如何都是值得的。",
        pinyin: "Qù yuǎnfāng lǚxíng suīrán lùtú yáoyuǎn yòu xīnkǔ, dàn néng qīnyǎn kànkan wàimiàn de shìjiè, wúlùn rúhé dōu shì zhídé de.",
        vietnamese: "Đi du lịch nơi xa xôi tuy chặng đường dài lại vất vả, nhưng được tận mắt ngắm nhìn thế giới bên ngoài thì dù thế nào cũng hoàn toàn xứng đáng."
      }
    ],
    readingPassage: {
      title: "读万卷书，行万里路 (Đọc muôn cuốn sách, đi muôn dặm đường)",
      contentHanzi: "古人云：'读万卷书，行万里路。' 旅行不仅是观赏自然风光，更是一场心灵的洗礼。走进不同的风土人情，体验多元的文化，能让我们的胸怀更加宽广包容。",
      contentPinyin: "Gǔrén yún: 'Dú wàn juǎn shū, xíng wàn lǐ lù.' Lǚxíng bùjǐn shì guānshǎng zìrán fēngguāng, gèng shì yì chǎng xīnlíng de xǐlǐ. Zǒujìn bùtóng de fēngtǔ rénqíng, tǐyàn duōyuán de wénhuà, néng ràng wǒmen de xiōnghuái gèngjiā kuānguǎng bāoróng.",
      contentVietnamese: "Cổ nhân nói: 'Đọc muôn cuốn sách, đi muôn dặm đường.' Du lịch không chỉ là thưởng ngoạn phong cảnh thiên nhiên mà còn là một chuyến gột rửa tâm hồn. Hòa mình vào các phong tục tập quán khác nhau, trải nghiệm nền văn hóa đa dạng sẽ giúp lòng dạ chúng ta thêm rộng mở và bao dung."
    },
    quizQuestions: [
      {
        id: "q_hsk4_l19_1",
        type: "multiple_choice",
        question: "Cụm quán ngữ nào mang ý nghĩa 'Dù thế nào chăng nữa'?",
        options: ["无论如何 (wúlùn rúhé)", "总而言之 (zǒng'éryánzhī)", "显而易见 (xiǎn'éryìjiàn)", "莫名其妙 (mòmíngqímiào)"],
        correctAnswer: "无论如何 (wúlùn rúhé)",
        explanation: "无论如何 biểu thị sự kiên định trong mọi hoàn cảnh."
      }
    ]
  },
  {
    id: "hsk4_l20",
    hskLevel: "HSK4",
    lessonNumber: 20,
    title: "HSK4 Toàn diện & Liên từ 总之",
    vietnameseTitle: "Bài 20: Ước mơ và kiên trì (Tổng kết toàn diện HSK 4 & Liên từ 总之)",
    description: "Tổng kết 1200 từ vựng và toàn bộ kết cấu ngữ pháp HSK 4, liên từ tóm tắt 总之 (tóm lại/nói chung).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk4_97", "v_hsk4_98", "v_hsk4_99", "v_hsk4_100", "v_hsk4_101"],
    grammarPoints: [
      {
        id: "gp_hsk4_20_1",
        title: "Liên từ kết luận: 总之 (zǒngzhī) - Tóm lại / Nói tóm lại là",
        structure: "Trình bày nhiều khía cạnh ở đoạn trên, 总之 + Câu đúc kết cốt lõi",
        explanation: "Dùng để tóm tắt các luận điểm vừa nêu thành một kết luận ngắn gọn, súc tích.",
        examples: [
          { hanzi: "学汉语需要多听、多读、多写，总之，坚持就是胜利。", pinyin: "Xué Hànyǔ xūyào duō tīng, duō dú, duō xiě, zǒngzhī, jiānchí jiù shì shènglì.", vietnamese: "Học tiếng Trung cần nghe nhiều, đọc nhiều, viết nhiều, tóm lại kiên trì chính là thắng lợi." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "老师 (Thầy giáo)",
        role: "Giảng đường",
        hanzi: "恭喜大家学完了HSK四级的全部课程！大家有什么感想？",
        pinyin: "Gōngxǐ dàjiā xué wán le HSK sì jí de quánbù kèchéng! Dàjiā yǒu shénme gǎnxiǎng?",
        vietnamese: "Chúc mừng cả lớp đã hoàn thành toàn bộ khóa học HSK cấp 4! Các em có cảm nghĩ gì không?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Học sinh",
        hanzi: "虽然学习过程中遇到了很多语法难点，但总之，只要付出了汗水，就一定会有沉甸甸的收获！",
        pinyin: "Suīrán xuéxí guòchéng zhōng yùdào le hěn duō yǔfǎ nándiǎn, dàn zǒngzhī, zhǐyào fùchū le hànshuǐ, jiù yídìng huì yǒu chéndiāndiān de shōuhuò!",
        vietnamese: "Tuy trong quá trình học đã gặp rất nhiều điểm ngữ pháp hóc búa, nhưng tóm lại, chỉ cần đổ mồ hôi công sức thì nhất định sẽ gặt hái được những thành quả ngọt ngào!"
      }
    ],
    readingPassage: {
      title: "HSK四级总结 (Tổng kết năng lực HSK 4)",
      contentHanzi: "掌握HSK四级意味着你已经具备了1200个核心词汇量，能够就广泛领域的话题用中文进行流畅、连贯的交流，并能阅读中等难度的中文原版文章。这是通往高级汉语水平的关键里程碑！",
      contentPinyin: "Zhǎngwò HSK sì jí yìwèizhe nǐ yǐjīng jùbèi le yíqiān'èrbǎi ge héxīn cíhuìliàng, nénggòu jiù guǎngfàn lǐngyù de huàtí yòng Zhōngwén jìnxíng liúchàng, liánguàn de jiāoliú, bìng néng yuèdú zhōngděng nándù de Zhōngwén yuánbǎn wénzhāng. Zhè shì tōngwǎng gāojí Hànyǔ shuǐpíng de guānjiàn lǐchéngbēi!",
      contentVietnamese: "Làm chủ HSK cấp 4 đồng nghĩa với việc bạn đã trang bị vốn từ vựng 1200 từ cốt lõi, có khả năng dùng tiếng Trung giao tiếp trôi chảy, mạch lạc về các chủ đề trên nhiều lĩnh vực rộng mở, đồng thời có thể đọc hiểu các bài báo tiếng Trung nguyên bản có độ khó vừa phải. Đây chính là cột mốc lịch sử quan trọng trên con đường tiến tới trình độ tiếng Trung cao cấp!"
    },
    quizQuestions: [
      {
        id: "q_hsk4_l20_1",
        type: "multiple_choice",
        question: "Liên từ nào dùng để đúc kết toàn bộ ý kiến thành một câu kết luận ngắn gọn?",
        options: ["总之 (zǒngzhī)", "即使 (jíshǐ)", "与其 (yǔqí)", "哪怕 (nǎpà)"],
        correctAnswer: "总之 (zǒngzhī)",
        explanation: "总之 mang nghĩa 'tóm lại / nói chung quy lại'."
      }
    ]
  }
];
