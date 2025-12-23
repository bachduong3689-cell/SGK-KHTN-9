export interface Exercise {
  id: string;
  question: string;
  solution: string;
}

export interface Example {
  id: string;
  title: string;
  content: string;
  solution: string;
}

export interface Lesson {
  id: string;
  title: string;
  summary: string; // HTML string for rich text content
  formulas?: { label: string; latex: string }[];
  examples?: Example[];
  exercises: Exercise[];
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}