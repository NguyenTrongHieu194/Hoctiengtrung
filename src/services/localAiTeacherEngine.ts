/**
 * Offline & Fallback Smart Pedagogical Engine for Chinese Learning
 * Provides immediate, high-quality answers when backend or API network is loading or restarting.
 */

import { ALL_RADICALS } from "../data/radicals/index.ts";
import { GARMENT_TERMS } from "../data/garmentData.ts";
import { DEEP_GRAMMAR_POINTS } from "../data/grammarData.ts";

export function generateLocalTutorResponse(question: string): string {
  const q = question.toLowerCase().trim();

  // 1. Specific question: "Có mấy bộ Thị" / "bộ thị" / "bo thi"
  if (q.includes("bộ thị") || q.includes("bo thi") || q.includes("mấy bộ thị") || q.includes("bộ 示") || q.includes("bộ 氏") || q.includes("thi trong tieng trung")) {
    return `Chào bạn! Trong tiếng Hán và hệ thống **214 Bộ Thủ Khang Hy**, khi nhắc đến âm Hán Việt là **"Thị"**, người học cần phân biệt rõ **2 BỘ THỦ CHÍNH THỨC** và một số chữ Hán đồng âm rất thường gặp sau đây:

---

### 1. Hai Bộ Thủ chính thức mang tên "Thị":
1. **Bộ Thị (示 / 礻) - Bộ số 113 (4 hoặc 5 nét)**
   - **Pinyin:** *shì*
   - **Ý nghĩa:** Chỉ sự thần thánh, linh thiêng, lễ bái, chúc tụng, bàn thờ tổ tiên.
   - **Dạng biến thể khi ghép chữ:** Viết là **礻** (bên trái).
   - **Các chữ chứa bộ Thị 示/礻:**
     - **神** (*shén* - Thần): Thần linh, tinh thần.
     - **祝** (*zhù* - Chúc): Chúc mừng, chúc phúc.
     - **福** (*fú* - Phúc): Hạnh phúc, phúc lộc.
     - **礼 (禮)** (*lǐ* - Lễ): Lễ nghi, lễ phép, quà tặng.
     - **票** (*piào* - Phiếu): Vé, vé máy bay/xe.
     - **视 (視)** (*shì* - Thị): Thị giác, nhìn ngắm.

2. **Bộ Thị (氏) - Bộ số 83 (4 nét)**
   - **Pinyin:** *shì* hoặc *zhī*
   - **Ý nghĩa:** Chỉ họ tộc, dòng họ, thị tộc hoặc người phụ nữ họ nào đó (ví dụ: Nguyễn Thị).
   - **Các chữ chứa bộ Thị 氏:**
     - **氏** (*shì*): Họ tộc, thị tộc (như *姓氏 xìngshì* - Họ tên).
     - **民** (*mín* - Dân): Nhân dân, dân tộc.
     - **氓** (*máng*): Lưu manh, dân phiêu tán.

---

### 2. Các chữ Hán thường gặp khác đọc là "Thị" (Đồng âm khác nghĩa):
- **Chữ Thị (市 - *shì*):** Nghĩa là chợ, thành phố, thị trường (như *市场 shìchǎng* - chợ/thị trường, *超市 chāoshì* - siêu thị). Thuộc bộ Cân (巾).
- **Chữ Thị (是 - *shì*):** Nghĩa là "Là", "Đúng" (chứa bộ Nhật 日 ở trên + chữ Sở 疋 ở dưới).
- **Chữ Thị (侍 - *shì*):** Nghĩa là hầu hạ, phục vụ (chứa bộ Nhân đứng 亻+ chữ Tự 寺).
- **Chữ Thị (柿 - *shì*):** Quả hồng (chứa bộ Mộc 木 + chữ Thị 市).

💡 **Mẹo ghi nhớ từ Thầy:** 
- Thấy **礻(Thị bàn thờ)** $\\to$ liên quan đến lễ nghi, thờ cúng, thần linh.
- Thấy **氏 (Thị dòng họ)** $\\to$ liên quan đến huyết thống, người dân.`;
  }

  // 2. Question about Radicals in general / 214 bộ thủ
  if (q.includes("bộ thủ") || q.includes("bo thu") || q.includes("214") || q.includes("chiết tự") || q.includes("chiet tu") || q.includes("bộ ")) {
    const matchedRadical = ALL_RADICALS.find(r => 
      q.includes(r.sinoVietnamese.toLowerCase()) || 
      q.includes(r.radical) || 
      (r.variants && r.variants.some(v => q.includes(v)))
    );

    if (matchedRadical) {
      return `Thầy xin giải đáp chi tiết về **Bộ ${matchedRadical.sinoVietnamese} (${matchedRadical.radical})**:

- **Tên Hán Việt:** Bộ ${matchedRadical.sinoVietnamese} ${matchedRadical.variants?.length ? `(Biến thể: ${matchedRadical.variants.join(", ")})` : ""}
- **Số nét:** ${matchedRadical.strokeCount} nét (Bộ số ${matchedRadical.id}/214 Khang Hy).
- **Pinyin:** *${matchedRadical.pinyin}*
- **Ý nghĩa:** ${matchedRadical.vietnamese}
- **Ví dụ chữ Hán tiêu biểu:**
${matchedRadical.vocabularyExamples?.map(ex => `  • **${ex.hanzi}** (*${ex.pinyin}*): ${ex.vietnamese}`).join("\n") || "  • Đang cập nhật ví dụ chữ Hán"}
- **Mẹo nhớ:** ${matchedRadical.mnemonic || "Hình tượng trực quan giúp bạn nhớ cấu tạo chữ dễ dàng."}

Bạn có thể mở tab **214 Bộ Thủ** trên thanh menu để xem hoạt ảnh tập viết bút thuận của bộ này nhé!`;
    }

    return `Trong tiếng Trung chuẩn Khang Hy có **214 Bộ Thủ**. Bộ thủ là chìa khóa để:
1. **Tra cứu từ điển** khi chưa biết phát âm.
2. **Chiết tự & Ghi nhớ chữ Hán** theo ý nghĩa logic thay vì học vẹt.
3. **Phân loại nghĩa:** Ví dụ bộ Thủy (氵) chỉ nước, bộ Mộc (木) chỉ cây cối, bộ Tâm (忄/心) chỉ cảm xúc, bộ Hỏa (灬/火) chỉ lửa...

Bạn muốn Thầy giải thích chi tiết về bộ thủ nào cứ gõ tên bộ đó (ví dụ: *Bộ Nhân, Bộ Thủy, Bộ Khẩu, Bộ Mộc, Bộ Tâm...*) nhé!`;
  }

  // 3. Question about Garment terms (May mặc / Nhà xưởng)
  if (q.includes("may") || q.includes("xưởng") || q.includes("xuong") || q.includes("áo") || q.includes("quần") || q.includes("chỉ") || q.includes("kim") || q.includes("qc") || q.includes("kcs") || q.includes("cắt") || q.includes("rập")) {
    const matchedTerm = GARMENT_TERMS.find(t => 
      q.includes(t.vietnamese.toLowerCase()) || 
      q.includes(t.hanzi) || 
      q.includes(t.pinyin.toLowerCase())
    );

    if (matchedTerm) {
      return `Thuật ngữ chuyên ngành May xưởng cho từ này:

- **Chữ Hán:** **${matchedTerm.hanzi}**
- **Phiên âm Pinyin:** *${matchedTerm.pinyin}*
- **Nghĩa tiếng Việt:** **${matchedTerm.vietnamese}**
- **Ví dụ câu giao tiếp thực tế:**
  > ${matchedTerm.exampleSentence.hanzi}
  > *${matchedTerm.exampleSentence.pinyin}*
  > *Dịch nghĩa:* ${matchedTerm.exampleSentence.vietnamese}

Bạn có thể ghé thăm tab **Tiếng Trung May Mặc** để luyện tập trọn bộ từ vựng và hội thoại đóng vai với quản lý xưởng nhé!`;
    }

    return `Về **Tiếng Trung Chuyên Ngành May Mặc / Nhà Xưởng**, đây là một số thuật ngữ cốt lõi rất hay dùng:
- **缝纫机** (*féngrènjī*): Máy may
- **平缝机** (*píngfèngjī*): Máy 1 kim
- **包缝机** (*bāofèngjī*): Máy vắt sổ
- **剪刀** (*jiǎndāo*): Kéo cắt
- **裁床** (*cáichuáng*): Bàn cắt
- **质检 / QC** (*zhìjiǎn*): Kiểm tra chất lượng
- **断线** (*duànxiàn*): Đứt chỉ
- **线头** (*xiàntóu*): Đầu chỉ thừa
- **跳针** (*tiàozhēn*): Bỏ mũi chỉ

Bạn cần tra cứu quy trình, lỗi may, thông số hay giao tiếp với chuyền trưởng nào, hãy nhắn cụ thể cho Thầy nhé!`;
  }

  // 4. Grammar question
  if (q.includes("ngữ pháp") || q.includes("ngu phap") || q.includes("câu chữ 把") || q.includes("câu chữ 被") || q.includes("câu chữ 比") || q.includes("trợ từ")) {
    const matchedGrammar = DEEP_GRAMMAR_POINTS.find(g => 
      q.includes(g.title.toLowerCase()) || 
      (g.formula && g.formula.some(f => q.includes(f.toLowerCase())))
    );

    if (matchedGrammar) {
      return `Thầy hướng dẫn bạn điểm ngữ pháp **${matchedGrammar.title} (${matchedGrammar.hskLevel})**:

- **Công thức:** 
${matchedGrammar.formula.map(f => `  • ${f}`).join("\n")}
- **Giải thích:** ${matchedGrammar.shortSummary}
- **Quy tắc vàng:**
${matchedGrammar.goldenRules.slice(0, 3).map(r => `  💡 ${r}`).join("\n")}

Bạn có thể mở tab **Ngữ pháp** để xem toàn bộ sơ đồ cấu trúc của HSK 1 - HSK 6!`;
    }

    return `Ngữ pháp tiếng Trung có cấu trúc cốt lõi: **Chủ ngữ + [Thời gian/Địa điểm] + Phó từ/Trạng ngữ + Động từ + Tân ngữ**.

Các cấu trúc quan trọng cần nắm vững:
1. **Câu chữ 把 (Bǎ):** \`Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác\` (Nhấn mạnh sự xử lý/tác động).
2. **Câu bị động 被 (Bèi):** \`Đối tượng bị tác động + 被 + Kẻ tác động + Động từ + Thành phần khác\`.
3. **Câu so sánh 比 (Bǐ):** \`A + 比 + B + Tính từ / Cụm vị ngữ\`.
4. **Trợ từ kết cấu:** **的** (sở hữu/định ngữ), **得** (bổ ngữ trạng thái/mức độ), **地** (phó từ hóa động từ).

Bạn muốn tìm hiểu chi tiết về cấu trúc nào hãy nhắn Thầy nhé!`;
  }

  // 5. Default welcoming smart response
  return `Thầy đã nhận được câu hỏi của bạn: **"${question}"**.

Để hỗ trợ bạn học tập hiệu quả nhất:
- 📖 **Nếu hỏi về Chữ Hán / Bộ thủ:** Bạn có thể tra cứu chi tiết tại tab **214 Bộ Thủ** (có hướng dẫn cách viết từng nét & giải nghĩa chiết tự).
- 👔 **Nếu hỏi về Tiếng Trung May Mặc:** Hãy vào tab **May Mặc** với hơn 300+ thuật ngữ và 12 tình huống xưởng may thực tế.
- 🗣️ **Nếu muốn luyện nói / phát âm:** Mở tab **Luyện tập** để nhận diện giọng nói và chấm điểm 4 tiêu chí chuẩn xác.
- 💬 **Hỏi đáp trực tiếp:** Bạn hãy đặt các câu hỏi ngắn gọn như *"Giải thích bộ Khẩu"*, *"Cách dùng câu chữ 把"*, *"Thuật ngữ may máy vắt sổ nói thế nào?"* để Thầy giải đáp ngay nhé!`;
}
