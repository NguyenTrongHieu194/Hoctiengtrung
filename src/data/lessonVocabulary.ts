import { WordItem, Lesson } from "../types";
import { ALL_HSK_VOCABULARY } from "./hskVocab";
import { GARMENT_TERMS } from "./garmentData";
import { LESSON_VOCABULARY_EXTENSIONS } from "./lessonVocabExtension";

// Từ vựng chuẩn hóa chuyên biệt cho từng bài học HSK 1 - HSK 6
export const LESSON_VOCABULARY_MAP: Record<string, WordItem[]> = {
  // =========================================================================
  // HSK 1 (15 bài học chuẩn quốc tế)
  // =========================================================================
  hsk1_l1: [
    { id: "hsk1_l1_w1", hanzi: "你", pinyin: "nǐ", vietnamese: "Bạn, anh, chị (ngôi thứ 2)", partOfSpeech: "Đại từ", hskLevel: "HSK1", topic: "Chào hỏi & Xưng hô", exampleSentence: { hanzi: "你好！", pinyin: "Nǐ hǎo!", vietnamese: "Chào bạn!" } },
    { id: "hsk1_l1_w2", hanzi: "好", pinyin: "hǎo", vietnamese: "Tốt, khỏe, đẹp, hay", partOfSpeech: "Tính từ", hskLevel: "HSK1", topic: "Chào hỏi & Xã giao", exampleSentence: { hanzi: "我很好。", pinyin: "Wǒ hěn hǎo.", vietnamese: "Tôi rất khỏe." } },
    { id: "hsk1_l1_w3", hanzi: "您", pinyin: "nín", vietnamese: "Ngài, ông, bác (kính ngữ)", partOfSpeech: "Đại từ", hskLevel: "HSK1", topic: "Chào hỏi & Xưng hô", exampleSentence: { hanzi: "老师，您好！", pinyin: "Lǎoshī, nín hǎo!", vietnamese: "Em chào thầy ạ!" } },
    { id: "hsk1_l1_w4", hanzi: "你们", pinyin: "nǐmen", vietnamese: "Các bạn, các anh chị", partOfSpeech: "Đại từ", hskLevel: "HSK1", topic: "Chào hỏi & Xưng hô", exampleSentence: { hanzi: "你们好！", pinyin: "Nǐmen hǎo!", vietnamese: "Chào các bạn!" } },
    { id: "hsk1_l1_w5", hanzi: "老师", pinyin: "lǎoshī", vietnamese: "Thầy cô giáo", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Nghề nghiệp & Học đường", exampleSentence: { hanzi: "他是我们的老师。", pinyin: "Tā shì wǒmen de lǎoshī.", vietnamese: "Thầy ấy là giáo viên của chúng tôi." } },
    { id: "hsk1_l1_w6", hanzi: "再见", pinyin: "zàijiàn", vietnamese: "Tạm biệt, hẹn gặp lại", partOfSpeech: "Động từ / Thán từ", hskLevel: "HSK1", topic: "Chào hỏi & Xã giao", exampleSentence: { hanzi: "明天见，再见！", pinyin: "Míngtiān jiàn, zàijiàn!", vietnamese: "Mai gặp lại, tạm biệt nhé!" } }
  ],

  hsk1_l2: [
    { id: "hsk1_l2_w1", hanzi: "谢谢", pinyin: "xièxie", vietnamese: "Cảm ơn", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Ứng xử lịch thiệp", exampleSentence: { hanzi: "谢谢你的帮助！", pinyin: "Xièxie nǐ de bāngzhù!", vietnamese: "Cảm ơn sự giúp đỡ của bạn!" } },
    { id: "hsk1_l2_w2", hanzi: "不", pinyin: "bù", vietnamese: "Không, chẳng (phủ định)", partOfSpeech: "Phó từ", hskLevel: "HSK1", topic: "Phó từ & Trợ từ", exampleSentence: { hanzi: "我不是老师。", pinyin: "Wǒ bú shì lǎoshī.", vietnamese: "Tôi không phải là giáo viên." } },
    { id: "hsk1_l2_w3", hanzi: "客气", pinyin: "kèqi", vietnamese: "Khách sáo, khách khí", partOfSpeech: "Tính từ", hskLevel: "HSK1", topic: "Ứng xử lịch thiệp", exampleSentence: { hanzi: "别客气！", pinyin: "Bié kèqi!", vietnamese: "Đừng khách sáo!" } },
    { id: "hsk1_l2_w4", hanzi: "不客气", pinyin: "bú kèqi", vietnamese: "Không có chi, đừng khách sáo", partOfSpeech: "Cụm giao tiếp", hskLevel: "HSK1", topic: "Ứng xử lịch thiệp", exampleSentence: { hanzi: "谢谢你！ - 不客气。", pinyin: "Xièxie nǐ! - Bú kèqi.", vietnamese: "Cảm ơn bạn! - Không có chi." } },
    { id: "hsk1_l2_w5", hanzi: "对不起", pinyin: "duìbuqǐ", vietnamese: "Xin lỗi", partOfSpeech: "Cụm giao tiếp", hskLevel: "HSK1", topic: "Ứng xử lịch thiệp", exampleSentence: { hanzi: "对不起，我来晚了。", pinyin: "Duìbuqǐ, wǒ lái wǎn le.", vietnamese: "Xin lỗi, tôi đến muộn." } },
    { id: "hsk1_l2_w6", hanzi: "没关系", pinyin: "méi guānxi", vietnamese: "Không sao đâu, không hề gì", partOfSpeech: "Cụm giao tiếp", hskLevel: "HSK1", topic: "Ứng xử lịch thiệp", exampleSentence: { hanzi: "对不起！ - 没关系。", pinyin: "Duìbuqǐ! - Méi guānxi.", vietnamese: "Xin lỗi! - Không sao đâu." } }
  ],

  hsk1_l3: [
    { id: "hsk1_l3_w1", hanzi: "叫", pinyin: "jiào", vietnamese: "Tên là, gọi là", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Giới thiệu bản thân", exampleSentence: { hanzi: "我叫王明。", pinyin: "Wǒ jiào Wáng Míng.", vietnamese: "Tôi tên là Vương Minh." } },
    { id: "hsk1_l3_w2", hanzi: "什么", pinyin: "shénme", vietnamese: "Cái gì, gì (đại từ nghi vấn)", partOfSpeech: "Đại từ", hskLevel: "HSK1", topic: "Nghi vấn", exampleSentence: { hanzi: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", vietnamese: "Bạn tên là gì?" } },
    { id: "hsk1_l3_w3", hanzi: "名字", pinyin: "míngzi", vietnamese: "Tên, họ tên", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Giới thiệu bản thân", exampleSentence: { hanzi: "你的名字很好听。", pinyin: "Nǐ de míngzi hěn hǎotīng.", vietnamese: "Tên của bạn nghe rất hay." } },
    { id: "hsk1_l3_w4", hanzi: "是", pinyin: "shì", vietnamese: "Là, phải, đúng", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Ngữ pháp cơ bản", exampleSentence: { hanzi: "我是学生。", pinyin: "Wǒ shì xuésheng.", vietnamese: "Tôi là học sinh." } },
    { id: "hsk1_l3_w5", hanzi: "哪", pinyin: "nǎ", vietnamese: "Nào (nghi vấn)", partOfSpeech: "Đại từ", hskLevel: "HSK1", topic: "Nghi vấn", exampleSentence: { hanzi: "你是哪国人？", pinyin: "Nǐ shì nǎ guó rén?", vietnamese: "Bạn là người nước nào?" } },
    { id: "hsk1_l3_w6", hanzi: "国", pinyin: "guó", vietnamese: "Quốc gia, nước", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Quốc gia & Địa lý", exampleSentence: { hanzi: "中国很大。", pinyin: "Zhōngguó hěn dà.", vietnamese: "Trung Quốc rất rộng lớn." } },
    { id: "hsk1_l3_w7", hanzi: "人", pinyin: "rén", vietnamese: "Người", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Con người", exampleSentence: { hanzi: "我们是越南人。", pinyin: "Wǒmen shì Yuènán rén.", vietnamese: "Chúng tôi là người Việt Nam." } },
    { id: "hsk1_l3_w8", hanzi: "中国", pinyin: "Zhōngguó", vietnamese: "Trung Quốc", partOfSpeech: "Danh từ riêng", hskLevel: "HSK1", topic: "Quốc gia", exampleSentence: { hanzi: "我想去中国。", pinyin: "Wǒ xiǎng qù Zhōngguó.", vietnamese: "Tôi muốn đi Trung Quốc." } }
  ],

  hsk1_l4: [
    { id: "hsk1_l4_w1", hanzi: "她", pinyin: "tā", vietnamese: "Cô ấy, bà ấy, chị ấy", partOfSpeech: "Đại từ", hskLevel: "HSK1", topic: "Đại từ xưng hô", exampleSentence: { hanzi: "她是我的老师。", pinyin: "Tā shì wǒ de lǎoshī.", vietnamese: "Cô ấy là giáo viên của tôi." } },
    { id: "hsk1_l4_w2", hanzi: "谁", pinyin: "shéi / shuí", vietnamese: "Ai, người nào", partOfSpeech: "Đại từ nghi vấn", hskLevel: "HSK1", topic: "Nghi vấn", exampleSentence: { hanzi: "他是谁？", pinyin: "Tā shì shéi?", vietnamese: "Anh ấy là ai?" } },
    { id: "hsk1_l4_w3", hanzi: "的", pinyin: "de", vietnamese: "Của (trợ từ sở hữu)", partOfSpeech: "Trợ từ", hskLevel: "HSK1", topic: "Trợ từ", exampleSentence: { hanzi: "这是我的书。", pinyin: "Zhè shì wǒ de shū.", vietnamese: "Đây là sách của tôi." } },
    { id: "hsk1_l4_w4", hanzi: "汉语", pinyin: "Hànyǔ", vietnamese: "Tiếng Trung, Hán ngữ", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Ngôn ngữ & Học tập", exampleSentence: { hanzi: "我喜欢学汉语。", pinyin: "Wǒ xǐhuan xué Hànyǔ.", vietnamese: "Tôi thích học tiếng Trung." } },
    { id: "hsk1_l4_w5", hanzi: "同学", pinyin: "tóngxué", vietnamese: "Bạn cùng lớp", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Mối quan hệ", exampleSentence: { hanzi: "我们是大学同学。", pinyin: "Wǒmen shì dàxué tóngxué.", vietnamese: "Chúng tôi là bạn cùng học đại học." } },
    { id: "hsk1_l4_w6", hanzi: "朋友", pinyin: "péngyou", vietnamese: "Bạn bè, bạn thân", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Mối quan hệ", exampleSentence: { hanzi: "他是我的好朋友。", pinyin: "Tā shì wǒ de hǎo péngyou.", vietnamese: "Cậu ấy là bạn tốt của tôi." } }
  ],

  hsk1_l5: [
    { id: "hsk1_l5_w1", hanzi: "家", pinyin: "jiā", vietnamese: "Gia đình, nhà", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Gia đình & Đời sống", exampleSentence: { hanzi: "我家在北京。", pinyin: "Wǒ jiā zài Běijīng.", vietnamese: "Nhà tôi ở Bắc Kinh." } },
    { id: "hsk1_l5_w2", hanzi: "有", pinyin: "yǒu", vietnamese: "Có", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Động từ cơ bản", exampleSentence: { hanzi: "我有三本书。", pinyin: "Wǒ yǒu sān běn shū.", vietnamese: "Tôi có 3 quyển sách." } },
    { id: "hsk1_l5_w3", hanzi: "口", pinyin: "kǒu", vietnamese: "Người (lượng từ số người trong gia đình)", partOfSpeech: "Lượng từ", hskLevel: "HSK1", topic: "Lượng từ", exampleSentence: { hanzi: "我家有四口人。", pinyin: "Wǒ jiā yǒu sì kǒu rén.", vietnamese: "Nhà tôi có 4 người." } },
    { id: "hsk1_l5_w4", hanzi: "女儿", pinyin: "nǚ'ér", vietnamese: "Con gái", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Gia đình", exampleSentence: { hanzi: "她女儿今年六岁。", pinyin: "Tā nǚ'ér jīnnián liù suì.", vietnamese: "Con gái cô ấy năm nay 6 tuổi." } },
    { id: "hsk1_l5_w5", hanzi: "儿子", pinyin: "érzi", vietnamese: "Con trai", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Gia đình", exampleSentence: { hanzi: "他儿子很聪明。", pinyin: "Tā érzi hěn cōngming.", vietnamese: "Con trai anh ấy rất thông minh." } },
    { id: "hsk1_l5_w6", hanzi: "岁", pinyin: "suì", vietnamese: "Tuổi (lượng từ tính tuổi tác)", partOfSpeech: "Lượng từ", hskLevel: "HSK1", topic: "Tuổi tác & Số đếm", exampleSentence: { hanzi: "我今年二十岁。", pinyin: "Wǒ jīnnián èrshí suì.", vietnamese: "Năm nay tôi 20 tuổi." } },
    { id: "hsk1_l5_w7", hanzi: "今年", pinyin: "jīnnián", vietnamese: "Năm nay", partOfSpeech: "Danh từ thời gian", hskLevel: "HSK1", topic: "Thời gian", exampleSentence: { hanzi: "今年我二十岁。", pinyin: "Jīnnián wǒ èrshí suì.", vietnamese: "Năm nay tôi 20 tuổi." } },
    { id: "hsk1_l5_w8", hanzi: "多大", pinyin: "duō dà", vietnamese: "Bao nhiêu tuổi (hỏi người cùng lứa/nhỏ hơn)", partOfSpeech: "Cụm từ nghi vấn", hskLevel: "HSK1", topic: "Nghi vấn", exampleSentence: { hanzi: "你多大了？", pinyin: "Nǐ duō dà le?", vietnamese: "Bạn bao nhiêu tuổi rồi?" } }
  ],

  hsk1_l6: [
    { id: "hsk1_l6_w1", hanzi: "会", pinyin: "huì", vietnamese: "Biết (qua học tập, rèn luyện)", partOfSpeech: "Động từ năng nguyện", hskLevel: "HSK1", topic: "Năng lực & Kỹ năng", exampleSentence: { hanzi: "我会说汉语。", pinyin: "Wǒ huì shuō Hànyǔ.", vietnamese: "Tôi biết nói tiếng Trung." } },
    { id: "hsk1_l6_w2", hanzi: "说", pinyin: "shuō", vietnamese: "Nói, bảo", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Giao tiếp", exampleSentence: { hanzi: "请你说慢一点儿。", pinyin: "Qǐng nǐ shuō màn yìdiǎnr.", vietnamese: "Xin bạn nói chậm lại một chút." } },
    { id: "hsk1_l6_w3", hanzi: "写", pinyin: "xiě", vietnamese: "Viết", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Học tập & Chữ Hán", exampleSentence: { hanzi: "我会写汉字。", pinyin: "Wǒ huì xiě hànzì.", vietnamese: "Tôi biết viết chữ Hán." } },
    { id: "hsk1_l6_w4", hanzi: "字", pinyin: "zì", vietnamese: "Chữ, mặt chữ", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Học tập & Chữ Hán", exampleSentence: { hanzi: "这个字怎么读？", pinyin: "Zhège zì zěnme dú?", vietnamese: "Chữ này đọc như thế nào?" } },
    { id: "hsk1_l6_w5", hanzi: "汉字", pinyin: "hànzì", vietnamese: "Chữ Hán", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Học tập & Chữ Hán", exampleSentence: { hanzi: "汉字很有意思。", pinyin: "Hànzì hěn yǒu yìsi.", vietnamese: "Chữ Hán rất thú vị." } },
    { id: "hsk1_l6_w6", hanzi: "怎么", pinyin: "zěnme", vietnamese: "Làm sao, thế nào (hỏi cách thức)", partOfSpeech: "Đại từ nghi vấn", hskLevel: "HSK1", topic: "Nghi vấn", exampleSentence: { hanzi: "这个词怎么用？", pinyin: "Zhège cí zěnme yòng?", vietnamese: "Từ này dùng như thế nào?" } },
    { id: "hsk1_l6_w7", hanzi: "读", pinyin: "dú", vietnamese: "Đọc", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Học tập", exampleSentence: { hanzi: "请跟我读。", pinyin: "Qǐng gēn wǒ dú.", vietnamese: "Xin đọc theo tôi." } },
    { id: "hsk1_l6_w8", hanzi: "菜", pinyin: "cài", vietnamese: "Món ăn, rau cỏ", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Ẩm thực", exampleSentence: { hanzi: "中国菜很好吃。", pinyin: "Zhōngguó cài hěn hǎochī.", vietnamese: "Món ăn Trung Quốc rất ngon." } }
  ],

  hsk1_l7: [
    { id: "hsk1_l7_w1", hanzi: "今天", pinyin: "jīntiān", vietnamese: "Hôm nay", partOfSpeech: "Danh từ thời gian", hskLevel: "HSK1", topic: "Thời gian & Lịch trình", exampleSentence: { hanzi: "今天天气很好。", pinyin: "Jīntiān tiānqì hěn hǎo.", vietnamese: "Thời tiết hôm nay rất đẹp." } },
    { id: "hsk1_l7_w2", hanzi: "月", pinyin: "yuè", vietnamese: "Tháng, mặt trăng", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Thời gian & Ngày tháng", exampleSentence: { hanzi: "八月三十号。", pinyin: "Bā yuè sānshí hào.", vietnamese: "Ngày 30 tháng 8." } },
    { id: "hsk1_l7_w3", hanzi: "号", pinyin: "hào", vietnamese: "Ngày (văn nói), số thứ tự", partOfSpeech: "Danh từ / Lượng từ", hskLevel: "HSK1", topic: "Thời gian & Ngày tháng", exampleSentence: { hanzi: "今天几号？", pinyin: "Jīntiān jǐ hào?", vietnamese: "Hôm nay ngày mùng mấy?" } },
    { id: "hsk1_l7_w4", hanzi: "星期", pinyin: "xīngqī", vietnamese: "Tuần, thứ trong tuần", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Thời gian & Thứ ngày", exampleSentence: { hanzi: "今天星期几？ - 星期一。", pinyin: "Jīntiān xīngqī jǐ? - Xīngqīyī.", vietnamese: "Hôm nay thứ mấy? - Thứ Hai." } },
    { id: "hsk1_l7_w5", hanzi: "昨天", pinyin: "zuótiān", vietnamese: "Hôm qua", partOfSpeech: "Danh từ thời gian", hskLevel: "HSK1", topic: "Thời gian & Quá khứ", exampleSentence: { hanzi: "昨天我去学校了。", pinyin: "Zuótiān wǒ qù xuéxiào le.", vietnamese: "Hôm qua tôi đã đến trường." } },
    { id: "hsk1_l7_w6", hanzi: "明天", pinyin: "míngtiān", vietnamese: "Ngày mai", partOfSpeech: "Danh từ thời gian", hskLevel: "HSK1", topic: "Thời gian & Tương lai", exampleSentence: { hanzi: "明天见！", pinyin: "Míngtiān jiàn!", vietnamese: "Hẹn gặp lại ngày mai!" } },
    { id: "hsk1_l7_w7", hanzi: "生日", pinyin: "shēngrì", vietnamese: "Sinh nhật", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Lễ hội & Sinh hoạt", exampleSentence: { hanzi: "祝你生日快乐！", pinyin: "Zhù nǐ shēngrì kuàilè!", vietnamese: "Chúc bạn sinh nhật vui vẻ!" } }
  ],

  hsk1_l8: [
    { id: "hsk1_l8_w1", hanzi: "想", pinyin: "xiǎng", vietnamese: "Muốn, dự định, nhớ", partOfSpeech: "Động từ năng nguyện", hskLevel: "HSK1", topic: "Nguyện vọng & Tâm lý", exampleSentence: { hanzi: "我想喝茶。", pinyin: "Wǒ xiǎng hē chá.", vietnamese: "Tôi muốn uống trà." } },
    { id: "hsk1_l8_w2", hanzi: "喝", pinyin: "hē", vietnamese: "Uống", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Ăn uống & Đồ uống", exampleSentence: { hanzi: "你想喝什么？", pinyin: "Nǐ xiǎng hē shénme?", vietnamese: "Bạn muốn uống gì?" } },
    { id: "hsk1_l8_w3", hanzi: "茶", pinyin: "chá", vietnamese: "Trà, chè", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Ẩm thực & Thức uống", exampleSentence: { hanzi: "这是一杯中国绿茶。", pinyin: "Zhè乱 shì yì bēi Zhōngguó lǜchá.", vietnamese: "Đây là một ly trà xanh Trung Quốc." } },
    { id: "hsk1_l8_w4", hanzi: "吃", pinyin: "chī", vietnamese: "Ăn", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Ăn uống & Ẩm thực", exampleSentence: { hanzi: "我想吃米饭。", pinyin: "Wǒ xiǎng chī mǐfàn.", vietnamese: "Tôi muốn ăn cơm." } },
    { id: "hsk1_l8_w5", hanzi: "多少", pinyin: "duōshao", vietnamese: "Bao nhiêu (số lượng trên 10)", partOfSpeech: "Đại từ nghi vấn", hskLevel: "HSK1", topic: "Nghi vấn & Mua sắm", exampleSentence: { hanzi: "这个多少钱？", pinyin: "Zhège duōshao qián?", vietnamese: "Cái này bao nhiêu tiền?" } },
    { id: "hsk1_l8_w6", hanzi: "钱", pinyin: "qián", vietnamese: "Tiền bạc, giá tiền", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Mua sắm & Tài chính", exampleSentence: { hanzi: "我没有钱。", pinyin: "Wǒ méiyǒu qián.", vietnamese: "Tôi không có tiền." } },
    { id: "hsk1_l8_w7", hanzi: "块", pinyin: "kuài", vietnamese: "Đồng, tệ (đơn vị tiền tệ khẩu ngữ), miếng", partOfSpeech: "Lượng từ", hskLevel: "HSK1", topic: "Lượng từ & Tiền tệ", exampleSentence: { hanzi: "五块钱一杯。", pinyin: "Wǔ kuài qián yì bēi.", vietnamese: "Năm tệ một ly." } },
    { id: "hsk1_l8_w8", hanzi: "杯子", pinyin: "bēizi", vietnamese: "Chiếc cốc, ly, chén", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Đồ gia dụng & Vật dụng", exampleSentence: { hanzi: "这个杯子很漂亮。", pinyin: "Zhège bēizi hěn piàoliang.", vietnamese: "Chiếc cốc này rất đẹp." } }
  ],

  hsk1_l9: [
    { id: "hsk1_l9_w1", hanzi: "在", pinyin: "zài", vietnamese: "Ở, tại (giới từ / động từ)", partOfSpeech: "Giới từ", hskLevel: "HSK1", topic: "Vị trí & Nơi chốn", exampleSentence: { hanzi: "他在家。", pinyin: "Tā zài jiā.", vietnamese: "Anh ấy ở nhà." } },
    { id: "hsk1_l9_w2", hanzi: "哪儿", pinyin: "nǎr", vietnamese: "Ở đâu, nơi nào", partOfSpeech: "Đại từ nghi vấn", hskLevel: "HSK1", topic: "Nghi vấn nơi chốn", exampleSentence: { hanzi: "你在哪儿工作？", pinyin: "Nǐ zài nǎr gōngzuò?", vietnamese: "Bạn làm việc ở đâu?" } },
    { id: "hsk1_l9_w3", hanzi: "工作", pinyin: "gōngzuò", vietnamese: "Công việc, làm việc", partOfSpeech: "Động từ / Danh từ", hskLevel: "HSK1", topic: "Công việc & Nghề nghiệp", exampleSentence: { hanzi: "我在医院工作。", pinyin: "Wǒ zài yīyuàn gōngzuò.", vietnamese: "Tôi làm việc ở bệnh viện." } },
    { id: "hsk1_l9_w4", hanzi: "医院", pinyin: "yīyuàn", vietnamese: "Bệnh viện", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Địa điểm & Y tế", exampleSentence: { hanzi: "医院在前面。", pinyin: "Yīyuàn zài qiánmian.", vietnamese: "Bệnh viện ở phía trước." } },
    { id: "hsk1_l9_w5", hanzi: "医生", pinyin: "yīshēng", vietnamese: "Bác sĩ", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Nghề nghiệp", exampleSentence: { hanzi: "我爸爸是医生。", pinyin: "Wǒ bàba shì yīshēng.", vietnamese: "Bố tôi là bác sĩ." } },
    { id: "hsk1_l9_w6", hanzi: "爸爸", pinyin: "bàba", vietnamese: "Bố, ba, cha", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Gia đình", exampleSentence: { hanzi: "我爸爸五十岁。", pinyin: "Wǒ bàba wǔshí suì.", vietnamese: "Bố tôi 50 tuổi." } },
    { id: "hsk1_l9_w7", hanzi: "妈妈", pinyin: "māma", vietnamese: "Mẹ, má", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Gia đình", exampleSentence: { hanzi: "妈妈在做饭。", pinyin: "Māma zài zuò fàn.", vietnamese: "Mẹ đang nấu cơm." } }
  ],

  hsk1_l10: [
    { id: "hsk1_l10_w1", hanzi: "桌子", pinyin: "zhuōzi", vietnamese: "Cái bàn", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Đồ vật & Đồ đạc", exampleSentence: { hanzi: "桌子上有一本书。", pinyin: "Zhuōzi shang yǒu yì běn shū.", vietnamese: "Trên bàn có một quyển sách." } },
    { id: "hsk1_l10_w2", hanzi: "上", pinyin: "shang", vietnamese: "Phía trên, ở trên, lên", partOfSpeech: "Phương vị từ / Động từ", hskLevel: "HSK1", topic: "Phương vị", exampleSentence: { hanzi: "他在楼上。", pinyin: "Tā zài lóu shàng.", vietnamese: "Anh ấy ở trên lầu." } },
    { id: "hsk1_l10_w3", hanzi: "下", pinyin: "xià", vietnamese: "Phía dưới, ở dưới, xuống", partOfSpeech: "Phương vị từ / Động từ", hskLevel: "HSK1", topic: "Phương vị", exampleSentence: { hanzi: "小猫在桌子下面。", pinyin: "Xiǎo māo zài zhuōzi xiàmiàn.", vietnamese: "Chú mèo con ở dưới gầm bàn." } },
    { id: "hsk1_l10_w4", hanzi: "前面", pinyin: "qiánmian", vietnamese: "Phía trước, đằng trước", partOfSpeech: "Phương vị từ", hskLevel: "HSK1", topic: "Phương vị", exampleSentence: { hanzi: "学校在前面。", pinyin: "Xuéxiào zài qiánmian.", vietnamese: "Trường học ở phía trước." } },
    { id: "hsk1_l10_w5", hanzi: "后面", pinyin: "hòumian", vietnamese: "Phía sau, đằng sau", partOfSpeech: "Phương vị từ", hskLevel: "HSK1", topic: "Phương vị", exampleSentence: { hanzi: "商店在医院后面。", pinyin: "Shāngdiàn zài yīyuàn hòumian.", vietnamese: "Cửa hàng ở phía sau bệnh viện." } },
    { id: "hsk1_l10_w6", hanzi: "能", pinyin: "néng", vietnamese: "Có thể (xin phép hoặc năng lực khách quan)", partOfSpeech: "Động từ năng nguyện", hskLevel: "HSK1", topic: "Động từ năng nguyện", exampleSentence: { hanzi: "我能坐这儿吗？", pinyin: "Wǒ néng zuò zhèr ma?", vietnamese: "Tôi có thể ngồi ở đây không?" } },
    { id: "hsk1_l10_w7", hanzi: "坐", pinyin: "zuò", vietnamese: "Ngồi, đi (xe, tàu, máy bay)", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Hành động & Di chuyển", exampleSentence: { hanzi: "请坐！", pinyin: "Qǐng zuò!", vietnamese: "Xin mời ngồi!" } }
  ],

  hsk1_l11: [
    { id: "hsk1_l11_w1", hanzi: "现在", pinyin: "xiànzài", vietnamese: "Bây giờ, hiện tại", partOfSpeech: "Danh từ thời gian", hskLevel: "HSK1", topic: "Thời gian", exampleSentence: { hanzi: "现在几点？", pinyin: "Xiànzài jǐ diǎn?", vietnamese: "Bây giờ là mấy giờ?" } },
    { id: "hsk1_l11_w2", hanzi: "点", pinyin: "diǎn", vietnamese: "Giờ (đơn vị chỉ giờ)", partOfSpeech: "Lượng từ", hskLevel: "HSK1", topic: "Thời gian", exampleSentence: { hanzi: "现在八点整。", pinyin: "Xiànzài bā diǎn zhěng.", vietnamese: "Bây giờ là đúng 8 giờ." } },
    { id: "hsk1_l11_w3", hanzi: "分", pinyin: "fēn", vietnamese: "Phút", partOfSpeech: "Lượng từ", hskLevel: "HSK1", topic: "Thời gian", exampleSentence: { hanzi: "八点十五分。", pinyin: "Bā diǎn shíwǔ fēn.", vietnamese: "8 giờ 15 phút." } },
    { id: "hsk1_l11_w4", hanzi: "中午", pinyin: "zhōngwǔ", vietnamese: "Buổi trưa (12h-13h)", partOfSpeech: "Danh từ thời gian", hskLevel: "HSK1", topic: "Thời gian biểu", exampleSentence: { hanzi: "中午我们一起吃午饭。", pinyin: "Zhōngwǔ wǒmen yìqǐ chī wǔfàn.", vietnamese: "Buổi trưa chúng ta cùng ăn cơm trưa." } },
    { id: "hsk1_l11_w5", hanzi: "吃饭", pinyin: "chī fàn", vietnamese: "Ăn cơm, dùng bữa", partOfSpeech: "Cụm động từ", hskLevel: "HSK1", topic: "Sinh hoạt hàng ngày", exampleSentence: { hanzi: "你吃饭了吗？", pinyin: "Nǐ chī fàn le ma?", vietnamese: "Bạn đã ăn cơm chưa?" } },
    { id: "hsk1_l11_w6", hanzi: "时候", pinyin: "shíhou", vietnamese: "Thời điểm, lúc, khi", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Thời gian", exampleSentence: { hanzi: "你什么时候回家？", pinyin: "Nǐ shénme shíhou huí jiā?", vietnamese: "Khi nào bạn về nhà?" } },
    { id: "hsk1_l11_w7", hanzi: "回", pinyin: "huí", vietnamese: "Về, quay lại", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Di chuyển", exampleSentence: { hanzi: "我想回家。", pinyin: "Wǒ xiǎng huí jiā.", vietnamese: "Tôi muốn về nhà." } }
  ],

  hsk1_l12: [
    { id: "hsk1_l12_w1", hanzi: "天气", pinyin: "tiānqì", vietnamese: "Thời tiết, khí hậu", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Thời tiết & Tự nhiên", exampleSentence: { hanzi: "今天天气真好！", pinyin: "Jīntiān tiānqì zhēn hǎo!", vietnamese: "Hôm nay thời tiết thật đẹp!" } },
    { id: "hsk1_l12_w2", hanzi: "怎么样", pinyin: "zěnmeyàng", vietnamese: "Thế nào, ra sao (hỏi tính chất, tình trạng)", partOfSpeech: "Đại từ nghi vấn", hskLevel: "HSK1", topic: "Nghi vấn", exampleSentence: { hanzi: "你的身体怎么样？", pinyin: "Nǐ de shēntǐ zěnmeyàng?", vietnamese: "Sức khỏe của bạn thế nào?" } },
    { id: "hsk1_l12_w3", hanzi: "太", pinyin: "tài", vietnamese: "Quá, lắm", partOfSpeech: "Phó từ", hskLevel: "HSK1", topic: "Mức độ", exampleSentence: { hanzi: "太好了！", pinyin: "Tài hǎo le!", vietnamese: "Quá tốt rồi!" } },
    { id: "hsk1_l12_w4", hanzi: "热", pinyin: "rè", vietnamese: "Nóng (nhiệt độ)", partOfSpeech: "Tính từ", hskLevel: "HSK1", topic: "Thời tiết", exampleSentence: { hanzi: "今天太热了。", pinyin: "Jīntiān tài rè le.", vietnamese: "Hôm nay nóng quá." } },
    { id: "hsk1_l12_w5", hanzi: "冷", pinyin: "lěng", vietnamese: "Lạnh (nhiệt độ)", partOfSpeech: "Tính từ", hskLevel: "HSK1", topic: "Thời tiết", exampleSentence: { hanzi: "冬天北京很冷。", pinyin: "Dōngtiān Běijīng hěn lěng.", vietnamese: "Mùa đông ở Bắc Kinh rất lạnh." } },
    { id: "hsk1_l12_w6", hanzi: "下雨", pinyin: "xià yǔ", vietnamese: "Trời mưa", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Thời tiết", exampleSentence: { hanzi: "明天会下雨吗？", pinyin: "Míngtiān huì xià yǔ ma?", vietnamese: "Ngày mai trời có mưa không?" } },
    { id: "hsk1_l12_w7", hanzi: "水", pinyin: "shuǐ", vietnamese: "Nước", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Đồ uống & Sinh hoạt", exampleSentence: { hanzi: "多喝水对身体好。", pinyin: "Duō hē shuǐ duì shēntǐ hǎo.", vietnamese: "Uống nhiều nước rất tốt cho sức khỏe." } }
  ],

  hsk1_l13: [
    { id: "hsk1_l13_w1", hanzi: "喂", pinyin: "wèi", vietnamese: "A-lô (chào qua điện thoại), này", partOfSpeech: "Thán từ", hskLevel: "HSK1", topic: "Liên lạc qua điện thoại", exampleSentence: { hanzi: "喂，请问王经理在吗？", pinyin: "Wèi, qǐngwèn Wáng jīnglǐ zài ma?", vietnamese: "A-lô, xin hỏi giám đốc Vương có ở đó không?" } },
    { id: "hsk1_l13_w2", hanzi: "在", pinyin: "zài", vietnamese: "Đang (phó từ chỉ hành động tiếp diễn)", partOfSpeech: "Phó từ", hskLevel: "HSK1", topic: "Ngữ pháp tiếp diễn", exampleSentence: { hanzi: "他在看书呢。", pinyin: "Tā zài kàn shū ne.", vietnamese: "Anh ấy đang đọc sách đấy." } },
    { id: "hsk1_l13_w3", hanzi: "做", pinyin: "zuò", vietnamese: "Làm, nấu, chế tạo", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Hành động", exampleSentence: { hanzi: "你在做什么？", pinyin: "Nǐ zài zuò shénme?", vietnamese: "Bạn đang làm gì thế?" } },
    { id: "hsk1_l13_w4", hanzi: "学习", pinyin: "xuéxí", vietnamese: "Học tập", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Học tập", exampleSentence: { hanzi: "我们每天都在认真学习。", pinyin: "Wǒmen měitiān dōu zài rènzhēn xuéxí.", vietnamese: "Chúng tôi mỗi ngày đều chăm chỉ học tập." } },
    { id: "hsk1_l13_w5", hanzi: "看", pinyin: "kàn", vietnamese: "Xem, nhìn, đọc (sách)", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Hành động & Giác quan", exampleSentence: { hanzi: "我想看电视。", pinyin: "Wǒ xiǎng kàn diànshì.", vietnamese: "Tôi muốn xem ti vi." } },
    { id: "hsk1_l13_w6", hanzi: "电视", pinyin: "diànshì", vietnamese: "Ti vi, truyền hình", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Thiết bị điện tử", exampleSentence: { hanzi: "电视机坏了。", pinyin: "Diànshìjī huài le.", vietnamese: "Chiếc ti vi bị hỏng rồi." } },
    { id: "hsk1_l13_w7", hanzi: "喜欢", pinyin: "xǐhuan", vietnamese: "Thích, yêu thích", partOfSpeech: "Động từ tâm lý", hskLevel: "HSK1", topic: "Sở thích & Cảm xúc", exampleSentence: { hanzi: "我喜欢中国菜。", pinyin: "Wǒ xǐhuan Zhōngguó cài.", vietnamese: "Tôi thích món ăn Trung Quốc." } }
  ],

  hsk1_l14: [
    { id: "hsk1_l14_w1", hanzi: "东西", pinyin: "dōngxi", vietnamese: "Đồ vật, đồ đạc, hàng hóa", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Mua sắm & Đồ vật", exampleSentence: { hanzi: "你去买什么东西？", pinyin: "Nǐ qù mǎi shénme dōngxi?", vietnamese: "Bạn đi mua đồ gì thế?" } },
    { id: "hsk1_l14_w2", hanzi: "一点儿", pinyin: "yìdiǎnr", vietnamese: "Một chút, một ít", partOfSpeech: "Lượng từ", hskLevel: "HSK1", topic: "Số lượng", exampleSentence: { hanzi: "我想买一点儿苹果。", pinyin: "Wǒ xiǎng mǎi yìdiǎnr píngguǒ.", vietnamese: "Tôi muốn mua một ít táo." } },
    { id: "hsk1_l14_w3", hanzi: "苹果", pinyin: "píngguǒ", vietnamese: "Quả táo", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Trái cây & Ẩm thực", exampleSentence: { hanzi: "红苹果很甜。", pinyin: "Hóng píngguǒ hěn tián.", vietnamese: "Táo đỏ rất ngọt." } },
    { id: "hsk1_l14_w4", hanzi: "看见", pinyin: "kànjiàn", vietnamese: "Nhìn thấy, trông thấy", partOfSpeech: "Động từ kết quả", hskLevel: "HSK1", topic: "Giác quan", exampleSentence: { hanzi: "你看见我的手机了吗？", pinyin: "Nǐ kànjiàn wǒ de shǒujī le ma?", vietnamese: "Bạn có thấy điện thoại của tôi không?" } },
    { id: "hsk1_l14_w5", hanzi: "先生", pinyin: "xiānsheng", vietnamese: "Ông, ngài, chồng", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Xưng hô lịch sự", exampleSentence: { hanzi: "王先生在办公室。", pinyin: "Wáng xiānsheng zài bàngōngshì.", vietnamese: "Ông Vương ở trong văn phòng." } },
    { id: "hsk1_l14_w6", hanzi: "开", pinyin: "kāi", vietnamese: "Lái (xe), mở (cửa, máy)", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Giao thông & Hành động", exampleSentence: { hanzi: "他会开车。", pinyin: "Tā huì kāichē.", vietnamese: "Anh ấy biết lái xe." } },
    { id: "hsk1_l14_w7", hanzi: "车", pinyin: "chē", vietnamese: "Xe cộ, xe ô tô", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Phương tiện giao thông", exampleSentence: { hanzi: "这是谁的车？", pinyin: "Zhè shì shéi de chē?", vietnamese: "Đây là xe của ai?" } },
    { id: "hsk1_l14_w8", hanzi: "回来", pinyin: "huílái", vietnamese: "Trở về, quay về", partOfSpeech: "Động từ xu hướng", hskLevel: "HSK1", topic: "Di chuyển", exampleSentence: { hanzi: "他四点回来。", pinyin: "Tā sì diǎn huílái.", vietnamese: "Anh ấy 4 giờ sẽ quay về." } }
  ],

  hsk1_l15: [
    { id: "hsk1_l15_w1", hanzi: "认识", pinyin: "rènshi", vietnamese: "Quen biết, nhận biết", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Mối quan hệ", exampleSentence: { hanzi: "很高兴认识你！", pinyin: "Hěn gāoxìng rènshi nǐ!", vietnamese: "Rất vui được làm quen với bạn!" } },
    { id: "hsk1_l15_w2", hanzi: "年", pinyin: "nián", vietnamese: "Năm", partOfSpeech: "Danh từ thời gian", hskLevel: "HSK1", topic: "Thời gian", exampleSentence: { hanzi: "我们在中国住了一年。", pinyin: "Wǒmen zài Zhōngguó zhù le yì nián.", vietnamese: "Chúng tôi đã ở Trung Quốc một năm." } },
    { id: "hsk1_l15_w3", hanzi: "大学", pinyin: "dàxué", vietnamese: "Trường đại học", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Học đường & Giáo dục", exampleSentence: { hanzi: "他是北京大学的学生。", pinyin: "Tā shì Běijīng Dàxué de xuésheng.", vietnamese: "Anh ấy là sinh viên Đại học Bắc Kinh." } },
    { id: "hsk1_l15_w4", hanzi: "饭店", pinyin: "fàndiàn", vietnamese: "Nhà hàng, khách sạn", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Địa điểm & Ăn uống", exampleSentence: { hanzi: "我们在饭店门口见。", pinyin: "Wǒmen zài fàndiàn ménkǒu jiàn.", vietnamese: "Chúng ta gặp nhau ở cửa nhà hàng nhé." } },
    { id: "hsk1_l15_w5", hanzi: "出租车", pinyin: "chūzūchē", vietnamese: "Xe taxi", partOfSpeech: "Danh từ", hskLevel: "HSK1", topic: "Phương tiện giao thông", exampleSentence: { hanzi: "我们坐出租车去吧。", pinyin: "Wǒmen zuò chūzūchē qù ba.", vietnamese: "Chúng ta đi taxi đi." } },
    { id: "hsk1_l15_w6", hanzi: "一起", pinyin: "yìqǐ", vietnamese: "Cùng nhau, cùng một nơi", partOfSpeech: "Phó từ", hskLevel: "HSK1", topic: "Hợp tác & Đồng hành", exampleSentence: { hanzi: "我们一起学习汉语。", pinyin: "Wǒmen yìqǐ xuéxí Hànyǔ.", vietnamese: "Chúng tôi cùng nhau học tiếng Trung." } },
    { id: "hsk1_l15_w7", hanzi: "高兴", pinyin: "gāoxìng", vietnamese: "Vui vẻ, phấn khởi", partOfSpeech: "Tính từ", hskLevel: "HSK1", topic: "Tâm trạng & Cảm xúc", exampleSentence: { hanzi: "今天我非常高兴。", pinyin: "Jīntiān wǒ fēicháng gāoxìng.", vietnamese: "Hôm nay tôi vô cùng vui mừng." } },
    { id: "hsk1_l15_w8", hanzi: "听", pinyin: "tīng", vietnamese: "Nghe", partOfSpeech: "Động từ", hskLevel: "HSK1", topic: "Giác quan", exampleSentence: { hanzi: "你听，这是什么声音？", pinyin: "Nǐ tīng, zhè shì shénme shēngyīn?", vietnamese: "Bạn nghe xem, đây là âm thanh gì?" } }
  ],

  // =========================================================================
  // HSK 2 (15 bài học chuẩn quốc tế)
  // =========================================================================
  hsk2_l1: [
    { id: "hsk2_l1_w1", hanzi: "旅游", pinyin: "lǚyóu", vietnamese: "Đi du lịch", partOfSpeech: "Động từ / Danh từ", hskLevel: "HSK2", topic: "Du lịch & Giải trí", exampleSentence: { hanzi: "九月去北京旅游最好。", pinyin: "Jiǔ yuè qù Běijīng lǚyóu zuì hǎo.", vietnamese: "Tháng 9 đi du lịch Bắc Kinh là tốt nhất." } },
    { id: "hsk2_l1_w2", hanzi: "觉得", pinyin: "juéde", vietnamese: "Cảm thấy, nghĩ rằng", partOfSpeech: "Động từ", hskLevel: "HSK2", topic: "Quan điểm & Cảm nhận", exampleSentence: { hanzi: "你觉得怎么样？", pinyin: "Nǐ juéde zěnmeyàng?", vietnamese: "Bạn cảm thấy như thế nào?" } },
    { id: "hsk2_l1_w3", hanzi: "最", pinyin: "zuì", vietnamese: "Nhất (phó từ so sánh cao nhất)", partOfSpeech: "Phó từ", hskLevel: "HSK2", topic: "Mức độ", exampleSentence: { hanzi: "我最喜欢吃水果。", pinyin: "Wǒ zuì xǐhuan chī shuǐguǒ.", vietnamese: "Tôi thích ăn hoa quả nhất." } },
    { id: "hsk2_l1_w4", hanzi: "为什么", pinyin: "wèishénme", vietnamese: "Tại sao, vì sao", partOfSpeech: "Đại từ nghi vấn", hskLevel: "HSK2", topic: "Nghi vấn nguyên nhân", exampleSentence: { hanzi: "你为什么不喝咖啡？", pinyin: "Nǐ wèishénme bù hē kāfēi?", vietnamese: "Tại sao bạn không uống cà phê?" } },
    { id: "hsk2_l1_w5", hanzi: "也", pinyin: "yě", vietnamese: "Cũng", partOfSpeech: "Phó từ", hskLevel: "HSK2", topic: "Phó từ", exampleSentence: { hanzi: "我也去北京。", pinyin: "Wǒ yě qù Běijīng.", vietnamese: "Tôi cũng đi Bắc Kinh." } },
    { id: "hsk2_l1_w6", hanzi: "运动", pinyin: "yùndòng", vietnamese: "Vận động, thể thao", partOfSpeech: "Động từ / Danh từ", hskLevel: "HSK2", topic: "Thể thao", exampleSentence: { hanzi: "每天运动身体好。", pinyin: "Měitiān yùndòng shēntǐ hǎo.", vietnamese: "Vận động mỗi ngày tốt cho sức khỏe." } }
  ],

  hsk2_l2: [
    { id: "hsk2_l2_w1", hanzi: "生病", pinyin: "shēngbìng", vietnamese: "Bị ốm, ngã bệnh", partOfSpeech: "Động từ", hskLevel: "HSK2", topic: "Sức khỏe & Y tế", exampleSentence: { hanzi: "他生病住院了。", pinyin: "Tā shēngbìng zhùyuàn le.", vietnamese: "Anh ấy bị bệnh nhập viện rồi." } },
    { id: "hsk2_l2_w2", hanzi: "每", pinyin: "měi", vietnamese: "Mỗi, từng", partOfSpeech: "Đại từ", hskLevel: "HSK2", topic: "Số lượng & Tần suất", exampleSentence: { hanzi: "每天早上我都跑步。", pinyin: "Měitiān zǎoshang wǒ dōu pǎobù.", vietnamese: "Mỗi sáng tôi đều chạy bộ." } },
    { id: "hsk2_l2_w3", hanzi: "早上", pinyin: "zǎoshang", vietnamese: "Buổi sáng sớm", partOfSpeech: "Danh từ thời gian", hskLevel: "HSK2", topic: "Thời gian", exampleSentence: { hanzi: "早上好！", pinyin: "Zǎoshang hǎo!", vietnamese: "Chào buổi sáng!" } },
    { id: "hsk2_l2_w4", hanzi: "跑步", pinyin: "pǎobù", vietnamese: "Chạy bộ", partOfSpeech: "Động từ", hskLevel: "HSK2", topic: "Thể thao & Sức khỏe", exampleSentence: { hanzi: "我在公园跑步。", pinyin: "Wǒ zài gōngyuán pǎobù.", vietnamese: "Tôi đang chạy bộ ở công viên." } },
    { id: "hsk2_l2_w5", hanzi: "起床", pinyin: "qǐchuáng", vietnamese: "Thức dậy, rời giường", partOfSpeech: "Động từ", hskLevel: "HSK2", topic: "Sinh hoạt", exampleSentence: { hanzi: "我每天六点起床。", pinyin: "Wǒ měitiān liù diǎn qǐchuáng.", vietnamese: "Tôi thức dậy lúc 6 giờ mỗi ngày." } },
    { id: "hsk2_l2_w6", hanzi: "药", pinyin: "yào", vietnamese: "Thuốc (chữa bệnh)", partOfSpeech: "Danh từ", hskLevel: "HSK2", topic: "Y tế", exampleSentence: { hanzi: "吃了药就会好起来。", pinyin: "Chī le yào jiù huì hǎo qǐlai.", vietnamese: "Uống thuốc vào sẽ đỡ hơn." } },
    { id: "hsk2_l2_w7", hanzi: "身体", pinyin: "shēntǐ", vietnamese: "Thân thể, sức khỏe", partOfSpeech: "Danh từ", hskLevel: "HSK2", topic: "Sức khỏe", exampleSentence: { hanzi: "祝你身体健康！", pinyin: "Zhù nǐ shēntǐ jiànkāng!", vietnamese: "Chúc bạn dồi dào sức khỏe!" } }
  ],

  hsk2_l3: [
    { id: "hsk2_l3_w1", hanzi: "左边", pinyin: "zuǒbian", vietnamese: "Bên trái, phía trái", partOfSpeech: "Phương vị từ", hskLevel: "HSK2", topic: "Phương hướng", exampleSentence: { hanzi: "左边的那个人是我弟弟。", pinyin: "Zuǒbian de nà ge rén shì wǒ dìdi.", vietnamese: "Người ở bên trái kia là em trai tôi." } },
    { id: "hsk2_l3_w2", hanzi: "右边", pinyin: "yòubian", vietnamese: "Bên phải, phía phải", partOfSpeech: "Phương vị từ", hskLevel: "HSK2", topic: "Phương hướng", exampleSentence: { hanzi: "往右边走就是超市。", pinyin: "Wǎng yòubian zǒu jiù shì chāoshì.", vietnamese: "Đi về phía bên phải là siêu thị." } },
    { id: "hsk2_l3_w3", hanzi: "红", pinyin: "hóng", vietnamese: "Màu đỏ", partOfSpeech: "Tính từ", hskLevel: "HSK2", topic: "Màu sắc", exampleSentence: { hanzi: "我喜欢穿红色的衣服。", pinyin: "Wǒ xǐhuan chuān hóngsè de yīfu.", vietnamese: "Tôi thích mặc quần áo màu đỏ." } },
    { id: "hsk2_l3_w4", hanzi: "白", pinyin: "bái", vietnamese: "Màu trắng", partOfSpeech: "Tính từ", hskLevel: "HSK2", topic: "Màu sắc", exampleSentence: { hanzi: "白色的衬衫很干净。", pinyin: "Báisè de chènshān hěn gānjìng.", vietnamese: "Chiếc áo sơ mi trắng rất sạch sẽ." } },
    { id: "hsk2_l3_w5", hanzi: "千", pinyin: "qiān", vietnamese: "Ngàn, một nghìn (1000)", partOfSpeech: "Số từ", hskLevel: "HSK2", topic: "Số đếm", exampleSentence: { hanzi: "一千块钱。", pinyin: "Yìqiān kuài qián.", vietnamese: "Một nghìn tệ." } },
    { id: "hsk2_l3_w6", hanzi: "报纸", pinyin: "bàozhǐ", vietnamese: "Báo chí, tờ báo", partOfSpeech: "Danh từ", hskLevel: "HSK2", topic: "Truyền thông & Đọc", exampleSentence: { hanzi: "爸爸在看报纸。", pinyin: "Bàba zài kàn bàozhǐ.", vietnamese: "Bố đang đọc báo." } }
  ],

  hsk2_l4: [
    { id: "hsk2_l4_w1", hanzi: "再", pinyin: "zài", vietnamese: "Lại, nữa (hành động chưa xảy ra)", partOfSpeech: "Phó từ", hskLevel: "HSK2", topic: "Phó từ thời gian", exampleSentence: { hanzi: "请你再说一遍。", pinyin: "Qǐng nǐ zài shuō yí biàn.", vietnamese: "Xin bạn nói lại một lần nữa." } },
    { id: "hsk2_l4_w2", hanzi: "真", pinyin: "zhēn", vietnamese: "Thật, quả thật", partOfSpeech: "Phó từ", hskLevel: "HSK2", topic: "Cảm thán", exampleSentence: { hanzi: "今天真冷！", pinyin: "Jīntiān zhēn lěng!", vietnamese: "Hôm nay thật là lạnh!" } },
    { id: "hsk2_l4_w3", hanzi: "眼睛", pinyin: "yǎnjing", vietnamese: "Đôi mắt", partOfSpeech: "Danh từ", hskLevel: "HSK2", topic: "Bộ phận cơ thể", exampleSentence: { hanzi: "她的眼睛很大很漂亮。", pinyin: "Tā de yǎnjing hěn dà hěn piàoliang.", vietnamese: "Đôi mắt cô ấy rất to và đẹp." } },
    { id: "hsk2_l4_w4", hanzi: "休息", pinyin: "xiūxi", vietnamese: "Nghỉ ngơi", partOfSpeech: "Động từ", hskLevel: "HSK2", topic: "Sinh hoạt", exampleSentence: { hanzi: "累了就休息一会儿。", pinyin: "Lèi le jiù xiūxi yíhuìr.", vietnamese: "Mệt rồi thì nghỉ ngơi một lát đi." } },
    { id: "hsk2_l4_w5", hanzi: "要", pinyin: "yào", vietnamese: "Muốn, cần, sắp", partOfSpeech: "Động từ năng nguyện", hskLevel: "HSK2", topic: "Nguyện vọng & Kế hoạch", exampleSentence: { hanzi: "我要去买咖啡。", pinyin: "Wǒ yào qù mǎi kāfēi.", vietnamese: "Tôi cần đi mua cà phê." } },
    { id: "hsk2_l4_w6", hanzi: "咖啡", pinyin: "kāfēi", vietnamese: "Cà phê", partOfSpeech: "Danh từ", hskLevel: "HSK2", topic: "Đồ uống", exampleSentence: { hanzi: "喝咖啡可以提神。", pinyin: "Hē kāfēi kěyǐ tíshén.", vietnamese: "Uống cà phê có thể giúp tỉnh táo." } }
  ],

  hsk2_l5: [
    { id: "hsk2_l5_w1", hanzi: "一件衣服", pinyin: "yí jiàn yīfu", vietnamese: "Một chiếc áo", partOfSpeech: "Cụm danh từ", hskLevel: "HSK2", topic: "Trang phục", exampleSentence: { hanzi: "我买了一件衣服。", pinyin: "Wǒ mǎi le yí jiàn yīfu.", vietnamese: "Tôi mua một bộ quần áo." } },
    { id: "hsk2_l5_w2", hanzi: "条", pinyin: "tiáo", vietnamese: "Chiếc, sợi, con (lượng từ vật dài)", partOfSpeech: "Lượng từ", hskLevel: "HSK2", topic: "Lượng từ", exampleSentence: { hanzi: "一条裤子。", pinyin: "Yì tiáo kùzi.", vietnamese: "Một chiếc quần." } },
    { id: "hsk2_l5_w3", hanzi: "裤子", pinyin: "kùzi", vietnamese: "Cái quần", partOfSpeech: "Danh từ", hskLevel: "HSK2", topic: "Trang phục", exampleSentence: { hanzi: "这条牛仔裤很舒服。", pinyin: "Zhè tiáo niúzǎikù hěn shūfu.", vietnamese: "Chiếc quần bò này rất thoải mái." } },
    { id: "hsk2_l5_w4", hanzi: "穿", pinyin: "chuān", vietnamese: "Mặc, xỏ (giày tất)", partOfSpeech: "Động từ", hskLevel: "HSK2", topic: "Trang phục", exampleSentence: { hanzi: "今天天气冷，多穿点儿衣服。", pinyin: "Jīntiān tiānqì lěng, duō chuān diǎnr yīfu.", vietnamese: "Hôm nay trời lạnh, mặc nhiều áo vào nhé." } },
    { id: "hsk2_l5_w5", hanzi: "大", pinyin: "dà", vietnamese: "To, lớn", partOfSpeech: "Tính từ", hskLevel: "HSK2", topic: "Kích cỡ", exampleSentence: { hanzi: "这件衣服有点儿大。", pinyin: "Zhè jiàn yīfu yǒudiǎnr dà.", vietnamese: "Bộ quần áo này hơi rộng." } },
    { id: "hsk2_l5_w6", hanzi: "小", pinyin: "xiǎo", vietnamese: "Nhỏ, bé", partOfSpeech: "Tính từ", hskLevel: "HSK2", topic: "Kích cỡ", exampleSentence: { hanzi: "鞋子有点儿小。", pinyin: "Xiézi yǒudiǎnr xiǎo.", vietnamese: "Đôi giày hơi nhỏ." } }
  ],

  // =========================================================================
  // HSK 3 (20 bài học chuẩn quốc tế)
  // =========================================================================
  hsk3_l1: [
    { id: "hsk3_l1_w1", hanzi: "周末", pinyin: "zhōumò", vietnamese: "Cuối tuần", partOfSpeech: "Danh từ", hskLevel: "HSK3", topic: "Thời gian", exampleSentence: { hanzi: "周末你有什么打算？", pinyin: "Zhōumò nǐ yǒu shénme dǎsuan?", vietnamese: "Cuối tuần bạn có dự định gì?" } },
    { id: "hsk3_l1_w2", hanzi: "打算", pinyin: "dǎsuan", vietnamese: "Dự định, kế hoạch", partOfSpeech: "Động từ / Danh từ", hskLevel: "HSK3", topic: "Kế hoạch", exampleSentence: { hanzi: "我打算去旅游。", pinyin: "Wǒ dǎsuan qù lǚyóu.", vietnamese: "Tôi dự định đi du lịch." } },
    { id: "hsk3_l1_w3", hanzi: "一直", pinyin: "yìzhí", vietnamese: "Suốt, luôn luôn, thẳng", partOfSpeech: "Phó từ", hskLevel: "HSK3", topic: "Phó từ tần suất", exampleSentence: { hanzi: "他一直在玩电脑游戏。", pinyin: "Tā yìzhí zài wán diànnǎo yóuxì.", vietnamese: "Anh ấy cứ chơi điện tử suốt." } },
    { id: "hsk3_l1_w4", hanzi: "游戏", pinyin: "yóuxì", vietnamese: "Trò chơi, game", partOfSpeech: "Danh từ", hskLevel: "HSK3", topic: "Giải trí", exampleSentence: { hanzi: "不要总玩手机游戏。", pinyin: "Bú yào zǒng wán shǒujī yóuxì.", vietnamese: "Đừng suốt ngày chơi game điện thoại." } },
    { id: "hsk3_l1_w5", hanzi: "作业", pinyin: "zuòyè", vietnamese: "Bài tập về nhà", partOfSpeech: "Danh từ", hskLevel: "HSK3", topic: "Học tập", exampleSentence: { hanzi: "写完作业再出去玩。", pinyin: "Xiě wán zuòyè zài chūqu wán.", vietnamese: "Làm xong bài tập rồi hãy ra ngoài chơi." } },
    { id: "hsk3_l1_w6", hanzi: "着急", pinyin: "zháojí", vietnamese: "Lo lắng, sốt ruột, cuống", partOfSpeech: "Tính từ", hskLevel: "HSK3", topic: "Tâm trạng", exampleSentence: { hanzi: "别着急，慢慢来。", pinyin: "Bié zháojí, mànmàn lái.", vietnamese: "Đừng cuống, từ từ thôi." } }
  ],

  hsk3_l2: [
    { id: "hsk3_l2_w1", hanzi: "带", pinyin: "dài", vietnamese: "Mang theo, dẫn dắt", partOfSpeech: "Động từ", hskLevel: "HSK3", topic: "Hành động", exampleSentence: { hanzi: "出门别忘了带雨伞。", pinyin: "Chūmén bié wàng le dài yǔsǎn.", vietnamese: "Ra ngoài đừng quên mang theo ô." } },
    { id: "hsk3_l2_w2", hanzi: "地图", pinyin: "dìtú", vietnamese: "Bản đồ", partOfSpeech: "Danh từ", hskLevel: "HSK3", topic: "Địa lý & Du lịch", exampleSentence: { hanzi: "查看手机电子地图。", pinyin: "Chákàn shǒujī diànzǐ dìtú.", vietnamese: "Tra cứu bản đồ điện tử trên điện thoại." } },
    { id: "hsk3_l2_w3", hanzi: "搬", pinyin: "bān", vietnamese: "Dọn, chuyển (nhà, đồ)", partOfSpeech: "Động từ", hskLevel: "HSK3", topic: "Hành động", exampleSentence: { hanzi: "我们下周要搬家。", pinyin: "Wǒmen xià zhōu yào bānjiā.", vietnamese: "Tuần sau chúng tôi sẽ chuyển nhà." } },
    { id: "hsk3_l2_w4", hanzi: "虽然", pinyin: "suīrán", vietnamese: "Tuy rằng, mặc dù", partOfSpeech: "Liên từ", hskLevel: "HSK3", topic: "Ngữ pháp liên từ", exampleSentence: { hanzi: "虽然很累，但是很值得。", pinyin: "Suīrán hěn lèi, dànshì hěn zhídé.", vietnamese: "Tuy rất mệt nhưng rất đáng." } },
    { id: "hsk3_l2_w5", hanzi: "但是", pinyin: "dànshì", vietnamese: "Nhưng mà", partOfSpeech: "Liên từ", hskLevel: "HSK3", topic: "Ngữ pháp liên từ", exampleSentence: { hanzi: "虽然便宜，但是质量好。", pinyin: "Suīrán piányi, dànshì zhìliàng hǎo.", vietnamese: "Tuy rẻ nhưng chất lượng tốt." } }
  ],

  // =========================================================================
  // HSK 4 (20 bài học chuẩn quốc tế)
  // =========================================================================
  hsk4_l1: [
    { id: "hsk4_l1_w1", hanzi: "爱情", pinyin: "àiqíng", vietnamese: "Tình yêu, tình cảm lứa đôi", partOfSpeech: "Danh từ", hskLevel: "HSK4", topic: "Tình cảm", exampleSentence: { hanzi: "真挚的爱情需要互相包容。", pinyin: "Zhēnzhì de àiqíng xūyào hùxiāng bāoróng.", vietnamese: "Tình yêu chân thành cần sự bao dung lẫn nhau." } },
    { id: "hsk4_l1_w2", hanzi: "安排", pinyin: "ānpái", vietnamese: "Sắp xếp, bố trí", partOfSpeech: "Động từ / Danh từ", hskLevel: "HSK4", topic: "Công việc & Kế hoạch", exampleSentence: { hanzi: "公司的日程安排得很满。", pinyin: "Gōngsī de rìchéng ānpái de hěn mǎn.", vietnamese: "Lịch trình công ty được sắp xếp rất kín." } },
    { id: "hsk4_l1_w3", hanzi: "安全", pinyin: "ānquán", vietnamese: "An toàn", partOfSpeech: "Tính từ / Danh từ", hskLevel: "HSK4", topic: "An toàn đời sống", exampleSentence: { hanzi: "注意交通安全。", pinyin: "Zhùyì jiāotōng ānquán.", vietnamese: "Chú ý an toàn giao thông." } },
    { id: "hsk4_l1_w4", hanzi: "按时", pinyin: "ànshí", vietnamese: "Đúng giờ, đúng hẹn", partOfSpeech: "Phó từ", hskLevel: "HSK4", topic: "Thời gian & Kỷ luật", exampleSentence: { hanzi: "请按时完成任务。", pinyin: "Qǐng ànshí wánchéng rènwu.", vietnamese: "Xin hãy hoàn thành nhiệm vụ đúng hạn." } },
    { id: "hsk4_l1_w5", hanzi: "按照", pinyin: "ànzhào", vietnamese: "Dựa theo, chiếu theo", partOfSpeech: "Giới từ", hskLevel: "HSK4", topic: "Phương pháp & Quy chuẩn", exampleSentence: { hanzi: "按照规定办事。", pinyin: "Ànzhào guīdìng bànshì.", vietnamese: "Làm việc chiếu theo quy định." } },
    { id: "hsk4_l1_w6", hanzi: "无论", pinyin: "wúlùn", vietnamese: "Bất luận, dù cho", partOfSpeech: "Liên từ", hskLevel: "HSK4", topic: "Ngữ pháp liên từ", exampleSentence: { hanzi: "无论刮风下雨他都来。", pinyin: "Wúlùn guāfēng xiàyǔ tā dōu lái.", vietnamese: "Dù gió thổi mưa rơi anh ấy vẫn đến." } }
  ],

  // =========================================================================
  // HSK 5 (18 bài học chuẩn quốc tế)
  // =========================================================================
  hsk5_l1: [
    { id: "hsk5_l1_w1", hanzi: "细节", pinyin: "xìjié", vietnamese: "Chi tiết, tình tiết nhỏ", partOfSpeech: "Danh từ", hskLevel: "HSK5", topic: "Tư duy & Đời sống", exampleSentence: { hanzi: "细节决定成败。", pinyin: "Xìjié juédìng chéngbài.", vietnamese: "Chi tiết quyết định sự thành bại." } },
    { id: "hsk5_l1_w2", hanzi: "朝", pinyin: "cháo", vietnamese: "Hướng về, về phía", partOfSpeech: "Giới từ", hskLevel: "HSK5", topic: "Phương hướng & Ngữ pháp", exampleSentence: { hanzi: "他朝窗外望去。", pinyin: "Tā cháo chuāngwài wàng qù.", vietnamese: "Anh ấy nhìn ra phía ngoài cửa sổ." } },
    { id: "hsk5_l1_w3", hanzi: "临", pinyin: "lín", vietnamese: "Sắp sửa, ngay trước lúc, giáp", partOfSpeech: "Giới từ", hskLevel: "HSK5", topic: "Thời gian", exampleSentence: { hanzi: "临走前他留下一封信。", pinyin: "Lín zǒu qián tā liúxià yì fēng xìn.", vietnamese: "Ngay trước lúc đi anh ấy để lại một phong thư." } },
    { id: "hsk5_l1_w4", hanzi: "相敬如宾", pinyin: "xiāngjìngrúbīn", vietnamese: "Tương kính như tân (vợ chồng tôn trọng nhau)", partOfSpeech: "Thành ngữ", hskLevel: "HSK5", topic: "Thành ngữ", exampleSentence: { hanzi: "夫妻二人相敬如宾。", pinyin: "Fūqī èr rén xiāngjìngrúbīn.", vietnamese: "Hai vợ chồng luôn kính trọng lẫn nhau như khách quý." } },
    { id: "hsk5_l1_w5", hanzi: "叮嘱", pinyin: "dīngzhǔ", vietnamese: "Dặn dò, khuyên nhủ ân cần", partOfSpeech: "Động từ", hskLevel: "HSK5", topic: "Giao tiếp & Ứng xử", exampleSentence: { hanzi: "母亲反复叮嘱路上小心。", pinyin: "Mǔqīn fǎnfù dīngzhǔ lùshang xiǎoxīn.", vietnamese: "Người mẹ liên tục dặn dò đi đường phải cẩn thận." } }
  ],

  // =========================================================================
  // HSK 6 (16 bài học chuẩn quốc tế)
  // =========================================================================
  hsk6_l1: [
    { id: "hsk6_l1_w1", hanzi: "敬业", pinyin: "jìngyè", vietnamese: "Tận tụy với nghề, kính nghiệp", partOfSpeech: "Động từ / Tính từ", hskLevel: "HSK6", topic: "Phẩm chất nghề nghiệp", exampleSentence: { hanzi: "他的敬业精神值得学习。", pinyin: "Tā de jìngyè jīngshén zhídé xuéxí.", vietnamese: "Tinh thần tận tụy với công việc của anh ấy rất đáng học hỏi." } },
    { id: "hsk6_l1_w2", hanzi: "工匠精神", pinyin: "gōngjiàng jīngshén", vietnamese: "Tinh thần người thợ thủ công (tỉ mỉ hoàn hảo)", partOfSpeech: "Cụm danh từ", hskLevel: "HSK6", topic: "Văn hóa & Nghề nghiệp", exampleSentence: { hanzi: "追求卓越的工匠精神。", pinyin: "Zhuīqiú zhuóyuè de gōngjiàng jīngshén.", vietnamese: "Theo đuổi tinh thần nghệ nhân thủ công xuất chúng." } },
    { id: "hsk6_l1_w3", hanzi: "精益求精", pinyin: "jīng yì qiú jīng", vietnamese: "Đã tinh xảo lại càng muốn tinh xảo hơn", partOfSpeech: "Thành ngữ", hskLevel: "HSK6", topic: "Thành ngữ cao cấp", exampleSentence: { hanzi: "在学术研究中精益求精。", pinyin: "Zài xuéshù yánjiū zhōng jīng yì qiú jīng.", vietnamese: "Luôn trau chuốt tỉ mỉ không ngừng trong nghiên cứu học thuật." } },
    { id: "hsk6_l1_w4", hanzi: "严谨", pinyin: "yánjǐn", vietnamese: "Nghiêm cẩn, chặt chẽ, cẩn trọng", partOfSpeech: "Tính từ", hskLevel: "HSK6", topic: "Thái độ & Phong cách", exampleSentence: { hanzi: "科学研究需要严谨的态度。", pinyin: "Kēxué yánjiū xūyào yánjǐn de tàidu.", vietnamese: "Nghiên cứu khoa học đòi hỏi thái độ nghiêm cẩn cẩn trọng." } },
    { id: "hsk6_l1_w5", hanzi: "孜孜不倦", pinyin: "zīzī bú juàn", vietnamese: "Miệt mài không biết mệt mỏi, cần cù", partOfSpeech: "Thành ngữ", hskLevel: "HSK6", topic: "Thành ngữ", exampleSentence: { hanzi: "他多年来孜孜不倦地工作。", pinyin: "Tā duō nián lái zīzī bú juàn de gōngzuò.", vietnamese: "Bao năm qua anh ấy miệt mài làm việc không ngừng nghỉ." } }
  ]
};

// Hàm lấy từ vựng chuẩn xác cho mọi bài học HSK 1 - HSK 6
export function getLessonVocabList(lesson: Lesson): WordItem[] {
  if (lesson.vocabulary && lesson.vocabulary.length > 0) {
    return lesson.vocabulary;
  }

  // 1. Tra cứu trực tiếp từ map từ vựng chuyên biệt của bài
  if (LESSON_VOCABULARY_MAP[lesson.id] && LESSON_VOCABULARY_MAP[lesson.id].length > 0) {
    return LESSON_VOCABULARY_MAP[lesson.id];
  }

  // 1.1 Tra cứu từ vựng mở rộng của chương trình HSK
  if (LESSON_VOCABULARY_EXTENSIONS[lesson.id] && LESSON_VOCABULARY_EXTENSIONS[lesson.id].length > 0) {
    return LESSON_VOCABULARY_EXTENSIONS[lesson.id];
  }

  // 2. Tra cứu qua ID từ vựng nếu có trong ALL_HSK_VOCABULARY hoặc GARMENT_TERMS
  const combinedDict = [...ALL_HSK_VOCABULARY, ...GARMENT_TERMS];
  if (lesson.vocabularyIds && lesson.vocabularyIds.length > 0) {
    const resolved = lesson.vocabularyIds
      .map((id) => {
        const found = combinedDict.find((item) => item.id === id || item.hanzi === id);
        if (found) return found;
        return null;
      })
      .filter((item): item is WordItem => item !== null);

    if (resolved.length > 0) {
      return resolved;
    }
  }

  // 3. Fallback thông minh: lấy từ vựng cấp độ tương ứng theo phân bổ bài học
  const levelVocab = ALL_HSK_VOCABULARY.filter(v => v.hskLevel === lesson.hskLevel);
  if (levelVocab.length > 0) {
    const pageSize = 6;
    const startIdx = ((lesson.lessonNumber - 1) * pageSize) % Math.max(1, levelVocab.length - pageSize);
    return levelVocab.slice(startIdx, startIdx + pageSize);
  }

  return [];
}
