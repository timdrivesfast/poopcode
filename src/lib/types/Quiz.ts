export type QuizDifficulty = 'Easy' | 'Medium' | 'Hard';

export type QuizCategory = 
  | 'Algorithms' 
  | 'Data Structures' 
  | 'System Design' 
  | 'JavaScript' 
  | 'Python' 
  | 'Big-O Notation';

export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  questions: QuizQuestion[];
  timeLimit?: number; // In minutes, optional
  imageUrl?: string;
  completed?: boolean; // Client-side tracking
  score?: number; // Client-side tracking
} 