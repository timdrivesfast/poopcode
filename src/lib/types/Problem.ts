export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  examples?: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints?: string[];
  codeTemplate?: string;
  acceptance: number;
  submissions: number;
  isPremium?: boolean;
  completed?: boolean;
} 