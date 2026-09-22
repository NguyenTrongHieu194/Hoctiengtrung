import { GarmentTerm, GarmentDialogue } from"../types";

export const GARMENT_CATEGORIES = [
  {
    id: "factory",
    name: "Xưởng may & Nhân sự",
    icon: "Building2",
    description: "Các bộ phận, chức danh, tổ nhóm và khu vực trong nhà máy may",
    chineseName: "车间与人员 (Chējiān yǔ rényuán)",
    count: 14
  },
  {
    id: "machinery",
    name: "Máy móc & Thiết bị",
    icon: "Cog",
    description: "Các loại máy may chuyên dụng, phụ tùng và công cụ xưởng may",
    chineseName: "机械与设备 (Jīxiè yǔ shèbèi)",
    count: 16
  },
  {
    id: "process",
    name: "Công đoạn sản xuất",
    icon: "Scissors",
    description: "Quy trình may, thao tác kỹ thuật và các bước ráp thành phẩm",
    chineseName: "生产工序 (Shēngchǎn gōngxù)",
    count: 18
  },
  {
    id: "management",
    name: "Quản lý & Kỹ thuật QC/IE",
    icon: "BarChart3",
    description: "Năng suất, định mức, bảng thông số techpack, lỗi may và kiểm phẩm",
    chineseName: "生产管理与质检 (Shēngchǎn guǎnlǐ yǔ zhìjiǎn)",
    count: 18
  },
  {
    id: "fabric_accessory",
    name: "Vải vóc & Phụ liệu may",
    icon: "Sparkles",
    description: "Chất liệu sợi, vải dệt thoi, dệt kim, cúc áo, dây kéo, mex dựng, nhãn mác",
    chineseName: "面料与辅料 (Miànliào yǔ fǔliào)",
    count: 16
  },
  {
    id: "measure_defect",
    name: "Thông số & Lỗi may KCS",
    icon: "ShieldAlert",
    description: "Vị trí đo lường Techpack, dung sai và phân loại các lỗi may thường gặp",
    chineseName: "尺寸规格与疵点 (Chǐcun guīgé yǔ cīdiǎn)",
    count: 16
  }
];

export const GARMENT_TERMS: GarmentTerm[] = [
  // 1. XƯỞNG MAY & NHÂN SỰ
  {
    id:"g_fac_1",
    hanzi:"车间",
    pinyin:"chējiān",
    vietnamese:"Xưởng may, phân xưởng",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"factory",
    commonUsage:"缝纫车间 (Xưởng may), 裁剪车间 (Xưởng cắt)",
    exampleSentence: {
      hanzi:"车间里一共有八条缝纫产线。",
      pinyin:"Chējiān lǐ yígòng yǒu bā tiáo fèngrèn chǎnxiàn.",
      vietnamese:"Trong phân xưởng tổng cộng có 8 chuyền may."
    }
  },
  {
    id:"g_fac_2",
    hanzi:"产线 / 流水线",
    pinyin:"chǎnxiàn / liúshuǐxiàn",
    vietnamese:"Chuyền may, dây chuyền sản xuất",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"factory",
    commonUsage:"一条产线 (Một chuyền may), 产线平衡 (Cân bằng chuyền)",
    exampleSentence: {
      hanzi:"今天三号产线的效率达到了百分之九十五。",
      pinyin:"Jīntiān sān hào chǎnxiàn de xiàolǜ dádào le bǎifēn zhī jiǔshíwǔ.",
      vietnamese:"Hôm nay hiệu suất chuyền số 3 đã đạt 95%."
    }
  },
  {
    id:"g_fac_3",
    hanzi:"组长",
    pinyin:"zǔzhǎng",
    vietnamese:"Tổ trưởng chuyền may",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"factory",
    commonUsage:"车缝组长 (Tổ trưởng may), 裁剪组长 (Tổ trưởng cắt)",
    exampleSentence: {
      hanzi:"组长正在安排今天的生产任务。",
      pinyin:"Zǔzhǎng zhèngzài ānpái jīntiān de shēngchǎn rènwù.",
      vietnamese:"Tổ trưởng đang phân công nhiệm vụ sản xuất hôm nay."
    }
  },
  {
    id:"g_fac_4",
    hanzi:"车位工 / 缝纫工",
    pinyin:"chēwèigōng / fèngrèngōng",
    vietnamese:"Công nhân may, thợ may chuyền",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"factory",
    commonUsage:"熟练车位 (Thợ may lành nghề)",
    exampleSentence: {
      hanzi:"工厂急招五十名熟练缝纫工。",
      pinyin:"Gōngchǎng jí zhāo wǔshí míng shúliàn fèngrèngōng.",
      vietnamese:"Nhà máy đang tuyển gấp 50 công nhân may có tay nghề."
    }
  },
  {
    id:"g_fac_5",
    hanzi:"机修工 / 机修",
    pinyin:"jīxiūgōng / jīxiū",
    vietnamese:"Thợ bảo trì máy may, kỹ thuật máy",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"factory",
    commonUsage:"机修师傅 (Thầy thợ máy)",
    exampleSentence: {
      hanzi:"这台拷边机坏了，快叫机修来看看。",
      pinyin:"Zhè tái kǎobiānjī huài le, kuài jiào jīxiū lái kànkan.",
      vietnamese:"Máy vắt sổ này hỏng rồi, gọi kỹ thuật máy qua xem nhanh."
    }
  },
  {
    id:"g_fac_6",
    hanzi:"质检员 / QC",
    pinyin:"zhìjiǎnyuán / QC",
    vietnamese:"Nhân viên kiểm tra chất lượng (QC)",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"factory",
    commonUsage:"线上QC (QC kiểm chuyền), 尾期QC (QC hoàn tất)",
    exampleSentence: {
      hanzi:"QC发现这批衣服领子尺寸偏大。",
      pinyin:"QC fāxiàn zhè pī yīfu lǐngzi chǐcun piāndà.",
      vietnamese:"QC phát hiện lô áo này kích thước cổ áo bị to hơn tiêu chuẩn."
    }
  },
  {
    id:"g_fac_7",
    hanzi:"工业工程 / IE",
    pinyin:"gōngyè gōngchéng / IE",
    vietnamese:"Kỹ sư định mức / Kỹ thuật công nghiệp IE",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"factory",
    commonUsage:"IE测时 (IE bấm giờ công đoạn)",
    exampleSentence: {
      hanzi:"IE工程师正在测算每个工序的标准工时。",
      pinyin:"IE gōngchéngshī zhèngzài cèsuàn měi gè gōngxù de biāozhǔn gōngshí.",
      vietnamese:"Kỹ sư IE đang đo đạc thời gian chuẩn (SAM/SMV) của từng công đoạn."
    }
  },
  {
    id:"g_fac_8",
    hanzi:"辅料库 / 原材料库",
    pinyin:"fǔliàokù / yuáncáiliàokù",
    vietnamese:"Kho nguyên phụ liệu",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"factory",
    commonUsage:"面辅料 (Vải chính và phụ liệu)",
    exampleSentence: {
      hanzi:"拉链和纽扣都存放在辅料库里。",
      pinyin:"Lāliàn hé niǔkòu dōu cúnfàng zài fǔliàokù lǐ.",
      vietnamese:"Khóa kéo và khuy cúc đều được lưu trữ trong kho phụ liệu."
    }
  },
  {
    id:"g_fac_9",
    hanzi:"厂长 / 车间主管",
    pinyin:"chǎngzhǎng / chējiān zhǔguǎn",
    vietnamese:"Giám đốc nhà máy / Quản lý xưởng",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"factory",
    commonUsage:"车间主管 (Chủ quản xưởng may)",
    exampleSentence: {
      hanzi:"车间主管要求今天下午出完这个订单。",
      pinyin:"Chējiān zhǔguǎn yāoqiú jīntiān xiàwǔ chū wán zhè gè dìngdān.",
      vietnamese:"Quản lý xưởng yêu cầu chiều nay phải hoàn thành đơn hàng này."
    }
  },

  // 2. MÁY MÓC & THIẾT BỊ
  {
    id:"g_mac_1",
    hanzi:"平缝机 / 平车",
    pinyin:"píngfèngjī / píngchē",
    vietnamese:"Máy may 1 kim (Máy may bằng)",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"machinery",
    commonUsage:"电脑平车 (Máy may 1 kim điện tử)",
    exampleSentence: {
      hanzi:"请换一台电脑平缝机来做这道工序。",
      pinyin:"Qǐng huàn yì tái diànnǎo píngfèngjī lái zuò zhè dào gōngxù.",
      vietnamese:"Xin đổi sang một máy may 1 kim điện tử để làm công đoạn này."
    }
  },
  {
    id:"g_mac_2",
    hanzi:"拷边机 / 包缝机 / 锁边机",
    pinyin:"kǎobiānjī / bāofèngjī / suǒbiānjī",
    vietnamese:"Máy vắt sổ (3 chỉ / 4 chỉ / 5 chỉ)",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"machinery",
    commonUsage:"四线拷边机 (Máy vắt sổ 4 chỉ), 五线拷边 (Vắt sổ 5 chỉ)",
    exampleSentence: {
      hanzi:"这件T恤的侧缝需要用四线拷边机缝合。",
      pinyin:"Zhè jiàn T-xù de cèfèng xūyào yòng sì xiàn kǎobiānjī fènghé.",
      vietnamese:"Đường sườn áo thun này cần dùng máy vắt sổ 4 chỉ để ráp."
    }
  },
  {
    id:"g_mac_3",
    hanzi:"绷缝机 / 坎车 / 冚车",
    pinyin:"bēngfèngjī / kǎnchē",
    vietnamese:"Máy may Kansai (Máy trần đè, trần gấu)",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"machinery",
    commonUsage:"坎车压下摆 (Kansai trần lai áo)",
    exampleSentence: {
      hanzi:"下摆和袖口用三针五线坎车做卷边。",
      pinyin:"Xiàbǎi hé xiùkǒu yòng sān zhēn wǔ xiàn kǎnchē zuò juǎnbiān.",
      vietnamese:"Lai áo và cửa tay dùng máy Kansai 3 kim 5 chỉ để viền đè."
    }
  },
  {
    id:"g_mac_4",
    hanzi:"平头锁眼机 / 凤眼机",
    pinyin:"píngtóu suǒyǎnjī / fèngyǎnjī",
    vietnamese:"Máy thùa khuy (Khuy bằng / Khuy mắt phụng)",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"machinery",
    commonUsage:"开扣眼 (Thùa khuy nút)",
    exampleSentence: {
      hanzi:"衬衫用平头锁眼机，西装外套用凤眼机。",
      pinyin:"Chènshān yòng píngtóu suǒyǎnjī, xīzhuāng wàitào yòng fèngyǎnjī.",
      vietnamese:"Áo sơ mi dùng máy thùa khuy bằng, áo vest dùng máy thùa khuy mắt phụng."
    }
  },
  {
    id:"g_mac_5",
    hanzi:"钉扣机 / 钉钮机",
    pinyin:"dìngkòujī / dìngniǔjī",
    vietnamese:"Máy đính nút, máy đính cúc",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"machinery",
    commonUsage:"钉四眼扣 (Đính nút 4 lỗ)",
    exampleSentence: {
      hanzi:"钉扣机的位置要对准标记线。",
      pinyin:"Dìngkòujī de wèizhi yào duìzhǔn biāojì xiàn.",
      vietnamese:"Vị trí máy đính nút phải căn chuẩn theo đường dấu bấm."
    }
  },
  {
    id:"g_mac_6",
    hanzi:"套结机 / 打枣机",
    pinyin:"tàojiéjī / dǎzǎojī",
    vietnamese:"Máy đánh bọ (Máy di bọ / Bartack)",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"machinery",
    commonUsage:"口袋打枣 (Di bọ miệng túi)",
    exampleSentence: {
      hanzi:"裤兜两端必须打枣加固，防止撕裂。",
      pinyin:"Kùdōu liǎng duān bìxū dǎzǎo jiāgù, fángzhǐ sīliè.",
      vietnamese:"Hai đầu miệng túi quần phải di bọ gia cố để chống rách."
    }
  },
  {
    id:"g_mac_7",
    hanzi:"裁剪机 / 电剪",
    pinyin:"cáijiǎnjī / diànjiǎn",
    vietnamese:"Máy cắt vải đứng, dao cắt điện",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"machinery",
    commonUsage:"直刀裁剪机 (Máy cắt dao đứng)",
    exampleSentence: {
      hanzi:"裁剪师傅正在用电剪切割裁片。",
      pinyin:"Cáijiǎn shīfu zhèngzài yòng diànjiǎn qiēgē cáipiàn.",
      vietnamese:"Thợ cắt đang dùng máy cắt điện để cắt các bán thành phẩm."
    }
  },
  {
    id:"g_mac_8",
    hanzi:"压烫机 / 烫台",
    pinyin:"yātàngjī / tàngtái",
    vietnamese:"Máy ép keo, bàn ủi hút chân không",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"machinery",
    commonUsage:"粘合机 (Máy ép mex/keo)",
    exampleSentence: {
      hanzi:"领衬要用压烫机以一百五十度温度压合。",
      pinyin:"Lǐngchèn yào yòng yātàngjī yǐ yībǎi wǔshí dù wēndù yàhé.",
      vietnamese:"Keo cổ áo phải dùng máy ép nhiệt ở nhiệt độ 150 độ C."
    }
  },

  // 3. CÔNG ĐOẠN SẢN XUẤT
  {
    id:"g_pro_1",
    hanzi:"拉布 / 铺布",
    pinyin:"lābù / pūbù",
    vietnamese:"Trải vải (Kéo vải ra bàn cắt)",
    partOfSpeech:"Động từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"process",
    commonUsage:"自动铺布机 (Máy trải vải tự động)",
    exampleSentence: {
      hanzi:"拉布前需要检查面料有没有色差和破损。",
      pinyin:"Lābù qián xūyào jiǎnchá miànliào yǒu méiyǒu sèchā hé pòsǔn.",
      vietnamese:"Trước khi trải vải cần kiểm tra xem vải có bị lệch màu hoặc hư hỏng không."
    }
  },
  {
    id:"g_pro_2",
    hanzi:"裁剪",
    pinyin:"cáijiǎn",
    vietnamese:"Cắt vải, cắt rập",
    partOfSpeech:"Động từ/Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"process",
    commonUsage:"裁剪部 (Bộ phận cắt)",
    exampleSentence: {
      hanzi:"裁剪尺寸一定要严格按照纸样进行。",
      pinyin:"Cáijiǎn chǐcun yídìng yào yángé ànzhào zhǐyàng jìnxíng.",
      vietnamese:"Kích thước cắt nhất định phải nghiêm ngặt theo đúng rập mẫu."
    }
  },
  {
    id:"g_pro_3",
    hanzi:"合缝 / 车缝",
    pinyin:"héfèng / chēfèng",
    vietnamese:"May ráp, may đường may",
    partOfSpeech:"Động từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"process",
    commonUsage:"前后片合缝 (May ráp thân trước và thân sau)",
    exampleSentence: {
      hanzi:"请注意车缝时的止口宽度为一公分。",
      pinyin:"Qǐng zhùyì chēfèng shí de zhǐkǒu kuāndù wéi yì gōngfēn.",
      vietnamese:"Xin lưu ý khi may ráp đường mép chừa đường may (chỉ khẩu) là 1cm."
    }
  },
  {
    id:"g_pro_4",
    hanzi:"上领 / 装领",
    pinyin:"shànglǐng / zhuānglǐng",
    vietnamese:"Tra cổ áo (May ráp cổ vào thân)",
    partOfSpeech:"Động từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"process",
    commonUsage:"上领工序 (Công đoạn tra cổ)",
    exampleSentence: {
      hanzi:"装领的时候左右领角必须对称。",
      pinyin:"Zhuānglǐng de shíhou zuǒyòu lǐngjiǎo bìxū duìchèn.",
      vietnamese:"Khi tra cổ áo, hai đầu lá cổ trái phải bắt buộc phải đối xứng."
    }
  },
  {
    id:"g_pro_5",
    hanzi:"上袖 / 装袖",
    pinyin:"shàngxiù / zhuāngxiù",
    vietnamese:"Tra tay áo (Vào nách áo)",
    partOfSpeech:"Động từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"process",
    commonUsage:"装袖吃势 (Độ búp / độ rút nhún mọng nách tay)",
    exampleSentence: {
      hanzi:"上袖时要对准肩缝和对位记号点。",
      pinyin:"Shàngxiù shí yào duìzhǔn jiānfèng hé duìwèi jìhào diǎn.",
      vietnamese:"Khi tra tay áo phải căn thẳng đường may vai và các điểm bấm dấu."
    }
  },
  {
    id:"g_pro_6",
    hanzi:"剪线头",
    pinyin:"jiǎn xiàntóu",
    vietnamese:"Cắt chỉ thừa, bấm chỉ",
    partOfSpeech:"Động từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"process",
    commonUsage:"清理线头 (Làm sạch chỉ thừa)",
    exampleSentence: {
      hanzi:"包装前必须彻底剪净所有内外线头。",
      pinyin:"Bāozhuāng qián bìxū chèdǐ jiǎn jìng suǒyǒu nèiwài xiàntóu.",
      vietnamese:"Trước khi đóng gói phải cắt sạch sẽ toàn bộ chỉ thừa bên trong và bên ngoài."
    }
  },
  {
    id:"g_pro_7",
    hanzi:"后道 / 包装",
    pinyin:"hòudào / bāozhuāng",
    vietnamese:"Bộ phận hoàn tất / Đóng gói",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"process",
    commonUsage:"后整车间 (Xưởng hoàn thiện ủi đóng gói)",
    exampleSentence: {
      hanzi:"后道正在贴吊牌并装入胶袋。",
      pinyin:"Hòudào zhèngzài tiē diàopái bìng zhuāng rù jiāodài.",
      vietnamese:"Bộ phận hoàn tất đang gắn thẻ bài (hangtag) và đóng vào túi nilon."
    }
  },

  // 4. QUẢN LÝ SẢN XUẤT & THUẬT NGỮ
  {
    id:"g_man_1",
    hanzi:"产量",
    pinyin:"chǎnliàng",
    vietnamese:"Sản lượng",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"management",
    commonUsage:"日产量 (Sản lượng ngày), 目标产量 (Sản lượng mục tiêu)",
    exampleSentence: {
      hanzi:"今天我们组的日产量突破了一千二百件。",
      pinyin:"Jīntiān wǒmen zǔ de rìchǎnliàng tūpò le yìqiān èrbǎi jiàn.",
      vietnamese:"Hôm nay sản lượng ngày của tổ chúng tôi đã vượt mốc 1.200 sản phẩm."
    }
  },
  {
    id:"g_man_2",
    hanzi:"效率",
    pinyin:"xiàolǜ",
    vietnamese:"Hiệu suất chuyền, năng suất",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"management",
    commonUsage:"产线效率 (Hiệu suất chuyền may)",
    exampleSentence: {
      hanzi:"改善瓶颈工序可以有效提高整条线的效率。",
      pinyin:"Gǎishàn píngjǐng gōngxù kěyǐ yǒuxiào tígāo zhěng tiáo xiàn de xiàolǜ.",
      vietnamese:"Cải thiện công đoạn nút cổ chai có thể nâng cao hiệu suất toàn chuyền một cách hiệu quả."
    }
  },
  {
    id:"g_man_3",
    hanzi:"工艺单 / 技术资料",
    pinyin:"gōngyìdān / jìshù zīliào",
    vietnamese:"Tài liệu kỹ thuật, Bảng thông số (Techpack)",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"management",
    commonUsage:"查看工艺单 (Xem tài liệu kỹ thuật techpack)",
    exampleSentence: {
      hanzi:"请按照客户最新的工艺单要求制作产前样。",
      pinyin:"Qǐng ànzhào kèhù zuìxīn de gōngyìdān yāoqiú zhìzuò chǎnqiányàng.",
      vietnamese:"Xin hãy làm mẫu tiền sản xuất (PP Sample) theo đúng tài liệu kỹ thuật mới nhất của khách."
    }
  },
  {
    id:"g_man_4",
    hanzi:"次品 / 不良品",
    pinyin:"cìpǐn / bùliángpǐn",
    vietnamese:"Hàng lỗi, hàng thứ phẩm",
    partOfSpeech:"Danh từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"management",
    commonUsage:"次品率 (Tỷ lệ hàng lỗi)",
    exampleSentence: {
      hanzi:"本月的目标是将不良品率控制在百分之一以下。",
      pinyin:"Běnyuè de mùbiāo shì jiāng bùliángpǐn lǜ kòngzhì zài bǎifēn zhī yī yǐxià.",
      vietnamese:"Mục tiêu tháng này là kiểm soát tỷ lệ hàng lỗi dưới 1%."
    }
  },
  {
    id:"g_man_5",
    hanzi:"跳针 / 断线",
    pinyin:"tiàozhēn / duànxiàn",
    vietnamese:"Nhảy mũi (bỏ mũi) / Đứt chỉ",
    partOfSpeech:"Danh từ/Động từ",
    hskLevel:"GARMENT",
    topic:"Chuyên ngành May mặc",
    industryCategory:"management",
    commonUsage:"缝线跳针 (Đường may bị bỏ mũi)",
    exampleSentence: {
      hanzi:"针尖磨损会导致严重的跳针现象。",
      pinyin:"Zhēnjiān mósǔn huì dǎozhì yánzhòng de tiàozhēn xiànxiàng.",
      vietnamese:"Đầu mũi kim bị mòn tù sẽ dẫn đến hiện tượng bỏ mũi nghiêm trọng."
    }
  },
  {
    id: "g_man_6",
    hanzi: "起皱 / 扭曲",
    pinyin: "qǐzhòu / niǔqū",
    vietnamese: "Nhăn nhúm / Vặn vẹo (Vặn sườn)",
    partOfSpeech: "Tính từ/Động từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "management",
    commonUsage: "缝边起皱 (Mép may bị nhăn dúm)",
    exampleSentence: {
      hanzi: "底线太紧会导致下摆缝线起皱。",
      pinyin: "Dǐxiàn tài jǐn huì dǎozhì xiàbǎi fèngxiàn qǐzhòu.",
      vietnamese: "Chỉ dưới quá chặt sẽ làm đường may lai áo bị nhăn nhúm."
    }
  },

  // =========================================================================
  // 5. VẢI VÓC & PHỤ LIỆU MAY MẶC (FABRIC & ACCESSORIES)
  // =========================================================================
  {
    id: "g_fab_1",
    hanzi: "面料 / 布料",
    pinyin: "miànliào / bùliào",
    vietnamese: "Vải chính, vải may mặc",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "fabric_accessory",
    commonUsage: "主面料 (Vải chính), 配料 (Vải phối)",
    exampleSentence: {
      hanzi: "这批全棉面料手感非常柔软透气。",
      pinyin: "Zhè pī quánmián miànliào shǒugǎn fēicháng róuruǎn tòuqì.",
      vietnamese: "Lô vải 100% cotton này sờ tay vào cảm giác rất mềm mại và thoáng khí."
    }
  },
  {
    id: "g_fab_2",
    hanzi: "纯棉 / 全棉",
    pinyin: "chúnmián / quánmián",
    vietnamese: "Vải cotton 100%, bông tự nhiên",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "fabric_accessory",
    commonUsage: "100%全棉针织布 (Vải dệt kim 100% cotton)",
    exampleSentence: {
      hanzi: "婴儿服装必须使用百分之百纯棉面料。",
      pinyin: "Yīng'ér fúzhuāng bìxū shǐyòng bǎifēn zhī bǎi chúnmián miànliào.",
      vietnamese: "Quần áo trẻ em bắt buộc phải dùng vải 100% cotton."
    }
  },
  {
    id: "g_fab_3",
    hanzi: "涤纶 / 聚酯纤维",
    pinyin: "dílún / jùzhǐ xiānwéi",
    vietnamese: "Sợi Polyester (vải Poly chống nhăn)",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "fabric_accessory",
    commonUsage: "涤棉混纺 TC (Vải pha Poly Cotton)",
    exampleSentence: {
      hanzi: "涤纶面料耐磨性好且不易起皱。",
      pinyin: "Dílún miànliào nàimóxìng hǎo qiě bù yì qǐzhòu.",
      vietnamese: "Vải Polyester có độ bền ma sát tốt và khó bị nhăn."
    }
  },
  {
    id: "g_fab_4",
    hanzi: "氨纶 / 弹力纤维",
    pinyin: "ānlún / tánlì xiānwéi",
    vietnamese: "Sợi Spandex (Sợi chun co giãn)",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "fabric_accessory",
    commonUsage: "四面弹力面料 (Vải co giãn 4 chiều)",
    exampleSentence: {
      hanzi: "牛仔裤加入百分之五氨纶可以增加穿着弹性。",
      pinyin: "Niúzǎikù jiārù bǎifēn zhī wǔ ānlún kěyǐ zēngjiā chuānzhuó tánxìng.",
      vietnamese: "Quần jean pha thêm 5% Spandex có thể tăng độ co giãn khi mặc."
    }
  },
  {
    id: "g_fab_5",
    hanzi: "里料 / 衬里",
    pinyin: "lǐliào / chènlǐ",
    vietnamese: "Vải lót trong",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "fabric_accessory",
    commonUsage: "西装里料 (Vải lót áo vest)",
    exampleSentence: {
      hanzi: "外套的里料需要具有良好的顺滑度和透气性。",
      pinyin: "Wàitào de lǐliào xūyào jùyǒu liánghǎo de shùnhuádù hé tòuqìxìng.",
      vietnamese: "Vải lót của áo khoác cần có độ trơn mượt và độ thoáng khí tốt."
    }
  },
  {
    id: "g_fab_6",
    hanzi: "粘合衬 / 朴布",
    pinyin: "niánhéchèn / piáobù",
    vietnamese: "Keo ép nhiệt, Mex dựng (Interlining)",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "fabric_accessory",
    commonUsage: "领口粘合衬 (Keo ép cổ áo)",
    exampleSentence: {
      hanzi: "衬衫领子和袖口必须压烫优质粘合衬。",
      pinyin: "Chènshān lǐngzi hé xiùkǒu bìxū yātàng yōuzhì niánhéchèn.",
      vietnamese: "Cổ áo sơ mi và măng-sét tay bắt buộc phải ép keo mex chất lượng cao."
    }
  },
  {
    id: "g_fab_7",
    hanzi: "辅料",
    pinyin: "fǔliào",
    vietnamese: "Phụ liệu may mặc (Cúc, khóa, mác, chỉ...)",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "fabric_accessory",
    commonUsage: "辅料仓库 (Kho phụ liệu)",
    exampleSentence: {
      hanzi: "下周开裁前，所有拉链和纽扣等辅料必须全部到厂。",
      pinyin: "Xià zhōu kāicái qián, suǒyǒu lāliàn hé niǔkòu děng fǔliào bìxū quánbù dào chǎng.",
      vietnamese: "Trước khi trải vải cắt tuần tới, toàn bộ phụ liệu như khóa kéo, cúc áo phải về đủ nhà máy."
    }
  },
  {
    id: "g_fab_8",
    hanzi: "拉链",
    pinyin: "lāliàn",
    vietnamese: "Khóa kéo, dây kéo (Zipper)",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "fabric_accessory",
    commonUsage: "隐形拉链 (Khóa giọt lệ / khóa giấu), 金属拉链 (Khóa kim loại)",
    exampleSentence: {
      hanzi: "裙子后中缝制了一条五十公分的隐形拉链。",
      pinyin: "Qúnzi hòuzhōng féngzhì le yì tiáo wǔshí gōngfēn de yǐnxíng lāliàn.",
      vietnamese: "Giữa thân sau váy có may một chiếc khóa giọt lệ dài 50cm."
    }
  },
  {
    id: "g_fab_9",
    hanzi: "纽扣 / 按扣",
    pinyin: "niǔkòu / ànkòu",
    vietnamese: "Cúc áo / Nút bấm (Buttons & Snaps)",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "fabric_accessory",
    commonUsage: "四合扣 (Nút bấm 4 chi tiết), 树脂扣 (Cúc nhựa)",
    exampleSentence: {
      hanzi: "请测试这批按扣的拉力是否达到客户标准。",
      pinyin: "Qǐng cèshì zhè pī ànkòu de lālì shìfǒu dádào kèhù biāozhǔn.",
      vietnamese: "Xin hãy thử nghiệm lực giật của lô cúc bấm này xem có đạt chuẩn của khách hàng không."
    }
  },
  {
    id: "g_fab_10",
    hanzi: "缝纫线 / 宝塔线",
    pinyin: "féngrènxiàn / bǎotǎxiàn",
    vietnamese: "Chỉ may cuộn / Chỉ may công nghiệp",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "fabric_accessory",
    commonUsage: "高强涤纶线 (Chỉ may Poly cường lực cao)",
    exampleSentence: {
      hanzi: "缝纫线的颜色必须与面料颜色保持百分之百一致。",
      pinyin: "Féngrènxiàn de yánsè bìxū yǔ miànliào yánsè bǎochí bǎifēn zhī bǎi yízhì.",
      vietnamese: "Màu chỉ may bắt buộc phải chuẩn xác 100% đồng màu với vải chính."
    }
  },
  {
    id: "g_fab_11",
    hanzi: "洗水唛 / 主唛 / 尺码唛",
    pinyin: "xǐshuǐmài / zhǔmài / chǐmǎmài",
    vietnamese: "Nhãn giặt HDSD / Nhãn chính / Nhãn size",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "fabric_accessory",
    commonUsage: "车缝侧缝洗水唛 (May nhãn giặt vào sườn áo)",
    exampleSentence: {
      hanzi: "注意尺码唛千万不能缝错，S码不能车成M码。",
      pinyin: "Zhùyì chǐmǎmài qiānwàn bù néng féng cuò, S mǎ bù néng chē chéng M mǎ.",
      vietnamese: "Chú ý nhãn size tuyệt đối không được may nhầm, cỡ S không được may thành cỡ M."
    }
  },
  {
    id: "g_fab_12",
    hanzi: "松紧带 / 橡筋",
    pinyin: "sōngjǐndài / xiàngjīn",
    vietnamese: "Dây thun, chun co giãn (Elastic band)",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "fabric_accessory",
    commonUsage: "裤头松紧带 (Dây thun lưng quần)",
    exampleSentence: {
      hanzi: "运动裤腰头穿两公分宽的高弹力橡筋。",
      pinyin: "Yùndòngkù yāotóu chuān liǎng gōngfēn kuān de gāo tánlì xiàngjīn.",
      vietnamese: "Lưng quần thể thao luồn dây thun co giãn cao bản rộng 2cm."
    }
  },

  // =========================================================================
  // 6. THÔNG SỐ ĐO LƯỜNG & LỖI MAY KCS (MEASUREMENTS & DEFECTS)
  // =========================================================================
  {
    id: "g_meas_1",
    hanzi: "衣长",
    pinyin: "yīcháng",
    vietnamese: "Dài áo (Body length)",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "measure_defect",
    commonUsage: "后中衣长 (Dài áo giữa thân sau)",
    exampleSentence: {
      hanzi: "这件上衣的后中衣长标准为七十二公分。",
      pinyin: "Zhè jiàn shàngyī de hòuzhōng yīcháng biāozhǔn wéi qīshí'èr gōngfēn.",
      vietnamese: "Tiêu chuẩn dài áo giữa thân sau của chiếc áo này là 72cm."
    }
  },
  {
    id: "g_meas_2",
    hanzi: "胸围",
    pinyin: "xiōngwéi",
    vietnamese: "Vòng ngực (Chest / Bust)",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "measure_defect",
    commonUsage: "腋下一英寸量胸围 (Đo ngực dưới nách 1 inch)",
    exampleSentence: {
      hanzi: "量胸围时要把衣服平铺，不能用力拉扯。",
      pinyin: "Liáng xiōngwéi shí yào bǎ yīfu píngpū, bù néng yònglì lāchě.",
      vietnamese: "Khi đo vòng ngực phải trải phẳng quần áo, không được kéo giằng mạnh."
    }
  },
  {
    id: "g_meas_3",
    hanzi: "肩宽",
    pinyin: "jiānkuān",
    vietnamese: "Rộng vai (Across shoulder)",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "measure_defect",
    commonUsage: "肩宽公差正负0.5cm (Dung sai rộng vai ±0.5cm)",
    exampleSentence: {
      hanzi: "肩宽尺寸超出了公差范围，需要调整版型。",
      pinyin: "Jiānkuān chǐcun chāochū le gōngchā fànwéi, xūyào tiáozhěng bǎnxíng.",
      vietnamese: "Kích thước rộng vai đã vượt ra ngoài phạm vi dung sai, cần điều chỉnh lại rập."
    }
  },
  {
    id: "g_meas_4",
    hanzi: "袖长",
    pinyin: "xiùcháng",
    vietnamese: "Dài tay áo (Sleeve length)",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "measure_defect",
    commonUsage: "从肩顶量到袖口 (Đo từ đỉnh vai đến cửa tay)",
    exampleSentence: {
      hanzi: "左右两只袖子的袖长必须对称一致。",
      pinyin: "Zuǒyòu liǎng zhī xiùzi de xiùcháng bìxū duìchèn yízhì.",
      vietnamese: "Chiều dài của hai ống tay trái phải bắt buộc phải đối xứng đều nhau."
    }
  },
  {
    id: "g_meas_5",
    hanzi: "腰围 / 臀围",
    pinyin: "yāowéi / túnwéi",
    vietnamese: "Vòng eo (Waist) / Vòng mông (Hip)",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "measure_defect",
    commonUsage: "裤子腰围 (Vòng eo quần)",
    exampleSentence: {
      hanzi: "这条西裤的腰围和臀围比例非常贴合人体工学。",
      pinyin: "Zhè tiáo xīkù de yāowéi hé túnwéi bǐlì fēicháng tiēhé réntǐ gōngxué.",
      vietnamese: "Tỷ lệ eo và mông của chiếc quần tây này rất vừa vặn công thái học."
    }
  },
  {
    id: "g_meas_6",
    hanzi: "色差",
    pinyin: "sèchā",
    vietnamese: "Lệch màu, khác màu (Shading / Color difference)",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "measure_defect",
    commonUsage: "裁片色差 (Lệch màu bán thành phẩm)",
    exampleSentence: {
      hanzi: "前后片存在严重色差，这一包裁片不能上线。",
      pinyin: "Qiánhòupiàn cúnzài yánzhòng sèchā, zhè yì bāo cáipiàn bù néng shàngxiàn.",
      vietnamese: "Thân trước và thân sau bị lệch màu nghiêm trọng, bó bán thành phẩm này không được đưa lên chuyền."
    }
  },
  {
    id: "g_meas_7",
    hanzi: "污渍 / 油污",
    pinyin: "wūzì / yóuwū",
    vietnamese: "Vết dơ bẩn / Vết dầu máy dính vào vải",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "measure_defect",
    commonUsage: "去油污剂 (Thuốc tẩy dầu máy)",
    exampleSentence: {
      hanzi: "后道检查时若发现机油污渍，要立刻用去污枪清洗。",
      pinyin: "Hòudào jiǎnchá shí ruò fāxiàn jīyóu wūzì, yào lìkè yòng qùwūqiāng qǐngxǐ.",
      vietnamese: "Khi khâu hoàn tất kiểm tra thấy vết dầu máy, phải lập tức dùng súng tẩy rửa sạch."
    }
  },
  {
    id: "g_meas_8",
    hanzi: "破洞 / 抽纱",
    pinyin: "pòdòng / chōushā",
    vietnamese: "Lủng lỗ / Rút sợi vải (Snagging / Hole)",
    partOfSpeech: "Danh từ",
    hskLevel: "GARMENT",
    topic: "Chuyên ngành May mặc",
    industryCategory: "measure_defect",
    commonUsage: "面料抽纱 (Vải bị xước rút sợi)",
    exampleSentence: {
      hanzi: "如果机针有毛刺，很容易在针织布上造成抽纱和破洞。",
      pinyin: "Rúguǒ jīzhēn yǒu máocì, hěn róngyì zài zhēnzhìbù shàng zàochéng chōushā hé pòdòng.",
      vietnamese: "Nếu kim máy bị xước gờ, rất dễ gây rút sợi và đâm thủng lỗ trên vải dệt kim."
    }
  }
];

export const GARMENT_DIALOGUES: GarmentDialogue[] = [
  {
    id: "gd_1",
    title: "Công nhân báo hỏng máy và lỗi đường may với Tổ trưởng",
    participants: "Công nhân (阮氏梅 - Nguyễn Thị Mai) & Tổ trưởng (李组长 - Lý Tổ trưởng)",
    situation: "Trong ca làm việc buổi sáng, công nhân phát hiện máy vắt sổ bị đứt chỉ liên tục và báo tổ trưởng xử lý.",
    keyTerms: ["拷边机 (Máy vắt sổ)", "断线 (Đứt chỉ)", "机修师傅 (Thợ máy)", "跳针 (Nhảy mũi)"],
    explanation: "Đoạn hội thoại chuẩn mực trong xưởng may khi xảy ra sự cố thiết bị hoặc đường may không đạt yêu cầu kỹ thuật.",
    lines: [
      {
        speaker: "阮氏梅 (Mai)",
        role: "Công nhân may",
        hanzi: "李组长，我的四线拷边机一直断线，而且有点跳针。",
        pinyin: "Lǐ zǔzhǎng, wǒ de sì xiàn kǎobiānjī yìzhí duànxiàn, érqiě yǒudiǎn tiàozhēn.",
        vietnamese: "Tổ trưởng Lý ơi, máy vắt sổ 4 chỉ của em liên tục bị đứt chỉ, lại còn bị bỏ mũi nữa."
      },
      {
        speaker: "李组长 (Lý)",
        role: "Tổ trưởng",
        hanzi: "你检查一下机针有没有弯？线张力调过了吗？",
        pinyin: "Nǐ jiǎnchá yíxià jīzhēn yǒu méiyǒu wān? Xiàn zhānglì tiáoguò le ma?",
        vietnamese: "Em kiểm tra xem kim máy có bị cong không? Đã chỉnh lại sức căng chỉ chưa?"
      },
      {
        speaker: "阮氏梅 (Mai)",
        role: "Công nhân may",
        hanzi: "我已经换了新机针，但还是不行，可能是旋梭或者弯针有问题。",
        pinyin: "Wǒ yǐjīng huàn le xīn jīzhēn, dàn háishì bùxíng, kěnéng shì xuánsuō huòzhě wānzhēn yǒu wèntí.",
        vietnamese: "Em đã thay kim mới rồi nhưng vẫn không được, có thể ổ chao hoặc móc chỉ có vấn đề."
      },
      {
        speaker: "李组长 (Lý)",
        role: "Tổ trưởng",
        hanzi: "好，你先停一下做别的手工，我马上叫机修师傅过来调机。",
        pinyin: "Hǎo, nǐ xiān tíng yíxià zuò bié de shǒugōng, wǒ mǎshàng jiào jīxiū shīfu guòlái tiáojī.",
        vietnamese: "Được rồi, em tạm dừng làm công việc thủ công khác, anh gọi ngay thợ máy qua chỉnh máy."
      }
    ]
  },
  {
    id: "gd_2",
    title: "Tổ trưởng trao đổi với Kỹ sư IE về Bấm giờ và Cân bằng chuyền",
    participants: "Tổ trưởng (王组长 - Vương Tổ trưởng) & Kỹ sư IE (张工程师 - Trương Kỹ sư)",
    situation: "Kỹ sư IE xuống chuyền bấm giờ đo SAM công đoạn tra cổ và đề xuất phương án cân bằng chuyền nâng cao năng suất.",
    keyTerms: ["IE测时 (IE bấm giờ)", "标准工时 SAM (Thời gian chuẩn)", "瓶颈工序 (Nút thắt cổ chai)", "产线平衡 (Cân bằng chuyền)"],
    explanation: "Thuật ngữ nâng cao về tối ưu hóa quy trình chuyền may, giảm thiểu thời gian chờ giữa các công đoạn.",
    lines: [
      {
        speaker: "张工 (Trương IE)",
        role: "Kỹ sư IE",
        hanzi: "王组长，今天我们来测量这批外套上领工序的标准工时。",
        pinyin: "Wáng zǔzhǎng, jīntiān wǒmen lái cèliáng zhè pī wàitào shànglǐng gōngxù de biāozhǔn gōngshí.",
        vietnamese: "Tổ trưởng Vương, hôm nay chúng tôi đến đo thời gian chuẩn (SAM) công đoạn tra cổ lô áo khoác này."
      },
      {
        speaker: "王组长 (Vương)",
        role: "Tổ trưởng",
        hanzi: "目前上领是我们的瓶颈工序，前后堆了好多裁片。",
        pinyin: "Mùqián shànglǐng shì wǒmen de píngjǐng gōngxù, qiánhòu duī le hǎoduō cáipiàn.",
        vietnamese: "Hiện tại tra cổ đang là công đoạn nút thắt cổ chai của chúng tôi, bán thành phẩm ùn ứ rất nhiều."
      },
      {
        speaker: "张工 (Trương IE)",
        role: "Kỹ sư IE",
        hanzi: "我们建议把领角定位拆分为辅助小工序，这样可以提升整体平衡率。",
        pinyin: "Wǒmen jiànyì bǎ lǐngjiǎo dìngwèi chāifēn wéi fǔzhù xiǎo gōngxù, zhèyàng kěyǐ tíshēng zhěngtǐ pínghénglǜ.",
        vietnamese: "Chúng tôi đề xuất tách bước định vị góc cổ thành công đoạn phụ trợ, như vậy sẽ nâng cao tỷ lệ cân bằng chuyền."
      }
    ]
  },
  {
    id: "gd_3",
    title: "Tổ trưởng và QC xử lý Lỗi kích thước & Đường may lệch",
    participants: "Nhân viên QC (陈QC - Trần QC) & Tổ trưởng (陈组长 - Trần Tổ trưởng)",
    situation: "QC kiểm tra tại chuyền và phát hiện kích thước vòng ngực bị âm 1.5cm so với bảng thông số techpack.",
    keyTerms: ["工艺单 (Techpack)", "尺寸超差 (Sai lệch kích thước)", "公差 (Dung sai)", "返工 (Sửa lại hàng lỗi)"],
    explanation: "Cách trao đổi tiêu chuẩn chất lượng, kích thước dung sai và phân loại hàng cần sửa (返工).",
    lines: [
      {
        speaker: "陈QC (Trần QC)",
        role: "Kiểm phẩm QC",
        hanzi: "组长，抽检发现这批L码衣服胸围比工艺单小了一点五公分，超出公差了。",
        pinyin: "Zǔzhǎng, chōujiǎn fāxiàn zhè pī L mǎ yīfu xiōngwéi bǐ gōngyìdān xiǎo le yì diǎn wǔ gōngfēn, chāochū gōngchā le.",
        vietnamese: "Tổ trưởng ơi, kiểm tra ngẫu nhiên thấy cỡ L lô này vòng ngực nhỏ hơn bảng thông số 1.5cm, vượt quá dung sai rồi."
      },
      {
        speaker: "陈组长 (Trần)",
        role: "Tổ trưởng",
        hanzi: "怎么会这样？是侧缝止口缝大了，还是裁片缩水了？",
        pinyin: "Zěnme huì zhèyàng? Shì cèfèng zhǐkǒu fèng dà le, háishì cáipiàn suōshuǐ le?",
        vietnamese: "Sao lại như vậy? Là do may đường mép sườn to quá hay do vải cắt bị co rút?"
      },
      {
        speaker: "陈QC (Trần QC)",
        role: "Kiểm phẩm QC",
        hanzi: "是侧缝缝进去了零点五公分。已经做好的二十件必须拆开返工。",
        pinyin: "Shì cèfèng fèng jìnqù le líng diǎn wǔ gōngfēn. Yǐjīng zuò hǎo de èrshí jiàn bìxū chāikāi fǎngōng.",
        vietnamese: "Là do đường may sườn may lẹm vào 0.5cm. 20 chiếc đã may xong bắt buộc phải tháo ra sửa lại."
      }
    ]
  },
  {
    id: "gd_4",
    title: "Người Việt trao đổi với Giám đốc người Trung Quốc về Kế hoạch xuất hàng",
    participants: "Quản lý sản xuất người Việt (阿福 - A Phúc) & Giám đốc xưởng người Trung Quốc (张总 - Tổng giám đốc Trương)",
    situation: "Họp giao ban buổi chiều về tiến độ hoàn thành đơn hàng 50.000 áo polo xuất khẩu đi thị trường Mỹ.",
    keyTerms: ["出货日期 (Ngày xuất hàng)", "装箱 (Đóng thùng carton)", "日产量 (Sản lượng ngày)", "加班 (Tăng ca)"],
    explanation: "Đoạn hội thoại cấp quản lý về điều phối nguồn lực, tiến độ xuất khẩu và tăng ca.",
    lines: [
      {
        speaker: "张总 (Sếp Trương)",
        role: "Giám đốc người Trung Quốc",
        hanzi: "阿福，那批五万件保罗衫下周五必须装柜，目前进度怎么样？",
        pinyin: "Ā Fú, nà pī wǔ wàn jiàn bǎoluóshān xià zhōuwǔ bìxū zhuāngguì, mùqián jìndù zěnmeyàng?",
        vietnamese: "A Phúc, lô 50.000 áo polo đó thứ 6 tuần sau phải đóng container xuất khẩu, tiến độ hiện tại thế nào rồi?"
      },
      {
        speaker: "阿福 (Phúc)",
        role: "Quản lý sản xuất người Việt",
        hanzi: "报告张总，缝制已经完成了八成，后道烫衣和包装正在全力跟进。",
        pinyin: "Bàogào Zhāng zǒng, féngzhì yǐjīng wánchéng le bā chéng, hòudào tàngyī hé bāozhuāng zhèngzài quánlì gēnjìn.",
        vietnamese: "Báo cáo sếp Trương, khâu may đã hoàn thành được 80%, bộ phận ủi và đóng gói đang dốc toàn lực bám sát tiến độ."
      },
      {
        speaker: "张总 (Sếp Trương)",
        role: "Giám đốc người Trung Quốc",
        hanzi: "很好！质量千万不能马虎，安排后道周六适当加班，确保准时交货。",
        pinyin: "Hěn hǎo! Zhìliàng qiānwàn bù néng mǎhu, ānpái hòudào zhōuliù shìdàng jiābān, quèbǎo zhǔnshí jiāohuò.",
        vietnamese: "Rất tốt! Chất lượng tuyệt đối không được sơ sài, bố trí khâu hoàn tất thứ 7 tăng ca hợp lý, đảm bảo giao hàng đúng hạn."
      }
    ]
  },
  {
    id: "gd_5",
    title: "Đón tiếp Khách hàng & Đại diện Thương hiệu kiểm tra đánh giá xưởng (Audit)",
    participants: "Đại diện khách hàng (Lisa - 买家代表) & Giám đốc kỹ thuật xưởng (刘厂长 - Giám đốc Lưu)",
    situation: "Khách hàng quốc tế đến kiểm tra đánh giá xưởng may về hệ thống quản lý chất lượng QA, điều kiện môi trường làm việc và an toàn lao động.",
    keyTerms: ["验厂 (Audit / Kiểm định xưởng)", "质量控制体系 (Hệ thống quản lý chất lượng)", "消防设施 (Thiết bị PCCC)", "样品室 (Phòng mẫu)"],
    explanation: "Mẫu hội thoại tiêu chuẩn cao cấp khi tiếp đón đối tác và thanh tra khách hàng mua hàng quốc tế.",
    lines: [
      {
        speaker: "Lisa (Khách hàng)",
        role: "Đại diện thương hiệu",
        hanzi: "刘厂长，请先带我们参观裁剪车间和检验包装区。",
        pinyin: "Liú chǎngzhǎng, qǐng xiān dài wǒmen cānguān cáijiǎn chējiān hé jiǎnyàn bāozhuāng qū.",
        vietnamese: "Giám đốc Lưu, xin mời dẫn chúng tôi đi tham quan xưởng cắt và khu vực kiểm phẩm đóng gói trước."
      },
      {
        speaker: "刘厂长 (Lưu)",
        role: "Giám đốc kỹ thuật xưởng",
        hanzi: "没问题！我们工厂严格实行四级质检制度，所有断针都有专人登记回收。",
        pinyin: "Méi wèntí! Wǒmen gōngchǎng yángé shíxíng sì jí zhìjiǎn zhìdù, suǒyǒu duànzhēn dōu yǒu zhuānrén dēngjì huíshōu.",
        vietnamese: "Không vấn đề gì! Nhà máy chúng tôi thực hiện nghiêm ngặt chế độ kiểm soát chất lượng 4 cấp, toàn bộ kim gãy đều có người chuyên trách đăng ký thu hồi."
      },
      {
        speaker: "Lisa (Khách hàng)",
        role: "Đại diện thương hiệu",
        hanzi: "车间通道非常整洁，温湿度控制也很好，符合我们的验厂标准。",
        pinyin: "Chējiān tōngdào fēicháng zhěngjié, wēn-shīdù kòngzhì yě hěn hǎo, fúhé wǒmen de yànchǎng biāozhǔn.",
        vietnamese: "Lối đi trong xưởng rất ngăn nắp sạch sẽ, kiểm soát nhiệt độ độ ẩm cũng rất tốt, đáp ứng đúng chuẩn đánh giá xưởng của chúng tôi."
      }
    ]
  },
  {
    id: "gd_6",
    title: "Quản lý Đơn hàng (Merchandiser) đàm phán màu Lab Dip & Ngày gửi mẫu Fit",
    participants: "Quản lý đơn hàng (小林 - Tiểu Lâm) & Nhà cung cấp vải (赵经理 - Giám đốc Triệu)",
    situation: "Merchandiser theo dõi tiến độ duyệt mẫu màu nhuộm Lab Dip và thúc đẩy nhà cung ứng giao vải mẫu kịp làm Fit Sample.",
    keyTerms: ["打色样 / 色卡 (Lab Dip / Bảng màu)", "对色光源 D65 (Hộp soi màu chuẩn D65)", "产前样 PPS (Mẫu tiền sản xuất)", "交期 (Hạn giao hàng)"],
    explanation: "Từ ngữ thực tế dành cho vị trí Merchandiser (Theo dõi đơn hàng) và Phòng phát triển mẫu (R&D Garment).",
    lines: [
      {
        speaker: "小林 (Merchandiser)",
        role: "Quản lý đơn hàng",
        hanzi: "赵经理，上周送来的湖蓝色打样在D65光源下看偏红了，客户没有通过。",
        pinyin: "Zhào jīnglǐ, shàng zhōu sònglái de húlánsè dǎyàng zài D65 guāngyuán xià kàn piānhóng le, kèhù méiyǒu tōngguò.",
        vietnamese: "Giám đốc Triệu, mẫu màu xanh hồ gửi tuần trước khi soi dưới ánh sáng chuẩn D65 bị ánh đỏ, khách hàng chưa duyệt."
      },
      {
        speaker: "赵经理 (Triệu)",
        role: "Nhà cung cấp vải",
        hanzi: "我们染厂今晚重新打样调整色光，明天下午用顺丰加急送三个色选给您。",
        pinyin: "Wǒmen rǎnchǎng jīnwǎn chóngxīn dǎyàng tiáozhěng sèguāng, míngtiān xiàwǔ yòng shùnfēng jiājí sòng sān gè sèxuǎn gěi nín.",
        vietnamese: "Nhà máy nhuộm của chúng tôi tối nay sẽ chỉnh lại ánh màu và nhuộm lại mẫu, chiều mai sẽ gửi hỏa tốc 3 phương án lựa chọn cho bạn."
      },
      {
        speaker: "小林 (Merchandiser)",
        role: "Quản lý đơn hàng",
        hanzi: "好的，请务必保证质量，我们要赶在下周二把产前样寄给买家确认。",
        pinyin: "Hǎo de, qǐng wùbì bǎozhèng zhìliàng, wǒmen yào gǎn zài xià zhōu'èr bǎ chǎnqiányàng jì gěi mǎijiā quèrèn.",
        vietnamese: "Vâng, xin nhất định đảm bảo chất lượng, chúng tôi phải kịp gửi mẫu PPS tiền sản xuất cho khách duyệt vào thứ 3 tuần tới."
      }
    ]
  }
];
