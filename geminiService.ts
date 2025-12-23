import { GoogleGenAI } from "@google/genai";
import { Chapter, Lesson } from "./types";

// QUAN TRỌNG: Trong Vite, biến môi trường phải dùng import.meta.env
// và bắt buộc phải có tiền tố VITE_ trong file .env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Khởi tạo client Gemini
// Thêm kiểm tra để tránh lỗi nếu key chưa được cấu hình
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[],
  currentContext?: { chapter: Chapter; lesson: Lesson }
): Promise<string> => {
  try {
    // 1. Kiểm tra API Key trước khi gọi
    if (!apiKey || apiKey === "PLACEHOLDER_API_KEY") {
      return "Lỗi cấu hình: Vui lòng thiết lập VITE_GEMINI_API_KEY trong file .env.local hoặc Vercel Environment Variables.";
    }

    // 2. Xây dựng System Prompt (Chỉ thị cho AI)
    let systemPrompt = `Bạn là một gia sư AI thông minh, thân thiện chuyên hỗ trợ học sinh lớp 9 học môn Khoa học tự nhiên (KHTN 9) theo chương trình giáo dục Việt Nam (sách Kết nối tri thức).
    
    Nhiệm vụ của bạn:
    1. Giải thích các khái niệm khoa học một cách dễ hiểu, trực quan, phù hợp lứa tuổi 14-15.
    2. Hướng dẫn giải bài tập từng bước, gợi ý phương pháp tư duy chứ không chỉ đưa ra đáp án cuối cùng.
    3. Luôn khích lệ tinh thần học tập của học sinh.
    4. CỰC KỲ QUAN TRỌNG: Sử dụng định dạng Latex bọc trong dấu $ đơn cho công thức toán/lý/hóa (ví dụ: $E = mc^2$, $H_2O$, $\\frac{1}{2}$). Không dùng dấu $$.
    `;

    // 3. Bổ sung ngữ cảnh bài học hiện tại (nếu có)
    if (currentContext) {
      const { lesson, chapter } = currentContext;
      
      let examplesContext = "";
      if (lesson.examples && lesson.examples.length > 0) {
        // Lọc bỏ các thẻ HTML để AI dễ đọc hơn
        examplesContext = "\nCác ví dụ minh họa trong bài:\n" + 
          lesson.examples.map(ex => `- ${ex.title}: ${ex.content.replace(/<[^>]*>?/gm, '')}`).join('\n');
      }

      const cleanSummary = lesson.summary.replace(/<[^>]*>?/gm, ' ');

      systemPrompt += `\n\nHọc sinh đang học bài: "${lesson.title}" thuộc "${chapter.title}".
      
      Tóm tắt lý thuyết bài học:
      ${cleanSummary}
      
      ${examplesContext}
      
      Lưu ý: Hãy ưu tiên sử dụng kiến thức trong bài học này để trả lời. Nếu câu hỏi nằm ngoài bài học, hãy nhắc nhở nhẹ nhàng nhưng vẫn trả lời ngắn gọn.`;
    }

    // 4. Khởi tạo phiên Chat
    // Sử dụng model 'gemini-1.5-flash' để có tốc độ phản hồi nhanh nhất
    const chat = ai.chats.create({
      model: 'gemini-1.5-flash', 
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7, // Độ sáng tạo vừa phải cho việc dạy học
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    // 5. Gửi tin nhắn
    const result = await chat.sendMessage({ message: message });
    return result.text || "Xin lỗi, tôi chưa thể trả lời câu hỏi này.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với AI. Vui lòng kiểm tra lại API Key hoặc thử lại sau.";
  }
};
