import React, { useState } from 'react';
import { textbookData } from './data';
import { Chapter, Lesson } from './types';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import Chatbot from './components/Chatbot';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  // Initialize with the first lesson of the first chapter
  const [currentChapter, setCurrentChapter] = useState<Chapter>(textbookData[0]);
  const [currentLesson, setCurrentLesson] = useState<Lesson>(textbookData[0].lessons[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelectLesson = (chapter: Chapter, lesson: Lesson) => {
    setCurrentChapter(chapter);
    setCurrentLesson(lesson);
    // On mobile, close sidebar after selection
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-100 overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        chapters={textbookData} 
        currentLessonId={currentLesson.id}
        onSelectLesson={handleSelectLesson}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* Mobile Header */}
        <div className="md:hidden h-14 bg-white border-b border-teal-100 flex items-center px-4 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-teal-700 p-2 -ml-2 hover:bg-teal-50 rounded"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-teal-800 ml-2">KHTN 9</span>
        </div>

        {/* Content View */}
        <LessonView lesson={currentLesson} />

        {/* AI Assistant */}
        <Chatbot 
          currentChapter={currentChapter}
          currentLesson={currentLesson}
        />
      </div>
    </div>
  );
};

export default App;
