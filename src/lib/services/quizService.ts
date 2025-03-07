import { Quiz, QuizQuestion } from '@/lib/types/Quiz';
import { SAMPLE_QUIZZES } from '@/lib/data/quizSeed';

// Get all available quizzes
export function getQuizzes(): Quiz[] {
  // This would eventually pull from Supabase
  return SAMPLE_QUIZZES;
}

// Get a specific quiz by ID
export function getQuizById(id: string): Quiz | null {
  return SAMPLE_QUIZZES.find(quiz => quiz.id === id) || null;
}

// Track quiz completion
export function trackQuizCompletion(quizId: string, score: number): void {
  if (typeof window === 'undefined') return;
  
  // Get existing quiz progress
  const progressJson = localStorage.getItem('quizProgress') || '{}';
  const progress = JSON.parse(progressJson);
  
  // Update the progress with score
  progress[quizId] = { completed: true, score };
  
  // Save back to localStorage
  localStorage.setItem('quizProgress', JSON.stringify(progress));
}

// Get completed quizzes
export function getCompletedQuizzes(): Record<string, { completed: boolean, score: number }> {
  if (typeof window === 'undefined') return {};
  
  const progressJson = localStorage.getItem('quizProgress') || '{}';
  return JSON.parse(progressJson);
} 