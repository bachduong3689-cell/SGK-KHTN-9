import React, { useState, useEffect } from 'react';
import { Lesson } from '../types';
import { Book, CheckCircle, HelpCircle } from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'exercise'>('theory');
  const [revealedAnswers, setRevealedAnswers] = useState<string[]>([]);
  const [activeExample, setActiveExample] = useState<string | null>(null);

  const toggleAnswer = (id: string) => {
    setRevealedAnswers(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const toggleExample = (id: string) => {
    setActiveExample(prev => prev === id ? null : id);
  };

  useEffect(() => {
    if ((window as any).MathJax) {
      const mathJax = (window as any).MathJax;
      if (mathJax.typesetPromise) {
        mathJax.typesetPromise();
      } else if (mathJax.typeset) {
        mathJax.typeset();
      }
    }
  }, [lesson, activeTab, revealedAnswers, activeExample]);

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-100 p-4 md:p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden min-h-[85vh] flex flex-col">
        
        {/* Bootstrap-like Header */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-600 p-8 text-white">
          <div className="flex items-center gap-3 mb-2 opacity-80 text-sm font-medium tracking-wide uppercase">
            <i className="fas fa-graduation-cap"></i>
            KHTN Lớp 9
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">{lesson.title}</h1>
          <div className="flex items-center gap-4 text-sm md:text-base">
            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <i className="fas fa-book-open mr-2"></i> Lý thuyết
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <i className="fas fa-pen-nib mr-2"></i> Bài tập
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wide transition-all duration-200 flex items-center justify-center gap-2
              ${activeTab === 'theory' 
                ? 'text-teal-700 border-b-4 border-teal-600 bg-slate-50' 
                : 'text-slate-500 hover:text-teal-600 hover:bg-slate-50 border-b-4 border-transparent'}
            `}
          >
            <i className="fas fa-book text-lg"></i>
            Nội dung bài học
          </button>
          <button
            onClick={() => setActiveTab('exercise')}
            className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wide transition-all duration-200 flex items-center justify-center gap-2
              ${activeTab === 'exercise' 
                ? 'text-teal-700 border-b-4 border-teal-600 bg-slate-50' 
                : 'text-slate-500 hover:text-teal-600 hover:bg-slate-50 border-b-4 border-transparent'}
            `}
          >
             <i className="fas fa-tasks text-lg"></i>
            Bài tập tự luyện
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-10 flex-1 bg-slate-50">
          {activeTab === 'theory' ? (
            <div className="animate-fade-in space-y-8">
              
              {/* Theory Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-3">
                  <div className="bg-teal-100 text-teal-700 w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                    <i className="fas fa-align-left text-lg"></i>
                  </div>
                  <h3 className="font-bold text-lg text-slate-800">Kiến thức trọng tâm</h3>
                </div>
                <div 
                  className="p-6 prose prose-teal max-w-none text-slate-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: lesson.summary }}
                />
              </div>

              {/* Formulas Card */}
              {lesson.formulas && lesson.formulas.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-amber-50 border-b border-amber-100 px-6 py-4 flex items-center gap-3">
                    <div className="bg-amber-100 text-amber-700 w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                      <i className="fas fa-calculator text-lg"></i>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">Công thức cần nhớ</h3>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lesson.formulas.map((formula, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{formula.label}</span>
                        <span className="text-xl font-serif text-teal-800 font-bold group-hover:scale-110 transition-transform duration-300">
                           {formula.latex}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Examples Section */}
              {lesson.examples && lesson.examples.length > 0 && (
                 <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                       <i className="fas fa-lightbulb text-yellow-500 text-xl animate-pulse"></i>
                       <h3 className="text-xl font-bold text-slate-800">Ví dụ minh họa</h3>
                    </div>
                    
                    <div className="grid gap-4">
                       {lesson.examples.map((ex) => (
                          <div key={ex.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                             <button 
                               onClick={() => toggleExample(ex.id)}
                               className="w-full text-left px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                             >
                                <div className="flex items-center gap-3">
                                   <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">VÍ DỤ</span>
                                   <span className="font-semibold text-slate-700">{ex.title}</span>
                                </div>
                                <i className={`fas fa-chevron-down text-slate-400 transition-transform ${activeExample === ex.id ? 'rotate-180' : ''}`}></i>
                             </button>
                             
                             <div 
                               className={`border-t border-slate-100 transition-all duration-300 ease-in-out ${activeExample === ex.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                             >
                                <div className="p-6 bg-slate-50">
                                   <div className="mb-4 text-slate-700 font-medium border-l-4 border-blue-400 pl-4 py-1 bg-white shadow-sm rounded-r">
                                      <div dangerouslySetInnerHTML={{ __html: ex.content }} />
                                   </div>
                                   
                                   <div className="mt-4">
                                      <div className="flex items-center gap-2 text-teal-700 font-bold mb-2">
                                         <i className="fas fa-key"></i> Lời giải chi tiết:
                                      </div>
                                      <div className="bg-teal-50/50 p-4 rounded-lg border border-teal-100 text-slate-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: ex.solution }} />
                                   </div>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              )}

            </div>
          ) : (
            <div className="animate-fade-in space-y-6">
              {lesson.exercises.length > 0 ? (
                <div className="grid gap-6">
                  {lesson.exercises.map((ex, index) => (
                    <div key={ex.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-teal-300 hover:shadow-md transition-all">
                      <div className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-teal-200">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-800 text-lg mb-4 leading-relaxed">
                              <span dangerouslySetInnerHTML={{ __html: ex.question }} />
                            </h4>
                            
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                               <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Bài tập tự luyện</span>
                               <button
                                 onClick={() => toggleAnswer(ex.id)}
                                 className={`
                                   px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all
                                   ${revealedAnswers.includes(ex.id) 
                                     ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                                     : 'bg-teal-50 text-teal-600 hover:bg-teal-100 hover:text-teal-700'}
                                 `}
                               >
                                 {revealedAnswers.includes(ex.id) ? (
                                   <><i className="fas fa-eye-slash"></i> Ẩn đáp án</>
                                 ) : (
                                   <><i className="fas fa-eye"></i> Xem lời giải</>
                                 )}
                               </button>
                            </div>

                            {revealedAnswers.includes(ex.id) && (
                              <div className="mt-4 animate-slide-down">
                                <div className="bg-green-50 border border-green-100 rounded-xl p-5 relative">
                                  <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg rounded-tl-lg">
                                    ĐÁP ÁN
                                  </div>
                                  <div className="mt-2 text-slate-800" dangerouslySetInnerHTML={{ __html: ex.solution }} />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
                  <i className="fas fa-clipboard-list text-4xl mb-3 opacity-50"></i>
                  <p>Chưa có bài tập cho bài học này.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonView;