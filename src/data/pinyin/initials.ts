export interface PinyinInitialItem {
  id: string;
  initial: string; // b, p, m, f, d, t, n, l, g, k, h, j, q, x, zh, ch, sh, r, z, c, s, y, w
  group:'lip' |'tongue_tip' |'tongue_root' |'tongue_surface' |'flat_tongue' |'retroflex' |'special';
  groupName: string;
  vietnameseApproximation: string;
  isAspirated: boolean; // Có bật hơi hay không (p, t, k, q, c, ch)
  mouthShapeDescription: string;
  pronunciationTips: string;
  commonMistakes: string;
  audioExample: string; // text to pronounce, e.g."bō"
  exampleWords: {
    hanzi: string;
    pinyin: string;
    vietnamese: string;
  }[];
}

export const PINYIN_INITIALS: PinyinInitialItem[] = [
  // 1. ÂM MÔI (唇音)
  {
    id:"b",
    initial:"b",
    group:"lip",
    groupName:"Âm môi - môi (Hai môi khép)",
    vietnameseApproximation:"Gần giống âm'P' nhẹ hoặc'B' nghẹn trong tiếng Việt (không bật hơi)",
    isAspirated: false,
    mouthShapeDescription:"Hai môi khép chặt chặn luồng hơi, sau đó mở nhẹ ra để âm thoát ra, dây thanh rung.",
    pronunciationTips:"Khi phát âm đọc là'bua' (bō). Không thổi hơi ra mạnh.",
    commonMistakes:"Tránh đọc thành âm'B' thuần của tiếng Việt (có độ rung quá đậm).",
    audioExample:"bō",
    exampleWords: [
      { hanzi:"爸爸", pinyin:"bàba", vietnamese:"Bố, ba" },
      { hanzi:"包子", pinyin:"bāozi", vietnamese:"Bánh bao" },
      { hanzi:"杯子", pinyin:"bēizi", vietnamese:"Cốc, ly" },
      { hanzi:"布料", pinyin:"bùliào", vietnamese:"Vải may" }
    ]
  },
  {
    id:"p",
    initial:"p",
    group:"lip",
    groupName:"Âm môi - môi (BẬT HƠI MẠNH)",
    vietnameseApproximation:"Giống âm'P' tiếng Việt nhưng BẬT HƠI cực mạnh ra khỏi miệng",
    isAspirated: true,
    mouthShapeDescription:"Hai môi khép chặt tích tụ luồng khí trong khoang miệng, sau đó bật tung hai môi giải phóng luồng hơi mạnh.",
    pronunciationTips:"Đặt một tờ giấy trước miệng, phát âm'pō', tờ giấy phải bay mạnh thì mới chuẩn.",
    commonMistakes:"Quên bật hơi khiến người nghe nhầm thành âm'b'.",
    audioExample:"pō",
    exampleWords: [
      { hanzi:"朋友", pinyin:"péngyou", vietnamese:"Bạn bè" },
      { hanzi:"苹果", pinyin:"píngguǒ", vietnamese:"Quả táo" },
      { hanzi:"排版", pinyin:"páibǎn", vietnamese:"Sắp xếp rập / Layout" },
      { hanzi:"漂亮", pinyin:"piàoliang", vietnamese:"Xinh đẹp" }
    ]
  },
  {
    id:"m",
    initial:"m",
    group:"lip",
    groupName:"Âm môi - mũi",
    vietnameseApproximation:"Giống hệt âm'M' trong tiếng Việt (mẹ, mua)",
    isAspirated: false,
    mouthShapeDescription:"Hai môi khép kín, luồng hơi đi qua khoang mũi tạo âm vang nhẹ, dây thanh rung.",
    pronunciationTips:"Đọc là'mō'. Rất tự nhiên giống tiếng Việt.",
    commonMistakes:"Âm này rất dễ, người Việt hầu như không mắc lỗi.",
    audioExample:"mō",
    exampleWords: [
      { hanzi:"妈妈", pinyin:"māma", vietnamese:"Mẹ" },
      { hanzi:"买", pinyin:"mǎi", vietnamese:"Mua" },
      { hanzi:"帽子", pinyin:"màozi", vietnamese:"Cái mũ, nón" },
      { hanzi:"棉花", pinyin:"miánhua", vietnamese:"Bông sợi cotton" }
    ]
  },
  {
    id:"f",
    initial:"f",
    group:"lip",
    groupName:"Âm răng - môi (Răng trên chạm môi dưới)",
    vietnameseApproximation:"Giống hệt âm'Ph' trong tiếng Việt (phở, phát)",
    isAspirated: false,
    mouthShapeDescription:"Răng cửa hàm trên chạm nhẹ vào môi dưới, đẩy luồng hơi ma sát lọt qua kẽ răng.",
    pronunciationTips:"Đọc là'fō'. Ma sát nhẹ nhàng giữa răng và môi.",
    commonMistakes:"Cắn môi quá chặt khiến âm bị ngắt quãng.",
    audioExample:"fō",
    exampleWords: [
      { hanzi:"服装", pinyin:"fúzhuāng", vietnamese:"Trang phục may mặc" },
      { hanzi:"飞机", pinyin:"fēijī", vietnamese:"Máy bay" },
      { hanzi:"辅料", pinyin:"fǔliào", vietnamese:"Phụ liệu may" },
      { hanzi:"饭馆", pinyin:"fànguǎn", vietnamese:"Quán ăn" }
    ]
  },

  // 2. ÂM ĐẦU LƯỠI (舌尖音)
  {
    id:"d",
    initial:"d",
    group:"tongue_tip",
    groupName:"Âm đầu lưỡi giữa (Không bật hơi)",
    vietnameseApproximation:"Giống âm'T' trong tiếng Việt (tôi, ta, tay)",
    isAspirated: false,
    mouthShapeDescription:"Đầu lưỡi chạm chặt vào chân răng trên (lợi trên), hạ đầu lưỡi nhanh cho hơi thoát ra, không bật hơi.",
    pronunciationTips:"Đọc là'dē' (tưa). Âm gọn gàng, dứt khoát.",
    commonMistakes:"Tránh đọc thành âm'Đ' của tiếng Việt.",
    audioExample:"dē",
    exampleWords: [
      { hanzi:"大", pinyin:"dà", vietnamese:"To, lớn" },
      { hanzi:"弟弟", pinyin:"dìdi", vietnamese:"Em trai" },
      { hanzi:"单针", pinyin:"dānzhēn", vietnamese:"Máy 1 kim" },
      { hanzi:"电脑", pinyin:"diànnǎo", vietnamese:"Máy vi tính" }
    ]
  },
  {
    id:"t",
    initial:"t",
    group:"tongue_tip",
    groupName:"Âm đầu lưỡi giữa (BẬT HƠI MẠNH)",
    vietnameseApproximation:"Giống âm'Th' trong tiếng Việt (thơ, thu, thật) nhưng bật hơi sắc nét",
    isAspirated: true,
    mouthShapeDescription:"Vị trí lưỡi giống âm'd', nhưng khi hạ lưỡi phải tống luồng hơi mạnh ra ngoài.",
    pronunciationTips:"Đọc là'tē' (thưa). Thử thổi nến hoặc làm rung tờ giấy trước miệng.",
    commonMistakes:"Bật hơi quá yếu khiến nghe như âm'd' (t).",
    audioExample:"tē",
    exampleWords: [
      { hanzi:"太阳", pinyin:"tàiyáng", vietnamese:"Mặt trời" },
      { hanzi:"听", pinyin:"tīng", vietnamese:"Nghe" },
      { hanzi:"套结", pinyin:"tàojié", vietnamese:"Đánh bọ (Bartack)" },
      { hanzi:"天气", pinyin:"tiānqì", vietnamese:"Thời tiết" }
    ]
  },
  {
    id:"n",
    initial:"n",
    group:"tongue_tip",
    groupName:"Âm đầu lưỡi - mũi",
    vietnameseApproximation:"Giống âm'N' trong tiếng Việt (nắng, no, nụ)",
    isAspirated: false,
    mouthShapeDescription:"Đầu lưỡi áp vào lợi trên, hơi thoát ra qua mũi tạo độ vang mũi rõ.",
    pronunciationTips:"Đọc là'nē' (nưa).",
    commonMistakes:"Tránh nhầm lẫn với âm'l' (nhất là người nói giọng địa phương).",
    audioExample:"nē",
    exampleWords: [
      { hanzi:"你", pinyin:"nǐ", vietnamese:"Bạn, anh, chị" },
      { hanzi:"牛奶", pinyin:"niúnǎi", vietnamese:"Sữa bò" },
      { hanzi:"女装", pinyin:"nǚzhuāng", vietnamese:"Thời trang nữ" },
      { hanzi:"难", pinyin:"nán", vietnamese:"Khó" }
    ]
  },
  {
    id:"l",
    initial:"l",
    group:"tongue_tip",
    groupName:"Âm đầu lưỡi - cạnh lưỡi",
    vietnameseApproximation:"Giống âm'L' trong tiếng Việt (lá, lúa, làm)",
    isAspirated: false,
    mouthShapeDescription:"Đầu lưỡi chạm lợi trên, hơi lách thoát ra ở hai bên mép cạnh lưỡi.",
    pronunciationTips:"Đọc là'lē' (lưa).",
    commonMistakes:"Tránh nhầm với'n'.",
    audioExample:"lē",
    exampleWords: [
      { hanzi:"拉链", pinyin:"lāliàn", vietnamese:"Dây khóa kéo (Zipper)" },
      { hanzi:"老师", pinyin:"lǎoshī", vietnamese:"Thầy/cô giáo" },
      { hanzi:"领子", pinyin:"lǐngzi", vietnamese:"Cổ áo (Collar)" },
      { hanzi:"冷", pinyin:"lěng", vietnamese:"Lạnh" }
    ]
  },

  // 3. ÂM CUỐNG LƯỠI (舌根音)
  {
    id:"g",
    initial:"g",
    group:"tongue_root",
    groupName:"Âm cuống lưỡi (Không bật hơi)",
    vietnameseApproximation:"Giống âm'C' hoặc'K' trong tiếng Việt (cá, kẹo, con)",
    isAspirated: false,
    mouthShapeDescription:"Cuống lưỡi nâng lên áp sát vào vòm họng mềm chặn hơi, rồi hạ nhanh cho hơi thoát ra, không bật hơi.",
    pronunciationTips:"Đọc là'gē' (cưa). Âm phát ra từ sâu trong cuống họng.",
    commonMistakes:"Tránh đọc thành âm'G' của tiếng Việt (gà, gỗ).",
    audioExample:"gē",
    exampleWords: [
      { hanzi:"哥哥", pinyin:"gēge", vietnamese:"Anh trai" },
      { hanzi:"工作", pinyin:"gōngzuò", vietnamese:"Công việc" },
      { hanzi:"工艺", pinyin:"gōngyì", vietnamese:"Công nghệ / Quy trình may" },
      { hanzi:"高兴", pinyin:"gāoxìng", vietnamese:"Vui vẻ" }
    ]
  },
  {
    id:"k",
    initial:"k",
    group:"tongue_root",
    groupName:"Âm cuống lưỡi (BẬT HƠI MẠNH)",
    vietnameseApproximation:"Giống âm'Kh' trong tiếng Việt nhưng bật hơi rất mạnh từ cuống họng",
    isAspirated: true,
    mouthShapeDescription:"Vị trí cuống lưỡi giống âm'g', nhưng giải phóng một luồng hơi cực mạnh từ cuống họng.",
    pronunciationTips:"Đọc là'kē' (khưa bật hơi). Hơi bật mạnh làm lay động tờ giấy.",
    commonMistakes:"Phát âm như'Kh' nhẹ miền Nam không có luồng hơi giật mạnh.",
    audioExample:"kē",
    exampleWords: [
      { hanzi:"看", pinyin:"kàn", vietnamese:"Xem, nhìn" },
      { hanzi:"咖啡", pinyin:"kāfēi", vietnamese:"Cà phê" },
      { hanzi:"开机", pinyin:"kāijī", vietnamese:"Mở máy / Bật máy" },
      { hanzi:"裤子", pinyin:"kùzi", vietnamese:"Quần dài" }
    ]
  },
  {
    id:"h",
    initial:"h",
    group:"tongue_root",
    groupName:"Âm cuống lưỡi ma sát",
    vietnameseApproximation:"Nằm giữa âm'H' và'Kh' nhẹ trong tiếng Việt",
    isAspirated: false,
    mouthShapeDescription:"Cuống lưỡi nâng lên gần vòm họng mềm để luồng hơi cọ xát đi qua, tạo tiếng khè nhẹ.",
    pronunciationTips:"Đọc là'hē' (hưa/khưa nhẹ). Khi nói nhanh có thể đọc tựa âm'H'.",
    commonMistakes:"Đọc thành âm'H' quá nhẹ như'hát' trong tiếng Việt, cần có ma sát nhẹ ở cổ.",
    audioExample:"hē",
    exampleWords: [
      { hanzi:"好", pinyin:"hǎo", vietnamese:"Tốt, đẹp" },
      { hanzi:"喝水", pinyin:"hē shuǐ", vietnamese:"Uống nước" },
      { hanzi:"合格", pinyin:"hégé", vietnamese:"Đạt chuẩn chất lượng (QC Pass)" },
      { hanzi:"红色", pinyin:"hóngsè", vietnamese:"Màu đỏ" }
    ]
  },

  // 4. ÂM MẶT LƯỠI (舌面音 - j, q, x)
  {
    id:"j",
    initial:"j",
    group:"tongue_surface",
    groupName:"Âm mặt lưỡi (Không bật hơi)",
    vietnameseApproximation:"Gần giống âm'Chi' hoặc'Ch' nhẹ trong tiếng Việt",
    isAspirated: false,
    mouthShapeDescription:"Mặt trước của thân lưỡi áp sát vào vòm miệng cứng, khóe miệng kéo bè sang hai bên như đang cười.",
    pronunciationTips:"Đọc là'jī' (chi). Miệng bẹt sang hai bên, không bao giờ tròn môi.",
    commonMistakes:"Tròn môi khi phát âm là sai; phải bẹt miệng.",
    audioExample:"jī",
    exampleWords: [
      { hanzi:"机器", pinyin:"jīqì", vietnamese:"Máy móc công nghiệp" },
      { hanzi:"几", pinyin:"jǐ", vietnamese:"Mấy, bao nhiêu" },
      { hanzi:"剪刀", pinyin:"jiǎndāo", vietnamese:"Cái kéo cắt may" },
      { hanzi:"件", pinyin:"jiàn", vietnamese:"Chiếc / Cái (lượng từ áo)" }
    ]
  },
  {
    id:"q",
    initial:"q",
    group:"tongue_surface",
    groupName:"Âm mặt lưỡi (BẬT HƠI CỰC MẠNH)",
    vietnameseApproximation:"Giống âm'Ch' nhưng BẬT HƠI lách qua kẽ răng cực mạnh",
    isAspirated: true,
    mouthShapeDescription:"Vị trí miệng và lưỡi y hệt âm'j', nhưng phun luồng hơi cực mạnh qua khe hở.",
    pronunciationTips:"Đọc là'qī'. Đặt ngón tay trước môi, phải cảm nhận luồng gió xì mạnh.",
    commonMistakes:"Dễ bị nhầm với âm'j' nếu không bật hơi.",
    audioExample:"qī",
    exampleWords: [
      { hanzi:"去", pinyin:"qù", vietnamese:"Đi" },
      { hanzi:"请", pinyin:"qǐng", vietnamese:"Xin, mời" },
      { hanzi:"裁剪", pinyin:"cáijiǎn", vietnamese:"Cắt vải, cắt rập" },
      { hanzi:"期", pinyin:"qī", vietnamese:"Thời hạn / Giai đoạn" }
    ]
  },
  {
    id:"x",
    initial:"x",
    group:"tongue_surface",
    groupName:"Âm mặt lưỡi ma sát",
    vietnameseApproximation:"Giống âm'X' hoặc'Xi' nhẹ trong tiếng Việt (xinh, xoe)",
    isAspirated: false,
    mouthShapeDescription:"Mặt lưỡi nâng cao gần vòm miệng cứng tạo khe hẹp cho luồng hơi ma sát thoát ra, miệng bẹt.",
    pronunciationTips:"Đọc là'xī' (xi). Khóe môi mỉm cười nhẹ.",
    commonMistakes:"Tròn môi khi phát âm.",
    audioExample:"xī",
    exampleWords: [
      { hanzi:"谢谢", pinyin:"xièxie", vietnamese:"Cảm ơn" },
      { hanzi:"小", pinyin:"xiǎo", vietnamese:"Nhỏ, bé" },
      { hanzi:"线", pinyin:"xiàn", vietnamese:"Sợi chỉ may (Sewing thread)" },
      { hanzi:"星期", pinyin:"xīngqī", vietnamese:"Tuần lễ" }
    ]
  },

  // 5. ÂM ĐẦU LƯỠI TRƯỚC / ÂM RĂNG (舌尖前音 - z, c, s)
  {
    id:"z",
    initial:"z",
    group:"flat_tongue",
    groupName:"Âm đầu lưỡi trước / thẳng lưỡi (Không bật hơi)",
    vietnameseApproximation:"Gần giống âm'Tr' nhẹ hoặc'D/Z' trong tiếng Việt (đầu lưỡi thẳng)",
    isAspirated: false,
    mouthShapeDescription:"Đầu lưỡi thẳng duỗi ra chạm mặt sau răng cửa trên, răng khép hờ, hơi bật nhẹ không gió mạnh.",
    pronunciationTips:"Đọc là'zī' (chữ'i' sau z/c/s phát âm như'ư' trong tiếng Việt). Đọc là'zư'.",
    commonMistakes:"Uốn lưỡi là sai. Đầu lưỡi phải thẳng áp sát răng.",
    audioExample:"zī",
    exampleWords: [
      { hanzi:"早上", pinyin:"zǎoshang", vietnamese:"Buổi sáng" },
      { hanzi:"在", pinyin:"zài", vietnamese:"Ở, tại, đang" },
      { hanzi:"再见", pinyin:"zàijiàn", vietnamese:"Tạm biệt" },
      { hanzi:"自动", pinyin:"zìdòng", vietnamese:"Tự động" }
    ]
  },
  {
    id:"c",
    initial:"c",
    group:"flat_tongue",
    groupName:"Âm đầu lưỡi trước (BẬT HƠI XÌ MẠNH)",
    vietnameseApproximation:"Đầu lưỡi thẳng cắn nhẹ răng, BẬT HƠI xì'th-s' cực mạnh",
    isAspirated: true,
    mouthShapeDescription:"Đầu lưỡi chạm răng trên như âm'z', nhưng ép luồng hơi nén bật mạnh tạo tiếng'xì' sắc nhọn.",
    pronunciationTips:"Đọc là'cī' (cư bật hơi). Một trong các âm khó nhất với người Việt.",
    commonMistakes:"Không bật hơi khiến nghe giống âm'z' hoặc's'.",
    audioExample:"cī",
    exampleWords: [
      { hanzi:"菜", pinyin:"cài", vietnamese:"Món ăn, rau" },
      { hanzi:"次", pinyin:"cì", vietnamese:"Lần, lượt" },
      { hanzi:"尺寸", pinyin:"chǐcun", vietnamese:"Kích thước thông số (Size)" },
      { hanzi:"车缝", pinyin:"chēféng", vietnamese:"May ráp chuyền" }
    ]
  },
  {
    id:"s",
    initial:"s",
    group:"flat_tongue",
    groupName:"Âm đầu lưỡi trước ma sát xì hơi",
    vietnameseApproximation:"Giống âm'X' hoặc'S' nhẹ trong tiếng Việt (xì, xoe)",
    isAspirated: false,
    mouthShapeDescription:"Đầu lưỡi thẳng tiến sát mặt sau răng dưới, luồng hơi lách qua khe răng xì ra nhẹ nhàng.",
    pronunciationTips:"Đọc là'sī' (sư). Lưỡi thả lỏng thẳng, răng khép hờ.",
    commonMistakes:"Tránh uốn lưỡi (nếu uốn lưỡi sẽ thành âm'sh').",
    audioExample:"sī",
    exampleWords: [
      { hanzi:"四", pinyin:"sì", vietnamese:"Số 4" },
      { hanzi:"岁", pinyin:"suì", vietnamese:"Tuổi" },
      { hanzi:"锁边", pinyin:"suǒbiān", vietnamese:"Vắt sổ (Overlock)" },
      { hanzi:"三", pinyin:"sān", vietnamese:"Số 3" }
    ]
  },

  // 6. ÂM ĐẦU LƯỠI SAU / UỐN LƯỠI (舌尖后音 - zh, ch, sh, r)
  {
    id:"zh",
    initial:"zh",
    group:"retroflex",
    groupName:"Âm uốn lưỡi sâu (Không bật hơi)",
    vietnameseApproximation:"Uốn cong đầu lưỡi lên ngạc cứng, phát âm như'Tr' nặng miền Trung / Nam",
    isAspirated: false,
    mouthShapeDescription:"Đầu lưỡi uốn cong lên chạm vòm ngạc cứng bên trên, hạ nhẹ lưỡi cho hơi thoát ra, không bật hơi mạnh.",
    pronunciationTips:"Đọc là'zhī' (trư uốn lưỡi). Luôn giữ đầu lưỡi cong vào trong vòm miệng.",
    commonMistakes:"Quên uốn lưỡi khiến âm biến thành âm'z'.",
    audioExample:"zhī",
    exampleWords: [
      { hanzi:"中国", pinyin:"Zhōngguó", vietnamese:"Trung Quốc" },
      { hanzi:"知道", pinyin:"zhīdào", vietnamese:"Biết" },
      { hanzi:"针", pinyin:"zhēn", vietnamese:"Cây kim may" },
      { hanzi:"这", pinyin:"zhè", vietnamese:"Đây, này" }
    ]
  },
  {
    id:"ch",
    initial:"ch",
    group:"retroflex",
    groupName:"Âm uốn lưỡi sâu (BẬT HƠI MẠNH)",
    vietnameseApproximation:"Uốn cong đầu lưỡi lên vòm họng + BẬT HƠI cực mạnh",
    isAspirated: true,
    mouthShapeDescription:"Đầu lưỡi cong uốn lên ngạc cứng giống'zh', nhưng ép một luồng hơi cực mạnh đẩy bung ra ngoài.",
    pronunciationTips:"Đọc là'chī' (trư uốn lưỡi bật hơi).",
    commonMistakes:"Uốn lưỡi nhưng quên bật hơi (thành zh), hoặc bật hơi mà không uốn lưỡi (thành c).",
    audioExample:"chī",
    exampleWords: [
      { hanzi:"吃", pinyin:"chī", vietnamese:"Ăn" },
      { hanzi:"车间", pinyin:"chējiān", vietnamese:"Nhà xưởng sản xuất" },
      { hanzi:"出货", pinyin:"chūhuò", vietnamese:"Xuất hàng, giao hàng" },
      { hanzi:"茶", pinyin:"chá", vietnamese:"Trà" }
    ]
  },
  {
    id:"sh",
    initial:"sh",
    group:"retroflex",
    groupName:"Âm uốn lưỡi ma sát gió",
    vietnameseApproximation:"Uốn cong đầu lưỡi, phát âm như'S' nặng tiếng Việt (sông, súng)",
    isAspirated: false,
    mouthShapeDescription:"Đầu lưỡi cong sát ngạc cứng tạo khe hở hẹp, luồng hơi ma sát ào qua tạo tiếng xào xạc.",
    pronunciationTips:"Đọc là'shī' (sư uốn lưỡi).",
    commonMistakes:"Không uốn lưỡi khiến thành âm's' thẳng lưỡi.",
    audioExample:"shī",
    exampleWords: [
      { hanzi:"是", pinyin:"shì", vietnamese:"Là, đúng" },
      { hanzi:"十", pinyin:"shí", vietnamese:"Số 10" },
      { hanzi:"手套", pinyin:"shǒutào", vietnamese:"Găng tay bảo hộ" },
      { hanzi:"水", pinyin:"shuǐ", vietnamese:"Nước" }
    ]
  },
  {
    id:"r",
    initial:"r",
    group:"retroflex",
    groupName:"Âm uốn lưỡi rung thanh quản",
    vietnameseApproximation:"Nằm giữa âm'R' miền Nam và âm'J/D' uốn lưỡi",
    isAspirated: false,
    mouthShapeDescription:"Vị trí lưỡi uốn cong giống'sh', nhưng dây thanh quản rung mạnh tạo độ rền trong cổ họng.",
    pronunciationTips:"Đọc là'rī' (rư uốn lưỡi). Rung nhẹ dây thanh.",
    commonMistakes:"Rung lưỡi quá đà như tiếng Pháp/Nga hoặc phát âm thành'd' bẹt.",
    audioExample:"rī",
    exampleWords: [
      { hanzi:"人", pinyin:"rén", vietnamese:"Người" },
      { hanzi:"日", pinyin:"rì", vietnamese:"Ngày, mặt trời" },
      { hanzi:"热", pinyin:"rè", vietnamese:"Nóng" },
      { hanzi:"染色", pinyin:"rǎnsè", vietnamese:"Nhuộm màu sợi vải" }
    ]
  },

  // 7. PHỤ ÂM ĐẶC BIỆT / BÁN NGUYÊN ÂM (y, w)
  {
    id:"y",
    initial:"y",
    group:"special",
    groupName:"Bán nguyên âm (Đứng đầu khi không có thanh mẫu cho'i' hoặc'ü')",
    vietnameseApproximation:"Phát âm như'D' nhẹ hoặc'I' nguyên âm trong tiếng Việt (yêu, yên)",
    isAspirated: false,
    mouthShapeDescription:"Hình môi bẹt ngang, phát âm bắt đầu từ vị trí nguyên âm /i/ trượt sang nguyên âm sau.",
    pronunciationTips:"Ví dụ: yi = i, ya = ia, ye = ie, yue = üe.",
    commonMistakes:"Đọc gằn thành âm'Z' hoặc'Gi' nặng.",
    audioExample:"yī",
    exampleWords: [
      { hanzi:"一", pinyin:"yī", vietnamese:"Số 1" },
      { hanzi:"衣服", pinyin:"yīfu", vietnamese:"Quần áo" },
      { hanzi:"样板", pinyin:"yàngbǎn", vietnamese:"Rập mẫu / Áo mẫu (Sample)" },
      { hanzi:"月", pinyin:"yuè", vietnamese:"Tháng, mặt trăng" }
    ]
  },
  {
    id:"w",
    initial:"w",
    group:"special",
    groupName:"Bán nguyên âm (Đứng đầu khi không có thanh mẫu cho'u')",
    vietnameseApproximation:"Phát âm như âm'Qu' nhẹ hoặc'U' trong tiếng Việt (hoa, qua, uể)",
    isAspirated: false,
    mouthShapeDescription:"Tròn môi chúm lại ở vị trí nguyên âm /u/, trượt mượt mà sang vần kế tiếp.",
    pronunciationTips:"Ví dụ: wu = u, wa = ua, wo = uo, wei = uei.",
    commonMistakes:"Đọc thành âm'V' của tiếng Việt là sai.",
    audioExample:"wū",
    exampleWords: [
      { hanzi:"五", pinyin:"wǔ", vietnamese:"Số 5" },
      { hanzi:"我", pinyin:"wǒ", vietnamese:"Tôi, ta" },
      { hanzi:"外销", pinyin:"wàixiāo", vietnamese:"Xuất khẩu may mặc" },
      { hanzi:"问题", pinyin:"wèntí", vietnamese:"Vấn đề, câu hỏi" }
    ]
  }
];
