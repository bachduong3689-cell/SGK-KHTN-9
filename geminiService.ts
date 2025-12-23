// geminiService.ts

// 1. Sửa dòng lấy API Key
// Thay vì process.env.API_KEY, hãy dùng:
const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 

// ... phần còn lại giữ nguyên
const ai = new GoogleGenAI({ apiKey: apiKey });
