import { GoogleGenAI } from "@google/genai";
import { Chapter, Lesson } from "./types";

const apiKey = process.env.API_KEY; // Assumes API_KEY is injected by the environment

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: apiKey });

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[],
  currentContext?: { chapter: Chapter; lesson: Lesson }
): Promise<string> => {
  try {
    // Construct a system instruction or initial context prompt
    let systemPrompt = `Bạn là một gia sư AI thông minh, thân thiện chuyên hỗ trợ học sinh lớp 9 học môn Khoa học tự nhiên (KHTN 9) theo chương trình giáo dục Việt Nam (sách Kết nối tri thức).
    
    Nhiệm vụ của bạn:
    1. Giải thích các khái niệm khoa học một cách dễ hiểu, trực quan.
    2. Hướng dẫn giải bài tập từng bước, không chỉ đưa ra đáp án.
    3. Luôn khích lệ tinh thần học tập của học sinh.
    4. Sử dụng định dạng Latex bọc trong dấu $ để trình bày công thức (ví dụ: $E = mc^2$).
    `;

    if (currentContext) {
      const { lesson, chapter } = currentContext;
      
      let examplesContext = "";
      if (lesson.examples && lesson.examples.length > 0) {
        examplesContext = "\nCác ví dụ minh họa trong bài:\n" + 
          lesson.examples.map(ex => `- ${ex.title}: ${ex.content.replace(/<[^>]*>?/gm, '')}`).join('\n');
      }

      systemPrompt += `\n\nHọc sinh đang học bài: "${lesson.title}" thuộc "${chapter.title}".
      
      Nội dung tóm tắt lý thuyết:
      ${lesson.summary.replace(/<[^>]*>?/gm, '')}
      
      ${examplesContext}
      
      Hãy ưu tiên trả lời các câu hỏi liên quan đến nội dung và các ví dụ của bài học này.`;
    }

    // Prepare the conversation history for the model
    // The SDK chat helper manages history, but since we might reconstruct it in a stateless UI way or simple hook,
    // we will initialize a chat session.
    
    // Convert simplified history to SDK compatible format if needed, 
    // but for simple text generation with context, we can construct a prompt chain 
    // OR use the Chat session properly. Let's use Chat session.

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemPrompt,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({ message: message });
    return result.text || "Xin lỗi, tôi chưa thể trả lời câu hỏi này.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.";
  }
};