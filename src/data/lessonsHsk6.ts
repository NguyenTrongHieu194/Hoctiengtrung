import { Lesson } from "../types";

export const HSK6_LESSONS: Lesson[] = [
  {
    id: "hsk6_l1",
    hskLevel: "HSK6",
    lessonNumber: 1,
    title: "Văn học cổ điển & Động từ 兼具",
    vietnameseTitle: "Bài 1: Sở Từ và nguồn gốc văn học cổ điển (Khuất Nguyên & Động từ 兼具)",
    description: "Nghiên cứu kiệt tác Ly Tao của Khuất Nguyên, chủ nghĩa lãng mạn phương Đông, động từ trang trọng 兼具 (đồng thời hội tụ).",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_01", "v_hsk6_02", "v_hsk6_03", "v_hsk6_04", "v_hsk6_05", "v_hsk6_06"],
    grammarPoints: [
      {
        id: "gp_hsk6_1_1",
        title: "Động từ biểu thị phẩm chất kép: 兼具 (jiānjù) - Đồng thời hội tụ / Mang cả hai",
        structure: "Chủ thể + 兼具 + Thuộc tính A 与 Thuộc tính B",
        explanation: "Dùng trong văn phong nghiên cứu phê bình đỉnh cao để khẳng định một đối tượng sở hữu trọn vẹn cả hai phẩm chất quý giá.",
        examples: [
          { hanzi: "《楚辞》兼具奔放的浪漫主义色彩与深沉的忧患意识。", pinyin: "《Chǔcí》 jiānjù bēnfàng de làngmànzhǔyì sècǎi yǔ shēnchén de yōuhuàn yìshí.", vietnamese: "Tác phẩm Sở Từ vừa hội tụ sắc thái lãng mạn phóng khoáng, vừa mang ý thức lo âu sâu sắc trước vận mệnh đất nước." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "文学研究所所长 (Viện trưởng Viện Văn học)",
        role: "Viện Hàn lâm",
        hanzi: "屈原的《离骚》在中国文学史上开辟了浪漫主义传统的先河，其辞藻华美、意境恢宏，兼具极高的审美价值与思想深度。",
        pinyin: "Qū Yuán de 《Lísāo》 zài Zhōngguó wénxuéshǐ shang kāipì le làngmànzhǔyì chuántǒng de xiānhé, qí cízǎo huáměi, yìjìng huīhóng, jiānjù jí gāo de shěnměi jiàzhí yǔ sīxiǎng shēndù.",
        vietnamese: "Tác phẩm 'Ly Tao' của Khuất Nguyên đã mở ra dòng chảy truyền thống lãng mạn trong lịch sử văn học Trung Quốc, ca từ lộng lẫy, ý cảnh hào hùng, đồng thời hội tụ giá trị mỹ học đỉnh cao và chiều sâu tư tưởng uyên thâm."
      }
    ],
    readingPassage: {
      title: "楚辞之魂 (Linh hồn của Sở Từ)",
      contentHanzi: "《楚辞》以南方楚地的神话传说和民间歌谣为滋养，打破了《诗经》四言诗的局限，创造了句式灵活、音律悠扬的骚体诗。其'香草美人'的比兴象征手法，对后世文人创作产生了深远而持久的滋养。",
      contentPinyin: "《Chǔcí》 yǐ nánfāng Chǔ dì de shénhuà chuánshuō hé mínjiān gēyáo wéi zīyǎng, dǎpò le 《Shījīng》 sìyánshī de júxiàn, chuàngzào le jùshì línghuó, yīnlǜ yōuyáng de sāotǐshī. Qí 'xiāngcǎo měirén' de bǐxìng xiàngzhēng shǒufǎ, duì hòushì wénrén chuàngzuò chǎnshēng le shēnyuǎn ér chíchǐ de zīyǎng.",
      contentVietnamese: "Tác phẩm 'Sở Từ' lấy truyền thuyết thần thoại và dân ca đất Sở phương Nam làm nguồn nuôi dưỡng, phá vỡ giới hạn thể thơ bốn chữ của 'Kinh Thi', sáng tạo nên thể thơ Tao tao nhã với câu từ linh hoạt, âm luật trầm bổng du dương. Nghệ thuật tượng trưng ẩn dụ 'cỏ thơm mỹ nhân' của tác phẩm đã nuôi dưỡng sâu rộng và bền bỉ nền sáng tác văn nhân các đời sau."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l1_1",
        type: "multiple_choice",
        question: "Từ 兼具 thường được sử dụng như thế nào?",
        options: ["Động từ trang trọng chỉ việc sở hữu đồng thời cả 2 phẩm chất/tính năng", "Liên từ nối hai câu phủ định", "Trợ từ đặt ở cuối câu nghi vấn", "Lượng từ chỉ trang phục"],
        correctAnswer: "Động từ trang trọng chỉ việc sở hữu đồng thời cả 2 phẩm chất/tính năng",
        explanation: "兼具 mang nghĩa 'đồng thời hội tụ / mang cả hai'."
      }
    ]
  },
  {
    id: "hsk6_l2",
    hskLevel: "HSK6",
    lessonNumber: 2,
    title: "Triết học cổ điển & Liên từ 诚然",
    vietnameseTitle: "Bài 2: Triết học Nho gia và Đạo gia (Nho - Đạo bổ khuyết & Liên từ 诚然)",
    description: "So sánh tư tưởng Khổng Tử (Nhập thế - Nhân Nghĩa Lễ Trí) và Lão Trang (Xuất thế - Thuận tự nhiên), liên từ nhượng bộ 诚然 (thừa nhận rằng/quả thực).",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_07", "v_hsk6_08", "v_hsk6_09", "v_hsk6_10", "v_hsk6_11"],
    grammarPoints: [
      {
        id: "gp_hsk6_2_1",
        title: "Liên từ nhượng bộ trang trọng: 诚然 (chéngrán) - Quả thực / Thừa nhận rằng",
        structure: "诚然 + Luận điểm đối lập/sự thật khách quan ở vế 1, 但 / 然而 + Luận điểm trọng tâm của người viết ở vế 2",
        explanation: "Dùng trong văn phong tranh luận học thuật đỉnh cao để thừa nhận một sự thật hợp lý trước khi đưa ra luận điểm phản biện đanh thép.",
        examples: [
          { hanzi: "儒家思想诚然强调仁礼治国与积极入世，但道家的无为而治与逍遥精神同样构成了中华民族精神图谱的重要一极。", pinyin: "Rújiā sīxiǎng chéngrán qiángdiào rén lǐ zhì guó yǔ jījí rùshì, dàn Dàojiā de wúwéiyérzhì yǔ xiāoyáo jīngshén tóngyàng gòuchéng le Zhōnghuá mínzú jīngshén túpǔ de zhòngyào yì jí.", vietnamese: "Tư tưởng Nho gia quả thực nhấn mạnh việc trị nước bằng Nhân Lễ và tích cực nhập thế, nhưng tư tưởng vô vi nhi trị và tinh thần tiêu dao tự tại của Đạo gia cũng cấu thành một cực trọng yếu trong bản đồ tinh thần của dân tộc Trung Hoa." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "哲学家 (Nhà triết học)",
        role: "Học viện Triết học",
        hanzi: "中国传统知识分子历来'达则兼济天下，穷则独善其身'，这正是儒道互补在士大夫精神世界的生动写照。",
        pinyin: "Zhōngguó chuántǒng zhīshifènzǐ lìlái 'dá zé jiānjì tiānxià, qióng zé dúshànqíshēn', zhè zhèng shì rú dào hùbǔ zài shìdàfū jīngshén shìjiè de shēngdòng xièzhào.",
        vietnamese: "Tầng lớp trí thức truyền thống Trung Hoa xưa nay luôn 'đắc chí thì cứu giúp khắp thiên hạ, thất thế thì tu dưỡng riêng bản thân mình', đây chính là bức tranh phản chiếu sống động của sự tương hỗ Nho - Đạo trong thế giới tinh thần của giới sĩ phu."
      }
    ],
    readingPassage: {
      title: "天人合一之境 (Cảnh giới Thiên Nhân Hợp Nhất)",
      contentHanzi: "无论是儒家'天行健，君子以自强不息'的刚健进取，还是道家'道法自然'的淡泊致远，中国哲学始终追求人与自然的整体和谐。这种'天人合一'的宇宙观，为解决当今人类面临的生态与精神危机提供了宝贵的东方智慧。",
      contentPinyin: "Wúlùn shì Rújiā 'tiān xíng jiàn, jūnzǐ yǐ zìqiángbùxī' de gāngjiàn jìnqǔ, háishì Dàojiā 'dào fǎ zìrán' de dànbózhìyuǎn, Zhōngguó zhéxué shǐzhōng zhuīqiú rén yǔ zìrán de zhěngtǐ héxié. Zhè zhǒng 'tiānrén héyī' de yǔzhòuguān, wèi jiějué dāngjīn rénlèi miànlín de shēngtài yǔ jīngshén wēijī tígōng le bǎoguì de dōngfāng zhìhuì.",
      contentVietnamese: "Dù là tinh thần cương trực tiến thủ 'Trời vận hành mạnh mẽ, người quân tử phải tự cường không ngơi nghỉ' của Nho gia, hay là sự đạm bạc nhìn xa trông rộng 'Đạo thuận theo Tự Nhiên' của Đạo gia, triết học phương Đông luôn theo đuổi sự hài hòa tổng thể giữa con người và vũ trụ. Vũ trụ quan 'Thiên Nhân Hợp Nhất' này cung cấp trí tuệ phương Đông vô giá để hóa giải cuộc khủng hoảng sinh thái và tinh thần mà nhân loại hiện đại đang phải đối mặt."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l2_1",
        type: "multiple_choice",
        question: "Từ 诚然 trong văn nghị luận cao cấp biểu thị thái độ gì?",
        options: ["Thừa nhận nhượng bộ trước khi đưa ra luận điểm chính (quả thực)", "Phủ định hoàn toàn", "Nghi ngờ không tin tưởng", "Mệnh lệnh bắt buộc"],
        correctAnswer: "Thừa nhận nhượng bộ trước khi đưa ra luận điểm chính (quả thực)",
        explanation: "诚然 mang nghĩa 'quả thật là như vậy (nhưng...)'."
      }
    ]
  },
  {
    id: "hsk6_l3",
    hskLevel: "HSK6",
    lessonNumber: 3,
    title: "Mỹ học kiến trúc cung đình & Thành ngữ 巧夺天工",
    vietnameseTitle: "Bài 3: Cố Cung và mỹ học kiến trúc hoàng gia (Trục đối xứng & Thành ngữ 巧夺天工)",
    description: "Kiến trúc Cố Cung Bắc Kinh, nghệ thuật Đấu Củng và trục đối xứng trung tâm, thành ngữ 巧夺天工 (khéo léo đoạt cả công trời), 彰显 (làm nổi bật rạng rỡ).",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_12", "v_hsk6_13", "v_hsk6_14", "v_hsk6_15", "v_hsk6_16"],
    grammarPoints: [
      {
        id: "gp_hsk6_3_1",
        title: "Thành ngữ tuyệt kỹ tạo tác: 巧夺天工 (qiǎoduótiāngōng) - Khéo đoạt công trời / Tuyệt đỉnh tinh xảo",
        structure: "Tác phẩm kiến trúc / Điêu khắc + 巧夺天工",
        explanation: "Ca ngợi kỹ nghệ chế tác thủ công tinh vi, kỳ vĩ vượt qua cả sự kỳ diệu của bàn tay tạo hóa thiên nhiên.",
        examples: [
          { hanzi: "故宫太和殿的飞檐斗拱结构巧妙，雕刻精美，堪称巧夺天工的艺术杰作。", pinyin: "Gùgōng Tàihédiàn de fēiyán dǒugǒng jiégòu qiǎomiào, diāokè jīngměi, kānchēng qiǎoduótiāngōng de yìshù jiézuò.", vietnamese: "Kết cấu đấu củng mái cong của Điện Thái Hòa trong Cố Cung vô cùng khéo léo, chạm khắc tinh xảo, xứng đáng được xưng tụng là kiệt tác nghệ thuật khéo đoạt công trời." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "古建研究专家 (Chuyên gia Kiến trúc cổ)",
        role: "Tử Cấm Thành",
        hanzi: "紫禁城中轴对称的严谨布局，彰显了至高无上的皇权威仪与天圆地方的古典宇宙秩序。",
        pinyin: "Zǐjìnchéng zhōngzhóu duìchèn de yánjǐn bùjú, zhāngxiǎn le zhìgāowúshàng de huángquán wēiyí yǔ tiānyuándìfāng de gǔdiǎn yǔzhòu zhìxù.",
        vietnamese: "Bố cục đối xứng trục trung tâm nghiêm ngặt của Tử Cấm Thành đã làm nổi bật uy quyền hoàng gia chí cao vô thượng và trật tự vũ trụ cổ điển trời tròn đất vuông."
      }
    ],
    readingPassage: {
      title: "东方营建的巅峰 (Đỉnh cao nghệ thuật kiến thiết phương Đông)",
      contentHanzi: "作为世界上现存规模最大、保存最为完整的木质结构古建筑群，北京故宫不仅是中国古代建筑营建技艺的巅峰之作，更是中华礼乐文明与美学思想在物理空间上的完美投射。",
      contentPinyin: "Zuòwéi shìjiè shang xiàncún guīmó zuì dà, bǎocún zuìwéi wánzhěng de mùzhì jiégòu gǔ jiànzhùqún, Běijīng Gùgōng bùjǐn shì Zhōngguó gǔdài jiànzhù yíngjiàn jìyì de diānfēng zhī zuò, gèng shì Zhōnghuá lǐyuè wénmíng yǔ měixué sīxiǎng zài wùlǐ kōngjiān shang de wánměi tóushè.",
      contentVietnamese: "Với tư cách là quần thể kiến trúc cổ kết cấu bằng gỗ có quy mô lớn nhất và được bảo tồn nguyên vẹn nhất còn tồn tại trên thế giới, Cố Cung Bắc Kinh không chỉ là kiệt tác đỉnh cao của kỹ nghệ xây dựng cổ đại Trung Hoa mà còn là sự phản chiếu hoàn mỹ của văn minh Lễ Nhạc và tư tưởng mỹ học trên không gian vật lý."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l3_1",
        type: "multiple_choice",
        question: "Thành ngữ 巧夺天工 dùng để ngợi ca đối tượng nào?",
        options: ["Kiệt tác nhân tạo tinh xảo vượt bậc như do bàn tay tạo hóa làm ra", "Cảnh quan thiên nhiên hoang dã", "Hành vi gian xảo dối trá", "Thời tiết mưa gió bão bùng"],
        correctAnswer: "Kiệt tác nhân tạo tinh xảo vượt bậc như do bàn tay tạo hóa làm ra",
        explanation: "巧夺天工 chuyên dùng ca ngợi tay nghề, tác phẩm nhân tạo tinh xảo."
      }
    ]
  },
  {
    id: "hsk6_l4",
    hskLevel: "HSK6",
    lessonNumber: 4,
    title: "Y học cổ truyền & Thành ngữ 标本兼治",
    vietnameseTitle: "Bài 4: Lý luận Trung y và biện chứng luận trị (Y học cổ truyền & Thành ngữ 标本兼治)",
    description: "Học thuyết Âm Dương Ngũ Hành, chẩn đoán Vọng Văn Vấn Thiết, thành ngữ 标本兼治 (chữa trị cả gốc lẫn ngọn).",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_17", "v_hsk6_18", "v_hsk6_19", "v_hsk6_20", "v_hsk6_21"],
    grammarPoints: [
      {
        id: "gp_hsk6_4_1",
        title: "Thành ngữ trị liệu toàn diện: 标本兼治 (biāoběn-jiānzhì) - Trị cả ngọn lẫn gốc",
        structure: "Phương án / Chính sách + 标本兼治",
        explanation: "Chỉ việc giải quyết triệt để vấn đề từ nguyên nhân gốc rễ (bản) cho đến biểu hiện tức thời bên ngoài (tiêu).",
        examples: [
          { hanzi: "中医治疗讲究辨证施治，既缓解当前的急症，又调理体质，达到标本兼治的目的。", pinyin: "Zhōngyī zhìliáo jiǎngjiu biànzhèng shī zhì, jì huǎnjiě dāngqián de jīzhèng, yòu tiáolǐ tǐzhì, dádào biāoběn-jiānzhì de mùdì.", vietnamese: "Y học cổ truyền coi trọng việc biện chứng trị liệu, vừa làm thuyên giảm chứng bệnh cấp tính trước mắt, vừa bồi bổ điều hòa thể chất, đạt tới mục đích chữa trị toàn diện cả gốc lẫn ngọn." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "国医大师 (Đại sư Y học Cổ truyền)",
        role: "Viện Y học Cổ truyền",
        hanzi: "人体的五脏六腑是一个相生相克的有机整体。望闻问切四诊合参，方能探求病因病机，精准施治。",
        pinyin: "Réntǐ de wǔzàngliùfǔ shì yí ge xiāngshēngxiāngkè de yǒujī zhěngtǐ. Wàng wén wèn qiè sì zhěn hé cān, fāng néng tànqiú bìngyīn bìngjī, jīngzhǔn shī zhì.",
        vietnamese: "Ngũ tạng lục phủ của cơ thể người là một chỉnh thể hữu cơ tương sinh tương khắc. Kết hợp đồng thời bốn phép chẩn Vọng - Văn - Vấn - Thiết mới có thể tìm thấu căn nguyên bệnh lý để điều trị chính xác."
      }
    ],
    readingPassage: {
      title: "大医精诚 (Đại y tinh thành)",
      contentHanzi: "中医学蕴含着深邃的哲学智慧与数千年的临床实践积累。从《黄帝内经》到《本草纲目》，中医倡导'治未病'的预防医学思想，强调人与天地时令的动态调和，是中华传统文化的灿烂瑰宝。",
      contentPinyin: "Zhōngyīxué yùnhán zhe shēnsuì de zhéxué zhìhuì yǔ shùqiān nián de línchuáng shíjiàn jīlěi. Cóng 《Huángdì Nèijīng》 dào 《Běncǎo Gāngmù》, Zhōngyī chàngdǎo 'zhì wèi bìng' de yùfáng yīxué sīxiǎng, qiángdiào rén yǔ tiāndì shílìng de dòngtài tiáohé, shì Zhōnghuá chuántǒng wénhuà de cànlàn guībǎo.",
      contentVietnamese: "Y học cổ truyền ẩn chứa trí tuệ triết học sâu xa và sự tích lũy thực tiễn lâm sàng suốt hàng nghìn năm. Từ 'Hoàng Đế Nội Kinh' đến 'Bản Thảo Cương Mục', Đông y đề xướng tư tưởng y học dự phòng 'chữa bệnh từ khi chưa phát bệnh', nhấn mạnh sự điều hòa động thái giữa con người với thời tiết bốn mùa của trời đất, là viên ngọc quý rực rỡ của văn hóa truyền thống Trung Hoa."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l4_1",
        type: "multiple_choice",
        question: "Thành ngữ 标本兼治 mang nghĩa là gì?",
        options: ["Giải quyết triệt để cả gốc rễ lẫn biểu hiện bên ngoài", "Chỉ chữa trị triệu chứng tạm thời", "Tốn nhiều chi phí chữa trị", "Kéo dài thời gian điều trị"],
        correctAnswer: "Giải quyết triệt để cả gốc rễ lẫn biểu hiện bên ngoài",
        explanation: "标 (ngọn, triệu chứng) + 本 (gốc, nguyên nhân) + 兼治 (đồng thời chữa trị)."
      }
    ]
  },
  {
    id: "hsk6_l5",
    hskLevel: "HSK6",
    lessonNumber: 5,
    title: "Quốc bảo hí khúc & Thành ngữ 淋漓尽致",
    vietnameseTitle: "Bài 5: Nghệ thuật Kinh kịch và Tứ đại Hành đương (Hí khúc & Thành ngữ 淋漓尽致)",
    description: "Tìm hiểu nghệ thuật ước lệ của Kinh kịch, Tứ công Ngũ pháp (Xướng Niệm Tố Đả), thành ngữ 淋漓尽致 (lột tả đến tận cùng triệt để).",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_22", "v_hsk6_23", "v_hsk6_24", "v_hsk6_25", "v_hsk6_26"],
    grammarPoints: [
      {
        id: "gp_hsk6_5_1",
        title: "Thành ngữ biểu đạt triệt để sâu sắc: 淋漓尽致 (línlí-jìnzhì) - Triệt để / Hết sức sinh động không sót chút gì",
        structure: "Biểu diễn / Miêu tả / Thể hiện + 得淋漓尽致",
        explanation: "Dùng để ca ngợi kỹ năng diễn xuất hoặc ngòi bút miêu tả đạt đến độ hoàn hảo, lột tả trọn vẹn mọi khía cạnh tinh tế.",
        examples: [
          { hanzi: "京剧大师梅兰芳先生将杨贵妃的喜怒哀乐表现得淋漓尽致。", pinyin: "Jīngjù dàshī Méi Lánfāng xiānsheng jiāng Yáng Guìfēi de xǐnù'āilè biǎoxiàn de línlí-jìnzhì.", vietnamese: "Đại sư Kinh kịch Mai Lan Phương đã thể hiện trọn vẹn hỉ nộ ái ố của Dương Quý Phi một cách hết sức sinh động và sâu sắc đến tận cùng." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "戏曲理论家 (Nhà lý luận Hí kịch)",
        role: "Nhà hát lớn",
        hanzi: "京剧以虚拟性与程式化见长。一桌二椅，三五步走遍天下，数声唱道尽人间悲欢，体现了中国古典美学的极高境界。",
        pinyin: "Jīngjù yǐ xūnǐxìng yǔ chéngshìhuà jiàncháng. Yì zhuō èr yǐ, sān wǔ bù zǒu biàn tiānxià, shù shēng chàng dào jìn rénjiān bēihuān, tǐxiàn le Zhōngguó gǔdiǎn měixué de jí gāo jìngjiè.",
        vietnamese: "Kinh kịch nổi danh với tính ước lệ và tính quy ước bài bản. Một bàn hai ghế, ba năm bước chân đi khắp thiên hạ, vài câu xướng cất lên nói hết mọi nỗi buồn vui nhân gian, thể hiện cảnh giới tối cao của mỹ học cổ điển phương Đông."
      }
    ],
    readingPassage: {
      title: "粉墨春秋 (Xuân thu sau lớp phấn son)",
      contentHanzi: "作为中国传统戏剧的代表，京剧将'唱、念、做、打'四大艺术手段融于一体。生、旦、净、丑各个行当各具特色，色彩斑斓的脸谱寓意深刻，承载着忠孝仁义的传统道德价值观。",
      contentPinyin: "Zuòwéi Zhōngguó chuántǒng xìjù de dàibiǎo, Jīngjù jiāng 'chàng, niàn, zuò, dǎ' sì dà yìshù shǒuduàn róng yú yìtǐ. Shēng, dàn, jìng, chǒu gè ge hángdang gè jù tèsè, sècǎi bānlán de liǎnpǔ yùyì shēnkè, chéngzàizhe zhōng xiào rén yì de chuántǒng dàodé jiàzhíguān.",
      contentVietnamese: "Với tư cách là đại diện tiêu biểu của kịch nghệ truyền thống Trung Hoa, Kinh kịch dung hợp bốn thủ pháp nghệ thuật lớn gồm 'Xướng, Niệm, Tố, Đả' làm một. Các vai Sinh, Đán, Tịnh, Sửu mỗi loại hình đều mang nét độc đáo riêng, những chiếc mặt nạ vẽ đầy sắc màu mang ngụ ý sâu xa, chuyên chở các giá trị đạo đức truyền thống Trung - Hiếu - Nhân - Nghĩa."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l5_1",
        type: "multiple_choice",
        question: "Thành ngữ nào miêu tả việc bộc lộ cảm xúc, kỹ nghệ một cách thấu đáo, triệt để nhất?",
        options: ["淋漓尽致 (línlí-jìnzhì)", "惟妙惟肖 (wéimiào-wéixiào)", "走马观花 (zǒumǎ-guānhuā)", "墨守成规 (mòshǒu-chéngguī)"],
        correctAnswer: "淋漓尽致 (línlí-jìnzhì)",
        explanation: "淋漓尽致 miêu tả sự thể hiện trọn vẹn, không còn gì thiếu sót."
      }
    ]
  },
  {
    id: "hsk6_l6",
    hskLevel: "HSK6",
    lessonNumber: 6,
    title: "Giao lưu văn minh Á-Âu & Thành ngữ 历久弥新",
    vietnameseTitle: "Bài 6: Con đường tơ lụa và sự giao thoa văn minh (Hội nhập Á-Âu & Thành ngữ 历久弥新)",
    description: "Con đường tơ lụa trên bộ và trên biển, giao lưu thương mại và văn hóa, thành ngữ 历久弥新 (càng trải qua thời gian càng rạng rỡ mới mẻ).",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_27", "v_hsk6_28", "v_hsk6_29", "v_hsk6_30", "v_hsk6_31"],
    grammarPoints: [
      {
        id: "gp_hsk6_6_1",
        title: "Thành ngữ sức sống bất diệt: 历久弥新 (lìjiǔ-míxīn) - Càng lâu càng mới / Trường tồn theo thời gian",
        structure: "Truyền thống văn hóa / Tinh thần hữu nghị + 历久弥新",
        explanation: "Biểu thị một giá trị, tình cảm hoặc tư tưởng trải qua thử thách của thời gian dài nhưng không hề phai nhạt mà ngày càng tỏa sáng rực rỡ hơn.",
        examples: [
          { hanzi: "丝绸之路所承载的和平合作、开放包容精神历久弥新。", pinyin: "Sīchóuzhīlù suǒ chéngzài de hépíng hézuò, kāifàng bāoróng jīngshén lìjiǔ-míxīn.", vietnamese: "Tinh thần hòa bình hợp tác, mở cửa bao dung mà Con đường tơ lụa chuyên chở càng trải qua năm tháng lại càng tỏa sáng rạng ngời." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "历史学者 (Nhà nghiên cứu Lịch sử)",
        role: "Diễn đàn Con đường tơ lụa",
        hanzi: "千百年前，驼铃声声打破了大漠的寂静；今天，中欧班列穿梭驰骋，古老的丝绸之路正在新时代焕发出蓬勃生机。",
        pinyin: "Qiānbǎi nián qián, tuólíng shēngshēng dǎpò le dàmò de jìjìng; jīntiān, Zhōng-Ōu bānliè chuānsuō chíchěng, gǔlǎo de Sīchóuzhīlù zhèngzài xīn shídài huànfā chū péngbó shēngjī.",
        vietnamese: "Hàng nghìn năm trước, tiếng chuông lạc đà ngân vang đã phá vỡ sự tĩnh mịch của sa mạc mênh mông; ngày nay, những đoàn tàu hỏa xuyên Á - Âu hối hả ngược xuôi, Con đường tơ lụa cổ kính đang bừng lên sức sống tràn trề trong thời đại mới."
      }
    ],
    readingPassage: {
      title: "驼铃与帆影 (Tiếng chuông lạc đà và bóng buồm)",
      contentHanzi: "古丝绸之路不仅是商品贸易的通道，更是知识、艺术与宗教传播的纽带。丝绸、瓷器、造纸术沿着商道走向世界，天文学、数学与香料传入东方。多元文明的交流互鉴推动了人类社会的共同繁荣。",
      contentPinyin: "Gǔ Sīchóuzhīlù bùjǐn shì shāngpǐn màoyì de tōngdào, gèng shì zhīshi, yìshù yǔ zōngjiào chuánbō de niǔdài. Sīchóu, cíqì, zàozhǐshù yánzhe shāngdào zǒuxiàng shìjiè, tiānwénxué, shùxué yǔ xiāngliào chuánrù dōngfāng. Duōyuán wénmíng de jiāoliú hùjiàn tuīdòng le rénlèi shèhuì de gòngtóng fánróng.",
      contentVietnamese: "Con đường tơ lụa cổ đại không chỉ là huyết mạch buôn bán hàng hóa mà còn là cầu nối lan tỏa tri thức, nghệ thuật và tôn giáo. Tơ lụa, đồ gốm sứ, kỹ thuật làm giấy men theo thương đạo vươn ra thế giới, thiên văn học, toán học và các loại hương liệu du nhập vào phương Đông. Sự giao lưu và học hỏi lẫn nhau giữa các nền văn minh đa dạng đã thúc đẩy sự thịnh vượng chung của xã hội loài người."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l6_1",
        type: "multiple_choice",
        question: "Thành ngữ 历久弥新 biểu thị điều gì?",
        options: ["Trải qua thời gian dài nhưng giá trị càng trở nên tươi mới và sâu sắc", "Cũ kỹ lạc hậu cần bị đào thải", "Thay đổi liên tục không ổn định", "Mới xuất hiện trong thời gian ngắn"],
        correctAnswer: "Trải qua thời gian dài nhưng giá trị càng trở nên tươi mới và sâu sắc",
        explanation: "历久 (qua thời gian dài) + 弥新 (càng thêm mới mẻ rạng rỡ)."
      }
    ]
  },
  {
    id: "hsk6_l7",
    hskLevel: "HSK6",
    lessonNumber: 7,
    title: "Nghệ thuật thư pháp & Thành ngữ 浑然一体",
    vietnameseTitle: "Bài 7: Thư pháp Trung Hoa và ý cảnh bút mực (Khí vận sinh động & Thành ngữ 浑然一体)",
    description: "Ngũ thể thư pháp (Triện, Lệ, Khải, Hành, Thảo), khí vận sinh động và cốt lực, thành ngữ 浑然一体 (hòa quyện thành một khối hoàn chỉnh).",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_32", "v_hsk6_33", "v_hsk6_34", "v_hsk6_35", "v_hsk6_36"],
    grammarPoints: [
      {
        id: "gp_hsk6_7_1",
        title: "Thành ngữ hài hòa tuyệt đối: 浑然一体 (húnrán-yìtǐ) - Hòa quyện thành một thể thống nhất",
        structure: "Yếu tố A 与 Yếu tố B + 融为一体 / 浑然一体",
        explanation: "Miêu tả các thành phần nghệ thuật hoặc kết cấu kết hợp với nhau một cách tự nhiên, hoàn hảo không để lộ dấu vết ghép nối.",
        examples: [
          { hanzi: "王羲之的《兰亭序》笔势如行云流水，字态与心境浑然一体。", pinyin: "Wáng Xīzhī de 《Lántíng Xù》 bǐshì rú xíngyúnliúshuǐ, zì tài yǔ xīnjìng húnrán-yìtǐ.", vietnamese: "Tác phẩm 'Lan Đình Tập Tự' của Vương Hy Chi nét bút tựa như mây trôi nước chảy, dáng chữ và tâm cảnh hòa quyện làm một thể thống nhất tuyệt mỹ." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "书法大师 (Đại sư Thư pháp)",
        role: "Hội thảo Thư đạo",
        hanzi: "书法是线条的艺术，讲究用笔的提按起伏、疾徐转折。黑白交织之间，尽显阴阳化生之妙。",
        pinyin: "Shūfǎ shì xiàntiáo de yìshù, jiǎngjiu yòngbǐ de tí àn qǐ fú, jí xú zhuǎn zhé. Hēibái jiāozhī zhījiān, jìn xiǎn yīnyáng huàshēng zhī miào.",
        vietnamese: "Thư pháp là nghệ thuật của những đường nét, coi trọng sự nâng - nhấn - bổng - trầm, nhanh - chậm - chuyển - gập của ngọn bút. Giữa sự đan xen của hai màu đen trắng, hiện rõ sự huyền diệu biến hóa của âm dương tương sinh."
      }
    ],
    readingPassage: {
      title: "笔墨春秋 (Khí phách ngàn năm của bút mực)",
      contentHanzi: "古人论书，重在'骨力'与'气韵'。从沉雄浑厚的秦篆汉隶，到法度森严的唐楷，再到奔放恣意的狂草，中国书法将汉字的实用记录功能升华至纯粹的视觉艺术殿堂，映射出文人的精神品格。",
      contentPinyin: "Gǔrén lùn shū, zhòng zài 'gǔlì' yǔ 'qìyùn'. Cóng chénxióng húnhòu de Qín zhuàn Hàn lì, dào fǎdù sēnyán de Táng kǎi, zài dào bēnfàng zìyì de kuángcǎo, Zhōngguó shūfǎ jiāng Hànzì de shíyòng jìlù gōngnéng shēnghuá zhì chúncuì de shìjué yìshù diàntáng, yìngshè chū wénrén de jīngshén pǐngé.",
      contentVietnamese: "Cổ nhân bàn về thư pháp coi trọng nhất ở 'cốt lực' và 'khí vận'. Từ nét chữ Triện Tần và Lệ Hán trầm hùng đôn hậu, đến Khải thư nhà Đường pháp độ trang nghiêm, rồi đến Cuồng Thảo phóng khoáng tự do, thư pháp Trung Hoa đã thăng hoa chức năng ghi chép thực dụng của chữ Hán lên cung điện nghệ thuật thị giác thuần khiết, phản chiếu phẩm cách tinh thần thanh cao của giới văn nhân."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l7_1",
        type: "multiple_choice",
        question: "Thành ngữ 浑然一体 có nghĩa là gì?",
        options: ["Hòa quyện tự nhiên thành một khối thống nhất hoàn chỉnh", "Hỗn loạn không có trật tự", "Tách rời nhau hoàn toàn", "Mơ hồ khó hiểu"],
        correctAnswer: "Hòa quyện tự nhiên thành một khối thống nhất hoàn chỉnh",
        explanation: "浑然一体 nghĩa là hòa hợp tự nhiên thành một thể hoàn mỹ."
      }
    ]
  },
  {
    id: "hsk6_l8",
    hskLevel: "HSK6",
    lessonNumber: 8,
    title: "Hàng không vũ trụ & Động từ 奠定",
    vietnameseTitle: "Bài 8: Khám phá vũ trụ và công nghệ hàng không vũ trụ (Thần Châu & Động từ 奠定)",
    description: "Thám hiểm không gian vũ trụ sâu thẳm, trạm vũ trụ không gian, động từ 奠定 (đặt nền móng), thành ngữ 举世瞩目 (khiến toàn thế giới dõi theo).",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_37", "v_hsk6_38", "v_hsk6_39", "v_hsk6_40", "v_hsk6_41"],
    grammarPoints: [
      {
        id: "gp_hsk6_8_1",
        title: "Động từ xác lập nền tảng: 奠定 (diàndìng) - Đặt nền móng / Xác lập cơ sở",
        structure: "Hành động / Nghiên cứu + 为……奠定了坚实的基础",
        explanation: "Dùng để diễn tả việc tạo dựng nên một tiền đề, cơ sở vững chắc làm đòn bẩy cho sự phát triển vượt bậc sau này.",
        examples: [
          { hanzi: "探月工程的重大成功为人类深入探索深空奠定了坚实的科学基础。", pinyin: "Tànyuè gōngchéng de zhòngdà chénggōng wèi rénlèi shēnrù tànsuǒ shēnkōng diàndìng le jiānshí de kēxué jīchǔ.", vietnamese: "Thành công vang dội của công trình thám hiểm Mặt Trăng đã đặt nền móng khoa học vững chắc cho nhân loại tiến sâu khám phá vũ trụ bao la." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "航天总指挥 (Tổng Chỉ huy Hàng không vũ trụ)",
        role: "Trung tâm Phóng vệ tinh",
        hanzi: "空间站的全面建成与常态化运营，标志着我们在空间科学领域取得了举世瞩目的跨越式发展。",
        pinyin: "Kōngjiānzhàn de quánmiàn jiànchéng yǔ chángtàihuà yùnyíng, biāozhì zhe wǒmen zài kōngjiān kēxué lǐngyù qǔdé le jǔshìzhǔmù de kuàyuèshì fāzhǎn.",
        vietnamese: "Việc xây dựng hoàn thiện toàn diện và vận hành thường thái hóa trạm vũ trụ đánh dấu chúng ta đã đạt được bước phát triển nhảy vọt khiến cả thế giới phải dõi theo trong lĩnh vực khoa học không gian."
      }
    ],
    readingPassage: {
      title: "星辰大海的征途 (Hành trình chinh phục muôn vì sao)",
      contentHanzi: "从东方红一号响彻寰宇，到神舟飞船载人航天，再到嫦娥探月、天问探火，人类对未知宇宙的求索永无止境。勇攀科学高峰的奉献精神，照亮了通往星辰大海的壮丽征途。",
      contentPinyin: "Cóng Dōngfānghóng Yīhào xiǎngchè huányǔ, dào Shénzhōu fēichuán zàirén hángtiān, zài dào Cháng'é tànyuè, Tiānwèn tànhuǒ, rénlèi duì wèizhī yǔzhòu de qiúsuǒ yǒng wú zhǐjìng. Yǒng pān kēxué gāofēng de fèngxiàn jīngshén, zhàoliàng le tōngwǎng xīngchéndàhǎi de zhuànglì zhēngtú.",
      contentVietnamese: "Từ vệ tinh Đông Phương Hồng 1 vang vọng khắp cõi trời đất, đến tàu vũ trụ Thần Châu đưa người vào không gian, rồi tới Hằng Nga thám hiểm Mặt Trăng, Thiên Vấn chinh phục Sao Hỏa, sự kiếm tìm khám phá vũ trụ bao la của nhân loại là vĩnh viễn không có điểm dừng. Tinh thần cống hiến dũng cảm trèo lên đỉnh cao khoa học đã thắp sáng con đường chinh phục muôn vì sao tráng lệ."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l8_1",
        type: "multiple_choice",
        question: "Cụm từ cố định chuẩn xác trong văn bản học thuật là gì?",
        options: ["奠定基础 (diàndìng jīchǔ)", "决定基础 (juédìng jīchǔ)", "确定基础 (quèdìng jīchǔ)", "制定基础 (zhìdìng jīchǔ)"],
        correctAnswer: "奠定基础 (diàndìng jīchǔ)",
        explanation: "奠定 + 基础 là cụm từ kết hợp chuẩn xác mang nghĩa 'đặt nền móng/cơ sở'."
      }
    ]
  },
  {
    id: "hsk6_l9",
    hskLevel: "HSK6",
    lessonNumber: 9,
    title: "Môi trường toàn cầu & Thành ngữ 刻不容缓",
    vietnameseTitle: "Bài 9: Quản trị khí hậu toàn cầu và phát triển bền vững (Trung hòa Carbon & Thành ngữ 刻不容缓)",
    description: "Mục tiêu Trung hòa Carbon (Net Zero), biến đổi khí hậu toàn cầu, thành ngữ 刻不容缓 (khắc bất dung hoãn / không thể chậm trễ một khắc nào).",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_42", "v_hsk6_43", "v_hsk6_44", "v_hsk6_45", "v_hsk6_46"],
    grammarPoints: [
      {
        id: "gp_hsk6_9_1",
        title: "Thành ngữ tính cấp bách khẩn thiết: 刻不容缓 (kèbùrónghuǎn) - Không thể chậm trễ dù một giây",
        structure: "Nhiệm vụ / Vấn đề nguy cấp + 刻不容缓",
        explanation: "Nhấn mạnh tính cấp thiết tột cùng của hành động, đòi hỏi phải thực thi ngay lập tức không được trì hoãn.",
        examples: [
          { hanzi: "应对全球气候变暖、减少温室气体排放已经刻不容缓。", pinyin: "Yìngduì quánqiú qìhòu biànnuǎn, jiǎnshǎo wēnshì qìtǐ páifàng yǐjīng kèbùrónghuǎn.", vietnamese: "Ứng phó với biến đổi khí hậu ấm lên toàn cầu và cắt giảm phát thải khí nhà kính đã là việc cấp bách không thể chậm trễ một khắc nào." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "气候变化事务特使 (Đặc phái viên Khí hậu)",
        role: "Hội nghị Thượng đỉnh COP",
        hanzi: "实现碳达峰与碳中和目标是一场广泛而深刻的经济社会系统性变革，需要国际社会携手协同行动。",
        pinyin: "Shíxiàn tàndáfēng yǔ tànzhōnghé mùbiāo shì yì chǎng guǎngfàn ér shēnkè de jīngjì shèhuì xìtǒngxìng biàngé, xūyào guójì shèhuì xiéshǒu xiétóng xíngdòng.",
        vietnamese: "Hiện thực hóa mục tiêu đạt đỉnh carbon và trung hòa carbon là một cuộc chuyển đổi mang tính hệ thống kinh tế xã hội sâu rộng, đòi hỏi cộng đồng quốc tế phải chung tay hành động đồng bộ."
      }
    ],
    readingPassage: {
      title: "共建清洁美丽世界 (Cùng xây dựng thế giới trong sạch tươi đẹp)",
      contentHanzi: "极端天气频发、海平面上升给全球粮食安全与人类生存带来了前所未有的严峻挑战。转变能源结构、大力发展风能和太阳能等可再生清洁能源，是实现绿色可持续发展的根本出路。",
      contentPinyin: "Jíduān tiānqì pínfā, hǎipíngmiàn shàngshēng gěi quánqiú liángshi ānquán yǔ rénlèi shēngcún dài lái le qiánsuǒwèiyǒu de yánjùn tiǎozhàn. Zhuǎnbiàn néngyuán jiégòu, dàlì fāzhǎn fēngnéng hé tàiyángnéng děng kězàishēng qīngjié néngyuán, shì shíxiàn lǜsè kěchíxù fāzhǎn de gēnběn chūlù.",
      contentVietnamese: "Hiện tượng thời tiết cực đoan xảy ra thường xuyên, mực nước biển dâng cao đã mang lại những thách thức nghiêm trọng chưa từng thấy đối với an ninh lương thực toàn cầu và sự sinh tồn của loài người. Chuyển đổi cơ cấu năng lượng, dốc sức phát triển năng lượng tái tạo sạch như phong điện và quang điện chính là lối thoát căn bản để đạt tới sự phát triển xanh bền vững."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l9_1",
        type: "multiple_choice",
        question: "Thành ngữ 刻不容缓 miêu tả tình huống như thế nào?",
        options: ["Vô cùng cấp bách, không cho phép chậm trễ một giây phút nào", "Rất thong thả có thể làm sau", "Khó khăn không thể giải quyết", "Dễ dàng như trở bàn tay"],
        correctAnswer: "Vô cùng cấp bách, không cho phép chậm trễ một giây phút nào",
        explanation: "刻 (khoảnh khắc) + 不容 (không cho phép) + 缓 (chậm trễ)."
      }
    ]
  },
  {
    id: "hsk6_l10",
    hskLevel: "HSK6",
    lessonNumber: 10,
    title: "Kinh tế số & Động từ 赋能",
    vietnameseTitle: "Bài 10: Kinh tế số và cách mạng Blockchain (Hợp đồng thông minh & Động từ 赋能)",
    description: "Kinh tế dữ liệu số, hợp đồng thông minh Blockchain, tính phi tập trung, động từ hiện đại 赋能 (tiếp năng lực/trao quyền).",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_47", "v_hsk6_48", "v_hsk6_49", "v_hsk6_50", "v_hsk6_51"],
    grammarPoints: [
      {
        id: "gp_hsk6_10_1",
        title: "Động từ thời đại số: 赋能 (fùnéng) - Tiếp sức / Trao quyền năng / Tạo động lực",
        structure: "Kỹ thuật số / Công nghệ mới + 为 + Ngành nghề truyền thống / Doanh nghiệp + 赋能",
        explanation: "Dùng phổ biến trong kinh tế học đương đại chỉ việc ứng dụng công nghệ để gia tăng năng lực cạnh tranh vượt trội cho các lĩnh vực khác.",
        examples: [
          { hanzi: "大数据与区块链技术正全面为传统金融行业数字化转型赋能。", pinyin: "Dàshùjù yǔ qūkuàiliàn jìshù zhèng quánmiàn wèi chuántǒng jīnróng hángyè shùzìhuà zhuǎnxíng fùnéng.", vietnamese: "Dữ liệu lớn và công nghệ chuỗi khối đang tiếp thêm năng lực toàn diện cho quá trình chuyển đổi số của ngành tài chính truyền thống." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "金融科技专家 (Chuyên gia FinTech)",
        role: "Hội nghị Thượng đỉnh Web3",
        hanzi: "区块链分布式账本与不可篡改的技术特性，从根本上解决了多方协作中的信任成本问题，具有颠覆性的应用前景。",
        pinyin: "Qūkuàiliàn fēnbùshì zhàngběn yǔ bùkě cuàngǎi de jìshù tèxìng, cóng gēnběn shang jiějué le duō fāng xiézuò zhōng de xìnrèn chéngběn wèntí, jùyǒu diānfùxìng de yìngyòng qiánjǐng.",
        vietnamese: "Đặc tính công nghệ sổ cái phân tán và không thể giả mạo của Blockchain đã giải quyết tận gốc bài toán chi phí lòng tin trong hợp tác đa bên, mở ra triển vọng ứng dụng mang tính đột phá."
      }
    ],
    readingPassage: {
      title: "数据要素的价值重构 (Tái cấu trúc giá trị của yếu tố dữ liệu)",
      contentHanzi: "在数字化时代，数据已成为与土地、劳动力、资本并列的核心生产要素。通过算法优化与隐私计算，挖掘海量数据背后的潜在价值，正在深刻改变全球商业贸易与社会治理的底层逻辑。",
      contentPinyin: "Zài shùzìhuà shídài, shùjù yǐ chéngwéi yǔ tǔdì, láodònglì, zīběn bìngliè de héxīn shēngchǎn yàosù. Tōngguò suànfǎ yōuhuà yǔ yǐnsī jìsuàn, wājué hǎiliàng shùjù bèihòu de qiánzài jiàzhí, zhèngzài shēnkè gǎibiàn quánqiú shāngyè màoyì yǔ shèhuì zhìlǐ de dǐcéng luóji.",
      contentVietnamese: "Trong thời đại số hóa, dữ liệu đã trở thành yếu tố sản xuất cốt lõi song hành cùng đất đai, sức lao động và tư bản. Thông qua tối ưu hóa thuật toán và tính toán bảo mật quyền riêng tư, việc khai phá giá trị tiềm tàng đằng sau kho dữ liệu khổng lồ đang làm thay đổi sâu sắc logic nền tảng của thương mại kinh doanh và quản trị xã hội toàn cầu."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l10_1",
        type: "multiple_choice",
        question: "Từ 赋能 trong ngữ cảnh kinh tế số có nghĩa là gì?",
        options: ["Tiếp thêm năng lực, tạo đòn bẩy phát triển công nghệ", "Thu hồi quyền lợi", "Làm suy giảm năng lực", "Tăng thêm gánh nặng tài chính"],
        correctAnswer: "Tiếp thêm năng lực, tạo đòn bẩy phát triển công nghệ",
        explanation: "赋能 là từ thời đại mới mang nghĩa trao năng lực, tạo điều kiện bứt phá."
      }
    ]
  },
  {
    id: "hsk6_l11",
    hskLevel: "HSK6",
    lessonNumber: 11,
    title: "Nhân khẩu học & Phó từ 亟待",
    vietnameseTitle: "Bài 11: Xã hội học hiện đại và biến chuyển nhân khẩu học (Già hóa & Phó từ 亟待)",
    description: "Đô thị hóa, cơ cấu dân số già hóa, chính sách phúc lợi xã hội, phó từ học thuật 亟待 (khẩn thiết cần phải).",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_52", "v_hsk6_53", "v_hsk6_54", "v_hsk6_55", "v_hsk6_56"],
    grammarPoints: [
      {
        id: "gp_hsk6_11_1",
        title: "Phó từ học thuật chỉ sự cấp bách: 亟待 (jídài) - Khẩn thiết cần phải / Đang rất cần",
        structure: "Vấn đề tồn đọng + 亟待 + Giải quyết / Hoàn thiện / Nâng cao",
        explanation: "Dùng trong các báo cáo chính sách, văn bản xã hội học để chỉ rõ vấn đề cần xử lý cấp tốc.",
        examples: [
          { hanzi: "随着人口老龄化加剧，养老服务体系与医疗保障制度亟待进一步完善。", pinyin: "Suízhe rénkǒu lǎolínghuà jiājù, yǎnglǎo fúwù tǐxì yǔ yīliáo bǎozhàng zhìdù jídài jìnyíbù wánshàn.", vietnamese: "Cùng với việc già hóa dân số gia tăng, hệ thống dịch vụ dưỡng lão và chế độ bảo hiểm y tế khẩn thiết cần được tiếp tục hoàn thiện." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "社会学家 (Nhà xã hội học)",
        role: "Viện Hàn lâm Khoa học Xã hội",
        hanzi: "城镇化进程改变了传统的家庭结构，托育服务与银发经济的相关政策供给亟待加大力度。",
        pinyin: "Chéngzhènhuà jìnchéng gǎibiàn le chuántǒng de jiātíng jiégòu, tuōyù fúwù yǔ yínfà jīngjì de xiāngguān zhèngcè gōngjǐ jídài jiàdà lìdù.",
        vietnamese: "Tiến trình đô thị hóa đã làm thay đổi cấu trúc gia đình truyền thống, các chính sách cung ứng liên quan tới dịch vụ chăm sóc mầm non và kinh tế người cao tuổi đang rất cần được tăng cường đẩy mạnh."
      }
    ],
    readingPassage: {
      title: "人口结构与社会韧性 (Cơ cấu dân số và sức bền xã hội)",
      contentHanzi: "人口素质的全面提升是国家长远发展的核心竞争力。从人口红利向人才红利转变，必须深化教育体制改革，营造鼓励创新、包容多元的社会环境，从而增强整体社会的繁荣韧性。",
      contentPinyin: "Rénkǒu sùzhì de quánmiàn tíshēng shì guójiā chángyuǎn fāzhǎn de héxīn jìngzhēnglì. Cóng rénkǒu hónglì xiàng réncái hónglì zhuǎnbiàn, bìxū shēnhuà jiàoyù tǐzhì gǎigé, yíngzào gǔlì chuàngxīn, bāoróng duōyuán de shèhuì huánjìng, cóng'ér zēngqiáng zhěngtǐ shèhuì de fánróng rènxìng.",
      contentVietnamese: "Sự nâng cao toàn diện tố chất dân số là năng lực cạnh tranh cốt lõi cho sự phát triển lâu dài của quốc gia. Để chuyển dịch từ lợi tức dân số sang lợi tức nhân tài, nhất định phải làm sâu sắc cải cách thể chế giáo dục, kiến tạo môi trường xã hội khuyến khích đổi mới sáng tạo và bao dung đa dạng, từ đó tăng cường sức bền thịnh vượng của toàn xã hội."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l11_1",
        type: "multiple_choice",
        question: "Từ 亟待 thường kết hợp với các động từ nào sau đây?",
        options: ["解决 (jiějué) / 改善 (gǎishàn) / 完善 (wánshàn)", "放弃 (fàngqì) / 停止 (tíngzhǐ)", "游玩 (yóuwán) / 休息 (xiūxi)", "购买 (gòumǎi) / 消费 (xiāofèi)"],
        correctAnswer: "解决 (jiějué) / 改善 (gǎishàn) / 完善 (wánshàn)",
        explanation: "亟待 (rất cần, khẩn thiết phải) thường đi cùng giải quyết, hoàn thiện."
      }
    ]
  },
  {
    id: "hsk6_l12",
    hskLevel: "HSK6",
    lessonNumber: 12,
    title: "Khoa học nhận thức & Động từ 揭示",
    vietnameseTitle: "Bài 12: Khoa học nhận thức và bí ẩn ý thức (Khoa học thần kinh & Động từ 揭示)",
    description: "Bản chất của ý thức, cơ chế mạng nơ-ron nhận thức, động từ học thuật 揭示 (hé lộ/làm sáng tỏ), tính từ 错综复杂 (chằng chịt phức tạp).",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_57", "v_hsk6_58", "v_hsk6_59", "v_hsk6_60", "v_hsk6_61"],
    grammarPoints: [
      {
        id: "gp_hsk6_12_1",
        title: "Động từ làm sáng tỏ bản chất: 揭示 (jiēshì) - Hé lộ / Làm sáng tỏ / Phơi bày bản chất",
        structure: "Nghiên cứu khoa học / Báo cáo + 揭示了 + Quy luật / Chân lý",
        explanation: "Dùng để diễn tả việc khám phá ra những quy luật ẩn giấu đằng sau các hiện tượng bề ngoài.",
        examples: [
          { hanzi: "最新的脑科学实验揭示了人类记忆储存与提取的精细神经机制。", pinyin: "Zuìxīn de nǎokēxué shíyàn jiēshì le rénlèi jìyì chǔcún yǔ tíqǔ de jīngxì shénjīng jīzhì.", vietnamese: "Thực nghiệm khoa học não bộ mới nhất đã làm sáng tỏ cơ chế thần kinh tinh vi của việc lưu trữ và truy xuất ký ức của con người." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "认知科学家 (Nhà khoa học nhận thức)",
        role: "Hội nghị Quốc tế Não bộ",
        hanzi: "人类大脑由上千亿个神经元通过错综复杂的突触网络相连接，意识的涌现堪称自然界最深奥的奇迹之一。",
        pinyin: "Rénlèi dànǎo yóu shàng qiānyì ge shénjīngyuán tōngguò cuòzōngfùzá de tūchù wǎngluò xiāng liánjiē, yìshí de yǒngxiàn kānchēng zìránjiè zuì shēn'ào de qíjì zhīyī.",
        vietnamese: "Não bộ con người do hàng trăm tỷ nơ-ron thần kinh kết nối với nhau thông qua mạng lưới khớp thần kinh chằng chịt phức tạp, sự khởi phát của ý thức xứng đáng được xưng tụng là một trong những kỳ tích thâm sâu bí ẩn nhất của tự nhiên."
      }
    ],
    readingPassage: {
      title: "探索心灵的边界 (Khám phá ranh giới của tâm trí)",
      contentHanzi: "认知科学融汇了心理学、神经生物学、计算机科学与哲学。揭开注意、感知、决策以及自我意识的生物学谜团，不仅有助于治疗精神神经疾病，更将为类脑通用人工智能的发展提供深刻的理论启迪。",
      contentPinyin: "Rènzhī kēxué rónghuì le xīnlǐxué, shénjīng shēngwùxué, jìsuànjī kēxué yǔ zhéxué. Jiēkāi zhùyì, gǎnzhī, juécè yǐjí zìwǒ yìshí de shēngwùxué mǐtuán, bùjǐn yǒuzhùyú zhìliáo jīngshén shénjīng jíbìng, gèng jiāng wèi lèi nǎo tōngyòng réngōng zhìnéng de fāzhǎn tígōng shēnshēn de lǐlùn qǐdí.",
      contentVietnamese: "Khoa học nhận thức dung hòa tâm lý học, sinh học thần kinh, khoa học máy tính và triết học. Làm sáng tỏ bí ẩn sinh học về sự chú ý, cảm thụ, ra quyết định cùng ý thức tự thân không những giúp chữa trị các căn bệnh tâm thần kinh mà còn mang lại sự gợi mở lý luận sâu sắc cho sự phát triển của trí tuệ nhân tạo phỏng não tổng quát."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l12_1",
        type: "multiple_choice",
        question: "Từ 揭示 thường đi kèm với danh từ tân ngữ nào?",
        options: ["规律 (guīlǜ) / 真理 (zhēnlǐ) / 机制 (jīzhì)", "衣服 (yīfu) / 鞋子 (xiézi)", "天气 (tiānqì) / 温度 (wēndù)", "商品 (shāngpǐn) / 价格 (jiàgé)"],
        correctAnswer: "规律 (guīlǜ) / 真理 (zhēnlǐ) / 机制 (jīzhì)",
        explanation: "揭示 thường kết hợp với quy luật, chân lý, cơ chế khoa học."
      }
    ]
  },
  {
    id: "hsk6_l13",
    hskLevel: "HSK6",
    lessonNumber: 13,
    title: "Ngoại giao quốc tế & Động từ 恪守",
    vietnameseTitle: "Bài 13: Luật pháp quốc tế và chủ nghĩa đa phương (Ngoại giao & Động từ 恪守)",
    description: "Hiến chương Liên Hợp Quốc, giải quyết tranh chấp hòa bình, động từ trang trọng 恪守 (nghiêm túc tuân thủ giữ gìn), thành ngữ 息息相关.",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_62", "v_hsk6_63", "v_hsk6_64", "v_hsk6_65", "v_hsk6_66"],
    grammarPoints: [
      {
        id: "gp_hsk6_13_1",
        title: "Động từ tuân thủ nghiêm cẩn: 恪守 (kèshǒu) - Nghiêm túc tuân thủ / Giữ vững không rời",
        structure: "Chủ thể + 恪守 + (Hiến chương Liên Hợp Quốc / Thỏa thuận / Nguyên tắc ngoại giao)",
        explanation: "Dùng trong văn phong ngoại giao và chính trị cao cấp để biểu thị sự tôn trọng và tuân thủ tuyệt đối các nguyên tắc đã cam kết.",
        examples: [
          { hanzi: "各国应当共同恪守以联合国宪章宗旨和原则为基础的国际关系基本准则。", pinyin: "Gè guó yīngdāng gòngtóng kèshǒu yǐ Liánhéguó Xiànzhāng zōngzhǐ hé yuánzé wéi jīchǔ de guójì guānxì jīběn zhǔnzé.", vietnamese: "Các quốc gia cần cùng nhau nghiêm túc tuân thủ các chuẩn mực cơ bản của quan hệ quốc tế dựa trên tôn chỉ và nguyên tắc của Hiến chương Liên Hợp Quốc." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "常驻联合国代表 (Đại sứ tại Liên Hợp Quốc)",
        role: "Hội đồng Bảo an",
        hanzi: "面对动荡变革的世界局势，唯有践行真正的多边主义，维护以国际法为基础的国际秩序，才能维护持久和平。",
        pinyin: "Miànduì dòngdàng biàngé de shìjiè júshì, wéiyǒu jiànxíng zhēnzhèng de duōbiānzhǔyì, wéihù yǐ guójìfǎ wéi jīchǔ de guójì zhìxù, cái néng wéihù chíchǐ hépíng.",
        vietnamese: "Đối mặt với tình hình thế giới đầy biến động, chỉ có thực thi chủ nghĩa đa phương chân chính, bảo vệ trật tự quốc tế dựa trên nền tảng luật pháp quốc tế mới có thể duy trì nền hòa bình lâu dài."
      }
    ],
    readingPassage: {
      title: "人类命运与共 (Vận mệnh nhân loại gắn kết bên nhau)",
      contentHanzi: "在经济全球化和风险全球化的时代，没有哪个国家能够退回到自我封闭的孤岛。世界各国的前途命运息息相关。坚持对话协商、共建共享，是化解国际冲突、实现持久繁荣的根本保障。",
      contentPinyin: "Zài jīngjì quánqiúhuà hé fēngxiǎn quánqiúhuà de shídài, méiyǒu nǎ ge guójiā nénggòu tuìhuí dào zìwǒ fēngbì de gūdǎo. Shìjiè gè guó de qiántú mìngyùn xīxīxiāngguān. Jiānchí duìhuà xiéshāng, gòngjiàn gòngxiǎng, shì huàjiě guójì chōngtū, shíxiàn chíchǐ fánróng de gēnběn bǎozhàng.",
      contentVietnamese: "Trong thời đại toàn cầu hóa kinh tế và toàn cầu hóa rủi ro, không có bất kỳ quốc gia nào có thể rút lui về một ốc đảo tự cô lập. Tiền đồ vận mệnh của các quốc gia trên thế giới gắn bó mật thiết khăng khít với nhau. Kiên trì đối thoại hiệp thương, cùng xây dựng cùng chia sẻ chính là sự đảm bảo căn bản để hóa giải các xung đột quốc tế và hiện thực hóa sự thịnh vượng lâu bền."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l13_1",
        type: "multiple_choice",
        question: "Từ 恪守 mang ý nghĩa gì trong văn bản ngoại giao?",
        options: ["Nghiêm túc tuân thủ và giữ gìn các hiệp ước, nguyên tắc", "Hủy bỏ thỏa thuận", "Tạm hoãn thi hành", "Sửa đổi điều khoản"],
        correctAnswer: "Nghiêm túc tuân thủ và giữ gìn các hiệp ước, nguyên tắc",
        explanation: "恪 (kính cẩn, nghiêm cẩn) + 守 (giữ gìn, tuân thủ)."
      }
    ]
  },
  {
    id: "hsk6_l14",
    hskLevel: "HSK6",
    lessonNumber: 14,
    title: "Ngôn ngữ học & Động từ 映射",
    vietnameseTitle: "Bài 14: Ngôn ngữ học và mô thức tư duy (Giả thuyết Sapir-Whorf & Động từ 映射)",
    description: "Mối quan hệ giữa cấu trúc ngôn ngữ và nhận thức thế giới, động từ trừu tượng 映射 (phản chiếu/ánh xạ), thành ngữ 殊途同归.",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_67", "v_hsk6_68", "v_hsk6_69", "v_hsk6_70", "v_hsk6_71"],
    grammarPoints: [
      {
        id: "gp_hsk6_14_1",
        title: "Động từ phản chiếu trừu tượng: 映射 (yìngshè) - Ánh xạ / Phản chiếu / Soi rọi",
        structure: "Hiện tượng ngôn ngữ / Nghệ thuật + 映射出 + Đặc trưng tâm lý / Bản sắc văn hóa",
        explanation: "Dùng để biểu thị một hiện tượng cụ thể phản chiếu một quy luật hay mô thức tư duy sâu xa bên trong.",
        examples: [
          { hanzi: "汉语中丰富的亲属称谓词汇，深刻映射了传统农耕文明对血缘宗族关系的重视。", pinyin: "Hànyǔ zhōng fēngfù de qīnshǔ chēngwèi cíhuì, shēnkè yìngshè le chuántǒng nónggēng wénmíng duì xuèyuán zōngzú guānxì de zhòngshì.", vietnamese: "Vốn từ vựng xưng hô thân tộc phong phú trong tiếng Trung đã phản chiếu sâu sắc sự coi trọng của nền văn minh nông nghiệp truyền thống đối với mối quan hệ dòng tộc huyết thống." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "语言学教授 (Giáo sư Ngôn ngữ học)",
        role: "Viện Nghiên cứu Ngôn ngữ",
        hanzi: "语言不仅是思维的表达工具，更在无形中塑造着使用者观察与理解世界的认知框架。",
        pinyin: "Yǔyán bùjǐn shì sīwéi de biǎodá gōngjù, gèng zài wúxíng zhōng shùzào zhe shǐyòngzhě guānchá yǔ lǐjiě shìjiè de rènzhī kuàngjià.",
        vietnamese: "Ngôn ngữ không chỉ là công cụ biểu đạt tư duy, mà còn âm thầm định hình nên khung nhận thức quan sát và thấu hiểu thế giới của người sử dụng."
      }
    ],
    readingPassage: {
      title: "语言与心灵的镜像 (Tấm gương soi chiếu của ngôn ngữ và tâm trí)",
      contentHanzi: "不同的语言犹如不同色彩的棱镜，折射出人类对客观世界多元的认知图景。尽管语法结构与词汇范畴千差万别，但在表达爱、追求真理与渴望沟通的人类本性上，各民族语言殊途同归，共同谱写了人类璀璨的精神华章。",
      contentPinyin: "Bùtóng de yǔyán yóurú bùtóng sècǎi de léngjìng, zhéshè chū rénlèi duì kèguān shìjiè duōyuán de rènzhī tújǐng. Jǐnguǎn yǔfǎ jiégòu yǔ cíhuì fànchóu qiānchāwànbié, dàn zài biǎodá ài, zhuīqiú zhēnlǐ yǔ kěwàng gōutōng de rénlèi běnxìng shang, gè mínzú yǔyán shūtútóngguī, gòngtóng pǔxiě le rénlèi cuǐcàn de jīngshén huázhāng.",
      contentVietnamese: "Các ngôn ngữ khác nhau tựa như những lăng kính mang sắc màu khác nhau, khúc xạ nên bức tranh nhận thức muôn màu của nhân loại về thế giới khách quan. Dẫu cho cấu trúc ngữ pháp và phạm trù từ vựng muôn hình vạn trạng, nhưng ở phương diện biểu đạt tình yêu thương, mưu cầu chân lý và khát khao kết nối của bản tính con người, ngôn ngữ của các dân tộc tuy đi bằng những con đường khác nhau nhưng đều cùng hội tụ về một đích đến chung cao đẹp, cùng viết nên những thiên anh hoa rực rỡ của tinh thần nhân loại."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l14_1",
        type: "multiple_choice",
        question: "Từ 映射 có nghĩa là gì trong nghiên cứu ngôn ngữ văn hóa?",
        options: ["Phản chiếu, soi rọi bản chất bên trong qua hiện tượng bên ngoài", "Chiếu sáng đèn điện", "Sao chép nguyên bản", "Xóa bỏ dấu vết"],
        correctAnswer: "Phản chiếu, soi rọi bản chất bên trong qua hiện tượng bên ngoài",
        explanation: "映射 mang nghĩa phản chiếu sâu xa mô thức nhận thức/văn hóa."
      }
    ]
  },
  {
    id: "hsk6_l15",
    hskLevel: "HSK6",
    lessonNumber: 15,
    title: "Mỹ học đương đại & Động từ 解构",
    vietnameseTitle: "Bài 15: Mỹ học hiện đại và phê bình nghệ thuật (Giải cấu trúc & Động từ 解构)",
    description: "Lý luận phê bình nghệ thuật đương đại, tư duy Giải cấu trúc (Deconstruction), động từ 解构, thành ngữ 见仁见智.",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk6_72", "v_hsk6_73", "v_hsk6_74", "v_hsk6_75", "v_hsk6_76"],
    grammarPoints: [
      {
        id: "gp_hsk6_15_1",
        title: "Động từ phê bình triết học: 解构 (jiěgòu) - Giải cấu trúc / Phân tích bóc tách",
        structure: "Nghệ thuật đương đại / Nhà phê bình + 解构了 + Khái niệm truyền thống / Trật tự cũ",
        explanation: "Chỉ phương pháp tư duy bóc tách, phá bỏ cấu trúc và định kiến truyền thống để khám phá những tầng ý nghĩa mới đa chiều.",
        examples: [
          { hanzi: "当代艺术家通过对传统视觉符号的重组与解构，引发观众对现代消费社会的深度反思。", pinyin: "Dāngdài yìshùjiā tōngguò duì chuántǒng shìjué fúhào de zhòngzǔ yǔ jiěgòu, yǐnfā guānzhòng duì xiàndài xiāofèi shèhuì de shēndù fǎnsī.", vietnamese: "Các nghệ sĩ đương đại thông qua việc tái tổ hợp và giải cấu trúc các biểu tượng thị giác truyền thống đã khơi gợi cho khán giả sự suy ngẫm sâu sắc về xã hội tiêu dùng hiện đại." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "艺术批评家 (Nhà phê bình Nghệ thuật)",
        role: "Biennale Quốc tế",
        hanzi: "艺术的价值在于不断挑战认知的边界。打破既定的美学范式，正是当代艺术迸发生机活力的源泉。",
        pinyin: "Yìshù de jiàzhí zàiyú bùduàn tiǎozhàn rènzhī de biānjiè. Dǎpò jìdìng de měixué fànshì, zhèng shì dāngdài yìshù bèngfā shēngjī huólì de yuánquán.",
        vietnamese: "Giá trị của nghệ thuật nằm ở chỗ không ngừng thách thức các ranh giới nhận thức. Phá vỡ những chuẩn mực mỹ học đã định hình sẵn chính là cội nguồn làm bùng nổ sức sống tràn trề của nghệ thuật đương đại."
      }
    ],
    readingPassage: {
      title: "多维视域下的艺术鉴赏 (Thưởng thức nghệ thuật dưới tầm nhìn đa chiều)",
      contentHanzi: "艺术鉴赏从来不是单向的灌输，而是创作者与鉴赏者之间双向的心灵对话。所谓'见仁见智'，每一位读者都能凭借独特的人生体验赋予文本与作品全新的生命诠释。艺术由此在时间的流动中获得了不朽的开放性。",
      contentPinyin: "Yìshù jiànshǎng cónglái bú shì dānxiàng de guànshū, ér shì chuàngzuòzhě yǔ jiànshǎngzhě zhījiān shuāngxiàng de xīnlíng duìhuà. Suǒwèi 'jiànrén-jiànzhì', měi yí wèi dúzhě dōu néng píngjiè dútè de rénshēng tǐyàn fùyǔ wénběn yǔ zuòpǐn quánxīn de shēngmìng quánshì. Yìshù yóucǐ zài shíjiān de liúdòng zhōng huòdé le bùxiǔ de kāifàngxìng.",
      contentVietnamese: "Thưởng thức nghệ thuật xưa nay chưa từng là sự áp đặt một chiều, mà là cuộc đối thoại tâm hồn hai chiều giữa người sáng tạo và người thưởng thức. Cái gọi là 'kẻ thấy nhân người thấy trí' (mỗi người một góc nhìn), mỗi độc giả đều có thể dựa vào trải nghiệm cuộc đời độc đáo của riêng mình để trao cho văn bản và tác phẩm sự diễn giải sức sống hoàn toàn mới. Nhờ đó, nghệ thuật đạt được tính mở bất hủ trong dòng chảy miên viễn của thời gian."
    },
    quizQuestions: [
      {
        id: "q_hsk6_l15_1",
        type: "multiple_choice",
        question: "Từ 解构 xuất phát từ thuật ngữ triết học mỹ học nào?",
        options: ["Deconstruction (Giải cấu trúc)", "Construction (Xây dựng)", "Destruction (Phá hủy)", "Reduction (Thu nhỏ)"],
        correctAnswer: "Deconstruction (Giải cấu trúc)",
        explanation: "解构 dịch từ thuật ngữ triết học Deconstruction."
      }
    ]
  },
  {
    id: "hsk6_l16",
    hskLevel: "HSK6",
    lessonNumber: 16,
    title: "HSK6 Đỉnh cao & Thành ngữ 博大精深",
    vietnameseTitle: "Bài 16: Tố chất học thuật và cảnh giới đại sư (Tổng kết tối cao HSK 6 & 博大精深)",
    description: "Đỉnh cao năng lực ngôn ngữ HSK 6 (5000+ từ vựng), tư duy học thuật độc lập, thành ngữ 博大精深 (uyên bác sâu rộng), 炉火纯青.",
    estimatedMinutes: 45,
    vocabularyIds: ["v_hsk6_77", "v_hsk6_78", "v_hsk6_79", "v_hsk6_80", "v_hsk6_81"],
    grammarPoints: [
      {
        id: "gp_hsk6_16_1",
        title: "Thành ngữ uyên thâm học thuật: 博大精深 (bódà-jīngshēn) - Bác đại tinh thâm / Uyên bác sâu rộng",
        structure: "Nền văn hóa / Hệ thống học thuật + 博大精深",
        explanation: "Dùng để ca ngợi tư tưởng, học thuyết hoặc nền văn hóa có quy mô rộng lớn bao la và nội hàm cực kỳ sâu sắc tinh vi.",
        examples: [
          { hanzi: "中华传统文化博大精深、源远流长，是全人类共同的宝贵精神财富。", pinyin: "Zhōnghuá chuántǒng wénhuà bódà-jīngshēn, yuányuǎnliúcháng, shì quán rénlèi gòngtóng de bǎoguì jīngshén cáifù.", vietnamese: "Văn hóa truyền thống Trung Hoa bác đại tinh thâm, cội nguồn sâu xa dòng chảy miên viễn, là tài sản tinh thần vô giá chung của toàn nhân loại." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "汉学泰斗 (Thái sơn Bắc đẩu Hán học)",
        role: "Đại học Bắc Kinh",
        hanzi: "祝贺各位学者圆满完成HSK六级的全部学术研修！你们不仅掌握了5000个以上的高阶汉语词汇，更能自如运用中文从事高深学术研究与跨国战略决策，真正达到了融会贯通的大师境界！",
        pinyin: "Zhùhè gèwèi xuézhě yuánmǎn wánchéng HSK liù jí de quánbù xuéshù yánxiū! Nǐmen bùjǐn zhǎngwò le wǔqiān ge yǐshàng de gāojiē Hànyǔ cíhuì, gèng néng zìrú yùnyòng Zhōngwén cóngshì gāoshēn xuéshù yánjiū yǔ kuàguó zhànlüè juécè, zhēnzhèng dádào le rónghuìguàntōng de dàshī jìngjiè!",
        vietnamese: "Nhiệt liệt chúc mừng các học giả đã hoàn thành viên mãn toàn bộ chương trình nghiên cứu học thuật HSK cấp 6! Các bạn không chỉ làm chủ hơn 5000 từ vựng tiếng Trung cao cấp mà còn có thể tự do vận dụng tiếng Trung thực hiện nghiên cứu học thuật chuyên sâu và hoạch định chiến lược đa quốc gia, thực sự đạt tới cảnh giới dung hội quán thông của bậc đại sư!"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Tiến sĩ Quốc tế",
        hanzi: "学无止境，气象万千！我们将以严谨求实的治学态度，搭建起东西方文明深度对话与理解的心灵桥梁！",
        pinyin: "Xué wú zhǐjìng, qìxiàng wànqiān! Wǒmen jiāng yǐ yánjǐn qiúshí de zhìxué tàidu, dājiàn qǐ dōngxīfāng wénmíng shēndù duìhuà yǔ lǐjiě de xīnlíng qiáoliáng!",
        vietnamese: "Học tập không có điểm dừng, khí tượng muôn hình vạn trạng! Chúng em sẽ dùng thái độ làm học vấn nghiêm cẩn cầu thị để bắc nên nhịp cầu thấu hiểu và đối thoại sâu sắc giữa các nền văn minh Đông - Tây!"
      }
    ],
    readingPassage: {
      title: "登临绝顶，极目远眺 (Lên tới đỉnh cao, phóng tầm mắt ra xa)",
      contentHanzi: "完成HSK六级的攀登，标志着你的汉语水平已经达到了母语级别的卓越造诣。无论是撰写严谨的学术专著，发表深刻的公众演说，还是领悟古典经史子集的玄妙微言，你都已游刃有余。语言的终极意义在于启迪智慧、温暖心灵、连结世界。愿你在更广阔的天地中展翅高飞，谱写无愧于时代的辉煌篇章！",
      contentPinyin: "Wánchéng HSK liù jí de pāndēng, biāozhì zhe nǐ de Hànyǔ shuǐpíng yǐjīng dádào le mǔyǔ jībié de zhuóyuè zàoyì. Wúlùn shì zhuànxiě yánjǐn de xuéshù zhuānzhù, fābiǎo shēnkè de gōngzhòng yǎnshuō, háishì lǐngwù gǔdiǎn jīng shǐ zǐ jí de xuánmiào wēiyán, nǐ dōu yǐ yóurènyǒuyú. Yǔyán de zhōngjí yìyì zàiyú qǐdí zhìhuì, wēnnuǎn xīnlíng, liánjié shìjiè. Yuàn nǐ zài gèng guǎngkuò de tiāndì zhōng zhǎnchì gāofēi, pǔxiě wúkuì yú shídài de huīhuáng piānzhāng!",
      contentVietnamese: "Hoàn thành hành trình chinh phục đỉnh cao HSK cấp 6 đánh dấu trình độ tiếng Trung của bạn đã đạt tới tố chất xuất chúng sánh ngang người bản ngữ. Dù là soạn thảo các chuyên khảo học thuật nghiêm cẩn, phát biểu các bài diễn thuyết công chúng sâu sắc, hay lĩnh hội lời vi diệu sâu xa trong kho tàng Kinh - Sử - Tử - Tập cổ điển, bạn đều đã đạt tới độ điêu luyện dễ dàng như trở bàn tay. Ý nghĩa tối hậu của ngôn ngữ chính là khai sáng trí tuệ, sưởi ấm tâm hồn và kết nối thế giới. Chúc bạn dang rộng đôi cánh bay cao giữa đất trời bao la, viết nên những chương sử huy hoàng không thẹn với thời đại!"
    },
    quizQuestions: [
      {
        id: "q_hsk6_l16_1",
        type: "multiple_choice",
        question: "Thành ngữ nào dùng để ca ngợi một nền văn hóa/học thuật vừa bao la rộng lớn vừa sâu sắc tinh vi?",
        options: ["博大精深 (bódà-jīngshēn)", "井底之蛙 (jǐngdǐzhīwā)", "粗制滥造 (cūzhì-lànzào)", "杯水车薪 (bēishuǐ-chēxīn)"],
        correctAnswer: "博大精深 (bódà-jīngshēn)",
        explanation: "博大精深 diễn tả quy mô rộng lớn và chiều sâu học thuật uyên bác."
      }
    ]
  }
];
