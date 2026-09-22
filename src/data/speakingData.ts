export interface DetailedSpeakingPrompt {
  id: string;
  hanzi: string;
  pinyin: string;
  vietnamese: string;
  difficulty: "HSK1" | "HSK2" | "HSK3" | "HSK4" | "HSK5" | "HSK6" | "GARMENT";
  category: string;
  keyPhonetics?: {
    char: string;
    pinyin: string;
    tone: number;
    guide: string;
  }[];
}

export const COMPREHENSIVE_SPEAKING_PROMPTS: DetailedSpeakingPrompt[] = [
  // =================================================================
  // HSK 1: Giao tiếp nền tảng, chào hỏi, số đếm, gia đình, nơi chốn
  // =================================================================
  {
    id: "sp_hsk1_1",
    hanzi: "你好！很高兴认识你！",
    pinyin: "Nǐ hǎo! Hěn gāoxìng rènshi nǐ!",
    vietnamese: "Xin chào! Rất vui được làm quen với bạn!",
    difficulty: "HSK1",
    category: "Chào hỏi & Xã giao",
    keyPhonetics: [
      { char: "你", pinyin: "nǐ", tone: 3, guide: "Thanh 3 biến điệu nhẹ thành nửa thanh 3 khi đi trước thanh 3" },
      { char: "好", pinyin: "hǎo", tone: 3, guide: "Thanh 3 hạ xuống đáy rồi hơi vút lên" },
      { char: "高", pinyin: "gāo", tone: 1, guide: "Thanh 1 phát âm cao đều và phẳng (55)" },
      { char: "兴", pinyin: "xìng", tone: 4, guide: "Thanh 4 dứt khoát từ cao xuống thấp (51)" }
    ]
  },
  {
    id: "sp_hsk1_2",
    hanzi: "请问，你叫什么名字？",
    pinyin: "Qǐngwèn, nǐ jiào shénme míngzi?",
    vietnamese: "Xin hỏi, bạn tên là gì?",
    difficulty: "HSK1",
    category: "Hỏi thăm & Giao lưu",
    keyPhonetics: [
      { char: "请", pinyin: "qǐng", tone: 3, guide: "Âm q bật hơi mạnh đầu lưỡi chạm răng dưới" },
      { char: "问", pinyin: "wèn", tone: 4, guide: "Thanh 4 ngắn gọn dứt khoát" },
      { char: "什", pinyin: "shén", tone: 2, guide: "Âm sh uốn lưỡi chạm vòm họng" }
    ]
  },
  {
    id: "sp_hsk1_3",
    hanzi: "我是越南人，我在工厂工作。",
    pinyin: "Wǒ shì Yuènán rén, wǒ zài gōngchǎng gōngzuò.",
    vietnamese: "Tôi là người Việt Nam, tôi làm việc ở nhà máy.",
    difficulty: "HSK1",
    category: "Giới thiệu bản thân",
    keyPhonetics: [
      { char: "是", pinyin: "shì", tone: 4, guide: "Âm sh uốn cong đầu lưỡi, thanh 4 rơi mạnh" },
      { char: "越", pinyin: "yuè", tone: 4, guide: "Tròn môi âm yu" },
      { char: "厂", pinyin: "chǎng", tone: 3, guide: "Âm ch uốn lưỡi và bật hơi mạnh" }
    ]
  },
  {
    id: "sp_hsk1_4",
    hanzi: "今天天气很好，我们一起去喝茶吧。",
    pinyin: "Jīntiān tiānqì hěn hǎo, wǒmen yìqǐ qù hē chá ba.",
    vietnamese: "Hôm nay thời tiết rất đẹp, chúng ta cùng đi uống trà nhé.",
    difficulty: "HSK1",
    category: "Đời sống thường nhật",
    keyPhonetics: [
      { char: "天", pinyin: "tiān", tone: 1, guide: "Âm t bật hơi đầu lưỡi, giữ thanh 1 cao đều" },
      { char: "气", pinyin: "qì", tone: 4, guide: "Âm q bật hơi dứt khoát" },
      { char: "喝", pinyin: "hē", tone: 1, guide: "Âm h xát nhẹ trong cuống họng" }
    ]
  },
  {
    id: "sp_hsk1_5",
    hanzi: "太谢谢你了！明天见！",
    pinyin: "Tài xièxie nǐ le! Míngtiān jiàn!",
    vietnamese: "Cảm ơn bạn nhiều lắm! Ngày mai gặp lại!",
    difficulty: "HSK1",
    category: "Chào hỏi & Cảm ơn",
    keyPhonetics: [
      { char: "谢", pinyin: "xiè", tone: 4, guide: "Mặt lưỡi áp vòm họng ngạc cứng" },
      { char: "明", pinyin: "míng", tone: 2, guide: "Thanh 2 vuốt bổng từ trung bình lên cao" }
    ]
  },
  {
    id: "sp_hsk1_6",
    hanzi: "我想买三件纯棉衣服。",
    pinyin: "Wǒ xiǎng mǎi sān jiàn chúnmián yīfu.",
    vietnamese: "Tôi muốn mua ba chiếc quần áo cotton 100%.",
    difficulty: "HSK1",
    category: "Mua sắm & Trang phục",
    keyPhonetics: [
      { char: "想", pinyin: "xiǎng", tone: 3, guide: "Mặt lưỡi dẹt, thanh 3 kéo sâu" },
      { char: "三", pinyin: "sān", tone: 1, guide: "Âm s đầu lưỡi phẳng thẳng" }
    ]
  },
  {
    id: "sp_hsk1_7",
    hanzi: "这个多少钱？可以便宜一点吗？",
    pinyin: "Zhège duōshao qián? Kěyǐ piányi yìdiǎnr ma?",
    vietnamese: "Cái này bao nhiêu tiền? Có thể rẻ hơn một chút không?",
    difficulty: "HSK1",
    category: "Hỏi giá & Trả giá",
    keyPhonetics: [
      { char: "钱", pinyin: "qián", tone: 2, guide: "Âm q bật hơi, thanh 2 vút lên" },
      { char: "便", pinyin: "pián", tone: 2, guide: "Âm p bật hơi mím hai môi" }
    ]
  },

  // =================================================================
  // HSK 2: Giao tiếp công việc cơ bản, hướng dẫn, giờ giấc, phân công
  // =================================================================
  {
    id: "sp_hsk2_1",
    hanzi: "厂长，早上好！请问今天我们组的目标产量是多少？",
    pinyin: "Chǎngzhǎng, zǎoshang hǎo! Qǐngwèn jīntiān wǒmen zǔ de mùbiāo chǎnliàng shì duōshao?",
    vietnamese: "Chào buổi sáng Giám đốc xưởng! Xin hỏi hôm nay sản lượng mục tiêu của tổ chúng tôi là bao nhiêu?",
    difficulty: "HSK2",
    category: "Sản xuất & Kế hoạch",
    keyPhonetics: [
      { char: "厂", pinyin: "chǎng", tone: 3, guide: "Uốn lưỡi bật hơi mạnh" },
      { char: "产", pinyin: "chǎn", tone: 3, guide: "Âm ch bật hơi, cuộn lưỡi" },
      { char: "量", pinyin: "liàng", tone: 4, guide: "Thanh 4 phát âm dứt khoát" }
    ]
  },
  {
    id: "sp_hsk2_2",
    hanzi: "李组长，这台拷边机有点跳针，请帮我看看。",
    pinyin: "Lǐ zǔzhǎng, zhè tái kǎobiānjī yǒudiǎn tiàozhēn, qǐng bāng wǒ kànkan.",
    vietnamese: "Tổ trưởng Lý ơi, chiếc máy vắt sổ này bị bỏ mũi một chút, xin hãy kiểm tra giúp tôi.",
    difficulty: "HSK2",
    category: "Thiết bị & May",
    keyPhonetics: [
      { char: "拷", pinyin: "kǎo", tone: 3, guide: "Âm k cuống lưỡi bật hơi" },
      { char: "跳", pinyin: "tiào", tone: 4, guide: "Âm t bật hơi mạnh mẽ" },
      { char: "针", pinyin: "zhēn", tone: 1, guide: "Âm zh uốn lưỡi không bật hơi" }
    ]
  },
  {
    id: "sp_hsk2_3",
    hanzi: "请把这批裁剪好的衣片送到缝纫三组。",
    pinyin: "Qǐng bǎ zhè pī cáijiǎn hǎo de yīpiàn sòng dào fèngrèn sān zǔ.",
    vietnamese: "Xin hãy chuyển lô bán thành phẩm đã cắt này đến tổ may số 3.",
    difficulty: "HSK2",
    category: "Điều phối sản xuất",
    keyPhonetics: [
      { char: "裁", pinyin: "cái", tone: 2, guide: "Âm c đầu lưỡi trước răng bật hơi" },
      { char: "剪", pinyin: "jiǎn", tone: 3, guide: "Mặt lưỡi chạm ngạc cứng" },
      { char: "缝", pinyin: "fèng", tone: 4, guide: "Răng trên chạm môi dưới" }
    ]
  },
  {
    id: "sp_hsk2_4",
    hanzi: "今天下午两点，我们在二楼会议室开周例会。",
    pinyin: "Jīntiān xiàwǔ liǎng diǎn, wǒmen zài èrlóu huìyìshì kāi zhōulìhuì.",
    vietnamese: "Hai giờ chiều nay chúng ta họp giao ban tuần tại phòng họp tầng 2.",
    difficulty: "HSK2",
    category: "Họp hành & Công sở",
    keyPhonetics: [
      { char: "会", pinyin: "huì", tone: 4, guide: "Âm h cuống họng, thanh 4 hạ nhanh" },
      { char: "议", pinyin: "yì", tone: 4, guide: "Dứt khoát, chuẩn thanh 4" }
    ]
  },
  {
    id: "sp_hsk2_5",
    hanzi: "大家注意安全操作，离开工位时记得关掉电源。",
    pinyin: "Dàjiā zhùyì ānquán cāozuò, líkāi gōngwèi shí jìde guāndiào diànyuán.",
    vietnamese: "Mọi người chú ý thao tác an toàn, khi rời vị trí nhớ tắt nguồn điện.",
    difficulty: "HSK2",
    category: "An toàn lao động",
    keyPhonetics: [
      { char: "安", pinyin: "ān", tone: 1, guide: "Âm mở phẳng thanh 1 cao" },
      { char: "操", pinyin: "cāo", tone: 1, guide: "Âm c đầu lưỡi bật hơi" }
    ]
  },
  {
    id: "sp_hsk2_6",
    hanzi: "这条牛仔裤的拉链缝歪了，必须拆开重做。",
    pinyin: "Zhè tiáo niúzǎikù de lāliàn fèng wāi le, bìxū chāikāi chóngzuò.",
    vietnamese: "Khóa kéo của chiếc quần bò này bị may lệch rồi, phải tháo ra làm lại.",
    difficulty: "HSK2",
    category: "Sửa lỗi sản phẩm",
    keyPhonetics: [
      { char: "歪", pinyin: "wāi", tone: 1, guide: "Nguyên âm ai kéo dài ở thanh 1" },
      { char: "拆", pinyin: "chāi", tone: 1, guide: "Âm ch uốn lưỡi bật hơi mạnh" }
    ]
  },

  // =================================================================
  // HSK 3: Kỹ thuật, kiểm hàng QC, dung sai, quy trình chuẩn SOP
  // =================================================================
  {
    id: "sp_hsk3_1",
    hanzi: "请机修师傅过来帮我调整一下平缝机的底线张力和压脚压力。",
    pinyin: "Qǐng jīxiū shīfu guòlái bāng wǒ tiáozhěng yíxià píngfèngjī de dǐxiàn zhānglì yǔ yājiǎo yālì.",
    vietnamese: "Xin mời thợ cơ điện qua chỉnh giúp tôi độ căng chỉ dưới và áp lực chân vịt của máy may 1 kim.",
    difficulty: "HSK3",
    category: "Bảo trì & Cơ điện",
    keyPhonetics: [
      { char: "修", pinyin: "xiū", tone: 1, guide: "Mặt lưỡi dẹt kéo âm iu" },
      { char: "张", pinyin: "zhāng", tone: 1, guide: "Âm zh uốn lưỡi mở rộng khoang miệng" },
      { char: "力", pinyin: "lì", tone: 4, guide: "Dứt khoát từ 5 xuống 1" }
    ]
  },
  {
    id: "sp_hsk3_2",
    hanzi: "这批大货面料的色牢度和缩水率均已达到出口欧美的AQL标准。",
    pinyin: "Zhè pī dàhuò miànliào de sèláodù hé suōshuǐlǜ jūn yǐ dádào chūkǒu Ōu-Měi de AQL biāozhǔn.",
    vietnamese: "Độ bền màu và độ co rút của lô vải đại trà này đều đã đạt tiêu chuẩn AQL xuất khẩu Âu Mỹ.",
    difficulty: "HSK3",
    category: "Thương mại & QC",
    keyPhonetics: [
      { char: "牢", pinyin: "láo", tone: 2, guide: "Âm l uốn nhẹ, thanh 2 vút lên" },
      { char: "缩", pinyin: "suō", tone: 1, guide: "Tròn môi âm uo thanh 1" },
      { char: "准", pinyin: "zhǔn", tone: 3, guide: "Âm zh uốn lưỡi thanh 3 sâu" }
    ]
  },
  {
    id: "sp_hsk3_3",
    hanzi: "我们要严格按照客户确认的产前样来进行大货首件封样。",
    pinyin: "Wǒmen yào yángé ànzhào kèhù quèrèn de chǎnqiányàng lái jìnxíng dàhuò shǒujiàn fēngyàng.",
    vietnamese: "Chúng ta cần đối chiếu nghiêm ngặt theo mẫu tiền sản xuất khách đã duyệt để tiến hành niêm phong mẫu đầu chuyền.",
    difficulty: "HSK3",
    category: "May mẫu & Duyệt rập",
    keyPhonetics: [
      { char: "确", pinyin: "què", tone: 4, guide: "Âm q bật hơi, nguyên âm ue tròn môi" },
      { char: "封", pinyin: "fēng", tone: 1, guide: "Răng môi cọ xát nhẹ" }
    ]
  },
  {
    id: "sp_hsk3_4",
    hanzi: "仓管员正在核对辅料入库单上的纽扣数量和拉链规格。",
    pinyin: "Cāngguǎnyuán zhèngzài héduì fǔliào rùkùdān shàng de niǔkòu shùliàng hé lāliàn guīgé.",
    vietnamese: "Thủ kho đang đối chiếu số lượng cúc áo và quy cách khóa kéo trên phiếu nhập kho phụ liệu.",
    difficulty: "HSK3",
    category: "Kho vận & Vật tư",
    keyPhonetics: [
      { char: "核", pinyin: "hé", tone: 2, guide: "Thanh 2 vuốt lên dứt khoát" },
      { char: "纽", pinyin: "niǔ", tone: 3, guide: "Âm n đầu lưỡi chân răng trên" }
    ]
  },
  {
    id: "sp_hsk3_5",
    hanzi: "如果质检发现连续三件衣服存在对称位偏差，必须立即停线整改。",
    pinyin: "Rúguǒ zhìjiǎn fāxiàn liánxù sān jiàn yīfu cúnzài duìchènwèi piānchā, bìxū lìjí tíngxiàn zhěnggǎi.",
    vietnamese: "Nếu QC phát hiện 3 sản phẩm liên tiếp bị lệch điểm đối xứng, bắt buộc phải dừng chuyền chỉnh đốn ngay lập tức.",
    difficulty: "HSK3",
    category: "Quản lý chất lượng",
    keyPhonetics: [
      { char: "称", pinyin: "chèn", tone: 4, guide: "Đọc âm chèn (đối xứng) dứt khoát" },
      { char: "差", pinyin: "chā", tone: 1, guide: "Âm ch uốn lưỡi bật hơi cao" }
    ]
  },

  // =================================================================
  // HSK 4: Đàm phán kỹ thuật, Techpack, Lean chuyền may, Dung sai
  // =================================================================
  {
    id: "sp_hsk4_1",
    hanzi: "请按照工艺单严格检查领口和袖口的尺寸公差，不允许超过正负零点五厘米。",
    pinyin: "Qǐng ànzhào gōngyìdān yángé jiǎnchá lǐngkǒu hé xiùkǒu de chǐcun gōngchā, bù yǔnxǔ chāoguò zhèngfù líng diǎn wǔ límǐ.",
    vietnamese: "Xin hãy đối chiếu theo techpack kiểm tra nghiêm ngặt dung sai kích thước cổ áo và cửa tay, không được vượt quá ±0.5cm.",
    difficulty: "HSK4",
    category: "Kỹ thuật May & QC",
    keyPhonetics: [
      { char: "差", pinyin: "chā", tone: 1, guide: "Uốn lưỡi bật hơi thanh 1" },
      { char: "负", pinyin: "fù", tone: 4, guide: "Môi dưới chạm răng trên" }
    ]
  },
  {
    id: "sp_hsk4_2",
    hanzi: "这件样衣的侧缝有轻微起皱，烫工需要重新调整蒸汽熨烫温度与吸风定型时间。",
    pinyin: "Zhè jiàn yàngyī de cèfèng yǒu qīngwēi qǐzhòu, tànggōng xūyào chóngxīn tiáozhěng zhēngqì yùntàng wēndù yǔ xīfēng dìngxíng shíjiān.",
    vietnamese: "Đường may sườn của chiếc áo mẫu này hơi bị nhăn nhúm nhẹ, thợ ủi cần điều chỉnh lại nhiệt độ bàn là hơi nước và thời gian hút gió định hình.",
    difficulty: "HSK4",
    category: "Hoàn tất & May mẫu",
    keyPhonetics: [
      { char: "皱", pinyin: "zhòu", tone: 4, guide: "Âm zh uốn lưỡi thanh 4 sắc bén" },
      { char: "熨", pinyin: "yùn", tone: 4, guide: "Tròn môi âm yn dứt khoát" }
    ]
  },
  {
    id: "sp_hsk4_3",
    hanzi: "所有成衣在装箱出厂前必须百分之百通过金属检针机检测，确保无断针残留。",
    pinyin: "Suǒyǒu chéngyī zài zhuāngxiāng chūchǎng qián bìxū bǎifēnzhībǎi tōngguò jīnshǔ jiǎnzhēnjī jiǎncè, quèbǎo wú duànzhēn cánliú.",
    vietnamese: "Mọi sản phẩm may mặc trước khi đóng thùng xuất xưởng bắt buộc 100% phải đi qua máy dò kim loại, đảm bảo không còn sót mảnh kim gãy.",
    difficulty: "HSK4",
    category: "An toàn & Xuất khẩu",
    keyPhonetics: [
      { char: "残", pinyin: "cán", tone: 2, guide: "Âm c đầu lưỡi bật hơi vút lên" },
      { char: "留", pinyin: "liú", tone: 2, guide: "Âm liu thanh 2 mượt mà" }
    ]
  },
  {
    id: "sp_hsk4_4",
    hanzi: "通过精益生产工序平衡优化，我们把瓶颈工序的节拍时间缩短了百分之十五。",
    pinyin: "Tōngguò jīngyì shēngchǎn gōngxù pínghéng yōuhuà, wǒmen bǎ píngjǐng gōngxù de jiépāi shíjiān suōduǎn le bǎifēnzhī shíwǔ.",
    vietnamese: "Thông qua tối ưu hóa cân bằng chuyền sản xuất Lean, chúng tôi đã rút ngắn 15% thời gian nhịp của công đoạn nút thắt cổ chai.",
    difficulty: "HSK4",
    category: "Sản xuất Tinh gọn Lean",
    keyPhonetics: [
      { char: "瓶", pinyin: "píng", tone: 2, guide: "Âm p bật hơi mím môi" },
      { char: "颈", pinyin: "jǐng", tone: 3, guide: "Mặt lưỡi áp ngạc trên" }
    ]
  },

  // =================================================================
  // HSK 5: Hợp đồng ngoại thương, Incoterms, Chuỗi cung ứng, Thuế quan
  // =================================================================
  {
    id: "sp_hsk5_1",
    hanzi: "我们公司下周要跟中国面料供应商签订长期战略采购框架协议。",
    pinyin: "Wǒmen gōngsī xiàzhōu yào gēn Zhōngguó miànliào gōngyìngshāng qiāndìng chángqī zhànlüè cǎigòu kuàngjià xiéyì.",
    vietnamese: "Công ty chúng tôi tuần tới sẽ ký thỏa thuận khung thu mua chiến lược dài hạn với nhà cung cấp vải Trung Quốc.",
    difficulty: "HSK5",
    category: "Thương mại & Hợp đồng",
    keyPhonetics: [
      { char: "略", pinyin: "lüè", tone: 4, guide: "Âm lve tròn môi thanh 4" },
      { char: "框", pinyin: "kuàng", tone: 4, guide: "Âm k cuống họng bật hơi" }
    ]
  },
  {
    id: "sp_hsk5_2",
    hanzi: "根据RCEP原产地累积规则，我们在越南缝制的成衣可享受出口日本零关税待遇。",
    pinyin: "Gēnjù RCEP yuánchǎndì lěijī guīzé, wǒmen zài Yuènán fèngzhì de chéngyī kě xiǎngshòu chūkǒu Rìběn líng guānshuì dàiyù.",
    vietnamese: "Căn cứ theo quy tắc cộng gộp xuất xứ RCEP, hàng may mặc chúng ta may tại Việt Nam được hưởng ưu đãi thuế suất 0% xuất khẩu sang Nhật Bản.",
    difficulty: "HSK5",
    category: "Thuế quan & Logistics",
    keyPhonetics: [
      { char: "累", pinyin: "lěi", tone: 3, guide: "Âm l thanh 3 trầm sâu" },
      { char: "积", pinyin: "jī", tone: 1, guide: "Mặt lưỡi phẳng thanh 1 cao" }
    ]
  },
  {
    id: "sp_hsk5_3",
    hanzi: "受红海航运危机影响，欧美航线集装箱海运费大幅上涨且交货期面临延误风险。",
    pinyin: "Shòu Hónghǎi hángyùn wēijī yǐngxiǎng, Ōu-Měi hángxiàn jízhuāngxiāng hǎiyùnfèi dàfú shàngzhǎng qiě jiāohuòqī miànlín yánwù fēngxiǎn.",
    vietnamese: "Chịu ảnh hưởng bởi khủng hoảng hàng hải Biển Đỏ, giá cước container tuyến Âu Mỹ tăng vọt và thời hạn giao hàng đối mặt nguy cơ trễ hạn.",
    difficulty: "HSK5",
    category: "Logistics Quốc tế",
    keyPhonetics: [
      { char: "危", pinyin: "wēi", tone: 1, guide: "Âm w mượt thanh 1" },
      { char: "航", pinyin: "háng", tone: 2, guide: "Âm h cuống họng thanh 2" }
    ]
  },
  {
    id: "sp_hsk5_4",
    hanzi: "买方已通过不可撤销即期信用证（L/C）支付了百分之三十的预付定金。",
    pinyin: "Mǎifāng yǐ tōngguò bùkě chèxiāo jíqī xìnyòngzhèng zhīfù le bǎifēnzhī sānshí de yùfù dìngjīn.",
    vietnamese: "Bên mua đã thanh toán 30% tiền đặt cọc trước thông qua thư tín dụng không hủy ngang trả ngay (L/C).",
    difficulty: "HSK5",
    category: "Thanh toán Quốc tế",
    keyPhonetics: [
      { char: "撤", pinyin: "chè", tone: 4, guide: "Âm ch uốn lưỡi bật hơi mạnh dứt khoát" },
      { char: "销", pinyin: "xiāo", tone: 1, guide: "Mặt lưỡi dẹt thanh 1" }
    ]
  },

  // =================================================================
  // HSK 6: Chiến lược vĩ mô, AI & Tự động hóa 4.0, ESG & Bền vững
  // =================================================================
  {
    id: "sp_hsk6_1",
    hanzi: "践行ESG理念绝非企业的形象公关，而是关乎纺织制造业生死存亡的根本战略重塑。",
    pinyin: "Jiànxíng ESG lǐniàn juéfēi qǐyè de xíngxiàng gōngguān, ér shì guānhū fǎngxī zhìzàoyè shēngsǐ-cúnwáng de gēnběn zhànlüè chóngshù.",
    vietnamese: "Thực hành triết lý ESG tuyệt nhiên không phải làm PR hình ảnh, mà là sự tái cấu trúc chiến lược sống còn căn bản của ngành sản xuất dệt may.",
    difficulty: "HSK6",
    category: "ESG & Quản trị",
    keyPhonetics: [
      { char: "塑", pinyin: "shù", tone: 4, guide: "Âm s/sh thanh 4 chắc nịch" },
      { char: "亡", pinyin: "wáng", tone: 2, guide: "Âm w mở rộng thanh 2" }
    ]
  },
  {
    id: "sp_hsk6_2",
    hanzi: "AI视觉检测与智能吊挂系统的全面融合，标志着我们从汗水驱动迈入数据驱动的新纪元。",
    pinyin: "AI shìjué jiǎncè yǔ zhìnéng diàoguà xìtǒng de quánmiàn rónghé, biāozhì zhe wǒmen cóng hànshuǐ qūdòng màirù shùjù qūdòng de xīn jìyuán.",
    vietnamese: "Sự tích hợp toàn diện giữa thị giác AI và chuyền treo thông minh đánh dấu bước chuyển mình của chúng ta từ dùng sức cơ bắp bước vào kỷ nguyên vận hành bằng dữ liệu.",
    difficulty: "HSK6",
    category: "Công nghiệp 4.0 & AI",
    keyPhonetics: [
      { char: "吊", pinyin: "diào", tone: 4, guide: "Âm d đầu lưỡi trước răng" },
      { char: "纪", pinyin: "jì", tone: 4, guide: "Mặt lưỡi dẹt dứt khoát" }
    ]
  },
  {
    id: "sp_hsk6_3",
    hanzi: "在全球供应链深度重构的浪潮中，唯有兼具柔性制造与敏捷交付能力的企业方能立于不败之地。",
    pinyin: "Zài quánqiú gōngyìngliàn shēndù chónggòu de làngcháo zhōng, wéiyǒu jiānjù róuxìng zhìzào yǔ mǐnjié jiāofù nénglì de qǐyè fāng néng lì yú búbài zhī dì.",
    vietnamese: "Trong làn sóng tái cấu trúc sâu rộng của chuỗi cung ứng toàn cầu, chỉ những doanh nghiệp sở hữu năng lực sản xuất linh hoạt và giao hàng nhanh nhạy mới có thể đứng vững.",
    difficulty: "HSK6",
    category: "Chiến lược Chuỗi cung ứng",
    keyPhonetics: [
      { char: "柔", pinyin: "róu", tone: 2, guide: "Âm r uốn lưỡi rung nhẹ" },
      { char: "敏", pinyin: "mǐn", tone: 3, guide: "Môi khép thanh 3 sâu" }
    ]
  },
  {
    id: "sp_hsk6_4",
    hanzi: "面对复杂的国际经贸摩擦，企业必须未雨绸缪，建立多元化的原材料备选保障机制。",
    pinyin: "Miànduì fùzá de guójì jīngmào mócā, qǐyè bìxū wèiyǔ-chóumóu, jiànlì duōyuánhuà de yuáncáiliào bèixuǎn bǎozhàng jīzhì.",
    vietnamese: "Đối mặt với những ma sát kinh tế thương mại quốc tế phức tạp, doanh nghiệp phải lo liệu phòng ngừa từ trước, thiết lập cơ chế bảo đảm nguồn nguyên liệu dự phòng đa dạng.",
    difficulty: "HSK6",
    category: "Quản trị Rủi ro Quốc tế",
    keyPhonetics: [
      { char: "绸", pinyin: "chóu", tone: 2, guide: "Âm ch uốn lưỡi thanh 2" },
      { char: "缪", pinyin: "móu", tone: 2, guide: "Đọc âm móu trong thành ngữ" }
    ]
  }
];
