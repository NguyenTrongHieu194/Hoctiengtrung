import { Lesson } from "../types";

export const HSK5_LESSONS: Lesson[] = [
  {
    id: "hsk5_l1",
    hskLevel: "HSK5",
    lessonNumber: 1,
    title: "Tình cảm tinh tế & Giới từ 朝 / 临",
    vietnameseTitle: "Bài 1: Chi tiết của tình yêu (Tình cảm vợ chồng & Giới từ 朝 / 临)",
    description: "Khám phá chiều sâu tình cảm qua những cử chỉ thường nhật, giới từ phương hướng 朝, giới từ thời gian 临 (trước khi).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_01", "v_hsk5_02", "v_hsk5_03", "v_hsk5_04", "v_hsk5_05", "v_hsk5_06"],
    grammarPoints: [
      {
        id: "gp_hsk5_1_1",
        title: "Giới từ phương hướng & đối tượng: 朝 (cháo) - Hướng về / Về phía",
        structure: "朝 + Phương hướng / Mục tiêu + Động từ",
        explanation: "Dùng để biểu thị hướng chuyển động hoặc đối tượng hướng tới của hành động.",
        examples: [
          { hanzi: "他朝窗外望去，天空飘着细雨。", pinyin: "Tā cháo chuāngwài wàng qù, tiānkōng piāo zhe xìyǔ.", vietnamese: "Anh ấy nhìn ra ngoài cửa sổ, bầu trời đang lất phất mưa bay." },
          { hanzi: "临出门前，妻子递给他一把雨伞。", pinyin: "Lín chūmén qián, qīzi dì gěi tā yì bǎ yǔsǎn.", vietnamese: "Ngay trước lúc ra khỏi cửa, người vợ đưa cho anh một chiếc ô che mưa." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "记者 (Phóng viên)",
        role: "Truyền thông",
        hanzi: "二位老人结婚五十年依然相敬如宾，请问有什么婚姻秘诀吗？",
        pinyin: "Èr wèi lǎorén jiéhūn wǔshí nián yīrán xiāngjìngrúbīn, qǐngwèn yǒu shénme hūnyīn mìmì ma?",
        vietnamese: "Hai cụ kết hôn 50 năm vẫn tương kính như tân, xin hỏi có bí quyết hôn nhân nào không ạ?"
      },
      {
        speaker: "老先生 (Cụ ông)",
        role: "Khách mời",
        hanzi: "哪有什么秘诀，爱都在细节里。每天早晨出门前，她总是朝我微笑着叮嘱一句'路上慢点儿'，几十年从未间断。",
        pinyin: "Nǎ yǒu shénme mìmì, ài dōu zài xìjié lǐ. Měitiān zǎochén chūmén qián, tā zǒngshì cháo wǒ wēixiào zhe dīngzhǔ yí jù 'lùshang màn diǎnr', jǐshí nián cóngwèi jiànduàn.",
        vietnamese: "Nào có bí quyết gì đâu, tình yêu đều nằm ở những chi tiết nhỏ. Mỗi sáng trước khi ra khỏi cửa, bà ấy luôn hướng về phía tôi mỉm cười dặn dò một câu 'đi đường cẩn thận nhé', mấy chục năm nay chưa từng gián đoạn."
      }
    ],
    readingPassage: {
      title: "细微之处见真情 (Thấy chân tình nơi chi tiết nhỏ)",
      contentHanzi: "真正的爱往往不需要华丽的誓言，而是蕴藏在日常生活的点滴细节中。一句及时的问候、一碗热腾腾的清汤、一个默默注视的眼神，都能传递出无与伦比的深情厚谊。",
      contentPinyin: "Zhēnzhèng de ài wǎngwǎng bù xūyào huálì de shìyán, ér shì yùncáng zài rìcháng shēnghuó de diǎndī xìjié zhōng. Yí jù jíshí de wènhòu, yì wǎn rèténgténg de qīngtāng, yí ge mòmò zhùshì de yǎnshén, dōu néng chuándì chū wúyǔlúnbǐ de shēnqíng hòuyì.",
      contentVietnamese: "Tình yêu chân thực thường không cần những lời thề thốt hoa mỹ, mà ẩn chứa trong từng chi tiết nhỏ nhặt của cuộc sống thường ngày. Một lời thăm hỏi kịp thời, một bát canh nóng hổi, một ánh mắt lặng lẽ dõi theo đều có thể truyền tải tình cảm sâu nặng vô bờ."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l1_1",
        type: "multiple_choice",
        question: "Giới từ nào mang nghĩa 'ngay trước lúc / sắp sửa tới thời điểm'?",
        options: ["临 (lín)", "朝 (cháo)", "向 (xiàng)", "自 (zì)"],
        correctAnswer: "临 (lín)",
        explanation: "临 + Danh từ/Thời gian (như 临走, 临出门) biểu thị ngay trước lúc xảy ra."
      }
    ]
  },
  {
    id: "hsk5_l2",
    hskLevel: "HSK5",
    lessonNumber: 2,
    title: "Nghệ thuật văn học & Liên từ 便 / 乃至",
    vietnameseTitle: "Bài 2: Mùa đông Tế Nam (Tác phẩm văn học cổ điển & Liên từ 便 / 乃至)",
    description: "Thưởng thức áng văn bất hủ của nhà văn Lão Xá, liên từ 便 (thì liền), 乃至 (cho đến/thậm chí).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_07", "v_hsk5_08", "v_hsk5_09", "v_hsk5_10", "v_hsk5_11"],
    grammarPoints: [
      {
        id: "gp_hsk5_2_1",
        title: "Phó từ / Liên từ cổ điển: 便 (biàn) - Liền / Thì (Tương đương 就 trong khẩu ngữ)",
        structure: "Vế 1, 便 + Vế 2 (Hành động diễn ra tức khắc)",
        explanation: "Mang đậm sắc thái văn phong tao nhã, diễn tả sự việc tiếp diễn nhanh chóng tự nhiên.",
        examples: [
          { hanzi: "春风一吹，满山的桃花便盛开了。", pinyin: "Chūnfēng yì chuī, mǎn shān de táohuā biàn shèngkāi le.", vietnamese: "Gió xuân vừa thổi qua, hoa đào khắp núi liền nở rộ." },
          { hanzi: "这种传统手艺在全省乃至全国都享有盛誉。", pinyin: "Zhè zhǒng chuántǒng shǒuyì zài quán shěng nǎizhì quán guó dōu xiǎngyǒu shèngyù.", vietnamese: "Nghề thủ công truyền thống này nổi tiếng khắp toàn tỉnh cho đến cả nước." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "文学教授 (Giáo sư Văn học)",
        role: "Giảng đường",
        hanzi: "老舍先生笔下济南的冬天是温晴的，山水含情，宛如一幅水墨画。",
        pinyin: "Lǎoshě xiānsheng bǐxià Jǐnán de dōngtiān shì wēnqíng de, shānshuǐ hánqíng, wǎnrú yì fú shuǐmòhuà.",
        vietnamese: "Mùa đông Tế Nam dưới ngòi bút của nhà văn Lão Xá thật ấm áp dịu dàng, núi sông chan chứa ân tình, tựa như một bức tranh thủy mặc."
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Nghiên cứu sinh",
        hanzi: "先生运用了拟人与比喻手法，读罢便让人心生向往，想亲临济南感受那份温存。",
        pinyin: "Xiānsheng yùnyòng le nǐrén yǔ bǐyù shǒufǎ, dú bà biàn ràng rén xīn shēng xiàngwǎng, xiǎng qīnlín Jǐnán gǎnshòu nà fèn wēncún.",
        vietnamese: "Tiên sinh đã vận dụng nghệ thuật nhân hóa và ẩn dụ, đọc xong liền khiến lòng người dâng trào niềm ao ước, muốn đích thân tới Tế Nam để cảm nhận sự ấm áp ấy."
      }
    ],
    readingPassage: {
      title: "温晴的济南 (Tế Nam ấm áp dịu dàng)",
      contentHanzi: "对于一个在北平住惯的人，像我，冬天要是不刮风，便觉得是奇迹；济南的冬天是没有风声的。对于一个刚由伦敦回来的人，像我，冬天要能看得见日光，便觉得是怪事；济南的冬天是响晴的。",
      contentPinyin: "Duìyú yí ge zài Běipíng zhù guàn de rén, xiàng wǒ, dōngtiān yàoshì bù guāfēng, biàn juéde shì qíjì; Jǐnán de dōngtiān shì méiyǒu fēngshēng de. Duìyú yí ge gāng yóu Lúndūn huílái de rén, xiàng wǒ, dōngtiān yào néng kàn de jiàn rìguāng, biàn juéde shì guàishì; Jǐnán de dōngtiān shì xiǎngqíng de.",
      contentVietnamese: "Đối với một người đã quen sống ở Bắc Bình như tôi, mùa đông nếu không có gió thì liền thấy là một kỳ tích; mùa đông Tế Nam lại không có tiếng gió rít. Đối với một người vừa từ London trở về như tôi, mùa đông nếu nhìn thấy ánh mặt trời thì liền coi là chuyện lạ; mùa đông Tế Nam lại ngập tràn ánh nắng ấm trong veo."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l2_1",
        type: "multiple_choice",
        question: "Từ 便 trong văn viết tương đương với phó từ nào trong khẩu ngữ?",
        options: ["就 (jiù)", "才 (cái)", "又 (yòu)", "再 (zài)"],
        correctAnswer: "就 (jiù)",
        explanation: "便 trong văn viết tương đương với 就 (thì, liền)."
      }
    ]
  },
  {
    id: "hsk5_l3",
    hskLevel: "HSK5",
    lessonNumber: 3,
    title: "Chữ ký hoàn mỹ & Liên từ 何况 / 幸亏",
    vietnameseTitle: "Bài 3: Chữ ký hoàn mỹ (Nhân cách trung thực & Liên từ 何况 / 幸亏)",
    description: "Câu chuyện về lòng trung thực và danh dự, liên từ tăng tiến nhượng bộ 何况 (huống hồ), liên từ may mắn 幸亏 (may mà).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_12", "v_hsk5_13", "v_hsk5_14", "v_hsk5_15", "v_hsk5_16"],
    grammarPoints: [
      {
        id: "gp_hsk5_3_1",
        title: "Liên từ tăng tiến: 何况 (hékuàng) - Huống hồ / Huống chi",
        structure: "Vế 1 (Điều kiện bình thường đã khó/đạt được), 何况 + Vế 2 (Điều kiện vượt trội/khó khăn hơn nhiều)",
        explanation: "Dùng để bổ sung thêm một lý do hiển nhiên hơn nhằm tăng sức thuyết phục cho luận điểm.",
        examples: [
          { hanzi: "大人都搬不动这个箱子，何况小孩子呢？", pinyin: "Dàrén dōu bān bu dòng zhè ge xiāngzi, hékuàng xiǎoháizi ne?", vietnamese: "Người lớn còn khiêng không nổi chiếc hòm này, huống chi là trẻ con?" },
          { hanzi: "幸亏你及时提醒我，否则合同就签错了。", pinyin: "Xìngkuī nǐ jíshí tíxǐng wǒ, fǒuzé hétong jiù qiān cuò le.", vietnamese: "May mà bạn kịp thời nhắc nhở, nếu không thì hợp đồng đã ký sai rồi." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "律师 (Luật sư)",
        role: "Tư vấn pháp lý",
        hanzi: "这份商业合同关系到数千万的资金，哪怕一个标点符号都不能马虎，何况是法定代表人的签名！",
        pinyin: "Zhè fèn shāngyè hétong guānxì dào shùqiānwàn de zījīn, nǎpà yí ge biāodiǎnfúhào dōu bù néng mǎhu, hékuàng shì fǎdìng dàibiǎorén de qiānmíng!",
        vietnamese: "Hợp đồng thương mại này liên quan tới hàng chục triệu tiền vốn, cho dù một dấu chấm câu cũng không được cẩu thả, huống hồ là chữ ký của người đại diện theo pháp luật!"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Trợ lý",
        hanzi: "幸亏我们反复核对了三遍，确保了所有条款万无一失。",
        pinyin: "Xìngkuī wǒmen fǎnfù héduì le sān biàn, quèbǎo le suǒyǒu tiáokuǎn wànwúyìshī.",
        vietnamese: "May mà chúng ta đã đối chiếu kỹ lưỡng 3 lần, đảm bảo mọi điều khoản đều chính xác tuyệt đối không chút sơ hở."
      }
    ],
    readingPassage: {
      title: "契约精神 (Tinh thần khế ước)",
      contentHanzi: "签名不仅是一个人的名字代号，更是法律责任与个人信誉的郑重承诺。恪守承诺、诚实守信是现代商业文明的基石。一个人的信用一旦破产，将寸步难行。",
      contentPinyin: "Qiānmíng bùjǐn shì yí ge rén de míngzi dàihào, gèng shì fǎlǜ zérèn yǔ gèrén xìnyù de zhèngzhòng chéngnuò. Kèshǒu chéngnuò, chéngshí shǒuxìn shì xiàndài shāngyè wénmíng de jīshí. Yí ge rén de xìnyòng yídàn pòchǎn, jiāng cùnbùnánxíng.",
      contentVietnamese: "Chữ ký không chỉ là biểu tượng tên gọi của một người, mà còn là lời cam kết trịnh trọng về trách nhiệm pháp lý và uy tín cá nhân. Tôn trọng cam kết, giữ chữ tín trung thực chính là nền móng của văn minh thương mại hiện đại. Một khi chữ tín của một người đã sụp đổ, người đó sẽ gặp khó khăn trắc trở ở mọi bước đường."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l3_1",
        type: "multiple_choice",
        question: "Từ nào mang nghĩa 'may mắn mà / may nhờ có' để tránh một hậu quả xấu?",
        options: ["幸亏 (xìngkuī)", "何况 (hékuàng)", "难怪 (nánguài)", "毕竟 (bìjìng)"],
        correctAnswer: "幸亏 (xìngkuī)",
        explanation: "幸亏 mang nghĩa may mà, nhờ may mắn tránh được điều rủi ro."
      }
    ]
  },
  {
    id: "hsk5_l4",
    hskLevel: "HSK5",
    lessonNumber: 4,
    title: "Xã hội học & Liên từ 除非 / 索性",
    vietnameseTitle: "Bài 4: Thú cưng và con người hiện đại (Tâm lý xã hội & 除非 / 索性)",
    description: "Hiện tượng thú cưng trong xã hội hiện đại, liên từ điều kiện duy nhất 除非 (trừ phi), phó từ 索性 (dứt khoát làm luôn).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_17", "v_hsk5_18", "v_hsk5_19", "v_hsk5_20", "v_hsk5_21"],
    grammarPoints: [
      {
        id: "gp_hsk5_4_1",
        title: "Cặp liên từ điều kiện loại trừ duy nhất: 除非……才 / 否则…… (Trừ phi... mới...)",
        structure: "除非 + Điều kiện duy nhất, 才会 + Kết quả / 否则 + Hậu quả",
        explanation: "Biểu thị chỉ có một điều kiện duy nhất này mới có thể mang lại kết quả mong muốn.",
        examples: [
          { hanzi: "除非你有足够的耐心和爱心，否则不要轻易养宠物。", pinyin: "Chúfēi nǐ yǒu zúgòu de nàixīn hé àixīn, fǒuzé bú yào qīngyì yǎng chǒngwù.", vietnamese: "Trừ phi bạn có đủ lòng kiên nhẫn và tình yêu thương, nếu không đừng tùy tiện nuôi thú cưng." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Chủ nuôi thú",
        hanzi: "现代都市生活节奏快，下班回到家看到可爱的猫咪，一天的疲惫瞬间就烟消云散了。",
        pinyin: "Xiàndài dūshì shēnghuó jiézòu kuài, xiàbān huídào jiā kàndào kě'ài de māomī, yì tiān de píbèi shùnjiān jiù yānxiāoyúnsàn le.",
        vietnamese: "Nhịp sống đô thị hiện đại hối hả, tan sở về đến nhà nhìn thấy chú mèo đáng yêu, nỗi mệt mỏi của cả ngày lập tức tan biến như mây khói."
      }
    ],
    readingPassage: {
      title: "情感的寄托 (Chỗ dựa tình cảm)",
      contentHanzi: "宠物对于许多现代人而言，早已不仅仅是动物，而是亲密无间的家庭成员。它们无条件的陪伴与治愈力量，有效缓解了人们在快节奏都市生活中的孤独与焦虑。",
      contentPinyin: "Chǒngwù duìyú xǔduō xiàndàirén éryán, zǎoyǐ bù jǐnjǐn shì dòngwù, ér shì qīnmìwújiàn de jiātíng chéngyuán. Tāmen wútiáojiàn de péibàn yǔ zhìyù lìliang, yǒuxiào huǎnjiě le rénmen zài kuài jiézòu dūshì shēnghuó zhōng de gūdú yǔ jiāolǜ.",
      contentVietnamese: "Thú cưng đối với nhiều người hiện đại từ lâu không còn đơn thuần là động vật, mà là thành viên gắn bó khăng khít trong gia đình. Sự đồng hành vô điều kiện và sức mạnh chữa lành của chúng đã xoa dịu hiệu quả nỗi cô đơn và âu lo trong nhịp sống đô thị hối hả."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l4_1",
        type: "multiple_choice",
        question: "Cặp liên từ nào mang nghĩa 'Trừ phi... nếu không...'?",
        options: ["除非……否则…… (Chúfēi... fǒuzé...)", "只要……就…… (Zhǐyào... jiù...)", "虽然……但是…… (Suīrán... dànshì...)", "无论……都…… (Wúlùn... dōu...)"],
        correctAnswer: "除非……否则…… (Chúfēi... fǒuzé...)",
        explanation: "除非...否则... là cặp liên từ chỉ điều kiện duy nhất loại trừ."
      }
    ]
  },
  {
    id: "hsk5_l5",
    hskLevel: "HSK5",
    lessonNumber: 5,
    title: "Chiến lược kinh doanh & Lượng từ 届 / 一旦",
    vietnameseTitle: "Bài 5: Kỳ tích của Hudson (Nghệ thuật tiếp thị & Lượng từ 届 / 一旦)",
    description: "Nghiên cứu case study kinh doanh, liên từ 一旦...就... (một khi... thì...), lượng từ khóa/nhiệm kỳ 届.",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_22", "v_hsk5_23", "v_hsk5_24", "v_hsk5_25", "v_hsk5_26"],
    grammarPoints: [
      {
        id: "gp_hsk5_5_1",
        title: "Liên từ thời gian giả thiết: 一旦……就…… (Một khi... thì...)",
        structure: "一旦 + Điều kiện bùng phát / Thay đổi then chốt, 主语 + 就 + Kết quả khó đảo ngược",
        explanation: "Biểu thị một khi điều kiện tiên quyết xảy ra thì sẽ lập tức dẫn đến một chuỗi hệ quả chắc chắn.",
        examples: [
          { hanzi: "这个品牌一旦失去消费者的信任，就很难东山再起了。", pinyin: "Zhè ge pǐnpái yídàn shīqù xiāofèizhě de xìnrèn, jiù hěn nán dōngshānzàiqǐ le.", vietnamese: "Thương hiệu này một khi đánh mất niềm tin của người tiêu dùng thì rất khó gầy dựng lại cơ nghiệp." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "市场总监 (Giám đốc Marketing)",
        role: "Thương trường",
        hanzi: "在本届博览会上，我们推出的创新产品引发了轰动。一旦拿到专利许可，我们就能迅速占领全球市场。",
        pinyin: "Zài běn jiè bólǎnhuì shang, wǒmen tuīchū de chuàngxīn chǎnpǐn yǐnfā le hōngdòng. Yídàn nádào zhuānlì xǔkě, wǒmen jiù néng xùnsù zhànlǐng quánqiú shìchǎng.",
        vietnamese: "Tại hội chợ triển lãm khóa này, sản phẩm sáng tạo chúng ta tung ra đã gây được tiếng vang lớn. Một khi nhận được giấy phép bằng sáng chế, chúng ta có thể nhanh chóng chiếm lĩnh thị trường toàn cầu."
      }
    ],
    readingPassage: {
      title: "商业创新的魅力 (Sức hút của đổi mới sáng tạo trong kinh doanh)",
      contentHanzi: "商业竞争如逆水行舟，不进则退。敏锐的市场洞察力、颠覆性的创新思维以及果敢的执行力，往往能在看似饱和的红海市场中创造出惊人的商业奇迹。",
      contentPinyin: "Shāngyè jìngzhēng rú nìshuǐxíngzhōu, bú jìn zé tuì. Mǐnruì de shìchǎng dòngchálì, diānfùxìng de chuàngxīn sīwéi yǐjí guǒgǎn de zhíxínglì, wǎngwǎng néng zài kànsì bǎohé de hónghǎi shìchǎng zhōng chuàngzào chū jīngrén de shāngyè qíjì.",
      contentVietnamese: "Cạnh tranh thương trường tựa như chèo thuyền ngược dòng nước, không tiến ắt sẽ lùi. Nhãn quan thị trường nhạy bén, tư duy đổi mới mang tính đột phá cùng năng lực thực thi quả đoán thường có thể tạo nên những kỳ tích kinh doanh kinh ngạc giữa thị trường đại dương đỏ tưởng chừng đã bão hòa."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l5_1",
        type: "multiple_choice",
        question: "Cặp từ '一旦……就……' biểu thị ý gì?",
        options: ["Một khi điều kiện xảy ra thì lập tức phát sinh kết quả", "Mặc dù nhưng", "Không những mà còn", "Bất luận thế nào"],
        correctAnswer: "Một khi điều kiện xảy ra thì lập tức phát sinh kết quả",
        explanation: "一旦...就... biểu thị hệ quả tất yếu một khi điều kiện được kích hoạt."
      }
    ]
  },
  {
    id: "hsk5_l6",
    hskLevel: "HSK5",
    lessonNumber: 6,
    title: "Điển cố & Liên từ 宁可……也不……",
    vietnameseTitle: "Bài 6: Điển cố thành ngữ và trí tuệ cổ xưa (塞翁失马 & 宁可……也不……)",
    description: "Học thành ngữ kinh điển (Tái ông thất mã, Bạt miêu trợ trưởng), liên từ lựa chọn dứt khoát 宁可...也不... (thà... chứ không...).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_27", "v_hsk5_28", "v_hsk5_29", "v_hsk5_30", "v_hsk5_31"],
    grammarPoints: [
      {
        id: "gp_hsk5_6_1",
        title: "Cặp liên từ lựa chọn kiên quyết: 宁可……也 (不)…… (Thà rằng... chứ quyết không...)",
        structure: "主语 + 宁可 + Chấp nhận phương án khó khăn/thiệt thòi, 也不 / 也要 + Kiên quyết từ chối phương án tệ hại",
        explanation: "Biểu thị sự cân nhắc giữa hai lựa chọn và dứt khoát chọn phương án dù có khó khăn nhưng giữ vững nguyên tắc đạo đức.",
        examples: [
          { hanzi: "他宁可自己多吃点儿苦，也绝不给组织添麻烦。", pinyin: "Tā nìngkě zìjǐ duō chī diǎnr kǔ, yě jué bù gěi zǔzhī tiān máfan.", vietnamese: "Anh ấy thà bản thân chịu thêm chút khổ cực, chứ tuyệt đối không gây thêm phiền phức cho tập thể." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "教授 (Giáo sư)",
        role: "Giảng đường",
        hanzi: "'塞翁失马，焉知非福'。坏事在一定条件下可以转化为好事，这就是中国古人朴素的辩证法智慧。",
        pinyin: "'Sàiwēng shī mǎ, yān zhī fēi fú'. Huàishì zài yídìng tiáojiàn xià kěyǐ zhuǎnhuà wéi hǎoshì, zhè jiù shì Zhōngguó gǔrén pǔsù de biànzhèngfǎ zhìhuì.",
        vietnamese: "'Tái ông thất mã, an tri phi phúc' (Tái ông mất ngựa, biết đâu lại là phúc). Chuyện xấu trong điều kiện nhất định có thể chuyển hóa thành chuyện tốt, đây chính là trí tuệ biện chứng mộc mạc của cổ nhân Trung Hoa."
      }
    ],
    readingPassage: {
      title: "拔苗助长的启示 (Bài học nhổ mạ giúp lúa lớn)",
      contentHanzi: "古时候宋国有个农夫嫌禾苗长得太慢，就把禾苗一棵棵往上拔，结果禾苗全枯死了。事物的发展都有其客观规律，急于求成、违背规律往往适得其反。",
      contentPinyin: "Gǔ shíhou Sòng guó yǒu ge nóngfū xián hémiáo zhǎng de tài màn, jiù bǎ hémiáo yìkēkē wǎng shàng bá, jiéguǒ hémiáo quán kūsǐ le. Shìwù de fāzhǎn dōu yǒu qí kèguān guīlǜ, jíyúqiúchéng, wéibèi guīlǜ wǎngwǎng shìdéqífǎn.",
      contentVietnamese: "Thời xưa ở nước Tống có người nông dân chê mạ lúa lớn quá chậm, bèn nhổ từng cây mạ kéo lên cao, kết quả mạ non héo chết sạch. Sự phát triển của vạn vật đều có quy luật khách quan, nóng vội muốn thành công sớm, làm trái quy luật thì thường phản tác dụng gậy ông đập lưng ông."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l6_1",
        type: "multiple_choice",
        question: "Cặp liên từ nào biểu thị 'thà hy sinh lợi ích nhỏ chứ quyết không làm điều trái nguyên tắc'?",
        options: ["宁可……也不…… (Nìngkě... yě bù...)", "与其……不如…… (Yǔqí... bùrú...)", "不但……而且…… (Búdàn... érqiě...)", "既然……就…… (Jìrán... jiù...)"],
        correctAnswer: "宁可……也不…… (Nìngkě... yě bù...)",
        explanation: "宁可...也不... là cấu trúc biểu thị sự lựa chọn kiên quyết (thà... chứ không...)."
      }
    ]
  },
  {
    id: "hsk5_l7",
    hskLevel: "HSK5",
    lessonNumber: 7,
    title: "Y sinh học & Đại từ 凡是",
    vietnameseTitle: "Bài 7: Đồng hồ sinh học cơ thể (Khoa học sức khỏe & Đại từ 凡是)",
    description: "Nhịp điệu sinh học của cơ thể người, đại từ tổng quát 凡是 (phàm là/tất cả những gì), phó từ 随之 (theo đó mà).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_32", "v_hsk5_33", "v_hsk5_34", "v_hsk5_35", "v_hsk5_36"],
    grammarPoints: [
      {
        id: "gp_hsk5_7_1",
        title: "Đại từ tổng quát tuyệt đối: 凡是……都…… (Phàm là / Hễ là... thì đều...)",
        structure: "凡是 + Danh từ / Thuộc tính, 主语 + 都 / 总 + Kết quả phổ quát",
        explanation: "Dùng để khẳng định một quy luật chung áp dụng cho tất cả mọi đối tượng trong một phạm vi nhất định.",
        examples: [
          { hanzi: "凡是长期熬夜的人，免疫力都会显著下降。", pinyin: "Fánshì chángqī áoyè de rén, miǎnyìlì dōu huì xiǎnzhù xiàjiàng.", vietnamese: "Phàm là những người thức khuya lâu ngày thì sức đề kháng đều suy giảm rõ rệt." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "医学博士 (Tiến sĩ Y khoa)",
        role: "Hội thảo sức khỏe",
        hanzi: "人体内部存在着精密的生物钟。凡是顺应自然规律、按时起居作息的人，精力往往更加充沛。",
        pinyin: "Réntǐ nèibù cúnzài zhe jīngmì de shēngwùzhōng. Fánshì shùnyìng zìrán guīlǜ, ànshí qǐjū zuòxī de rén, jīnglì wǎngwǎng gèngjiā chōngpèi.",
        vietnamese: "Bên trong cơ thể người tồn tại một chiếc đồng hồ sinh học vô cùng tinh vi. Phàm là những người thuận theo quy luật tự nhiên, sinh hoạt nghỉ ngơi đúng giờ thì tinh thần thường sung mãn hơn nhiều."
      }
    ],
    readingPassage: {
      title: "生命的节律 (Nhịp điệu của sự sống)",
      contentHanzi: "诺贝尔生理学奖的研究证实，人体的基因调控着昼夜节律。破坏这一生物节律，不仅会导致代谢紊乱，还会增加患多种慢性疾病的风险。尊重生物钟就是守护生命健康。",
      contentPinyin: "Nuòbèi'ěr shēnglǐxué jiǎng de yánjiū zhèngshí, réntǐ de jīyīn tiáokòng zhe zhòuyè jiélǜ. Pòhuài zhè yí shēngwù jiélǜ, bùjǐn huì dǎozhì dàixiè wěnluàn, hái huì zēngjiā huàn duō zhǒng mànxìng jíbìng de fēngxiǎn. Zūnzhòng shēngwùzhōng jiù shì shǒuhù shēngmìng jiànkāng.",
      contentVietnamese: "Nghiên cứu đạt giải Nobel Sinh lý học đã chứng minh gen của cơ thể con người điều hòa nhịp điệu ngày đêm. Việc phá vỡ nhịp sinh học này không những dẫn tới rối loạn chuyển hóa mà còn làm tăng nguy cơ mắc nhiều bệnh mạn tính. Tôn trọng đồng hồ sinh học chính là bảo vệ sức khỏe sự sống."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l7_1",
        type: "multiple_choice",
        question: "Từ nào mang nghĩa 'Phàm là / Bất cứ ai/vật nào thuộc phạm vi'?",
        options: ["凡是 (fánshì)", "于是 (yúshì)", "总是 (zǒngshì)", "倒是 (dàoshì)"],
        correctAnswer: "凡是 (fánshì)",
        explanation: "凡是 biểu thị tính phổ quát tuyệt đối của tập hợp."
      }
    ]
  },
  {
    id: "hsk5_l8",
    hskLevel: "HSK5",
    lessonNumber: 8,
    title: "Sinh thái học & Liên từ 进而",
    vietnameseTitle: "Bài 8: Bảo vệ thiên nhiên (Đa dạng sinh học & Liên từ 进而)",
    description: "Học về cân bằng sinh thái, bảo tồn loài nguy cấp, liên từ tăng tiến hành động 进而 (tiến tới/sau đó làm bước tiếp theo).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_37", "v_hsk5_38", "v_hsk5_39", "v_hsk5_40", "v_hsk5_41"],
    grammarPoints: [
      {
        id: "gp_hsk5_8_1",
        title: "Liên từ tăng tiến hành động: 进而 (jìn'ér) - Tiến tới / Hơn nữa bước tiếp theo",
        structure: "Hành động cơ sở ở vế 1, 进而 + Hành động nâng cao chiều sâu ở vế 2",
        explanation: "Dùng để biểu thị trên cơ sở của hành động trước tiếp tục tiến thêm một bước cao hơn.",
        examples: [
          { hanzi: "我们要深入了解生态系统，进而采取科学有效的保护措施。", pinyin: "Wǒmen yào shēnrù liǎojiě shēngtài xìtǒng, jìn'ér cǎiqǔ kēxué yǒuxiào de bǎohù cuòshī.", vietnamese: "Chúng ta cần tìm hiểu sâu sắc hệ sinh thái, tiến tới áp dụng các biện pháp bảo vệ khoa học và hiệu quả." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "生态学者 (Nhà sinh thái học)",
        role: "Bảo tồn",
        hanzi: "建立自然保护区可以保护濒危物种的栖息地，进而维护整个区域的生态平衡。",
        pinyin: "Jiànlì zìrán bǎohùqū kěyǐ bǎohù bīnwēi wùzhǒng de qīxīdì, jìn'ér wéihù zhěng ge qūyù de shēngtài pínghéng.",
        vietnamese: "Thành lập các khu bảo tồn thiên nhiên có thể bảo vệ môi trường sống của các loài có nguy cơ tuyệt chủng, tiến tới duy trì sự cân bằng sinh thái của toàn khu vực."
      }
    ],
    readingPassage: {
      title: "人与自然的和谐共生 (Con người và thiên nhiên cùng chung sống hài hòa)",
      contentHanzi: "大自然是人类赖以生存的根基。毁坏森林与湿地必将遭到大自然的严厉报复。只有树立生态文明理念，推动绿色低碳发展，才能实现人与自然的永续和谐共处。",
      contentPinyin: "Dàzìrán shì rénlèi làiyǐ shēngcún de gēnjī. Huǐhuài sēnlín yǔ shīdì bì jiāng zāodào dàzìrán de yánlì bàofù. Zhǐyǒu shùlì shēngtài wénmíng lǐniàn, tuīdòng lǜsè dītàn fāzhǎn, cái néng shíxiàn rén yǔ zìrán de yǒngxù héxié gòngchǔ.",
      contentVietnamese: "Thiên nhiên là nền tảng cho sự sinh tồn của loài người. Phá hủy rừng và đất ngập nước ắt sẽ phải gánh chịu sự trả thù nghiêm khắc của tự nhiên. Chỉ khi xác lập tư tưởng văn minh sinh thái, thúc đẩy phát triển xanh ít phát thải mới có thể hiện thực hóa sự chung sống hài hòa bền vững giữa con người và thiên nhiên."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l8_1",
        type: "multiple_choice",
        question: "Liên từ nào biểu thị việc tiến thêm một bước sâu hơn dựa trên nền tảng sẵn có?",
        options: ["进而 (jìn'ér)", "反而 (fǎn'ér)", "然而 (rán'ér)", "偏偏 (piānpiān)"],
        correctAnswer: "进而 (jìn'ér)",
        explanation: "进而 diễn tả hành động tiến thêm một nấc cao hơn sau bước đầu."
      }
    ]
  },
  {
    id: "hsk5_l9",
    hskLevel: "HSK5",
    lessonNumber: 9,
    title: "Khoa học thần kinh & Phó từ 不免 / 极其",
    vietnameseTitle: "Bài 9: Âm nhạc và não bộ (Khoa học thần kinh & Phó từ 不免 / 极其)",
    description: "Ảnh hưởng của âm nhạc đối với cấu trúc não và trí nhớ, phó từ tâm lý 不免 (không khỏi/tránh sao được), phó từ 极其 (cực kỳ).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_42", "v_hsk5_43", "v_hsk5_44", "v_hsk5_45", "v_hsk5_46"],
    grammarPoints: [
      {
        id: "gp_hsk5_9_1",
        title: "Phó từ biểu thị phản ứng tâm lý tự nhiên: 不免 (bùmiǎn) - Không khỏi / Tránh sao khỏi",
        structure: "Tình huống kích thích, 主语 + 不免 + Nảy sinh cảm xúc / Suy nghĩ",
        explanation: "Dùng để diễn tả một cảm xúc hay trạng thái tự nhiên nảy sinh trong lòng trước một hoàn cảnh cụ thể.",
        examples: [
          { hanzi: "听到这首童年的老歌，我不免想起了故乡的亲人。", pinyin: "Tīngdào zhè shǒu tóngnián de lǎogē, wǒ bùmiǎn xiǎngqǐ le gùxiāng de qīnrén.", vietnamese: "Nghe khúc hát xưa thời thơ ấu này, tôi không khỏi nhớ về những người thân nơi quê nhà." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "神经科学家 (Nhà khoa học thần kinh)",
        role: "Phòng nghiên cứu",
        hanzi: "脑成像技术表明，演奏乐器需要大脑左右半球极其复杂的协同配合。",
        pinyin: "Nǎo chéngxiàng jìshù biǎomíng, yǎnzòu yuèqì xūyào dànǎo zuǒyòu bànqiú jíqí fùzá de xiétóng pèihé.",
        vietnamese: "Kỹ thuật chụp ảnh não bộ cho thấy việc biểu diễn nhạc cụ đòi hỏi sự phối hợp đồng bộ cực kỳ phức tạp giữa hai bán cầu não trái và phải."
      }
    ],
    readingPassage: {
      title: "旋律与智慧 (Giai điệu và trí tuệ)",
      contentHanzi: "音乐被誉为人类灵魂的通用语言。科学研究发现，规律的音乐训练能够显著增强大脑神经突触的连接，提升空间感知、逻辑推理以及语言学习能力。",
      contentPinyin: "Yīnyuè bèi yù wéi rénlèi línghún de tōngyòng yǔyán. Kēxué yánjiū fāxiàn, guīlǜ de yīnyuè xùnliàn nénggòu xiǎnzhù zēngqiáng dànǎo shénjīng tūchù de liánjiē, tíshēng kōngjiān gǎnzhī, luóji tuīlǐ yǐjí yǔyán xuéxí nénglì.",
      contentVietnamese: "Âm nhạc được ca ngợi là ngôn ngữ chung của tâm hồn nhân loại. Nghiên cứu khoa học phát hiện rằng, việc rèn luyện âm nhạc điều độ có thể củng cố rõ rệt sự kết nối của các khớp thần kinh não bộ, nâng cao khả năng cảm thụ không gian, suy luận logic cũng như năng lực học tập ngôn ngữ."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l9_1",
        type: "multiple_choice",
        question: "Từ 不免 dùng thích hợp nhất trong ngữ cảnh nào?",
        options: ["Diễn tả phản ứng tâm lý, cảm xúc nảy sinh một cách tự nhiên", "Cấm đoán hành động", "So sánh số lượng", "Hỏi nguyên nhân"],
        correctAnswer: "Diễn tả phản ứng tâm lý, cảm xúc nảy sinh một cách tự nhiên",
        explanation: "不免 mang nghĩa 'không khỏi / tự nhiên dâng trào cảm xúc'."
      }
    ]
  },
  {
    id: "hsk5_l10",
    hskLevel: "HSK5",
    lessonNumber: 10,
    title: "Di sản văn hóa & Từ 足以",
    vietnameseTitle: "Bài 10: Kế thừa thủ công mỹ nghệ truyền thống (Di sản văn hóa & Phó từ 足以)",
    description: "Bảo tồn gốm sứ, dệt lụa, chạm khắc, từ năng lực 足以 (đủ để/đủ sức), tinh thần nghệ nhân thủ công.",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_47", "v_hsk5_48", "v_hsk5_49", "v_hsk5_50", "v_hsk5_51"],
    grammarPoints: [
      {
        id: "gp_hsk5_10_1",
        title: "Động từ / Phó từ biểu thị năng lực đầy đủ: 足以 (zúyǐ) - Đủ để / Đủ sức",
        structure: "Điều kiện / Bằng chứng + 足以 + Đạt được kết quả / Chứng minh nhận định",
        explanation: "Biểu thị mức độ của điều kiện đã hoàn toàn đáp ứng được yêu cầu để tạo ra kết quả.",
        examples: [
          { hanzi: "这件景德镇陶瓷作品的精美程度，足以代表当代中国制瓷工艺的最高水准。", pinyin: "Zhè jiàn Jǐngdézhèn táocí zuòpǐn de jīngměi chéngdù, zúyǐ dàibiǎo dāngdài Zhōngguó zhì cí gōngyì de zuì gāo shuǐzhǔn.", vietnamese: "Độ tinh xảo của tác phẩm gốm Cảnh Đức Trấn này đủ để đại diện cho trình độ chế tác gốm cao nhất của Trung Quốc đương đại." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "非遗传承人 (Nghệ nhân di sản)",
        role: "Xưởng thủ công",
        hanzi: "一件刺绣作品需要经过数十道工序、历时数月乃至数年方能完成，匠人们倾注的心血足以令人肃然起敬。",
        pinyin: "Yí jiàn cìxiù zuòpǐn xūyào jīngguò shùshí dào gōngxù, lìshí shù yuè nǎizhì shù nián fāng néng wánchéng, jiàngrénmen qīngzhù de xīnxuè zúyǐ lìng rén sùránqǐjìng.",
        vietnamese: "Một tác phẩm thêu cần trải qua hàng chục công đoạn, mất nhiều tháng cho đến nhiều năm mới có thể hoàn thành, tâm huyết mà các nghệ nhân dồn vào đủ khiến người ta phải kính cẩn nghiêng mình."
      }
    ],
    readingPassage: {
      title: "工匠精神 (Tinh thần nghệ nhân)",
      contentHanzi: "所谓工匠精神，是对每道工序的一丝不苟，对每个细节的精益求精。在机械化大生产的时代，传统手工艺所蕴含的温度与人文底蕴是机器永远无法替代的瑰宝。",
      contentPinyin: "Suǒwèi gōngjiàng jīngshén, shì duì měi dào gōngxù de yìsībùgǒu, duì měi ge xìjié de jīngyìqiújīng. Zài jīxièhuà dà shēngchǎn de shídài, chuántǒng shǒugōngyì suǒ yùnhán de wēndù yǔ rénwén dǐyùn shì jīqì yǒngyuǎn wúfǎ tìdài de guībǎo.",
      contentVietnamese: "Cái gọi là tinh thần nghệ nhân chính là sự cẩn trọng tỉ mỉ không chút sơ suất với từng công đoạn, sự hoàn thiện xuất sắc đến từng chi tiết. Trong thời đại sản xuất cơ giới hóa quy mô lớn, sự ấm áp và chiều sâu nhân văn ẩn chứa trong nghề thủ công truyền thống là báu vật mà máy móc vĩnh viễn không thể nào thay thế được."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l10_1",
        type: "multiple_choice",
        question: "Từ 足以 mang nghĩa là gì?",
        options: ["Đủ để / Đủ sức (đạt được kết quả)", "Chân tay", "Đầy đủ trọn vẹn", "Không đủ"],
        correctAnswer: "Đủ để / Đủ sức (đạt được kết quả)",
        explanation: "足以 nghĩa là 'đủ để / đủ điều kiện để'."
      }
    ]
  },
  {
    id: "hsk5_l11",
    hskLevel: "HSK5",
    lessonNumber: 11,
    title: "Kinh tế & Giới từ 鉴于 / 旨在",
    vietnameseTitle: "Bài 11: Nghệ thuật đàm phán thương mại (Thương mại quốc tế & Giới từ 鉴于 / 旨在)",
    description: "Chiến lược đàm phán kinh doanh song phương, giới từ 鉴于 (xét thấy/căn cứ vào), động từ mục đích 旨在 (nhằm mục đích).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_52", "v_hsk5_53", "v_hsk5_54", "v_hsk5_55", "v_hsk5_56"],
    grammarPoints: [
      {
        id: "gp_hsk5_11_1",
        title: "Giới từ căn cứ pháp lý: 鉴于 (jiànyú) - Xét thấy / Căn cứ vào tình hình",
        structure: "鉴于 + Tình hình thực tế khách quan, Chúng tôi + Đưa ra quyết định tương ứng",
        explanation: "Dùng trong văn bản ngoại giao, thương mại và pháp lý để nêu lý do căn cứ của hành động.",
        examples: [
          { hanzi: "鉴于贵公司在行业内的良好信誉，我们决定签署长期战略合作协议。", pinyin: "Jiànyú guì gōngsī zài hángyè nèi de liánghǎo xìnyù, wǒmen juédìng qiānshǔ chángqī zhànlüè hézuò xiéyì.", vietnamese: "Xét thấy uy tín tốt đẹp của quý công ty trong ngành, chúng tôi quyết định ký kết thỏa thuận hợp tác chiến lược lâu dài." },
          { hanzi: "本次会议旨在推动跨境贸易的便利化。", pinyin: "Běn cì huìyì zhǐ zài tuīdòng kuàjìng màoyì de biànlìhuà.", vietnamese: "Hội nghị lần này nhằm mục đích thúc đẩy sự thuận lợi hóa thương mại xuyên biên giới." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "首席谈判代表 (Trưởng đoàn đàm phán)",
        role: "Phòng đàm phán",
        hanzi: "鉴于双方在核心价格条款上已经达成共识，我们建议今天下午起草正式文本。",
        pinyin: "Jiànyú shuāngfāng zài héxīn jiàgé tiáokuǎn shang yǐjīng dáchéng gòngshí, wǒmen jiànyì jīntiān xiàwǔ qǐcǎo zhèngshì wénběn.",
        vietnamese: "Xét thấy hai bên đã đạt được nhận thức chung về các điều khoản giá cả cốt lõi, chúng tôi đề xuất chiều nay tiến hành soạn thảo văn bản chính thức."
      }
    ],
    readingPassage: {
      title: "合作共赢之道 (Đạo hợp tác cùng thắng)",
      contentHanzi: "卓越的商业谈判不是零和博弈，而是寻求各方利益最大化的合作艺术。真诚坦率的沟通、对市场行情的精准把握以及灵活务实的方案设计，是达成互利共赢协议的关键所在。",
      contentPinyin: "Zhuóyuè de shāngyè tánpàn bú shì línghé bóyì, ér shì xúnqiú gè fāng lìyì zuìdàhuà de hézuò yìshù. Zhēnchéng tǎnshuài de gōutōng, duì shìchǎng hángqíng de jīngzhǔn bǎwò yǐjí línghuó wùshí de fāng'àn shèjì, shì dáchéng hùlìgòngyíng xiéyì de guānjiàn suǒzài.",
      contentVietnamese: "Một cuộc đàm phán thương mại xuất chúng không phải là trò chơi có tổng bằng không, mà là nghệ thuật hợp tác tìm kiếm lợi ích tối đa cho tất cả các bên. Giao tiếp chân thành cởi mở, nắm bắt chuẩn xác thị trường cùng với việc thiết kế phương án linh hoạt thực tế chính là chìa khóa then chốt để đạt được thỏa thuận đôi bên cùng có lợi."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l11_1",
        type: "multiple_choice",
        question: "Từ nào thường dùng trong văn bản chính luận mang nghĩa 'Xét thấy / Căn cứ vào'?",
        options: ["鉴于 (jiànyú)", "至于 (zhìyú)", "由于 (yóuyú)", "基于 (jīyú)"],
        correctAnswer: "鉴于 (jiànyú)",
        explanation: "鉴于 là giới từ trang trọng mang nghĩa 'xét thấy'."
      }
    ]
  },
  {
    id: "hsk5_l12",
    hskLevel: "HSK5",
    lessonNumber: 12,
    title: "Công nghệ tương lai & Thành ngữ 毋庸置疑",
    vietnameseTitle: "Bài 12: Trí tuệ nhân tạo và tương lai (AI & Thành ngữ 毋庸置疑)",
    description: "Cuộc cách mạng AI, đạo đức công nghệ, thành ngữ 毋庸置疑 (không còn nghi ngờ gì nữa), liên từ 固然 (dẫu rằng/tất nhiên là).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_57", "v_hsk5_58", "v_hsk5_59", "v_hsk5_60", "v_hsk5_61"],
    grammarPoints: [
      {
        id: "gp_hsk5_12_1",
        title: "Thành ngữ khẳng định chắc chắn: 毋庸置疑 (wúyōngzhìyí) - Không còn gì phải nghi ngờ",
        structure: "Sự thật / Xu thế + 是毋庸置疑的",
        explanation: "Dùng để khẳng định một chân lý, xu hướng phát triển là hoàn toàn xác thực và hiển nhiên.",
        examples: [
          { hanzi: "人工智能对未来社会的深刻影响是毋庸置疑的。", pinyin: "Réngōng zhìnéng duì wèilái shèhuì de shēnkè yǐngxiǎng shì wúyōngzhìyí de.", vietnamese: "Tác động sâu sắc của trí tuệ nhân tạo đối với xã hội tương lai là điều không còn gì phải nghi ngờ." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "科技评论家 (Bình luận viên Công nghệ)",
        role: "Diễn đàn",
        hanzi: "大模型技术的突破毋庸置疑地改变了人类生产知识的方式，但数据安全与伦理治理同样不容忽视。",
        pinyin: "Dà móxíng jìshù de tūtò wúyōngzhìyí de gǎibiàn le rénlèi shēngchǎn zhīshi de fāngshì, dàn shùjù ānquán yǔ lúnlǐ zhìlǐ tóngyàng bùróng hūshì.",
        vietnamese: "Sự đột phá của công nghệ mô hình lớn không còn nghi ngờ gì đã thay đổi phương thức sản xuất tri thức của nhân loại, nhưng an toàn dữ liệu và quản trị đạo đức cũng là điều không thể xem nhẹ."
      }
    ],
    readingPassage: {
      title: "智能时代的机遇与挑战 (Cơ hội và thách thức của kỷ nguyên thông minh)",
      contentHanzi: "人工智能正在以前所未有的速度重构千行百业。它固然能够大幅解放人类的重复性劳动，但也对人类的情感共情能力与创造力提出了更高的要求。科技向善，方能造福全人类。",
      contentPinyin: "Réngōng zhìnéng zhèngzài yǐ qiánsuǒwèiyǒu de sùdù chónggòu qiānhángbǎiyè. Tā gùrán nénggòu dàfú jiěfàng rénlèi de chóngfùxìng láodòng, dàn yě duì rénlèi de qínggǎn gòngqíng nénglì yǔ chuàngzàolì tíchū le gèng gāo de yāoqiú. Kējì xiàngshàn, fāng néng zàofú quán rénlèi.",
      contentVietnamese: "Trí tuệ nhân tạo đang tái cấu trúc hàng ngàn ngành nghề với tốc độ chưa từng có. Công nghệ này dẫu rằng có thể giải phóng mạnh mẽ sức lao động lặp lại của con người, nhưng cũng đặt ra yêu cầu cao hơn về năng lực thấu cảm cảm xúc và tính sáng tạo của nhân loại. Công nghệ hướng thiện mới có thể mang lại hạnh phúc cho toàn nhân loại."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l12_1",
        type: "multiple_choice",
        question: "Thành ngữ 毋庸置疑 có nghĩa là gì?",
        options: ["Không còn nghi ngờ gì nữa (hoàn toàn xác thực)", "Không cần bàn cãi nhiều lời", "Vô cùng kỳ lạ khó hiểu", "Do dự không quyết"],
        correctAnswer: "Không còn nghi ngờ gì nữa (hoàn toàn xác thực)",
        explanation: "毋庸置疑 nghĩa là 'không cần phải hoài nghi, hoàn toàn chắc chắn'."
      }
    ]
  },
  {
    id: "hsk5_l13",
    hskLevel: "HSK5",
    lessonNumber: 13,
    title: "Quy hoạch kiến trúc & Động từ 赋予",
    vietnameseTitle: "Bài 13: Kiến trúc và không gian đô thị (Quy hoạch đô thị & Động từ 赋予)",
    description: "Nghệ thuật không gian kiến trúc, động từ trang trọng 赋予 (trao cho/ban tặng/gửi gắm), động từ 契合 (ăn khớp/phù hợp).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_62", "v_hsk5_63", "v_hsk5_64", "v_hsk5_65", "v_hsk5_66"],
    grammarPoints: [
      {
        id: "gp_hsk5_13_1",
        title: "Động từ trang trọng: 赋予 (fùyǔ) - Trao cho / Ban tặng / Gửi gắm (ý nghĩa, sứ mệnh)",
        structure: "Chủ thể + 赋予 + Đối tượng + (Ý nghĩa văn hóa / Sứ mệnh lịch sử / Sức sống mới)",
        explanation: "Dùng trong văn phong học thuật cao cấp khi miêu tả việc trao gửi những giá trị tinh thần trừu tượng.",
        examples: [
          { hanzi: "设计师赋予了这座古老建筑全新的现代生命力。", pinyin: "Shèjìshī fùyǔ le zhè zuò gǔlǎo jiànzhù quánxīn de xiàndài shēngmìnglì.", vietnamese: "Nhà thiết kế đã trao cho công trình kiến trúc cổ kính này một sức sống hiện đại hoàn toàn mới." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "建筑大师 (Kiến trúc sư bậc thầy)",
        role: "Triển lãm kiến trúc",
        hanzi: "好的城市规划应当尊重历史文脉，赋予公共空间以人文关怀，使建筑与自然环境完美契合。",
        pinyin: "Hǎo de chéngshì guīhuà yīngdāng zūnzhòng lìshǐ wénmài, fùyǔ gōnggòng kōngjiān yǐ rénwén guānhuái, shǐ jiànzhù yǔ zìrán huánjìng wánměi qìhé.",
        vietnamese: "Một quy hoạch đô thị tốt cần tôn trọng mạch nguồn lịch sử, gửi gắm sự quan tâm nhân văn vào không gian công cộng, làm cho công trình kiến trúc ăn khớp hoàn hảo với môi trường tự nhiên."
      }
    ],
    readingPassage: {
      title: "凝固的诗篇 (Thi khúc ngưng đọng)",
      contentHanzi: "建筑常被称为'凝固的音乐'。古老的长城、庄严的故宫、现代的摩天大楼，每一座地标建筑都承载着时代的精神气象，见证着人类文明演进的壮丽历程。",
      contentPinyin: "Jiànzhù cháng bèi chēng wéi 'nínggù de yīnyuè'. Gǔlǎo de Chángchéng, zhuāngyán de Gùgōng, xiàndài de mótiāndàlóu, měi yí zuò dìbiāo jiànzhù dōu chéngzàizhe shídài de jīngshén qìxiàng, jiànzhèng zhe rénlèi wénmíng yǎnjìn de zhuànglì lìchéng.",
      contentVietnamese: "Kiến trúc thường được ví von là 'khúc nhạc ngưng đọng'. Vạn Lý Trường Thành cổ kính, Cố Cung trang nghiêm, các tòa nhà chọc trời hiện đại, mỗi công trình biểu tượng đều chuyên chở khí phách tinh thần của thời đại, chứng kiến chặng đường phát triển tráng lệ của văn minh nhân loại."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l13_1",
        type: "multiple_choice",
        question: "Từ nào kết hợp chuẩn nhất với '使命 (sứ mệnh)' hoặc '意义 (ý nghĩa)'?",
        options: ["赋予 (fùyǔ)", "给予 (jǐyǔ)", "付给 (fùgěi)", "交给 (jiāogěi)"],
        correctAnswer: "赋予 (fùyǔ)",
        explanation: "赋予 thường kết hợp trang trọng với sứ mệnh, ý nghĩa, trách nhiệm."
      }
    ]
  },
  {
    id: "hsk5_l14",
    hskLevel: "HSK5",
    lessonNumber: 14,
    title: "Giao lưu văn hóa & Thành ngữ 潜移默化",
    vietnameseTitle: "Bài 14: Giao tiếp liên văn hóa (Hội nhập toàn cầu & Thành ngữ 潜移默化)",
    description: "Thích ứng văn hóa, giải quyết xung đột nhận thức, thành ngữ 潜移默化 (thấm dần một cách tự nhiên), 殊途同归 (cùng chung đích đến).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_67", "v_hsk5_68", "v_hsk5_69", "v_hsk5_70", "v_hsk5_71"],
    grammarPoints: [
      {
        id: "gp_hsk5_14_1",
        title: "Thành ngữ biểu thị sự ảnh hưởng vô hình sâu sắc: 潜移默化 (qiányímòhuà)",
        structure: "Môi trường / Văn hóa + 对人产生潜移默化的影响",
        explanation: "Biểu thị tư tưởng, tính cách hoặc thói quen của con người bị tác động và thay đổi một cách âm thầm, tự nhiên theo thời gian.",
        examples: [
          { hanzi: "优秀的文学作品对青少年的品格塑造起着潜移默化的作用。", pinyin: "Yōuxiù de wénxué zuòpǐn duì qīngshàonián de pǐngé shùzào qǐ zhe qiányímòhuà de zuòyòng.", vietnamese: "Các tác phẩm văn học xuất sắc phát huy tác dụng thẩm thấu âm thầm bồi dưỡng nhân cách của thanh thiếu niên." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "国际交流处处长 (Trưởng phòng Hợp tác Quốc tế)",
        role: "Đại học",
        hanzi: "留学生在跨文化交际中，通过日常交往潜移默化地增进了彼此的了解与友谊。",
        pinyin: "Liúxuéshēng zài kuà wénhuà jiāojì zhōng, tōngguò rìcháng jiāowǎng qiányímòhuà de zēngjìn le bǐcǐ de liǎojiě yǔ yǒuyì.",
        vietnamese: "Các bạn du học sinh trong giao lưu đa văn hóa, thông qua tiếp xúc thường nhật đã âm thầm bồi đắp thêm sự hiểu biết và tình hữu nghị khăng khít."
      }
    ],
    readingPassage: {
      title: "文明互鉴 (Các nền văn minh cùng học hỏi lẫn nhau)",
      contentHanzi: "文明因多样而交流，因交流而互鉴，因互鉴而发展。在全球化时代，摒弃偏见与傲慢，以开放包容的心态接纳多元文化，是构建人类命运共同体的重要基石。",
      contentPinyin: "Wénmíng yīn duōyàng ér jiāoliú, yīn jiāoliú ér hùjiàn, yīn hùjiàn ér fāzhǎn. Zài quánqiúhuà shídài, bìngqì piānjiàn yǔ àomàn, yǐ kāifàng bāoróng de xīntài jiēnà duōyuán wénhuà, shì gòujiàn rénlèi mìngyùn gòngtóngtǐ de zhòngyào jīshí.",
      contentVietnamese: "Văn minh nhờ tính đa dạng mà có sự giao lưu, nhờ giao lưu mà học hỏi lẫn nhau, nhờ học hỏi mà không ngừng phát triển. Trong thời đại toàn cầu hóa, xóa bỏ định kiến và kiêu ngạo, dùng tâm thế cởi mở bao dung đón nhận các nền văn hóa đa dạng chính là nền tảng then chốt để xây dựng cộng đồng chung vận mệnh nhân loại."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l14_1",
        type: "multiple_choice",
        question: "Thành ngữ 潜移默化 miêu tả quá trình tác động như thế nào?",
        options: ["Âm thầm, tự nhiên thấm nhuần sâu sắc theo thời gian", "Đột ngột thay đổi tức khắc", "Bị ép buộc thực hiện", "Ồn ào náo nhiệt"],
        correctAnswer: "Âm thầm, tự nhiên thấm nhuần sâu sắc theo thời gian",
        explanation: "潜移默化 diễn tả sự thẩm thấu tác động âm thầm không nhận ra."
      }
    ]
  },
  {
    id: "hsk5_l15",
    hskLevel: "HSK5",
    lessonNumber: 15,
    title: "Mỹ học & Thành ngữ 独树一帜",
    vietnameseTitle: "Bài 15: Thẩm mỹ nghệ thuật và sáng tạo (Mỹ học & Thành ngữ 独树一帜)",
    description: "Thưởng thức hội họa, thư pháp, âm nhạc, thành ngữ 独树一帜 (tự tạo nên một phong cách riêng biệt), 炉火纯青 (đạt tới đỉnh cao điêu luyện).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_72", "v_hsk5_73", "v_hsk5_74", "v_hsk5_75", "v_hsk5_76"],
    grammarPoints: [
      {
        id: "gp_hsk5_15_1",
        title: "Thành ngữ phong cách độc đáo: 独树一帜 (dúshùyízhì) - Độc thụ nhất xí / Tạo dựng phong cách độc nhất",
        structure: "Chủ thể nghệ thuật + 在……领域独树一帜",
        explanation: "Biểu thị tác giả hoặc trường phái tạo dựng nên một phong cách nghệ thuật hoàn toàn độc đáo, riêng biệt không lẫn với ai.",
        examples: [
          { hanzi: "齐白石老人的水墨虾在画坛独树一帜，栩栩如生。", pinyin: "Qí Báishí lǎorén de shuǐmò xiā zài huàtán dúshùyízhì, xǔxǔrúshēng.", vietnamese: "Tranh tôm thủy mặc của danh họa Tề Bạch Thạch tạo nên một phong cách độc nhất vô nhị trong giới hội họa, sống động như thật." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "策展人 (Giám tuyển nghệ thuật)",
        role: "Bảo tàng mỹ thuật",
        hanzi: "这位年轻画家的笔触大胆而富有诗意，在当代画坛独树一帜，技法已经达到了炉火纯青的境界。",
        pinyin: "Zhè wèi niánqīng huàjiā de bǐchù dàdǎn ér fùyǒu shīyì, zài dāngdài huàtán dúshùyízhì, jìfǎ yǐjīng dádào le lúhuǒchúnqīng de jìngjiè.",
        vietnamese: "Nét vẽ của họa sĩ trẻ này táo bạo và đậm chất thơ, tạo nên một phong cách độc nhất vô nhị trên văn đàn hội họa đương đại, kỹ pháp đã đạt tới cảnh giới điêu luyện xuất thần."
      }
    ],
    readingPassage: {
      title: "美的探寻 (Hành trình tìm kiếm cái đẹp)",
      contentHanzi: "真正的艺术源于生活而又高于生活。艺术家用敏锐的洞察力捕捉生命中的瞬息万变，将其提炼为具有永恒美学价值的作品。艺术的魅力就在于唤醒人们对真善美的无限追求。",
      contentPinyin: "Zhēnzhèng de yìshù yuányú shēnghuó ér yòu gāoyú shēnghuó. Yìshùjiā yòng mǐnruì de dòngchálì bǔzhuō shēngmìng zhōng de shùnxīwànbiàn, jiāng qí tíliàn wéi jùyǒu yǒnghéng měixué jiàzhí de zuòpǐn. Yìshù de mèilì jiù zài yóu huànxǐng rénmen duì zhēn shàn měi de wúxiàn zhuīqiú.",
      contentVietnamese: "Nghệ thuật đích thực bắt nguồn từ cuộc sống nhưng lại thăng hoa cao hơn cuộc sống. Người nghệ sĩ dùng nhãn quan nhạy bén để bắt trọn những khoảnh khắc muôn màu biến ảo của sự sống, kết tinh chúng thành những tác phẩm mang giá trị mỹ học vĩnh cửu. Sức quyến rũ của nghệ thuật chính là đánh thức sự theo đuổi vô tận của con người hướng về Chân - Thiện - Mỹ."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l15_1",
        type: "multiple_choice",
        question: "Thành ngữ nào dùng để ca ngợi kỹ nghệ đã đạt đến trình độ thuần thục, tinh xảo tuyệt đỉnh?",
        options: ["炉火纯青 (lúhuǒchúnqīng)", "独树一帜 (dúshùyízhì)", "半途而废 (bàntú'érfèi)", "画蛇添足 (huàshétiānzú)"],
        correctAnswer: "炉火纯青 (lúhuǒchúnqīng)",
        explanation: "炉火纯青 diễn tả kỹ năng, học vấn đạt đến đỉnh cao tinh hoa."
      }
    ]
  },
  {
    id: "hsk5_l16",
    hskLevel: "HSK5",
    lessonNumber: 16,
    title: "Pháp lý & Thành ngữ 井然有序",
    vietnameseTitle: "Bài 16: Pháp quyền và xã hội văn minh (Pháp luật & Thành ngữ 井然有序)",
    description: "Nhà nước pháp quyền, trật tự xã hội, thành ngữ 井然有序 (ngăn nắp trật tự quy củ), liên từ văn viết 从而 / 进而.",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_77", "v_hsk5_78", "v_hsk5_79", "v_hsk5_80", "v_hsk5_81"],
    grammarPoints: [
      {
        id: "gp_hsk5_16_1",
        title: "Thành ngữ trật tự: 井然有序 (jǐngrán-yǒuxù) - Ngăn nắp có trật tự / Quy củ rành mạch",
        structure: "Xã hội / Giao thông / Hoạt động + 井然有序",
        explanation: "Miêu tả trạng thái tổ chức, quản lý vô cùng chặt chẽ, trật tự và không hề lộn xộn.",
        examples: [
          { hanzi: "在法律和规章的规范下，整个城市的交通运转得井然有序。", pinyin: "Zài fǎlǜ hé guīzhāng de guīfàn xià, zhěng ge chéngshì de jiāotōng yùnzhuǎn de jǐngrán-yǒuxù.", vietnamese: "Dưới sự chuẩn mực của pháp luật và quy chế, giao thông của toàn thành phố vận hành hết sức trật tự quy củ." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "法学专家 (Chuyên gia Pháp luật)",
        role: "Tọa đàm",
        hanzi: "法治是现代文明的制度基石。人人知法守法，社会秩序才能井然有序，公民的合法权益才能得到充分保障。",
        pinyin: "Fǎzhì shì xiàndài wénmíng de zhìdù jīshí. Rénrén zhī fǎ shǒu fǎ, shèhuì zhìxù cái néng jǐngrán-yǒuxù, gōngmín de héfǎ quányì cái néng dédào chōngfèn bǎozhàng.",
        vietnamese: "Pháp trị là nền tảng thể chế của văn minh hiện đại. Mọi người đều hiểu luật và tuân thủ luật pháp thì trật tự xã hội mới có thể quy củ nề nếp, quyền lợi hợp pháp của công dân mới được đảm bảo đầy đủ."
      }
    ],
    readingPassage: {
      title: "公平正义的守护者 (Người gác đền của công bằng chính nghĩa)",
      contentHanzi: "法律不仅是约束行为的准绳，更是维护社会公平正义的坚固屏障。科学完备的法律体系、公正严明的执法司法以及全社会普遍的法治意识，共同构筑起现代化国家治理的大厦。",
      contentPinyin: "Fǎlǜ bùjǐn shì yuēshù xíngwéi de zhǔnshéng, gèng shì wéihù shèhuì gōngpíng zhèngyì de jiāngù píngzhàng. Kēxué wánbèi de fǎlǜ tǐxì, gōngzhèng yánmíng de zhífǎ sīfǎ yǐjí quán shèhuì pǔbiàn de fǎzhì yìshí, gòngtóng gòuzhù qǐ xiàndàihuà guójiā zhìlǐ de dàshà.",
      contentVietnamese: "Pháp luật không chỉ là thước đo chuẩn mực ước thúc hành vi, mà còn là bức bình phong vững chắc bảo vệ sự công bằng chính nghĩa của xã hội. Một hệ thống pháp luật khoa học hoàn chỉnh, sự thực thi pháp luật và tư pháp công minh nghiêm minh cùng với ý thức pháp quyền phổ biến của toàn xã hội sẽ cùng nhau kiến tạo nên tòa đại xá quản trị quốc gia hiện đại."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l16_1",
        type: "multiple_choice",
        question: "Thành ngữ 井然有序 đồng nghĩa với trạng thái nào?",
        options: ["Ngăn nắp trật tự quy củ", "Hỗn loạn bừa bãi", "Nhanh chóng vội vàng", "Chậm chạp lề mề"],
        correctAnswer: "Ngăn nắp trật tự quy củ",
        explanation: "井然有序 miêu tả trật tự ngăn nắp, kỷ cương."
      }
    ]
  },
  {
    id: "hsk5_l17",
    hskLevel: "HSK5",
    lessonNumber: 17,
    title: "Kinh tế vĩ mô & Thành ngữ 互利共赢",
    vietnameseTitle: "Bài 17: Nhất thể hóa kinh tế toàn cầu (Kinh tế học & Thành ngữ 互利共赢)",
    description: "Toàn cầu hóa kinh tế, chuỗi cung ứng quốc tế, thành ngữ 互利共赢 (đôi bên cùng có lợi), cụm từ 显而易见 (hiển nhiên thấy rõ).",
    estimatedMinutes: 35,
    vocabularyIds: ["v_hsk5_82", "v_hsk5_83", "v_hsk5_84", "v_hsk5_85", "v_hsk5_86"],
    grammarPoints: [
      {
        id: "gp_hsk5_17_1",
        title: "Thành ngữ hợp tác kinh tế: 互利共赢 (hùlì-gòngyíng) - Đôi bên cùng có lợi / Cùng thắng",
        structure: "Chủ thể A 与 主语 B + 开展合作，实现互利共赢",
        explanation: "Dùng để biểu thị mục tiêu hợp tác đôi bên cùng gặt hái lợi ích to lớn.",
        examples: [
          { hanzi: "国际贸易的本质是通过比较优势实现互利共赢。", pinyin: "Guójì màoyì de běnzhì shì tōngguò bǐjiào yōushì shíxiàn hùlì-gòngyíng.", vietnamese: "Bản chất của thương mại quốc tế là thông qua lợi thế so sánh để hiện thực hóa việc đôi bên cùng thắng." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "经济学家 (Nhà kinh tế học)",
        role: "Diễn đàn Davos",
        hanzi: "在全球产业链深度融合的今天，单边主义没有出路，开放包容、互利共赢才是各国经济繁荣的必由之路。",
        pinyin: "Zài quánqiú chǎnyèliàn shēndù rónghé de jīntiān, dānbiānzhǔyì méiyǒu chūlù, kāifàng bāoróng, hùlì-gòngyíng cái shì gè guó jīngjì fánróng de bìyóuzhīlù.",
        vietnamese: "Trong bối cảnh chuỗi sản xuất toàn cầu đang hội nhập sâu sắc ngày nay, chủ nghĩa đơn phương không có lối thoát, mở cửa bao dung và đôi bên cùng thắng mới là con đường tất yếu dẫn tới sự thịnh vượng kinh tế của các quốc gia."
      }
    ],
    readingPassage: {
      title: "开放的大门越开越大 (Cánh cửa mở cửa ngày càng rộng mở)",
      contentHanzi: "经济全球化是不可逆转的时代潮流。跨国投资与国际贸易让全球资源在全球范围内实现最优配置。坚持高水平对外开放，深度融入全球价值链，将为世界经济增长注入强劲动力。",
      contentPinyin: "Jīngjì quánqiúhuà shì bùkě nìzhuǎn de shídài cháoliú. Kuàguó tóuzī yǔ guójì màoyì ràng quánqiú zīyuán zài quánqiú fànwéi nèi shíxiàn zuì yōu pèizhì. Jiānchí gāo shuǐpíng duìwài kāifàng, shēndù róngrù quánqiú jiàzhíliàn, jiāng wèi shìjiè jīngjì zēngzhǎng zhùrù qiángjìn dònglì.",
      contentVietnamese: "Toàn cầu hóa kinh tế là trào lưu thời đại không thể đảo ngược. Đầu tư xuyên quốc gia và thương mại quốc tế giúp tài nguyên toàn cầu đạt được sự phân bổ tối ưu trên phạm vi toàn cầu. Kiên trì mở cửa đối ngoại ở trình độ cao, hội nhập sâu rộng vào chuỗi giá trị toàn cầu sẽ tiếp thêm động lực mạnh mẽ cho sự tăng trưởng kinh tế thế giới."
    },
    quizQuestions: [
      {
        id: "q_hsk5_l17_1",
        type: "multiple_choice",
        question: "Thành ngữ 互利共赢 mang nghĩa là gì?",
        options: ["Hợp tác đôi bên cùng có lợi", "Một bên độc chiếm toàn bộ lợi nhuận", "Cạnh tranh gay gắt khốc liệt", "Bảo hộ mậu dịch"],
        correctAnswer: "Hợp tác đôi bên cùng có lợi",
        explanation: "互利共赢 nghĩa là cùng hợp tác để cùng phát triển, cùng có lợi."
      }
    ]
  },
  {
    id: "hsk5_l18",
    hskLevel: "HSK5",
    lessonNumber: 18,
    title: "HSK5 Toàn diện & Cụm từ 综上所述",
    vietnameseTitle: "Bài 18: Học tập suốt đời và bứt phá (Tổng kết toàn diện HSK 5 & 综上所述)",
    description: "Tổng kết 2500 từ vựng và toàn bộ kết cấu ngữ pháp học thuật HSK 5, cụm từ kết luận 综上所述 (tổng hợp lại những điều nêu trên).",
    estimatedMinutes: 40,
    vocabularyIds: ["v_hsk5_87", "v_hsk5_88", "v_hsk5_89", "v_hsk5_90", "v_hsk5_91"],
    grammarPoints: [
      {
        id: "gp_hsk5_18_1",
        title: "Cụm từ kết luận học thuật: 综上所述 (zōngshàngsuǒshù) - Tổng hợp những điều nêu trên",
        structure: "Trình bày các luận cứ ở phần thân bài, 综上所述 + Đưa ra kết luận trọng tâm",
        explanation: "Dùng phổ biến trong các bài luận, báo cáo học thuật hoặc diễn văn trang trọng để thâu tóm toàn bộ ý kiến.",
        examples: [
          { hanzi: "综上所述，坚持终身学习是适应未来知识经济社会的必由之路。", pinyin: "Zōngshàngsuǒshù, jiānchí zhōngshēn xuéxí shì shìyìng wèilái zhīshi jīngjì shèhuì de bìyóuzhīlù.", vietnamese: "Tổng hợp những điều đã trình bày ở trên, kiên trì học tập suốt đời chính là con đường tất yếu để thích ứng với xã hội kinh tế tri thức tương lai." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "教授 (Giáo sư)",
        role: "Lễ bế giảng HSK5",
        hanzi: "恭喜大家攻克了HSK五级的全部难关！掌握了2500个核心词汇和复杂语法体系，大家已经具备了阅读中文原版书刊和观看中文影视作品的扎实能力。",
        pinyin: "Gōngxǐ dàjiā gōngkè le HSK wǔ jí de quánbù nánguān! Zhǎngwò le liǎngqiānwǔbǎi ge héxīn cíhuì hé fùzá yǔfǎ tǐxì, dàjiā yǐjīng jùbèi le yuèdú Zhōngwén yuánbǎn shūkān hé guānkàn Zhōngwén yǐngshì zuòpǐn de zhāshi nénglì.",
        vietnamese: "Chúc mừng cả lớp đã vượt qua mọi thử thách của HSK cấp 5! Làm chủ 2500 từ vựng cốt lõi và hệ thống ngữ pháp phức tạp, các em đã sở hữu năng lực vững vàng để đọc hiểu sách báo tiếng Trung nguyên bản và xem phim ảnh tiếng Trung."
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Đại diện học viên",
        hanzi: "感谢老师悉心教导！综上所述，语言学习不仅是掌握交流工具，更是开启探索博大精深中华文化之门的钥匙。我们将继续向最高等级HSK六级发起冲刺！",
        pinyin: "Gǎnxiè lǎoshī xīxīn jiàodǎo! Zōngshàngsuǒshù, yǔyán xuéxí bùjǐn shì zhǎngwò jiāoliú gōngjù, gèng shì kāiqǐ tànsuǒ bódàjīngshēn Zhōnghuá wénhuà zhī mén de yàoshi. Wǒmen jiāng jìxù xiàng zuì gāo děngjí HSK liù jí fāqǐ chōngcì!",
        vietnamese: "Cảm ơn thầy đã tận tình chỉ dạy! Tổng hợp lại, học ngôn ngữ không chỉ là làm chủ công cụ giao tiếp mà còn là chiếc chìa khóa mở cánh cửa khám phá nền văn hóa Trung Hoa uyên thâm bác đại. Chúng em sẽ tiếp tục dốc sức bứt phá chinh phục đỉnh cao HSK cấp 6!"
      }
    ],
    readingPassage: {
      title: "HSK五级总结与展望 (Tổng kết và định hướng HSK 5)",
      contentHanzi: "HSK五级标志着学习者进入了高级汉语应用阶段。掌握HSK五级能够就复杂的专业学术与社会热点问题发表见解，撰写结构严密、逻辑清晰的中文篇章。这是通往学术研究和跨国职场精英的必经阶梯！",
      contentPinyin: "HSK wǔ jí biāozhì zhe xuéxízhě jìnrù le gāojí Hànyǔ yìngyòng jiēduàn. Zhǎngwò HSK wǔ jí nénggòu jiù fùzá de zhuānyè xuéshù yǔ shèhuì rèdiǎn wèntí fābiǎo jiànjiě, zhuànxiě jiégòu yánmì, luóji qīngxī de Zhōngwén piānzhāng. Zhè shì tōngwǎng xuéshù yánjiū hé kuàguó zhíchǎng jīngyīng de bìjīng jiētī!",
      contentVietnamese: "HSK cấp 5 đánh dấu người học bước vào giai đoạn ứng dụng tiếng Trung cao cấp. Làm chủ HSK cấp 5 có thể phát biểu ý kiến, bình luận về các vấn đề học thuật chuyên sâu và chủ đề thời sự xã hội phức tạp, viết các bài viết tiếng Trung với kết cấu chặt chẽ và tư duy logic rõ ràng. Đây là nấc thang tất yếu để vươn tới giới nghiên cứu học thuật và tinh hoa công sở đa quốc gia!"
    },
    quizQuestions: [
      {
        id: "q_hsk5_l18_1",
        type: "multiple_choice",
        question: "Cụm từ 综上所述 thường xuất hiện ở vị trí nào trong một bài viết học thuật?",
        options: ["Đầu đoạn văn kết luận để tóm tắt các luận điểm", "Mở đầu bài viết", "Trong phần liệt kê số liệu", "Trong câu hỏi phản vấn"],
        correctAnswer: "Đầu đoạn văn kết luận để tóm tắt các luận điểm",
        explanation: "综上所述 dùng trang trọng ở phần đúc kết, kết luận của văn bản."
      }
    ]
  }
];
