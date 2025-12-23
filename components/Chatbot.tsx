import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Chapter, Lesson } from '../types';
import { sendMessageToGemini } from '../geminiService';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';

interface ChatbotProps {
  currentChapter: Chapter;
  currentLesson: Lesson;
}

const Chatbot: React.FC<ChatbotProps> = ({ currentChapter, currentLesson }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'model', text: 'Xin chào! Mình là trợ lý AI KHTN 9. Bạn cần giúp đỡ gì về bài học này không?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  // Trigger MathJax typeset when messages change or chat opens
  useEffect(() => {
    if (isOpen && (window as any).MathJax) {
       const mathJax = (window as any).MathJax;
       if (mathJax.typesetPromise) {
         mathJax.typesetPromise();
       } else if (mathJax.typeset) {
         mathJax.typeset();
       }
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    
    // Add current context
    const context = { chapter: currentChapter, lesson: currentLesson };

    const responseText = await sendMessageToGemini(userMessage.text, history, context);

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`
          bg-white rounded-2xl shadow-2xl border border-teal-100 w-80 md:w-96 mb-4 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right pointer-events-auto
          ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 h-0'}
        `}
        style={{ maxHeight: '600px', height: '70vh' }}
      >
        {/* Header */}
        <div className="bg-teal-600 p-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-full">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Trợ lý AI Gemini</h3>
              <p className="text-xs text-teal-100 opacity-90 truncate max-w-[150px]">
                Đang xem: {currentLesson.title}
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-thin scrollbar-thumb-teal-200">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center shrink-0
                  ${msg.role === 'model' ? 'bg-teal-100 text-teal-600' : 'bg-indigo-100 text-indigo-600'}
                `}
              >
                {msg.role === 'model' ? <Sparkles size={16} /> : <User size={16} />}
              </div>
              <div 
                className={`
                  max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                  ${msg.role === 'model' 
                    ? 'bg-white border border-teal-50 text-slate-700 shadow-sm rounded-tl-none' 
                    : 'bg-teal-600 text-white rounded-tr-none shadow-md'}
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                 <Bot size={16} className="text-teal-600 animate-pulse" />
               </div>
               <div className="bg-white border border-teal-50 p-3 rounded-2xl rounded-tl-none shadow-sm">
                 <div className="flex gap-1">
                   <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                   <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                 </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-teal-100 shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Hỏi về bài học..."
              className="w-full pl-4 pr-12 py-3 rounded-full border border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm transition-all"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`
                absolute right-2 p-2 rounded-full transition-all
                ${!input.trim() || isLoading 
                  ? 'bg-slate-100 text-slate-400' 
                  : 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'}
              `}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          pointer-events-auto h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95
          ${isOpen ? 'bg-slate-200 text-slate-600 rotate-90' : 'bg-teal-600 text-white animate-bounce-subtle'}
        `}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
};

export default Chatbot;