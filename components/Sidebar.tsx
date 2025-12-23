import React, { useState } from 'react';
import { Chapter, Lesson } from '../types';
import { ChevronDown, ChevronRight, BookOpen, Menu, X } from 'lucide-react';

interface SidebarProps {
  chapters: Chapter[];
  currentLessonId: string;
  onSelectLesson: (chapter: Chapter, lesson: Lesson) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chapters, currentLessonId, onSelectLesson, isOpen, toggleSidebar }) => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>(chapters.map(c => c.id)); // Default expand all

  const toggleChapter = (id: string) => {
    setExpandedChapters(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-teal-100 transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 md:static md:inset-auto flex flex-col
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-teal-900/50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className={sidebarClasses}>
        <div className="p-4 border-b border-teal-100 flex items-center justify-between bg-teal-50">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-lg">
            <BookOpen size={24} />
            <span>KHTN 9</span>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-teal-600">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-teal-200">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="mb-2">
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center justify-between p-2 text-left text-sm font-semibold text-teal-900 hover:bg-teal-50 rounded transition-colors"
              >
                <span>{chapter.title}</span>
                {expandedChapters.includes(chapter.id) ? (
                  <ChevronDown size={16} className="text-teal-500" />
                ) : (
                  <ChevronRight size={16} className="text-teal-500" />
                )}
              </button>
              
              {expandedChapters.includes(chapter.id) && (
                <div className="ml-2 mt-1 space-y-1 border-l-2 border-teal-100 pl-2">
                  {chapter.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        onSelectLesson(chapter, lesson);
                        if (window.innerWidth < 768) toggleSidebar();
                      }}
                      className={`
                        w-full text-left p-2 text-sm rounded transition-all duration-200
                        ${currentLessonId === lesson.id 
                          ? 'bg-teal-600 text-white shadow-md' 
                          : 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'}
                      `}
                    >
                      {lesson.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="p-4 text-xs text-center text-teal-400 border-t border-teal-50">
          © 2024 KHTN 9 Tutor
        </div>
      </div>
    </>
  );
};

export default Sidebar;
