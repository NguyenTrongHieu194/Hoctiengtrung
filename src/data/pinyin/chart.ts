export interface PinyinCombination {
  initial: string; //"b","p","m", etc. (or"" for zero initial)
  final: string; //"a","o","ai", etc.
  syllable: string; //"ba","pa","ma"
  tones: {
    1?: { pinyin: string; hanzi: string; meaning: string };
    2?: { pinyin: string; hanzi: string; meaning: string };
    3?: { pinyin: string; hanzi: string; meaning: string };
    4?: { pinyin: string; hanzi: string; meaning: string };
  };
}

export const COMMON_PINYIN_SYLLABLES: PinyinCombination[] = [
  // b
  {
    initial:"b", final:"a", syllable:"ba",
    tones: {
      1: { pinyin:"bā", hanzi:"八", meaning:"Số 8" },
      2: { pinyin:"bá", hanzi:"拔", meaning:"Nhổ ra" },
      3: { pinyin:"bǎ", hanzi:"把", meaning:"Cầm nắm / Cái" },
      4: { pinyin:"bà", hanzi:"爸", meaning:"Bố" }
    }
  },
  {
    initial:"b", final:"o", syllable:"bo",
    tones: {
      1: { pinyin:"bō", hanzi:"波", meaning:"Làn sóng" },
      2: { pinyin:"bó", hanzi:"伯", meaning:"Bác" },
      3: { pinyin:"bǒ", hanzi:"跛", meaning:"Khập khiễng" },
      4: { pinyin:"bò", hanzi:"薄", meaning:"Bạc hà" }
    }
  },
  {
    initial:"b", final:"ai", syllable:"bai",
    tones: {
      1: { pinyin:"bāi", hanzi:"掰", meaning:"Bẻ đôi" },
      2: { pinyin:"bái", hanzi:"白", meaning:"Màu trắng" },
      3: { pinyin:"bǎi", hanzi:"百", meaning:"Hàng trăm" },
      4: { pinyin:"bài", hanzi:"拜", meaning:"Chào / Bái lạy" }
    }
  },
  {
    initial:"b", final:"ei", syllable:"bei",
    tones: {
      1: { pinyin:"bēi", hanzi:"杯", meaning:"Cốc / Ly" },
      3: { pinyin:"běi", hanzi:"北", meaning:"Phía bắc" },
      4: { pinyin:"bèi", hanzi:"背", meaning:"Cái lưng / Học thuộc" }
    }
  },
  {
    initial:"b", final:"an", syllable:"ban",
    tones: {
      1: { pinyin:"bān", hanzi:"班", meaning:"Lớp học / Ca làm" },
      3: { pinyin:"bǎn", hanzi:"板", meaning:"Tấm bảng / Rập mẫu" },
      4: { pinyin:"bàn", hanzi:"半", meaning:"Một nửa" }
    }
  },
  {
    initial:"b", final:"ang", syllable:"bang",
    tones: {
      1: { pinyin:"bāng", hanzi:"帮", meaning:"Giúp đỡ" },
      3: { pinyin:"bǎng", hanzi:"榜", meaning:"Bảng vinh danh" },
      4: { pinyin:"bàng", hanzi:"棒", meaning:"Tuyệt vời / Gậy" }
    }
  },

  // p
  {
    initial:"p", final:"a", syllable:"pa",
    tones: {
      1: { pinyin:"pā", hanzi:"趴", meaning:"Nằm bò ra" },
      2: { pinyin:"pá", hanzi:"爬", meaning:"Bò, trèo leo" },
      4: { pinyin:"pà", hanzi:"怕", meaning:"Sợ hãi" }
    }
  },
  {
    initial:"p", final:"o", syllable:"po",
    tones: {
      1: { pinyin:"pō", hanzi:"坡", meaning:"Sườn đồi dốc" },
      2: { pinyin:"pó", hanzi:"婆", meaning:"Bà ngoại / Bà cụ" },
      4: { pinyin:"pò", hanzi:"破", meaning:"Rách / Vỡ" }
    }
  },
  {
    initial:"p", final:"ing", syllable:"ping",
    tones: {
      1: { pinyin:"pīng", hanzi:"乒", meaning:"Bóng bàn (ping)" },
      2: { pinyin:"píng", hanzi:"平", meaning:"Bằng phẳng / Bình an" },
      3: { pinyin:"pǐng", hanzi:"品", meaning:"Phẩm chất" }
    }
  },

  // m
  {
    initial:"m", final:"a", syllable:"ma",
    tones: {
      1: { pinyin:"mā", hanzi:"妈", meaning:"Mẹ" },
      2: { pinyin:"má", hanzi:"麻", meaning:"Cây gai / Tê" },
      3: { pinyin:"mǎ", hanzi:"马", meaning:"Con ngựa" },
      4: { pinyin:"mà", hanzi:"骂", meaning:"Mắng chửi" }
    }
  },
  {
    initial:"m", final:"ai", syllable:"mai",
    tones: {
      2: { pinyin:"mái", hanzi:"埋", meaning:"Chôn vùi" },
      3: { pinyin:"mǎi", hanzi:"买", meaning:"Mua vào" },
      4: { pinyin:"mài", hanzi:"卖", meaning:"Bán ra" }
    }
  },

  // d
  {
    initial:"d", final:"a", syllable:"da",
    tones: {
      1: { pinyin:"dā", hanzi:"搭", meaning:"Dựng lên / Ghép" },
      2: { pinyin:"dá", hanzi:"答", meaning:"Trả lời" },
      3: { pinyin:"dǎ", hanzi:"打", meaning:"Đánh, gõ, gọi điện" },
      4: { pinyin:"dà", hanzi:"大", meaning:"To, lớn" }
    }
  },
  {
    initial:"d", final:"ian", syllable:"dian",
    tones: {
      1: { pinyin:"diān", hanzi:"颠", meaning:"Chao đảo" },
      3: { pinyin:"diǎn", hanzi:"点", meaning:"Điểm, giờ, chấm" },
      4: { pinyin:"diàn", hanzi:"电", meaning:"Điện / Điện thoại" }
    }
  },

  // t
  {
    initial:"t", final:"a", syllable:"ta",
    tones: {
      1: { pinyin:"tā", hanzi:"他 / 她 / 它", meaning:"Anh ấy / Cô ấy / Nó" },
      3: { pinyin:"tǎ", hanzi:"塔", meaning:"Tòa tháp" },
      4: { pinyin:"tà", hanzi:"踏", meaning:"Dẫm đạp" }
    }
  },
  {
    initial:"t", final:"ian", syllable:"tian",
    tones: {
      1: { pinyin:"tiān", hanzi:"天", meaning:"Trời, ngày" },
      2: { pinyin:"tián", hanzi:"甜", meaning:"Ngọt ngào" },
      3: { pinyin:"tiǎn", hanzi:"舔", meaning:"Liếm" },
      4: { pinyin:"tiàn", hanzi:"掭", meaning:"Chấm bút" }
    }
  },

  // g, k, h
  {
    initial:"g", final:"ao", syllable:"gao",
    tones: {
      1: { pinyin:"gāo", hanzi:"高", meaning:"Cao" },
      3: { pinyin:"gǎo", hanzi:"搞", meaning:"Làm, tiến hành" },
      4: { pinyin:"gào", hanzi:"告", meaning:"Báo cáo" }
    }
  },
  {
    initial:"k", final:"an", syllable:"kan",
    tones: {
      1: { pinyin:"kān", hanzi:"看", meaning:"Trông nom" },
      3: { pinyin:"kǎn", hanzi:"砍", meaning:"Chặt đốn" },
      4: { pinyin:"kàn", hanzi:"看", meaning:"Xem, nhìn" }
    }
  },
  {
    initial:"h", final:"ao", syllable:"hao",
    tones: {
      1: { pinyin:"hāo", hanzi:"蒿", meaning:"Cây ngải" },
      2: { pinyin:"háo", hanzi:"毫", meaning:"Lông tơ" },
      3: { pinyin:"hǎo", hanzi:"好", meaning:"Tốt đẹp" },
      4: { pinyin:"hào", hanzi:"号", meaning:"Số hiệu / Ngày" }
    }
  },

  // j, q, x
  {
    initial:"j", final:"ian", syllable:"jian",
    tones: {
      1: { pinyin:"jiān", hanzi:"间", meaning:"Phòng / Khoảng" },
      3: { pinyin:"jiǎn", hanzi:"剪", meaning:"Cắt kéo" },
      4: { pinyin:"jiàn", hanzi:"见", meaning:"Gặp mặt" }
    }
  },
  {
    initial:"q", final:"i", syllable:"qi",
    tones: {
      1: { pinyin:"qī", hanzi:"七", meaning:"Số 7" },
      2: { pinyin:"qí", hanzi:"骑", meaning:"Cưỡi xe / Cưỡi ngựa" },
      3: { pinyin:"qǐ", hanzi:"起", meaning:"Thức dậy / Khởi xướng" },
      4: { pinyin:"qì", hanzi:"气", meaning:"Khí quyển / Khí chất" }
    }
  },
  {
    initial:"x", final:"ue", syllable:"xue",
    tones: {
      1: { pinyin:"xuē", hanzi:"靴", meaning:"Đôi bốt" },
      2: { pinyin:"xué", hanzi:"学", meaning:"Học tập" },
      3: { pinyin:"xuě", hanzi:"雪", meaning:"Tuyết trắng" }
    }
  },

  // zh, ch, sh, r
  {
    initial:"zh", final:"ong", syllable:"zhong",
    tones: {
      1: { pinyin:"zhōng", hanzi:"中", meaning:"Ở giữa / Trung Quốc" },
      3: { pinyin:"zhǒng", hanzi:"种", meaning:"Chủng loại / Hạt giống" },
      4: { pinyin:"zhòng", hanzi:"重", meaning:"Nặng / Quan trọng" }
    }
  },
  {
    initial:"ch", final:"i", syllable:"chi",
    tones: {
      1: { pinyin:"chī", hanzi:"吃", meaning:"Ăn uống" },
      2: { pinyin:"chí", hanzi:"迟", meaning:"Muộn màng" },
      3: { pinyin:"chǐ", hanzi:"尺", meaning:"Cây thước đo" },
      4: { pinyin:"chì", hanzi:"赤", meaning:"Màu đỏ thắm" }
    }
  },
  {
    initial:"sh", final:"i", syllable:"shi",
    tones: {
      1: { pinyin:"shī", hanzi:"师", meaning:"Thầy giáo" },
      2: { pinyin:"shí", hanzi:"十", meaning:"Số 10" },
      3: { pinyin:"shǐ", hanzi:"始", meaning:"Bắt đầu" },
      4: { pinyin:"shì", hanzi:"是", meaning:"Là / Đúng" }
    }
  },
  {
    initial:"r", final:"en", syllable:"ren",
    tones: {
      2: { pinyin:"rén", hanzi:"人", meaning:"Con người" },
      3: { pinyin:"rěn", hanzi:"忍", meaning:"Nhẫn nhịn" },
      4: { pinyin:"rèn", hanzi:"认", meaning:"Nhận biết" }
    }
  },

  // z, c, s
  {
    initial:"z", final:"ai", syllable:"zai",
    tones: {
      1: { pinyin:"zāi", hanzi:"栽", meaning:"Trồng cây" },
      3: { pinyin:"zǎi", hanzi:"宰", meaning:"Mổ thịt / Tể tướng" },
      4: { pinyin:"zài", hanzi:"在", meaning:"Ở / Tại / Đang" }
    }
  },
  {
    initial:"c", final:"ai", syllable:"cai",
    tones: {
      1: { pinyin:"cāi", hanzi:"猜", meaning:"Đoán" },
      2: { pinyin:"cái", hanzi:"裁", meaning:"Cắt may" },
      3: { pinyin:"cǎi", hanzi:"采", meaning:"Hái lượm" },
      4: { pinyin:"cài", hanzi:"菜", meaning:"Rau / Món ăn" }
    }
  },
  {
    initial:"s", final:"i", syllable:"si",
    tones: {
      1: { pinyin:"sī", hanzi:"丝", meaning:"Tơ lụa" },
      3: { pinyin:"sǐ", hanzi:"死", meaning:"Chết" },
      4: { pinyin:"sì", hanzi:"四", meaning:"Số 4" }
    }
  }
];
