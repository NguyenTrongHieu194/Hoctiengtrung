import { Lesson } from "../types";

export const HSK1_LESSONS: Lesson[] = [
  {
    id: "hsk1_l1",
    hskLevel: "HSK1",
    lessonNumber: 1,
    title: "Lời chào đầu tiên",
    vietnameseTitle: "Bài 1: Chào hỏi, xưng hô và thanh điệu cơ bản",
    description: "Học cách chào hỏi lịch sự, xưng hô ngôi thứ (bạn, ngài) và nói lời cảm ơn, tạm biệt bằng tiếng Trung chuẩn quốc tế.",
    estimatedMinutes: 15,
    vocabularyIds: ["v_hsk1_01", "v_hsk1_02", "v_hsk1_03", "v_hsk1_04", "v_hsk1_05", "v_hsk1_06", "v_hsk1_07", "v_hsk1_08"],
    grammarPoints: [
      {
        id: "gp_hsk1_1_1",
        title: "Lời chào cơ bản: Đại từ + 好 (hǎo)",
        structure: "Người được chào + 好 (hǎo)",
        explanation: "Trong tiếng Trung, ghép đại từ nhân xưng hoặc tên/chức danh với chữ 好 để tạo thành lời chào thân mật hoặc trang trọng.",
        examples: [
          { hanzi: "你好！", pinyin: "Nǐ hǎo!", vietnamese: "Chào bạn!" },
          { hanzi: "您好！", pinyin: "Nín hǎo!", vietnamese: "Chào ngài / Chào bác (kính ngữ)!" },
          { hanzi: "老师好！", pinyin: "Lǎoshī hǎo!", vietnamese: "Em chào thầy/cô giáo!" }
        ]
      },
      {
        id: "gp_hsk1_1_2",
        title: "Đại từ nhân xưng số nhiều: Thêm hậu tố 们 (men)",
        structure: "Đại từ + 们 (men)",
        explanation: "Thêm 们 vào sau đại từ ngôi thứ nhất, hai, ba để tạo thành dạng số nhiều: 我们 (chúng tôi), 你们 (các bạn), 他们 (họ).",
        examples: [
          { hanzi: "你们好！", pinyin: "Nǐmen hǎo!", vietnamese: "Chào các bạn!" },
          { hanzi: "我们是学生。", pinyin: "Wǒmen shì xuésheng.", vietnamese: "Chúng tôi là học sinh." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn học",
        hanzi: "你好！我叫王明。",
        pinyin: "Nǐ hǎo! Wǒ jiào Wáng Míng.",
        vietnamese: "Xin chào! Tôi tên là Vương Minh."
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "你好，王明！很高兴认识你。",
        pinyin: "Nǐ hǎo, Wáng Míng! Hěn gāoxìng rènshi nǐ.",
        vietnamese: "Chào Vương Minh! Rất vui được làm quen với bạn."
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn học",
        hanzi: "明天见！",
        pinyin: "Míngtiān jiàn!",
        vietnamese: "Ngày mai gặp lại nhé!"
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "再见！",
        pinyin: "Zàijiàn!",
        vietnamese: "Tạm biệt!"
      }
    ],
    readingPassage: {
      title: "初次见面 (Lần đầu gặp mặt)",
      contentHanzi: "你好！我叫李华。我是中国人。很高兴认识大家。明天见！",
      contentPinyin: "Nǐ hǎo! Wǒ jiào Lǐ Huá. Wǒ shì Zhōngguó rén. Hěn gāoxìng rènshi dàjiā. Míngtiān jiàn!",
      contentVietnamese: "Xin chào! Tôi tên là Lý Hoa. Tôi là người Trung Quốc. Rất vui được làm quen với mọi người. Hẹn ngày mai gặp lại!"
    },
    quizQuestions: [
      {
        id: "q_hsk1_l1_1",
        type: "multiple_choice",
        question: "Từ nào dùng để chào người lớn tuổi hoặc cấp trên một cách trang trọng?",
        options: ["您好 (nín hǎo)", "你好 (nǐ hǎo)", "再见 (zàijiàn)", "谢谢 (xièxie)"],
        correctAnswer: "您好 (nín hǎo)",
        explanation: "您 (nín) là đại từ kính cẩn dành cho người lớn tuổi, khách quý hoặc cấp trên."
      },
      {
        id: "q_hsk1_l1_2",
        type: "multiple_choice",
        question: "Khi người khác nói '再见 (Zàijiàn)', bạn nên đáp lại như thế nào?",
        options: ["再见 (Zàijiàn)", "不客气 (Bú kèqi)", "没关系 (Méi guānxi)", "很好 (Hěn hǎo)"],
        correctAnswer: "再见 (Zàijiàn)",
        explanation: "再见 có nghĩa là tạm biệt (hẹn gặp lại), đáp lại cũng là 再见."
      }
    ]
  },
  {
    id: "hsk1_l2",
    hskLevel: "HSK1",
    lessonNumber: 2,
    title: "Cảm ơn & Xin lỗi",
    vietnameseTitle: "Bài 2: Nói lời cảm ơn, xin lỗi và ứng đáp lịch thiệp",
    description: "Nắm vững cách cảm ơn (谢谢), đáp lại (不客气), xin lỗi (对不起) và bỏ qua (没关系).",
    estimatedMinutes: 15,
    vocabularyIds: ["v_hsk1_05", "v_hsk1_06", "v_hsk1_07", "v_hsk1_08", "v_hsk1_09", "v_hsk1_10"],
    grammarPoints: [
      {
        id: "gp_hsk1_2_1",
        title: "Đáp lại lời cảm ơn: 不客气 (bú kèqi)",
        structure: "谢谢 -> 不客气 / 不用谢",
        explanation: "Khi người khác cảm ơn, ta đáp 不客气 (đừng khách sáo) hoặc 不谢 / 不用谢 (không cần cảm ơn).",
        examples: [
          { hanzi: "谢谢你！ - 不客气。", pinyin: "Xièxie nǐ! - Bú kèqi.", vietnamese: "Cảm ơn bạn! - Không có chi." }
        ]
      },
      {
        id: "gp_hsk1_2_2",
        title: "Nói lời xin lỗi và đáp lại: 对不起 - 没关系",
        structure: "对不起 -> 没关系",
        explanation: "Khi làm phiền ai đó nói 对不起 (xin lỗi), người nghe đáp lại 没关系 (không sao đâu).",
        examples: [
          { hanzi: "对不起！ - 没关系。", pinyin: "Duìbuqǐ! - Méi guānxi.", vietnamese: "Xin lỗi bạn! - Không sao đâu." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "大卫 (David)",
        role: "Học sinh quốc tế",
        hanzi: "张老师，谢谢您！",
        pinyin: "Zhāng lǎoshī, xièxie nín!",
        vietnamese: "Thầy Trương, cảm ơn thầy ạ!"
      },
      {
        speaker: "张老师 (Thầy Trương)",
        role: "Giáo viên",
        hanzi: "不客气。路上小心！",
        pinyin: "Bú kèqi. Lùshang xiǎoxīn!",
        vietnamese: "Không có chi. Đi đường cẩn thận nhé!"
      },
      {
        speaker: "大卫 (David)",
        role: "Học sinh quốc tế",
        hanzi: "对不起，我来晚了。",
        pinyin: "Duìbuqǐ, wǒ lái wǎn le.",
        vietnamese: "Xin lỗi thầy, em đến muộn rồi."
      },
      {
        speaker: "张老师 (Thầy Trương)",
        role: "Giáo viên",
        hanzi: "没关系，请进！",
        pinyin: "Méi guānxi, qǐng jìn!",
        vietnamese: "Không sao, mời em vào!"
      }
    ],
    readingPassage: {
      title: "礼貌用语 (Lời nói lịch thiệp)",
      contentHanzi: "在学校，学生对老师说：'老师好，谢谢您！' 老师回答：'不客气。' 做错事要说：'对不起！' 别人会说：'没关系。'",
      contentPinyin: "Zài xuéxiào, xuésheng duì lǎoshī shuō: 'Lǎoshī hǎo, xièxie nín!' Lǎoshī huídá: 'Bú kèqi.' Zuò cuò shì yào shuō: 'Duìbuqǐ!' Biérén huì shuō: 'Méi guānxi.'",
      contentVietnamese: "Ở trường học, học sinh nói với giáo viên: 'Em chào thầy, cảm ơn thầy!' Thầy giáo đáp: 'Không có chi.' Khi làm sai điều gì phải nói: 'Xin lỗi!', người khác sẽ nói: 'Không sao đâu.'"
    },
    quizQuestions: [
      {
        id: "q_hsk1_l2_1",
        type: "multiple_choice",
        question: "Khi bạn vô tình làm rơi sách của bạn mình, bạn nên nói câu gì trước tiên?",
        options: ["对不起 (Duìbuqǐ)", "谢谢 (Xièxie)", "没关系 (Méi guānxi)", "再见 (Zàijiàn)"],
        correctAnswer: "对不起 (Duìbuqǐ)",
        explanation: "对不起 nghĩa là xin lỗi."
      }
    ]
  },
  {
    id: "hsk1_l3",
    hskLevel: "HSK1",
    lessonNumber: 3,
    title: "Hỏi tên & Quốc tịch",
    vietnameseTitle: "Bài 3: Hỏi tên, giới thiệu bản thân và hỏi quốc tịch",
    description: "Học cách hỏi tên với đại từ nghi vấn 什么, động từ 叫, câu chữ 是 và cách nói quốc tịch.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk1_11", "v_hsk1_12", "v_hsk1_13", "v_hsk1_14", "v_hsk1_15", "v_hsk1_16"],
    grammarPoints: [
      {
        id: "gp_hsk1_3_1",
        title: "Đại từ nghi vấn: 什么 (shénme) - Cái gì / Tên gì",
        structure: "Chủ ngữ + 叫 / 是 + 什么 (+ Danh từ)?",
        explanation: "什么 đặt ở vị trí tân ngữ hoặc làm định ngữ để hỏi thông tin.",
        examples: [
          { hanzi: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", vietnamese: "Bạn tên là gì?" },
          { hanzi: "这是什么？", pinyin: "Zhè shì shénme?", vietnamese: "Đây là cái gì?" }
        ]
      },
      {
        id: "gp_hsk1_3_2",
        title: "Câu chữ 是 (shì) - Câu phán đoán khẳng định & phủ định",
        structure: "A + 是 / 不是 + B",
        explanation: "是 tương đương với 'là', phủ định thêm 不 đứng trước thành 不是.",
        examples: [
          { hanzi: "我是越南人。", pinyin: "Wǒ shì Yuènán rén.", vietnamese: "Tôi là người Việt Nam." },
          { hanzi: "他不是中国人。", pinyin: "Tā bú shì Zhōngguó rén.", vietnamese: "Anh ấy không phải người Trung Quốc." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李军 (Lý Quân)",
        role: "Nhân viên",
        hanzi: "请问，你叫什么名字？",
        pinyin: "Qǐngwèn, nǐ jiào shénme míngzi?",
        vietnamese: "Xin hỏi, bạn tên là gì?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Nhân viên Việt Nam",
        hanzi: "我叫阮明。我是越南人。你是哪国人？",
        pinyin: "Wǒ jiào Ruǎn Míng. Wǒ shì Yuènán rén. Nǐ shì nǎ guó rén?",
        vietnamese: "Tôi tên là Nguyễn Minh. Tôi là người Việt Nam. Bạn là người nước nào?"
      },
      {
        speaker: "李军 (Lý Quân)",
        role: "Nhân viên",
        hanzi: "我是中国人。认识你很高兴！",
        pinyin: "Wǒ shì Zhōngguó rén. Rènshi nǐ hěn gāoxìng!",
        vietnamese: "Tôi là người Trung Quốc. Rất vui được quen biết bạn!"
      }
    ],
    readingPassage: {
      title: "我的朋友 (Bạn của tôi)",
      contentHanzi: "我叫王方，我是中国人。他叫阮明，他是越南人。我们都是好朋友。",
      contentPinyin: "Wǒ jiào Wáng Fāng, wǒ shì Zhōngguó rén. Tā jiào Ruǎn Míng, tā shì Yuènán rén. Wǒmen dōu shì hǎo péngyou.",
      contentVietnamese: "Tôi tên là Vương Phương, tôi là người Trung Quốc. Anh ấy tên là Nguyễn Minh, anh ấy là người Việt Nam. Chúng tôi đều là bạn tốt."
    },
    quizQuestions: [
      {
        id: "q_hsk1_l3_1",
        type: "multiple_choice",
        question: "Chọn câu hỏi đúng nghĩa: 'Bạn là người nước nào?'",
        options: ["你是哪国人？(Nǐ shì nǎ guó rén?)", "你叫什么名字？(Nǐ jiào shénme míngzi?)", "你是谁？(Nǐ shì shéi?)", "你在哪儿？(Nǐ zài nǎr?)"],
        correctAnswer: "你是哪国人？(Nǐ shì nǎ guó rén?)",
        explanation: "哪国人 (nǎ guó rén) dùng để hỏi quốc tịch của một người."
      }
    ]
  },
  {
    id: "hsk1_l4",
    hskLevel: "HSK1",
    lessonNumber: 4,
    title: "Trợ từ 的 & Đại từ 谁",
    vietnameseTitle: "Bài 4: Giới thiệu người khác, mối quan hệ và trợ từ sở hữu 的",
    description: "Học cách dùng trợ từ 的 biểu thị sở hữu, đại từ nghi vấn 谁 (ai) và giới thiệu nghề nghiệp, thầy cô bạn bè.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk1_17", "v_hsk1_18", "v_hsk1_19", "v_hsk1_20", "v_hsk1_21"],
    grammarPoints: [
      {
        id: "gp_hsk1_4_1",
        title: "Trợ từ kết cấu 的 (de) biểu thị quan hệ sở hữu",
        structure: "Chủ sở hữu / Định ngữ + 的 + Trung tâm ngữ",
        explanation: "Tương đương từ 'của' trong tiếng Việt. Khi biểu thị quan hệ gia đình, thân thiết có thể lược bỏ 的.",
        examples: [
          { hanzi: "我的书", pinyin: "wǒ de shū", vietnamese: "sách của tôi" },
          { hanzi: "她是我的汉语老师。", pinyin: "Tā shì wǒ de Hànyǔ lǎoshī.", vietnamese: "Cô ấy là giáo viên tiếng Trung của tôi." }
        ]
      },
      {
        id: "gp_hsk1_4_2",
        title: "Đại từ nghi vấn 谁 (shéi / shuí) - Ai?",
        structure: "谁 + 是 + ...? Hoặc ... + 是 + 谁?",
        explanation: "Dùng để hỏi về danh tính, thân phận của một người.",
        examples: [
          { hanzi: "他是谁？", pinyin: "Tā shì shéi?", vietnamese: "Anh ấy là ai?" },
          { hanzi: "谁是李老师？", pinyin: "Shéi shì Lǐ lǎoshī?", vietnamese: "Ai là thầy Lý?" }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "大卫 (David)",
        role: "Học sinh",
        hanzi: "王明，那位女士是谁？",
        pinyin: "Wáng Míng, nà wèi nǚshì shì shéi?",
        vietnamese: "Vương Minh, quý cô kia là ai vậy?"
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn học",
        hanzi: "她是我的汉语老师，她叫张月。",
        pinyin: "Tā shì wǒ de Hànyǔ lǎoshī, tā jiào Zhāng Yuè.",
        vietnamese: "Cô ấy là giáo viên tiếng Trung của tôi, cô ấy tên là Trương Nguyệt."
      },
      {
        speaker: "大卫 (David)",
        role: "Học sinh",
        hanzi: "张老师也是中国人吗？",
        pinyin: "Zhāng lǎoshī yě shì Zhōngguó rén ma?",
        vietnamese: "Cô Trương cũng là người Trung Quốc phải không?"
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn học",
        hanzi: "是的，她教我们汉语。",
        pinyin: "Shì de, tā jiāo wǒmen Hànyǔ.",
        vietnamese: "Đúng vậy, cô ấy dạy chúng tôi tiếng Trung."
      }
    ],
    readingPassage: {
      title: "我的汉语老师 (Giáo viên tiếng Trung của tôi)",
      contentHanzi: "她是张老师。她是我的汉语老师。张老师很好，我们都很喜欢她。",
      contentPinyin: "Tā shì Zhāng lǎoshī. Tā shì wǒ de Hànyǔ lǎoshī. Zhāng lǎoshī hěn hǎo, wǒmen dōu hěn xǐhuan tā.",
      contentVietnamese: "Cô ấy là cô Trương. Cô ấy là giáo viên tiếng Trung của tôi. Cô Trương rất tốt, chúng tôi đều rất quý cô ấy."
    },
    quizQuestions: [
      {
        id: "q_hsk1_l4_1",
        type: "multiple_choice",
        question: "Dịch sang tiếng Trung: 'Sách của bạn tôi'?",
        options: ["我朋友的书 (Wǒ péngyou de shū)", "我的朋友书 (Wǒ de péngyou shū)", "书我朋友 (Shū wǒ péngyou)", "朋友我书 (Péngyou wǒ shū)"],
        correctAnswer: "我朋友的书 (Wǒ péngyou de shū)",
        explanation: "Cấu trúc định ngữ + 的 + trung tâm ngữ: 我朋友 (bạn tôi) + 的 + 书 (sách)."
      }
    ]
  },
  {
    id: "hsk1_l5",
    hskLevel: "HSK1",
    lessonNumber: 5,
    title: "Tuổi tác & Gia đình",
    vietnameseTitle: "Bài 5: Hỏi tuổi, số thành viên gia đình và số đếm 1-100",
    description: "Học số đếm tiếng Trung, cách hỏi tuổi (几岁 / 多大), lượng từ 口 và 个 để nói về các thành viên trong gia đình.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk1_22", "v_hsk1_23", "v_hsk1_24", "v_hsk1_25", "v_hsk1_26"],
    grammarPoints: [
      {
        id: "gp_hsk1_5_1",
        title: "Hỏi tuổi: 几岁 (jǐ suì) vs 多大 (duō dà)",
        structure: "Trẻ em (<10 tuổi): 你几岁？ | Người lớn: 你多大 / 您多大年纪？",
        explanation: "几 dùng cho số lượng nhỏ hơn 10. Với người lớn dùng 多大, người cao tuổi dùng 您多大年纪.",
        examples: [
          { hanzi: "你女儿几岁了？ - 她今年四岁。", pinyin: "Nǐ nǚ'ér jǐ suì le? - Tā jīnnián sì suì.", vietnamese: "Con gái bạn mấy tuổi rồi? - Cháu năm nay 4 tuổi." },
          { hanzi: "李老师多大？ - 她今年三十岁。", pinyin: "Lǐ lǎoshī duō dà? - Tā jīnnián sānshí suì.", vietnamese: "Cô Lý bao nhiêu tuổi? - Cô năm nay 30 tuổi." }
        ]
      },
      {
        id: "gp_hsk1_5_2",
        title: "Hỏi số thành viên gia đình: 有几口人 (yǒu jǐ kǒu rén)",
        structure: "我家 / 你家 + 有 + (Số) + 口人",
        explanation: "口 là lượng từ đặc trưng dành riêng để đếm nhân khẩu trong gia đình.",
        examples: [
          { hanzi: "你家有几口人？ - 我家有四口人。", pinyin: "Nǐ jiā yǒu jǐ kǒu rén? - Wǒ jiā yǒu sì kǒu rén.", vietnamese: "Nhà bạn có mấy người? - Nhà tôi có 4 người." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn học",
        hanzi: "李老师，你家有几口人？",
        pinyin: "Lǐ lǎoshī, nǐ jiā yǒu jǐ kǒu rén?",
        vietnamese: "Cô Lý, nhà cô có mấy người ạ?"
      },
      {
        speaker: "李老师 (Cô Lý)",
        role: "Giáo viên",
        hanzi: "我家有三口人：我丈夫、我女儿和我。",
        pinyin: "Wǒ jiā yǒu sān kǒu rén: wǒ zhàngfu, wǒ nǚ'ér hé wǒ.",
        vietnamese: "Nhà cô có 3 người: chồng cô, con gái cô và cô."
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn học",
        hanzi: "你女儿今年多大了？",
        pinyin: "Nǐ nǚ'ér jīnnián duō dà le?",
        vietnamese: "Con gái cô năm nay bao nhiêu tuổi rồi ạ?"
      },
      {
        speaker: "李老师 (Cô Lý)",
        role: "Giáo viên",
        hanzi: "她今年二十岁，是大二学生。",
        pinyin: "Tā jīnnián èrshí suì, shì dà'èr xuésheng.",
        vietnamese: "Cháu năm nay 20 tuổi, là sinh viên năm hai."
      }
    ],
    readingPassage: {
      title: "我家 (Gia đình tôi)",
      contentHanzi: "我家有四口人：爸爸、妈妈、哥哥和我。我爸爸五十岁，我哥哥二十四岁，我今年十八岁。",
      contentPinyin: "Wǒ jiā yǒu sì kǒu rén: bàba, māma, gēge hé wǒ. Wǒ bàba wǔshí suì, wǒ gēge èrshísì suì, wǒ jīnnián shíbā suì.",
      contentVietnamese: "Nhà tôi có 4 người: bố, mẹ, anh trai và tôi. Bố tôi 50 tuổi, anh trai tôi 24 tuổi, tôi năm nay 18 tuổi."
    },
    quizQuestions: [
      {
        id: "q_hsk1_l5_1",
        type: "multiple_choice",
        question: "Lượng từ nào chuyên dùng khi đếm số thành viên trong gia đình?",
        options: ["口 (kǒu)", "个 (gè)", "本 (běn)", "只 (zhī)"],
        correctAnswer: "口 (kǒu)",
        explanation: "口 là lượng từ dùng để đếm số người trong gia đình (ví dụ: 三口人)."
      }
    ]
  },
  {
    id: "hsk1_l6",
    hskLevel: "HSK1",
    lessonNumber: 6,
    title: "Năng lực & Động từ 会",
    vietnameseTitle: "Bài 6: Diễn đạt kỹ năng, biết làm gì với động từ năng nguyện 会",
    description: "Học cách dùng động từ năng nguyện 会 (biết qua học tập), câu hỏi với 怎么 (làm thế nào) và chữ Hán, món ăn Trung Quốc.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk1_27", "v_hsk1_28", "v_hsk1_29", "v_hsk1_30", "v_hsk1_31"],
    grammarPoints: [
      {
        id: "gp_hsk1_6_1",
        title: "Động từ năng nguyện: 会 (huì) - Biết (do học tập rèn luyện)",
        structure: "Chủ ngữ + 会 / 不会 + Động từ + Tân ngữ",
        explanation: "会 biểu thị một kỹ năng hoặc năng lực đạt được qua việc học hỏi (như nói ngoại ngữ, nấu ăn, lái xe).",
        examples: [
          { hanzi: "我会说汉语。", pinyin: "Wǒ huì shuō Hànyǔ.", vietnamese: "Tôi biết nói tiếng Trung." },
          { hanzi: "你妈妈会做中国菜吗？", pinyin: "Nǐ māma huì zuò Zhōngguó cài ma?", vietnamese: "Mẹ bạn có biết nấu món Trung Quốc không?" }
        ]
      },
      {
        id: "gp_hsk1_6_2",
        title: "Đại từ nghi vấn 怎么 (zěnme) + Động từ - Làm như thế nào?",
        structure: "怎么 + Động từ?",
        explanation: "Dùng để hỏi về cách thức tiến hành một hành động (như cách viết, cách đọc, cách đi).",
        examples: [
          { hanzi: "这个汉字怎么写？", pinyin: "Zhège hànzì zěnme xiě?", vietnamese: "Chữ Hán này viết như thế nào?" },
          { hanzi: "这个字怎么读？", pinyin: "Zhège zì zěnme dú?", vietnamese: "Chữ này đọc như thế nào?" }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "大卫 (David)",
        role: "Học sinh",
        hanzi: "你会说汉语吗？",
        pinyin: "Nǐ huì shuō Hànyǔ ma?",
        vietnamese: "Bạn biết nói tiếng Trung không?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn học",
        hanzi: "我会说一点儿。你呢？",
        pinyin: "Wǒ huì shuō yìdiǎnr. Nǐ ne?",
        vietnamese: "Tôi biết nói một chút. Còn bạn?"
      },
      {
        speaker: "大卫 (David)",
        role: "Học sinh",
        hanzi: "我也会说。你会写汉字吗？",
        pinyin: "Wǒ yě huì shuō. Nǐ huì xiě hànzì ma?",
        vietnamese: "Tôi cũng biết nói. Bạn có biết viết chữ Hán không?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn học",
        hanzi: "我会写常用汉字。这个字怎么读？",
        pinyin: "Wǒ huì xiě chángyòng hànzì. Zhège zì zěnme dú?",
        vietnamese: "Tôi biết viết chữ Hán thông dụng. Chữ này đọc như thế nào vậy?"
      }
    ],
    readingPassage: {
      title: "学汉语 (Học tiếng Trung)",
      contentHanzi: "中国菜很好吃，但我不会做。中国字很有意思，但我不会写。现在我每天学汉语，我会说一点儿了。",
      contentPinyin: "Zhōngguó cài hěn hǎochī, dàn wǒ bú huì zuò. Zhōngguó zì hěn yǒu yìsi, dàn wǒ bú huì xiě. Xiànzài wǒ měitiān xué Hànyǔ, wǒ huì shuō yìdiǎnr le.",
      contentVietnamese: "Món ăn Trung Quốc rất ngon, nhưng tôi không biết nấu. Chữ Hán rất thú vị, nhưng tôi chưa biết viết. Hiện tại mỗi ngày tôi đều học tiếng Trung, tôi đã biết nói một chút rồi."
    },
    quizQuestions: [
      {
        id: "q_hsk1_l6_1",
        type: "multiple_choice",
        question: "Muốn hỏi 'Chữ Hán này viết như thế nào?', câu nào là chuẩn xác?",
        options: ["这个汉字怎么写？(Zhège hànzì zěnme xiě?)", "这个汉字什么写？(Zhège hànzì shénme xiě?)", "这个汉字哪儿写？(Zhège hànzì nǎr xiě?)", "这个汉字谁写？(Zhège hànzì shéi xiě?)"],
        correctAnswer: "这个汉字怎么写？(Zhège hànzì zěnme xiě?)",
        explanation: "怎么 + Động từ dùng để hỏi cách thức thực hiện hành động."
      }
    ]
  },
  {
    id: "hsk1_l7",
    hskLevel: "HSK1",
    lessonNumber: 7,
    title: "Ngày tháng & Thời gian biểu",
    vietnameseTitle: "Bài 7: Hỏi ngày tháng năm, các ngày trong tuần và sinh nhật",
    description: "Học cách nói ngày (号/日), tháng (月), năm (年), thứ trong tuần (星期一 đến 星期天) theo quy tắc từ lớn đến nhỏ.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk1_32", "v_hsk1_33", "v_hsk1_34", "v_hsk1_35", "v_hsk1_36"],
    grammarPoints: [
      {
        id: "gp_hsk1_7_1",
        title: "Quy tắc diễn đạt thời gian trong tiếng Trung: Lớn trước, nhỏ sau",
        structure: "Năm (年) + Tháng (月) + Ngày (日/号) + Thứ (星期)",
        explanation: "Ngược lại với tiếng Việt, tiếng Trung luôn đi từ đơn vị thời gian lớn nhất đến nhỏ nhất.",
        examples: [
          { hanzi: "2026年8月30号星期日", pinyin: "èr líng èr liù nián bā yuè sānshí hào xīngqīrì", vietnamese: "Chủ nhật, ngày 30 tháng 8 năm 2026" },
          { hanzi: "今天几月几号？ - 今天8月30号。", pinyin: "Jīntiān jǐ yuè jǐ hào? - Jīntiān bā yuè sānshí hào.", vietnamese: "Hôm nay ngày mấy tháng mấy? - Hôm nay ngày 30 tháng 8." }
        ]
      },
      {
        id: "gp_hsk1_7_2",
        title: "Các ngày trong tuần: 星期 (xīngqī) + Số",
        structure: "星期一 (Thứ 2) -> 星期六 (Thứ 7), Chủ nhật: 星期天 / 星期日",
        explanation: "Thứ 2 trong tiếng Trung ứng với 星期一 (thứ nhất), Chủ nhật dùng 天 hoặc 日.",
        examples: [
          { hanzi: "明天是星期几？ - 明天是星期一。", pinyin: "Míngtiān shì xīngqī jǐ? - Míngtiān shì xīngqīyī.", vietnamese: "Ngày mai là thứ mấy? - Ngày mai là thứ Hai." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Nhân viên",
        hanzi: "请问，今天几月几号？",
        pinyin: "Qǐngwèn, jīntiān jǐ yuè jǐ hào?",
        vietnamese: "Xin hỏi, hôm nay ngày mấy tháng mấy?"
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Đồng nghiệp",
        hanzi: "今天9月1号，星期一。",
        pinyin: "Jīntiān jiǔ yuè yī hào, xīngqīyī.",
        vietnamese: "Hôm nay ngày 1 tháng 9, thứ Hai."
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Nhân viên",
        hanzi: "明天是你的生日吗？",
        pinyin: "Míngtiān shì nǐ de shēngrì ma?",
        vietnamese: "Ngày mai là sinh nhật của bạn phải không?"
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Đồng nghiệp",
        hanzi: "是的，明天晚上我们一起吃饭吧！",
        pinyin: "Shì de, míngtiān wǎnshang wǒmen yìqǐ chīfàn ba!",
        vietnamese: "Đúng vậy, tối mai chúng ta cùng nhau đi ăn nhé!"
      }
    ],
    readingPassage: {
      title: "我的日程 (Lịch trình của tôi)",
      contentHanzi: "昨天是8月31号，星期日。今天是9月1号，星期一，我去学校上课。明天是星期二，下午我有汉语考试。",
      contentPinyin: "Zuótiān shì bā yuè sānshíyī hào, xīngqīrì. Jīntiān shì jiǔ yuè yī hào, xīngqīyī, wǒ qù xuéxiào shàngkè. Míngtiān shì xīngqī'èr, xiàwǔ wǒ yǒu Hànyǔ kǎoshì.",
      contentVietnamese: "Hôm qua là ngày 31 tháng 8, Chủ nhật. Hôm nay là ngày 1 tháng 9, thứ Hai, tôi đến trường đi học. Ngày mai là thứ Ba, buổi chiều tôi có bài thi tiếng Trung."
    },
    quizQuestions: [
      {
        id: "q_hsk1_l7_1",
        type: "multiple_choice",
        question: "Thứ Tư trong tiếng Trung nói như thế nào?",
        options: ["星期三 (Xīngqīsān)", "星期四 (Xīngqīsì)", "星期二 (Xīngqī'èr)", "星期五 (Xīngqīwǔ)"],
        correctAnswer: "星期三 (Xīngqīsān)",
        explanation: "Thứ 2 là 星期一, Thứ 3 là 星期二, Thứ 4 là 星期三."
      }
    ]
  },
  {
    id: "hsk1_l8",
    hskLevel: "HSK1",
    lessonNumber: 8,
    title: "Nhu cầu, Mua sắm & Hỏi giá",
    vietnameseTitle: "Bài 8: Diễn tả mong muốn với 想, mua đồ và hỏi giá tiền",
    description: "Học động từ năng nguyện 想 (muốn), hỏi giá tiền với 多少钱, đơn vị tiền tệ 块/元 và lượng từ 杯, 个.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk1_37", "v_hsk1_38", "v_hsk1_39", "v_hsk1_40", "v_hsk1_41"],
    grammarPoints: [
      {
        id: "gp_hsk1_8_1",
        title: "Động từ năng nguyện: 想 (xiǎng) - Muốn / Dự định",
        structure: "Chủ ngữ + 想 + Động từ + Tân ngữ",
        explanation: "Biểu thị nguyện vọng, ý định hoặc mong muốn làm một điều gì đó.",
        examples: [
          { hanzi: "我想喝茶。", pinyin: "Wǒ xiǎng hē chá.", vietnamese: "Tôi muốn uống trà." },
          { hanzi: "你想吃什么？", pinyin: "Nǐ xiǎng chī shénme?", vietnamese: "Bạn muốn ăn cái gì?" }
        ]
      },
      {
        id: "gp_hsk1_8_2",
        title: "Hỏi giá tiền: 多少钱 (duōshao qián)",
        structure: "Đồ vật / Lượng từ + 多少钱？",
        explanation: "Dùng để hỏi giá cả hàng hóa, trả lời kèm đơn vị tiền tệ 块 (kuài) hoặc 元 (yuán).",
        examples: [
          { hanzi: "这个杯子多少钱？ - 十五块。", pinyin: "Zhège bēizi duōshao qián? - Shíwǔ kuài.", vietnamese: "Chiếc cốc này bao nhiêu tiền? - 15 tệ." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "顾客 (Khách hàng)",
        role: "Khách",
        hanzi: "服务员，我想喝茶。你们有什么茶？",
        pinyin: "Fúwùyuán, wǒ xiǎng hē chá. Nǐmen yǒu shénme chá?",
        vietnamese: "Phục vụ ơi, tôi muốn uống trà. Chỗ bạn có loại trà nào?"
      },
      {
        speaker: "服务员 (Phục vụ)",
        role: "Nhân viên",
        hanzi: "我们有绿茶和红茶。你想喝哪种？",
        pinyin: "Wǒmen yǒu lǜchá hé hóngchá. Nǐ xiǎng hē nǎ zhǒng?",
        vietnamese: "Chúng tôi có trà xanh và hồng trà. Bạn muốn uống loại nào?"
      },
      {
        speaker: "顾客 (Khách hàng)",
        role: "Khách",
        hanzi: "我要一杯绿茶。请问多少钱一杯？",
        pinyin: "Wǒ yào yì bēi lǜchá. Qǐngwèn duōshao qián yì bēi?",
        vietnamese: "Cho tôi một ly trà xanh. Cho hỏi bao nhiêu tiền một ly?"
      },
      {
        speaker: "服务员 (Phục vụ)",
        role: "Nhân viên",
        hanzi: "一杯十二块钱。",
        pinyin: "Yì bēi shí'èr kuài qián.",
        vietnamese: "Một ly 12 tệ."
      }
    ],
    readingPassage: {
      title: "在茶馆 (Ở quán trà)",
      contentHanzi: "下午我和朋友去茶馆。我想喝绿茶，他想喝咖啡。绿茶十二块一杯，咖啡十八块一杯。我们一共花了三十块。",
      contentPinyin: "Xiàwǔ wǒ hé péngyou qù cháguǎn. Wǒ xiǎng hē lǜchá, tā xiǎng hē kāfēi. Lǜchá shí'èr kuài yì bēi, kāfēi shíbā kuài yì bēi. Wǒmen yígòng huā le sānshí kuài.",
      contentVietnamese: "Buổi chiều tôi cùng bạn đến quán trà. Tôi muốn uống trà xanh, anh ấy muốn uống cà phê. Trà xanh 12 tệ một ly, cà phê 18 tệ một ly. Chúng tôi tiêu hết tổng cộng 30 tệ."
    },
    quizQuestions: [
      {
        id: "q_hsk1_l8_1",
        type: "multiple_choice",
        question: "Muốn hỏi 'Chiếc áo này bao nhiêu tiền?', ta nói câu nào?",
        options: ["这件衣服多少钱？(Zhè jiàn yīfu duōshao qián?)", "这件衣服什么钱？(Zhè jiàn yīfu shénme qián?)", "这件衣服几钱？(Zhè jiàn yīfu jǐ qián?)", "这件衣服哪儿钱？(Zhè jiàn yīfu nǎr qián?)"],
        correctAnswer: "这件衣服多少钱？(Zhè jiàn yīfu duōshao qián?)",
        explanation: "多少钱 (duōshao qián) là mẫu câu chuẩn để hỏi giá tiền."
      }
    ]
  },
  {
    id: "hsk1_l9",
    hskLevel: "HSK1",
    lessonNumber: 9,
    title: "Vị trí & Giới từ 在",
    vietnameseTitle: "Bài 9: Giới từ 在 chỉ nơi chốn và hỏi vị trí với 哪儿",
    description: "Học cách dùng giới từ 在 chỉ nơi chốn, đại từ nghi vấn 哪儿 (ở đâu) và các từ vựng chỉ địa điểm (bệnh viện, trường học, công ty).",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk1_42", "v_hsk1_43", "v_hsk1_44", "v_hsk1_45", "v_hsk1_46"],
    grammarPoints: [
      {
        id: "gp_hsk1_9_1",
        title: "Giới từ 在 (zài) chỉ địa điểm diễn ra hành động",
        structure: "Chủ ngữ + 在 + Địa điểm + Động từ",
        explanation: "Khác tiếng Việt (Làm gì ở đâu), tiếng Trung đặt trạng ngữ chỉ nơi chốn 在 + Nơi chốn TRƯỚC động từ chính.",
        examples: [
          { hanzi: "我在医院工作。", pinyin: "Wǒ zài yīyuàn gōngzuò.", vietnamese: "Tôi làm việc ở bệnh viện." },
          { hanzi: "他在学校看书。", pinyin: "Tā zài xuéxiào kàn shū.", vietnamese: "Anh ấy đọc sách ở trường." }
        ]
      },
      {
        id: "gp_hsk1_9_2",
        title: "Đại từ nghi vấn: 哪儿 / 哪里 (nǎr / nǎlǐ) - Ở đâu?",
        structure: "Chủ ngữ + 在 + 哪儿 + (Động từ)?",
        explanation: "Dùng để hỏi vị trí của người, vật hoặc nơi diễn ra sự việc.",
        examples: [
          { hanzi: "你儿子在哪儿工作？", pinyin: "Nǐ érzi zài nǎr gōngzuò?", vietnamese: "Con trai bạn làm việc ở đâu?" },
          { hanzi: "洗手间在哪儿？", pinyin: "Xǐshǒujiān zài nǎr?", vietnamese: "Nhà vệ sinh ở đâu?" }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn bè",
        hanzi: "张叔叔，你儿子在哪儿工作？",
        pinyin: "Zhāng shūshu, nǐ érzi zài nǎr gōngzuò?",
        vietnamese: "Bác Trương, con trai bác làm việc ở đâu thế ạ?"
      },
      {
        speaker: "张叔叔 (Bác Trương)",
        role: "Người lớn",
        hanzi: "他在市医院工作，他是医生。",
        pinyin: "Tā zài shì yīyuàn gōngzuò, tā shì yīshēng.",
        vietnamese: "Nó làm việc ở bệnh viện thành phố, nó là bác sĩ."
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn bè",
        hanzi: "你女儿呢？她也在医院工作吗？",
        pinyin: "Nǐ nǚ'ér ne? Tā yě zài yīyuàn gōngzuò ma?",
        vietnamese: "Còn con gái bác thì sao ạ? Chị ấy cũng làm việc ở bệnh viện ạ?"
      },
      {
        speaker: "张叔叔 (Bác Trương)",
        role: "Người lớn",
        hanzi: "不在，她在学校教书，她是老师。",
        pinyin: "Bú zài, tā zài xuéxiào jiāoshū, tā shì lǎoshī.",
        vietnamese: "Không, nó dạy học ở trường, nó là giáo viên."
      }
    ],
    readingPassage: {
      title: "一家人的工作 (Công việc của một gia đình)",
      contentHanzi: "我爸爸在工厂工作，他是工程师。我妈妈在学校工作，她是老师。我在大学学习汉语。",
      contentPinyin: "Wǒ bàba zài gōngchǎng gōngzuò, tā shì gōngchéngshī. Wǒ māma zài xuéxiào gōngzuò, tā shì lǎoshī. Wǒ zài dàxué xuéxí Hànyǔ.",
      contentVietnamese: "Bố tôi làm việc ở nhà máy, ông là kỹ sư. Mẹ tôi làm việc ở trường học, bà là giáo viên. Tôi học tiếng Trung ở trường đại học."
    },
    quizQuestions: [
      {
        id: "q_hsk1_l9_1",
        type: "multiple_choice",
        question: "Trật tự câu nào đúng chuẩn ngữ pháp tiếng Trung: 'Tôi học tiếng Trung ở trường'?",
        options: ["我在学校学汉语 (Wǒ zài xuéxiào xué Hànyǔ)", "我学汉语在学校 (Wǒ xué Hànyǔ zài xuéxiào)", "在学校我学汉语 (Zài xuéxiào wǒ xué Hànyǔ)", "学校我在学汉语 (Xuéxiào wǒ zài xué Hànyǔ)"],
        correctAnswer: "我在学校学汉语 (Wǒ zài xuéxiào xué Hànyǔ)",
        explanation: "Cấu trúc chuẩn: Chủ ngữ + 在 + Nơi chốn + Động từ + Tân ngữ."
      }
    ]
  },
  {
    id: "hsk1_l10",
    hskLevel: "HSK1",
    lessonNumber: 10,
    title: "Năng nguyện 能 & Phương vị từ",
    vietnameseTitle: "Bài 10: Động từ năng nguyện 能 (xin phép) và phương vị từ 上, 下, 里",
    description: "Học cách xin phép lịch sự với 能 (có thể), các từ chỉ vị trí không gian (trên, dưới, trong, bàn, ghế).",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk1_47", "v_hsk1_48", "v_hsk1_49", "v_hsk1_50", "v_hsk1_51"],
    grammarPoints: [
      {
        id: "gp_hsk1_10_1",
        title: "Động từ năng nguyện: 能 (néng) - Có thể (xin phép hoặc điều kiện cho phép)",
        structure: "能 / 不能 + Động từ?",
        explanation: "Dùng để hỏi xem hoàn cảnh hoặc quy định có cho phép làm một việc gì đó hay không.",
        examples: [
          { hanzi: "我能坐这儿吗？ - 请坐。", pinyin: "Wǒ néng zuò zhèr ma? - Qǐng zuò.", vietnamese: "Tôi có thể ngồi đây được không? - Mời bạn ngồi." },
          { hanzi: "这儿不能抽烟。", pinyin: "Zhèr bù néng chōuyān.", vietnamese: "Ở đây không được hút thuốc." }
        ]
      },
      {
        id: "gp_hsk1_10_2",
        title: "Phương vị từ: 上 (trên), 下 (dưới), 里 (trong)",
        structure: "Danh từ + 上 / 下 / 里",
        explanation: "Đặt phương vị từ sau danh từ để tạo thành cụm từ chỉ vị trí cụ thể.",
        examples: [
          { hanzi: "桌子上有一本书。", pinyin: "Zhuōzi shang yǒu yì běn shū.", vietnamese: "Trên bàn có một cuốn sách." },
          { hanzi: "椅子下有一只猫。", pinyin: "Yǐzi xià yǒu yì zhī māo.", vietnamese: "Dưới ghế có một con mèo." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "大卫 (David)",
        role: "Học sinh",
        hanzi: "请问，这儿有人吗？我能坐这儿吗？",
        pinyin: "Qǐngwèn, zhèr yǒu rén ma? Wǒ néng zuò zhèr ma?",
        vietnamese: "Xin hỏi, ở đây có ai ngồi không ạ? Tôi có thể ngồi đây được không?"
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "没有人，请坐吧！",
        pinyin: "Méiyǒu rén, qǐng zuò ba!",
        vietnamese: "Không có ai đâu, mời bạn ngồi đi!"
      },
      {
        speaker: "大卫 (David)",
        role: "Học sinh",
        hanzi: "谢谢！桌子上的电脑是你的吗？",
        pinyin: "Xièxie! Zhuōzi shang de diànnǎo shì nǐ de ma?",
        vietnamese: "Cảm ơn bạn! Chiếc máy tính trên bàn là của bạn à?"
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "是的，我正在写作业呢。",
        pinyin: "Shì de, wǒ zhèngzài xiě zuòyè ne.",
        vietnamese: "Đúng rồi, mình đang viết bài tập đây."
      }
    ],
    readingPassage: {
      title: "在图书馆 (Ở thư viện)",
      contentHanzi: "图书馆里很安静。桌子上放着很多书，椅子下有一只小狗在睡觉。大家都认真地看书。",
      contentPinyin: "Túshūguǎn li hěn ānjìng. Zhuōzi shang fàng zhe hěn duō shū, yǐzi xià yǒu yì zhī xiǎogǒu zài shuìjiào. Dàjiā dōu rènzhēn de kàn shū.",
      contentVietnamese: "Bên trong thư viện rất yên tĩnh. Trên bàn để rất nhiều sách, dưới ghế có một chú cún nhỏ đang ngủ. Mọi người đều chăm chú đọc sách."
    },
    quizQuestions: [
      {
        id: "q_hsk1_l10_1",
        type: "multiple_choice",
        question: "Dịch câu: 'Trên bàn có hai cốc trà'?",
        options: ["桌子上有两杯茶 (Zhuōzi shang yǒu liǎng bēi chá)", "上桌子有两杯茶 (Shàng zhuōzi yǒu liǎng bēi chá)", "桌子里有两杯茶 (Zhuōzi li yǒu liǎng bēi chá)", "两杯茶在桌子 (Liǎng bēi chá zài zhuōzi)"],
        correctAnswer: "桌子上有两杯茶 (Zhuōzi shang yǒu liǎng bēi chá)",
        explanation: "Danh từ + 上 tạo thành vị trí 'trên bàn'."
      }
    ]
  },
  {
    id: "hsk1_l11",
    hskLevel: "HSK1",
    lessonNumber: 11,
    title: "Thời gian & Giờ phút",
    vietnameseTitle: "Bài 11: Hỏi và nói giờ giấc, các mốc thời gian sáng, trưa, tối",
    description: "Học cách đọc giờ (点), phút (分), nửa tiếng (半) và các mốc trong ngày (早上, 中午, 下午, 晚上).",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk1_52", "v_hsk1_53", "v_hsk1_54", "v_hsk1_55", "v_hsk1_56"],
    grammarPoints: [
      {
        id: "gp_hsk1_11_1",
        title: "Cách nói giờ trong tiếng Trung: 点 (diǎn) & 分 (fēn)",
        structure: "Buổi (Sáng/Chiều) + Số + 点 + Số + 分 / 半 (30 phút)",
        explanation: "Luôn nói buổi trước rồi mới đến số giờ và phút cụ thể.",
        examples: [
          { hanzi: "现在几点？ - 现在早上八点半。", pinyin: "Xiànzài jǐ diǎn? - Xiànzài zǎoshang bā diǎn bàn.", vietnamese: "Bây giờ là mấy giờ? - Bây giờ là 8 giờ rưỡi sáng." },
          { hanzi: "下午两点十五分", pinyin: "xiàwǔ liǎng diǎn shíwǔ fēn", vietnamese: "2 giờ 15 phút chiều" }
        ]
      },
      {
        id: "gp_hsk1_11_2",
        title: "Trạng ngữ chỉ thời gian đứng trước hoặc sau chủ ngữ",
        structure: "Thời gian + Chủ ngữ + Động từ HOẶC Chủ ngữ + Thời gian + Động từ",
        explanation: "Không bao giờ đặt từ chỉ thời gian ở cuối câu như trong tiếng Anh/Việt.",
        examples: [
          { hanzi: "我中午十二点吃午饭。", pinyin: "Wǒ zhōngwǔ shí'èr diǎn chī wǔfàn.", vietnamese: "Tôi ăn trưa lúc 12 giờ trưa." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn học",
        hanzi: "请问，现在几点了？",
        pinyin: "Qǐngwèn, xiànzài jǐ diǎn le?",
        vietnamese: "Xin hỏi, bây giờ là mấy giờ rồi?"
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn học",
        hanzi: "现在是下午三点十分。",
        pinyin: "Xiànzài shì xiàwǔ sān diǎn shí fēn.",
        vietnamese: "Bây giờ là 3 giờ 10 phút chiều."
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn học",
        hanzi: "我们什么时候去打篮球？",
        pinyin: "Wǒmen shénme shíhou qù dǎ lánqiú?",
        vietnamese: "Khi nào chúng ta đi chơi bóng rổ?"
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn học",
        hanzi: "下午四点半，好吗？",
        pinyin: "Xiàwǔ sì diǎn bàn, hǎo ma?",
        vietnamese: "4 giờ rưỡi chiều, được không?"
      }
    ],
    readingPassage: {
      title: "我的一天 (Một ngày của tôi)",
      contentHanzi: "我每天早上七点起床，七点半吃早饭。上午八点去学校上课。中午十二点和同学吃午饭。下午五点回家。",
      contentPinyin: "Wǒ měitiān zǎoshang qī diǎn qǐchuáng, qī diǎn bàn chī zǎofàn. Shàngwǔ bā diǎn qù xuéxiào shàngkè. Zhōngwǔ shí'èr diǎn hé tóngxué chī wǔfàn. Xiàwǔ wǔ diǎn huí jiā.",
      contentVietnamese: "Mỗi ngày tôi thức dậy lúc 7 giờ sáng, ăn sáng lúc 7 giờ rưỡi. 8 giờ sáng đến trường học. 12 giờ trưa cùng bạn học ăn cơm trưa. 5 giờ chiều về nhà."
    },
    quizQuestions: [
      {
        id: "q_hsk1_l11_1",
        type: "multiple_choice",
        question: "'8 giờ 30 phút tối' diễn đạt bằng tiếng Trung là gì?",
        options: ["晚上八点半 (Wǎnshang bā diǎn bàn)", "八点半晚上 (Bā diǎn bàn wǎnshang)", "早上八点半 (Zǎoshang bā diǎn bàn)", "下午八点半 (Xiàwǔ bā diǎn bàn)"],
        correctAnswer: "晚上八点半 (Wǎnshang bā diǎn bàn)",
        explanation: "Buổi tối là 晚上, 8 giờ rưỡi là 八点半."
      }
    ]
  },
  {
    id: "hsk1_l12",
    hskLevel: "HSK1",
    lessonNumber: 12,
    title: "Thời tiết & Mức độ 太……了",
    vietnameseTitle: "Bài 12: Hỏi về thời tiết, nhiệt độ và cấu trúc cảm thán 太……了",
    description: "Học cách hỏi thời tiết với 怎么样 (thế nào), từ vựng nóng (热), lạnh (冷), mưa (下雨) và cấu trúc 太...了 (quá... rồi).",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk1_57", "v_hsk1_58", "v_hsk1_59", "v_hsk1_60", "v_hsk1_61"],
    grammarPoints: [
      {
        id: "gp_hsk1_12_1",
        title: "Đại từ nghi vấn 怎么样 (zěnmeyàng) - Thế nào? Ra sao?",
        structure: "Chủ ngữ + 怎么样？",
        explanation: "Dùng để hỏi về tình hình, trạng thái, tính chất hoặc xin ý kiến đánh giá.",
        examples: [
          { hanzi: "明天天气怎么样？ - 不冷也不热。", pinyin: "Míngtiān tiānqì zěnmeyàng? - Bù lěng yě bú rè.", vietnamese: "Thời tiết ngày mai thế nào? - Không lạnh cũng không nóng." }
        ]
      },
      {
        id: "gp_hsk1_12_2",
        title: "Cấu trúc cảm thán biểu thị mức độ cao: 太……了 (tài... le)",
        structure: "太 + Tính từ + 了",
        explanation: "Biểu thị mức độ cực kỳ cao (quá, lắm), có thể dùng khen ngợi hoặc phàn nàn.",
        examples: [
          { hanzi: "今天太热了！", pinyin: "Jīntiān tài rè le!", vietnamese: "Hôm nay nóng quá rồi!" },
          { hanzi: "太好了！", pinyin: "Tài hǎo le!", vietnamese: "Tốt quá rồi / Tuyệt vời!" }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "大卫 (David)",
        role: "Bạn học",
        hanzi: "北京昨天的天气怎么样？",
        pinyin: "Běijīng zuótiān de tiānqì zěnmeyàng?",
        vietnamese: "Thời tiết Bắc Kinh hôm qua thế nào?"
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "昨天太冷了，还下雨了。",
        pinyin: "Zuótiān tài lěng le, hái xià yǔ le.",
        vietnamese: "Hôm qua lạnh quá, lại còn có mưa nữa."
      },
      {
        speaker: "大卫 (David)",
        role: "Bạn học",
        hanzi: "明天天气好不好？",
        pinyin: "Míngtiān tiānqì hǎo bu hǎo?",
        vietnamese: "Thời tiết ngày mai có tốt không?"
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "明天晴天，不冷不热，非常舒服。",
        pinyin: "Míngtiān qíngtiān, bù lěng bú rè, fēicháng shūfu.",
        vietnamese: "Ngày mai trời nắng ráo, không lạnh không nóng, rất dễ chịu."
      }
    ],
    readingPassage: {
      title: "河内的天气 (Thời tiết Hà Nội)",
      contentHanzi: "河内夏天的天气很热，常常下雨。秋天的天气最好，不冷也不热。很多人喜欢秋天去河内旅游。",
      contentPinyin: "Hénèi xiàtiān de tiānqì hěn rè, chángcháng xià yǔ. Qiūtiān de tiānqì zuì hǎo, bù lěng yě bú rè. Hěn duō rén xǐhuan qiūtiān qù Hénèi lǚyóu.",
      contentVietnamese: "Thời tiết mùa hè ở Hà Nội rất nóng, thường xuyên có mưa. Thời tiết mùa thu là đẹp nhất, không lạnh cũng không nóng. Rất nhiều người thích đi du lịch Hà Nội vào mùa thu."
    },
    quizQuestions: [
      {
        id: "q_hsk1_l12_1",
        type: "multiple_choice",
        question: "Cụm từ '太好了 (Tài hǎo le)' có nghĩa là gì?",
        options: ["Tốt quá rồi / Tuyệt vời!", "Không tốt lắm", "Tạm được", "Hơi xấu"],
        correctAnswer: "Tốt quá rồi / Tuyệt vời!",
        explanation: "太...了 là cấu trúc cảm thán biểu thị mức độ cao."
      }
    ]
  },
  {
    id: "hsk1_l13",
    hskLevel: "HSK1",
    lessonNumber: 13,
    title: "Hành động đang diễn ra",
    vietnameseTitle: "Bài 13: Diễn tả hành động đang tiếp diễn với phó từ 在 và trợ từ 呢",
    description: "Học cách diễn đạt hành động đang xảy ra (đang làm gì) với 在, 正在, và 呢, cách gọi điện thoại và từ vựng hoạt động thường ngày.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk1_62", "v_hsk1_63", "v_hsk1_64", "v_hsk1_65", "v_hsk1_66"],
    grammarPoints: [
      {
        id: "gp_hsk1_13_1",
        title: "Biểu thị hành động đang diễn ra: 在 / 正在 / 呢",
        structure: "Chủ ngữ + 在 / 正在 + Động từ + (Tân ngữ) + (呢)",
        explanation: "Tương đương từ 'đang' trong tiếng Việt. Phủ định dùng 没在.",
        examples: [
          { hanzi: "他在睡觉呢。", pinyin: "Tā zài shuìjiào ne.", vietnamese: "Anh ấy đang ngủ đấy." },
          { hanzi: "你正在做什么？ - 我在看书呢。", pinyin: "Nǐ zhèngzài zuò shénme? - Wǒ zài kàn shū ne.", vietnamese: "Bạn đang làm gì thế? - Tôi đang đọc sách." }
        ]
      },
      {
        id: "gp_hsk1_13_2",
        title: "Lời chào khi nghe điện thoại: 喂 (wèi / wéi)",
        structure: "喂，你好！",
        explanation: "Tương đương từ 'A-lô' trong tiếng Việt khi bắt máy điện thoại.",
        examples: [
          { hanzi: "喂，李老师在吗？", pinyin: "Wéi, Lǐ lǎoshī zài ma?", vietnamese: "A-lô, cô Lý có ở đó không ạ?" }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn bè",
        hanzi: "喂，阮明，你现在在做什么呢？",
        pinyin: "Wéi, Ruǎn Míng, nǐ xiànzài zài zuò shénme ne?",
        vietnamese: "A-lô, Nguyễn Minh, bây giờ bạn đang làm gì đấy?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn bè",
        hanzi: "我在学做中国菜呢，妈妈在旁边教我。",
        pinyin: "Wǒ zài xué zuò Zhōngguó cài ne, māma zài pángbiān jiāo wǒ.",
        vietnamese: "Tôi đang học nấu món ăn Trung Quốc, mẹ đang ở bên cạnh dạy tôi."
      },
      {
        speaker: "王明 (Vương Minh)",
        role: "Bạn bè",
        hanzi: "太棒了！大卫在做什么？",
        pinyin: "Tài bàng le! Dàwèi zài zuò shénme?",
        vietnamese: "Tuyệt quá! David đang làm gì thế?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Bạn bè",
        hanzi: "他在听音乐，没有看书。",
        pinyin: "Tā zài tīng yīnyuè, méiyǒu kàn shū.",
        vietnamese: "Cậu ấy đang nghe nhạc, không đọc sách."
      }
    ],
    readingPassage: {
      title: "星期天下午 (Chiều Chủ nhật)",
      contentHanzi: "今天是星期天。爸爸在客厅看报纸，妈妈在厨房做饭。哥哥在房间玩电脑游戏，我在听音乐写汉字。",
      contentPinyin: "Jīntiān shì xīngqīrì. Bàba zài kètīng kàn bàozhǐ, māma zài chúfáng zuòfàn. Gēge zài fángjiān wán diànnǎo yóuxì, wǒ zài tīng yīnyuè xiě hànzì.",
      contentVietnamese: "Hôm nay là Chủ nhật. Bố đang ở phòng khách đọc báo, mẹ đang ở bếp nấu cơm. Anh trai đang ở phòng chơi trò chơi máy tính, tôi đang nghe nhạc và viết chữ Hán."
    },
    quizQuestions: [
      {
        id: "q_hsk1_l13_1",
        type: "multiple_choice",
        question: "Phủ định của câu '他在看书呢 (Anh ấy đang đọc sách)' là gì?",
        options: ["他没在看书 (Tā méi zài kàn shū)", "他不看书 (Tā bù kàn shū)", "他没看书 (Tā méi kàn shū)", "他不在看书 (Tā bú zài kàn shū)"],
        correctAnswer: "他没在看书 (Tā méi zài kàn shū)",
        explanation: "Phủ định hành động đang diễn ra dùng 没在 + Động từ."
      }
    ]
  },
  {
    id: "hsk1_l14",
    hskLevel: "HSK1",
    lessonNumber: 14,
    title: "Trợ từ động thái 了",
    vietnameseTitle: "Bài 14: Biểu thị sự hoàn thành với trợ từ động thái 了",
    description: "Học cách dùng trợ từ 了 sau động từ chỉ sự việc đã hoàn thành hoặc có sự biến đổi mới, từ vựng mua sắm quần áo.",
    estimatedMinutes: 20,
    vocabularyIds: ["v_hsk1_67", "v_hsk1_68", "v_hsk1_69", "v_hsk1_70", "v_hsk1_71"],
    grammarPoints: [
      {
        id: "gp_hsk1_14_1",
        title: "Trợ từ động thái 了 (le) biểu thị hành động đã hoàn thành",
        structure: "Chủ ngữ + Động từ + 了 + (Số lượng / Định ngữ) + Tân ngữ",
        explanation: "Đặt ngay sau động từ để chỉ hành động đó đã diễn ra và hoàn tất.",
        examples: [
          { hanzi: "我买了一件衣服。", pinyin: "Wǒ mǎi le yí jiàn yīfu.", vietnamese: "Tôi đã mua một chiếc áo." },
          { hanzi: "她喝了一杯水。", pinyin: "Tā hē le yì bēi shuǐ.", vietnamese: "Cô ấy đã uống một cốc nước." }
        ]
      },
      {
        id: "gp_hsk1_14_2",
        title: "Cụm từ 不少 (bù shǎo) - Không ít / Rất nhiều",
        structure: "不少 + Danh từ",
        explanation: "Dùng để biểu thị số lượng nhiều một cách nhã nhặn.",
        examples: [
          { hanzi: "商场里有不少人。", pinyin: "Shāngchǎng li yǒu bù shǎo rén.", vietnamese: "Trong trung tâm thương mại có không ít người." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn bè",
        hanzi: "张老师，昨天你去哪儿了？",
        pinyin: "Zhāng lǎoshī, zuótiān nǐ qù nǎr le?",
        vietnamese: "Cô Trương, hôm qua cô đi đâu thế ạ?"
      },
      {
        speaker: "张老师 (Cô Trương)",
        role: "Giáo viên",
        hanzi: "我和朋友去商场了，我买了不少衣服。",
        pinyin: "Wǒ hé péngyou qù shāngchǎng le, wǒ mǎi le bù shǎo yīfu.",
        vietnamese: "Tôi cùng bạn đi trung tâm thương mại, tôi đã mua không ít quần áo."
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn bè",
        hanzi: "你买了什么衣服？",
        pinyin: "Nǐ mǎi le shénme yīfu?",
        vietnamese: "Cô đã mua những quần áo gì ạ?"
      },
      {
        speaker: "张老师 (Cô Trương)",
        role: "Giáo viên",
        hanzi: "我买了一件大衣和两条裤子，都非常漂亮。",
        pinyin: "Wǒ mǎi le yí jiàn dàyī hé liǎng tiáo kùzi, dōu fēicháng piàoliang.",
        vietnamese: "Tôi mua một chiếc áo khoác và hai chiếc quần, đều rất đẹp."
      }
    ],
    readingPassage: {
      title: "买东西 (Đi mua sắm)",
      contentHanzi: "昨天下午我和同屋去超市了。我们买了苹果、香蕉和牛奶。回家后，我们吃了一个苹果，非常好吃。",
      contentPinyin: "Zuótiān xiàwǔ wǒ hé tóngwū qù chāoshì le. Wǒmen mǎi le píngguǒ, xiāngjiāo hé niúnǎi. Huí jiā hòu, wǒmen chī le yí ge píngguǒ, fēicháng hǎochī.",
      contentVietnamese: "Chiều hôm qua tôi cùng bạn cùng phòng đã đi siêu thị. Chúng tôi mua táo, chuối và sữa bò. Sau khi về nhà, chúng tôi đã ăn một quả táo, rất ngon."
    },
    quizQuestions: [
      {
        id: "q_hsk1_l14_1",
        type: "multiple_choice",
        question: "Phủ định của '我买了衣服 (Tôi đã mua quần áo)' là gì?",
        options: ["我没买衣服 (Wǒ méi mǎi yīfu)", "我不买衣服了 (Wǒ bù mǎi yīfu le)", "我不买了衣服 (Wǒ bù mǎi le yīfu)", "我没买了衣服 (Wǒ méi mǎi le yīfu)"],
        correctAnswer: "我没买衣服 (Wǒ méi mǎi yīfu)",
        explanation: "Phủ định hành động trong quá khứ dùng 没 (không dùng 不) và BỎ chữ 了 sau động từ."
      }
    ]
  },
  {
    id: "hsk1_l15",
    hskLevel: "HSK1",
    lessonNumber: 15,
    title: "Cấu trúc nhấn mạnh 是……的",
    vietnameseTitle: "Bài 15: Nhấn mạnh thời gian, địa điểm, phương tiện với 是……的",
    description: "Nắm vững cấu trúc nhấn mạnh 是...的 (thời gian, địa điểm, phương thức, người thực hiện hành động đã xảy ra) và tổng kết trình độ HSK 1.",
    estimatedMinutes: 25,
    vocabularyIds: ["v_hsk1_72", "v_hsk1_73", "v_hsk1_74", "v_hsk1_75", "v_hsk1_76"],
    grammarPoints: [
      {
        id: "gp_hsk1_15_1",
        title: "Cấu trúc nhấn mạnh: 是……的 (shì... de)",
        structure: "Chủ ngữ + 是 + [Thời gian / Địa điểm / Phương thức / Người thực hiện] + Động từ + 的",
        explanation: "Dùng để nhấn mạnh một chi tiết cụ thể của một sự việc đã xảy ra trong quá khứ.",
        examples: [
          { hanzi: "我是坐飞机来的。", pinyin: "Wǒ shì zuò fēijī lái de.", vietnamese: "Tôi đi máy bay đến đấy (nhấn mạnh phương tiện)." },
          { hanzi: "我们是在北京认识的。", pinyin: "Wǒmen shì zài Běijīng rènshi de.", vietnamese: "Chúng tôi quen nhau ở Bắc Kinh (nhấn mạnh địa điểm)." },
          { hanzi: "他是昨天买的。", pinyin: "Tā shì zuótiān mǎi de.", vietnamese: "Anh ấy mua hôm qua (nhấn mạnh thời gian)." }
        ]
      }
    ],
    dialogue: [
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "阮明，你是哪一年来中国的？",
        pinyin: "Ruǎn Míng, nǐ shì nǎ yì nián lái Zhōngguó de?",
        vietnamese: "Nguyễn Minh, bạn đến Trung Quốc vào năm nào vậy?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Du học sinh",
        hanzi: "我是去年九月来的。",
        pinyin: "Wǒ shì qùnián jiǔ yuè lái de.",
        vietnamese: "Tôi đến vào tháng 9 năm ngoái."
      },
      {
        speaker: "李华 (Lý Hoa)",
        role: "Bạn học",
        hanzi: "你是坐飞机来的还是坐火车来的？",
        pinyin: "Nǐ shì zuò fēijī lái de háishì zuò huǒchē lái de?",
        vietnamese: "Bạn đi máy bay đến hay là đi tàu hỏa đến?"
      },
      {
        speaker: "阮明 (Nguyễn Minh)",
        role: "Du học sinh",
        hanzi: "我是坐飞机来的，两个小时就到了。",
        pinyin: "Wǒ shì zuò fēijī lái de, liǎng ge xiǎoshí jiù dào le.",
        vietnamese: "Tôi đi máy bay đến, chỉ 2 tiếng là tới nơi rồi."
      }
    ],
    readingPassage: {
      title: "我的中国生活 (Cuộc sống ở Trung Quốc của tôi)",
      contentHanzi: "我是去年来北京的。我是坐飞机来的。我和李华是在汉语班认识的。我们每天一起上课，一起练习说汉语。",
      contentPinyin: "Wǒ shì qùnián lái Běijīng de. Wǒ shì zuò fēijī lái de. Wǒ hé Lǐ Huá shì zài Hànyǔ bān rènshi de. Wǒmen měitiān yìqǐ shàngkè, yìqǐ liànxí shuō Hànyǔ.",
      contentVietnamese: "Tôi đến Bắc Kinh vào năm ngoái. Tôi đi máy bay đến. Tôi và Lý Hoa quen nhau ở lớp học tiếng Trung. Chúng tôi mỗi ngày đều cùng nhau lên lớp, cùng nhau luyện nói tiếng Trung."
    },
    quizQuestions: [
      {
        id: "q_hsk1_l15_1",
        type: "multiple_choice",
        question: "Cấu trúc '他是坐出租车来的 (Tā shì zuò chūzūchē lái de)' nhấn mạnh điều gì?",
        options: ["Phương tiện đi lại (xe taxi)", "Địa điểm đến", "Thời gian đến", "Người đi cùng"],
        correctAnswer: "Phương tiện đi lại (xe taxi)",
        explanation: "Cấu trúc 是...的 bao bọc lấy cụm 坐出租车 để nhấn mạnh phương tiện di chuyển."
      }
    ]
  }
];
