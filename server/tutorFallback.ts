/**
 * Server-side AI Teacher fallback engine
 * Provides immediate pedagogical answers when Gemini API key is missing or experiencing high traffic.
 */

export function generateServerTutorFallback(question: string): string {
  const q = (question || "").toLowerCase().trim();

  // 1. Phân biệt Bộ Thị (示/礻 vs 氏)
  if (
    q.includes("bộ thị") ||
    q.includes("bo thi") ||
    q.includes("mấy bộ thị") ||
    q.includes("bộ 示") ||
    q.includes("bộ 氏") ||
    q.includes("thi trong tieng trung")
  ) {
    return `Chào bạn! Trong tiếng Hán và hệ thống **214 Bộ Thủ Khang Hy**, khi nhắc đến âm Hán Việt là **"Thị"**, người học cần phân biệt rõ **2 BỘ THỦ CHÍNH THỨC** sau:

---

### 1. Bộ Thị (示 / 礻) - Bộ số 113 (4 hoặc 5 nét)
- **Pinyin:** *shì*
- **Ý nghĩa:** Chỉ sự thần thánh, linh thiêng, lễ bái, chúc tụng, bàn thờ tổ tiên.
- **Biến thể viết tắt khi ghép bên trái:** Viết là **礻**.
- **Chữ Hán tiêu biểu:**
  - **神** (*shén*): Thần linh, tinh thần.
  - **祝** (*zhù*): Chúc mừng, chúc phúc.
  - **福** (*fú*): Phúc, phúc khí, hạnh phúc.
  - **礼 (禮)** (*lǐ*): Lễ nghi, lễ phép.

### 2. Bộ Thị (氏) - Bộ số 83 (4 nét)
- **Pinyin:** *shì* hoặc *zhī*
- **Ý nghĩa:** Chỉ họ tộc, dòng họ, xuất xứ gia đình hoặc danh hiệu xưng hô.
- **Chữ Hán tiêu biểu:**
  - **姓氏** (*xìngshì*): Họ tên, dòng họ.
  - **摄氏度** (*shèshìdù*): Độ C (Celsius).

💡 **Mẹo phân biệt:**
- **示/礻** có liên quan đến tâm linh, may mắn, thờ cúng.
- **氏** liên quan đến tông tộc, họ hàng, nhân xưng.`;
  }

  // 2. Chuyên ngành may mặc
  if (
    q.includes("may mặc") ||
    q.includes("xưởng may") ||
    q.includes("vắt sổ") ||
    q.includes("may 1 kim") ||
    q.includes("kcs") ||
    q.includes("qc") ||
    q.includes("garment")
  ) {
    return `Chào bạn! Dưới đây là các thuật ngữ tiếng Trung chuyên ngành may mặc & sản xuất xưởng thường gặp:

- **平车 (píngchē):** Máy may 1 kim (máy bằng).
- **包缝机 / 拷边机 (bāofèngjī / kǎobiānjī):** Máy vắt sổ (3 chỉ / 4 chỉ / 5 chỉ).
- **坎车 / 绷缝机 (kǎnchē / bēngfèngjī):** Máy trần đè, trần viền.
- **质检 / QC (zhìjiǎn):** Kiểm phẩm, kiểm tra chất lượng.
- **工艺单 (gōngyìdān):** Bảng tài liệu kỹ thuật công nghệ may.
- **次品 (cìpǐn):** Hàng lỗi, sản phẩm hỏng.
- **面料 (miànliào):** Vải chính.
- **辅料 (fǔliào):** Phụ liệu may (chỉ, cúc, khóa kéo, nhãn mác).

Bạn có thể tra cứu toàn bộ hơn 600 thuật ngữ chuyên ngành này trong mục **"Chuyên ngành may mặc"** trên ứng dụng!`;
  }

  // 3. Phân biệt từ vựng phổ biến
  if (q.includes("phân biệt") || q.includes("khác nhau")) {
    return `Để phân biệt chính xác các từ vựng này trong tiếng Trung:
1. **Xét về từ loại & ngữ pháp:** Từ đó là động từ, tính từ hay phó từ? Có đi kèm tân ngữ được không?
2. **Xét về ngữ cảnh biểu đạt:** Khẩu ngữ hàng ngày hay văn phong trang trọng trong văn bản, công sở?
3. **Xét về thói quen kết hợp (collocation):** Người bản xứ thường đi từ này với danh từ hay giới từ nào?

Hãy gửi cụ thể cặp từ bạn muốn phân biệt để mình giải thích chi tiết kèm ví dụ nhé!`;
  }

  // 4. Default helpful answer
  return `Chào bạn! Mình là Trợ lý AI Học Tiếng Trung Toàn Diện.

Bạn có thể hỏi mình về:
- **Ngữ pháp HSK 1 - HSK 6:** Cách dùng câu chữ 把 (bǎ), câu chữ 被 (bèi), phân biệt phó từ, bổ ngữ kết quả, bổ ngữ xu hướng...
- **Thuật ngữ chuyên ngành May Mặc & Xưởng sản xuất:** Tên máy móc, vị trí may, quy trình kiểm hàng QC, báo cáo năng suất...
- **Phương pháp luyện thi & phát âm:** Thanh mẫu, vận mẫu, 4 thanh điệu và cách đọc chuẩn Pinyin.

Hãy nhập câu hỏi cụ thể của bạn nhé!`;
}
