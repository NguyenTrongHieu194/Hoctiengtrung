export interface SituationalLine {
  speaker: string;
  role: string;
  hanzi: string;
  pinyin: string;
  vietnamese: string;
  keyPhrase?: string;
  grammarNote?: string;
}

export interface SituationalDialogueItem {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  badgeColor: string;
  title: string;
  vietnameseTitle: string;
  scenarioDescription: string;
  level: string;
  characters: { name: string; role: string }[];
  lines: SituationalLine[];
  keyVocabulary: { hanzi: string; pinyin: string; vietnamese: string }[];
  culturalTips: string;
}

export interface SituationalCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  dialogueCount: number;
}

export const SITUATIONAL_CATEGORIES: SituationalCategory[] = [
  {
    id: "greetings",
    name: "Chào hỏi & Làm quen",
    icon: "Smile",
    color: "bg-blue-500",
    description: "Gặp gỡ lần đầu, kết bạn WeChat, giới thiệu bản thân và xưng hô chuẩn xác.",
    dialogueCount: 3
  },
  {
    id: "dining",
    name: "Ăn uống & Gọi món",
    icon: "Utensils",
    color: "bg-orange-500",
    description: "Vào nhà hàng, gọi món đặc sản, dặn khẩu vị (không cay, ít đường) và thanh toán.",
    dialogueCount: 3
  },
  {
    id: "shopping",
    name: "Mua sắm & Trả giá",
    icon: "ShoppingBag",
    color: "bg-pink-500",
    description: "Hỏi giá, chọn size/màu sắc, kỹ năng mặc cả giá tại chợ và quét mã thanh toán.",
    dialogueCount: 3
  },
  {
    id: "travel_directions",
    name: "Đi lại, Taxi & Hỏi đường",
    icon: "Compass",
    color: "bg-sky-500",
    description: "Bắt taxi, đi tàu điện ngầm, mua vé tàu cao tốc và hỏi đường rẽ trái/phải.",
    dialogueCount: 3
  },
  {
    id: "hotel_housing",
    name: "Khách sạn & Chỗ ở",
    icon: "Building2",
    color: "bg-indigo-500",
    description: "Check-in khách sạn, hỏi mật khẩu WiFi, đổi phòng và thuê phòng trọ dài hạn.",
    dialogueCount: 2
  },
  {
    id: "workplace_office",
    name: "Giao tiếp Công sở & Văn phòng",
    icon: "Briefcase",
    color: "bg-teal-500",
    description: "Báo cáo công việc, họp giao ban, xin nghỉ phép, tăng ca và trao đổi với sếp.",
    dialogueCount: 3
  },
  {
    id: "health_hospital",
    name: "Sức khỏe & Nhà thuốc",
    icon: "HeartPulse",
    color: "bg-red-500",
    description: "Mô tả triệu chứng bệnh (cảm cúm, đau đầu, đau dạ dày) và mua thuốc tại hiệu thuốc.",
    dialogueCount: 2
  },
  {
    id: "social_life",
    name: "Bạn bè & Hẹn hò giải trí",
    icon: "Sparkles",
    color: "bg-purple-500",
    description: "Rủ bạn đi xem phim, đi hát KTV, uống trà sữa và trò chuyện sở thích cuối tuần.",
    dialogueCount: 2
  },
  {
    id: "garment_factory",
    name: "Chuyên ngành May mặc & Xưởng",
    icon: "Scissors",
    color: "bg-emerald-600",
    description: "Điều phối chuyền may, xử lý lỗi kỹ thuật may, đọc tài liệu Techpack và kiểm hàng QC.",
    dialogueCount: 4
  }
];

export const SITUATIONAL_DIALOGUES: SituationalDialogueItem[] = [
  // =========================================================================
  // 1. CHÀO HỎI & LÀM QUEN (GREETINGS & INTRODUCTIONS)
  // =========================================================================
  {
    id: "sit_greet_1",
    categoryId: "greetings",
    categoryName: "Chào hỏi & Làm quen",
    categoryIcon: "Smile",
    badgeColor: "bg-blue-600",
    title: "Làm quen đồng nghiệp mới & Kết bạn WeChat",
    vietnameseTitle: "Tình huống 1: Làm quen đồng nghiệp mới và kết bạn WeChat",
    scenarioDescription: "Nguyễn Minh là nhân viên mới đến công ty, gặp gỡ và trò chuyện làm quen với đồng nghiệp Vương Vĩ trong giờ giải lao.",
    level: "HSK1-2 (Cơ bản)",
    characters: [
      { name: "王伟 (Vương Vĩ)", role: "Đồng nghiệp Trung Quốc" },
      { name: "阮明 (Nguyễn Minh)", role: "Nhân viên mới Việt Nam" }
    ],
    lines: [
      {
        speaker: "王伟",
        role: "Đồng nghiệp Trung Quốc",
        hanzi: "你好！你是新来的同事吧？我叫王伟，请问你怎么称呼？",
        pinyin: "Nǐ hǎo! Nǐ shì xīn lái de tóngshì ba? Wǒ jiào Wáng Wěi, qǐngwèn nǐ zěnme chēnghu?",
        vietnamese: "Xin chào! Bạn là đồng nghiệp mới đến đúng không? Tôi tên là Vương Vĩ, xin hỏi xưng hô với bạn thế nào?",
        keyPhrase: "怎么称呼 (zěnme chēnghu - xưng hô thế nào)"
      },
      {
        speaker: "阮明",
        role: "Nhân viên mới",
        hanzi: "王哥你好！我叫阮明，来自越南，很高兴认识你！以后请多多关照。",
        pinyin: "Wáng gē nǐ hǎo! Wǒ jiào Ruǎn Míng, láizì Yuènán, hěn gāoxìng rènshi nǐ! Yǐhòu qǐng duōduō guānzhào.",
        vietnamese: "Chào anh Vương! Tôi tên là Nguyễn Minh, đến từ Việt Nam, rất vui được làm quen với anh! Sau này nhờ anh chỉ giáo nhiều hơn.",
        keyPhrase: "请多多关照 (qǐng duōduō guānzhào - xin chỉ bảo, chiếu cố)"
      },
      {
        speaker: "王伟",
        role: "Đồng nghiệp Trung Quốc",
        hanzi: "不客气！你的中文说得很流利啊！我们加个微信吧，方便以后联系。",
        pinyin: "Bú kèqi! Nǐ de Zhōngwén shuō de hěn liúlì a! Wǒmen jiā ge Wēixìn ba, fāngbiàn yǐhòu liánxì.",
        vietnamese: "Đừng khách sáo! Tiếng Trung của bạn nói lưu loát quá! Chúng ta kết bạn WeChat nhé, tiện cho liên lạc sau này.",
        keyPhrase: "加个微信 (jiā ge Wēixìn - kết bạn WeChat)"
      },
      {
        speaker: "阮明",
        role: "Nhân viên mới",
        hanzi: "好的！我扫你的二维码，还是你扫我？",
        pinyin: "Hǎo de! Wǒ sǎo nǐ de èrwéimǎ, háishì nǐ sǎo wǒ?",
        vietnamese: "Vâng được ạ! Tôi quét mã QR của anh, hay anh quét tôi?",
        keyPhrase: "扫二维码 (sǎo èrwéimǎ - quét mã QR)"
      },
      {
        speaker: "王伟",
        role: "Đồng nghiệp Trung Quốc",
        hanzi: "我扫你吧。好了，我已经发好友申请了，你通过一下。",
        pinyin: "Wǒ sǎo nǐ ba. Hǎo le, wǒ yǐjīng fā hǎoyǒu shēnqǐng le, nǐ tōngguò yíxià.",
        vietnamese: "Để tôi quét bạn nhé. Xong rồi, tôi đã gửi lời mời kết bạn, bạn chấp nhận giúp tôi nhé."
      },
      {
        speaker: "阮明",
        role: "Nhân viên mới",
        hanzi: "我通过了！谢谢王哥，中午一起去吃午饭吧！",
        pinyin: "Wǒ tōngguò le! Xièxie Wáng gē, zhōngwǔ yìqǐ qù chī wǔfàn ba!",
        vietnamese: "Tôi đồng ý rồi ạ! Cảm ơn anh Vương, trưa nay cùng đi ăn cơm nhé!"
      }
    ],
    keyVocabulary: [
      { hanzi: "同事", pinyin: "tóngshì", vietnamese: "Đồng nghiệp" },
      { hanzi: "称呼", pinyin: "chēnghu", vietnamese: "Xưng hô, gọi là" },
      { hanzi: "关照", pinyin: "guānzhào", vietnamese: "Chiếu cố, quan tâm giúp đỡ" },
      { hanzi: "流利", pinyin: "liúlì", vietnamese: "Lưu loát, trôi chảy" },
      { hanzi: "二维码", pinyin: "èrwéimǎ", vietnamese: "Mã QR" },
      { hanzi: "通过", pinyin: "tōngguò", vietnamese: "Thông qua, chấp nhận kết bạn" }
    ],
    culturalTips: "Ở Trung Quốc, câu nói '请多多关照' (Xin hãy chỉ bảo/chiếu cố) là câu xã giao cực kỳ lịch sự và ghi điểm khi mới làm quen tại nơi làm việc. Việc hỏi '加个微信' (Thêm WeChat) là cách giao tiếp kết nối số 1 hiện nay thay cho việc xin số điện thoại."
  },

  // =========================================================================
  // 2. ĂN UỐNG & GỌI MÓN (DINING & RESTAURANT)
  // =========================================================================
  {
    id: "sit_dining_1",
    categoryId: "dining",
    categoryName: "Ăn uống & Gọi món",
    categoryIcon: "Utensils",
    badgeColor: "bg-orange-500",
    title: "Vào nhà hàng gọi món & Dặn không ăn cay",
    vietnameseTitle: "Tình huống 2: Đi ăn nhà hàng, dặn khẩu vị và thanh toán",
    scenarioDescription: "Khách hàng vào một quán ăn Trung Hoa, xem thực đơn gọi món, yêu cầu giảm độ cay và thanh toán bằng quét mã điện tử.",
    level: "HSK1-2 (Cơ bản)",
    characters: [
      { name: "服务员 (Phục vụ)", role: "Nhân viên quán ăn" },
      { name: "顾客 (Khách hàng)", role: "Thực khách" }
    ],
    lines: [
      {
        speaker: "服务员",
        role: "Nhân viên phục vụ",
        hanzi: "您好，欢迎光临！请问一共几位？里面请坐！",
        pinyin: "Nín hǎo, huānyíng guānglín! Qǐngwèn yígòng jǐ wèi? Lǐmiàn qǐng zuò!",
        vietnamese: "Xin chào, hoan nghênh quý khách! Xin hỏi đoàn mình có mấy người ạ? Mời vào bên trong ngồi!",
        keyPhrase: "欢迎光临 (huānyíng guānglín - hoan nghênh quý khách)"
      },
      {
        speaker: "顾客",
        role: "Khách hàng",
        hanzi: "两位。服务员，请给我们一份菜单，再来一壶热茶。",
        pinyin: "Liǎng wèi. Fúwùyuán, qǐng gěi wǒmen yí fèn càidān, zài lái yì hú rè chá.",
        vietnamese: "Hai người. Phục vụ ơi, cho chúng tôi xin một cuốn thực đơn và một ấm trà nóng nhé.",
        keyPhrase: "一份菜单 (yí fèn càidān - một cuốn thực đơn)"
      },
      {
        speaker: "服务员",
        role: "Nhân viên phục vụ",
        hanzi: "好的，这是菜单。我们店的招牌菜是宫保鸡丁和麻婆豆腐，两位要尝尝吗？",
        pinyin: "Hǎo de, zhè shì càidān. Wǒmen diàn de zhāopái cài shì Gōngbǎo jīdīng hé Mápó dòufu, liǎng wèi yào chángchang ma?",
        vietnamese: "Vâng ạ, đây là thực đơn. Món đặc sản quán em là Gà xào Cung Bảo và Đậu hũ Ma Bà, hai anh chị có muốn thử không?",
        keyPhrase: "招牌菜 (zhāopái cài - món đặc sản làm nên tên tuổi)"
      },
      {
        speaker: "顾客",
        role: "Khách hàng",
        hanzi: "好的，就要这两个菜。另外，我不太能吃辣，请帮我少放辣椒，也不要放香菜。",
        pinyin: "Hǎo de, jiù yào zhè liǎng ge cài. Lìngwài, wǒ bú tài néng chī là, qǐng bāng wǒ shǎo fàng làjiāo, yě bú yào fàng xiāngcài.",
        vietnamese: "Được, cho chúng tôi 2 món đó. Ngoài ra, tôi không ăn cay giỏi lắm, xin làm ít ớt giúp tôi, và đừng bỏ rau mùi (ngò rí) nhé.",
        keyPhrase: "少放辣 / 不要香菜 (shǎo fàng là / bú yào xiāngcài - ít cay / không rau mùi)"
      },
      {
        speaker: "服务员",
        role: "Nhân viên phục vụ",
        hanzi: "没问题，微辣、不放香菜。主食要米饭还是水饺？",
        pinyin: "Méi wèntí, wēilà, bú fàng xiāngcài. Zhǔshí yào mǐfàn háishì shuǐjiǎo?",
        vietnamese: "Không vấn đề gì ạ, cay nhẹ và không bỏ rau mùi. Món ăn chính anh chị dùng cơm trắng hay sủi cảo?",
        keyPhrase: "微辣 (wēilà - cay nhẹ)"
      },
      {
        speaker: "顾客",
        role: "Khách hàng",
        hanzi: "来两碗米饭。吃完后，服务员，买单！请问可以扫微信吗？",
        pinyin: "Lái liǎng wǎn mǐfàn. Chī wán hòu, fúwùyuán, mǎidān! Qǐngwèn kěyǐ sǎo Wēixìn ma?",
        vietnamese: "Cho hai bát cơm trắng. (Sau khi ăn xong) Phục vụ ơi, tính tiền! Xin hỏi có thể quét mã WeChat được không?",
        keyPhrase: "买单 (mǎidān - thanh toán, tính tiền)"
      },
      {
        speaker: "服务员",
        role: "Nhân viên phục vụ",
        hanzi: "一共八十六块。可以微信或支付宝，请扫这里。",
        pinyin: "Yígòng bāshíliù kuài. Kěyǐ Wēixìn huò Zhīfùbǎo, qǐng sǎo zhèlǐ.",
        vietnamese: "Tổng cộng hết 86 tệ ạ. Có thể dùng WeChat hoặc Alipay, mời quét mã ở đây ạ."
      }
    ],
    keyVocabulary: [
      { hanzi: "菜单", pinyin: "càidān", vietnamese: "Thực đơn" },
      { hanzi: "招牌菜", pinyin: "zhāopái cài", vietnamese: "Món tủ, món đặc sản" },
      { hanzi: "微辣", pinyin: "wēilà", vietnamese: "Cay nhẹ" },
      { hanzi: "香菜", pinyin: "xiāngcài", vietnamese: "Rau mùi / ngò rí" },
      { hanzi: "买单", pinyin: "mǎidān", vietnamese: "Thanh toán hóa đơn" },
      { hanzi: "支付宝", pinyin: "Zhīfùbǎo", vietnamese: "Ví điện tử Alipay" }
    ],
    culturalTips: "Khi ăn uống ở Trung Quốc, các cấp độ cay thường chia thành: 不辣 (không cay), 微辣 (cay nhẹ), 中辣 (cay vừa), 特辣 (siêu cay). Nếu bạn không quen ăn rau mùi tây, nhớ nói rõ '不要放香菜' (Không cho rau mùi)."
  },

  // =========================================================================
  // 3. MUA SẮM & TRẢ GIÁ (SHOPPING & BARGAINING)
  // =========================================================================
  {
    id: "sit_shop_1",
    categoryId: "shopping",
    categoryName: "Mua sắm & Trả giá",
    categoryIcon: "ShoppingBag",
    badgeColor: "bg-pink-500",
    title: "Mua sắm quần áo, thử size & Mặc cả giá",
    vietnameseTitle: "Tình huống 3: Mua sắm trang phục, thử đồ và mặc cả giá",
    scenarioDescription: "Khách hàng vào tiệm thời trang chọn áo khoác, hỏi nhân viên size phù hợp, phòng thử đồ và thương lượng giảm giá.",
    level: "HSK2-3 (Cơ bản - Trung cấp)",
    characters: [
      { name: "店员 (Nhân viên bán hàng)", role: "Chủ tiệm / Bán hàng" },
      { name: "顾客 (Khách mua)", role: "Người mua sắm" }
    ],
    lines: [
      {
        speaker: "顾客",
        role: "Người mua",
        hanzi: "你好，请问这件外套有大号（L码）的吗？我想试试。",
        pinyin: "Nǐ hǎo, qǐngwèn zhè jiàn wàitào yǒu dàhào (L mǎ) de ma? Wǒ xiǎng shìshi.",
        vietnamese: "Xin chào, cho hỏi chiếc áo khoác này có size lớn (size L) không? Tôi muốn mặc thử một chút.",
        keyPhrase: "L码 / 试试 (L mǎ / shìshi - size L / thử xem)"
      },
      {
        speaker: "店员",
        role: "Nhân viên bán hàng",
        hanzi: "有的！除了黑色，还有米色和卡其色。试衣间在右边，您可以试穿一下。",
        pinyin: "Yǒu de! Chúle hēisè, hái yǒu mǐsè hé kǎqísè. Shìyījiān zài yòubian, nín kěyǐ shìchuān yíxià.",
        vietnamese: "Có chứ ạ! Ngoài màu đen ra còn có màu be và màu kaki. Phòng thử đồ ở bên tay phải, bạn có thể thử xem nhé.",
        keyPhrase: "试衣间 (shìyījiān - phòng thay đồ / thử đồ)"
      },
      {
        speaker: "顾客",
        role: "Người mua",
        hanzi: "版型很合适！请问这件衣服多少钱？能打折吗？",
        pinyin: "Bǎnxíng hěn héshì! Qǐngwèn zhè jiàn yīfu duōshao qián? Néng dǎzhé ma?",
        vietnamese: "Phom dáng rất vừa vặn! Xin hỏi chiếc áo này bao nhiêu tiền? Có giảm giá được không?",
        keyPhrase: "能打折吗 (néng dǎzhé ma - có chiết khấu/giảm giá được không)"
      },
      {
        speaker: "店员",
        role: "Nhân viên bán hàng",
        hanzi: "原价是三百五十块，现在店里有活动，打八折，折后二百八十块。",
        pinyin: "Yuánjià shì sānbǎi wǔshí kuài, xiànzài diàn lǐ yǒu huódòng, dǎ bā zhé, zhéhòu èrbǎi bāshí kuài.",
        vietnamese: "Giá gốc là 350 tệ, hiện tại tiệm đang có ưu đãi giảm 20% (đánh 8折), sau giảm là 280 tệ ạ.",
        keyPhrase: "打八折 (dǎ bā zhé - giảm 20%, bán 80% giá gốc)"
      },
      {
        speaker: "顾客",
        role: "Người mua",
        hanzi: "二百八还是有点贵，二百五十块我就直接拿两件，可以吗？",
        pinyin: "Èrbǎi bā háishì yǒudiǎn guì, èrbǎi wǔshí kuài wǒ jiù zhíjiē ná liǎng jiàn, kěyǐ ma?",
        vietnamese: "280 vẫn hơi đắt một chút, 250 tệ thì tôi lấy luôn 2 chiếc nhé, được không?",
        keyPhrase: "有点贵 (yǒudiǎn guì - hơi đắt một chút)"
      },
      {
        speaker: "店员",
        role: "Nhân viên bán hàng",
        hanzi: "看您这么诚心买，那就二百五一件给您吧！请问现金还是微信？",
        pinyin: "Kàn nín zhème chéngxīn mǎi, nà jiù èrbǎiwǔ yí jiàn gěi nín ba! Qǐngwèn xiànjīn háishì Wēixìn?",
        vietnamese: "Thấy bạn thật lòng muốn mua, vậy để cho bạn 250 tệ một chiếc nhé! Bạn thanh toán tiền mặt hay WeChat?"
      }
    ],
    keyVocabulary: [
      { hanzi: "外套", pinyin: "wàitào", vietnamese: "Áo khoác ngoài" },
      { hanzi: "尺码", pinyin: "chǐmǎ", vietnamese: "Kích cỡ (S, M, L, XL)" },
      { hanzi: "试衣间", pinyin: "shìyījiān", vietnamese: "Phòng thử đồ" },
      { hanzi: "打折", pinyin: "dǎzhé", vietnamese: "Giảm giá / chiết khấu" },
      { hanzi: "原价", pinyin: "yuánjià", vietnamese: "Giá gốc ban đầu" },
      { hanzi: "合适", pinyin: "héshì", vietnamese: "Thích hợp, vừa vặn" }
    ],
    culturalTips: "Lưu ý quan trọng về cách nói giảm giá trong tiếng Trung: '打八折' (đánh 8折) nghĩa là giảm 20% (bán bằng 80% giá niêm yết). '打七折' nghĩa là giảm 30% (bán 70% giá)."
  },

  // =========================================================================
  // 4. ĐI LẠI, TAXI & HỎI ĐƯỜNG (TRAVEL, TAXI & DIRECTIONS)
  // =========================================================================
  {
    id: "sit_travel_1",
    categoryId: "travel_directions",
    categoryName: "Đi lại & Hỏi đường",
    categoryIcon: "Compass",
    badgeColor: "bg-sky-500",
    title: "Bắt xe Taxi, chỉ đường & Đón người tại sân bay",
    vietnameseTitle: "Tình huống 4: Đi taxi, hướng dẫn đường đi và hẹn điểm đón",
    scenarioDescription: "Hành khách đón xe taxi từ sân bay về khách sạn trung tâm thành phố, trao đổi lộ trình và yêu cầu xuất hóa đơn đỏ.",
    level: "HSK2-3 (Cơ bản - Trung cấp)",
    characters: [
      { name: "司机 (Tài xế Taxi)", role: "Bác tài xế" },
      { name: "乘客 (Hành khách)", role: "Khách đi xe" }
    ],
    lines: [
      {
        speaker: "司机",
        role: "Tài xế Taxi",
        hanzi: "师傅好！请问您去哪里？行李放在后备箱吧。",
        pinyin: "Shīfu hǎo! Qǐngwèn nín qù nǎlǐ? Xíngli fàng zài hòubèixiāng ba.",
        vietnamese: "Chào quý khách! Xin hỏi bạn đi đâu ạ? Hành lý cứ để vào cốp sau xe nhé.",
        keyPhrase: "后备箱 (hòubèixiāng - cốp sau xe)"
      },
      {
        speaker: "乘客",
        role: "Hành khách",
        hanzi: "师傅，请去市中心的希尔顿酒店。大概需要多长时间？",
        pinyin: "Shīfu, qǐng qù shìzhōngxīn de Xī'ěrdùn jiǐdiàn. Dàgài xūyào duō cháng shíjiān?",
        vietnamese: "Bác tài ơi, làm phiền chở tôi đến khách sạn Hilton ở trung tâm thành phố. Mất khoảng bao lâu thời gian ạ?",
        keyPhrase: "大概需要多长时间 (dàgài xūyào duō cháng shíjiān - khoảng bao lâu)"
      },
      {
        speaker: "司机",
        role: "Tài xế Taxi",
        hanzi: "现在正好是下班高峰期，有点堵车，走高架桥大概要四十分钟。",
        pinyin: "Xiànzài zhènghǎo shì xiàbān gāofēngqī, yǒudiǎn dǔchē, zǒu gāojiàqiáo dàgài yào sìshí fēnzhōng.",
        vietnamese: "Bây giờ đúng vào giờ cao điểm tan tầm, hơi tắc đường một chút, đi đường cầu vượt trên cao mất tầm 40 phút nhé.",
        keyPhrase: "高峰期 / 堵车 (gāofēngqī / dǔchē - giờ cao điểm / kẹt xe)"
      },
      {
        speaker: "乘客",
        role: "Hành khách",
        hanzi: "没关系，师傅麻烦您打表走。到了酒店门口麻烦靠边停一下。",
        pinyin: "Méi guānxi, shīfu máfan nín dǎbiǎo zǒu. Dào le jiǔdiàn ménkǒu máfan kàobiān tíng yíxià.",
        vietnamese: "Không sao, nhờ bác tài bật đồng hồ tính cước nhé. Đến cổng khách sạn nhờ bác tấp vào lề dừng lại một lát.",
        keyPhrase: "打表 / 靠边停 (dǎbiǎo / kàobiān tíng - bật đồng hồ tính cước / tấp vào lề)"
      },
      {
        speaker: "司机",
        role: "Tài xế Taxi",
        hanzi: "好嘞！到了，一共六十五块。需要发票吗？",
        pinyin: "Hǎo lei! Dào le, yígòng liùshíwǔ kuài. Xūyào fāpiào ma?",
        vietnamese: "Được rồi! Đến nơi rồi, tổng cộng 65 tệ. Bạn có cần hóa đơn không?",
        keyPhrase: "发票 (fāpiào - hóa đơn)"
      },
      {
        speaker: "乘客",
        role: "Hành khách",
        hanzi: "请给我一张发票，谢谢师傅！",
        pinyin: "Qǐng gěi wǒ yì zhāng fāpiào, xièxie shīfu!",
        vietnamese: "Xin in cho tôi một tờ hóa đơn cước, cảm ơn bác tài!"
      }
    ],
    keyVocabulary: [
      { hanzi: "师傅", pinyin: "shīfu", vietnamese: "Bác tài / Chú thợ (cách gọi lịch sự)" },
      { hanzi: "后备箱", pinyin: "hòubèixiāng", vietnamese: "Cốp sau xe ô tô" },
      { hanzi: "堵车", pinyin: "dǔchē", vietnamese: "Tắc đường, kẹt xe" },
      { hanzi: "高峰期", pinyin: "gāofēngqī", vietnamese: "Giờ cao điểm" },
      { hanzi: "打表", pinyin: "dǎbiǎo", vietnamese: "Bật đồng hồ tính cước taxi" },
      { hanzi: "发票", pinyin: "fāpiào", vietnamese: "Hóa đơn đỏ, biên lai" }
    ],
    culturalTips: "Ở Trung Quốc, '师傅' (shīfu) là từ xưng hô tôn trọng và thân thiện phổ biến nhất dành cho tài xế taxi, nhân viên kỹ thuật, thợ máy hay nhân viên giao hàng."
  },

  // =========================================================================
  // 5. GIAO TIẾP CÔNG SỞ & VĂN PHÒNG (WORKPLACE & OFFICE)
  // =========================================================================
  {
    id: "sit_work_1",
    categoryId: "workplace_office",
    categoryName: "Giao tiếp Công sở & Văn phòng",
    categoryIcon: "Briefcase",
    badgeColor: "bg-teal-500",
    title: "Báo cáo tiến độ dự án & Xin phép tăng ca",
    vietnameseTitle: "Tình huống 5: Báo cáo công việc với Trưởng phòng & Kế hoạch tuần",
    scenarioDescription: "Trần Quân báo cáo tiến độ tuần với Giám đốc bộ phận, thảo luận việc đẩy nhanh tiến độ và phối hợp làm việc nhóm.",
    level: "HSK3-4 (Trung cấp)",
    characters: [
      { name: "李经理 (Giám đốc Lý)", role: "Trưởng phòng ban" },
      { name: "陈军 (Trần Quân)", role: "Chuyên viên dự án" }
    ],
    lines: [
      {
        speaker: "李经理",
        role: "Giám đốc Lý",
        hanzi: "陈军，请进！关于本周的项目进展，客户那边反馈如何？",
        pinyin: "Chén Jūn, qǐng jìn! Guānyú běnzhōu de xiàngmù jìnzhǎn, kèhù nàbiān fǎnkuì rúhé?",
        vietnamese: "Trần Quân, mời vào! Về tiến độ dự án tuần này, bên phía khách hàng phản hồi thế nào rồi?",
        keyPhrase: "项目进展 / 反馈 (xiàngmù jìnzhǎn / fǎnkuì - tiến độ dự án / phản hồi)"
      },
      {
        speaker: "陈军",
        role: "Chuyên viên dự án",
        hanzi: "李经理，总体进展很顺利。客户对第一阶段的方案非常满意，只提出了两点细节修改。",
        pinyin: "Lǐ jīnglǐ, zǒngtǐ jìnzhǎn hěn shùnlì. Kèhù duì dì-yī jiēduàn de fāng'àn fēicháng mǎnyì, zhǐ tíchū le liǎng diǎn xìjié xiūgǎi.",
        vietnamese: "Thưa Giám đốc Lý, nhìn chung tiến độ rất thuận lợi. Khách hàng cực kỳ hài lòng với phương án giai đoạn 1, chỉ đề xuất sửa đổi 2 điểm chi tiết nhỏ.",
        keyPhrase: "非常满意 / 细节修改 (fēicháng mǎnyì / xìjié xiūgǎi - rất hài lòng / sửa chi tiết)"
      },
      {
        speaker: "李经理",
        role: "Giám đốc Lý",
        hanzi: "很好！那预计什么时候可以完成最终确认版并交付？",
        pinyin: "Hěn hǎo! Nà yùjì shénme shíhou kěyǐ wánchéng zuìzhōng quèrènbǎn bìng jiāofù?",
        vietnamese: "Rất tốt! Vậy dự kiến khi nào có thể hoàn tất bản xác nhận cuối cùng và bàn giao?",
        keyPhrase: "最终确认版 / 交付 (zuìzhōng quèrènbǎn / jiāofù - bản xác nhận cuối / bàn giao)"
      },
      {
        speaker: "陈军",
        role: "Chuyên viên dự án",
        hanzi: "我们团队今晚安排加两个小时班，预计明天上午十点前可以通过邮件发送给客户。",
        pinyin: "Wǒmen tuánduì jīnwǎn ānpái jiā liǎng ge xiǎoshí bān, yùjì míngtiān shàngwǔ shí diǎn qián kěyǐ tōngguò yóujiàn fāsòng gěi kèhù.",
        vietnamese: "Đội ngũ chúng em tối nay bố trí tăng ca 2 tiếng, dự kiến trước 10 giờ sáng mai có thể gửi email bàn giao cho khách hàng.",
        keyPhrase: "加班 / 安排 (jiābān / ānpái - tăng ca / sắp xếp bố trí)"
      },
      {
        speaker: "李经理",
        role: "Giám đốc Lý",
        hanzi: "辛苦大家了！注意劳逸结合，加完班记得填写加班补贴申请表。",
        pinyin: "Xīnkǔ dàjiā le! Zhùyì láoyì-jiéhé, jiā wán bān jìde tiánxiě jiābān bǔtiē shēnqǐngbiǎo.",
        vietnamese: "Vất vả cho mọi người quá! Chú ý kết hợp nghỉ ngơi hợp lý, tăng ca xong nhớ điền vào phiếu xin trợ cấp làm thêm giờ nhé.",
        keyPhrase: "辛苦了 / 劳逸结合 (xīnkǔ le / láoyì-jiéhé - vất vả rồi / làm nghỉ hài hòa)"
      }
    ],
    keyVocabulary: [
      { hanzi: "进展", pinyin: "jìnzhǎn", vietnamese: "Tiến triển, tiến độ" },
      { hanzi: "反馈", pinyin: "fǎnkuì", vietnamese: "Phản hồi thông tin" },
      { hanzi: "交付", pinyin: "jiāofù", vietnamese: "Bàn giao, nộp giao" },
      { hanzi: "加班", pinyin: "jiābān", vietnamese: "Làm thêm giờ, tăng ca" },
      { hanzi: "补贴", pinyin: "bǔtiē", vietnamese: "Trợ cấp, phụ cấp" },
      { hanzi: "劳逸结合", pinyin: "láoyì-jiéhé", vietnamese: "Làm việc và nghỉ ngơi điều độ" }
    ],
    culturalTips: "Trong môi trường công sở Trung Quốc, câu '辛苦了' (Vất vả cho bạn/mọi người rồi) là lời ghi nhận và động viên công sức rất ấm áp và thường gặp từ cấp trên đối với nhân viên."
  },

  // =========================================================================
  // 6. CHUYÊN NGÀNH MAY MẶC & NHÀ MÁY (SPECIALIZED GARMENT & FACTORY MODULE)
  // =========================================================================
  {
    id: "sit_garment_1",
    categoryId: "garment_factory",
    categoryName: "Chuyên ngành May mặc & Xưởng",
    categoryIcon: "Scissors",
    badgeColor: "bg-emerald-600",
    title: "Chuyền may bị lỗi nhảy mũi & Thợ cơ điện chỉnh máy",
    vietnameseTitle: "Tình huống Chuyên ngành 1: Xử lý máy may 1 kim bị bỏ mũi tại chuyền",
    scenarioDescription: "Công nhân may phát hiện đường may sườn áo polo bị nhảy mũi liên tục, lập tức báo cho Tổ trưởng và Kỹ thuật viên cơ điện kiểm tra điều chỉnh chân vịt và độ căng chỉ.",
    level: "HSK3-4 (Trung cấp Chuyên ngành)",
    characters: [
      { name: "缝纫工 (Công nhân may)", role: "Thợ may chuyền 2" },
      { name: "机修师傅 (Thợ Cơ điện)", role: "Kỹ thuật sửa máy" }
    ],
    lines: [
      {
        speaker: "缝纫工",
        role: "Công nhân may",
        hanzi: "师傅，快来帮我看看！这台平缝机缝制侧缝时老是跳针，底线也很松。",
        pinyin: "Shīfu, kuài lái bāng wǒ kànkan! Zhè tái píngfèngjī fèngzhì cèfèng shí lǎoshi tiàozhēn, dǐxiàn yě hěn sōng.",
        vietnamese: "Thợ máy ơi, mau qua xem giúp em với! Chiếc máy may 1 kim này lúc may sườn áo cứ liên tục bị nhảy mũi (bỏ mũi), chỉ dưới cũng rất lỏng.",
        keyPhrase: "平缝机 / 跳针 (píngfèngjī / tiàozhēn - máy may 1 kim / nhảy mũi)"
      },
      {
        speaker: "机修师傅",
        role: "Thợ cơ điện",
        hanzi: "好的，你先停机，别踩踏板。我看看是不是机针弯了或者旋梭间隙不对。",
        pinyin: "Hǎo de, nǐ xiān tíngjī, bié cǎi tàbǎn. Wǒ kànkan shì bu shì jīzhēn wān le huòzhě xuánsuō jiànxì bú duì.",
        vietnamese: "Được rồi, em tắt máy trước đi, đừng đạp bàn đạp. Để anh xem có phải kim may bị cong hoặc khe hở ổ chao không chuẩn.",
        keyPhrase: "机针 / 旋梭间隙 (jīzhēn / xuánsuō jiànxì - kim máy may / khe hở ổ chao)"
      },
      {
        speaker: "缝纫工",
        role: "Công nhân may",
        hanzi: "今天面料是高弹力的莱卡棉，是不是机针型号太粗了？",
        pinyin: "Jīntiān miànliào shì gāo tánlì de láikǎ mián, shì bu shì jīzhēn xínghào tài cū le?",
        vietnamese: "Hôm nay vải là cotton Lycra co giãn cao, có phải số kim may hơi bị to quá không anh?",
        keyPhrase: "高弹力莱卡棉 (gāo tánlì láikǎ mián - cotton Lycra co giãn cao)"
      },
      {
        speaker: "机修师傅",
        role: "Thợ cơ điện",
        hanzi: "你说得对！针头磨损了，而且应该换成9号圆头防跳针针。我再帮你调一下夹线器张力。",
        pinyin: "Nǐ shuō de duì! Zhēntóu mósǔn le, érqiě yīnggāi huàn chéng jiǔ hào yuántóu fángtiàozhēn zhēn. Wǒ zài bāng nǐ tiáo yíxià jiāxiànqì zhānglì.",
        vietnamese: "Em nói chuẩn đấy! Đầu kim bị mòn rồi, hơn nữa phải đổi sang kim đầu tròn số 9 chuyên chống nhảy mũi. Anh sẽ chỉnh thêm độ căng cụm đồng tiền kẹp chỉ nữa.",
        keyPhrase: "防跳针针 / 夹线器张力 (fángtiàozhēn zhēn / jiāxiànqì zhānglì - kim chống bỏ mũi / sức căng đồng tiền kẹp chỉ)"
      },
      {
        speaker: "机修师傅",
        role: "Thợ cơ điện",
        hanzi: "调好了！你拿这块废布试缝两条线，看看针距和线迹平整度怎么样。",
        pinyin: "Tiáo hǎo le! Nǐ ná zhè kuài fèibù shìfèng liǎng tiáo xiàn, kànkan zhēnjù hé xiànjì píngzhěngdù zěnmeyàng.",
        vietnamese: "Chỉnh xong rồi! Em lấy miếng vải vụn này may thử 2 đường xem mật độ mũi chỉ (SPI) và độ êm phẳng đường may thế nào nhé.",
        keyPhrase: "试缝 / 针距 (shìfèng / zhēnjù - may thử / khoảng cách mật độ mũi chỉ)"
      },
      {
        speaker: "缝纫工",
        role: "Công nhân may",
        hanzi: "线迹非常漂亮，完全不跳针了！太感谢师傅了！",
        pinyin: "Xiànjì fēicháng piàoliang, wánquán bù tiàozhēn le! Tài gǎnxiè shīfu le!",
        vietnamese: "Đường chỉ rất đẹp, hoàn toàn không bị nhảy mũi nữa rồi! Cảm ơn anh thợ máy nhiều lắm!"
      }
    ],
    keyVocabulary: [
      { hanzi: "平缝机", pinyin: "píngfèngjī", vietnamese: "Máy may 1 kim bằng" },
      { hanzi: "跳针", pinyin: "tiàozhēn", vietnamese: "Nhảy mũi, bỏ mũi chỉ" },
      { hanzi: "机针", pinyin: "jīzhēn", vietnamese: "Kim máy may" },
      { hanzi: "旋梭", pinyin: "xuánsuō", vietnamese: "Ổ chao máy may" },
      { hanzi: "线迹", pinyin: "xiànjì", vietnamese: "Đường chỉ may, mũi may" },
      { hanzi: "针距", pinyin: "zhēnjù", vietnamese: "Mật độ mũi chỉ (SPI)" }
    ],
    culturalTips: "Trong nhà máy may xuất khẩu, thuật ngữ '跳针' (nhảy mũi) và '断线' (đứt chỉ) là hai lỗi phổ biến nhất ở công đoạn may vắt sổ và may 1 kim. Nắm vững thuật ngữ giúp giao tiếp nhanh chóng với chuyên gia kỹ thuật Trung Quốc."
  },
  {
    id: "sit_garment_2",
    categoryId: "garment_factory",
    categoryName: "Chuyên ngành May mặc & Xưởng",
    categoryIcon: "Scissors",
    badgeColor: "bg-emerald-600",
    title: "Kiểm tra chất lượng thành phẩm (QC) theo Techpack",
    vietnameseTitle: "Tình huống Chuyên ngành 2: Nghiệm thu áo mẫu và kiểm tra dung sai AQL",
    scenarioDescription: "Chuyên viên QC đối chiếu áo mẫu đầu chuyền với bảng thông số kỹ thuật (Techpack), kiểm tra kích thước cổ áo, vòng ngực và độ bền màu.",
    level: "HSK4-5 (Trung cấp - Nâng cao)",
    characters: [
      { name: "QC主管 (Chủ quản QC)", role: "Quản lý chất lượng" },
      { name: "车间组长 (Tổ trưởng Chuyền)", role: "Quản lý sản xuất" }
    ],
    lines: [
      {
        speaker: "QC主管",
        role: "Chủ quản QC",
        hanzi: "组长，我们抽检了这批刚下线的夹克首件样衣，胸围尺寸超出公差范围了。",
        pinyin: "Zǔzhǎng, wǒmen chōujiǎn le zhè pī gāng xiàxiàn de jiákè shǒujiàn yàngyī, xiōngwéi chǐcun chāochū gōngchā fànwéi le.",
        vietnamese: "Tổ trưởng ơi, chúng tôi đã rút kiểm mẫu áo jacket đầu chuyền vừa hoàn tất, kích thước vòng ngực bị vượt quá phạm vi dung sai rồi.",
        keyPhrase: "首件样衣 / 公差 (shǒujiàn yàngyī / gōngchā - mẫu đầu chuyền / dung sai cho phép)"
      },
      {
        speaker: "车间组长",
        role: "Tổ trưởng Chuyền",
        hanzi: "超了多少？工艺单上标明的公差是正负零点五厘米。",
        pinyin: "Chāo le duōshao? Gōngyìdān shàng biāomíng de gōngchā shì zhèngfù líng diǎn wǔ límǐ.",
        vietnamese: "Vượt bao nhiêu vậy? Trên bảng tài liệu kỹ thuật (Techpack) dung sai quy định là ±0.5cm.",
        keyPhrase: "工艺单 / 正负零点五厘米 (gōngyìdān / zhèngfù líng diǎn wǔ límǐ - Techpack / ±0.5cm)"
      },
      {
        speaker: "QC主管",
        role: "Chủ quản QC",
        hanzi: "实测大了1.2厘米。我检查了一下，是后道熨烫工拉伸过度导致的，面料热缩回弹没掌握好。",
        pinyin: "Shícè dà le 1.2 límǐ. Wǒ jiǎnchá le yíxià, shì hòudào yùntànggōng lāshēn guòdù dǎozhì de, miànliào rèsuō huítán méi zhǎngwò hǎo.",
        vietnamese: "Đo thực tế bị rộng hơn 1.2cm. Tôi kiểm tra thì thấy do thợ ủi kéo căng quá tay ở khâu ủi định hình, chưa kiểm soát tốt độ co giãn nhiệt của vải.",
        keyPhrase: "熨烫过度 / 热缩回弹 (yùntàng guòdù / rèsuō huítán - ủi quá tay / co rút đàn hồi do nhiệt)"
      },
      {
        speaker: "车间组长",
        role: "Tổ trưởng Chuyền",
        hanzi: "明白！我马上通知后道烫工重新校准蒸汽温度和熨烫手法，并对这一扎全部复检。",
        pinyin: "Míngbai! Wǒ mǎshàng tōngzhī hòudào tànggōng chóngxīn jiàozhǔn zhēngqì wēndù hé yùntàng shǒufǎ, bìng duì zhè yì zhā quánbù fùjiǎn.",
        vietnamese: "Tôi hiểu rồi! Tôi sẽ thông báo ngay cho thợ ủi hiệu chỉnh lại nhiệt độ hơi nước và thao tác ủi, đồng thời tái kiểm tra toàn bộ bó hàng này.",
        keyPhrase: "复检 / 校准 (fùjiǎn / jiàozhǔn - tái kiểm / hiệu chuẩn)"
      }
    ],
    keyVocabulary: [
      { hanzi: "抽检", pinyin: "chōujiǎn", vietnamese: "Rút mẫu kiểm tra ngẫu nhiên" },
      { hanzi: "首件", pinyin: "shǒujiàn", vietnamese: "Sản phẩm đầu tiên (First Article)" },
      { hanzi: "工艺单", pinyin: "gōngyìdān", vietnamese: "Tài liệu thông số kỹ thuật (Techpack)" },
      { hanzi: "公差", pinyin: "gōngchā", vietnamese: "Dung sai kích thước cho phép" },
      { hanzi: "熨烫", pinyin: "yùntàng", vietnamese: "Ủi là hơi nước" },
      { hanzi: "复检", pinyin: "fùjiǎn", vietnamese: "Kiểm tra lại toàn diện (Re-inspection)" }
    ],
    culturalTips: "Quy tắc kiểm tra AQL (Acceptable Quality Limit) là tiêu chuẩn vàng toàn cầu mà mọi nhà máy may đều áp dụng khi làm việc với khách hàng Trung Quốc, Âu Mỹ và Nhật Bản."
  }
];
