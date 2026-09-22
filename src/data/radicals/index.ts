import { RadicalItem, RadicalLesson, RadicalCategory } from"../../types";
import { RADICALS_PART1 } from"./part1";
import { RADICALS_PART2 } from"./part2";
import { RADICALS_PART3 } from"./part3";
import { RADICALS_PART4 } from"./part4";
import { RADICALS_PART5 } from"./part5";

export const ALL_RADICALS: RadicalItem[] = [
  ...RADICALS_PART1,
  ...RADICALS_PART2,
  ...RADICALS_PART3,
  ...RADICALS_PART4,
  ...RADICALS_PART5,
];

export const RADICAL_CATEGORIES_CONFIG: {
  id: RadicalCategory;
  name: string;
  vietnameseName: string;
  icon: string;
  color: string;
  description: string;
}[] = [
  {
    id:"nature",
    name:"Thiên nhiên & Vũ trụ",
    vietnameseName:"Trời đất, sông núi, ngũ hành, thời tiết",
    icon:"Sun",
    color:"amber",
    description:"Các bộ thủ biểu thị các yếu tố tự nhiên như Nhật (mặt trời), Nguyệt (mặt trăng), Thủy (nước), Hỏa (lửa), Thổ (đất), Kim, Mộc, Sơn, Xuyên, Vũ..."
  },
  {
    id:"human",
    name:"Con người & Thân thể",
    vietnameseName:"Bộ phận cơ thể, ngũ quan, cảm xúc, gia đình",
    icon:"User",
    color:"rose",
    description:"Các bộ thủ gắn liền với con người: Nhân, Nữ, Tử, Khẩu, Tâm, Thủ, Túc, Mục, Nhĩ, Thân, Phụ, Mẫu, Cốt..."
  },
  {
    id:"animal",
    name:"Động vật & Muông thú",
    vietnameseName:"Gia súc, dã thú, chim muông, thủy sản, côn trùng",
    icon:"Bug",
    color:"emerald",
    description:"Bộ Khuyển (chó), Ngưu (trâu), Dương (cừu), Mã (ngựa), Điểu (chim), Ngư (cá), Trùng (sâu tằm), Hổ, Long, Quy..."
  },
  {
    id:"plant",
    name:"Thực vật & Nông nghiệp",
    vietnameseName:"Cây cối, hoa cỏ, ngũ cốc, lúa gạo, sợi đay",
    icon:"Trees",
    color:"green",
    description:"Bộ Mộc (cây), Thảo (cỏ), Trúc (tre), Hòa (lúa), Mễ (gạo), Mạch (lúa mì), Ma (cây lanh gai), Đậu..."
  },
  {
    id:"tool",
    name:"Dụng cụ, Binh khí & May mặc",
    vietnameseName:"Đồ gia dụng, vũ khí, kim chỉ, tơ lụa, xe thuyền",
    icon:"Scissors",
    color:"blue",
    description:"Bộ Y (áo), Mịch (tơ chỉ), Kim (kim may), Đao, Cung, Qua, Xa (xe), Chu (thuyền), Mãnh (bát đĩa)..."
  },
  {
    id:"building",
    name:"Nhà cửa, Kiến trúc & Địa hình",
    vietnameseName:"Mái nhà, cánh cửa, thành quách, hang hốc, thôn xóm",
    icon:"Home",
    color:"orange",
    description:"Bộ Miên (mái nhà), Hộ (cửa 1 cánh), Môn (cổng 2 cánh), Nghiễm (mái hiên), Quảng, Ấp, Phụ, Lý..."
  },
  {
    id:"action_quality",
    name:"Hành động, Màu sắc & Trạng thái",
    vietnameseName:"Di chuyển, đi lại, màu sắc, đo lường, phẩm chất",
    icon:"Activity",
    color:"purple",
    description:"Bộ Tẩu (chạy), Sước (bước đi), Hành (đi lại), Sắc (màu), Bạch, Hắc, Xích, Thanh, Hoàng, Lập..."
  },
  {
    id:"strokes_abstract",
    name:"Nét cơ bản & Biểu tượng",
    vietnameseName:"Các nét sơ khai, con số, biểu tượng tượng hình",
    icon:"Edit3",
    color:"indigo",
    description:"Bộ Nhất, Cổn, Chủ, Phiệt, Ất, Quyết, Nhị, Đầu, Bát, Quỷ, Vô, Phương, Văn..."
  }
];

// 12 bài học chuyên đề bao phủ toàn diện 214 bộ thủ theo nhóm ý nghĩa logic
export const RADICAL_LESSONS: RadicalLesson[] = [
  {
    id:"lesson_nature_elements",
    title:"Bài 1: Thiên Nhiên & Ngũ Hành",
    description:"Khám phá các bộ thủ đại diện cho Mặt trời, Mặt trăng, Nước, Lửa, Núi, Sông, Đất đá, Gió mưa",
    category:"nature",
    radicalIds: [1, 24, 32, 46, 47, 72, 74, 84, 85, 86, 96, 112, 167, 173, 182]
  },
  {
    id:"lesson_human_body",
    title:"Bài 2: Con Người & Các Bộ Phận Cơ Thể",
    description:"Học các bộ thủ thân thuộc nhất về cơ thể: Người, Phụ nữ, Miệng, Mắt, Tai, Tay, Chân, Tim, Xương cốt",
    category:"human",
    radicalIds: [9, 10, 30, 38, 39, 61, 64, 92, 109, 128, 130, 132, 135, 157, 158, 188, 209, 211]
  },
  {
    id:"lesson_animals_beasts",
    title:"Bài 3: Động Vật & Muông Thú Linh Vật",
    description:"Khám phá các loài vật thân quen từ gia súc đến thú rừng: Chó, Mèo, Trâu, Ngựa, Cừu, Hổ, Rồng, Rùa",
    category:"animal",
    radicalIds: [82, 87, 93, 94, 123, 141, 142, 152, 153, 172, 187, 195, 196, 198, 208, 212, 213]
  },
  {
    id:"lesson_garment_textiles",
    title:"Bài 4: May Mặc, Vải Vóc & Sợi Dệt (Đặc Biệt Cho Ngành May)",
    description:"Bộ thủ nền tảng ngành may: Áo (Y), Tơ tằm (Mịch), Vải Linen (Ma), Da thuộc (Bì/Cách), Kim khâu (Kim), Cuộn vải (Thất), Thêu thùa (Chỉ)",
    category:"tool",
    radicalIds: [50, 82, 103, 107, 120, 145, 167, 177, 178, 200, 204]
  },
  {
    id:"lesson_plants_crops",
    title:"Bài 5: Cỏ Cây, Hoa Lá & Ngũ Cốc",
    description:"Bộ thủ nông nghiệp và thảo mộc: Cây gỗ (Mộc), Hoa cỏ (Thảo), Tre trúc (Trúc), Lúa gạo (Hòa/Mễ), Lúa mì (Mạch), Đậu, Rau hẹ",
    category:"plant",
    radicalIds: [65, 75, 97, 115, 118, 119, 140, 151, 179, 186, 199, 202]
  },
  {
    id:"lesson_home_architecture",
    title:"Bài 6: Nhà Cửa, Công Trình & Nơi Chốn",
    description:"Không gian sống và làm việc: Mái nhà (Miên), Cửa (Hộ/Môn), Hiên nhà (Nghiễm), Quảng trường, Đô thị (Ấp), Gò đất (Phụ), Làng xóm (Lý)",
    category:"building",
    radicalIds: [40, 53, 63, 98, 116, 163, 166, 169, 170, 189]
  },
  {
    id:"lesson_movement_actions",
    title:"Bài 7: Hành Động, Đi Lại & Di Chuyển",
    description:"Các bộ thủ chỉ sự vận động: Bước đi (Sước), Chạy (Tẩu), Đi lại (Hành), Dừng chân (Chỉ), Nhìn thấy (Kiến), Mở rộng (Cung/Dặc)",
    category:"action_quality",
    radicalIds: [54, 60, 77, 105, 117, 133, 144, 147, 156, 162]
  },
  {
    id:"lesson_tools_weapons",
    title:"Bài 8: Binh Khí, Dụng Cụ & Phương Tiện",
    description:"Dụng cụ đồ dùng: Con dao (Đao), Cây giáo (Qua/Mâu), Chiếc rìu (Cân), Xe cộ (Xa), Thuyền bè (Chu), Cái cày (Lỗi), Cái đấu (Đẩu)",
    category:"tool",
    radicalIds: [18, 56, 57, 62, 68, 69, 79, 110, 111, 121, 122, 127, 134, 137, 159, 193, 206, 207, 214]
  },
  {
    id:"lesson_colors_sensory",
    title:"Bài 9: Màu Sắc, Vị Giác & Giác Quan",
    description:"Các bộ màu sắc và vị giác: Trắng (Bạch), Đen (Hắc), Đỏ (Xích), Xanh (Thanh), Vàng (Hoàng), Ngọt (Cam), Cay (Tân), Vị chua (Dậu), Âm thanh (Âm)",
    category:"action_quality",
    radicalIds: [99, 106, 139, 155, 160, 164, 174, 180, 201, 203]
  },
  {
    id:"lesson_social_wisdom",
    title:"Bài 10: Xã Hội, Văn Hóa & Tri Thức",
    description:"Văn hóa và học tập: Chữ viết (Văn), Bút lông (Duật), Lời nói (Ngôn), Thầy trò (Lão), Tiền tài vỏ sò (Bối), Quy tắc (Cấn), Lòng thành kính (Thị)",
    category:"human",
    radicalIds: [66, 67, 83, 88, 113, 125, 129, 131, 149, 154, 165, 171, 184, 185]
  },
  {
    id:"lesson_1_2_strokes_core",
    title:"Bài 11: 29 Bộ Thủ 1-2 Nét Cốt Lõi Siêu Căn Bản",
    description:"Nắm vững toàn bộ các nét gạch sơ khai từ Nhất, Cổn, Chủ, Phiệt đến các bộ 2 nét: Nhị, Nhân, Đao, Lực, Bát, Thập, Bốc, Tiết, Hán...",
    category:"strokes_abstract",
    radicalIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
  },
  {
    id:"lesson_complex_rare_radicals",
    title:"Bài 12: Các Bộ Thủ Nhiều Nét & Biểu Tượng Cổ",
    description:"Thành thạo các bộ thủ 10-17 nét phức tạp: Rồng (Long), Con Hươu (Lộc), Trống đồng (Cổ), Chiếc đỉnh (Đỉnh), Con chuột (Thử), Quẻ Hào, Bát quái...",
    category:"strokes_abstract",
    radicalIds: [58, 59, 71, 89, 90, 91, 95, 101, 114, 126, 136, 146, 150, 161, 175, 181, 183, 190, 191, 192, 194, 197, 205, 206, 210]
  }
];

export function getRadicalsByCategory(category: RadicalCategory): RadicalItem[] {
  return ALL_RADICALS.filter(r => r.category === category);
}

export function getRadicalsByStrokeCount(strokes: number): RadicalItem[] {
  return ALL_RADICALS.filter(r => r.strokeCount === strokes);
}

export function getRadicalById(id: number): RadicalItem | undefined {
  return ALL_RADICALS.find(r => r.id === id);
}

export function searchRadicals(keyword: string): RadicalItem[] {
  if (!keyword.trim()) return ALL_RADICALS;
  const q = keyword.trim().toLowerCase();
  return ALL_RADICALS.filter(r => 
    r.radical.toLowerCase().includes(q) ||
    r.pinyin.toLowerCase().includes(q) ||
    r.sinoVietnamese.toLowerCase().includes(q) ||
    r.vietnamese.toLowerCase().includes(q) ||
    r.id.toString() === q ||
    (r.variants && r.variants.some(v => v.toLowerCase().includes(q))) ||
    r.vocabularyExamples.some(ex => 
      ex.hanzi.toLowerCase().includes(q) ||
      ex.pinyin.toLowerCase().includes(q) ||
      ex.vietnamese.toLowerCase().includes(q) ||
      ex.sinoVietnamese.toLowerCase().includes(q)
    )
  );
}
